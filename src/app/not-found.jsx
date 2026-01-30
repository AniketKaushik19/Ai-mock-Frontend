"use client";

import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden bg-Secondary dark:bg-gray-900">
      {/* Animated gradient blobs */}
      <motion.div
        className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-30 blur-3xl"
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ repeat: Infinity, duration: 20 }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-3xl"
        animate={{ x: [0, -60, 60, 0], y: [0, 60, -60, 0] }}
        transition={{ repeat: Infinity, duration: 25 }}
      />

      {/* Foreground content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="z-10 flex flex-col items-center mt-20"
      >
        <AlertTriangle className="h-20 w-20 text-red-500" />
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 text-5xl font-bold text-white"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-2 text-lg text-white text-center"
        >
          Oops! The page you’re looking for doesn’t exist.
        </motion.p>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="z-10 mt-8"
      >
        <Link href="/" passHref>
          <Button className="bg-[#4F7DFF] hover:bg-[#3A64E0] flex gap-2 rounded-full">
            <Home className="h-4 w-4" />
            Go back home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}