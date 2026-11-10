import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, RotateCw } from 'lucide-react';

interface CardItem {
  id: string;
  title: string;
  tag: string;
  statNumber?: string;
  statUnit?: string;
  imageUrl: string;
  description: string;
  specs: string[];
}

const FACILITIES_DATA: CardItem[] = [
  {
    id: 'fll',
    title: 'Fast Loop Line (FLL)',
    tag: 'Continuous Loop Bay',
    statNumber: '35',
    statUnit: 'MT/hr',
    imageUrl: '/facilities/fast_loop_line.jpg',
    description: 'Fast Loop Line is equipped with new continuous mixer with 35 Metric Tonnes per hour capacity with IRIS (Intelligent Radio Information System) pattern recognition method.',
    specs: [
      '35 Metric Tonnes per hour continuous mixer output',
      'IRIS pattern recognition method integration',
      'Automated high-speed pallet loop routing',
      'Real-time flask tracking and compaction cycle control'
    ]
  },
  {
    id: 'sp',
    title: 'Sand Plant',
    tag: 'Reclamation Unit',
    statNumber: '20',
    statUnit: 'MT/hr',
    imageUrl: '/facilities/sand_plant.jpg',
    description: 'Fluidized Bed Cooler classifier-20 Metric Tonnes per hour & thermal reclamation with a capacity of (3 Metric Tonnes per hour) are in place.',
    specs: [
      'Fluidized Bed Cooler classifier: 20 Metric Tonnes per hour',
      'Thermal sand reclamation: 3 Metric Tonnes per hour',
      'Continuous dust extraction and air particulate scrubbers',
      'Automated moisture and grain fineness indexing'
    ]
  },
  {
    id: 'hms',
    title: 'Hand Moulding Section (HMS)',
    tag: 'Heavy Moulding Line',
    statNumber: '15',
    statUnit: 'MT/hr',
    imageUrl: '/facilities/hand_moulding_section.jpg',
    description: 'Continuous mixers with capacity of 25 Metric Tonnes per hour and 20 Metric Tonnes per hour Compaction Table : 3000 x 3000 with 15 Metric Tonnes per hour capacity in HMS-2 & 3300 x 1600 with 7 Metric Tonnes capacity at HMS-1',
    specs: [
      'Continuous mixers: 25 MT/hr & 20 MT/hr capacity',
      'Compaction Table HMS-2: 3000 x 3000 mm (15 MT/hr capacity)',
      'Compaction Table HMS-1: 3300 x 1600 mm (7 MT/hr capacity)',
      'Engineered for heavy-tonnage complex geometry castings'
    ]
  },
  {
    id: 'mml',
    title: 'Melting & Metallurgical Lab',
    tag: 'Quality & Analysis',
    statNumber: '2500',
    statUnit: 'KW',
    imageUrl: '/facilities/melting_metallurgical_lab.jpg',
    description: '2500 KW Dual track Medium frequency Melting furnace with 3 Metric Tonnes and 4 Metric Tonnes crucibles. Melting is also equipped with facility of Thermal Analysis of Molten Metal.',
    specs: [
      '2500 KW Dual track Medium frequency Melting furnace',
      'Twin crucibles: 3 Metric Tonnes and 4 Metric Tonnes capacity',
      'In-situ Thermal Analysis of Molten Metal chemistry',
      'Optical emission spectrometer & metallurgical microscope station'
    ]
  }
];

