import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ProductConfiguratorWrapper from '@/components/ProductConfiguratorWrapper'
import Breadcrumb from '@/components/Breadcrumb'
import StructuredData from '@/components/seo/StructuredData'
import { getProductBySlug, getAllProducts } from '@/lib/products'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  
  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const description = Array.isArray(product.description) 
    ? product.description.join(' ') 
    : product.description

  return {
    title: `${product.name} | Custom Covers`,
    description: description,
    openGraph: {
      title: product.name,
      description: description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const description = Array.isArray(product.description) 
    ? product.description.join(' ') 
    : product.description

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Categories', href: '/categories' },
    { label: product.category, href: `/categories/${product.category.toLowerCase()}` },
    { label: product.name, href: `/product/${product.slug}` },
  ]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: description,
    sku: product.sku || product.slug,
    brand: {
      '@type': 'Brand',
      name: 'Custom Covers',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency || 'EUR',
      price: product.basePrice,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Custom Covers',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.5,
      reviewCount: product.reviewCount || 10,
    },
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Product Header */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Product Images */}
              <div className="relative">
                {product.images?.gallery && product.images.gallery.length > 0 ? (
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={product.images.main}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    
                    {/* Gallery Images */}
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.gallery.slice(0, 4).map((image, index) => (
                        <div key={index} className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                          <Image
                            src={image}
                            alt={`${product.name} view ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.name}
                  </h1>
                  
                  {/* Product Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="text-gray-600 text-lg leading-relaxed">
                    {Array.isArray(product.description) ? (
                      <ul className="space-y-2">
                        {product.description.map((desc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>
                </div>

                {/* Quick Product Info */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Base Price:</span>
                      <span className="ml-2 font-medium">
                        {product.currency === 'EUR' ? '€' : '$'}{product.basePrice}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Currency:</span>
                      <span className="ml-2 font-medium">{product.currency || 'EUR'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Configurator */}
          <div className="mt-8">
            <ProductConfiguratorWrapper product={product} />
          </div>

          {/* Additional Product Information */}
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Product Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Fully customized hand-stitched covers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Protection from dust, rain, snow, and UV
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Multiple material and color options
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Custom tie-downs and split options
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Heavy duty construction with warranty
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shipping & Returns
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Free shipping on orders over {product.currency === 'EUR' ? '€100' : '$100'}
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    30-day return policy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    2-5 week production time for custom covers
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    2-5 years warranty (material dependent)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 