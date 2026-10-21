'use client';

import { useState, FormEvent, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/lib/context/CartContext';
import { useCartValidation } from '@/hooks/useCartValidation';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, clearCart } = useCart();
  const { validatedItems, hasIssues, isValidating, validationError } = useCartValidation(items);
  
  // Calculate validated subtotal using actual MongoDB prices
  const validatedSubtotal = useMemo(() => {
    if (validatedItems.length === 0) return 0;
    return validatedItems.reduce((total, item) => {
      if (!item.isValid) return total;
      const price = item.actualPrice ?? item.price;
      return total + (price * item.quantity);
    }, 0);
  }, [validatedItems]);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderReference, setOrderReference] = useState<string>('');
  const [serverError, setServerError] = useState<string>('');

  // Redirect if cart is empty
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add items to your cart before checking out.
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

  const shippingCost = validatedSubtotal >= 75 ? 0 : 10;
  const total = validatedSubtotal + shippingCost;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Block submission if validation is in progress
    if (isValidating) {
      return;
    }

    // Block submission if validation failed (API error)
    if (validationError) {
      return;
    }

    // Block submission if cart has validation issues
    if (hasIssues) {
      setServerError('Please resolve cart issues before placing your order');
      return;
    }

    // Prevent duplicate submissions
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setServerError('');

    try {
      // Generate idempotency key for this submission
      const idempotencyKey = `${Date.now()}-${Math.random().toString(36).substring(2)}`;

      // Prepare order data
      const orderData = {
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        shippingFirstName: formData.firstName.trim(),
        shippingLastName: formData.lastName.trim(),
        shippingAddress: formData.address.trim(),
        shippingCity: formData.city.trim(),
        shippingState: formData.state.trim(),
        shippingZipCode: formData.zipCode.trim(),
        items: items.map(item => ({
          productId: item.id,
          productSlug: item.slug,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
        })),
        idempotencyKey,
      };

      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Handle error response
        setServerError(result.message || 'Failed to place order. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Success - store order reference and clear cart
      setOrderReference(result.orderReference);
      clearCart();
      setOrderPlaced(true);

    } catch (error) {
      console.error('Order submission error:', error);
      setServerError('Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Order confirmation view
  if (orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-gray-900 mb-4">Order Placed Successfully</h1>
          
          <div className="bg-gray-50 border border-gray-200 p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Reference</p>
            <p className="text-lg font-medium text-gray-900 tracking-wide">
              {orderReference}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-4 mb-6 text-left">
            <p className="text-sm text-blue-900 font-medium mb-1">
              Important: No payment was processed
            </p>
            <p className="text-sm text-blue-700">
              Your order has been saved to the database, but no online payment was taken. This store does not currently process payments.
            </p>
          </div>

          <p className="text-gray-600 mb-8">
            Your order details have been recorded. You'll receive a confirmation email at {formData.email}.
          </p>
          
          <div className="space-y-3">
            <Link
              href="/shop"
              className="block w-full px-8 py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-colors text-center"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full px-8 py-3.5 border border-gray-300 text-gray-900 tracking-wide hover:bg-gray-50 transition-colors text-center"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 text-sm">Complete your order</p>
      </div>

      {/* Demo Warning */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-blue-900 font-medium mb-1">
            No Payment Processing
          </p>
          <p className="text-sm text-blue-700">
            This store saves orders to a database but does not process payments. Your order will be recorded but no payment will be taken.
          </p>
        </div>
      </div>

      {/* Server Error Banner */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-900 font-medium mb-1">
              Order Error
            </p>
            <p className="text-sm text-red-700">{serverError}</p>
          </div>
        </div>
      )}

      {/* Validation Error Banner */}
      {validationError && !isValidating && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-900 font-medium mb-1">
              Unable to validate cart
            </p>
            <p className="text-sm text-red-700 mb-2">
              The validation service is currently unavailable. Your cart items could not be verified against current prices and availability.
            </p>
            <p className="text-sm text-red-700">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        </div>
      )}

      {/* Cart Validation Issues */}
      {hasIssues && !isValidating && !validationError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-red-900 font-medium mb-1">
              Cart validation issues detected
            </p>
            <p className="text-sm text-red-700 mb-2">
              Please review your cart before continuing.
            </p>
            <Link href="/cart" className="text-sm text-red-800 underline hover:text-red-900">
              Return to cart
            </Link>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-2.5 border ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:border-gray-900 transition-colors`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Phone <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-2.5 border ${
                    errors.phone ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:border-gray-900 transition-colors`}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-2.5 border ${
                      errors.firstName ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-gray-900 transition-colors`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-2.5 border ${
                      errors.lastName ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-gray-900 transition-colors`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full px-4 py-2.5 border ${
                    errors.address ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:border-gray-900 transition-colors`}
                  placeholder="Street address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`w-full px-4 py-2.5 border ${
                      errors.city ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-gray-900 transition-colors`}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-700 text-sm mb-2">
                    State <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className={`w-full px-4 py-2.5 border ${
                      errors.state ? 'border-red-300' : 'border-gray-200'
                    } focus:outline-none focus:border-gray-900 transition-colors`}
                    placeholder="CA"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-sm mb-2">
                  ZIP Code <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  className={`w-full px-4 py-2.5 border ${
                    errors.zipCode ? 'border-red-300' : 'border-gray-200'
                  } focus:outline-none focus:border-gray-900 transition-colors`}
                  placeholder="12345"
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 p-6 sticky top-24">
            <h2 className="text-gray-900 mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map((item) => {
                const validatedItem = validatedItems.find(
                  v => v.id === item.id && v.selectedSize === item.selectedSize
                );
                const actualPrice = validatedItem?.actualPrice ?? item.price;
                
                return (
                <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex gap-3">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">{item.name}</p>
                    {item.selectedSize && (
                      <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>
                    )}
                    <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm text-gray-900">
                    ${(actualPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
                );
              })}
            </div>

            {/* Pricing */}
            <div className="space-y-3 mb-6 pt-4 border-t border-gray-300">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${validatedSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-900">
                  {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-900 font-medium">Total</span>
                <span className="text-gray-900 font-medium text-xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || hasIssues || isValidating || validationError}
              onClick={handleSubmit}
              className="w-full py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-3"
            >
              {isSubmitting ? 'Placing Order...' : isValidating ? 'Validating...' : 'Place Order'}
            </button>

            <Link
              href="/cart"
              className="block text-center py-3 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Return to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
