"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useResendOtp, useVerifyOtp } from "@/hooks/user";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../../../store/authStore";



export default function OtpVerify({formData}) {

  const router=useRouter();
  const [otp, setOtp] = useState(Array(6).fill(""));
  
    const {login}=useAuthStore();
  const [timer, setTimer] = useState(60);
   const { mutateAsync, isPending:loading } = useVerifyOtp();
   const { mutateAsync:sendOtp, isPending:sendOtpLoading } = useResendOtp(setTimer);
  const inputsRef = useRef([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timer === 0) return;

    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    if (otp.join("").length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    try {

      const data={ name: formData.fullName,
        email: formData.email,
        password: formData.password,
       otp: otp.join('')

      }  

      const result=await mutateAsync(data);
    if (!result?.user) {
      throw new Error("Invalid OTP");
    }
    login(result.user);
    router.replace("/onboarding");
 
    } catch {
      toast.error("Invalid OTP");
    } 
  };

  const handleResend = async() => {
    try {
      const data={
        name:formData.fullName,
        email:formData.email,
      }
       await sendOtp(data)
    } catch (error) {
       console.log(error)
    }
    
  };

  return (
    // MAIN DARK BACKGROUND
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B0F19] overflow-hidden px-4">
      
      {/* --- BACKGROUND DECORATION: Ambient Glow --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* --- BACKGROUND DECORATION: RIGHT WAVES --- */}
      <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none opacity-20 z-0">
        <svg className="h-full w-full" viewBox="0 0 400 800" preserveAspectRatio="none">
          <path d="M400,0 C300,200 100,200 100,400 C100,600 300,600 400,800" stroke="white" strokeWidth="1" fill="none" />
          <path d="M420,0 C320,200 120,200 120,400 C120,600 320,600 420,800" stroke="white" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* GLASSMORPHISM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-[#111827]/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10 overflow-hidden"
      >
        {/* GLARE EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-20 flex flex-col items-center">
          {/* Header Icon */}
          <div className="bg-indigo-500/10 p-4 rounded-full mb-6 border border-indigo-500/20 shadow-inner">
            <ShieldCheck className="text-indigo-400" size={32} />
          </div>

          <h2 className="text-2xl font-bold text-white text-center">
            Verify OTP
          </h2>
          <p className="text-sm text-gray-400 text-center mt-2">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-2 mt-8 relative z-20">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-[#0F172A]/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner"
            />
          ))}
        </div>

        {/* Verify Button */}
        <div className="relative z-20 mt-8">
            <button
            disabled={loading}
            onClick={handleVerify}
            className="w-full py-3.5 bg-Button hover:bg-[#2563EB] text-white font-bold rounded-lg shadow-lg  transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
            {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
            ) : (
                <>
                Verify OTP <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
            )}
            </button>
        </div>

        {/* Resend Logic */}
        <div className="mt-6 text-center text-sm text-gray-400 relative z-20">
          {timer > 0 ? (
            <p>
              Resend OTP in <span className="font-semibold text-indigo-400">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-indigo-400 font-bold flex items-center justify-center gap-2 mx-auto hover:text-indigo-300 transition-colors"
            >
              <RefreshCw size={14} /> Resend OTP
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}


