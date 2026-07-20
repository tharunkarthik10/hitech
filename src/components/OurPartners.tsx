export default function OurPartners() {
  return (
    <section className="bg-[#051923] w-full py-24 relative overflow-hidden min-h-[450px] flex items-center">
      
      {/* Left Map: India Focus */}
      <div className="absolute left-[-5%] md:left-[-2%] top-0 bottom-0 w-[50%] md:w-[40%] opacity-60 pointer-events-none overflow-hidden">
        {/* 
          Absolute positioning guarantees the top-left of this container is exactly at the center of the parent.
          By translating -70% and -45%, the point (70%, 45%) of the map (India) sits exactly in the dead center.
        */}
        <div 
          className="absolute top-1/2 left-1/2 w-[600%] aspect-[2/1]"
          style={{ transform: 'translate(-70%, -45%)' }}
        >
          {/* Dotted Mask - 100% of this inner container */}
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'url("/world-map.svg")',
              maskSize: '100% 100%',
              WebkitMaskImage: 'url("/world-map.svg")',
              WebkitMaskSize: '100% 100%',
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }}
          />
          
          {/* Network Nodes exactly mapped to India's position at (70, 45) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             {/* Network lines clustered tightly around 70, 45 */}
             <path d="M 68 43 L 69 41 L 71 44 L 70 47 L 68 43" fill="none" stroke="#00A6FB" strokeWidth="0.05" className="opacity-60"/>
             <path d="M 71 44 L 74 45 L 72 49 L 70 47" fill="none" stroke="#00A6FB" strokeWidth="0.05" className="opacity-60"/>
             <path d="M 69 41 L 73 40 L 74 45" fill="none" stroke="#00A6FB" strokeWidth="0.05" className="opacity-60"/>
             <path d="M 68 43 L 66 45 L 70 47" fill="none" stroke="#00A6FB" strokeWidth="0.05" className="opacity-60"/>
             <path d="M 72 49 L 71 52 L 70 47" fill="none" stroke="#00A6FB" strokeWidth="0.05" className="opacity-60"/>
             
             {/* Nodes */}
             <circle cx="68" cy="43" r="0.15" fill="#00A6FB" />
             <circle cx="69" cy="41" r="0.15" fill="#00A6FB" />
             <circle cx="71" cy="44" r="0.25" fill="#00A6FB" className="animate-ping opacity-60"/>
             <circle cx="71" cy="44" r="0.2" fill="#ffffff" />
             <circle cx="70" cy="47" r="0.15" fill="#00A6FB" />
             <circle cx="74" cy="45" r="0.15" fill="#00A6FB" />
             <circle cx="72" cy="49" r="0.15" fill="#00A6FB" />
             <circle cx="73" cy="40" r="0.15" fill="#00A6FB" />
             <circle cx="66" cy="45" r="0.15" fill="#00A6FB" />
             <circle cx="71" cy="52" r="0.15" fill="#00A6FB" />
          </svg>
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-white text-[32px] md:text-[44px] font-bold tracking-wide mb-6">
          Connect with HITECH
        </h2>
        <p className="text-white/80 text-[16px] md:text-[17px] max-w-2xl mb-10 leading-relaxed font-medium">
          From Product support to Exploring New Collaborations, we're here to ensure you get the right answers, quickly and reliably.
        </p>
        <button className="bg-white text-[#051923] px-10 py-3.5 rounded-[4px] text-[15px] font-bold shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
          Enquiry Now
        </button>
      </div>

      {/* Right Map: World with Arches */}
      <div className="absolute right-[-15%] md:right-[-5%] top-0 bottom-0 w-[60%] md:w-[45%] opacity-60 pointer-events-none overflow-hidden">
        
        {/* Centered at 85% width so India (70%) appears on the left half, leaving room for arches to the right */}
        <div 
          className="absolute top-1/2 left-1/2 w-[130%] aspect-[2/1]"
          style={{ transform: 'translate(-85%, -50%)' }}
        >
          {/* Dotted Mask */}
          <div 
            className="absolute inset-0"
            style={{
              maskImage: 'url("/world-map.svg")',
              maskSize: '100% 100%',
              WebkitMaskImage: 'url("/world-map.svg")',
              WebkitMaskSize: '100% 100%',
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />
          
          {/* Arched Lines mapped EXACTLY to cities from the original dataset */}
          <div className="absolute inset-0 z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               {/* India (New Delhi) is exactly at (70, 45) */}
               
               {/* To Europe (London: 48, 38) */}
               <path d="M 70 45 Q 60 20 48 38" fill="none" stroke="#00A6FB" strokeWidth="0.2" className="opacity-70" />
               <circle cx="48" cy="38" r="0.4" fill="#00A6FB" />
               
               {/* To Africa (Nairobi: 57, 60) */}
               <path d="M 70 45 Q 60 60 57 60" fill="none" stroke="#00A6FB" strokeWidth="0.2" className="opacity-70" />
               <circle cx="57" cy="60" r="0.4" fill="#00A6FB" />
               
               {/* To SE Asia (Vladivostok: 85, 35) */}
               <path d="M 70 45 Q 80 30 85 35" fill="none" stroke="#00A6FB" strokeWidth="0.2" className="opacity-70" />
               <circle cx="85" cy="35" r="0.4" fill="#00A6FB" />
               
               {/* To Australia / Oceania (Approx 85, 65) */}
               <path d="M 70 45 Q 85 55 85 65" fill="none" stroke="#00A6FB" strokeWidth="0.2" className="opacity-70" />
               <circle cx="85" cy="65" r="0.4" fill="#00A6FB" />
               
               {/* To North America (LA: 25, 45) */}
               <path d="M 70 45 Q 45 15 25 45" fill="none" stroke="#00A6FB" strokeWidth="0.2" className="opacity-70" />
               <circle cx="25" cy="45" r="0.4" fill="#00A6FB" />

               {/* Source Node (India) */}
               <circle cx="70" cy="45" r="0.8" fill="#00A6FB" className="animate-pulse" />
               <circle cx="70" cy="45" r="0.5" fill="#ffffff" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
