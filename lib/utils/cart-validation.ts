import { getDb } from "@/lib/db";
import { Product } from "@/types/product";
import { CartItem } from "@/lib/context/CartContext";

export interface ValidationIssue {
  itemId: string;
  type: 'unavailable' | 'price-changed' | 'invalid-size' | 'out-of-stock';
  message: string;
  oldPrice?: number;
  newPrice?: number;
}

export interface ValidatedCartItem extends CartItem {
  isValid: boolean;
  validationIssues?: ValidationIssue[];
  actualPrice?: number;
}

/**
 * Validate cart items against current MongoDB product data
 * Returns validated items with current prices and availability status
 */
export async function validateCartItems(
  cartItems: CartItem[]
): Promise<{ validatedItems: ValidatedCartItem[]; hasIssues: boolean }> {
  try {
    const db = await getDb();
    const productIds = cartItems.map(item => item.id);
    
    // Fetch current product data from MongoDB
    const products = await db
      .collection<Product>("products")
      .find({ id: { $in: productIds } })
      .toArray();
    
    const productMap = new Map(products.map(p => [p.id, p]));
    const validatedItems: ValidatedCartItem[] = [];
    let hasIssues = false;

    for (const cartItem of cartItems) {
      const product = productMap.get(cartItem.id);
      const issues: ValidationIssue[] = [];
      let isValid = true;

      if (!product) {
        // Product no longer exists in database
        issues.push({
          itemId: cartItem.id,
          type: 'unavailable',
          message: 'This product is no longer available'
        });
        isValid = false;
        hasIssues = true;
      } else {
        // Check if price has changed
        if (product.price !== cartItem.price) {
          issues.push({
            itemId: cartItem.id,
            type: 'price-changed',
            message: 'Price has been updated',
            oldPrice: cartItem.price,
            newPrice: product.price
          });
          hasIssues = true;
        }

        // Check if product is in stock
        if (!product.inStock) {
          issues.push({
            itemId: cartItem.id,
            type: 'out-of-stock',
            message: 'This product is currently out of stock'
          });
          isValid = false;
          hasIssues = true;
        }

        // Check if selected size is still valid
        if (cartItem.selectedSize && product.sizes) {
          if (!product.sizes.includes(cartItem.selectedSize)) {
            issues.push({
              itemId: cartItem.id,
              type: 'invalid-size',
              message: `Size ${cartItem.selectedSize} is no longer available`
            });
            isValid = false;
            hasIssues = true;
          }
        }
      }

      validatedItems.push({
        ...cartItem,
        isValid,
        validationIssues: issues.length > 0 ? issues : undefined,
        actualPrice: product?.price
      });
    }

    return { validatedItems, hasIssues };
  } catch (error) {
    console.error('Error validating cart items:', error);
    // Return items as-is if validation fails
    return {
      validatedItems: cartItems.map(item => ({ ...item, isValid: true })),
      hasIssues: false
    };
  }
}

/**
 * Calculate accurate subtotal using validated prices from MongoDB
 */
export function calculateValidatedSubtotal(validatedItems: ValidatedCartItem[]): number {
  return validatedItems.reduce((total, item) => {
    if (!item.isValid) return total;
    const price = item.actualPrice ?? item.price;
    return total + (price * item.quantity);
  }, 0);
}

/**
 * Validate quantity is a positive whole number
 */
export function isValidQuantity(quantity: number): boolean {
  return Number.isInteger(quantity) && quantity > 0;
}
