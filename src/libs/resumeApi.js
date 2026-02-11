import { axiosInstance } from "./axios";

export const resumeAnalyse=async (resume) => {
    try {
        const res=await axiosInstance.post(`resume/analyze`,resume)
        return res?.data
    } catch (error) {
        throw error
    }
}