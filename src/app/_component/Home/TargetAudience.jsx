import Image from "next/image";

const advantage = [
  {
    title: "Fresh Graduates",
    desc: "Kickstart your career. Move from the classroom to the boardroom by mastering scenarios.",
    img: "/image/student.png",
  },
  {
    title: "Path Switchers",
    desc: "Pivot with purpose. Master the art of selling your past experience to future employers.",
    img: "/image/career.png",
  },
  {
    title: "Global Talent",
    desc: "Speak without hesitation. Gain the practice you need to sound natural and confident.",
    img: "/image/non-native.png",
  },
  {
    title: "Active Candidates",
    desc: "Ace the interview. Practice high-stakes questions and perfect your pitch.",
    img: "/image/job-seeker.png",
  },
];

export default function TargetAudience() {
  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-Button mb-16">
        Who Benefits From Our AI Platform?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {advantage.map((item, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-white/5 transition-colors duration-300"
          >
            <div className="relative mb-6 w-32 h-32 bg-[#1E293B] rounded-full flex items-center justify-center border border-white/10 shadow-inner">
              <Image
                src={item.img}
                alt={item.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            <h3 className="text-xl font-bold text-white mb-3">
              {item.title}
            </h3>

            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-[250px]">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}