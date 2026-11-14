"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";

export default function JourneySection() {
  return (
    <section
      id="journey"
      className="w-full bg-[#FFFFFF] text-[#050505] py-28 md:py-40 border-t border-[#E5E5E5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 pb-8 border-b border-[#E5E5E5] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="block font-mono text-xs uppercase tracking-[0.26em] text-[#777777] mb-3">
              03 / PROGRESSION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#050505]">
              {portfolioData.journey.heading}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777]">
            ACADEMIC &amp; TECHNICAL MILESTONES
          </p>
        </motion.div>

        {/* Clean Editorial Timeline */}
        <div className="divide-y divide-[#E5E5E5] border-b border-[#E5E5E5]">
          {portfolioData.journey.steps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
              transition={{
                duration: 0.85,
                delay: idx * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline group"
            >
              {/* Step Number */}
              <div className="md:col-span-2">
                <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-[#777777] group-hover:text-[#050505] transition-colors duration-300">
                  STAGE {item.step}
                </span>
              </div>

              {/* Milestone Heading */}
              <div className="md:col-span-5">
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#050505] group-hover:translate-x-1 transition-transform duration-300">
                  {item.title}
                </h3>
              </div>

              {/* Supporting Context */}
              <div className="md:col-span-5">
                <p className="font-sans text-base sm:text-[1.05rem] text-[#222222] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
