'use client'
import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useFeedback } from '@/hooks/feedback';
import Loading from '../_component/Loading';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function FeedbackPage({ feedbackId }) {
  const {data , isLoading}=useFeedback(feedbackId);
  if (isLoading) {

    return <div className="min-h-screen flex items-center justify-center bg-Primary">
      <Loading /> 
    </div>  ;
  }
  
  

  
  const questions =data?.questions || [];

 
  

  const totalScore = data?.overallScore;
  const maxScore = questions?.length * 10;
  const percentage = (totalScore / maxScore) * 100;

  const getScoreColor = (score) => {
    if (score >= 8) return "bg-emerald-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-[#0B1C2D] px-4 py-6 sm:px-6 lg:px-8 text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl space-y-6 sm:space-y-8"
      >
        {/* Overall Score */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl bg-[#112A46] border border-white/10 shadow-lg">
            <CardHeader className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white">
                  Interview Feedback
                </CardTitle>

                <Badge className="w-fit bg-[#4F7DFF] text-white text-sm sm:text-base">
                  {totalScore} / {maxScore}
                </Badge>
              </div>

              <p className="text-sm text-[#CBD5E1]">
                AI-evaluated performance summary
              </p>

              <Progress
                value={percentage}
                className="h-2 bg-white/10 [&>div]:bg-[#4F7DFF]"
              />
            </CardHeader>
          </Card>
        </motion.div>

        {/* Question Cards */}
        {questions?.map((item, index) => (
          <div
            key={index}
          >
            <Card className="rounded-2xl bg-[#112A46] border border-white/10 shadow-md">
              <CardHeader className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold text-white">
                    Question {index + 1}
                  </CardTitle>

                  <Badge
                    className={`w-fit text-white text-sm ${getScoreColor(
                      item.score
                    )}`}
                  >
                    {item?.score} / 10
                  </Badge>
                </div>

                <p className="text-sm sm:text-base text-[#CBD5E1]">
                  {item?.question}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-5">
                <Separator className="bg-white/10" />

                <section className="space-y-1.5">
                  <h3 className="font-bold text-[#4F7DFF] text-sm sm:text-base">
                    Your Answer
                  </h3>
                  <p className="rounded-xl bg-[#0B1C2D] p-3 sm:p-4 text-sm sm:text-base text-white border border-[#4F7DFF]">
                    {item?.userAnswer || "User not given any answer."} 
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h3 className="font-bold text-emerald-400 text-sm sm:text-base">
                    Correct Answer
                  </h3>
                  <p className="rounded-xl bg-[#0B1C2D] p-3 sm:p-4 text-sm sm:text-base text-white border border-emerald-400">
                    {item?.correctAnswer}
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h3 className="font-bold text-fuchsia-400 text-sm sm:text-base">
                    AI Feedback
                  </h3>
                  <p className="rounded-xl bg-[#0B1C2D] p-3 sm:p-4 text-sm sm:text-base text-white border border-fuchsia-400">
                    {item?.feedback}
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
