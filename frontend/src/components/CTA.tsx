import { motion } from 'framer-motion';

export default function CTA() {

  return (
    <section className="py-24 w-full bg-white relative overflow-hidden border-t border-gray-100">
      {/* Background Dotted Map */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none opacity-[0.35]">
        <div 
          className="w-full h-full max-w-[1200px] scale-[1.2] md:scale-100"
          style={{
            maskImage: 'url("/world-map.svg")',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'right center',
            WebkitMaskImage: 'url("/world-map.svg")',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'right center',
            backgroundImage: 'radial-gradient(circle, #003554 1px, transparent 1.5px)',
            backgroundSize: '8px 8px'
          }}
        />
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex flex-col">
        {/* Top Section */}
        <div className="flex flex-col xl:flex-row justify-between items-center xl:items-start gap-12 mb-24">
          
          {/* Left: Heading */}
          <div className="w-full xl:w-auto flex-shrink-0 text-center xl:text-left max-w-xl">
            <span className="text-sm font-medium tracking-tight text-[#64748b] block mb-2">
              Global Presence
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121212] leading-[1.12] mb-3">
              Our Partners
            </h2>
            <p className="font-normal text-sm sm:text-base md:text-[17px] text-[#475569] leading-relaxed">
              HiTech operates across key industrial territories worldwide, supporting mission-critical manufacturing partnerships with consistent execution.
            </p>
          </div>

          {/* Right: Counter */}
          <div className="w-full xl:w-auto flex-shrink-0 flex justify-center xl:justify-end items-center gap-4">
            <div className="relative">
              <span className="text-[90px] md:text-[120px] font-bold tracking-tight text-[#cbd5e1] leading-none">
                07+
              </span>
            </div>
            <span className="text-sm font-semibold tracking-widest text-[#64748b] uppercase pt-4" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
              Countries
            </span>
          </div>
        </div>



      </div>
    </section>
  );
}
