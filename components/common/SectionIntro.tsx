import React from "react";
import { Sparkles } from "lucide-react";

interface SectionIntroProps {
  // Badge
  badgeText?: string;
  badgeIcon?: React.ReactNode;

  // Heading
  prefix?: string;
  highlight?: string;
  suffix?: string;

  // Styling
  className?: string;
}

const SectionIntro: React.FC<SectionIntroProps> = ({
  badgeText = "Trusted Partnerships",
  badgeIcon = <Sparkles size={14} className="text-[#9186BB]" />,

  prefix = "Over 20+",
  highlight = "Businesses",
  suffix = "Growing with Us",

  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      
      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9186BB]/10 border border-[#9186BB]/20 mb-6">
        {badgeIcon}
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9186BB]">
          {badgeText}
        </span>
      </div>

      {/* Heading */}
      <div className="relative mb-12 flex flex-col items-center">
        <h1 className="sm:text-6xl text-5xl font-bold tracking-tighter text-center leading-[0.8] mb-4">
          <span className="text-zinc-900">{prefix} </span>

          <span className="bg-gradient-to-r from-[#9186BB] via-[#9186BB] to-zinc-900 bg-clip-text text-transparent italic pr-2">
            {highlight}
          </span>

          <span className="text-zinc-900 block sm:inline">
            {" "}
            {suffix}
          </span>
        </h1>

        <div className="w-36 h-1.5 bg-gradient-to-r from-zinc-900 to-[#9186BB] rounded-full mt-2" />
      </div>

    </div>
  );
};

export default SectionIntro;