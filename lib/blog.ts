import { client, urlForImage } from '@/lib/sanity'
import { PortableTextBlock } from '@sanity/types'

export interface BlogPost {
  _id?: string;
  slug: string;
  title: string;
  description: string; // This will be mapped from excerpt
  content: any[]; // Sanity's rich text content - using any[] for flexibility
  date: string; // This will be mapped from publishedAt
  author: string;
  category: string; // We'll derive this from tags or create a mapping
  tags: string[];
  image: string; // This will be the processed featuredImage URL
  readTime: number; // We'll calculate this
  featured: boolean;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  ogImage?: string;
  // Raw Sanity data for advanced usage
  _rawContent?: any[];
  featuredImage?: any; // Raw Sanity image object
}

export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  postCount: number;
}

// Helper function to calculate read time from Portable Text
function calculateReadTimeFromPortableText(content: any[]): number {
  const wordsPerMinute = 200;
  let wordCount = 0;

  if (!Array.isArray(content)) return 1;

  content.forEach(block => {
    if (block && block._type === 'block' && Array.isArray(block.children)) {
      block.children.forEach((child: any) => {
        if (child && typeof child.text === 'string') {
          wordCount += child.text.split(/\s+/).length;
        }
      });
    }
  });

  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

// Helper function to extract plain text from Portable Text for description
function extractTextFromPortableText(content: any[], maxLength: number = 200): string {
  let text = '';
  
  if (!Array.isArray(content)) return '';
  
  for (const block of content) {
    if (block && block._type === 'block' && Array.isArray(block.children)) {
      for (const child of block.children) {
        if (child && typeof child.text === 'string') {
          text += child.text + ' ';
          if (text.length > maxLength) break;
        }
      }
      if (text.length > maxLength) break;
    }
  }
  
  return text.trim().substring(0, maxLength);
}

// Helper function to derive category from tags or use default
function deriveCategory(tags: string[]): string {
  const categoryMap: { [key: string]: string } = {
    'fabric': 'fabric-care',
    'care': 'fabric-care',
    'maintenance': 'fabric-care',
    'design': 'design-inspiration',
    'trends': 'design-inspiration',
    'inspiration': 'design-inspiration',
    'installation': 'installation-tips',
    'diy': 'installation-tips',
    'guide': 'product-guides',
    'product': 'product-guides',
    'outdoor': 'product-guides'
  };

  for (const tag of tags) {
    const lowerTag = tag.toLowerCase();
    for (const keyword in categoryMap) {
      if (lowerTag.includes(keyword)) {
        return categoryMap[keyword];
      }
    }
  }

  return 'design-inspiration'; // Default category
}

// Transform Sanity blog post to our BlogPost interface
function transformSanityPost(sanityPost: any): BlogPost {
  const image = sanityPost.featuredImage ? urlForImage(sanityPost.featuredImage).width(800).height(600).url() : '/images/blog/default.jpg';
  const ogImage = sanityPost.featuredImage ? urlForImage(sanityPost.featuredImage).width(1200).height(630).url() : undefined;
  
  return {
    _id: sanityPost._id,
    slug: sanityPost.slug.current,
    title: sanityPost.title,
    description: sanityPost.excerpt || extractTextFromPortableText(sanityPost.content || []),
    content: sanityPost.content || [],
    date: sanityPost.publishedAt,
    author: sanityPost.author || 'Custom Covers Team',
    category: deriveCategory(sanityPost.tags || []),
    tags: sanityPost.tags || [],
    image,
    readTime: calculateReadTimeFromPortableText(sanityPost.content || []),
    featured: sanityPost.featured || false,
    seo: {
      title: sanityPost.title,
      description: sanityPost.metaDescription || sanityPost.excerpt,
      keywords: sanityPost.tags || [],
    },
    ogImage,
    _rawContent: sanityPost.content,
    featuredImage: sanityPost.featuredImage,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
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
    }`;
    
    const sanityPosts = await client.fetch(query);
    return sanityPosts.map(transformSanityPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
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
    }`;
    
    const sanityPost = await client.fetch(query, { slug });
    
    if (!sanityPost) {
      return null;
    }
    
    return transformSanityPost(sanityPost);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.category === category);
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  try {
    const query = `*[_type == "blogPost" && featured == true] | order(publishedAt desc) {
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
    }`;
    
    const sanityPosts = await client.fetch(query);
    return sanityPosts.map(transformSanityPost);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const allPosts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  allPosts.forEach(post => {
    const current = categoryMap.get(post.category) || 0;
    categoryMap.set(post.category, current + 1);
  });

  const categories: BlogCategory[] = [
    {
      slug: 'fabric-care',
      name: 'Fabric Care',
      description: 'Tips and guides for maintaining your curtains and covers',
      postCount: categoryMap.get('fabric-care') || 0,
    },
    {
      slug: 'design-inspiration',
      name: 'Design Inspiration',
      description: 'Interior design ideas and trending styles',
      postCount: categoryMap.get('design-inspiration') || 0,
    },
    {
      slug: 'product-guides',
      name: 'Product Guides',
      description: 'Detailed guides about our products and materials',
      postCount: categoryMap.get('product-guides') || 0,
    },
    {
      slug: 'installation-tips',
      name: 'Installation Tips',
      description: 'Professional installation advice and DIY guides',
      postCount: categoryMap.get('installation-tips') || 0,
    },
  ];

  return categories;
}

// Keep for backward compatibility - but now it processes Portable Text
export async function markdownToHtml(portableText: PortableTextBlock[]): Promise<string> {
  // This is now for Portable Text, but we'll handle rendering in the component
  return JSON.stringify(portableText);
}

export function calculateReadTime(content: string | PortableTextBlock[]): number {
  if (typeof content === 'string') {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  } else {
    return calculateReadTimeFromPortableText(content);
  }
}

export function generateBlogPostSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Custom Covers & Curtains',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://customcovers.com'}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://customcovers.com'}/blog/${post.slug}`,
    },
  };
}

// Note: Sample posts removed - all blog content now loads dynamically from Sanity CMS 