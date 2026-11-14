/**
 * =========================================================================
 * ANAS MANZOOR — CENTRALIZED MONOCHROME DESIGN SYSTEM
 * =========================================================================
 * Strict Black × White × Grayscale Visual Identity
 * Zero colorful accents. Pure architectural minimalism.
 * =========================================================================
 */

export const MONOCHROME_PALETTE = {
  primaryBlack: "#050505",
  secondaryBlack: "#111111",
  darkGray: "#222222",
  mediumGray: "#777777",
  lightGray: "#E5E5E5",
  pureWhite: "#FFFFFF",
} as const;

export const MOTION_EASING = {
  editorial: [0.16, 1, 0.3, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  cinematic: [0.22, 1, 0.36, 1] as const,
};

export const SECTION_IDS = {
  intro: "intro",
  hero: "hero",
  about: "about",
  skills: "skills",
  journey: "journey",
  projects: "projects",
  contact: "contact",
} as const;
