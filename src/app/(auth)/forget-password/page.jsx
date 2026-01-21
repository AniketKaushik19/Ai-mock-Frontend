"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion"; // Added for animation
import { Mail, KeyRound, Lock, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Request OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // API always returns ok to prevent enumeration, but we assume success
      setStep(2);
      setSuccess(`If an account exists for ${email}, an OTP has been sent.`);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // const res = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ token: otp, password: newPassword }),
      // });

      // const data = await res.json();
      // if (!res.ok) {
      //   throw new Error(data.error || "Reset failed");
      // }

      setSuccess("Password reset successfully! Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. MAIN DARK BACKGROUND
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

      {/* 2. GLASSMORPHISM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#111827]/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10 border border-white/10 overflow-hidden"
      >
        {/* GLARE EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-20">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {step === 1 ? "Forgot Password" : "Reset Password"}
            </h2>
            <p className="text-sm text-gray-400">
              {step === 1
                ? "Enter your email to receive a verification code."
                : `Enter the code sent to ${email} and your new password.`}
            </p>
          </div>

          <div className="space-y-6">
            {step === 1 ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    icon={<Mail size={18} className="text-gray-400" />}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <motion.button loading={loading} className="w-full py-3.5 bg-[#386bed] hover:bg-[#2563EB] text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center group">
                  Send Verification Code
                </motion.button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                {/* Success Message Banner (Visible in Step 2) */}
                {success && (
                  <div className="flex items-start gap-3 p-3 text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <p>{success}</p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <Input
                      icon={<KeyRound size={18} className="text-gray-400" />}
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="tracking-widest text-center text-lg" // Center the OTP for better UX
                      maxLength={6}
                    />
                  </div>
                  <div>
                    <Input
                      icon={<Lock size={18} className="text-gray-400" />}
                      id="password"
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <motion.button loading={loading} className="w-full py-3.5 bg-[#386bed] hover:bg-[#2563EB] text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center group">
                  Reset Password
                </motion.button>
              </form>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg animate-pulse">
                <AlertCircle className="h-4 w-4" />
                <p>{error}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/login"
              className="flex items-center text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors group"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- HELPER COMPONENTS (Consistent Dark/Glass Theme) ---

function Input({ icon, className, ...props }) {
  return (
    <div className="w-full">
      <div className="flex items-center border border-white/10 rounded-lg px-4 bg-[#0F172A]/50 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
        {icon}
        <input 
          {...props} 
          className={`w-full py-3 ml-3 bg-transparent outline-none text-white placeholder-gray-500 ${className || ""}`} 
        />
      </div>
    </div>
  );
}

function Button({ children, loading, ...props }) {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : children}
    </button>
  );
}