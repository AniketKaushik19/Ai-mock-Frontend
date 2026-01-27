import { axiosInstance } from "@/libs/axios";

export const submitInterview = async (id,data) => {
   try {
      const res = await axiosInstance.post(`interview/${id}/feedback`,data);
      return res?.data;
   } catch (error) {
      throw error
   }
}