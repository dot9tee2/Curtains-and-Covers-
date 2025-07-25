'use client'

import React, { useState } from 'react'
import { Measurement } from '@/types/product'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

interface MeasurementFormProps {
  measurements: Measurement[]
  values: { [key: string]: number | string }
  onChange: (key: string, value: number | string) => void
  tips?: string[]
}

interface MeasurementGroup {
  groupKey: string
  groupName: string
  measurements: Measurement[]
  isRequired: boolean
}

export default function MeasurementForm({ measurements, values, onChange, tips }: MeasurementFormProps) {
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({})
  
  const handleInputChange = (measurementId: string, value: string) => {
    const numericValue = parseFloat(value)
    onChange(measurementId, isNaN(numericValue) ? value : numericValue)
  }

  // Group measurements by their group property
  const groupedMeasurements = React.useMemo(() => {
    const groups: { [key: string]: MeasurementGroup } = {}
    
    measurements.forEach(measurement => {
      const groupKey = measurement.group || 'main'
      
      if (!groups[groupKey]) {
        groups[groupKey] = {
          groupKey,
          groupName: getGroupDisplayName(groupKey),
          measurements: [],
          isRequired: false
        }
      }
      
      groups[groupKey].measurements.push(measurement)
      if (measurement.required) {
        groups[groupKey].isRequired = true
      }
    })

    // Sort measurements within each group by order
    Object.values(groups).forEach(group => {
      group.measurements.sort((a, b) => (a.order || 999) - (b.order || 999))
    })

    return Object.values(groups)
  }, [measurements])

  // Auto-expand groups with required fields or existing values
  React.useEffect(() => {
    const newExpandedGroups: { [key: string]: boolean } = {}
    
    groupedMeasurements.forEach(group => {
      const hasValues = group.measurements.some(m => values[m.id])
      const hasRequired = group.measurements.some(m => m.required)
      
      newExpandedGroups[group.groupKey] = hasRequired || hasValues || group.groupKey === 'main'
    })
    
    setExpandedGroups(newExpandedGroups)
  }, [groupedMeasurements, values])

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }))
  }

  // Calculate completion status
  const getGroupCompletionStatus = (group: MeasurementGroup) => {
    const requiredMeasurements = group.measurements.filter(m => m.required)
    const completedRequired = requiredMeasurements.filter(m => values[m.id] && values[m.id] !== '').length
    const totalMeasurements = group.measurements.length
    const completedTotal = group.measurements.filter(m => values[m.id] && values[m.id] !== '').length
    
    return {
      requiredCompleted: completedRequired,
      requiredTotal: requiredMeasurements.length,
      totalCompleted: completedTotal,
      totalMeasurements,
      isComplete: completedRequired === requiredMeasurements.length
    }
  }

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
        <div className="text-sm text-gray-500">
          {measurements.filter(m => m.required).length} required, {measurements.length} total
        </div>
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

      {/* Grouped Measurements */}
      {groupedMeasurements.map((group) => {
        const status = getGroupCompletionStatus(group)
        const isExpanded = expandedGroups[group.groupKey]
        
        return (
          <div key={group.groupKey} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => toggleGroup(group.groupKey)}
              className="w-full px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <h4 className="font-medium text-gray-900">
                  {group.groupName}
                  {group.isRequired && <span className="text-red-500 ml-1">*</span>}
                </h4>
                <div className="flex items-center space-x-2">
                  {status.isComplete ? (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  ) : status.requiredCompleted > 0 ? (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  )}
                  <span className="text-xs text-gray-500">
                    {status.totalCompleted}/{status.totalMeasurements}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {status.requiredTotal > 0 && (
                  <span className="text-xs text-gray-500">
                    {status.requiredCompleted}/{status.requiredTotal} required
                  </span>
                )}
                {isExpanded ? (
                  <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Group Content */}
            {isExpanded && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.measurements.map((measurement) => (
                    <div key={measurement.id} className="space-y-2">
                      <label 
                        htmlFor={measurement.id} 
                        className="block text-sm font-medium text-gray-700"
                      >
                        {measurement.name}
                        {measurement.required && <span className="text-red-500 ml-1">*</span>}
                        <span className="text-gray-500 ml-1">({measurement.unit})</span>
                      </label>
                      
                      {measurement.type === 'select' && measurement.options ? (
                        <select
                          id={measurement.id}
                          value={values[measurement.id] || ''}
                          onChange={(e) => onChange(measurement.id, e.target.value)}
                          required={measurement.required}
                          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select {measurement.name}</option>
                          {measurement.options.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="relative">
                          <input
                            type={measurement.type}
                            id={measurement.id}
                            value={values[measurement.id] || ''}
                            onChange={(e) => handleInputChange(measurement.id, e.target.value)}
                            placeholder={measurement.placeholder}
                            required={measurement.required}
                            min={measurement.minValue}
                            max={measurement.maxValue}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-400 text-sm">{measurement.unit}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Help text */}
                      {measurement.helpText && (
                        <p className="text-xs text-gray-600">{measurement.helpText}</p>
                      )}
                      
                      {/* Validation feedback */}
                      {measurement.required && !values[measurement.id] && (
                        <p className="text-sm text-red-600">This measurement is required</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Overall Progress */}
      {Object.keys(values).length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="text-sm font-medium text-green-900 mb-2">Measurement Progress:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-green-800">
            {Object.entries(values).map(([key, value]) => {
              const measurement = measurements.find(m => m.id === key)
              if (!measurement || !value) return null
              
              return (
                <div key={key} className="flex justify-between">
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

function getGroupDisplayName(groupKey: string): string {
  const groupNames: { [key: string]: string } = {
    main: 'Main Dimensions',
    panel1: 'Panel 1',
    panel2: 'Panel 2', 
    panel3: 'Panel 3',
    panel4: 'Panel 4',
    corners: 'Corners & Curves',
    hardware: 'Hardware Placement',
    special: 'Special Features',
    installation: 'Installation Details'
  }
  
  return groupNames[groupKey] || groupKey.charAt(0).toUpperCase() + groupKey.slice(1)
} 