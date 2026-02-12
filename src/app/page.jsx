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
      <section id="hero">
        <HeroSection />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="features">
        <FeaturesGrid />
      </section>
      <section id="testimonials">
        <Testimonial />
      </section>
      <section id="faq">
        <Faq />
      </section>

      <Footer />

    </main>
  );
}