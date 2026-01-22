"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  KeyRound,
  Lock,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { useForgotPassword } from "@/hooks/user";


const MotionButton = motion(Button);

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutateAsync: forgotPassword, isPending:loading , isError:error } = useForgotPassword();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {   
      const res=await forgotPassword({email})
      console.log(res)
    } catch (err) {
      console.log(err.message || "Reset failed");
    } 
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {   
      const res=await forgotPassword(email)
      console.log(res)
    } catch (err) {
      console.log(err.message || "Reset failed");
    } 
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B0F19] px-4">
      {/* Ambient Glow */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#111827]/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h2>
          <p className="text-sm text-gray-400">
            {step === 1
              ? "Enter your email to receive a verification code."
              : `Enter the code sent to ${email} and your new password.`}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <Input
              icon={<Mail size={18} className="text-gray-400" />}
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

             <button
              disabled={loading}
              className="w-full py-3.5 bg-[#386bed] hover:bg-[#2563EB] text-white font-bold rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
              onClick={handleRequestOtp}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <Input
              icon={<KeyRound size={18} className="text-gray-400" />}
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className="text-center tracking-widest"
            />

            <Input
              icon={<Lock size={18} className="text-gray-400" />}
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <MotionButton
              type="submit"
              loading={loading}
              whileTap={{ scale: 0.97 }}
            >
              Reset Password
            </MotionButton>
          </form>
        )}

        {error && (
          <div className="flex items-center gap-2 mt-4 p-3 text-sm text-red-400 bg-red-500/10 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-gray-400 hover:text-indigo-400"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}


function Input({ icon, className = "", ...props }) {
  return (
    <div className="flex items-center px-4 bg-[#0F172A]/50 border border-white/10 rounded-lg focus-within:ring-2 focus-within:ring-indigo-500/50">
      {icon}
      <input
        {...props}
        className={`w-full py-3 ml-3 bg-transparent outline-none text-white placeholder-gray-500 ${className}`}
      />
    </div>
  );
}

function Button({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg flex items-center justify-center disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}
