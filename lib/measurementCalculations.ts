import { Measurement } from '@/types/product'

export interface AreaCalculationResult {
  area: number
  unit: string
  formula: string
  measurements: Array<{
    name: string
    value: number
    role: string
  }>
}

// Unit conversion factors (to square feet)
const UNIT_CONVERSIONS: { [key: string]: number } = {
  inches: 1 / 144,
  feet: 1,
  cm: 0.001076,
  meters: 10.764
}

export function calculateAreaFromMeasurements(
  measurements: { [key: string]: number | string },
  measurementDefinitions: Measurement[]
): AreaCalculationResult {
  
  const result: AreaCalculationResult = {
    area: 0,
    unit: 'sqft',
    formula: '',
    measurements: []
  }

  // Group measurements by role
  const measurementsByRole: { [role: string]: Array<{ name: string, value: number, unit: string }> } = {}
  
  measurementDefinitions.forEach(def => {
    const value = measurements[def.id]
    if (typeof value === 'number' && value > 0) {
      const role = def.role || 'other'
      if (!measurementsByRole[role]) {
        measurementsByRole[role] = []
      }
      measurementsByRole[role].push({
        name: def.name,
        value: value,
        unit: def.unit
      })
      
      result.measurements.push({
        name: def.name,
        value: value,
        role: role
      })
    }
  })

  // Calculate area based on available measurements
  if (measurementsByRole.diameter && measurementsByRole.diameter.length > 0) {
    // Circular area: π × r²
    const diameter = measurementsByRole.diameter[0]
    const radiusInFeet = convertToFeet(diameter.value / 2, diameter.unit)
    result.area = Math.PI * Math.pow(radiusInFeet, 2)
    result.formula = `π × (${diameter.value/2})² = ${result.area.toFixed(2)} sq ft`
    
  } else if (measurementsByRole.radius && measurementsByRole.radius.length > 0) {
    // Circular area using radius: π × r²
    const radius = measurementsByRole.radius[0]
    const radiusInFeet = convertToFeet(radius.value, radius.unit)
    result.area = Math.PI * Math.pow(radiusInFeet, 2)
    result.formula = `π × ${radius.value}² = ${result.area.toFixed(2)} sq ft`
    
  } else if (measurementsByRole.width && measurementsByRole.height) {
    // Rectangular area: width × height
    const width = measurementsByRole.width[0]
    const height = measurementsByRole.height[0]
    const widthInFeet = convertToFeet(width.value, width.unit)
    const heightInFeet = convertToFeet(height.value, height.unit)
    result.area = widthInFeet * heightInFeet
    result.formula = `${width.value}" × ${height.value}" = ${result.area.toFixed(2)} sq ft`
    
  } else if (measurementsByRole.side && measurementsByRole.side.length >= 2) {
    // Multiple sides - assume rectangular using first two
    const side1 = measurementsByRole.side[0]
    const side2 = measurementsByRole.side[1]
    const side1InFeet = convertToFeet(side1.value, side1.unit)
    const side2InFeet = convertToFeet(side2.value, side2.unit)
    result.area = side1InFeet * side2InFeet
    result.formula = `${side1.value}" × ${side2.value}" = ${result.area.toFixed(2)} sq ft`
    
  } else if (measurementsByRole.side && measurementsByRole.side.length === 3) {
    // Triangle area: use Heron's formula or base × height / 2
    const sides = measurementsByRole.side.map(s => convertToFeet(s.value, s.unit))
    // Simple approximation: use first side as base, second as height
    result.area = (sides[0] * sides[1]) / 2
    result.formula = `Triangle: ${measurementsByRole.side[0].value}" × ${measurementsByRole.side[1].value}" ÷ 2 = ${result.area.toFixed(2)} sq ft`
    
  } else {
    // Complex shape calculation - handle panels
    const panels = getComplexShapeArea(measurementsByRole, measurementDefinitions)
    if (panels.area > 0) {
      result.area = panels.area
      result.formula = panels.formula
    } else {
      // Fallback: use first two numeric measurements
      const numericMeasurements = result.measurements.filter(m => m.value > 0)
      if (numericMeasurements.length >= 2) {
        const first = numericMeasurements[0]
        const second = numericMeasurements[1]
        // Convert to feet and multiply
        const firstInFeet = convertToFeet(first.value, getUnitForMeasurement(first.name, measurementDefinitions))
        const secondInFeet = convertToFeet(second.value, getUnitForMeasurement(second.name, measurementDefinitions))
        result.area = firstInFeet * secondInFeet
        result.formula = `${first.value} × ${second.value} = ${result.area.toFixed(2)} sq ft`
      }
    }
  }

  return result
}

