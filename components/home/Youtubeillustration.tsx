'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function YoutubeIllustration() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Entrance: main card ──
      gsap.fromTo('#yt-card', { scale: 0.85, opacity: 0, y: 30 }, {
        scale: 1, opacity: 1, y: 0, duration: 1, ease: 'expo.out', delay: 0.2
      })

      // ── Entrance: bubbles stagger ──
      gsap.fromTo('.yt-bubble', { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(2)', delay: 0.5
      })

      // ── Entrance: chart ──
      gsap.fromTo('#yt-chart', { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.7
      })

      // ── Entrance: comment card ──
      gsap.fromTo('#yt-comment', { x: 50, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.9
      })

      // ── Entrance: progress bar fill ──
      gsap.fromTo('#yt-progress-fill', { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'expo.out', delay: 1, transformOrigin: 'left center'
      })

      // ── Float: bell ──
      gsap.to('#yt-bell', {
        y: -10, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true
      })

      // ── Float: thumbs ──
      gsap.to('#yt-thumb', {
        y: 8, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.4
      })

      // ── Float: share ──
      gsap.to('#yt-share', {
        y: -7, x: 4, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.9
      })

      // ── Float: chart arrow ──
      gsap.to('#yt-chart', {
        y: -8, duration: 2.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.6
      })

      // ── Float: comment card ──
      gsap.to('#yt-comment', {
        y: 7, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2
      })

      // ── Float: main card gentle bob ──
      gsap.to('#yt-card', {
        y: -5, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1
      })

      // ── Pulse ring on bell ──
      gsap.to('#yt-bell-ring', {
        scale: 1.6, opacity: 0, duration: 1.4, ease: 'power2.out', repeat: -1, repeatDelay: 1,
        transformOrigin: 'center center'
      })

      // ── Play button pulse ──
      gsap.to('#yt-play-ring', {
        scale: 1.25, opacity: 0, duration: 1.2, ease: 'power2.out', repeat: -1, repeatDelay: 0.8,
        transformOrigin: 'center center'
      })

      // ── Chart line draw ──
      gsap.fromTo('#chart-line', { strokeDashoffset: 300 }, {
        strokeDashoffset: 0, duration: 1.5, ease: 'expo.out', delay: 1
      })

      // ── Arrow draw ──
      gsap.fromTo('#chart-arrow', { opacity: 0, x: -10 }, {
        opacity: 1, x: 0, duration: 0.5, ease: 'back.out(1.5)', delay: 2.2
      })

    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="relative w-full flex items-center justify-center select-none" style={{ minHeight: 460 }}>

      {/* ─── Main YouTube Card ─── */}
      <div
        id="yt-card"
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{
          width: 420,
          background: 'rgba(255,255,255,0.95)',
          border: '1.5px solid rgba(220,38,38,0.12)',
          boxShadow: '0 32px 80px rgba(220,38,38,0.15), 0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        {/* ── Top bar ── */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-zinc-100">
          <div className="w-3 h-3 rounded-full bg-zinc-300" />
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-zinc-300" />
          <div className="flex items-center gap-1.5 ml-3">
            {/* YouTube wordmark */}
            <svg viewBox="0 0 90 20" className="h-5 w-auto">
              <rect x="0" y="2" width="28" height="16" rx="4" fill="#FF0000"/>
              <polygon points="11,7 11,13 18,10" fill="white"/>
              <text x="32" y="15" fontFamily="Arial" fontWeight="800" fontSize="13" fill="#111">YouTube</text>
            </svg>
          </div>
        </div>

        {/* ── Video area ── */}
        <div className="relative bg-red-600 flex items-center justify-center" style={{ height: 200 }}>
          {/* Subtle grid overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="vgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vgrid)"/>
          </svg>

          {/* Glow behind play */}
          <div className="absolute w-28 h-28 rounded-full bg-white/20 blur-2xl" />

          {/* Play button pulse ring */}
          <div
            id="yt-play-ring"
            className="absolute w-16 h-16 rounded-full border-2 border-white/60"
          />

          {/* Play button */}
          <div className="relative w-14 h-14 rounded-full bg-white/25 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white ml-1">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        {/* ── Controls bar ── */}
        <div className="bg-zinc-900 px-4 py-2.5">
          {/* Progress bar */}
          <div className="relative w-full h-1.5 bg-zinc-700 rounded-full mb-3 overflow-hidden">
            <div
              id="yt-progress-fill"
              className="absolute left-0 top-0 h-full rounded-full bg-red-500"
              style={{ width: '18%' }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 bg-red-500 w-3 h-3 rounded-full shadow" style={{ left: 'calc(18% - 6px)' }} />
          </div>
          {/* Controls row */}
          <div className="flex items-center gap-3">
            {/* Play icon */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {/* Skip */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
            {/* Volume */}
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-zinc-400">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <span className="text-zinc-400 text-[10px] font-mono flex-1">0:01 / 6:31</span>
            {/* Settings icons */}
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-zinc-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-zinc-400">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
            </svg>
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-zinc-400">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ─── Bell bubble (top-right) ─── */}
      <div
        id="yt-bell"
        className="yt-bubble absolute"
        style={{ top: 10, right: '10%' }}
      >
        <div
          className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 12px 40px rgba(220,38,38,0.25)', border: '2px solid rgba(220,38,38,0.15)' }}
        >
          {/* Pulse ring */}
          <div
            id="yt-bell-ring"
            className="absolute inset-0 rounded-full border-2 border-red-400"
          />
          <svg viewBox="0 0 24 24" className="w-9 h-9 fill-red-600">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
          </svg>
        </div>
      </div>

      {/* ─── Share bubble (left) ─── */}
      <div
        id="yt-share"
        className="yt-bubble absolute"
        style={{ top: '28%', left: '4%' }}
      >
        <div
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 8px 30px rgba(220,38,38,0.2)', border: '2px solid rgba(220,38,38,0.12)' }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-red-600">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
          </svg>
        </div>
      </div>

      {/* ─── Thumbs Up bubble (bottom-left) ─── */}
      <div
        id="yt-thumb"
        className="yt-bubble absolute"
        style={{ bottom: '12%', left: '6%' }}
      >
        <div
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center"
          style={{ boxShadow: '0 8px 30px rgba(220,38,38,0.22)', border: '2px solid rgba(220,38,38,0.12)' }}
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-red-600">
            <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
          </svg>
        </div>
      </div>

      {/* ─── Trending Chart (right) ─── */}
      <div
        id="yt-chart"
        className="yt-bubble absolute"
        style={{ top: '15%', right: '-2%' }}
      >
        <div
          className="rounded-2xl bg-white p-3 flex flex-col items-end gap-1"
          style={{ boxShadow: '0 12px 40px rgba(220,38,38,0.18)', border: '1.5px solid rgba(220,38,38,0.1)', width: 90 }}
        >
          <svg viewBox="0 0 80 60" width="80" height="60">
            {/* Grid lines */}
            {[15, 30, 45].map(y => (
              <line key={y} x1="0" y1={y} x2="80" y2={y} stroke="#f4f4f5" strokeWidth="1"/>
            ))}
            {/* Trend line */}
            <polyline
              id="chart-line"
              points="4,52 18,42 30,36 42,22 56,16 72,6"
              fill="none"
              stroke="#dc2626"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="300"
              strokeDashoffset="300"
            />
            {/* Dots */}
            {[[4,52],[18,42],[30,36],[42,22],[56,16],[72,6]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#dc2626" opacity={i === 5 ? 1 : 0.4}/>
            ))}
          </svg>
          {/* Arrow */}
          <div id="chart-arrow" className="flex items-center gap-1">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-red-600">
              <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
            </svg>
            <span className="text-red-600 font-black text-xs">+38%</span>
          </div>
        </div>
      </div>

      {/* ─── Comment card (bottom-right) ─── */}
      <div
        id="yt-comment"
        className="yt-bubble absolute"
        style={{ bottom: '8%', right: '3%' }}
      >
        <div
          className="rounded-2xl bg-white px-3 py-2.5 flex items-center gap-2.5"
          style={{ boxShadow: '0 10px 36px rgba(0,0,0,0.1)', border: '1.5px solid rgba(220,38,38,0.08)', width: 160 }}
        >
          <div className="w-8 h-8 rounded-full bg-zinc-200 flex-shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-zinc-400">
              <path d="M12 12c2.7 0 4-1.79 4-4s-1.3-4-4-4-4 1.79-4 4 1.3 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <div className="h-2 w-20 rounded bg-zinc-200" />
            <div className="h-1.5 w-14 rounded bg-zinc-100" />
          </div>
        </div>
      </div>

    </div>
  )
}