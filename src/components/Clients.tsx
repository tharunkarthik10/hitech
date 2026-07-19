export default function Clients() {
  const logos = [
    "/Screenshot 2026-06-26 at 21.25.49.png",
    "/Screenshot 2026-06-26 at 21.26.08.png",
    "/Screenshot 2026-06-26 at 21.26.14.png",
    "/Screenshot 2026-06-26 at 21.26.19.png",
    "/Screenshot 2026-06-26 at 21.26.23.png",
    "/Screenshot 2026-06-26 at 21.26.30.png",
    "/Screenshot 2026-06-26 at 21.26.34.png",
    "/Screenshot 2026-06-26 at 21.26.38.png",
    "/Screenshot 2026-06-26 at 21.26.42.png",
    "/Screenshot 2026-06-26 at 21.26.46.png",
    "/Screenshot 2026-06-26 at 21.26.50.png"
  ];

  // Duplicate the array to create a seamless infinite scrolling effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="bg-stark-white pt-10 pb-16 border-t border-outline-variant overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter relative flex flex-col items-center">
        <div className="text-center mb-16 z-10 relative bg-stark-white px-8 py-4">
          <p className="font-label-caps text-[14px] text-on-surface-variant">They Always Trust Us</p>
          <h3 className="font-headline-lg text-[32px] text-on-surface mt-1">
            OUR CLIENTS<span className="text-[#003554]">.</span>
          </h3>
        </div>
      </div>
        
      <style>
        {`
          @keyframes marquee-horizontal {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-horizontal {
            animation: marquee-horizontal 35s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee-horizontal:hover {
            animation-play-state: paused;
          }
          .client-logo-wrapper {
            display: flex;
            align-items: center;
            padding: 0 2.8rem;
            position: relative;
          }
          .client-logo-wrapper::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 40px;
            width: 1px;
            background-color: #e5e7eb;
          }
        `}
      </style>

      <div className="w-full overflow-hidden pt-4 pb-8">
        <div className="animate-marquee-horizontal items-center">
          {duplicatedLogos.map((logo, index) => (
            <div key={index} className="client-logo-wrapper">
              <img
                src={logo}
                alt={`Client ${index + 1}`}
                className="h-20 md:h-24 w-auto object-contain transition-all duration-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
