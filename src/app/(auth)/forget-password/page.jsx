"use client";

import { useState, useEffect } from "react";
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
  ArrowRight,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { useForgotOtpResend, useForgotOtpVerify, useForgotPassword, useResetPassword } from "@/hooks/user";
import toast from "react-hot-toast";

const MotionButton = motion(Button);

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutateAsync: forgotPassword, isPending: loading, isError } = useForgotPassword();
  const { mutateAsync: forgotPasswordVerifyOtp, isPending: verifyOtpPending } = useForgotOtpVerify()
  const { mutateAsync: forgotOtpResend, isPending: OtpResendPending } = useForgotOtpResend()
  const { mutateAsync: resetPassword, isPending: OtpresetPending } = useResetPassword()

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    if (step !== 2) return;
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, step]);

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email });
      if (!res) {
        toast.error("Otp not send");
        return;
      }
      if (res.message) {
        setStep(2);
        setTimer(60);
        setCanResend(false);
        setOtp("");
        setIsOtpVerified(false);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      if (!email) {
        return toast.error("Enter a  vaild Email ")
      }
      const res = await forgotOtpResend({ email });
      if (res.message) {
        setTimer(60);
        setCanResend(false);
        setOtp("");
        setIsOtpVerified(false);
      }
    } catch (error) {
      toast.error("Resend failed");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) return;
    try {
      setVerifyingOtp(true);
      const res = await forgotPasswordVerifyOtp({ email, otp })
      if (res.message) {
        setIsOtpVerified(true);
        setVerifyingOtp(false)
        toast.success("OTP Verified");
      }
    } catch {
      toast.error("Invalid OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) return;
    try {
      const res = await resetPassword({ email, newPassword });
      if (res.message) {
        router.push("/login");
      }
    } catch {
      toast.error("Resend failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#111827]/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10"
      >
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-white">
            {step === 1 ? "Forgot Password" : "Verify OTP"}
          </h2>
          <p className="text-sm text-gray-400">
            {step === 1
              ? "Enter your email to receive an OTP"
              : `OTP sent to ${email}`}
          </p>
        </div>

        {step === 1 && (
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
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#386bed] hover:bg-[#2563EB] text-white font-bold rounded-lg flex items-center justify-center disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Send OTP
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  icon={<KeyRound size={18} className="text-gray-400" />}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                  className="text-center tracking-widest"
                />
              </div>
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || verifyingOtp || isOtpVerified}
                className="px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium disabled:opacity-50 flex items-center justify-center"
              >
                {verifyingOtp ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isOtpVerified ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            {!isOtpVerified
              &&
              (<div className="flex justify-between items-center text-sm text-gray-400">
                <span>
                  {canResend
                    ? "Didn't receive OTP?"
                    : `Resend OTP in ${timer}s`}
                </span>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResend || OtpResendPending}
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 disabled:opacity-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Resend
                </button>
              </div>)
            }

            {isOtpVerified && (
              <>
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
              </>
            )}
          </form>
        )}

        {isError && (
          <div className="flex gap-2 mt-4 p-3 text-sm text-red-400 bg-red-500/10 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            Something went wrong
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
      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg flex items-center justify-center disabled:opacity-70"
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
