export default function WhyChooseUs() {
  const features = [
    {
      icon: 'verified',
      title: 'Industrial Expertise',
      desc: 'Engineering tailored for real factory conditions and high-duty cycles.'
    },
    {
      icon: 'dashboard_customize',
      title: 'Customized Automation',
      desc: 'Solutions tailored to layout constraints, payloads, and process flow.'
    },
    {
      icon: 'lightbulb',
      title: 'Future-Ready Technology',
      desc: 'Scalable systems with intelligent design and dynamic capabilities.'
    },
    {
      icon: 'verified_user',
      title: 'Proven Industrial Deployments',
      desc: 'Validated across multiple manufacturing and internal logistics use cases.'
    }
  ];

  return (
    <section className="bg-stark-white pt-20 pb-16">
      <div className="max-w-container-max mx-auto px-gutter">
        
        {/* Heading */}
        <div className="mb-16 max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#0F1B2D] font-headline-xl font-semibold leading-[1.1] tracking-tight">
            Why Manufacturers <br className="hidden md:block" />
            Choose Hitech Engineering
          </h2>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Icon */}
              <div className="mb-6">
                <span className="material-symbols-outlined text-[32px] text-[#00C2CB] font-light">
                  {feature.icon}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="text-[18px] font-bold text-[#0F1B2D] mb-3 leading-snug">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-[15px] text-[#475569] leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
