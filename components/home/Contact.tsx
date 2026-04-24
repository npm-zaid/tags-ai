'use client'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Send, Mail, MapPin, Globe, MessageSquare, ArrowUpRight } from 'lucide-react'

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      
      // Infinite glow pulse for the background
      gsap.to(".contact-glow", {
        opacity: 0.4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: 2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-20 bg-[#09090b] overflow-hidden relative">
      {/* Background Decorative Glows */}
      <div className="contact-glow absolute top-1/4 -left-20 w-[40vw] h-[40vw] bg-[#9186BB]/10 rounded-full blur-[120px] opacity-20 pointer-events-none" />
      <div className="contact-glow absolute bottom-1/4 -right-20 w-[30vw] h-[30vw] bg-[#E39F4A]/5 rounded-full blur-[100px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
            <span className="w-12 h-[1px] bg-zinc-700"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#9186BB]">Transmission</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
            READY TO <br /> <span className="text-[#9186BB] italic">SCALE?</span>
          </h2>
        </div>

        <div ref={cardRef} className="grid grid-cols-1 lg:grid-cols-12 bg-zinc-900/50 backdrop-blur-3xl rounded-[3.5rem] border-2 border-[#9186BB]/40 overflow-hidden shadow-2xl">
          
          {/* Left: Metadata & Links */}
          <div className="lg:col-span-4 p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
            <div>
              <h3 className="text-white text-xl font-bold mb-10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#9186BB] animate-pulse" />
                System Contact
              </h3>
              
              <div className="space-y-10">
                <div className="group cursor-pointer">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Direct Mail</p>
                  <p className="text-lg text-zinc-300 group-hover:text-[#9186BB] transition-colors flex items-center gap-2">
                    hello@tagsai.io <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                  </p>
                </div>
                
                <div className="group cursor-pointer">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Global HQ</p>
                  <p className="text-lg text-zinc-300">Noida, Cyber City <br /> IN 201301</p>
                </div>

                <div className="group cursor-pointer">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Social Sync</p>
                  <div className="flex gap-4 mt-3">
                    {['X', 'IG', 'LN'].map(s => (
                      <span key={s} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-400 hover:bg-[#9186BB] hover:text-white transition-all">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-white/5">
              <p className="text-zinc-500 text-[10px] font-medium leading-relaxed">
                BY SUBMITTING, YOU AGREE TO OUR NEURAL PRIVACY PROTOCOLS AND DATA HANDLING TERMS.
              </p>
            </div>
          </div>

          {/* Right: Glass Form */}
          <div className="lg:col-span-8 p-10 md:p-14 bg-[#9186BB]/10">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Identity</label>
                <input 
                  type="text" 
                  placeholder="NAME / BRAND" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#9186BB]/50 focus:bg-white/[0.08] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Secure Email</label>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#9186BB]/50 focus:bg-white/[0.08] transition-all"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-1">Project Brief</label>
                <textarea 
                  rows={5}
                  placeholder="DESCRIBE YOUR VISION..." 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-white placeholder:text-zinc-700 focus:outline-none focus:border-[#9186BB]/50 focus:bg-white/[0.08] transition-all resize-none"
                />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button className="group relative w-full md:w-auto overflow-hidden bg-white text-black px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:pr-16 active:scale-95">
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Initiate Connection <Send size={14} />
                  </span>
                  <div className="absolute top-0 right-0 h-full w-0 bg-[#9186BB] group-hover:w-full transition-all duration-500 -z-0" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact