"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from "next/navigation";
import {
  Search,
  Zap,
  ArrowUpRight,
  Sparkles,
  Radio,
  Target,
  CheckCircle2,
  BarChart3,
  Languages,
  MessageSquareHeart,
  BrainCircuit,
  Globe
} from 'lucide-react';

interface TrendData {
  keyword: string;
  platform: 'YouTube' | 'Instagram';
  sentiment: number;
  reach: string;
}

const TagsProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trendTrackRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const trendingKeywords: TrendData[] = [
    { keyword: "Sustainable Tech", platform: "YouTube", sentiment: 88, reach: "2.4M" },
    { keyword: "Gen-Z Finance", platform: "Instagram", sentiment: 72, reach: "850K" },
    { keyword: "AI Art Tools", platform: "YouTube", sentiment: 94, reach: "4.1M" },
    { keyword: "Minimalist Travel", platform: "Instagram", sentiment: 81, reach: "1.2M" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. AI Scanning Line
      gsap.to(".scan-line", {
        top: "100%",
        duration: 3,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true
      });

      // 2. Radar Orbits
      orbitRefs.current.forEach((el, i) => {
        if (el) {
          gsap.to(el, {
            rotate: i % 2 === 0 ? 360 : -360,
            duration: 10 + i * 3,
            repeat: -1,
            ease: "none"
          });
        }
      });

      // 3. Vertical Trend Scroll
      if (trendTrackRef.current) {
        const trackHeight = trendTrackRef.current.offsetHeight / 2;
        gsap.to(trendTrackRef.current, {
          y: -trackHeight,
          duration: 12,
          ease: "none",
          repeat: -1
        });
      }

      // 4. Data Workflow Loop
      const tl = gsap.timeline({ repeat: -1, delay: 1 });
      gsap.set(".wf-card", { opacity: 0, y: 20 });
      
      tl.to(".wf-step-1", { borderColor: "#B1C357", duration: 0.5 })
        .to(".wf-card-1", { opacity: 1, y: 0, duration: 0.4 })
        .to(".wf-card-1", { opacity: 0, x: 30, duration: 0.4, delay: 1 })
        
        .to(".wf-step-2", { borderColor: "#7EBEDB", duration: 0.5 })
        .to(".wf-card-2", { opacity: 1, y: 0, duration: 0.4 })
        .to(".wf-card-2", { opacity: 0, x: 30, duration: 0.4, delay: 1 })
        
        .to(".wf-step-3", { borderColor: "#9186BB", duration: 0.5 })
        .to(".wf-card-3", { opacity: 1, y: 0, duration: 0.4 })
        .to({}, { duration: 1.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8FAFC] p-6 lg:p-12 text-slate-900 selection:bg-[#B1C357]/30 overflow-x-hidden">
      
      {/* HEADER */}
      <div className="relative mb-16 mt-8 flex flex-col items-center">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-4">
          <Sparkles size={14} className="text-[#B1C357]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Analytics Engine v2.0
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-center leading-[0.9]">
          Explore Our <span className="bg-gradient-to-r from-[#B1C357] to-[#8ea13b] bg-clip-text text-transparent italic">AI Core</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* CARD 1: CONTEXTUAL SEARCH */}
        <div className="lg:col-span-8 group relative bg-white rounded-[3rem] p-10 border border-slate-200 shadow-xl overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-slate-900 rounded-2xl"><Search size={20} className="text-[#B1C357]" /></div>
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Intelligence Search</h2>
                <p className="text-xl font-bold">Contextual Trend Finder</p>
              </div>
            </div>

            <div className="relative mb-8 max-w-md">
              <h3 className="text-4xl font-black tracking-tighter leading-tight mb-6">
                Predict the <br />
                <span className="text-[#B1C357] italic">Next Viral</span> <br />
                content wave.
              </h3>
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 p-2 rounded-full focus-within:ring-2 ring-[#B1C357]/20 transition-all">
                <div className="bg-[#B1C357] p-3 rounded-full text-white shadow-md">
                  <BrainCircuit size={18} />
                </div>
                <input 
                  className="bg-transparent border-none outline-none text-slate-800 font-medium w-full px-2" 
                  placeholder="Ask about Hindi Tech trends..." 
                />
              </div>
            </div>
          </div>

          {/* AI ANALYTICS OVERLAY */}
          <div className="absolute right-8 top-10 w-[40%] h-[85%] bg-slate-50 rounded-[2.5rem] border border-slate-200 hidden md:block overflow-hidden">
            <div className="scan-line absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B1C357] to-transparent z-20 shadow-[0_0_15px_#B1C357]" />
            <div className="p-6">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Real-time Extraction</p>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#B1C357] animate-pulse" />
                    <div className="space-y-1 flex-1">
                      <div className="h-2 w-2/3 bg-slate-100 rounded" />
                      <div className="h-1.5 w-1/2 bg-slate-50 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: RADAR - SENTIMENT ANALYSIS */}
        <div className="lg:col-span-4 bg-slate-900 rounded-[3rem] p-8 border-2 border-slate-800 text-white relative overflow-hidden group shadow-2xl">
          <div className="relative z-10 h-full flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-8">
              <div className="p-3 bg-[#B1C357] rounded-2xl text-black font-bold"><MessageSquareHeart size={20} /></div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/40 uppercase">Analyzing Sentiment</span>
                <Radio size={14} className="text-[#B1C357] animate-pulse" />
              </div>
            </div>

            <div className="relative w-56 h-56 flex items-center justify-center">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  ref={(el) => { orbitRefs.current[num - 1] = el; }}
                  className="absolute border border-white/10 rounded-full"
                  style={{ width: `${num * 70}px`, height: `${num * 70}px` }}
                />
              ))}
              <div className="z-20 w-24 h-24 rounded-full border-[6px] border-[#B1C357]/20 flex items-center justify-center bg-slate-800 shadow-[0_0_50px_#B1C35733]">
                <div className="text-center">
                  <p className="text-2xl font-black">92%</p>
                  <p className="text-[8px] uppercase font-bold text-[#B1C357]">Positive</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 text-center">
              <h4 className="text-lg font-bold">Audience Pulse</h4>
              <p className="text-slate-500 text-xs mt-1">Detecting sarcasm & emotional triggers</p>
            </div>
          </div>
        </div>

        {/* CARD 3: GLOBAL TRENDS TRACKER */}
        <div className="lg:col-span-4 bg-white rounded-[3rem] p-8 border border-slate-200 relative h-[480px] overflow-hidden shadow-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#7EBEDB] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
              <Globe size={22} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tighter">Global <span className="text-[#7EBEDB]">Trends</span></h3>
              <p className="text-[10px] font-bold text-slate-400">LIVE KEYWORD FEED</p>
            </div>
          </div>

          <div className="relative h-[320px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            <div ref={trendTrackRef} className="space-y-4">
              {[...trendingKeywords, ...trendingKeywords].map((trend, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    {trend.platform === 'YouTube' ? <Sparkles size={16} className="text-red-500" /> : <Sparkles size={16} className="text-pink-500" />}
                    <div>
                      <p className="text-sm font-bold text-slate-800">{trend.keyword}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Reach: {trend.reach}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-[#7EBEDB]">{trend.sentiment}%</p>
                    <p className="text-[8px] uppercase text-slate-300">Sentiment</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 4: DATA PIPELINE WORKFLOW */}
        <div className="lg:col-span-8 bg-slate-50 rounded-[3rem] p-10 border border-slate-200 relative overflow-hidden shadow-inner">
          <div className="flex gap-4 items-center mb-10">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
              <Zap size={20} className="text-[#B1C357]" />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tighter">Analysis <span className="italic text-[#B1C357]">Pipeline</span></h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase">From Raw Data to Insight</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* STEP 1 */}
            <div className="wf-step-1 flex flex-col bg-white rounded-3xl p-6 border-2 border-transparent shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#B1C357]"><Languages size={14} /></div>
                <span className="font-bold text-xs uppercase tracking-tight">Detection</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Auto-detecting language, gender, and age demographics.</p>
              <div className="wf-card wf-card-1 bg-[#B1C357]/10 p-4 rounded-xl border border-[#B1C357]/20 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#B1C357]" />
                <span className="text-[10px] font-black uppercase">Data Parsed</span>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="wf-step-2 flex flex-col bg-white rounded-3xl p-6 border-2 border-transparent shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#7EBEDB]"><BarChart3 size={14} /></div>
                <span className="font-bold text-xs uppercase tracking-tight">Contextualizing</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Cross-referencing keywords with global platform trends.</p>
              <div className="wf-card wf-card-2 bg-[#7EBEDB]/10 p-4 rounded-xl border border-[#7EBEDB]/20 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#7EBEDB]" />
                <span className="text-[10px] font-black uppercase">Trend Linked</span>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="wf-step-3 flex flex-col bg-white rounded-3xl p-6 border-2 border-transparent shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white"><Sparkles size={14} /></div>
                <span className="font-bold text-xs uppercase tracking-tight">Prediction</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-6 font-medium">Finalizing growth score and viral probability.</p>
              <div className="wf-card wf-card-3 bg-slate-900 p-4 rounded-xl text-white flex flex-col items-center">
                <Zap size={20} className="text-[#B1C357] mb-2" />
                <span className="text-[10px] font-black uppercase">98.2 Growth Score</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TagsProductShowcase;