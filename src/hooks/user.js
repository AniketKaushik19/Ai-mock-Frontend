import { useMutation } from "@tanstack/react-query"
import { signup, login, OtpVerify, OtpResend, onboarding } from "../libs/api"
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export const useSignup = (setShowOtp) => {
  return useMutation({
    mutationFn: signup,
    retry: 0,
    onSuccess: (data) => {
      toast.success("Signup Successs!!!")
      console.log(data);
      setShowOtp(true);
    },
    onError: (error) => {
      if (error?.response?.status === 429) {
        toast.error("Too many signup attempts. Please try again later.");
      } else {
        toast.error(error?.response?.data?.message || "Error while Signup");
      }
    }
  });
};

export const uselogin = () => {
  return useMutation({
    mutationFn: async (userData) => login(userData),
    retry: 0,
    onSuccess: (data) => {
      toast.success("Login Successsfully!!!")
      
    },
    onError: (error) => {
      if (error?.response?.status === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else {
        toast.error(error?.response?.data?.message || "Error while Login");
      }
    }
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: OtpVerify,
    onSuccess: () => {
      toast.success("OTP verified successfully");
    },
    onError: (error) => {
      if (error?.response?.status === 429) {
        toast.error("Too many attempts. Try later.");
      } else {
        toast.error(error?.response?.data?.message || "OTP verification failed");
      }
    }
  });
};


export const useResendOtp = (setTimer) => {
  return useMutation({
    mutationFn: OtpResend,
    onSuccess: (data) => {
     toast.success("OTP resent to your email");
    setTimer(60);
    },
    onError: (error) => {
        toast.error(error?.response?.data?.message || "Error while otp resending");
    }
  });
};


export const useOnBoarding=()=>{
   return useMutation({
    mutationFn:onboarding,
    onSuccess:(data)=>{
       toast.success("Onboarding successfully")
     
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while onboarding")
    }
   })
}

