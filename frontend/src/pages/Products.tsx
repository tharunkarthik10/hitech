import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATALOG_DATA } from '../data/products';
import { getStoredProducts } from '../data/adminStore';
import { Search, X, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function Products() {
  const location = useLocation();
  const [allProducts, setAllProducts] = useState(getStoredProducts);

  useEffect(() => {
    const refresh = () => setAllProducts(getStoredProducts());
    window.addEventListener('hitech-products-updated', refresh);
    return () => window.removeEventListener('hitech-products-updated', refresh);
  }, []);

  // Desktop & Tablet State (Previous Design)
  const [activeDepartment, setActiveDepartment] = useState<string>('Factory Automation');
  const [activeCategory, setActiveCategory] = useState<string>('Pneumatics');

  // Mobile State (Simplified Two-Filter + Card Grid Design)
  const [mobileDept, setMobileDept] = useState<string>('All');
  const [mobileCategory, setMobileCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle category passed via React Router navigation state
  useEffect(() => {
    if (location.state?.category) {
      const targetCat = location.state.category;
      setActiveCategory(targetCat);
      setMobileCategory(targetCat);

      const matchDept = CATALOG_DATA.find(d => 
        d.categories.some(c => c.name === targetCat)
      );
      if (matchDept) {
        setActiveDepartment(matchDept.name);
        setMobileDept(matchDept.name);
      }
    }
  }, [location.state]);

  // Desktop / Tablet Department toggle
  const toggleDepartment = (deptName: string) => {
    if (activeDepartment === deptName) {
      setActiveDepartment('');
    } else {
      setActiveDepartment(deptName);
      const dept = CATALOG_DATA.find(d => d.name === deptName);
      if (dept && dept.categories.length > 0) {
        setActiveCategory(dept.categories[0].name);
      }
    }
  };

  const currentDepartmentData = CATALOG_DATA.find(d => d.name === activeDepartment);
  const currentCategoryData = currentDepartmentData?.categories.find(c => c.name === activeCategory);

  // Mobile Departments list
  const departments = [
    { id: 'All', name: 'All Departments' },
    { id: 'Factory Automation', name: 'Factory Automation' },
    { id: 'Didactics (Skilling & Education)', name: 'Didactics' }
  ];

  // Mobile available categories based on selected mobile department
  const mobileAvailableCategories = useMemo(() => {
    let cats: string[] = [];
    if (mobileDept === 'All') {
      CATALOG_DATA.forEach(d => {
        d.categories.forEach(c => {
          if (!cats.includes(c.name)) cats.push(c.name);
        });
      });
    } else {
      const dept = CATALOG_DATA.find(d => d.name === mobileDept);
      if (dept) {
        cats = dept.categories.map(c => c.name);
      }
    }
    return ['All', ...cats];
  }, [mobileDept]);

  const handleMobileDeptSelect = (deptId: string) => {
    setMobileDept(deptId);
    if (deptId !== 'All') {
      const dept = CATALOG_DATA.find(d => d.name === deptId);
      if (dept && !dept.categories.some(c => c.name === mobileCategory)) {
        setMobileCategory('All');
      }
    }
  };

  // Mobile filtered products
  const mobileFilteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      if (mobileDept !== 'All' && p.department && p.department !== mobileDept) {
        return false;
      }
      if (mobileCategory !== 'All' && p.category !== mobileCategory) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSub = p.subGroup ? p.subGroup.toLowerCase().includes(query) : false;
        return matchesTitle || matchesCat || matchesSub;
      }
      return true;
    });
  }, [mobileDept, mobileCategory, searchQuery]);

  const resetMobileFilters = () => {
    setMobileDept('All');
    setMobileCategory('All');
    setSearchQuery('');
  };

  return (
    <main className="bg-white min-h-screen pt-20">
      
      {/* ======================================================== */}
      {/* 1. DESKTOP & TABLET VIEW (Previous Hierarchy & Sidebar) */}
      {/* ======================================================== */}
      <section className="hidden md:flex pt-4 pb-16 w-full max-w-[96%] 2xl:max-w-[1920px] mx-auto flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* Left Sidebar - Accordion Categories */}
        <aside className="w-full md:w-[260px] lg:w-[280px] shrink-0 sticky top-32">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden py-3">
            {CATALOG_DATA.map((dept) => {
              const DeptIcon = dept.icon;
              const isDeptActive = activeDepartment === dept.name;
              
              return (
                <div key={dept.name} className="flex flex-col">
                  {/* Department Header */}
                  <button
                    onClick={() => toggleDepartment(dept.name)}
                    className={`w-full text-left px-6 py-4 flex items-center justify-between group transition-all duration-300 ${
                      isDeptActive ? 'text-[#121212] font-bold' : 'text-[#475569] font-medium hover:text-[#121212]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <DeptIcon className={`w-5 h-5 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110 ${isDeptActive ? 'text-[#00A6FB]' : 'text-[#64748b]'}`} strokeWidth={2} />
                      <span className="text-[16px] tracking-tight font-bold">{dept.name}</span>
                    </div>
                    {isDeptActive ? (
                      <ChevronUp className="w-4 h-4 text-[#121212]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#64748b]" />
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
                                ? 'font-bold text-[#121212] bg-[#f1f5f9]'
                                : 'font-medium text-[#64748b] hover:text-[#121212] hover:bg-gray-50'
                            }`}
                          >
                            {/* Animated Left Border Indicator */}
                            <div className={`absolute left-6 top-1 bottom-1 transition-all duration-300 rounded-full ${
                              isCatActive ? 'w-1 bg-[#00A6FB] opacity-100' : 'w-0 bg-gray-200 opacity-0 group-hover:w-1 group-hover:opacity-100'
                            }`}></div>
                            
                            <CatIcon className={`w-4 h-4 transition-all duration-700 group-hover:rotate-[360deg] group-hover:scale-110 ${
                              isCatActive ? 'text-[#00A6FB]' : 'text-[#64748b] group-hover:text-[#121212]'
                            }`} strokeWidth={isCatActive ? 2 : 1.5} />
                            
                            <span className="relative z-10 tracking-tight">{cat.name}</span>
                          </button>
                        );
                      })}
                      <div className="pl-12 pr-6 py-3 mt-1">
                        <Link to="#" className="text-sm font-semibold tracking-tight text-[#00A6FB] hover:underline">
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
        <div className="w-full flex-1 bg-white px-6 pt-2 pb-8 lg:px-10 lg:pt-2 lg:pb-10">
          {currentCategoryData ? (
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#121212] tracking-tight">
                  {currentCategoryData.name}
                </h2>
                <span className="text-gray-300">|</span>
                <Link to="#" className="text-sm font-semibold tracking-tight text-[#00A6FB] hover:underline">
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
                      <h3 className="text-lg font-bold text-[#121212] tracking-tight mb-5">
                        {subGroup.name}
                      </h3>
                      <ul className="space-y-3.5">
                        {subGroup.items.map((item) => (
                          <li key={item.id}>
                            <Link 
                              to={`/products/${item.id}`} 
                              className="text-[15px] text-[#475569] hover:text-[#121212] hover:underline transition-colors block leading-relaxed"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link to="#" className="text-sm font-medium tracking-tight text-[#00A6FB] hover:underline mt-5">
                        View All
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-sm sm:text-base text-[#64748b]">More categories coming soon.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-sm sm:text-base text-[#64748b]">Please select a category to view products.</p>
            </div>
          )}
        </div>

      </section>

      {/* ======================================================== */}
      {/* 2. MOBILE VIEW (Simplified 2-Filter + 2-Col Cards)       */}
      {/* ======================================================== */}
      <section className="block md:hidden px-4 pt-4 pb-20 bg-[#fcfdfd]">
        <div className="max-w-md mx-auto">
          
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Products
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Explore precision automation components & training systems.
            </p>
            
            {/* Search */}
            <div className="relative w-full mt-3">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-8 pr-7 py-2 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Two Filters */}
          <div className="space-y-2.5 mb-5">
            {/* Filter 1: Department */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
                Dept:
              </span>
              {departments.map((dept) => {
                const isSelected = mobileDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    onClick={() => handleMobileDeptSelect(dept.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#051923] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {dept.name}
                  </button>
                );
              })}
            </div>

            {/* Filter 2: Category */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
                Cat:
              </span>
              {mobileAvailableCategories.map((cat) => {
                const isSelected = mobileCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setMobileCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'bg-white border border-gray-200 text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Count & Reset */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 px-0.5">
            <span>Showing {mobileFilteredProducts.length} items</span>
            {(mobileDept !== 'All' || mobileCategory !== 'All' || searchQuery) && (
              <button
                onClick={resetMobileFilters}
                className="text-blue-600 hover:underline font-semibold"
              >
                Reset
              </button>
            )}
          </div>

          {/* 2-Column Product Grid with Large Images */}
          {mobileFilteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {mobileFilteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-500 shadow-sm transition-all flex flex-col"
                >
                  {/* Large Product Image (Edge-to-Edge) */}
                  <div className="aspect-square w-full bg-gray-100 overflow-hidden border-b border-gray-100 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                        {product.category}
                      </span>
                      <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                    </div>

                    <div className="mt-2.5 pt-1.5 border-t border-gray-100 flex items-center justify-between text-[10px] font-semibold text-gray-500 group-hover:text-blue-600">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center my-6">
              <h3 className="text-sm font-bold text-gray-900 mb-1">No products found</h3>
              <p className="text-xs text-gray-500 mb-3">Try adjusting your filters.</p>
              <button
                onClick={resetMobileFilters}
                className="px-3.5 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}
