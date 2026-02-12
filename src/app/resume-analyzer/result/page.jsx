"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

import ResumeBackground from "../_component/ResumeBackground";
import AnalysisResult from "../_component/AnalysisResult";
import useResumeStore from "../../../../store/ResumeStore";

export default function ResumeAnalysisResultPage() {
  const router = useRouter();
  const { resume } = useResumeStore();

  // Redirect if no resume analysis data
  useEffect(() => {
    if (!resume) {
      router.replace("/resume-analyzer");
    }
  }, [resume, router]);

  if (!resume) {
    return (
      <ResumeBackground>
        <div className="flex items-center justify-center min-h-screen text-gray-300">
          Loading analysis results…
        </div>
      </ResumeBackground>
    );
  }

  return (
    <ResumeBackground>
      <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/resume-analyzer")}
          className="flex items-center gap-2 mb-6 text-gray-300 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Upload
        </motion.button>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resume Analysis Results
          </h1>

          <AnalysisResult result={resume} />
        </motion.div>
      </div>
    </ResumeBackground>
  );
}
