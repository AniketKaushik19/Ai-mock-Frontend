'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function InterviewCard({ item, variants }) {
    const router = useRouter();

    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#112A46] border border-white/10 rounded-xl p-5 shadow-md hover:shadow-xl hover:shadow-[#4F7DFF]/10 transition-all cursor-pointer flex flex-col"
        >
            <div className="flex-1">
                <h3 className="font-bold text-[#4F7DFF] text-lg">
                    {item.role}
                </h3>
                <p className="text-sm text-[#CBD5E1] mt-1">
                    {item.experience}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Created At: {item.createdAt}
                </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 w-full">
                <Button
                    variant="outline"
                    className="w-full border-white/20 text-[#4F7DFF] hover:bg-white hover:text-[#0B1C2D]"
                    onClick={() => router.push(`/feedback/${item.id}`)}
                >
                    Feedback
                </Button>

                <Button
                    className="w-full bg-[#4F7DFF] hover:bg-[#3A64E0] text-white"
                    onClick={() => router.push(`/interview/${item.id}`)}
                >
                    Start Again
                </Button>
            </div>
        </motion.div>
    );
}

