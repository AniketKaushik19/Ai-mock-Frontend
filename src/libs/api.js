import axios from "axios";
import { axiosInstance } from "./axios";


export const signup = async (SignupData) => {
   try {
      const res = await axiosInstance.post(`signup`, SignupData)
      return res?.data;
   } catch (error) {
      throw error;
   }
}

export const OtpVerify = async (userData) => {
   try {
      const res = await axiosInstance.post('verify-otp', userData)
      return res?.data
   } catch (error) {
      throw error
   }
}
export const OtpResend = async (userData) => {
   try {
      const res = await axiosInstance.post('resend-otp', userData)
      return res?.data
   } catch (error) {
      throw error
   }
}

export const onboarding = async (onboardingData) => {
   try {
      const res = await axiosInstance.post("/onboarding", onboardingData)
      return res?.data
   } catch (error) {
      throw error
   }
}
export const login = async (loginData) => {
   try {
      const res = await axiosInstance.post(`login`, loginData)
      return res?.data;
   } catch (error) {
      throw error
   }
}
export const logout = async () => {
   try {
      const res = await axiosInstance.post(`logout`,)
      return res?.data;
   } catch (error) {
      throw error
   }
}

export const forgotPassword = async (email) => {
   try {
      const res = await axiosInstance.post('forgot-password', email)
      return res?.data
   } catch (error) {
      throw error
   }
}

export const forgotOtpverify = async (userData) => {
   try {
      const res = await axiosInstance.post('forgot-password/verify-otp', userData)
      return res?.data
   } catch (error) {
      throw error
   }
}

export const forgotOtpResend=async(email)=>{
   try {
      const res=await axiosInstance.post('forgot-password/resend',email)
      return res?.data
   } catch (error) {
      throw error
   }
}

export const resetPassword=async (userData) => {
   try{
      const res=await axiosInstance.post("forgot-password/reset",userData)
      return res?.data
   }
   catch(error){
      throw error
   }
}