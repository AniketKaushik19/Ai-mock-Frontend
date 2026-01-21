// "use client"
// import React from 'react'
// import { motion } from "framer-motion";
// import Link from "next/link";
// import {
//   User,
//   Mail,
//   Loader2,
//   ArrowRight,
//   Eye,
//   Lock
// } from "lucide-react";
// import { SignUpSchema } from "@/utils/validation";
// import { useSignup } from "@/hooks/user";
// import { useState } from 'react';
// const Signup = ({handleChange , formData,setShowOtp ,errors ,setErrors}) => {
//       const { mutateAsync:signupUser, isPending } = useSignup(setShowOtp);
//        const [showPassword, setShowPassword] = useState(false);
//         const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isPending) return;

//     const parsed = SignUpSchema.safeParse(formData);

//     if (!parsed.success) {
//       const fieldErrors = parsed.error.formErrors.fieldErrors;
//       setErrors({
//         fullName: fieldErrors.fullName?.[0],
//         email: fieldErrors.email?.[0],
//         password: fieldErrors.password?.[0],
//         confirmPassword: fieldErrors.confirmPassword?.[0],
//       });
//       toast.error("Please fix the highlighted errors.");
//       return;
//     }

//     try {
//       await signupUser({
//         name: formData.fullName,
//         email: formData.email,
//         password: formData.password,
//       });

//     } catch (err) {
//       console.error(err);

//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-brand-lightBlue px-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl"
//       >
//         <h2 className="text-3xl font-bold text-center text-brand-blue">
//           AIMock<span className="text-brand-orange">.</span>
//         </h2>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">

//           <Input
//             icon={<User size={18} />}
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             error={errors.fullName}
//           />

//           {/* Email */}
//           <Input
//             icon={<Mail size={18} />}
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             error={errors.email}
//           />

//           {/* Password */}
//           <PasswordInput
//             label="Password"
//             show={showPassword}
//             toggle={() => setShowPassword(!showPassword)}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             error={errors.password}
//           />

//           {/* Confirm Password */}
//           <PasswordInput
//             label="Confirm Password"
//             show={showConfirmPassword}
//             toggle={() =>
//               setShowConfirmPassword(!showConfirmPassword)
//             }
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             error={errors.confirmPassword}
//           />

//           <button
//             disabled={isPending}
//             className="w-full py-3 bg-blue-500 text-white rounded-lg flex justify-center"
//           >
//             {isPending ? (
//               <Loader2 className="animate-spin" />
//             ) : (
//               <>
//                 Create Account <ArrowRight className="ml-2" />
//               </>
//             )}
//           </button>
//         </form>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link href="/login" className="text-brand-blue font-semibold">
//             Sign in
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   )
// }

// function Input({ icon, error, ...props }) {
//   return (
//     <div>
//       <div className="flex items-center border rounded-lg px-3">
//         {icon}
//         <input {...props} className="w-full py-3 outline-none ml-2" />
//       </div>
//       {error && <p className="text-[10px] text-red-500">{error}</p>}
//     </div>
//   );
// }

// function PasswordInput({
//   label,
//   show,
//   toggle,
//   error,
//   ...props
// }) {
//   return (
//     <div>
//       <div className="flex items-center border rounded-lg px-3 relative">
//         <Lock size={18} />
//         <input
//           type={show ? "text" : "password"}
//           {...props}
//           className="w-full py-3 outline-none ml-2 pr-10"
//         />
//         <button
//           type="button"
//           onClick={toggle}
//           className="absolute right-3"
//         >
//           {show ? <EyeOff /> : <Eye />}
//         </button>
//       </div>
//       {error && <p className="text-[10px] text-red-500">{error}</p>}
//     </div>
//   );
// }

// export default Signup

"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Loader2,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { SignUpSchema } from "@/utils/validation";
import { useSignup } from "@/hooks/user";
import { toast } from "sonner";

const Signup = ({ handleChange, formData, setShowOtp, errors, setErrors }) => {
  const { mutateAsync: signupUser, isPending } = useSignup(setShowOtp);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (isPending) return;

  //   const parsed = SignUpSchema.safeParse(formData);

  //   if (!parsed.success) {
  //     const fieldErrors = parsed.error.formErrors.fieldErrors;
  //     setErrors({
  //       fullName: fieldErrors.fullName?.[0],
  //       email: fieldErrors.email?.[0],
  //       password: fieldErrors.password?.[0],
  //       confirmPassword: fieldErrors.confirmPassword?.[0],
  //     });
  //     toast.error("Please fix the highlighted errors.");
  //     return;
  //   }

  //   try {
  //     await signupUser({
  //       name: formData.fullName,
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isPending) return;

    const parsed = SignUpSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setErrors({
        fullName: fieldErrors.fullName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
      });
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      await signupUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    // 1. MAIN DARK BACKGROUND
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B0F19] overflow-hidden px-4 py-12">
      {/* --- BACKGROUND DECORATION: RIGHT WAVES (Kept existing) --- */}
      <div className="absolute top-0 right-0 h-full w-1/2 pointer-events-none opacity-20 z-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
        >
          <path
            d="M400,0 C300,200 100,200 100,400 C100,600 300,600 400,800"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M420,0 C320,200 120,200 120,400 C120,600 320,600 420,800"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* 2. GLASSMORPHISM CARD WITH GLARE */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        // Updated classes for Glass effect + dark theme
        className="max-w-md w-full bg-[#111827]/70 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10 border border-white/10 overflow-hidden"
      >
        {/* --- THE GLARE EFFECT OVERLAY --- */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-20">
          {" "}
          {/* Content wrapper to sit above glare */}
          <h2 className="text-3xl font-bold text-center text-white">
            AIMock<span className="text-indigo-400">.</span>
          </h2>
          <p className="text-center text-gray-300 mt-2 mb-6">
            Create your account to get started
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              icon={<User size={18} className="text-gray-400" />}
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            <Input
              icon={<Mail size={18} className="text-gray-400" />}
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <PasswordInput
              label="Password"
              placeholder="Create a password"
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <button
              disabled={isPending}
              // Updated button to use Hero Section Gradient
              className="w-full py-3.5 bg-[#386bed] hover:bg-[#2563EB] text-white font-bold rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              {isPending ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Create Account{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          <p className="text-sm text-center mt-6 text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-indigo-400 font-bold hover:text-indigo-300 transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// --- HELPER COMPONENTS (Styled for Dark Glass Theme) ---

function Input({ icon, error, ...props }) {
  return (
    <div className="w-full">
      {/* Updated input container styles for dark mode */}
      <div
        className={`flex items-center border rounded-lg px-4 bg-[#0F172A]/50 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 ${error ? "border-red-500/50 bg-red-500/10" : "border-white/10"}`}
      >
        {icon}
        <input
          {...props}
          // Updated text color for input
          className="w-full py-3 ml-3 bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
}

function PasswordInput({ label, show, toggle, error, ...props }) {
  return (
    <div className="w-full">
      {/* Updated password container styles for dark mode */}
      <div
        className={`flex items-center border rounded-lg px-4 relative bg-[#0F172A]/50 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500 ${error ? "border-red-500/50 bg-red-500/10" : "border-white/10"}`}
      >
        <Lock size={18} className="text-gray-400" />
        <input
          type={show ? "text" : "password"}
          {...props}
          // Updated text color for input
          className="w-full py-3 ml-3 pr-10 bg-transparent outline-none text-white placeholder-gray-400"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 text-gray-400 hover:text-indigo-400 transition-colors"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-400 mt-1 ml-1 font-medium">{error}</p>
      )}
    </div>
  );
}

export default Signup;
