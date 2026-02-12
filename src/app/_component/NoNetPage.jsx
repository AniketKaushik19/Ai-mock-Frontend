'use client'

import Lottie from "lottie-react";
import animationData from "../../../public/animations/no_internet_animation.json";

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6">

   
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">

     
        <div className="w-64 mx-auto">
          <Lottie animationData={animationData} loop={true} />
        </div>

        <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Connection Lost
        </h1>

        <p className="text-gray-300 mt-3">
          Your AI interview session needs internet.  
          Please check your connection.
        </p>

        <button
          onClick={() => window.location.reload()}
         className="px-6 py-3 bg-gradient-to-r from-[#4F7DFF] to-purple-600 rounded-lg font-medium hover:from-[#3D6BE8] hover:to-purple-700 transition-all z-50"
        >
          Retry Connection
        </button>

      </div>
    </div>
  );
}
