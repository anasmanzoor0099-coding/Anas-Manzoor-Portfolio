"use client";

import React, { useCallback, useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import SvgJoint from "./SvgJoint";

/**
 * Scripted intro stages (driven by scroll):
 *  idle    -> seated straight facing the screen, head & eyes looking down at tablet
 *  right   -> lifts head up from tablet and looks right
 *  left    -> looks left
 *  welcome -> looks straight at visitor, smiles, waves right hand, chair glides left
 */
export type IntroStage = "idle" | "right" | "left" | "welcome";

interface SeatedCharacterSceneProps {
  stage: IntroStage;
  reducedMotion: boolean;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Gaze targets. x: -1 (left) .. 1 (right). y: -1 (up) .. 1.5 (eyes down on tablet). */
const GAZE: Record<IntroStage, { x: number; y: number }> = {
  idle: { x: 0, y: 1.5 },
  right: { x: 1, y: -0.05 },
  left: { x: -1, y: -0.05 },
  welcome: { x: 0, y: -0.06 },
};

const TORSO: Record<IntroStage, { rotate: number; x: number }> = {
  idle: { rotate: 0, x: 0 },
  right: { rotate: 1.4, x: 2 },
  left: { rotate: -1.4, x: -2 },
  welcome: { rotate: 0, x: 0 },
};

export default function SeatedCharacterScene({
  stage,
  reducedMotion,
}: SeatedCharacterSceneProps) {
  const engaged = stage === "welcome";
  const lookingAtTablet = stage === "idle";

  // ---- Gaze (head lift + eyes down on tablet -> right -> left -> front) ---
  const springConfig = { stiffness: 85, damping: 18, mass: 0.85 };
  const gazeX = useSpring(GAZE.idle.x, springConfig);
  const gazeY = useSpring(GAZE.idle.y, springConfig);

  const applyGaze = useCallback(
    (x: number, y: number) => {
      if (reducedMotion) {
        gazeX.jump(x);
        gazeY.jump(y);
      } else {
        gazeX.set(x);
        gazeY.set(y);
      }
    },
    [reducedMotion, gazeX, gazeY]
  );

  useEffect(() => {
    applyGaze(GAZE[stage].x, GAZE[stage].y);
  }, [stage, applyGaze]);

  // Subtle cursor-following once engaged on desktop mouse
  const stageRef = useRef(stage);
  stageRef.current = stage;

  useEffect(() => {
    if (reducedMotion) return;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || stageRef.current !== "welcome") return;
      const nx = (event.clientX / (window.innerWidth || 1)) * 2 - 1;
      const ny = (event.clientY / (window.innerHeight || 1)) * 2 - 1;
      gazeX.set(Math.max(-1, Math.min(1, nx)) * 0.65);
      gazeY.set(-0.06 + Math.max(-1, Math.min(1, ny)) * 0.42);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reducedMotion, gazeX, gazeY]);

  const headRotate = useTransform(gazeX, (v) => v * 7);
  const headX = useTransform(gazeX, (v) => v * 3.5);
  const headY = useTransform(gazeY, (v) => v * 8.5);
  const featureX = useTransform(gazeX, (v) => v * 6.5);
  const featureY = useTransform(gazeY, (v) => v * 5.2);
  const pupilX = useTransform(gazeX, (v) => v * 2.2);
  const pupilY = useTransform(gazeY, (v) => v * 2.1);

  // ---- Torso micro-lean ---------------------------------------------------
  const torsoRotate = useMotionValue(TORSO.idle.rotate);
  const torsoX = useMotionValue(TORSO.idle.x);

  useEffect(() => {
    const target = TORSO[stage];
    const transition = reducedMotion
      ? { duration: 0 }
      : { duration: 0.9, ease: EASE };
    const controls = [
      animate(torsoRotate, target.rotate, transition),
      animate(torsoX, target.x, transition),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [stage, reducedMotion, torsoRotate, torsoX]);

  // ---- Subtle caster wheel spin as chair glides left ----------------------
  const wheelRotate = useMotionValue(0);

  useEffect(() => {
    const target = stage === "welcome" ? -420 : 0;
    const transition = reducedMotion
      ? { duration: 0 }
      : { duration: 1.0, ease: EASE };
    const control = animate(wheelRotate, target, transition);
    return () => control.stop();
  }, [stage, reducedMotion, wheelRotate]);

  // ---- Right arm: resting by tablet -> lifts & waves ----------------------
  const upperArmRotate = useMotionValue(0);
  const foreArmRotate = useMotionValue(0);
  const handRotate = useMotionValue(0);

  useEffect(() => {
    const controls: Array<{ stop: () => void }> = [];
    let timer: ReturnType<typeof setTimeout> | undefined;

    const settle = (upper: number, fore: number, hand: number, duration: number) => {
      const transition = reducedMotion
        ? { duration: 0 }
        : { duration, ease: EASE };
      controls.push(
        animate(upperArmRotate, upper, transition),
        animate(foreArmRotate, fore, transition),
        animate(handRotate, hand, transition)
      );
    };

    if (stage !== "welcome") {
      settle(0, 0, 0, 0.75);
    } else if (reducedMotion) {
      settle(-26, -34, 0, 0);
    } else {
      timer = setTimeout(() => {
        const wave = { duration: 2.8, ease: "easeInOut" as const };
        controls.push(
          animate(upperArmRotate, [null, -46, -40, -46, -40, -24], wave),
          animate(foreArmRotate, [null, -64, -40, -66, -40, -24], wave),
          animate(handRotate, [null, -12, 14, -14, 14, 0], wave)
        );
      }, 320);
    }

    return () => {
      if (timer) clearTimeout(timer);
      controls.forEach((c) => c.stop());
    };
  }, [stage, reducedMotion, upperArmRotate, foreArmRotate, handRotate]);

  return (
    <div
      className="relative h-full w-full select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Overhead studio key light */}
      <motion.div
        className="absolute -inset-[35%]"
        animate={{ opacity: engaged ? 1 : 0.7 }}
        transition={{ duration: 1.2, ease: EASE }}
        style={{
          background:
            "radial-gradient(ellipse 46% 52% at 50% 30%, rgba(255,255,255,0.12) 0%, rgba(229,229,229,0.04) 45%, rgba(5,5,5,0) 75%)",
        }}
      />

      <svg
        viewBox="120 110 400 490"
        className="relative h-full w-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="floorShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.96" />
            <stop offset="60%" stopColor="#050505" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="floorRimGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.09" />
            <stop offset="65%" stopColor="#777777" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="chairLeather" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#323232" />
            <stop offset="45%" stopColor="#1D1D1D" />
            <stop offset="100%" stopColor="#0D0D0D" />
          </linearGradient>

          <linearGradient id="chairMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#484848" />
            <stop offset="50%" stopColor="#D4D4D4" />
            <stop offset="100%" stopColor="#3A3A3A" />
          </linearGradient>

          <linearGradient id="blazerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#202020" />
            <stop offset="50%" stopColor="#111111" />
            <stop offset="100%" stopColor="#070707" />
          </linearGradient>

          <linearGradient id="trouserGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="55%" stopColor="#181818" />
            <stop offset="100%" stopColor="#0B0B0B" />
          </linearGradient>

          <linearGradient id="skinLight" x1="25%" y1="0%" x2="75%" y2="100%">
            <stop offset="0%" stopColor="#F0F0F0" />
            <stop offset="58%" stopColor="#C4C4C4" />
            <stop offset="100%" stopColor="#7A7A7A" />
          </linearGradient>

          <linearGradient id="tabletGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7A7A7A" />
            <stop offset="50%" stopColor="#444444" />
            <stop offset="100%" stopColor="#222222" />
          </linearGradient>
        </defs>

        {/* ===== Studio floor & contact shadows ===== */}
        <ellipse cx="320" cy="575" rx="195" ry="32" fill="url(#floorRimGlow)" />
        <ellipse cx="320" cy="572" rx="145" ry="19" fill="url(#floorShadow)" />
        <line
          x1="130"
          y1="570"
          x2="510"
          y2="570"
          stroke="#222222"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* ===== Front-Facing 5-Star Executive Chair Base & Subtle Dark Casters ===== */}
        <g id="executive-chair-base-front">
          {/* Center Gas Lift */}
          <rect x="312" y="458" width="16" height="58" fill="url(#chairMetal)" stroke="#111111" strokeWidth="1.2" />
          {/* Tilt Plate */}
          <path
            d="M 284 446 L 356 446 L 348 460 L 292 460 Z"
            fill="#1A1A1A"
            stroke="#444444"
            strokeWidth="1.2"
          />

          {/* Symmetrical 5-Star Brushed Steel Legs */}
          <path
            d="M 312 508 L 222 548 L 226 555 L 318 522 Z"
            fill="url(#chairMetal)"
            stroke="#141414"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 328 508 L 418 548 L 414 555 L 322 522 Z"
            fill="url(#chairMetal)"
            stroke="#141414"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 316 514 L 274 554 L 282 558 L 320 524 Z"
            fill="url(#chairMetal)"
            stroke="#141414"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M 324 514 L 366 554 L 358 558 L 320 524 Z"
            fill="url(#chairMetal)"
            stroke="#141414"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <rect x="316" y="516" width="8" height="32" fill="#555555" stroke="#141414" strokeWidth="1" />

          {/* Subtle Dark Shadowed Casters (blends into floor shadow) */}
          <g opacity="0.68">
            <SvgJoint rotate={wheelRotate} cx={224} cy={558}>
              <circle cx="224" cy="558" r="7" fill="#0B0B0B" stroke="#282828" strokeWidth="1.4" />
              <circle cx="224" cy="558" r="2" fill="#363636" />
            </SvgJoint>
            <SvgJoint rotate={wheelRotate} cx={278} cy={561}>
              <circle cx="278" cy="561" r="7" fill="#0B0B0B" stroke="#282828" strokeWidth="1.4" />
              <circle cx="278" cy="561" r="2" fill="#363636" />
            </SvgJoint>
            <SvgJoint rotate={wheelRotate} cx={362} cy={561}>
              <circle cx="362" cy="561" r="7" fill="#0B0B0B" stroke="#282828" strokeWidth="1.4" />
              <circle cx="362" cy="561" r="2" fill="#363636" />
            </SvgJoint>
            <SvgJoint rotate={wheelRotate} cx={416} cy={558}>
              <circle cx="416" cy="558" r="7" fill="#0B0B0B" stroke="#282828" strokeWidth="1.4" />
              <circle cx="416" cy="558" r="2" fill="#363636" />
            </SvgJoint>
          </g>
        </g>

        {/* ===== Front-Facing Ergonomic High-Back Executive Chair ===== */}
        <g id="executive-chair-front">
          {/* Sculpted High Backrest */}
          <path
            d="M 244 198 C 244 180 264 174 320 174 C 376 174 396 180 396 198 L 404 404 C 404 420 392 430 374 430 L 266 430 C 248 430 236 420 236 404 Z"
            fill="url(#chairLeather)"
            stroke="#555555"
            strokeWidth="1.5"
          />
          {/* Ergonomic Side Bolsters & Stitching */}
          <path
            d="M 262 198 L 256 398 M 378 198 L 384 398"
            stroke="#343434"
            strokeWidth="1.3"
          />
          <path d="M 260 258 Q 320 264 380 258" stroke="#2A2A2A" strokeWidth="1.4" />
          <path d="M 258 342 Q 320 348 382 342" stroke="#2A2A2A" strokeWidth="1.4" />

          {/* Seat Cushion */}
          <rect
            x="224"
            y="412"
            width="192"
            height="38"
            rx="14"
            fill="url(#chairLeather)"
            stroke="#555555"
            strokeWidth="1.5"
          />
        </g>

        {/* ===== Straight-Forward Legs & Polished Dress Shoes ===== */}
        <g id="character-legs-front">
          {/* Left Leg */}
          <path
            d="M 260 416 L 314 416 L 308 538 L 268 538 Z"
            fill="url(#trouserGrad)"
            stroke="#444444"
            strokeWidth="1.4"
          />
          <line x1="287" y1="426" x2="287" y2="530" stroke="#555555" strokeWidth="1" strokeOpacity="0.55" />
          {/* Left Dress Shoe */}
          <path
            d="M 266 536 L 308 536 L 312 558 C 312 564 258 564 258 558 Z"
            fill="#111111"
            stroke="#777777"
            strokeWidth="1.3"
          />
          <path d="M 272 544 Q 286 549 302 544" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.65" />
          <line x1="259" y1="562" x2="311" y2="562" stroke="#E5E5E5" strokeWidth="1.2" />

          {/* Right Leg */}
          <path
            d="M 326 416 L 380 416 L 372 538 L 332 538 Z"
            fill="url(#trouserGrad)"
            stroke="#444444"
            strokeWidth="1.4"
          />
          <line x1="353" y1="426" x2="353" y2="530" stroke="#555555" strokeWidth="1" strokeOpacity="0.55" />
          {/* Right Dress Shoe */}
          <path
            d="M 332 536 L 374 536 L 382 558 C 382 564 328 564 328 558 Z"
            fill="#111111"
            stroke="#777777"
            strokeWidth="1.3"
          />
          <path d="M 338 544 Q 354 549 368 544" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.65" />
          <line x1="329" y1="562" x2="381" y2="562" stroke="#E5E5E5" strokeWidth="1.2" />
        </g>

        {/* ===== Metallic L-Shaped Armrests (Left & Right) ===== */}
        <g id="chair-armrests-front">
          <path
            d="M 218 354 L 218 426 C 218 434 224 438 234 438 L 244 438"
            stroke="url(#chairMetal)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect x="200" y="344" width="44" height="12" rx="6" fill="#1D1D1D" stroke="#666666" strokeWidth="1.2" />

          <path
            d="M 422 354 L 422 426 C 422 434 416 438 406 438 L 396 438"
            stroke="url(#chairMetal)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <rect x="396" y="344" width="44" height="12" rx="6" fill="#1D1D1D" stroke="#666666" strokeWidth="1.2" />
        </g>

        {/* ===== Upper Body: Idle Breathing ===== */}
        <motion.g
          animate={reducedMotion ? { y: 0 } : { y: [0, -2.5, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <SvgJoint rotate={torsoRotate} x={torsoX} cx={320} cy={412}>
            {/* Tailored Black Blazer */}
            <path
              d="M 254 260 C 268 246 372 246 386 260 L 394 418 L 246 418 Z"
              fill="url(#blazerGrad)"
              stroke="#4A4A4A"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Shoulder Highlights */}
            <path
              d="M 256 258 C 272 248 294 248 302 250"
              stroke="#E5E5E5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />
            <path
              d="M 384 258 C 368 248 346 248 338 250"
              stroke="#E5E5E5"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.65"
            />

            {/* Crisp White Collared Dress Shirt */}
            <path
              d="M 296 248 L 344 248 L 338 358 L 302 358 Z"
              fill="#F2F2F2"
              stroke="#222222"
              strokeWidth="1.2"
            />
            {/* Shirt Collar Points */}
            <path d="M 296 248 L 308 272 L 320 256" fill="#FFFFFF" stroke="#222222" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M 344 248 L 332 272 L 320 256" fill="#FFFFFF" stroke="#222222" strokeWidth="1.2" strokeLinejoin="round" />
            {/* Blazer Lapels */}
            <path d="M 290 250 L 304 316 L 314 374" stroke="#555555" strokeWidth="1.3" />
            <path d="M 350 250 L 336 316 L 326 374" stroke="#555555" strokeWidth="1.3" />

            {/* Left Arm resting on armrest and holding left edge of tablet */}
            <g id="left-arm-front">
              <path
                d="M 254 264 C 242 270 234 288 232 314 L 228 348 L 274 360 L 278 344 L 248 336 L 254 294 Z"
                fill="#141414"
                stroke="#444444"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M 268 342 L 277 344 L 275 359 L 266 357 Z" fill="#F2F2F2" stroke="#222222" strokeWidth="1" />
              <path
                d="M 276 345 C 286 344 292 349 290 356 C 287 361 278 361 274 356 Z"
                fill="url(#skinLight)"
                stroke="#333333"
                strokeWidth="1.1"
              />
            </g>

            {/* Sleek Monochrome Tablet Held Straight in Front on Lap */}
            <g id="lap-tablet-front">
              <path
                d="M 278 342 L 362 342 L 354 396 L 286 396 Z"
                fill="url(#tabletGrad)"
                stroke="#CCCCCC"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              {/* Subtle Screen Glow / Hinge */}
              <line x1="286" y1="346" x2="354" y2="346" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.55" />
              <rect x="292" y="394" width="56" height="4" rx="2" fill="#222222" stroke="#666666" strokeWidth="0.8" />
            </g>

            {/* Neck */}
            <path
              d="M 307 218 L 333 218 L 335 254 L 305 254 Z"
              fill="url(#skinLight)"
              stroke="#333333"
              strokeWidth="1.2"
            />
            <path
              d="M 307 230 Q 320 240 333 230 L 333 239 Q 320 247 307 239 Z"
              fill="#222222"
              fillOpacity="0.55"
            />

            {/* Professional Head (looks down at tablet initially -> lifts & looks right/left -> smiles) */}
            <SvgJoint rotate={headRotate} x={headX} y={headY} cx={320} cy={238}>
              {/* Ears */}
              <path
                d="M 292 186 C 285 186 285 204 293 205"
                fill="#A8A8A8"
                stroke="#333333"
                strokeWidth="1.2"
              />
              <path
                d="M 348 186 C 355 186 355 204 347 205"
                fill="#A8A8A8"
                stroke="#333333"
                strokeWidth="1.2"
              />

              {/* Sculpted Jawline & Face */}
              <path
                d="M 292 170 C 292 146 348 146 348 170 L 346 204 C 344 221 332 231 320 231 C 308 231 296 221 294 204 Z"
                fill="url(#skinLight)"
                stroke="#333333"
                strokeWidth="1.4"
              />

              {/* Clean Swept Executive Hair */}
              <path
                d="M 289 182 C 285 156 298 136 320 136 C 342 136 355 156 351 182 C 346 164 334 158 320 158 C 306 158 294 164 289 182 Z"
                fill="#141414"
                stroke="#444444"
                strokeWidth="1.3"
              />
              <path
                d="M 298 148 C 310 139 330 139 342 148"
                stroke="#FFFFFF"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeOpacity="0.7"
              />
              <path
                d="M 304 154 C 314 148 326 148 336 154"
                stroke="#777777"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* Professional Facial Features */}
              <SvgJoint x={featureX} y={featureY}>
                {/* Defined Eyebrows */}
                <motion.path
                  d="M 301 178 Q 308 174 315 177"
                  stroke="#111111"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  animate={{ y: engaged ? -1.5 : lookingAtTablet ? 1.5 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.path
                  d="M 325 177 Q 332 174 339 178"
                  stroke="#111111"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  animate={{ y: engaged ? -1.5 : lookingAtTablet ? 1.5 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Almond Eyes (subtle downward focus when reading tablet) */}
                <ellipse
                  cx="308"
                  cy="186"
                  rx="4.6"
                  ry={lookingAtTablet ? 2.2 : 3}
                  fill="#FFFFFF"
                  stroke="#222222"
                  strokeWidth="1.1"
                />
                <ellipse
                  cx="332"
                  cy="186"
                  rx="4.6"
                  ry={lookingAtTablet ? 2.2 : 3}
                  fill="#FFFFFF"
                  stroke="#222222"
                  strokeWidth="1.1"
                />

                {/* Pupils */}
                <SvgJoint x={pupilX} y={pupilY}>
                  <circle cx="308" cy="186" r="2.1" fill="#0B0B0B" />
                  <circle cx="332" cy="186" r="2.1" fill="#0B0B0B" />
                  <circle cx="308.7" cy="185.2" r="0.65" fill="#FFFFFF" />
                  <circle cx="332.7" cy="185.2" r="0.65" fill="#FFFFFF" />
                </SvgJoint>

                {/* Composed Nose */}
                <path
                  d="M 320 184 L 321 202 L 316 204"
                  stroke="#333333"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Mouth cross-fade */}
                <motion.path
                  d="M 312 215 Q 320 216 328 215"
                  stroke="#222222"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: engaged ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.path
                  d="M 310 213 Q 320 220 330 213"
                  stroke="#222222"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: engaged ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </SvgJoint>
            </SvgJoint>

            {/* Right Arm: resting by tablet -> lifts & waves on welcome */}
            <SvgJoint rotate={upperArmRotate} cx={386} cy={268}>
              <path
                d="M 386 264 C 398 270 406 288 408 314 L 412 348 L 392 350 L 386 294 Z"
                fill="#161616"
                stroke="#484848"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />

              <SvgJoint rotate={foreArmRotate} cx={402} cy={346}>
                <path
                  d="M 394 344 L 366 346 L 366 360 L 406 356 Z"
                  fill="#1E1E1E"
                  stroke="#555555"
                  strokeWidth="1.4"
                />
                {/* Crisp White Cuff */}
                <path d="M 366 346 L 375 346 L 375 359 L 366 360 Z" fill="#F2F2F2" stroke="#222222" strokeWidth="1" />

                <SvgJoint rotate={handRotate} cx={364} cy={353}>
                  <path
                    d="M 366 347 L 350 344 C 346 344 345 348 349 349 L 358 351 L 346 351 C 342 352 342 355 347 356 L 359 356 L 350 358 C 347 359 348 362 353 362 L 366 359 Z"
                    fill="url(#skinLight)"
                    stroke="#333333"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                </SvgJoint>
              </SvgJoint>
            </SvgJoint>
          </SvgJoint>
        </motion.g>
      </svg>
    </div>
  );
}
