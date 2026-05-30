const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Gợi ý đặt hàng bổ sung dựa trên tồn kho thấp + lịch sử nhập.
 * @param {Array} lowStockProducts - Danh sách SP tồn kho thấp
 * @param {Array} importHistory    - Lịch sử nhập 3 tháng gần nhất
 * @returns {Array} Danh sách gợi ý JSON
 */
async function getReplenishmentSuggestions(lowStockProducts, importHistory) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY chưa được cấu hình trong .env');
  }

  const prompt = `
Bạn là chuyên gia quản lý kho hàng bán lẻ tại Việt Nam.
Dựa trên dữ liệu thực tế dưới đây, hãy gợi ý kế hoạch đặt hàng bổ sung:

--- SẢN PHẨM TỒN KHO THẤP ---
${JSON.stringify(lowStockProducts, null, 2)}

--- LỊCH SỬ NHẬP HÀNG 3 THÁNG GẦN NHẤT ---
${JSON.stringify(importHistory, null, 2)}

Yêu cầu:
1. Phân tích tốc độ tiêu thụ dựa trên lịch sử
2. Gợi ý số lượng đặt hàng hợp lý (không quá nhiều, không quá ít)
3. Ưu tiên nhà cung cấp có giá tốt nhất
4. Sắp xếp theo mức độ ưu tiên (urgent/high/medium)

Trả về ĐÚNG định dạng JSON array sau (không thêm text ngoài JSON):
[
  {
    "product_id": <số>,
    "product_name": "<tên sản phẩm>",
    "current_stock": <tồn kho hiện tại>,
    "min_stock": <tồn kho tối thiểu>,
    "suggested_qty": <số lượng đề xuất đặt>,
    "supplier_name": "<nhà cung cấp ưu tiên>",
    "estimated_price": <đơn giá ước tính>,
    "priority": "urgent|high|medium",
    "reason": "<lý do ngắn gọn bằng tiếng Việt>"
  }
]`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    // Tách phần JSON ra khỏi markdown code block nếu có
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error('Gemini không trả về JSON hợp lệ');

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error('Gemini API error:', err.message);
    throw new Error('Không thể lấy gợi ý từ Gemini AI: ' + err.message);
  }
}

module.exports = { getReplenishmentSuggestions };
