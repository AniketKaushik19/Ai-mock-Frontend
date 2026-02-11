"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ResumeBackground({ children, showScanningLine = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B0F19]">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A] via-[#0B0F19] to-[#000000]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:30px_30px]" />

        {/* Animated Orbs */}
        <motion.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]"
        />
        <motion.div
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
        />

        {/* Floating "Document" Shapes */}
        {mounted && (
            <>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-white/10 bg-white/5 backdrop-blur-sm rounded-lg"
                        style={{
                            width: Math.random() * 60 + 40 + "px",
                            height: Math.random() * 70 + 50 + "px",
                            top: Math.random() * 100 + "%",
                            left: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, -40, 0],
                            rotate: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </>
        )}

      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Scanning Line Effect - Only visible when analyzing */}
      {showScanningLine && (
            <motion.div
                className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)] z-50 pointer-events-none"
                animate={{
                    top: ["0%", "100%", "0%"],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        )}
    </div>
  );
}
