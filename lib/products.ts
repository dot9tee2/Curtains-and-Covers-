import { client } from './sanity'
import { urlForImage } from './sanity'
import { Product, Material, Category } from '@/types/product'

// Transform Sanity product data to our Product interface
async function transformProduct(sanityProduct: any): Promise<Product> {
  console.log('Transforming product:', sanityProduct.name)
  
  let materials: Material[] = []
    let colors: any[] = []
    
  // Transform materials with enhanced schema support
    if (sanityProduct.variations?.materials && Array.isArray(sanityProduct.variations.materials)) {
      console.log('Found materials array with', sanityProduct.variations.materials.length, 'items')
      
      materials = sanityProduct.variations.materials.map((material: any) => {
        console.log('Processing material in transformProduct:', material)
        
        return {
          _id: material._id,
          title: material.title,
          slug: material.slug,
          description: material.description,
        detailedDescription: material.detailedDescription,
          multiplier: material.multiplier || 1.0,
          image: material.image ? urlForImage(material.image).url() : undefined,
        gallery: material.gallery?.map((img: any) => urlForImage(img).url()) || [],
        category: material.category,
        tags: material.tags || [],
        technicalSpecs: material.technicalSpecs ? {
          composition: material.technicalSpecs.composition,
          weight: material.technicalSpecs.weight,
          thickness: material.technicalSpecs.thickness,
          width: material.technicalSpecs.width || [],
          finish: material.technicalSpecs.finish,
          breathability: material.technicalSpecs.breathability
        } : undefined,
        properties: material.properties ? {
          weightCategory: material.properties.weightCategory,
          waterproofRating: material.properties.waterproofRating,
          uvResistanceRating: material.properties.uvResistanceRating,
          tearStrength: material.properties.tearStrength,
          abrasionResistance: material.properties.abrasionResistance,
          temperatureResistance: material.properties.temperatureResistance,
          fireRetardant: material.properties.fireRetardant,
          antimicrobial: material.properties.antimicrobial,
          antiStatic: material.properties.antiStatic,
          pvcCoated: material.properties.pvcCoated,
          wipeClean: material.properties.wipeClean,
          warranty: material.properties.warranty,
          certifications: material.properties.certifications || []
        } : undefined,
        careInstructions: material.careInstructions,
        sustainability: material.sustainability,
        applications: material.applications,
        supplier: material.supplier,
        hasColors: material.hasColors !== false, // Default to true for backward compatibility
        colors: material.hasColors !== false && material.colors?.filter((color: any) => color && color.name)?.map((color: any) => ({
            name: color.name,
          colorCode: color.colorCode,
            hex: color.hex,
            image: color.image ? urlForImage(color.image).url() : undefined,
            price: color.price || 0,
          popularity: color.popularity,
          fastness: color.fastness,
          inStock: color.inStock !== false,
          seasonal: color.seasonal || false
          })) || [],
        seo: material.seo,
        active: material.active !== false,
        displayOrder: material.displayOrder
        }
      })
      
    // Flatten all colors from all materials for legacy support
    colors = materials.flatMap((material: Material) => material.colors)
      console.log('Extracted', materials.length, 'materials and', colors.length, 'colors')
    } else {
      console.log('No materials found in variations')
    }

  // Transform the product with enhanced data
  const product: Product = {
      id: sanityProduct._id,
    name: sanityProduct.name,
    slug: sanityProduct.slug?.current || '',
      description: sanityProduct.description || '',
    image: sanityProduct.image ? urlForImage(sanityProduct.image).url() : '',
      categories: sanityProduct.categories?.map((cat: any) => ({
        _id: cat._id,
        title: cat.title,
        slug: cat.slug,
      description: cat.description || '',
        image: cat.image ? urlForImage(cat.image).url() : undefined,
        featured: cat.featured || false
      })) || [],
      basePrice: sanityProduct.basePrice || 0,
    rating: sanityProduct.rating,
    reviewCount: sanityProduct.reviewCount,
      featured: sanityProduct.featured || false,
      inStock: sanityProduct.inStock !== false,
      sku: sanityProduct.sku,
      tags: sanityProduct.tags || [],
    images: sanityProduct.images ? {
      main: urlForImage(sanityProduct.images.main).url(),
      gallery: sanityProduct.images.gallery?.map((img: any) => urlForImage(img).url()) || []
    } : undefined,
    currency: sanityProduct.currency || 'USD',
    variations: await transformVariations(sanityProduct.variations, materials),
    measurements: sanityProduct.measurements || [],
      fileUploads: sanityProduct.fileUploads || [],
    specialRequests: sanityProduct.specialRequests,
    measurementTips: sanityProduct.measurementTips,
    productType: sanityProduct.productType || 'simple',
    shortDescription: sanityProduct.shortDescription,
    addons: sanityProduct.addons || [],
    metaDescription: sanityProduct.metaDescription,
    defaultConfiguration: sanityProduct.defaultConfiguration,
    // Enhanced legacy support
      materials,
    colors
  }

  console.log('Transformed product:', product.name, 'with', materials.length, 'materials')
  return product
}

