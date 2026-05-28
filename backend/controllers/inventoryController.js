const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/inventory/dashboard
exports.getDashboard = async (req, res) => {
  try {
    // 1. Overview metrics
    const summary = await prisma.$queryRaw`
      SELECT
        COUNT(DISTINCT "product_id")::int          AS "total_product_types",
        COALESCE(SUM("total_imported"), 0)::int    AS "total_imported_qty",
        COALESCE(SUM("total_exported"), 0)::int    AS "total_exported_qty",
        COALESCE(SUM("current_stock"), 0)::int     AS "total_current_stock"
      FROM "v_stock_balance"
    `;

    const stockValue = await prisma.$queryRaw`
      SELECT COALESCE(SUM("current_lot_stock" * "unit_price"), 0)::float AS "total_stock_value"
      FROM "v_lot_stock"
      WHERE "current_lot_stock" > 0
    `;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // monthly imports (COMPLETED)
    const monthlyImports = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT ir.id)::int AS "count", COALESCE(SUM(id.quantity), 0)::int AS "qty"
      FROM import_receipts ir
      JOIN import_details id ON id.receipt_id = ir.id
      WHERE ir.import_date >= ${monthStart}
        AND ir.status = 'COMPLETED'
    `;

    // monthly exports (SELL COMPLETED)
    const monthlyExports = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT receipt_id)::int AS "count", COALESCE(SUM(quantity), 0)::int AS "qty"
      FROM export_details ed
      JOIN export_receipts er ON er.id = ed.receipt_id
      WHERE er.export_date >= ${monthStart}
        AND er.status = 'COMPLETED'
        AND er.reason = 'SELL'
    `;

    const overview = {
      total_product_types: summary[0]?.total_product_types || 0,
      total_imported_qty: summary[0]?.total_imported_qty || 0,
      total_exported_qty: summary[0]?.total_exported_qty || 0,
      total_current_stock: summary[0]?.total_current_stock || 0,
      total_stock_value: stockValue[0]?.total_stock_value || 0,
    };

    const this_month = {
      import_receipts_count: monthlyImports[0]?.count || 0,
      import_qty: monthlyImports[0]?.qty || 0,
      export_receipts_count: monthlyExports[0]?.count || 0,
      export_qty: monthlyExports[0]?.qty || 0,
    };

    return res.json({
      overview,
      this_month,
      generated_at: now.toISOString(),
    });
  } catch (error) {
    console.error('Error fetching inventory dashboard metrics:', error);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải số liệu tổng quan.' });
  }
};

// GET /api/inventory/alerts
exports.getAlerts = async (req, res) => {
  try {
    const lowStock = await prisma.$queryRaw`
      SELECT "product_id"::int, "product_code", "product_name", "unit",
             "current_stock"::int, "min_stock"::int,
             ("min_stock" - "current_stock")::int AS "shortage"
      FROM "v_stock_balance"
      WHERE "current_stock" < "min_stock"
      ORDER BY "shortage" DESC
    `;

    const expiringSoon = await prisma.$queryRaw`
      SELECT vls.lot_id::int, vls.product_id::int, vls.product_code, vls.product_name,
             vls.batch_code, vls.expiry_date, vls.current_lot_stock::int,
             vls.available_lot_stock::int, vls.unit,
             (vls.expiry_date - CURRENT_DATE)::int AS days_until_expiry,
             p.min_days_to_sell::int, p.expiry_warning_days::int
      FROM v_lot_stock vls
      JOIN products p ON p.id = vls.product_id
      WHERE vls.expiry_date IS NOT NULL
        AND (vls.expiry_date - CURRENT_DATE) <= p.expiry_warning_days
        AND vls.expiry_date >= CURRENT_DATE
        AND vls.available_lot_stock > 0
      ORDER BY vls.expiry_date ASC
    `;

    const expired = await prisma.$queryRaw`
      SELECT vls.lot_id::int, vls.product_id::int, vls.product_code, vls.product_name,
             vls.batch_code, vls.expiry_date, vls.current_lot_stock::int,
             vls.available_lot_stock::int, vls.unit,
             (vls.expiry_date - CURRENT_DATE)::int AS days_until_expiry,
             p.min_days_to_sell::int, p.expiry_warning_days::int
      FROM v_lot_stock vls
      JOIN products p ON p.id = vls.product_id
      WHERE vls.expiry_date IS NOT NULL
        AND vls.expiry_date < CURRENT_DATE
        AND vls.available_lot_stock > 0
      ORDER BY vls.expiry_date ASC
    `;

    const slowMovingThreshold = new Date();
    slowMovingThreshold.setDate(slowMovingThreshold.getDate() - 30);

    const slowMoving = await prisma.$queryRaw`
      SELECT
          vsb.product_id::int,
          vsb.product_code,
          vsb.product_name,
          vsb.unit,
          vsb.current_stock::int,
          MAX(er.export_date) AS last_export_date,
          (CURRENT_DATE - MAX(er.export_date))::int AS days_since_last_export
      FROM v_stock_balance vsb
      LEFT JOIN export_details ed ON ed.product_id = vsb.product_id
      LEFT JOIN export_receipts er
          ON er.id = ed.receipt_id
          AND er.status = 'COMPLETED'
          AND er.reason = 'SELL'
      WHERE vsb.current_stock > 0
      GROUP BY vsb.product_id, vsb.product_code, vsb.product_name,
               vsb.unit, vsb.current_stock
      HAVING MAX(er.export_date) IS NULL
          OR MAX(er.export_date) < ${slowMovingThreshold}
      ORDER BY last_export_date ASC NULLS FIRST
    `;

    const now = new Date();

    return res.json({
      generated_at: now.toISOString(),
      low_stock: lowStock,
      expiring_soon: expiringSoon,
      expired,
      slow_moving: slowMoving,
      summary: {
        low_stock_count: lowStock.length,
        expiring_soon_count: expiringSoon.length,
        expired_count: expired.length,
        slow_moving_count: slowMoving.length,
      }
    });
  } catch (error) {
    console.error('Error fetching inventory alerts:', error);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải cảnh báo kho.' });
  }
};

