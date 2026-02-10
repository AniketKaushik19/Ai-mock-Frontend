import { FileText, Sparkles, Clock, Lightbulb } from "lucide-react";
import SectionBackground from "../SectionBackground";
import { MotionStagger, MotionItem } from "../MotionWrappers";

export default function FeaturesGrid() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-Button" />,
      title: "Personalized Questions",
      desc: "No generic scripts. We generate dynamic questions based on your specific job description.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-Button" />,
      title: "AI-Powered Rating",
      desc: "Receive an unbiased score out of 10 for every answer using advanced LLM analysis.",
    },
    {
      icon: <Clock className="h-8 w-8 text-Button" />,
      title: "24/7 Availability",
      desc: "Train anytime—late night or early morning—whenever you feel ready.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-Button" />,
      title: "Sample Answers",
      desc: "See exactly how a top-tier candidate would answer tough questions.",
    },
  ];

  return (
    <section className="relative container mx-auto px-6 py-24">
      <SectionBackground variant="grid" />
      
      <h2 className="relative z-10 text-3xl font-bold text-center mb-12">
        Why Candidates Choose Us
      </h2>

      <MotionStagger className="relative z-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <MotionItem
            key={i}
            className="rounded-xl border border-white/10 bg-[#0F172A] p-8 text-center hover:border-[#386bed] hover:shadow-[0_0_20px_rgba(56,107,237,0.15)] transition-all duration-300"
          >
            <div className="flex justify-center mb-6 bg-[#1E293B] w-16 h-16 mx-auto items-center rounded-full">
              {feature.icon}
            </div>
            <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              {feature.desc}
            </p>
          </MotionItem>
        ))}
      </MotionStagger>
    </section>
  );
}
