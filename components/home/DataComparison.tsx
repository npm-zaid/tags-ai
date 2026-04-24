'use client'

import React, { useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FileCode, Search, BrainCircuit, Users, Smile, LucideIcon, Sparkles } from 'lucide-react'

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Interfaces
interface InsightItem {
  icon: LucideIcon;
  label: string;
  val: string;
  change: string;
}

// Data constants
const RAW_PAYLOAD: string = `{
  "content_id": "v_alpha_99",
  "stream": "engagement_buffer",
  "metrics": { "view_count": 890234, "ctr": 0.042 },
  "sentiment_raw": [0.8, -0.1, 0.4, 0.9, 0.2],
  "demographics": { "m": 0.65, "f": 0.35, "age": [18, 24, 34] },
  "geo_nodes": ["US", "UK", "IN", "DE"]
}`;

const INSIGHTS: InsightItem[] = [
  { icon: BrainCircuit, label: 'Neural Niche', val: 'Digital Lifestyle', change: 'Trending' },
  { icon: Users, label: 'Core Demographic', val: 'Gen-Z (65%)', change: 'High Intent' },
  { icon: Smile, label: 'Audience Pulse', val: 'Hyper-Positive', change: '92% Score' },
];

const DataComparison: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal
      gsap.from(".reveal-node", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Pulse for the "AI is processing" indicator
      gsap.to(".processing-dot", {
        opacity: 0.3,
        scale: 1.5,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const updateSlider = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging || e.buttons === 1) updateSlider(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    updateSlider(e.touches[0].clientX);
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-[#09090b] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 reveal-node">
              <div className="w-10 h-[1px] bg-[#9186BB]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9186BB]">Transformation Engine</span>
            </div>
            <h2 className="reveal-node text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-6">
              RAW DATA TO <br /> <span className="text-[#9186BB] italic">INTELLIGENCE.</span>
            </h2>
          </div>
          <div className="reveal-node pb-4">
            <p className="text-zinc-500 text-sm md:text-base max-w-xs leading-relaxed font-medium">
              We decode millions of data points into a single growth strategy. Drag to see the AI in action.
            </p>
          </div>
        </div>

        {/* The Comparison Box */}
        <div 
          ref={sliderRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          className="reveal-node relative w-full h-[500px] md:h-[650px] rounded-[3rem] bg-zinc-900 border border-white/5 overflow-hidden cursor-ew-resize select-none group"
        >
          {/* LEFT PANEL: SOURCE DATA */}
          <div 
            className="absolute inset-0 bg-[#0c0c0e] p-10 md:p-16 z-10 border-r border-white/10"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="flex items-center gap-3 mb-12">
              <FileCode size={18} className="text-[#9186BB]" />
              <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Source JSON_Payload</span>
            </div>
            <pre className="text-zinc-700 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap">
              {RAW_PAYLOAD} {RAW_PAYLOAD}
            </pre>
          </div>

          {/* RIGHT PANEL: AI OUTPUT */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#121214] to-[#09090b] p-10 md:p-16 flex flex-col justify-center">
            <div className="absolute top-10 right-10 flex items-center gap-4">
              <div className="relative">
                <div className="processing-dot absolute inset-0 bg-[#9186BB] rounded-full" />
                <div className="relative w-2 h-2 bg-[#9186BB] rounded-full" />
              </div>
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Tags AI Analysis</span>
            </div>

            <div className="grid grid-cols-1 gap-6 max-w-md ml-auto w-full">
              {INSIGHTS.map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-6 md:p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.06] transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-[#9186BB]/10 flex items-center justify-center text-[#9186BB]">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</p>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-tighter">
                        {item.change}
                      </span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* THE DRAGGER HANDLE */}
          <div 
            className="absolute top-0 bottom-0 w-[2px] bg-[#9186BB] z-20 pointer-events-none shadow-[0_0_20px_rgba(145,134,187,0.5)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-black group-hover:scale-110 transition-transform duration-300">
              <Search size={22} strokeWidth={3} />
              {/* Floating Help Badge */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                Slide to analyze
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex justify-center md:justify-end reveal-node">
          <div className="flex items-center gap-4 text-zinc-600">
            <Sparkles size={16} />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Neural Engine v3.2 Active</p>
          </div>
        </div>

      </div>
    </section>
  )
}

export default DataComparison