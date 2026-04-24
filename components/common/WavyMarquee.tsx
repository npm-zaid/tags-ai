'use client'
import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const WavyMarquee: React.FC = () => {
  const textPathRef = useRef<SVGTextPathElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
     
      gsap.to(textPathRef.current, {
        attr: { startOffset: -648 },
        duration: 12,
        repeat: -1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  const segments = Array.from({ length: 6 });

  return (
    <div className="relative  w-full  flex items-center overflow-hidden antialiased">
      <div className="w-full">
        <svg 
          viewBox="0 0 1100 240" 
          className="w-full  h-auto overflow-visible select-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <path
              id="wavePath"
              fill="none"
              d="M-550,59.58 S-183.15,209.58 0,209.58 S366.85,59.58 550,59.58 S916.85,209.58 1100,209.58 S1466.85,59.58 1650,59.58 S2016.85,209.58 2200,209.58 S2566.85,59.58 2750,59.58"
            />
          </defs>
          <text className="text-[64px] font-medium uppercase fill-black font-plus-jakarta-sans">
            <textPath 
              ref={textPathRef} 
              href="#wavePath" 
              startOffset="0"
            >
              {segments.map((_, i) => (
                <tspan key={i} x={i * 648}>
                 Tags is here🔥! 
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </div>


    </div>
  );
};

export default WavyMarquee;