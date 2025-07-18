export interface Product {
  id: string
  name: string
  slug: string
  description: string
  image: string
  category: string
  basePrice: number
  rating?: number
  reviewCount?: number
  materials: Material[]
  colors: Color[]
  featured?: boolean
  inStock?: boolean
}

export interface Material {
  name: string
  multiplier: number
  description: string
}

export interface Color {
  name: string
  value: string
  hex: string
}

export interface CartItem {
  id: string
  productId: string
  productName: string
  productSlug: string
  productImage: string
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
  price: number
}

export interface PriceBreakdown {
  basePrice: number;
  materialMultiplier: number;
  colorModifier: number;
  sizePrice: number;
  addOnsTotal: number;
  subtotal: number;
  tax: number;
  total: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  bannerImage?: string;
  seoText?: string;
  featured: boolean;
  parentId?: string;
  children?: Category[];
  productCount: number;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  material?: string[];
  color?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
  featured?: boolean;
  search?: string;
}

export interface SortOption {
  label: string;
  value: string;
  direction: 'asc' | 'desc';
} 