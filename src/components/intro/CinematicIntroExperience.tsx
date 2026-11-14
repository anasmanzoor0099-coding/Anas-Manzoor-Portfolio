"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import SeatedCharacterScene, { IntroStage } from "./SeatedCharacterScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn, scrollToSection } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio-data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Order of the scripted character sequence. */
const STAGES: IntroStage[] = ["idle", "right", "left", "welcome"];

/** Scroll progress (0..1) at which each character stage is requested. */
const STAGE_THRESHOLDS = [0, 0.03, 0.12, 0.22];

/** Scroll progress (0..1) at which each of the 4 intro lines unlocks. */
const LINE_THRESHOLDS = [0.22, 0.42, 0.62, 0.8];

/**
 * Minimum time each look (right / left) is held so the full
 * "right -> left -> front + wave + roll" sequence plays even on fast flicks.
 */
const LOOK_DWELL_MS = 650;

function indexForProgress(progress: number, thresholds: number[]): number {
  let index = 0;
  thresholds.forEach((threshold, i) => {
    if (progress >= threshold) index = i;
  });
  return index;
}

function countLinesForProgress(progress: number): number {
  let count = 0;
  LINE_THRESHOLDS.forEach((threshold) => {
    if (progress >= threshold) count += 1;
  });
  return count;
}

