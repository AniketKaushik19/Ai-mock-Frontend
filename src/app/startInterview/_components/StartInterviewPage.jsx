"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Mic,
  MicOff,
  Briefcase,
  Clock,
  Code,
} from "lucide-react";
import { useGetInterviewDetail } from "../_utils/hooks";
import { useRouter } from "next/navigation";
import { capitalize } from "@/utils";

export default  function GetStartedPage({id}) {

  const videoRef = useRef(null);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const streamRef = useRef(null);


const enableDevices = async () => {
  try {
    setLoading(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    streamRef.current = stream;
    setCameraEnabled(true);
    setMicEnabled(true);
  } catch (err) {
    alert("Camera or Microphone permission denied");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (cameraEnabled && videoRef.current && streamRef.current) {
    videoRef.current.srcObject = streamRef.current;
  }
}, [cameraEnabled]);

const isReady = cameraEnabled && micEnabled && !!streamRef.current;

const router = useRouter();
const { data, isLoading ,isError} = useGetInterviewDetail(id);

if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading interview details...
      </div>
    );
  }

  if (isError || !data?.interview) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Interview not found
      </div>
    );
  }

    const {
    jobRole,
    experienceLevel,
    techStack,
    totalQuestions,
  } = data.interview;



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] to-[#020617] text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl"
      >
        <h1 className="text-3xl font-bold mb-2">
          Let's Get Started
        </h1>
        <p className="text-gray-400 mb-6">
          Prepare your environment and begin your mock interview
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 bg-[#111827]/70 backdrop-blur-xl rounded-xl border border-white/10 p-6 space-y-6"
          >
            <div>
              <p className="text-xs text-gray-400 mb-1">
                JOB ROLE / POSITION
              </p>
              <p className="text-lg font-semibold">
                {capitalize(jobRole)}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-2">
                JOB DESCRIPTION / TECH STACK
              </p>
              <div className="flex gap-2 flex-wrap">
               <span
                  
                    className="px-3 py-1 text-sm bg-indigo-500/10 text-indigo-400 rounded-full"
                  >
                    {capitalize(techStack)}
                  </span>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-1">
                JOB EXPERIENCE
              </p>
              <p className="text-lg font-semibold">
                {experienceLevel}+ Years
              </p>
            </div>

            <div className="flex justify-between pt-4 border-t border-white/10 text-gray-300">
              <div className="flex items-center gap-2">
                <Briefcase size={18} />
                <span>{totalQuestions} Questions</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>~45 Minutes</span>
              </div>

              <div className="flex items-center gap-2">
                <Code size={18} />
                <span>Live Coding</span>
              </div>
            </div>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0F172A]/80 rounded-xl border border-white/10 p-4 flex flex-col items-center justify-center"
          >
            {cameraEnabled ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="rounded-lg w-full h-56 object-cover"
              />
            ) : (
              <>
                <Camera size={36} className="text-indigo-400 mb-2" />
                <p className="font-medium">Camera Preview</p>
                <p className="text-sm text-gray-400 text-center">
                 Enable camera to see preview
                </p>
              </>
            )}

            <div className="flex gap-3 mt-4">
              {cameraEnabled && (
                <span className="flex items-center gap-1 text-sm text-green-400">
                  <Camera size={14} /> Camera On
                </span>
              )}
              {micEnabled ? (
                <span className="flex items-center gap-1 text-sm text-green-400">
                  <Mic size={14} /> Mic On
                </span>
              ) : (
                <span className="flex items-center gap-1 text-sm text-red-400">
                  <MicOff size={14} /> Mic Off
                </span>
              )}
            
            </div>
          </motion.div>
         
        </div>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
  className="flex justify-end mt-6"
>
  {!isReady ? (
    <button
      onClick={enableDevices}
      disabled={loading}
      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-60"
    >
      {loading ? "Enabling..." : "Enable Web Cam and Microphone"}
    </button>
  ) : (
    <button
      onClick={() => {
        // navigate to interview page
        // router.push(`/interview/${id}`)
        console.log("Start Interview");
      }}
      className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold flex items-center gap-2"
    >
      Start Interview 🚀
    </button>
  )}
</motion.div>

      </motion.div>
    </div>
  );
}
