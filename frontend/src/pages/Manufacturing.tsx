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
  const [activeStrength, setActiveStrength] = useState(0);

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
        <div className="absolute top-0 left-0 w-full h-[500px] bg-[#006494] opacity-[0.02] blur-[100px] pointer-events-none rounded-full transform -translate-y-1/2"></div>
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-base md:text-lg font-bold text-[#006494] uppercase tracking-[0.2em] mb-4">Capabilities</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-2">What We Offer</h2>
            <div className="w-16 h-1 bg-[#051923] mx-auto mt-4 rounded-full"></div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4 lg:gap-6 w-full"
          >
            {offerings.map((offer, idx) => {
              // Determine grid span based on index to create a beautiful Bento Box layout
              let spanClass = "";
              if (idx === 0) spanClass = "md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2"; // Large square (CNC)
              else if (idx === 1) spanClass = "md:col-span-2 lg:col-span-2 md:row-span-1"; // Wide top right
              else if (idx === 2) spanClass = "md:col-span-1 lg:col-span-1 md:row-span-1"; // Small square
              else if (idx === 3) spanClass = "md:col-span-1 lg:col-span-1 md:row-span-1"; // Small square
              else if (idx === 4) spanClass = "md:col-span-2 lg:col-span-4 md:row-span-1"; // Full width bottom

              // Description is always visible on the largest card, hidden behind a hover on smaller ones
              const alwaysShowDesc = idx === 0 || idx === 4;

              return (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className={`relative group overflow-hidden rounded-3xl bg-[#051923] cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-[#006494]/20 transition-all duration-500 border border-gray-100 ${spanClass}`}
                >
                  {/* Background Image with Zoom Effect */}
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-all duration-700 ease-out"
                  />

                  {/* Gradient Overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051923] via-[#051923]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                  {/* Hover Arrow Indicator */}
                  <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 z-20">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#006494] mb-4 group-hover:-translate-y-2 group-hover:bg-[#006494] group-hover:text-white group-hover:border-[#006494] transition-all duration-500 shadow-md">
                      <offer.icon className="w-6 h-6" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl lg:text-[26px] font-bold text-white mb-2 leading-tight group-hover:text-gray-100 transition-colors duration-300">
                      {offer.title}
                    </h3>

                    {/* Expandable Description */}
                    <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${alwaysShowDesc ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100'}`}>
                      <div className="overflow-hidden">
                        <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed pt-2 max-w-xl font-medium">
                          {offer.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. MANUFACTURING PROCESS */}
      <InteractiveManufacturingProcess />

      {/* 4. QUALITY COMMITMENT */}
      <section className="py-24 px-8 md:px-12 bg-white relative overflow-hidden">
        {/* Abstract animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#006494]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#006494]/5 blur-[120px] rounded-full pointer-events-none"></div>
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
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-6">
                Quality <br /><span className="text-[#006494]">Commitment</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-2 border-[#006494]/30 pl-6">
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
                    className="group relative bg-[#F8FAFC] border border-gray-100 rounded-2xl p-6 hover:bg-white transition-all duration-500 hover:-translate-y-2 hover:border-[#006494]/30 hover:shadow-[0_20px_40px_-15px_rgba(0,53,84,0.15)] overflow-hidden cursor-pointer min-h-[220px]"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#006494]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-[#051923] transition-all duration-700 border border-gray-100 group-hover:border-[#051923] shrink-0">
                          <std.icon className="w-5 h-5 text-[#006494] group-hover:text-white transition-colors duration-300" />
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
                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#006494] to-[#051923] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US */}
      <section className="py-24 px-8 md:px-12 bg-white relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#006494]/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#006494]/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="text-base md:text-lg font-bold text-[#006494] uppercase tracking-[0.2em] mb-4">The HiTech Edge</div>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-2">Why Choose Us</h2>
            <div className="w-16 h-1 bg-[#051923] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-16 items-start relative pb-32 mt-12">
            {/* Sticky Left Sidebar */}
            <div className="w-full lg:w-1/3 lg:sticky lg:top-32 z-20 self-start">
              <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#051923] font-headline-xl leading-[1.1] tracking-tight mb-6">Why Choose Us</h2>
              <div className="w-16 h-1 bg-[#051923] rounded-full mb-8"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                We combine decades of engineering expertise with state-of-the-art technology to deliver uncompromising quality and precision for your most demanding projects.
              </p>
              
              <div className="hidden lg:flex items-center gap-4 text-[#006494] font-bold bg-[#006494]/5 w-fit px-6 py-3 rounded-full">
                <span className="uppercase tracking-widest text-sm">Scroll to explore</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Right Side Stacking Cards */}
            <div className="w-full lg:w-2/3 relative">
              <div className="flex flex-col gap-8 md:gap-16">
                {reasons.map((reason, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    key={idx}
                    className="sticky w-full h-[280px] md:h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 border border-gray-200 group bg-[#051923]"
                    style={{ top: `${100 + idx * 25}px` }}
                  >
                    {/* Background Image */}
                    <img
                      src={reason.image}
                      alt={reason.title}
                      className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[2s] ease-out opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Dark Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051923]/95 via-[#051923]/40 to-transparent"></div>
                    
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00A6FB] to-[#006494] opacity-50"></div>

                    {/* Content Container */}
                    <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                      <div className="flex items-end gap-6 md:gap-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {/* Huge Number */}
                        <div className="text-transparent flex-shrink-0 bg-clip-text bg-gradient-to-b from-white/80 to-white/10 font-headline-xl text-6xl md:text-[80px] font-bold leading-none select-none">
                          0{idx + 1}
                        </div>
                        
                        {/* Title & Underline */}
                        <div className="pb-2 md:pb-6">
                          <h3 className="font-bold text-white text-2xl md:text-4xl leading-tight font-headline-xl mb-4 group-hover:text-[#00A6FB] transition-colors duration-300">
                            {reason.title}
                          </h3>
                          <div className="w-0 h-[3px] bg-[#00A6FB] group-hover:w-24 transition-all duration-700 ease-out"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <CTA />
    </main>
  );
}
