"use client";

import "regenerator-runtime/runtime";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Lightbulb, WebcamIcon, Volume2, Mic, StopCircle } from "lucide-react";
import Webcam from "react-webcam";
import { toast } from "sonner";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const InterviewPage = ({ params }) => {
  const { interviewId } = use(params);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const questions = [
    {
      id: 1,
      question: "Tell me about yourself and your experience with React.",
    },
    {
      id: 2,
      question: "Explain the difference between useMemo and useCallback.",
    },
    {
      id: 3,
      question: "How do you handle state management in complex applications?",
    },
    { id: 4, question: "What are the different lifecycle methods in React?" },
    { id: 5, question: "Explain the concept of Higher-Order Components." },
  ];

  const activeQuestion = questions[activeQuestionIndex];
  const progress = ((activeQuestionIndex + 1) / questions.length) * 100;

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setUserAnswer(transcript);
    }
  }, [transcript]);

  const saveUserAnswer = async () => {
    if (!webCamEnabled) {
      toast.error(
        "Please enable your Camera and Microphone first to start recording.",
      );
      return;
    }

    if (listening) {
      SpeechRecognition.stopListening();

      const finalAnswer = userAnswer || transcript;

      if (finalAnswer.length < 10) {
        toast.error("Answer too short. Please record again.");
        return;
      }
      toast.success("Answer Recorded Successfully!");
    } else {
      setUserAnswer("");
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }
  };

  if (!isMounted) return null;

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="p-10 text-white">
        Your browser does not support speech recognition. Please use Chrome.
      </div>
    );
  }

  const textToSpeach = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      toast.error("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-10 py-10 flex flex-col gap-8">
      {/* HEADER & PROGRESS */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center bg-[#111827] p-5 rounded-lg border border-white/10 shadow-lg">
          <div>
            <h2 className="font-bold text-xl text-[#386bed]">
              Mock Interview Session
            </h2>
            <h3 className="text-sm text-gray-400">
              Question {activeQuestionIndex + 1} of {questions.length}
            </h3>
          </div>

          {/* ✅ Use 'interviewId' (the unwrapped variable) here */}
          <Link href={`/dashboard`}>
            <button className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm border border-red-500 hover:bg-red-500 hover:text-white transition-all font-semibold">
              End Interview
            </button>
          </Link>
        </div>

        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#386bed] to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* LEFT: Question Area */}
        <div className="flex flex-col gap-5">
          <div className="p-6 bg-[#111827] rounded-xl border border-white/10 shadow-xl min-h-[250px] flex flex-col justify-center">
            <Volume2
              className="h-6 w-6 text-[#386bed] mb-4 cursor-pointer hover:scale-110 transition-transform"
              onClick={() => textToSpeach(activeQuestion?.question)}
            />

            <h2 className="text-xl font-semibold leading-relaxed">
              {activeQuestion?.question}
            </h2>

            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700 min-h-[100px]">
              <h3 className="text-xs text-gray-500 uppercase font-bold mb-2">
                Your Answer:
              </h3>
              <p className="text-sm text-gray-300">
                {userAnswer ||
                  (listening
                    ? "Listening..."
                    : "Click record to start speaking...")}
              </p>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-300 text-sm flex gap-3 items-start">
            <Lightbulb className="h-5 w-5 shrink-0" />
            <p>
              <strong>Note:</strong> Click on the speaker icon to hear the
              question. Make sure your camera is on before recording.
            </p>
          </div>
        </div>

        {/* RIGHT: Camera & Controls */}
        <div className="flex flex-col gap-5">
          <div className="bg-[#111827] p-1 rounded-xl border border-white/10 h-[350px] flex items-center justify-center relative overflow-hidden group shadow-lg">
            {webCamEnabled ? (
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                mirrored={true}
                style={{
                  height: 350,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <div className="text-center">
                <WebcamIcon className="h-20 w-20 text-gray-600 mx-auto mb-4" />
                <button
                  className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all font-semibold border border-white/5"
                  onClick={() => setWebCamEnabled(true)}
                >
                  Enable Camera & Microphone
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2
                    ${
                      listening
                        ? "bg-red-500 text-white hover:bg-red-600 shadow-red-500/20 animate-pulse"
                        : "bg-[#386bed] text-white hover:bg-blue-700 shadow-blue-500/20"
                    } ${!webCamEnabled && "opacity-50 cursor-not-allowed"}`}
              onClick={saveUserAnswer}
            >
              {listening ? (
                <>
                  <StopCircle className="h-5 w-5" /> Stop Recording
                </>
              ) : (
                <>
                  <Mic className="h-5 w-5" /> Record Answer
                </>
              )}
            </button>

            <button
              className="bg-[#111827] border border-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/5 transition-all"
              onClick={() => {
                if (activeQuestionIndex < questions.length - 1) {
                  setActiveQuestionIndex(activeQuestionIndex + 1);
                  setUserAnswer("");
                  resetTranscript();
                } else {
                  toast.info("You have reached the end of the interview!");
                }
              }}
            >
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
