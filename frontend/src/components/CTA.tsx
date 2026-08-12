import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 px-8 md:px-12 bg-[#051923] relative overflow-hidden text-white w-full">
      {/* Abstract animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#00A6FB]/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#00A6FB]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#051923] via-transparent to-transparent opacity-80 pointer-events-none z-0"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#00A6FB] animate-pulse"></span>
            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Available for New Projects</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline-xl leading-[1.1] tracking-tight mb-6">
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A6FB] to-white">Elevate</span> Your Manufacturing?
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Partner with HiTech Engineering to bring your concepts to reality with unparalleled precision, scale, and uncompromising quality. Let's build the future together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-[#00A6FB] hover:bg-white text-white hover:text-[#051923] font-bold rounded-xl transition-all duration-500 shadow-[0_0_30px_rgba(0,166,251,0.2)] hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3 w-full sm:w-auto overflow-hidden">
              <span className="relative z-10 text-[15px] tracking-wider">START YOUR PROJECT</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </button>
            
            <button className="group px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white hover:bg-white/5 text-white font-bold rounded-xl transition-all duration-300 text-[15px] tracking-wider w-full sm:w-auto flex items-center justify-center gap-2">
              CONTACT ENGINEERING
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
