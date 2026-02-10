import { Heart, Shield, Lightbulb, Zap } from "lucide-react";
import SectionBackground from "../../_component/Home/SectionBackground";
import { MotionStagger, MotionItem } from "../../_component/Home/MotionWrappers";

const values = [
    {
        icon: Heart,
        title: "Empathy First",
        description:
            "We understand the stress of job searching and design our platform with compassion and care.",
    },
    {
        icon: Shield,
        title: "Privacy & Security",
        description:
            "Your data is yours. We maintain the highest standards of privacy and never share your information.",
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description:
            "We continuously improve our AI to provide the most realistic and helpful interview experience.",
    },
    {
        icon: Zap,
        title: "Results-Driven",
        description:
            "Every feature we build is focused on one goal: helping you land your dream job.",
    },
];

export function Values() {
    return (
        <section className="relative py-20 bg-[#0B1C2D] text-white overflow-hidden">
            <SectionBackground variant="wave" />
            
            <div className="relative z-10 container mx-auto px-4">

                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4F7DFF] mb-6">
                        Our Values
                    </h2>

                    <p className="text-lg text-[#CBD5E1]">
                        These principles guide everything we do, from product development to
                        customer support.
                    </p>
                </div>

                {/* Grid */}
                <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value) => (
                        <MotionItem
                            key={value.title}
                            className="text-center bg-[#112A46] border border-white/10 rounded-2xl p-6 hover:border-[#4F7DFF] hover:shadow-lg hover:shadow-[#4F7DFF]/10 transition"
                        >
                            <div className="w-16 h-16 bg-[#0B1C2D] border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <value.icon className="w-8 h-8 text-[#4F7DFF]" />
                            </div>

                            <h3 className="text-xl font-semibold mb-3 text-white">
                                {value.title}
                            </h3>

                            <p className="text-[#CBD5E1] leading-relaxed">
                                {value.description}
                            </p>
                        </MotionItem>
                    ))}
                </MotionStagger>

            </div>
        </section>
    );
}
