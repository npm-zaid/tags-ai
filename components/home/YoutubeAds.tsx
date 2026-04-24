'use client'

import { useEffect, useRef } from 'react'
import { Target, Languages, Clock, BarChart2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: Target,
    title: 'Category Sync',
    desc: 'Aligns ads with trending categories like Tech, Lifestyle, or Gaming.',
    id: 'cat',
  },
  {
    icon: Languages,
    title: 'Language Local',
    desc: "Matches the ad language to the video's dialect for higher trust.",
    id: 'lang',
  },
  {
    icon: Clock,
    title: 'Temporal Timing',
    desc: 'Runs specific ads at times when audience engagement is peaking.',
    id: 'time',
  },
  {
    icon: BarChart2,
    title: 'Niche Analysis',
    desc: 'Filters out "empty" views to focus on high-intent viewers.',
    id: 'niche',
  },
]

export default function YoutubeAds() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageWrapRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const redLineRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)



  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen  px-6 sm:px-12 py-24  "
    >
      {/* Background noise texture + blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[80px]" />
    
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">


  {/* ─── Right: Copy + Features ─── */}
        <div className="flex flex-col gap-7">

          {/* Badge */}
          <div ref={badgeRef}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Ad Intelligence
            </span>
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-5xl xl:text-6xl font-black text-zinc-900 leading-[1.05] tracking-tight"
            
          >
            Ads that Actually{' '}
            <span className="relative">
              <span className="text-red-600 italic">Converts.</span>
              {/* Underline squiggle */}
              <svg
                viewBox="0 0 200 12"
                className="absolute -bottom-1 left-0 w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 8 Q 25 2 50 8 Q 75 14 100 8 Q 125 2 150 8 Q 175 14 200 8"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
          </h1>

          {/* Paragraph */}
          <p ref={paraRef} className="text-base text-zinc-500 leading-relaxed max-w-md" >
            We use proprietary tag analysis to identify the exact environment where your advertisement will thrive.{' '}
            <span className="text-zinc-700 font-semibold">No more wasted budget on irrelevant impressions.</span>
          </p>

      

        
        </div>

        {/* ─── Left: Image ─── */}
        <div ref={imageWrapRef} className="relative">
        

          {/* Glowing red circle behind image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 rounded-full bg-red-600/6 blur-3xl" />
          </div>

          <div className="relative rounded-3xl overflow-hidden ">
            <img
              src="https://lh3.googleusercontent.com/fZt-M8ql2JnNNO2SfXgr3k4bA3X7fkiR3xyeCYZ8YRcmtyj5ibLSPhs-oXd1RmEEa3Qk=w895"
              alt="YouTube ad placements"
              className="sm:w-[50vw]"
            />
          
          </div>

          {/* Floating stat pill */}
          <div
            ref={floatRef}
            className="absolute -right-8 z-40 bottom-4 bg-white border border-red-500/50 rounded-2xl px-2 py-3 shadow-xl flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center">
              <BarChart2 size={16} className="text-red-600" />
            </div>
            <div>
              <div className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Conversion lift</div>
              <div className="text-sm font-black text-zinc-900">+38% avg</div>
            </div>
          </div>

          {/* Floating badge top-left */}
          <div className="absolute z-40 -top-4 left-8 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-red-200">
            Live Intelligence
          </div>
        </div>

      
      </div>


<div  className=" w-full h-[3px] rounded-full bg-gradient-to-r from-transparent to-red-500 mt-14"></div>

         {/* Feature Grid */}
       <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-[10vh]">
            {features.map(({ icon: Icon, title, desc, id }) => (
              <div
                key={id}
                id={`fc-${id}`}
                className="feature-card group flex flex-col gap-3 p-4 rounded-2xl border-2 border-white shadow-xl bg-red-500 backdrop-blur-xl cursor-default"
              >
                <div
                  id={`fi-${id}`}
                  className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-900"
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                  <p className="text-xs text-zinc-100 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>



    </section>
  )
}