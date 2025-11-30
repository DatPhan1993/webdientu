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

### Backend
- **Java**: JDK 11 trở lên
- **MySQL**: 8.0 trở lên
- **Maven**: 3.6+ (hoặc sử dụng Maven Wrapper có sẵn)

### Frontend
- **Node.js**: **v20.0.0 trở lên** (khuyến nghị: v20.x LTS)
- **npm**: **v9.0.0 trở lên** (hoặc **yarn** v1.22+)

> **⚠️ Lưu ý quan trọng:** 
> - **React Router DOM 7.9.6** yêu cầu Node.js >= 20.0.0
> - **ESLint 9.39.1** yêu cầu Node.js `^18.18.0 || ^20.9.0 || >=21.1.0` (không hỗ trợ v19)
> - **Node.js v19.x KHÔNG được hỗ trợ** - vui lòng sử dụng v20.x LTS hoặc v18.18.0+
> - Kiểm tra phiên bản: `node --version` và `npm --version`
> - Nếu sử dụng nvm, file `.nvmrc` đã được cấu hình sẵn với Node.js 20.0.0

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

1. **Kiểm tra phiên bản Node.js và npm:**
   ```bash
   node --version   # Cần >= 20.0.0 (hoặc >= 18.18.0)
   npm --version    # Cần >= 9.0.0
   ```
   
   **⚠️ Lưu ý:** 
   - Node.js v19.x KHÔNG được hỗ trợ do yêu cầu của React Router DOM và ESLint
   - Khuyến nghị sử dụng Node.js v20.x LTS (ổn định nhất)
   - Node.js > 20 có thể gặp một số vấn đề tương thích
   
   **Nếu chưa cài đặt hoặc phiên bản thấp:**
   - Tải Node.js từ: https://nodejs.org/ (khuyến nghị: **LTS version 20.x**)
   - Hoặc sử dụng nvm (Node Version Manager):
     ```bash
     # Cài đặt Node.js 20 LTS
     nvm install 20
     nvm use 20
     
     # Hoặc nếu có file .nvmrc trong project
     cd webdientu_frontend
     nvm use
     ```

2. **Cài đặt dependencies:**

   **Trên Windows (PowerShell hoặc Command Prompt):**
   ```powershell
   cd webdientu_frontend
   npm install
   ```
   
   **Nếu gặp lỗi hoặc npm install không chạy đúng, thử các bước sau:**
   
   a. **Xóa node_modules và package-lock.json (nếu có):**
   ```powershell
   # Xóa thư mục node_modules
   Remove-Item -Recurse -Force node_modules
   
   # Xóa file package-lock.json
   Remove-Item -Force package-lock.json
   ```
   
   b. **Xóa npm cache:**
   ```powershell
   npm cache clean --force
   ```
   
   c. **Cài đặt lại:**
   ```powershell
   npm install
   ```
   
   **Hoặc sử dụng npm ci (clean install):**
   ```powershell
   npm ci
   ```
   
   **Trên Linux/Mac:**
   ```bash
   cd webdientu_frontend
   rm -rf node_modules package-lock.json
   npm cache clean --force
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
- **Node.js**: v20.0.0+ (yêu cầu tối thiểu, không hỗ trợ v19.x)
- **npm**: v9.0.0+ hoặc **yarn**: v1.22+
- **React 19.2.0** - UI Library
- **Vite 4.5.0** - Build tool và dev server
- **React Router DOM 7.9.6** - Routing
- **Axios 1.13.2** - HTTP client
- **Bootstrap 5.3.8** - CSS Framework
- **React Bootstrap 2.10.10** - Bootstrap components cho React
- **React Icons 5.5.0** - Icon library
- **ESLint 9.39.1** - Code linting

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

### Lỗi phiên bản Node.js không đúng

**Vấn đề: Node.js version quá cũ, quá mới, hoặc không tương thích**

**Các lỗi thường gặp:**
- `npm WARN EBADENGINE Unsupported engine` - Phiên bản Node.js không được hỗ trợ
- Node.js v19.x không được hỗ trợ bởi React Router DOM 7.9.6 và ESLint 9.39.1

**Giải pháp:**
1. **Kiểm tra phiên bản hiện tại:**
   ```bash
   node --version
   ```
   **Yêu cầu:** >= 20.0.0 (hoặc >= 18.18.0)
   **Không hỗ trợ:** v19.x
   **Khuyến nghị:** v20.x LTS (ổn định nhất, tránh dùng version > 20)

2. **Cài đặt Node.js đúng phiên bản:**
   - Tải từ: https://nodejs.org/ (khuyến nghị: **LTS version 20.x**)
   - Hoặc sử dụng nvm:
     ```bash
     # Windows (nvm-windows)
     nvm install 20
     nvm use 20
     
     # Linux/Mac
     nvm install 20
     nvm use 20
     ```

3. **Nếu đang dùng Node.js v19.x:**
   ```bash
   # Gỡ cài đặt v19 và cài v20
   nvm uninstall 19.9.0
   nvm install 20
   nvm use 20
   ```

4. **Nếu sử dụng nvm và có file .nvmrc:**
   ```bash
   cd webdientu_frontend
   nvm use  # Tự động sử dụng Node.js 20.0.0 từ file .nvmrc
   ```

### Lỗi npm install trên Windows

**Vấn đề: `npm install` không chạy hoặc chỉ chạy script đầu tiên**

**Giải pháp:**

1. **Xóa node_modules và package-lock.json:**
   ```powershell
   # PowerShell
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   ```
   
   ```cmd
   REM Command Prompt
   rmdir /s /q node_modules
   del package-lock.json
   ```

2. **Xóa npm cache:**
   ```powershell
   npm cache clean --force
   ```

3. **Kiểm tra phiên bản Node.js và npm:**
   ```powershell
   node --version
   npm --version
   ```
   Đảm bảo Node.js >= 16 và npm >= 7

4. **Cài đặt lại với quyền Administrator (nếu cần):**
   - Mở PowerShell/CMD với quyền Administrator
   - Chạy lại `npm install`

5. **Sử dụng npm ci thay vì npm install:**
   ```powershell
   npm ci
   ```
   Lệnh này sẽ cài đặt chính xác theo package-lock.json

6. **Nếu vẫn lỗi, thử cài đặt từng package:**
   ```powershell
   npm install --legacy-peer-deps
   ```

### Lỗi dependencies Backend
- Chạy `mvn clean install` để tải lại dependencies
- Kiểm tra kết nối internet để tải dependencies từ Maven Central

### Lỗi dependencies Frontend (Linux/Mac)
- Xóa `node_modules` và `package-lock.json`:
  ```bash
  rm -rf node_modules package-lock.json
  ```
- Xóa npm cache:
  ```bash
  npm cache clean --force
  ```
- Cài đặt lại:
  ```bash
  npm install
  ```

### Lỗi quyền truy cập (Permission denied)
- **Windows:** Chạy terminal với quyền Administrator
- **Linux/Mac:** Sử dụng `sudo` (không khuyến nghị) hoặc cấu hình npm để không cần sudo:
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  ```

## 👥 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📄 License

Dự án này được phát triển cho mục đích học tập và thương mại.

---

**Tác giả:** DatPhan1993  
**Repository:** https://github.com/DatPhan1993/webdientu

