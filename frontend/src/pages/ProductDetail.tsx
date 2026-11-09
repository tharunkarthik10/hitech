import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import type { ProductDetailItem } from '../data/products';
import { 
  ChevronRight, 
  CheckCircle2, 
  Send, 
  Phone, 
  Mail, 
  User, 
  Hash, 
  FileText,
  AlertCircle,
  Sparkles,
  ArrowRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Curated secondary images for 4 thumbnail views
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

interface DimensionRow {
  param: string;
  dimension: string;
  notes: string;
}

// Generate realistic engineering dimensions tailored to product category
function getProductDimensions(product: ProductDetailItem): DimensionRow[] {
  const cat = (product.category || '').toLowerCase();
  const title = (product.title || '').toLowerCase();

  if (cat.includes('pneumatic') || title.includes('cylinder')) {
    return [
      { param: 'Standard Bore Diameters', dimension: 'Ø 32, 40, 50, 63, 80, 100, 125 mm', notes: 'ISO 15552 standard' },
      { param: 'Standard Stroke Range', dimension: '25 mm – 1000 mm (Custom up to 2500 mm)', notes: '±0.5 mm stroke tolerance' },
      { param: 'Piston Rod Diameter', dimension: 'Ø 12 mm – Ø 32 mm', notes: 'Hard chrome plated (f7)' },
      { param: 'Operating Pressure', dimension: '1.0 to 10.0 Bar (14.5 to 145 PSI)', notes: 'Proof test: 15.0 Bar' },
      { param: 'Port Thread Standards', dimension: 'G 1/8", G 1/4", G 3/8", G 1/2" BSPP', notes: 'Optional NPT available' },
      { param: 'Operating Temperature', dimension: '-20°C to +80°C (Standard NBR / PU)', notes: 'Viton option up to 150°C' },
    ];
  }

  if (cat.includes('hydraulic')) {
    return [
      { param: 'Cylinder Bore Range', dimension: 'Ø 40 mm to Ø 350 mm', notes: 'Honed seamless tubes (H8)' },
      { param: 'Piston Rod Diameter', dimension: 'Ø 22 mm to Ø 180 mm', notes: 'Induction hardened chrome' },
      { param: 'Stroke Capacity', dimension: 'Up to 3000 mm', notes: 'Cushioned end-caps' },
      { param: 'Working Pressure Rating', dimension: 'Up to 350 Bar (5,000 PSI)', notes: 'Hydrostatic test 500 Bar' },
      { param: 'Mounting Styles', dimension: 'Flange, Clevis, Trunnion, Foot, Lug', notes: 'ISO 6020-2 / DIN 24554' },
      { param: 'Fluid Compatibility', dimension: 'Mineral oils (HL, HLP), Glycols', notes: 'FKM / Polyurethane seals' },
    ];
  }

  if (cat.includes('actuator') || title.includes('actuator') || title.includes('linear')) {
    return [
      { param: 'Effective Stroke Length', dimension: '50 mm – 1500 mm', notes: 'Configurable in 5mm steps' },
      { param: 'Max Thrust / Payload', dimension: '500 N to 15,000 N', notes: 'Dynamic load verified' },
      { param: 'Positional Repeatability', dimension: '±0.02 mm (Ballscrew) / ±0.05 mm (Belt)', notes: 'Ground precision grade' },
      { param: 'Max Linear Velocity', dimension: 'Up to 1.2 m/s', notes: 'Application dependent' },
      { param: 'Motor Interface Flange', dimension: 'NEMA 23, 34, 42 / 60-130 mm Servo', notes: 'Direct or inline gear' },
      { param: 'Duty Cycle', dimension: '100% Continuous Industrial Duty', notes: 'IP65 enclosed casing' },
    ];
  }

  // Default Precision Engineering & CNC Parts
  return [
    { param: 'Machining Envelope', dimension: 'Up to 1500 × 800 × 750 mm', notes: '5-Axis VMC & CNC Turning' },
    { param: 'Dimensional Tolerance', dimension: '±0.005 mm (5 Microns)', notes: 'CMM verified 100%' },
    { param: 'Surface Roughness', dimension: 'Ra 0.4 µm to 1.6 µm', notes: 'Superfinished / ground' },
    { param: 'Certified Materials', dimension: 'SS304/316, EN8, EN24, Al 6061-T6, Cast Iron', notes: 'Mill test certificates' },
    { param: 'Heat & Surface Treatment', dimension: 'Nitriding, Anodizing, Induction Hardening', notes: '50-62 HRC' },
    { param: 'Batch Production Volume', dimension: '10 to 10,000+ Units / Month', notes: 'Kanban JIT dispatch' },
  ];
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);

  // Gallery: index 0 is primary, 1-4 are secondary
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Modal State for "Send Product Enquiry"
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

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
    setIsEnquiryModalOpen(false);
    setSubmitted(false);
  }, [id]);

  const productImages = useMemo(() => {
    if (!product) return [];
    return getProductImages(product);
  }, [product]);

  const dimensions = useMemo(() => {
    if (!product) return [];
    return getProductDimensions(product);
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
      <main className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-8 text-center font-sans">
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
          {/* LEFT SIDE: MAIN IMAGE + 4 SECONDARY IMAGES BELOW (CLEAN, NO OVERLAYS) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-5 lg:sticky lg:top-28 lg:self-start space-y-3.5">
            
            {/* Main Featured Image Display (Clean) */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={productImages[activeImageIndex]}
                  src={productImages[activeImageIndex]} 
                  alt={`${product.title} view ${activeImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* 4 Secondary Images Below the Main Image (Clean grid) */}
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
                        : 'border-gray-200 hover:border-[#00A6FB]/70 opacity-80 hover:opacity-100'
                    }`}
                    aria-label={`Select angle ${secondaryRealIndex}`}
                  >
                    <img 
                      src={imgUrl} 
                      alt={`${product.title} angle ${secondaryRealIndex}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

            {/* Return to Main Image Button if Secondary Selected */}
            {activeImageIndex !== 0 && (
              <div className="text-center pt-1">
                <button
                  onClick={() => setActiveImageIndex(0)}
                  className="text-xs font-semibold text-[#00A6FB] hover:underline cursor-pointer"
                >
                  ← Return to Primary Product Image
                </button>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT SIDE: PRODUCT DESCRIPTION + AVAILABLE DIMENSIONS TABLE + INQUIRE CTA */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Header: Badges + Title */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00A6FB]/10 text-[#00A6FB] border border-[#00A6FB]/25">
                  {product.category}
                </span>
                {product.subGroup && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700 border border-gray-200">
                    {product.subGroup}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight leading-tight">
                {product.title}
              </h1>

              {/* Product Description */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed pt-1">
                {product.description}
              </p>
            </div>

            {/* Simple Tabular Column: Available Dimensions & Specifications */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Available Dimensions & Technical Specifications
                </h3>
                <span className="text-[11px] font-mono text-gray-400">STANDARD & CUSTOM</span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-2xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-[#f8f9fa] border-b border-gray-200 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4 sm:px-5">Parameter</th>
                      <th className="py-3 px-4 sm:px-5">Available Dimensions / Values</th>
                      <th className="py-3 px-4 sm:px-5 hidden md:table-cell">Standard / Tolerance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {dimensions.map((row, idx) => (
                      <tr key={idx} className="hover:bg-sky-50/40 transition-colors">
                        <td className="py-3 px-4 sm:px-5 font-semibold text-gray-900 whitespace-nowrap">
                          {row.param}
                        </td>
                        <td className="py-3 px-4 sm:px-5 text-[#00A6FB] font-medium">
                          {row.dimension}
                        </td>
                        <td className="py-3 px-4 sm:px-5 text-gray-500 hidden md:table-cell">
                          {row.notes}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inquire CTA Button: Opens the Send Product Enquiry Form */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsEnquiryModalOpen(true)}
                className="px-8 py-4 rounded-full bg-[#00A6FB] hover:bg-[#0095e0] text-white font-bold text-sm sm:text-base tracking-tight shadow-md shadow-[#00A6FB]/25 transition-all duration-200 flex items-center gap-2.5 cursor-pointer active:scale-95"
              >
                <span>Inquire About This Product</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* POPUP MODAL: "SEND PRODUCT ENQUIRY" (Opens when Inquire CTA is clicked) */}
      {/* Mandatory: Name, Mail, Phone. Optional: Quantity, Description (500w) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm overflow-y-auto">
            
            {/* Backdrop click area */}
            <div 
              className="fixed inset-0" 
              onClick={() => setIsEnquiryModalOpen(false)} 
            />

            {/* Modal Dialog Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-6 sm:p-8 z-10 my-8 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEnquiryModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center text-gray-500 transition-colors cursor-pointer"
                aria-label="Close Enquiry Dialog"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Form Header */}
              <div className="space-y-1.5 border-b border-gray-100 pb-5 pr-10">
                <div className="flex items-center gap-2 text-[#00A6FB]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Fast Turnaround RFQ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#121212] tracking-tight">
                  Send Product Enquiry
                </h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  Enquiring for <strong className="text-gray-900">{product.title}</strong>
                </p>
              </div>

              {/* Submission Result / Form Body */}
              {submitted ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Enquiry Received Successfully!</h4>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your enquiry for <em>{product.title}</em> has been transmitted to our engineering team. We will get back to you shortly.
                  </p>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 font-mono text-xs font-bold border border-gray-200">
                    REF ID: {refNumber}
                  </div>
                  <div className="pt-3 flex items-center justify-center gap-3">
                    <button
                      onClick={resetForm}
                      className="px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Submit Another
                    </button>
                    <button
                      onClick={() => setIsEnquiryModalOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4 pt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Mandatory: Name */}
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Mandatory: Mail */}
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Mandatory: Phone */}
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Optional: Quantity (no star) */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-gray-400" />
                        <span>Quantity (Optional)</span>
                      </label>
                      <input 
                        type="number" 
                        name="quantity" 
                        min="1" 
                        value={formData.quantity}
                        onChange={handleInputChange}
                        placeholder="e.g. 50"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-2xs"
                      />
                    </div>

                  </div>

                  {/* Optional: Description (500 Words, no star) */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-gray-400" />
                        <span>Description (Optional, up to 500 words)</span>
                      </label>
                      <span className={`text-[11px] font-mono ${
                        isWordCountExceeded ? 'text-rose-600 font-bold' : 'text-gray-400'
                      }`}>
                        {descriptionWordCount} / 500 words
                      </span>
                    </div>

                    <textarea 
                      name="description" 
                      rows={4} 
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Specify your application requirements, custom dimensions, tolerances, or delivery timelines..."
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-2xs resize-y ${
                        isWordCountExceeded 
                          ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' 
                          : 'border-gray-200 focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20'
                      }`}
                    />

                    {isWordCountExceeded && (
                      <div className="flex items-center gap-1 text-xs text-rose-600 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Description exceeds 500 words limit.</span>
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
                          <span>Send Product Enquiry</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-gray-400 text-center mt-2.5">
                      Fast engineering response within 24 hours. Your details remain confidential under standard NDA.
                    </p>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

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