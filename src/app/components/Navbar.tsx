'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const linkClass = (path: string) =>
    `transition hover:text-indigo-600 ${
      isActive(path) ? 'text-indigo-700 font-semibold' : 'text-gray-700'
    }`;

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-indigo-700">
          Cyberlegal.AI
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <a href="#features" className="text-gray-700 hover:text-indigo-600 transition">About</a>
          <Link href="/login" className={linkClass('/login')}>Login</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700 hover:text-indigo-600 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <nav className="flex flex-col p-4 space-y-3 text-sm font-medium">
            <Link href="/" className={linkClass('/')} onClick={() => setMobileOpen(false)}>Home</Link>
            <a href="#features" className="text-gray-700 hover:text-indigo-600" onClick={() => setMobileOpen(false)}>About</a>
            <Link href="/login" className={linkClass('/login')} onClick={() => setMobileOpen(false)}>Login</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
