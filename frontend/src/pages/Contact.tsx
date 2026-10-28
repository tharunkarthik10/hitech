import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ChevronUp, 
  Send, 
  CheckCircle2, 
  Navigation,
  MapPin,
  ExternalLink,
  Briefcase,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UNITS = [
  {
    id: 'unit1',
    name: 'Unit 1 — Laser & Sheet Metal',
    shortName: 'Unit 1 (SIDCO)',
    address: 'Plot No. 12, SIDCO Industrial Estate, Kurichi, Coimbatore 641021',
    query: 'SIDCO+Industrial+Estate+Kurichi+Coimbatore',
    focus: '12kW Fiber Laser & Sheet Fabrication'
  },
  {
    id: 'unit2',
    name: 'Unit 2 — Heavy Machining',
    shortName: 'Unit 2 (Malumichampatti)',
    address: 'SF No. 405, Malumichampatti Industrial Area, Coimbatore 641050',
    query: 'Malumichampatti+Coimbatore',
    focus: '5-Axis CNC & Heavy Precision Milling'
  },
  {
    id: 'unit3',
    name: 'Unit 3 — Assembly & Automation',
    shortName: 'Unit 3 (Eachanari)',
    address: 'SF No. 128, Eachanari Industrial Zone, Coimbatore 641021',
    query: 'Eachanari+Coimbatore',
    focus: 'Robotic MIG/TIG Assembly & Pneumatics'
  }
];

