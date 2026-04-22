'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Brand palette ──
const C = {
  purple: '#9385BF',
  green:  '#ADC443',
  blue:   '#68C1E0',
  orange: '#F09C31',
}

const DATA_SIGNALS = [
  { icon: '🌐', label: 'Language',   color: C.blue,   desc: 'Top spoken tongue' },
  { icon: '👥', label: 'Gender',     color: C.purple, desc: 'Audience split'    },
  { icon: '🎂', label: 'Age Group',  color: C.orange, desc: 'Whos watching'    },
  { icon: '📱', label: 'Devices',    color: C.green,  desc: 'Screen breakdown'  },
  { icon: '🎬', label: 'Category',   color: C.blue,   desc: 'Content vertical'  },
  { icon: '❤️', label: 'Sentiment',  color: C.orange, desc: 'Mood of the crowd' },
  { icon: '🔥', label: 'Keywords',   color: C.green,  desc: 'Trending tags'     },
]

const PLATFORMS = [
  { name: 'YouTube',   icon: '▶', color: '#FF0000' },
  { name: 'Instagram', icon: '◈', color: C.purple  },
  { name: 'TikTok',    icon: '♪', color: C.blue    },
  { name: 'Reels',     icon: '⬡', color: C.orange  },
]

const NAV = {
  'Insights': ['Language Analytics', 'Gender Breakdown', 'Age Demographics', 'Device Reports', 'Sentiment Map'],
  'Creators': ['Reach Booster', 'Keyword Tracker', 'Category Trends', 'Platform Compare', 'Creator Dashboard'],
  'Company':  ['About Tags AI', 'Blog', 'Careers', 'Press', 'Contact Us'],
  'Legal':    ['Privacy Policy', 'Terms of Use', 'Cookie Settings', 'Data Policy'],
}

const MARQUEE_ITEMS = [
  '🌐 Language Intelligence',
  '🔥 Trending Keywords',
  '❤️ Sentiment Analysis',
  '👥 Gender Analytics',
  '🎂 Age Demographics',
  '📱 Device Breakdown',
  '🎬 Content Category',
  '📊 Multi-Platform Data',
]

