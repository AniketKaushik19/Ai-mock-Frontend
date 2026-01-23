import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getInterviewDetail } from "./api";

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
