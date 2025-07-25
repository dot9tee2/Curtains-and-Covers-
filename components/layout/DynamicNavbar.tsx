'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  basePrice: number;
  image?: any;
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  productCount?: number;
}

interface DynamicNavbarProps {
  categories: Category[];
}

// Debounce utility
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const DynamicNavbar = ({ categories }: DynamicNavbarProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
  const [isAllProductsHovered, setIsAllProductsHovered] = useState(false);

  // Add state for keyboard navigation
  const allProductsButtonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement | HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsAllProductsHovered(false);
      setHoveredCategory(null);
      allProductsButtonRef.current?.focus();
    }
    if (e.key === 'ArrowDown') {
      const firstLink = dropdownRef.current?.querySelector('a');
      if (firstLink) (firstLink as HTMLElement).focus();
    }
  };

  // Fetch products for a specific category
  const fetchProductsForCategory = async (categorySlug: string) => {
    if (products[categorySlug]) return;

    try {
      const response = await fetch(`/api/products/category/${categorySlug}`);
      if (response.ok) {
        const categoryProducts = await response.json();
        setProducts(prev => ({
          ...prev,
          [categorySlug]: categoryProducts.slice(0, 8)
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const debouncedFetchProductsForCategory = React.useMemo(
    () => debounce(fetchProductsForCategory, 200),
    [products]
  );

  const handleCategoryHover = (categorySlug: string) => {
    setHoveredCategory(categorySlug);
    setIsAllProductsHovered(false);
    debouncedFetchProductsForCategory(categorySlug);
  };

  const handleAllProductsHover = () => {
    setIsAllProductsHovered(true);
    setHoveredCategory(null);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setIsAllProductsHovered(false);
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        allProductsButtonRef.current &&
        !allProductsButtonRef.current.contains(event.target as Node)
      ) {
        setIsAllProductsHovered(false);
        setHoveredCategory(null);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsAllProductsHovered(false);
        setHoveredCategory(null);
        allProductsButtonRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div className="bg-primary border-b border-gray-200 relative">
      <div className="container mx-auto px-4">
        <nav className="hidden lg:flex items-center space-x-8 py-3">
          {/* All Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleAllProductsHover}
            onMouseLeave={handleMouseLeave}
          >
            <button
              ref={allProductsButtonRef}
              className="flex items-center space-x-1 text-white hover:text-secondary transition-colors font-medium py-2"
              aria-haspopup="true"
              aria-expanded={isAllProductsHovered}
              aria-controls="all-products-dropdown"
              onKeyDown={handleKeyDown}
            >
              <span>All Products</span>
              <ChevronDown size={16} className={`transition-transform ${isAllProductsHovered ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isAllProductsHovered && (
                <motion.div
                  id="all-products-dropdown"
                  ref={dropdownRef}
                  role="menu"
                  aria-label="All Products Categories"
                  tabIndex={-1}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-0 mt-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-cyan-200 p-8 min-w-[650px] z-50 ring-1 ring-cyan-100 focus:outline-none"
                  onKeyDown={handleKeyDown}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Browse by Category</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category.slug.current}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 hover:text-secondary transition-colors group"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-secondary">
                            {category.title}
                          </h4>
                          {category.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1 group-hover:text-secondary">
                              {category.description}
                            </p>
                          )}
                          <span className="text-xs text-gray-400 mt-1 group-hover:text-secondary">
                            {category.productCount || 0} products
                          </span>
                        </div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-cyan-100">
                    <Link 
                      href="/categories"
                      className="text-cyan-500 hover:text-secondary font-medium text-sm flex items-center space-x-1 transition-colors"
                    >
                      <span>View All Categories</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Materials Link */}
          <Link 
            href="/materials"
            className="text-white hover:text-secondary transition-colors font-medium py-2"
          >
            Materials
          </Link>

          {/* Individual Category Links */}
          {categories.slice(0, 3).map((category) => (
            <div
              key={category._id}
              className="relative"
              onMouseEnter={() => handleCategoryHover(category.slug.current)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href={`/categories/${category.slug.current}`}
                className="flex items-center space-x-1 text-white hover:text-secondary transition-colors"
              >
                <span>{category.title}</span>
                <ChevronDown size={16} className={`transition-transform ${hoveredCategory === category.slug.current ? 'rotate-180' : ''}`} />
              </Link>

              <AnimatePresence>
                {hoveredCategory === category.slug.current && products[category.slug.current] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-cyan-200 p-8 min-w-[550px] z-50 ring-1 ring-cyan-100"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">{category.title}</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {products[category.slug.current].map((product) => (
                        <Link
                          key={product._id}
                          href={`/product/${product.slug.current}`}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cyan-50 hover:text-secondary transition-colors group border border-transparent hover:border-cyan-200"
                        >
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                            {product.image ? (
                              <img
                                src={typeof product.image === 'string' ? product.image : product.image.url || product.image.asset?.url}
                                alt={product.title}
                                className="object-cover w-full h-full rounded-lg shadow-sm"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                                {product.title.substring(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 group-hover:text-secondary text-base line-clamp-1">
                              {product.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 group-hover:text-secondary">
                              From ${product.basePrice}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {products[category.slug.current].length >= 8 && (
                      <div className="mt-8 pt-6 border-t-2 border-cyan-200 flex justify-end">
                        <Link 
                          href={`/categories/${category.slug.current}`}
                          className="text-cyan-600 hover:text-cyan-700 font-semibold text-base flex items-center space-x-2 transition-colors"
                        >
                          <span>View All {category.title}</span>
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Additional Static Links */}
          <Link 
            href="/custom-covers"
            className="text-white hover:text-secondary transition-colors font-medium py-2"
          >
            Custom Covers
          </Link>
          
          <Link 
            href="/contact?request=quote"
            className="bg-white text-cyan-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-sm ml-auto"
          >
            Request a Quote
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden py-3">
          <div className="flex items-center space-x-4 overflow-x-auto px-2">
            <Link 
              href="/categories"
              className="text-white bg-primary hover:bg-primary-700 font-semibold py-3 px-5 rounded-xl shadow transition-colors text-base whitespace-nowrap flex-shrink-0"
            >
              All Products
            </Link>
            <Link 
              href="/materials"
              className="text-white bg-secondary hover:bg-secondary-700 font-semibold py-3 px-5 rounded-xl shadow transition-colors text-base whitespace-nowrap flex-shrink-0"
            >
              Materials
            </Link>
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug.current}`}
                className="text-white bg-cyan-400 hover:bg-cyan-500 font-semibold py-3 px-5 rounded-xl shadow transition-colors text-base whitespace-nowrap flex-shrink-0"
              >
                {category.title}
              </Link>
            ))}
            <Link 
              href="/custom-covers"
              className="text-white bg-cyan-300 hover:bg-cyan-400 font-semibold py-3 px-5 rounded-xl shadow transition-colors text-base whitespace-nowrap flex-shrink-0"
            >
              Custom Covers
            </Link>
            <Link 
              href="/contact?request=quote"
              className="bg-white text-cyan-600 px-5 py-3 rounded-xl shadow font-semibold text-base whitespace-nowrap flex-shrink-0 border border-cyan-200 hover:bg-cyan-50 transition-colors"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicNavbar; 