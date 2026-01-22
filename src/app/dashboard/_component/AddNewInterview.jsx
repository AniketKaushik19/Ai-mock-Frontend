'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import CreateInterviewModal from './CreateInterviewModal';

export default function AddNewInterview() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
            >
                <div
                    onClick={() => setOpen(true)}
                    className="group border-2 border-dashed border-white/20 rounded-xl h-36 flex items-center justify-center cursor-pointer hover:border-[#4F7DFF] hover:bg-[#4F7DFF]/5 transition-all duration-300"
                >
                    <div className="flex items-center gap-2 text-[#CBD5E1] text-lg font-semibold group-hover:text-[#4F7DFF]">
                        <Plus className="h-6 w-6" />
                        Add New Interview
                    </div>
                </div>
            </motion.div>

            <CreateInterviewModal open={open} setOpen={setOpen} />
        </>
    );
}
