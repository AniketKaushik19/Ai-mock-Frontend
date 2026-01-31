import { adminCreate, adminLogin } from "@/libs/adminApi";
import { useMutation } from "@tanstack/react-query";

export const useAdminLogin=()=>{
     return useMutation({
    mutationFn:adminLogin,
    
    onSuccess:(data)=>{
       toast.success("Admin login successfully");
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while login");
    }
   })
}

export const useAdminCreate=()=>{
     return useMutation({
    mutationFn:adminCreate,
    
    onSuccess:(data)=>{
       toast.success("Admin Created successfully");
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while Ccreating Admin");
    }
   })
}