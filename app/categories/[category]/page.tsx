import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CategoryContent from '@/components/CategoryContent'
import StructuredData from '@/components/seo/StructuredData'
import { getProductsByCategory } from '@/lib/products'
import { getCategories, urlForImage } from '@/lib/sanity'

interface CategoryPageProps {
  params: {
    category: string
  }
}

// Get category data from Sanity
async function getCategoryBySlug(slug: string) {
  try {
    const categories = await getCategories()
    return categories.find((cat: any) => cat.slug.current === slug)
  } catch (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((category: any) => ({
      category: category.slug.current,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.category
  const category = await getCategoryBySlug(categorySlug)
  
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  const categoryImage = category.image ? urlForImage(category.image).url() : null

  return {
    title: `${category.title} | Premium Custom Covers`,
    description: category.description || `Shop our ${category.title.toLowerCase()} collection. Custom-made protective covers with premium materials and perfect fit guaranteed.`,
    openGraph: {
      title: `${category.title} | Premium Custom Covers`,
      description: category.description || `Shop our ${category.title.toLowerCase()} collection. Custom-made protective covers with premium materials and perfect fit guaranteed.`,
      type: 'website',
      images: categoryImage ? [
        {
          url: categoryImage,
          width: 1200,
          height: 630,
          alt: category.title,
        },
      ] : [],
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category
  
  const category = await getCategoryBySlug(categorySlug)

  if (!category) {
    notFound()
  }

  // Get products for this category
  const products = await getProductsByCategory(categorySlug)

  if (products.length === 0) {
    // Don't show 404 if category exists but has no products yet
    // notFound()
  }

  const categoryImage = category.image ? urlForImage(category.image).url() : null

  // Structured data for category page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `https://yoursite.com/categories/${categorySlug}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.image,
          url: `https://yoursite.com/product/${product.slug}`,
          offers: {
            '@type': 'Offer',
            price: product.basePrice,
            priceCurrency: 'USD',
          },
        },
      })),
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://yoursite.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Categories',
          item: 'https://yoursite.com/categories',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: category.title,
          item: `https://yoursite.com/categories/${categorySlug}`,
        },
      ],
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              {categoryImage && (
                <div className="mb-8">
                  <img
                    src={categoryImage}
                    alt={category.title}
                    className="w-full max-w-2xl mx-auto h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {category.title}
              </h1>
              {category.description && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {category.description && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <p className="text-gray-700 leading-relaxed">
                {category.description}
              </p>
            </div>
          )}

          {/* Category Content with Filtering */}
          {products.length > 0 ? (
            <CategoryContent 
              products={products} 
              categoryName={category.title}
              categorySlug={categorySlug}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Coming Soon
              </h3>
              <p className="text-gray-600">
                We're currently adding products to the {category.title} category. 
                Check back soon for our latest offerings!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 