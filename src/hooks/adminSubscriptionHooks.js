import { axiosInstance } from "@/libs/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useGetSubscriptionPlans = () => {
    return useQuery({
        queryKey: ["subscription-plans"],
        queryFn: async () => {
            const { data } = await axiosInstance.get("/subscription/getPlan");
            return data.plans;
        },
    });
};

export const useCreateSubscriptionPlan = () => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (planData) => {
            const { data } = await axiosInstance.post(
                "/subscription/createPlan",
                planData
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
        },
    });
};

export const useEditSubscriptionPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, planData }) => {
            const { data } = await axiosInstance.put(
                `/subscription/editPlan/${id}`,
                planData
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
        },
    });
};

export const useDeleteSubscriptionPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosInstance.delete(
                `/subscription/deletePlan/${id}`
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
        },
    });
};

export const useToggleSubscriptionPlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (plan) => {
            const { data } = await axiosInstance.put(
                `/subscription/editPlan/${plan.subscription_id}`,
                {
                    ...plan,
                    isActive: plan.isActive === 1 ? 0 : 1,
                }
            );
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subscription-plans"] });
        },
    });
};
