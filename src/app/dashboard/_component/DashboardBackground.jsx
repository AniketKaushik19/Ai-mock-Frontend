"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-[#0B0F19]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

      {/* Floating AI Shapes */}
      <div className="absolute inset-0">
        {/* Circle 1 - Top Left */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />

        {/* Circle 2 - Bottom Right */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-[5%] w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />

         {/* Animated Waves - Center Right */}
         <div className="absolute top-1/4 right-0 w-1/2 h-full pointer-events-none opacity-20">
           <svg className="h-full w-full" viewBox="0 0 400 800" preserveAspectRatio="none">
             <motion.path
               d="M400,0 C300,200 100,200 100,400 C100,600 300,600 400,800"
               animate={{
                 d: [
                   "M400,0 C300,200 100,200 100,400 C100,600 300,600 400,800",
                   "M400,0 C350,200 50,200 50,400 C50,600 350,600 400,800",
                   "M400,0 C300,200 100,200 100,400 C100,600 300,600 400,800",
                 ],
               }}
               transition={{
                 duration: 10,
                 repeat: Infinity,
                 ease: "easeInOut",
               }}
               stroke="#4F7DFF"
               strokeWidth="2"
               fill="none"
             />
             <motion.path
               d="M420,0 C320,200 120,200 120,400 C120,600 320,600 420,800"
               animate={{
                 d: [
                   "M420,0 C320,200 120,200 120,400 C120,600 320,600 420,800",
                   "M420,0 C370,200 70,200 70,400 C70,600 370,600 420,800",
                   "M420,0 C320,200 120,200 120,400 C120,600 320,600 420,800",
                 ],
               }}
               transition={{
                 duration: 12,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: 1,
               }}
               stroke="#4F7DFF"
               strokeWidth="1"
               fill="none"
               strokeDasharray="5,5"
             />
           </svg>
         </div>

         {/* Code lines / Data stream effect - Left */}
         <div className="absolute top-1/4 left-[5%] space-y-2 opacity-10">
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    initial={{ width: "0%" }}
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                    className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full w-32"
                />
            ))}
         </div>

        {/* Floating Nodes/Particles */}
        {mounted && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay" />
    </div>
  );
}
