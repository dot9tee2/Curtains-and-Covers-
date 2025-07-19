import { Product, Category } from '@/types/product'
import { getProducts, getFeaturedProducts as getSanityFeaturedProducts, getProductBySlug as getSanityProductBySlug, getProductsByCategory as getSanityProductsByCategory, getCategories, urlForImage } from './sanity'

// Transform Sanity product data to match frontend interface
function transformProduct(sanityProduct: any): Product {
  return {
    id: sanityProduct._id,
    name: sanityProduct.title,
    slug: sanityProduct.slug.current,
    description: sanityProduct.description || '',
    image: sanityProduct.image ? urlForImage(sanityProduct.image).url() : '/images/placeholder.jpg',
    category: sanityProduct.category?.title || '',
    basePrice: sanityProduct.basePrice || 0,
    rating: 4.5, // Default rating
    reviewCount: Math.floor(Math.random() * 200) + 50, // Random for now
    featured: sanityProduct.featured || false,
    inStock: sanityProduct.inStock !== false,
    sku: sanityProduct.sku,
    tags: sanityProduct.tags || [],
    currency: sanityProduct.currency || 'EUR',
    
    // Product images
    images: {
      main: sanityProduct.image ? urlForImage(sanityProduct.image).url() : '/images/placeholder.jpg',
      gallery: sanityProduct.gallery?.map((img: any) => urlForImage(img).url()) || []
    },
    
    // Product variations
    variations: transformVariations(sanityProduct.variations),
    measurements: sanityProduct.measurements || [],
    fileUploads: sanityProduct.fileUploads || [],
    specialRequests: sanityProduct.specialRequests || { enabled: true, placeholder: 'Enter any special requests' },
    measurementTips: sanityProduct.measurementTips || [],
    
    // Legacy material/color support for backward compatibility
    materials: sanityProduct.variations?.materials?.options?.map((material: any) => ({
      id: material.id,
      name: material.name,
      price: material.price,
      description: material.description || material.name,
      image: material.image ? urlForImage(material.image).url() : undefined,
      properties: material.properties,
      weight: material.properties?.weight,
      warranty: material.properties?.warranty,
      useCase: material.properties?.useCase
    })) || [],
    
    colors: sanityProduct.variations?.colors?.options?.map((color: any) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      image: color.image ? urlForImage(color.image).url() : undefined,
      price: color.price || 0
    })) || []
  }
}

// Transform variations
function transformVariations(variations: any) {
  if (!variations) {
    // Return minimal required structure
    return {
      materials: {
        required: true,
        options: []
      },
      colors: {
        required: true,
        options: []
      }
    }
  }
  
  return {
    ...(variations.styles && {
      styles: {
        required: variations.styles.required || false,
        options: variations.styles.options?.map((style: any) => ({
          id: style.id,
          name: style.name,
          price: 0, // Styles typically don't have prices
          description: style.description,
          image: style.image ? urlForImage(style.image).url() : undefined,
          measurements: style.measurements || []
        })) || []
      }
    }),
    materials: {
      required: variations.materials?.required || true,
      options: variations.materials?.options?.map((material: any) => ({
        id: material.id,
        name: material.name,
        price: material.price || 0,
        description: material.description,
        image: material.image ? urlForImage(material.image).url() : undefined,
        properties: material.properties
      })) || []
    },
    colors: {
      required: variations.colors?.required || true,
      options: variations.colors?.options?.map((color: any) => ({
        id: color.id,
        name: color.name,
        price: color.price || 0,
        hex: color.hex,
        image: color.image ? urlForImage(color.image).url() : undefined
      })) || []
    },
    ...(variations.features && {
      features: Object.keys(variations.features).reduce((acc: any, key: string) => {
        const feature = variations.features[key]
        if (feature && feature.options) {
          acc[key] = {
            required: feature.required || false,
            label: feature.label || key,
            options: feature.options.map((option: any) => ({
              id: option.id,
              name: option.name,
              price: option.price || 0,
              description: option.description
            }))
          }
        }
        return acc
      }, {})
    })
  }
}

// Transform Sanity categories to match frontend interface
function transformSanityCategory(sanityCategory: any): Category {
  return {
    id: sanityCategory._id,
    name: sanityCategory.title,
    slug: sanityCategory.slug?.current || sanityCategory.title.toLowerCase().replace(/\s+/g, '-'),
    description: sanityCategory.description || '',
    image: sanityCategory.image ? urlForImage(sanityCategory.image).url() : '/images/placeholder.jpg',
    featured: sanityCategory.featured || false,
    productCount: 0 // Will be calculated
  }
}

// Get all products from Sanity
export async function getAllProducts(): Promise<Product[]> {
  try {
    const sanityProducts = await getProducts()
    return sanityProducts.map(transformProduct)
  } catch (error) {
    console.error('Error fetching products from Sanity:', error)
    return []
  }
}

// Get product by slug from Sanity
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const sanityProduct = await getSanityProductBySlug(slug)
    if (sanityProduct) {
      return transformProduct(sanityProduct)
    }
    return null
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return null
  }
}

// Get featured products from Sanity
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const sanityFeatured = await getSanityFeaturedProducts()
    return sanityFeatured.map(transformProduct)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Get products by category from Sanity
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const sanityProducts = await getSanityProductsByCategory(categorySlug)
    return sanityProducts.map(transformProduct)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    return []
  }
}

// Get all categories from Sanity
export async function getAllCategories(): Promise<Category[]> {
  try {
    const sanityCategories = await getCategories()
    return sanityCategories.map(transformSanityCategory)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Search products in Sanity
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts()
    const searchTerm = query.toLowerCase()
    
    return allProducts.filter(product => {
      const description = Array.isArray(product.description) 
        ? product.description.join(' ') 
        : product.description
      
      return (
        product.name.toLowerCase().includes(searchTerm) ||
        description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    })
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
} 