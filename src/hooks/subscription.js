import { createPlan } from "@/libs/SubscriptionApi";
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";

// export const useSubscription=(id)=>{
//     return useMutation({
//     queryKey: ['subscription_id',id],
//     queryFn: async()=>await createPlan(id), 
//     enabled:!!id,

//     onError: (error) => {
//       toast.error(
//         error?.response?.data?.message || 'Error while generating Feedback'
//       );
//     },
//   });
// }

export const useCreateSubscription=()=>{
    return useMutation({
         mutationFn:createPlan,
    
    onSuccess:(data)=>{
       toast.success("Subscription Plan Created successfully");
    },
    onError:(error)=>{
      toast.error(error?.response?.data?.message || "Error while Creating Subscription");
    }
    })
}