import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [isExpanded, setIsExpanded] = useState(false);
  const product = PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <main className="bg-white min-h-screen pt-32 pb-20 px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/products" className="text-blue-600 hover:underline">
          Return to Products
        </Link>
      </main>
    );
  }

  const similarProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="bg-white min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fa] border-b border-gray-200 px-8 md:px-12 py-3">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link to="/products" state={{ category: product.category }} className="text-gray-900 hover:text-blue-600 transition-colors">{product.category}</Link>
          <ChevronRight className="w-4 h-4 mx-2 shrink-0" />
          <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">{product.title}</Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16 px-8 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-start">
        
        {/* Left Side - Image */}
        <div className="bg-white p-8">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="w-full h-auto object-contain max-h-[500px]"
          />
        </div>

        {/* Right Side - Details */}
        <div>
          <div className="mb-6">
            <h4 className="text-blue-500 font-bold tracking-wide uppercase text-sm mb-3 border-b-2 border-blue-500 inline-block pb-1">
              {product.category}
            </h4>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Features List */}
          <div className="mb-10">
            <ul className="space-y-3">
              {product.features?.map((feature, idx) => (
                <li key={idx} className="flex items-start text-gray-700 font-medium text-[15px]">
                  <span className="text-gray-400 mr-3 mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Read More Dropdown */}
          <div className="pt-6">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-black font-bold hover:opacity-70 transition-opacity focus:outline-none"
            >
              <span className="border-b-2 border-black pb-0.5 text-[15px]">
                {isExpanded ? 'Read Less' : 'Read More'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 ml-1 mt-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-1 mt-0.5" />
              )}
            </button>
          </div>

          {/* Expanded Content */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 mt-8' : 'max-h-0 opacity-0 mt-0'}`}>
            <h5 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h5>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[15px]">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Material</span>
                  <span className="font-semibold text-gray-900 text-right">Industrial Grade Alloy</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Operating Temp</span>
                  <span className="font-semibold text-gray-900 text-right">-20°C to 80°C</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Max Pressure</span>
                  <span className="font-semibold text-gray-900 text-right">1.0 MPa</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Warranty</span>
                  <span className="font-semibold text-gray-900 text-right">2 Years</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Certifications</span>
                  <span className="font-semibold text-gray-900 text-right">ISO 9001, CE</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-600">Maintenance</span>
                  <span className="font-semibold text-gray-900 text-right">Low</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-6 leading-relaxed text-[15px]">
              Designed for seamless integration into advanced automation systems, this {product.title.toLowerCase()} delivers uncompromising performance and reliability. Every unit undergoes rigorous stress testing to ensure it meets our strict quality control standards before shipment.
            </p>
          </div>
        </div>

      </section>

      {/* Similar Products Section */}
      <section className="py-16 px-8 md:px-12 max-w-7xl mx-auto border-t border-gray-100 mt-4">
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <h3 className="text-2xl font-bold text-gray-900">Similar Products</h3>
          <Link to="/products" className="bg-[#00b4ff] hover:bg-[#009ce0] text-white px-4 py-2 text-sm font-semibold transition-colors flex items-center gap-1 rounded-sm shadow-sm">
            View All Products <span className="font-bold ml-1">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map((p) => {
            const isCurrent = p.id === product.id;
            return (
              <Link to={`/products/${p.id}`} key={p.id} className="group block text-center">
                <div className={`bg-white border rounded-lg p-6 mb-4 transition-colors duration-300 ${
                  isCurrent ? 'border-[#00b4ff] shadow-sm' : 'border-gray-200 group-hover:border-[#00b4ff]'
                }`}>
                  <img 
                    src={p.imageUrl} 
                    alt={p.title}
                    className="w-full h-40 object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h5 className={`font-semibold text-[15px] px-2 transition-colors duration-300 ${
                  isCurrent ? 'text-[#00b4ff]' : 'text-gray-700 group-hover:text-[#00b4ff]'
                }`}>
                  {p.title}
                </h5>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
