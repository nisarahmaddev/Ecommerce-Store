import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    slug: 'essential-cleanser',
    name: 'Essential Cleanser',
    description: 'A thoughtfully crafted essential designed for everyday use. Made with premium, sustainably sourced materials and built to last. Minimal aesthetic with maximum functionality.',
    price: 48.00,
    category: 'Skincare',
    images: [
      'https://images.unsplash.com/photo-1630398777649-cdfc7c5e8a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNzIyODkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1626897844971-aef92643f056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MTc2ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd29ya3NwYWNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjE3MjY3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: '2',
    slug: 'organic-linen-shirt',
    name: 'Organic Linen Shirt',
    description: 'Sustainable fashion made with organic linen. Perfect for everyday wear.',
    price: 92.00,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1573612664822-d7d347da7b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjbG90aGluZ3xlbnwxfHx8fDE3NjE2OTc5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true
  },
  {
    id: '3',
    slug: 'natural-face-oil',
    name: 'Natural Face Oil',
    description: 'Nourishing face oil made with natural ingredients.',
    price: 65.00,
    category: 'Skincare',
    images: ['https://images.unsplash.com/photo-1696497327736-1b9184fd3a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzJTIwYm90dGxlfGVufDF8fHx8MTc2MTc5NDkzMXww&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: true
  },
  {
    id: '4',
    slug: 'ceramic-bowl-set',
    name: 'Ceramic Bowl Set',
    description: 'Handcrafted ceramic bowls for mindful living.',
    price: 78.00,
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1617326021886-53d6be1d7154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc2MTc5MzY0MHww&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: true
  },
  {
    id: '5',
    slug: 'handwoven-throw',
    name: 'Handwoven Throw',
    description: 'Beautiful handwoven throw blanket.',
    price: 125.00,
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1759310348102-278042e5e437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdGV4dGlsZSUyMGZhYnJpY3xlbnwxfHx8fDE3NjE4MTM1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: true
  },
  {
    id: '6',
    slug: 'artisan-soap-bar',
    name: 'Artisan Soap Bar',
    description: 'Handmade artisan soap with natural ingredients.',
    price: 18.00,
    category: 'Skincare',
    images: ['https://images.unsplash.com/photo-1631869382470-cd1722baebc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwaGFuZG1hZGUlMjBwcm9kdWN0fGVufDF8fHx8MTc2MTgxMzUzNnww&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: true
  },
  {
    id: '7',
    slug: 'essential-moisturizer',
    name: 'Essential Moisturizer',
    description: 'Daily moisturizer for healthy skin.',
    price: 52.00,
    category: 'Skincare',
    images: ['https://images.unsplash.com/photo-1630398777649-cdfc7c5e8a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBza2luY2FyZSUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNzIyODkyfDA&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: false
  },
  {
    id: '8',
    slug: 'natural-face-serum',
    name: 'Natural Face Serum',
    description: 'Rejuvenating face serum with natural extracts.',
    price: 68.00,
    category: 'Skincare',
    images: ['https://images.unsplash.com/photo-1696497327736-1b9184fd3a16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwY29zbWV0aWNzJTIwYm90dGxlfGVufDF8fHx8MTc2MTc5NDkzMXww&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: false
  },
  {
    id: '9',
    slug: 'minimal-product',
    name: 'Minimal Product',
    description: 'Minimalist home decor piece.',
    price: 45.00,
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1626897844971-aef92643f056?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc2MTc2ODY1Mnww&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: false
  },
  {
    id: '10',
    slug: 'cotton-throw-pillow',
    name: 'Cotton Throw Pillow',
    description: 'Soft organic cotton throw pillow.',
    price: 38.00,
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1759310348102-278042e5e437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdGV4dGlsZSUyMGZhYnJpY3xlbnwxfHx8fDE3NjE4MTM1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: false
  },
  {
    id: '11',
    slug: 'linen-apron',
    name: 'Linen Apron',
    description: 'Durable linen apron for kitchen use.',
    price: 56.00,
    category: 'Apparel',
    images: ['https://images.unsplash.com/photo-1573612664822-d7d347da7b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjbG90aGluZ3xlbnwxfHx8fDE3NjE2OTc5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: false
  },
  {
    id: '12',
    slug: 'ceramic-vase',
    name: 'Ceramic Vase',
    description: 'Elegant ceramic vase for flowers.',
    price: 64.00,
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1617326021886-53d6be1d7154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc2MTc5MzY0MHww&ixlib=rb-4.1.0&q=80&w=1080'],
    inStock: true,
    featured: false
  }
];