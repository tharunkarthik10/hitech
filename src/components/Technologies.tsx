export default function Technologies() {
  const assets = [
    { 
      id: 'PRD-01', 
      title: 'Hydraulic Cylinders', 
      img: 'https://motiequipments.com/assets/images/shop/grid/palette-1.jpg',
      desc: 'High-performance hydraulic cylinders engineered for heavy-duty industrial applications with precision seals and robust construction.' 
    },
    { 
      id: 'PRD-02', 
      title: 'VMC Precision Components', 
      img: 'https://motiequipments.com/assets/images/shop/grid/flex-2.jpg',
      desc: 'Expertly machined Vertical Machining Center components that meet stringent tolerance requirements for complex assemblies.'
    },
    { 
      id: 'PRD-03', 
      title: 'SPM Machine', 
      img: 'https://motiequipments.com/assets/images/shop/grid/truck-2.jpg',
      desc: 'Special Purpose Machines custom-built to automate your unique manufacturing processes and maximize production efficiency.'
    },
    { 
      id: 'PRD-04', 
      title: 'CNC Precision Components', 
      img: 'https://motiequipments.com/assets/images/shop/grid/flex-1.jpg',
      desc: 'Computer Numerical Control machined parts delivering unparalleled accuracy and repeatability for critical engineering needs.'
    },
    { 
      id: 'PRD-05', 
      title: 'Laser Cutting', 
      img: 'https://motiequipments.com/assets/images/shop/grid/truck-1.jpg',
      desc: 'State-of-the-art laser cutting services providing clean, precise cuts on a variety of industrial metals and alloys.'
    },
    { 
      id: 'PRD-06', 
      title: 'Hydraulic Power Pack', 
      img: 'https://motiequipments.com/assets/images/shop/grid/palette-3.jpg',
      desc: 'Reliable and efficient hydraulic power units designed to drive your most demanding hydraulic machinery.'
    },
    { 
      id: 'PRD-07', 
      title: 'Industrial Rollers', 
      img: 'https://motiequipments.com/assets/images/shop/grid/scissor.jpg',
      desc: 'Durable industrial rollers manufactured to withstand heavy loads and ensure smooth continuous operation.'
    },
    { 
      id: 'PRD-08', 
      title: 'Rubber Moulding Machines', 
      img: 'https://motiequipments.com/assets/images/shop/grid/manual-hand-stacker.jpg',
      desc: 'Advanced rubber moulding equipment engineered for consistent quality in producing complex rubber parts.'
    },
    { 
      id: 'PRD-09', 
      title: 'Polyurethane Moulds', 
      img: 'https://motiequipments.com/assets/images/shop/grid/palette-1.jpg',
      desc: 'Custom-designed polyurethane moulds that offer exceptional wear resistance and longevity for mass production.'
    },
  ];

  return (
    <section className="bg-stark-white pt-12 pb-24 font-body-md">
      <div className="max-w-container-max mx-auto px-gutter">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#0F1B2D] font-headline-xl font-semibold leading-[1.1] tracking-tight max-w-2xl">
            Our Core Engineering Products
          </h2>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-outline-variant text-[#475569] hover:border-[#0F1B2D] hover:text-[#0F1B2D] transition-all font-medium text-sm whitespace-nowrap">
            View all products <span className="material-symbols-outlined text-sm font-bold">north_east</span>
          </button>
        </div>

        {/* Horizontal Scroll (Replaces Grid) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 hide-scrollbar items-start w-full">
          {assets.map((asset, idx) => {
            // Staggering heights to create a 2-4cm difference at the bottom
            const heightClass = ['h-[460px]', 'h-[540px]', 'h-[500px]'][idx % 3];
            
            return (
              <div 
                key={idx} 
                className={`w-[320px] md:w-[360px] snap-start shrink-0 flex flex-col group rounded-[24px] bg-white border border-outline/10 shadow-sm hover:shadow-xl transition-all duration-300 overflow-visible ${heightClass}`}
              >
                
                {/* Image Container */}
                <div className="relative h-[240px] shrink-0 rounded-t-[24px] overflow-hidden bg-[#F1F5F9]">
                  <img 
                    src={asset.img} 
                    alt={asset.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
                  />
                </div>
                
                {/* Content Container */}
                <div className="relative px-8 pt-8 pb-8 flex flex-col flex-grow">
                  {/* Overlapping Pill */}
                  <div className="absolute -top-4 left-8 bg-white px-5 py-1.5 rounded-full shadow-sm text-[11px] font-bold text-[#475569] border border-outline/10 z-10 tracking-widest uppercase">
                    {asset.id}
                  </div>
                  
                  <h3 className="text-[22px] font-bold text-[#0F1B2D] mb-3 leading-tight mt-1">{asset.title}</h3>
                  <p className="text-[#475569] text-[14px] leading-relaxed mb-6 flex-grow">{asset.desc}</p>
                  
                  <a href="#" className="text-[#00C2CB] font-bold text-[11px] tracking-widest uppercase hover:text-[#0F1B2D] transition-colors mt-auto">
                    READ MORE
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
