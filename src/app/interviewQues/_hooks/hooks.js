import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitInterview } from "../_utils/api";

export const useSubmitInterview = () => {
  return useMutation({
    mutationFn: ({ interviewId, answers }) =>
      submitInterview(interviewId, { answers }),

    onSuccess: () => {
      toast.success("Interview submitted successfully");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to submit interview"
      );
    },
  });
};




