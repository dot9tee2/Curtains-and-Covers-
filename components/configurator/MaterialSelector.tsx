'use client'

import React, { useState } from 'react'
import { VariationOption, Material } from '@/types/product'
import Image from 'next/image'

interface MaterialSelectorProps {
  options: VariationOption
  selected?: string
  onChange: (value: string) => void
  materials?: Material[] // Enhanced material data
}

export default function MaterialSelector({ options, selected, onChange, materials }: MaterialSelectorProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (!options?.options || options.options.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Materials</h3>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <p className="text-yellow-800">No materials available for this product.</p>
        </div>
      </div>
    )
  }

  // Get enhanced material data
  const getEnhancedMaterial = (materialId: string): Material | null => {
    return materials?.find(m => m._id === materialId) || null
  }

  const renderPerformanceRating = (rating: number | undefined, label: string) => {
    if (!rating) return null;
    
    return (
      <div className="flex items-center space-x-2">
        <span className="text-xs text-gray-600">{label}:</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i <= rating ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-700">{rating}/5</span>
      </div>
    )
  }

  const renderSuitabilityBadges = (material: Material) => {
    const badges: string[] = []
    const props = material.properties || {}
    const apps = material.applications || {}
    
    if (props.waterproofRating && props.waterproofRating >= 4) badges.push('Waterproof')
    if (props.uvResistanceRating && props.uvResistanceRating >= 4) badges.push('UV Resistant')
    if (apps.outdoorUse) badges.push('Outdoor')
    if (apps.marineUse) badges.push('Marine Grade')
    if (props.fireRetardant) badges.push('Fire Retardant')
    if (props.antimicrobial) badges.push('Antimicrobial')
    if (material.sustainability?.ecoFriendly) badges.push('Eco-Friendly')
    
    return badges.slice(0, 3) // Show max 3 badges
  }

  const MaterialCard = ({ material, enhanced }: { material: any, enhanced: Material | null }) => (
    <div
      className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
        selected === material.id
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={() => onChange(material.id)}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Material Image */}
            {(material.image || enhanced?.image) && (
              <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                <Image
                  src={material.image || enhanced?.image || ''}
                  alt={material.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Basic Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-lg">{material.name}</h4>
                <span className="text-lg font-bold text-blue-600">
                  +{formatPrice(material.price)}
                </span>
              </div>
              
              {/* Category */}
              {enhanced?.category && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mb-2 capitalize">
                  {enhanced.category}
                </span>
              )}
              
              {material.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{material.description}</p>
              )}
            </div>
          </div>

          {/* Selection Indicator */}
          {selected === material.id && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ml-4">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>

        {/* Enhanced Content */}
        {enhanced && (
          <>
            {/* Suitability Badges */}
            <div className="flex flex-wrap gap-2">
              {renderSuitabilityBadges(enhanced).map((badge, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Performance Ratings */}
            {viewMode === 'list' && (
              <div className="space-y-2 bg-gray-50 rounded-lg p-3">
                {renderPerformanceRating(enhanced.properties?.waterproofRating, 'Waterproof')}
                {renderPerformanceRating(enhanced.properties?.uvResistanceRating, 'UV Resistant')}
                {renderPerformanceRating(enhanced.properties?.tearStrength, 'Durability')}
              </div>
            )}

            {/* Technical Specs Preview */}
            {enhanced.technicalSpecs && (
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                {enhanced.technicalSpecs.weight && (
                  <div>Weight: {enhanced.technicalSpecs.weight} GSM</div>
                )}
                {enhanced.technicalSpecs.composition && (
                  <div>Material: {enhanced.technicalSpecs.composition}</div>
                )}
                {enhanced.properties?.warranty && (
                  <div>Warranty: {enhanced.properties.warranty}</div>
                )}
                {enhanced.supplier?.stockLevel && (
                  <div className={`font-medium ${
                    enhanced.supplier.stockLevel === 'in-stock' ? 'text-green-600' :
                    enhanced.supplier.stockLevel === 'low-stock' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {enhanced.supplier.stockLevel.replace('-', ' ').toUpperCase()}
                  </div>
                )}
              </div>
            )}

            {/* Sustainability Icons */}
            {enhanced.sustainability && (
              <div className="flex space-x-3 text-sm">
                {enhanced.sustainability.recyclable && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Recyclable
                  </div>
                )}
                {enhanced.sustainability.ecoFriendly && (
                  <div className="flex items-center text-green-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    Eco-Friendly
                  </div>
                )}
              </div>
            )}

            {/* Detail Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDetails(showDetails === material.id ? null : material.id)
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showDetails === material.id ? 'Hide Details' : 'Show Details'}
            </button>

            {/* Detailed Information Panel */}
            {showDetails === material.id && (
              <div className="mt-4 p-4 bg-white border rounded-lg space-y-4">
                {/* Technical Specifications */}
                {enhanced.technicalSpecs && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Technical Specifications</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                      {enhanced.technicalSpecs.composition && (
                        <div><strong>Composition:</strong> {enhanced.technicalSpecs.composition}</div>
                      )}
                      {enhanced.technicalSpecs.weight && (
                        <div><strong>Weight:</strong> {enhanced.technicalSpecs.weight} GSM</div>
                      )}
                      {enhanced.technicalSpecs.thickness && (
                        <div><strong>Thickness:</strong> {enhanced.technicalSpecs.thickness}mm</div>
                      )}
                      {enhanced.technicalSpecs.finish && (
                        <div><strong>Finish:</strong> {enhanced.technicalSpecs.finish}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Care Instructions */}
                {enhanced.careInstructions && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Care Instructions</h5>
                    {enhanced.careInstructions.cleaning && (
                      <p className="text-sm text-gray-600">{enhanced.careInstructions.cleaning}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {enhanced.careInstructions.washable && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Machine Washable</span>
                      )}
                      {enhanced.careInstructions.dryCleanOnly && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Dry Clean Only</span>
                      )}
                      {enhanced.careInstructions.bleachSafe && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Bleach Safe</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Applications */}
                {enhanced.applications && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Best Used For</h5>
                    {enhanced.applications.recommended && enhanced.applications.recommended.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {enhanced.applications.recommended.slice(0, 4).map((use, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {use}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Choose Material
          {options.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Materials Grid/List */}
      <div className={`space-y-4 ${viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}`}>
        {options.options.map((material) => {
          const enhanced = getEnhancedMaterial(material.id)
          return (
            <MaterialCard
              key={material.id}
              material={material}
              enhanced={enhanced}
            />
          )
        })}
      </div>

      {/* Selection Summary */}
      {selected && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium text-green-800">
                Material selected: {options.options.find(m => m.id === selected)?.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-green-800">
              +{formatPrice(options.options.find(m => m.id === selected)?.price || 0)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 