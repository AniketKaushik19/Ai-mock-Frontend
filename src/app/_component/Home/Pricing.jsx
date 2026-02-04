'use client';
import { motion } from "framer-motion";
import { Check, Zap, Loader2 } from "lucide-react";
import Script from "next/script";
import { useGetActiveSubscriptionPlans } from "@/hooks/useSubscription";
import useAuthStore from "../../../../store/authStore";
import { useRouter } from "next/navigation";

export function Pricing() {
    const router = useRouter();
    const { isLoggedIn } = useAuthStore();
    const { data: plans, isLoading } = useGetActiveSubscriptionPlans();

    
    const parseFeatures = (features) => {
        if (!features) return [];
        if (Array.isArray(features)) return features;
        if (typeof features === 'string') {
            try {
                const parsed = JSON.parse(features);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return features.trim() ? [features] : [];
            }
        }
        return [];
    };

    const handleSubscribe = (plan) => {
        if (!isLoggedIn()) {
            // Redirect to login page
            router.push('/login');
        } else {
            // Redirect to dashboard subscriptions page
            router.push('/dashboard/subscriptions');
        }
    };

    return (
        <section
            id="pricing"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1C2D] text-white"
        >
            <div className="max-w-7xl mx-auto">
                {/* Test Mode Banner */}
                {process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_test_') && (
                    <div className="max-w-4xl mx-auto mb-8 bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-4">
                        <div className="flex items-center gap-3 justify-center">
                            <Zap className="size-5 text-yellow-400" />
                            <p className="text-sm text-yellow-200">
                                <strong>Test Mode:</strong> No real payments will be processed
                            </p>
                        </div>
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-xl text-[#CBD5E1] max-w-2xl mx-auto">
                        Choose the plan that fits your interview preparation needs
                    </p>
                </motion.div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="size-12 animate-spin text-[#4F7DFF]" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans?.map((plan, index) => {
                            const features = parseFeatures(plan.features);
                            const isPremium = plan.name.toLowerCase().includes('premium');
                            
                            return (
                                <motion.div
                                    key={plan.subscription_id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative p-8 rounded-2xl border ${
                                        isPremium
                                            ? "border-[#4F7DFF] shadow-xl scale-105"
                                            : "border-white/10 hover:border-[#4F7DFF]/50"
                                    } bg-[#112A46] transition-all`}
                                >
                                    {isPremium && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="bg-[#4F7DFF] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                                                <Zap size={14} />
                                                <span>Most Popular</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                                        <div className="mb-2">
                                            <span className="text-5xl font-bold text-[#4F7DFF]">
                                                {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                                            </span>
                                        </div>

                                        <div className="text-[#CBD5E1]">
                                            {plan.Monthly_limit 
                                                ? `${plan.Monthly_limit} interviews/month` 
                                                : 'Unlimited interviews'}
                                        </div>
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <Check className="w-5 h-5 text-[#4F7DFF] mr-3 flex-shrink-0 mt-0.5" />
                                                <span className="text-[#CBD5E1]">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

                                    <button
                                        className={`w-full py-3 rounded-lg font-semibold transition-all ${
                                            isPremium
                                                ? "bg-[#4F7DFF] text-white hover:bg-[#386bed] shadow-lg"
                                                : "bg-[#0B1C2D] border border-white/10 text-white hover:border-[#4F7DFF]"
                                        }`}
                                        onClick={() => handleSubscribe(plan)}
                                    >
                                        {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center mt-12 text-[#CBD5E1]"
                >
                    All plans include 14-day money-back guarantee • Cancel anytime
                </motion.div>
            </div>
        </section>
    );
}