// GET /api/inventory/stats
exports.getStats = async (req, res) => {
  try {
    // 1. Get import/export statistics for the last 7 days
    const stats_7days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      d.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + 1);

      const impRes = await prisma.$queryRaw`
        SELECT COALESCE(SUM(id.quantity), 0)::int as qty
        FROM import_details id
        JOIN import_receipts ir ON ir.id = id.receipt_id
        WHERE ir.import_date = ${d}
          AND ir.status = 'COMPLETED'
      `;

      const expRes = await prisma.$queryRaw`
        SELECT COALESCE(SUM(ed.quantity), 0)::int as qty
        FROM export_details ed
        JOIN export_receipts er ON er.id = ed.receipt_id
        WHERE er.export_date = ${d}
          AND er.status = 'COMPLETED'
          AND er.reason = 'SELL'
      `;

      // Date format like "DD/MM"
      const dateLabel = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
      
      stats_7days.push({
        date: dateLabel,
        import: impRes[0]?.qty || 0,
        export: expRes[0]?.qty || 0
      });
    }

    // 2. Get stock by category
    const categoryStock = await prisma.$queryRaw`
      SELECT 
          COALESCE(category, 'Chưa phân loại') as name,
          COALESCE(SUM(current_stock), 0)::float as value
      FROM v_stock_balance
      GROUP BY category
      ORDER BY value DESC
    `;

    return res.json({
      stats_7days,
      category_stock: categoryStock
    });
  } catch (error) {
    console.error('Error fetching inventory stats:', error);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải thống kê biểu đồ.' });
  }
};

// GET /api/imports (recent)
exports.getImports = async (req, res) => {
  try {
    const imports = await prisma.importReceipt.findMany({
      include: {
        supplier: true
      },
      orderBy: {
        import_date: 'desc'
      },
      take: 20
    });
    
    const result = imports.map(imp => ({
      id: imp.id,
      receipt_code: imp.receipt_code,
      supplier_name: imp.supplier?.name || '—',
      import_date: imp.import_date ? imp.import_date.toISOString().split('T')[0] : '—',
      status: imp.status,
      total_amount: Number(imp.total_amount)
    }));
    
    return res.json(result);
  } catch (error) {
    console.error('Error fetching import receipts:', error);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải danh sách phiếu nhập.' });
  }
};

// GET /api/exports (recent)
exports.getExports = async (req, res) => {
  try {
    const exports = await prisma.exportReceipt.findMany({
      include: {
        supplier: true
      },
      orderBy: {
        export_date: 'desc'
      },
      take: 20
    });
    
    const result = exports.map(exp => ({
      id: exp.id,
      receipt_code: exp.receipt_code,
      reason: exp.reason,
      supplier_name: exp.supplier?.name || '—',
      export_date: exp.export_date ? exp.export_date.toISOString().split('T')[0] : '—',
      status: exp.status,
      total_amount: Number(exp.total_amount)
    }));
    
    return res.json(result);
  } catch (error) {
    console.error('Error fetching export receipts:', error);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải danh sách phiếu xuất.' });
  }
};
