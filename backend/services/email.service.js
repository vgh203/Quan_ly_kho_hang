const globalFetch = global.fetch || require('node-fetch');

/**
 * Gửi email cảnh báo tồn kho thấp tới admin qua Resend API.
 * @param {Array<{product_code:string, product_name:string, current_stock:number, min_stock:number, shortage:number}>} products
 * @param {string} toEmail
 */
async function sendLowStockAlert(products, toEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Chưa cấu hình API Key cho Resend (RESEND_API_KEY).');
  }

  const rows = products
    .map(
      (p) =>
        `<tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${p.product_code}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${p.product_name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${p.current_stock}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${p.min_stock}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align: center; color: #e11d48;"><strong>${p.shortage}</strong></td>
        </tr>`
    )
    .join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-xl;">
      <h2 style="color: #0e7490; margin-bottom: 16px; border-bottom: 2px solid #0e7490; padding-bottom: 8px;">⚠️ Cảnh báo tồn kho thấp — WMS</h2>
      <p style="font-size: 14px; color: #334155;">Hệ thống phát hiện có <strong>${products.length}</strong> sản phẩm dưới ngưỡng an toàn tối thiểu:</p>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 14px; border: 1px solid #ddd;">
        <thead>
          <tr style="background: #0e7490; color: #fff;">
            <th style="padding: 10px;">Mã SP</th>
            <th style="padding: 10px;">Tên sản phẩm</th>
            <th style="padding: 10px;">Tồn hiện tại</th>
            <th style="padding: 10px;">Tồn tối thiểu</th>
            <th style="padding: 10px;">Thiếu hụt</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top: 20px; color: #64748b; font-size: 12px; border-top: 1px dashed #e2e8f0; padding-top: 10px; text-align: center;">
        Email gửi tự động từ hệ thống quản lý kho WMS (Đồ án Lập trình Web INT1334).
      </p>
    </div>
  `;

  // Sử dụng email mặc định của Resend đối với tài khoản thử nghiệm chưa cấu hình domain riêng
  const fromEmail = "onboarding@resend.dev";

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: toEmail,
      subject: `[WMS] Cảnh báo ${products.length} sản phẩm tồn kho thấp`,
      html: html,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || `Lỗi từ Resend API (HTTP ${response.status})`);
  }

  return resData;
}

module.exports = { sendLowStockAlert };
