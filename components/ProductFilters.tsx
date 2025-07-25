'use client'

import React, { useState } from 'react'
import { Material } from '@/types/product'

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

interface AvailableFilters {
  materials: string[]
  materialCategories: string[]
  performanceFeatures: string[]
  sustainabilityFeatures: string[]
  addons: string[]
}

interface ProductFiltersProps {
  filters: Filters
  availableFilters: AvailableFilters
  onFilterChange: (filters: Partial<Filters>) => void
}

export default function ProductFilters({ filters, availableFilters, onFilterChange }: ProductFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    materials: true,
    performance: false,
    sustainability: false,
    pricing: false
  })

  const handleMaterialChange = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter(m => m !== material)
      : [...filters.materials, material]
    
    onFilterChange({ materials: newMaterials })
  }

  const handleMaterialCategoryChange = (category: string) => {
    const newCategories = filters.materialCategories.includes(category)
      ? filters.materialCategories.filter(c => c !== category)
      : [...filters.materialCategories, category]
    
    onFilterChange({ materialCategories: newCategories })
  }

  const handlePerformanceFeatureChange = (feature: string) => {
    const newFeatures = filters.performanceFeatures.includes(feature)
      ? filters.performanceFeatures.filter(f => f !== feature)
      : [...filters.performanceFeatures, feature]
    
    onFilterChange({ performanceFeatures: newFeatures })
  }

  const handleSustainabilityFeatureChange = (feature: string) => {
    const newFeatures = filters.sustainabilityFeatures.includes(feature)
      ? filters.sustainabilityFeatures.filter(f => f !== feature)
      : [...filters.sustainabilityFeatures, feature]
    
    onFilterChange({ sustainabilityFeatures: newFeatures })
  }

  const handleAddonChange = (addon: string) => {
    const newAddons = filters.addons.includes(addon)
      ? filters.addons.filter(a => a !== addon)
      : [...filters.addons, addon]
    
    onFilterChange({ addons: newAddons })
  }

  const handleSizeRangeChange = (field: keyof Filters['sizeRange'], value: number) => {
    onFilterChange({
      sizeRange: {
        ...filters.sizeRange,
        [field]: value
      }
    })
  }

  const handlePriceRangeChange = (field: keyof Filters['priceRange'], value: number) => {
    onFilterChange({
      priceRange: {
        ...filters.priceRange,
        [field]: value
      }
    })
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearAllFilters = () => {
    onFilterChange({
      materials: [],
      materialCategories: [],
      performanceFeatures: [],
      sustainabilityFeatures: [],
      addons: [],
      sizeRange: {
        minWidth: 12,
        maxWidth: 120,
        minHeight: 12,
        maxHeight: 120
      },
      priceRange: {
        min: 0,
        max: 1000
      },
      sortBy: 'name'
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
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {showAdvanced ? 'Basic' : 'Advanced'}
          </button>
          {getActiveFilterCount() > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="rating">Rating</option>
          <option value="featured">Featured First</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {/* Material Categories */}
      <div>
        <button
          onClick={() => toggleSection('materialCategories')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
        >
          <span>Material Categories</span>
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.materialCategories ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.materialCategories && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableFilters.materialCategories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.materialCategories.includes(category)}
                  onChange={() => handleMaterialCategoryChange(category)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700 capitalize">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Specific Materials */}
      <div>
        <button
          onClick={() => toggleSection('materials')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
        >
          <span>Specific Materials</span>
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.materials ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.materials && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {availableFilters.materials.map((material) => (
              <label key={material} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={() => handleMaterialChange(material)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Performance Features */}
      <div>
        <button
          onClick={() => toggleSection('performance')}
          className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
        >
          <span>Performance Features</span>
          <svg
            className={`w-4 h-4 transition-transform ${expandedSections.performance ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {expandedSections.performance && (
          <div className="space-y-2">
            {availableFilters.performanceFeatures.map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.performanceFeatures.includes(feature)}
                  onChange={() => handlePerformanceFeatureChange(feature)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-3 text-sm text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sustainability Features */}
      {showAdvanced && (
        <div>
          <button
            onClick={() => toggleSection('sustainability')}
            className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
          >
            <span>Sustainability</span>
            <svg
              className={`w-4 h-4 transition-transform ${expandedSections.sustainability ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.sustainability && (
            <div className="space-y-2">
              {availableFilters.sustainabilityFeatures.map((feature) => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.sustainabilityFeatures.includes(feature)}
                    onChange={() => handleSustainabilityFeatureChange(feature)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700 flex items-center">
                    <svg className="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range */}
      {showAdvanced && (
        <div>
          <button
            onClick={() => toggleSection('pricing')}
            className="flex items-center justify-between w-full text-sm font-medium text-gray-900 mb-3"
          >
            <span>Price Range (per sq ft)</span>
            <svg
              className={`w-4 h-4 transition-transform ${expandedSections.pricing ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSections.pricing && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Min: ${filters.priceRange.min}
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="5"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">
                  Max: ${filters.priceRange.max}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add-ons Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Add-ons & Features</h4>
        <div className="space-y-2">
          {availableFilters.addons.map((addon) => (
            <label key={addon} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.addons.includes(addon)}
                onChange={() => handleAddonChange(addon)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-3 text-sm text-gray-700">{addon}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Size Range (Advanced) */}
      {showAdvanced && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Size Range (inches)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Min Width: {filters.sizeRange.minWidth}"
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={filters.sizeRange.minWidth}
                onChange={(e) => handleSizeRangeChange('minWidth', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Max Width: {filters.sizeRange.maxWidth}"
              </label>
              <input
                type="range"
                min="12"
                max="240"
                value={filters.sizeRange.maxWidth}
                onChange={(e) => handleSizeRangeChange('maxWidth', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Min Height: {filters.sizeRange.minHeight}"
              </label>
              <input
                type="range"
                min="12"
                max="120"
                value={filters.sizeRange.minHeight}
                onChange={(e) => handleSizeRangeChange('minHeight', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Max Height: {filters.sizeRange.maxHeight}"
              </label>
              <input
                type="range"
                min="12"
                max="240"
                value={filters.sizeRange.maxHeight}
                onChange={(e) => handleSizeRangeChange('maxHeight', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Filter Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
            </span>
            <button
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 