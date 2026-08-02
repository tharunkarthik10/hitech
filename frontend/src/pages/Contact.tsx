import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Google Material Symbols helper
function MaterialIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span 
      className={`material-symbols-outlined select-none ${className}`} 
      style={{ fontVariationSettings: "'wght' 300, 'opsz' 24" }}
    >
      {name}
    </span>
  );
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What design file formats do you accept for custom manufacturing quotes?",
    answer: "We prefer 3D CAD models in STEP (.step, .stp) or IGES (.igs) formats for 3D modeling and CNC machining. For 2D drawings like sheet metal fabrication and laser cutting, we accept DXF (.dxf) and DWG (.dwg) files. Fully annotated PDFs are also recommended to specify tolerance callouts, thread requirements, and finishing instructions."
  },
  {
    question: "What is your typical turnaround time for a custom quote?",
    answer: "For standard parts, our estimating team typically delivers detailed pricing and DFM feedback within 24 hours. For complex assemblies, multi-process bids, or specialty materials, quotes may take 48 hours. If your project is highly time-sensitive, please toggle the 'Urgent Project' flag in the form."
  },
  {
    question: "Do you sign Non-Disclosure Agreements (NDAs)?",
    answer: "Yes, absolutely. We take client intellectual property very seriously. We are happy to review and sign your corporate NDA, or we can provide Hitech's standard NDA before you upload any CAD files or proprietary engineering drawings. Contact our sales desk directly to initiate this process."
  },
  {
    question: "What quality certifications does Hitech Engineering hold?",
    answer: "All our primary manufacturing and machining facilities are fully certified to ISO 9001:2015 quality management systems. We maintain strict testing records, material tracer documentation, and dimensional inspection reports that can be provided upon request with your delivery."
  },
  {
    question: "Do you offer expedited prototype production?",
    answer: "Yes, we offer 24-hour and 48-hour rush programs for critical prototype projects, specifically for fiber laser cutting, CNC milling, and sheet metal bending. Check the Urgent Projects section or contact our rapid-response team directly to check current machine queue capacity."
  }
];

