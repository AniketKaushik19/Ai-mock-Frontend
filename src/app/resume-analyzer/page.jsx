"use client";

import { useState } from "react";
import ResumeUploader from "./_component/ResumeUploader";
import ResumeBackground from "./_component/ResumeBackground";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useResumeAnalyser } from "@/hooks/resume";

export default function ResumeAnalyzer() {
  const router = useRouter();

  const { mutateAsync, isPending } = useResumeAnalyser()

  const handleAnalyze = async (resume) => {
    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput.files[0]; // This is your "Aniket CV.pdf"

    const formData = new FormData();
    formData.append("resume", file); // "resume" is the key you want
    console.log(formData);
    
    // Send to backend using fetch
    // fetch("/upload", {
    //   method: "POST",
    //   body: formData
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("Upload success:", data);
    //   })

    // await mutateAsync(resume);
  }
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
