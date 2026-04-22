"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from "next/navigation";
import SectionIntro from '../common/SectionIntro';
import {
  Search, Sparkles, Radio, ArrowUpRight,
  TrendingUp, Star, Eye, Hash,
 Users, BarChart2,
} from 'lucide-react';

// ─── Colors ──────────────────────────────────────────────────────────────────
const C = {
  purple: '#9385BF',
  green:  '#ADC443',
  blue:   '#68C1E0',
  orange: '#F09C31',
  // at /30 opacity (hex ~4D)
  purpleCard: '#9385BF4D',
  greenCard:  '#ADC4434D',
  blueCard:   '#68C1E04D',
  orangeCard: '#F09C314D',
  // text
  dark:   '#1e1b2e',
  muted:  '#6b6880',
  border: '#e2dff0',
};

// ─── Data ────────────────────────────────────────────────────────────────────
const aiMatches = [
  { name: "Tech Reviews",      niche: "Technology",   score: 98, match: "Perfect" },
  { name: "Finance Tips",      niche: "Finance",      score: 94, match: "Strong"  },
  { name: "Gaming Weekly",     niche: "Gaming",       score: 91, match: "Strong"  },
  { name: "Lifestyle Daily",   niche: "Lifestyle",    score: 87, match: "Good"    },
];

const trendingVideos = [
  { title: "Why AI Will Change Everything in 2025",    channel: "TechVault",   views: "9.4M",  spike: "+2.4K%", category: "Tech",      color: "#9385BF" },
  { title: "I Invested ₹1L in Crypto — Results",       channel: "MoneyMind",   views: "6.1M",  spike: "+870%",  category: "Finance",   color: "#F09C31" },
  { title: "100 Days of Coding Challenge — Final Day", channel: "DevJourney",  views: "4.8M",  spike: "+540%",  category: "Dev",       color: "#ADC443" },
  { title: "Morning Routine That Went Viral",          channel: "LiveBetter",  views: "7.2M",  spike: "+1.1K%", category: "Lifestyle", color: "#68C1E0" },
  { title: "Best Budget Phones of 2025 Ranked",        channel: "GadgetGuru",  views: "3.9M",  spike: "+430%",  category: "Tech",      color: "#9385BF" },
  { title: "Beat Production From Scratch in 1 Hour",   channel: "BeatLab",     views: "11.2M", spike: "+5.8K%", category: "Music",     color: "#F09C31" },
];

const topChannels = [
  { name: "MrBeast",          subs: "230M",  niche: "Entertainment", rank: "#1", color: "#9385BF" },
  { name: "TechWithTim",      subs: "1.2M",  niche: "Programming",   rank: "#2", color: "#ADC443" },
  { name: "GrahamStephan",    subs: "4.6M",  niche: "Finance",       rank: "#3", color: "#F09C31" },
  { name: "MKBHD",            subs: "18M",   niche: "Tech Reviews",  rank: "#4", color: "#68C1E0" },
  { name: "Ali Abdaal",       subs: "5.3M",  niche: "Productivity",  rank: "#5", color: "#9385BF" },
  { name: "Linus Tech Tips",  subs: "15M",   niche: "Hardware",      rank: "#6", color: "#ADC443" },
];

const DATA_SIGNALS = [
  { icon: '🌐', label: 'Language',  color: '#9385BF', desc: 'Top spoken tongue'  },
  { icon: '👥', label: 'Gender',    color: '#F09C31', desc: 'Audience split'     },
  { icon: '🎂', label: 'Age Group', color: '#ADC443', desc: "Who's watching"     },
  { icon: '📱', label: 'Devices',   color: '#68C1E0', desc: 'Screen breakdown'   },
  { icon: '🎬', label: 'Category',  color: '#9385BF', desc: 'Content vertical'   },
  { icon: '❤️', label: 'Sentiment', color: '#F09C31', desc: 'Mood of the crowd'  },
  { icon: '🔥', label: 'Keywords',  color: '#ADC443', desc: 'Trending tags'      },
];

