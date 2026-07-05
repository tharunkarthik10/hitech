import { useState } from 'react';

export default function Technologies() {
  const assets = [
    { 
      id: 'PRD-01', 
      title: 'Hydraulic Cylinders', 
      shortTitle: 'Hydraulic',
      img: 'https://motiequipments.com/assets/images/shop/grid/palette-1.jpg',
      features: [
        'Heavy-duty industrial applications',
        'Precision seals & robust construction'
      ]
    },
    { 
      id: 'PRD-02', 
      title: 'VMC Precision Components', 
      shortTitle: 'VMC Parts',
      img: 'https://motiequipments.com/assets/images/shop/grid/flex-2.jpg',
      features: [
        'Expertly machined components',
        'Stringent tolerance requirements'
      ]
    },
    { 
      id: 'PRD-03', 
      title: 'SPM Machine', 
      shortTitle: 'SPM Machine',
      img: 'https://motiequipments.com/assets/images/shop/grid/truck-2.jpg',
      features: [
        'Custom-built automation',
        'Maximized production efficiency'
      ]
    },
    { 
      id: 'PRD-04', 
      title: 'CNC Precision Components', 
      shortTitle: 'CNC Parts',
      img: 'https://motiequipments.com/assets/images/shop/grid/flex-1.jpg',
      features: [
        'Unparalleled accuracy',
        'Critical engineering needs'
      ]
    },
    { 
      id: 'PRD-05', 
      title: 'Laser Cutting', 
      shortTitle: 'Laser Cut',
      img: 'https://motiequipments.com/assets/images/shop/grid/truck-1.jpg',
      features: [
        'Clean, precise cuts',
        'Variety of industrial metals'
      ]
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [openFeatureIndex, setOpenFeatureIndex] = useState<number | null>(null);
  const activeAsset = assets[activeIndex];

  return (
    <section className="bg-[#18181b] text-white py-24 font-body-md border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-10">
              {assets.map((asset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setOpenFeatureIndex(null);
                  }}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    activeIndex === idx
                      ? 'bg-blue-200 text-blue-900'
                      : 'bg-white text-black hover:bg-[#0088cc] hover:text-white'
                  }`}
                >
                  {asset.shortTitle}
                </button>
              ))}
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-headline-xl font-medium leading-[1.1] mb-12 tracking-tight">
              Our Core Engineering Products
            </h2>

            {/* Features Accordion-style */}
            <div className="flex flex-col mb-12">
              {activeAsset.features.map((feature, idx) => {
                const isOpen = openFeatureIndex === idx;
                return (
                  <div key={idx} className="flex flex-col border-b border-white/20">
                    <div 
                      className="flex justify-between items-center py-6 group cursor-pointer hover:text-white transition-colors"
                      onClick={() => setOpenFeatureIndex(isOpen ? null : idx)}
                    >
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                        {feature}
                      </h4>
                      {/* Small arrow triangle */}
                      <div className={`w-0 h-0 border-b-[6px] border-b-transparent border-l-[6px] border-l-white border-t-[6px] border-t-transparent transform transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-45 group-hover:translate-x-1'}`}></div>
                    </div>
                    
                    {/* Dropdown Content */}
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-400 leading-relaxed text-[15px] pr-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore More Button */}
            <div>
              <button className="flex items-center justify-center gap-3 px-6 py-3 rounded-[12px] border border-white/30 text-white hover:bg-white hover:text-black transition-colors font-medium text-sm">
                Explore more 
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </button>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="lg:col-span-5 relative w-full aspect-square bg-black flex items-center justify-center overflow-hidden rounded-xl border border-white/10">
            {/* Soft glow effects mimicking the provided image */}
            <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-red-500/10 to-transparent"></div>
            <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-teal-500/10 to-transparent"></div>
            
            <img 
              src={activeAsset.img} 
              alt={activeAsset.title}
              key={activeAsset.id}
              className="relative z-10 w-full h-full object-cover transition-opacity duration-500 hover:scale-105 transform" 
            />
          </div>

        </div>
      </div>
    </section>
  );
}
