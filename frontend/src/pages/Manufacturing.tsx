import { useState } from 'react';
import { 
  Settings, Wrench, CheckCircle2, Factory, Hammer, Cpu, Search,
  FileText, Calendar, Truck, ShieldCheck, Activity, Maximize,
  AlertTriangle, TrendingUp, Users, HeadphonesIcon, Award, ArrowRight
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import CTA from '../components/CTA';
import InteractiveManufacturingProcess from '../components/InteractiveManufacturingProcess';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export default function Manufacturing() {
  const [activeProcess, setActiveProcess] = useState(0);

  const offerings = [
    {
      icon: Settings,
      title: "CNC Machining",
      desc: "High-precision machining using advanced CNC equipment to manufacture complex components with exceptional accuracy.",
      image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Cpu,
      title: "Custom Component Manufacturing",
      desc: "We produce customized engineering components according to customer drawings, specifications, and industrial requirements.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Wrench,
      title: "Assembly Services",
      desc: "Complete mechanical assembly solutions with rigorous quality inspections to ensure reliable performance.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Hammer,
      title: "Fabrication",
      desc: "Professional metal fabrication services including cutting, bending, welding, drilling, and finishing for various industrial applications.",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Search,
      title: "Quality Inspection",
      desc: "Every product undergoes detailed inspection and testing to maintain dimensional accuracy and consistent quality.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const reasons = [
    { title: "High Precision Engineering", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Modern Manufacturing Equipment", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Skilled Technical Team", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Consistent Product Quality", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "On-Time Delivery", image: "https://images.unsplash.com/photo-1580674684081-77648e789a5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Customized Manufacturing Solutions", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Competitive Pricing", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
    { title: "Strict Quality Assurance", image: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Requirement Analysis",
      desc: "Understanding customer specifications, drawings, and technical requirements.",
      details: ["Review engineering drawings", "Analyze material specifications", "Determine critical tolerances"],
      icon: FileText,
      image: "/engineer.png"
    },
    {
      step: "02",
      title: "Production Planning",
      desc: "Planning resources, materials, and manufacturing methods for maximum efficiency.",
      details: ["Procure raw materials", "Schedule machine time", "Assign skilled operators"],
      icon: Calendar,
      image: "/hero-bg.png"
    },
    {
      step: "03",
      title: "Precision Manufacturing",
      desc: "Using advanced machinery and skilled operators to manufacture high-quality components.",
      details: ["CNC machining operations", "In-process quality checks", "Surface finishing & treatments"],
      icon: Settings,
      image: "/engineer.png"
    },
    {
      step: "04",
      title: "Quality Inspection",
      desc: "Comprehensive dimensional and quality checks throughout the production process.",
      details: ["CMM measurement", "Hardness testing", "Visual inspection & documentation"],
      icon: Search,
      image: "/hero-bg.png"
    },
    {
      step: "05",
      title: "Final Delivery",
      desc: "Secure packaging and on-time delivery with complete customer satisfaction.",
      details: ["Custom protective packaging", "Logistics coordination", "Final documentation & certificates"],
      icon: Truck,
      image: "/engineer.png"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const qualityStandards = [
    { title: "Rigorous Quality Checks", desc: "Multi-stage inspections at every critical point of the manufacturing cycle to guarantee perfection.", icon: ShieldCheck },
    { title: "Precision Measurement", desc: "Advanced CMM and metrology tools ensuring micro-level tolerances and exact specifications.", icon: Maximize },
    { title: "Process Consistency", desc: "Standardized, highly controlled procedures guaranteeing uniform quality across high-volume runs.", icon: Activity },
    { title: "Defect Prevention", desc: "Proactive FMEA and robust statistical process control implemented to eliminate root causes.", icon: AlertTriangle },
    { title: "Continuous Improvement", desc: "Kaizen principles driving ongoing enhancements in operational speed, safety, and product quality.", icon: TrendingUp },
    { title: "Customer Satisfaction", desc: "Aligning all quality metrics tightly with client expectations and end-user mission-critical needs.", icon: Users },
  ];

  const excellenceStrengths = [
    { title: "Skilled Engineering Professionals", desc: "Expert engineers bringing decades of experience and technical knowledge.", icon: Users },
    { title: "Modern Manufacturing Facility", desc: "State-of-the-art infrastructure equipped with the latest machinery.", icon: Factory },
    { title: "Advanced Production Techniques", desc: "Utilizing modern methods for optimized efficiency and superior results.", icon: Cpu },
    { title: "Timely Project Execution", desc: "Streamlined workflows ensuring on-time delivery without compromising quality.", icon: Calendar },
    { title: "Reliable Customer Support", desc: "Dedicated assistance and transparent communication at every step.", icon: HeadphonesIcon },
    { title: "Flexible Manufacturing Solutions", desc: "Adaptable processes designed to meet custom specifications and varying volumes.", icon: Settings },
  ];

  return (
    <main className="pt-20 bg-[#F1F5F9] text-gray-900 selection:bg-[#051923] selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSlider 
        title="Precision Manufacturing Solutions"
        description="At HiTech Engineering, we deliver high-quality manufacturing solutions that combine advanced technology, skilled craftsmanship, and strict quality control. Our manufacturing processes are designed to produce reliable components that meet the highest industry standards. From prototype development to large-scale production, we ensure precision, consistency, and timely delivery for every project."
        videoSrc="/boomerang_production.mp4"
        buttonText="View Capabilities"
      />

      {/* 2. WHAT WE OFFER */}
      <section className="py-24 px-8 md:px-12 bg-gradient-to-b from-[#F4F9FD] to-white border-b border-gray-100 relative overflow-hidden">
        {/* Decorative background element to add a bit more color depth */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[#00A6FB] opacity-[0.02] blur-[100px] pointer-events-none rounded-full transform -translate-y-1/2"></div>
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-base md:text-lg font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Capabilities</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-2">What We Offer</h2>
            <div className="w-16 h-1 bg-[#051923] mx-auto mt-4 rounded-full"></div>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[450px] w-full"
          >
            {offerings.map((offer, idx) => (
              <motion.div 
                variants={itemVariants} 
                key={idx} 
                className="relative flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl bg-white group/card flex flex-col justify-between p-6 md:p-8 cursor-pointer shadow-lg border border-gray-200 hover:border-transparent hover:shadow-2xl hover:shadow-[#00A6FB]/20 min-h-[250px]"
              >
                {/* Background Image Layer (only visible on hover) */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 ease-in-out">
                  <img 
                    src={offer.image} 
                    alt={offer.title} 
                    className="w-full h-full object-cover scale-100 group-hover/card:scale-105 transition-transform duration-1000 ease-out" 
                  />
                  {/* Dark overlay over image so text is readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002b45]/90 via-[#051923]/70 to-[#051923]/40"></div>
                </div>

                {/* Default Light Gradient (fades out on hover) */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-100 group-hover/card:opacity-0 transition-opacity duration-700"></div>

                {/* Giant Background Icon */}
                <offer.icon 
                  className="absolute -right-6 -top-6 w-[160px] h-[160px] text-gray-200 opacity-30 group-hover/card:opacity-0 transition-all duration-700 ease-out z-0 pointer-events-none" 
                  strokeWidth={1}
                />

                {/* Top Icon */}
                <div className="relative z-10 w-14 h-14 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#051923] group-hover/card:bg-[#00A6FB] group-hover/card:border-[#00A6FB] group-hover/card:text-white group-hover/card:scale-110 transition-all duration-500 shadow-sm">
                  <offer.icon className="w-7 h-7" />
                </div>
                
                {/* Bottom Content */}
                <div className="relative z-10 mt-12 lg:mt-auto">
                  {/* Title */}
                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#051923] group-hover/card:text-white mb-2 tracking-tight uppercase whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-500 drop-shadow-sm">
                    {offer.title}
                  </h3>
                  
                  {/* Expandable Description */}
                  <div className="lg:grid lg:grid-rows-[0fr] lg:group-hover/card:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] lg:opacity-0 lg:group-hover/card:opacity-100 mt-2 lg:mt-0 lg:group-hover/card:mt-4">
                    <div className="lg:overflow-hidden">
                      <p className="text-gray-600 group-hover/card:text-gray-100 text-[14px] md:text-[15px] leading-relaxed max-w-[280px] font-medium lg:w-[280px] transition-colors duration-500">
                        {offer.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. MANUFACTURING PROCESS */}
      <InteractiveManufacturingProcess />

      {/* 4. QUALITY COMMITMENT */}
      <section className="py-24 px-8 md:px-12 bg-white relative overflow-hidden">
        {/* Abstract animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00A6FB]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00A6FB]/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left side text */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/3"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#00A6FB]/10 border border-[#00A6FB]/20 mb-6">
                <ShieldCheck className="w-5 h-5 text-[#00A6FB]" />
                <span className="text-sm font-bold text-[#00A6FB] uppercase tracking-wider">Quality First</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-6">
                Quality <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#051923]">Commitment</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-2 border-[#00A6FB]/30 pl-6">
                Quality is integrated into every stage of our manufacturing process. From raw material inspection to final product verification, we ensure that every component meets customer specifications and industry standards.
              </p>
            </motion.div>

            {/* Right side hex/grid layout */}
            <div className="w-full lg:w-2/3">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {qualityStandards.map((std, idx) => (
                  <motion.div 
                    variants={itemVariants}
                    key={idx}
                    className="group relative bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#00A6FB]/30 hover:shadow-[0_20px_40px_-15px_rgba(0,53,84,0.15)] overflow-hidden cursor-pointer min-h-[220px]"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00A6FB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#051923] group-hover:rotate-[360deg] transition-all duration-700 border border-gray-100 group-hover:border-[#051923] shrink-0">
                          <std.icon className="w-5 h-5 text-[#00A6FB] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 className="text-[17px] font-bold text-[#051923] leading-tight transition-colors duration-300">
                          {std.title}
                        </h3>
                      </div>
                      
                      <p className="text-gray-600 text-[14px] leading-relaxed transition-colors duration-300 pt-3 border-t border-gray-100 group-hover:border-gray-200 mt-auto">
                        {std.desc}
                      </p>
                    </div>
                    
                    {/* Bottom active line */}
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00A6FB] to-[#051923] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MANUFACTURING EXCELLENCE */}
      <section className="py-24 px-8 md:px-12 bg-[#051923] relative overflow-hidden text-white">
        {/* Abstract background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full pointer-events-none"></div>
        </div>
        
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 shadow-sm border border-white/10 mb-6">
              <Award className="w-5 h-5 text-[#00A6FB]" />
              <span className="text-sm font-bold text-[#00A6FB] uppercase tracking-wider">Our Strengths</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-headline-xl leading-[1.1] tracking-tight mb-6">
              Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-[#00A6FB]">Excellence</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              At HiTech Engineering, manufacturing excellence is driven by innovation, precision, and reliability. Our team continuously improves production techniques to deliver high-quality engineering solutions while maintaining efficiency and cost-effectiveness.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {excellenceStrengths.map((strength, idx) => (
              <motion.div 
                variants={itemVariants}
                key={idx}
                className="group relative bg-[#0a2738] border border-white/5 rounded-2xl p-6 hover:shadow-[0_20px_40px_-15px_rgba(0,166,251,0.2)] hover:border-[#00A6FB]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00A6FB]/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-[#0c3147] border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#051923] group-hover:border-[#051923] group-hover:scale-110 transition-all duration-500 shadow-md">
                    <strength.icon className="w-6 h-6 text-[#00A6FB] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-[17px] font-bold text-white leading-tight mb-2 group-hover:text-[#00A6FB] transition-colors duration-300">
                      {strength.title}
                    </h3>
                    <p className="text-gray-400 text-[14px] leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {strength.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-24 px-8 md:px-12 bg-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00A6FB]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#00A6FB]/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-base md:text-lg font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">The HiTech Edge</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-2">Why Choose Us</h2>
            <div className="w-16 h-1 bg-[#051923] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {reasons.map((reason, idx) => (
              <motion.div 
                variants={itemVariants} 
                key={idx} 
                className="relative group cursor-pointer h-[320px] rounded-2xl bg-[#F8FAFC] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,53,84,0.15)] border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col justify-end"
              >
                {/* Background Image Section */}
                <div className="absolute inset-0 z-0 h-[70%] overflow-hidden bg-gray-50">
                  <img 
                    src={reason.image} 
                    alt={reason.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-all duration-700 ease-in-out opacity-90 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-700"></div>
                </div>

                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 z-20 bg-gradient-to-r from-[#00A6FB] to-[#051923] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                {/* Content Section */}
                <div className="relative z-10 p-6 flex flex-col items-center text-center h-[55%] justify-end bg-gradient-to-t from-white via-white to-transparent">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center mb-4 group-hover:bg-[#051923] group-hover:border-[#051923] transition-colors duration-500 absolute top-0 -translate-y-1/2">
                    <CheckCircle2 className="w-6 h-6 text-[#00A6FB] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-bold text-[#051923] text-lg leading-snug group-hover:text-[#00A6FB] transition-colors duration-500">
                    {reason.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <CTA />
    </main>
  );
}
