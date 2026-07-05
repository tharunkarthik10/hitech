import { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

export default function Header() {
  const [activeTab, setActiveTab] = useState('HOME');

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-6rem)] max-w-none bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50 transition-all duration-300 border border-gray-100">
      <nav className="flex justify-between items-center px-gutter py-3">
        {/* Left: Logo Area */}
        <a href="/" className="flex items-center gap-4">
          <LayoutGrid className="w-6 h-6 text-[#475569]" strokeWidth={1.5} />
          <img 
            src="/hitech_logo.png" 
            alt="Hitech" 
            className="h-[40px] w-auto max-w-none flex-shrink-0 object-contain drop-shadow-sm brightness-105"
          />
        </a>

        {/* Middle: Nav Links (White by default, Black when active) */}
        <div className="hidden md:flex items-center gap-2 text-[13px] font-semibold tracking-wide">
          {['HOME', 'ABOUT', 'PRODUCTS', 'CONTACT'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item);
              }}
              className={`px-6 py-2.5 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                activeTab === item
                  ? 'bg-[#0F1B2D] text-white shadow-md'
                  : 'bg-white text-[#475569] hover:bg-gray-50 hover:shadow-sm'
              }`}
            >
              <span className="relative block overflow-hidden">
                {/* Default Text (Slides down and fades out) */}
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-[120%] group-hover:opacity-0">
                  {item}
                </span>
                
                {/* Hover Text (Slides down from top and fades in with a sleek gradient) */}
                <span className="absolute inset-0 flex items-center justify-center -translate-y-[120%] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 group-hover:opacity-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-bold">
                  {item}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* Right: CTA Button */}
        <button className="hidden md:block rounded-xl border-2 border-[#00C2CB] bg-white text-[#0F1B2D] px-7 py-2.5 text-sm font-semibold hover:bg-slate-50 transition-colors">
          Request Quote
        </button>
      </nav>
    </header>
  );
}
