'use client'

import React from 'react'
import { SpecialRequests as SpecialRequestsConfig } from '@/types/product'

interface SpecialRequestsProps {
  config: SpecialRequestsConfig
  value: string
  onChange: (value: string) => void
}

export default function SpecialRequests({ config, value, onChange }: SpecialRequestsProps) {
  if (!config.enabled) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Special Requests
        </h3>
      </div>

      <div className="space-y-2">
        <label htmlFor="special-requests" className="block text-sm font-medium text-gray-700">
          Additional Information or Custom Requirements
        </label>
        
        <textarea
          id="special-requests"
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={config.placeholder}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        
        <p className="text-sm text-gray-500">
          Use this field to provide any special instructions, custom sizing details, or unique requirements for your order.
        </p>
      </div>

      {value && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <h4 className="text-sm font-medium text-blue-900 mb-1">Special Requests Added:</h4>
          <p className="text-sm text-blue-800">{value}</p>
        </div>
      )}
    </div>
  )
} 