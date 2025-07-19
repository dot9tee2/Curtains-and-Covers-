export interface Product {
  id: string
  name: string
  slug: string
  description: string | string[]
  image: string
  category: string
  basePrice: number
  rating?: number
  reviewCount?: number
  featured?: boolean
  inStock?: boolean
  // Product properties
  sku?: string
  tags?: string[]
  images?: ProductImages
  currency?: string
  variations: ProductVariations
  measurements?: Measurement[] // Optional - now handled at style level
  fileUploads: FileUpload[]
  specialRequests?: SpecialRequests
  measurementTips?: string[]
  // Legacy support for backward compatibility
  materials?: Material[]
  colors?: Color[]
}

// Enhanced Material interface
export interface Material {
  id?: string
  name: string
  multiplier?: number
  price?: number
  description: string
  image?: string
  properties?: MaterialProperties
  weight?: string
  warranty?: string
  useCase?: string
}

export interface MaterialProperties {
  weight?: string
  waterproof?: boolean
  waterResistant?: boolean
  tearResistant?: boolean
  abrasionResistant?: boolean
  uvResistant?: string | boolean
  pvcCoated?: boolean
  wipeClean?: boolean
  warranty?: string
  useCase?: string
}

// Enhanced Color interface
export interface Color {
  id?: string
  name: string
  value?: string
  hex: string
  image?: string
  price?: number
}

// Product variation interfaces
export interface ProductImages {
  main: string
  gallery?: string[]
}

export interface ProductVariations {
  styles?: VariationOption
  materials: VariationOption
  colors: VariationOption
  features?: { [key: string]: VariationOption }
}

export interface VariationOption {
  required: boolean
  label?: string
  options: VariationOptionItem[]
}

export interface VariationOptionItem {
  id: string
  name: string
  price: number
  image?: string
  description?: string
  hex?: string
  properties?: any
  measurements?: Measurement[] // Style-specific measurements
}

export interface Measurement {
  id: string
  name: string
  required: boolean
  unit: string
  placeholder: string
  type: string
}

export interface FileUpload {
  id: string
  name: string
  required: boolean
  acceptedTypes: string[]
  maxSize: string
  description: string
}

export interface SpecialRequests {
  enabled: boolean
  placeholder: string
}

// Cart and pricing interfaces
export interface CartItem {
  id: string
  productId: string
  productName: string
  productSlug: string
  productImage: string
  quantity: number
  selectedVariations: { [key: string]: string }
  measurements: { [key: string]: number | string }
  uploadedFiles?: UploadedFile[]
  specialRequests?: string
  price: number
}

export interface UploadedFile {
  id: string
  name: string
  url: string
  type: string
}

export interface PriceBreakdown {
  basePrice: number;
  materialPrice?: number;
  variationPrices?: { [key: string]: number };
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
  parent?: string | null;
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

// Configuration types for products
export interface ProductConfiguration {
  productId: string
  selections: { [key: string]: string }
  measurements: { [key: string]: number | string }
  files: UploadedFile[]
  specialRequests?: string
}

export interface PriceCalculationResult {
  breakdown: PriceBreakdown
  isValid: boolean
  errors: string[]
} 