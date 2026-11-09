import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CATALOG_DATA, PRODUCTS, type ProductDetailItem } from '../data/products';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  ArrowUpRight, 
  SlidersHorizontal,
  CheckCircle2, 
  Send,
  PhoneCall,
  Sparkles,
  Layers,
  Factory,
  GraduationCap
} from 'lucide-react';

export default function Products() {
  const location = useLocation();

  // Filters state
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubGroup, setSelectedSubGroup] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Desktop sidebar accordion toggle
  const [openSidebarDept, setOpenSidebarDept] = useState<string>('Factory Automation');

  // Quote Modal state
  const [quoteProduct, setQuoteProduct] = useState<ProductDetailItem | null>(null);
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '', quantity: '1', notes: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);

  // Sync category if navigated from elsewhere with state
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      setSelectedSubGroup('All');
      // Set matching department
      const matchDept = CATALOG_DATA.find(d => d.categories.some(c => c.name === location.state.category));
      if (matchDept) {
        setSelectedDept(matchDept.name);
        setOpenSidebarDept(matchDept.name);
      }
    }
  }, [location.state]);

  // All categories list across departments
  const allCategories = useMemo(() => {
    const cats: { name: string; icon: any; department: string; count: number }[] = [];
    CATALOG_DATA.forEach(dept => {
      dept.categories.forEach(cat => {
        const count = PRODUCTS.filter(p => p.category === cat.name).length;
        cats.push({
          name: cat.name,
          icon: cat.icon,
          department: dept.name,
          count
        });
      });
    });
    return cats;
  }, []);

  // Filtered categories based on selected department
  const visibleCategories = useMemo(() => {
    if (selectedDept === 'All') return allCategories;
    return allCategories.filter(c => c.department === selectedDept);
  }, [selectedDept, allCategories]);

  // Subgroups for active category
  const availableSubGroups = useMemo(() => {
    if (selectedCategory === 'All') return [];
    for (const dept of CATALOG_DATA) {
      const cat = dept.categories.find(c => c.name === selectedCategory);
      if (cat) {
        return cat.subGroups;
      }
    }
    return [];
  }, [selectedCategory]);

  // Filter products by department, category, subgroup, and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Department match
      if (selectedDept !== 'All' && p.department && p.department !== selectedDept) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Subgroup match
      if (selectedSubGroup !== 'All' && p.subGroup !== selectedSubGroup) {
        return false;
      }
      // Search query match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSub = p.subGroup ? p.subGroup.toLowerCase().includes(query) : false;
        const matchesDesc = p.description.toLowerCase().includes(query);
        return matchesTitle || matchesCat || matchesSub || matchesDesc;
      }
      return true;
    });
  }, [selectedDept, selectedCategory, selectedSubGroup, searchQuery]);

  const handleSelectCategory = (catName: string) => {
    if (selectedCategory === catName) {
      setSelectedCategory('All');
      setSelectedSubGroup('All');
    } else {
      setSelectedCategory(catName);
      setSelectedSubGroup('All');
      // If department doesn't match this category, auto-align department
      const match = allCategories.find(c => c.name === catName);
      if (match && selectedDept !== 'All' && selectedDept !== match.department) {
        setSelectedDept(match.department);
      }
    }
  };

  const handleSelectDept = (deptName: string) => {
    setSelectedDept(deptName);
    setSelectedSubGroup('All');
    // If selected category is not in this department, reset category to All
    if (deptName !== 'All') {
      const catMatch = visibleCategories.find(c => c.department === deptName && c.name === selectedCategory);
      if (!catMatch) {
        setSelectedCategory('All');
      }
      setOpenSidebarDept(deptName);
    }
  };

  const handleResetFilters = () => {
    setSelectedDept('All');
    setSelectedCategory('All');
    setSelectedSubGroup('All');
    setSearchQuery('');
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setQuoteSubmitted(false);
      setQuoteProduct(null);
      setQuoteForm({ name: '', email: '', phone: '', quantity: '1', notes: '' });
    }, 2200);
  };

  return (
    <main className="bg-[#fcfdfd] min-h-screen pt-20 pb-24 text-[#0f172a]">
      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-white via-slate-50/60 to-transparent border-b border-slate-200/80 pt-8 pb-8 px-4 sm:px-6 md:px-10 lg:px-12">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto">
          {/* Breadcrumb & Tag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Precision Industrial Hardware</span>
            </div>
            <div className="text-xs sm:text-sm font-medium text-slate-500">
              Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {PRODUCTS.length} Components
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#051923] tracking-tight leading-tight">
                Product Catalog
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Explore our full line of industrial factory automation, high-end pneumatic actuators, directional control valves, and didactic training workstations.
              </p>
            </div>

            {/* Live Search Bar */}
            <div className="w-full lg:w-96 relative">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, models, specs..."
                  className="w-full pl-10 pr-9 py-2.5 sm:py-3 text-sm bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Department Filter Tabs (Mobile & Desktop) */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => handleSelectDept('All')}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                selectedDept === 'All'
                  ? 'bg-[#051923] text-white border-[#051923] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Departments ({PRODUCTS.length})
            </button>
            {CATALOG_DATA.map((dept) => {
              const DeptIcon = dept.icon;
              const isSelected = selectedDept === dept.name;
              const deptCount = PRODUCTS.filter(p => p.department === dept.name).length;
              return (
                <button
                  key={dept.name}
                  onClick={() => handleSelectDept(dept.name)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#051923] text-white border-[#051923] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <DeptIcon className="w-3.5 h-3.5" />
                  <span>{dept.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {deptCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Category Carousel (Mobile & Desktop quick pills) */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => { setSelectedCategory('All'); setSelectedSubGroup('All'); }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === 'All'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-transparent hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
            {visibleCategories.map((cat) => {
              const CatIcon = cat.icon;
              const isCatActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                    isCatActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <CatIcon className={`w-3.5 h-3.5 ${isCatActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isCatActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SubGroup Pills (if category is active and has subgroups) */}
          {selectedCategory !== 'All' && availableSubGroups.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
                <SlidersHorizontal className="w-3 h-3" /> Sub-group:
              </span>
              <button
                onClick={() => setSelectedSubGroup('All')}
                className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  selectedSubGroup === 'All'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All in {selectedCategory}
              </button>
              {availableSubGroups.map((sg) => {
                const isSgActive = selectedSubGroup === sg.name;
                return (
                  <button
                    key={sg.name}
                    onClick={() => setSelectedSubGroup(sg.name)}
                    className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                      isSgActive
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {sg.name} ({sg.items.length})
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="pt-6 sm:pt-8 w-full max-w-[96%] 2xl:max-w-[1920px] mx-auto flex flex-col lg:flex-row gap-8 items-start px-4 sm:px-6 md:px-10 lg:px-12">
        
        {/* Left Sidebar - Desktop Navigation Accordion */}
        <aside className="hidden lg:block w-[280px] shrink-0 sticky top-28">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-3 space-y-1">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Categories</span>
              {(selectedCategory !== 'All' || selectedDept !== 'All' || selectedSubGroup !== 'All') && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {CATALOG_DATA.map((dept) => {
              const DeptIcon = dept.icon;
              const isDeptOpen = openSidebarDept === dept.name;
              const isDeptSelected = selectedDept === dept.name;

              return (
                <div key={dept.name} className="flex flex-col">
                  {/* Department Header */}
                  <button
                    onClick={() => {
                      setOpenSidebarDept(isDeptOpen ? '' : dept.name);
                      handleSelectDept(dept.name);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl flex items-center justify-between group transition-all ${
                      isDeptSelected
                        ? 'bg-slate-100/90 text-slate-900 font-bold'
                        : 'text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <DeptIcon className={`w-4 h-4 ${isDeptSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span className="text-sm tracking-tight">{dept.name}</span>
                    </div>
                    {isDeptOpen ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  {/* Categories inside Department */}
                  {isDeptOpen && dept.categories.length > 0 && (
                    <div className="pl-4 pr-1 py-1 space-y-0.5">
                      {dept.categories.map((cat) => {
                        const CatIcon = cat.icon;
                        const isCatActive = selectedCategory === cat.name;
                        const count = PRODUCTS.filter(p => p.category === cat.name).length;

                        return (
                          <button
                            key={cat.name}
                            onClick={() => handleSelectCategory(cat.name)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all ${
                              isCatActive
                                ? 'bg-blue-50 text-blue-700 font-bold'
                                : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <CatIcon className={`w-3.5 h-3.5 shrink-0 ${isCatActive ? 'text-blue-600' : 'text-slate-400'}`} />
                              <span className="truncate">{cat.name}</span>
                            </div>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isCatActive ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Help Box */}
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#051923] to-[#0a2f42] text-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Custom Fabrication?</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Need custom cylinders, valve manifolds, or OEM contract manufacturing specifications?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors"
            >
              <span>Talk to an Engineer</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>

        {/* Right Content - Product Card Grid */}
        <div className="w-full flex-1">
          {/* Active Filter Bar on Top of Products */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Filters:</span>
              {selectedDept !== 'All' && (
                <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                  Dept: {selectedDept}
                  <button onClick={() => setSelectedDept('All')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-1 rounded-md">
                  Category: {selectedCategory}
                  <button onClick={() => { setSelectedCategory('All'); setSelectedSubGroup('All'); }} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSubGroup !== 'All' && (
                <span className="inline-flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 font-semibold px-2.5 py-1 rounded-md">
                  Sub-group: {selectedSubGroup}
                  <button onClick={() => setSelectedSubGroup('All')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-xs bg-amber-50 text-amber-700 font-semibold px-2.5 py-1 rounded-md">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDept === 'All' && selectedCategory === 'All' && selectedSubGroup === 'All' && !searchQuery && (
                <span className="text-xs text-slate-500">Showing all precision catalog items</span>
              )}
            </div>

            {(selectedDept !== 'All' || selectedCategory !== 'All' || selectedSubGroup !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-500/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col overflow-hidden"
                >
                  {/* Top Image Box */}
                  <Link 
                    to={`/products/${product.id}`}
                    className="relative block h-48 sm:h-52 bg-gradient-to-b from-slate-50 to-white overflow-hidden p-4 border-b border-slate-100"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Category & Subgroup Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#051923] text-white shadow-sm">
                        {product.category}
                      </span>
                      {product.subGroup && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/95 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-sm">
                          {product.subGroup}
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/products/${product.id}`} className="block group-hover:text-blue-600 transition-colors">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1 mb-1.5">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-2 leading-relaxed mb-4">
                        {product.description}
                      </p>

                      {/* Specs Highlights */}
                      <ul className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                        {product.features?.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <Link
                        to={`/products/${product.id}`}
                        className="flex-1 py-2 px-3 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors inline-flex items-center justify-center gap-1 group-hover:bg-blue-50 group-hover:text-blue-700"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => setQuoteProduct(product)}
                        className="py-2 px-3 rounded-xl bg-[#051923] hover:bg-blue-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results Found State */
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                We couldn't find any items matching your active filters or search terms.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

      </section>

      {/* Quick Quote Modal */}
      {quoteProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-scaleUp">
            <button
              onClick={() => setQuoteProduct(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {quoteSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Quote Request Received!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Our engineering sales desk will get back to you within 2 business hours with technical specs and pricing.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Request Quotation</span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5 line-clamp-1">{quoteProduct.title}</h3>
                  <p className="text-xs text-slate-500">Category: {quoteProduct.category} · {quoteProduct.subGroup}</p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Quantity Required</label>
                    <input
                      type="number"
                      min="1"
                      value={quoteForm.quantity}
                      onChange={(e) => setQuoteForm({ ...quoteForm, quantity: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Custom Requirements</label>
                    <textarea
                      rows={2}
                      placeholder="Specific stroke length, bore size, or operating pressure..."
                      value={quoteForm.notes}
                      onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                      className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit RFQ</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
