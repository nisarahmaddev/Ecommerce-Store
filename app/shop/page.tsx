import { getAllProducts } from '@/lib/data/products-db';
import { ShopClient } from './ShopClient';

export default async function ShopPage() {
  const products = await getAllProducts();
  
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <ShopClient initialProducts={products} />
    </div>
  );
}