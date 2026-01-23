'use client';

import { motion } from 'framer-motion';
import InterviewCard from './_component/InterviewCard';
import AddNewInterview from './_component/AddNewInterview';

const interviews = [
    {
        id: 1,
        role: 'Full Stack Frontend Developer',
        experience: '7 Years of Experience',
        createdAt: '05-06-2024',
    },
    {
        id: 2,
        role: 'Backend Java Developer',
        experience: '8 Years of Experience',
        createdAt: '05-06-2024',
    },
    {
        id: 3,
        role: 'Full Stack Angular Developer',
        experience: '3 Years of Experience',
        createdAt: '04-06-2024',
    },
    {
        id: 4,
        role: 'Full Stack Developer',
        experience: '4 Years of Experience',
        createdAt: '03-06-2024',
    },
];

export default function Dashboard() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 120 }
        }
    };

    return (
        <main className="min-h-screen bg-[#0B1C2D] text-white p-4 md:p-10">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold text-[#4F7DFF]">
                    Dashboard
                </h1>
                <p className="text-[#CBD5E1]">
                    Create and start your AI mock interview
                </p>
            </motion.div>

            {/* Add New */}
            <AddNewInterview />

            {/* Previous Interviews */}
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold mb-6"
            >
                Previous Mock Interviews
            </motion.h2>

            {/* Cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {interviews.map((item) => (
                    <InterviewCard
                        key={item.id}
                        item={item}
                        variants={itemVariants}
                    />
                ))}
            </motion.div>

        </main>
    );
}
