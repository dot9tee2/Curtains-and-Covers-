import { Product, ProductConfiguration, Measurement } from '@/types/product'

export function getDefaultConfiguration(product: Product): ProductConfiguration {
  const config: ProductConfiguration = {
    productId: product.id,
    selections: {},
    measurements: {},
    files: [],
    specialRequests: ''
  }

  const defaults = product.defaultConfiguration

  if (!defaults?.showDefaultPrice) {
    return config // Return empty config if defaults are disabled
  }

  // Set default style first
  if (defaults.defaultStyle) {
    config.selections.style = defaults.defaultStyle
  } else if (product.variations?.styles?.options?.[0]) {
    // Fallback to first style option
    config.selections.style = product.variations.styles.options[0].id
  }

  // Set default material
  if (defaults.defaultMaterial) {
    config.selections.material = defaults.defaultMaterial
  } else if (product.variations?.materials?.options?.[0]) {
    // Fallback to first material option
    config.selections.material = product.variations.materials.options[0].id
  }

  // Set default color (only if material is selected)
  if (config.selections.material) {
    if (defaults.defaultColor) {
      config.selections.color = defaults.defaultColor
    } else {
      // Fallback to first available color for selected material
      const availableColors = getColorsForSelectedMaterial(product, config)
      if (availableColors.length > 0) {
        config.selections.color = availableColors[0].id
      }
    }
  }

  // Set default measurements based on selected style
  if (config.selections.style) {
    const styleMeasurements = getStyleMeasurementsForStyle(product, config.selections.style)
    
    styleMeasurements.forEach(measurement => {
      if (measurement.defaultValue) {
        config.measurements[measurement.id] = measurement.defaultValue
      } else {
        // Use global defaults if available
        if (defaults?.defaultMeasurements) {
          const defaultVal = getDefaultValueForMeasurement(measurement, defaults.defaultMeasurements)
          if (defaultVal) {
            config.measurements[measurement.id] = defaultVal
          }
        }
      }
    })
  }

  return config
}

function getStyleMeasurementsForStyle(product: Product, styleId: string): Measurement[] {
  if (!product.variations?.styles) return []
  
  const selectedStyle = product.variations.styles.options.find(style => style.id === styleId)
  return selectedStyle?.measurements || []
}

function getDefaultValueForMeasurement(
  measurement: Measurement, 
  defaults: any
): number | null {
  // Map measurement roles to default values
  const roleDefaults: { [key: string]: any } = {
    width: defaults.width,
    height: defaults.height,
    diameter: defaults.width, // Use width as diameter default
  }
  
  return roleDefaults[measurement.role || ''] || null
}

// Helper function to get colors for selected material
function getColorsForSelectedMaterial(product: Product, configuration: ProductConfiguration) {
  if (!configuration.selections.material || !product.materials) {
    return []
  }
  
  const selectedMaterial = product.materials.find(
    material => material._id === configuration.selections.material
  )
  
  if (!selectedMaterial || !selectedMaterial.colors) {
    return []
  }
  
  return selectedMaterial.colors.map((color: any) => ({
    id: `${selectedMaterial._id}-${color.name?.toLowerCase().replace(/\s+/g, '-')}`,
    name: color.name,
    price: color.price || 0,
    hex: color.hex,
    image: color.image
  }))
} 