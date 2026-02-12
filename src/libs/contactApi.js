import { axiosInstance } from "./axios"


export const contactUs=async(contactData)=>{
    try {
        const res=await axiosInstance.post("contact",contactData)
        return res?.data
    } catch (error) {
        throw error
    }
}