import React from 'react';
import { Play } from 'lucide-react';

export default function FeaturedVideo() {
  return (
    <section className="bg-white w-full overflow-hidden py-20">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-headline-xl text-[36px] md:text-[48px] font-bold text-[#051923] tracking-tight leading-tight mb-4 uppercase">
              Take a Virtual Tour of Our Facility
              <span className="text-[#00A6FB]">.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-600 font-light leading-relaxed">
              Step inside our state-of-the-art manufacturing plant. Watch this comprehensive tour to see our advanced precision machinery, automated workflows, and the innovative infrastructure that powers our engineering excellence.
            </p>
          </div>
        </div>

        <a 
          href="https://www.youtube.com/watch?v=y294tIuPzGk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative w-full rounded-2xl h-[400px] sm:h-[500px] md:h-[650px] overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer block"
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
      </div>
    </section>
  );
}
