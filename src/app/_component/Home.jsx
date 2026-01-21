'use client';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import {
    FileText,
    Sparkles,
    Clock,
    Lightbulb,
} from 'lucide-react';
const advantage = [


    {
        title: 'Fresh Graduates',
        desc: 'Kickstart your career. Move from the classroom to the boardroom by mastering interview scenarios that make you interview-ready.',
        img: '/image/student.png',
    },
    {
        title: 'Path Switchers',
        desc: 'Pivot with purpose. Master the art of selling your past experience to future employers in a brand new industry.',
        img: '/image/career.png',
    },
    {
        title: 'Global Talent',
        desc: 'Speak without hesitation. Gain the practice you need to sound natural, relaxed, and fully confident in English.',
        img: '/image/non-native.png',
    },
    {
        title: 'Active Candidates',
        desc: 'Ace the interview. Practice high-stakes questions and perfect your pitch to land the job you’ve been waiting for.',
        img: '/image/job-seeker.png',
    },

];

export default function Home() {
    return (
        <main className="bg-[#0B1C2D] text-white">

            {/* ================= HERO SECTION ================= */}
            <section className="container mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Ace Your Next Job Interview with Confidence
                </h1>

                <p className="mt-6 max-w-2xl mx-auto text-lg text-[#CBD5E1]">
                    Practice with our intelligent AI coach, receive instant personalized
                    feedback, and improve your speaking skills. Turn interview anxiety
                    into your greatest strength.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Start Mock Interview
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="ml-2"
                            >
                                →
                            </motion.span>
                        </Button>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            How It Works
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="ml-2"
                            >
                                →
                            </motion.span>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}
            <section className="bg-[#112A46] py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center">
                        From Practice to Hired in 3 Steps
                    </h2>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: 'Choose Your Role',
                                desc: 'Select your target job description, industry, and experience level. Our AI customizes the questions to match your specific career path.',
                            },
                            {
                                title: 'The AI Interview',
                                desc: 'Answer questions in real-time. Our AI listens to your audio (or reads your text), analyzing your tone, keywords, and confidence levels.',
                            },
                            {
                                title: 'Instant Feedback',
                                desc: 'Get a detailed score immediately. Review the correct answers, identify weak spots, and learn exactly what hiring managers are looking for.',
                            },
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="bg-[#0B1C2D] rounded-xl p-6 border border-white/10"
                            >
                                <h3 className="text-xl font-semibold">
                                    {step.title}
                                </h3>
                                <p className="mt-3 text-[#CBD5E1]">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-6">

                {/* Heading */}
                <h2 className="text-4xl font-bold text-center text-[#386bed] my-16">
                    Who Takes Advantage From Our AI Mock Interview Platform?
                </h2>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    {advantage.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">

                            {/* Avatar */}
                            <div className="mb-6">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    width={120}
                                    height={120}
                                    className="mx-auto"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-4">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-white text-sm leading-relaxed max-w-xs">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>

            {/* ================= FEATURES GRID ================= */}
            <section className="container mx-auto px-6 py-20">
                <h2 className="text-3xl font-bold text-center">
                    Why Candidates Choose Us
                </h2>

                <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        {
                            icon: <FileText className="h-8 w-8 text-[#386bed]" />,
                            title: 'Personalized Questions',
                            desc: 'No generic scripts. We generate dynamic questions based on the specific job description you paste.',
                        },
                        {
                            icon: <Sparkles className="h-8 w-8 text-[#386bed]" />,
                            title: 'AI-Powered Rating',
                            desc: 'Receive an unbiased score out of 10 for every answer using advanced LLM analysis.',
                        },
                        {
                            icon: <Clock className="h-8 w-8 text-[#386bed]" />,
                            title: '24/7 Availability',
                            desc: 'Train anytime—late night or early morning—whenever you feel ready.',
                        },
                        {
                            icon: <Lightbulb className="h-8 w-8 text-[#386bed]" />,
                            title: 'Sample Answers',
                            desc: 'See exactly how a top-tier candidate would answer tough questions.',
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-white/10 bg-[#112A46] p-6 text-center hover:border-[#386bed] transition"
                        >
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-[#CBD5E1] text-sm">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= TESTIMONIAL ================= */}
            <section className="bg-[#112A46] py-20">
                <div className="container mx-auto px-6 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold">
                        Trusted by Job Seekers
                    </h2>

                    <blockquote className="mt-8 text-lg italic text-[#CBD5E1]">
                        “I was terrified of technical interviews. After 5 sessions with this AI,
                        I walked into my interview at a top tech firm and realized I had already
                        answered 80% of their questions during practice. I got the job!”
                    </blockquote>

                    <p className="mt-4 font-semibold">
                        — Sarah J., Software Engineer
                    </p>
                </div>
            </section>

            {/* ================= FINAL CTA ================= */}
            <section className="py-24 text-center">
                <h2 className="text-3xl font-bold">
                    Ready to land your dream job?
                </h2>

                <p className="mt-4 text-[#CBD5E1]">
                    Stop guessing and start preparing with data-driven insights.
                </p>

                <div className="mt-6">
                    <Button className="bg-[#386bed] text-white hover:bg-[#274fcf] font-semibold px-8 py-6 text-lg">
                        Start Practicing Now
                    </Button>
                </div>
            </section>

        </main>
    );
}
