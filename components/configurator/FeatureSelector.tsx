'use client'

import React from 'react'
import { VariationOption } from '@/types/product'

interface FeatureSelectorProps {
  featureKey: string
  options: VariationOption
  selected?: string
  onChange: (value: string) => void
}

export default function FeatureSelector({ featureKey, options, selected, onChange }: FeatureSelectorProps) {
  const formatPrice = (price: number, currency = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const getFeatureTitle = (key: string) => {
    const titles: { [key: string]: string } = {
      tieDowns: 'Tie Downs',
      splits: 'Cover Splits',
      branding: 'Custom Branding'
    }
    return titles[key] || options.label || key
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          {getFeatureTitle(featureKey)}
          {options.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>

      <div className="space-y-2">
        {options.options.map((option) => (
          <label
            key={option.id}
            className={`relative cursor-pointer block p-4 border rounded-lg transition-colors ${
              selected === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name={featureKey}
                value={option.id}
                checked={selected === option.id}
                onChange={() => onChange(option.id)}
                className="sr-only"
              />
              
              {/* Custom Radio Button */}
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selected === option.id
                  ? 'border-blue-500 bg-blue-500'
                  : 'border-gray-300'
              }`}>
                {selected === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>

              {/* Option Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{option.name}</span>
                  {option.price > 0 && (
                    <span className="text-blue-600 font-semibold">
                      +{formatPrice(option.price)}
                    </span>
                  )}
                  {option.price === 0 && (
                    <span className="text-green-600 text-sm">Free</span>
                  )}
                </div>
                
                {option.description && (
                  <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                )}
              </div>
            </div>
          </label>
        ))}
        
        {/* Clear Selection Option */}
        {selected && (
          <button
            onClick={() => onChange('')}
            className="w-full p-3 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center justify-center">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Clear Selection
            </div>
          </button>
        )}
      </div>

      {selected && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-medium text-green-800">
                {getFeatureTitle(featureKey)}: {options.options.find(o => o.id === selected)?.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-green-800">
              {options.options.find(o => o.id === selected)?.price === 0 
                ? 'Free' 
                : `+${formatPrice(options.options.find(o => o.id === selected)?.price || 0)}`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 