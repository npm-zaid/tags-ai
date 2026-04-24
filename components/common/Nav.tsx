'use client'
import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import Button from './Button'
import { Menu, X ,Ghost} from 'lucide-react'
import { FaInstagram } from "react-icons/fa";
import { useGSAP } from '@gsap/react'

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  // ✅ FIX: persist the timeline across renders
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const navLinks = ["Products", "Services", "Why Tags", "Resources"];

  useGSAP(() => {
    gsap.fromTo(navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }
    );
  }, []);

  // ✅ FIX: Build the timeline ONCE (on mount), store it in tlRef
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(overlayRef.current, {
      display: 'block',
      opacity: 1,
      duration: 0.4,
    })
    .to(sidebarRef.current, {
      x: 0,
      duration: 0.8,
      ease: "expo.inOut",
    }, "-=0.2")
    .fromTo(
      mobileLinksRef.current.filter(Boolean),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power4.out" },
      "-=0.4"
    )
    .from(".sidebar-footer", { opacity: 0, y: 16, duration: 0.4 }, "-=0.3");

    tlRef.current = tl;
  }, []); // ← empty deps: runs once

  // ✅ FIX: React to isOpen by playing/reversing the persistent timeline
  useGSAP(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="flex backdrop-blur-xl fixed left-1/2 -translate-x-1/2 w-full z-[100] justify-between items-center px-6 md:px-12 py-4"
      >
        <div className="w-[100px] cursor-pointer">
          <img className="w-full h-full object-contain" src="assets/tags-logo.png" alt="logo" />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-10 uppercase text-[11px] tracking-[3px] text-zinc-800 font-bold">
          {navLinks.map((link) => (
            <div key={link} className="relative cursor-pointer py-1 group overflow-hidden">
              <p className="transition-all duration-300 group-hover:text-[#9186BB]">{link}</p>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#9186BB] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Button href="#" color="#E39F4A">START</Button>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-3 bg-zinc-900 text-white rounded-full transition-transform active:scale-90"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] hidden opacity-0"
      />

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full w-[85%] max-w-[420px] bg-white z-[120] translate-x-full flex flex-col"
        style={{ boxShadow: '-24px 0 60px rgba(0,0,0,0.12)' }}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-zinc-100">
          <div className="w-20">
            <img className="w-full h-full object-contain" src="assets/tags-logo.png" alt="logo" />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-900 hover:text-white transition-all duration-200 active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col justify-center px-10 gap-2">
          {navLinks.map((link, i) => (
            <a
              key={link}
              ref={(el) => { mobileLinksRef.current[i] = el; }}
              href="#"
              onClick={() => setIsOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-zinc-100 last:border-0"
            >
              <span className="text-4xl font-bold tracking-tight text-zinc-900 group-hover:text-[#9186BB] transition-colors duration-200">
                {link}
              </span>
              <span className="text-zinc-300 group-hover:text-[#9186BB] transition-colors duration-200 translate-x-0 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          ))}
          <div className="mt-8">
            <Button href="#" color="#9186BB">GET STARTED</Button>
          </div>
        </div>

        {/* Footer */}
        <div className="sidebar-footer px-10 py-8 border-t border-zinc-100 bg-zinc-50">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-4">Follow us</p>
          <div className="flex gap-4 mb-8">
            {[FaInstagram].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:border-[#9186BB] hover:text-[#9186BB] transition-all duration-200"
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
          <p className="text-[10px] text-zinc-400 font-medium">© 2026 Tags Intelligence. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Nav;