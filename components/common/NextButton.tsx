"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";

const NextButton: React.FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const polygonsRef = useRef<SVGPolygonElement[]>([]);

  const handleMouseEnter = () => {
    if (!buttonRef.current) return;

    // Button glow + scale
    gsap.to(buttonRef.current, {
      boxShadow: "0 0 20px #ff135a",
      duration: 0.4,
    });

    // Ripple effect (outline simulation)
    gsap.fromTo(
      buttonRef.current,
      { outlineWidth: "0px", outlineColor: "transparent" },
      {
        outlineWidth: "6px",
        outlineColor: "#ff145a40",
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      }
    );

    // Arrow animation
    polygonsRef.current.forEach((poly, i) => {
      gsap.to(poly, {
        x: 0,
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
        duration: 0.6,
      });
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.killTweensOf(buttonRef.current);
    gsap.killTweensOf(polygonsRef.current);

    gsap.to(buttonRef.current, {
      boxShadow: "0 0 5px #ff135a",
      outlineWidth: "0px",
      duration: 0.3,
    });

    polygonsRef.current.forEach((poly, i) => {
      gsap.to(poly, {
        x: i === 0 ? -20 : i === 1 ? -10 : 0,
        opacity: 1,
        duration: 0.3,
      });
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex items-center justify-center rounded-full px-4 py-2 text-white font-semibold text-xl bg-pink-600 shadow-md transition-transform active:scale-95"
    >
      <span className="mr-2">NEXT</span>

      <svg
        className="h-5 fill-white"
        viewBox="0 0 66 43"
      >
        {[0, 1, 2].map((_, i) => (
          <polygon
            key={i}
            ref={(el) => {
              if (el) polygonsRef.current[i] = el;
            }}
            points={
              i === 0
                ? "39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"
                : i === 1
                ? "19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"
                : "0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"
            }
            className="transition-transform"
            style={{
              transform: `translateX(${i === 0 ? "-20px" : i === 1 ? "-10px" : "0px"})`,
            }}
          />
        ))}
      </svg>
    </button>
  );
};

export default NextButton;