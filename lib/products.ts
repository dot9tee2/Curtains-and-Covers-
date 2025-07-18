import { Product } from '@/types/product'
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
    rating: 4.5, // Default rating - you can add this to Sanity schema later
    reviewCount: Math.floor(Math.random() * 200) + 50, // Random for now - add to Sanity schema later
    featured: sanityProduct.featured || false,
    inStock: sanityProduct.inStock !== false,
    materials: sanityProduct.materials?.map((material: string) => ({
      name: material,
      multiplier: material === 'Sunbrella' ? 1.5 : material === 'Canvas' ? 1.25 : 1.0,
      description: `${material} material - ${material === 'Sunbrella' ? 'maximum UV protection' : material === 'Canvas' ? 'premium durability' : 'durable and weather-resistant'}`
    })) || [
      {
        name: 'Vinyl',
        multiplier: 1.0,
        description: 'Standard vinyl material - durable and weather-resistant'
      },
      {
        name: 'Canvas',
        multiplier: 1.25,
        description: 'Heavy-duty canvas - premium durability'
      },
      {
        name: 'Sunbrella',
        multiplier: 1.5,
        description: 'Marine-grade Sunbrella fabric - maximum UV protection'
      }
    ],
    colors: sanityProduct.colors?.map((color: string) => {
      const colorMap: { [key: string]: { hex: string } } = {
        'Black': { hex: '#000000' },
        'Brown': { hex: '#8B4513' },
        'Gray': { hex: '#808080' },
        'Navy': { hex: '#000080' },
        'Forest Green': { hex: '#228B22' },
        'Burgundy': { hex: '#800020' },
        'Tan': { hex: '#D2B48C' },
        'White': { hex: '#FFFFFF' }
      }
      return {
        name: color,
        value: color.toLowerCase().replace(/\s+/g, '-'),
        hex: colorMap[color]?.hex || '#000000'
      }
    }) || [
      { name: 'Black', value: 'black', hex: '#000000' },
      { name: 'Brown', value: 'brown', hex: '#8B4513' },
      { name: 'Gray', value: 'gray', hex: '#808080' },
      { name: 'Navy', value: 'navy', hex: '#000080' },
      { name: 'Forest Green', value: 'forest-green', hex: '#228B22' },
      { name: 'Burgundy', value: 'burgundy', hex: '#800020' },
      { name: 'Tan', value: 'tan', hex: '#D2B48C' },
      { name: 'White', value: 'white', hex: '#FFFFFF' }
    ]
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const sanityProducts = await getProducts()
    return sanityProducts.map(transformProduct)
  } catch (error) {
    console.error('Error fetching products from Sanity:', error)
    return []
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const sanityProduct = await getSanityProductBySlug(slug)
    if (!sanityProduct) return null
    return transformProduct(sanityProduct)
  } catch (error) {
    console.error('Error fetching product by slug from Sanity:', error)
    return null
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const sanityProducts = await getSanityFeaturedProducts()
    return sanityProducts.map(transformProduct)
  } catch (error) {
    console.error('Error fetching featured products from Sanity:', error)
    return []
  }
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const sanityProducts = await getSanityProductsByCategory(categorySlug)
    return sanityProducts.map(transformProduct)
  } catch (error) {
    console.error('Error fetching products by category from Sanity:', error)
    return []
  }
}

export async function getAllCategories(): Promise<string[]> {
  try {
    const categories = await getCategories()
    return categories.map((category: any) => category.title)
  } catch (error) {
    console.error('Error fetching categories from Sanity:', error)
    return []
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const allProducts = await getAllProducts()
    const searchTerm = query.toLowerCase()
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    )
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
} 