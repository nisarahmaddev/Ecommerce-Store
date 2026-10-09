import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-gray-900 mb-6">Our Story</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Lūmen was born from a simple belief: that everyday essentials should be beautiful, sustainable, and built to last.
          </p>
        </div>
      </section>

      <section className="mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="aspect-[16/9] bg-gray-100 relative">
            <Image src="https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwd29ya3NwYWNlJTIwbWluaW1hbHxlbnwxfHx8fDE3NjE3MjY3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Workspace" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] bg-gray-200 relative">
              <Image src="https://images.unsplash.com/photo-1678025546757-666c1f397c2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjE3OTQ0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Sustainable" fill className="object-cover" />
            </div>
            <div className="space-y-6">
              <h2 className="text-gray-900">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                We believe in creating products that enrich daily life while respecting our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <h3 className="text-gray-900">Sustainable</h3>
              <p className="text-gray-600 text-sm">Eco-friendly materials and production.</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-gray-900">Quality First</h3>
              <p className="text-gray-600 text-sm">Built to last for years.</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-gray-900">Transparency</h3>
              <p className="text-gray-600 text-sm">Open about our practices.</p>
            </div>
            <div className="text-center space-y-3">
              <h3 className="text-gray-900">Community</h3>
              <p className="text-gray-600 text-sm">Supporting local artisans.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center px-4 md:px-8">
          <h2 className="text-gray-900 mb-6">Join Our Journey</h2>
          <p className="text-gray-700 mb-8">Explore our collection and discover products made with purpose.</p>
          <Link href="/shop" className="px-8 py-3.5 bg-gray-900 text-white tracking-wide hover:bg-gray-800 inline-block">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}