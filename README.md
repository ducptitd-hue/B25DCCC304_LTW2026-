# Nhanh như chớp – React

## Chạy dự án
1. Cài Node.js (khuyến nghị bản LTS).
2. Giải nén thư mục.
3. Mở terminal tại thư mục dự án và chạy:
   ```bash
   npm install
   npm start
   ```
4. Trình duyệt mở tại `http://localhost:3000`.

## Ngân hàng câu hỏi
Dữ liệu mẫu nằm tại `public/data/questions.json`. Hãy thay nội dung 15 câu mẫu bằng 15 câu chính thức của lớp, giữ cấu trúc:
```json
{
  "id": 1,
  "level": "Dễ",
  "question": "Nội dung câu hỏi",
  "answers": ["Phương án A", "Phương án B", "Phương án C", "Phương án D"],
  "correct": "B"
}
```
`correct` chỉ nhận A, B, C hoặc D. Nếu có câu dự bị cho quyền Đổi câu hỏi, thêm các câu đó vào JSON với `id` riêng và cùng `level` phù hợp.

## Ghi chú
- `src/App.js` bắt đầu đúng bằng `const BUILD_TAG = "nc-7438";`.
- Tìm kiếm trong trang Ngân hàng câu hỏi dùng hàm `handleKeywordShift`.
- Lịch sử được lưu trong localStorage với key `ltw_chop_history`.
- Bộ câu hỏi trong file là dữ liệu minh họa vì tài liệu yêu cầu chưa đính kèm ngân hàng 15 câu chính thức.
