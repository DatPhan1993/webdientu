# 🛍️ ElectroShop - E-Commerce Frontend

Frontend application cho website thương mại điện tử bằng ReactJS + Vite.

## 🚀 Công nghệ sử dụng

- **React 18** - UI Framework
- **Vite** - Build tool & Dev server
- **React Router Dom** - Routing
- **Bootstrap 5** & **React-Bootstrap** - UI Components
- **Axios** - HTTP Client
- **React Icons** - Icon library

## 📁 Cấu trúc thư mục

```
src/
├── components/          # Reusable components
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   └── Loading.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── Favorites.jsx
├── contexts/           # React Context
│   └── AppContext.jsx
├── services/           # API services
│   └── api.js
├── App.jsx            # Main App component
└── main.jsx          # Entry point
```

## ⚙️ Cài đặt

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Chạy development server

```bash
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

### 3. Build cho production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## 🔗 Kết nối Backend

Backend API được cấu hình trong `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api/v1';
```

**Lưu ý**: Đảm bảo backend đang chạy tại `http://localhost:8080`

## ✨ Tính năng

### 🏠 Trang chủ
- Hero section với gradient đẹp mắt
- Danh mục sản phẩm
- Thương hiệu nổi bật
- Sản phẩm nổi bật
- Thống kê số liệu

### 🛍️ Sản phẩm
- Hiển thị danh sách sản phẩm
- Lọc theo danh mục
- Lọc theo thương hiệu
- Phân trang
- Xem chi tiết sản phẩm
- Chọn phiên bản (màu sắc, RAM)

### 🛒 Giỏ hàng
- Thêm/xóa sản phẩm
- Cập nhật số lượng
- Tính tổng tiền
- LocalStorage persistence

### ❤️ Yêu thích
- Thêm/xóa sản phẩm yêu thích
- LocalStorage persistence

### 🔐 Đăng nhập
- JWT Authentication
- Quản lý session
- Protected routes

## 🎨 UI/UX Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations & transitions
- ✅ Loading states
- ✅ Empty states
- ✅ Hover effects
- ✅ Gradient backgrounds
- ✅ Custom scrollbar
- ✅ Bootstrap components

## 📦 Components chính

### ProductCard
Component hiển thị sản phẩm với:
- Hình ảnh sản phẩm
- Thông tin cơ bản
- Giá & giá sale
- Badge giảm giá
- Nút yêu thích
- Nút thêm giỏ hàng

### Header
- Logo & Navigation
- Shopping cart badge
- Favorites badge
- User dropdown menu
- Responsive navbar

### Footer
- Social links
- Quick links
- Contact info

## 🔄 State Management

Sử dụng **React Context API** để quản lý:
- 👤 User authentication
- 🛒 Shopping cart
- ❤️ Favorites list
- 🔐 JWT token

## 📱 Responsive Breakpoints

- **Mobile**: < 576px
- **Tablet**: 576px - 991px
- **Desktop**: > 992px

## 🚀 Scripts

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## 🐛 Troubleshooting

### Port 5173 đã được sử dụng
```bash
# Kill process
lsof -ti:5173 | xargs kill -9

# Hoặc đổi port trong vite.config.js
```

### Cannot connect to backend
- Kiểm tra backend đang chạy tại port 8080
- Kiểm tra CORS configuration trong backend
- Xem console log trong browser

### Dependencies issues
```bash
# Clear cache và reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 API Endpoints được sử dụng

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/brand` | Lấy tất cả brands |
| GET | `/categories` | Lấy tất cả categories |
| GET | `/products` | Lấy tất cả products |
| GET | `/products/{id}` | Lấy chi tiết product |
| GET | `/products/categories/{categoryId}` | Lấy products theo category |
| GET | `/products/categoriesByName/{name}` | Lấy products theo tên category |
| GET | `/products/brand/{brandId}` | Lấy products theo brand |
| POST | `/login` | Đăng nhập |

## 🎯 Future Enhancements

- [ ] Search functionality
- [ ] Product reviews & ratings
- [ ] Wishlist sync with backend
- [ ] Order management
- [ ] User profile page
- [ ] Product comparison
- [ ] Advanced filters (price range, etc.)
- [ ] Payment integration

## 👥 Credits

Created with ❤️ using React, Vite, and Bootstrap

---

**Happy coding! 🚀**
