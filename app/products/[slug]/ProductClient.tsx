'use client';

import { useState } from 'react';
import { Minus, Plus, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/lib/context/CartContext';

interface ProductClientProps {
  product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes ? product.sizes[0] : undefined
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <>
      {product.sizes && (
        <div className="space-y-3">
          <label className="text-gray-900 text-sm tracking-wide">Size</label>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`flex-1 py-3 text-sm tracking-wide border transition-colors ${
                  selectedSize === size
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 hover:border-gray-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <label className="text-gray-900 text-sm tracking-wide">Quantity</label>
        <div className="flex items-center border border-gray-200 w-32">
          <button
            onClick={handleDecreaseQuantity}
            disabled={quantity <= 1}
            className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="flex-1 text-center">{quantity}</span>
          <button onClick={handleIncreaseQuantity} className="p-3 hover:bg-gray-50">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <button
          onClick={handleAddToCart}
          className="w-full py-4 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-colors"
        >
          {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
        </button>
        <div className="flex gap-3">
          <button className="flex-1 py-3 border border-gray-200 hover:border-gray-900 flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Save</span>
          </button>
          <button className="flex-1 py-3 border border-gray-200 hover:border-gray-900 flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </>
  );
}
