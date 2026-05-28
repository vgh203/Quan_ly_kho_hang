const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ────────────────────────────────────────────────────────────
// Utility: generate receipt code  PX-YYYYMMDD-XXXX
// ────────────────────────────────────────────────────────────
async function generateExportCode() {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, '0');
  const d = String(today.getDate()).padStart(2, '0');
  const prefix = `PX-${y}${m}${d}-`;

  const last = await prisma.exportReceipt.findFirst({
    where: { receipt_code: { startsWith: prefix } },
    orderBy: { receipt_code: 'desc' },
  });

  let seq = 1;
  if (last) {
    const parts = last.receipt_code.split('-');
    seq = parseInt(parts[parts.length - 1], 10) + 1;
  }
  return `${prefix}${String(seq).padStart(4, '0')}`;
}

// ────────────────────────────────────────────────────────────
// GET /api/exports  — danh sách phiếu xuất (có filter/search)
// ────────────────────────────────────────────────────────────
exports.getAll = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      status = '',
      reason = '',
      from_date = '',
      to_date = '',
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (search) {
      where.OR = [
        { receipt_code: { contains: search, mode: 'insensitive' } },
        { customer_name: { contains: search, mode: 'insensitive' } },
        { supplier: { name: { contains: search, mode: 'insensitive' } } },
      ];
    }
    if (status) where.status = status;
    if (reason) where.reason = reason;
    if (from_date) where.export_date = { ...(where.export_date || {}), gte: new Date(from_date) };
    if (to_date) where.export_date = { ...(where.export_date || {}), lte: new Date(to_date) };

    const [total, items] = await Promise.all([
      prisma.exportReceipt.count({ where }),
      prisma.exportReceipt.findMany({
        where,
        include: {
          supplier: { select: { id: true, name: true } },
          creator: { select: { id: true, full_name: true } },
          details: { select: { id: true, quantity: true } },
        },
        orderBy: { export_date: 'desc' },
        skip,
        take,
      }),
    ]);

    const data = items.map((r) => ({
      id: r.id,
      receipt_code: r.receipt_code,
      export_date: r.export_date ? r.export_date.toISOString().split('T')[0] : null,
      reason: r.reason,
      supplier_id: r.supplier_id,
      supplier_name: r.supplier?.name || null,
      customer_name: r.customer_name || null,
      status: r.status,
      total_amount: Number(r.total_amount),
      items_count: r.details.length,
      total_qty: r.details.reduce((s, d) => s + d.quantity, 0),
      created_by: r.creator?.full_name || '—',
      created_at: r.created_at,
      note: r.note,
    }));

    return res.json({
      data,
      pagination: {
        total,
        page: parseInt(page),
        limit: take,
        total_pages: Math.ceil(total / take),
      },
    });
  } catch (err) {
    console.error('getAll exports error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải danh sách phiếu xuất.' });
  }
};

// ────────────────────────────────────────────────────────────
// GET /api/exports/:id  — chi tiết 1 phiếu xuất
// ────────────────────────────────────────────────────────────
exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const receipt = await prisma.exportReceipt.findUnique({
      where: { id },
      include: {
        supplier: true,
        creator: { select: { id: true, full_name: true, username: true } },
        approver: { select: { id: true, full_name: true, username: true } },
        details: {
          include: {
            product: {
              select: {
                id: true,
                product_code: true,
                name: true,
                unit: true,
                unit_price: true,
              },
            },
            import_detail: {
              select: {
                id: true,
                batch_code: true,
                expiry_date: true,
                lot_location: { select: { id: true, location_code: true, name: true } },
              },
            },
          },
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!receipt) return res.status(404).json({ error: 'Không tìm thấy phiếu xuất.' });

    return res.json(receipt);
  } catch (err) {
    console.error('getById export error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải chi tiết phiếu xuất.' });
  }
};