export default function CinematicIntroExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [targetIndex, setTargetIndex] = useState(0);
  const [shownIndex, setShownIndex] = useState(0);
  const [scrollLineCount, setScrollLineCount] = useState(0);
  const lastChangeRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setTargetIndex(indexForProgress(progress, STAGE_THRESHOLDS));
    setScrollLineCount(countLinesForProgress(progress));
  });

  useEffect(() => {
    const initial = scrollYProgress.get();
    setTargetIndex(indexForProgress(initial, STAGE_THRESHOLDS));
    setScrollLineCount(countLinesForProgress(initial));
  }, [scrollYProgress]);

  // Step through character stages one at a time, honouring minimum dwell.
  useEffect(() => {
    if (shownIndex === targetIndex) return;

    if (reducedMotion) {
      setShownIndex(targetIndex);
      return;
    }

    const forward = targetIndex > shownIndex;
    const elapsed = performance.now() - lastChangeRef.current;
    const wait = forward
      ? shownIndex === 0
        ? 120
        : Math.max(0, LOOK_DWELL_MS - elapsed)
      : 300;

    const timer = setTimeout(() => {
      lastChangeRef.current = performance.now();
      setShownIndex((current) =>
        current === targetIndex
          ? current
          : current + (targetIndex > current ? 1 : -1)
      );
    }, wait);

    return () => clearTimeout(timer);
  }, [shownIndex, targetIndex, reducedMotion]);

  const stage = STAGES[shownIndex];
  const welcome = stage === "welcome";
  // Lines only appear once the character has rolled left & greeted; each
  // subsequent scroll reveals the next line until all 4 are complete.
  const visibleLines = welcome ? Math.max(1, scrollLineCount) : 0;
  const lines = portfolioData.intro.lines;

  const handleSkip = (event: React.MouseEvent) => {
    event.preventDefault();
    scrollToSection("hero");
  };

  return (
    <section
      id="intro"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative h-[210svh] w-full bg-[#050505] text-[#FFFFFF]"
    >
      {/* Keyboard / screen-reader affordances */}
      <a
        href="#hero"
        onClick={handleSkip}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#FFFFFF] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-[#050505]"
      >
        Skip intro
      </a>
      <h1 className="sr-only">
        Anas Manzoor — Software Engineering Student and aspiring Full-Stack Web
        Developer
      </h1>

      {/* Pinned stage: stays locked on screen until all 4 lines are scrolled through */}
      <div className="sticky top-0 h-screen h-svh w-full overflow-hidden">
        {/* Character on rolling chair:
            - Starts DEAD CENTER on all screens (idle, right, left)
            - Rolls smoothly on its tyres to the left side (desktop/landscape)
              or upward (mobile portrait) when waving & greeting */}
        <div
          className={cn(
            "absolute z-10 aspect-square -translate-y-1/2",
            "transition-[left,top,transform] duration-[1150ms] ease-editorial",
            "w-[min(88vw,46svh)] lg:w-[min(46vw,76svh)] max-lg:landscape:w-[min(42vw,80svh)]",
            welcome
              ? "left-1/2 -translate-x-1/2 top-[33%] lg:left-[7%] lg:translate-x-0 lg:top-1/2 max-lg:landscape:left-[3%] max-lg:landscape:translate-x-0 max-lg:landscape:top-1/2"
              : "left-1/2 -translate-x-1/2 top-1/2"
          )}
        >
          <SeatedCharacterScene stage={stage} reducedMotion={reducedMotion} />
        </div>

        {/* Scroll-driven 4-line introduction */}
        <AnimatePresence>
          {welcome && (
            <motion.div
              key="intro-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
              transition={{ duration: 0.35 }}
              className={cn(
                "absolute bottom-0 left-0 right-0 z-20 flex flex-col items-center px-6 pb-8 text-center sm:px-10 sm:pb-12",
                "lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:items-start lg:px-16 lg:pb-0 lg:text-left",
                "max-lg:landscape:bottom-auto max-lg:landscape:left-[46%] max-lg:landscape:top-1/2 max-lg:landscape:-translate-y-1/2 max-lg:landscape:items-start max-lg:landscape:px-8 max-lg:landscape:pb-0 max-lg:landscape:text-left"
              )}
            >
              <div className="w-full max-w-[34rem] space-y-3 sm:portrait:space-y-5 max-lg:landscape:space-y-1.5 lg:space-y-5">
                {/* Line 1 */}
                <AnimatePresence>
                  {visibleLines >= 1 && (
                    <motion.p
                      key="line-1"
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reducedMotion ? 0 : -12 }}
                      transition={{
                        duration: 0.85,
                        delay: reducedMotion ? 0 : 0.25,
                        ease: EASE,
                      }}
                      className="font-display text-[2rem] font-bold leading-tight tracking-tight text-[#FFFFFF] sm:portrait:text-4xl max-lg:landscape:text-[1.6rem] lg:text-[3rem]"
                    >
                      {lines[0]}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Line 2 */}
                <AnimatePresence>
                  {visibleLines >= 2 && (
                    <motion.div
                      key="line-2-wrap"
                      initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
                      transition={{ duration: 0.85, ease: EASE }}
                      className="space-y-3 sm:portrait:space-y-5 max-lg:landscape:space-y-1.5 lg:space-y-5"
                    >
                      <p className="font-serif text-xl italic text-[#E5E5E5] sm:portrait:text-2xl max-lg:landscape:text-base lg:text-2xl">
                        {lines[1]}
                      </p>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        style={{ originX: 0 }}
                        className="mx-auto h-px w-14 bg-[#777777] lg:mx-0 max-lg:landscape:mx-0"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Line 3 & Line 4 */}
                <div className="space-y-1.5 pt-1 sm:space-y-2">
                  <AnimatePresence>
                    {visibleLines >= 3 && (
                      <motion.p
                        key="line-3"
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                        transition={{ duration: 0.75, ease: EASE }}
                        className="font-sans text-base font-medium tracking-tight text-[#FFFFFF] sm:portrait:text-lg max-lg:landscape:text-sm lg:text-xl"
                      >
                        {lines[2]}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {visibleLines >= 4 && (
                      <motion.p
                        key="line-4"
                        initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                        transition={{ duration: 0.75, ease: EASE }}
                        className="font-sans text-base font-normal tracking-tight text-[#777777] sm:portrait:text-lg max-lg:landscape:text-sm lg:text-xl"
                      >
                        {lines[3]}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
