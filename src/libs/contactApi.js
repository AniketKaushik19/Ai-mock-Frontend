import { axiosInstance } from "./axios";

export const contactUs=async(data)=>{
    try {
        const res=await axiosInstance.post('contact',data)
        return res?.data
    } catch (error) {
        
    }
}