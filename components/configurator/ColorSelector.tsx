'use client'

import React from 'react'
import { VariationOption } from '@/types/product'
import Image from 'next/image'

interface ColorSelectorProps {
  options: VariationOption
  selected?: string
  onChange: (value: string) => void
}

export default function ColorSelector({ options, selected, onChange }: ColorSelectorProps) {
  
  // Check if options exist and have options array
  if (!options || !options.options || options.options.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Choose Color
            {options?.required && <span className="text-red-500 ml-1">*</span>}
          </h3>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
          <p className="text-yellow-800">No colors available for this product.</p>
          <p className="text-sm text-yellow-600 mt-2">Debug info: {JSON.stringify(options)}</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Choose Color
          {options.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {options.options.map((color) => (
          <div
            key={color.id}
            className={`relative cursor-pointer rounded-lg border-2 p-3 transition-colors ${
              selected === color.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onChange(color.id)}
          >
            {/* Color Image or Swatch */}
            <div className="aspect-square relative mb-2 rounded-md overflow-hidden">
              {color.image ? (
                <Image
                  src={color.image}
                  alt={color.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full border border-gray-300 rounded-md"
                  style={{ backgroundColor: color.hex }}
                />
              )}
            </div>

            {/* Color Name */}
            <div className="text-center">
              <h4 className="font-medium text-gray-900 text-sm">{color.name}</h4>
              {color.price && color.price > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  +{new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(color.price)}
                </p>
              )}
            </div>

            {/* Selection Indicator */}
            {selected === color.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              </div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
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
              Color selected: {options.options.find(c => c.id === selected)?.name}
            </span>
            
            {/* Color Preview */}
            <div 
              className="ml-auto w-6 h-6 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: options.options.find(c => c.id === selected)?.hex }}
            />
          </div>
        </div>
      )}
    </div>
  )
} 