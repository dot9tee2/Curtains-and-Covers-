'use client'

import { useCart } from '@/contexts/CartContext'

export default function CartSummary() {
  const { items, getTotals, clearCart } = useCart()
  const totals = getTotals()

  const handleCheckout = () => {
    // In a real app, this would redirect to a payment processor
    alert('Checkout functionality would be implemented here with a payment processor like Stripe or PayPal.')
  }

  const handleWhatsAppOrder = () => {
    let message = `Hi! I'd like to order the following custom covers:\n\n`
    
    items.forEach((item, index) => {
      const selectedAddons = Object.entries(item.addons)
        .filter(([_, selected]) => selected)
        .map(([addon, _]) => addon.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))

      message += `${index + 1}. ${item.productName}\n`
      message += `   • Size: ${item.width}" × ${item.height}" (${(item.width * item.height / 144).toFixed(1)} sq ft)\n`
      message += `   • Material: ${item.material}\n`
      message += `   • Color: ${item.color}\n`
      message += `   • Quantity: ${item.quantity}\n`
      if (selectedAddons.length > 0) {
        message += `   • Add-ons: ${selectedAddons.join(', ')}\n`
      }
      message += `   • Price: $${item.price.toFixed(2)}\n\n`
    })

    message += `Order Summary:\n`
    message += `Subtotal: $${totals.subtotal.toFixed(2)}\n`
    message += `Tax: $${totals.tax.toFixed(2)}\n`
    message += `Shipping: ${totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}\n`
    message += `Total: $${totals.total.toFixed(2)}\n\n`
    message += `Please confirm availability and provide delivery timeline. Thank you!`

    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm sticky top-4">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal ({totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'})</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${totals.tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between text-gray-600">
            <div className="flex flex-col">
              <span>Shipping</span>
              {totals.shipping === 0 && (
                <span className="text-xs text-green-600">Free shipping applied!</span>
              )}
            </div>
            <span>
              {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
            </span>
          </div>
          
          {totals.subtotal < 100 && totals.subtotal > 0 && (
            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
              Add ${(100 - totals.subtotal).toFixed(2)} more for free shipping!
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-900">
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Proceed to Checkout
          </button>
          
          <button
            onClick={handleWhatsAppOrder}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>Order via WhatsApp</span>
          </button>
        </div>

        {/* Additional Options */}
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear your cart?')) {
                clearCart()
              }
            }}
            className="w-full text-center text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* Delivery Information */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Information</h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Custom made to order
            </div>
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              2-3 weeks production time
            </div>
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free shipping over $100
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 