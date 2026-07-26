import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

const industries = [
  {
    name: 'Automotive',
    description: 'Precision components for next-generation vehicles.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Aerospace',
    description: 'High-performance parts meeting stringent aerospace standards.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Medical Devices',
    description: 'Ultra-precise manufacturing for life-saving medical equipment.',
    image: 'https://images.unsplash.com/photo-1530213786676-4187f5831e50?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Energy Sector',
    description: 'Robust engineering solutions for renewable and traditional energy.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Electronics',
    description: 'Advanced components for consumer and industrial electronics.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Defense',
    description: 'Mission-critical engineering for national security applications.',
    image: 'https://images.unsplash.com/photo-1574347710323-99b380309995?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Telecommunications',
    description: 'Reliable infrastructure parts for global connectivity.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
  },
  {
    name: 'Construction',
    description: 'Heavy-duty equipment parts for monumental building projects.',
    image: 'https://images.unsplash.com/photo-1541888081622-19e34ff614e8?auto=format&fit=crop&q=80&w=800',
  }
];

export default function IndustriesWeServe() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollRange = useMotionValue(0);
  
  // Track the scroll progress of the target section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Measure the track width to calculate exact scroll distance
  React.useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current) {
        // The distance we need to scroll is the total width of the track MINUS the viewport width
        // We subtract a bit extra to account for padding
        scrollRange.set(trackRef.current.scrollWidth - window.innerWidth + 96);
      }
    };
    
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    return () => window.removeEventListener("resize", updateScrollRange);
  }, []);

  // Map scroll progress (0 to 1) to horizontal translation in pixels
  // We use a callback function so useTransform responds to changes in both motion values
  const x = useTransform(() => {
    return -(scrollYProgress.get() * scrollRange.get());
  });

  return (
    // We give the section a larger height (800vh) to make the horizontal scroll slower and smoother
    <section ref={targetRef} className="relative h-[800vh] bg-white border-y border-gray-200">
      
      {/* The sticky container holds the content in place while we scroll */}
      <div className="sticky top-[140px] h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden">
        
        {/* Header Section */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full mb-12 shrink-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="max-w-2xl">
              <h2 className="text-[36px] md:text-[48px] font-bold text-[#051923] tracking-tight leading-tight mb-4 uppercase">
                Industries We Serve
                <span className="text-[#00A6FB]">.</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-gray-600 font-light leading-relaxed">
                Delivering world-class engineering solutions across diverse sectors. Our commitment to precision and quality ensures optimal performance in every application.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#006494] font-semibold text-[13px] uppercase tracking-wider hover:text-[#051923] transition-colors">
              View All Industries
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <motion.div 
          ref={trackRef}
          style={{ x }} 
          className="flex gap-6 px-6 md:px-12 w-max"
        >
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="group relative h-[380px] w-[280px] sm:w-[300px] md:w-[320px] lg:w-[310px] xl:w-[320px] rounded-2xl overflow-hidden shrink-0 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={industry.image} 
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-300">
                <h3 className="text-white text-[24px] font-bold mb-2 group-hover:-translate-y-2 transition-transform duration-300">
                  {industry.name}
                </h3>
                <p className="text-gray-200 text-[14px] leading-relaxed opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300 delay-75">
                  {industry.description}
                </p>
              </div>

              {/* Hover icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Mobile Button */}
        <div className="px-6 w-full shrink-0">
          <button className="mt-10 md:hidden flex items-center justify-center w-full gap-2 text-[#006494] font-semibold text-[13px] uppercase tracking-wider hover:text-[#051923] transition-colors py-4 border border-gray-200 rounded-xl">
            View All Industries
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
