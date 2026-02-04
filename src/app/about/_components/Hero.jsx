"use client";

import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1C2D] to-[#112A46] py-20 md:py-32 text-white">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* Left Content */}
                    <div className="space-y-8">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Empowering Your{" "}
                            <span className="text-[#4F7DFF]">Interview Success</span> with AI
                        </h1>

                        <p className="text-lg text-[#CBD5E1] max-w-xl">
                            We're on a mission to help job seekers ace their interviews through
                            intelligent, personalized mock interview experiences powered by
                            cutting-edge artificial intelligence.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <StatCard value="50K+" label="Practice Sessions" />
                            <StatCard value="95%" label="Success Rate" />
                            <StatCard value="10K+" label="Happy Users" />
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <Image
                            src="/image/ai-poweredmockint.jpg"
                            alt="Professional interview setting"
                            width={1080}
                            height={720}
                            className="rounded-2xl shadow-2xl w-full h-auto border border-white/10"
                            priority
                        />
                    </div>

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
