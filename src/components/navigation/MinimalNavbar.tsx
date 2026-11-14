"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const NAV_ITEMS = [
  { label: "About", targetId: "about" },
  { label: "Skills", targetId: "skills" },
  { label: "Journey", targetId: "journey" },
  { label: "Works", targetId: "projects" },
  { label: "Contact", targetId: "contact" },
];

export default function MinimalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [liquidTransition, setLiquidTransition] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const sections = ["hero", "about", "skills", "journey", "projects", "contact"];

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 40);

      // If at the bottom of the document, highlight Contact
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        setActiveSection("contact");
        return;
      }

      const probeY = Math.min(window.innerHeight * 0.35, 280);
      let current = "hero";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleNavigate = useCallback(
    (targetId: string) => {
      setMobileMenuOpen(false);
      setActiveSection(targetId);

      if (reducedMotion) {
        scrollToSection(targetId);
        return;
      }

      setLiquidTransition(targetId);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 80;
          const top =
            element.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
        }
      }, 260);

      setTimeout(() => {
        setLiquidTransition(null);
      }, 640);
    },
    [reducedMotion]
  );

  const highlightedId = hoveredId ?? activeSection;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-colors duration-500 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-md border-b border-[#222222]"
            : "bg-[#050505] border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 h-20 flex items-center justify-between"
        >
          {/* Brand Name */}
          <button
            type="button"
            onClick={() => handleNavigate("hero")}
            className="text-left focus:outline-none group"
          >
            <span className="font-display text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-[#FFFFFF] group-hover:text-[#E5E5E5] transition-colors">
              ANAS MANZOOR
            </span>
          </button>

          {/* Desktop Links with Liquid Morphing Pill */}
          <ul
            className="hidden md:flex items-center gap-2"
            onMouseLeave={() => setHoveredId(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isHighlighted = highlightedId === item.targetId;
              return (
                <li key={item.targetId}>
                  <button
                    type="button"
                    onClick={() => handleNavigate(item.targetId)}
                    onMouseEnter={() => setHoveredId(item.targetId)}
                    onFocus={() => setHoveredId(item.targetId)}
                    onBlur={() => setHoveredId(null)}
                    className={`relative px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none ${
                      isHighlighted
                        ? "text-[#050505]"
                        : "text-[#777777] hover:text-[#FFFFFF]"
                    }`}
                  >
                    {isHighlighted && (
                      <motion.span
                        layoutId="navbar-liquid-pill"
                        transition={{
                          type: "spring",
                          stiffness: 340,
                          damping: 26,
                          mass: 0.85,
                        }}
                        className="absolute inset-0 rounded-full bg-[#FFFFFF]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 text-[#FFFFFF] hover:text-[#E5E5E5] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden bg-[#050505] border-b border-[#222222] overflow-hidden"
            >
              <ul className="px-6 sm:px-10 py-8 flex flex-col gap-5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.targetId;
                  return (
                    <li key={item.targetId}>
                      <button
                        type="button"
                        onClick={() => handleNavigate(item.targetId)}
                        className={`w-full text-left font-display text-2xl font-medium tracking-tight transition-all duration-300 ${
                          isActive
                            ? "text-[#FFFFFF] translate-x-2"
                            : "text-[#777777] hover:text-[#FFFFFF]"
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Monochrome Liquid Wave Section Transition Overlay */}
      <AnimatePresence>
        {liquidTransition && (
          <motion.div
            key="liquid-curtain"
            aria-hidden="true"
            initial={{ y: "100%" }}
            animate={{ y: ["100%", "0%", "-100%"] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.62,
              times: [0, 0.45, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed inset-0 z-[70] pointer-events-none bg-[#050505] flex flex-col justify-between"
          >
            {/* Top curved liquid wave crest */}
            <svg
              viewBox="0 0 1440 90"
              preserveAspectRatio="none"
              className="w-full h-12 -translate-y-full fill-[#050505]"
            >
              <path d="M0,90 C360,0 1080,0 1440,90 L1440,90 L0,90 Z" />
            </svg>
            <div className="w-full h-px bg-[#222222]" />
            {/* Bottom curved liquid wave crest */}
            <svg
              viewBox="0 0 1440 90"
              preserveAspectRatio="none"
              className="w-full h-12 translate-y-full fill-[#050505]"
            >
              <path d="M0,0 C360,90 1080,90 1440,0 L1440,0 L0,0 Z" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
