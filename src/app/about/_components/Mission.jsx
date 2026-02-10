import { Target, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionBackground from "../../_component/Home/SectionBackground";
import { MotionStagger, MotionItem } from "../../_component/Home/MotionWrappers";

export function Mission() {
    return (
        <section className="relative py-20 bg-[#0B1C2D] text-white overflow-hidden">
            <SectionBackground variant="grid" />
            
            <div className="relative z-10 container mx-auto px-4">

                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4F7DFF] mb-6">
                        Our Mission
                    </h2>

                    <p className="text-lg text-[#CBD5E1]">
                        We believe that everyone deserves the opportunity to shine in their
                        job interviews. Our AI-powered platform provides personalized
                        feedback, realistic practice scenarios, and the confidence boost you
                        need to land your dream job.
                    </p>
                </div>

                {/* Cards */}
                <MotionStagger className="grid md:grid-cols-3 gap-8">

                    <MotionItem>
                        <MissionCard
                            icon={<Target className="w-6 h-6 text-[#386bed]" />}
                            title="Personalized Learning"
                            desc="Our AI adapts to your industry, experience level, and target roles to provide tailored interview questions and feedback."
                        />
                    </MotionItem>

                    <MotionItem>
                        <MissionCard
                            icon={<Sparkles className="w-6 h-6 text-[#4F7DFF]" />}
                            title="Real-Time Feedback"
                            desc="Get instant, actionable insights on your responses, body language, and communication skills to continuously improve."
                        />
                    </MotionItem>

                    <MotionItem>
                        <MissionCard
                            icon={<Users className="w-6 h-6 text-[#4F7DFF]" />}
                            title="Accessible to All"
                            desc="We're committed to making high-quality interview preparation accessible to job seekers everywhere, regardless of background."
                        />
                    </MotionItem>

                </MotionStagger>

            </div>
        </section>
    );
}

/* Small Reusable Card */
const MissionCard = ({ icon, title, desc }) => (
    <Card className="bg-[#112A46] border border-white/10 rounded-2xl hover:border-[#4F7DFF] hover:shadow-xl hover:shadow-[#4F7DFF]/10 transition">
        <CardContent className="pt-6">
            <div className="w-12 h-12 bg-[#0B1C2D] border border-white/10 rounded-xl flex items-center justify-center mb-4">
                {icon}
            </div>

            <h3 className="text-xl font-semibold mb-3 text-white">
                {title}
            </h3>

            <p className="text-[#CBD5E1] leading-relaxed">
                {desc}
            </p>
        </CardContent>
    </Card>
);
