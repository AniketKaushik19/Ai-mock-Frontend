import HeroSection from "./_component/HeroSection";
import HowItWorks from "./_component/HowItWorks";
import TargetAudience from "./_component/TargetAudience";
import FeaturesGrid from "./_component/FeaturesGrid";
import Testimonial from "./_component/Testimonial";
import Navbar from "./_component/Navbar";
import { Button } from "@/components/ui/button";
import  Footer  from "./_component/Footer";

export default function Home() {
  return (
    <main className="bg-[#0B0F19] text-white overflow-hidden">
      <Navbar />

      <HeroSection />
      
      <HowItWorks />
      
      <TargetAudience />
      
      <FeaturesGrid />
      
      <Testimonial />


      {/* ================= FINAL CTA ================= */}
      {/* <section className="py-24 text-center bg-gradient-to-t from-[#0F172A] to-[#0B0F19]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to land your dream job?
          </h2>

          <p className="mt-4 text-[#94A3B8] text-lg">
            Stop guessing and start preparing with data-driven insights.
          </p>

          <div className="mt-8">
            <Button className="bg-[#386bed] text-white hover:bg-[#2563EB] font-bold px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-blue-900/50 transition-all">
              Start Practicing Now
            </Button>
          </div>
        </div>
      </section> */}

      <Footer />

    </main>
  );
}