"use client";

import { motion } from "framer-motion";

export default function ProfileHoverCard({ user }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full right-0 mt-3 w-64 rounded-xl bg-Secondary border border-white/10 shadow-2xl px-4 py-3 z-50"
        >
            <p className="text-white font-semibold text-sm">
                Hello, {user?.name || "User"} 👋
            </p>

            <p className="text-[#CBD5E1] text-xs mt-1 truncate">
                {user?.email || "user@email.com"}
            </p>
        </motion.div>
    );
}
