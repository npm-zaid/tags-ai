'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Nav = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial Entrance Animation
    tl.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "expo.out" }
    )
    .from(logoRef.current, {
      x: -20,
      opacity: 0,
      duration: 0.5
    }, "-=0.5")
    .from(linksRef.current, {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power4.out"
    }, "-=0.4")
    .from(buttonRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3");
  }, []);

  const handleMouseEnter = (e) => {
    const line = e.currentTarget.querySelector('.nav-line');
    gsap.to(line, { width: '100%', left: '0%', duration: 0.3, ease: 'power2.inOut' });
  };

  const handleMouseLeave = (e) => {
    const line = e.currentTarget.querySelector('.nav-line');
    gsap.to(line, { width: '0%', left: '100%', duration: 0.3, ease: 'power2.inOut', onComplete: () => {
      gsap.set(line, { left: '0%' });
    }});
  };

  const navLinks = ["Products", "Services", "Why Tags", "Resources"];

  return (
    <nav 
      ref={navRef} 
      className='flex  backdrop-blur-xl fixed  left-1/2 -translate-x-1/2 w-full z-50 justify-between items-center px-8 py-3 '
    >
      {/* Logo Section */}
      <div ref={logoRef} className="w-[100px] sm:w-[8vw] cursor-pointer">
        <img
          className="w-full h-full object-contain"
          src='assets/tags-logo.png'
          alt="logo"
        />
      </div>

      {/* Navigation Links */}
      <div className='hidden md:flex gap-10 uppercase text-[12px] tracking-[2px] text-zinc-800 font-bold'>
        {navLinks.map((link, i) => (
          <div 
            key={link}
            ref={el => linksRef.current[i] = el}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='relative cursor-pointer py-1 overflow-hidden group'
          >
            <p className="transition-colors duration-300 group-hover:text-black">{link}</p>
            <span className="nav-line absolute bottom-0 left-0 w-0 h-[2px] bg-[#9186BB]" />
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div ref={buttonRef}>
        <button
            onClick={() => {window.location.href = '#get-started'}}
            type="button"
            className="relative h-12 px-8 pr-14 rounded-full bg-[#9186BB]/20 overflow-hidden text-black font-bold text-base cursor-pointer group shadow-sm hover:shadow-indigo-100 transition-all"
          >
            {/* Expanding pill animation */}
            <span className="absolute top-1 right-1 h-10 w-10 rounded-full bg-[#9186BB] flex items-center justify-center z-20 transition-all duration-500 ease-out group-hover:w-[calc(100%-8px)]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" className="w-6 h-6 fill-white">
                <path d="M800 512H160a32 32 0 0 1 0-64h640a32 32 0 1 1 0 64z" />
                <path d="m786.752 512-265.408-265.344a32 32 0 0 1 45.312-45.312l288 288a32 32 0 0 1 0 45.312l-288 288a32 32 0 1 1-45.312-45.312L786.752 512z" />
              </svg>
            </span>

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Demo
            </span>
          </button>
      </div>
    </nav>
  )
}

export default Nav;