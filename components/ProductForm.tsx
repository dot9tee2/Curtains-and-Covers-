'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/CartContext'

interface Product {
  id: string
  name: string
  slug: string
  basePrice: number
  category: string
  image: string
  description: string
  materials: Array<{
    name: string
    multiplier: number
    description: string
  }>
  colors: Array<{
    name: string
    value: string
    hex: string
  }>
}

interface ProductFormProps {
  product: Product
}

interface FormData {
  width: number
  height: number
  material: string
  color: string
  quantity: number
  addons: {
    velcro: boolean
    eyelets: boolean
    customLogo: boolean
  }
}

const addOnPrices = {
  velcro: 15,
  eyelets: 25,
  customLogo: 50,
}

export default function ProductForm({ product }: ProductFormProps) {
  const { addToCart } = useCart()
  
  const [formData, setFormData] = useState<FormData>({
    width: 36,
    height: 24,
    material: product.materials[0]?.name || 'vinyl',
    color: product.colors[0]?.value || 'black',
    quantity: 1,
    addons: {
      velcro: false,
      eyelets: false,
      customLogo: false,
    },
  })

  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate price whenever form data changes
  useEffect(() => {
    const calculatePrice = () => {
      const area = (formData.width * formData.height) / 144 // Convert to square feet
      const materialMultiplier = product.materials.find(m => m.name === formData.material)?.multiplier || 1
      const basePrice = product.basePrice * area * materialMultiplier
      
      const addOnTotal = Object.entries(formData.addons).reduce((total, [addon, selected]) => {
        if (selected) {
          return total + addOnPrices[addon as keyof typeof addOnPrices]
        }
        return total
      }, 0)

      return (basePrice + addOnTotal) * formData.quantity
    }

    setTotalPrice(calculatePrice())
  }, [formData, product])

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddonChange = (addon: keyof FormData['addons']) => {
    setFormData(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [addon]: !prev.addons[addon],
      },
    }))
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      const cartItem = {
        productId: product.id,
        productName: product.name,
        productSlug: product.slug,
        productImage: product.image,
        width: formData.width,
        height: formData.height,
        material: formData.material,
        color: formData.color,
        quantity: formData.quantity,
        addons: formData.addons,
        price: totalPrice,
      }
      
      await addToCart(cartItem)
      // Show success message (you might want to add a toast notification)
      alert('Product added to cart!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Error adding to cart. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleWhatsAppOrder = () => {
    const selectedAddons = Object.entries(formData.addons)
      .filter(([_, selected]) => selected)
      .map(([addon, _]) => addon)
      .join(', ')

    const message = `Hi! I'd like to order a ${product.name}:
- Size: ${formData.width}" x ${formData.height}"
- Material: ${formData.material}
- Color: ${formData.color}
- Quantity: ${formData.quantity}
${selectedAddons ? `- Add-ons: ${selectedAddons}` : ''}
- Total Price: $${totalPrice.toFixed(2)}

Can you help me with this order?`

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-2">
            Width (inches)
          </label>
          <input
            type="number"
            id="width"
            min="12"
            max="120"
            value={formData.width}
            onChange={(e) => handleInputChange('width', parseInt(e.target.value) || 12)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-2">
            Height (inches)
          </label>
          <input
            type="number"
            id="height"
            min="12"
            max="120"
            value={formData.height}
            onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 12)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Material Selection */}
      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
          Material
        </label>
        <select
          id="material"
          value={formData.material}
          onChange={(e) => handleInputChange('material', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {product.materials.map((material) => (
            <option key={material.name} value={material.name}>
              {material.name} - {material.description} (+{((material.multiplier - 1) * 100).toFixed(0)}%)
            </option>
          ))}
        </select>
      </div>

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Color
        </label>
        <div className="grid grid-cols-4 gap-3">
          {product.colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => handleInputChange('color', color.value)}
              className={`relative p-3 rounded-lg border-2 transition-all ${
                formData.color === color.value
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div
                className="w-8 h-8 rounded-full mx-auto mb-2 border border-gray-200"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-xs font-medium text-gray-700">{color.name}</span>
              {formData.color === color.value && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Add-ons
        </label>
        <div className="space-y-3">
          {Object.entries(addOnPrices).map(([addon, price]) => (
            <label key={addon} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.addons[addon as keyof FormData['addons']]}
                onChange={() => handleAddonChange(addon as keyof FormData['addons'])}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 capitalize">
                {addon.replace(/([A-Z])/g, ' $1').trim()} (+${price})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          min="1"
          max="50"
          value={formData.quantity}
          onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
          className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Price Display */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">Total Price:</span>
          <span className="text-2xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Price includes {(formData.width * formData.height / 144).toFixed(1)} sq ft at ${product.basePrice}/sq ft
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding to Cart...' : 'Add to Cart'}
        </button>
        
        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          <span>Order via WhatsApp</span>
        </button>
      </div>
    </div>
  )
} 