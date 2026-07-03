import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

export default function FeaturedSolutions() {
  const services = [
    {
      title: 'Manufacturing',
      desc: 'Our state-of-the-art manufacturing facilities produce high-precision components for critical industrial applications, ensuring robustness and efficiency in every part.',
      img: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Laser Cutting',
      desc: 'Equipped with advanced laser cutting technology, we offer unmatched precision and speed for intricate designs across a wide variety of metal sheets and materials.',
      img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Production',
      desc: 'End-to-end production lines optimized for high-volume, defect-free output. We scale to meet global demands while maintaining uncompromising quality control.',
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    }
  ];

  return (
    <section className="bg-stark-white py-section-padding border-y border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
          <div className="space-y-4 max-w-3xl">
            <h2 className="font-headline-xl text-[36px] md:text-[48px] text-on-surface uppercase tracking-wide font-bold leading-tight">
              Visit our specialised<br />industries<span className="text-[#0F1B2D]">.</span>
            </h2>
            <p className="font-body-md text-[16px] text-on-surface-variant italic">
              Discover the core sectors where Hitech Engineering drives innovation, precision, and world-class capabilities.
            </p>
          </div>
          <div className="flex gap-4 items-center mt-6 lg:mt-0">
            <button className="feat-prev w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-[#475569] hover:text-white transition-all rounded-full disabled:opacity-50">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="feat-next w-10 h-10 border border-outline-variant flex items-center justify-center hover:bg-[#475569] hover:text-white transition-all rounded-full disabled:opacity-50">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Mousewheel, FreeMode]}
          slidesPerView={1}
          spaceBetween={40}
          freeMode={true}
          speed={800}
          mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
          navigation={{
            nextEl: '.feat-next',
            prevEl: '.feat-prev',
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="servicesSwiper overflow-visible cursor-grab active:cursor-grabbing"
        >
          {services.map((service, idx) => (
            <SwiperSlide key={idx} className="!h-auto flex items-start pb-16">
              <div className={`bg-white w-full flex flex-col group overflow-hidden rounded-[24px] border border-gray-200 shadow-sm transition-all duration-500 ${idx === 0 ? 'pb-10' : idx === 1 ? 'pb-0' : 'pb-16'}`}>
                <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Date Tab */}
                <div className="absolute bottom-0 left-8 bg-white px-5 py-2 rounded-t-[16px] z-10 flex items-center justify-center">
                  <span className="text-[13px] text-gray-500 font-medium">
                    May {10 + idx}, 2026
                  </span>
                  
                  {/* Left curve */}
                  <div 
                    className="absolute -left-4 bottom-0 w-4 h-4 bg-transparent rounded-br-[16px]"
                    style={{ boxShadow: '5px 5px 0 5px white' }}
                  ></div>
                  
                  {/* Right curve */}
                  <div 
                    className="absolute -right-4 bottom-0 w-4 h-4 bg-transparent rounded-bl-[16px]"
                    style={{ boxShadow: '-5px 5px 0 5px white' }}
                  ></div>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="font-headline-md text-[20px] md:text-[22px] font-bold text-gray-900 mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="font-body-md text-[15px] text-gray-600 leading-relaxed mb-8 line-clamp-3">
                  {service.desc}
                </p>
                <div className="mt-auto">
                  <button className="text-[#00C2CB] font-semibold text-[13px] uppercase underline underline-offset-4 decoration-1 hover:text-gray-900 transition-colors">
                    VISIT US
                  </button>
                </div>
              </div>
            </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
