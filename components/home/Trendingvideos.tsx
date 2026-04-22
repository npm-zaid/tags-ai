'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CATEGORIES = ['All', 'Tech', 'Gaming', 'Finance', 'Lifestyle', 'Music']

const VIDEOS = [
  {
    id: 1,
    rank: 1,
    title: 'Why Every Developer Is Switching to This Framework',
    channel: 'CodeWithFire',
    avatar: 'CF',
    views: '4.2M',
    duration: '14:32',
    age: '2 days ago',
    category: 'Tech',
    spike: '+840%',
    tags: ['javascript', 'webdev', 'nextjs'],
    color: '#ef4444',
    thumb: '🖥️',
  },
  {
    id: 2,
    rank: 2,
    title: 'I Played This Game for 100 Hours — Here\'s What Happened',
    channel: 'PixelPulse',
    avatar: 'PP',
    views: '6.8M',
    duration: '22:15',
    age: '1 day ago',
    category: 'Gaming',
    spike: '+1.2K%',
    tags: ['gaming', 'review', 'rpg'],
    color: '#8b5cf6',
    thumb: '🎮',
  },
  {
    id: 3,
    rank: 3,
    title: 'The Stock Market Secret No One Is Talking About',
    channel: 'WealthMindset',
    avatar: 'WM',
    views: '2.1M',
    duration: '18:07',
    age: '3 days ago',
    category: 'Finance',
    spike: '+530%',
    tags: ['stocks', 'investing', 'finance'],
    color: '#10b981',
    thumb: '📈',
  },
  {
    id: 4,
    rank: 4,
    title: 'Apple Just Changed Everything With This Announcement',
    channel: 'TechInsider',
    avatar: 'TI',
    views: '9.4M',
    duration: '11:48',
    age: '18 hours ago',
    category: 'Tech',
    spike: '+2.4K%',
    tags: ['apple', 'tech', 'announcement'],
    color: '#f59e0b',
    thumb: '🍎',
  },
  {
    id: 5,
    rank: 5,
    title: 'Morning Routine That Changed My Life in 30 Days',
    channel: 'LiveBetter',
    avatar: 'LB',
    views: '3.7M',
    duration: '09:22',
    age: '5 days ago',
    category: 'Lifestyle',
    spike: '+390%',
    tags: ['routine', 'productivity', 'health'],
    color: '#06b6d4',
    thumb: '🌅',
  },
  {
    id: 6,
    rank: 6,
    title: 'This Beat Went Viral Overnight — Full Breakdown',
    channel: 'BeatLab',
    avatar: 'BL',
    views: '11.2M',
    duration: '07:54',
    age: '6 hours ago',
    category: 'Music',
    spike: '+5.8K%',
    tags: ['music', 'viral', 'beatmaking'],
    color: '#ec4899',
    thumb: '🎵',
  },
]

