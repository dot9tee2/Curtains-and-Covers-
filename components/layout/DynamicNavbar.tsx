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

const DynamicNavbar = ({ categories }: DynamicNavbarProps) => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<{ [key: string]: Product[] }>({});
  const [isAllProductsHovered, setIsAllProductsHovered] = useState(false);

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

  const handleCategoryHover = (categorySlug: string) => {
    setHoveredCategory(categorySlug);
    setIsAllProductsHovered(false);
    fetchProductsForCategory(categorySlug);
  };

  const handleAllProductsHover = () => {
    setIsAllProductsHovered(true);
    setHoveredCategory(null);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setIsAllProductsHovered(false);
  };

  return (
    <div className="bg-cyan-400 border-b border-gray-200 relative">
      <div className="container mx-auto px-4">
        <nav className="hidden lg:flex items-center space-x-8 py-3">
          {/* All Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleAllProductsHover}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center space-x-1 text-white hover:text-gray-200 font-medium py-2 transition-colors">
              <span>All Products</span>
              <ChevronDown size={16} className={`transition-transform ${isAllProductsHovered ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isAllProductsHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6 min-w-[600px] z-50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {categories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/categories/${category.slug.current}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-cyan-500">
                            {category.title}
                          </h4>
                          {category.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                              {category.description}
                            </p>
                          )}
                          <span className="text-xs text-gray-400 mt-1">
                            {category.productCount || 0} products
                          </span>
                        </div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-cyan-500 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link 
                      href="/categories"
                      className="text-cyan-500 hover:text-cyan-600 font-medium text-sm flex items-center space-x-1"
                    >
                      <span>View All Categories</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Individual Category Links */}
          {categories.slice(0, 4).map((category) => (
            <div
              key={category._id}
              className="relative"
              onMouseEnter={() => handleCategoryHover(category.slug.current)}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                href={`/categories/${category.slug.current}`}
                className="flex items-center space-x-1 text-white hover:text-gray-200 font-medium py-2 transition-colors"
              >
                <span>{category.title}</span>
                <ChevronDown size={16} className={`transition-transform ${hoveredCategory === category.slug.current ? 'rotate-180' : ''}`} />
              </Link>

              <AnimatePresence>
                {hoveredCategory === category.slug.current && products[category.slug.current] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6 min-w-[500px] z-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {products[category.slug.current].map((product) => (
                        <Link
                          key={product._id}
                          href={`/product/${product.slug.current}`}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                              {product.title.substring(0, 2).toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 group-hover:text-cyan-500 text-sm line-clamp-1">
                              {product.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              From ${product.basePrice}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {products[category.slug.current].length >= 8 && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <Link 
                          href={`/categories/${category.slug.current}`}
                          className="text-cyan-500 hover:text-cyan-600 font-medium text-sm flex items-center space-x-1"
                        >
                          <span>View All {category.title}</span>
                          <ArrowRight size={14} />
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
            className="text-white hover:text-gray-200 font-medium py-2 transition-colors"
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
          <div className="flex items-center space-x-4 overflow-x-auto">
            <Link 
              href="/categories"
              className="text-white hover:text-gray-200 font-medium py-2 px-3 whitespace-nowrap transition-colors text-sm"
            >
              All Products
            </Link>
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug.current}`}
                className="text-white hover:text-gray-200 font-medium py-2 px-3 whitespace-nowrap transition-colors text-sm"
              >
                {category.title}
              </Link>
            ))}
            <Link 
              href="/custom-covers"
              className="text-white hover:text-gray-200 font-medium py-2 px-3 whitespace-nowrap transition-colors text-sm"
            >
              Custom Covers
            </Link>
            <Link 
              href="/contact?request=quote"
              className="bg-white text-cyan-500 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-xs whitespace-nowrap"
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