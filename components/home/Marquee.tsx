'use client'
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
      // Move Row 1 Left
      gsap.to(row1Ref.current, {
        x: "-20%", 
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Move Row 2 Right (Starting from an offset)
      gsap.fromTo(row2Ref.current, 
        { x: "-30%" }, 
        {
          x: "0%",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // overflow-hidden on the parent is CRUCIAL to stop the "cut" look
    <div ref={containerRef} className='py-20 flex flex-col gap-12 overflow-hidden w-full'>
      
      {/* Row 1: Purple */}
      <div 
        ref={row1Ref} 
        className="flex gap-12 py-4 w-fit  whitespace-nowrap bg-[#9385BF] border-y-8 border-white shadow-2xl"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <h1 key={i} className="flex-shrink-0 text-white uppercase italic text-[3vw] font-black px-4">
            TAGS IS HERE
          
          </h1>
        ))}
      </div>

      {/* Row 2: Orange */}
      <div 
        ref={row2Ref} 
        className="flex gap-12 py-4 w-fit  whitespace-nowrap bg-[#F09C31] border-y-8 border-white shadow-2xl"
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <h1 key={i} className="flex-shrink-0 text-white uppercase italic text-[3vw] font-black px-4">
            TAGS IS HERE
          </h1>
        ))}
      </div>

    </div>
  );
};

export default Marquee;