import { axiosInstance } from "@/libs/axios"


export const getInterviewDetail = async (id) => {
   try {
      const res = await axiosInstance.get(`interview/interviewDetail/${id}`)
      return res?.data;
   } catch (error) {
      throw error
   }
}