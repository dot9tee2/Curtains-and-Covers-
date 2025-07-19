'use client'

import React from 'react'
import { VariationOption } from '@/types/product'
import Image from 'next/image'

interface MaterialSelectorProps {
  options: VariationOption
  selected?: string
  onChange: (value: string) => void
}

export default function MaterialSelector({ options, selected, onChange }: MaterialSelectorProps) {
  const formatPrice = (price: number, currency = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Choose Material
          {options.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>

      <div className="space-y-3">
        {options.options.map((material) => (
          <div
            key={material.id}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${
              selected === material.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onChange(material.id)}
          >
            <div className="flex items-start space-x-4">
              {/* Material Image */}
              {material.image && (
                <div className="w-20 h-20 relative rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={material.image}
                    alt={material.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Material Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{material.name}</h4>
                  <span className="text-lg font-semibold text-blue-600">
                    +{formatPrice(material.price)}
                  </span>
                </div>
                
                {material.description && (
                  <p className="text-sm text-gray-500 mt-1">{material.description}</p>
                )}

                {/* Material Properties */}
                {material.properties && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    {material.properties.weight && (
                      <div className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        Weight: {material.properties.weight}
                      </div>
                    )}
                    {material.properties.warranty && (
                      <div className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                        {material.properties.warranty} warranty
                      </div>
                    )}
                    {material.properties.waterproof && (
                      <div className="flex items-center text-blue-600">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        100% Waterproof
                      </div>
                    )}
                    {material.properties.uvResistant && (
                      <div className="flex items-center text-yellow-600">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                        {material.properties.uvResistant} UV Resistant
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selection Indicator */}
              {selected === material.id && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
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
          </div>
        ))}
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