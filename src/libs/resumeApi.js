import { axiosInstance } from "./axios";

export const resumeAnalyse=async (formData) => {
    try {
        const res=await axiosInstance.post(`resume/analyse`,formData)
        return res?.data
    } catch (error) {
        throw error
    }
}