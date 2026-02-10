'use client';
import HeroSection from "./_component/Home/HeroSection";
import HowItWorks from "./_component/Home/HowItWorks";
import FeaturesGrid from "./_component/Home/FeaturesGrid";
import Testimonial from "./_component/Home/Testimonial";

import Footer from "./_component/Footer";
import { Pricing } from "./_component/Home/Pricing";
import { Faq } from "./_component/Home/Faq";

export default function Home() {
  return (
    <main className="bg-[#0B0F19] text-white overflow-hidden">

      <HeroSection />

      <HowItWorks />

      <Pricing />

      <FeaturesGrid />

      <Testimonial />

      <Faq />



      <Footer />

    </main>
  );
}