import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const stages = [
  {
    id: "01",
    shortTitle: "REQUIREMENT",
    title: "Requirement Analysis",
    desc: "Understanding customer drawings, specifications, dimensions, tolerances, and production requirements before manufacturing begins.",
    status: "REQUIREMENT VERIFIED",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80"
  },
  {
    id: "02",
    shortTitle: "PLANNING",
    title: "Production Planning",
    desc: "Materials, machinery, resources, and production sequences are carefully planned to ensure efficient and consistent manufacturing.",
    status: "PRODUCTION PLAN READY",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
  },
  {
    id: "03",
    shortTitle: "MANUFACTURING",
    title: "Precision Manufacturing",
    desc: "Advanced machinery and skilled engineering expertise transform raw materials into accurate, high-quality components built to meet demanding specifications.",
    status: "COMPONENT COMPLETE ✓",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80"
  },
  {
    id: "04",
    shortTitle: "INSPECTION",
    title: "Quality Inspection",
    desc: "Every component undergoes dimensional measurement, surface inspection, and quality verification to ensure compliance with required specifications.",
    status: "QUALITY VERIFIED",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80"
  },
  {
    id: "05",
    shortTitle: "DELIVERY",
    title: "Final Delivery",
    desc: "Completed components are carefully handled, securely packaged, and prepared for reliable and timely delivery.",
    status: "READY FOR DELIVERY",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
  }
];

