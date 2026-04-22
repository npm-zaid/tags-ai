'use client'
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Text() {
  const container = useRef();
  const paths = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.current,
        start: "top bottom",
        end: "bottom bottom",
        onUpdate(self) {
          const e = self.progress;
          paths.current.forEach((path, i) => {
            path.setAttribute("startOffset", (i * 33.33 + e * 33.33) + "%");
          });
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="h-screen bg-amber-800/20">
      <svg
        className="w-full"
        viewBox="0 0 1000 360"   
      >
        <path
          fill="none"
          id="curve"
          d="m0,354c245,0,246-272,506-272,232,0,204,272,492,272"
        />
        <text
          fontFamily="sans-serif"
          fontWeight="700"
          fontSize="22"          
          fill="#000"
          letterSpacing="2"
        >
          {[...Array(3)].map((_, i) => (
            <textPath
              key={i}
              ref={(ref) => (paths.current[i] = ref)}
              startOffset={i * 33.33 + "%"}
              href="#curve"
            >
              {"TAGS ANALYSIS || TRENDING || VIRAL     "}
            </textPath>
          ))}
        </text>
      </svg>
    </div>
  );
}