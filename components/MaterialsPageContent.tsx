'use client'

import React, { useState, useMemo } from 'react'
import { Material, MaterialCategory } from '@/types/product'
import MaterialShowcaseCard from './MaterialShowcaseCard'
import MaterialDetailModal from './MaterialDetailModal'

interface MaterialsPageContentProps {
  materials: Material[]
}

export default function MaterialsPageContent({ materials }: MaterialsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | 'all'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'featured'>('featured')

  // Get unique categories
  const categories = useMemo(() => {
    const categorySet = new Set(materials.map(m => m.category).filter(Boolean))
    const cats = Array.from(categorySet) as MaterialCategory[]
    return cats.sort()
  }, [materials])

  // Filter and sort materials
  const filteredMaterials = useMemo(() => {
    let filtered = materials.filter(material => {
      const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory
      const matchesSearch = searchTerm === '' || 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      return matchesCategory && matchesSearch
    })

    // Sort materials
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.title.localeCompare(b.title)
        case 'category':
          if (a.category !== b.category) {
            return (a.category || '').localeCompare(b.category || '')
          }
          return a.title.localeCompare(b.title)
        case 'featured':
        default:
          // Featured first, then by display order, then by name
          if (a.seo?.featured !== b.seo?.featured) {
            return (b.seo?.featured ? 1 : 0) - (a.seo?.featured ? 1 : 0)
          }
          if (a.displayOrder !== b.displayOrder) {
            return (a.displayOrder || 999) - (b.displayOrder || 999)
          }
          return a.title.localeCompare(b.title)
      }
    })

    return filtered
  }, [materials, selectedCategory, searchTerm, sortBy])

  // Get category stats
  const categoryStats = useMemo(() => {
    const stats: { [key: string]: number } = {}
    materials.forEach(material => {
      if (material.category) {
        stats[material.category] = (stats[material.category] || 0) + 1
      }
    })
    return stats
  }, [materials])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Filters and Search */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All Materials ({materials.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {category} ({categoryStats[category] || 0})
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredMaterials.length} of {materials.length} materials
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'name' | 'category' | 'featured')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="featured">Sort by Featured</option>
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      {/* Materials Grid */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMaterials.map((material) => (
            <MaterialShowcaseCard
              key={material._id}
              material={material}
              onClick={() => setSelectedMaterial(material)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No materials found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or filters to find materials.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Key Features Section */}
      <div className="mt-16 bg-white rounded-xl shadow-sm border p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Materials?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every material in our collection is carefully selected and tested to ensure superior performance, 
            durability, and weather resistance for your custom covers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Quality Tested</h3>
            <p className="text-sm text-gray-600">Every material undergoes rigorous testing for performance and durability.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Weather Resistant</h3>
            <p className="text-sm text-gray-600">UV resistant, waterproof, and designed to withstand harsh conditions.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Long Warranties</h3>
            <p className="text-sm text-gray-600">Extended warranties from 2 to 10 years depending on material grade.</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Eco-Conscious</h3>
            <p className="text-sm text-gray-600">Many materials feature recycled content and eco-friendly properties.</p>
          </div>
        </div>
      </div>

      {/* Material Detail Modal */}
      {selectedMaterial && (
        <MaterialDetailModal
          material={selectedMaterial}
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
        />
      )}
    </div>
  )
} 