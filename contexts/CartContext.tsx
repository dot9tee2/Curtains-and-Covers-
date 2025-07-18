'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CartItem } from '@/types/product'

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => Promise<void>
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotals: () => {
    subtotal: number
    tax: number
    shipping: number
    total: number
    itemCount: number
  }
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

const CART_STORAGE_KEY = 'custom-covers-cart'
const TAX_RATE = 0.0825 // 8.25% tax rate
const FREE_SHIPPING_THRESHOLD = 100
const STANDARD_SHIPPING = 15

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
      } catch (error) {
        console.error('Error saving cart to localStorage:', error)
      }
    }
  }, [items, isLoading])

  const addToCart = async (newItem: Omit<CartItem, 'id'>): Promise<void> => {
    const id = `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    setItems(prevItems => {
      // Check if a similar item already exists
      const existingItemIndex = prevItems.findIndex(item => 
        item.productId === newItem.productId &&
        item.width === newItem.width &&
        item.height === newItem.height &&
        item.material === newItem.material &&
        item.color === newItem.color &&
        JSON.stringify(item.addons) === JSON.stringify(newItem.addons)
      )
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity and price
        const updatedItems = [...prevItems]
        const existingItem = updatedItems[existingItemIndex]
        const pricePerUnit = existingItem.price / existingItem.quantity
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + newItem.quantity,
          price: (existingItem.quantity + newItem.quantity) * pricePerUnit
        }
        
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, { ...newItem, id }]
      }
    })
  }

  const removeFromCart = (itemId: string): void => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          const pricePerUnit = item.price / item.quantity
          return {
            ...item,
            quantity,
            price: pricePerUnit * quantity
          }
        }
        return item
      })
    )
  }

  const clearCart = (): void => {
    setItems([])
  }

  const getTotals = () => {
    const subtotal = items.reduce((total, item) => total + item.price, 0)
    const tax = subtotal * TAX_RATE
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING
    const total = subtotal + tax + shipping
    const itemCount = items.reduce((count, item) => count + item.quantity, 0)

    return {
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shipping: Number(shipping.toFixed(2)),
      total: Number(total.toFixed(2)),
      itemCount
    }
  }

  const contextValue: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotals,
    isLoading
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
} 