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

// GROQ queries for fetching data
export const queries = {
  // Get all products
  allProducts: `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    basePrice,
    materials,
    colors,
    addons,
    featured,
    inStock,
    image,
    category->{
      _id,
      title,
      slug
    }
  }`,

  // Get featured products
  featuredProducts: `*[_type == "product" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    basePrice,
    materials,
    colors,
    addons,
    featured,
    inStock,
    image,
    category->{
      _id,
      title,
      slug
    }
  }`,

  // Get single product by slug
  productBySlug: `*[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    basePrice,
    materials,
    colors,
    addons,
    featured,
    inStock,
    image,
    category->{
      _id,
      title,
      slug,
      description
    }
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
  productsByCategory: `*[_type == "product" && category->slug.current == $category] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    basePrice,
    materials,
    colors,
    addons,
    featured,
    inStock,
    image,
    category->{
      _id,
      title,
      slug
    }
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
    "productCount": count(*[_type == "product" && references(^._id)])
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
  return await client.fetch(queries.productBySlug, { slug })
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
  return await client.fetch(queries.productsByCategory, { category })
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