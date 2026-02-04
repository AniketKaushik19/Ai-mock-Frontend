'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import CreateInterviewModal from './CreateInterviewModal';
import useAuthStore from '../../../../store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddNewInterview() {
    const [open, setOpen] = useState(false);
    const { interviewLimit } = useAuthStore();
    const router = useRouter();

    const handleClick = () => {
        // Check if user has reached their interview limit
        if (interviewLimit?.remaining === 0 || interviewLimit?.isLimitReached) {
            toast.error("You've reached your interview limit! Please upgrade your subscription.", {
                duration: 4000,
                icon: '🚫',
            });
            // Redirect to subscriptions page after a short delay
            setTimeout(() => {
                router.push('/dashboard/subscriptions');
            }, 1500);
            return;
        }
        setOpen(true);
    };

    const isLimitReached = interviewLimit?.remaining === 0 || interviewLimit?.isLimitReached;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
            >
                <div
                    onClick={handleClick}
                    className={`group border-2 border-dashed rounded-xl h-36 flex items-center justify-center cursor-pointer transition-all duration-300 ${isLimitReached
                            ? 'border-red-500/30 bg-red-500/5 cursor-not-allowed'
                            : 'border-white/20 hover:border-[#4F7DFF] hover:bg-[#4F7DFF]/5'
                        }`}
                >
                    <div className={`flex items-center gap-2 text-lg font-semibold ${isLimitReached
                            ? 'text-red-400'
                            : 'text-[#CBD5E1] group-hover:text-[#4F7DFF]'
                        }`}>
                        <Plus className="h-6 w-6" />
                        {isLimitReached ? 'Interview Limit Reached' : 'Add New Interview'}
                    </div>
                </div>
            </motion.div>

            <CreateInterviewModal open={open} setOpen={setOpen} />
        </>
    );
}
