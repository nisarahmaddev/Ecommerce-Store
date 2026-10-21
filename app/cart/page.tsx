'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X, ShoppingBag, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useCartValidation } from '@/hooks/useCartValidation';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const { validatedItems, hasIssues, isValidating, validationError } = useCartValidation(items);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Discover our thoughtfully crafted essentials and start shopping.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600 text-sm">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Clear cart
          </button>
        )}
      </div>

      {/* Validation Issues Banner */}
      {validationError && !isValidating && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-900 font-medium mb-1">
              Unable to validate cart
            </p>
            <p className="text-sm text-red-700">
              The validation service is currently unavailable. Your cart items could not be verified. Please try again later.
            </p>
          </div>
        </div>
      )}

      {hasIssues && !isValidating && !validationError && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-amber-900 font-medium mb-1">
              Some items in your cart need attention
            </p>
            <p className="text-sm text-amber-700">
              Please review the issues below before proceeding to checkout.
            </p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const validatedItem = validatedItems.find(v => v.id === item.id && v.selectedSize === item.selectedSize);
            const hasItemIssues = validatedItem && !validatedItem.isValid;
            const priceChanged = validatedItem?.validationIssues?.some(i => i.type === 'price-changed');
            
            return (
            <div
              key={`${item.id}-${item.selectedSize || 'default'}`}
              className={`relative flex gap-4 p-4 bg-white border ${
                hasItemIssues ? 'border-red-300 bg-red-50' : 'border-gray-200'
              }`}
            >
              {/* Validation Issues for Item */}
              {validatedItem?.validationIssues && validatedItem.validationIssues.length > 0 && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {validatedItem.validationIssues.map((issue, idx) => (
                    <div
                      key={idx}
                      className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded"
                      title={issue.message}
                    >
                      {issue.type === 'unavailable' && 'Unavailable'}
                      {issue.type === 'price-changed' && 'Price Updated'}
                      {issue.type === 'out-of-stock' && 'Out of Stock'}
                      {issue.type === 'invalid-size' && 'Size Unavailable'}
                    </div>
                  ))}
                </div>
              )}

              {/* Product Image */}
              <Link href={`/products/${item.slug}`} className="relative w-24 h-24 flex-shrink-0 bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </Link>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-gray-900 hover:text-gray-600 font-medium block truncate"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    {item.selectedSize && (
                      <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Remove item"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${priceChanged ? 'text-amber-700 line-through' : 'text-gray-900'}`}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    {priceChanged && validatedItem?.actualPrice && (
                      <p className="text-gray-900 font-medium">
                        ${(validatedItem.actualPrice * item.quantity).toFixed(2)}
                      </p>
                    )}
                    {item.quantity > 1 && (
                      <p className="text-xs text-gray-600">
                        ${(validatedItem?.actualPrice ?? item.price).toFixed(2)} each
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-24">
            <h2 className="text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {subtotal >= 75 ? 'Free' : 'Calculated at checkout'}
                </span>
              </div>
              {subtotal < 75 && (
                <p className="text-xs text-gray-600">
                  Add ${(75 - subtotal).toFixed(2)} more for free shipping
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-gray-900 font-medium text-xl">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-colors mb-3 text-center"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/shop"
              className="block text-center py-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
