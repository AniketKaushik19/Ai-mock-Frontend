'use client'
import React from 'react'
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

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
  const questions = [
    {
      question: "Explain the difference between REST and GraphQL.",
      userAnswer:
        "REST uses multiple endpoints while GraphQL uses a single endpoint.",
      correctAnswer:
        "REST has multiple endpoints with fixed responses, while GraphQL uses a single endpoint allowing clients to fetch exactly the data they need.",
      feedback:
        "Good core idea. Mentioning over-fetching and schema flexibility would strengthen your answer.",
      score: 8,
    },
    {
      question: "What is closure in JavaScript?",
      userAnswer:
        "A closure is when a function remembers variables from its outer scope.",
      correctAnswer:
        "A closure is a function that retains access to its lexical scope even after the outer function has finished executing.",
      feedback:
        "Correct definition. You could improve by adding a real-world use case example.",
      score: 7,
    },
  ];

  const totalScore = questions.reduce((acc, q) => acc + q.score, 0);
  const maxScore = questions.length * 10;
  const percentage = (totalScore / maxScore) * 100;

  const getScoreColor = (score) => {
    if (score >= 8) return "bg-emerald-500";
    if (score >= 5) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-[#1e293b] px-4 py-6 sm:px-6 lg:px-8 text-[#386bed]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-5xl space-y-6 sm:space-y-8"
      >
        {/* Overall Score */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl bg-white/90 backdrop-blur border shadow-lg">
            <CardHeader className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                  Interview Feedback
                </CardTitle>

                <Badge className="w-fit bg-blue-600 text-white text-sm sm:text-base">
                  {totalScore} / {maxScore}
                </Badge>
              </div>

              <p className="text-sm text-gray-600">
                AI-evaluated performance summary
              </p>

              <Progress
                value={percentage}
                className="h-2 [&>div]:bg-blue-600"
              />
            </CardHeader>
          </Card>
        </motion.div>

        {/* Question Cards */}
        {questions.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.015 }}
            transition={{ type: "spring", stiffness: 180 }}
          >
            <Card className="rounded-2xl bg-white border shadow-md">
              <CardHeader className="space-y-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
                    Question {index + 1}
                  </CardTitle>

                  <Badge
                    className={`w-fit text-white text-sm ${getScoreColor(
                      item.score
                    )}`}
                  >
                    {item.score} / 10
                  </Badge>
                </div>

                <p className="text-sm sm:text-base text-gray-600">
                  {item.question}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 sm:space-y-5">
                <Separator />

                <section className="space-y-1.5">
                  <h3 className="font-semibold text-blue-600 text-sm sm:text-base">
                    Your Answer
                  </h3>
                  <p className="rounded-xl bg-slate-100 p-3 sm:p-4 text-sm sm:text-base text-gray-800">
                    {item.userAnswer}
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h3 className="font-semibold text-emerald-600 text-sm sm:text-base">
                    Correct Answer
                  </h3>
                  <p className="rounded-xl bg-slate-100 p-3 sm:p-4 text-sm sm:text-base text-gray-800">
                    {item.correctAnswer}
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h3 className="font-semibold text-fuchsia-600 text-sm sm:text-base">
                    AI Feedback
                  </h3>
                  <p className="rounded-xl bg-slate-100 p-3 sm:p-4 text-sm sm:text-base text-gray-800">
                    {item.feedback}
                  </p>
                </section>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
