"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Zap, PlayCircle, BarChart3, Users } from "lucide-react";

export default function DataFlowBeam() {
  const mainGlow = useRef<SVGLinearGradientElement | null>(null);
  const branchGlows = useRef<SVGLinearGradientElement[]>([]);
  const centerNode = useRef<HTMLDivElement | null>(null);
  const centerIcon = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
    });

    // Reset Gradients (Left to Right flow now)
    tl.set([mainGlow.current, ...branchGlows.current], {
      attr: { x1: "-20%", x2: "-20%" },
    });

    // 1. MAIN BEAM (LOGO -> CENTER)
    tl.to(mainGlow.current, {
      attr: { x1: "120%", x2: "100%" },
      duration: 1.4,
      ease: "power2.inOut",
    });

    // 2. CENTER PULSE
    tl.to(centerIcon.current, {
      color: "#7C3AED",
      scale: 1.2,
      duration: 0.2,
      ease: "back.out(2)",
    }, "-=0.2");

    tl.to(centerNode.current, {
      borderColor: "#7C3AED",
      boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
      duration: 0.2,
    }, "-=0.2");

    // 3. BRANCH BEAMS (CENTER -> METRICS)
    tl.to(branchGlows.current, {
      attr: { x1: "120%", x2: "100%" },
      duration: 1.8,
      stagger: 0.1,
      ease: "power2.inOut",
    });

    // 4. RESET CENTER
    tl.to([centerIcon.current, centerNode.current], {
      color: "#71717a",
      scale: 1,
      borderColor: "#e4e4e7",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      duration: 0.5,
    });
  }, []);

  return (
    <div className="flex items-center justify-center w-full  py-20 ">
      <div className="relative w-full max-w-6xl px-4">
        <svg viewBox="0 0 950 500" className="w-full drop-shadow-sm">
          <defs>
            {/* Main Flow Gradient */}
            <linearGradient id="mainGlow" ref={mainGlow} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* Branch Gradients */}
            {[0, 1, 2].map((_, i) => (
              <linearGradient
                key={i}
                id={`branchGlow-${i}`}
                ref={(el) => el && (branchGlows.current[i] = el)}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="transparent" />
                <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.6" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            ))}
          </defs>

          {/* BACKGROUND LINES (Left to Right) */}
          {/* Main stem */}
          <path d="M140 250 L460 250" stroke="#e4e4e7" strokeWidth="2" strokeDasharray="4 4" />
          {/* Branches */}
          <path d="M480 250 C 600 250, 700 120, 800 110" stroke="#e4e4e7" strokeWidth="2" fill="none" />
          <path d="M480 250 C 600 250, 700 250, 800 250" stroke="#e4e4e7" strokeWidth="2" fill="none" />
          <path d="M480 250 C 600 250, 700 380, 800 390" stroke="#e4e4e7" strokeWidth="2" fill="none" />

          {/* ANIMATED BEAMS */}
          <path d="M140 250 L460 250" stroke="url(#mainGlow)" strokeWidth="4" fill="none" strokeLinecap="round" />
          {[
            "M480 250 C 600 250, 700 120, 800 110",
            "M480 250 C 600 250, 700 250, 800 250",
            "M480 250 C 600 250, 700 380, 800 390",
          ].map((d, i) => (
            <path key={i} d={d} stroke={`url(#branchGlow-${i})`} strokeWidth="4" fill="none" strokeLinecap="round" />
          ))}

          {/* LEFT: LOGO NODE */}
          <foreignObject x="20" y="175" width="150" height="150">
            <div className="flex items-center justify-center h-full">
              <div className="w-28 h-28 rounded-3xl bg-white border border-zinc-200 shadow-lg flex items-center justify-center p-4">
                <img
                  src='assets/tags-logo.png'
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </foreignObject>

          {/* CENTER: PROCESSOR */}
          <foreignObject x="435" y="210" width="80" height="80">
            <div className="flex items-center justify-center h-full">
              <div
                ref={centerNode}
                className="w-16 h-16 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm transition-all duration-300"
              >
                <Zap ref={centerIcon} className="w-8 h-8 text-zinc-400 fill-current" />
              </div>
            </div>
          </foreignObject>

          {/* RIGHT: METRIC NODES */}
          <foreignObject x="780" y="40" width="160" height="140">
            <div className="bg-[#ADC443] backdrop-blur-sm border  border-white p-5 rounded-3xl shadow-lg flex flex-col items-center text-center">
              <PlayCircle className="w-6 h-6 text-white mb-2" />
              <span className="text-3xl font-bold text-white leading-none">1B</span>
              <span className="text-xs font-medium text-white/80 mt-1 uppercase tracking-wider">Videos</span>
            </div>
          </foreignObject>

          <foreignObject x="780" y="180" width="160" height="140">
            <div className="bg-[#F09C31] backdrop-blur-sm border border-white p-5 rounded-3xl shadow-lg shadow-purple-900/5 flex flex-col items-center text-center">
              <BarChart3 className="w-6 h-6 text-white mb-2" />
              <span className="text-3xl font-bold text-white leading-none">700K</span>
              <span className="text-xs font-medium text-white/80 mt-1 uppercase tracking-wider">Daily Trend</span>
            </div>
          </foreignObject>

          <foreignObject x="780" y="320" width="160" height="140">
            <div className="bg-[#68C1E0] backdrop-blur-sm border border-white p-5 rounded-3xl shadow-lg shadow-blue-900/5 flex flex-col items-center text-center">
              <Users className="w-6 h-6 text-white mb-2" />
              <span className="text-3xl font-bold text-white leading-none">8M+</span>
              <span className="text-xs font-medium text-white/80 mt-1 uppercase tracking-wider">Channels</span>
            </div>
          </foreignObject>
        </svg>

      </div>
    </div>
  );
}