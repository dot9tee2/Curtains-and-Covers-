// Sanity document types
export interface SanityDocument {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

// Image types
export interface SanityImage {
  _type: 'image'
  asset: {
    _type: 'reference'
    _ref: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// Slug type
export interface SanitySlug {
  _type: 'slug'
  current: string
}

// Reference type
export interface SanityReference {
  _type: 'reference'
  _ref: string
}

// Category type
export interface SanityCategory extends SanityDocument {
  _type: 'category'
  title: string
  slug: SanitySlug
  description?: string
  image?: SanityImage
  featured: boolean
}

// Product type
export interface SanityProduct extends SanityDocument {
  _type: 'product'
  title: string
  slug: SanitySlug
  description?: string
  basePrice: number
  materials?: string[]
  colors?: string[]
  addons?: string[]
  category: SanityCategory | SanityReference
  image?: SanityImage
  featured: boolean
  inStock: boolean
}

// Portable Text blocks
export interface PortableTextBlock {
  _type: 'block'
  _key: string
  style?: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    [key: string]: any
  }>
}

// Blog Post type
export interface SanityBlogPost extends SanityDocument {
  _type: 'blogPost'
  title: string
  slug: SanitySlug
  excerpt?: string
  content?: (PortableTextBlock | SanityImage)[]
  featuredImage?: SanityImage
  author: string
  publishedAt: string
  featured: boolean
  tags?: string[]
  metaDescription?: string
}

// Query result types (populated references)
export interface PopulatedProduct extends Omit<SanityProduct, 'category'> {
  category: SanityCategory
}

// API response types
export type ProductsResponse = PopulatedProduct[]
export type CategoriesResponse = SanityCategory[]
export type BlogPostsResponse = SanityBlogPost[] 