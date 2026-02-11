import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/libs/axios';
import toast from 'react-hot-toast';


export const useGetActiveSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['active-subscription-plans'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/subscription/getActivePlans');
      return data.plans;
    },
  });
};


export const useGetUserSubscription = (userId) => {
  return useQuery({
    queryKey: ['user-subscription', userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/subscription/user/${userId}`);
      return data.subscription;
    },
    enabled: !!userId,
  });
};

// Create subscription order (Razorpay)
export const useCreateSubscriptionOrder = () => {
  return useMutation({
    mutationFn: async ({ user_id, subscription_id }) => {
      const { data } = await axiosInstance.post('/subscription/create', {
        user_id,
        subscription_id,
      });
      return data;
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create order');
    },
  });
};

// Verify payment after Razorpay success
export const useVerifyPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (paymentData) => {
      const { data } = await axiosInstance.post('/subscription/verify-payment', paymentData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user-subscription']);
      toast.success('Subscription activated successfully! 🎉');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Payment verification failed');
    },
  });
};
