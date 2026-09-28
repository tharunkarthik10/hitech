export default function LaserCuttingVideoCard() {
  return (
    <div className="w-full lg:w-[520px] xl:w-[580px] h-[380px] sm:h-[440px] lg:h-[480px] shrink-0 rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_60px_-10px_rgba(0,166,251,0.35)] relative group bg-black transition-all duration-500 hover:border-[#00A6FB]/60 flex items-center justify-center">
      
      {/* High-Definition Bright Laser Cutting Loop Video without overlays */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-125 sm:scale-130 filter brightness-125 contrast-110 saturate-110 transition-transform duration-700 group-hover:scale-135"
      >
        <source src="/boomerang_laser.mp4" type="video/mp4" />
      </video>

    </div>
  );
}
