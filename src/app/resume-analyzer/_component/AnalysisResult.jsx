"use client";

import { CheckCircle, XCircle, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalysisResult({ result }) {
  if (!result) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      
      {/* Score Card */}
      <motion.div 
        variants={itemVariants}
        className="bg-white/10 dark:bg-black/40 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 dark:border-white/10 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
        
        <div className="text-center md:text-left z-10">
            <h2 className="text-2xl font-bold text-white mb-2">Resume Score</h2>
            <p className="text-gray-300">Based on typical ATS factors</p>
        </div>
        <div className="relative w-32 h-32 flex items-center justify-center z-10">
            <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 128 128">
                <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-gray-700/50"
                />
                <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={351.86}
                    strokeDashoffset={351.86}
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: 351.86 - (351.86 * result.score) / 100 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                    className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]"
                />
            </svg>
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute text-3xl font-bold text-white"
            >
              {result.score}
            </motion.span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <motion.div 
          variants={itemVariants}
          className="bg-green-500/10 backdrop-blur-md border border-green-500/20 rounded-2xl p-6 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-2 mb-4 relative z-10">
                <CheckCircle className="text-green-400" />
                <h3 className="text-lg font-bold text-green-300">Strengths</h3>
            </div>
            <ul className="space-y-3 relative z-10">
                {result.strengths.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-2 text-green-200/90"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 shadow-[0_0_5px_rgba(74,222,128,0.5)]" />
                        {item}
                    </motion.li>
                ))}
            </ul>
        </motion.div>

        {/* Weaknesses */}
        <motion.div 
          variants={itemVariants}
          className="bg-red-500/10 backdrop-blur-md border border-red-500/20 rounded-2xl p-6 relative overflow-hidden"
        >
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-2 mb-4 relative z-10">
                <XCircle className="text-red-400" />
                <h3 className="text-lg font-bold text-red-300">Improvements</h3>
            </div>
            <ul className="space-y-3 relative z-10">
                {result.weaknesses.map((item, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start gap-2 text-red-200/90"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 shadow-[0_0_5px_rgba(248,113,113,0.5)]" />
                        {item}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
      </div>

      {/* Keywords */}
      <motion.div 
        variants={itemVariants}
        className="bg-purple-500/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-purple-500/20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 pointer-events-none" />

        <div className="flex items-center gap-2 mb-4 relative z-10">
            <Target className="text-purple-400" />
            <h3 className="text-lg font-bold text-purple-200">Keywords Detected</h3>
        </div>
        <div className="flex flex-wrap gap-2 relative z-10">
            {result.keywords.map((keyword, index) => (
                <motion.span 
                  key={index} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-200 rounded-full text-sm font-medium hover:bg-purple-500/30 transition-colors cursor-default"
                >
                    {keyword}
                </motion.span>
            ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
