export default function AboutSection() {
  return (
    <section className="relative bg-[#01477d] py-24 sm:py-32 overflow-hidden text-white font-body-md">
      {/* Background Gradients: Dark center, light corners matching Palladio */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Left Light Corner */}
        <div className="absolute top-0 left-0 w-[900px] h-[900px] bg-[#38bdf8] rounded-full blur-[160px] -translate-x-1/3 -translate-y-1/3"></div>
        {/* Top Right Light Corner */}
        <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-[#7dd3fc] rounded-full blur-[160px] translate-x-1/3 -translate-y-1/3"></div>
        {/* Bottom Left Light Corner */}
        <div className="absolute bottom-0 left-0 w-[900px] h-[900px] bg-[#38bdf8] rounded-full blur-[160px] -translate-x-1/3 translate-y-1/3"></div>
        {/* Bottom Right Light Corner */}
        <div className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-[#38bdf8] rounded-full blur-[160px] translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12">
        {/* Top Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-32 items-start">
          <div className="pt-8">
            <h3 className="font-label-caps text-white/70 uppercase tracking-[0.2em] text-xs font-bold mb-8">
              DATA
            </h3>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-[76px] text-white leading-[1.05] tracking-tight drop-shadow-sm font-medium">
              At the heart of engineering innovation, we develop machinery that makes a difference.
            </h2>
          </div>
          <div className="lg:pt-[120px]">
            <div className="space-y-6 font-body-lg text-[19px] text-white/90 leading-relaxed max-w-lg">
              <p>
                Founded in 1999 in Coimbatore by Mr. Suresh, Hitech Engineering Works has embodied a vision of excellence through innovation. Originally established as a job order service, we have evolved into a premier manufacturing hub.
              </p>
              <p>
                We conceive custom solutions for an industry that enters people's lives every day. We do this responsibly and by blazing new trails to combine technology, sustainability, and quality for those who produce and care.
              </p>
              
              <div className="pt-8">
                <button className="px-8 py-3.5 rounded-full border border-white hover:bg-white hover:text-[#0284c7] transition-all duration-300 font-medium text-[16px]">
                  Discover our world
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Thin Border separator like Palladio footer lines */}
        <div className="w-full h-px bg-white/30 mb-16"></div>

        {/* Mission / Vision / Strategy (No Boxes, Just minimal text columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {/* Mission */}
          <div className="group pr-12 pb-8 md:pb-0">
             <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
               <span className="material-symbols-outlined text-[32px] font-light">adjust</span>
             </div>
             <h3 className="font-heading text-2xl font-medium mb-4">Our Mission</h3>
             <p className="text-white/80 leading-relaxed text-[17px]">
               To empower industries with superior material handling equipment that enhances operational efficiency and safety through innovative design and manufacturing excellence.
             </p>
          </div>
          
          {/* Vision */}
          <div className="group border-t md:border-t-0 md:border-l border-white/30 pt-8 md:pt-0 md:pl-12 md:pr-12 pb-8 md:pb-0">
             <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
               <span className="material-symbols-outlined text-[32px] font-light">visibility</span>
             </div>
             <h3 className="font-heading text-2xl font-medium mb-4">Our Vision</h3>
             <p className="text-white/80 leading-relaxed text-[17px]">
               To be the global leader in kinetic precision engineering, setting the benchmark for quality, reliability, and sustainability in the material handling industry.
             </p>
          </div>

          {/* Strategy */}
          <div className="group border-t md:border-t-0 md:border-l border-white/30 pt-8 md:pt-0 md:pl-12">
             <div className="mb-6 text-white/80 group-hover:text-white transition-colors duration-300">
               <span className="material-symbols-outlined text-[32px] font-light">trending_up</span>
             </div>
             <h3 className="font-heading text-2xl font-medium mb-4">Our Strategy</h3>
             <p className="text-white/80 leading-relaxed text-[17px]">
               Focusing on R&D, strategic partnerships, and customer-centric solutions to deliver high-impact engineering assets that solve complex logistical challenges.
             </p>
          </div>
        </div>

      </div>
    </section>
  );
}