// Transform variations with enhanced material data
async function transformVariations(variations: any, materials: Material[] = []) {
  console.log('Transforming variations with', materials.length, 'materials')
    const result: any = {}
    
    // Styles
  if (variations?.styles && Array.isArray(variations.styles)) {
      result.styles = {
      required: variations.styles.some((style: any) => style.required) || false,
      options: variations.styles.map((style: any) => ({
        id: style._id,
          name: style.name,
        price: style.price || 0,
        description: style.description || '',
          image: style.image ? urlForImage(style.image).url() : undefined,
          measurements: style.measurements || []
        }))
      }
    }
    
  // Enhanced Materials - use the processed materials array
    if (materials && materials.length > 0) {
      console.log('Processing materials for variations:', materials.length, 'items')
      
      result.materials = {
        required: true,
      options: materials.map((material: Material) => {
          console.log('Processing material for variations:', material.title)
          
          return {
            id: material._id,
            name: material.title,
          price: 0, // Base material price is handled by multiplier
            description: material.description || '',
            image: material.image,
            properties: {
            // Legacy properties for backward compatibility
            weight: material.properties?.weightCategory,
            waterproof: material.properties?.waterproofRating && material.properties.waterproofRating >= 4,
            waterResistant: material.properties?.waterproofRating && material.properties.waterproofRating >= 2,
            uvResistant: material.properties?.uvResistanceRating && material.properties.uvResistanceRating >= 3,
            tearResistant: material.properties?.tearStrength && material.properties.tearStrength >= 3,
            abrasionResistant: material.properties?.abrasionResistance && material.properties.abrasionResistance >= 3,
            pvcCoated: material.properties?.pvcCoated,
            wipeClean: material.properties?.wipeClean,
            warranty: material.properties?.warranty,
            useCase: material.applications?.recommended?.[0] || 'General use',
            // Enhanced properties
            category: material.category,
            technicalSpecs: material.technicalSpecs,
            enhancedProperties: material.properties,
            careInstructions: material.careInstructions,
            sustainability: material.sustainability,
            applications: material.applications,
            supplier: material.supplier,
            seo: material.seo,
            performanceScore: calculateMaterialPerformanceScore(material),
            suitabilityTags: generateMaterialSuitabilityTags(material)
          }
        }
      })
    }
    
    // Enhanced Colors (flattened from materials with enhanced data)
    const colorOptions = materials.flatMap((material: Material) => {
        if (!material.colors || !Array.isArray(material.colors)) {
          return []
        }
        
        return material.colors.map((color: any) => ({
          id: `${material._id}-${color.name?.toLowerCase().replace(/\s+/g, '-')}` || `color-${Math.random()}`,
          name: color.name || 'Unknown Color',
          price: color.price || 0,
          hex: color.hex || '#000000',
        image: color.image,
        colorCode: color.colorCode,
        popularity: color.popularity,
        fastness: color.fastness,
        inStock: color.inStock !== false,
        seasonal: color.seasonal || false,
        materialId: material._id,
        materialName: material.title
        }))
      })
      
      result.colors = {
        required: true,
      options: colorOptions.sort((a: any, b: any) => {
        // Sort by availability first, then popularity
        if (a.inStock !== b.inStock) return b.inStock ? 1 : -1
        return (b.popularity || 3) - (a.popularity || 3)
      })
      }
      
      console.log('Transformed materials options:', result.materials.options.length)
      console.log('Transformed colors options:', result.colors.options.length)
  }

  // Features (addons)
  if (variations?.features && Array.isArray(variations.features)) {
    const featuresByType: { [key: string]: any[] } = {}
    
    variations.features.forEach((feature: any) => {
      const type = feature.type || 'general'
      if (!featuresByType[type]) featuresByType[type] = []
      featuresByType[type].push({
        id: feature._id,
        name: feature.name,
        price: feature.price || 0,
        description: feature.description || '',
        image: feature.image ? urlForImage(feature.image).url() : undefined
      })
    })
    
    result.features = featuresByType
  }

  return result
}

