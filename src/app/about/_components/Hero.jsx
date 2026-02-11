"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionBackground from "@/app/_component/SectionBackground";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1C2D] to-[#112A46] py-20 md:py-32 text-white">
            <SectionBackground variant="orbs" />
            
            <div className="relative z-10 container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                        >
                            Empowering Your{" "}
                            <span className="text-[#4F7DFF]">Interview Success</span> with AI
                        </motion.h1>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-[#CBD5E1] max-w-xl"
                        >
                            We're on a mission to help job seekers ace their interviews through
                            intelligent, personalized mock interview experiences powered by
                            cutting-edge artificial intelligence.
                        </motion.p>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap gap-4"
                        >
                            <StatCard value="50K+" label="Practice Sessions" />
                            <StatCard value="95%" label="Success Rate" />
                            <StatCard value="10K+" label="Happy Users" />
                        </motion.div>
                    </div>

                    {/* Right Image */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#4F7DFF] to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
                        <Image
                            src="/image/ai-poweredmockint.jpg"
                            alt="Professional interview setting"
                            width={1080}
                            height={720}
                            className="relative rounded-2xl shadow-2xl w-full h-auto border border-white/10"
                            priority
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

const StatCard = ({ value, label }) => (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-6 py-4 shadow-lg">
        <div className="text-3xl font-bold text-white">{value}</div>
        <div className="text-sm text-[#CBD5E1]">{label}</div>
    </div>
);
