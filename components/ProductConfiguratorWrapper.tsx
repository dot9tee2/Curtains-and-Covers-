'use client'

import React from 'react'
import { Product, ProductConfiguration, PriceCalculationResult } from '@/types/product'
import ProductConfigurator from './ProductConfigurator'

interface ProductConfiguratorWrapperProps {
  product: Product
}

export default function ProductConfiguratorWrapper({ product }: ProductConfiguratorWrapperProps) {
  const handleConfigurationChange = (config: ProductConfiguration, pricing: PriceCalculationResult) => {
    // Handle configuration changes if needed
    console.log('Configuration updated:', config, pricing)
  }

  const handleAddToCart = (config: ProductConfiguration, pricing: PriceCalculationResult) => {
    // Handle add to cart
    console.log('Adding product to cart:', config, pricing)
    alert(`Product configured! Total: ${product.currency === 'EUR' ? '€' : '$'}${pricing.breakdown.total.toFixed(2)}`)
  }

  return (
    <ProductConfigurator 
      product={product}
      onConfigurationChange={handleConfigurationChange}
      onAddToCart={handleAddToCart}
    />
  )
} 