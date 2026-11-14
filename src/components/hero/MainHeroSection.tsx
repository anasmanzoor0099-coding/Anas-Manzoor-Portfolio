"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";
import { scrollToSection } from "@/lib/utils";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function MainHeroSection() {
  const mouse = useMousePosition();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-[88vh] w-full bg-[#050505] text-[#FFFFFF] flex items-center overflow-hidden border-t border-[#222222]"
    >
      {/* Subtle Monochrome Ambient Light Movement */}
      <motion.div
        animate={
          reducedMotion
            ? { x: 0, y: 0 }
            : {
                x: mouse.x * 28,
                y: mouse.y * 28,
              }
        }
        transition={{ type: "spring", stiffness: 45, damping: 30 }}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute top-1/4 right-1/4 w-[540px] h-[540px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.045) 0%, rgba(5,5,5,0) 70%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-24 md:py-36">
        <div className="max-w-4xl">
          {/* Minimal Editorial Index Label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs uppercase tracking-[0.26em] text-[#777777] mb-7"
          >
            ANAS MANZOOR — SOFTWARE ENGINEERING PORTFOLIO
          </motion.p>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight leading-[1.06] text-[#FFFFFF] mb-8"
          >
            {portfolioData.hero.heading}
          </motion.h2>

          {/* Supporting Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl text-[#E5E5E5] font-light leading-relaxed max-w-2xl mb-12"
          >
            {portfolioData.hero.description}
          </motion.p>

          {/* Two Functional Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5"
          >
            <button
              type="button"
              onClick={() => scrollToSection(portfolioData.hero.primaryCta.targetId)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFFFFF] text-[#050505] font-mono text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#E5E5E5] transition-all duration-300 focus:outline-none"
            >
              <span>{portfolioData.hero.primaryCta.label}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection(portfolioData.hero.secondaryCta.targetId)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent text-[#FFFFFF] border border-[#222222] hover:border-[#FFFFFF] font-mono text-xs uppercase tracking-[0.22em] transition-all duration-300 focus:outline-none"
            >
              <span>{portfolioData.hero.secondaryCta.label}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
