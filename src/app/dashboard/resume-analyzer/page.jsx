"use client";

import { useState } from "react";
import ResumeUploader from "./_component/ResumeUploader";
import ResumeBackground from "./_component/ResumeBackground";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { analyzeResume } from "./_service/aiService";
import { useRouter } from "next/navigation";
import { useTheme } from "./_context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumeAnalyzer() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const { mutate, isPending } = useMutation({
    mutationFn: analyzeResume,
    onSuccess: (data) => {
      sessionStorage.setItem("resumeAnalysisResult", JSON.stringify(data));
      toast.success("Resume analysis complete! Redirecting...");
      router.push("/dashboard/resume-analyzer/result");
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
      toast.error("Failed to analyze resume. Please try again.");
    }
  });

  const handleAnalyze = (data) => {
    mutate(data);
  };

  return (
    <ResumeBackground showScanningLine={isPending}>
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      
      <div className="flex justify-between items-center mb-10">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Resume Analyzer
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Get instant AI feedback on your resume
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
         className="space-y-8"
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ResumeUploader onAnalyze={handleAnalyze} isAnalyzing={isPending} />
      </motion.div>

    </div>
    </ResumeBackground>
  );
}
