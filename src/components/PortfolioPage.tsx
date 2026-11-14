"use client";

import React from "react";
import CinematicIntroExperience from "@/components/intro/CinematicIntroExperience";
import MinimalNavbar from "@/components/navigation/MinimalNavbar";
import MainHeroSection from "@/components/hero/MainHeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import JourneySection from "@/components/journey/JourneySection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import ContactSection from "@/components/contact/ContactSection";
import MinimalFooter from "@/components/footer/MinimalFooter";

interface PortfolioPageProps {
  hasProfileImage: boolean;
}

export default function PortfolioPage({ hasProfileImage }: PortfolioPageProps) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#FFFFFF] selection:bg-[#FFFFFF] selection:text-[#050505]">
      {/* Scroll-driven opening: the character looks right, left, then greets the visitor */}
      <CinematicIntroExperience />

      <MinimalNavbar />

      <main id="main-content" className="relative w-full">
        <MainHeroSection />
        <AboutSection hasProfileImage={hasProfileImage} />
        <SkillsSection />
        <JourneySection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <MinimalFooter />
    </div>
  );
}
