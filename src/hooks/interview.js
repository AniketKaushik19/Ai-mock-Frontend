import { profile } from "@/libs/api";
import { generateQuestion, getAllInterviews, getInterviewDetail } from "@/libs/interviewApi"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast";

export const useGenerateQuestion=()=>{
   return useMutation({
    mutationFn:generateQuestion,
    
    onSuccess:(data)=>{
       toast.success("Question generated successfully");
      
       
     
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

export const useGetInterviewDetail = (id) => {
    return useQuery({
      queryKey: ["interviewDetail", id],
      queryFn: () => getInterviewDetail(id),
      enabled: !!id, 
      staleTime: 5 * 60 * 1000, 
  
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
          "Error while fetching interview details"
        );
      },
    });
  };
