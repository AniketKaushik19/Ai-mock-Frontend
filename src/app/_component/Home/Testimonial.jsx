import { Quote } from "lucide-react";
import SectionBackground from "./SectionBackground";
import { MotionScale } from "./MotionWrappers";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "I was terrified of technical interviews. After 5 sessions with this AI, I walked into my interview at a top tech firm and realized I had already answered 80% of their questions during practice. I got the job!",
    name: "Ritesh Mishra",
    role: "Software Engineer @ Countryedu pvt ltd"
  },
  {
    quote: "The personalized feedback was a game changer. It didn't just tell me I was wrong; it explained *why* and gave me a better model answer. Highly recommended for anyone serious about their career.",
    name: "Satyam",
    role: "Software Engineer @ Countryedu pvt ltd"
  },
  {
    quote: "I loved the behavioral question practice. It helped me structure my STAR method stories perfectly. I finally felt confident talking about my weaknesses and strengths.",
    name: "Guru.",
    role: "Backend developer @ Countryedu pvt ltd"
  },
  {
    quote: "It felt like a real interview. The AI's follow-up questions caught me off guard exactly like a real recruiter would. This tool is worth every penny.",
    name: "Aniket",
    role: "Software Engineer @ Countryedu pvt ltd"
  }
];

export default function Testimonial() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000); // Swipes every 4 seconds for readability

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-[#1E293B] py-24 relative overflow-hidden">
      <SectionBackground variant="spotlight" />
      
      {/* Decorative quote mark */}
      <motion.div 
        animate={{ 
            y: [0, -20, 0],
            rotate: [180, 185, 180],
            opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 z-0"
      >
        <Quote className="text-blue-500/20 w-32 h-32 md:w-48 md:h-48" />
      </motion.div>
      
      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <h2 className="text-3xl font-bold mb-10 text-[#60a5fa]">
          Trusted by Job Seekers
        </h2>

        <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                >
                    <blockquote className="text-xl md:text-2xl italic text-white leading-relaxed font-light">
                    "{testimonials[current].quote}"
                    </blockquote>

                    <div className="mt-8 flex flex-col items-center">
                    <div className="w-16 h-1 bg-Button rounded-full mb-4"></div>
                    <p className="font-bold text-white text-lg">{testimonials[current].name}</p>
                    <p className="text-[#94A3B8] text-sm">{testimonials[current].role}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        current === index ? "bg-Button w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                />
            ))}
        </div>

      </div>
    </section>
  );
}