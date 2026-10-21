export interface OrderItem {
  productId: string;
  productSlug: string;
  productName: string;
  selectedSize?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  orderReference: string;
  createdAt: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  
  // Customer contact
  customerEmail: string;
  customerPhone: string;
  
  // Shipping address
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  
  // Order details
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  
  // Internal tracking
  testOrder?: boolean;
  idempotencyKey?: string;
}
