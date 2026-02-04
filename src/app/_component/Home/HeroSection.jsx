"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative container mx-auto px-6 py-24 md:py-32 text-center">


      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-Button opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <span className="inline-block py-1 px-3 rounded-full bg-[#1e293b] border border-[#386bed]/30 text-Button text-sm font-semibold mb-6">
          🚀 AI-Powered Interview Coach
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Ace Your Next Job Interview <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#386bed] to-[#60a5fa]">
            with Confidence
          </span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#94A3B8] leading-relaxed">
          Practice with our intelligent AI coach, receive instant personalized
          feedback, and improve your speaking skills. Turn interview anxiety
          into your greatest strength.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="bg-Button hover:bg-Button  text-white px-8 py-6 text-lg rounded-full shadow-lg hover:border-Primary transition-all hover:scale-105"
            onClick={() => router.push('/dashboard')}


          >
            Start Mock Interview
          </Button>

          {/* <Button
            variant="outline"
            size="lg"
            className="bg-Button text-white px-8 py-6 hover:bg-Primary hover:text-white text-lg rounded-full transition-all border-none hover:scale-105 shadow-lg shadow-blue-900/10"
          >
           Analyze Your Resume
          </Button> */}
        </div>
      </motion.div>
    </section>
  );
}