import Hero from "@/components/home/Hero";
import Mission from "@/components/home/MIssion";
import WavyMarquee from "@/components/common/WavyMarquee";

import Beam from  "@/components/home/Beam";
import Text from "@/components/home/Text";
import Dashboard from "@/components/home/Dashboard";
import Marquee from "@/components/home/Marquee";
import YoutubeAds from "@/components/home/YoutubeAds";
import YoutubeIllustration from "@/components/home/Youtubeillustration";
import TrendingVideos from "@/components/home/Trendingvideos";
import Contact from "@/components/home/Contact";
import DataComparison from '@/components/home/DataComparison'

const GridOverlay = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="tgs-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#tgs-grid)" />
  </svg>
);


export default function Home() {
  return (
   <div className="bg-white relative overflow-hidden">
  
    <Hero/>
    <Marquee/>
    <Mission/>
     <Beam/>
    <Dashboard/>

    
    <YoutubeAds/>
  
    
  
    <TrendingVideos/>
   
    <Contact/>
    
  
  

  

  


   </div>
  );
}
