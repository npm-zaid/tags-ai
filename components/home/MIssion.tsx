"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CheckCircle2, TrendingUp, Sparkles, Languages, BarChart3, PieChart } from 'lucide-react';
import SectionIntro from '../common/SectionIntro';

const Mission = () => {
  const containerRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const badgeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating Animation for data badges
      badgeRefs.current.forEach((badge, index) => {
        gsap.to(badge, {
          y: index % 2 === 0 ? -20 : 20,
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.4
        });
      });

      // Entrance reveal for cards
      gsap.from([leftCardRef.current, rightCardRef.current], {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !badgeRefs.current.includes(el)) {
      badgeRefs.current.push(el);
    }
  };

  return (
    <section ref={containerRef} className="font-sans min-h-screen py-16 px-6 md:px-20 flex flex-col items-center">
      
      {/* HEADER SECTION */}
      <SectionIntro badgeText="Our Mission" prefix="Our" highlight="Mission" suffix=""/>
 
   

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE: DATA VISUAL STACK */}
        <div className="relative flex items-end gap-6 h-[500px] md:h-[70vh]">
          
          {/* Main Visual: Analytics Focus */}
          <div ref={leftCardRef} className="relative flex-1 h-full">
            <img 
              src="https://thetryst.co.za/wp-content/uploads/2022/10/how-to-add-a-wordpress-stats-dashboard.jpeg" 
              className="w-full h-full object-cover rounded-[3rem] shadow-2xl shadow-indigo-100 border-4 border-white" 
              alt="YouTube Content Analysis" 
            />
            <div className="absolute shadow-xl shadow-black/30  inset-0 bg-gradient-to-t from-indigo-900/40 via-transparent to-transparent rounded-[3rem]" />
            
            {/* Project Specific Floating Badges */}
            <div ref={addToRefs} className="absolute top-[20%] -right-8 bg-white/90 backdrop-blur-xl border border-indigo-100 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-20">
              <Languages size={18} className="text-[#9186BB]" />
              <span className="text-zinc-900 font-bold text-sm">Language Reach</span>
            </div>
            
            <div ref={addToRefs} className="absolute bottom-[15%] -left-6 bg-white/90 backdrop-blur-xl border border-indigo-100 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-20">
              <BarChart3 size={18} className="text-emerald-500" />
              <span className="text-zinc-900 font-bold text-sm">Age Group Trends</span>
            </div>

            <div className="absolute bottom-8 left-8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                <TrendingUp size={20} className="text-[#9186BB]" />
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">
                Tags AI <span className="text-indigo-200">Insights</span>
              </span>
            </div>
          </div>

          {/* Secondary Visual: Sentiment Focus */}
          <div ref={rightCardRef} className="relative shadow-xl shadow-black/30 w-[45%] h-[80%] rounded-[3rem]">
            <img 
              src="https://img.freepik.com/free-vector/man-with-laptop-analyzing-infographics-diagram-bar-chart-report-flat-vector-illustration-analysis-marketing-project-manager_74855-8454.jpg" 
              className="w-full h-full object-cover rounded-[3rem] shadow-2xl shadow-indigo-100 border-4 border-white" 
              alt="Instagram Data Trends" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent rounded-[3rem]" />
            
            <div ref={addToRefs} className="absolute bottom-[40%] -right-10 bg-white/90 backdrop-blur-xl border border-purple-100 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-20">
              <PieChart size={18} className="text-purple-600" />
              <span className="text-zinc-900 font-bold text-sm">Sentiment Analysis</span>
            </div>

            <div className="absolute bottom-8 left-8 flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-[#9186BB] flex items-center justify-center">
                 <CheckCircle2 size={16} className="text-white" />
               </div>
               <span className="text-white text-sm font-bold">Verified Context</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PROJECT CONTENT */}
        <div className="flex flex-col items-start lg:pl-10">
          <h2 className="text-3xl md:text-4xl font-semibold  text-zinc-900 leading-[1.1] tracking-tighter mb-8">
            Tags AI turns raw platform data into <span className="text-[#9186BB]">creator growth.</span> We reveal what your audience sees, feels, and searches for.
          </h2>
          
       
        
          <button
            onClick={() => {window.location.href = '#get-started'}}
            type="button"
            className="relative h-14 px-8 pr-16 rounded-full bg-indigo-50 overflow-hidden text-indigo-900 font-bold text-base cursor-pointer group shadow-sm hover:shadow-indigo-100 transition-all"
          >
            {/* Expanding pill animation */}
            <span className="absolute top-1 right-1 h-12 w-12 rounded-full bg-[#9186BB] flex items-center justify-center z-20 transition-all duration-500 ease-out group-hover:w-[calc(100%-8px)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="w-6 h-6 fill-white">
                <path d="M800 512H160a32 32 0 0 1 0-64h640a32 32 0 1 1 0 64z" />
                <path d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z" />
              </svg>
            </span>

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Analyze Trends Now
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Mission;