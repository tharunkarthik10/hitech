import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import type { ProductDetailItem } from '../data/products';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Layers, 
  Phone, 
  Mail, 
  User, 
  Hash, 
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated pool of high-resolution industrial secondary images
const SECONDARY_IMAGE_POOLS: Record<string, string[]> = {
  Pneumatics: [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=900&auto=format&fit=crop',
  ],
  Hydraulics: [
    '/facilities/fast_loop_line.jpg',
    '/facilities/melting_metallurgical_lab.jpg',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=900&auto=format&fit=crop',
    '/facilities/sand_plant.jpg',
  ],
  'Electric Actuators': [
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-158109226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop',
    '/facilities/hand_moulding_section.jpg',
  ],
  default: [
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=900&auto=format&fit=crop',
  ]
};

function getProductImages(product: ProductDetailItem): string[] {
  const primary = product.imageUrl;
  const pool = SECONDARY_IMAGE_POOLS[product.category] || SECONDARY_IMAGE_POOLS.default;
  
  // Ensure we get 4 distinct secondary images
  const secondaries = pool.filter(img => img !== primary).slice(0, 4);
  while (secondaries.length < 4) {
    const fallback = SECONDARY_IMAGE_POOLS.default[secondaries.length % SECONDARY_IMAGE_POOLS.default.length];
    if (!secondaries.includes(fallback) && fallback !== primary) {
      secondaries.push(fallback);
    } else {
      secondaries.push('/facilities/fast_loop_line.jpg');
    }
  }

  return [primary, ...secondaries.slice(0, 4)];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [isExpanded, setIsExpanded] = useState(false);

  // Gallery state: index 0 is the primary, indices 1-4 are the 4 secondary images
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Enquiry Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    setSubmitted(false);
  }, [id]);

  const productImages = useMemo(() => {
    if (!product) return [];
    return getProductImages(product);
  }, [product]);

  // Word count calculator for description (500 words limit)
  const descriptionWordCount = useMemo(() => {
    const trimmed = formData.description.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [formData.description]);

  const isWordCountExceeded = descriptionWordCount > 500;

  if (!product) {
    return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-[#00A6FB] hover:underline font-semibold">
          Return to Products
        </Link>
      </main>
    );
  }

  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isWordCountExceeded) return;

    setSubmitting(true);
    // Simulate RFQ transmission & generate reference ID
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setRefNumber(`RFQ-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      quantity: '',
      description: ''
    });
  };

  return (
    <main className="bg-white min-h-screen pt-20 font-sans text-[#121212] selection:bg-[#00A6FB] selection:text-white">
      
      {/* Breadcrumb Bar */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 sm:px-8 md:px-12 py-3">
        <div className="max-w-[1920px] mx-auto flex items-center text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-[#00A6FB] transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 sm:mx-2 shrink-0 text-gray-400" />
          <Link to="/products" className="hover:text-[#00A6FB] transition-colors shrink-0">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 sm:mx-2 shrink-0 text-gray-400" />
          <Link to="/products" state={{ category: product.category }} className="text-gray-900 hover:text-[#00A6FB] transition-colors shrink-0">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 sm:mx-2 shrink-0 text-gray-400" />
          <span className="text-[#00A6FB] font-semibold truncate shrink-0">{product.title}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="py-8 sm:py-14 px-4 sm:px-8 md:px-12 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT SIDE: MAIN IMAGE + 4 SECONDARY IMAGES BELOW */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-3.5">
            
            {/* Main Featured Image Display */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={productImages[activeImageIndex]}
                  src={productImages[activeImageIndex]} 
                  alt={`${product.title} view ${activeImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </AnimatePresence>

              {/* View Index Badge */}
              <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono tracking-wider border border-white/20">
                VIEW {activeImageIndex + 1} OF {productImages.length}
              </div>

              {/* Verified OEM Badge */}
              <div className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#121212] text-[11px] font-bold tracking-tight shadow-sm border border-gray-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00A6FB]" />
                <span>100% Quality Inspected</span>
              </div>
            </div>

            {/* 4 Secondary Images Below the Main Image */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-gray-500 font-semibold px-1">
                <span>Select View ({productImages.length - 1} secondary angles)</span>
                <span className="text-[#00A6FB] font-medium">Click thumbnail to inspect</span>
              </div>

              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {productImages.slice(1, 5).map((imgUrl, idx) => {
                  const secondaryRealIndex = idx + 1;
                  const isSelected = activeImageIndex === secondaryRealIndex;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(secondaryRealIndex)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer group bg-gray-100 ${
                        isSelected 
                          ? 'border-[#00A6FB] ring-2 ring-[#00A6FB]/30 shadow-md scale-98' 
                          : 'border-gray-200 hover:border-[#00A6FB]/70 opacity-75 hover:opacity-100'
                      }`}
                      aria-label={`Select angle ${secondaryRealIndex}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`${product.title} angle ${secondaryRealIndex}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#00A6FB]/15 flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-[#00A6FB] text-white flex items-center justify-center shadow-xs">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Reset to Primary View Button if on secondary image */}
              {activeImageIndex !== 0 && (
                <div className="pt-1 text-center">
                  <button
                    onClick={() => setActiveImageIndex(0)}
                    className="text-xs font-semibold text-[#00A6FB] hover:text-[#0088cc] underline transition-colors cursor-pointer"
                  >
                    ← Return to Default Main Product Image
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: SCROLLABLE PRODUCT DETAILS & FINAL ENQUIRY CTA FORM */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            
            {/* Header: Category Badge + Title */}
            <div className="space-y-3 border-b border-gray-100 pb-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00A6FB]/10 text-[#00A6FB] border border-[#00A6FB]/25">
                  {product.category}
                </span>
                {product.subGroup && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                    {product.subGroup}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Production Run
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight leading-tight">
                {product.title}
              </h1>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Quick Jump to Enquiry */}
              <div className="pt-2">
                <a 
                  href="#enquiry-form"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs sm:text-sm font-bold tracking-tight shadow-sm shadow-[#00A6FB]/30 transition-all active:scale-95"
                >
                  <span>Inquire About This Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Key Specifications Card */}
            <div className="bg-slate-50/90 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#00A6FB]" />
                  <span>Key Specifications & Verification</span>
                </h3>
                <span className="text-[11px] font-mono text-gray-500">ISO CERTIFIED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-gray-200/70 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#00A6FB] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-gray-800 leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Accordion / Engineering Data */}
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white">
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-bold tracking-tight flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00A6FB]" />
                  <span>Engineering Tolerances & CAD Models (STEP / IGES)</span>
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[350px] opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-4 sm:p-5 bg-gray-50/70 text-gray-700 text-xs sm:text-sm leading-relaxed space-y-3">
                  <p>
                    Precision manufactured to sub-micron machine tolerances. All cylinder shafts, mountings, valve bodies, and linear assemblies undergo metallurgical hardness testing and 100% pneumatic/hydraulic hydrostatic pressure hold verification.
                  </p>
                  <p className="text-gray-500 text-xs">
                    Custom bore diameters, stroke options, seal materials (NBR, FKM, Viton), and CAD step files are made available directly to your engineering desk upon enquiry submission below.
                  </p>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* FINAL CTA: SEND ENQUIRE FORM (Name, Mail, Phone, Quantity, Description 500w) */}
            {/* ========================================================================= */}
            <div id="enquiry-form" className="rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-gray-50/50 p-6 sm:p-8 md:p-10 shadow-lg shadow-gray-200/50 space-y-6 scroll-mt-28">
              
              {/* Form Heading */}
              <div className="space-y-1.5 border-b border-gray-100 pb-5">
                <div className="flex items-center gap-2 text-[#00A6FB]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fast Turnaround RFQ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#121212] tracking-tight">
                  Send Product Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Request pricing, CAD step drawings, or sample runs for <strong className="text-gray-900">{product.title}</strong>.
                </p>
              </div>

              {/* Success Notification */}
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold">Enquiry Received Successfully!</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your enquiry for <strong>{formData.quantity} units</strong> of <em>{product.title}</em> has been routed to our application desk.
                  </p>
                  <div className="inline-block px-3.5 py-1 rounded-full bg-white text-emerald-900 font-mono text-xs font-bold border border-emerald-300">
                    REF ID: {refNumber}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Enquiry Form */
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>Your Name *</span>
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe / Company"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Mail */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        <span>Business Mail *</span>
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        required 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. john@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>Phone Number *</span>
                      </label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-gray-400" />
                        <span>Required Quantity *</span>
                      </label>
                      <input 
                        type="number" 
                        name="quantity" 
                        min="1" 
                        required 
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g. 50 units"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                  </div>

                  {/* Description (500 Words) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                        <span>Description & Specifications (up to 500 words) *</span>
                      </label>
                      <span className={`text-[11px] font-mono font-medium ${
                        isWordCountExceeded ? 'text-rose-600 font-bold' : 'text-gray-500'
                      }`}>
                        {descriptionWordCount} / 500 words
                      </span>
                    </div>

                    <textarea 
                      name="description" 
                      rows={5} 
                      required 
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Specify your application requirements, custom bore sizes, stroke configurations, preferred material grades, operating environment, or delivery timelines..."
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-2xs resize-y ${
                        isWordCountExceeded 
                          ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                          : 'border-gray-200 focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20'
                      }`}
                    />

                    {isWordCountExceeded && (
                      <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Description exceeds the 500-word limit. Please trim your text.</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting || isWordCountExceeded}
                      className="w-full py-3.5 px-6 rounded-full bg-[#00A6FB] hover:bg-[#0095e0] text-white font-bold text-sm tracking-tight transition-all duration-200 shadow-md shadow-[#00A6FB]/25 flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span>Transmitting Enquiry...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2.5">
                      Guaranteed response within 24 hours. Your details remain confidential under standard NDA.
                    </p>
                  </div>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMILAR PRODUCTS / EXPLORE RELATED */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 md:px-12 max-w-[1920px] mx-auto border-t border-gray-200 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Similar Products</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Explore related {product.category} hardware manufactured by HiTech</p>
          </div>
          <Link 
            to="/products" 
            state={{ category: product.category }}
            className="bg-[#121212] hover:bg-[#00A6FB] text-white px-4 py-2 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 rounded-full shadow-sm"
          >
            <span>View All in {product.category}</span>
            <span className="font-bold">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
          {similarProducts.map((p) => {
            const isCurrent = p.id === product.id;
            return (
              <Link 
                to={`/products/${p.id}`} 
                key={p.id} 
                className="group block"
              >
                <div className={`bg-white border rounded-2xl overflow-hidden mb-3 transition-all duration-300 ${
                  isCurrent ? 'border-[#00A6FB] shadow-md ring-2 ring-[#00A6FB]/20' : 'border-gray-200 group-hover:border-[#00A6FB] group-hover:shadow-md'
                }`}>
                  <div className="aspect-[4/3] sm:h-48 w-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img 
                      src={p.imageUrl} 
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-left">
                    <span className="text-[10px] sm:text-xs font-semibold text-[#00A6FB] uppercase tracking-wider block mb-1">
                      {p.category}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-[#00A6FB] transition-colors line-clamp-1">
                      {p.title}
                    </h5>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

    </main>
  );
}