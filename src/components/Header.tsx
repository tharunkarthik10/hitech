import { LayoutGrid } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const mainNavigation = [
  { name: "Homepage", path: "/" },
  { name: "Products", path: "#" },
  { name: "Industries Served", path: "#" },
  { name: "About Us", path: "#" },
  { name: "Contact", path: "#contact" },
];

export default function Header() {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200 transition-all duration-300">
      {/* Top Navbar */}
      <nav className="h-20 flex items-center justify-between px-8 md:px-12 w-full relative bg-white">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-4 group z-10 w-1/4">
          <LayoutGrid className="w-6 h-6 text-black group-hover:text-blue-900 transition-colors" strokeWidth={2} />
          <img 
            src="/hitech_logo.png" 
            alt="Hitech" 
            className="h-[32px] w-auto object-contain transition-all duration-500"
          />
        </Link>

        {/* Center: Main Links */}
        <div className="hidden md:flex items-center h-full justify-center flex-1 gap-4 lg:gap-10">
          {mainNavigation.map((item) => {
            const isActive = location.pathname === item.path && item.path !== "#";
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`h-full flex items-center gap-2 text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-blue-900' : 'text-gray-900 hover:text-blue-900'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden md:flex items-center justify-end gap-6 z-10 w-1/4">
          <button className="bg-black text-white px-8 py-3 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors">
            Request Quote
          </button>
        </div>
      </nav>
    </header>
  );
}
