import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'idc6hzzx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-12-01',
  useCdn: process.env.NODE_ENV === 'production', // Use CDN for production
})

// Image URL builder
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs
export function urlForImage(source: any) {
  return builder.image(source)
}

// Enhanced product query with proper material references
const enhancedProductQuery = `
  _id,
  title,
  slug,
  sku,
  productType,
  description,
  shortDescription,
  basePrice,
  currency,
  tags,
  featured,
  inStock,
  image,
  gallery,
  variations {
    styles {
      required,
      options[] {
        id,
        name,
        description,
        image,
        measurements[] {
          id,
          name,
          required,
          unit,
          placeholder,
          type
        }
      }
    },
    materials[]-> {
      _id,
      title,
      slug,
      description,
      multiplier,
      image,
      properties,
      colors[] {
        name,
        hex,
        image,
        price,
        inStock
      },
      featured,
      active
    },
    features {
      tieDowns {
        required,
        label,
        options[] {
          id,
          name,
          price,
          description
        }
      },
      splits {
        required,
        label,
        options[] {
          id,
          name,
          price,
          description
        }
      },
      branding {
        required,
        label,
        options[] {
          id,
          name,
          price,
          description
        }
      }
    }
  },
  measurementTips,
  fileUploads[] {
    id,
    name,
    required,
    acceptedTypes,
    maxSize,
    description
  },
  specialRequests {
    enabled,
    placeholder
  },
  categories[]-> {
    _id,
    title,
    slug,
    description
  },
  seo {
    metaTitle,
    metaDescription,
    keywords
  }
`

// GROQ queries for fetching data
export const queries = {
  // Get all products
  allProducts: `*[_type == "product"] | order(_createdAt desc) {
    ${enhancedProductQuery}
  }`,

  // Get featured products
  featuredProducts: `*[_type == "product" && featured == true] | order(_createdAt desc) {
    ${enhancedProductQuery}
  }`,

  // Get single product by slug
  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    ${enhancedProductQuery},
    rating,
    reviewCount,
    metaDescription
  }`,

  // Get products by type
  productsByType: `*[_type == "product" && productType == $productType] | order(_createdAt desc) {
    ${enhancedProductQuery}
  }`,

  // Get all categories
  allCategories: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    featured
  }`,

  // Get featured categories
  featuredCategories: `*[_type == "category" && featured == true] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    featured
  }`,

  // Get products by category
  productsByCategory: `*[_type == "product" && $category in categories[]->slug.current] | order(_createdAt desc) {
    ${enhancedProductQuery}
  }`,

  // Get all blog posts
  allBlogPosts: `*[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    publishedAt,
    featured,
    tags,
    metaDescription
  }`,

  // Get categories with product counts
  categoriesWithProductCount: `*[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    image,
    featured,
    "productCount": count(*[_type == "product" && ^._id in categories[]._ref])
  }`,

  // Get featured blog posts
  featuredBlogPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author,
    publishedAt,
    featured,
    tags,
    metaDescription
  }`,

  // Get single blog post by slug
  blogPostBySlug: `*[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    featuredImage,
    author,
    publishedAt,
    featured,
    tags,
    metaDescription
  }`
}

// Fetch functions
export async function getProducts() {
  return await client.fetch(queries.allProducts)
}

export async function getFeaturedProducts() {
  return await client.fetch(queries.featuredProducts)
}

export async function getProductBySlug(slug: string) {
  try {
    
    
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Sanity query timeout')), 10000)
    })
    
    const queryPromise = client.fetch(queries.productBySlug, { slug })
    
    const product = await Promise.race([queryPromise, timeoutPromise])
    
    return product
  } catch (error) {
    console.error('Error fetching product by slug:', slug, error)
    return null
  }
}

export async function getProductsByType(productType: 'simple' | 'complex') {
  return await client.fetch(queries.productsByType, { productType })
}

export async function getCategories() {
  return await client.fetch(queries.allCategories)
}

export async function getFeaturedCategories() {
  return await client.fetch(queries.featuredCategories)
}

export async function getCategoriesWithProductCount() {
  return await client.fetch(queries.categoriesWithProductCount)
}

export async function getProductsByCategory(category: string) {
  try {
    const products = await client.fetch(queries.productsByCategory, { category })
    return products
  } catch (error) {
    console.error('Error fetching products by category:', category, error)
    return []
  }
}

export async function getBlogPosts() {
  return await client.fetch(queries.allBlogPosts)
}

export async function getFeaturedBlogPosts() {
  return await client.fetch(queries.featuredBlogPosts)
}

export async function getBlogPostBySlug(slug: string) {
  return await client.fetch(queries.blogPostBySlug, { slug })
} 