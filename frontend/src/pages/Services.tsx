import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, CheckCircle2, Factory, Settings, Users, LineChart, 
  Shield, Wrench, ChevronDown, ChevronUp, FileText, Award, Cpu, 
  Compass, Hammer, ClipboardCheck, ArrowUpRight
} from 'lucide-react';

export default function Services() {
  // 1. Interactive Tabs State for Manufacturing Capabilities
  const [activeCapTab, setActiveCapTab] = useState('machining');

  // 2. Accordion State for FAQ
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // 3. Form state for Quote Request
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    service: 'automation',
    details: '',
    budget: '10k-50k'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleFormReset = () => {
    setFormState({
      name: '',
      email: '',
      company: '',
      service: 'automation',
      details: '',
      budget: '10k-50k'
    });
    setIsSubmitted(false);
  };

  // Mock data definitions
  const services = [
    {
      icon: Settings,
      title: "Process Optimization",
      desc: "Identify critical bottlenecks in your production layout and integrate lean methodologies to boost daily output.",
      includes: ["Material Flow Analysis", "Lean Layout Redesign", "Throughput Simulation"]
    },
    {
      icon: Factory,
      title: "Automation Consulting",
      desc: "Comprehensive strategy for integrating PLCs, SCADA, robotic arms, and automated conveyor lines into legacy floors.",
      includes: ["System Architecture Design", "PLC/SCADA Programming", "Hardware Selection & ROI Planning"]
    },
    {
      icon: Wrench,
      title: "Preventative Maintenance",
      desc: "24/7 IoT-driven active monitoring and diagnostics to prevent hardware downtime and prolong tooling cycles.",
      includes: ["Sensor Integration", "Predictive Alerts & Support", "On-site Emergency Response"]
    },
    {
      icon: Cpu,
      title: "System Integration",
      desc: "Turnkey electrical, mechanical, and software integration to create cohesive, automated sub-systems.",
      includes: ["End-of-Arm Tooling Design", "Safety Cage Implementation", "Pneumatic Control Loops"]
    }
  ];



  const capabilities = {
    machining: {
      title: "Precision CNC Machining",
      desc: "Multi-axis milling and turning center capable of cutting complex profiles out of hard materials with repeatable, micro-scale accuracy.",
      specs: [
        "Positioning Accuracy: +/- 0.005mm",
        "Axis Configurations: 3-Axis, 4-Axis, and full 5-Axis continuous",
        "Spindle Speed Range: Up to 20,000 RPM",
        "Workpiece Envelope: Max 3000mm x 1500mm x 800mm"
      ],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
    },
    fabrication: {
      title: "Heavy & Precision Fabrication",
      desc: "Certified structure building including laser profiling, robotic MIG/TIG welding, and hydraulic plate bending.",
      specs: [
        "Laser Cutting Thickness: Up to 25mm Mild Steel / 16mm Stainless",
        "Welding Approvals: AWS D1.1 & ISO 3834 Compliant",
        "Bending Force: 220-ton hydraulic press brake",
        "Structural Capacity: Assemblies up to 5 metric tons"
      ],
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    },
    assembly: {
      title: "Electro-Mechanical Assembly",
      desc: "Clean, organized assembly cells combining mechanics, air/pneumatic controls, wiring cabinets, and PLC setups.",
      specs: [
        "ESD-Safe Assembly Environments",
        "Custom Wire Harnessing & Serialization",
        "Pneumatic Loop Testing: Up to 12 Bar continuous",
        "Complete System Verification & FAT (Factory Acceptance Test)"
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
    },
    engineering: {
      title: "Design & Simulations",
      desc: "Advanced engineering design utilizing Autodesk Inventor, SolidWorks, and Siemens NX for kinematics testing.",
      specs: [
        "Finite Element Analysis (FEA) for stress loads",
        "Robot Reachability & Cycle Time Simulation",
        "Pneumatic & Hydraulic Circuit Drafting",
        "Digital Twin generation for production validation"
      ],
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
    }
  };

  const processSteps = [
    { num: "01", icon: Compass, title: "Physical Audit", desc: "Our engineering team conducts a thorough on-site audit of your plant floors and bottlenecks." },
    { num: "02", icon: FileText, title: "Engineering Blueprint", desc: "We model a custom solution in 3D CAD and simulate workflow cycle times prior to cutting metal." },
    { num: "03", icon: Hammer, title: "Build & Integration", desc: "Heavy components are machined and pre-assembled. Controls are integrated under tight QC." },
    { num: "04", icon: ClipboardCheck, title: "Deploy & Support", desc: "Non-disruptive site installation followed by standard training cycles and continuous IoT tracking." }
  ];

  const trustPillars = [
    { icon: Shield, title: "ISO 9001:2015 Registered", desc: "Structured quality loops that ensure structural, dimensional, and aesthetic conformity." },
    { icon: Users, title: "20+ Years in Service", desc: "Hundreds of successful lines deployed for global industrial and B2B leaders." },
    { icon: LineChart, title: "Guaranteed Operational ROI", desc: "Most optimization clients realize complete project payback inside 6 to 12 months." },
    { icon: Award, title: "Certified Engineering Team", desc: "Trained mechanical, electrical, and control experts under one unified plant roof." }
  ];

  const machinery = [
    {
      name: "Hermle 5-Axis Machining Center",
      type: "Precision CNC",
      desc: "Capable of machining ultra-complex geometries from solid block titanium and high-grade aluminum.",
      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "KUKA Robotic Welding Cell",
      type: "Automated Welding",
      desc: "Twin-axis positioner with precise robotic MIG welding, ensuring perfect, structural weld penetration.",
      img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Trumpf TruLaser Fiber Cutter",
      type: "Laser Profiling",
      desc: "Ultra-fast sheet metal cutter with high positional accuracy for custom structural brackets and panels.",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const projects = [
    {
      tag: "Automotive",
      metric: "+45% Throughput",
      title: "Assembly Line Optimization for Global Auto OEM",
      desc: "We redesigned the pneumatic feed loops and integrated 3 robotic welding cells. Cycle time dropped from 84s to 46s.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop"
    },
    {
      tag: "Aerospace",
      metric: "0.005mm Accuracy",
      title: "Titanium Structural Parts for Aviation Supplier",
      desc: "Leveraged our 5-axis CNC capability to machine flight-critical structural brackets, passing NDT inspection at 100%.",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const certifications = [
    { name: "ISO 9001:2015", subtitle: "Quality Management System", code: "CERT-001" },
    { name: "CE Conformity", subtitle: "European Safety Standards", code: "CERT-002" },
    { name: "UL Panel Shop", subtitle: "Electrical Safety Listing", code: "CERT-003" },
    { name: "ASME Sec VIII", subtitle: "Pressure Vessel Welding", code: "CERT-004" }
  ];

  const testimonials = [
    {
      quote: "Hitech completely modernized our assembly floor. Their pneumatic optimization and custom sorting conveyor dropped defects to near zero. The ROI took less than 6 months.",
      author: "Marcus Vance",
      role: "Director of Operations",
      company: "Apex Auto Systems"
    },
    {
      quote: "The precision machining capabilities at Hitech are exceptional. Our custom automotive gear assemblies required micron-level accuracy, and their team delivered ahead of schedule.",
      author: "Rajesh Mehta",
      role: "Lead Systems Engineer",
      company: "Varma Motors"
    },
    {
      quote: "The level of engineering precision is unmatched. Our custom aerospace manifolds require tight tolerances and structural integrity. Hitech delivered flawless parts.",
      author: "Elena Rostova",
      role: "Quality Assurance Lead",
      company: "Rostov Aviation Group"
    },
    {
      quote: "We partnered with Hitech for high-volume laser cutting and sheet metal fabrication. Their automated setup ensured 100% consistency across all 10,000 panels.",
      author: "Sarah Jenkins",
      role: "Supply Chain Director",
      company: "Apex Solar Grid"
    },
    {
      quote: "Outstanding engineering support and customer service. They worked closely with our R&D team to prototype and manufacture complex medical-grade titanium implants.",
      author: "Dr. Kenji Sato",
      role: "Head of Biomedical R&D",
      company: "Sato Medical Devices"
    }
  ];

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "For custom engineering projects, the discovery and design phase takes 2-3 weeks. Fabrication and assembly take 4-8 weeks, followed by on-site commissioning which typically finishes in 3-5 days."
    },
    {
      q: "Can you design custom systems to interface with existing legacy machines?",
      a: "Yes. Retrofitting and legacy system integration is a core strength. We design custom mechanical and electrical adapters, and program PLCs to communicate with older protocols."
    },
    {
      q: "What materials do you support in your CNC shop?",
      a: "We work with all grades of Stainless Steel (304, 316, 410), Aluminum (6061, 7075), Titanium, Carbon Steel, Brass, Copper, and various engineering plastics like Delrin and PEEK."
    },
    {
      q: "Do you provide testing and material certification?",
      a: "Absolutely. We supply Mill Test Reports (MTRs), CMM Inspection Reports, Weld NDT certificates, and complete FAT test sheets with every delivery."
    }
  ];

  const technicalSpecsTable = [
    { parameter: "Precision Machining Tolerance", range: "+/- 0.005 mm", testMethod: "CMM Coordinate Metrology" },
    { parameter: "CNC Max Travel Limits", range: "3000 x 1500 x 800 mm", testMethod: "5-Axis Calibration Loop" },
    { parameter: "Fiber Laser Capacity", range: "Up to 25mm thickness", testMethod: "Oxygen/Nitrogen Assist Cutting" },
    { parameter: "Welding Code Standard", range: "AWS D1.1 / ISO 3834", testMethod: "Radiographic / Dye Penetrant" },
    { parameter: "Pneumatic Operational Pressure", range: "2 to 12 Bar", testMethod: "Hydro-static Leak Checks" }
  ];

  return (
    <main className="pt-20 bg-[#F1F5F9] text-gray-900 selection:bg-[#003554] selection:text-white">
      {/* Dynamic Technical Grid background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(71, 85, 105, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 85, 105, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px' 
        }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative bg-[#003554] text-white py-32 px-8 md:px-12 overflow-hidden border-b-4 border-gray-900">
        {/* Subtle grid accent inside hero */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8 text-left">
            <span className="inline-block text-sm tracking-[0.2em] font-bold text-[#00A6FB] mb-6 uppercase">
              SERVICES DIVISION
            </span>
            <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-[1.05] mb-6 font-heading">
              Precision Engineering. <br />
              <span className="text-[#00A6FB]">Automated Production.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-10 leading-relaxed font-light">
              We design, machine, and integrate advanced industrial systems. From custom precision components to complete robotic factory lines, we guarantee zero-downtime execution.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#quote" 
                className="bg-[#00A6FB] text-white border border-[#00A6FB] px-8 py-4 font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-[#003554] transition-all duration-300 transform hover:-translate-y-1 rounded-full shadow-md"
              >
                Request a Quote
              </a>
              <a 
                href="#services-grid" 
                className="bg-transparent text-white border-2 border-white/80 px-8 py-4 font-bold tracking-[0.1em] uppercase hover:bg-white hover:text-[#003554] transition-all duration-300 transform hover:-translate-y-1 rounded-full"
              >
                View Capabilities
              </a>
            </div>
          </div>
          <div className="hidden md:col-span-4 relative border border-[#00A6FB]/30 p-4 bg-[#002b45]/40 backdrop-blur-sm rounded-2xl">
            <div className="absolute top-0 right-0 p-2 font-bold text-xs text-[#00A6FB] tracking-[0.1em]">UNIT MODEL 09</div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
              alt="Hitech Service Facility" 
              className="w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-white/10 rounded-xl"
            />
            <div className="mt-3 text-xs font-bold text-gray-400 tracking-[0.15em] flex justify-between">
              <span>STATUS: OPERATIONAL</span>
              <span>QC: STABLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section className="py-24 px-8 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4 sticky top-28">
              <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Introduction</div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading leading-tight">
                Pioneering The Next Era Of Industrial Output
              </h2>
              <div className="w-12 h-1 bg-[#00A6FB] mt-4 rounded-full"></div>
            </div>
            <div className="md:col-span-8 space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl">
              <p className="font-bold text-[#003554] text-xl">
                Hitech’s service ecosystem is engineered to support plants, fabricators, and B2B manufacturers seeking robust machinery design and line automation.
              </p>
              <p>
                We do not believe in temporary fixes. Our engineering division integrates heavy mechanical custom tooling, electronic pneumatic controls, and intelligent automation sequences built to run 24/7 without failing.
              </p>
              <p>
                Whether you need precision component runs on our 5-axis CNC machining centers, automated KUKA welding arrays designed for structural assembly, or structural analysis for industrial storage lines, Hitech provides complete turnkey authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section id="services-grid" className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Service Capabilities</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Our Core Services</h2>
            <div className="w-16 h-1 bg-[#003554] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-8 hover:border-[#00A6FB] transition-all duration-300 flex flex-col justify-between hover:shadow-lg rounded-2xl group">
                <div>
                  <div className="w-14 h-14 bg-[#F1F5F9] text-[#003554] flex items-center justify-center mb-6 group-hover:bg-[#003554] group-hover:text-white transition-colors duration-300 border border-gray-100 rounded-xl">
                    <svc.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#003554] mb-3 uppercase tracking-tight">{svc.title}</h3>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed">{svc.desc}</p>
                </div>
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  {svc.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00A6FB] flex-shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 5. MANUFACTURING CAPABILITIES */}
      <section id="capabilities" className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Tab selection & copy */}
            <div className="lg:col-span-5">
              <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Infrastructure</div>
              <h2 className="text-3xl font-bold text-[#003554] uppercase tracking-tight mb-8 font-heading">
                Manufacturing Capabilities
              </h2>
              
              <div className="flex flex-col gap-2">
                {Object.entries(capabilities).map(([key, cap]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCapTab(key)}
                    className={`w-full text-left p-5 border-l-4 transition-all duration-300 font-bold uppercase tracking-tight flex items-center justify-between text-base rounded-xl ${
                      activeCapTab === key 
                        ? 'border-[#003554] bg-[#003554] text-white pl-6' 
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{cap.title}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${activeCapTab === key ? 'translate-x-1' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Tab content display */}
            <div className="lg:col-span-7 bg-white border border-gray-200 p-8 min-h-[440px] flex flex-col md:flex-row gap-8 justify-between rounded-3xl">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-[#00A6FB] tracking-widest block mb-2">SPECS INFO</span>
                  <h3 className="text-2xl font-bold text-[#003554] uppercase tracking-tight font-heading mb-4">
                    {capabilities[activeCapTab as keyof typeof capabilities].title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {capabilities[activeCapTab as keyof typeof capabilities].desc}
                  </p>
                </div>
                <div className="space-y-3 border-t border-gray-100 pt-6">
                  <span className="text-xs font-bold text-gray-400 block mb-2 uppercase tracking-[0.1em]">TOLERANCE & FEED LIMITS</span>
                  {capabilities[activeCapTab as keyof typeof capabilities].specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700 font-semibold">
                      <span className="w-1.5 h-1.5 bg-[#00A6FB] mt-2 flex-shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-80 shrink-0 aspect-[4/3] md:aspect-auto overflow-hidden border border-gray-200 rounded-2xl">
                <img 
                  src={capabilities[activeCapTab as keyof typeof capabilities].image} 
                  alt={capabilities[activeCapTab as keyof typeof capabilities].title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS */}
      <section className="py-24 px-8 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Methodology</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Our Process</h2>
            <div className="w-16 h-1 bg-[#003554] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative bg-[#F8FAFC] border border-gray-200 p-8 flex flex-col justify-between hover:border-[#00A6FB] transition-all duration-300 min-h-[240px] rounded-2xl">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-heading text-4xl font-black text-gray-200 group-hover:text-[#00A6FB]/20 transition-colors">{step.num}</span>
                    <step.icon className="w-6 h-6 text-[#00A6FB]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#003554] mb-3 uppercase tracking-tight">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {idx !== processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[1px] bg-gray-200 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Trust Elements</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Why Choose Us</h2>
            <div className="w-16 h-1 bg-[#00A6FB] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((pillar, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-8 text-center hover:border-[#003554] transition-all duration-300 flex flex-col justify-between min-h-[220px] rounded-2xl">
                <div>
                  <pillar.icon className="w-10 h-10 text-[#00A6FB] mx-auto mb-6" />
                  <h3 className="text-lg md:text-xl font-bold text-[#003554] mb-3 uppercase tracking-tight">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FEATURED MACHINERY */}
      <section className="py-24 px-8 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Plant Stocks</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Featured Machinery</h2>
            <div className="w-16 h-1 bg-[#003554] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {machinery.map((mach, idx) => (
              <div key={idx} className="border border-gray-200 bg-[#F8FAFC] group overflow-hidden rounded-2xl">
                <div className="aspect-[16/10] overflow-hidden border-b border-gray-200">
                  <img 
                    src={mach.img} 
                    alt={mach.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-[#00A6FB] uppercase block mb-1.5 tracking-[0.1em]">{mach.type}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-[#003554] mb-2 uppercase tracking-tight">{mach.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{mach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. QUALITY ASSURANCE */}
      <section className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Standards</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading mb-6 leading-tight">
              Quality Assurance & Verification
            </h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              Every part manufactured, welded, or integrated on our assembly line passes through strict physical metrology. We enforce ISO 9001:2015 standards, ensuring that dimensional checks and performance limits are validated before shipment.
            </p>
            <div className="space-y-5">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5.5 h-5.5 text-[#00A6FB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#003554] text-base uppercase">CMM Dimensional Inspections</h4>
                  <p className="text-gray-600 text-sm">Verify exact tolerance criteria down to +/- 0.005mm limit paths.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5.5 h-5.5 text-[#00A6FB] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#003554] text-base uppercase">NDT (Non-Destructive Testing)</h4>
                  <p className="text-gray-600 text-sm">Radiographic & Dye Penetrant testing on all high-stress welded frames.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 bg-white border border-gray-200 p-8 grid grid-cols-2 gap-4 rounded-2xl">
            <div className="border border-gray-100 p-6 text-center bg-[#F8FAFC] rounded-xl">
              <span className="font-heading text-3xl font-black text-[#003554]">100%</span>
              <h5 className="font-bold text-sm uppercase text-gray-500 mt-2">Material Traceability</h5>
              <p className="text-gray-500 text-xs mt-1">Full documentation trace from raw billet to finished component.</p>
            </div>
            <div className="border border-gray-100 p-6 text-center bg-[#F8FAFC] rounded-xl">
              <span className="font-heading text-3xl font-black text-[#003554]">0.005mm</span>
              <h5 className="font-bold text-sm uppercase text-gray-500 mt-2">Tolerance Lock</h5>
              <p className="text-gray-500 text-xs mt-1">Repeatable CNC micro-positioning accuracy guaranteed.</p>
            </div>
            <div className="border border-gray-100 p-6 text-center bg-[#F8FAFC] rounded-xl">
              <span className="font-heading text-3xl font-black text-[#003554]">FAT & SAT</span>
              <h5 className="font-bold text-sm uppercase text-gray-500 mt-2">Rigorous Testing</h5>
              <p className="text-gray-500 text-xs mt-1">Factory and Site Acceptance protocols run with full logs.</p>
            </div>
            <div className="border border-gray-100 p-6 text-center bg-[#F8FAFC] rounded-xl">
              <span className="font-heading text-3xl font-black text-[#003554]">20+ Years</span>
              <h5 className="font-bold text-sm uppercase text-gray-500 mt-2">Verified Track Record</h5>
              <p className="text-gray-500 text-xs mt-1">A reliable history of B2B production engineering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TECHNICAL SPECIFICATIONS */}
      <section className="py-24 px-8 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Data Tables</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Technical Specifications</h2>
            <div className="w-16 h-1 bg-[#00A6FB] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#003554] text-white uppercase font-heading text-sm border-b border-gray-200">
                  <th className="p-5 pl-6">Parameter Name</th>
                  <th className="p-5">Operational Range</th>
                  <th className="p-5">Validation Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {technicalSpecsTable.map((spec, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 pl-6 font-bold text-[#003554] uppercase">{spec.parameter}</td>
                    <td className="p-5 font-heading text-gray-900 font-semibold">{spec.range}</td>
                    <td className="p-5 text-gray-600 font-medium">{spec.testMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 11. RECENT PROJECTS */}
      <section className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Projects</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Recent Projects</h2>
            <div className="w-16 h-1 bg-[#003554] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-8 flex flex-col md:flex-row gap-8 justify-between hover:shadow-lg transition-all duration-300 rounded-2xl">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-3 items-center mb-4">
                      <span className="bg-[#003554] text-white px-2.5 py-1 text-xs font-bold uppercase tracking-[0.1em] rounded-md">{proj.tag}</span>
                      <span className="bg-green-100 text-green-800 px-2.5 py-1 text-xs font-bold uppercase rounded-md">{proj.metric}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#003554] mb-3 uppercase tracking-tight">{proj.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{proj.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <a href="#quote" className="inline-flex items-center gap-1 text-sm font-bold text-[#00A6FB] hover:text-[#003554] transition-colors uppercase">
                      Inquire About Similar setup <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="md:w-56 shrink-0 aspect-[4/3] md:aspect-square overflow-hidden border border-gray-200 rounded-xl">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. CERTIFICATIONS */}
      <section className="py-24 px-8 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Audits & Licenses</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Certifications & Compliance</h2>
            <div className="w-16 h-1 bg-[#00A6FB] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="border border-gray-200 p-6 bg-[#F8FAFC] text-center flex flex-col justify-between items-center hover:border-[#00A6FB] transition-all duration-300 min-h-[160px] rounded-2xl">
                <span className="text-xs font-bold text-[#00A6FB] block mb-2 tracking-[0.1em]">{cert.code}</span>
                <Award className="w-8 h-8 text-[#003554] mb-3" />
                <h3 className="font-bold text-base uppercase text-[#003554]">{cert.name}</h3>
                <p className="text-gray-500 text-xs mt-1.5 font-medium">{cert.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. TESTIMONIALS */}
      <section className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Testimonials</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">What Our Clients Say</h2>
            <div className="w-16 h-1 bg-[#003554] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="relative w-full overflow-hidden py-4 mask-gradient">
            <div className="flex animate-marquee gap-8 hover:[animation-play-state:paused] w-max">
              {[...testimonials, ...testimonials].map((test, idx) => (
                <div 
                  key={idx} 
                  className="w-[320px] sm:w-[450px] shrink-0 bg-white border border-gray-200 p-10 relative flex flex-col justify-between hover:border-[#00A6FB] transition-all duration-300 rounded-2xl"
                >
                  <span className="absolute -top-4 -left-2 text-[#00A6FB]/10 text-8xl font-serif select-none pointer-events-none">“</span>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed italic mb-6 relative z-10">
                    "{test.quote}"
                  </p>
                  <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm uppercase text-[#003554]">{test.author}</h4>
                      <span className="text-xs text-gray-500 font-medium">{test.role}</span>
                    </div>
                    <span className="text-xs text-[#00A6FB] uppercase font-bold tracking-[0.1em]">{test.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION */}
      <section className="py-24 px-8 md:px-12 bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Accordions</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[#00A6FB] mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 bg-white rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold uppercase tracking-tight text-base text-[#003554]">
                    {faq.q}
                  </span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#00A6FB] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-gray-100"
                    >
                      <div className="p-6 text-sm md:text-base leading-relaxed text-gray-600 bg-gray-50/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. REQUEST A QUOTE CTA */}
      <section id="quote" className="py-24 px-8 md:px-12 bg-[#F8FAFC] border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-bold text-[#00A6FB] uppercase tracking-[0.2em] mb-4">Estimate Form</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#003554] uppercase tracking-tight font-heading">Request A Custom Quote</h2>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold tracking-[0.1em]">ESTIMATED REPLY TIME: &lt; 24 HOURS</p>
            <div className="w-16 h-1 bg-[#003554] mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="bg-white border border-gray-200 p-8 shadow-sm rounded-3xl">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit} 
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-bold tracking-[0.1em] text-xs uppercase text-gray-500 mb-2">Client Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-[#003554] text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold tracking-[0.1em] text-xs uppercase text-gray-500 mb-2">Corporate Email</label>
                      <input 
                        type="email" 
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                        placeholder="j.doe@company.com" 
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-[#003554] text-sm rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-bold tracking-[0.1em] text-xs uppercase text-gray-500 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        required
                        value={formState.company}
                        onChange={(e) => setFormState({...formState, company: e.target.value})}
                        placeholder="Industrial Solutions Inc." 
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-[#003554] text-sm rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block font-bold tracking-[0.1em] text-xs uppercase text-gray-500 mb-2">Desired Service</label>
                      <select 
                        value={formState.service}
                        onChange={(e) => setFormState({...formState, service: e.target.value})}
                        className="w-full p-4 border border-gray-200 focus:outline-none focus:border-[#003554] text-sm bg-white rounded-xl"
                      >
                        <option value="machining">Precision CNC Machining</option>
                        <option value="fabrication">Heavy Fabrication</option>
                        <option value="automation">Process Automation & Consulting</option>
                        <option value="maintenance">Preventative Support Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold tracking-[0.1em] text-xs uppercase text-gray-500 mb-2">Project Budget Bracket</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['10k-50k', '50k-150k', '150k+'].map((bracket) => (
                        <button
                          type="button"
                          key={bracket}
                          onClick={() => setFormState({...formState, budget: bracket})}
                          className={`p-3.5 border text-xs font-bold text-center uppercase transition-colors rounded-xl ${
                            formState.budget === bracket 
                              ? 'border-[#003554] bg-[#003554] text-white' 
                              : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                          }`}
                        >
                          {bracket}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold tracking-[0.1em] text-xs uppercase text-gray-500 mb-2">Technical Specifications & Scope</label>
                    <textarea 
                      rows={4}
                      value={formState.details}
                      onChange={(e) => setFormState({...formState, details: e.target.value})}
                      placeholder="Outline tolerances, materials, quantities, or physical plant issues..." 
                      className="w-full p-4 border border-gray-200 focus:outline-none focus:border-[#003554] text-sm rounded-xl"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#003554] text-white p-4 font-bold tracking-[0.2em] uppercase hover:bg-[#006494] transition-colors rounded-full"
                  >
                    Submit Quotation Request
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#003554] uppercase font-heading">ESTIMATE REQUEST DISPATCHED</h3>
                  <p className="text-gray-600 text-base max-w-md mx-auto">
                    Your specifications have been logged in our estimator pipeline. A sales engineer will follow up with standard drafting plans within 24 operational hours.
                  </p>
                  <button 
                    onClick={handleFormReset} 
                    className="bg-gray-100 text-gray-700 px-6 py-2.5 text-xs font-bold uppercase hover:bg-gray-200 transition-colors rounded-full"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>



    </main>
  );
}
