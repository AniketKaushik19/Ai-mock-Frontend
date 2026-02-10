"use client";
import React from "react";
import { motion } from "framer-motion";

export default function HeroBackgroundWrapper({ children }) {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 min-h-screen flex flex-col justify-center">

      {/* LAYER: Animated Gradient Blobs */}

      <div className="absolute inset-0 pointer-events-none z-0">
         <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"
        />
        <motion.div
           animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full"
        />
      </div>


       {/* LAYER: Floating Geometric Shapes */}
       <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <FloatingShape 
            className="top-20 left-[10%] border-blue-500/20 w-24 h-24 border-2 rounded-lg"
            delay={0}
          />
           <FloatingShape 
            className="bottom-20 right-[15%] bg-blue-500/10 w-32 h-32 rounded-full"
            delay={2}
          />
          <FloatingShape 
            className="top-40 right-[20%] border-purple-500/20 w-16 h-16 border-2 rotate-45"
            delay={1}
          />
       </div>


      {/* LAYER: Content Wrapper */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

const FloatingShape = ({ className, delay }) => (
  <motion.div
    initial={{ y: 0, rotate: 0, opacity: 0 }}
    animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0], opacity: 1 }}
    transition={{
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: 10, repeat: Infinity, ease: "linear", delay },
      opacity: { duration: 1, delay }
    }}
    className={`absolute ${className}`}
  />
);
