"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, SocialPlatform } from "@/data/portfolio-data";
import { openSafeExternalUrl } from "@/lib/utils";

export default function ContactSection() {
  const [activePlatformNote, setActivePlatformNote] = useState<string | null>(
    null
  );

  const configuredEmail = portfolioData.contact.email.trim();

  const handlePlatformClick = (platform: SocialPlatform) => {
    if (platform.id === "email") {
      if (configuredEmail.length > 0) {
        window.location.href = `mailto:${configuredEmail}`;
      } else {
        setActivePlatformNote("email");
        setTimeout(() => setActivePlatformNote(null), 3500);
      }
      return;
    }

    if (platform.href && platform.href.trim().length > 0) {
      openSafeExternalUrl(platform.href);
      return;
    }

    setActivePlatformNote(platform.id);
    setTimeout(() => {
      setActivePlatformNote((prev) => (prev === platform.id ? null : prev));
    }, 3500);
  };

  return (
    <section
      id="contact"
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
              05 / CONTACT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#050505]">
              {portfolioData.contact.heading}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777]">
            {portfolioData.contact.displayName.toUpperCase()}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left Column: Supporting Statement & Copy-Email Interaction */}
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 space-y-10"
          >
            <p className="font-sans text-xl sm:text-2xl md:text-[1.65rem] font-light leading-[1.45] tracking-tight text-[#050505]">
              {portfolioData.contact.supportingText}
            </p>

            {/* Primary Identity Details */}
            <div className="pt-4 space-y-4 border-t border-[#E5E5E5]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#777777]">
                  DISPLAY NAME
                </span>
                <span className="font-display text-base sm:text-[1.05rem] font-semibold text-[#050505]">
                  {portfolioData.contact.displayName}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-t border-[#E5E5E5] gap-2">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#777777]">
                  GITHUB IDENTITY
                </span>
                <span className="font-display text-base sm:text-[1.05rem] font-semibold text-[#050505]">
                  {portfolioData.contact.githubDisplayName}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Official Channels (Email, Instagram, Facebook, GitHub) */}
          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#777777] mb-6">
              DIRECT CHANNELS
            </p>

            <div className="divide-y divide-[#E5E5E5] border-t border-b border-[#E5E5E5]">
              {portfolioData.contact.platforms.map((platform) => (
                <div key={platform.id} className="py-5">
                  <button
                    type="button"
                    onClick={() => handlePlatformClick(platform)}
                    className="w-full text-left group focus:outline-none cursor-pointer"
                  >
                    <span className="block font-mono text-[11px] uppercase tracking-[0.22em] text-[#777777] mb-1">
                      {platform.label}
                    </span>
                    <span className="font-display text-lg sm:text-xl md:text-[1.35rem] font-semibold tracking-tight text-[#050505] group-hover:translate-x-1.5 inline-block transition-transform duration-300">
                      {platform.displayName}
                    </span>
                  </button>

                  <AnimatePresence>
                    {activePlatformNote === platform.id && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="font-mono text-[11px] text-[#777777] mt-3"
                      >
                        {platform.id === "email"
                          ? "Direct email is currently unavailable."
                          : `${platform.label} profile link is currently unavailable.`}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
