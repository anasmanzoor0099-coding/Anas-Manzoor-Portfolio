"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio-data";

export default function SkillsSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="w-full bg-[#050505] text-[#FFFFFF] py-28 md:py-40 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 pb-8 border-b border-[#222222] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="block font-mono text-xs uppercase tracking-[0.26em] text-[#777777] mb-3">
              02 / CAPABILITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#FFFFFF]">
              {portfolioData.skills.heading}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777]">
            CORE TECHNOLOGIES &amp; TOOLS
          </p>
        </motion.div>

        {/* Editorial Typography Rows — Zero Unnecessary Cards or Progress Bars */}
        <div className="divide-y divide-[#222222] border-b border-[#222222]">
          {portfolioData.skills.groups.map((group, groupIndex) => {
            const isDimmed =
              hoveredCategory !== null && hoveredCategory !== group.id;

            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
                transition={{
                  duration: 0.85,
                  delay: groupIndex * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredCategory(group.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`py-8 md:py-11 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline transition-opacity duration-500 ${
                  isDimmed ? "opacity-40" : "opacity-100"
                }`}
              >
                {/* Category Label */}
                <div className="lg:col-span-4 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#777777]">
                    0{groupIndex + 1}
                  </span>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-[0.24em] text-[#E5E5E5]">
                    {group.category}
                  </h3>
                </div>

                {/* Interactive Typography List */}
                <div className="lg:col-span-8 flex flex-wrap items-baseline gap-x-6 gap-y-3">
                  {group.items.map((tech, idx) => (
                    <span
                      key={tech}
                      className="group inline-flex items-baseline gap-3 cursor-default"
                    >
                      <span className="font-display text-xl sm:text-2xl md:text-[1.65rem] font-semibold tracking-tight text-[#FFFFFF] group-hover:text-[#E5E5E5] transition-all duration-300 group-hover:translate-x-1">
                        {tech}
                      </span>
                      {idx < group.items.length - 1 && (
                        <span
                          className="text-[#222222] font-light text-xl select-none"
                          aria-hidden="true"
                        >
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
