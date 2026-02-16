Tạo project ReactJS bằng Vite
npm create vite@latest

Project name: cleaning-fe
Select a framework: React
Select a variant: JavaScript (hoặc TypeScript nếu bạn dùng TS)
cd cleaning-fe
de cai cac thu vien dau tien
npm install
de chay react
npm run dev
http://localhost:5173


Cài các thư viện FE cơ bản
React Router: npm install react-router-dom
Axios (gọi API): npm install axios
UI Framework (Tailwind CSS Hoặc MUI)
Tailwind CSS: npm install -D @tailwindcss/postcss
npx tailwindcss init -p
MUI: npm install @mui/material @emotion/react @emotion/styled
cai Heroicon cua tailwind de su dung icon: npm install @heroicons/react
cai de decode jwt: npm i jwt-decode
cai de su dung icon: npm install react-icons
hoac cai cai nay de su dung icon: npm install @heroicons/react

neu cai npx tailwindcss init -p theo cach tren ko dc thi cai thu cong nhu sau:
Tao file ngang cap vs src
Tạo file tailwind.config.ts (THỦ CÔNG)
Trong thư mục gốc vite-project, tạo file mới:
code:
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

Tạo file postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
Import Tailwind vào CSS

Mở file:

📄 src/index.css (hoặc src/main.css)

Thêm 3 dòng bắt buộc:
@tailwind base;
@tailwind components;
@tailwind utilities;

Import CSS trong main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



qua trinh code:
1. src/api/ – Tầng giao tiếp Backend

Mục đích:
Quản lý toàn bộ logic gọi API (HTTP) tới backend.

Vì sao phải tách riêng?

Tránh gọi axios trực tiếp trong component

Dễ thay đổi baseURL, token, interceptor

Chuẩn hóa error handling

2. components/ – Component dùng chung (Reusable)

Mục đích:
Chứa các component tái sử dụng nhiều nơi, không gắn nghiệp vụ cụ thể.

Đặc điểm:

Không gọi API trực tiếp

Không chứa logic nghiệp vụ phức tạp

Nhận data qua props

3. features/ – Nghiệp vụ chính (Core Business Logic)

Đây là thư mục QUAN TRỌNG NHẤT.

Mục đích:
Tổ chức code theo nghiệp vụ, không theo loại file.

4. pages/ – Các trang cấp cao (Route-level)

Mục đích:
Mỗi file = 1 trang gắn với URL.

Đặc điểm:

Kết hợp nhiều component / feature

Không nên chứa logic chi tiết

Chủ yếu layout + orchestration

5. layouts/ – Khung giao diện theo vai trò

Mục đích:
Chứa layout dùng chung cho từng nhóm người dùng.

6. routes/ – Điều hướng & phân quyền

Mục đích:
Quản lý toàn bộ routing, tránh viết router rải rác.

7. hooks/ – Custom Hooks

Mục đích:
Tách logic dùng lại nhiều lần khỏi component.

8. utils/ – Tiện ích & hằng số

Mục đích:
Chứa code không phụ thuộc React.

9. App.jsx – Root Component

Mục đích:

Khởi tạo router

Áp layout

10. main.jsx – Entry point

Mục đích:

Mount React vào DOM

Khai báo Provider
Global providers

11. Tổng kết tư duy kiến trúc
Tầng	Thư mục
UI nhỏ	components
UI theo nghiệp vụ	features
Trang	pages
Layout	layouts
Điều hướng	routes
Giao tiếp BE	api
Logic tái dùng	hooks
Tiện ích	utils