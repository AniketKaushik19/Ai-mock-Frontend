'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { CalendarClock, Briefcase, RefreshCcw, MessageSquare } from 'lucide-react';
import useAuthStore from '../../../../store/authStore';
import toast from 'react-hot-toast';

export default function InterviewCard({ item }) {
  const router = useRouter();
  const { interviewLimit } = useAuthStore();
  const jbrole = item?.job_role?.toUpperCase();

  const handleStartAgain = () => {
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
    router.push(`/startInterview/${item.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(79,125,255,0.25)' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="border border-white/10 rounded-xl p-6 bg-Ternary shadow-md transition-all cursor-pointer flex flex-col"
    >
      {/* Job Role */}
      <div className="flex-1">
        <h3 className="font-bold text-[#4F7DFF] text-xl flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#4F7DFF]" />
          {jbrole}
        </h3>

        {/* Experience */}
        <p className="text-sm text-[#CBD5E1] mt-2 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-400" />
          Experience: {item?.experience_level}
        </p>

        {/* Created At */}
        <p className="text-xs text-gray-400 mt-2 flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-gray-400" />
          Created At:{' '}
          {new Date(item?.created_at).toLocaleString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="mt-6 flex flex-col gap-3 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          variant="outline"
          className="w-full border-white/20 text-[#4F7DFF] hover:bg-white hover:text-primary flex items-center gap-2 transition-all"
          onClick={() => router.push(`/feedback/${item.id}`)}
        >
          <MessageSquare className="w-4 h-4" />
          Feedback
        </Button>

        <Button
          className="w-full bg-[#4F7DFF] hover:bg-[#3A64E0] text-white flex items-center gap-2 transition-all"
          onClick={handleStartAgain}
        >
          <RefreshCcw className="w-4 h-4" />
          Start Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
