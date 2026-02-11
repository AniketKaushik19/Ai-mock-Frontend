import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SectionBackground from "@/app/_component/SectionBackground";
import { MotionStagger, MotionItem } from "@/app/_component/MotionWrappers";

const teamMembers = [
    {
        name: " Thakur Abhishek Singh",
        role: "CEO & Founder",
        initials: "AS",
        image: "/image/ceo.png",
        bio: " Founder & CEO - CountryEdu & Abhishek & Company ",
    },
    {
        name: "Ritik Kumar",
        role: "Training & Talent Development Executive",
        initials: "RK",
        image: "/image/hr.jpeg",
        bio: "Training & Talent Development Executive And Data Analyst.",
    },
    {
        name: "Gurusharan Singh",
        role: "Full Stack Developer",
        initials: "GS",
        image: "/image/guru.jpeg",
        bio: "Full Stack Developer with a passion for building scalable web applications.",
    },
    {
        name: "Aniket Kaushik ",
        role: "Full Stack Developer",
        initials: "Ak",
        image: "/image/aniket.jpeg",
        bio: "Full Stack Developer with a passion for building scalable web applications.",
    },
    {
        name: "Satyam Chaubey",
        role: "Full Stack Developer",
        initials: "SM",
        image: "/image/satyam.jpeg",
        bio: "Full-stack Developer with a passion for building scalable web applications.",
    },
    {
        name: "Ritesh Mishra",
        role: "Full Stack Developer",
        initials: "RM",
        image: "/image/riteshimage.jpg",
        bio: "Full Stack Developer with a passion for building scalable web applications.",
    },
];


export function Team() {
    return (
        <section className="relative py-20 bg-[#0B1C2D] text-white overflow-hidden">
            <SectionBackground variant="pulse" />
            
            <div className="relative z-10 container mx-auto px-4">

                {/* Heading */}
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#4F7DFF] mb-6">
                        Meet Our Team
                    </h2>

                    <p className="text-lg text-[#CBD5E1]">
                        We're a diverse group of technologists, educators, and career experts
                        united by our passion for helping people succeed.
                    </p>
                </div>

                {/* Grid */}
                <MotionStagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <MotionItem key={member.name}>
                            <Card
                                className="bg-[#112A46] text-white border border-white/10 rounded-2xl hover:border-[#4F7DFF] hover:shadow-lg hover:shadow-[#4F7DFF]/10 transition h-full"
                            >
                                <CardContent className="pt-8 text-center">

                                    <Avatar className="w-24 h-24 mx-auto mb-4 border border-white/10">
                                        <AvatarImage src={member.image} alt={member.name} />
                                        <AvatarFallback className="bg-[#0B1C2D] text-[#4F7DFF] text-xl font-bold">
                                            {member.initials}
                                        </AvatarFallback>
                                    </Avatar>


                                    <h3 className="text-xl font-semibold mb-1">
                                        {member.name}
                                    </h3>

                                    <p className="text-[#4F7DFF] font-medium mb-3">
                                        {member.role}
                                    </p>

                                    <p className="text-[#CBD5E1] text-sm leading-relaxed">
                                        {member.bio}
                                    </p>

                                </CardContent>
                            </Card>
                        </MotionItem>
                    ))}
                </MotionStagger>

            </div>
        </section>
    );
}
