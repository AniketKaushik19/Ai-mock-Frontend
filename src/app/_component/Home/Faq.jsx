import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SectionBackground from "./SectionBackground";
import { MotionStagger, MotionItem } from "./MotionWrappers";

const faqs = [
    {
        question: "How does the AI mock interview work?",
        answer:
            "Our AI interviewer uses advanced natural language processing to conduct realistic interviews. It asks relevant questions based on your role and industry, evaluates your responses, and provides detailed feedback on your answers, communication style, and areas for improvement.",
    },
    {
        question: "Can I practice for specific roles or industries?",
        answer:
            "Absolutely! You can customize your mock interviews for various roles (software engineer, product manager, designer, etc.) and industries. Our AI adapts questions and evaluation criteria based on your selections.",
    },
    {
        question: "How accurate is the AI feedback?",
        answer:
            "Our AI is trained on thousands of successful interviews and continuously learns from user interactions. It provides feedback comparable to experienced human interviewers, focusing on content quality, communication clarity, and professional presentation.",
    },
    {
        question: "Is my interview data secure and private?",
        answer:
            "Yes, we take privacy seriously. All your practice sessions are encrypted and stored securely. Your data is never shared with third parties, and you can delete your practice history at any time.",
    },
    {
        question: "Can I review my past interviews?",
        answer:
            "Yes! All your mock interviews are recorded and saved in your dashboard. You can review them anytime to track your progress and see how you've improved over time.",
    },
    {
        question: "What if I'm not satisfied with the service?",
        answer:
            "We offer a 14-day money-back guarantee on all paid plans. If you're not completely satisfied, contact our support team for a full refund, no questions asked.",
    },
    {
        question: "Do you offer team or university plans?",
        answer:
            "Yes! We have special pricing for teams, educational institutions, and career centers. Contact our sales team to discuss custom solutions for your organization.",
    },
    {
        question: "How is this different from practicing with a friend?",
        answer:
            "While practicing with friends is helpful, our AI provides consistent, unbiased feedback based on industry standards. It's available 24/7, asks strategic follow-up questions, and gives detailed performance analytics that help you improve faster.",
    },
];

export function Faq() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section
            id="faq"
            className="relative py-20 px-4 sm:px-6 lg:px-8 bg-Primary text-white overflow-hidden"
        >
            <SectionBackground variant="pulse" />
            
            <div className="relative z-10 max-w-4xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl text-[#4F7DFF] sm:text-5xl font-bold mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-[#CBD5E1]">
                        Everything you need to know about AI MockView
                    </p>
                </motion.div>

                <MotionStagger className="space-y-4">
                    {faqs.map((faq, index) => (
                        <MotionItem
                            key={index}
                            className="border border-[#4F7DFF] hover:border-[#4F7DFF] rounded-xl overflow-hidden bg-Secondary"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-Primary transition"
                            >
                                <span className="text-left font-semibold">
                                    {faq.question}
                                </span>

                                <ChevronDown
                                    className={`w-5 h-5 text-[#CBD5E1] transition-transform ${openIndex === index ? "rotate-180 text-[#4F7DFF]" : ""
                                        }`}
                                />
                            </button>

                            {openIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="px-6 py-4 bg-Primary border-t border-white/10"
                                >
                                    <p className="text-[#CBD5E1] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            )}
                        </MotionItem>
                    ))}
                </MotionStagger>
            </div>
        </section>
    );
}
