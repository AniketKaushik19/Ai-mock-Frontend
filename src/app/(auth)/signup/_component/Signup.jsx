"use client"
import React from 'react'
import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Loader2,
  ArrowRight,
  Eye,
  Lock
} from "lucide-react";
import { SignUpSchema } from "@/utils/validation";
import { useSignup } from "@/hooks/user";
import { useState } from 'react';
const Signup = ({handleChange , formData,setShowOtp ,errors ,setErrors}) => {
      const { mutateAsync:signupUser, isPending } = useSignup(setShowOtp);
       const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center bg-brand-lightBlue px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-brand-blue">
          AIMock<span className="text-brand-orange">.</span>
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <Input
            icon={<User size={18} />}
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          {/* Email */}
          <Input
            icon={<Mail size={18} />}
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          {/* Password */}
          <PasswordInput
            label="Password"
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm Password"
            show={showConfirmPassword}
            toggle={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <button
            disabled={isPending}
            className="w-full py-3 bg-blue-500 text-white rounded-lg flex justify-center"
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Create Account <ArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-blue font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}



function Input({ icon, error, ...props }) {
  return (
    <div>
      <div className="flex items-center border rounded-lg px-3">
        {icon}
        <input {...props} className="w-full py-3 outline-none ml-2" />
      </div>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}

function PasswordInput({
  label,
  show,
  toggle,
  error,
  ...props
}) {
  return (
    <div>
      <div className="flex items-center border rounded-lg px-3 relative">
        <Lock size={18} />
        <input
          type={show ? "text" : "password"}
          {...props}
          className="w-full py-3 outline-none ml-2 pr-10"
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}


export default Signup