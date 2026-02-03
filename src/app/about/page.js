"use client";

import Hero from "./_components/Hero";
import { Mission } from "./_components/Mission";
import { Team } from "./_components/Team";
import { Values } from "./_components/Values";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0B1C2D] px-0 py-0 text-white">
            <Hero />


            <Mission />

            <Values />

            <Team />
        </div>

    );
}