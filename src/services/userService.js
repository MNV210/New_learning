import apiClient from './api';

const userService = {
  /**
   * Đăng nhập người dùng
   * @param {Object} credentials 
   * @returns {Promise} Promise với kết quả đăng nhập
   */
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      console.log('API Login response:', response);
      return response;
    } catch (error) {
      console.error('API Login error:', error);
      throw error;
    }
  },

  /**
   * Đăng ký người dùng mới
   * @param {Object} userData 
   * @returns {Promise} Promise với kết quả đăng ký
   */
  register: (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  /**
   * Lấy thông tin người dùng đang đăng nhập
   * @returns {Promise} Promise với thông tin người dùng
   */
  getCurrentUser: () => {
    return apiClient.get('/auth/me');
  },

  /**
   * Cập nhật thông tin người dùng
   * @param {Object} userData 
   * @returns {Promise} Promise với kết quả cập nhật
   */
  updateProfile: (userData) => {
    return apiClient.put('/users/profile', userData);
  },

  /**
   * Đổi mật khẩu người dùng
   * @param {Object} passwordData
   * @returns {Promise} Promise với kết quả đổi mật khẩu
   */
  changePassword: (passwordData) => {
    return apiClient.put('/users/password', passwordData);
  },

  /**
   * Lấy danh sách người dùng (Admin)
   * @param {Object} params Tham số phân trang, lọc
   * @returns {Promise} Promise với danh sách người dùng
   */
  getUsers: (params = {}) => {
    return apiClient.get('/users', { params });
  },

  /**
   * Lấy thông tin người dùng theo ID
   * @param {number} id ID người dùng
   * @returns {Promise} Promise với thông tin người dùng
   */
  getUserById: (id) => {
    return apiClient.get(`/users/${id}`);
  },

  /**
   * Cập nhật thông tin người dùng (Admin)
   * @param {number} id ID người dùng
   * @param {Object} userData Thông tin cập nhật
   * @returns {Promise} Promise với kết quả cập nhật
   */
  updateUser: (id, userData) => {
    return apiClient.put(`/users/${id}`, userData);
  },

  /**
   * Xóa người dùng (Admin)
   * @param {number} id ID người dùng
   * @returns {Promise} Promise với kết quả xóa
   */
  deleteUser: (id) => {
    return apiClient.delete(`/users/${id}`);
  },

  /**
   * Lấy danh sách giảng viên
   * @returns {Promise} Promise với danh sách giảng viên
   */
  getInstructors: () => {
    return apiClient.get('/not_student');
  },

  /**
   * Cập nhật vai trò người dùng (Admin)
   * @param {number} userId ID người dùng
   * @param {Object} roleData Dữ liệu vai trò
   * @returns {Promise} Promise với kết quả cập nhật
   */
  updateUserRole: (userId, roleData) => {
    return apiClient.put(`/users/${userId}/role`, roleData);
  },
};

export default userService; 