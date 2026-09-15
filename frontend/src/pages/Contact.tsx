import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight,
  MessageSquare,
  Building2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 1000);
  };

  return (
    <main className="w-full bg-[#f4f7f9] text-[#051923] font-body min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[640px] w-full flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
            alt="Factory Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 px-8 md:px-16 max-w-4xl mx-auto w-full mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading tracking-tight"
          >
            Contact <span className="text-[#00A6FB]">Us</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-light"
          >
            Have a project inquiry, custom CAD specification, or general question? Connect with our engineering desk or visit our 3 manufacturing units.
          </motion.p>

          {/* Hero Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <a 
              href="#contact-form"
              className="px-8 py-4 rounded-xl bg-[#00A6FB] text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#051923] transition-all shadow-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send a Message
            </a>
            <Link 
              to="/career"
              className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#051923] transition-all flex items-center gap-2 shadow-lg group"
            >
              <Briefcase className="w-4 h-4 text-[#00A6FB] group-hover:text-[#051923] transition-colors" />
              Explore Careers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-widest"
          >
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] mx-2"></span>
            <span className="text-white">Contact Us</span>
          </motion.div>
        </div>
      </section>

      {/* 2. GOOGLE MAP LOCATIONS OF THE THREE UNITS */}
      <section className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Unit 1 Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between space-y-5 hover:border-[#00A6FB]/40 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00A6FB]/10 text-[#00A6FB] flex items-center justify-center group-hover:bg-[#00A6FB] group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#00A6FB] px-3 py-1 rounded-md">
                  Unit 1
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#051923] font-heading">Laser &amp; Sheet Metal Division</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">SIDCO Industrial Estate, Coimbatore</p>
              </div>

              {/* Embedded Google Map Preview */}
              <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 relative group/map">
                <iframe
                  title="Unit 1 Google Map"
                  src="https://maps.google.com/maps?q=SIDCO+Industrial+Estate+Coimbatore&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale group-hover/map:grayscale-0 transition-all duration-500"
                  loading="lazy"
                ></iframe>
              </div>

              <p className="text-gray-600 text-xs leading-relaxed">
                Plot No. 12, SIDCO Industrial Estate, Kurichi, Coimbatore, Tamil Nadu 641021
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400 font-medium">12kW Fiber Laser &amp; CNC</span>
              <a 
                href="https://maps.google.com/?q=SIDCO+Industrial+Estate+Coimbatore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00A6FB] hover:text-[#051923] font-bold flex items-center gap-1 transition-colors"
              >
                Directions <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Unit 2 Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between space-y-5 hover:border-[#00A6FB]/40 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00A6FB]/10 text-[#00A6FB] flex items-center justify-center group-hover:bg-[#00A6FB] group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#00A6FB] px-3 py-1 rounded-md">
                  Unit 2
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#051923] font-heading">Heavy Manufacturing Division</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Malumichampatti, Coimbatore</p>
              </div>

              {/* Embedded Google Map Preview */}
              <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 relative group/map">
                <iframe
                  title="Unit 2 Google Map"
                  src="https://maps.google.com/maps?q=Malumichampatti+Coimbatore&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale group-hover/map:grayscale-0 transition-all duration-500"
                  loading="lazy"
                ></iframe>
              </div>

              <p className="text-gray-600 text-xs leading-relaxed">
                SF No. 405, Malumichampatti Industrial Area, Coimbatore, Tamil Nadu 641050
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400 font-medium">5-Axis CNC &amp; Heavy Milling</span>
              <a 
                href="https://maps.google.com/?q=Malumichampatti+Coimbatore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00A6FB] hover:text-[#051923] font-bold flex items-center gap-1 transition-colors"
              >
                Directions <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Unit 3 Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col justify-between space-y-5 hover:border-[#00A6FB]/40 transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00A6FB]/10 text-[#00A6FB] flex items-center justify-center group-hover:bg-[#00A6FB] group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-blue-50 text-[#00A6FB] px-3 py-1 rounded-md">
                  Unit 3
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#051923] font-heading">Production &amp; Assembly Cell</h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">Eachanari Zone, Coimbatore</p>
              </div>

              {/* Embedded Google Map Preview */}
              <div className="w-full h-44 rounded-xl overflow-hidden border border-gray-200 relative group/map">
                <iframe
                  title="Unit 3 Google Map"
                  src="https://maps.google.com/maps?q=Eachanari+Coimbatore&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 grayscale group-hover/map:grayscale-0 transition-all duration-500"
                  loading="lazy"
                ></iframe>
              </div>

              <p className="text-gray-600 text-xs leading-relaxed">
                SF No. 128, Eachanari Industrial Zone, Coimbatore, Tamil Nadu 641021
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-400 font-medium">Robotic Welding &amp; Assembly</span>
              <a 
                href="https://maps.google.com/?q=Eachanari+Coimbatore" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#00A6FB] hover:text-[#051923] font-bold flex items-center gap-1 transition-colors"
              >
                Directions <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. SIMPLE ON-POINT CONTACT FORM */}
      <section className="py-12 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="bg-white rounded-3xl p-8 md:p-14 border border-gray-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Intro Text */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[#00A6FB] font-bold text-xs uppercase tracking-widest">Send A Message</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#051923] font-heading leading-tight">
              Let's Discuss Your Next <span className="text-[#00A6FB]">Engineering Run</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Fill out the brief form and our engineering desk will connect with you to discuss part requirements, production timelines, and custom quotes.
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#00A6FB]" />
                Fast DFM drawing audits &amp; cost calculations
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#00A6FB]" />
                Strict Corporate NDA execution available
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-gray-700">
                <CheckCircle2 className="w-4 h-4 text-[#00A6FB]" />
                Direct line to experienced mechanical engineers
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-[#f8fafc] p-6 md:p-10 rounded-2xl border border-gray-100">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#051923] font-heading">Message Sent Successfully!</h3>
                <p className="text-gray-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out. A team member from Hitech will contact you at your email address shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-[#051923] text-white rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#00A6FB] transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Your Name *</label>
                    <input 
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00A6FB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Email Address *</label>
                    <input 
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00A6FB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Phone Number</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00A6FB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Inquiry Type</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00A6FB]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Custom Quote">Custom Quote / RFQ</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Vendor Partnership">Vendor Partnership</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Your Message *</label>
                  <textarea 
                    rows={4}
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your manufacturing needs or questions..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#00A6FB]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#00A6FB] text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#051923] transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  {submitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 4. CAREER CTA SECTION */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-r from-[#051923] via-[#0b2b3c] to-[#004e64] rounded-3xl p-8 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A6FB]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#00A6FB] text-xs font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-[#00A6FB]" />
              Careers at Hitech
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Looking to Build Your Career in Industrial Engineering?
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              We are actively hiring 5-axis CNC machinists, fiber laser specialists, robotics engineers, and quality metrologists.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link 
              to="/career"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00A6FB] text-white hover:bg-white hover:text-[#051923] text-xs font-bold uppercase tracking-widest transition-all shadow-xl font-heading"
            >
              View Open Positions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
