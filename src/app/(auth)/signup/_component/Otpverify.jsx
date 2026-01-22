"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useResendOtp, useVerifyOtp } from "@/hooks/user";
import { email, set } from "zod";

export default function OtpVerify({formData}) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  
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
      console.log(data);
      
    await mutateAsync(data);
    
      
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
      >
        <div className="flex flex-col items-center">
          <div className="bg-blue-100 p-3 rounded-full mb-4">
            <ShieldCheck className="text-blue-600" size={28} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Verify OTP
          </h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <div className="flex justify-between gap-2 mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          disabled={loading}
          onClick={handleVerify}
          className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              Verify OTP <ArrowRight size={18} />
            </>
          )}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          {timer > 0 ? (
            <p>
              Resend OTP in <span className="font-semibold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 flex items-center justify-center gap-1 mx-auto hover:underline"
            >
              <RefreshCw size={14} /> Resend OTP
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}