// Handle complex shapes with multiple panels
function getComplexShapeArea(
  measurementsByRole: { [role: string]: Array<{ name: string, value: number, unit: string }> },
  measurementDefinitions: Measurement[]
): { area: number, formula: string } {
  
  let totalArea = 0
  const formulas: string[] = []

  // Group measurements by panel (panel1, panel2, etc.)
  const panelMeasurements: { [panel: string]: { [role: string]: number } } = {}
  
  measurementDefinitions.forEach(def => {
    if (def.group && def.group.includes('panel')) {
      const panelId = def.group
      if (!panelMeasurements[panelId]) {
        panelMeasurements[panelId] = {}
      }
      
      const roleKey = def.role || 'other'
      const measurement = measurementsByRole[roleKey]?.find(m => m.name === def.name)
      if (measurement) {
        panelMeasurements[panelId][roleKey] = convertToFeet(measurement.value, measurement.unit)
      }
    }
  })

  // Calculate area for each panel
  Object.entries(panelMeasurements).forEach(([panelId, panelData]) => {
    if (panelData.width && panelData.height) {
      const panelArea = panelData.width * panelData.height
      totalArea += panelArea
      formulas.push(`${panelId}: ${(panelData.width * 12).toFixed(0)}" × ${(panelData.height * 12).toFixed(0)}" = ${panelArea.toFixed(2)} sq ft`)
    }
  })

  return {
    area: totalArea,
    formula: formulas.length > 0 ? formulas.join(' + ') + ` = ${totalArea.toFixed(2)} sq ft total` : ''
  }
}

function convertToFeet(value: number, unit: string): number {
  const conversionFactor = UNIT_CONVERSIONS[unit.toLowerCase()] || UNIT_CONVERSIONS.inches
  return value * conversionFactor
}

function getUnitForMeasurement(name: string, definitions: Measurement[]): string {
  const def = definitions.find(d => d.name === name)
  return def?.unit || 'inches'
}

// Validate measurements for a style
export function validateStyleMeasurements(
  measurements: { [key: string]: number | string },
  measurementDefinitions: Measurement[]
): { isValid: boolean, errors: string[] } {
  const errors: string[] = []

  measurementDefinitions.forEach(def => {
    const value = measurements[def.id]
    
    // Check dependencies first
    if (def.dependsOn) {
      const dependsOnValue = measurements[def.dependsOn]
      if (!dependsOnValue) {
        return // Skip validation if dependency is not met
      }
    }
    
    // Check required measurements
    if (def.required && (!value || value === '')) {
      errors.push(`${def.name} is required`)
      return
    }

    // Check numeric values
    if (value && def.type === 'number') {
      const numValue = Number(value)
      
      if (isNaN(numValue)) {
        errors.push(`${def.name} must be a valid number`)
      } else {
        // Check min/max values
        if (def.minValue && numValue < def.minValue) {
          errors.push(`${def.name} must be at least ${def.minValue} ${def.unit}`)
        }
        if (def.maxValue && numValue > def.maxValue) {
          errors.push(`${def.name} cannot exceed ${def.maxValue} ${def.unit}`)
        }
      }
    }
  })

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Get measurements grouped by their group property
export function groupMeasurementsByGroup(measurements: Measurement[]): { [group: string]: Measurement[] } {
  const grouped: { [group: string]: Measurement[] } = {}
  
  measurements.forEach(measurement => {
    const group = measurement.group || 'main'
    if (!grouped[group]) {
      grouped[group] = []
    }
    grouped[group].push(measurement)
  })

  // Sort measurements within each group by order
  Object.values(grouped).forEach(groupMeasurements => {
    groupMeasurements.sort((a, b) => (a.order || 999) - (b.order || 999))
  })

  return grouped
} 