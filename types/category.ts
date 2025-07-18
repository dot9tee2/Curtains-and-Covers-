export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  image?: any
  featured: boolean
  productCount?: number
}

export interface TransformedCategory {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  featured: boolean
  features: string[]
  colors: string[]
} 