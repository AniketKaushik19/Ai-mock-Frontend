import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { handlePayment } from "../checkoutButton";
import Script from "next/script";

const plans = [
    {
        name: "Starter",
        price: "Free",
        period: "forever",
        description: "Perfect for getting started",
        features: [
            "5 mock interviews per month",
            "Basic AI feedback",
            "Common interview questions",
            "Text-based responses",
            "Email support",
        ],
        cta: "Start Free",
        popular: false,
    },
    {
        name: "Professional",
        price: "$29",
        period: "per month",
        description: "For serious job seekers",
        features: [
            "Unlimited mock interviews",
            "Advanced AI feedback",
            "Role-specific questions",
            "Video recording & analysis",
            "Performance analytics",
            "Priority support",
            "Resume review",
        ],
        cta: "Start 14-Day Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        description: "For teams and organizations",
        features: [
            "Everything in Professional",
            "Custom question banks",
            "Team analytics dashboard",
            "API access",
            "Dedicated account manager",
            "Custom integrations",
            "SLA guarantee",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section
            id="pricing"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B1C2D] text-white"
        >
            <div className="max-w-7xl mx-auto">

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative p-8 rounded-2xl border ${plan.popular
                                    ? "border-[#4F7DFF] shadow-xl scale-105"
                                    : "border-white/10 hover:border-[#4F7DFF]/50"
                                } bg-[#112A46] transition-all`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="bg-[#4F7DFF] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                                        <Zap size={14} />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-[#CBD5E1] mb-4">{plan.description}</p>

                                <div className="mb-2">
                                    <span className="text-5xl font-bold text-[#4F7DFF]">
                                        {plan.price}
                                    </span>
                                </div>

                                <div className="text-[#CBD5E1]">{plan.period}</div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="w-5 h-5 text-[#4F7DFF] mr-3 flex-shrink-0 mt-0.5" />
                                        <span className="text-[#CBD5E1]">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                           <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

                            <button
                                className={`w-full py-3 rounded-lg font-semibold transition-all ${plan.popular
                                        ? "bg-[#4F7DFF] text-white hover:bg-[#386bed] shadow-lg"
                                        : "bg-[#0B1C2D] border border-white/10 text-white hover:border-[#4F7DFF]"
                                    }`}
                                    onClick={handlePayment}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

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
