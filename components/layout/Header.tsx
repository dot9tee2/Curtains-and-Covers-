'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, Menu, X, Phone, User, PackageSearch } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { getTotals } = useCart();
  const { itemCount } = getTotals();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container-custom">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>Free Consultation & Measurement</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Premium Quality Guaranteed</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+1234567890" 
                className="flex items-center space-x-1 hover:text-secondary transition-colors"
              >
                <Phone size={14} />
                <span>Call: +1 (234) 567-890</span>
              </a>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-custom py-2">
        <div className="flex items-center justify-between gap-4 min-h-[56px] w-full">
          {/* Logo */}
          <div className="flex items-center min-w-0 flex-shrink-0">
            <Logo />
          </div>
          {/* Search Bar (centered, always visible) */}
          <div className="flex-1 flex justify-center px-4">
            <form className="w-full max-w-lg">
              <div className="relative flex">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary text-base"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-700 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>
          {/* Right Side Actions */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {/* Order Tracking */}
            <Link
              href="/order-tracking"
              className="flex flex-col items-center text-gray-600 hover:text-secondary transition-colors text-xs"
              aria-label="Order Tracking"
            >
              <PackageSearch size={22} />
              <span className="mt-1 font-medium">Order Tracking</span>
            </Link>
            {/* Account */}
            <Link
              href={user ? "/profile" : "/signin"}
              className="flex flex-col items-center text-gray-600 hover:text-secondary transition-colors text-xs"
              aria-label="Account"
            >
              <User size={22} />
              <span className="mt-1 font-medium">My Account</span>
            </Link>
            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col items-center relative text-gray-600 hover:text-secondary transition-colors text-xs"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-secondary text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold border-2 border-white">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="mt-1 font-medium">My Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t bg-gray-50"
        >
          <div className="container-custom py-4">
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search curtains, covers, fabrics..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t bg-white"
        >
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              {/* No navigation links in mobile menu */}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header; 