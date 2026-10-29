import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const industries = [
  {
    id: '01',
    name: 'Automotive',
    description: 'Precision components for next-generation electric and autonomous vehicles.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '02',
    name: 'Aerospace',
    description: 'High-performance parts meeting stringent aerospace tolerances and AS9100 standards.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '03',
    name: 'Medical Devices',
    description: 'Ultra-precise micro-machined tooling and assemblies for critical diagnostic equipment.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '04',
    name: 'Energy Sector',
    description: 'Robust engineering solutions for renewable, nuclear, and high-pressure power systems.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '05',
    name: 'Electronics',
    description: 'Advanced enclosures, heat sinks, and chassis for consumer and industrial electronics.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '06',
    name: 'Defense',
    description: 'Mission-critical engineering and MIL-SPEC compliance for national defense applications.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '07',
    name: 'Telecommunications',
    description: 'Reliable structural and RF shielding components for worldwide 5G and satellite networks.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '08',
    name: 'Heavy Construction',
    description: 'Heavy-duty structural components engineered for high-stress infrastructure projects.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
  },
];

export default function IndustriesWeServe() {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  // Measure dynamic horizontal scroll distance to ensure the last card stops exactly in view
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        // Dynamic horizontal padding matching container gutters
        const padding = windowWidth >= 1024 ? 48 : windowWidth >= 768 ? 32 : 16;
        const maxOffset = Math.max(0, trackWidth - windowWidth + padding);
        setScrollDistance(maxOffset);
      }
    };

    calculateDistance();
    // Re-calculate on resize and image load
    window.addEventListener('resize', calculateDistance);
    const timer = setTimeout(calculateDistance, 500);
    return () => {
      window.removeEventListener('resize', calculateDistance);
      clearTimeout(timer);
    };
  }, []);

  // Track vertical scroll progress through the pinned track
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Tactile, smooth spring physics: eliminates jitter and creates fluid glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.18,
    restDelta: 0.0005,
  });

  // Map vertical scroll progress to horizontal translation
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollDistance]);

  return (
    <div
      ref={targetRef}
      id="industries-we-serve"
      className="relative w-full h-[320vh] bg-white"
    >
      {/* Sticky pinned viewport: locks in place below the fixed navbar */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-20 pb-8 bg-white z-20">
        
        {/* Header Section */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-medium tracking-tight text-[#64748b] block mb-2">
                Cross-Sector Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#121212] leading-[1.12] mb-3">
                Industries We Serve
                <span className="text-[#00A6FB]">.</span>
              </h2>
              <p className="font-normal text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl">
                Delivering world-class engineering solutions across diverse sectors. Our commitment to precision and quality ensures optimal performance in every application.
              </p>
            </div>

            {/* Interactive Scroll Tracker Indicator */}
            <div className="hidden md:flex items-center gap-4 bg-gray-50 border border-gray-200/80 px-4 py-2.5 rounded-full">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#64748b] uppercase">
                <span>Scroll to explore</span>
                <span className="text-[#00A6FB]">→</span>
              </div>
              <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00A6FB] to-[#051923] rounded-full"
                  style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Cards Track */}
        <div className="w-full overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 md:gap-6 px-4 md:px-8 lg:px-12 w-max"
          >
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="group relative h-[380px] sm:h-[400px] md:h-[420px] w-[280px] sm:w-[320px] md:w-[360px] rounded-2xl overflow-hidden shrink-0 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 bg-gray-900 border border-gray-200/20"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50" />

                {/* Top Corner Index Badge */}
                <div className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white/90 tracking-widest uppercase">
                  {industry.id}
                </div>

                {/* Top Right Action Arrow Icon */}
                <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-[#00A6FB] group-hover:text-white group-hover:scale-110 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                {/* Content at Bottom */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end z-10">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2 transition-transform duration-300 group-hover:-translate-y-1">
                    {industry.name}
                  </h3>
                  <p className="font-normal text-xs sm:text-sm text-gray-300 leading-relaxed opacity-85 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-1">
                    {industry.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
