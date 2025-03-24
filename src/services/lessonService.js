import apiClient from "./api";

const lessonService = { 
    deleteLesson: async (lessonId) => {
        try {
            const response = await apiClient.delete(`/lessons/${lessonId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
}

export default lessonService;   