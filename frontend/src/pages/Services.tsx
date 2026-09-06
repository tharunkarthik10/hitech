import { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Factory, Settings, Users, LineChart, 
  Shield, Wrench, ChevronDown, ChevronUp, FileText, Award, Cpu, 
  Compass, Hammer, ClipboardCheck, ArrowUpRight, Sparkles, PhoneCall, 
  Send, Check, Layers, Zap, Package, Search, Target, Activity, 
  Building2, Car, Plane, Stethoscope, Sliders, CheckSquare, ShieldCheck,
  Tractor, HardHat, ChevronLeft, Clock
} from 'lucide-react';

export default function Services() {
  // 04. Active Process Step State
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  // 07. Spec View State ('grid' | 'table')
  const [specView, setSpecView] = useState<'grid' | 'table'>('grid');

  // 11. Proposal Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Precision Machining',
    quantity: '100 - 1,000 units',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // 03. What We Offer Capabilities Data
  const capabilities = [
    {
      title: "Custom Manufacturing",
      desc: "Products designed & manufactured strictly to your exact CAD specifications and tolerances.",
      icon: Target,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Precision Processing",
      desc: "5-axis milling and turning delivering consistent dimensions, micron accuracy, and ultra-smooth finishes.",
      icon: Settings,
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Bulk Production",
      desc: "Scalable manufacturing optimized for large industrial production runs with zero defect tolerance.",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Quality Testing",
      desc: "Comprehensive CMM metrology, dye penetrant, and radiography inspection at every production stage.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // 04. Manufacturing Process Steps
  const processSteps = [
    { 
      step: "01", 
      name: "Requirement", 
      desc: "Detailed CAD drawing audit, specification feasibility review, and cost/ROI calculation prior to tooling.", 
      deliverable: "CAD Specification & ROI Audit Dossier",
      icon: Search,
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "02", 
      name: "Design", 
      desc: "Digital twin modeling, kinematic reach simulations, and finite element stress load (FEA) testing.", 
      deliverable: "3D CAD Model & FEA Stress Load Report",
      icon: FileText,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "03", 
      name: "Material Selection", 
      desc: "Strict sourcing of certified high-grade alloys, titanium blocks, stainless steel, and engineering polymers.", 
      deliverable: "Certified Mill Test Report (MTR)",
      icon: Layers,
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "04", 
      name: "Manufacturing", 
      desc: "5-axis CNC machining, 12kW fiber laser sheet cutting, hydraulic bending, and robotic MIG/TIG welding.", 
      deliverable: "5-Axis CNC & Fiber Laser Production Run",
      icon: Hammer,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "05", 
      name: "Quality Check", 
      desc: "100% 3D CMM metrology coordinate inspection, dye penetrant weld testing, and surface finish validation.", 
      deliverable: "100% 3D CMM Metrology Certificate",
      icon: CheckSquare,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop"
    },
    { 
      step: "06", 
      name: "Delivery", 
      desc: "ESD-safe protective packaging, scheduled factory logistics, and Factory Acceptance Test (FAT) sign-off.", 
      deliverable: "FAT Sign-Off & Scheduled Factory Delivery",
      icon: Package,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  // 05. Industries We Serve
  const industries = [
    { title: "Construction", desc: "Heavy-duty structural components, plate fabrications, and hydraulic beams.", icon: HardHat, image: "https://images.unsplash.com/photo-1541888081622-19e34ff614e8?auto=format&fit=crop&q=80&w=800" },
    { title: "Electrical", desc: "Custom copper busbars, electrical enclosures, and high-temp insulating housings.", icon: Zap, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
    { title: "Automotive", desc: "Robotic welding line fixtures, engine mounts, and high-strength chassis parts.", icon: Car, image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800" },
    { title: "Agriculture", desc: "Durable tractor machinery parts, heavy shafts, and wear-resistant implements.", icon: Tractor, image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800" },
    { title: "Infrastructure", desc: "Bridge structural brackets, heavy load-bearing assemblies, and power grid parts.", icon: Building2, image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800" },
    { title: "Industrial Manufacturing", desc: "Turnkey SPM machines, conveyor feed assemblies, and automated line cells.", icon: Factory, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" }
  ];

  // 06. Why Choose Us Differentiators (With Dedicated Custom Icons, Stats & Images)
  const advantages = [
    { 
      num: "01", 
      title: "Advanced Manufacturing Capabilities", 
      desc: "5-axis continuous CNC milling, 12kW fiber laser profiling, and robotic MIG/TIG welding cells.",
      icon: Cpu,
      stat: "12kW Laser & 5-Axis",
      badge: "High-Tech Fleet",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop",
      bullets: ["5-Axis CNC Milling", "12kW Fiber Profiling", "Robotic MIG/TIG Cells"]
    },
    { 
      num: "02", 
      title: "Consistent Quality", 
      desc: "Micron-level positioning accuracy (±0.005mm) verified by 3D CMM coordinate metrology.",
      icon: ShieldCheck,
      stat: "±0.005mm Metrology",
      badge: "3D CMM Verified",
      featured: true,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
      bullets: ["±0.005mm Accuracy", "Dye Penetrant NDT", "100% CMM Verified"]
    },
    { 
      num: "03", 
      title: "Custom Engineering Solutions", 
      desc: "Tailored component prototyping and digital twin simulation built around your unique CAD drawings.",
      icon: Target,
      stat: "CAD Digital Twin",
      badge: "Turnkey Design",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop",
      bullets: ["CAD File Parsing", "Kinematic FEA Stress", "Custom Prototyping"]
    },
    { 
      num: "04", 
      title: "High-Volume Production", 
      desc: "Scalable automated manufacturing capable of producing 50,000+ defect-free units per month.",
      icon: Factory,
      stat: "50,000+ Units/Mo",
      badge: "Zero-Defect Rate",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      bullets: ["Automated Cells", "Kanban Logistics", "Zero-Defect Standard"]
    },
    { 
      num: "05", 
      title: "Experienced Engineering Team", 
      desc: "20+ years of kinetic engineering, control panel wiring, and line automation expertise.",
      icon: Users,
      stat: "20+ Yrs Expertise",
      badge: "Certified Team",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop",
      bullets: ["Kinetic Engineering", "Panel Wiring & PLC", "Dedicated Support"]
    },
    { 
      num: "06", 
      title: "Reliable On-Time Delivery", 
      desc: "Structured project timelines, complete FAT sign-off, and guaranteed factory delivery windows.",
      icon: Clock,
      stat: "99.9% On-Time",
      badge: "FAT Sign-Off",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      bullets: ["Strict Timelines", "FAT Inspection", "Guaranteed Delivery"]
    }
  ];

  // 07. Technical Specifications Table
  const specificationsTable = [
    { param: "Materials Supported", details: "Stainless Steel (304, 316, 410, 17-4PH), Titanium Grade 5, Aluminum (6061, 7075), Mild Steel, Brass, Copper, Delrin, PEEK" },
    { param: "Machining Tolerances", details: "Positioning Accuracy ± 0.005 mm (Verified by 3D CMM Metrology)" },
    { param: "CNC Spindle Speed & Axes", details: "Up to 20,000 RPM (3-Axis, 4-Axis, and continuous 5-Axis milling/turning)" },
    { param: "Laser Cutting Capacity", details: "12kW Fiber Laser cutting up to 25mm Mild Steel / 16mm Stainless Steel" },
    { param: "Bending Capacity", details: "220-Ton CNC Hydraulic Press Brake with Multi-V precision dies" },
    { param: "Welding Standards", details: "AWS D1.1 Structural Welding & ISO 3834 Compliant Robotic MIG/TIG Cells" },
    { param: "Quality Standards & Certs", details: "ISO 9001:2015 Registered, CE Conformity, UL Panel Shop, Mill Test Reports (MTRs)" }
  ];

  // 08. Applications & Projects
  const projects = [
    {
      title: "Industrial Electrical Components",
      application: "High-Temperature Electrical Systems",
      desc: "Custom ceramic and copper components manufactured for high-temperature electrical applications requiring IP-rated safety.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Automotive Assembly Line Optimization",
      application: "Robotic Assembly Lines",
      desc: "Redesigned pneumatic feed loops and integrated 3 KUKA robotic welding cells, dropping assembly cycle time from 84s to 46s.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Titanium Structural Flight Components",
      application: "Aerospace Structural Parts",
      desc: "Machined flight-critical titanium brackets on 5-axis CNC equipment, achieving 100% radiography NDT pass rate.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <main className="bg-white text-gray-900 selection:bg-[#051923] selection:text-white font-body overflow-x-clip">

      {/* ========================================================================= */}
      {/* 01. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full h-[85vh] min-h-[640px] flex items-center overflow-hidden">
        {/* Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/hero_boomerang.mp4" type="video/mp4" />
        </video>
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35 z-10" />

        <div className="relative z-20 w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mt-16">
          <div className="max-w-3xl text-left text-white space-y-5">
            
            {/* Service Name */}
            <span className="inline-block text-xs md:text-sm font-bold tracking-[0.25em] text-[#00A6FB] uppercase">
              PRECISION INDUSTRIAL SERVICES
            </span>

            <h1 className="font-heading text-[36px] md:text-[52px] leading-tight text-white uppercase tracking-wide font-bold">
              Precision Engineering &amp; <br />
              <span className="text-[#00A6FB]">Line Automation</span>
            </h1>

            {/* Accent Line */}
            <div className="flex items-center gap-2">
              <div className="w-16 h-1 bg-[#00A6FB] rounded-full" />
              <div className="w-4 h-1 bg-[#00A6FB] rounded-full opacity-75" />
              <div className="w-1.5 h-1.5 bg-[#00A6FB] rounded-full opacity-50" />
            </div>

            {/* Value Proposition & 1-2 Line Description */}
            <p className="font-body-lg text-base md:text-[19px] leading-relaxed text-gray-200 font-light">
              High-quality engineering &amp; manufacturing solutions engineered for demanding industrial applications. We combine 5-axis CNC machining, 12kW fiber laser cutting, and 24/7 predictive IoT monitoring.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href="#quote-form"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#00A6FB] text-white font-body-md font-semibold text-[15px] uppercase tracking-wide hover:bg-white hover:text-[#051923] transition-all duration-300 shadow-lg"
              >
                <span>Get a Quote</span>
                <span className="material-symbols-outlined text-[18px] font-bold">north_east</span>
              </a>

              <a 
                href="tel:+914222648800"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/80 text-white font-body-md font-semibold text-[15px] uppercase tracking-wide hover:bg-white hover:text-[#051923] transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4 text-[#00A6FB]" />
                <span>Talk to Our Team</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02. SERVICE OVERVIEW */}
      {/* ========================================================================= */}
      <section className="bg-stark-white relative py-12 md:py-16 border-b border-gray-100">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="relative w-full bg-[#051923] rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl border border-white/10 text-white">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              
              <div className="flex-1 space-y-4">
                <span className="text-xs font-bold text-[#00A6FB] uppercase tracking-[0.2em]">02 — SERVICE OVERVIEW</span>
                <h2 className="font-heading text-2xl md:text-4xl font-bold uppercase tracking-tight leading-tight">
                  Integrated Precision Engineering &amp; Automated Systems
                </h2>
                
                <div className="space-y-3 text-gray-300 text-sm md:text-base leading-relaxed font-light">
                  <p>
                    HiTech Engineering’s service ecosystem provides custom precision manufacturing, 12kW fiber laser cutting, 5-axis CNC machining, and automated line integration for B2B industrial leaders and tier-1 suppliers.
                  </p>
                  <p>
                    We combine heavy mechanical custom tooling, electronic pneumatic controls, and 24/7 predictive IoT sensor monitoring under one unified plant roof — guaranteeing complete structural integrity, rapid turnaround, and zero unplanned downtime.
                  </p>
                </div>
              </div>

              <div className="lg:w-80 shrink-0 bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">QUALITY STANDARD</span>
                  <span className="text-[#00A6FB] font-bold">ISO 9001:2015</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">TOLERANCE PASSED</span>
                  <span className="text-white font-bold">±0.005 mm</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">CNC AXES</span>
                  <span className="text-white font-bold">5-AXIS CONT.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LINE UPTIME</span>
                  <span className="text-emerald-400 font-bold">99.9%</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03. WHAT WE OFFER */}
      {/* ========================================================================= */}
      <section className="relative bg-stark-white py-12 md:py-16 overflow-hidden border-t border-gray-100">
        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-4">
            <div className="space-y-2 max-w-3xl">
              <span className="text-xs font-bold text-[#006494] uppercase tracking-[0.2em]">03 — WHAT WE OFFER</span>
              <h2 className="font-headline-xl text-[30px] md:text-[42px] text-[#051923] uppercase tracking-wide font-bold leading-tight">
                OUR INDIVIDUAL CAPABILITIES<span className="text-[#00A6FB]">.</span>
              </h2>
              <p className="font-body-md text-[15px] text-gray-600 italic">
                Showcasing individual manufacturing capabilities built for industrial scale.
              </p>
            </div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[480px] w-full"
          >
            {capabilities.map((cap, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="relative flex-1 lg:hover:flex-[2.4] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-2xl bg-white group/card flex flex-col justify-between p-6 md:p-8 cursor-pointer shadow-lg border border-gray-200 hover:border-[#00A6FB]/40 hover:shadow-[#00A6FB]/20 min-h-[260px]"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={cap.image} 
                    alt={cap.title} 
                    className="w-full h-full object-cover opacity-90 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-1000 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover/card:via-black/60 transition-all duration-700" />
                </div>

                <div className="relative z-10 flex justify-between items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover/card:bg-[#00A6FB] group-hover/card:border-[#00A6FB] group-hover/card:scale-110 transition-all duration-500 shadow-md">
                    <cap.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider border border-white/10">
                    CAPABILITY 0{idx + 1}
                  </span>
                </div>
                
                <div className="relative z-10 mt-8 lg:mt-auto space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold font-heading uppercase text-white tracking-tight leading-snug drop-shadow-md">
                    {cap.title}
                  </h3>
                  
                  <p className="text-white/90 text-sm md:text-[15px] leading-relaxed font-normal max-w-[340px] drop-shadow-sm">
                    {cap.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04. MANUFACTURING PROCESS */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-16 bg-slate-50/80 border-t border-b border-gray-200">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#006494] uppercase tracking-[0.25em]">04 — OUR METHODOLOGY</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#051923] uppercase tracking-tight">
              Manufacturing Process Pipeline
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-normal">
              Select any stage below to inspect production protocols, deliverables, and engineering standards.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
            {processSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveProcessStep(idx)}
                className={`p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between group ${
                  activeProcessStep === idx
                    ? 'bg-[#00A6FB] text-white border-[#00A6FB] shadow-md shadow-[#00A6FB]/20 scale-[1.02]'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-[#00A6FB] hover:bg-sky-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-heading text-xl font-bold ${activeProcessStep === idx ? 'text-white' : 'text-[#006494]'}`}>
                    {step.step}
                  </span>
                  <step.icon className={`w-4 h-4 ${activeProcessStep === idx ? 'text-white' : 'text-gray-400'}`} />
                </div>
                
                <div className="font-heading font-bold text-xs uppercase tracking-tight truncate">
                  {step.name}
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProcessStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-gray-200 p-6 md:p-10 shadow-xl grid lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-sky-50 text-[#006494] text-xs font-bold uppercase tracking-wider border border-sky-100">
                    STAGE {processSteps[activeProcessStep].step} OF 06
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveProcessStep((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#051923] hover:text-white transition-colors"
                      title="Previous Stage"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveProcessStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#051923] hover:text-white transition-colors"
                      title="Next Stage"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-bold font-heading uppercase text-[#051923] tracking-tight">
                  {processSteps[activeProcessStep].name}
                </h3>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                  {processSteps[activeProcessStep].desc}
                </p>

                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs md:text-sm">
                  <span className="text-gray-500 font-semibold uppercase tracking-wider">STAGE DELIVERABLE:</span>
                  <span className="text-[#006494] font-bold">{processSteps[activeProcessStep].deliverable}</span>
                </div>
              </div>

              <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden border border-gray-200 shadow-md relative bg-black">
                <img 
                  src={processSteps[activeProcessStep].image} 
                  alt={processSteps[activeProcessStep].name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-white text-xs font-mono font-semibold tracking-wider">
                    ISO 9001:2015 QUALITY PROTOCOL VERIFIED
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05. INDUSTRIES WE SERVE */}
      {/* ========================================================================= */}
      <section className="bg-white py-12 md:py-16 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#006494] uppercase tracking-[0.2em]">05 — SECTORS</span>
              <h2 className="text-[28px] md:text-[40px] font-bold text-[#051923] tracking-tight leading-tight mb-2 uppercase">
                Industries We Serve<span className="text-[#00A6FB]">.</span>
              </h2>
              <p className="text-[15px] md:text-[16px] text-gray-600 font-light leading-relaxed">
                Our precision components and automation lines power critical applications across major global industries.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#00A6FB] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-black">
                    <img 
                      src={ind.image} 
                      alt={ind.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 md:p-6 space-y-2.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white text-[#051923] flex items-center justify-center border border-gray-200 group-hover:bg-[#051923] group-hover:text-[#00A6FB] transition-colors">
                        <ind.icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold font-heading text-[#051923] uppercase tracking-tight">{ind.title}</h3>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{ind.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06. WHY CHOOSE US (CREATIVE HIGH-TECH ADVANTAGES SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-b from-slate-50 via-sky-50/30 to-slate-50 py-16 md:py-24 overflow-hidden border-t border-b border-gray-200">
        
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00A6FB]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#006494]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          {/* Header */}
          <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00A6FB]/10 text-[#006494] text-xs font-bold uppercase tracking-[0.2em] border border-[#00A6FB]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#00A6FB]" />
              <span>06 — WHY CHOOSE US</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl text-[#051923] font-headline-xl font-bold leading-tight tracking-tight uppercase">
              Measurable Advantages of <span className="text-[#006494]">HiTech Engineering</span>
            </h2>

            <p className="text-gray-600 text-sm md:text-base font-normal max-w-2xl mx-auto">
              Industrial-grade capabilities engineered for extreme tolerances, high-duty cycles, and guaranteed operational performance.
            </p>
          </div>

          {/* Dynamic Horizontal Split Bento Cards Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid lg:grid-cols-2 gap-6 md:gap-8"
          >
            {advantages.map((adv, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`group relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-500 flex flex-col sm:flex-row gap-6 overflow-hidden shadow-sm hover:shadow-2xl ${
                  adv.featured 
                    ? 'border-[#00A6FB] ring-2 ring-[#00A6FB]/20 shadow-lg shadow-[#00A6FB]/10' 
                    : 'border-gray-200 hover:border-[#00A6FB]/60'
                }`}
              >
                {/* Full Background Image Overlay on Hover (Bright White Overlay) */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl overflow-hidden">
                  <img src={adv.image} alt={adv.title} className="w-full h-full object-cover opacity-20 scale-105 group-hover:scale-100 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70" />
                </div>

                {/* Left Column: Permanent Image Thumbnail & Icon Stage */}
                <div className="relative z-10 w-full sm:w-44 h-48 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-slate-900 border border-gray-200 group-hover:border-[#00A6FB]/40 transition-colors flex flex-col justify-between p-4">
                  <img src={adv.image} alt={adv.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  
                  {/* Icon Container */}
                  <div className="relative z-10 w-11 h-11 rounded-xl bg-white/90 group-hover:bg-[#00A6FB] text-[#051923] group-hover:text-white flex items-center justify-center shadow-md backdrop-blur-md transition-all duration-300">
                    <adv.icon className="w-5 h-5" />
                  </div>

                  {/* Number & Advantage Label */}
                  <div className="relative z-10 flex items-center justify-between text-white">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-white/75">ADVANTAGE</span>
                    <span className="font-heading font-black text-2xl text-white">{adv.num}</span>
                  </div>
                </div>

                {/* Right Column: Title, Badges & Highlights */}
                <div className="relative z-10 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Top Badges (No Clipping) */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#006494] transition-colors flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00A6FB] animate-pulse" />
                      {adv.badge}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-sky-50 text-[#006494] text-xs font-bold border border-sky-100 group-hover:bg-[#00A6FB] group-hover:text-white group-hover:border-[#00A6FB] transition-all duration-300 shadow-sm whitespace-nowrap">
                      {adv.stat}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg md:text-xl text-[#051923] group-hover:text-[#006494] uppercase tracking-tight leading-snug transition-colors">
                      {adv.title}
                    </h3>

                    <p className="text-gray-600 group-hover:text-gray-900 text-xs md:text-sm leading-relaxed font-normal transition-colors">
                      {adv.desc}
                    </p>
                  </div>

                  {/* Bullet Chips & Arrow */}
                  <div className="pt-3 border-t border-gray-100 group-hover:border-sky-100 space-y-3 transition-colors">
                    <div className="flex flex-wrap gap-1.5">
                      {adv.bullets.map((b, bIdx) => (
                        <span key={bIdx} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-gray-700 group-hover:bg-sky-100/70 group-hover:text-[#006494] text-[11px] font-medium transition-colors">
                          <CheckCircle2 className="w-3 h-3 text-[#00A6FB]" />
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400 group-hover:text-[#00A6FB] pt-0.5">
                      <span>EXPLORE CAPABILITY</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 07. TECHNICAL SPECIFICATIONS (MINIMALIST ELEGANT SHEET) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white border-t border-b border-gray-100">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          {/* Minimal Header */}
          <div className="mb-14 text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#006494] uppercase tracking-[0.25em]">07 — SPECIFICATIONS</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-[#051923] uppercase tracking-tight">
              Technical Specifications
            </h2>
            <p className="text-gray-500 text-sm md:text-base font-light">
              Equipment capabilities, positioning tolerances, material matrices, and certified quality standards.
            </p>
          </div>

          {/* Clean Minimal Matrix List */}
          <div className="max-w-5xl mx-auto border-t border-b border-gray-200 divide-y divide-gray-100">
            {specificationsTable.map((row, idx) => (
              <div 
                key={idx} 
                className="py-6 md:py-7 grid md:grid-cols-12 gap-4 md:gap-8 items-start hover:bg-slate-50/70 transition-colors duration-200 px-4 md:px-6 rounded-xl group"
              >
                <div className="md:col-span-4 font-heading font-bold text-sm md:text-base text-[#051923] uppercase tracking-wide group-hover:text-[#006494] transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] opacity-0 group-hover:opacity-100 transition-opacity" />
                  {row.param}
                </div>
                
                <div className="md:col-span-8 text-xs md:text-sm text-gray-700 font-medium leading-relaxed">
                  {row.details}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 08. APPLICATIONS & PROJECTS */}
      {/* ========================================================================= */}
      <section className="py-12 md:py-16 bg-[#F8FAFC] border-b border-gray-200">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#006494] uppercase tracking-[0.2em]">08 — APPLICATIONS</span>
            <h2 className="text-2xl md:text-4xl font-bold font-heading text-[#051923] uppercase tracking-tight">
              Real-World Applications &amp; Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-black">
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-[#051923] text-white text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full">
                      {proj.application}
                    </span>
                  </div>

                  <div className="p-5 md:p-6 space-y-2.5">
                    <h3 className="text-xl font-bold font-heading text-[#051923] uppercase tracking-tight">
                      {proj.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 md:p-6 pt-0">
                  <a href="#quote-form" className="inline-flex items-center gap-2 text-xs font-bold text-[#006494] uppercase tracking-wider pt-3 border-t border-gray-100 w-full justify-between">
                    <span>Inquire Project Scope</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. CONVERSION CTA & PROPOSAL FORM */}
      {/* ========================================================================= */}
      <section id="quote-form" className="py-16 md:py-20 bg-[#051923] text-white relative overflow-hidden border-t border-white/10">
        
        {/* Background Dotted Map */}
        <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none opacity-[0.25]">
          <div 
            className="w-full h-full max-w-[1200px] scale-[1.2] md:scale-100"
            style={{
              maskImage: 'url("/world-map.svg")',
              maskSize: 'contain',
              maskRepeat: 'no-repeat',
              maskPosition: 'right center',
              WebkitMaskImage: 'url("/world-map.svg")',
              WebkitMaskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              WebkitMaskPosition: 'right center',
              backgroundImage: 'radial-gradient(circle, #00A6FB 1px, transparent 1.5px)',
              backgroundSize: '10px 10px'
            }}
          />
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold text-[#00A6FB] uppercase tracking-[0.2em]">11 — GET STARTED</span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading uppercase tracking-tight leading-tight">
                Have a requirement? <br />
                <span className="text-[#00A6FB]">Let's build it.</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
                Tell us what you need and our engineering team will help you find the exact solution.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3.5 text-gray-300">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#00A6FB]">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Direct Line</div>
                    <div className="text-base font-bold text-white">+91 (0422) 264-8800</div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 text-gray-300">
                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#00A6FB]">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase">Proposal Email</div>
                    <div className="text-base font-bold text-white">services@hitechengineering.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-10 rounded-2xl">
              {isSubmitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading uppercase text-white">Requirement Submitted!</h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto">
                    Thank you, {quoteForm.name}. Our lead application engineer will review your project details and respond within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-[#00A6FB] text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-[#051923] transition-colors"
                  >
                    Submit Another Requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                        placeholder="John Doe"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A6FB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">Corporate Email *</label>
                      <input 
                        type="email" 
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                        placeholder="john@company.com"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A6FB]"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">Capability Target</label>
                      <select
                        value={quoteForm.service}
                        onChange={(e) => setQuoteForm({...quoteForm, service: e.target.value})}
                        className="w-full bg-[#051923] border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A6FB]"
                      >
                        <option value="Precision Machining">Custom Manufacturing &amp; 5-Axis CNC</option>
                        <option value="Fiber Laser Cutting">12kW Fiber Laser Cutting</option>
                        <option value="Line Automation">Robotic Line Automation</option>
                        <option value="Process Optimization">Process Optimization</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">Estimated Quantity</label>
                      <select
                        value={quoteForm.quantity}
                        onChange={(e) => setQuoteForm({...quoteForm, quantity: e.target.value})}
                        className="w-full bg-[#051923] border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00A6FB]"
                      >
                        <option value="Prototype / Sample">Prototype Run (1 - 50 units)</option>
                        <option value="100 - 1,000 units">Medium Batch (100 - 1,000 units)</option>
                        <option value="1,000+ units">High Volume (1,000+ units / month)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1.5">Requirement Details &amp; CAD Specs</label>
                    <textarea 
                      rows={3}
                      value={quoteForm.details}
                      onChange={(e) => setQuoteForm({...quoteForm, details: e.target.value})}
                      placeholder="Workpiece dimensions, material grades, tolerance specs, or target lead time..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 text-white text-sm focus:outline-none focus:border-[#00A6FB]"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-1">
                    <button 
                      type="submit" 
                      className="flex-1 py-3.5 bg-[#00A6FB] text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-white hover:text-[#051923] transition-all duration-300 shadow-lg"
                    >
                      Request a Quote
                    </button>
                    <a
                      href="tel:+914222648800"
                      className="inline-flex items-center justify-center px-8 py-3.5 border border-white/40 text-white font-bold rounded-xl uppercase tracking-widest text-xs hover:bg-white hover:text-[#051923] transition-colors"
                    >
                      Contact Us
                    </a>
                  </div>

                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
