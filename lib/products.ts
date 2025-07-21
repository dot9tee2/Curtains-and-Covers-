import { Product, Category } from '@/types/product'
import { getProducts, getFeaturedProducts as getSanityFeaturedProducts, getProductBySlug as getSanityProductBySlug, getProductsByCategory as getSanityProductsByCategory, getCategories, urlForImage } from './sanity'

// Transform Sanity product data to match frontend interface
async function transformProduct(sanityProduct: any): Promise<Product> {
  try {
    console.log('transformProduct called with:', sanityProduct.title)
    
    // Validate required fields
    if (!sanityProduct._id) {
      throw new Error('Product missing _id')
    }
    if (!sanityProduct.title) {
      throw new Error('Product missing title')
    }
    if (!sanityProduct.slug || !sanityProduct.slug.current) {
      throw new Error(`Product missing valid slug: ${JSON.stringify(sanityProduct.slug)}`)
    }

    console.log('Product validation passed')

    // Extract materials from variations.materials (array of material references)
    let materials: any[] = []
    let colors: any[] = []
    
    console.log('Processing variations:', sanityProduct.variations)
    
    if (sanityProduct.variations?.materials && Array.isArray(sanityProduct.variations.materials)) {
      console.log('Found materials array with', sanityProduct.variations.materials.length, 'items')
      
      materials = sanityProduct.variations.materials.map((material: any) => {
        console.log('Processing material in transformProduct:', material)
        
        return {
          _id: material._id,
          title: material.title,
          slug: material.slug,
          description: material.description,
          multiplier: material.multiplier || 1.0,
          image: material.image ? urlForImage(material.image).url() : undefined,
          weight: material.properties?.weight,
          waterproof: material.properties?.waterproof,
          waterResistant: material.properties?.waterResistant,
          uvResistant: material.properties?.uvResistant,
          tearResistant: material.properties?.tearResistant,
          abrasionResistant: material.properties?.abrasionResistant,
          pvcCoated: material.properties?.pvcCoated,
          wipeClean: material.properties?.wipeClean,
          warranty: material.properties?.warranty,
          useCase: material.properties?.useCase,
          colors: material.colors?.filter((color: any) => color && color.name)?.map((color: any) => ({
            name: color.name,
            hex: color.hex,
            image: color.image ? urlForImage(color.image).url() : undefined,
            price: color.price || 0,
            inStock: color.inStock !== false
          })) || [],
          featured: material.featured || false,
          active: material.active !== false
        }
      })
      
      // Flatten all colors from all materials
      colors = materials.flatMap((material: any) => material.colors)
      console.log('Extracted', materials.length, 'materials and', colors.length, 'colors')
    } else {
      console.log('No materials found in variations')
    }

    console.log('Starting variations transformation...')
    const variations = await transformVariations(sanityProduct.variations, materials)
    console.log('Variations transformation completed')

    const transformed = {
      id: sanityProduct._id,
      name: sanityProduct.title,
      slug: sanityProduct.slug.current,
      description: sanityProduct.description || '',
      shortDescription: sanityProduct.shortDescription || '',
      image: sanityProduct.image ? urlForImage(sanityProduct.image).url() : '/images/placeholder.jpg',
      categories: sanityProduct.categories?.map((cat: any) => ({
        _id: cat._id,
        title: cat.title,
        slug: cat.slug,
        description: cat.description,
        image: cat.image ? urlForImage(cat.image).url() : undefined,
        featured: cat.featured || false
      })) || [],
      basePrice: sanityProduct.basePrice || 0,
      rating: sanityProduct.rating || 4.5,
      reviewCount: sanityProduct.reviewCount || Math.floor(Math.random() * 200) + 50,
      featured: sanityProduct.featured || false,
      inStock: sanityProduct.inStock !== false,
      sku: sanityProduct.sku,
      tags: sanityProduct.tags || [],
      currency: sanityProduct.currency || 'EUR',
      productType: sanityProduct.productType || 'complex',
      images: {
        main: sanityProduct.image ? urlForImage(sanityProduct.image).url() : '/images/placeholder.jpg',
        gallery: sanityProduct.gallery?.map((img: any) => urlForImage(img).url()) || []
      },
      variations,
      fileUploads: sanityProduct.fileUploads || [],
      specialRequests: sanityProduct.specialRequests || { enabled: true, placeholder: 'Enter any special requests or additional requirements' },
      measurementTips: sanityProduct.measurementTips || [
        'Measure the longest and widest points of your item',
        'Use a flexible tape measure for accurate measurements',
        'Take measurements in centimeters for best results',
        'Include any special features or protrusions in your measurements'
      ],
      materials,
      colors,
      addons: sanityProduct.addons || [],
      metaDescription: sanityProduct.metaDescription || ''
    }
    
    console.log('Product transformation completed successfully')
    return transformed
  } catch (error) {
    console.error('Error in transformProduct for:', sanityProduct?.title || 'unknown', error)
    throw error
  }
}

