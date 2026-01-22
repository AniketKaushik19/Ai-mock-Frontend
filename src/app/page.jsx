import HeroSection from "./_component/Home/HeroSection";
import HowItWorks from "./_component/Home/HowItWorks";
import TargetAudience from "./_component/Home/TargetAudience";
import FeaturesGrid from "./_component/Home/FeaturesGrid";
import Testimonial from "./_component/Home/Testimonial";

import  Footer  from "./_component/Footer";

export default function Home() {
  return (
    <main className="bg-[#0B0F19] text-white overflow-hidden">

      <HeroSection />
      
      <HowItWorks />
      
      <TargetAudience />
      
      <FeaturesGrid />
      
      <Testimonial />


     
      <Footer />

    </main>
  );
}