interface HeroSliderProps {
  title?: string;
  description?: string;
  videoSrc?: string;
  buttonText?: string;
}

export default function HeroSlider({
  title = "Innovation and Excellence in Manufacturing Since 1999",
  description = "Founded in 1999 in Coimbatore by Mr. Suresh, Hitech Engineering Works has embodied a vision of excellence through innovation. Originally established as a job order service, Hitech Engineering has evolved into a premier manufacturing hub, offering a comprehensive array of cutting-edge machinery all under one roof.",
  videoSrc = "/hero_boomerang.mp4",
  buttonText = "View Our Infra"
}: HeroSliderProps) {
  return (
    <section className="relative w-full h-[95vh] min-h-[750px] flex items-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
        key={videoSrc} // Important: forces video reload when src changes
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay - Darker on the left where text goes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10"></div>

      {/* Content on the left */}
      <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mt-24">
        <div className="max-w-3xl text-left text-white space-y-6">
          <div className="space-y-2.5">
            <span className="text-sm font-medium tracking-tight text-white/80 block">
              Established 1999 — Coimbatore, India
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.12]">
              {title}
            </h1>
          </div>
          
          <p className="font-normal text-sm sm:text-base md:text-[17px] text-white/90 leading-relaxed max-w-2xl">
            {description}
          </p>

          <div className="pt-4">
            <button className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-white/80 bg-white/10 hover:bg-white hover:text-black text-white font-medium text-sm tracking-tight backdrop-blur-xs transition-all duration-300 cursor-pointer active:scale-95">
              <span>{buttonText}</span>
              <span className="material-symbols-outlined text-[18px]">north_east</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
