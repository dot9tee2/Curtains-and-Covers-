'use client'

import React from 'react'
import { Measurement } from '@/types/product'

interface MeasurementFormProps {
  measurements: Measurement[]
  values: { [key: string]: number | string }
  onChange: (key: string, value: number | string) => void
  tips?: string[]
}

export default function MeasurementForm({ measurements, values, onChange, tips }: MeasurementFormProps) {
  const handleInputChange = (measurementId: string, value: string) => {
    const numericValue = parseFloat(value)
    onChange(measurementId, isNaN(numericValue) ? value : numericValue)
  }

  // Show message if no measurements are available
  if (!measurements || measurements.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Measurements</h3>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-6 text-center">
          <svg
            className="w-12 h-12 text-blue-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h4 className="text-lg font-medium text-blue-900 mb-2">No Measurements Required</h4>
          <p className="text-blue-800">
            This style doesn't require any specific measurements. Please proceed to the next step.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">
          Measurements
          {measurements.some(m => m.required) && <span className="text-red-500 ml-1">*</span>}
        </h3>
      </div>

      {/* Measurement Tips */}
      {tips && tips.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Measurement Guidelines:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Measurement Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {measurements.map((measurement) => (
          <div key={measurement.id} className="space-y-2">
            <label 
              htmlFor={measurement.id} 
              className="block text-sm font-medium text-gray-700"
            >
              {measurement.name}
              {measurement.required && <span className="text-red-500 ml-1">*</span>}
              <span className="text-gray-500 ml-1">({measurement.unit})</span>
            </label>
            
            <div className="relative">
              <input
                type={measurement.type}
                id={measurement.id}
                value={values[measurement.id] || ''}
                onChange={(e) => handleInputChange(measurement.id, e.target.value)}
                placeholder={measurement.placeholder}
                required={measurement.required}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">{measurement.unit}</span>
              </div>
            </div>
            
            {/* Validation feedback */}
            {measurement.required && !values[measurement.id] && (
              <p className="text-sm text-red-600">This measurement is required</p>
            )}
          </div>
        ))}
      </div>

      {/* Summary of completed measurements */}
      {Object.keys(values).length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="text-sm font-medium text-green-900 mb-2">Measurements Entered:</h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
            {measurements.map((measurement) => {
              const value = values[measurement.id]
              if (!value) return null
              
              return (
                <div key={measurement.id} className="flex justify-between">
                  <span>{measurement.name}:</span>
                  <span className="font-medium">{value} {measurement.unit}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 