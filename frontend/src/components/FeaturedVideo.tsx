import React from 'react';
import { Play } from 'lucide-react';

export default function FeaturedVideo() {
  return (
    <section className="bg-white w-full overflow-hidden py-0">
      <a 
        href="https://www.youtube.com/watch?v=y294tIuPzGk" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative w-full h-[400px] sm:h-[460px] md:h-[550px] overflow-hidden shadow-lg hover: transition-all duration-500 cursor-pointer block"
      >
          {/* Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          >
            <source src="/hero_boomerang.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay with styling on hover */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-500 flex flex-col items-center justify-center">
            
            {/* Play Button Icon */}
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-4 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-lg">
              <Play className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-[#051923] fill-current translate-x-0.5 transition-colors duration-300" />
            </div>

            {/* Content text */}
            <h3 className="text-white text-lg md:text-2xl font-bold tracking-wider uppercase mb-2 text-center px-4 group-hover:translate-y-[-4px] transition-transform duration-500">
              Watch Our Full Facility Tour
            </h3>
            <p className="text-white/70 text-xs md:text-sm tracking-widest uppercase group-hover:translate-y-[4px] transition-transform duration-500">
              Click to view on YouTube
            </p>
          </div>
        </a>
    </section>
  );
}