// Calculate material performance score
function calculateMaterialPerformanceScore(material: Material): number {
  const props = material.properties || {}
  let score = 0
  let factors = 0

  // Weight performance ratings (1-5 scale)
  if (props.waterproofRating) {
    score += props.waterproofRating
    factors++
  }
  if (props.uvResistanceRating) {
    score += props.uvResistanceRating
    factors++
  }
  if (props.tearStrength) {
    score += props.tearStrength
    factors++
  }
  if (props.abrasionResistance) {
    score += props.abrasionResistance
    factors++
  }

  // Bonus points for special features
  if (props.fireRetardant) score += 0.5
  if (props.antimicrobial) score += 0.5
  if (props.antiStatic) score += 0.3

  return factors > 0 ? Math.min(5, score / factors) : 3
}

// Generate material suitability tags
function generateMaterialSuitabilityTags(material: Material): string[] {
  const tags: string[] = []
  const props = material.properties || {}
  const apps = material.applications || {}
  const sustainability = material.sustainability || {}

  // Performance-based tags
  if (props.waterproofRating && props.waterproofRating >= 4) tags.push('Waterproof')
  if (props.uvResistanceRating && props.uvResistanceRating >= 4) tags.push('UV Resistant')
  if (props.tearStrength && props.tearStrength >= 4) tags.push('Heavy Duty')
  if (props.abrasionResistance && props.abrasionResistance >= 4) tags.push('Long Lasting')

  // Application-based tags
  if (apps.outdoorUse) tags.push('Outdoor')
  if (apps.marineUse) tags.push('Marine Grade')
  if (apps.commercialGrade) tags.push('Commercial')

  // Special features
  if (props.fireRetardant) tags.push('Fire Retardant')
  if (props.antimicrobial) tags.push('Antimicrobial')
  if (props.wipeClean) tags.push('Easy Clean')

  // Sustainability tags
  if (sustainability.recyclable) tags.push('Recyclable')
  if (sustainability.ecoFriendly) tags.push('Eco-Friendly')
  if (sustainability.recycledContent && sustainability.recycledContent > 50) {
    tags.push('Recycled Content')
  }

  // SEO flags
  if (material.seo?.featured) tags.push('Featured')
  if (material.seo?.newProduct) tags.push('New')
  if (material.seo?.bestseller) tags.push('Bestseller')

  return tags
}

