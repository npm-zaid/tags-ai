/**
 * Marquee.tsx
 * Infinite horizontal marquee with GSAP — supports text + images.
 * Two rows: top scrolls LEFT, bottom scrolls RIGHT (mirrored).
 *
 * Dependencies:
 *   npm install gsap
 *   Tailwind CSS configured in your project
 *
 * Usage:
 *   import Marquee from "@/components/Marquee";
 *
 *   const items: MarqueeItem[] = [
 *     { type: "text", content: "SVELTE" },
 *     { type: "image", src: "/logo.png", alt: "Logo" },
 *     { type: "text", content: "SVELTEKIT" },
 *     { type: "image", src: "/badge.png", alt: "Badge" },
 *   ];
 *
 *   <Marquee items={items} speed={60} gap={48} />
 */

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export type MarqueeItem =
  | { type: "text"; content: string }
  | { type: "image"; src: string; alt?: string };

interface MarqueeProps {
  /** Items to display in the marquee */
  items?: MarqueeItem[];
  /** Pixels per second the track scrolls */
  speed?: number;
  /** Gap between each item in px */
  gap?: number;
  /** Text styling — Tailwind classes */
  textClassName?: string;
  /** Image height in px */
  imageHeight?: number;
  /** Whether to show the second (reverse) row */
  doubleRow?: boolean;
  /** Pause animation on hover */
  pauseOnHover?: boolean;
  /** Background Tailwind class */
  bgClassName?: string;
}

/* ─── helpers ─────────────────────────────────────────────── */

function cloneUntilFull(
  track: HTMLElement,
  original: HTMLElement[],
  gap: number
): void {
  /* Duplicate children until the track is at least 2× viewport wide */
  const vw = window.innerWidth;
  const needed = vw * 2.5;

  while (track.scrollWidth < needed) {
    original.forEach((el) => {
      const clone = el.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }
}

/* ─── single track ─────────────────────────────────────────── */

interface TrackProps {
  items: MarqueeItem[];
  direction: "left" | "right";
  speed: number;
  gap: number;
  textClassName: string;
  imageHeight: number;
  pauseOnHover: boolean;
  className?: string;
}

function MarqueeTrack({
  items,
  direction,
  speed,
  gap,
  textClassName,
  imageHeight,
  pauseOnHover,
  className = "",
}: TrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    /* collect original children for cloning */
    const originals = Array.from(track.children) as HTMLElement[];
    cloneUntilFull(track, originals, gap);

    /* width of one "page" = the original set */
    const pageWidth = originals.reduce((acc, el) => {
      const style = getComputedStyle(el);
      return (
        acc +
        el.offsetWidth +
        parseFloat(style.marginLeft) +
        parseFloat(style.marginRight)
      );
    }, 0);

    const from = direction === "left" ? 0 : -pageWidth;
    const to = direction === "left" ? -pageWidth : 0;

    gsap.set(track, { x: from });

    tweenRef.current = gsap.to(track, {
      x: to,
      duration: pageWidth / speed,
      ease: "none",
      repeat: -1,
    });

    const pause = () => tweenRef.current?.pause();
    const resume = () => tweenRef.current?.play();

    if (pauseOnHover) {
      track.addEventListener("mouseenter", pause);
      track.addEventListener("mouseleave", resume);
    }

    return () => {
      tweenRef.current?.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, [direction, speed, gap, pauseOnHover]);

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, i) =>
          item.type === "text" ? (
            <span
              key={i}
              className={`shrink-0 select-none leading-none ${textClassName}`}
              style={{ marginRight: `${gap}px` }}
            >
              {item.content}
            </span>
          ) : (
            <img
              key={i}
              src={item.src}
              alt={item.alt ?? ""}
              className="shrink-0 object-contain"
              style={{ height: `${imageHeight}px`, marginRight: `${gap}px` }}
              draggable={false}
            />
          )
        )}
      </div>
    </div>
  );
}

/* ─── main component ──────────────────────────────────────── */

const DEFAULT_ITEMS: MarqueeItem[] = [
  { type: "text", content: "TAGS" },
  { type: "text", content: "AI" },
  { type: "text", content: "TRENDING" },
  { type: "text", content: "SOCIALS" },
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  speed = 80,
  gap = 48,
  textClassName = "text-[clamp(3rem,8vw,9rem)] font-black uppercase tracking-tight ",
  imageHeight = 80,
  doubleRow = true,
  pauseOnHover = true,
  bgClassName = "bg-white",
}: MarqueeProps) {
  return (
    <section
      className={`w-full overflow-hidden py-4 ${bgClassName}`}
      aria-label="Marquee banner"
    >
      {/* Row 1 — left */}
      <MarqueeTrack
        items={items}
        direction="left"
        speed={speed}
        gap={gap}
        textClassName={`${textClassName} text-transparent  [-webkit-text-stroke:3px_#9186BB]`}
        imageHeight={imageHeight}
        pauseOnHover={pauseOnHover}
        className="mb-2"
      />

      {/* Row 2 — right (filled text) */}
      {doubleRow && (
        <MarqueeTrack
          items={items}
          direction="right"
          speed={speed}
          gap={gap}
          textClassName={`${textClassName} font-sans text-[#9186BB]`}
          imageHeight={imageHeight}
          pauseOnHover={pauseOnHover}
        />
      )}
    </section>
  );
}