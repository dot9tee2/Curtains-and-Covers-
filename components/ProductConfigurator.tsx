'use client'

import React, { useState, useEffect } from 'react'
import { Product, ProductConfiguration, PriceCalculationResult, PriceBreakdown, Measurement, UploadedFile } from '@/types/product'
import StyleSelector from './configurator/StyleSelector'
import ColorSelector from './configurator/ColorSelector'
import MaterialSelector from './configurator/MaterialSelector'
import FeatureSelector from './configurator/FeatureSelector'
import MeasurementForm from './configurator/MeasurementForm'
import FileUpload from './configurator/FileUpload'
import SpecialRequests from './configurator/SpecialRequests'
import PriceDisplay from './configurator/PriceDisplay'

interface ProductConfiguratorProps {
  product: Product
  onConfigurationChange?: (config: ProductConfiguration, pricing: PriceCalculationResult) => void
  onAddToCart?: (config: ProductConfiguration, pricing: PriceCalculationResult) => void
  isAddingToCart?: boolean
  showSuccess?: boolean
}

// Simple price calculation function
function calculateProductPrice(
  product: Product,
  configuration: ProductConfiguration
): PriceCalculationResult {
  try {
    let totalPrice = product.basePrice
    const breakdown: PriceBreakdown = {
      basePrice: product.basePrice,
      materialPrice: 0,
      variationPrices: {},
      addOnsTotal: 0,
      subtotal: 0,
      tax: 0,
      total: 0
    }

    // Calculate material price
    if (configuration.selections.material) {
      let selectedMaterial = null
      
      // Check new variations structure first
      if (product.variations?.materials) {
        selectedMaterial = product.variations.materials.options.find(
          m => m.id === configuration.selections.material
        )
      }
      
      // Fall back to legacy materials structure
      if (!selectedMaterial && product.materials) {
        selectedMaterial = product.materials.find(
          m => (m.name?.toLowerCase().replace(/\s+/g, '-') || m.id) === configuration.selections.material
        )
      }
      
      if (selectedMaterial) {
        breakdown.materialPrice = selectedMaterial.price || 0
        totalPrice += selectedMaterial.price || 0
      }
    }

    // Calculate color price (if any)
    if (configuration.selections.color) {
      let selectedColor = null
      
      // Check new variations structure first
      if (product.variations?.colors) {
        selectedColor = product.variations.colors.options.find(
          c => c.id === configuration.selections.color
        )
      }
      
      // Fall back to legacy colors structure
      if (!selectedColor && product.colors) {
        selectedColor = product.colors.find(
          c => (c.name?.toLowerCase().replace(/\s+/g, '-') || c.id) === configuration.selections.color
        )
      }
      
      if (selectedColor && selectedColor.price > 0) {
        breakdown.variationPrices!['color'] = selectedColor.price
        breakdown.addOnsTotal += selectedColor.price
        totalPrice += selectedColor.price
      }
    }

    // Calculate feature prices
    if (product.variations?.features) {
      Object.entries(product.variations.features).forEach(([featureKey, feature]) => {
        const selectedOptionId = configuration.selections[featureKey]
        if (selectedOptionId) {
          const selectedOption = feature.options.find(option => option.id === selectedOptionId)
          if (selectedOption && selectedOption.price > 0) {
            breakdown.variationPrices![featureKey] = selectedOption.price
            breakdown.addOnsTotal += selectedOption.price
            totalPrice += selectedOption.price
          }
        }
      })
    }

    breakdown.subtotal = totalPrice
    breakdown.tax = totalPrice * 0.1 // 10% tax
    breakdown.total = breakdown.subtotal + breakdown.tax

    return {
      breakdown,
      isValid: validateConfiguration(product, configuration),
      errors: getConfigurationErrors(product, configuration)
    }
  } catch (error) {
    console.error('Error calculating price:', error)
    return {
      breakdown: {
        basePrice: 0,
        addOnsTotal: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      },
      isValid: false,
      errors: ['Error calculating price']
    }
  }
}

