import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const stages = [
  {
    id: "01",
    title: "DESIGN REVIEW",
    desc: "Customer drawings and CAD files are reviewed to determine the most efficient cutting strategy. Designs are optimized for accuracy, material utilization, and production efficiency.",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
  },
  {
    id: "02",
    title: "MATERIAL SELECTION",
    desc: "The appropriate material and thickness are selected according to project requirements, ensuring the right balance of strength, quality, and performance.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80" 
  },
  {
    id: "03",
    title: "PRECISION LASER CUTTING",
    desc: "Advanced CNC laser technology delivers accurate, clean, and repeatable cuts for complex profiles and precision components.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
  },
  {
    id: "04",
    title: "QUALITY INSPECTION",
    desc: "Every finished component is inspected for dimensional accuracy, edge quality, and overall consistency before delivery.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
  },
  {
    id: "05",
    title: "SECURE DELIVERY",
    desc: "Completed components are carefully handled, securely packaged, and prepared for reliable delivery according to project requirements.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
  }
];

export default function InteractiveLaserProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  // We make the container 500vh tall to allow plenty of scroll space for 5 stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track the active stage based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 stages: [0-0.2), [0.2-0.4), [0.4-0.6), [0.6-0.8), [0.8-1.0]
    let stage = Math.floor(latest * 5);
    if (stage >= 5) stage = 4;
    if (stage < 0) stage = 0;
    setActiveStage(stage);
  });

  // Laser position moves continuously from top to bottom across the whole scroll range
  const laserY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // To create the continuous effect between images, we can transition the clip-path of each image layer based on scroll.
  // We'll stack all 5 images on top of each other.
  // Image 0 is always at the bottom.
  // Image 1 is clipped to the scroll progress in its range, etc.
  
  // Calculate individual clip-path bounds for each image layer:
  // We want the laser to sweep *downwards*. 
  // For image N (where N > 0), it should start appearing when scroll reaches its segment, 
  // and be fully visible when scroll finishes its segment.
  
  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#051923]">
      {/* Sticky Container - this stays on screen while we scroll the 500vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row bg-[#051923] text-white">
        
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

        {/* PROGRESS INDICATOR (Side) */}
        <div className="hidden md:flex flex-col justify-center items-center w-24 h-full relative z-50 border-r border-white/5 bg-[#051923]/80 backdrop-blur-md">
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 left-1/2 -translate-x-1/2"></div>
          {/* Laser dot on the progress bar */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#00A6FB] shadow-[0_0_15px_rgba(0,166,251,1)] z-10"
            style={{ top: laserY }}
          />
          <div className="flex flex-col gap-12 relative z-20 w-full h-full justify-center">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex justify-center w-full relative">
                <span className={`text-sm font-mono font-bold tracking-widest transition-all duration-500 ${
                  activeStage === idx 
                    ? 'text-[#00A6FB] drop-shadow-[0_0_8px_rgba(0,166,251,0.8)] scale-125' 
                    : 'text-gray-600 scale-100'
                }`}>
                  {stage.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* IMMERSIVE VISUAL AREA (Left / Top) */}
        <div className="w-full h-[50vh] md:w-3/5 md:h-full relative overflow-hidden bg-black">
          {/* Stack all images */}
          {stages.map((stage, idx) => {
            // For image 0, it's always fully visible in the background
            if (idx === 0) {
              return (
                <div key={idx} className="absolute inset-0">
                  <img src={stage.image} alt={stage.title} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#051923]/80 to-transparent mix-blend-multiply"></div>
                  {/* Subtle technical grid overlay for CAD stage */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,166,251,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,166,251,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-30"></div>
                </div>
              );
            }

            // For subsequent images, we use Framer Motion to control clip-path
            // We want the clip-path to move from top to bottom (0% to 100%) exactly when the scroll progress is between (idx-1)/5 and (idx)/5
            const startScroll = (idx - 1) / 5;
            const endScroll = idx / 5;
            
            // `useTransform` maps the scrollYProgress to a percentage for the clip-path bottom edge
            // So when scroll is at startScroll, it's 0% visible (clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%))
            // When scroll is at endScroll, it's 100% visible (clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%))
            // After endScroll, it stays 100% visible
            const clipPathBottom = useTransform(
              scrollYProgress,
              [startScroll, endScroll],
              ["0%", "100%"]
            );

            // We create a custom motion value for the clip-path string
            const clipPath = useTransform(clipPathBottom, val => `polygon(0% 0%, 100% 0%, 100% ${val}, 0% ${val})`);

            // Check if this is the active stage transitioning
            // To show sparks only when laser cutting (Stage 3) is being revealed or when it's active
            const isCuttingStage = idx === 2;
            const isInspectionStage = idx === 3;

            return (
              <motion.div 
                key={idx} 
                className="absolute inset-0 z-10"
                style={{ clipPath }}
              >
                <img src={stage.image} alt={stage.title} className="w-full h-full object-cover opacity-90" />
                
                {/* Specific overlays based on stage */}
                {isCuttingStage && (
                  <div className="absolute inset-0 bg-[#051923]/20"></div>
                )}
                {isInspectionStage && (
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none mix-blend-overlay"></div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#051923]/60 via-transparent to-transparent"></div>
              </motion.div>
            );
          })}

          {/* THE LASER BEAM */}
          <motion.div 
            className="absolute left-0 w-full h-[2px] z-50 pointer-events-none flex justify-center shadow-[0_0_20px_rgba(0,166,251,1)]"
            style={{ 
              top: laserY,
              background: 'linear-gradient(90deg, transparent 0%, #00A6FB 20%, #ffffff 50%, #00A6FB 80%, transparent 100%)'
            }}
          >
            {/* Core bright spot of the laser */}
            <div className="w-1/3 h-[4px] bg-white blur-[2px] rounded-full absolute -top-[1px]"></div>
            
            {/* Sparks / Particles (only visible during transition) */}
            <div className="absolute -top-[20px] w-full flex justify-center opacity-70">
                {/* We'd add small animated divs here for sparks, but keeping it performant */}
                <div className="w-[100px] h-[40px] bg-[radial-gradient(ellipse_at_center,rgba(0,166,251,0.8)_0%,transparent_70%)] animate-pulse"></div>
                {activeStage === 2 && (
                  <div className="absolute top-4 w-4 h-4 bg-orange-400 rounded-full blur-[4px] animate-ping opacity-60"></div>
                )}
            </div>
          </motion.div>
          
          {/* Edge glow to blend into text section */}
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#051923] to-transparent z-40 hidden md:block"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#051923] to-transparent z-40 md:hidden"></div>
        </div>

        {/* TEXT CONTENT AREA (Right / Bottom) */}
        <div className="w-full h-[50vh] md:w-2/5 md:h-full flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-40">
           {/* Mobile Progress indicator */}
           <div className="md:hidden flex gap-4 mb-8">
              {stages.map((_, idx) => (
                <div key={idx} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${activeStage === idx ? 'bg-[#00A6FB] shadow-[0_0_8px_rgba(0,166,251,0.6)]' : 'bg-white/10'}`}></div>
              ))}
           </div>

           <div className="relative w-full h-[250px] md:h-[300px]">
             {stages.map((stage, idx) => (
               <div 
                 key={idx} 
                 className={`absolute inset-0 transition-all duration-700 transform flex flex-col justify-center ${
                   activeStage === idx 
                     ? 'opacity-100 translate-y-0' 
                     : activeStage < idx 
                       ? 'opacity-0 translate-y-12 pointer-events-none'
                       : 'opacity-0 -translate-y-12 pointer-events-none'
                 }`}
               >
                 <div className="inline-flex items-center gap-4 mb-4">
                   <span className="text-[#00A6FB] font-mono text-xl font-bold tracking-widest">{stage.id}</span>
                   <div className="h-[1px] w-12 bg-white/20"></div>
                 </div>
                 <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white font-headline-xl leading-[1.1] tracking-tight mb-6 uppercase">
                   {stage.title}
                 </h2>
                 <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md">
                   {stage.desc}
                 </p>
                 
                 {/* Decorative technical elements */}
                 <div className="mt-8 flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                   <span>SYS_STATUS: OPTIMAL</span>
                   <span className="w-1 h-1 rounded-full bg-[#00A6FB] animate-pulse"></span>
                   <span>PHASE_{stage.id}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
