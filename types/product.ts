export interface Product {
  id: string
  name: string
  slug: string
  description: string | string[]
  image: string
  categories: Category[]
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
  // Product type for complex vs simple products
  productType?: 'simple' | 'complex'
  // Additional fields
  shortDescription?: string
  addons?: any[]
  metaDescription?: string
  // Default configuration for instant pricing
  defaultConfiguration?: {
    defaultMaterial?: string
    defaultColor?: string  
    defaultStyle?: string
    defaultMeasurements?: {
      width?: number
      height?: number
      customMeasurements?: Array<{
        measurementId: string
        value: number
      }>
    }
    showDefaultPrice?: boolean
  }
  // Legacy support for backward compatibility
  materials?: Material[]
  colors?: Color[]
}

// Enhanced Material interface
export interface Material {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  detailedDescription?: any[] // Rich text content
  multiplier: number
  image?: string
  gallery?: string[]
  category: MaterialCategory
  tags?: string[]
  technicalSpecs?: MaterialTechnicalSpecs
  properties?: MaterialProperties
  careInstructions?: MaterialCareInstructions
  sustainability?: MaterialSustainability
  applications?: MaterialApplications
  supplier?: MaterialSupplier
  hasColors?: boolean // Indicates if material has color options
  colors?: MaterialColor[] // Optional for clear/transparent materials
  seo?: MaterialSEO
  active?: boolean
  displayOrder?: number
}

export type MaterialCategory = 
  | 'canvas' 
  | 'vinyl' 
  | 'polyester' 
  | 'acrylic' 
  | 'mesh' 
  | 'marine' 
  | 'awning' 
  | 'tarpaulin' 
  | 'specialty'

export interface MaterialTechnicalSpecs {
  composition?: string
  weight?: number // GSM
  thickness?: number // mm
  width?: number[] // cm
  finish?: 'matte' | 'glossy' | 'semi-gloss' | 'textured' | 'embossed'
  breathability?: 'non-breathable' | 'low' | 'medium' | 'high'
}

export interface MaterialProperties {
  weightCategory?: 'lightweight' | 'medium' | 'heavy' | 'extra-heavy'
  waterproofRating?: number // 1-5
  uvResistanceRating?: number // 1-5
  tearStrength?: number // 1-5
  abrasionResistance?: number // 1-5
  temperatureResistance?: {
    minTemp?: number
    maxTemp?: number
  }
  fireRetardant?: boolean
  antimicrobial?: boolean
  antiStatic?: boolean
  pvcCoated?: boolean
  wipeClean?: boolean
  warranty?: string
  certifications?: string[]
}

export interface MaterialCareInstructions {
  cleaning?: string
  storage?: string
  washable?: boolean
  dryCleanOnly?: boolean
  bleachSafe?: boolean
}

export interface MaterialSustainability {
  recyclable?: boolean
  recycledContent?: number // percentage
  biodegradable?: boolean
  ecoFriendly?: boolean
  carbonFootprint?: 'low' | 'medium' | 'high'
  sustainabilityCertifications?: string[]
}

export interface MaterialApplications {
  recommended?: string[]
  notRecommended?: string[]
  indoorUse?: boolean
  outdoorUse?: boolean
  commercialGrade?: boolean
  marineUse?: boolean
}

export interface MaterialSupplier {
  supplierName?: string
  supplierCode?: string
  leadTime?: string
  minimumOrder?: number
  stockLevel?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'special-order'
}

export interface MaterialColor {
  name: string
  colorCode?: string
  hex: string
  image?: string
  price: number
  popularity?: number // 1-5
  fastness?: number // 1-5
  inStock: boolean
  seasonal?: boolean
}

export interface MaterialSEO {
  metaDescription?: string
  keywords?: string[]
  featured?: boolean
  newProduct?: boolean
  bestseller?: boolean
}

// Enhanced Color interface (now part of MaterialColor)
export interface Color {
  name: string
  hex: string
  image?: string
  price: number
  inStock: boolean
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
  group?: string
  order?: number
  required: boolean
  unit: string
  placeholder: string
  type: string
  role?: string
  helpText?: string
  defaultValue?: number
  minValue?: number
  maxValue?: number
  dependsOn?: string
  options?: Array<{
    label: string
    value: string
  }>
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
  // Additional properties used in cart components
  width: number
  height: number
  material: string
  color: string
  addons: { [key: string]: boolean }
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
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: string;
  featured?: boolean;
  productCount?: number;
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