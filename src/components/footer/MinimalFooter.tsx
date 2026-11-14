"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { portfolioData } from "@/data/portfolio-data";
import { scrollToSection } from "@/lib/utils";

export default function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] text-[#FFFFFF] border-t border-[#222222] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pb-12 border-b border-[#222222]">
          {/* Primary Signature */}
          <div>
            <p className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#FFFFFF] mb-2">
              {portfolioData.footer.credit}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777]">
              © {currentYear} {portfolioData.personal.name}. All rights reserved.
            </p>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={handleBackToTop}
            className="group inline-flex items-center gap-3 px-5 py-3 border border-[#222222] hover:border-[#FFFFFF] font-mono text-xs uppercase tracking-[0.22em] text-[#E5E5E5] hover:text-[#FFFFFF] transition-colors focus:outline-none"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom Row: Social Links & Quick Section Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8">
            {portfolioData.contact.platforms.map((platform) => {
              if (platform.href) {
                const isExternal = platform.href.startsWith("http");
                return (
                  <a
                    key={platform.id}
                    href={platform.href}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777] hover:text-[#FFFFFF] transition-colors"
                  >
                    {platform.label}
                  </a>
                );
              }
              return (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777] hover:text-[#FFFFFF] transition-colors focus:outline-none"
                >
                  {platform.label}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#777777]">
            GITHUB: {portfolioData.personal.githubDisplayName.toUpperCase()}
          </span>
        </div>
      </div>
    </footer>
  );
}