export default function InteractiveManufacturingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 5 stages mapping
    // 0-0.2: 0
    // 0.2-0.4: 1
    // 0.4-0.65: 2
    // 0.65-0.82: 3
    // 0.82-1.0: 4
    let stage = 0;
    if (latest >= 0.82) stage = 4;
    else if (latest >= 0.65) stage = 3;
    else if (latest >= 0.40) stage = 2;
    else if (latest >= 0.20) stage = 1;
    
    setActiveStage(stage);
  });

  // Image transitions - smooth crossfades and scales based on scroll
  // Instead of a strict cut, we fade them in and out
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.35, 0.45, 0.60, 0.70], [0, 1, 1, 0]);
  const opacity4 = useTransform(scrollYProgress, [0.60, 0.70, 0.80, 0.88], [0, 1, 1, 0]);
  const opacity5 = useTransform(scrollYProgress, [0.80, 0.88, 1], [0, 1, 1]);

  const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 1.1]);
  const scale2 = useTransform(scrollYProgress, [0.15, 0.45], [0.95, 1.05]);
  const scale3 = useTransform(scrollYProgress, [0.35, 0.70], [0.95, 1.05]);
  const scale4 = useTransform(scrollYProgress, [0.60, 0.88], [0.95, 1.05]);
  const scale5 = useTransform(scrollYProgress, [0.80, 1], [0.95, 1.05]);

  const opacities = [opacity1, opacity2, opacity3, opacity4, opacity5];
  const scales = [scale1, scale2, scale3, scale4, scale5];

  // Specific overlays
  const scanLineY = useTransform(scrollYProgress, [0.65, 0.82], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#051923]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:flex-row bg-[#051923] text-white">
        
        {/* PROGRESS INDICATOR (Side) */}
        <div className="hidden md:flex flex-col justify-center items-center w-32 h-full relative z-50 border-r border-white/5 bg-[#051923]/80 backdrop-blur-md">
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/10 right-4"></div>
          
          <div className="flex flex-col gap-10 relative z-20 w-full pr-4">
            {stages.map((stage, idx) => (
              <div key={idx} className="flex flex-col items-end w-full relative">
                {/* Connector line */}
                <div className={`absolute -right-4 w-4 h-[2px] transition-colors duration-500 top-1/2 -translate-y-1/2 ${
                  activeStage === idx ? 'bg-[#00A6FB]' : 'bg-transparent'
                }`}></div>
                
                <span className={`text-xl font-mono font-bold transition-all duration-500 ${
                  activeStage === idx ? 'text-[#00A6FB]' : 'text-gray-600'
                }`}>
                  {stage.id}
                </span>
                <span className={`text-[10px] uppercase tracking-wider mt-1 transition-all duration-500 text-right ${
                  activeStage === idx ? 'text-white' : 'text-gray-600'
                }`}>
                  {stage.shortTitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* IMMERSIVE VISUAL AREA (Left / Top) */}
        <div className="w-full h-[50vh] md:w-3/5 md:h-full relative overflow-hidden bg-[#00080f]">
          
          {stages.map((stage, idx) => {
            return (
              <motion.div 
                key={idx} 
                className="absolute inset-0 z-10 flex items-center justify-center"
                style={{ opacity: opacities[idx], scale: scales[idx] }}
              >
                <img src={stage.image} alt={stage.title} className="w-full h-full object-cover opacity-70" />
                
                {/* Overlays */}
                {idx === 0 && (
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,166,251,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,166,251,0.15)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-screen"></div>
                )}
                {idx === 1 && (
                  <div className="absolute inset-0 bg-[#051923]/30 mix-blend-overlay"></div>
                )}
                {idx === 2 && (
                  <div className="absolute inset-0 bg-[#051923]/20"></div>
                )}
                {idx === 3 && (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none mix-blend-overlay"></div>
                    <motion.div 
                      className="absolute left-0 w-full h-[2px] bg-[#00A6FB] shadow-[0_0_15px_rgba(0,166,251,0.8)] z-50 pointer-events-none"
                      style={{ top: scanLineY }}
                    ></motion.div>
                  </>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-r from-[#051923]/80 via-[#051923]/20 to-transparent"></div>
              </motion.div>
            );
          })}
          
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#051923] to-transparent z-40 hidden md:block"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#051923] to-transparent z-40 md:hidden"></div>
        </div>

        {/* TEXT CONTENT AREA (Right / Bottom) */}
        <div className="w-full h-[50vh] md:w-2/5 md:h-full flex flex-col justify-center p-8 md:p-16 lg:p-20 relative z-40">
           
           <div className="md:hidden flex gap-2 mb-8">
              {stages.map((_, idx) => (
                <div key={idx} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${activeStage === idx ? 'bg-[#00A6FB]' : 'bg-white/10'}`}></div>
              ))}
           </div>

           <div className="relative w-full h-[300px] md:h-[400px]">
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
                 <div className="inline-flex items-center gap-4 mb-6">
                   <span className="text-white/40 font-mono text-lg font-bold tracking-widest">{stage.id}</span>
                   <div className="h-[1px] w-12 bg-white/20"></div>
                   <span className="text-[#00A6FB] text-xs font-bold tracking-widest uppercase">{stage.shortTitle}</span>
                 </div>
                 
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-headline-xl leading-[1.1] tracking-tight mb-8">
                   {stage.title}
                 </h2>
                 
                 <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md mb-10">
                   {stage.desc}
                 </p>
                 
                 <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 self-start">
                   {idx === 0 && <span className="w-2 h-2 rounded-full bg-[#00A6FB] animate-pulse"></span>}
                   {idx === 2 && activeStage === 2 ? (
                     <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                   ) : idx === 4 ? (
                     <span className="w-2 h-2 rounded-full bg-green-500"></span>
                   ) : idx !== 0 && (
                     <span className="w-2 h-2 rounded-full bg-[#00A6FB]"></span>
                   )}
                   <span className="text-xs font-mono font-semibold tracking-wider text-white">{stage.status}</span>
                 </div>
                 
                 {/* Special Final Delivery Message */}
                 {idx === 4 && (
                   <div className="mt-8 flex flex-col gap-2">
                     <span className="text-[10px] text-gray-500 tracking-widest font-mono uppercase">PRECISION MANUFACTURED</span>
                     <span className="text-[10px] text-gray-500 tracking-widest font-mono uppercase">QUALITY ASSURED</span>
                     <span className="text-[10px] text-[#00A6FB] tracking-widest font-mono uppercase">READY TO PERFORM</span>
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}
