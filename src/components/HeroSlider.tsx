export default function HeroSlider() {
  return (
    <section className="relative w-full h-[95vh] min-h-[750px] flex items-center overflow-hidden">
      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://cdn.coverr.co/videos/coverr-industrial-machines-in-a-factory-4268/1080p.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay - Darker on the left where text goes */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10"></div>

      {/* Content on the left */}
      <div className="relative z-20 w-full max-w-container-max mx-auto px-gutter mt-24">
        <div className="max-w-3xl text-left text-white space-y-6">
          <h2 className="font-heading text-[38px] md:text-[52px] leading-tight text-white uppercase tracking-wide">
            Innovation and Excellence in Manufacturing Since 1999
          </h2>
          <div className="w-24 h-1.5 bg-industrial-yellow"></div>
          <p className="font-body-lg text-lg md:text-[20px] leading-relaxed text-gray-200">
            Founded in 1999 in Coimbatore by Mr. Suresh, Hitech Engineering Works has embodied a vision of excellence through innovation. Originally established as a job order service, Hitech Engineering has evolved into a premier manufacturing hub, offering a comprehensive array of cutting-edge machinery all under one roof.
          </p>
        </div>
      </div>
    </section>
  );
}