// Validate product configuration
function validateConfiguration(
  product: Product,
  configuration: ProductConfiguration
): boolean {
  const errors = getConfigurationErrors(product, configuration)
  return errors.length === 0
}

// Get measurements for the selected style
function getStyleMeasurements(product: Product, configuration: ProductConfiguration): Measurement[] {
  if (!configuration.selections.style || !product.variations?.styles) {
    return [] // No measurements until style is selected
  }

  const selectedStyle = product.variations.styles.options.find(
    style => style.id === configuration.selections.style
  )

  // Return style-specific measurements if available
  return selectedStyle?.measurements || []
}

// Check if custom branding is selected (file uploads should be required)
function isCustomBrandingSelected(configuration: ProductConfiguration): boolean {
  // Check if any branding option other than 'none' is selected
  const brandingSelection = configuration.selections.branding
  return Boolean(brandingSelection) && brandingSelection !== '' && brandingSelection !== 'none'
}

// Get configuration validation errors
function getConfigurationErrors(
  product: Product,
  configuration: ProductConfiguration
): string[] {
  const errors: string[] = []

  // Check required variations
  if (product.variations) {
    // Check required styles
    if (product.variations.styles?.required && !configuration.selections.style) {
      errors.push('Style selection is required')
    }

    // Check required materials
    if ((product.variations?.materials?.required || product.materials?.length > 0) && !configuration.selections.material) {
      errors.push('Material selection is required')
    }

    // Check required colors
    if ((product.variations?.colors?.required || product.colors?.length > 0) && !configuration.selections.color) {
      errors.push('Color selection is required')
    }

    // Check required features
    if (product.variations.features) {
      Object.entries(product.variations.features).forEach(([key, feature]) => {
        if (feature.required && (!configuration.selections[key] || configuration.selections[key] === '')) {
          errors.push(`${feature.label || key} selection is required`)
        }
      })
    }
  }

  // Check required measurements for the selected style
  const styleMeasurements = getStyleMeasurements(product, configuration)
  if (styleMeasurements && styleMeasurements.length > 0) {
    styleMeasurements.forEach(measurement => {
      if (measurement.required && !configuration.measurements[measurement.id]) {
        errors.push(`${measurement.name} measurement is required`)
      }
    })
  }

  // Check required file uploads (only if custom branding is selected)
  if (product.fileUploads && isCustomBrandingSelected(configuration)) {
    product.fileUploads.forEach(upload => {
      if (upload.required) {
        const hasFile = configuration.files.some(file => file.id === upload.id)
        if (!hasFile) {
          errors.push(`${upload.name} is required`)
        }
      }
    })
  }

  return errors
}

