const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: { user, pass },
  });

  return transporter;
}

/**
 * Gửi email cảnh báo tồn kho thấp tới admin.
 * @param {Array<{product_code:string, product_name:string, current_stock:number, min_stock:number, shortage:number}>} products
 */
async function sendLowStockAlert(products, toEmail) {
  const transport = getTransporter();
  if (!transport) {
    throw new Error('Email chưa được cấu hình (EMAIL_HOST, EMAIL_USER, EMAIL_PASS).');
  }

  const rows = products
    .map(
      (p) =>
        `<tr>
          <td>${p.product_code}</td>
          <td>${p.product_name}</td>
          <td>${p.current_stock}</td>
          <td>${p.min_stock}</td>
          <td><strong>${p.shortage}</strong></td>
        </tr>`
    )
    .join('');

  const html = `
    <h2>⚠️ Cảnh báo tồn kho thấp — WMS</h2>
    <p>Có <strong>${products.length}</strong> sản phẩm dưới ngưỡng tối thiểu:</p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <thead>
        <tr style="background:#0e7490;color:#fff;">
          <th>Mã SP</th><th>Tên</th><th>Tồn</th><th>Min</th><th>Thiếu</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="margin-top:16px;color:#64748b;font-size:12px;">Email tự động từ hệ thống WMS INT1334.</p>
  `;

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: `[WMS] Cảnh báo ${products.length} sản phẩm tồn kho thấp`,
    html,
  });
}

module.exports = { sendLowStockAlert, getTransporter };
