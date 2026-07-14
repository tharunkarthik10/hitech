import { useState } from 'react';

export default function QualityFeatures() {
  const [activeCert, setActiveCert] = useState<string | null>(null);

  return (
    <>
      {/* Quality Commitment Redesign */}
      <section className="bg-[#F1F5F9] py-20 relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col gap-6 mb-16 max-w-3xl">
            <div className="space-y-4">
              <h2 className="font-headline-xl text-[36px] md:text-[48px] text-on-surface uppercase tracking-wide font-bold leading-tight">
                Quality Comes First<span className="text-[#0F1B2D]">.</span>
              </h2>
            </div>
            <p className="font-body-md text-[#4a4a4a] text-[16px] md:text-[20px] leading-relaxed">
              We have a team with highly skilled techinicians whom seems to exhibit the highest efficiency when it comes to manufacturing and production. They have a profilic experience in the field of engineering and technology whom are capable of solving complex problems with ease.
            </p>
          </div>

          {/* Certificates Stack */}
          <div className="w-full flex flex-col gap-6">
            
            {/* Cert 1 */}
            <div 
              className="bg-white rounded-[16px] p-8 md:p-10 shadow-xl border border-black/5 hover:-translate-y-1 hover:shadow-2xl hover:border-[#1E3A8A]/50 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all duration-300"
              onClick={() => setActiveCert('/assets/images/certs/cer2.jpg')}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-[#1E3A8A] font-light">workspace_premium</span>
                  <h3 className="text-2xl md:text-3xl font-headline-xl font-bold text-[#0F1B2D] tracking-tight group-hover:text-[#1E3A8A] transition-colors">Global QMS</h3>
                </div>
                <p className="text-[17px] text-[#475569] leading-relaxed">
                  Certified Quality Management System for design, manufacturing, and technical services ensuring consistent excellence across all our global operations. This certification validates our commitment to continuous improvement, stringent quality control, and strict adherence to international manufacturing standards. Our facility undergoes rigorous annual audits to maintain this prestigious credential.
                </p>
              </div>
              <div className="hidden md:flex w-16 h-16 shrink-0 rounded-full bg-[#f1f5f9] group-hover:bg-[#1E3A8A]/10 items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[#475569] group-hover:text-[#1E3A8A]">arrow_outward</span>
              </div>
              {/* Mobile View Button */}
              <div className="md:hidden flex items-center gap-2 text-[#1E3A8A] font-bold font-label-caps uppercase text-sm mt-2">
                <span className="material-symbols-outlined text-lg">arrow_outward</span> View Certificate
              </div>
            </div>

            {/* Cert 2 */}
            <div 
              className="bg-white rounded-[16px] p-8 md:p-10 shadow-xl border border-black/5 hover:-translate-y-1 hover:shadow-2xl hover:border-[#1E3A8A]/50 cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all duration-300"
              onClick={() => setActiveCert('/assets/images/certs/cer1.jpg')}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-[#1E3A8A] font-light">military_tech</span>
                  <h3 className="text-2xl md:text-3xl font-headline-xl font-bold text-[#0F1B2D] tracking-tight group-hover:text-[#1E3A8A] transition-colors">Supply Excellence</h3>
                </div>
                <p className="text-[17px] text-[#475569] leading-relaxed">
                  Recognized for consistent 100% on-time delivery and zero-defect performance by leading OEMs, demonstrating our commitment to reliable partnerships. We have been awarded the 'Best Supplier' accolade for three consecutive years, reflecting our robust supply chain management, advanced logistical planning, and unwavering dedication to exceeding client expectations in every project phase.
                </p>
              </div>
              <div className="hidden md:flex w-16 h-16 shrink-0 rounded-full bg-[#f1f5f9] group-hover:bg-[#1E3A8A]/10 items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[#475569] group-hover:text-[#1E3A8A]">arrow_outward</span>
              </div>
              {/* Mobile View Button */}
              <div className="md:hidden flex items-center gap-2 text-[#1E3A8A] font-bold font-label-caps uppercase text-sm mt-2">
                <span className="material-symbols-outlined text-lg">arrow_outward</span> View Certificate
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features (Fictiv Style Testimonial converted to Massive Box) */}
      <section className="bg-stark-white py-8 md:py-16 font-body-md">
        {/* Massive Box Wrapper */}
        <div className="relative w-full bg-gradient-to-br from-[#0F1B2D] to-[#1E3A8A] shadow-2xl overflow-hidden">
          
          {/* Solid Background (Blobs removed to match the bright blue style) */}
          <div className="absolute inset-0 z-0 pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side: Quote */}
            <div className="px-8 md:px-16 lg:px-20 py-8 md:py-10 flex flex-col justify-center relative z-10">
              {/* Stars */}
              <div className="flex gap-2 mb-8 text-[#1E3A8A]">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              
              {/* Quote */}
              <h2 className="font-headline-xl text-xl md:text-[24px] leading-[1.4] text-white font-medium mb-6 drop-shadow-sm">
                “The difference that Hitech offers is that tight turnaround time. I have a concept in my head, discuss it with the team, and I get the machinery days later. I don't think there's anything faster available.”
              </h2>
              
              {/* Author */}
              <div>
                <p className="text-white font-bold text-xl mb-1 font-body-lg">Mr. Suresh</p>
                <p className="text-[#1E3A8A] font-medium text-base font-body-md">Founder, Hitech Engineering Works</p>
              </div>
            </div>
            
            {/* Right Side: Person Image & Background */}
            <div className="relative min-h-[250px] lg:min-h-[300px] flex items-end justify-center overflow-hidden bg-black/10">
               
               {/* Large Background Typography */}
               <div className="absolute inset-0 flex flex-col justify-between py-6 select-none overflow-hidden opacity-[0.04] pointer-events-none">
                 <span className="font-headline-xl text-[80px] md:text-[90px] leading-none text-white font-black tracking-tighter ml-4">HITECH</span>
                 <span className="font-headline-xl text-[80px] md:text-[90px] leading-none text-white font-black tracking-tighter text-right mr-4 outline-text">ENGINEERING</span>
                 <span className="font-headline-xl text-[80px] md:text-[90px] leading-none text-white font-black tracking-tighter ml-4">HITECH</span>
               </div>
               
               {/* Uploaded Person Image */}
               <img 
                 src="/new_person_transparent.png" 
                 alt="Testimonial Author" 
                 className="relative z-10 w-[75%] max-w-[300px] object-contain object-bottom drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-12 lg:mt-0 lg:max-h-[340px]"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {activeCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1B2D]/90 backdrop-blur-sm transition-opacity" 
          onClick={() => setActiveCert(null)}
        >
          <div className="relative max-w-4xl w-full flex items-center justify-center animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-16 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2" 
              onClick={() => setActiveCert(null)}
            >
              <span className="font-label-caps tracking-widest text-sm font-bold uppercase">Close</span>
              <span className="material-symbols-outlined text-[32px]">cancel</span>
            </button>
            <img 
              src={activeCert} 
              alt="Certificate Fullscreen" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            />
          </div>
        </div>
      )}
    </>
  );
}
