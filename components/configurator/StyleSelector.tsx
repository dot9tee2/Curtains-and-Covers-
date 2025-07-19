'use client'

import React from 'react'
import { VariationOption } from '@/types/product'
import Image from 'next/image'

interface StyleSelectorProps {
  options: VariationOption
  selected?: string
  onChange: (value: string) => void
}

export default function StyleSelector({ options, selected, onChange }: StyleSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Choose Style
          {options.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.options.map((style) => (
          <div
            key={style.id}
            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-colors ${
              selected === style.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onChange(style.id)}
          >
            {/* Style Image */}
            {style.image && (
              <div className="aspect-square relative mb-3 rounded-md overflow-hidden bg-gray-100">
                <Image
                  src={style.image}
                  alt={style.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Style Info */}
            <div className="text-center">
              <h4 className="font-medium text-gray-900">{style.name}</h4>
              {style.description && (
                <p className="text-sm text-gray-500 mt-1">{style.description}</p>
              )}
              {/* Measurement count indicator */}
              {style.measurements && style.measurements.length > 0 && (
                <div className="mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full inline-block">
                  {style.measurements.length} measurement{style.measurements.length !== 1 ? 's' : ''} required
                </div>
              )}
            </div>

            {/* Selection Indicator */}
            {selected === style.id && (
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
              Style selected: {options.options.find(s => s.id === selected)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 