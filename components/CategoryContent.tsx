'use client'

import { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'
import { Product } from '@/types/product'

interface CategoryContentProps {
  products: Product[]
  categoryName: string
  categorySlug: string
}

interface Filters {
  materials: string[]
  sizeRange: {
    minWidth: number
    maxWidth: number
    minHeight: number
    maxHeight: number
  }
  addons: string[]
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating'
}

export default function CategoryContent({ products, categoryName, categorySlug }: CategoryContentProps) {
  const [filters, setFilters] = useState<Filters>({
    materials: [],
    sizeRange: {
      minWidth: 12,
      maxWidth: 120,
      minHeight: 12,
      maxHeight: 120
    },
    addons: [],
    sortBy: 'name'
  })

  const [showFilters, setShowFilters] = useState(false)

  // Get unique materials and addons from all products
  const availableFilters = useMemo(() => {
    const materials = new Set<string>()
    const addons = new Set<string>()

    products.forEach(product => {
      product.materials.forEach(material => materials.add(material.name))
    })

    // Add common addons
    addons.add('Velcro')
    addons.add('Eyelets')
    addons.add('Custom Logo')

    return {
      materials: Array.from(materials),
      addons: Array.from(addons)
    }
  }, [products])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by materials
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        product.materials.some(material => filters.materials.includes(material.name))
      )
    }

    // Note: Size filtering would be more meaningful with actual size constraints per product
    // For now, we'll include all products as they're customizable

    // Filter by addons - all products support the same addons in this implementation
    // So this filter doesn't exclude products but could be used for highlighting

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.basePrice - b.basePrice
        case 'price-high':
          return b.basePrice - a.basePrice
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, filters])

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      materials: [],
      sizeRange: {
        minWidth: 12,
        maxWidth: 120,
        minHeight: 12,
        maxHeight: 120
      },
      addons: [],
      sortBy: 'name'
    })
  }

  return (
    <div className="space-y-6">
      {/* Filter Toggle & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {(filters.materials.length > 0 || filters.addons.length > 0) && (
              <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {filters.materials.length + filters.addons.length}
              </span>
            )}
          </button>

          {(filters.materials.length > 0 || filters.addons.length > 0) && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort by:
          </label>
          <select
            id="sort"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange({ sortBy: e.target.value as Filters['sortBy'] })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <ProductFilters
            filters={filters}
            availableFilters={availableFilters}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m8 0V4.5" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your filters to see more results.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
} 