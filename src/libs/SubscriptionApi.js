import { axiosInstance } from "./axios";

export const createPlan=async (data) => {
    try {
        const res=await axiosInstance.post('/subscription/createPlan' ,data)
    } catch (error) {
        throw error
    }
}
export const deletePlan=async (id) => {
    try {
        const res=await axiosInstance.delete(`/subscription/deletePlan/${id}`)
    } catch (error) {
        throw error
    }
}