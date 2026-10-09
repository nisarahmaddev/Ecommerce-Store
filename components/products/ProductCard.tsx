import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group cursor-pointer">
      <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden mb-3">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className="text-xs tracking-wider text-gray-700 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">{product.category}</span>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-900 text-sm tracking-wide">{product.name}</h3>
        <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}