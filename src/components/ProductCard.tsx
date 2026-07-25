import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

export default function ProductCard({ title, category, description, imageUrl }: ProductCardProps) {
  return (
    <div className="group relative overflow-hidden bg-white border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative shrink-0">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-sm bg-white/90 text-blue-700 text-[10px] font-bold backdrop-blur-md border border-gray-200 uppercase tracking-widest shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>
        
        <button className="flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors tracking-wide uppercase mt-auto">
          View Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
