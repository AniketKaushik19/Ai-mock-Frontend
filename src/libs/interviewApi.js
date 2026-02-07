import { axiosInstance } from "./axios";

export const generateQuestion = async (Data) => {
   try {
      const res = await axiosInstance.post(`interview/generate`, Data)
      return res?.data;  
   } catch (error) {
      throw error
   }
}
export const getAllInterviews = async () => {
   try {
      const res = await axiosInstance.get(`interview`)
      return res?.data;     
   } catch (error) {
       throw error
   }
}

export const getInterviewDetail = async (id) => {
    try {
       const res = await axiosInstance.get(`interview/interviewDetail/${id}`)
       return res?.data;
    } catch (error) {
       throw error
    }
 }


export const getInterviewLimit =async()=>{
    try {
       const res=await axiosInstance.get(`interview-limit`)
       return res?.data
    } catch (error) {
       throw error
    }
}