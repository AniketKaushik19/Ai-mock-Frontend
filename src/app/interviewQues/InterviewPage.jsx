"use client";

import "regenerator-runtime/runtime";
import React, { useState, useEffect } from "react";
import {
  Lightbulb,
  WebcamIcon,
  Volume2,
  Mic,
  StopCircle,
} from "lucide-react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useGetInterviewDetail } from "@/hooks/interview";
import { useSubmitInterview } from "./_hooks/hooks";
import Loading from "../_component/Loading";
import { useRouter } from "next/navigation";

const InterviewPage = ({ interviewId }) => {
  const [mounted, setMounted] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [webCamEnabled, setWebCamEnabled] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { data, isLoading, isError } = useGetInterviewDetail(interviewId);
  const questions = data?.interview?.questions || [];
  const activeQuestion = questions[activeQuestionIndex];

  const { mutateAsync, isPending } = useSubmitInterview();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (transcript && !isTyping) {
      setUserAnswer(transcript);
    }
  }, [transcript, isTyping]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.onvoiceschanged = () =>
      window.speechSynthesis.getVoices();
  }, []);

  const textToSpeech = (text) => {
    if (!text || typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    utterance.voice =
      voices.find((v) => v.lang === "en-US") || voices[0];
    utterance.rate = 1;
    utterance.pitch = 1.50;

    synth.speak(utterance);
  };

  const saveCurrentAnswer = () => {
    const finalAnswer = userAnswer || transcript || "";

    setAnswers((prev) => {
      const exists = prev.find(
        (a) => a.questionId === activeQuestion.id
      );

      const payload = {
        questionId: activeQuestion.id,
        question: activeQuestion.question,
        answer: finalAnswer,
      };

      if (exists) {
        return prev.map((a) =>
          a.questionId === activeQuestion.id ? payload : a
        );
      }

      return [...prev, payload];
    });
  };

  const saveUserAnswer = () => {
    if (!webCamEnabled) {
      toast.error("Please enable Camera & Microphone first.");
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      saveCurrentAnswer();

      if (!userAnswer && !transcript) {
        toast.warning("No answer recorded.");
      } else {
        toast.success("Answer recorded!");
      }
    } else {
      setIsTyping(false);
      setUserAnswer("");
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    }
  };

  const handleEndInterview = async () => {
    if (listening) SpeechRecognition.stopListening();

    const finalAnswers = questions.map((q) => {
      const existing = answers.find(
        (a) => a.questionId === q.id
      );
      return {
        questionId: q.id,
        answer: existing?.answer || "",
      };
    });

    try {
      const result = await mutateAsync({ interviewId, answers: finalAnswers });
      console.log(result);
      if (result?.message) {
        toast.success("Interview submitted successfully!");
        router.replace(`/feedback/${interviewId}`);

      }


    } catch (err) {
      toast.error("Failed to submit interview");
      console.error(err);
    }
  };

  if (!mounted) return null;

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-10 text-white">
        Speech recognition not supported. Use Chrome.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading interview...
      </div>
    );
  }

  if (isError || !questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        No questions found.
      </div>
    );
  }

  const progress =
    ((activeQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-2 md:px-10  py-10 flex flex-col gap-8">
      <div>
        <div className="flex justify-between bg-[#111827] p-5 rounded-lg">
          <div>
            <h2 className="font-bold text-xl text-Button">
              Mock Interview Session
            </h2>
            <p className="text-sm text-gray-400">
              Question {activeQuestionIndex + 1} of {questions.length}
            </p>
          </div>
        </div>

        {/* Timeline Progress Bar */}
        <div className="relative w-full flex items-center mt-6">
          {questions.map((_, idx) => {
            const isActive = idx === activeQuestionIndex;
            const isCompleted = idx < activeQuestionIndex;

            return (
              <div
                key={idx}
                className="relative flex-1 flex items-center justify-center"
              >
                {/* Point */}
                <div
                  className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${isActive
                      ? "bg-Button text-white scale-110 shadow-lg"
                      : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-600 text-gray-300"}
          `}
                >
                  {idx + 1}
                </div>

                {/* Connector line (only between points) */}
                {idx !== questions.length - 1 && (
                  <div
                    className={`absolute top-1/2 left-1/2 w-full h-1 -translate-y-1/2 transition-all
              ${isCompleted ? "bg-green-500" : "bg-gray-700"}
            `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 overflow-x-hidden justify-center">
        <div className="">
          <div className="bg-[#111827] p-6 rounded-xl">
            <Volume2
              className="cursor-pointer text-Button"
              onClick={() =>
                textToSpeech(activeQuestion.question)
              }
            />

            <h2 className="text-xl font-semibold mt-3">
              {activeQuestion.question}
            </h2>

            <div className="mt-6 bg-gray-900/50 p-4 rounded-lg">
              <h3 className="text-xs text-gray-500 uppercase font-bold mb-2">
                Your Answer (Speak or Type)
              </h3>

              <textarea
                value={userAnswer}
                onChange={(e) => {
                  setIsTyping(true);
                  setUserAnswer(e.target.value);
                  if (listening)
                    SpeechRecognition.stopListening();
                }}
                onBlur={() => setIsTyping(false)}
                placeholder={
                  listening
                    ? "Listening..."
                    : "Type your answer or record..."
                }
                className="w-full min-h-[100px] bg-transparent text-gray-300 resize-none outline-none"
              />
            </div>
          </div>

          <div className="mt-4 bg-blue-500/10 p-4 rounded-xl flex gap-2">
            <Lightbulb />
            <p className="text-sm">
              Speak clearly or edit your response by typing.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-[#111827] p-1 rounded-xl h-[350px] flex items-center justify-center">
            {webCamEnabled ? (
              <Webcam
                mirrored
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{
                  height: 350,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <button
                onClick={() => setWebCamEnabled(true)}
                className="bg-white/10 px-6 py-3 rounded-lg"
              >
                Enable Camera
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {/* Previous Button */}
            {activeQuestionIndex > 0 && (
              <button
                onClick={() => {
                  if (listening) SpeechRecognition.stopListening();
                  saveCurrentAnswer();

                  const prev = activeQuestionIndex - 1;
                  setActiveQuestionIndex(prev);

                  const prevAnswer = answers.find(
                    (a) => a.questionId === questions[prev].id
                  );
                  setUserAnswer(prevAnswer?.answer || "");
                  resetTranscript();
                }}
                className="bg-[#111827] border border-white/10 px-6 rounded-lg"
              >
                Previous
              </button>
            )}

            {/* Record / Stop Button */}
            <button
              onClick={saveUserAnswer}
              className={`flex-1 py-3 rounded-lg font-bold p-2 flex justify-center gap-2 ${listening ? "bg-red-500 animate-pulse" : "bg-Button"
                }`}
            >
              {listening ? (
                <>
                  <StopCircle /> Stop
                </>
              ) : (
                <>
                  <Mic /> Record
                </>
              )}
            </button>

            {/* Next or End Interview Button */}
            {activeQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleEndInterview}
                disabled={isPending}
                className="bg-red-500/10 border border-red-500 px-4 rounded-lg"
              >
                {isPending ? <Loading /> : "End Interview"}
              </button>
            ) : (
              <button
                onClick={() => {
                  if (listening) SpeechRecognition.stopListening();
                  saveCurrentAnswer();

                  const next = activeQuestionIndex + 1;
                  setActiveQuestionIndex(next);

                  const nextAnswer = answers.find(
                    (a) => a.questionId === questions[next].id
                  );
                  setUserAnswer(nextAnswer?.answer || "");
                  resetTranscript();
                }}
                className="bg-[#111827] border border-white/10 px-6 rounded-lg"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;

