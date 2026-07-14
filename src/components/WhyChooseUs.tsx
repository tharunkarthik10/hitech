import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const features = [
    {
      icon: 'precision_manufacturing',
      title: 'AI-Driven Precision',
      desc: 'Smart engineering algorithms tailored for real factory conditions and high-duty cycles.'
    },
    {
      icon: 'memory',
      title: 'Intelligent Automation',
      desc: 'Machine-learning optimized layouts and payloads that adapt perfectly to your process flow.'
    },
    {
      icon: 'rocket_launch',
      title: 'Future-Ready Tech',
      desc: 'Scalable robotic systems equipped with dynamic vision and predictive maintenance.'
    },
    {
      icon: 'shield_locked',
      title: 'Secure & Proven',
      desc: 'Validated across multiple manufacturing and internal logistics use cases with 99.9% uptime.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative bg-slate-50 py-24 overflow-hidden">
      {/* Background AI Glow Effects (Light Theme) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-[#1E3A8A] opacity-[0.04] rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-container-max mx-auto px-gutter">
        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[56px] text-[#0F1B2D] font-headline-xl font-bold leading-[1.1] tracking-tight">
            Why Manufacturers <br className="hidden md:block" />
            Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#1E3A8A]">Hitech AI</span>
          </h2>
        </motion.div>

        {/* 4-Column Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group relative p-[1.5px] rounded-[24px] bg-gradient-to-b from-gray-200 to-gray-50 hover:from-[#1E3A8A]/50 transition-all duration-700 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#1E3A8A]/10"
            >
              {/* Card Content Area */}
              <div className="relative bg-white rounded-[23px] h-full p-8 md:p-10 flex flex-col items-start z-10">
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1E3A8A]/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out"></div>
                
                {/* Icon Wrapper */}
                <div className="mb-8 p-4 rounded-2xl bg-[#f0f4fa] border border-[#1E3A8A]/10 text-[#1E3A8A] group-hover:scale-110 group-hover:bg-[#1E3A8A]/10 transition-all duration-500">
                  <span className="material-symbols-outlined text-[32px] md:text-[40px] leading-none" style={{ fontVariationSettings: "'wght' 200" }}>
                    {feature.icon}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-[20px] font-bold text-[#0F1B2D] mb-4 leading-snug group-hover:text-[#1E3A8A] transition-colors duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-[15px] text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
