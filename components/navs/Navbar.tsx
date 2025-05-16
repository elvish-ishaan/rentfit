import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">RentFit</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/orders" className="text-gray-600 hover:text-indigo-600 transition-colors">My Orders</Link>
            <Link href="/explore" className="text-gray-600 hover:text-indigo-600 transition-colors">Collections</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How It Works</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-indigo-600 transition-colors">Testimonials</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {session?.user ? (
              <Button onClick={() => signOut()} className="bg-indigo-600 hover:bg-indigo-700">
                Sign Out
              </Button>
            ) : (
              <Link href="/auth/sign-in" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 pb-4">
            <Link href="/orders" className="block py-2 text-gray-600 hover:text-indigo-600">My Orders</Link>
            <Link href="#collections" className="block py-2 text-gray-600 hover:text-indigo-600">Collections</Link>
            <Link href="#how-it-works" className="block py-2 text-gray-600 hover:text-indigo-600">How It Works</Link>
            <Link href="#pricing" className="block py-2 text-gray-600 hover:text-indigo-600">Pricing</Link>
            <Link href="#testimonials" className="block py-2 text-gray-600 hover:text-indigo-600">Testimonials</Link>
            <div className="pt-4 border-t border-gray-200 mt-2">
              {session?.user ? (
                <Button onClick={() => signOut()} className="bg-indigo-600 hover:bg-indigo-700 w-full mt-2">
                  Sign Out
                </Button>
              ) : (
                <Link href="/auth/sign-in" className="text-gray-600 hover:text-indigo-600 transition-colors">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
