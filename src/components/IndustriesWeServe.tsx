import React, { useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white border-y border-gray-200 py-20 md:py-28">
      <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto px-6 md:px-12 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-[36px] md:text-[48px] font-bold text-[#051923] tracking-tight leading-tight mb-4 uppercase">
              Industries We Serve
              <span className="text-[#00A6FB]">.</span>
            </h2>
            <p className="text-[16px] md:text-[18px] text-gray-600 font-light leading-relaxed">
              Delivering world-class engineering solutions across diverse sectors. Our commitment to precision and quality ensures optimal performance in every application.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-[#006494] hover:text-white transition-all duration-300 rounded-full text-gray-600 hover:border-[#006494]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:bg-[#006494] hover:text-white transition-all duration-300 rounded-full text-gray-600 hover:border-[#006494]"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Row */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 w-full snap-x snap-mandatory"
        >
          {industries.map((industry, index) => (
            <div 
              key={index}
              className="group relative h-[380px] w-[280px] sm:w-[300px] md:w-[320px] lg:w-[310px] xl:w-[320px] rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 snap-start"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300"></div>
              
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
        </div>

      </div>
    </section>
  );
}