// ────────────────────────────────────────────────────────────
// POST /api/exports  — tạo phiếu xuất SELL (FEFO tự động)
// Body: { reason, export_date, note, customer_name,
//         delivery_address, supplier_id (nếu RETURN),
//         items: [{ product_id, quantity, selling_price,
//                   import_detail_id (nếu RETURN) }] }
// ────────────────────────────────────────────────────────────
exports.create = async (req, res) => {
  try {
    const {
      reason = 'SELL',
      export_date,
      note,
      customer_name,
      delivery_address,
      supplier_id,
      items = [],
    } = req.body;

    const created_by = req.user.id;

    // Validate
    const validReasons = ['SELL', 'RETURN', 'DISPOSE', 'INTERNAL'];
    if (!validReasons.includes(reason.toUpperCase())) {
      return res.status(400).json({ error: `Lý do xuất không hợp lệ. Chấp nhận: ${validReasons.join(', ')}` });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Phiếu xuất phải có ít nhất 1 sản phẩm.' });
    }
    if (reason === 'RETURN' && !supplier_id) {
      return res.status(400).json({ error: 'Phiếu trả hàng phải chọn nhà cung cấp.' });
    }

    const receipt_code = await generateExportCode();
    const actualDate = export_date ? new Date(export_date) : new Date();

    // ── Use transaction for FEFO allocation ────────────────
    const result = await prisma.$transaction(async (tx) => {
      // Create the receipt first
      const receipt = await tx.exportReceipt.create({
        data: {
          receipt_code,
          export_date: actualDate,
          reason: reason.toUpperCase(),
          note: note || null,
          customer_name: reason === 'SELL' ? (customer_name || null) : null,
          delivery_address: reason === 'SELL' ? (delivery_address || null) : null,
          supplier_id: reason === 'RETURN' ? parseInt(supplier_id) : null,
          created_by,
          total_amount: 0,
          status: reason === 'RETURN' ? 'PENDING_APPROVAL' : 'COMPLETED',
        },
      });

      let totalAmount = 0;

      for (const item of items) {
        const product_id = parseInt(item.product_id);
        const qty_needed = parseInt(item.quantity);
        const selling_price = parseFloat(item.selling_price) || 0;

        if (!product_id || qty_needed <= 0) {
          throw new Error(`Sản phẩm hoặc số lượng không hợp lệ.`);
        }

        if (reason === 'SELL' || reason === 'DISPOSE' || reason === 'INTERNAL') {
          // ── FEFO: lấy lô hàng theo thứ tự hết hạn sớm nhất ──
          const lots = await tx.$queryRaw`
            SELECT vls.lot_id, vls.available_lot_stock::int, vls.expiry_date, vls.batch_code
            FROM v_lot_stock vls
            JOIN products p ON p.id = vls.product_id
            WHERE vls.product_id = ${product_id}
              AND vls.available_lot_stock > 0
              AND (vls.expiry_date IS NULL OR (vls.expiry_date - CURRENT_DATE) >= p.min_days_to_sell)
            ORDER BY vls.expiry_date ASC NULLS LAST, vls.import_date ASC
          `;

          // Check total sellable stock
          const totalAvailable = lots.reduce((s, l) => s + l.available_lot_stock, 0);
          if (totalAvailable < qty_needed) {
            const product = await tx.product.findUnique({ where: { id: product_id }, select: { name: true } });
            throw new Error(
              `Sản phẩm "${product?.name || product_id}" không đủ tồn kho bán được. ` +
              `Khả dụng: ${totalAvailable}, Yêu cầu: ${qty_needed}.`
            );
          }

          // Allocate FEFO
          let remaining = qty_needed;
          for (const lot of lots) {
            if (remaining <= 0) break;
            const take = Math.min(remaining, lot.available_lot_stock);

            await tx.exportDetail.create({
              data: {
                receipt_id: receipt.id,
                product_id,
                import_detail_id: lot.lot_id,
                quantity: take,
                selling_price,
              },
            });

            // Update location capacity
            const lotDetail = await tx.importDetail.findUnique({
              where: { id: lot.lot_id },
              select: { location_id: true },
            });
            if (lotDetail?.location_id) {
              await tx.location.update({
                where: { id: lotDetail.location_id },
                data: { current_occupied: { decrement: take } },
              });
            }

            remaining -= take;
            totalAmount += take * selling_price;
          }

          if (remaining > 0) {
            throw new Error(`Lỗi phân bổ FEFO: Không thể hoàn tất ${remaining} đơn vị cho sản phẩm ID ${product_id}.`);
          }
        } else {
          // ── RETURN: lấy đúng lô hàng chỉ định ──
          const lot_id = parseInt(item.import_detail_id);
          if (!lot_id) {
            throw new Error('Phiếu trả hàng phải chỉ định lô hàng (import_detail_id).');
          }

          const lotRows = await tx.$queryRaw`
            SELECT lot_id, product_id, supplier_id::int, current_lot_stock::int,
                   available_lot_stock::int, batch_code, unit_price::float
            FROM v_lot_stock
            WHERE lot_id = ${lot_id} AND product_id = ${product_id}
          `;

          if (lotRows.length === 0) {
            throw new Error(`Không tìm thấy lô hàng ID ${lot_id} của sản phẩm ${product_id}.`);
          }

          const lotInfo = lotRows[0];
          if (lotInfo.supplier_id !== parseInt(supplier_id)) {
            throw new Error(
              `Lô hàng '${lotInfo.batch_code}' không thuộc nhà cung cấp đã chọn.`
            );
          }
          if (lotInfo.available_lot_stock < qty_needed) {
            throw new Error(
              `Lô hàng '${lotInfo.batch_code}' chỉ còn khả dụng ${lotInfo.available_lot_stock}, ` +
              `không đủ để trả ${qty_needed}.`
            );
          }

          const return_price = lotInfo.unit_price || 0;
          await tx.exportDetail.create({
            data: {
              receipt_id: receipt.id,
              product_id,
              import_detail_id: lot_id,
              quantity: qty_needed,
              selling_price: return_price,
            },
          });
          totalAmount += qty_needed * return_price;
        }
      }

      // Update total
      const updated = await tx.exportReceipt.update({
        where: { id: receipt.id },
        data: { total_amount: totalAmount },
        include: {
          supplier: { select: { id: true, name: true } },
          details: { include: { product: true } },
        },
      });

      return updated;
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error('create export error:', err);
    const statusCode = err.message.includes('không đủ') || err.message.includes('không hợp lệ') ? 400 : 500;
    return res.status(statusCode).json({ error: err.message || 'Lỗi hệ thống khi tạo phiếu xuất.' });
  }
};

// ────────────────────────────────────────────────────────────
// PATCH /api/exports/:id/approve  — admin duyệt phiếu trả hàng
// ────────────────────────────────────────────────────────────
exports.approve = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const approved_by = req.user.id;

    const receipt = await prisma.exportReceipt.findUnique({
      where: { id },
      include: { details: true },
    });
    if (!receipt) return res.status(404).json({ error: 'Không tìm thấy phiếu xuất.' });
    if (receipt.reason !== 'RETURN') {
      return res.status(400).json({ error: 'Chỉ phê duyệt phiếu trả hàng nhà cung cấp.' });
    }
    if (receipt.status !== 'PENDING_APPROVAL') {
      return res.status(400).json({ error: `Phiếu không ở trạng thái chờ duyệt. Hiện tại: ${receipt.status}` });
    }

    // Verify stock availability one last time
    for (const detail of receipt.details) {
      const rows = await prisma.$queryRaw`
        SELECT current_lot_stock::int, batch_code
        FROM v_lot_stock
        WHERE lot_id = ${detail.import_detail_id}
      `;
      if (rows.length === 0) {
        return res.status(400).json({ error: `Lô hàng ID ${detail.import_detail_id} không còn tồn tại.` });
      }
      if (rows[0].current_lot_stock < detail.quantity) {
        return res.status(409).json({
          error: `Lô '${rows[0].batch_code}' chỉ còn ${rows[0].current_lot_stock}, không đủ trả ${detail.quantity}.`,
        });
      }

      // Update location capacity
      const lotDetail = await prisma.importDetail.findUnique({
        where: { id: detail.import_detail_id },
        select: { location_id: true },
      });
      if (lotDetail?.location_id) {
        await prisma.location.update({
          where: { id: lotDetail.location_id },
          data: { current_occupied: { decrement: detail.quantity } },
        });
      }
    }

    const updated = await prisma.exportReceipt.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        approved_by,
        approved_at: new Date(),
      },
    });

    return res.json({ message: 'Phê duyệt phiếu trả hàng thành công.', receipt: updated });
  } catch (err) {
    console.error('approve export error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi phê duyệt phiếu.' });
  }
};

