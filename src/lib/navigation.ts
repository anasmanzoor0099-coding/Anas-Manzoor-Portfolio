import gsap from "gsap";
import { sound } from "@/lib/sound";

type TransitionCallback = (targetId: string) => void;

let transitionHandler: TransitionCallback | null = null;

export function registerTransitionHandler(handler: TransitionCallback) {
  transitionHandler = handler;
}

export function unregisterTransitionHandler() {
  transitionHandler = null;
}

/**
 * Triggers the cinematic navigation animation and smoothly glides to the target section.
 */
export function navigateToSection(sectionId: string, customOffset = 80) {
  sound.playTransition();

  if (transitionHandler) {
    transitionHandler(sectionId);
    return;
  }

  // Fallback direct smooth tween if transition handler is not yet mounted
  executeSmoothScroll(sectionId, customOffset);
}

export function executeSmoothScroll(sectionId: string, customOffset = 80) {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset - customOffset;
  const scrollObj = { y: window.pageYOffset };

  gsap.to(scrollObj, {
    y: targetY,
    duration: 1.25,
    ease: "power4.inOut",
    onUpdate: () => {
      window.scrollTo(0, scrollObj.y);
    },
    onComplete: () => {
      // Trigger architectural highlight on destination
      targetElement.classList.add("section-highlight-active");
      setTimeout(() => {
        targetElement.classList.remove("section-highlight-active");
      }, 1600);
    },
  });
}
