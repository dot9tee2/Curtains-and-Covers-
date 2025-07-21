'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Product, ProductConfiguration, PriceCalculationResult } from '@/types/product'
import { useCart } from '@/contexts/CartContext'
import ProductConfigurator from './ProductConfigurator'

interface ProductConfiguratorWrapperProps {
  product: Product
}

export default function ProductConfiguratorWrapper({ product }: ProductConfiguratorWrapperProps) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleConfigurationChange = (config: ProductConfiguration, pricing: PriceCalculationResult) => {
    // Handle configuration changes if needed
  }

  const handleAddToCart = async (config: ProductConfiguration, pricing: PriceCalculationResult) => {
    try {
      setIsAddingToCart(true)
      
      // Extract measurements - try to find width/height or use first two measurements
      let width = 0
      let height = 0
      
      // Try to find width and height measurements
      if (config.measurements.width) {
        width = Number(config.measurements.width)
      } else if (config.measurements.length) {
        width = Number(config.measurements.length)
      } else if (config.measurements['side-1']) {
        width = Number(config.measurements['side-1'])
      } else if (config.measurements.diameter) {
        width = Number(config.measurements.diameter)
      }
      
      if (config.measurements.height) {
        height = Number(config.measurements.height)
      } else if (config.measurements['side-2']) {
        height = Number(config.measurements['side-2'])
      }
      
      // If we still don't have width/height, use the first two measurements
      if (width === 0 || height === 0) {
        const measurementValues = Object.values(config.measurements).filter(val => typeof val === 'number' && val > 0)
        if (measurementValues.length >= 2) {
          width = Number(measurementValues[0])
          height = Number(measurementValues[1])
        } else if (measurementValues.length === 1) {
          // If only one measurement, use it for both width and height
          width = Number(measurementValues[0])
          height = Number(measurementValues[0])
        } else {
          // No measurements available, use default values
          width = 1
          height = 1
        }
      }
      
      // Extract material and color names
      let materialName = 'Standard'
      let colorName = 'Default'
      
      // Get material name from selections
      if (config.selections.material) {
        const materialOption = product.variations?.materials?.options?.find(m => m.id === config.selections.material)
        if (materialOption) {
          materialName = materialOption.name
        }
      }
      
      // Get color name from selections
      if (config.selections.color) {
        const colorOption = product.variations?.colors?.options?.find(c => c.id === config.selections.color)
        if (colorOption) {
          colorName = colorOption.name
        }
      }
      
      // Extract addons from features
      const addons: { [key: string]: boolean } = {}
      if (product.variations?.features) {
        Object.entries(product.variations.features).forEach(([featureKey, feature]) => {
          const selectedOptionId = config.selections[featureKey]
          if (selectedOptionId) {
            const selectedOption = feature.options.find(option => option.id === selectedOptionId)
            if (selectedOption) {
              addons[selectedOption.name] = true
            }
          }
        })
      }
      
      // Create cart item
      const cartItem = {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.image,
        quantity: 1,
        selectedVariations: config.selections,
        measurements: config.measurements,
        uploadedFiles: config.files,
        specialRequests: config.specialRequests,
        price: pricing.breakdown.total,
        width: Number(width),
        height: Number(height),
        material: materialName,
        color: colorName,
        addons: addons
      }
      
      // Add to cart
      await addToCart(cartItem)
      
      // Show success message briefly
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        // Redirect to cart page
        router.push('/cart')
      }, 1500)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('There was an error adding the item to your cart. Please try again.')
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <ProductConfigurator 
      product={product}
      onConfigurationChange={handleConfigurationChange}
      onAddToCart={handleAddToCart}
      isAddingToCart={isAddingToCart}
      showSuccess={showSuccess}
    />
  )
} 