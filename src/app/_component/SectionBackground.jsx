"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SectionBackground({ variant = "grid", className = "" }) {
  const renderVariant = () => {
    switch (variant) {
      case "grid":
        return (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
             <motion.div 
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#3b82f630,transparent)]" 
             />
          </div>
        );
      case "wave":
        return (
           <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: ["-20%", "0%"], rotate: [0, 5, 0] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(56,107,237,0.15)_0%,transparent_60%)]"
              />
           </div>
        );
      case "spotlight":
        return (
           <div className="absolute inset-0 overflow-hidden">
             <motion.div
                animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3], 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[80px] rounded-full"
             />
           </div>
        );
      case "pulse":
        return (
           <div className="absolute inset-0 overflow-hidden">
             <motion.div
                animate={{ 
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full"
             />
             <motion.div
                animate={{ 
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full"
             />
           </div>
        );
      case "orbs":
        return (
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <motion.div
                animate={{ 
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 blur-[80px] rounded-full"
             />
             <motion.div
                animate={{ 
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 blur-[80px] rounded-full"
             />
             <motion.div
                animate={{ 
                    x: [0, 30, 0],
                    y: [0, 50, 0],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-cyan-600/15 blur-[60px] rounded-full"
             />
           </div>
        );
      case "grain":
      default:
        return (
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>
        );
    }
  };

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {renderVariant()}
      {/* Optional Gradient Overlay to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/0 dark:from-slate-950/0 to-transparent" />
    </div>
  );
}
