import { Metadata } from 'next'
import BlogContent from '@/components/BlogContent'
import { getAllPosts, getAllCategories } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Custom Covers & Curtains',
  description: 'Expert tips, trends, and guides for custom curtains, covers, and home décor. Learn from our design professionals.',
  openGraph: {
    title: 'Design Blog | Custom Covers & Curtains',
    description: 'Expert tips, trends, and guides for custom curtains, covers, and home décor.',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  const blogCategories = await getAllCategories()
  const categories = blogCategories.map(cat => cat.slug) // Extract category slugs as strings

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Design Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, trends, and inspiration for custom curtains, covers, and home décor. 
              Stay up-to-date with the latest in interior design and fabric care.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogContent posts={posts} categories={categories} />
      </div>
    </div>
  )
} 