// Transform variations to match frontend expectations
async function transformVariations(variations: any, materials: any[] = []) {
  try {
    if (!variations) {
      return {
        materials: { required: true, options: [] },
        colors: { required: true, options: [] }
      }
    }
    
    console.log('TransformVariations input:', JSON.stringify(variations, null, 2))
    
    const result: any = {}
    
    // Styles
    if (variations.styles && variations.styles.options) {
      result.styles = {
        required: variations.styles.required || false,
        options: variations.styles.options.map((style: any) => ({
          id: style.id,
          name: style.name,
          price: 0,
          description: style.description,
          image: style.image ? urlForImage(style.image).url() : undefined,
          measurements: style.measurements || []
        }))
      }
    }
    
    // Materials - use the processed materials array
    if (materials && materials.length > 0) {
      console.log('Processing materials for variations:', materials.length, 'items')
      
      result.materials = {
        required: true,
        options: materials.map((material: any) => {
          console.log('Processing material for variations:', material.title)
          
          return {
            id: material._id,
            name: material.title,
            price: 0,
            description: material.description || '',
            image: material.image,
            properties: {
              weight: material.weight,
              waterproof: material.waterproof,
              waterResistant: material.waterResistant,
              uvResistant: material.uvResistant,
              tearResistant: material.tearResistant,
              abrasionResistant: material.abrasionResistant,
              pvcCoated: material.pvcCoated,
              wipeClean: material.wipeClean,
              warranty: material.warranty,
              useCase: material.useCase
            }
          }
        })
      }
      
      // Colors (flattened from materials)
      const colorOptions = materials.flatMap((material: any) => {
        if (!material.colors || !Array.isArray(material.colors)) {
          return []
        }
        
        return material.colors.map((color: any) => ({
          id: `${material._id}-${color.name?.toLowerCase().replace(/\s+/g, '-')}` || `color-${Math.random()}`,
          name: color.name || 'Unknown Color',
          price: color.price || 0,
          hex: color.hex || '#000000',
          image: color.image
        }))
      })
      
      result.colors = {
        required: true,
        options: colorOptions
      }
      
      console.log('Transformed materials options:', result.materials.options.length)
      console.log('Transformed colors options:', result.colors.options.length)
    } else {
      console.log('No materials found, creating empty options')
      result.materials = { required: false, options: [] }
      result.colors = { required: false, options: [] }
    }
    
    // Features
    if (variations.features) {
      result.features = Object.keys(variations.features).reduce((acc: any, key: string) => {
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
    }
    
    console.log('Final transformed variations result:', JSON.stringify(result, null, 2))
    return result
  } catch (error) {
    console.error('Error in transformVariations:', error)
    return {
      materials: { required: false, options: [] },
      colors: { required: false, options: [] }
    }
  }
}

// Transform Sanity categories to match frontend interface
function transformSanityCategory(sanityCategory: any): Category {
  return {
    _id: sanityCategory._id,
    title: sanityCategory.title,
    slug: sanityCategory.slug,
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
    const transformedProducts = await Promise.all(sanityProducts.map(transformProduct))
    return transformedProducts
  } catch (error) {
    console.error('Error fetching products from Sanity:', error)
    return []
  }
}

// Get product by slug from Sanity
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log('getProductBySlug called with slug:', slug)
    
    // Call Sanity function
    const sanityProduct = await getSanityProductBySlug(slug)
    
    console.log('Raw Sanity product data:', JSON.stringify(sanityProduct, null, 2))
    
    if (!sanityProduct) {
      console.log('No product found for slug:', slug)
      return null
    }
    
    // Check if slug structure is correct
    if (!sanityProduct.slug || !sanityProduct.slug.current) {
      console.error('Invalid slug structure:', sanityProduct.slug)
      return null
    }
    
    // Transform the product
    console.log('Starting product transformation...')
    const transformedProduct = await transformProduct(sanityProduct)
    console.log('Product transformation completed successfully')
    
    return transformedProduct
  } catch (error) {
    console.error('Error in getProductBySlug for slug:', slug, error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return null
  }
}

// Get featured products from Sanity
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const sanityFeatured = await getSanityFeaturedProducts()
    const transformedProducts = await Promise.all(sanityFeatured.map(transformProduct))
    return transformedProducts
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return []
  }
}

// Get products by category from Sanity
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const sanityProducts = await getSanityProductsByCategory(categorySlug)
    const transformedProducts = await Promise.all(sanityProducts.map(transformProduct))
    return transformedProducts
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
        product.categories?.some(cat => cat.title.toLowerCase().includes(searchTerm)) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    })
  } catch (error) {
    console.error('Error searching products:', error)
    return []
  }
} 