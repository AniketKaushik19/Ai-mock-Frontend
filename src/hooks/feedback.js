import { getFeedBack } from "@/libs/feedbackApi";
import { useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast";


export const useFeedback=(id)=>{
    return useQuery({
    queryKey: ['feedback',id],
    queryFn: async()=>await getFeedBack(id), 
    enabled:!!id,
    
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || 'Error while generating Feedback'
      );
    },
  });
}