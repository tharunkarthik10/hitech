import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

export default function HeroSlider() {
  return (
    <section className="relative w-full overflow-visible bg-white">
      {/* Background Image with 25% opacity */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 pointer-events-none" 
        style={{ backgroundImage: "url('/hero-bg-2.png')", opacity: 0.25 }}
      ></div>

      <div className="relative max-w-container-max mx-auto">
        <Swiper
          modules={[Navigation, Autoplay]}
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.hero-next',
            prevEl: '.hero-prev',
          }}
          loop={true}
          className="heroSwiper w-full min-h-[calc(100vh-120px)]"
        >
          {/* Slide 1 */}
          <SwiperSlide className="bg-transparent">
            <div className="px-gutter py-section-padding flex flex-col md:flex-row items-center gap-16 min-h-[calc(100vh-120px)]">
              <div className="flex-1 space-y-8">
                <div className="inline-block bg-on-surface text-industrial-yellow px-3 py-1 font-status-code text-status-code uppercase tracking-widest">
                  DELIVERING :: PROFESSIONAL_EXPERTISE
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
                  Creating <span className="text-primary italic">Sustainable</span> Value
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                  Providing end-to-end material handling and automation solutions for a more resilient supply chain.
                </p>
                <div className="flex gap-6 pt-4">
                  <button className="bg-industrial-yellow text-on-surface px-8 py-4 font-label-caps text-label-caps border-b-4 border-primary hover:translate-y-[-1px] transition-all">
                    Request A Quote
                  </button>
                  <button className="border border-outline px-8 py-4 font-label-caps text-label-caps hover:bg-surface-container transition-all flex items-center gap-2">
                    View Products <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center py-12">
                <div className="absolute top-0 right-0 w-64 h-64 border-t-2 border-r-2 border-outline-variant opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 border-b-2 border-l-2 border-outline-variant opacity-30"></div>

                <div className="relative w-4/5 lg:w-[85%] aspect-square bg-white/30 backdrop-blur-md border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center p-8 transition-all duration-700">
                  <img
                    alt="High-Rise Electric Stacker"
                    className="w-full h-full object-contain mix-blend-multiply scale-125 transition-transform duration-700 hover:scale-[1.35]"
                    src="https://motiequipments.com/assets/images/shop/standard/2.png"
                  />
                  <div className="absolute top-6 right-6 bg-stark-white/85 backdrop-blur-md p-4 border-l-4 border-industrial-yellow shadow-sm">
                    <span className="font-status-code text-[10px] uppercase tracking-widest text-outline-muted block mb-1">
                      EQUIPMENT_MODEL
                    </span>
                    <span className="font-label-caps text-[14px] text-on-surface">AC-POWER STACKER</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide className="bg-transparent">
            <div className="px-gutter py-section-padding flex flex-col md:flex-row items-center gap-16 min-h-[calc(100vh-120px)]">
              <div className="flex-1 space-y-8">
                <div className="inline-block bg-on-surface text-industrial-yellow px-3 py-1 font-status-code text-status-code uppercase tracking-widest">
                  WE ARE THE :: PIONEERS
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
                  Moving Towards <br /> <span className="text-primary italic">"Your Success"</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                  Innovative material handling solutions engineered to drive efficiency, safety, and growth in your daily operations.
                </p>
                <div className="flex gap-6 pt-4">
                  <button className="bg-industrial-yellow text-on-surface px-8 py-4 font-label-caps text-label-caps border-b-4 border-primary hover:translate-y-[-1px] transition-all">
                    Request A Quote
                  </button>
                  <button className="border border-outline px-8 py-4 font-label-caps text-label-caps hover:bg-surface-container transition-all flex items-center gap-2">
                    View Products <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center py-12">
                <div className="absolute top-0 right-0 w-64 h-64 border-t-2 border-r-2 border-outline-variant opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 border-b-2 border-l-2 border-outline-variant opacity-30"></div>

                <div className="relative w-4/5 lg:w-[85%] aspect-square bg-white/30 backdrop-blur-md border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center p-8 transition-all duration-700">
                  <img
                    alt="Electric Pallet Truck"
                    className="w-full h-full object-contain mix-blend-multiply scale-125 transition-transform duration-700 hover:scale-[1.35]"
                    src="https://motiequipments.com/assets/images/shop/standard/3.png"
                  />
                  <div className="absolute top-6 right-6 bg-stark-white/85 backdrop-blur-md p-4 border-l-4 border-industrial-yellow shadow-sm">
                    <span className="font-status-code text-[10px] uppercase tracking-widest text-outline-muted block mb-1">
                      EQUIPMENT_MODEL
                    </span>
                    <span className="font-label-caps text-[14px] text-on-surface">15EP ELECTRIC JACK</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide className="bg-transparent">
            <div className="px-gutter py-section-padding flex flex-col md:flex-row items-center gap-16 min-h-[calc(100vh-120px)]">
              <div className="flex-1 space-y-8">
                <div className="inline-block bg-on-surface text-industrial-yellow px-3 py-1 font-status-code text-status-code uppercase tracking-widest">
                  WE ARE THE :: PIONEERS
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
                  Moving Towards <br /> <span className="text-primary italic">"Your Future"</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
                  Innovative material handling solutions engineered to drive efficiency, safety, and growth in your daily operations.
                </p>
                <div className="flex gap-6 pt-4">
                  <button className="bg-industrial-yellow text-on-surface px-8 py-4 font-label-caps text-label-caps border-b-4 border-primary hover:translate-y-[-1px] transition-all">
                    Request A Quote
                  </button>
                  <button className="border border-outline px-8 py-4 font-label-caps text-label-caps hover:bg-surface-container transition-all flex items-center gap-2">
                    View Products <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center py-12">
                <div className="absolute top-0 right-0 w-64 h-64 border-t-2 border-r-2 border-outline-variant opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 border-b-2 border-l-2 border-outline-variant opacity-30"></div>

                <div className="relative w-4/5 lg:w-[85%] aspect-square bg-white/30 backdrop-blur-md border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.06)] flex items-center justify-center p-8 transition-all duration-700">
                  <img
                    alt="Hand Pallet Truck"
                    className="w-full h-full object-contain mix-blend-multiply scale-125 transition-transform duration-700 hover:scale-[1.35]"
                    src="https://motiequipments.com/assets/images/shop/standard/1.png"
                  />
                  <div className="absolute top-6 right-6 bg-stark-white/85 backdrop-blur-md p-4 border-l-4 border-industrial-yellow shadow-sm">
                    <span className="font-status-code text-[10px] uppercase tracking-widest text-outline-muted block mb-1">
                      EQUIPMENT_MODEL
                    </span>
                    <span className="font-label-caps text-[14px] text-on-surface">HAND PALLET TRUCK</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <div className="absolute bottom-12 right-12 flex gap-4 z-10">
            <button className="hero-prev w-14 h-14 border border-outline-variant flex items-center justify-center hover:bg-industrial-yellow hover:border-industrial-yellow transition-all rounded-full bg-stark-white/80 backdrop-blur-sm cursor-pointer shadow-sm">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="hero-next w-14 h-14 border border-outline-variant flex items-center justify-center hover:bg-industrial-yellow hover:border-industrial-yellow transition-all rounded-full bg-stark-white/80 backdrop-blur-sm cursor-pointer shadow-sm">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </Swiper>
      </div>
    </section>
  );
}
