'use client';

import { useState, useEffect } from 'react';
import { CartItem } from '@/lib/context/CartContext';
import { ValidatedCartItem } from '@/lib/utils/cart-validation';

/**
 * Client-side hook to validate cart items against server
 * Calls validation API to check prices and availability
 */
export function useCartValidation(cartItems: CartItem[]) {
  const [validatedItems, setValidatedItems] = useState<ValidatedCartItem[]>([]);
  const [hasIssues, setHasIssues] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    async function validateCart() {
      if (cartItems.length === 0) {
        setValidatedItems([]);
        setHasIssues(false);
        setValidationError(false);
        return;
      }

      setIsValidating(true);
      setValidationError(false);
      try {
        const response = await fetch('/api/cart/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: cartItems }),
        });

        if (response.ok) {
          const data = await response.json();
          setValidatedItems(data.validatedItems);
          setHasIssues(data.hasIssues);
          setValidationError(false);
        } else {
          // Validation API failed - mark as error
          console.error('Validation API failed with status:', response.status);
          setValidatedItems(cartItems.map(item => ({ ...item, isValid: false })));
          setHasIssues(true);
          setValidationError(true);
        }
      } catch (error) {
        console.error('Cart validation error:', error);
        // Network or API error - cannot verify products
        setValidatedItems(cartItems.map(item => ({ ...item, isValid: false })));
        setHasIssues(true);
        setValidationError(true);
      } finally {
        setIsValidating(false);
      }
    }

    validateCart();
  }, [cartItems]);

  return { validatedItems, hasIssues, isValidating, validationError };
}