export default function TrendingVideos() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<HTMLSpanElement>(null)

  const filtered = VIDEOS.filter(v => activeCategory === 'All' || v.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Live dot pulse
      gsap.to(liveRef.current, {
        opacity: 0.2, duration: 0.7, ease: 'sine.inOut', repeat: -1, yoyo: true
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      })

      // Headline chars reveal
      tl.fromTo('#trend-eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0)
      tl.fromTo('#trend-h1', { y: 50, opacity: 0, skewY: 2 }, { y: 0, opacity: 1, skewY: 0, duration: 0.9, ease: 'expo.out' }, 0.1)
      tl.fromTo('#trend-sub', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out' }, 0.25)
      tl.fromTo(filtersRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.35)

      // Cards stagger
      tl.fromTo('.vcard', {
        y: 60, opacity: 0, scale: 0.95
      }, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.65, stagger: 0.1, ease: 'expo.out'
      }, 0.45)

      // Rank numbers count up feel
      tl.fromTo('.rank-num', {
        opacity: 0, x: -10
      }, {
        opacity: 1, x: 0,
        duration: 0.4, stagger: 0.08, ease: 'back.out(2)'
      }, 0.55)

      // Spike badges pop
      tl.fromTo('.spike-badge', {
        scale: 0, opacity: 0
      }, {
        scale: 1, opacity: 1,
        duration: 0.4, stagger: 0.08, ease: 'back.out(2.5)'
      }, 0.7)

      // Scrolling ticker line
      gsap.to('#ticker-inner', {
        x: '-50%', duration: 18, ease: 'none', repeat: -1
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Re-animate on category change
  useEffect(() => {
    gsap.fromTo('.vcard', {
      y: 30, opacity: 0, scale: 0.97
    }, {
      y: 0, opacity: 1, scale: 1,
      duration: 0.5, stagger: 0.07, ease: 'expo.out'
    })
  }, [activeCategory])

  const onCardEnter = (id: number, color: string) => {
    setHoveredId(id)
    gsap.to(`#vcard-${id}`, { y: -6, scale: 1.01, duration: 0.3, ease: 'power2.out' })
    gsap.to(`#vcard-bar-${id}`, { scaleX: 1, duration: 0.4, ease: 'expo.out' })
    gsap.to(`#vcard-rank-${id}`, { color, scale: 1.1, duration: 0.25 })
  }

  const onCardLeave = (id: number) => {
    setHoveredId(null)
    gsap.to(`#vcard-${id}`, { y: 0, scale: 1, duration: 0.35, ease: 'power2.inOut' })
    gsap.to(`#vcard-bar-${id}`, { scaleX: 0, duration: 0.3 })
    gsap.to(`#vcard-rank-${id}`, { color: '#d4d4d8', scale: 1, duration: 0.25 })
  }

  return (
    <section ref={sectionRef} className="relative bg-zinc-950 text-white overflow-hidden py-24 px-6 md:px-16">

      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Red glow blob */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-red-600/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px]" />
        {/* Subtle grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
          <defs>
            <pattern id="tgrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tgrid)"/>
        </svg>
        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      {/* ── Scrolling ticker ── */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-red-600 flex items-center overflow-hidden">
        <div id="ticker-inner" className="flex gap-12 whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-white/90" style={{ width: 'max-content' }}>
          {Array(8).fill(['🔥 Trending Now', '▶ YouTube Analytics', '📊 Tag Intelligence', '🚀 Real-time Data', '🎯 Ad Placement']).flat().map((t, i) => (
            <span key={i} className="flex items-center gap-1">{t}<span className="text-white/30 mx-4">✦</span></span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-10">

        {/* ── Header ── */}
        <div ref={headlineRef} className="mb-6">
        

          <div className="grid grid-cols-2 items-start  ">
            <div className=''>
              <div id="trend-eyebrow" className="inline-flex items-center gap-2.5 mb-5">
            <span ref={liveRef} className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-red-400 text-xs font-black uppercase tracking-[0.2em]">Live Trending</span>
            <span className="text-zinc-600 text-xs">— updated 2 min ago</span>
          </div>
              <h2
                id="trend-h1"
                className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter"
                
              >
                What's blowing
                <br />
                <span className="relative inline-block">
                  <span className="text-red-500">up right now.</span>
                  {/* Underline accent */}
                  <svg viewBox="0 0 340 10" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                    <path d="M0 7 Q85 1 170 7 Q255 13 340 7" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </h2>
              <p id="trend-sub" className="text-zinc-400 mt-4 text-base max-w-lg leading-relaxed" >
                Tags scans <span className="text-white font-semibold">50M+ YouTube videos</span> in real-time, surfacing the exact topics, tags, and categories your ad needs to dominate.
              </p>
            </div>

           <div className='relative '>
            <img src="/assets/you.png" alt="" className='w-[30vw] m-auto' />
           </div>


            {/* Stats pills */}
            {/* <div className="flex gap-3 flex-shrink-0">
              {[['50M+', 'Videos Scanned'], ['1.2s', 'Refresh Rate'], ['99.9%', 'Uptime']].map(([val, label]) => (
                <div key={label} className="flex flex-col items-center px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800">
                  <span className="text-xl font-black text-white">{val}</span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-0.5 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* ── Category filters ── */}
        <div ref={filtersRef} className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
              style={{
                background: activeCategory === cat ? '#ef4444' : 'rgba(39,39,42,0.8)',
                color: activeCategory === cat ? 'white' : '#71717a',
                border: activeCategory === cat ? '1px solid #ef4444' : '1px solid rgba(63,63,70,0.8)',
              }}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white border-2 border-red-500" />
              )}
            </button>
          ))}
        </div>

        {/* ── Video Grid ── */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <div
              key={v.id}
              id={`vcard-${v.id}`}
              className="vcard relative rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden cursor-pointer"
              style={{ boxShadow: hoveredId === v.id ? `0 20px 60px ${v.color}20` : undefined }}
              onMouseEnter={() => onCardEnter(v.id, v.color)}
              onMouseLeave={() => onCardLeave(v.id)}
            >
              {/* Color bar (reveal on hover) */}
              <div
                id={`vcard-bar-${v.id}`}
                className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                style={{ background: `linear-gradient(90deg, ${v.color}, transparent)`, transform: 'scaleX(0)' }}
              />

              {/* Thumbnail mock */}
              <div className="relative h-40 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${v.color}18, ${v.color}06)` }}
              >
                {/* Rank */}
                <span
                  id={`vcard-rank-${v.id}`}
                  className="rank-num absolute top-3 left-3 text-4xl font-black"
                  style={{ color: '#d4d4d8', lineHeight: 1 }}
                >
                  {String(v.rank).padStart(2, '0')}
                </span>

                {/* Emoji thumb */}
                <div className="text-6xl select-none" style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
                  {v.thumb}
                </div>

                {/* Duration badge */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {v.duration}
                </span>

                {/* Spike badge */}
                <div
                  className="spike-badge absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black"
                  style={{ background: `${v.color}22`, color: v.color, border: `1px solid ${v.color}44` }}
                >
                  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                  </svg>
                  {v.spike}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Category chip */}
                <span
                  className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded mb-2"
                  style={{ background: `${v.color}18`, color: v.color }}
                >
                  {v.category}
                </span>

                <h3 className="text-sm font-bold text-white leading-snug mb-3 line-clamp-2">
                  {v.title}
                </h3>

                {/* Channel + views */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
                      style={{ background: v.color }}
                    >
                      {v.avatar}
                    </div>
                    <span className="text-zinc-400 text-xs font-medium">{v.channel}</span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500 text-xs">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                    {v.views}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap">
                  {v.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom bar: age + view cta */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800">
                  <span className="text-[10px] text-zinc-600">{v.age}</span>
                  <button
                    className="flex items-center gap-1 text-[10px] font-bold transition-colors duration-200"
                    style={{ color: v.color }}
                  >
                    Analyze
                    <svg viewBox="0 0 1024 1024" className="w-3 h-3 fill-current">
                      <path d="M800 512H160a32 32 0 0 1 0-64h640a32 32 0 1 1 0 64z"/>
                      <path d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer row ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-800/60">
          <p className="text-zinc-600 text-sm">
            Showing <span className="text-white font-semibold">{filtered.length}</span> trending videos
            {activeCategory !== 'All' && <> in <span className="text-red-400 font-semibold">{activeCategory}</span></>}
          </p>
          <button className="group flex items-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-red-900/40">
            View All Trending
            <svg viewBox="0 0 1024 1024" className="w-4 h-4 fill-white group-hover:translate-x-0.5 transition-transform">
              <path d="M800 512H160a32 32 0 0 1 0-64h640a32 32 0 1 1 0 64z"/>
              <path d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}