import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div>
            <h3 className="text-gray-900 tracking-wider mb-4">LŪMEN</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Thoughtfully crafted essentials for intentional living.</p>
          </div>
          <div>
            <h4 className="text-gray-900 text-sm tracking-wide mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Bestsellers</Link></li>
              <li><Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Sale</Link></li>
              <li><Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 text-sm tracking-wide mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-600 text-sm hover:text-gray-900 transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-900 text-sm tracking-wide mb-4">Newsletter</h4>
            <p className="text-gray-600 text-sm mb-4">Subscribe for updates and exclusive offers.</p>
            <form className="space-y-2">
              <input type="email" placeholder="Email" className="w-full px-4 py-2.5 bg-white border border-gray-200 text-sm focus:outline-none focus:border-gray-900" />
              <button type="submit" className="w-full px-4 py-2.5 bg-gray-900 text-white text-sm tracking-wide hover:bg-gray-800">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© 2025 Lūmen. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}