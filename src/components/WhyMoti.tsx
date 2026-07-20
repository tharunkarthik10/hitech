export default function WhyMoti() {
  return (
    <section className="bg-[#f8fafc] font-body-md relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        
        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-12 lg:gap-16 pt-0">
          
          {/* Left: CEO Quote */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start self-start pt-12 lg:pt-24 pb-12 lg:pb-0">
            <div className="relative max-w-lg lg:max-w-xl ml-auto mr-4 lg:mr-12 text-right">
              <span className="material-symbols-outlined text-[80px] lg:text-[100px] text-[#00A6FB]/10 absolute -top-8 lg:-top-12 -right-6 lg:-right-10 z-0 rotate-180">
                format_quote
              </span>
              <p className="text-[#051923] leading-relaxed text-[20px] md:text-[24px] lg:text-[28px] font-light italic relative z-10">
                "Under visionary leadership, we have grown into a premier provider of engineering solutions. We are dedicated to maximizing results with transparency, fair pricing, and 24/7 support."
              </p>
            </div>
          </div>

          {/* Right: CEO Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start items-start h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
             
             {/* The Cropped Image */}
             {/* overflow-hidden on the container ensures the image ends exactly at the container's bottom edge. */}
             <img 
               src="/WhatsApp Image 2026-07-19 at 23.12.45.png" 
               alt="CEO" 
               className="h-[170%] md:h-[180%] lg:h-[190%] w-auto object-contain object-top -translate-y-[12%] md:-translate-y-[14%] lg:-translate-y-[16%] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] pointer-events-auto relative z-10 transition-transform duration-700 hover:scale-[1.02] origin-top"
             />
          </div>

        </div>
      </div>
    </section>
  );
}
