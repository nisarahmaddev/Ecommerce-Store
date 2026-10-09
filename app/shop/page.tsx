import Link from 'next/link';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products } from '@/lib/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600 max-w-2xl">Discover our complete collection of thoughtfully designed essentials.</p>
      </div>
      
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-gray-900 hover:text-gray-600">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm tracking-wide">Filter</span>
          </button>
          <span className="text-gray-600 text-sm">{products.length} products</span>
        </div>
        <div className="relative">
          <select className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 text-sm">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((product) => (<ProductCard key={product.id} product={product} />))}
      </div>
    </div>
  );
}