"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PlayCircle, BarChart3, Users, LucideIcon } from "lucide-react";

interface Branch {
  path: string;
  color: string;
  glow: string;
  label: string;
  val: string;
  Icon: LucideIcon;
  foY: number;
}

const BRANCHES: Branch[] = [
  {
    path: "M420 210 C 540 210, 580 80, 700 80",
    color: "#ADC443",
    glow: "rgba(173,196,67,0.4)",
    label: "Videos",
    val: "1B",
    Icon: PlayCircle,
    foY: 30,
  },
  {
    path: "M420 210 C 540 210, 580 210, 700 210",
    color: "#F09C31",
    glow: "rgba(240,156,49,0.4)",
    label: "Daily Trend",
    val: "700K",
    Icon: BarChart3,
    foY: 160,
  },
  {
    path: "M420 210 C 540 210, 580 340, 700 340",
    color: "#68C1E0",
    glow: "rgba(104,193,224,0.4)",
    label: "Channels",
    val: "8M+",
    Icon: Users,
    foY: 290,
  },
];

export default function DataFlowBeam() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const mainGrad = svg.querySelector<SVGLinearGradientElement>("#mainBeam");
    const branchGrads = [0, 1, 2].map((i) =>
      svg.querySelector<SVGLinearGradientElement>(`#branch${i}`)
    );
    const branchPaths = [0, 1, 2].map((i) =>
      svg.querySelector<SVGPathElement>(`#beamPath${i}`)
    );
    const ring1 = svg.querySelector<SVGCircleElement>("#glowRing1");
    const ring2 = svg.querySelector<SVGCircleElement>("#glowRing2");
    const zapCircle = svg.querySelector<SVGCircleElement>("#zapCircle");
    const zapPath = svg.querySelector<SVGPathElement>("#zapPath");
    const cards = [0, 1, 2].map((i) =>
      svg.querySelector<HTMLDivElement>(`#card${i}`)
    );

    function spawnDot(
      pathEl: SVGPathElement,
      color: string,
      delay: number
    ): void {
      const len = pathEl.getTotalLength();
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", color);
      dot.setAttribute("opacity", "0");
      svg!.appendChild(dot);

      const proxy = { t: 0 };
      gsap.to(proxy, {
        t: len,
        duration: 1.05,
        delay,
        ease: "power2.inOut",
        onUpdate() {
          const v = proxy.t;
          const pt = pathEl.getPointAtLength(v);
          dot.setAttribute("cx", String(pt.x));
          dot.setAttribute("cy", String(pt.y));
          dot.setAttribute("opacity", String(Math.sin((v / len) * Math.PI)));
        },
        onComplete: () => dot.remove(),
      });
    }

    function spawnLineDot(delay: number): void {
      const dot = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      dot.setAttribute("r", "4");
      dot.setAttribute("fill", "#C4BFEF");
      dot.setAttribute("opacity", "0");
      svg!.appendChild(dot);

      const proxy = { t: 0 };
      gsap.to(proxy, {
        t: 280,
        duration: 1.0,
        delay,
        ease: "power2.inOut",
        onUpdate() {
          const v = proxy.t;
          dot.setAttribute("cx", String(120 + v));
          dot.setAttribute("cy", "210");
          dot.setAttribute("opacity", String(Math.sin((v / 280) * Math.PI)));
        },
        onComplete: () => dot.remove(),
      });
    }

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

    // Reset
    tl.set(mainGrad, { attr: { x1: "-20%", x2: "0%" } }, 0);
    tl.set(branchGrads, { attr: { x1: "400", x2: "420" } }, 0);

    // Main beam
    tl.to(
      mainGrad,
      { attr: { x1: "120%", x2: "140%" }, duration: 1.1, ease: "power2.inOut" },
      0.1
    );
    tl.add(() => spawnLineDot(0), 0.1);

    // Center glow burst
    tl.to(
      zapCircle,
      { attr: { r: 36 }, opacity: 0.3, duration: 0.35, ease: "back.out(2)" },
      1.0
    );
    tl.to(
      ring1,
      { attr: { r: 38 }, opacity: 0.6, duration: 0.3, ease: "power2.out" },
      1.0
    );
    tl.to(
      ring2,
      { attr: { r: 54 }, opacity: 0.3, duration: 0.45, ease: "power2.out" },
      1.0
    );
    tl.to(zapPath, { attr: { fill: "#D0CAFF" }, duration: 0.25 }, 1.0);

    // Fade center back
    tl.to([ring1, ring2], { opacity: 0, duration: 0.5 }, 1.5);
    tl.to(
      zapCircle,
      { attr: { r: 22 }, opacity: 0.15, duration: 0.5 },
      1.5
    );
    tl.to(zapPath, { attr: { fill: "#9186BB" }, duration: 0.5 }, 1.5);

    // Branch beams + dots + card glow
    BRANCHES.forEach((b, i) => {
      const t = 1.0 + i * 0.12;
      tl.to(
        branchGrads[i],
        {
          attr: { x1: 700 + 200, x2: 700 + 400 },
          duration: 1.2,
          ease: "power2.inOut",
        },
        t
      );
      const path = branchPaths[i];
      if (path) {
        tl.add(() => spawnDot(path, b.color, 0), t + 0.05);
      }
      tl.to(
        cards[i],
        {
          boxShadow: `0 12px 48px ${b.glow}, 0 0 0 2px rgba(255,255,255,0.35) inset`,
          duration: 0.35,
          ease: "power2.out",
        },
        t + 0.35
      );
      tl.to(
        cards[i],
        { boxShadow: "0 8px 32px rgba(0,0,0,0.12)", duration: 0.6, ease: "power2.in" },
        t + 1.0
      );
    });

    // Reset branch grads
    tl.set(branchGrads, { attr: { x1: "400", x2: "420" } }, 2.8);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="w-full py-10 px-4 overflow-hidden">
      {/* ── Desktop SVG ── */}
      <div className="hidden lg:block w-full max-w-4xl mx-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 880 420"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient
              id="mainBeam"
              gradientUnits="userSpaceOnUse"
              x1="-20%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#9186BB" stopOpacity="0" />
              <stop offset="50%" stopColor="#C4BFEF" stopOpacity="1" />
              <stop offset="100%" stopColor="#9186BB" stopOpacity="0" />
            </linearGradient>

            {BRANCHES.map((b, i) => (
              <linearGradient
                key={i}
                id={`branch${i}`}
                gradientUnits="userSpaceOnUse"
                x1="400"
                y1="0"
                x2="420"
                y2="0"
              >
                <stop offset="0%" stopColor={b.color} stopOpacity="0" />
                <stop offset="50%" stopColor={b.color} stopOpacity="1" />
                <stop offset="100%" stopColor={b.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {/* Track lines */}
          <line
            x1="120"
            y1="210"
            x2="400"
            y2="210"
            stroke="#D8D8E0"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          {BRANCHES.map((b, i) => (
            <path
              key={i}
              d={b.path}
              stroke="#D8D8E0"
              strokeWidth="1.5"
              fill="none"
            />
          ))}

          {/* Animated beams */}
          <line
            id="mainBeamLine"
            x1="120"
            y1="210"
            x2="400"
            y2="210"
            stroke="url(#mainBeam)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {BRANCHES.map((b, i) => (
            <path
              key={i}
              id={`beamPath${i}`}
              d={b.path}
              stroke={`url(#branch${i})`}
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
          ))}

          {/* Logo node */}
          <rect
            x="28"
            y="150"
            width="120"
            height="120"
            rx="28"
            fill="white"
            style={{ filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.10))" }}
          />
          <image
            href="assets/tags-logo.png"
            x="44"
            y="170"
            width="88"
            height="80"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* Center glow rings */}
          <circle
            id="glowRing1"
            cx="410"
            cy="210"
            r="22"
            fill="none"
            stroke="#9186BB"
            strokeWidth="2"
            opacity="0"
          />
          <circle
            id="glowRing2"
            cx="410"
            cy="210"
            r="34"
            fill="none"
            stroke="#9186BB"
            strokeWidth="1.5"
            opacity="0"
          />

          {/* Center zap icon */}
          <circle
            id="zapCircle"
            cx="410"
            cy="210"
            r="22"
            fill="#9186BB"
            opacity="0.15"
          />
          <path
            id="zapPath"
            d="M414,196 L404,212 L411,212 L406,224 L416,208 L409,208 Z"
            fill="#9186BB"
            opacity="0.9"
          />

          {/* Metric cards */}
          {BRANCHES.map((b, i) => (
            <foreignObject key={i} x="692" y={b.foY} width="182" height="120">
              <div
                id={`card${i}`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 28,
                  background: b.color,
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 18px",
                  gap: 14,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    flexShrink: 0,
                    background: "rgba(255,255,255,0.22)",
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <b.Icon size={22} color="white" />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 30,
                      fontWeight: 900,
                      color: "white",
                      lineHeight: 1,
                      letterSpacing: -1,
                      margin: 0,
                    }}
                  >
                    {b.val}
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "rgba(255,255,255,0.75)",
                      marginTop: 3,
                    }}
                  >
                    {b.label}
                  </p>
                </div>
              </div>
            </foreignObject>
          ))}
        </svg>
      </div>

      {/* ── Mobile vertical stack ── */}
      <div className="flex lg:hidden flex-col items-center gap-4 w-full max-w-sm mx-auto">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-5">
          <img src="assets/tags-logo.png" alt="Tags" className="w-full object-contain" />
        </div>
        <div className="flex flex-col items-center gap-1">
          {([1, 0.4, 0.15] as number[]).map((op, i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full bg-[#9186BB]"
              style={{ opacity: op }}
            />
          ))}
        </div>
        {BRANCHES.map((b, i) => (
          <div
            key={i}
            className="w-full rounded-[22px] p-4 flex items-center gap-4 shadow-lg"
            style={{ background: b.color }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.22)" }}
            >
              <b.Icon size={20} color="white" />
            </div>
            <div>
              <p className="text-white font-black text-3xl leading-none tracking-tight">
                {b.val}
              </p>
              <p className="text-white/75 text-[9px] font-bold uppercase tracking-widest mt-1">
                {b.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}