// Get single product by slug
export async function getProduct(slug: string): Promise<Product | null> {
  const query = `*[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    shortDescription,
    image,
    images,
    categories[]->,
    basePrice,
    rating,
    reviewCount,
    featured,
    inStock,
    sku,
    tags,
    currency,
    variations {
      styles[] {
        _id,
        name,
        price,
        description,
        image,
        measurements
      },
      materials[]-> {
        _id,
        title,
        slug,
        description,
        detailedDescription,
        multiplier,
        image,
        gallery,
        category,
        tags,
        technicalSpecs,
        properties,
        careInstructions,
        sustainability,
        applications,
        supplier,
        colors,
        seo,
        active,
        displayOrder
      },
      features[] {
        _id,
        name,
        type,
        price,
        description,
        image
      }
    },
    measurements,
    fileUploads,
    specialRequests,
    measurementTips,
    productType,
    addons,
    metaDescription,
    defaultConfiguration
  }`

  try {
    const product = await client.fetch(query, { slug })
    return product ? await transformProduct(product) : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

// Get all products with optional filtering
export async function getProducts({
  category,
  featured,
  limit
}: {
  category?: string
  featured?: boolean
  limit?: number
} = {}): Promise<Product[]> {
  let query = `*[_type == "product"`

  const filters = []
  if (category) filters.push(`$category in categories[]->slug.current`)
  if (featured) filters.push(`featured == true`)

  if (filters.length > 0) {
    query += ` && (${filters.join(' && ')})`
  }

  query += `] | order(featured desc, _createdAt desc)`

  if (limit) {
    query += `[0...${limit}]`
  }

  query += ` {
    _id,
    name,
    slug,
    description,
    shortDescription,
    image,
    images,
    categories[]->,
    basePrice,
    rating,
    reviewCount,
    featured,
    inStock,
    sku,
    tags,
    currency,
    variations {
      styles[] {
        _id,
        name,
        price,
        description,
        image,
        measurements
      },
      materials[]-> {
        _id,
        title,
        slug,
        description,
        detailedDescription,
        multiplier,
        image,
        gallery,
        category,
        tags,
        technicalSpecs,
        properties,
        careInstructions,
        sustainability,
        applications,
        supplier,
        colors,
        seo,
        active,
        displayOrder
      },
      features[] {
        _id,
        name,
        type,
        price,
        description,
        image
      }
    },
    measurements,
    fileUploads,
    specialRequests,
    measurementTips,
    productType,
    addons,
    metaDescription,
    defaultConfiguration
  }`

  try {
    const products = await client.fetch(query, { category })
    return Promise.all(products.map(transformProduct))
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

// Get products by category
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getProducts({ category: categorySlug })
}

// Get featured products
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return getProducts({ featured: true, limit })
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
  const query = `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    featured,
    "productCount": count(*[_type == "product" && references(^._id)])
  }`

  try {
    const categories = await client.fetch(query)
    return categories.map((category: any) => ({
      _id: category._id,
      title: category.title,
      slug: category.slug,
      description: category.description || '',
      image: category.image ? urlForImage(category.image).url() : undefined,
      featured: category.featured || false,
      productCount: category.productCount || 0
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Get all materials (for enhanced material selection)
export async function getMaterials(): Promise<Material[]> {
  const query = `*[_type == "material" && active == true] | order(displayOrder asc, title asc) {
    _id,
    title,
    slug,
    description,
    detailedDescription,
    multiplier,
    image,
    gallery,
    category,
    tags,
    technicalSpecs,
    properties,
    careInstructions,
    sustainability,
    applications,
    supplier,
    hasColors,
    colors,
    seo,
    active,
    displayOrder
  }`

  try {
    const materials = await client.fetch(query)
    return materials.map((material: any) => ({
      _id: material._id,
      title: material.title,
      slug: material.slug,
      description: material.description,
      detailedDescription: material.detailedDescription,
      multiplier: material.multiplier || 1.0,
      image: material.image ? urlForImage(material.image).url() : undefined,
      gallery: material.gallery?.map((img: any) => urlForImage(img).url()) || [],
      category: material.category,
      tags: material.tags || [],
      technicalSpecs: material.technicalSpecs,
      properties: material.properties,
      careInstructions: material.careInstructions,
      sustainability: material.sustainability,
      applications: material.applications,
      supplier: material.supplier,
      hasColors: material.hasColors !== false, // Default to true for backward compatibility
      colors: material.hasColors !== false && material.colors?.map((color: any) => ({
        name: color.name,
        colorCode: color.colorCode,
        hex: color.hex,
        image: color.image ? urlForImage(color.image).url() : undefined,
        price: color.price || 0,
        popularity: color.popularity,
        fastness: color.fastness,
        inStock: color.inStock !== false,
        seasonal: color.seasonal || false
      })) || [],
      seo: material.seo,
      active: material.active !== false,
      displayOrder: material.displayOrder
    }))
  } catch (error) {
    console.error('Error fetching materials:', error)
    return []
  }
}

// Alias functions for backward compatibility
export async function getAllProducts() {
  return getProducts()
}

export async function getProductBySlug(slug: string) {
  return getProduct(slug)
} 