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
  return (
    <div className="bg-[#051923] text-white flex flex-col overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none z-0"></div>

      {stages.map((stage, idx) => {
        const isReversed = idx % 2 !== 0;

        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[60vh] md:min-h-[70vh] border-b border-white/5 relative z-10`}
          >
            {/* Image Side */}
            <div className="w-full h-[40vh] md:h-auto md:w-1/2 relative overflow-hidden bg-black group">
              <img 
                src={stage.image} 
                alt={stage.title} 
                className="w-full h-full object-cover opacity-80 transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out" 
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${isReversed ? 'from-transparent to-[#051923]/90' : 'from-[#051923]/90 to-transparent'} mix-blend-multiply`}></div>
              
              {/* Subtle technical overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,166,251,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,166,251,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20"></div>

              {/* Edge glow to blend into text section */}
              <div className={`absolute top-0 bottom-0 ${isReversed ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l'} w-32 from-[#051923] to-transparent z-40 hidden md:block`}></div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#051923] to-transparent z-40 md:hidden"></div>
            </div>

            {/* Text Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-40 bg-[#051923]">
              <div className="inline-flex items-center gap-4 mb-6">
                <span className="text-[#00A6FB] font-mono text-2xl font-bold tracking-widest">{stage.id}</span>
                <div className="h-[2px] w-16 bg-white/20"></div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white font-headline-xl leading-[1.1] tracking-tight mb-8 uppercase">
                {stage.title}
              </h2>
              
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg mb-12">
                {stage.desc}
              </p>
              
              {/* Decorative technical elements */}
              <div className="mt-auto inline-flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest pt-8 border-t border-white/10">
                <span>SYS_STATUS: OPTIMAL</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] animate-pulse shadow-[0_0_8px_rgba(0,166,251,0.8)]"></span>
                <span>PHASE_{stage.id}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
