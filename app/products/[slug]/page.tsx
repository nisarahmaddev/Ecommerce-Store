import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProductSlugs, getProductBySlug } from '@/lib/data/products-db';
import { ProductClient } from './ProductClient';

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="text-sm text-gray-600 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-gray-900">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gray-900">Shop</Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-16">
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-50 relative">
            <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(0, 3).map((img, idx) => (
                <div key={idx} className="aspect-[3/4] bg-gray-50 relative border-2 border-gray-900">
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <p className="text-gray-600 text-sm tracking-wider">{product.category}</p>
          <h1 className="text-gray-900">{product.name}</h1>
          <p className="text-gray-900 text-2xl">${product.price.toFixed(2)}</p>
          
          <div className="border-t border-b border-gray-200 py-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <ProductClient product={product} />

          <div className="pt-6 space-y-2 text-sm text-gray-600">
            <p>✓ Free shipping on orders over $75</p>
            <p>✓ 30-day returns & exchanges</p>
            <p>✓ Sustainably sourced materials</p>
          </div>
        </div>
      </div>
    </div>
  );
}