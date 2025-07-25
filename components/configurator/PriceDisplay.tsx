'use client'

import React from 'react'
import { PriceBreakdown } from '@/types/product'

interface PriceDisplayProps {
  breakdown: PriceBreakdown
  isValid: boolean
  errors: string[]
  selectedMaterial?: any // Enhanced material data
  onAddToCart?: () => void
  isAddingToCart?: boolean
  showSuccess?: boolean
}

export default function PriceDisplay({ 
  breakdown, 
  isValid, 
  errors, 
  selectedMaterial,
  onAddToCart, 
  isAddingToCart = false,
  showSuccess = false 
}: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Get material benefits for display
  const getMaterialBenefits = () => {
    if (!selectedMaterial) return []
    
    const benefits: string[] = []
    const props = selectedMaterial.properties?.enhancedProperties || selectedMaterial.properties
    
    if (props?.waterproofRating >= 4) benefits.push('100% Waterproof Protection')
    if (props?.uvResistanceRating >= 5) benefits.push('Maximum UV Protection')
    if (props?.tearStrength >= 4) benefits.push('Heavy Duty Construction')
    if (props?.warranty) benefits.push(`${props.warranty} Warranty`)
    if (selectedMaterial.sustainability?.ecoFriendly) benefits.push('Eco-Friendly Material')
    if (props?.fireRetardant) benefits.push('Fire Retardant')
    
    return benefits.slice(0, 3)
  }

  // Check if this is a premium material selection
  const isPremiumMaterial = () => {
    if (!selectedMaterial) return false
    return (breakdown.materialPrice && breakdown.materialPrice > 100) || 
           selectedMaterial.seo?.featured || 
           selectedMaterial.seo?.bestseller
  }

  const materialBenefits = getMaterialBenefits()

  return (
    <div className="sticky top-6 bg-white rounded-xl border border-gray-200 shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">Price Estimate</h3>
        <p className="text-sm text-gray-500">Instant pricing based on your selections</p>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        {/* Base Price */}
        <div className="flex justify-between items-center">
            <span className="text-gray-600">Base Price:</span>
            <span className="font-medium">{formatPrice(breakdown.basePrice)}</span>
          </div>

        {/* Material Price */}
        {breakdown.materialPrice && breakdown.materialPrice > 0 && (
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Material Upgrade:</span>
              {selectedMaterial?.category && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                  {selectedMaterial.category}
                </span>
              )}
            </div>
            <span className="font-medium text-blue-600">+{formatPrice(breakdown.materialPrice)}</span>
          </div>
        )}

        {/* Variation Prices */}
        {breakdown.variationPrices && Object.entries(breakdown.variationPrices).map(([key, price]) => (
          price > 0 && (
            <div key={key} className="flex justify-between items-center">
              <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-medium">+{formatPrice(price)}</span>
                </div>
              )
        ))}

        {/* Add-ons */}
        {breakdown.addOnsTotal > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Add-ons & Features:</span>
            <span className="font-medium">+{formatPrice(breakdown.addOnsTotal)}</span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <span className="text-gray-600">Subtotal:</span>
          <span className="font-medium">{formatPrice(breakdown.subtotal)}</span>
        </div>

        {/* Tax */}
        {breakdown.tax > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">{formatPrice(breakdown.tax)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-2xl font-bold text-blue-600">{formatPrice(breakdown.total)}</span>
        </div>
      </div>

      {/* Material Benefits */}
      {materialBenefits.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Material Benefits
          </h4>
          <ul className="text-sm text-green-800 space-y-1">
            {materialBenefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Premium Material Badge */}
      {isPremiumMaterial() && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium text-purple-900">Premium Material Selected</span>
          </div>
          <p className="text-sm text-purple-800">
            You've selected a premium material with enhanced performance and extended warranty coverage.
          </p>
        </div>
      )}

      {/* Sustainability Info */}
      {selectedMaterial?.sustainability && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <h4 className="font-medium text-emerald-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Sustainability
          </h4>
          <div className="text-sm text-emerald-800 space-y-1">
            {selectedMaterial.sustainability.ecoFriendly && (
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                Eco-friendly manufacturing
              </div>
            )}
            {selectedMaterial.sustainability.recyclable && (
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                100% recyclable material
              </div>
            )}
            {selectedMaterial.sustainability.recycledContent > 0 && (
          <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mr-2"></span>
                {selectedMaterial.sustainability.recycledContent}% recycled content
              </div>
            )}
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-900 mb-2">Please complete:</h4>
          <ul className="text-sm text-red-800 space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center text-green-800">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      {onAddToCart && (
        <button
          onClick={onAddToCart}
          disabled={!isValid || isAddingToCart}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
            isValid && !isAddingToCart
              ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-[1.02]'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Adding...</span>
            </div>
          ) : (
            'Add to Cart'
          )}
        </button>
      )}

      {/* Additional Info */}
      <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-100">
        <p>✓ Free shipping on orders over $500</p>
        <p>✓ 30-day satisfaction guarantee</p>
        <p>✓ Professional installation available</p>
        {selectedMaterial?.properties?.warranty && (
          <p className="text-blue-600 font-medium">
            ✓ {selectedMaterial.properties.warranty} warranty included
          </p>
        )}
      </div>
    </div>
  )
} 