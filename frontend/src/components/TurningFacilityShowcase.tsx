import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface FacilityItem {
  id: string;
  title: string;
  statNumber: string;
  statUnit?: string;
  statLabel: string;
  imageUrl: string;
  description: string;
  specs: string[];
}

const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'fll',
    title: 'Fast Loop Line (FLL)',
    statNumber: '35',
    statUnit: 'MT/hr',
    statLabel: 'Continuous mixer output capacity with IRIS pattern recognition',
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
    statNumber: '20',
    statUnit: 'MT/hr',
    statLabel: 'Fluidized Bed Cooler classifier & thermal reclamation system',
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
    statNumber: '15',
    statUnit: 'MT/hr',
    statLabel: 'Compaction table capacity across HMS-1 & HMS-2 heavy moulding bays',
    imageUrl: '/facilities/hand_moulding_section.jpg',
    description: 'Continuous mixers with capacity of 25 Metric Tonnes per hour and 20 Metric Tonnes per hour Compaction Table : 3000 x 3000 with 15 Metric Tonnes per hour capacity in HMS-2 & 3300 x 1600 with 7 Metric Tonnes capacity at HMS-1',
    specs: [
      'Continuous mixers: 25 MT/hr & 20 MT/hr',
      'Compaction Table HMS-2: 3000 x 3000 mm (15 MT/hr capacity)',
      'Compaction Table HMS-1: 3300 x 1600 mm (7 MT/hr capacity)',
      'Engineered for heavy-tonnage complex geometry castings'
    ]
  },
  {
    id: 'mml',
    title: 'Melting & Metallurgical Lab',
    statNumber: '2500',
    statUnit: 'KW',
    statLabel: 'Dual track medium frequency melting furnace power with thermal analysis',
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

interface TurningFacilityShowcaseProps {
  openQuoteModal?: (subject: string) => void;
}

export default function TurningFacilityShowcase({ openQuoteModal }: TurningFacilityShowcaseProps) {
  // Mode: 'metrics' (Image 1 layout) vs 'facilities' (Image 2 layout)
  const [activeTab, setActiveTab] = useState<'facilities' | 'metrics'>('facilities');
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  // Toggle flip between Image 1 (Metrics Grid) and Image 2 (Facility Cards)
  const handleToggleFlip = () => {
    setIsFlipped(!isFlipped);
    setActiveTab(isFlipped ? 'facilities' : 'metrics');
  };

  const handleSelectTab = (tab: 'facilities' | 'metrics') => {
    setActiveTab(tab);
    setIsFlipped(tab === 'metrics');
  };

  return (
    <section className="relative w-full my-12 lg:my-16">
      
      {/* Tab Navigation (Matching Image 2 Reference) */}
      <div className="flex items-center w-full max-w-[560px] mb-0 bg-[#e5e5e5] rounded-t-lg overflow-hidden border border-b-0 border-gray-300">
        <button
          onClick={() => handleSelectTab('facilities')}
          className={`flex-1 py-3 px-6 text-xs sm:text-sm tracking-wider uppercase transition-all relative ${
            activeTab === 'facilities'
              ? 'bg-white text-gray-900 font-bold border-t-[3px] border-[#00A6FB] shadow-xs'
              : 'text-gray-600 hover:text-gray-900 font-medium'
          }`}
        >
          FACILITIES
        </button>
        <button
          onClick={() => handleSelectTab('metrics')}
          className={`flex-1 py-3 px-6 text-xs sm:text-sm tracking-wider uppercase transition-all relative ${
            activeTab === 'metrics'
              ? 'bg-white text-gray-900 font-bold border-t-[3px] border-[#00A6FB] shadow-xs'
              : 'text-gray-600 hover:text-gray-900 font-medium'
          }`}
        >
          CAPABILITIES & METRICS
        </button>
      </div>

      {/* Main 3D Card Turning Container */}
      <div className="w-full relative [perspective:1400px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full relative [transform-style:preserve-3d]"
        >

          {/* ========================================================================= */}
          {/* SIDE A: FACILITIES CARDS (Image 2 Exact Layout & Details)                  */}
          {/* ========================================================================= */}
          <div 
            className={`w-full bg-white border border-gray-300 rounded-b-xl lg:rounded-tr-xl p-6 sm:p-8 lg:p-10 shadow-sm ${
              isFlipped ? 'pointer-events-none invisible absolute inset-0' : 'relative visible'
            }`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Top Toolbar with Flip action button */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
              <div>
                <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  Manufacturing Plant Infrastructure
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mt-0.5">
                  High-Capacity Foundries & Heavy Precision Bays
                </h3>
              </div>

              <button
                onClick={handleToggleFlip}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-300 hover:border-gray-900 text-xs font-bold text-gray-800 hover:text-black transition-all bg-gray-50 hover:bg-white shadow-2xs group cursor-pointer"
              >
                <span>VIEW STATS</span>
                <RotateCw className="w-3.5 h-3.5 text-[#00A6FB] transition-transform group-hover:rotate-180 duration-500" />
              </button>
            </div>

            {/* 2x2 Facility Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {FACILITIES_DATA.map((fac) => (
                <div key={fac.id} className="flex flex-col sm:flex-row gap-5 items-start group">
                  {/* Photo thumbnail */}
                  <div className="w-full sm:w-48 lg:w-56 aspect-[4/3] sm:aspect-square shrink-0 rounded-lg overflow-hidden border border-gray-200 shadow-2xs bg-gray-100">
                    <img
                      src={fac.imageUrl}
                      alt={fac.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                    <div>
                      {/* Bright Blue Title Matching Services Section */}
                      <h4 className="text-lg font-bold text-[#00A6FB] tracking-tight group-hover:text-[#0084c7] transition-colors">
                        {fac.title}
                      </h4>
                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mt-2 line-clamp-4">
                        {fac.description}
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={() => setSelectedFacility(fac)}
                        className="px-4 py-1.5 border border-gray-300 hover:border-gray-900 rounded-sm text-xs font-semibold text-gray-800 hover:text-black transition-all hover:bg-gray-50 cursor-pointer shadow-2xs inline-flex items-center gap-1"
                      >
                        <span>Read More</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SIDE B: TURNING STATS PANEL (Image 1 Exact Layout & Typography)           */}
          {/* ========================================================================= */}
          <div 
            className={`w-full bg-white border border-gray-300 rounded-b-xl lg:rounded-tr-xl shadow-sm overflow-hidden ${
              !isFlipped ? 'pointer-events-none invisible absolute inset-0' : 'relative visible'
            }`}
            style={{ 
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden' 
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              
              {/* Left Column: Bold Architectural Headline & Narrative */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-between bg-white">
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#121212] uppercase leading-[1.08] mb-8">
                    FROM FIRST IDEA TO A PLACE THAT BREATHES.
                  </h2>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-sm">
                    We believe that precision engineering is measured not only in microns — but in meaning and reliability. These numbers reflect the care, consistency, and vision we bring into every project.
                  </p>

                  {/* Exact Flip Button from Image 1 */}
                  <button
                    onClick={handleToggleFlip}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#00A6FB] hover:text-[#0084c7] transition-colors shrink-0 cursor-pointer group"
                  >
                    <span>FLIP</span>
                    <RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-180 duration-500" />
                  </button>
                </div>
              </div>

              {/* Right Column: 2x2 Grid with Thin Dividing Borders */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 bg-white">
                {FACILITIES_DATA.map((fac, idx) => (
                  <div
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    className={`p-8 sm:p-10 flex flex-col justify-between hover:bg-slate-50/70 transition-colors cursor-pointer group ${
                      idx === 0 ? 'border-b border-r-0 sm:border-r border-gray-200' :
                      idx === 1 ? 'border-b border-gray-200' :
                      idx === 2 ? 'border-b sm:border-b-0 border-r-0 sm:border-r border-gray-200' : ''
                    }`}
                  >
                    <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed max-w-[200px] mb-8 group-hover:text-gray-900 transition-colors">
                      {fac.statLabel}
                    </p>

                    <div className="flex items-baseline justify-end gap-1">
                      <span className="text-5xl sm:text-6xl font-light tracking-tight text-gray-950 font-sans group-hover:scale-105 transition-transform">
                        {fac.statNumber}
                      </span>
                      {fac.statUnit && (
                        <span className="text-xs font-bold uppercase text-gray-400">
                          {fac.statUnit}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </motion.div>
      </div>

      {/* Facility Detail Modal (When clicking 'Read More') */}
      <AnimatePresence>
        {selectedFacility && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Banner */}
              <div className="w-full h-56 sm:h-64 bg-gray-900 relative overflow-hidden">
                <img
                  src={selectedFacility.imageUrl}
                  alt={selectedFacility.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div>
                    <span className="text-[11px] font-bold text-[#00A6FB] uppercase tracking-widest">
                      Facility Engineering Detail
                    </span>
                    <h3 className="text-2xl font-bold text-white tracking-tight mt-1">
                      {selectedFacility.title}
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
                    {selectedFacility.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Technical Specifications & Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedFacility.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00A6FB] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-500">
                    Key Capacity: <strong className="text-gray-900 font-bold">{selectedFacility.statNumber} {selectedFacility.statUnit}</strong>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedFacility(null)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Close
                    </button>
                    {openQuoteModal && (
                      <button
                        onClick={() => {
                          const title = selectedFacility.title;
                          setSelectedFacility(null);
                          openQuoteModal(`Facility Inquiry: ${title}`);
                        }}
                        className="px-5 py-2 rounded-lg bg-[#00A6FB] hover:bg-[#0084c7] text-white text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
                      >
                        <span>Request Specs</span>
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

