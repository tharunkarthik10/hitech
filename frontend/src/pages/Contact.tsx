import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  Briefcase,
  ArrowRight,
  ChevronDown
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
    region: '+91',
    mobile: '',
    email: '',
    service: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
        region: '+91',
        mobile: '',
        email: '',
        service: '',
        description: ''
      });
    }, 900);
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
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00A6FB] hover:bg-[#008ecc] text-white font-medium text-xs sm:text-sm tracking-tight transition-all shadow-lg shadow-[#00A6FB]/30 group"
                  >
                    <Briefcase className="w-4 h-4 text-white" />
                    <span>Explore Careers at Hitech</span>
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
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
                    className="px-6 py-2.5 rounded-full bg-[#00A6FB] text-white text-xs font-medium tracking-tight hover:bg-[#008ecc] transition-colors shadow-md shadow-[#00A6FB]/20 mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <input 
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full name *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#00A6FB] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Mobile number with region */}
                  <div className="flex items-center gap-2 border-b border-gray-300 focus-within:border-[#00A6FB] py-1 transition-colors">
                    <select 
                      name="region"
                      aria-label="Country Region Code"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="bg-transparent py-2 pr-1 text-sm text-[#121212] focus:outline-none cursor-pointer shrink-0 font-medium"
                    >
                      <option value="+91" className="text-gray-800">🇮🇳 +91 (India)</option>
                      <option value="+1" className="text-gray-800">🇺🇸 +1 (USA)</option>
                      <option value="+44" className="text-gray-800">🇬🇧 +44 (UK)</option>
                      <option value="+971" className="text-gray-800">🇦🇪 +971 (UAE)</option>
                      <option value="+49" className="text-gray-800">🇩🇪 +49 (Germany)</option>
                      <option value="+65" className="text-gray-800">🇸🇬 +65 (Singapore)</option>
                      <option value="+61" className="text-gray-800">🇦🇺 +61 (Australia)</option>
                      <option value="+81" className="text-gray-800">🇯🇵 +81 (Japan)</option>
                    </select>
                    <div className="h-4 w-px bg-gray-300 shrink-0" />
                    <input 
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="Mobile number *"
                      className="w-full bg-transparent py-2 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <input 
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email address *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#00A6FB] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Services dropdown */}
                  <div className="relative">
                    <select 
                      name="service"
                      required
                      aria-label="Select Service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`w-full bg-transparent border-b border-gray-300 focus:border-[#00A6FB] py-3 pr-8 text-sm focus:outline-none transition-colors appearance-none cursor-pointer ${
                        formData.service ? 'text-[#121212]' : 'text-gray-400'
                      }`}
                    >
                      <option value="" disabled className="text-gray-400">Select Service / Unit *</option>
                      <option value="Production" className="text-gray-800">Production</option>
                      <option value="Manufacturing" className="text-gray-800">Manufacturing</option>
                      <option value="Laser Cutting" className="text-gray-800">Laser Cutting</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  {/* Description box */}
                  <div>
                    <textarea 
                      name="description"
                      rows={4}
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your engineering requirement, material specs, or batch volume... *"
                      className="w-full bg-transparent border-b border-gray-300 focus:border-[#00A6FB] py-3 text-sm text-[#121212] placeholder:text-gray-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA in Blue */}
                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#00A6FB] hover:bg-[#008ecc] text-white text-sm font-medium tracking-tight transition-all duration-300 shadow-lg shadow-[#00A6FB]/25 group disabled:opacity-50"
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
                    ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25' 
                    : 'bg-blue-50/60 text-[#475569] hover:bg-blue-100/70 hover:text-[#00A6FB]'
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A6FB]/10 text-[#00A6FB] hover:bg-[#00A6FB] hover:text-white text-xs sm:text-sm font-semibold transition-all border border-[#00A6FB]/20"
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

        </div>
      </section>

    </main>
  );
}
