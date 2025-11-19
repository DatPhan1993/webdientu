# WebDienTu - E-Commerce Website

Dự án website thương mại điện tử được xây dựng với Spring Boot (Backend) và React (Frontend).

## 📋 Mục lục

- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cấu trúc dự án](#cấu-trúc-dự-án)
- [Cài đặt và chạy dự án](#cài-đặt-và-chạy-dự-án)
  - [1. Cài đặt Database](#1-cài-đặt-database)
  - [2. Cấu hình Backend](#2-cấu-hình-backend)
  - [3. Chạy Backend](#3-chạy-backend)
  - [4. Chạy Frontend](#4-chạy-frontend)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [API Endpoints](#api-endpoints)

## 🔧 Yêu cầu hệ thống

- **Java**: JDK 11 trở lên
- **Node.js**: v16 trở lên
- **MySQL**: 8.0 trở lên
- **Maven**: 3.6+ (hoặc sử dụng Maven Wrapper có sẵn)
- **npm** hoặc **yarn**

## 📁 Cấu trúc dự án

```
webdientu/
├── webdientu_backend/          # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/webdientu/
│   │   │   │   ├── controller/    # REST Controllers
│   │   │   │   ├── service/       # Business Logic
│   │   │   │   ├── repository/    # Data Access Layer
│   │   │   │   ├── entity/        # JPA Entities
│   │   │   │   ├── DTO/           # Data Transfer Objects
│   │   │   │   ├── security/      # JWT Security
│   │   │   │   └── config/        # Configuration
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── webdientu_frontend/          # Frontend React
│   ├── src/
│   │   ├── components/          # React Components
│   │   ├── pages/               # Page Components
│   │   ├── services/            # API Services
│   │   └── contexts/            # React Context
│   ├── package.json
│   └── vite.config.js
├── ecommerce_backend_db.sql     # Database SQL file
└── README.md
```

## 🚀 Cài đặt và chạy dự án

### 1. Cài đặt Database

1. **Tạo database MySQL:**
   ```sql
   CREATE DATABASE webdientu;
   ```

2. **Import dữ liệu (tùy chọn):**
   ```bash
   mysql -u root -p webdientu < ecommerce_backend_db.sql
   ```
   
   Hoặc sử dụng MySQL Workbench/phpMyAdmin để import file `ecommerce_backend_db.sql`

### 2. Cấu hình Backend

1. **Mở file cấu hình:**
   ```
   webdientu_backend/src/main/resources/application.properties
   ```

2. **Cập nhật thông tin database:**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/webdientu?createDatabaseIfNotExist=true
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
   
   ⚠️ **Lưu ý:** Thay `your_password` bằng mật khẩu MySQL của bạn.

3. **Cấu hình JWT (nếu cần):**
   ```properties
   jwt.secret=mockProject
   jwt.expiration=604800000
   ```

### 3. Chạy Backend

**Cách 1: Sử dụng Maven Wrapper (Khuyến nghị)**
```bash
cd webdientu_backend

# Trên Windows
mvnw.cmd spring-boot:run

# Trên Linux/Mac
./mvnw spring-boot:run
```

**Cách 2: Sử dụng Maven**
```bash
cd webdientu_backend
mvn clean install
mvn spring-boot:run
```

**Cách 3: Chạy từ IDE**
- Mở project trong IntelliJ IDEA hoặc Eclipse
- Tìm class `WebdientuApplication.java`
- Run as Spring Boot Application

Backend sẽ chạy tại: **http://localhost:8080**

### 4. Chạy Frontend

1. **Cài đặt dependencies:**
   ```bash
   cd webdientu_frontend
   npm install
   ```
   
   Hoặc sử dụng yarn:
   ```bash
   yarn install
   ```

2. **Chạy development server:**
   ```bash
   npm run dev
   ```
   
   Hoặc:
   ```bash
   yarn dev
   ```

3. **Truy cập ứng dụng:**
   - Frontend sẽ chạy tại: **http://localhost:5173** (hoặc port khác nếu 5173 đã được sử dụng)
   - Kiểm tra console để xem URL chính xác

4. **Build production (tùy chọn):**
   ```bash
   npm run build
   ```
   
   File build sẽ được tạo trong thư mục `dist/`

## 🛠 Công nghệ sử dụng

### Backend
- **Spring Boot 2.7.18** - Framework Java
- **Spring Security** - Authentication & Authorization
- **Spring Data JPA** - Database ORM
- **MySQL** - Database
- **JWT** - JSON Web Token cho authentication
- **Lombok** - Giảm boilerplate code
- **ModelMapper** - Object mapping
- **Maven** - Dependency management

### Frontend
- **React 19** - UI Library
- **Vite** - Build tool và dev server
- **React Router** - Routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS Framework
- **React Bootstrap** - Bootstrap components cho React
- **React Icons** - Icon library

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/{id}` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới (Admin)
- `PUT /api/products/{id}` - Cập nhật sản phẩm (Admin)
- `DELETE /api/products/{id}` - Xóa sản phẩm (Admin)

### Categories
- `GET /api/categories` - Lấy danh sách danh mục
- `POST /api/categories` - Tạo danh mục mới (Admin)

### Brands
- `GET /api/brands` - Lấy danh sách thương hiệu
- `POST /api/brands` - Tạo thương hiệu mới (Admin)

### Cart
- `GET /api/shopcart` - Lấy giỏ hàng
- `POST /api/shopcart` - Thêm sản phẩm vào giỏ hàng
- `PUT /api/shopcart/{id}` - Cập nhật giỏ hàng
- `DELETE /api/shopcart/{id}` - Xóa sản phẩm khỏi giỏ hàng

### Account
- `GET /api/accounts` - Lấy danh sách tài khoản (Admin)
- `GET /api/accounts/{id}` - Lấy thông tin tài khoản
- `PUT /api/accounts/{id}` - Cập nhật tài khoản

> **Lưu ý:** Một số endpoints yêu cầu authentication. Sử dụng JWT token trong header:
> ```
> Authorization: Bearer <your_token>
> ```

## 🔐 Mặc định

- **Backend Port:** 8080
- **Frontend Port:** 5173 (hoặc port khác do Vite tự động chọn)
- **Database:** MySQL trên localhost:3306

## ⚠️ Lưu ý quan trọng

1. **Bảo mật:** Đảm bảo thay đổi mật khẩu database và JWT secret trong môi trường production
2. **CORS:** Backend đã được cấu hình để cho phép CORS từ frontend
3. **Database:** Nếu database chưa tồn tại, Spring Boot sẽ tự động tạo database nếu `createDatabaseIfNotExist=true`

## 📝 Troubleshooting

### Lỗi kết nối database
- Kiểm tra MySQL đã được cài đặt và đang chạy
- Kiểm tra username/password trong `application.properties`
- Đảm bảo database `webdientu` đã được tạo

### Lỗi port đã được sử dụng
- Thay đổi port trong `application.properties`: `server.port=8081`
- Hoặc dừng ứng dụng đang sử dụng port đó

### Lỗi dependencies
- Backend: `mvn clean install` để tải lại dependencies
- Frontend: Xóa `node_modules` và `package-lock.json`, sau đó chạy lại `npm install`

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 License

Dự án này được phát triển cho mục đích học tập và thương mại.

---

**Tác giả:** DatPhan1993  
**Repository:** https://github.com/DatPhan1993/webdientu

