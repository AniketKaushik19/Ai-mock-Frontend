import { resumeAnalyse } from "@/libs/resumeApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useResumeAnalyser = () => {
    return useMutation({
        mutationFn: resumeAnalyse,
        onSuccess: () => {
            toast.success('Analysing Done')},
        onError:(error)=>{
            toast.error(error.message || "Error while Analysing")
        }
        });
}