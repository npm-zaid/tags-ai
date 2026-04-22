"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpFromDot, Sparkles,  MessageCircle } from "lucide-react";
import gsap from "gsap";

const GridOverlay = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="tgs-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tgs-grid)" />
  </svg>
);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const typingTlRef = useRef<gsap.core.Timeline | null>(null);

  const [showTyping, setShowTyping] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const suggestions = ["Trending reels this week", "Gen Z gaming", "IPL 2025 sentiment"];

  useEffect(() => {
    if (!showTyping || !placeholderRef.current) return;
    const texts = ["Enter keyword...", "What's trending?", "Analyze sentiment...", "Find viral content..."];
    const tl = gsap.timeline({ repeat: -1 });
    typingTlRef.current = tl;
    texts.forEach((text) => {
      tl.to(placeholderRef.current!, { textContent: text, duration: 1, ease: "power1.inOut" })
        .to({}, { duration: 1.5 })
        .to(placeholderRef.current!, { textContent: "", duration: 0.5, ease: "power1.in" });
    });
    return () => tl.kill();
  }, [showTyping]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating Social Icons - Random floating motion
      const icons = [".float-yt", ".float-ig", ".float-tw", ".float-tt"];
      icons.forEach((selector, i) => {
        gsap.to(selector, {
          y: "random(-20, 20)",
          x: "random(-15, 15)",
          rotation: "random(-10, 10)",
          duration: `random(3, 5)`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });

      // Subtle Glow following mouse (Optional flair)
      gsap.to(".main-glow", {
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const stopTyping = () => {
    if (!showTyping) return;
    setShowTyping(false);
    typingTlRef.current?.kill();
    if (placeholderRef.current) placeholderRef.current.textContent = "";
  };

  return (
    <div ref={heroRef} className="relative min-h-screen pt-[20vh] overflow-hidden flex flex-col items-center justify-center px-6 py-20 ">
   
     {/* BACKGROUND BLOBS */}
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full bg-[#9186BB]/30  blur-[180px]" />
      <div className="absolute hidden sm:block -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#9186BB]/30 blur-[180px]" />
    
      {/* ─── Floating Social Media Icons ─── */}
      <div className="float-yt absolute left-[10%] top-[25%] drop-shadow-2xl  drop-shadow-black/30 z-20 ">
      <img className="w-[15vw] sm:w-[8vw]" src="assets/insta.png" alt="Youtube" />
      </div>

      <div className="float-ig absolute right-[12%] top-[25%] drop-shadow-2xl z-20  drop-shadow-black/30 ">
       <img className="w-[15vw] sm:w-[8vw]" src="assets/youtube.png" alt="Youtube" />
      
      </div>

      <div className="float-tw absolute left-[12%] bottom-[25%] drop-shadow-2xl  drop-shadow-black/30 z-20 ">
        <img className="w-[15vw] sm:w-[8vw]" src="assets/trend.png" alt="Youtube" />
      </div>

      <div className="float-tt absolute right-[10%] bottom-[20%]  z-20 drop-shadow-2xl  drop-shadow-black/30 ">
          <img className="w-[12vw]" src="assets/search.png" alt="Youtube" />
      </div>

      {/* Main Glow Background */}
      <div className="main-glow absolute w-[600px] h-[600px] bg-indigo-100/40 blur-[120px] rounded-full z-0" />

      {/* ─── Content ─── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-1.5 mb-8 shadow-sm backdrop-blur-md">
          <Sparkles size={14} className="text-[#9186BB] animate-pulse" />
          <span className="mono-ui text-[11px] font-bold tracking-widest text-[#9186BB] uppercase">
            Platform-Wide Intelligence
          </span>
        </div> */}

        <h1 className="cool-text text-[3rem] sm:text-7xl md:text-[5.5rem] font-[800] leading-[1.05] tracking-tight text-[#1a1a1a] ">
          Everything <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-[#9186BB] to-[#9186BB] font-black italic pr-8">Trending</span> <br/> 
          Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-[#9186BB] to-[#9186BB] font-black italic pr-8">Socials</span>
        </h1>

        <p className="cool-text text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed my-6 font-medium">
          A single search to decode viral patterns on YouTube and Instagram
        </p>

        {/* ─── The Search Box (Improved) ─── */}
        <div className="w-full max-w-2xl px-4 group ">
          <div className="bg-[#9186BB]/30   border-2 border-[#9186BB]/50  p-2 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:shadow-[0_30px_70px_-10px_rgba(99,102,241,0.15)] group-hover:-translate-y-1">
            <div className="relative  bg-white/50 rounded-[2rem] overflow-hidden min-h-[220px] flex flex-col">
              
              <div className="relative flex-grow">
                {showTyping && (
                  <span ref={placeholderRef} className="absolute left-8 top-8 text-slate-400 pointer-events-none text-lg font-medium opacity-60 italic" />
                )}
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  className="w-full bg-transparent outline-none px-8 pt-8 pb-4 text-slate-800 text-lg resize-none font-medium placeholder:opacity-0"
                  onFocus={stopTyping}
                  onChange={(e) => { setInputValue(e.target.value); stopTyping(); }}
                />
              </div>

              <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100/50">
                <div className="flex gap-2 flex-wrap">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => { setInputValue(s); stopTyping(); }}
                      className="px-4 py-1.5 rounded-full text-[11px] font-semibold  bg-[#9186BB]/10 text-[#9186BB] transition-all border border-transparent hover:border-[#9186BB]/30"
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-full text-white shadow-lg">
                    <Sparkles size={14} className="text-red-500" />
                    <span className="mono-ui text-[10px] font-bold uppercase tracking-tighter">Youtube</span>
                  </div>
                  
                  <button
                    disabled={!inputValue.trim()}
                    className="w-12 h-12 rounded-full bg-[#9186BB] text-white flex items-center justify-center shadow-xl shadow-black/30 hover:bg-black hover:scale-110 active:scale-95 disabled:opacity-20 transition-all"
                  >
                    <ArrowUpFromDot size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}