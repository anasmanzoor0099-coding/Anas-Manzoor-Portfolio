"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolio-data";
import { openSafeExternalUrl } from "@/lib/utils";

export default function ProjectsSection() {
  const [activeNotice, setActiveNotice] = useState<string | null>(null);

  const handleLinkAction = (
    project: ProjectItem,
    type: "live" | "source",
    url: string | null
  ) => {
    if (url && url.trim().length > 0) {
      openSafeExternalUrl(url);
      return;
    }
    const key = `${project.id}-${type}`;
    setActiveNotice(key);
    setTimeout(() => {
      setActiveNotice((prev) => (prev === key ? null : prev));
    }, 3500);
  };

  return (
    <section
      id="projects"
      className="w-full bg-[#050505] text-[#FFFFFF] py-28 md:py-40 border-t border-[#222222] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 pb-8 border-b border-[#222222] flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="block font-mono text-xs uppercase tracking-[0.26em] text-[#777777] mb-3">
              04 / PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-[#FFFFFF]">
              {portfolioData.projects.heading}
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#777777]">
            01 — 05 CURATED BUILDS
          </p>
        </motion.div>

        {/* Editorial Project Showcase List */}
        <div className="divide-y divide-[#222222]">
          {portfolioData.projects.items.map((project, index) => {
            const isEven = index % 2 === 1;
            const liveNoticeKey = `${project.id}-live`;
            const sourceNoticeKey = `${project.id}-source`;

            return (
              <article
                key={project.id}
                className="py-20 md:py-28 first:pt-0 last:pb-0"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  {/* Large Project Visual Composition */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
                    transition={{
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`lg:col-span-7 w-full ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="group relative w-full aspect-[16/10] bg-[#111111] border border-[#222222] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} interface preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority={index < 2}
                        className="w-full h-full object-cover object-center transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
                      />
                    </div>
                  </motion.div>

                  {/* Editorial Project Details */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`lg:col-span-5 flex flex-col justify-between space-y-8 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-xs uppercase tracking-[0.26em] text-[#777777]">
                          PROJECT {project.number}
                        </span>
                        <span className="w-8 h-[1px] bg-[#222222]" />
                        <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#777777]">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl md:text-[2.15rem] font-bold tracking-tight text-[#FFFFFF] mb-5">
                        {project.title}
                      </h3>

                      <p className="font-sans text-base sm:text-[1.05rem] text-[#E5E5E5] font-light leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies List */}
                    <div className="pt-6 border-t border-[#222222]">
                      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#777777] mb-3">
                        TECHNOLOGIES
                      </p>
                      <p className="font-mono text-xs sm:text-sm text-[#E5E5E5] leading-relaxed">
                        {project.technologies.join("  ·  ")}
                      </p>
                    </div>

                    {/* Live Demo & Source Code Actions */}
                    <div className="pt-2 flex flex-col space-y-3">
                      <div className="flex flex-wrap items-center gap-6">
                        <button
                          type="button"
                          onClick={() =>
                            handleLinkAction(project, "live", project.liveUrl)
                          }
                          className="group inline-flex items-center gap-2.5 py-2.5 px-5 bg-[#FFFFFF] text-[#050505] font-mono text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#E5E5E5] transition-colors focus:outline-none"
                        >
                          <span>Live Demo</span>
                        </button>

                        {project.sourceUrl && project.sourceUrl.trim().length > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              handleLinkAction(
                                project,
                                "source",
                                project.sourceUrl
                              )
                            }
                            className="group inline-flex items-center gap-2.5 py-2.5 px-5 bg-transparent text-[#FFFFFF] border border-[#222222] hover:border-[#FFFFFF] font-mono text-xs uppercase tracking-[0.2em] transition-colors focus:outline-none"
                          >
                            <Code2 className="w-4 h-4 text-[#777777] group-hover:text-[#FFFFFF] transition-colors" />
                            <span>Source Code</span>
                          </button>
                        )}
                      </div>

                      {/* Honest Configurable Link Status Notice */}
                      <AnimatePresence mode="wait">
                        {(activeNotice === liveNoticeKey ||
                          activeNotice === sourceNoticeKey) && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="font-mono text-[11px] text-[#777777] pt-1"
                          >
                            {activeNotice === liveNoticeKey
                              ? `Live Demo for ${project.title} is currently private or in progress.`
                              : `Source repository for ${project.title} is private.`}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