// ────────────────────────────────────────────────────────────
// PATCH /api/exports/:id/reject  — admin từ chối phiếu trả
// ────────────────────────────────────────────────────────────
exports.reject = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const receipt = await prisma.exportReceipt.findUnique({ where: { id } });
    if (!receipt) return res.status(404).json({ error: 'Không tìm thấy phiếu xuất.' });
    if (receipt.reason !== 'RETURN') {
      return res.status(400).json({ error: 'Chỉ từ chối phiếu trả hàng nhà cung cấp.' });
    }
    if (receipt.status !== 'PENDING_APPROVAL') {
      return res.status(400).json({ error: `Phiếu không ở trạng thái chờ duyệt.` });
    }

    const { rejection_note } = req.body;

    const updated = await prisma.exportReceipt.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        rejection_note: rejection_note || 'Không chấp nhận phiếu trả hàng.',
        approved_by: req.user.id,
        approved_at: new Date(),
      },
    });

    return res.json({ message: 'Đã từ chối phiếu trả hàng.', receipt: updated });
  } catch (err) {
    console.error('reject export error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi từ chối phiếu.' });
  }
};

// ────────────────────────────────────────────────────────────
// PATCH /api/exports/:id/cancel  — huỷ phiếu xuất
// ────────────────────────────────────────────────────────────
exports.cancel = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const receipt = await prisma.exportReceipt.findUnique({ where: { id } });
    if (!receipt) return res.status(404).json({ error: 'Không tìm thấy phiếu xuất.' });
    if (receipt.status === 'CANCELLED') {
      return res.status(400).json({ error: 'Phiếu đã bị huỷ trước đó.' });
    }

    const { cancel_reason } = req.body;

    const updated = await prisma.exportReceipt.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        note: cancel_reason ? `[HUỶ] ${cancel_reason}` : receipt.note,
      },
    });

    return res.json({ message: 'Phiếu xuất đã bị huỷ.', receipt: updated });
  } catch (err) {
    console.error('cancel export error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi huỷ phiếu xuất.' });
  }
};

