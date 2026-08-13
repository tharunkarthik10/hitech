import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, Target, PenTool, Cpu, Search, CheckSquare, 
  Layers, Package, Zap, Clock, Maximize, Activity, ShieldCheck, 
  Settings, Users, ArrowRight, ArrowUpRight
} from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import CTA from '../components/CTA';
import InteractiveLaserProcess from '../components/InteractiveLaserProcess';

export default function LaserCutting() {
  const offerings = [
    { title: "Sheet Metal Laser Cutting", desc: "Precision cutting of mild steel, stainless steel, aluminum, galvanized steel, and other engineering metals.", icon: Layers },
    { title: "Custom Profile Cutting", desc: "Accurate cutting of intricate shapes and custom designs based on customer drawings and CAD files.", icon: PenTool },
    { title: "Prototype Development", desc: "Fast and precise laser cutting for product development, testing, and design validation.", icon: Target },
    { title: "Batch Production", desc: "Efficient laser cutting services for small, medium, and large production requirements.", icon: Activity },
    { title: "Precision Engineering Components", desc: "Manufacturing of high-quality laser-cut parts for industrial, automotive, fabrication, and engineering applications.", icon: Settings }
  ];

  const processSteps = [
    { 
      title: "Design Review", 
      desc: "Customer drawings and CAD files are carefully analyzed to determine the most efficient cutting strategy. We use advanced software to optimize layouts and minimize material waste.", 
      icon: Search, 
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" 
    },
    { 
      title: "Material Selection", 
      desc: "The appropriate material and thickness are selected based on project specifications. Our strict sourcing guidelines ensure only the highest grade metals enter production.", 
      icon: Layers, 
      image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80" 
    },
    { 
      title: "Precision Laser Cutting", 
      desc: "Advanced CNC laser cutting machines produce accurate, clean, and burr-free components. High-speed lasers ensure rapid throughput without sacrificing edge quality.", 
      icon: Zap, 
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80" 
    },
    { 
      title: "Quality Inspection", 
      desc: "Every finished component is inspected for dimensional accuracy, edge quality, and overall precision. We employ CMM and strict metrology standards for absolute perfection.", 
      icon: CheckSquare, 
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
    },
    { 
      title: "Secure Delivery", 
      desc: "Components are securely packed and delivered on schedule, ready for fabrication or assembly. Our logistics team ensures safe transit and on-time arrival.", 
      icon: Package, 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" 
    }
  ];

  const materials = [
    { name: "Mild Steel (MS)", desc: "Versatile, weldable carbon steel for general fabrication.", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800" },
    { name: "Stainless Steel", desc: "Corrosion-resistant alloys for medical and architectural uses.", image: "https://images.unsplash.com/photo-1509390234725-b7781b01da42?auto=format&fit=crop&q=80&w=800" },
    { name: "Aluminum", desc: "Lightweight, strong, and highly conductive for aerospace.", image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800" },
    { name: "Galvanized Steel", desc: "Zinc-coated steel offering superior rust protection outdoors.", image: "https://images.unsplash.com/photo-1544322477-94a36fbdcc18?auto=format&fit=crop&q=80&w=800" },
    { name: "Brass", desc: "Low-friction, highly machinable metal with acoustic properties.", image: "https://images.unsplash.com/photo-1574347710323-99b380309995?auto=format&fit=crop&q=80&w=800" },
    { name: "Copper", desc: "Premium thermal and electrical conductivity for electronics.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" }
  ];

  const applications = [
    { name: "Machine Components", desc: "High-precision gears, shafts, and mechanical parts crafted for continuous industrial operation.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", span: "md:col-span-2 md:row-span-2" },
    { name: "Electrical Enclosures", desc: "Custom-cut sheet metal housings ensuring perfect fit and IP-rated protection for electronics.", image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
    { name: "Industrial Equipment", desc: "Heavy-duty structural components engineered to withstand extreme manufacturing environments.", image: "https://images.unsplash.com/photo-1531834685032-c34bf0f84c77?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
    { name: "Sheet Metal Fabrication", desc: "Complex folded and laser-cut assemblies forming the backbone of heavy engineering.", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800", span: "md:col-span-2 md:row-span-1" },
    { name: "Automotive Parts", desc: "Lightweight, high-strength chassis and engine components meeting strict automotive tolerances.", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
    { name: "Structural Components", desc: "Load-bearing metal beams and brackets cut to exact specifications for construction.", image: "https://images.unsplash.com/photo-1541888081622-19e34ff614e8?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
    { name: "Custom Engineering", desc: "Bespoke prototyping and custom geometry cutting for specialized R&D applications.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" },
    { name: "Precision Fabrication", desc: "Micro-cutting and intricate detailing for applications where every micron counts.", image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1" }
  ];

  return (
    <main className="pt-20 bg-[#F8FAFC] text-gray-900 selection:bg-[#051923] selection:text-white">
      {/* 1. HERO SECTION */}
      <HeroSlider 
        title="Precision Laser Cutting Solutions"
        description="At HiTech Engineering, we provide advanced laser cutting services that deliver exceptional accuracy, clean edges, and superior quality. Using state-of-the-art laser cutting technology, we manufacture precision components for a wide range of industrial applications."
        buttonText="Get a Quote"
      />

      {/* 2. WHAT WE OFFER */}
      <section className="py-12 md:py-16 lg:py-24 relative">
        <div className="w-full flex justify-center group/section ">
          <div className="relative w-full 2xl:max-w-[1920px] mx-auto bg-white  p-8 md:p-12 lg:p-16  border border-gray-200 overflow-hidden">
            <div className="w-full mx-auto relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#051923] font-headline-xl leading-[1.1] mb-6">What We Offer</h2>
                <div className="w-16 h-1 bg-[#00A6FB] mx-auto rounded-full"></div>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {offerings.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[#F8FAFC] border border-gray-100 p-8 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm mb-6 text-[#00A6FB] group-hover:bg-[#00A6FB] group-hover:text-white group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700 border border-transparent group-hover:border-[#00A6FB]">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-[#051923] mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LASER CUTTING PROCESS */}
      <InteractiveLaserProcess />

      {/* 4. MATERIALS WE CUT - SCROLLING IMAGE CARDS */}
      {/* 4. MATERIALS WE CUT - SCROLLING IMAGE CARDS */}
      <section className="py-12 md:py-16 lg:py-24 relative">
        <div className="w-full flex justify-center group/section ">
          <div className="relative w-full 2xl:max-w-[1920px] mx-auto bg-white  py-12 md:py-16  border border-gray-200 overflow-hidden">
            <div className="w-full mx-auto px-6 md:px-12 mb-16 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="max-w-2xl">
                  <h2 className="text-[36px] md:text-[48px] font-bold text-[#051923] tracking-tight leading-tight mb-4 uppercase font-headline-xl">
                    Materials We Cut
                    <span className="text-[#00A6FB]">.</span>
                  </h2>
                  <p className="text-[16px] md:text-[18px] text-gray-600 font-light leading-relaxed">
                    We process a wide variety of engineering materials with uncompromising precision. Our state-of-the-art lasers handle diverse thicknesses and metal grades with perfect edge quality.
                  </p>
                </div>
              </div>
            </div>

            <style>
              {`
                @keyframes materials-marquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-materials-marquee {
                  animation: materials-marquee 40s linear infinite;
                  display: flex;
                  width: max-content;
                }
                .animate-materials-marquee:hover {
                  animation-play-state: paused;
                }
              `}
            </style>

            <div className="w-full relative z-10">
              <div className="absolute left-0 top-0 w-32 md:w-64 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-32 md:w-64 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>
              
              <div className="overflow-hidden">
                <div className="animate-materials-marquee">
                  {[...materials, ...materials].map((mat, idx) => (
                    <div 
                      key={idx} 
                      className="w-[280px] md:w-[400px] flex-shrink-0 mx-4 md:mx-6 group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] rounded-3xl overflow-hidden ">
                        <img 
                          src={mat.image} 
                          alt={mat.name} 
                          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#051923] via-[#051923]/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                        
                        <div className="absolute top-6 right-6 w-10 h-10 bg-[#00A6FB] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700">
                          <ArrowUpRight className="w-5 h-5 text-white" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <h3 className="text-white font-bold text-2xl md:text-3xl mb-3 font-headline-xl">{mat.name}</h3>
                          <div className="h-[2px] w-12 bg-[#00A6FB] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                          <p className="text-gray-300 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                            {mat.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIAL APPLICATIONS - BENTO BOX */}
      <section className="py-12 md:py-16 lg:py-24 relative">
        <div className="w-full flex justify-center group/section ">
          <div className="relative w-full 2xl:max-w-[1920px] mx-auto bg-white  p-8 md:p-12 lg:p-16  border border-gray-200 overflow-hidden">
            <div className="w-full mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                <div className="max-w-2xl">
                  <h2 className="text-[36px] md:text-[48px] font-bold text-[#051923] tracking-tight leading-tight mb-4 uppercase font-headline-xl">
                    Industrial Applications
                    <span className="text-[#00A6FB]">.</span>
                  </h2>
                  <p className="text-[16px] md:text-[18px] text-gray-600 font-light leading-relaxed">
                    Our laser cutting components are integral to a vast array of global industries, ensuring strength and precision where it matters most.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[900px]">
                {applications.map((app, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className={`relative rounded-3xl overflow-hidden group cursor-pointer ${app.span}`}
                  >
                    <img 
                      src={app.image} 
                      alt={app.name} 
                      className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051923] via-[#051923]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-xl md:text-2xl mb-2">{app.name}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {app.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TECHNOLOGY & EQUIPMENT */}
      <section className="py-4 md:py-6 lg:py-8 relative">
        <div className="w-full flex justify-center px-4 md:px-8 group/section ">
          <div className="relative w-full max-w-[96%] 2xl:max-w-[1920px] mx-auto bg-[#051923] text-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16  border border-white/10 overflow-hidden">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#051923] via-[#051923]/90 to-transparent pointer-events-none"></div>

            <div className="w-full mx-auto relative z-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700">
                    <Settings className="w-4 h-4 text-[#00A6FB]" />
                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">State-of-the-Art</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-headline-xl leading-tight">Technology & <br/><span className="text-[#00A6FB]">Equipment</span></h2>
                  <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-xl">
                    HiTech Engineering utilizes advanced CNC laser cutting systems designed for high-speed, high-precision metal processing. Our equipment enables us to produce intricate profiles with excellent repeatability and superior edge quality.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  {["CNC-Controlled Laser Systems", "High-Speed Metal Cutting", "Precision Dimensional Control", "Complex Profile Cutting", "Efficient Material Utilization", "Consistent Production Quality"].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors backdrop-blur-sm group">
                      <div className="w-10 h-10 rounded-xl bg-[#00A6FB]/20 flex items-center justify-center mb-4 group-hover:bg-[#00A6FB] group-hover:text-white group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700">
                        <Settings className="w-5 h-5 text-[#00A6FB]" />
                      </div>
                      <h3 className="font-bold text-lg">{item}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. OUR COMMITMENT TO PRECISION */}
      <section className="py-12 md:py-16 lg:py-24 relative">
        <div className="w-full flex justify-center group/section ">
          <div className="relative w-full 2xl:max-w-[1920px] mx-auto bg-[#F8FAFC]  p-8 md:p-12 lg:p-16  border border-gray-200 overflow-hidden">
            <div className="w-full mx-auto relative z-10">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-[#051923] font-headline-xl mb-6">Our Commitment to <span className="text-[#00A6FB]">Precision</span></h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                  Precision is the foundation of every laser cutting project we undertake. From design verification to final inspection, we maintain strict quality standards to ensure every component meets customer expectations.
                </p>
                <div className="w-16 h-1 bg-[#00A6FB] mx-auto rounded-full mt-8"></div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {["Accurate Dimensions", "Superior Edge Finish", "Reliable Performance", "Process Consistency", "Customer Satisfaction", "Continuous Improvement"].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover: hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#00A6FB]/5 rounded-bl-full -mr-4 -mt-4 transition-transform duration-500 group-hover:scale-150"></div>
                    
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="w-16 h-16 bg-[#F8FAFC] text-[#00A6FB] flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#00A6FB] group-hover:text-white transition-colors duration-300 group-hover:rotate-[360deg] group-hover:scale-110 transition-all duration-700">
                        <Target className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-[#051923]">{item}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <CTA />
    </main>
  );
}
