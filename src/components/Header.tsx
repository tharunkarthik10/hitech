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
              className={`px-6 py-2.5 rounded-xl transition-colors duration-300 ${
                activeTab === item
                  ? 'bg-[#0F1B2D] text-white'
                  : 'bg-white text-[#475569] hover:bg-gray-100'
              }`}
            >
              {item}
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
