import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ChevronRight, Phone, Send } from 'lucide-react';

const mainNavigation = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Career", path: "/career" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200 transition-all duration-300">
      {/* Top Navbar */}
      <nav className="h-20 flex items-center justify-between w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative bg-white">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-4 group z-10">
          <img 
            src="/Remove background project - July 20, 2026 at 11.47.52.png" 
            alt="Hitech" 
            className="h-20 w-auto object-contain scale-125 origin-left translate-y-1 transition-all duration-500"
          />
        </Link>

        {/* Center: Main Links (Desktop) */}
        <div className="hidden md:flex items-center h-full justify-center flex-1 gap-4 lg:gap-10">
          {mainNavigation.filter(item => item.name !== "Career").map((item) => {
            const isActive = item.path !== "#" && (
              location.pathname === item.path || 
              (item.path !== "/" && location.pathname.startsWith(`${item.path}/`))
            );
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative h-full flex items-center justify-center gap-2 text-[12px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${
                  isActive ? 'text-blue-900' : 'text-gray-900 hover:text-blue-900'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-900" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Desktop: CTA */}
        <div className="hidden md:flex items-center justify-end gap-6 z-10">
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-full bg-[#121212] hover:bg-black text-white text-xs font-semibold tracking-tight transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Right Mobile: Three Rows of Small Lines (Hamburger Menu Button) */}
        <div className="md:hidden flex items-center z-20">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center w-11 h-11 rounded-xl bg-gray-50 hover:bg-gray-100 text-[#121212] border border-gray-200 transition-all cursor-pointer active:scale-95"
            aria-label="Toggle Mobile Navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#121212]" />
            ) : (
              <div className="space-y-1 w-5 flex flex-col items-center">
                <span className="block w-5 h-[2px] bg-[#121212] rounded-full transition-transform"></span>
                <span className="block w-5 h-[2px] bg-[#121212] rounded-full transition-transform"></span>
                <span className="block w-5 h-[2px] bg-[#121212] rounded-full transition-transform"></span>
              </div>
            )}
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* Mobile Popup Navigation Modal */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Popup Dialog Sheet */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-h-[90vh] bg-white rounded-b-3xl shadow-2xl border-b border-gray-200 flex flex-col overflow-hidden"
            >
              {/* Sheet Header */}
              <div className="h-20 flex items-center justify-between px-5 border-b border-gray-100 bg-white">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img 
                    src="/Remove background project - July 20, 2026 at 11.47.52.png" 
                    alt="Hitech" 
                    className="h-16 w-auto object-contain scale-110 origin-left"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Navigation Links */}
              <div className="overflow-y-auto px-5 py-6 space-y-6 max-h-[calc(90vh-160px)]">
                {/* Main Pages */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-3">
                    Explore Pages
                  </span>
                  <div className="space-y-1">
                    {mainNavigation.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-bold tracking-tight transition-all ${
                            isActive
                              ? "bg-blue-50 text-blue-900 border-l-4 border-blue-900"
                              : "text-[#121212] hover:bg-gray-50"
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-blue-900' : 'text-gray-400'}`} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Contact Bar */}
              <div className="p-4 bg-gray-50 border-t border-gray-100">
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#121212] hover:bg-black text-white font-semibold text-sm tracking-tight flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <Send className="w-4 h-4" />
                  <span>Request a Fast Quote</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