export default function Contact() {
  const [selectedUnit, setSelectedUnit] = useState(UNITS[0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 900);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="w-full bg-white text-[#121212] min-h-screen pt-24 sm:pt-28 pb-16">
      
      {/* 1. HERO BANNER: EXACT SAME LENGTH & CURVATURE AS MANUFACTURING PAGE */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-8 sm:mb-12">
        <div className="relative -mx-[0.5cm]" style={{ marginLeft: '-0.5cm', marginRight: '-0.5cm' }}>
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl sm:rounded-[22px] overflow-hidden relative shadow-xl min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-white bg-black border border-gray-900"
          >
            {/* Background Fluid Art */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/contact_hero_fluid.jpg" 
                alt="Fluid wave background" 
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />
            </div>

            {/* Bottom Hero Content: Title, Narrative & Career CTA */}
            <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-12 sm:pt-16 pb-2">
              
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Sparkles className="w-5 h-5 text-[#00A6FB]" />
                  <span className="text-sm font-medium tracking-tight text-white/80">Global Industrial Outreach</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Contacts
                </h1>

                <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-lg">
                  Connect directly with our engineering desk for custom part drawings, automated cell installations, and production quotes across our 3 manufacturing units.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link 
                    to="/career"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-100 text-[#121212] font-medium text-xs sm:text-sm tracking-tight transition-all shadow-lg group"
                  >
                    <Briefcase className="w-4 h-4 text-[#00A6FB]" />
                    <span>Explore Careers at Hitech</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Right Floating Metric Card */}
              <div className="flex flex-col items-start lg:items-end gap-3 shrink-0 self-start lg:self-end">
                {/* Metric Card: 15+ Years */}
                <div className="bg-white/95 text-gray-900 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md min-w-[170px] sm:min-w-[220px] max-w-[260px] space-y-1.5 border border-white">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212] leading-none">
                    15+ Years
                  </div>
                  <p className="text-sm text-[#64748b] font-normal leading-relaxed">
                    A decade and a half of expertise in high-tolerance machining.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* Floating Scroll to Top helper pill button on the right */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex justify-end mb-8 sm:mb-12">
        <button 
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="w-10 h-10 rounded-full bg-[#ef4444] hover:bg-[#dc2626] text-white flex items-center justify-center shadow-md transition-all duration-300 hover:scale-105"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* 2. MAIN CONTENT TWO-COLUMN SECTION */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ================= LEFT COLUMN: INFO & CALL CENTER ================= */}
          <div className="lg:col-span-7 space-y-10 lg:pr-6">
            
            {/* Header intro */}
            <div>
              <span className="text-sm font-medium tracking-tight text-[#64748b]">
                / get in touch /
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#121212] tracking-tight leading-[1.14] mt-4 mb-5">
                We are always ready to help you and answer your questions
              </h2>
              <p className="text-sm sm:text-base text-[#475569] font-normal leading-relaxed max-w-2xl">
                Whether you need technical consulting on custom pneumatic automation, 5-axis CNC machining specifications (±0.005mm), 12kW fiber laser cutting tolerances, or high-volume serial assembly, our senior engineering desk provides rapid DFM assessments and accurate cost estimations.
              </p>
            </div>

            {/* 3 Dedicated Plant Desks for Specific Routing */}
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold tracking-wider uppercase text-[#64748b]">
                Dedicated Facility Desks
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Unit 1 Desk */}
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-200/70 space-y-2 hover:border-gray-300 transition-colors">
                  <div className="text-xs font-bold text-[#00A6FB] tracking-tight">Unit 1 — Laser & Sheet</div>
                  <h4 className="text-sm font-bold text-[#121212]">Laser Cutting Desk</h4>
                  <div className="text-xs text-[#64748b] space-y-1">
                    <p>SIDCO Industrial Estate, Kurichi</p>
                    <a href="tel:+914222648801" className="block text-[#121212] font-medium hover:text-[#00A6FB]">+91 (0422) 264-8801</a>
                    <a href="mailto:laser@hitechengineering.com" className="block text-[#00A6FB] truncate hover:underline">laser@hitechengineering.com</a>
                  </div>
                </div>

                {/* Unit 2 Desk */}
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-200/70 space-y-2 hover:border-gray-300 transition-colors">
                  <div className="text-xs font-bold text-[#00A6FB] tracking-tight">Unit 2 — CNC Machining</div>
                  <h4 className="text-sm font-bold text-[#121212]">Heavy Machining Desk</h4>
                  <div className="text-xs text-[#64748b] space-y-1">
                    <p>Eachanari Industrial Area</p>
                    <a href="tel:+914222648802" className="block text-[#121212] font-medium hover:text-[#00A6FB]">+91 (0422) 264-8802</a>
                    <a href="mailto:machining@hitechengineering.com" className="block text-[#00A6FB] truncate hover:underline">machining@hitechengineering.com</a>
                  </div>
                </div>

                {/* Unit 3 Desk */}
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-200/70 space-y-2 hover:border-gray-300 transition-colors">
                  <div className="text-xs font-bold text-[#00A6FB] tracking-tight">Unit 3 — SPM Assembly</div>
                  <h4 className="text-sm font-bold text-[#121212]">Automation & SPM Desk</h4>
                  <div className="text-xs text-[#64748b] space-y-1">
                    <p>Malumichampatti Corridor</p>
                    <a href="tel:+914222648803" className="block text-[#121212] font-medium hover:text-[#00A6FB]">+91 (0422) 264-8803</a>
                    <a href="mailto:automation@hitechengineering.com" className="block text-[#00A6FB] truncate hover:underline">automation@hitechengineering.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2x2 Core Contact & SLA Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-8 pt-2 max-w-xl">
              
              {/* Central Hotline */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#121212] tracking-tight">Central Engineering Hotline</h3>
                <div className="space-y-1 text-sm text-[#475569] leading-relaxed">
                  <a href="tel:+914222648800" className="block font-medium text-[#121212] hover:text-[#00A6FB] transition-colors">
                    +91 (0422) 264-8800
                  </a>
                  <a href="tel:+919842264880" className="block hover:text-[#00A6FB] transition-colors">
                    +91 98422 64880 (WhatsApp RFQ)
                  </a>
                </div>
              </div>

              {/* Direct CAD Portal */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#121212] tracking-tight">CAD / Drawing Exchange</h3>
                <div className="space-y-1 text-sm text-[#475569] leading-relaxed">
                  <a href="mailto:cad@hitechengineering.com" className="block font-medium text-[#00A6FB] hover:underline">
                    cad@hitechengineering.com
                  </a>
                  <p className="text-xs text-[#64748b]">Formats: STEP, IGES, DXF, SLDPRT</p>
                </div>
              </div>

              {/* Operational SLA & Shifts */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#121212] tracking-tight">Operating Schedule & Shifts</h3>
                <div className="space-y-1 text-xs sm:text-sm text-[#475569] leading-relaxed">
                  <p className="font-medium text-[#121212]">Plant: 24/7 Automated Production</p>
                  <p className="text-xs text-[#64748b]">Office & Consultations: Mon – Sat, 8:30 AM – 7:30 PM IST</p>
                </div>
              </div>

              {/* Social Network & MTR Dossiers */}
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-[#121212] tracking-tight">Network & Compliance</h3>
                <div className="flex items-center gap-4 text-[#121212] pt-1">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook"
                    className="hover:text-[#00A6FB] transition-colors font-bold text-sm"
                  >
                    f
                  </a>
                  <a 
                    href="https://x.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="X (Twitter)"
                    className="hover:text-[#00A6FB] transition-colors font-bold text-sm"
                  >
                    𝕏
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="LinkedIn"
                    className="hover:text-[#00A6FB] transition-colors font-bold text-sm"
                  >
                    in
                  </a>
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="YouTube"
                    className="hover:text-[#00A6FB] transition-colors font-bold text-sm"
                  >
                    ▶
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* ================= RIGHT COLUMN: "GET IN TOUCH" FORM ================= */}
          <div className="lg:col-span-5">
            <div className="bg-[#f8fafc] rounded-3xl p-8 sm:p-12 border border-gray-200/60 shadow-sm relative">
              
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121212]">
                  Get in Touch
                </h3>
                <p className="text-sm text-[#64748b] font-normal leading-relaxed mt-2">
                  Define your goals and identify areas where precision engineering and automation can add value to your business.
                </p>
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold tracking-tight text-[#121212]">Message Sent Successfully</h4>
                  <p className="text-sm text-[#475569] leading-relaxed max-w-xs mx-auto">
                    Thank you for reaching out. An engineer from Hitech will review your query and reply shortly.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#121212] text-white text-xs font-medium tracking-tight hover:bg-[#00A6FB] transition-colors mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#121212] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#121212] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input 
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject / Project Drawing Reference *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#121212] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <textarea 
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Describe your engineering requirement, material specs, or batch volume... *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#121212] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#121212] hover:bg-[#00A6FB] text-white text-sm font-medium tracking-tight transition-all duration-300 shadow-md group disabled:opacity-50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-125 transition-transform" />
                      <span>{submitting ? 'Sending...' : 'Send a message'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* 3. WIDE STYLIZED INTERACTIVE MAP WITH FLOATING LOCATION CARD */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-16">
        
        {/* Unit Selector Pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {UNITS.map(unit => (
              <button
                key={unit.id}
                onClick={() => setSelectedUnit(unit)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all ${
                  selectedUnit.id === unit.id 
                    ? 'bg-[#121212] text-white shadow-sm' 
                    : 'bg-gray-100 text-[#475569] hover:bg-gray-200 hover:text-[#121212]'
                }`}
              >
                {unit.shortName}
              </button>
            ))}
          </div>

          <a 
            href={`https://maps.google.com/?q=${selectedUnit.query}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-medium text-[#00A6FB] hover:text-[#121212] flex items-center gap-1 transition-colors"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Map Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/80 shadow-md h-[400px] sm:h-[480px] bg-slate-100">
          
          <iframe
            key={selectedUnit.id}
            title={`${selectedUnit.name} Map`}
            src={`https://maps.google.com/maps?q=${selectedUnit.query}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 grayscale-[20%] contrast-[1.05]"
            loading="lazy"
          />

          {/* Floating Location Card in Map (Positioned on top-right to prevent overlap with native Google Maps UI) */}
          <div className="absolute top-6 right-6 z-10 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white max-w-xs sm:max-w-sm hidden sm:block">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-bold text-sm sm:text-base text-[#121212] tracking-tight">
                  {selectedUnit.name}
                </h4>
                <p className="text-xs text-[#64748b] mt-0.5 leading-snug">
                  {selectedUnit.address}
                </p>
              </div>
              <a 
                href={`https://maps.google.com/?q=${selectedUnit.query}`}
                target="_blank" 
                rel="noopener noreferrer"
                title="Get Directions"
                className="p-2.5 bg-gray-100 hover:bg-[#121212] hover:text-white rounded-xl transition-colors shrink-0 text-[#121212]"
              >
                <Navigation className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#64748b] mt-3 pt-3 border-t border-gray-100">
              <span className="font-bold text-[#121212]">4.9</span>
              <span className="text-amber-500">★★★★★</span>
              <span>(184 corporate reviews)</span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-[#64748b] font-medium">{selectedUnit.focus}</span>
              <a 
                href={`https://maps.google.com/?q=${selectedUnit.query}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00A6FB] font-semibold hover:underline"
              >
                Directions
              </a>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
