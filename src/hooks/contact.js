import { contactUs } from "@/libs/contactApi"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
export const useContactUs=()=>{
   return useMutation({
    mutationFn:contactUs,
    onSuccess:(data)=>{
      toast.success("Contact Details Sended Successfully")
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while sending contact detail")
    }
  })
}
