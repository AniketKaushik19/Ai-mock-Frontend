export default function Testimonial() {
  return (
    <section className="bg-[#1E293B] py-24 relative overflow-hidden">
      {/* Decorative quote mark */}
      <div className="absolute top-10 left-10 text-[#386bed]/10 text-9xl font-serif font-bold select-none">
        “
      </div>
      
      <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
        <h2 className="text-3xl font-bold mb-10 text-[#60a5fa]">
          Trusted by Job Seekers
        </h2>

        <blockquote className="text-xl md:text-2xl italic text-white leading-relaxed font-light">
          "I was terrified of technical interviews. After 5 sessions with this
          AI, I walked into my interview at a top tech firm and realized I had
          already answered 80% of their questions during practice. I got the
          job!"
        </blockquote>

        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-1 bg-[#386bed] rounded-full mb-4"></div>
          <p className="font-bold text-white text-lg">Sarah J.</p>
          <p className="text-[#94A3B8] text-sm">Software Engineer @ TechCorp</p>
        </div>
      </div>
    </section>
  );
}