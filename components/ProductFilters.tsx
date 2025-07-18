'use client'

import { useState } from 'react'

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

interface AvailableFilters {
  materials: string[]
  addons: string[]
}

interface ProductFiltersProps {
  filters: Filters
  availableFilters: AvailableFilters
  onFilterChange: (filters: Partial<Filters>) => void
}

export default function ProductFilters({ filters, availableFilters, onFilterChange }: ProductFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleMaterialChange = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter(m => m !== material)
      : [...filters.materials, material]
    
    onFilterChange({ materials: newMaterials })
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
        </button>
      </div>

      {/* Materials Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Materials</h4>
        <div className="space-y-2">
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
      </div>

      {/* Add-ons Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Preferred Add-ons</h4>
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
        <p className="text-xs text-gray-500 mt-2">
          Note: All products support these add-ons. This filter helps highlight your preferences.
        </p>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Size Range (inches)</h4>
          
          {/* Width Range */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Width Range: {filters.sizeRange.minWidth}" - {filters.sizeRange.maxWidth}"
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min Width</label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={filters.sizeRange.minWidth}
                  onChange={(e) => handleSizeRangeChange('minWidth', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-600 mt-1">{filters.sizeRange.minWidth}"</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max Width</label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={filters.sizeRange.maxWidth}
                  onChange={(e) => handleSizeRangeChange('maxWidth', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-600 mt-1">{filters.sizeRange.maxWidth}"</div>
              </div>
            </div>
          </div>

          {/* Height Range */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Height Range: {filters.sizeRange.minHeight}" - {filters.sizeRange.maxHeight}"
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Min Height</label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={filters.sizeRange.minHeight}
                  onChange={(e) => handleSizeRangeChange('minHeight', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-600 mt-1">{filters.sizeRange.minHeight}"</div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Max Height</label>
                <input
                  type="range"
                  min="12"
                  max="120"
                  value={filters.sizeRange.maxHeight}
                  onChange={(e) => handleSizeRangeChange('maxHeight', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-xs text-gray-600 mt-1">{filters.sizeRange.maxHeight}"</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Note: Since all products are custom-made, size filtering is for reference. All products can be made to any size within our manufacturing limits.
          </p>
        </div>
      )}
    </div>
  )
} 