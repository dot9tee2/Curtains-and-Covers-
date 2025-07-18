import { CartItem } from '@/types/product'

const CART_STORAGE_KEY = 'custom-covers-cart'

// Get cart items from localStorage
export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY)
    return cartData ? JSON.parse(cartData) : []
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return []
  }
}

// Save cart items to localStorage
function saveCartItems(items: CartItem[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Add item to cart
export async function addToCart(newItem: Omit<CartItem, 'id'>): Promise<void> {
  const cartItems = getCartItems()
  
  // Generate a unique ID for the cart item
  const id = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  // Check if a similar item already exists (same product and customization)
  const existingItemIndex = cartItems.findIndex(item => 
    item.productId === newItem.productId &&
    item.width === newItem.width &&
    item.height === newItem.height &&
    item.material === newItem.material &&
    item.color === newItem.color &&
    JSON.stringify(item.addons) === JSON.stringify(newItem.addons)
  )
  
  if (existingItemIndex >= 0) {
    // Update quantity of existing item
    cartItems[existingItemIndex].quantity += newItem.quantity
    cartItems[existingItemIndex].price += newItem.price
  } else {
    // Add new item to cart
    cartItems.push({ ...newItem, id })
  }
  
  saveCartItems(cartItems)
}

// Remove item from cart
export function removeFromCart(itemId: string): void {
  const cartItems = getCartItems()
  const updatedItems = cartItems.filter(item => item.id !== itemId)
  saveCartItems(updatedItems)
}

// Update item quantity
export function updateCartItemQuantity(itemId: string, quantity: number): void {
  const cartItems = getCartItems()
  const itemIndex = cartItems.findIndex(item => item.id === itemId)
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      const originalQuantity = cartItems[itemIndex].quantity
      const pricePerUnit = cartItems[itemIndex].price / originalQuantity
      
      cartItems[itemIndex].quantity = quantity
      cartItems[itemIndex].price = pricePerUnit * quantity
      
      saveCartItems(cartItems)
    }
  }
}

// Clear entire cart
export function clearCart(): void {
  saveCartItems([])
}

// Get cart totals
export function getCartTotals() {
  const cartItems = getCartItems()
  
  const subtotal = cartItems.reduce((total, item) => total + item.price, 0)
  const tax = subtotal * 0.0825 // 8.25% tax rate
  const shipping = subtotal > 100 ? 0 : 15 // Free shipping over $100
  const total = subtotal + tax + shipping
  
  return {
    subtotal,
    tax,
    shipping,
    total,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
  }
}

// Get cart item count
export function getCartItemCount(): number {
  const cartItems = getCartItems()
  return cartItems.reduce((count, item) => count + item.quantity, 0)
} 