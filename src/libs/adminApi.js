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

export const adminlogout = async () => {
   try {
      const res = await axiosInstance.post(`admin/logout`);
      return res?.data;
   } catch (error) {
      throw error
   }
}

export const  getAllUser=async () => {
   try{
       const res = await axiosInstance.get("admin/getAllUser");
            return res?.data;
   }catch(error){
      throw error
   }
}

export const deleteUser=async (userId) => {
   try {
      const res=await axiosInstance.delete(`admin/deleteUser/${userId}`)
      return res?.data
   } catch (error) {
      throw error 
   }   
}