const signalRow1 = DATA_SIGNALS;
const signalRow2 = [...DATA_SIGNALS].reverse();

// ─── Signal Card ─────────────────────────────────────────────────────────────
const SignalCard = ({ signal }: { signal: typeof DATA_SIGNALS[0] }) => (
  <div
    className="w-48 shrink-0 rounded-[2rem] p-5 border-2 bg-white transition-all shadow-sm"
    style={{
      borderColor: `${signal.color}50`,
      boxShadow: `0 4px 20px ${signal.color}20`,
    }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-2xl">{signal.icon}</span>
      <span
        className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
        style={{ background: `${signal.color}25`, color: signal.color }}
      >
        Live
      </span>
    </div>
    <p className="text-sm font-black mb-0.5" style={{ color: C.dark }}>{signal.label}</p>
    <p className="text-[10px]" style={{ color: C.muted }}>{signal.desc}</p>
    <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: `${signal.color}20` }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${55 + Math.random() * 40}%`, background: signal.color }}
      />
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const TagsDashboard = () => {
  const containerRef        = useRef<HTMLDivElement>(null);
  const topVideosTrackRef   = useRef<HTMLDivElement>(null);
  const topChannelsTrackRef = useRef<HTMLDivElement>(null);
  const signalRow1Ref       = useRef<HTMLDivElement>(null);
  const signalRow2Ref       = useRef<HTMLDivElement>(null);
  const router              = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scan-line", {
        top: "100%", duration: 3, repeat: -1, ease: "sine.inOut", yoyo: true,
      });

      if (topVideosTrackRef.current) {
        const h = topVideosTrackRef.current.offsetHeight / 2;
        gsap.to(topVideosTrackRef.current, {
          y: -h, duration: 12, ease: "none", repeat: -1,
        });
      }

      if (topChannelsTrackRef.current) {
        const h = topChannelsTrackRef.current.offsetHeight / 2;
        gsap.to(topChannelsTrackRef.current, {
          y: -h, duration: 11, ease: "none", repeat: -1,
        });
      }

      if (signalRow1Ref.current) {
        const w = signalRow1Ref.current.scrollWidth / 2;
        gsap.to(signalRow1Ref.current, {
          x: -w, duration: 22, ease: "none", repeat: -1,
        });
      }
      if (signalRow2Ref.current) {
        const w = signalRow2Ref.current.scrollWidth / 2;
        gsap.fromTo(signalRow2Ref.current,
          { x: -w },
          { x: 0, duration: 26, ease: "none", repeat: -1 }
        );
      }

      gsap.to(".live-ring", {
        scale: 2.2, opacity: 0, duration: 1.1, repeat: -1, ease: "power2.out",
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen p-6 lg:p-12 py-20 overflow-x-hidden"
 
    >

      {/* ── HEADER ── */}
         <SectionIntro badgeText="Powered by Tags Intelligence" prefix="What" highlight="Tags" suffix="Sees"/>
  

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ══════════════════════════════════════════════════════════════════
            CARD 1 · TAGS AI  — purple tint  (col-span-8)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:col-span-8 group relative rounded-[3rem] p-8 border-2 border-white shadow-xl overflow-hidden"
          style={{
            background: C.purpleCard,
          }}
        >
          {/* Subtle grid bg */}
          <div className="pointer-events-none absolute inset-0">
            <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
              <defs>
                <pattern id="dgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.purple} strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dgrid)"/>
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-14">
              <div className="p-3 bg-white rounded-2xl border shadow-sm" style={{ borderColor: C.border }}>
                <Search size={20} style={{ color: C.purple }} />
              </div>
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest" style={{ color: C.muted }}>
                  Tag Engine v2
                </h2>
                <p className="text-xl font-bold" style={{ color: C.dark }}>Tags AI</p>
              </div>
            </div>

            <div className="relative mb-12">
              <h3
                className="text-5xl font-black tracking-tighter leading-[0.9] mb-8"
                style={{  color: C.dark }}
              >
                Find the{" "}
                <span className="italic line-through decoration-4" style={{ color: C.muted, textDecorationColor: C.purple }}>
                  Random
                </span>
                <br />
                <span style={{ color: C.purple }}>Place smarter.</span>
              </h3>
              <div
                className="flex items-center gap-3 bg-white border p-2 rounded-full w-fit pl-6 transition-all"
                style={{ borderColor: C.border, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
              >
             
                <input
                  onKeyDown={(e) => { if (e.key === "Enter") router.push("/ai-search"); }}
                  className="bg-transparent border-none outline-none font-medium w-1/2 sm:w-64"
                  style={{ color: C.dark }}
                  placeholder="e.g. Tech reviews in Hindi…"
                />

                   <div
                  className="p-4 rounded-full shadow-lg text-white"
                  style={{ background: C.purple, boxShadow: `0 4px 16px ${C.purple}50` }}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="w-6 h-6 fill-white">
                <path d="M800 512H160a32 32 0 0 1 0-64h640a32 32 0 1 1 0 64z" />
                <path d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z" />
              </svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right panel: AI matches ── */}
          <div
            className="absolute right-6 top-10 w-[38%] h-[85%] bg-white rounded-[3rem] border shadow-xl overflow-hidden hidden md:block"
            style={{ borderColor: C.border }}
          >
            <div
              className="scan-line absolute top-0 left-0 w-full h-[60px] z-20 border-t-2"
              style={{
                background: `linear-gradient(to bottom, ${C.purple}40, transparent)`,
                borderColor: C.purple,
              }}
            />
            <div className="p-5">
              <div className="flex justify-between items-center mb-2 mt-4">
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: C.muted }}>
                  AI Matches
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ color: C.purple, background: `${C.purple}15`, borderColor: `${C.purple}30` }}
                >
                  Live Scan
                </span>
              </div>

              {aiMatches.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl border border-gray-200 bg-gray-50 transition-all mb-2"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs shrink-0 text-white"
                    style={{ background: [C.purple, C.blue, C.green, C.orange][i % 4] }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold truncate" style={{ color: C.dark }}>{item.name}</p>
                    <p className="text-[9px]" style={{ color: C.muted }}>{item.niche} · {item.match}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${item.score}%`, background: C.purple }}
                        />
                      </div>
                      <span className="text-[9px] font-black" style={{ color: C.purple }}>{item.score}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 2 · TRENDING VIDEOS — blue tint  (col-span-4)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:col-span-4 rounded-[3rem] p-8 border-2 border-white relative overflow-hidden shadow-xl h-[480px]"
          style={{
            background: C.blueCard,
          
          }}
        >
          <div className="relative z-10 flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl shadow-lg text-white"
                style={{ background: C.blue, boxShadow: `0 4px 16px ${C.blue}50` }}
              >
                <TrendingUp size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tighter" style={{ color: C.dark }}>Trending</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.blue }}>
                  Right Now
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span
                  className="live-ring absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: C.blue }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: C.blue }} />
              </span>
              <span className="text-[9px] font-black uppercase" style={{ color: C.blue }}>Live</span>
            </div>
          </div>

          <div className="relative h-[340px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
            <div ref={topVideosTrackRef} className="space-y-3">
              {[...trendingVideos, ...trendingVideos].map((v, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-3.5 flex items-center gap-3 shadow-md transition-all"
                  style={{ borderColor: `${v.color}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] shrink-0 flex-col"
                    style={{ background: `${v.color}20`, color: v.color }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current mb-0.5">
                      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                    </svg>
                    <span className="text-[7px] font-black leading-none">{v.spike.split('+')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold leading-tight line-clamp-2 mb-1" style={{ color: C.dark }}>{v.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px]" style={{ color: C.muted }}>{v.channel}</span>
                      <span className="text-[9px]" style={{ color: C.muted }}>·</span>
                      <span className="flex items-center gap-0.5 text-[9px]" style={{ color: C.muted }}>
                        <Eye size={8} /> {v.views}
                      </span>
                    </div>
                  </div>
                  <span
                    className="text-[8px] font-black px-1.5 py-0.5 rounded-full shrink-0"
                    style={{ background: `${v.color}20`, color: v.color }}
                  >
                    {v.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(${C.blue} 0.5px, transparent 0.5px)`, backgroundSize: "20px 20px" }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 3 · TOP CHANNELS — green tint  (col-span-4)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:col-span-4 rounded-[3rem] p-8 border-2 border-white relative overflow-hidden shadow-xl h-[480px]"
          style={{
            background: C.greenCard,
          
          }}
        >
          <div className="relative z-10 flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-2xl shadow-lg text-white"
                style={{ background: C.green, boxShadow: `0 4px 16px ${C.green}50` }}
              >
                <Users size={20} />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tighter" style={{ color: C.dark }}>Top Channels</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: C.green }}>
                  By Influence
                </p>
              </div>
            </div>
            <Radio size={16} style={{ color: C.green }} className="animate-pulse" />
          </div>

          <div className="relative h-[340px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
            <div ref={topChannelsTrackRef} className="space-y-3">
              {[...topChannels, ...topChannels].map((ch, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-2xl p-4 flex items-center gap-3 shadow-md transition-all"
                  style={{ borderColor: `${ch.color}20` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-[10px] shrink-0"
                    style={{ background: ch.color }}
                  >
                    {ch.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: C.dark }}>{ch.name}</p>
                    <p className="text-[10px] flex items-center gap-1" style={{ color: C.muted }}>
                      <Hash size={8} /> {ch.niche}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 flex-col items-end">
                    <div className="flex items-center gap-1">
                      <Star size={9} style={{ color: C.orange, fill: C.orange }} />
                      <span className="text-xs font-black" style={{ color: C.orange }}>{ch.subs}</span>
                    </div>
                    <span className="text-[8px]" style={{ color: C.muted }}>subscribers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(${C.green} 0.5px, transparent 0.5px)`, backgroundSize: "20px 20px" }}
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CARD 4 · WHAT TAGS TRACKS — orange tint  (col-span-8)
        ══════════════════════════════════════════════════════════════════ */}
        <div
          className="lg:col-span-8 rounded-[3rem] p-8 border-2 border-white shadow-xl overflow-hidden"
          style={{
            background: C.orangeCard,
          
          }}
        >
          <div className="relative z-10 mb-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div
                className="w-12 h-12 bg-white border rounded-2xl flex items-center justify-center shadow-sm"
                style={{ borderColor: C.border }}
              >
                <BarChart2 size={20} style={{ color: C.orange }} />
              </div>
              <div>
                <h3
                  className="text-2xl font-black tracking-tighter"
                  style={{  color: C.dark }}
                >
                  What Tags{" "}
                  <span className="italic" style={{ color: C.orange }}>Tracks</span>
                </h3>
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: C.orange }}>
                  Real-time signals powering every ad placement
                </p>
              </div>
            </div>
            <button
              className="flex items-center gap-2 text-xs font-bold transition-colors shrink-0"
              style={{ color: C.orange }}
            >
              Explore all <ArrowUpRight size={14} />
            </button>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <div className="overflow-hidden py-3">
              <div ref={signalRow1Ref} className="flex gap-4 w-max">
                {[...signalRow1, ...signalRow1, ...signalRow1].map((signal, i) => (
                  <SignalCard key={`r1-${i}`} signal={signal} />
                ))}
              </div>
            </div>

            <div className="overflow-hidden py-3">
              <div ref={signalRow2Ref} className="flex gap-4 w-max">
                {[...signalRow2, ...signalRow2, ...signalRow2].map((signal, i) => (
                  <SignalCard key={`r2-${i}`} signal={signal} />
                ))}
              </div>
            </div>
          </div>

    
        </div>

      </div>
    </div>
  );
};

export default TagsDashboard;