export default function ProductConfigurator({ 
  product, 
  onConfigurationChange,
  onAddToCart,
  isAddingToCart = false,
  showSuccess = false
}: ProductConfiguratorProps) {
  const [configuration, setConfiguration] = useState<ProductConfiguration>({
    productId: product.id,
    selections: {},
    measurements: {},
    files: [],
    specialRequests: ''
  })

  const [pricing, setPricing] = useState<PriceCalculationResult>({
    breakdown: {
      basePrice: product.basePrice,
      addOnsTotal: 0,
      subtotal: product.basePrice,
      tax: 0,
      total: product.basePrice
    },
    isValid: false,
    errors: []
  })

  const [activeSection, setActiveSection] = useState<string>('style')



  // Calculate pricing whenever configuration changes
  useEffect(() => {
    const newPricing = calculateProductPrice(product, configuration)
    setPricing(newPricing)
    onConfigurationChange?.(configuration, newPricing)
  }, [configuration, product, onConfigurationChange])

  // Auto-navigate away from uploads section if custom branding is deselected
  useEffect(() => {
    if (activeSection === 'uploads' && !isCustomBrandingSelected(configuration)) {
      setActiveSection('features')
    }
  }, [configuration.selections.branding, activeSection])

  // Clear uploaded files when custom branding is deselected
  useEffect(() => {
    if (!isCustomBrandingSelected(configuration) && configuration.files.length > 0) {
      setConfiguration(prev => ({
        ...prev,
        files: []
      }))
    }
  }, [configuration.selections.branding])

  const updateSelection = (key: string, value: string) => {
    setConfiguration(prev => ({
      ...prev,
      selections: {
        ...prev.selections,
        [key]: value
      }
    }))
  }

  const updateMeasurement = (key: string, value: number | string) => {
    setConfiguration(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [key]: value
      }
    }))
  }

  const updateFiles = (files: UploadedFile[]) => {
    setConfiguration(prev => ({
      ...prev,
      files
    }))
  }

  const updateSpecialRequests = (requests: string) => {
    setConfiguration(prev => ({
      ...prev,
      specialRequests: requests
    }))
  }

  const handleAddToCart = () => {
    if (pricing.isValid) {
      onAddToCart?.(configuration, pricing)
    }
  }

  const sections = [
    { id: 'style', name: 'Style', required: product.variations?.styles?.required },
    { id: 'material', name: 'Material', required: product.variations?.materials?.required || product.materials?.length > 0 },
    { id: 'color', name: 'Color', required: product.variations?.colors?.required || product.colors?.length > 0 },
    { id: 'features', name: 'Features', required: false },
    { id: 'measurements', name: 'Measurements', required: getStyleMeasurements(product, configuration).some(m => m.required) },
    ...(isCustomBrandingSelected(configuration) ? [{ id: 'uploads', name: 'Files', required: true }] : []),
    { id: 'requests', name: 'Special Requests', required: false }
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Configuration Steps */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Configuration steps">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            const isCompleted = section.id === 'style' && configuration.selections.style ||
                              section.id === 'material' && (configuration.selections.material || !(product.variations?.materials?.required || product.materials?.length > 0)) ||
                              section.id === 'color' && (configuration.selections.color || !(product.variations?.colors?.required || product.colors?.length > 0)) ||
                              section.id === 'features' && (() => {
                                // Features section is always completed since it's optional
                                // Users can choose to select or not select features
                                return true
                              })() ||
                              section.id === 'measurements' && (() => {
                                const styleMeasurements = getStyleMeasurements(product, configuration)
                                if (styleMeasurements.length === 0) return true // No measurements required
                                return styleMeasurements.every(m => !m.required || configuration.measurements[m.id])
                              })() ||
                              section.id === 'uploads' && (() => {
                                if (!isCustomBrandingSelected(configuration)) return true // Not required
                                return configuration.files.length > 0
                              })() ||
                              section.id === 'requests' && true

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-600'
                    : isCompleted
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.name}
                {section.required && <span className="text-red-500 ml-1">*</span>}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Configuration Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Style Selection */}
          {activeSection === 'style' && product.variations?.styles && (
            <StyleSelector
              options={product.variations.styles}
              selected={configuration.selections.style}
              onChange={(value) => updateSelection('style', value)}
            />
          )}

          {/* Material Selection */}
          {activeSection === 'material' && (product.variations?.materials || product.materials?.length > 0) && (
            <MaterialSelector
              options={product.variations?.materials || {
                required: true,
                options: product.materials?.map((material: any) => ({
                  id: material.name?.toLowerCase().replace(/\s+/g, '-') || material.id,
                  name: material.name,
                  price: material.price || 0,
                  description: material.description,
                  image: material.image,
                  properties: material.properties
                })) || []
              }}
              selected={configuration.selections.material}
              onChange={(value) => updateSelection('material', value)}
            />
          )}

          {/* Color Selection */}
          {activeSection === 'color' && (product.variations?.colors || product.colors?.length > 0) && (
            <ColorSelector
              options={product.variations?.colors || {
                required: true,
                options: product.colors?.map((color: any) => ({
                  id: color.name?.toLowerCase().replace(/\s+/g, '-') || color.id,
                  name: color.name,
                  hex: color.hex || color.hexCode,
                  price: color.price || 0,
                  image: color.image
                })) || []
              }}
              selected={configuration.selections.color}
              onChange={(value) => updateSelection('color', value)}
            />
          )}

          {/* Feature Selections */}
          {activeSection === 'features' && product.variations?.features && (
            <div className="space-y-6">
              {/* Optional Features Notice */}
              <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    All features are optional. You can select any combination or skip them entirely.
                  </span>
                </div>
              </div>
              
              {Object.entries(product.variations.features).map(([key, feature]) => (
                <FeatureSelector
                  key={key}
                  featureKey={key}
                  options={feature}
                  selected={configuration.selections[key]}
                  onChange={(value) => updateSelection(key, value)}
                />
              ))}
            </div>
          )}

          {/* Measurements */}
          {activeSection === 'measurements' && (
            <>
              {!configuration.selections.style && product.variations?.styles ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">Measurements</h3>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 text-center">
                    <svg
                      className="w-12 h-12 text-yellow-400 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <h4 className="text-lg font-medium text-yellow-900 mb-2">Style Selection Required</h4>
                    <p className="text-yellow-800 mb-4">
                      Please select a style first to see the required measurements for that style.
                    </p>
                    <button
                      onClick={() => setActiveSection('style')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-yellow-800 bg-yellow-100 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Choose Style
                    </button>
                  </div>
                </div>
              ) : (
                <MeasurementForm
                  measurements={getStyleMeasurements(product, configuration)}
                  values={configuration.measurements}
                  onChange={updateMeasurement}
                  tips={product.measurementTips}
                />
              )}
            </>
          )}

          {/* File Uploads */}
          {activeSection === 'uploads' && (
            <>
              {!isCustomBrandingSelected(configuration) ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">File Uploads</h3>
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
                    <h4 className="text-lg font-medium text-blue-900 mb-2">No File Uploads Required</h4>
                    <p className="text-blue-800 mb-4">
                      File uploads are only required when custom branding is selected. Please select a custom branding option in the Features section to upload your logo or design files.
                    </p>
                    <button
                      onClick={() => setActiveSection('features')}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Go to Features
                    </button>
                  </div>
                </div>
              ) : product.fileUploads && (
                <div className="space-y-4">
                  {product.fileUploads.map((upload) => (
                    <FileUpload
                      key={upload.id}
                      uploadConfig={upload}
                      files={configuration.files.filter(f => f.id === upload.id)}
                      onChange={updateFiles}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Special Requests */}
          {activeSection === 'requests' && product.specialRequests && (
            <SpecialRequests
              config={product.specialRequests}
              value={configuration.specialRequests || ''}
              onChange={updateSpecialRequests}
            />
          )}
        </div>

        {/* Price Display & Add to Cart */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PriceDisplay 
              pricing={pricing}
              currency={product.currency || 'EUR'}
            />
            
            {/* Validation Errors */}
            {pricing.errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                <h4 className="text-sm font-medium text-red-800 mb-2">
                  Please complete the following:
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {pricing.errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!pricing.isValid || isAddingToCart}
              className={`w-full mt-6 py-3 px-4 rounded-md font-medium ${
                pricing.isValid && !isAddingToCart
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAddingToCart ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding to Cart...
                </div>
              ) : (
                pricing.isValid ? 'Add to Cart' : 'Complete Configuration'
              )}
            </button>

            {/* Success Message */}
            {showSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-green-800">
                    Product added to cart successfully!
                  </span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Redirecting to cart...
                </p>
              </div>
            )}

            {/* Continue to Next Section */}
            {pricing.isValid && !showSuccess && (
              <div className="mt-4 text-center">
                <p className="text-sm text-green-600 font-medium">
                  ✓ Configuration Complete
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 