const PRODUCTS_DATA: CardItem[] = [
  {
    id: 'prd-hyd',
    title: 'Heavy Hydraulic Cylinders',
    tag: 'Linear Motion Actuators',
    statNumber: '350',
    statUnit: 'Bar',
    imageUrl: 'https://motiequipments.com/assets/images/shop/grid/palette-1.jpg',
    description: 'Heavy-duty tie rod and welded hydraulic cylinders manufactured to ISO 6020-2 standards. Featuring hard chrome plated rods, induction hardened surfaces, and high-pressure polyurethane seals.',
    specs: [
      'Operating pressure up to 350 bar continuous',
      'Hard chrome plated piston rod (minimum 25 microns)',
      'Adjustable end-position hydraulic cushioning',
      '100% factory pressure & leak verification'
    ]
  },
  {
    id: 'prd-vmc',
    title: 'VMC Precision Components',
    tag: 'Sub-Micron Machining',
    statNumber: '5',
    statUnit: 'Axis CNC',
    imageUrl: 'https://motiequipments.com/assets/images/shop/grid/flex-2.jpg',
    description: 'Precision milled complex component geometries produced on high-speed vertical machining centres. Optimized for stringent aerospace, automotive, and industrial robotic assemblies.',
    specs: [
      'Tight tolerances held down to ±0.005 mm',
      'Coordinate Measuring Machine (CMM) dimensional verification',
      'Surface finish Ra 0.4 μm achievable on critical faces',
      'Custom fixtures and serial batch repeatability'
    ]
  },
  {
    id: 'prd-laser',
    title: 'CNC Laser Profiling Assemblies',
    tag: 'High-Speed Profiling',
    statNumber: '12',
    statUnit: 'kW Laser',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
    description: 'Laser cut and precision folded sheet metal enclosures, structural frames, and custom bracketry processed on state-of-the-art 12kW fiber laser systems with zero thermal distortion.',
    specs: [
      'High-speed nitrogen assist cut for oxide-free weld edges',
      'Capable of sheet thickness up to 30mm steel & aluminum',
      'Integrated CNC press brake multi-axis bending',
      'Direct CAD/CAM nesting for minimal material waste'
    ]
  },
  {
    id: 'prd-cast',
    title: 'Cast Alloy Tooling & Housings',
    tag: 'Foundry Castings',
    statNumber: '100',
    statUnit: '% FAT',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Ductile iron and alloy castings produced in our high-capacity continuous mixer and hand moulding bays. Stress-relieved, finish-machined, and spectrographically verified.',
    specs: [
      'Castings up to 4 Metric Tonnes single pour capacity',
      'Full grain structure & tensile strength lab certificates',
      'Pre-machined and finish-ground mounting surfaces',
      'Complete ultrasonic non-destructive testing (NDT)'
    ]
  }
];

interface TurningFacilityShowcaseProps {
  openQuoteModal?: (subject: string) => void;
}

