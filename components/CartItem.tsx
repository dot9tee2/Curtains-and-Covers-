'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { CartItem as CartItemType } from '@/types/product'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const selectedAddons = Object.entries(item.addons)
    .filter(([_, selected]) => selected)
    .map(([addon, _]) => addon)

  const formatAddonName = (addon: string) => {
    return addon.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }

  const formatMeasurementName = (key: string) => {
    // Handle common measurement names
    const measurementNames: { [key: string]: string } = {
      'width': 'Width',
      'height': 'Height',
      'length': 'Length',
      'depth': 'Depth',
      'diameter': 'Diameter',
      'radius': 'Radius',
      'side-1': 'Side 1',
      'side-2': 'Side 2',
      'side-3': 'Side 3',
      'side-4': 'Side 4',
      'side-5': 'Side 5',
      'side-6': 'Side 6',
      'side-7': 'Side 7',
      'side-8': 'Side 8',
      'circumference': 'Circumference',
      'perimeter': 'Perimeter'
    }
    
    return measurementNames[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  }

  const calculateArea = () => {
    const measurements = Object.values(item.measurements).filter(val => typeof val === 'number' && val > 0)
    
    if (measurements.length === 0) {
      // Fallback to width and height if no measurements
      if (item.width > 0 && item.height > 0) {
        return (item.width * item.height / 144).toFixed(1)
      }
      return '0.0'
    }
    
    if (measurements.length === 1) {
      // Single measurement (like diameter for round covers)
      const diameter = measurements[0]
      const radius = diameter / 2
      const area = Math.PI * radius * radius / 144 // Convert to sq ft
      return area.toFixed(1)
    }
    
    if (measurements.length === 2) {
      // Two measurements (width × height or length × width)
      const [first, second] = measurements
      return ((first * second) / 144).toFixed(1)
    }
    
    if (measurements.length === 3) {
      // Three measurements (length × width × height)
      const [first, second, third] = measurements
      return ((first * second * third) / 144).toFixed(1)
    }
    
    if (measurements.length === 4) {
      // Four measurements - could be a complex shape
      // For now, use the first two measurements as length and width
      const [first, second] = measurements.slice(0, 2)
      return ((first * second) / 144).toFixed(1)
    }
    
    // For more than 4 measurements, use the first two as length and width
    const [first, second] = measurements.slice(0, 2)
    return ((first * second) / 144).toFixed(1)
  }

  const formatMeasurementsDisplay = () => {
    const measurements = Object.values(item.measurements).filter(val => typeof val === 'number' && val > 0)
    
    if (measurements.length === 0) {
      // Fallback to width and height if no measurements
      if (item.width > 0 && item.height > 0) {
        return `${item.width}" × ${item.height}"`
      }
      return null
    }
    
    // Return measurements in format: "20" × 30" × 20" × 50""
    return measurements.map(m => `${m}"`).join(' × ')
  }

  return (
    <div className="p-6">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={item.productImage}
              alt={item.productName}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">
                <Link 
                  href={`/product/${item.productSlug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.productName}
                </Link>
              </h3>
              
              {/* Customization Details */}
              <div className="mt-2 space-y-2 text-sm text-gray-600">
                {/* Measurements */}
                {formatMeasurementsDisplay() && (
                  <div>
                    <span className="font-medium text-gray-700">Size:</span> {formatMeasurementsDisplay()}
                  </div>
                )}
                
                {/* Material and Color */}
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <span className="font-medium text-gray-700">Material:</span> {item.material}
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Color:</span> {item.color}
                  </div>
                </div>
                
                {/* Add-ons */}
                {selectedAddons.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Add-ons:</span> {selectedAddons.map(formatAddonName).join(', ')}
                  </div>
                )}
                
                {/* Special Requests */}
                {item.specialRequests && (
                  <div>
                    <span className="font-medium text-gray-700">Special Requests:</span> {item.specialRequests}
                  </div>
                )}
                
                {/* Uploaded Files */}
                {item.uploadedFiles && item.uploadedFiles.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-700">Files:</span> {item.uploadedFiles.length} file{item.uploadedFiles.length !== 1 ? 's' : ''} uploaded
                  </div>
                )}
              </div>

              {/* Area Calculation - dynamic based on measurements */}
              {(() => {
                const area = calculateArea()
                if (area !== '0.0') {
                  return (
                    <div className="mt-2 text-xs text-gray-500">
                      Area: {area} sq ft
                    </div>
                  )
                }
                return null
              })()}
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove from cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          {/* Quantity and Price */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  max="50"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="w-16 px-2 py-1 text-center border-0 focus:ring-0 focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="px-2 py-1 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={item.quantity >= 50}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <div className="text-lg font-semibold text-gray-900">
                ${item.price.toFixed(2)}
              </div>
              {item.quantity > 1 && (
                <div className="text-sm text-gray-500">
                  ${(item.price / item.quantity).toFixed(2)} each
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 