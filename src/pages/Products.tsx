import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRODUCTS } from '../data/products';

export default function Products() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(location.state?.category || 'All');

  useEffect(() => {
    if (location.state?.category) {
      setActiveCategory(location.state.category);
    }
  }, [location.state]);

  const filteredProducts = PRODUCTS.filter(
    product => activeCategory === 'All' || product.category === activeCategory
  );

  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Main Content Layout with proper spacing matching header */}
      <section className="py-12 px-8 md:px-12 w-full mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar - Categories */}
        <aside className="w-full lg:w-[280px] shrink-0 sticky top-32">
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full text-left px-5 py-4 text-sm font-semibold transition-all duration-300 flex items-center gap-3 border-b border-gray-100 last:border-b-0 group ${
                    activeCategory === cat.name
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors ${
                    activeCategory === cat.name ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                  }`} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Content - Product Grid */}
        <div className="w-full flex-1">
          {/* Active Category Header */}
          <div className="mb-6 flex items-center justify-between pb-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 tracking-wide">
              {activeCategory === 'All' ? 'All Products' : activeCategory}
            </h3>
            <span className="text-gray-500 text-sm font-medium">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product, idx) => (
              <Link 
                to={`/products/${product.id}`}
                key={product.id}
                className="animate-in fade-in zoom-in-95 duration-500 fill-mode-both h-full block"
                style={{ animationDelay: `${(idx % 5) * 50}ms` }}
              >
                <ProductCard
                  title={product.title}
                  category={product.category}
                  description={product.description}
                  imageUrl={product.imageUrl}
                />
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 border border-gray-200">
              <p className="text-gray-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>

      </section>
    </main>
  );
}
