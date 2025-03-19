import apiClient from "./api";

const learnProgressService = {
    getByUserAndLession: async (data)=>{
        const response = await apiClient.post('/progress/user_progress',data)
        return response.data
    }
}

export default learnProgressService