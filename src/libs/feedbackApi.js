import { axiosInstance } from "./axios";

export const getFeedBack=async (id) => {
    try {
        const res=await axiosInstance.get(`interview/${id}/feedback`)
        return res?.data
    } catch (error) {
        throw error
    }
}