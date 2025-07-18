import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import StructuredData from '@/components/seo/StructuredData'
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react'
import { urlForImage } from '@/lib/sanity'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Portable Text components for rendering rich content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlForImage(value).width(800).height(600).url()
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog image'}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 text-center mt-2">{value.caption}</p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
        {children}
      </h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 bg-blue-50 rounded-r">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 text-gray-700 space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <Link href={value.href} className="text-blue-600 hover:text-blue-800 underline">
        {children}
      </Link>
    ),
  },
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Custom Covers Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.ogImage || post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage || post.image],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Structured data for the blog post
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.ogImage || post.image,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Custom Covers',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
      },
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://yoursite.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-gray-50">
        {/* Back to Blog Link */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Article Meta */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Article Description */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {post.description}
            </p>

            {/* Featured Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="prose prose-lg max-w-none">
              <PortableText 
                value={post.content} 
                components={portableTextComponents}
              />
            </div>
          </div>
        </div>

        {/* Article Footer */}
        <div className="bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Author Info */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {post.author}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Expert writer and design consultant specializing in custom home furnishings and interior design.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Continue Reading
              </h3>
              <div className="space-y-4">
                <Link
                  href="/blog"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">Browse All Articles</span>
                    <ArrowLeft size={16} className="text-blue-600 rotate-180" />
                  </div>
                </Link>
                <Link
                  href="/contact"
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">Need Custom Design Help?</span>
                    <ArrowLeft size={16} className="text-blue-600 rotate-180" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 