import { NextRequest } from 'next/server';
import { getDb } from '@/lib/db';
import { Product } from '@/types/product';
import { Order, OrderItem } from '@/types/order';

export const runtime = 'nodejs';

interface CreateOrderRequest {
  customerEmail: string;
  customerPhone: string;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  items: {
    productId: string;
    productSlug: string;
    quantity: number;
    selectedSize?: string;
  }[];
  idempotencyKey?: string;
}

/**
 * Generate unique order reference
 * Format: ORD-YYYYMMDD-RANDOM (e.g., ORD-20241020-A7B9C2)
 */
function generateOrderReference(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${dateStr}-${random}`;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate phone format (basic check)
 */
function isValidPhone(phone: string): boolean {
  return /^[\d\s\-\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

/**
 * Validate ZIP code format
 */
function isValidZipCode(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

/**
 * Calculate shipping cost based on subtotal
 * Free shipping for orders >= $75
 */
function calculateShippingCost(subtotal: number): number {
  return subtotal >= 75 ? 0 : 10;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CreateOrderRequest;

    // ========================================
    // 1. VALIDATE CUSTOMER DETAILS
    // ========================================
    
    const {
      customerEmail,
      customerPhone,
      shippingFirstName,
      shippingLastName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZipCode,
      items,
      idempotencyKey,
    } = body;

    // Validate required fields
    if (!customerEmail?.trim()) {
      return Response.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!isValidEmail(customerEmail)) {
      return Response.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!customerPhone?.trim()) {
      return Response.json(
        { success: false, message: 'Phone is required' },
        { status: 400 }
      );
    }

    if (!isValidPhone(customerPhone)) {
      return Response.json(
        { success: false, message: 'Invalid phone format' },
        { status: 400 }
      );
    }

    if (!shippingFirstName?.trim()) {
      return Response.json(
        { success: false, message: 'First name is required' },
        { status: 400 }
      );
    }

    if (!shippingLastName?.trim()) {
      return Response.json(
        { success: false, message: 'Last name is required' },
        { status: 400 }
      );
    }

    if (!shippingAddress?.trim()) {
      return Response.json(
        { success: false, message: 'Address is required' },
        { status: 400 }
      );
    }

    if (!shippingCity?.trim()) {
      return Response.json(
        { success: false, message: 'City is required' },
        { status: 400 }
      );
    }

    if (!shippingState?.trim()) {
      return Response.json(
        { success: false, message: 'State is required' },
        { status: 400 }
      );
    }

    if (!shippingZipCode?.trim()) {
      return Response.json(
        { success: false, message: 'ZIP code is required' },
        { status: 400 }
      );
    }

    if (!isValidZipCode(shippingZipCode)) {
      return Response.json(
        { success: false, message: 'Invalid ZIP code format' },
        { status: 400 }
      );
    }

    // ========================================
    // 2. VALIDATE CART ITEMS
    // ========================================

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json(
        { success: false, message: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Validate each item structure
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (!item.productId || typeof item.productId !== 'string') {
        return Response.json(
          { success: false, message: `Invalid product ID at item ${i + 1}` },
          { status: 400 }
        );
      }

      if (!item.productSlug || typeof item.productSlug !== 'string') {
        return Response.json(
          { success: false, message: `Invalid product slug at item ${i + 1}` },
          { status: 400 }
        );
      }

      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        return Response.json(
          { success: false, message: `Invalid quantity at item ${i + 1}. Must be a positive integer.` },
          { status: 400 }
        );
      }

      if (item.selectedSize !== undefined && typeof item.selectedSize !== 'string') {
        return Response.json(
          { success: false, message: `Invalid size format at item ${i + 1}` },
          { status: 400 }
        );
      }
    }

    // ========================================
    // 3. IDEMPOTENCY CHECK
    // ========================================
    
    const db = await getDb();
    
    if (idempotencyKey) {
      const existingOrder = await db
        .collection<Order>('orders')
        .findOne({ idempotencyKey });
      
      if (existingOrder) {
        // Order already exists, return existing order reference
        return Response.json({
          success: true,
          orderReference: existingOrder.orderReference,
          message: 'Order already created',
        });
      }
    }

    // ========================================
    // 4. FETCH AND VALIDATE PRODUCTS
    // ========================================

    const productIds = items.map(item => item.productId);
    const products = await db
      .collection<Product>('products')
      .find({ id: { $in: productIds } })
      .toArray();

    const productMap = new Map(products.map(p => [p.id, p]));

    // Validate each item against database
    const validatedItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of items) {
      const product = productMap.get(item.productId);

      if (!product) {
        return Response.json(
          { success: false, message: `Product "${item.productSlug}" is no longer available` },
          { status: 400 }
        );
      }

      if (!product.inStock) {
        return Response.json(
          { success: false, message: `Product "${product.name}" is out of stock` },
          { status: 400 }
        );
      }

      // Validate size if provided
      if (item.selectedSize) {
        if (!product.sizes || !product.sizes.includes(item.selectedSize)) {
          return Response.json(
            { success: false, message: `Size "${item.selectedSize}" is not available for "${product.name}"` },
            { status: 400 }
          );
        }
      }

      // Calculate line total using current price from database
      const lineTotal = product.price * item.quantity;
      subtotal += lineTotal;

      validatedItems.push({
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
        unitPrice: product.price,
        lineTotal,
      });
    }

    // ========================================
    // 5. CALCULATE TOTALS
    // ========================================

    const shippingCost = calculateShippingCost(subtotal);
    const total = subtotal + shippingCost;

    // ========================================
    // 6. CREATE ORDER
    // ========================================

    const orderReference = generateOrderReference();
    const isTestOrder = customerEmail.includes('@test.example') || 
                        customerEmail.includes('@example.com');

    const order: Order = {
      orderReference,
      createdAt: new Date(),
      status: 'pending',
      
      customerEmail: customerEmail.trim(),
      customerPhone: customerPhone.trim(),
      
      shippingFirstName: shippingFirstName.trim(),
      shippingLastName: shippingLastName.trim(),
      shippingAddress: shippingAddress.trim(),
      shippingCity: shippingCity.trim(),
      shippingState: shippingState.trim(),
      shippingZipCode: shippingZipCode.trim(),
      
      items: validatedItems,
      subtotal,
      shippingCost,
      total,
      
      testOrder: isTestOrder,
      idempotencyKey,
    };

    const result = await db.collection<Order>('orders').insertOne(order);

    if (!result.insertedId) {
      throw new Error('Failed to create order');
    }

    // ========================================
    // 7. RETURN SUCCESS
    // ========================================

    return Response.json({
      success: true,
      orderReference,
      subtotal,
      shippingCost,
      total,
    }, { status: 201 });

  } catch (error) {
    console.error('Order creation error:', error);
    return Response.json(
      {
        success: false,
        message: 'An error occurred while processing your order. Please try again.',
      },
      { status: 500 }
    );
  }
}
