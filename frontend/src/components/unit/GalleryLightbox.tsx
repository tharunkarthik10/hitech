import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import type { GalleryItem } from '../../data/unitsData';

interface GalleryLightboxProps {
  selectedItem: GalleryItem | null;
  onClose: () => void;
  accentHex?: string;
}

export default function GalleryLightbox({ selectedItem, onClose, accentHex = '#2563EB' }: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedItem, onClose]);

  return (
    <AnimatePresence>
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-950/50">
              <div className="flex items-center gap-3">
                <span 
                  className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                  style={{ backgroundColor: accentHex }}
                >
                  {selectedItem.category}
                </span>
                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider hidden sm:inline-block">
                  Hitech Snapshot
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] bg-slate-950 overflow-hidden flex items-center justify-center">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80 pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {selectedItem.title}
                </h3>
                <p className="text-slate-300 text-sm flex items-center gap-2">
                  <ZoomIn className="w-4 h-4 text-slate-400" /> High-precision result produced at HiTech Engineering Facility
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Click outside or press <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 border border-slate-700 rounded text-slate-300">ESC</kbd> to exit preview
              </span>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:underline"
                style={{ color: accentHex }}
              >
                Inquire about this part <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
