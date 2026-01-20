import axios from "axios";
// import { axiosInstance } from "./axios";
const BASE_URL=process.env.NEXT_PUBLIC_BACKEND_URL;

export const signup = async (SignupData) => {
    try {
        const res = await axios.post(`${BASE_URL}signup`, SignupData)
      return res?.data;
    } catch (error) {
      throw  error;
    }
}

export const login = async (loginData) => {
      const res = await axiosInstance.post("login", loginData)
      return res.data;
}
export const logout = async () => {
      const res = await axiosInstance.post("logout",)
      return res.data;
}