import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import { WorldMap } from './ui/map';

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
    <section className="bg-[#0F172A] pt-12 lg:pt-16 pb-0 relative overflow-hidden flex flex-col justify-center">
      <div className="max-w-container-max mx-auto px-gutter relative z-10 w-full mb-12 lg:mb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
          
          {/* Left: Heading */}
          <div className="lg:w-5/12">
            <h2 className="font-headline-xl text-[56px] text-white leading-tight mb-2">Our Partners</h2>
            <p className="font-body-lg text-[28px] text-white/80 leading-snug">
              HITECH ENGINEERING Operates in <br /> following countries
            </p>
          </div>

          {/* Right: Stats */}
          <div className="lg:w-2/12 flex flex-col items-center lg:items-end justify-center mt-8 lg:mt-0">
             <div className="text-[100px] font-headline-xl font-bold text-white leading-none">
               07+
             </div>
             <div className="font-status-code tracking-[0.2em] text-lg font-medium uppercase text-white/80 mt-2">
               Countries
             </div>
          </div>
        </div>
      </div>

      {/* Map Below Text */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 lg:px-24 relative z-10 mb-16">
        <WorldMap
          className="w-full"
          animationDuration={25}
          points={[
            { lat: 64.2008, lng: -149.4937, label: "Fairbanks" },
            { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
            { lat: -15.7975, lng: -47.8919, label: "Brasília" },
            { lat: 51.5074, lng: -0.1278, label: "London" },
            { lat: -1.2921, lng: 36.8219, label: "Nairobi" },
            { lat: 28.6139, lng: 77.209, label: "New Delhi" },
            { lat: 43.1332, lng: 131.9113, label: "Vladivostok" },
          ]}
        />
      </div>

      {/* Bottom Marquee */}
      <div 
        className="w-full relative z-10 py-6 border-t border-b border-white/10 bg-[#0F172A]/60 backdrop-blur-md"
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
              <span className="font-status-code tracking-[0.25em] text-sm md:text-base uppercase font-bold text-white">
                {c.fullName || c.name}
              </span>
              <span className="mx-8 md:mx-16 text-white/40 text-xl leading-none">·</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
