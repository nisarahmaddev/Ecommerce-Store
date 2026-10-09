'use client';

import Link from 'next/link';
import { Menu, Search, User, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 md:px-8'>
        <div className='flex items-center justify-between h-16 md:h-20'>
          <button className='md:hidden text-gray-900' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className='w-6 h-6' />
          </button>
          <Link href='/' className='text-gray-900 tracking-wider font-medium'>LŪMEN</Link>
          <nav className='hidden md:flex items-center gap-8'>
            <Link href='/shop' className='text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors'>Shop</Link>
            <Link href='/shop' className='text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors'>Collections</Link>
            <Link href='/about' className='text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors'>About</Link>
            <Link href='/journal' className='text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors'>Journal</Link>
            <Link href='/contact' className='text-sm tracking-wide text-gray-600 hover:text-gray-900 transition-colors'>Contact</Link>
          </nav>
          <div className='flex items-center gap-4 md:gap-6'>
            <button className='text-gray-900 hover:text-gray-600 transition-colors'><Search className='w-5 h-5' /></button>
            <button className='text-gray-900 hover:text-gray-600 transition-colors'><User className='w-5 h-5' /></button>
            <button className='text-gray-900 hover:text-gray-600 transition-colors relative'>
              <ShoppingBag className='w-5 h-5' />
              <span className='absolute -top-2 -right-2 w-5 h-5 bg-gray-900 text-white text-xs rounded-full flex items-center justify-center'>2</span>
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className='md:hidden border-t border-gray-100 px-4 py-4'>
          <nav className='flex flex-col gap-4'>
            <Link href='/shop' className='text-sm tracking-wide text-gray-600 hover:text-gray-900'>Shop</Link>
            <Link href='/about' className='text-sm tracking-wide text-gray-600 hover:text-gray-900'>About</Link>
            <Link href='/journal' className='text-sm tracking-wide text-gray-600 hover:text-gray-900'>Journal</Link>
            <Link href='/contact' className='text-sm tracking-wide text-gray-600 hover:text-gray-900'>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
