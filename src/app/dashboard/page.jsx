'use client';

import { motion } from 'framer-motion';
import InterviewCard from './_component/InterviewCard';
import AddNewInterview from './_component/AddNewInterview';
import DashboardBackground from './_component/DashboardBackground';
import { useGetAllInterviews, useInterviewLimit } from '@/hooks/interview';
import { useEffect } from 'react';
import useAuthStore from '../../../store/authStore';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const { data: interviewLimitData, isPending } = useInterviewLimit();
    const interviewLimit = interviewLimitData;

    const { setInterviewLimit } = useAuthStore();

    useEffect(() => {
        if (interviewLimit) {
            setInterviewLimit(interviewLimit);
        }
    }, [interviewLimit, setInterviewLimit]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const { data: interviewsData } = useGetAllInterviews();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (!isLoggedIn()) {
            router.replace('/login');
        };
    }, []);

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    return (
        <main className="min-h-screen bg-transparent text-white p-4 md:p-10 relative overflow-hidden">
            <DashboardBackground />
            <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8 flex justify-between items-center flex-wrap gap-4"
                >
                    <span className='font-semibold bg-purple-700 rounded-2xl px-2 m-2  hidden md:block lg:block absolute right-0 top-1'>
                        Remaining interview limit:
                        <span className='text-red-500 font-bold'> {interviewLimit?.remaining ?? 0} </span>
                    </span>
                    <div >
                        <div className='flex w-[90vw] justify-between'>

                            <h1 className="text-3xl font-bold text-[#4F7DFF] ">
                                Dashboard
                            </h1>
                               <span className='font-semibold bg-purple-700 rounded-2xl px-2 m-2 text-[9px]  block md:hidden lg:hidden'>
                        Remaining interview limit:
                        <span className='text-green-500 font-bold text-[11px]'> {interviewLimit?.remaining ?? 0} </span>
                    </span>
                        </div>
                            <p className="text-[#CBD5E1]">
                                Create and start your AI mock interview
                            </p>
                       
                    </div>
                    <motion.a
                        href="/dashboard/subscriptions"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="px-6 py-3 bg-gradient-to-r from-[#4F7DFF] to-purple-600 rounded-lg font-medium hover:from-[#3D6BE8] hover:to-purple-700 transition-all"
                    >
                        View Subscriptions
                    </motion.a>
                </motion.div>

                <AddNewInterview />

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl font-semibold mb-6"
                >
                    Previous Mock Interviews
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {interviewsData?.interviews?.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            item={interview}
                            variants={itemVariants}
                        />
                    ))}
                </motion.div>
            </div>
        </main>
    );
}