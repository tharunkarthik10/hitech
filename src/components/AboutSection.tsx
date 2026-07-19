import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('Overview');
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // Create a raw motion value for the frame
  const frame = useMotionValue(30);
  
  // Smooth it out with spring physics
  const smoothFrame = useSpring(frame, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });
  
  // Update image source when the smoothed frame changes
  useMotionValueEvent(smoothFrame, "change", (latest) => {
    if (imgRef.current) {
      const frameNum = Math.max(30, Math.min(300, Math.floor(latest))).toString().padStart(3, '0');
      imgRef.current.src = `/about-sequence/ezgif-frame-${frameNum}.jpg`;
    }
  });

  // Hijack scroll only when hovering the image container
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Stop the page from scrolling
      e.preventDefault();
      
      // Adjust frame based on scroll direction and speed
      // 0.2 is the sensitivity multiplier
      const current = frame.get();
      const next = current + (e.deltaY * 0.2);
      
      // Keep it within bounds
      frame.set(Math.max(30, Math.min(300, next)));
    };

    // { passive: false } is required to allow e.preventDefault()
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [frame]);

  // Preload adjacent frames for smoother scrubbing
  useEffect(() => {
    for (let i = 1; i <= 50; i++) {
      const img = new Image();
      const num = i.toString().padStart(3, '0');
      img.src = `/about-sequence/ezgif-frame-${num}.jpg`;
    }
  }, []);

  const tabs = ['Overview', 'Mission', 'Vision', 'Strategy'];
  
  const tabContent: Record<string, React.ReactNode> = {
    'Overview': (
      <div className="space-y-6">
        <p>
          Founded in 1999 in Coimbatore by Mr. Suresh, Hitech Engineering Works has embodied a vision of excellence through innovation. Originally established as a job order service, we have evolved into a premier manufacturing hub.
        </p>
        <p>
          We conceive custom solutions for an industry that enters people's lives every day. We do this responsibly and by blazing new trails to combine technology, sustainability, and quality for those who produce and care.
        </p>
      </div>
    ),
    'Mission': (
      <div className="space-y-6">
        <p>
          To empower industries with superior material handling equipment that enhances operational efficiency and safety through innovative design and manufacturing excellence.
        </p>
      </div>
    ),
    'Vision': (
      <div className="space-y-6">
        <p>
          To be the global leader in kinetic precision engineering, setting the benchmark for quality, reliability, and sustainability in the material handling industry.
        </p>
      </div>
    ),
    'Strategy': (
      <div className="space-y-6">
        <p>
          Focusing on R&D, strategic partnerships, and customer-centric solutions to deliver high-impact engineering assets that solve complex logistical challenges.
        </p>
      </div>
    )
  };

  return (
    <section ref={sectionRef} className="bg-stark-white relative py-12 md:py-16 lg:py-24">
      <div className="w-full flex justify-center font-body-md group/section">
        {/* Massive Box Wrapper */}
        <div className="relative w-full max-w-[96%] 2xl:max-w-[1920px] mx-auto bg-[#051923] rounded-[40px] p-6 md:p-8 lg:p-12 shadow-2xl border border-white/10 flex flex-col">
        {/* Solid Background (Blobs removed to ensure zero transparency/glow) */}
        <div className="absolute inset-0 z-0 pointer-events-none"></div>

        {/* Content Layout */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-16 my-auto">
          
          {/* Left Side Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Pill Tabs */}
              <div className="flex flex-wrap gap-3 mb-12">
                {tabs.map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-2.5 rounded-full font-label-caps tracking-widest text-xs font-bold transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-white text-[#003554] shadow-md' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-[56px] text-white font-headline-xl font-semibold leading-[1.1] mb-12 tracking-tight drop-shadow-sm">
                At the heart of engineering innovation.
              </h2>

              {/* Dynamic Content Area (replaces accordion) */}
              <div className="text-white/80 text-lg leading-relaxed font-medium min-h-[180px] md:min-h-[220px] transition-all duration-500">
                {tabContent[activeTab]}
              </div>
            </div>

            {/* Explore Button */}
            <div className="mt-12 lg:mt-16">
              <button className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white text-white hover:bg-white hover:text-[#003554] transition-all duration-300 font-medium text-[16px]">
                Explore more <span className="material-symbols-outlined text-sm font-bold">north_east</span>
              </button>
            </div>
          </div>

          {/* Right Side Image Area */}
          <div 
            ref={imageContainerRef}
            className="w-full lg:w-[45%] flex-none rounded-[24px] bg-[#050A10]/50 flex items-center justify-center p-0 overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] relative border border-white/10 backdrop-blur-sm shadow-2xl group cursor-ns-resize"
          >
              <img 
               ref={imgRef}
               src="/about-sequence/ezgif-frame-030.jpg" 
               alt="Hitech Machinery" 
               className="w-[105%] max-w-none h-full object-cover object-center transition-transform duration-300 ease-out scale-[1.05] group-hover:scale-[1.1]"
             />
          </div>
        </div>

      </div>
      </div>
    </section>
  )
}
