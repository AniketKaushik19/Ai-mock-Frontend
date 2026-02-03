'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Shield, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import {
  useGetActiveSubscriptionPlans,
  useGetUserSubscription,
  useCreateSubscriptionOrder,
  useVerifyPayment,
} from '@/hooks/useSubscription';

import useAuthStore from '../../../../store/authStore';

export default function SubscriptionsPage() {
  const router = useRouter();
  const { user, isLoggedIn } = useAuthStore();

  const { data: plans, isLoading } = useGetActiveSubscriptionPlans();
  const { data: currentSubscription } = useGetUserSubscription(user?.id);
  const createOrderMutation = useCreateSubscriptionOrder();
  const verifyPaymentMutation = useVerifyPayment();

  const [processingPlanId, setProcessingPlanId] = useState(null);

  const isTestMode = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_test_');

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
    }
  }, [isLoggedIn, router]);

  const parseFeatures = useCallback((features) => {
    if (!features) return [];
    try {
      return Array.isArray(features) ? features : JSON.parse(features) || [];
    } catch {
      return [];
    }
  }, []);

  const getPlanIcon = useCallback((planName) => {
    const name = planName.toLowerCase();
    if (name.includes('premium')) return Crown;
    if (name.includes('basic')) return Zap;
    return Shield;
  }, []);

  const isCurrentPlan = useCallback(
    (planId) => currentSubscription?.subscription_id === planId,
    [currentSubscription]
  );

  const handleSubscribe = async (plan) => {
    if (!user?.id) {
      toast.error('Please login to subscribe');
      return;
    }

    setProcessingPlanId(plan.subscription_id);

    try {
      const orderData = await createOrderMutation.mutateAsync({
        user_id: user.id,
        subscription_id: plan.subscription_id,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'AI Mock Interview',
        description: `${plan.name} Subscription`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            await verifyPaymentMutation.mutateAsync({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            router.push('/dashboard');
          } catch (err) {
            console.error(err);
            toast.error('Payment verification failed');
          } finally {
            setProcessingPlanId(null);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#4F7DFF',
        },
        modal: {
          ondismiss: function () {
            toast.error('Payment cancelled');
            setProcessingPlanId(null);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to create payment order');
      setProcessingPlanId(null);
    }
  };

  const PlanCard = memo(({ plan, index }) => {
    const Icon = getPlanIcon(plan.name);
    const features = parseFeatures(plan.features);
    const isCurrent = isCurrentPlan(plan.subscription_id);
    const isPremium = plan.name.toLowerCase().includes('premium');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative bg-gradient-to-br ${
          isPremium
            ? 'from-purple-900/20 to-pink-900/20 border-purple-500/50'
            : 'from-slate-900/50 to-slate-800/50 border-slate-700'
        } border rounded-2xl p-8 hover:scale-105 transition-transform duration-300`}
      >
        {isPremium && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
              Most Popular
            </Badge>
          </div>
        )}

        {isCurrent && (
          <div className="absolute -top-4 right-4">
            <Badge className="bg-green-600 text-white">Current Plan</Badge>
          </div>
        )}

        <div
          className={`inline-flex p-3 rounded-lg mb-4 ${
            isPremium ? 'bg-purple-600/20' : 'bg-[#4F7DFF]/20'
          }`}
        >
          <Icon
            className={`size-8 ${isPremium ? 'text-purple-400' : 'text-[#4F7DFF]'}`}
          />
        </div>

        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

        <div className="mb-6">
          <span className="text-4xl font-bold">
            {plan.price === 0 ? 'Free' : `₹${plan.price}`}
          </span>
          {plan.price > 0 && <span className="text-slate-400 ml-2">/month</span>}
        </div>

        {plan.Monthly_limit && (
          <div className="mb-4 bg-slate-800/50 rounded-lg p-3">
            <p className="text-sm text-slate-300">
              <span className="font-semibold text-[#4F7DFF]">{plan.Monthly_limit}</span>{' '}
              interviews per month
            </p>
          </div>
        )}

        <ul className="space-y-3 mb-8">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="size-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => handleSubscribe(plan)}
          disabled={isCurrent || processingPlanId === plan.subscription_id}
          className={`w-full ${
            isPremium
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              : 'bg-[#4F7DFF] hover:bg-[#3D6BE8]'
          } ${isCurrent ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isCurrent ? 'Current Plan' : plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
        </Button>
      </motion.div>
    );
  });

  return (
    <main className="min-h-screen bg-Primary text-white p-4 md:p-10">
     
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

     
      {isTestMode && (
        <div className="max-w-4xl mx-auto mb-6 bg-yellow-900/30 border border-yellow-600/50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-600/20 p-2 rounded-lg">
              <Zap className="size-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="font-semibold text-yellow-300">Test Mode Active</h3>
              <p className="text-sm text-yellow-200/80">
                No real money will be charged. Use test card: 5267 3181 8797 5449
              </p>
            </div>
          </div>
        </div>
      )}

 
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#4F7DFF] mb-4">
          Choose Your Plan
        </h1>
        <p className="text-[#CBD5E1] text-lg">
          Unlock your interview potential with our premium features
        </p>
      </motion.div>

      {currentSubscription && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-600/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-600/20 p-3 rounded-lg">
                <Star className="size-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-green-300">Active Subscription</h3>
                <p className="text-slate-300">{currentSubscription.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Expires on</p>
              <p className="text-slate-200 font-medium">
                {currentSubscription.end_date
                  ? new Date(currentSubscription.end_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="size-8 animate-spin text-[#4F7DFF]" />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {plans?.map((plan, index) => (
            <PlanCard key={plan.subscription_id} plan={plan} index={index} />
          ))}
        </motion.div>
      )}
    </main>
  );
}
