import { useMutation } from "@tanstack/react-query"
import { signup } from "../libs/api"
import toast from "react-hot-toast";


export const useSignup = (setShowOtp) => {
  return useMutation({
     mutationFn: signup,
    onSuccess: (data) => {
      toast.success("Signup Successs!!!")
      console.log(data);
      setShowOtp(true);
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message||"Error while Signup")
    }
  });
};
export const uselogin = () => {
  return useMutation({
    mutationFn: async (userData) =>signup(userData),
    onSuccess: (data) => {
      toast.success("Signup Successs!!!")
      console.log(data);
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message||"Error while Signup")
    }
  });
};

