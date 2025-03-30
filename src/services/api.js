import axios from 'axios';

// Tạo instance của axios với cấu hình mặc định
const API_BASE_URL = 'http://localhost:8000/api/v1'; // Thay đổi URL này thành API endpoint thật của bạn

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Storage để tránh lặp lại các yêu cầu xác thực 
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Interceptor để xử lý việc thêm token xác thực vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý phản hồi và lỗi
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Kiểm tra lỗi 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.error('Authentication error:', error.response);
      
      // Xử lý lỗi xác thực - đăng xuất người dùng
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      
      // Nếu không phải request login, chuyển hướng đến trang đăng nhập
      if (!originalRequest.url.includes('/auth/login')) {
        // Tránh vòng lặp chuyển hướng
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          
          // Chuyển hướng đến trang đăng nhập
          window.location.href = '/login';
        }
      }
    }
    
    // Xử lý lỗi mạng
    if (!error.response) {
      console.error('Network error:', error);
    }
    
    // Các lỗi khác
    return Promise.reject(error);
  }
);

export default apiClient; 