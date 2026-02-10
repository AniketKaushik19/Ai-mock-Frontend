"use client";

import { useEffect, useState } from "react";
import AnalysisResult from "../_component/AnalysisResult";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import ResumeBackground from "../_component/ResumeBackground";

export default function ResumeAnalysisResultPage() {
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedResult = sessionStorage.getItem("resumeAnalysisResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      router.push("/dashboard/resume-analyzer");
    }
  }, [router]);

  if (!result) return null;

  return (
    <ResumeBackground>
        <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => router.back()}
                className="flex items-center gap-2 mb-6 text-gray-300 hover:text-blue-400 transition-colors z-20 relative"
            >
                <ArrowLeft size={20} /> Back to Upload
            </motion.button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 text-center">
                    Analysis Results
                </h1>
                <AnalysisResult result={result} />
            </motion.div>
        </div>
    </ResumeBackground>
  );
}
