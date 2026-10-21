import { NextRequest } from 'next/server';
import { validateCartItems, calculateValidatedSubtotal } from '@/lib/utils/cart-validation';
import { CartItem } from '@/lib/context/CartContext';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: CartItem[] };

    if (!Array.isArray(items)) {
      return Response.json(
        { success: false, message: 'Invalid cart items' },
        { status: 400 }
      );
    }

    const { validatedItems, hasIssues } = await validateCartItems(items);
    const validatedSubtotal = calculateValidatedSubtotal(validatedItems);

    return Response.json({
      success: true,
      validatedItems,
      hasIssues,
      validatedSubtotal,
    });
  } catch (error) {
    console.error('Cart validation error:', error);
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Validation failed',
      },
      { status: 500 }
    );
  }
}