// ────────────────────────────────────────────────────────────
// GET /api/exports/stats  — thống kê tổng quan phiếu xuất
// ────────────────────────────────────────────────────────────
exports.getStats = async (req, res) => {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [byStatus, byReason, thisMonth] = await Promise.all([
      prisma.exportReceipt.groupBy({
        by: ['status'],
        _count: { id: true },
        _sum: { total_amount: true },
      }),
      prisma.exportReceipt.groupBy({
        by: ['reason'],
        _count: { id: true },
        _sum: { total_amount: true },
      }),
      prisma.exportReceipt.aggregate({
        where: {
          export_date: { gte: monthStart },
          status: 'COMPLETED',
          reason: 'SELL',
        },
        _count: { id: true },
        _sum: { total_amount: true },
      }),
    ]);

    return res.json({
      by_status: byStatus.map((b) => ({
        status: b.status,
        count: b._count.id,
        total_amount: Number(b._sum.total_amount || 0),
      })),
      by_reason: byReason.map((b) => ({
        reason: b.reason,
        count: b._count.id,
        total_amount: Number(b._sum.total_amount || 0),
      })),
      this_month: {
        count: thisMonth._count.id,
        total_amount: Number(thisMonth._sum.total_amount || 0),
      },
    });
  } catch (err) {
    console.error('getStats export error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi tải thống kê phiếu xuất.' });
  }
};

// ────────────────────────────────────────────────────────────
// GET /api/exports/sellable-stock/:productId  — tồn kho bán được
// ────────────────────────────────────────────────────────────
exports.getSellableStock = async (req, res) => {
  try {
    const product_id = parseInt(req.params.productId);

    const rows = await prisma.$queryRaw`
      SELECT COALESCE(SUM(vls.available_lot_stock), 0)::int AS sellable_stock
      FROM v_lot_stock vls
      JOIN products p ON p.id = vls.product_id
      WHERE vls.product_id = ${product_id}
        AND vls.available_lot_stock > 0
        AND (vls.expiry_date IS NULL OR (vls.expiry_date - CURRENT_DATE) >= p.min_days_to_sell)
    `;

    return res.json({
      product_id,
      sellable_stock: rows[0]?.sellable_stock || 0,
    });
  } catch (err) {
    console.error('getSellableStock error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống.' });
  }
};

// ────────────────────────────────────────────────────────────
// DELETE /api/exports/:id  — xoá phiếu xuất (chỉ CANCELLED)
// ────────────────────────────────────────────────────────────
exports.remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const receipt = await prisma.exportReceipt.findUnique({ where: { id } });
    if (!receipt) return res.status(404).json({ error: 'Không tìm thấy phiếu xuất.' });
    if (receipt.status !== 'CANCELLED') {
      return res.status(400).json({ error: 'Chỉ có thể xoá phiếu xuất đã bị HUỶ.' });
    }

    await prisma.exportReceipt.delete({ where: { id } });
    return res.json({ message: 'Đã xoá phiếu xuất thành công.' });
  } catch (err) {
    console.error('remove export error:', err);
    return res.status(500).json({ error: 'Lỗi hệ thống khi xoá phiếu xuất.' });
  }
};
