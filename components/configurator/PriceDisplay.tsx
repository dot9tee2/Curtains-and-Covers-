'use client'

import React from 'react'
import { PriceCalculationResult } from '@/types/product'

interface PriceDisplayProps {
  pricing: PriceCalculationResult
  currency?: string
}

export default function PriceDisplay({ pricing, currency = 'EUR' }: PriceDisplayProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const { breakdown } = pricing

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Price Summary</h3>
      
      <div className="space-y-3">
        {/* Base Price */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-medium">{formatPrice(breakdown.basePrice)}</span>
        </div>

        {/* Material Price */}
        {breakdown.materialPrice && breakdown.materialPrice > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Material:</span>
            <span className="font-medium">+{formatPrice(breakdown.materialPrice)}</span>
          </div>
        )}

        {/* Variation Prices */}
        {breakdown.variationPrices && Object.keys(breakdown.variationPrices).length > 0 && (
          <>
            {Object.entries(breakdown.variationPrices).map(([key, price]) => {
              if (price <= 0) return null
              
              const displayName = key === 'tieDowns' ? 'Tie Downs' :
                                key === 'splits' ? 'Cover Splits' :
                                key === 'branding' ? 'Custom Branding' :
                                key.charAt(0).toUpperCase() + key.slice(1)
              
              return (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600">{displayName}:</span>
                  <span className="font-medium">+{formatPrice(price)}</span>
                </div>
              )
            })}
          </>
        )}

        {/* Add-ons Total */}
        {breakdown.addOnsTotal > 0 && (
          <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
            <span className="text-gray-600">Add-ons Total:</span>
            <span className="font-medium">+{formatPrice(breakdown.addOnsTotal)}</span>
          </div>
        )}

        {/* Subtotal */}
        <div className="flex justify-between text-base font-medium border-t border-gray-200 pt-3">
          <span className="text-gray-900">Subtotal:</span>
          <span>{formatPrice(breakdown.subtotal)}</span>
        </div>

        {/* Tax */}
        {breakdown.tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax:</span>
            <span className="font-medium">{formatPrice(breakdown.tax)}</span>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between text-lg font-bold border-t border-gray-300 pt-3">
          <span className="text-gray-900">Total:</span>
          <span className="text-blue-600">{formatPrice(breakdown.total)}</span>
        </div>
      </div>

      {/* Configuration Status */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        {pricing.isValid ? (
          <div className="flex items-center text-green-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">Configuration Complete</span>
          </div>
        ) : (
          <div className="flex items-center text-orange-600">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-sm font-medium">Configuration Incomplete</span>
          </div>
        )}
      </div>

      {/* Savings or Special Offers */}
      {breakdown.materialPrice && breakdown.materialPrice > 150 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              Premium material selected - 5 year warranty included!
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 