import { axiosInstance } from "./axios"

export const adminLogin=async(data)=>{
   try {
      const res=await axiosInstance.post('/admin/login' ,data)
      return res?.data
   } catch (error) {
      throw error
   }
}
export const adminCreate=async(data)=>{
   try {
      const res=await axiosInstance.post('/admin/create' ,data)
      return res?.data
   } catch (error) {
      throw error
   }
}