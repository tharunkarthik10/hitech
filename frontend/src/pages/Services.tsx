import { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Factory, Settings, Users, LineChart, 
  Shield, Wrench, ChevronDown, ChevronUp, FileText, Award, Cpu, 
  Compass, Hammer, ClipboardCheck, ArrowUpRight, Sparkles, PhoneCall, 
  Layers, Zap, Package, Search, Target, Activity, 
  Building2, Car, Plane, Stethoscope, Sliders, CheckSquare, ShieldCheck,
  Tractor, HardHat, ChevronLeft, Clock
} from 'lucide-react';
import LaserCuttingVideoCard from '../components/LaserCuttingVideoCard';

export default function Services() {
  // 04. Active Process Step State
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  // 06. Active Advantage Pillar State
  const [activeAdvantage, setActiveAdvantage] = useState(0);


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

  // 06. Why Industry Leaders Choose HiTech (Interactive Feature Showcase Data)
  const advantagePillars = [
    { 
      id: "01",
      category: "Fleet Capability",
      title: "Advanced Manufacturing Fleet",
      shortBadge: "12kW Laser & 5-Axis",
      headline: "5-Axis CNC & 12kW Laser Fleet",
      desc: "Sub-micron milling and high-speed fiber cutting up to 32mm structural steel.",
      icon: Cpu,
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop",
      badge: "High-Tech Fleet",
      stat: "12kW Laser & 5-Axis",
      metrics: [
        { label: "Laser Power", value: "12,000 W" },
        { label: "Continuous Axes", value: "5-Axis CNC" },
        { label: "Repeatability", value: "±0.005 mm" },
        { label: "Max Work Area", value: "3,000 × 1,500 mm" }
      ],
      bullets: [
        "Continuous 5-axis high-speed simultaneous contour milling",
        "12kW fiber laser with clean nitrogen cutting edge for dross-free finishes",
        "Multi-head robotic MIG/TIG welding workstations for heavy fabrication"
      ]
    },
    { 
      id: "02",
      category: "Metrology & QA",
      title: "Consistent Micron Quality",
      shortBadge: "±0.005mm Metrology",
      headline: "3D CMM Metrology & Certified NDT",
      desc: "Climate-regulated coordinate inspection with certified digital reporting.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
      badge: "Zero-Defect QA",
      stat: "±0.005mm Metrology",
      metrics: [
        { label: "Metrology Accuracy", value: "±0.005 mm" },
        { label: "Inspection System", value: "3D Laser CMM" },
        { label: "Surface Roughness", value: "Ra < 0.2 µm" },
        { label: "Standard", value: "ISO 9001:2015" }
      ],
      bullets: [
        "100% full-dimension CMM digital inspection reports with every batch",
        "Certified dye penetrant & ultrasonic NDT non-destructive testing",
        "Complete raw material mill test report (MTR) heat number traceability"
      ]
    },
    { 
      id: "03",
      category: "Scale & Throughput",
      title: "High-Volume Production",
      shortBadge: "50,000+ Units/Mo",
      headline: "High-Volume Automated Production",
      desc: "Multi-shift automated manufacturing cells delivering at scale with zero backlog.",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
      badge: "High Throughput",
      stat: "50,000+ Units/Mo",
      metrics: [
        { label: "Monthly Output", value: "50,000+ Parts" },
        { label: "Defect PPM", value: "< 50 PPM" },
        { label: "Shift Schedule", value: "24/7 Operations" },
        { label: "Logistics Model", value: "Kanban / JIT" }
      ],
      bullets: [
        "Automated robotic pick-and-place & conveyor indexing cells",
        "Tier-1 automotive supplier qualification protocols and audits",
        "Buffer warehouse staging for immediate emergency stock calls"
      ]
    },
    { 
      id: "04",
      category: "Turnkey Project Delivery",
      title: "Turnkey Design & Delivery",
      shortBadge: "99.9% On-Time & FAT",
      headline: "Digital Twin, FEA & FAT Sign-Off",
      desc: "Full 3D CAD simulation, stress testing, and factory acceptance verification.",
      icon: Clock,
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=1200&auto=format&fit=crop",
      badge: "Turnkey Delivery",
      stat: "99.9% On-Time",
      metrics: [
        { label: "On-Time Dispatch", value: "99.9% Record" },
        { label: "Stress Testing", value: "Kinematic FEA" },
        { label: "Validation", value: "100% FAT Protocol" },
        { label: "Accountability", value: "Dedicated Lead" }
      ],
      bullets: [
        "Complete CAD digital twin & kinematic reach modeling before tooling",
        "Pre-shipment Factory Acceptance Testing (FAT) under full operational load",
        "Turnkey on-site installation, commissioning, and continuous support"
      ]
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
      {/* ========================================================================= */}
      {/* 02. SERVICE OVERVIEW */}
      {/* ========================================================================= */}
      <section className="bg-stark-white relative py-12 md:py-16 border-b border-gray-100">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          
          <div className="relative w-full bg-[#051923] rounded-3xl p-8 md:p-12 lg:p-14 shadow-2xl border border-white/10 text-white overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00A6FB]/10 rounded-full blur-3xl pointer-events-none -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#006494]/10 rounded-full blur-3xl pointer-events-none -ml-36 -mb-36" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-14 items-center justify-between">
              
              {/* Left Column: Heading & Value Proposition */}
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#00A6FB]/15 border border-[#00A6FB]/30 text-[#00A6FB] text-xs font-semibold tracking-wider uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB]" />
                  <span>Service Overview</span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-[1.2]">
                  Integrated Precision Engineering &amp; <br className="hidden sm:inline" />
                  <span className="text-[#00A6FB]">Automated Systems</span>
                </h2>
                
                <div className="space-y-4 text-gray-300 text-sm md:text-base leading-relaxed font-light max-w-2xl">
                  <p>
                    HiTech Engineering’s service ecosystem provides custom precision manufacturing, 12kW fiber laser cutting, 5-axis CNC machining, and automated line integration for industrial leaders and tier-1 suppliers worldwide.
                  </p>
                  <p>
                    We combine heavy mechanical custom tooling, electronic pneumatic controls, and 24/7 predictive IoT sensor monitoring under one unified plant roof — guaranteeing complete structural integrity, rapid turnaround, and zero unplanned downtime.
                  </p>
                </div>

                {/* Trust & Capability Badges */}
                <div className="pt-2 flex flex-wrap gap-y-2.5 gap-x-6 text-xs sm:text-sm text-gray-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6FB] flex-shrink-0" />
                    <span>Turnkey Single-Roof Facility</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6FB] flex-shrink-0" />
                    <span>Prototypes to High-Volume Runs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6FB] flex-shrink-0" />
                    <span>100% CMM Metrology Traceable</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Definition Bright Laser Cutting Animation Video */}
              <LaserCuttingVideoCard />

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
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-wider">
                What We Offer
              </div>
              <h2 className="font-headline-xl text-[28px] sm:text-[34px] md:text-[42px] text-[#051923] uppercase tracking-wide font-bold leading-tight">
                Our Individual Capabilities<span className="text-[#00A6FB]">.</span>
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
          
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-wider">
              Our Methodology
            </div>
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
                  <span className="text-white text-xs font-semibold tracking-wider">
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
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#006494]/10 text-[#006494] border border-[#006494]/20 text-xs font-bold uppercase tracking-wider">
                Industries Served
              </div>
              <h2 className="text-[28px] md:text-[40px] font-bold text-[#051923] tracking-tight leading-tight uppercase">
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
      {/* 06. WHY INDUSTRY LEADERS CHOOSE HITECH (INTERACTIVE FEATURE SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-t border-b border-gray-200/70">
        
        {/* Subtle Background Ambient Accents */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00A6FB]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#006494]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-10 text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#006494]/10 text-[#006494] text-xs font-bold uppercase tracking-widest border border-[#006494]/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00A6FB]" />
              <span>Why Choose HiTech</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#051923] font-headline-xl font-bold leading-tight tracking-tight uppercase">
              Measurable Advantages of <span className="text-[#006494]">HiTech Engineering</span>
              <span className="text-[#00A6FB]">.</span>
            </h2>

            <p className="text-gray-600 text-sm md:text-base font-normal leading-relaxed max-w-2xl mx-auto">
              Engineered for extreme tolerances and guaranteed operational performance.
            </p>
          </div>

          {/* Asymmetric 4-Card Bento Grid Forming a Wide Rectangle */}
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-5 md:h-[580px]">
              {/* Card 1: Left Column (5 cols x 2 rows - Large Tall Anchor) - Flagship Machine Fleet */}
              <div 
                className="md:col-span-5 md:row-span-2 group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#00A6FB] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between p-5 sm:p-6 text-[#051923] cursor-pointer min-h-[340px] md:min-h-0"
              >
                {/* Full-Bleed Clear Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={advantagePillars[0].image}
                    alt={advantagePillars[0].title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A6FB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Row */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/40 shadow-sm text-[11px] font-bold text-[#006494] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#00A6FB] animate-pulse" />
                    <span>{advantagePillars[0].category}</span>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#00A6FB] text-white text-xs font-bold shadow-md shadow-[#00A6FB]/25">
                    {advantagePillars[0].stat}
                  </span>
                </div>

                {/* Minimalist Floating White Dock for Maximum Visibility */}
                <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl py-2.5 px-4 sm:py-3 sm:px-4.5 border border-slate-200/80 shadow-md group-hover:border-[#00A6FB]/60 transition-all duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold font-heading text-[#051923] tracking-tight leading-snug">
                        {advantagePillars[0].headline}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#006494] font-semibold mt-0.5 flex items-center gap-1.5">
                        <span>12,000 W • ±0.005 mm Repeatability</span>
                      </p>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#006494] group-hover:bg-[#00A6FB] group-hover:text-white transition-all flex-shrink-0 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Top-Right (7 cols x 1 row - Wide Panoramic Banner) - Metrology & QA */}
              <div 
                className="md:col-span-7 md:row-span-1 group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#00A6FB] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between p-5 sm:p-6 text-[#051923] cursor-pointer min-h-[260px] md:min-h-0"
              >
                {/* Full-Bleed Clear Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={advantagePillars[1].image}
                    alt={advantagePillars[1].title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A6FB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Row */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/40 shadow-sm text-[11px] font-bold text-[#006494] uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#00A6FB] animate-pulse" />
                    <span>{advantagePillars[1].category}</span>
                  </div>
                  <span className="px-3.5 py-1 rounded-full bg-[#00A6FB] text-white text-xs font-bold shadow-md shadow-[#00A6FB]/25">
                    {advantagePillars[1].stat}
                  </span>
                </div>

                {/* Minimalist Floating White Dock for Maximum Visibility */}
                <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl py-2 px-3.5 sm:py-2.5 sm:px-4.5 border border-slate-200/80 shadow-md group-hover:border-[#00A6FB]/60 transition-all duration-300">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                      <h3 className="text-sm sm:text-base md:text-lg font-bold font-heading text-[#051923] tracking-tight leading-snug">
                        {advantagePillars[1].headline}
                      </h3>
                      <span className="hidden sm:inline text-slate-300 text-xs">•</span>
                      <p className="text-[11px] sm:text-xs text-[#006494] font-semibold">
                        Ra &lt; 0.2 µm • ISO 9001:2015 Traceability
                      </p>
                    </div>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#006494] group-hover:bg-[#00A6FB] group-hover:text-white transition-all flex-shrink-0 shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Bottom-Center (4 cols x 1 row - Medium Proportional Card) - High-Volume Scale */}
              <div 
                className="md:col-span-4 md:row-span-1 group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#00A6FB] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between p-4 sm:p-5 text-[#051923] cursor-pointer min-h-[260px] md:min-h-0"
              >
                {/* Full-Bleed Clear Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={advantagePillars[2].image}
                    alt={advantagePillars[2].title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A6FB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Row */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/40 shadow-sm text-[10px] font-bold text-[#006494] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] animate-pulse" />
                    <span>Scale</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00A6FB] text-white text-[11px] font-bold shadow-md shadow-[#00A6FB]/25">
                    {advantagePillars[2].stat}
                  </span>
                </div>

                {/* Minimalist Floating White Dock for Maximum Visibility */}
                <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl py-2 px-3 sm:py-2.5 sm:px-3.5 border border-slate-200/80 shadow-md group-hover:border-[#00A6FB]/60 transition-all duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold font-heading text-[#051923] tracking-tight leading-snug">
                        {advantagePillars[2].headline}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-[#006494] font-semibold mt-0.5">
                        24/7 Operations • Kanban JIT
                      </p>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#006494] group-hover:bg-[#00A6FB] group-hover:text-white transition-all flex-shrink-0 shadow-sm">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Bottom-Right (3 cols x 1 row - Compact Asymmetric Card) - Turnkey Delivery & FAT */}
              <div 
                className="md:col-span-3 md:row-span-1 group relative rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 shadow-md hover:shadow-2xl hover:border-[#00A6FB] hover:-translate-y-1.5 transition-all duration-500 ease-out flex flex-col justify-between p-4 sm:p-5 text-[#051923] cursor-pointer min-h-[260px] md:min-h-0"
              >
                {/* Full-Bleed Clear Background Image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={advantagePillars[3].image}
                    alt={advantagePillars[3].title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                </div>

                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A6FB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Top Row */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/40 shadow-sm text-[10px] font-bold text-[#006494] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] animate-pulse" />
                    <span>Turnkey</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00A6FB] text-white text-[11px] font-bold shadow-md shadow-[#00A6FB]/25">
                    {advantagePillars[3].stat}
                  </span>
                </div>

                {/* Minimalist Floating White Dock for Maximum Visibility */}
                <div className="relative z-10 mt-auto bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl py-2 px-3 sm:py-2.5 sm:px-3.5 border border-slate-200/80 shadow-md group-hover:border-[#00A6FB]/60 transition-all duration-300">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold font-heading text-[#051923] tracking-tight leading-snug">
                        {advantagePillars[3].headline}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-[#006494] font-semibold mt-0.5">
                        100% FAT • 99.9% On-Time
                      </p>
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-100 flex items-center justify-center text-[#006494] group-hover:bg-[#00A6FB] group-hover:text-white transition-all flex-shrink-0 shadow-sm">
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Unified Bottom Performance Metrics Ribbon */}
          <div className="mt-16 pt-10 border-t border-gray-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#051923] font-heading">
                ±0.005<span className="text-[#00A6FB]">mm</span>
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
                Precision Positioning Accuracy
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#051923] font-heading">
                12,000<span className="text-[#00A6FB]">W</span>
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
                Fiber Laser Cutting Fleet
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#051923] font-heading">
                50,000<span className="text-[#00A6FB]">+</span>
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
                Monthly Production Capacity
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#051923] font-heading">
                99.9<span className="text-[#00A6FB]">%</span>
              </div>
              <div className="text-xs text-gray-600 font-medium uppercase tracking-wider">
                Guaranteed On-Time Delivery
              </div>
            </div>
          </div>

        </div>
      </section>




    </main>
  );
}
