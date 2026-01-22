import { axiosInstance } from "./axios";

export const generateQuestion = async (Data) => {
  const res = await axiosInstance.post(`interview/generate`, Data)
  return res.data;
}
export const getAllInterviews = async () => {
  const res = await axiosInstance.get(`interview`)
  return res.data;
}

