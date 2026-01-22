import { generateQuestion, getAllInterviews } from "@/libs/interviewApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGenerateQuestion=()=>{
   return useMutation({
    mutationFn:generateQuestion,
    
    onSuccess:(data)=>{
       toast.success("Question generated successfully");
       console.log(data);
       
     
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while generating questions");
    }
   })
}
export const useGetAllInterviews = () => {
  return useQuery({
    queryKey: ['getAllInterviews'],
    queryFn: getAllInterviews, 
    
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Error while generating questions'
      );
    },
  });
};