export default function Contact() {
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: 'Laser Cutting',
    description: '',
    budget: '',
    isUrgent: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: 'Laser Cutting',
        description: '',
        budget: '',
        isUrgent: false
      });
    }, 1500);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(prev => (prev === index ? null : index));
  };

  return (
    <main className="overflow-x-clip bg-white text-[#003554] font-body-md min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#051923] via-[#0b2b3c] to-[#004e64] text-white py-20 px-8 md:px-12 flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#0064942a_0%,transparent_60%)]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0582CA] opacity-[0.03] rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 font-label-caps tracking-widest text-[11px] font-bold uppercase">
            <MaterialIcon name="contact_support" className="text-sm" />
            Get in touch
          </div>
          <h1 className="text-4xl md:text-6xl font-headline-xl font-bold tracking-tight leading-tight">
            Connect With Our <span className="text-[#0582CA]">Engineering Desk</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-body-lg max-w-3xl mx-auto leading-relaxed">
            Have questions about tolerances, lead times, or manufacturing capacity? Reach out to Hitech for rapid responses, custom project quoting, and expert DFM consultations.
          </p>
        </div>
      </section>

      {/* 2. CONTACT INFORMATION SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit group-hover:bg-[#003554] group-hover:text-white transition-colors duration-300">
              <MaterialIcon name="location_on" className="text-2xl" />
            </div>
            <h3 className="text-lg font-headline-lg font-bold">Headquarters</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Hitech Industrial Zone<br />
              100 Industrial Parkway, Sector 4<br />
              Tech City, TC 45199
            </p>
          </div>
          <span className="text-xs text-blue-900 font-bold uppercase tracking-wider mt-4 inline-flex items-center gap-1 group-hover:underline">
            View on Map <MaterialIcon name="arrow_right_alt" className="text-sm" />
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit group-hover:bg-[#003554] group-hover:text-white transition-colors duration-300">
              <MaterialIcon name="phone_in_talk" className="text-2xl" />
            </div>
            <h3 className="text-lg font-headline-lg font-bold">Direct Lines</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Sales Desk: +1 (800) 555-0199<br />
              Support Desk: +1 (800) 555-0188<br />
              Fax: +1 (800) 555-0180
            </p>
          </div>
          <a href="tel:+18005550199" className="text-xs text-blue-900 font-bold uppercase tracking-wider mt-4 inline-flex items-center gap-1 group-hover:underline">
            Call Sales <MaterialIcon name="arrow_right_alt" className="text-sm" />
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit group-hover:bg-[#003554] group-hover:text-white transition-colors duration-300">
              <MaterialIcon name="mail" className="text-2xl" />
            </div>
            <h3 className="text-lg font-headline-lg font-bold">Email Channels</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Project Estimates: sales@hitech.com<br />
              Technical Support: engineering@hitech.com<br />
              Careers: careers@hitech.com
            </p>
          </div>
          <a href="mailto:sales@hitech.com" className="text-xs text-blue-900 font-bold uppercase tracking-wider mt-4 inline-flex items-center gap-1 group-hover:underline">
            Send Email <MaterialIcon name="arrow_right_alt" className="text-sm" />
          </a>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md shadow-slate-100/30 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 group">
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit group-hover:bg-[#003554] group-hover:text-white transition-colors duration-300">
              <MaterialIcon name="schedule" className="text-2xl" />
            </div>
            <h3 className="text-lg font-headline-lg font-bold">Operating Hours</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">
              Monday - Friday: 8:00 AM - 6:00 PM EST<br />
              Saturday: Closed<br />
              Sunday: Closed<br />
              <span className="text-amber-600 font-semibold">(24/7 Monitoring for Urgent Orders)</span>
            </p>
          </div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-4">
            Eastern Standard Time
          </span>
        </div>
      </section>

      {/* 3. REQUEST A QUOTE FORM SECTION */}
      <section id="contact-form" className="w-[calc(100%-2cm)] mx-[1cm] mt-12 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Guidelines */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0b2b3c] to-[#051923] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#00649420_0%,transparent_50%)]"></div>
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <span className="bg-blue-500/10 border border-blue-400/20 text-[#0582CA] font-label-caps tracking-widest text-[11px] font-bold px-3 py-1 rounded-full uppercase">
                Estimating Desk
              </span>
              <h2 className="text-2xl md:text-3xl font-headline-lg font-bold">Quoting & DFM Guidelines</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Submit your project specifications, materials, and digital design files to receive a detailed cost breakdown and Design for Manufacturability (DFM) review.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-blue-400 shrink-0 h-10 w-10 flex items-center justify-center">
                  <MaterialIcon name="file_present" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Preferred File Formats</h4>
                  <p className="text-xs text-slate-400 font-medium">STEP, STP, IGES, DXF, DWG, and fully annotated reference PDFs.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-blue-400 shrink-0 h-10 w-10 flex items-center justify-center">
                  <MaterialIcon name="speed" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Typical Review Timelines</h4>
                  <p className="text-xs text-slate-400 font-medium">Standard parts estimated within 24 hours. Critical runs expedited on request.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-2 bg-white/5 border border-white/10 rounded-xl text-blue-400 shrink-0 h-10 w-10 flex items-center justify-center">
                  <MaterialIcon name="verified_user" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-0.5">Secure IP Handling</h4>
                  <p className="text-xs text-slate-400 font-medium">Standard corporate NDAs signed and executed prior to drawing uploads.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 relative z-10 text-xs text-slate-400 font-medium flex items-center gap-2">
            <MaterialIcon name="info" className="text-blue-400 text-sm" />
            Your uploaded files are securely encrypted.
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 p-8 md:p-12">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
            >
              <div className="h-16 w-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
                <MaterialIcon name="check" className="text-3xl font-black" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-headline-lg font-bold">Quote Request Submitted</h3>
                <p className="text-sm text-slate-500 font-medium max-w-md leading-relaxed">
                  Thank you! Your project details have been sent to Hitech's Estimating and Engineering Desk. A representative will contact you within 24 hours with your review.
                </p>
              </div>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#003554] hover:bg-[#00A6FB] text-white font-label-caps tracking-widest text-xs font-bold px-6 py-3 rounded-xl transition-all"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-headline-lg font-bold">Request a Custom Quote</h3>
                <p className="text-xs text-slate-400 font-medium">Please provide accurate contact details and design specifications below.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Contact Name *</label>
                  <input 
                    type="text" 
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Corporate Email *</label>
                  <input 
                    type="email" 
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@company.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Company Name</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 012-3456"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Primary Project Type *</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all"
                  >
                    <option>Laser Cutting</option>
                    <option>CNC Machining</option>
                    <option>Gear Manufacturing</option>
                    <option>Sheet Metal Fabrication</option>
                    <option>Custom Industrial Run</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500">Estimated Budget Range</label>
                  <input 
                    type="text" 
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g. $5,000 - $10,000"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500">Project Description & Specifications *</label>
                <textarea 
                  required
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Specify material types, required tolerances, finishing options, quantity metrics, and details..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] text-sm font-medium transition-all resize-none"
                />
              </div>

              {/* Upload Mock */}
              <div className="p-4 border border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                <MaterialIcon name="cloud_upload" className="text-3xl text-slate-400 mb-2 animate-pulse" />
                <p className="text-xs font-bold text-slate-700">Drag & drop your CAD drawings here</p>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Formats: STEP, STP, DXF, PDF (Max 25MB)</p>
              </div>

              {/* Urgent Checkbox */}
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="isUrgent"
                  name="isUrgent"
                  checked={formData.isUrgent}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-slate-200 text-[#003554] focus:ring-[#003554]/20"
                />
                <label htmlFor="isUrgent" className="text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer">
                  <MaterialIcon name="warning" className="text-amber-500 text-sm animate-pulse" />
                  This is an urgent project (expedited quote required)
                </label>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-[#003554] hover:bg-[#00A6FB] text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-md shadow-blue-900/10 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing CAD Files...
                  </>
                ) : (
                  <>
                    <MaterialIcon name="send" className="text-sm" />
                    Submit Request
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. WHY CONTACT US SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-12 py-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-headline-xl font-bold">Why Manufacturers Contact Hitech</h2>
          <p className="text-slate-400 font-medium text-sm leading-relaxed mt-2">Re-engineered client support built for industrial efficiency and high accuracy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/30 space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit">
              <MaterialIcon name="speed" className="text-2xl" />
            </div>
            <h4 className="text-base font-bold">24-Hour DFM Quote</h4>
            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
              Estimates are delivered within 1 business day, complete with early CAD feedback from our senior engineering team.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/30 space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit">
              <MaterialIcon name="engineering" className="text-2xl" />
            </div>
            <h4 className="text-base font-bold">Direct Engineer Access</h4>
            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
              No sales filters or gatekeepers. Discuss material specifications and tolerance callouts directly with a shop engineer.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/30 space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit">
              <MaterialIcon name="security" className="text-2xl" />
            </div>
            <h4 className="text-base font-bold">Strict IP Protection</h4>
            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
              Hitech encrypts design documentation. We sign corporate NDAs prior to file analysis to secure your intellectual properties.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-100/30 space-y-4">
            <div className="p-3 bg-blue-50 text-blue-900 rounded-2xl w-fit">
              <MaterialIcon name="verified" className="text-2xl" />
            </div>
            <h4 className="text-base font-bold">ISO 9001:2015 Quality</h4>
            <p className="text-slate-500 font-medium text-xs md:text-sm leading-relaxed">
              Our quality assurance protocols and test certifications trace materials from purchase to final shipping package.
            </p>
          </div>
        </div>
      </section>

      {/* 5. GOOGLE MAP SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-12 bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/30 p-2">
        <div className="relative h-96 w-full rounded-2xl overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102075.44199990158!2d-122.4194155!3d37.7749293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807bed0e1ff7%3A0x6b7a5a87856b3fa1!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1565305892344"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="Hitech Engineering Office Locations"
          ></iframe>
        </div>
      </section>

      {/* 6. DEPARTMENTS DIRECT CHANNEL SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-12 py-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-headline-xl font-bold">Department Directories</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">Route your files or questions to specific divisions for faster processing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#003554] text-white p-6 rounded-3xl shadow-md border-t-4 border-[#0582CA] flex flex-col justify-between h-48">
            <div className="space-y-2">
              <h4 className="text-base font-bold">Sales & Estimating</h4>
              <p className="text-xs text-slate-300 font-medium">Bids, custom RFQs, pricing metrics, and lead time coordination.</p>
            </div>
            <a href="mailto:sales@hitech.com" className="text-xs text-[#0582CA] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline">
              sales@hitech.com <MaterialIcon name="launch" className="text-xs" />
            </a>
          </div>

          <div className="bg-[#003554] text-white p-6 rounded-3xl shadow-md border-t-4 border-[#0582CA] flex flex-col justify-between h-48">
            <div className="space-y-2">
              <h4 className="text-base font-bold">Engineering & DFM</h4>
              <p className="text-xs text-slate-300 font-medium">CAD drawing tolerances, material specifications, and design feedback.</p>
            </div>
            <a href="mailto:engineering@hitech.com" className="text-xs text-[#0582CA] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline">
              engineering@hitech.com <MaterialIcon name="launch" className="text-xs" />
            </a>
          </div>

          <div className="bg-[#003554] text-white p-6 rounded-3xl shadow-md border-t-4 border-[#0582CA] flex flex-col justify-between h-48">
            <div className="space-y-2">
              <h4 className="text-base font-bold">Procurement & Vendors</h4>
              <p className="text-xs text-slate-300 font-medium">Material supply coordination, raw steel grades, and vendor relationships.</p>
            </div>
            <a href="mailto:procurement@hitech.com" className="text-xs text-[#0582CA] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline">
              procurement@hitech.com <MaterialIcon name="launch" className="text-xs" />
            </a>
          </div>

          <div className="bg-[#003554] text-white p-6 rounded-3xl shadow-md border-t-4 border-[#0582CA] flex flex-col justify-between h-48">
            <div className="space-y-2">
              <h4 className="text-base font-bold">Careers & Recruiting</h4>
              <p className="text-xs text-slate-300 font-medium">Join Hitech's technical shop, operations teams, or design offices.</p>
            </div>
            <a href="mailto:careers@hitech.com" className="text-xs text-[#0582CA] font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline">
              careers@hitech.com <MaterialIcon name="launch" className="text-xs" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. FAQs ACCORDION SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-12 max-w-4xl mx-auto py-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-headline-xl font-bold">Frequently Asked Questions</h2>
          <p className="text-slate-400 font-medium text-sm mt-1">Quick answers to common questions about project estimation, file requirements, and production runs.</p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-100 shadow-md shadow-slate-100/10 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm md:text-base text-[#003554] hover:text-[#00A6FB] transition-colors"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1 rounded-lg bg-slate-50 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#003554]' : ''}`}>
                    <MaterialIcon name="expand_more" className="text-xl" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-slate-50 text-xs md:text-sm text-slate-500 font-medium leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. URGENT PROJECTS ALERT BANNER SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-16">
        <div className="bg-gradient-to-br from-[#0b2b3c] to-[#051923] text-white border-l-8 border-amber-500 rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-slate-950/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl"></div>
          
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl shrink-0 mt-0.5">
              <MaterialIcon name="warning" className="text-2xl animate-pulse" />
            </div>
            <div className="space-y-1">
              <span className="text-amber-500 font-label-caps tracking-widest text-[10px] font-black uppercase">Expedited Orders</span>
              <h3 className="text-lg font-bold">Have a Tight Production Deadline?</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium max-w-2xl">
                Our rapid manufacturing program supports 24-hour and 48-hour turnarounds for precision fiber laser cutting, CNC milling, and custom sheet metal prototype bending.
              </p>
            </div>
          </div>

          <a 
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-amber-500 hover:bg-amber-600 text-white font-label-caps tracking-widest text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/25 shrink-0 whitespace-nowrap"
          >
            Submit Expedited Request
          </a>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-12 mb-16">
        <div className="bg-gradient-to-r from-[#051923] to-[#004e64] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#0582ca0f_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-3.5 py-1 text-[#0582CA] font-label-caps tracking-widest text-xs font-bold uppercase">
              <MaterialIcon name="engineering" className="text-sm" />
              Direct Consulting
            </div>
            <h3 className="text-2xl md:text-4xl font-headline-xl font-bold tracking-tight">
              Ready to start your next fabrication run?
            </h3>
            <p className="text-slate-300 font-body-md text-sm md:text-base leading-relaxed">
              Submit your project files today and consult directly with our experienced engineering estimators for DFM and cost optimization.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a 
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#003554] font-label-caps tracking-widest text-sm font-bold px-8 py-4 rounded-2xl shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Free Consultation
              <MaterialIcon name="arrow_forward" className="text-sm font-bold" />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
