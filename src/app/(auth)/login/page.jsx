"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { uselogin } from "@/hooks/user";
import Loading from "@/app/_component/Loading";
import useAuthStore from "../../../../store/authStore";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
   
  const { mutateAsync: loginUser, isPending } = uselogin();
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoggedIn } = useAuthStore();

  const router = useRouter();

  const handleSubmit =async(e) => {

    e.preventDefault();
    try{
       if(!userData.email || !userData.password){
          toast.error("Fill all required field")
          return 
       }
       const data ={
          email:userData.email,
          password:userData.password
       } 
      const res= await loginUser(data)
      if(res.user.id){
        router.replace('/dashboard');
        login(res.user);
        
      }
    }
    catch(error){
       console.log(error)
    }
    console.log("Login attempt:", { userData });
    
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };
   const UserLoggedIn=isLoggedIn();

  useEffect(()=>{
    if(UserLoggedIn){
      router.replace('/dashboard');
    }

  },[UserLoggedIn])

  return (
    // 1. MAIN DARK BACKGROUND
    <div className="min-h-screen relative flex items-center justify-center bg-[#0B0F19] overflow-hidden px-4">
      
      {/* --- BACKGROUND DECORATION: Ambient Hero Glow --- */}
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
        className="w-full max-w-md bg-[#111827]/70 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl relative z-10 border border-white/10 overflow-hidden"
      >
        {/* GLARE EFFECT */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-20">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center text-white mb-8"
          >
            Welcome Back
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <Input
              icon={<Mail size={18} className="text-gray-400" />}
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleOnChange}
              placeholder="Email Address"
              required
            />

            {/* Password Input */}
            <PasswordInput
              icon={<Lock size={18} className="text-gray-400" />}
              id="password"
              name="password"
              value={userData.password}
              onChange={handleOnChange}
              placeholder="Password"
              required
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
            />

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/forget-password")}
                className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-[#386bed] hover:bg-[#2563EB] text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center group"
            >
              {isPending ? <Loading/> :
             <>
             Sign In <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />  
             </>
              }
            </motion.button>
          </form>

          {/* Sign Up Redirect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">Don’t have an account?</p>
            <button
              className="mt-2 text-indigo-400 font-bold hover:text-indigo-300 hover:underline transition-colors"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// --- HELPER COMPONENTS (Identical styling to Signup Page) ---

function Input({ icon, ...props }) {
  return (
    <div className="w-full">
      <div className="flex items-center border border-white/10 rounded-lg px-4 bg-[#0F172A]/50 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
        {icon}
        <input 
          {...props} 
          className="w-full py-3 ml-3 bg-transparent outline-none text-white placeholder-gray-400" 
        />
      </div>
    </div>
  );
}

function PasswordInput({ icon, show, toggle, ...props }) {
  return (
    <div className="w-full">
      <div className="flex items-center border border-white/10 rounded-lg px-4 relative bg-[#0F172A]/50 transition-all focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
        {icon}
        <input
          type={show ? "text" : "password"}
          {...props}
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
    </div>
  );
}

export default LoginPage;