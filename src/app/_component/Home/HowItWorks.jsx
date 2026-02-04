export default function HowItWorks() {
  const steps = [
    {
      title: "Choose Your Role",
      desc: "Select your target job description, industry, and experience level. Our AI customizes the questions.",
      number: "01"
    },
    {
      title: "The AI Interview",
      desc: "Answer questions in real-time. Our AI listens to your audio, analyzing your tone and confidence.",
      number: "02"
    },
    {
      title: "Instant Feedback",
      desc: "Get a detailed score immediately. Review correct answers and identify weak spots.",
      number: "03"
    },
  ];

  return (
    <section className="bg-[#0F172A] py-24 border-y border-white/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          From Practice to Hired in 3 Steps
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="group relative bg-[#1E293B] rounded-2xl p-8 border border-white/5 hover:border-[#386bed]/50 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute -top-6 left-8 bg-Button text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-xl shadow-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mt-6 mb-3 group-hover:text-[#60a5fa] transition-colors">
                {step.title}
              </h3>
              <p className="text-[#94A3B8] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}