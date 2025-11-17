import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Create axios instance với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token vào mỗi request nếu có
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Services
const api = {
  // Brands
  getAllBrands: () => apiClient.get('/brand'),
  getBrandById: (id) => apiClient.get(`/brand/${id}`),

  // Categories
  getAllCategories: (page = 0, size = 50) => 
    apiClient.get(`/categories?page=${page}&size=${size}`),
  getCategoryById: (id) => apiClient.get(`/categories/${id}`),

  // Products
  getAllProducts: (page = 0, size = 12) => 
    apiClient.get(`/products?page=${page}&size=${size}`),
  getProductById: (id) => apiClient.get(`/products/${id}`),
  getProductsByCategory: (categoryId, page = 0, size = 12) => 
    apiClient.get(`/products/categories/${categoryId}?page=${page}&size=${size}`),
  getProductsByCategoryName: (categoryName, page = 0, size = 12) => 
    apiClient.get(`/products/categoriesByName/${categoryName}?page=${page}&size=${size}`),
  getProductsByBrand: (brandId, page = 0, size = 12) => 
    apiClient.get(`/products/brand/${brandId}?page=${page}&size=${size}`),
  searchProducts: (keyword, page = 0, size = 12) => 
    apiClient.get(`/products?search=${keyword}&page=${page}&size=${size}`),

  // Product Options
  getProductOptions: (productId) => 
    apiClient.get(`/product-options/${productId}`),
  updateProductOption: (optionId, data) =>
    apiClient.put(`/product-options/update/${optionId}`, data),

  // Authentication
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),

  // Shopping Cart (requires authentication)
  getCart: (accountId) => apiClient.get(`/shopcart/${accountId}`),
  // Orders - using current backend shopcart as order source
  getOrders: (accountId) => apiClient.get(`/shopcart/${accountId}`),
  addToCart: (cartData) => apiClient.post('/shopcart', cartData),
  updateCart: (cartData) => apiClient.put('/shopcart', cartData),
  removeFromCart: (cartId) => apiClient.delete(`/shopcart/${cartId}`),

  // Favorite Products (requires authentication)
  getFavorites: (accountId) => apiClient.get(`/product-love/${accountId}`),
  addToFavorites: (favoriteData) => apiClient.post('/product-love', favoriteData),
  removeFromFavorites: (favoriteId) => apiClient.delete(`/product-love/${favoriteId}`),

  // Account (requires authentication)
  getAccountById: (accountId) => apiClient.get(`/account/${accountId}`),
  getAllUsers: () => apiClient.get('/admin/users'), // Admin only
};

export default api;

