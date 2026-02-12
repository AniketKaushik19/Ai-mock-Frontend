"use client";

import { useState ,useEffect } from "react";
import ResumeUploader from "./_component/ResumeUploader";
import ResumeBackground from "./_component/ResumeBackground";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useResumeAnalyser } from "@/hooks/resume";
import useResumeStore from "../../../store/ResumeStore";
import useAuthStore from "../../../store/authStore";

export default function ResumeAnalyzer() {
  const router = useRouter();
  const {setResume} =useResumeStore();
   const { isLoggedIn } = useAuthStore();

  const { mutateAsync, isPending } = useResumeAnalyser();

    useEffect(() => {
          if (!isLoggedIn()) {
              router.replace('/login');
          };
      }, []);

  const handleAnalyze = async (resume) => {
   
    const formdata=new FormData();
    if(resume.file){
      formdata.append("resume",resume.file);
    }else{
      formdata.append("resume",resume.text);
    }
    
   
    const result=await mutateAsync(formdata);
    console.log(result);
    
   if (result.success && result.analysis
) {
  setResume(result.analysis
);
  router.push("/resume-analyzer/result");
} else {
  console.error("No data returned from API");
}

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
