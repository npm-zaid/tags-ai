'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Marquee = () => {
  const containerRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Row 1: Skew + Movement Left
      gsap.to(row1Ref.current, {
        x: "-30%",
        skewX: -10, // Adds momentum feel
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5, // Smoother follow
        }
      });

      // Row 2: Skew + Movement Right
      gsap.fromTo(row2Ref.current, 
        { x: "-40%", skewX: 10 }, 
        {
          x: "-10%",
          skewX: -5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const phrases = Array.from({ length: 12 });

  return (
    <div 
      ref={containerRef} 
      className='py-16 flex flex-col gap-4 overflow-hidden w-full  perspective-1000'
    >
      
      {/* ROW 1: THE PURPLE STREAK */}
      <div 
        ref={row1Ref} 
        className="flex gap-8 py-6 w-fit whitespace-nowrap bg-[#9186BB] shadow-[0_20px_50px_rgba(145,134,187,0.3)] origin-center"
      >
        {phrases.map((_, i) => (
          <div key={i} className="flex items-center gap-8">
            <h1 className="text-white uppercase italic text-[1vw] md:text-[6vw] font-black tracking-tighter">
              TAGS IS HERE
            </h1>
            <span className="text-[1vw] md:text-[6vw] font-outline-2 text-transparent uppercase italic font-black opacity-40">
              TAGS IS HERE
            </span>
          </div>
        ))}
      </div>

      {/* ROW 2: THE ORANGE STREAK */}
      <div 
        ref={row2Ref} 
        className="flex gap-8 py-6 w-fit whitespace-nowrap bg-[#F09C31] shadow-[0_20px_50px_rgba(240,156,49,0.3)] origin-center"
      >
        {phrases.map((_, i) => (
          <div key={i} className="flex items-center gap-8">
             <span className="text-[12vw] md:text-[6vw] font-outline-2 text-transparent uppercase italic font-black opacity-40">
              ULTRA SCALE
            </span>
            <h1 className="text-white uppercase italic text-[12vw] md:text-[6vw] font-black tracking-tighter">
              ULTRA SCALE
            </h1>
          </div>
        ))}
      </div>

      <style jsx>{`
        .font-outline-2 {
          -webkit-text-stroke: 2px white;
        }
        @media (max-width: 768px) {
          .font-outline-2 {
            -webkit-text-stroke: 1px white;
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;