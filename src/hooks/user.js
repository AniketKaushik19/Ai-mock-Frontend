import { useMutation } from "@tanstack/react-query"
import { signup, login } from "../libs/api"
import toast from "react-hot-toast";


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
      toast.success("Login Successs!!!")
      console.log(data);
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


