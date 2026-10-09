import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Award, PackageCheck } from 'lucide-react';
import { products } from '@/lib/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export default function HomePage() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);
  
  return (
    <div className="min-h-screen">
      <section className="relative h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-50">
          <Image src="https://images.unsplash.com/photo-1653875842174-429c1b467548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZmFzaGlvbiUyMG1vZGVsfGVufDF8fHx8MTc2MTczNTQxM3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="Hero" fill className="object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/60" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">Essentials for Intentional Living</h1>
          <p className="text-sm md:text-base text-gray-700 mb-8 max-w-lg mx-auto">Thoughtfully crafted products that elevate everyday moments. Sustainably made, timeless design.</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800 transition-colors">
            <span>Shop Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our most-loved essentials, chosen for their exceptional quality and timeless appeal.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} />))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm tracking-wide">
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd29ya3NwYWNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjE3MjY3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Sustainability" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl text-gray-900">Designed with Purpose</h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">We believe in creating products that last. Every item in our collection is thoughtfully designed, ethically sourced, and sustainably produced.</p>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">Our commitment to quality means choosing natural materials, supporting artisan makers, and minimizing our environmental impact at every step.</p>
              <Link href="/about" className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors">
                <span className="text-sm tracking-wide">Learn Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                <Leaf className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-gray-900">Sustainable</h3>
              <p className="text-gray-600 text-sm">Ethically sourced materials and eco-friendly production methods.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                <Award className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-gray-900">Premium Quality</h3>
              <p className="text-gray-600 text-sm">Handcrafted with attention to detail and built to last.</p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
                <PackageCheck className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-gray-900">Free Shipping</h3>
              <p className="text-gray-600 text-sm">Complimentary shipping on all orders over $75.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-gray-900 text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">The quality is exceptional. Every product feels thoughtfully designed and sustainably made.</p>
              <p className="text-gray-900 text-sm tracking-wide">— Sarah M.</p>
            </div>
            <div className="bg-white p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">Finally, a brand that aligns with my values. Beautiful products that actually last.</p>
              <p className="text-gray-900 text-sm tracking-wide">— David K.</p>
            </div>
            <div className="bg-white p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
                <span className="text-gray-900">★</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">Obsessed with the minimal aesthetic and sustainable practices. Worth every penny.</p>
              <p className="text-gray-900 text-sm tracking-wide">— Emma L.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center px-4 md:px-8">
          <h2 className="text-gray-900 mb-4">Stay Connected</h2>
          <p className="text-gray-600 mb-8">Subscribe to receive updates on new arrivals, special offers, and our sustainability journey.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-white border border-gray-200 text-sm focus:outline-none focus:border-gray-900 transition-colors" />
            <button className="px-6 py-3 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800 transition-colors">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}