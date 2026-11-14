"use client";

import { useState, useEffect } from "react";

export interface NormalizedMouse {
  x: number; // -1 to 1
  y: number; // -1 to 1
  clientX: number;
  clientY: number;
}

export function useMousePosition(): NormalizedMouse {
  const [mouse, setMouse] = useState<NormalizedMouse>({
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const nx = (event.clientX / width) * 2 - 1;
      const ny = (event.clientY / height) * 2 - 1;
      setMouse({
        x: Math.max(-1, Math.min(1, nx)),
        y: Math.max(-1, Math.min(1, ny)),
        clientX: event.clientX,
        clientY: event.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
}