export default function Footer() {
  const footerRef  = useRef<HTMLElement>(null)
  const bigRef     = useRef<HTMLDivElement>(null)
  const topRef     = useRef<HTMLDivElement>(null)
  const midRef     = useRef<HTMLDivElement>(null)
  const bottomRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Marquee loop ──
      gsap.to('#tags-marquee', { x: '-50%', duration: 24, ease: 'none', repeat: -1 })

      // ── Floating data pills (idle) ──
      DATA_SIGNALS.forEach((_, i) => {
        gsap.to(`#dsig-${i}`, {
          y: i % 2 === 0 ? -6 : 6,
          duration: 1.8 + i * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.15,
        })
      })

      // ── Scroll entrance timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      // data signal pills stagger in
      tl.fromTo('.dsig', { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.08, ease: 'back.out(2)' }, 0)

      // brand block
      tl.fromTo(topRef.current, { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }, 0.1)

      // nav columns
      tl.fromTo('.fcol', { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'expo.out' }, 0.2)

      // nav links
      tl.fromTo('.flink', { x: -8, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.025, ease: 'power2.out' }, 0.4)

      // platform badges
      tl.fromTo('.pfm', { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2.5)' }, 0.5)

      // divider line
      tl.fromTo('#foot-div', { scaleX: 0 },
        { scaleX: 1, duration: 1.4, ease: 'expo.out', transformOrigin: 'left center' }, 0.3)

      // big text
      tl.fromTo(bigRef.current, { y: 60, opacity: 0, skewY: 2 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'expo.out' }, 0.55)

      // bottom
      tl.fromTo(bottomRef.current, { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }, 0.7)

    }, footerRef)
    return () => ctx.revert()
  }, [])

  const onLink = {
    enter: (e: React.MouseEvent<HTMLAnchorElement>, color: string) =>
      gsap.to(e.currentTarget, { x: 5, color, duration: 0.2, ease: 'power2.out' }),
    leave: (e: React.MouseEvent<HTMLAnchorElement>) =>
      gsap.to(e.currentTarget, { x: 0, color: '#52525b', duration: 0.2 }),
  }

  const colColors = [C.blue, C.green, C.purple, C.orange]

  return (
    <footer ref={footerRef} className="relative bg-[#0C0C10] text-white overflow-hidden">

      {/* ══ Ambient blobs ══ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-[15%] w-[500px] h-[300px] rounded-full blur-[130px]" style={{ background: `${C.purple}12` }} />
        <div className="absolute top-1/3 right-[10%] w-[400px] h-[300px] rounded-full blur-[110px]" style={{ background: `${C.blue}10` }} />
        <div className="absolute bottom-0 left-[30%] w-[600px] h-[250px] rounded-full blur-[120px]" style={{ background: `${C.green}0D` }} />
        {/* dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
          <defs>
            <pattern id="fdots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fdots)" />
        </svg>
      </div>

      {/* ══ Data signals strip ══ */}
      {/* <div className="relative z-10 border-b border-white/[0.06] px-6 md:px-16 py-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-600 mb-5">
            What Tags AI Tracks
          </p>
          <div className="flex flex-wrap gap-3">
            {DATA_SIGNALS.map((s, i) => (
              <div
                key={s.label}
                id={`dsig-${i}`}
                className="dsig flex items-center gap-2 px-3.5 py-2 rounded-full border cursor-default"
                style={{
                  background: `${s.color}0F`,
                  borderColor: `${s.color}30`,
                }}
              >
                <span className="text-sm leading-none">{s.icon}</span>
                <div>
                  <div className="text-[11px] font-black" style={{ color: s.color }}>{s.label}</div>
                  <div className="text-[9px] text-zinc-600 leading-none mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">

        {/* ══ Main grid ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 py-16">

          {/* Brand column */}
          <div ref={topRef} className="lg:col-span-2 flex flex-col gap-7">

            {/* Logo */}
            <div>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-5xl font-black tracking-tighter" >
                  tags
                </span>
                <span className="text-xs font-black uppercase tracking-widest mb-2 px-2 py-0.5 rounded-full border"
                  style={{ color: C.green, borderColor: `${C.green}40`, background: `${C.green}10` }}>
                  AI
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600">
                Know what's trending. Before everyone else.
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs" >
              Tags AI scans millions of videos across YouTube, Instagram, TikTok and more — surfacing{' '}
              <span className="text-zinc-300 font-semibold">language, gender, age, device, category, sentiment</span>{' '}
              and trending keywords so creators can grow with precision.
            </p>

            {/* Platform badges */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-3">Available on</p>
              <div className="flex gap-2 flex-wrap">
                {PLATFORMS.map(p => (
                  <div
                    key={p.name}
                    className="pfm flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold"
                    style={{ color: p.color, borderColor: `${p.color}35`, background: `${p.color}0D` }}
                  >
                    <span className="text-base leading-none">{p.icon}</span>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Live indicator */}
            {/* <div className="flex items-center gap-2.5 w-fit px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: C.green }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: C.green }} />
              </span>
              <span className="text-xs text-zinc-400 font-medium">Live data — refreshing every 90s</span>
            </div> */}

            {/* CTA button */}
            {/* <button
              className="w-fit flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-black transition-all duration-300 hover:scale-[1.04] hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${C.green}, ${C.blue})` }}
            >
              Start Tracking Free
              <svg viewBox="0 0 1024 1024" className="w-4 h-4 fill-black">
                <path d="M800 512H160a32 32 0 0 1 0-64h640a32 32 0 1 1 0 64z"/>
                <path d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z"/>
              </svg>
            </button> */}
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(NAV).map(([heading, items], ci) => (
              <div key={heading} className="fcol flex flex-col gap-4">
                <h4
                  className="text-[10px] font-black uppercase tracking-[0.22em]"
                  style={{ color: colColors[ci] }}
                >
                  {heading}
                </h4>
                <ul className="flex flex-col gap-3">
                  {items.map(item => (
                    <li key={item}>
                      <a
                        href="#"
                        className="flink text-sm text-zinc-600 inline-block transition-none"
                        onMouseEnter={e => onLink.enter(e, colColors[ci])}
                        onMouseLeave={e => onLink.leave(e)}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ══ Divider ══ */}
        <div
          id="foot-div"
          className="h-px w-full mb-0"
          style={{ background: `linear-gradient(90deg, transparent, ${C.purple}60, ${C.blue}60, ${C.green}60, transparent)` }}
        />
      </div>

   

      {/* ══ Big ghost text ══ */}
      <div ref={bigRef} className="relative z-10    overflow-hidden">
        <h1
          className="text-[25vw] text-center font-black leading-none tracking-tighter select-none"
          style={{
           
            WebkitTextStroke: '4px rgba(255,255,255,0.2)',
            color: 'transparent',
          }}
        >
          TAGS AI
        </h1>
      </div>

      {/* ══ Bottom bar ══ */}
      <div
        ref={bottomRef}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 py-5 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/[0.05]"
      >
        <p className="text-zinc-700 text-xs">
          © {new Date().getFullYear()} Tags AI. Built for creators who play to win.
        </p>

        {/* Color swatches — just a fun brand accent */}
        {/* <div className="flex items-center gap-1.5">
          {Object.values(C).map(color => (
            <div
              key={color}
              className="w-3 h-3 rounded-full"
              style={{ background: color, boxShadow: `0 0 6px ${color}60` }}
            />
          ))}
          <span className="text-zinc-700 text-xs ml-2">Tags AI Design System</span>
        </div> */}

        <div className="flex items-center gap-5">
          {['Privacy', 'Terms', 'Cookies'].map(l => (
            <a key={l} href="#" className="text-zinc-700 text-xs hover:text-zinc-400 transition-colors duration-200">{l}</a>
          ))}
        </div>
      </div>

    </footer>
  )
}