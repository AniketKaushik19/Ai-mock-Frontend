import { contactUs } from "@/libs/contactApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useContact=()=>{
   return useMutation({
    mutationFn:contactUs,
    onSuccess:(data)=>{
       toast.success("Message sended successfully"); 
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while sending Message");
    }
   })
}