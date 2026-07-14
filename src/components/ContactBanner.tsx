export default function ContactBanner() {
  return (
    <section className="bg-stark-white w-full py-10 mt-16 overflow-visible">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="relative bg-[#0F1B2D] rounded-sm flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10 md:py-12">
          
          {/* Man Image Overflowing Top */}
          <div className="absolute left-0 bottom-0 hidden md:block w-64 lg:w-80 z-10 pointer-events-none">
            {/* We use the same man from features as placeholder, or a generic placeholder if unavailable */}
            <img 
              src="/new_person_transparent.png" 
              alt="Contact Support" 
              className="w-full h-auto object-contain object-bottom drop-shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="md:ml-64 lg:ml-80 flex flex-col z-20 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-[3px] h-4 bg-[#1E3A8A]"></div>
              <p className="font-body-md text-[#F1F5F9] font-medium">Have Any Questions !</p>
            </div>
            <h2 className="font-headline-lg text-stark-white text-[24px] md:text-[32px] lg:text-[40px] font-bold leading-tight">
              DON'T HESITATE TO CONTACT US ANY TIME.
            </h2>
          </div>

          {/* Button */}
          <div className="mt-8 md:mt-0 z-20 shrink-0">
            <button className="px-8 py-3 border-2 border-stark-white text-stark-white font-label-caps uppercase tracking-wider font-bold hover:bg-stark-white hover:text-[#0F1B2D] transition-colors duration-300">
              Contact Us
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
