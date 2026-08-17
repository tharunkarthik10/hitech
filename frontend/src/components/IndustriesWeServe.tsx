import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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
  // Duplicate the array to create a seamless infinite scrolling effect
  const duplicatedIndustries = [...industries, ...industries];

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        
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
        </div>
      </div>

      <style>
        {`
          @keyframes industries-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-industries-marquee {
            animation: industries-marquee 45s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-industries-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Horizontal Scrolling Row */}
      <div className="w-full overflow-hidden pb-6">
        <div className="animate-industries-marquee">
          {duplicatedIndustries.map((industry, index) => (
            <div 
              key={index}
              className="group relative h-[380px] w-[280px] sm:w-[300px] md:w-[320px] lg:w-[310px] xl:w-[320px] rounded-xl overflow-hidden shrink-0 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 mx-3"
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
