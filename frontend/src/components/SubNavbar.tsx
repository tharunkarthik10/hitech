import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: "Production", path: "/production" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Laser Cutting", path: "/laser-cutting" }
];

export default function SubNavbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide if scrolling down past 50px. Show if scrolling up.
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 bg-[#f8f9fa] z-40 border-b border-gray-200 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isVisible ? 'translate-y-20' : 'translate-y-8'
      }`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <nav className="h-11 sm:h-12 w-full max-w-[1920px] mx-auto px-2 sm:px-6 md:px-8 lg:px-12 flex items-center overflow-x-auto no-scrollbar">
        <div className="flex items-center h-full mx-auto min-w-max">
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.name} className="h-full flex items-center shrink-0">
                <Link
                  to={item.path}
                  onMouseEnter={() => setActiveMenu(item.name)}
                  className={`px-3.5 sm:px-5 py-1.5 rounded-full flex items-center text-[10.5px] sm:text-[11px] font-bold tracking-[0.14em] sm:tracking-[0.2em] md:tracking-[0.25em] uppercase whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#00A6FB] text-white shadow-xs' 
                      : 'text-gray-600 hover:text-[#00A6FB] hover:bg-white/80'
                  }`}
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && (
                  <div className="h-4 sm:h-5 w-[1.5px] bg-gray-300 shrink-0 mx-2 sm:mx-3" />
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
