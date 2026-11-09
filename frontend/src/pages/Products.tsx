import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRODUCTS, CATALOG_DATA } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

export default function Products() {
  const location = useLocation();

  // Two Main Filters
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle category passed via React Router navigation state
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      const matchDept = CATALOG_DATA.find(d => 
        d.categories.some(c => c.name === location.state.category)
      );
      if (matchDept) {
        setSelectedDept(matchDept.name);
      }
    }
  }, [location.state]);

  // Department definitions
  const departments = [
    { id: 'All', name: 'All Departments' },
    { id: 'Factory Automation', name: 'Factory Automation' },
    { id: 'Didactics (Skilling & Education)', name: 'Didactics' }
  ];

  // Available categories based on selected department
  const availableCategories = useMemo(() => {
    let cats: string[] = [];
    if (selectedDept === 'All') {
      CATALOG_DATA.forEach(d => {
        d.categories.forEach(c => {
          if (!cats.includes(c.name)) cats.push(c.name);
        });
      });
    } else {
      const dept = CATALOG_DATA.find(d => d.name === selectedDept);
      if (dept) {
        cats = dept.categories.map(c => c.name);
      }
    }
    return ['All', ...cats];
  }, [selectedDept]);

  const handleDeptSelect = (deptId: string) => {
    setSelectedDept(deptId);
    // If current category is not in the new department, reset category to All
    if (deptId !== 'All') {
      const dept = CATALOG_DATA.find(d => d.name === deptId);
      if (dept && !dept.categories.some(c => c.name === selectedCategory)) {
        setSelectedCategory('All');
      }
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Filter 1: Department
      if (selectedDept !== 'All' && p.department && p.department !== selectedDept) {
        return false;
      }
      // Filter 2: Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Search Query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesSub = p.subGroup ? p.subGroup.toLowerCase().includes(query) : false;
        return matchesTitle || matchesCat || matchesSub;
      }
      return true;
    });
  }, [selectedDept, selectedCategory, searchQuery]);

  const resetAll = () => {
    setSelectedDept('All');
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <main className="bg-[#fcfdfd] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Simple Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Products
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Explore our range of precision automation components and didactic systems.
            </p>
          </div>

          {/* Simple Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Two Filters Section */}
        <div className="space-y-3 mb-8">
          {/* Filter 1: Department */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Department:
            </span>
            {departments.map((dept) => {
              const isSelected = selectedDept === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => handleDeptSelect(dept.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#051923] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dept.name}
                </button>
              );
            })}
          </div>

          {/* Filter 2: Category */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {availableCategories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Count & Active Filters Indicator */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-0.5">
          <span>Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}</span>
          {(selectedDept !== 'All' || selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={resetAll}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Simpler Product Template Grid (2 columns on mobile, 3-4 on larger screens) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-md transition-all flex flex-col"
              >
                {/* Product Image */}
                <div className="aspect-square w-full bg-gray-100 overflow-hidden border-b border-gray-100 relative">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs font-semibold text-gray-500 group-hover:text-blue-600">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-xl border border-gray-200 p-10 text-center max-w-md mx-auto my-8">
            <h3 className="text-base font-bold text-gray-900 mb-1">No products found</h3>
            <p className="text-xs text-gray-500 mb-4">
              Try adjusting your search query or selected filters.
            </p>
            <button
              onClick={resetAll}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
