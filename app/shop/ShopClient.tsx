'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/products/ProductCard';

interface ShopClientProps {
  initialProducts: Product[];
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc';

export function ShopClient({ initialProducts }: ShopClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories from products
  const categories = useMemo(() => {
    const cats = new Set(initialProducts.map(p => p.category));
    return Array.from(cats).sort();
  }, [initialProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        // Keep original order (featured items first in database)
        break;
    }

    return filtered;
  }, [initialProducts, searchQuery, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('featured');
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'all' || sortBy !== 'featured';

  return (
    <>
      <div className="mb-8 md:mb-12">
        <h1 className="text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600 max-w-2xl">Discover our complete collection of thoughtfully designed essentials.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Controls */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-900 hover:text-gray-600"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm tracking-wide">Filter</span>
          </button>
          <span className="text-gray-600 text-sm">{filteredProducts.length} products</span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-gray-600 hover:text-gray-900 underline"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="appearance-none bg-white border border-gray-200 px-4 py-2 pr-10 text-sm cursor-pointer hover:border-gray-900 focus:outline-none focus:border-gray-900 transition-colors"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
        </div>
      </div>

      {/* Category Filter Panel */}
      {showFilters && (
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200">
          <h3 className="text-gray-900 text-sm tracking-wide mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 text-sm tracking-wide transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-900'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm tracking-wide transition-colors ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-900 border border-gray-200 hover:border-gray-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 text-sm mb-6">
              {searchQuery
                ? `No results for "${searchQuery}". Try adjusting your search or filters.`
                : 'No products match your current filters. Try adjusting your selection.'}
            </p>
            <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}