export default function TurningFacilityShowcase({ openQuoteModal }: TurningFacilityShowcaseProps) {
  // Tabs: 'facilities' vs 'products'
  const [activeTab, setActiveTab] = useState<'facilities' | 'products'>('facilities');

  // Track flipped status for each card (click/tap to flip)
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null);

  const currentData = activeTab === 'facilities' ? FACILITIES_DATA : PRODUCTS_DATA;

  const toggleCardFlip = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative w-full my-12 lg:my-16">
      
      {/* Top Header & Tabs Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Two Tabs at Top: FACILITIES and PRODUCTS */}
        <div className="flex items-center w-full max-w-[460px] bg-[#e5e5e5] rounded-t-lg overflow-hidden border border-b-0 border-gray-300">
          <button
            onClick={() => {
              setActiveTab('facilities');
              setFlippedCards({});
            }}
            className={`flex-1 py-3 px-6 text-xs sm:text-sm tracking-wider uppercase transition-all relative ${
              activeTab === 'facilities'
                ? 'bg-white text-gray-900 font-bold border-t-[3px] border-[#00A6FB] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 font-medium'
            }`}
          >
            FACILITIES
          </button>
          <button
            onClick={() => {
              setActiveTab('products');
              setFlippedCards({});
            }}
            className={`flex-1 py-3 px-6 text-xs sm:text-sm tracking-wider uppercase transition-all relative ${
              activeTab === 'products'
                ? 'bg-white text-gray-900 font-bold border-t-[3px] border-[#00A6FB] shadow-xs'
                : 'text-gray-600 hover:text-gray-900 font-medium'
            }`}
          >
            PRODUCTS
          </button>
        </div>
      </div>

      {/* 4 Individual Facility/Product 3D Flip Cards Grid (2x2 on Desktop, 1-col on Mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {currentData.map((item) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleCardFlip(item.id)}
              className={`flip-card-container relative w-full h-[390px] sm:h-[340px] cursor-pointer group ${
                isFlipped ? 'flipped' : ''
              }`}
            >
              <div className="flip-card-inner">
                {/* ========================================================= */}
                {/* CARD FRONT: PHOTO, BRIGHT BLUE TITLE & QUICK DETAILS      */}
                {/* ========================================================= */}
                <div className="flip-card-front absolute inset-0 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs hover:border-[#00A6FB] hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row h-full">
                    {/* Thumbnail Image */}
                    <div className="w-full sm:w-[45%] h-44 sm:h-full relative overflow-hidden bg-gray-100 shrink-0 border-b sm:border-b-0 sm:border-r border-gray-100">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                        {item.tag}
                      </div>
                    </div>

                    {/* Front Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Bright Blue Title */}
                        <h4 className="text-base sm:text-lg font-bold text-[#00A6FB] group-hover:text-[#0084c7] transition-colors leading-snug">
                          {item.title}
                        </h4>
                        
                        <p className="text-xs text-gray-600 line-clamp-3 mt-2 leading-relaxed">
                          {item.description}
                        </p>

                        {/* Quick Specs preview */}
                        <ul className="mt-3 space-y-1.5 hidden sm:block">
                          {item.specs.slice(0, 2).map((spec, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00A6FB] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Bottom Footer on Front */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mt-3 sm:mt-0">
                        {item.statNumber ? (
                          <span className="font-semibold text-gray-500">
                            Cap: <strong className="text-gray-900 font-bold">{item.statNumber} {item.statUnit}</strong>
                          </span>
                        ) : <span />}

                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00A6FB] group-hover:text-[#0084c7] transition-colors ml-auto">
                          <span>View Specs</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* CARD BACK: 3D REVERSED FULL SPECS & DETAILS              */}
                {/* ========================================================= */}
                <div className="flip-card-back bg-white border-2 border-[#00A6FB]/60 rounded-xl overflow-hidden shadow-md p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    {/* Header on Back */}
                    <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-gray-100">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                          Full Specifications
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-[#00A6FB] leading-snug">
                          {item.title}
                        </h4>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => toggleCardFlip(item.id, e)}
                        className="p-1.5 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                        title="Flip back"
                        aria-label="Flip back"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Detailed Description */}
                    <p className="text-xs text-gray-700 leading-relaxed mt-3 line-clamp-2 sm:line-clamp-3">
                      {item.description}
                    </p>

                    {/* Bullet Specs */}
                    <ul className="mt-3 space-y-1.5">
                      {item.specs.slice(0, 4).map((spec, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00A6FB] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions on Back */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                    {item.statNumber ? (
                      <span className="font-semibold text-xs text-gray-500">
                        Cap: <strong className="text-gray-900 font-bold">{item.statNumber} {item.statUnit}</strong>
                      </span>
                    ) : <span />}

                    <div className="flex items-center gap-2 ml-auto">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#00A6FB] hover:bg-[#0084c7] text-white text-xs font-bold transition-colors shadow-xs inline-flex items-center gap-1.5"
                      >
                        <span>View Full Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal (When clicking 'Read More' on back of any card) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Banner */}
              <div className="w-full h-56 sm:h-64 bg-gray-900 relative overflow-hidden">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#00A6FB] uppercase tracking-widest">
                      {activeTab === 'facilities' ? 'Facility Infrastructure Detail' : 'Precision Product Specification'}
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                      {selectedItem.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Overview
                  </h4>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Technical Specifications & Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedItem.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00A6FB] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-gray-500">
                    {selectedItem.statNumber && (
                      <>Rating: <strong className="text-gray-900 font-bold">{selectedItem.statNumber} {selectedItem.statUnit}</strong></>
                    )}
                  </div>

                  <div className="flex items-center justify-end gap-3 ml-auto">
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Close
                    </button>
                    {openQuoteModal && (
                      <button
                        onClick={() => {
                          const title = selectedItem.title;
                          setSelectedItem(null);
                          openQuoteModal(`Inquiry: ${title}`);
                        }}
                        className="px-5 py-2 rounded-lg bg-[#00A6FB] hover:bg-[#0084c7] text-white text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
                      >
                        <span>Request Quote / Specs</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
