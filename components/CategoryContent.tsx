'use client'

import React, { useState, useMemo } from 'react'
import { Product, Material } from '@/types/product'
import ProductCard from './ProductCard'
import ProductFilters from './ProductFilters'

interface Filters {
  materials: string[]
  materialCategories: string[]
  performanceFeatures: string[]
  sustainabilityFeatures: string[]
  sizeRange: {
    minWidth: number
    maxWidth: number
    minHeight: number
    maxHeight: number
  }
  addons: string[]
  sortBy: string
  priceRange: {
    min: number
    max: number
  }
}

interface CategoryContentProps {
  products: Product[]
  categoryName: string
  categorySlug: string
}

export default function CategoryContent({ products, categoryName, categorySlug }: CategoryContentProps) {
  const [filters, setFilters] = useState<Filters>({
    materials: [],
    materialCategories: [],
    performanceFeatures: [],
    sustainabilityFeatures: [],
    sizeRange: {
      minWidth: 12,
      maxWidth: 120,
      minHeight: 12,
      maxHeight: 120
    },
    addons: [],
    sortBy: 'name',
    priceRange: {
      min: 0,
      max: 1000
    }
  })

  const [showFilters, setShowFilters] = useState(false)

  // Get unique filters from all products using enhanced material data
  const availableFilters = useMemo(() => {
    const materials = new Set<string>()
    const materialCategories = new Set<string>()
    const performanceFeatures = new Set<string>()
    const sustainabilityFeatures = new Set<string>()
    const addons = new Set<string>()

    products.forEach(product => {
      // Material names
      product.materials?.forEach(material => {
        materials.add(material.title)
        
        // Material categories
        if (material.category) {
          materialCategories.add(material.category)
        }
        
        // Performance features
        const props = material.properties
        if (props?.waterproofRating && props.waterproofRating >= 4) {
          performanceFeatures.add('Waterproof')
        }
        if (props?.uvResistanceRating && props.uvResistanceRating >= 4) {
          performanceFeatures.add('UV Resistant')
        }
        if (props?.tearStrength && props.tearStrength >= 4) {
          performanceFeatures.add('Heavy Duty')
        }
        if (props?.abrasionResistance && props.abrasionResistance >= 4) {
          performanceFeatures.add('Long Lasting')
        }
        if (props?.fireRetardant) {
          performanceFeatures.add('Fire Retardant')
        }
        if (props?.antimicrobial) {
          performanceFeatures.add('Antimicrobial')
        }
        if (props?.wipeClean) {
          performanceFeatures.add('Easy Clean')
        }
        if (material.applications?.marineUse) {
          performanceFeatures.add('Marine Grade')
        }
        if (material.applications?.commercialGrade) {
          performanceFeatures.add('Commercial Grade')
        }
        
        // Sustainability features
        const sustainability = material.sustainability
        if (sustainability?.recyclable) {
          sustainabilityFeatures.add('Recyclable')
        }
        if (sustainability?.ecoFriendly) {
          sustainabilityFeatures.add('Eco-Friendly')
        }
        if (sustainability?.recycledContent && sustainability.recycledContent > 50) {
          sustainabilityFeatures.add('Recycled Content')
        }
        if (sustainability?.biodegradable) {
          sustainabilityFeatures.add('Biodegradable')
        }
        if (sustainability?.carbonFootprint === 'low') {
          sustainabilityFeatures.add('Low Carbon Footprint')
        }
      })
    })

    // Add common addons
    addons.add('Custom Branding')
    addons.add('Velcro Fastening')
    addons.add('Eyelets & Grommets')
    addons.add('Reinforced Edges')
    addons.add('Wind Vents')
    addons.add('Weighted Hems')

    return {
      materials: Array.from(materials).sort(),
      materialCategories: Array.from(materialCategories).sort(),
      performanceFeatures: Array.from(performanceFeatures).sort(),
      sustainabilityFeatures: Array.from(sustainabilityFeatures).sort(),
      addons: Array.from(addons).sort()
    }
  }, [products])

  // Filter and sort products using enhanced material data
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by specific materials
    if (filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        product.materials?.some(material => 
          filters.materials.includes(material.title)
        ) || false
      )
    }

    // Filter by material categories
    if (filters.materialCategories.length > 0) {
      filtered = filtered.filter(product =>
        product.materials?.some(material => 
          material.category && filters.materialCategories.includes(material.category)
        ) || false
      )
    }

    // Filter by performance features
    if (filters.performanceFeatures.length > 0) {
      filtered = filtered.filter(product =>
        product.materials?.some(material => {
          const props = material.properties
          const apps = material.applications
          
          return filters.performanceFeatures.some(feature => {
            switch (feature) {
              case 'Waterproof':
                return props?.waterproofRating && props.waterproofRating >= 4
              case 'UV Resistant':
                return props?.uvResistanceRating && props.uvResistanceRating >= 4
              case 'Heavy Duty':
                return props?.tearStrength && props.tearStrength >= 4
              case 'Long Lasting':
                return props?.abrasionResistance && props.abrasionResistance >= 4
              case 'Fire Retardant':
                return props?.fireRetardant
              case 'Antimicrobial':
                return props?.antimicrobial
              case 'Easy Clean':
                return props?.wipeClean
              case 'Marine Grade':
                return apps?.marineUse
              case 'Commercial Grade':
                return apps?.commercialGrade
              default:
                return false
            }
          })
        }) || false
      )
    }

    // Filter by sustainability features
    if (filters.sustainabilityFeatures.length > 0) {
      filtered = filtered.filter(product =>
        product.materials?.some(material => {
          const sustainability = material.sustainability
          
          return filters.sustainabilityFeatures.some(feature => {
            switch (feature) {
              case 'Recyclable':
                return sustainability?.recyclable
              case 'Eco-Friendly':
                return sustainability?.ecoFriendly
              case 'Recycled Content':
                return sustainability?.recycledContent && sustainability.recycledContent > 50
              case 'Biodegradable':
                return sustainability?.biodegradable
              case 'Low Carbon Footprint':
                return sustainability?.carbonFootprint === 'low'
              default:
                return false
            }
          })
        }) || false
      )
    }

    // Filter by price range
    if (filters.priceRange.min > 0 || filters.priceRange.max < 1000) {
      filtered = filtered.filter(product =>
        product.basePrice >= filters.priceRange.min && 
        product.basePrice <= filters.priceRange.max
      )
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.basePrice - b.basePrice
        case 'price-high':
          return b.basePrice - a.basePrice
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        case 'featured':
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.name.localeCompare(b.name)
        case 'newest':
          // In real implementation, you'd sort by creation date
          return a.name.localeCompare(b.name)
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
      materialCategories: [],
      performanceFeatures: [],
      sustainabilityFeatures: [],
      sizeRange: {
        minWidth: 12,
        maxWidth: 120,
        minHeight: 12,
        maxHeight: 120
      },
      addons: [],
      sortBy: 'name',
      priceRange: {
        min: 0,
        max: 1000
      }
    })
  }

  const getActiveFilterCount = () => {
    return filters.materials.length + 
           filters.materialCategories.length + 
           filters.performanceFeatures.length + 
           filters.sustainabilityFeatures.length + 
           filters.addons.length
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {categoryName}
        </h1>
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {getActiveFilterCount() > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                ({getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied)
              </span>
            )}
          </p>
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
            </svg>
            <span>Filters</span>
            {getActiveFilterCount() > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <ProductFilters
            filters={filters}
            availableFilters={availableFilters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.464-.881-6.08-2.33"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your filters to see more results.
              </p>
              {getActiveFilterCount() > 0 && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 