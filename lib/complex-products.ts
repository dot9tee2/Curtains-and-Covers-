import { Product, Category, Material, ProductConfiguration, PriceCalculationResult, PriceBreakdown } from '@/types/product'
import complexProductData from '@/guide/sample_product_data.json'

// Transform the guide data to match our Product interface
function transformComplexProduct(guideProduct: any): Product {
  return {
    id: guideProduct.id,
    name: guideProduct.title,
    slug: guideProduct.slug,
    description: guideProduct.description,
    image: guideProduct.images?.main || '/images/placeholder.jpg',
    category: guideProduct.categories?.[0] || 'custom-covers',
    basePrice: guideProduct.basePrice || 0,
    currency: guideProduct.currency || 'EUR',
    productType: 'complex',
    sku: guideProduct.sku,
    tags: guideProduct.tags || [],
    images: guideProduct.images,
    variations: guideProduct.variations,
    measurements: guideProduct.measurements || [],
    fileUploads: guideProduct.fileUploads || [],
    specialRequests: guideProduct.specialRequests,
    measurementTips: guideProduct.measurementTips || [],
    // Transform materials for backward compatibility
    materials: guideProduct.variations?.materials?.options?.map((material: any) => ({
      id: material.id,
      name: material.name,
      price: material.price,
      description: material.properties?.useCase || material.name,
      image: material.image,
      properties: material.properties,
      weight: material.properties?.weight,
      warranty: material.properties?.warranty,
      useCase: material.properties?.useCase
    })) || [],
    // Transform colors for backward compatibility
    colors: guideProduct.variations?.colors?.options?.map((color: any) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      image: color.image,
      price: color.price || 0
    })) || [],
    rating: 4.5,
    reviewCount: 120,
    featured: false,
    inStock: true
  }
}

// Transform categories from guide data
function transformCategories(guideCategories: any[]): Category[] {
  return guideCategories.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    featured: false,
    parent: category.parent,
    productCount: 0 // Will be calculated
  }))
}

// Load complex products from guide data
export function getComplexProducts(): Product[] {
  try {
    return complexProductData.products.map(transformComplexProduct)
  } catch (error) {
    console.error('Error loading complex products:', error)
    return []
  }
}

// Get complex product by slug
export function getComplexProductBySlug(slug: string): Product | null {
  try {
    const products = getComplexProducts()
    return products.find(product => product.slug === slug) || null
  } catch (error) {
    console.error('Error finding complex product by slug:', error)
    return null
  }
}

// Get complex categories
export function getComplexCategories(): Category[] {
  try {
    return transformCategories(complexProductData.categories || [])
  } catch (error) {
    console.error('Error loading complex categories:', error)
    return []
  }
}

// Get available materials from guide data
export function getAvailableMaterials(): Material[] {
  try {
    return complexProductData.materials?.map((material: any) => ({
      id: material.id,
      name: material.name,
      description: material.useCase || material.name,
      price: material.basePrice,
      image: material.image,
      properties: material.properties,
      weight: material.weight,
      warranty: material.warranty,
      useCase: material.useCase
    })) || []
  } catch (error) {
    console.error('Error loading materials:', error)
    return []
  }
}

// Price calculation for complex products
export function calculateComplexProductPrice(
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
    if (configuration.selections.material && product.variations?.materials) {
      const selectedMaterial = product.variations.materials.options.find(
        m => m.id === configuration.selections.material
      )
      if (selectedMaterial) {
        breakdown.materialPrice = selectedMaterial.price
        totalPrice += selectedMaterial.price
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
    breakdown.tax = totalPrice * 0.1 // 10% tax example
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
export function validateConfiguration(
  product: Product,
  configuration: ProductConfiguration
): boolean {
  const errors = getConfigurationErrors(product, configuration)
  return errors.length === 0
}

// Get configuration validation errors
export function getConfigurationErrors(
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
    if (product.variations.materials?.required && !configuration.selections.material) {
      errors.push('Material selection is required')
    }

    // Check required colors
    if (product.variations.colors?.required && !configuration.selections.color) {
      errors.push('Color selection is required')
    }

    // Check required features
    if (product.variations.features) {
      Object.entries(product.variations.features).forEach(([key, feature]) => {
        if (feature.required && !configuration.selections[key]) {
          errors.push(`${feature.label || key} selection is required`)
        }
      })
    }
  }

  // Check required measurements
  if (product.measurements) {
    product.measurements.forEach(measurement => {
      if (measurement.required && !configuration.measurements[measurement.id]) {
        errors.push(`${measurement.name} measurement is required`)
      }
    })
  }

  // Check required file uploads
  if (product.fileUploads) {
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

// Search complex products
export function searchComplexProducts(query: string): Product[] {
  try {
    const products = getComplexProducts()
    const searchTerm = query.toLowerCase()
    
    return products.filter(product => {
      const description = Array.isArray(product.description) 
        ? product.description.join(' ') 
        : product.description
      
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    })
  } catch (error) {
    console.error('Error searching complex products:', error)
    return []
  }
}

// Get products by category
export function getComplexProductsByCategory(categorySlug: string): Product[] {
  try {
    const products = getComplexProducts()
    return products.filter(product => 
      product.category === categorySlug ||
      product.category.includes(categorySlug)
    )
  } catch (error) {
    console.error('Error getting products by category:', error)
    return []
  }
} 