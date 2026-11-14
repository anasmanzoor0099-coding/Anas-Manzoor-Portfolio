"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";

interface AboutSectionProps {
  /** True when public/images/profile.png exists (checked on the server). */
  hasProfileImage: boolean;
}

export default function AboutSection({ hasProfileImage }: AboutSectionProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageAvailable = hasProfileImage && !imageFailed;

  return (
    <section
      id="about"
      className="w-full bg-[#FFFFFF] text-[#050505] py-28 md:py-40 border-t border-[#E5E5E5] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 pb-8 border-b border-[#E5E5E5] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="block font-mono text-xs uppercase tracking-[0.26em] text-[#777777] mb-3">
              01 / PROFILE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#050505]">
              {portfolioData.about.heading}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777]">
            ANAS MANZOOR
          </p>
        </motion.div>

        {/* Editorial Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left Column: Portrait Photograph Frame (public/images/profile.png) */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="relative aspect-[4/5] w-full bg-[#F5F5F5] border border-[#E5E5E5] overflow-hidden flex flex-col items-center justify-center">
              {imageAvailable ? (
                <Image
                  src={portfolioData.about.profileImagePath}
                  alt="Anas Manzoor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover grayscale contrast-105"
                />
              ) : (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full w-full bg-[#FAFAFA]">
                  <div className="w-16 h-16 border border-[#E5E5E5] flex items-center justify-center mb-6 text-[#777777]">
                    <User className="w-7 h-7 stroke-[1.25]" />
                  </div>
                  <p className="font-display text-lg font-semibold tracking-tight text-[#111111] mb-2">
                    Anas Manzoor
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#777777] max-w-[240px] leading-relaxed">
                    Portrait Placeholder
                  </p>
                  <span className="mt-4 font-mono text-[10px] text-[#777777] border-t border-[#E5E5E5] pt-3">
                    public/images/profile.png
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Narrative Content & Professional Identity */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            {/* Editorial Paragraphs */}
            <div className="space-y-7">
              {portfolioData.about.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
                  transition={{
                    duration: 0.85,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    index === 0
                      ? "font-sans text-lg sm:text-xl md:text-[1.35rem] font-normal leading-[1.55] text-[#050505]"
                      : "font-sans text-base sm:text-[1.05rem] font-light leading-relaxed text-[#222222]"
                  }
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Professional Identity List (Clean Editorial Lines — No Unnecessary Boxes) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.85, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="pt-8 border-t border-[#E5E5E5]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#777777] mb-6">
                PROFESSIONAL IDENTITY
              </p>

              <ul className="divide-y divide-[#E5E5E5] border-t border-b border-[#E5E5E5]">
                {portfolioData.about.identities.map((identity, idx) => (
                  <li
                    key={identity}
                    className="py-4 flex items-center justify-between group"
                  >
                    <span className="font-display text-lg sm:text-xl font-medium text-[#050505] group-hover:translate-x-2 transition-transform duration-300">
                      {identity}
                    </span>
                    <span className="font-mono text-xs text-[#777777]">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
