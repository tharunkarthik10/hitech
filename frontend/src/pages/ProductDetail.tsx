import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-4 sm:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-blue-600 hover:underline font-semibold">
          Return to Products
        </Link>
      </main>
    );
  }

  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-4 sm:px-8 md:px-12 py-3">
        <div className="max-w-[96%] 2xl:max-w-[1920px] mx-auto flex items-center text-xs sm:text-sm text-gray-500 font-medium overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-blue-600 transition-colors shrink-0">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 sm:mx-2 shrink-0 text-gray-400" />
          <Link to="/products" className="hover:text-blue-600 transition-colors shrink-0">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 sm:mx-2 shrink-0 text-gray-400" />
          <Link to="/products" state={{ category: product.category }} className="text-gray-900 hover:text-blue-600 transition-colors shrink-0">{product.category}</Link>
          <ChevronRight className="w-3.5 h-3.5 mx-1.5 sm:mx-2 shrink-0 text-gray-400" />
          <span className="text-blue-600 font-semibold truncate shrink-0">{product.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 sm:py-16 px-4 sm:px-8 md:px-12 max-w-[96%] 2xl:max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
        
        {/* Left Side - Large Product Image */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm flex items-center justify-center w-full">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-auto max-h-[550px] sm:max-h-[650px] object-cover"
          />
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h4 className="text-blue-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-2.5 border-b-2 border-blue-600 inline-block pb-1">
              {product.category} {product.subGroup ? `· ${product.subGroup}` : ''}
            </h4>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {product.title}
            </h1>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Features List */}
          <div className="mb-8 bg-slate-50/80 p-5 rounded-xl border border-slate-200/60">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Specifications</h3>
            <ul className="space-y-2.5">
              {product.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-700 font-medium text-xs sm:text-sm">
                  <span className="text-blue-600 mr-2.5 mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Read More Dropdown */}
          <div className="pt-2">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-gray-900 font-bold hover:text-blue-600 transition-colors"
            >
              <span className="border-b-2 border-gray-900 hover:border-blue-600 pb-0.5 text-xs sm:text-sm">
                {isExpanded ? 'Read Less Technical Data' : 'Read Full Technical Specs'}
              </span>
              <ChevronDown className={`w-4 h-4 ml-1.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Expanded Content */}
            <div className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
               <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm leading-relaxed space-y-2">
                 <p>
                   Custom bore sizes, stroke configurations, sensor mounting channels, and seal options (FKM, polyurethane, standard NBR) are available upon request for high-cycle OEM production runs.
                 </p>
                 <p className="text-gray-500">
                   Contact our application engineering team for complete step/IGES CAD models and factory verification test curves.
                 </p>
               </div>
            </div>
          </div>
        </div>

      </section>

      {/* Similar Products Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 md:px-12 max-w-[96%] 2xl:max-w-[1920px] mx-auto border-t border-gray-200 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Similar Products</h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Explore related {product.category} hardware</p>
          </div>
          <Link 
            to="/products" 
            state={{ category: product.category }}
            className="bg-[#051923] hover:bg-blue-600 text-white px-4 py-2 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 rounded-lg shadow-sm"
          >
            <span>View All in {product.category}</span>
            <span className="font-bold">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6">
          {similarProducts.map((p) => {
            const isCurrent = p.id === product.id;
            return (
              <Link 
                to={`/products/${p.id}`} 
                key={p.id} 
                className="group block"
              >
                <div className={`bg-white border rounded-xl overflow-hidden mb-3 transition-all duration-300 ${
                  isCurrent ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'border-gray-200 group-hover:border-blue-500 group-hover:shadow-md'
                }`}>
                  <div className="aspect-[4/3] sm:h-48 w-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img 
                      src={p.imageUrl} 
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 text-left">
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-0.5">
                      {p.category}
                    </span>
                    <h5 className="font-bold text-xs sm:text-sm text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {p.title}
                    </h5>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
