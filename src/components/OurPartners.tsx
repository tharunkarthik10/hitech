export default function OurPartners() {
  const cities = [
    { name: 'Fairbanks', x: 20, y: 35, active: true },
    { name: 'Los Angeles', x: 25, y: 45 },
    { name: 'Brasília', x: 38, y: 68 },
    { name: 'London', x: 48, y: 38 },
    { name: 'Nairobi', x: 57, y: 60 },
    { name: 'New Delhi', x: 70, y: 45 },
    { name: 'Vladivostok', x: 85, y: 35 },
  ];

  // Generate SVG path connecting the dots with smooth curves
  // Path goes from city to city
  const pathData = `M ${cities[0].x}% ${cities[0].y}% 
    S ${cities[1].x - 2}% ${cities[1].y + 5}%, ${cities[1].x}% ${cities[1].y}% 
    S ${cities[2].x - 5}% ${cities[2].y + 5}%, ${cities[2].x}% ${cities[2].y}% 
    S ${cities[3].x - 5}% ${cities[3].y - 5}%, ${cities[3].x}% ${cities[3].y}% 
    S ${cities[4].x - 4}% ${cities[4].y + 5}%, ${cities[4].x}% ${cities[4].y}% 
    S ${cities[5].x - 5}% ${cities[5].y - 5}%, ${cities[5].x}% ${cities[5].y}% 
    S ${cities[6].x - 5}% ${cities[6].y - 5}%, ${cities[6].x}% ${cities[6].y}%`;

  return (
    <section className="bg-[#051923] pt-12 pb-24 font-body-md relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-[44px] text-white font-headline-xl font-bold tracking-tight mb-3">
              Our Partners
            </h2>
            <p className="text-gray-300 text-[17px] max-w-md leading-relaxed">
              HITECH ENGINEERING Operates in<br className="hidden sm:block" /> following countries
            </p>
          </div>
          <div className="text-left md:text-right">
            <h3 className="text-6xl md:text-[70px] text-white font-headline-xl font-bold tracking-tight mb-2">
              07+
            </h3>
            <p className="text-gray-400 text-sm tracking-[0.25em] font-semibold uppercase">
              COUNTRIES
            </p>
          </div>
        </div>
      </div> {/* Close max-w-container-max */}

      {/* Full Bleed Map Container with reduced height (aspect 3/1) */}
        <div className="relative w-full aspect-[16/9] md:aspect-[3/1] mt-8 overflow-hidden z-10 pb-8">
          
          {/* Inner Map Container (preserves map aspect ratio) */}
          <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 aspect-[2.2/1] min-w-[800px]">
            
            {/* Dotted Map Effect using SVG Mask */}
            <div 
              className="absolute inset-0 z-0 opacity-40"
              style={{
                maskImage: 'url("/world-map.svg")',
                maskSize: '100% 100%',
                maskPosition: 'center',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: 'url("/world-map.svg")',
                WebkitMaskSize: '100% 100%',
                WebkitMaskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
              }}
            >
              {/* The dot pattern */}
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1.5px)',
                  backgroundSize: '8px 8px'
                }}
              ></div>
            </div>

            {/* Curved connection line (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path 
                 d={pathData} 
                 fill="none" 
                 stroke="#00A6FB" 
                 strokeWidth="2"
                 vectorEffect="non-scaling-stroke"
                 className="opacity-80"
               />
            </svg>

            {/* City Dots */}
            {cities.map((city, idx) => (
              <div 
                key={idx}
                className="absolute z-20 flex flex-col items-center"
                style={{ top: `${city.y}%`, left: `${city.x}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Dot */}
                <div className="relative">
                  <div className="w-2.5 h-2.5 bg-[#00A6FB] rounded-full shadow-[0_0_12px_#00A6FB]"></div>
                  {/* Ping animation */}
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-[#00A6FB] rounded-full animate-ping opacity-60"></div>
                </div>
                
                {/* Label */}
                <div className="mt-2 bg-[#051923] border border-white/20 px-2.5 py-1 rounded-sm text-[11px] text-white font-semibold whitespace-nowrap shadow-xl">
                  {city.name}
                </div>

                {/* Active Client Tooltip (only for Fairbanks) */}
                {city.active && (
                  <div className="absolute top-1/2 left-[120%] -translate-y-1/2 ml-2 bg-[#006494] px-4 py-1.5 rounded-full text-[10px] text-white font-bold tracking-widest whitespace-nowrap shadow-[0_0_20px_rgba(0,100,148,0.6)] z-30 flex items-center">
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-[#006494] rotate-45 rounded-sm"></div>
                    <span className="relative z-10">ACTIVE CLIENT</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
