import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATALOG_DATA } from '../data/products';
import type { CatalogDepartment, CatalogCategory } from '../data/products';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Products() {
  const location = useLocation();
  const [activeDepartment, setActiveDepartment] = useState<string>('Factory Automation');
  const [activeCategory, setActiveCategory] = useState<string>('Pneumatics');

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const currentDepartmentData = CATALOG_DATA.find(d => d.name === activeDepartment);
  const currentCategoryData = currentDepartmentData?.categories.find(c => c.name === activeCategory);

  const toggleDepartment = (deptName: string) => {
    if (activeDepartment === deptName) {
      setActiveDepartment('');
    } else {
      setActiveDepartment(deptName);
      // Auto-select first category if available
      const dept = CATALOG_DATA.find(d => d.name === deptName);
      if (dept && dept.categories.length > 0) {
        setActiveCategory(dept.categories[0].name);
      }
    }
  };

  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Main Content Layout with proper spacing matching header */}
      <section className="py-12 w-full max-w-[96%] 2xl:max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Sidebar - Accordion Categories */}
        <aside className="w-full lg:w-[280px] shrink-0 sticky top-32">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden py-3">
            {CATALOG_DATA.map((dept) => {
              const DeptIcon = dept.icon;
              const isDeptActive = activeDepartment === dept.name;
              
              return (
                <div key={dept.name} className="flex flex-col">
                  {/* Department Header */}
                  <button
                    onClick={() => toggleDepartment(dept.name)}
                    className={`w-full text-left px-6 py-4 flex items-center justify-between transition-all duration-300 ${
                      isDeptActive ? 'text-[#00A6FB] font-bold' : 'text-gray-700 font-semibold hover:text-[#00A6FB]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DeptIcon className={`w-5 h-5 ${isDeptActive ? 'text-[#00A6FB]' : 'text-gray-400'}`} strokeWidth={2} />
                      <span className="text-[16px] tracking-wide">{dept.name}</span>
                    </div>
                    {isDeptActive ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {/* Categories inside Department */}
                  {isDeptActive && dept.categories.length > 0 && (
                    <div className="flex flex-col pb-2">
                      {dept.categories.map((cat) => {
                        const CatIcon = cat.icon;
                        const isCatActive = activeCategory === cat.name;
                        
                        return (
                          <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`w-full text-left pl-12 pr-6 py-3 text-[15px] transition-all duration-300 flex items-center gap-3 relative group ${
                              isCatActive
                                ? 'font-bold text-[#003554] bg-[#f0f9ff]'
                                : 'font-medium text-gray-500 hover:text-[#003554] hover:bg-gray-50'
                            }`}
                          >
                            {/* Animated Left Border Indicator */}
                            <div className={`absolute left-6 top-1 bottom-1 transition-all duration-300 rounded-full ${
                              isCatActive ? 'w-1 bg-[#00A6FB] opacity-100' : 'w-0 bg-gray-200 opacity-0 group-hover:w-1 group-hover:opacity-100'
                            }`}></div>
                            
                            <CatIcon className={`w-4 h-4 transition-colors duration-300 ${
                              isCatActive ? 'text-[#00A6FB]' : 'text-gray-400 group-hover:text-[#003554]'
                            }`} strokeWidth={isCatActive ? 2 : 1.5} />
                            
                            <span className="relative z-10 tracking-wide">{cat.name}</span>
                          </button>
                        );
                      })}
                      <div className="pl-12 pr-6 py-3 mt-1">
                        <Link to="#" className="text-[15px] font-bold text-[#00A6FB] hover:underline">
                          View All
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* Right Content - Hierarchical List */}
        <div className="w-full flex-1 bg-white p-8 lg:p-10">
          {currentCategoryData ? (
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {currentCategoryData.name}
                </h2>
                <span className="text-gray-300">|</span>
                <Link to="#" className="text-[15px] font-bold text-[#00A6FB] hover:underline">
                  View All
                </Link>
              </div>

              {/* Grid of SubGroups */}
              {currentCategoryData.subGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12">
                  {currentCategoryData.subGroups.map((subGroup, idx) => (
                    <div 
                      key={subGroup.name} 
                      className={`flex flex-col pr-8 ${idx !== currentCategoryData.subGroups.length - 1 ? 'border-r border-gray-100' : ''}`}
                    >
                      <h3 className="text-[17px] font-bold text-gray-900 mb-6">
                        {subGroup.name}
                      </h3>
                      <ul className="space-y-4">
                        {subGroup.items.map((item) => (
                          <li key={item.id}>
                            <Link 
                              to={`/products/${item.id}`} 
                              className="text-[15px] text-gray-600 hover:text-[#00A6FB] hover:underline transition-colors block"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to="#" className="text-[14px] font-semibold text-[#00A6FB] hover:underline mt-6">
                        View All
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-500">More categories coming soon.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500">Please select a category to view products.</p>
            </div>
          )}
        </div>

      </section>
    </main>
  );
}
