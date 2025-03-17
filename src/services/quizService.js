import apiClient from './api';

const quizService = {
  // Lấy tất cả bài kiểm tra trong một khóa học
  getCourseQuizzes: async (courseId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/quizzes`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy chi tiết một bài kiểm tra
  getQuizById: async (courseId, quizId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/quizzes/${quizId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy câu hỏi của bài kiểm tra
  getQuizQuestions: async (courseId, quizId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/quizzes/${quizId}/questions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Tạo bài kiểm tra mới (chỉ Admin)
  createQuiz: async (courseId, quizData) => {
    try {
      const response = await apiClient.post(`/courses/${courseId}/quizzes`, quizData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cập nhật bài kiểm tra (chỉ Admin)
  updateQuiz: async (courseId, quizId, quizData) => {
    try {
      const response = await apiClient.put(`/courses/${courseId}/quizzes/${quizId}`, quizData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Thêm câu hỏi vào bài kiểm tra (chỉ Admin)
  addQuizQuestion: async (courseId, quizId, questionData) => {
    try {
      const response = await apiClient.post(
        `/courses/${courseId}/quizzes/${quizId}/questions`,
        questionData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Nộp bài làm của học viên
  submitQuizAnswers: async (courseId, quizId, answerData) => {
    try {
      const response = await apiClient.post(
        `/courses/${courseId}/quizzes/${quizId}/submit`,
        answerData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy kết quả bài kiểm tra của học viên
  getQuizResults: async (courseId, quizId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/quizzes/${quizId}/results`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy tất cả kết quả bài kiểm tra của một học viên trong khóa học
  getAllQuizResults: async (courseId) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}/quizzes/results`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Lấy thống kê kết quả bài kiểm tra của tất cả học viên (chỉ Admin)
  getQuizStatistics: async (courseId, quizId) => {
    try {
      const response = await apiClient.get(`/admin/courses/${courseId}/quizzes/${quizId}/statistics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default quizService; 