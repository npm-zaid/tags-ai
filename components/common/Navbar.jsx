
'use client'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Button from "./Button";
import { Menu } from 'lucide-react'


const NavItem = ({ label, stroke = "#ed5af2" }) => {
  const anchorRef = useRef(null);
  const pathRef = useRef(null);

  const pathId = `navpath-${label.replace(/\s+/g, '')}`;

  useEffect(() => {
    const anchor = anchorRef.current;
    const path = pathRef.current;

    const animateTo = (d, ease, duration = 1) => {
      gsap.killTweensOf(path);
      gsap.to(path, {
        attr: { d },
        ease,
        duration,
      });
    };

    const enter = () => {
      // Adjusted coordinates to fit a 300-width viewBox
      animateTo("M 10,80 Q 150,20 290,80", "elastic.out(1.4, 0.4)", 0.8);
    };

    const leave = () => {
      animateTo("M 10,80 Q 150,80 290,80", "elastic.out(1.8, 0.2)", 1.5);
    };

    anchor.addEventListener("pointerenter", enter);
    anchor.addEventListener("pointerleave", leave);

    return () => {
      anchor.removeEventListener("pointerenter", enter);
      anchor.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <a ref={anchorRef} className="nav-item cursor-pointer flex items-center justify-center">
      {/* 1. Increased viewBox to 300 120 
          2. Increased width to 120px to prevent clipping
          3. overflow-visible ensures the "elastic" bounce isn't cropped
      */}
      <svg 
        viewBox="0 0 300 120" 
        width="120px" 
        height="80px" 
        className="overflow-visible"
      >
        <path
          ref={pathRef}
          id={pathId}
          // Default state matches the new viewBox width
          d="M 10,80 Q 150,80 290,80"
          stroke={stroke}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />

        <text className="path-text fill-zinc-900 font-medium" style={{ fontSize: '45px' }}>
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            <tspan dy="-15">{label}</tspan>
          </textPath>
        </text>
      </svg>
    </a>
  );
};


const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    let prevScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      gsap.to(navRef.current, {
        y: currentScrollY > prevScrollY ? '-100%' : '0%',
        duration: 1,
        ease: 'power3.out',
      });
      prevScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: "Products", stroke: "#ed5af2" },
    { label: "Services", stroke: "#00c4ff" },
    { label: "Why Tags", stroke: "#7dff61" },
    { label: "Resources", stroke: "#ffa33c" },
  ];

  return (
    <nav ref={navRef} className=" fixed w-full backdrop-blur-md  flex gap-4 px-6 py-2 z-50 rounded-lg justify-between items-center">


      <div className="sm:w-[8vw] w-[18vw]">
        <img
          className="w-full h-full object-fill"
          src='assets/tags-logo.png'
          alt="logo"
        />
      </div>


      <div className="hidden sm:flex gap-4 ">
        {links.map((item) => (
          <NavItem key={item.label} label={item.label} stroke={item.stroke} />
        ))}
      </div>


      <div className="hidden sm:block gap-4 ">
        <Button href="#" >Demo</Button>
      </div>

      <div className="block sm:hidden gap-4 ">
        <Menu />  
      </div>
    </nav>
  );
};

export default Navbar;