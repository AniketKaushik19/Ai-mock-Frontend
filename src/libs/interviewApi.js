import { axiosInstance } from "./axios";

export const generateQuestion = async (Data) => {
  const res = await axiosInstance.post(`interview/generate`, Data)
  return res.data;
}
export const getAllInterviews = async () => {
  const res = await axiosInstance.get(`interview`)
  return res.data;
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
       const res=await axiosInstance.get(`interview/limit`)
       return res?.data
    } catch (error) {
       throw error
    }
}