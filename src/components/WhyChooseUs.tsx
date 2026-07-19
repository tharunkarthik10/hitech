import { motion, type Variants } from 'framer-motion';

export default function WhyChooseUs() {
  const features = [
    {
      icon: 'precision_manufacturing',
      title: 'AI-Driven Precision',
      desc: 'Smart engineering algorithms tailored for real factory conditions and high-duty cycles.',
      image: '/images/feature-1.png'
    },
    {
      icon: 'memory',
      title: 'Intelligent Automation',
      desc: 'Machine-learning optimized layouts and payloads that adapt perfectly to your process flow.',
      image: '/images/feature-2.png'
    },
    {
      icon: 'rocket_launch',
      title: 'Future-Ready Tech',
      desc: 'Scalable robotic systems equipped with dynamic vision and predictive maintenance.',
      image: '/images/feature-3.png'
    },
    {
      icon: 'shield_locked',
      title: 'Secure & Proven',
      desc: 'Validated across multiple manufacturing and internal logistics use cases with 99.9% uptime.',
      image: '/images/feature-4.png'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      {/* Background AI Glow Effects (Light Theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-[#006494] opacity-[0.04] rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-[96%] 2xl:max-w-[1920px] mx-auto px-2 lg:px-4">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#003554] font-headline-xl font-bold leading-[1.1] tracking-tight">
            Why Manufacturers <br className="hidden md:block" />
            Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006494] to-[#006494]">Hitech Engineering</span>
          </h2>
        </motion.div>

        {/* Interactive Horizontal Accordion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[500px] w-full"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-[32px] bg-white group/card flex flex-col justify-between p-6 md:p-8 cursor-pointer shadow-lg border border-gray-200 hover:border-[#00A6FB]/30 hover:shadow-[#00A6FB]/20 min-h-[220px]"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000 ease-out" 
                />
                {/* Minimal overlay just for text readability at the bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover/card:via-black/40 transition-all duration-700"></div>
              </div>

              {/* Giant Background Icon */}
              <span 
                className="material-symbols-outlined absolute -right-6 -top-6 text-[180px] text-white opacity-[0.03] group-hover/card:text-[#00A6FB] group-hover/card:opacity-[0.1] group-hover/card:scale-110 group-hover/card:-translate-x-6 group-hover/card:translate-y-6 transition-all duration-1000 ease-out z-0 pointer-events-none select-none" 
                style={{ fontVariationSettings: "'wght' 200" }}
              >
                {feature.icon}
              </span>

              {/* Top Icon */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md group-hover/card:bg-[#00A6FB] group-hover/card:border-[#00A6FB] group-hover/card:scale-110 transition-all duration-500 shadow-sm">
                <span className="material-symbols-outlined text-[28px] font-light">
                  {feature.icon}
                </span>
              </div>
              
              {/* Bottom Content */}
              <div className="relative z-10 mt-12 lg:mt-auto">
                {/* Title */}
                <h3 className="text-[22px] md:text-[26px] font-bold text-white mb-2 tracking-wide whitespace-nowrap overflow-hidden text-ellipsis drop-shadow-md">
                  {feature.title}
                </h3>
                
                {/* Expandable Description */}
                <div className="lg:grid lg:grid-rows-[0fr] lg:group-hover/card:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:opacity-0 lg:group-hover/card:opacity-100 mt-2 lg:mt-0 lg:group-hover/card:mt-4">
                  <div className="lg:overflow-hidden">
                    <p className="text-white/70 text-[15px] md:text-[16px] leading-relaxed max-w-[320px] font-medium lg:w-[320px]">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
