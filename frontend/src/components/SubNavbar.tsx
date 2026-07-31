import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: "Production", path: "/" },
  { name: "Manufacturing", path: "/manufacturing" },
  { name: "Storage", path: "/storage" }
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
      <nav className="h-12 flex items-center justify-center px-8 md:px-12 w-full relative">
        <div className="flex items-center h-full">
          {navigation.map((item, index) => {
            const isActive = location.pathname === item.path || activeMenu === item.name;
            return (
              <div key={item.name} className="h-full flex items-center">
                <Link
                  to={item.path}
                  onMouseEnter={() => setActiveMenu(item.name)}
                  className={`h-full px-12 flex items-center text-[11px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                    isActive ? 'text-blue-900' : 'text-gray-600 hover:text-blue-900'
                  }`}
                >
                  {item.name}
                </Link>
                {index < navigation.length - 1 && (
                  <div className="h-6 w-[2px] bg-gray-300" />
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
