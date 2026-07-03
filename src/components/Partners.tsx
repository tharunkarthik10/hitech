import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';

export default function Partners() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const countries = [
    { name: 'India', flag: '🇮🇳' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'UAE', flag: '🇦🇪', fullName: 'United Arab Emirates' },
    { name: 'USA', flag: '🇺🇸', fullName: 'United States' },
    { name: 'Singapore', flag: '🇸🇬' },
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Sri Lanka', flag: '🇱🇰' },
  ];

  // Duplicate for seamless ultra-wide scrolling
  const marqueeItems = [...countries, ...countries, ...countries];

  return (
    <section className="bg-stark-white pt-12 lg:pt-16 pb-0 relative overflow-hidden flex flex-col justify-center">
      {/* Subtle Dotted World Map Pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/a/a0/World_map_with_points.svg')`,
          backgroundSize: '60% auto',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.15
        }}
      >
      </div>
      
      <div className="max-w-container-max mx-auto px-gutter relative z-10 w-full mb-24 lg:mb-32">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          {/* Left: Heading */}
          <div className="lg:w-5/12">
            <h2 className="font-headline-xl text-[56px] text-on-surface leading-tight mb-2">Our Partners</h2>
            <p className="font-body-lg text-[28px] text-on-surface-variant leading-snug">
              HITECH ENGINEERING Operates in <br /> following countries
            </p>
          </div>

          {/* Right: Stats */}
          <div className="lg:w-2/12 flex flex-col items-center lg:items-end justify-center mt-8 lg:mt-0">
             <div className="text-[100px] font-headline-xl font-bold text-on-surface leading-none">
               07+
             </div>
             <div className="font-status-code tracking-[0.2em] text-lg font-medium uppercase text-on-surface-variant mt-2">
               Countries
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Marquee */}
      <div 
        className="w-full relative z-10 py-6 border-t border-b border-outline-variant bg-stark-white/60 backdrop-blur-md"
        onMouseEnter={() => {
          if (swiperInstance && swiperInstance.autoplay) swiperInstance.autoplay.pause();
        }}
        onMouseLeave={() => {
          if (swiperInstance && swiperInstance.autoplay) swiperInstance.autoplay.start();
        }}
      >
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay, FreeMode]}
          slidesPerView="auto"
          spaceBetween={0}
          loop={true}
          allowTouchMove={false}
          freeMode={{ enabled: true, momentum: false }}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          className="clientsSwiper"
        >
          {marqueeItems.map((c, idx) => (
            <SwiperSlide key={idx} className="!w-auto flex items-center">
              <span className="font-status-code tracking-[0.25em] text-sm md:text-base uppercase font-bold text-on-surface">
                {c.fullName || c.name}
              </span>
              <span className="mx-8 md:mx-16 text-on-surface-variant/40 text-xl leading-none">·</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
