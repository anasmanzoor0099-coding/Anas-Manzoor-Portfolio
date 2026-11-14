"use client";

import React, { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

interface SvgJointProps {
  rotate?: MotionValue<number>;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  /** Pivot point (SVG user space) the rotation happens around. */
  cx?: number;
  cy?: number;
  children: React.ReactNode;
}

/**
 * Animated SVG joint.
 *
 * Writes a native SVG `transform` attribute (`translate` + `rotate(angle cx cy)`),
 * so pivots are always expressed in the SVG's own coordinate space. This avoids
 * the CSS `transform-box` pitfalls of animating SVG groups with CSS transforms,
 * and nested joints compose like a real skeleton (shoulder -> elbow -> wrist).
 */
export default function SvgJoint({
  rotate,
  x,
  y,
  cx = 0,
  cy = 0,
  children,
}: SvgJointProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    const apply = () => {
      const node = ref.current;
      if (!node) return;
      const tx = x ? x.get() : 0;
      const ty = y ? y.get() : 0;
      const angle = rotate ? rotate.get() : 0;
      node.setAttribute(
        "transform",
        `translate(${tx} ${ty}) rotate(${angle} ${cx} ${cy})`
      );
    };

    apply();

    const unsubscribers: Array<() => void> = [];
    if (rotate) unsubscribers.push(rotate.on("change", apply));
    if (x) unsubscribers.push(x.on("change", apply));
    if (y) unsubscribers.push(y.on("change", apply));

    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, [rotate, x, y, cx, cy]);

  return <g ref={ref}>{children}</g>;
}
