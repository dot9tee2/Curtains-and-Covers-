import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Get top material categories for display
  const getTopMaterialCategories = () => {
    if (!product.materials || product.materials.length === 0) return []
    
    const categories = product.materials
      .map(m => m.category)
      .filter(Boolean)
      .filter((category, index, arr) => arr.indexOf(category) === index) // Remove duplicates
    
    return categories.slice(0, 3)
  }

  // Get sustainability badges
  const getSustainabilityBadges = () => {
    if (!product.materials) return []
    
    const badges = new Set<string>()
    product.materials.forEach(material => {
      if (material.sustainability?.ecoFriendly) badges.add('Eco-Friendly')
      if (material.sustainability?.recyclable) badges.add('Recyclable')
      if (material.sustainability?.recycledContent && material.sustainability.recycledContent > 50) {
        badges.add('Recycled Content')
      }
    })
    
    return Array.from(badges).slice(0, 2)
  }

  // Get performance highlights
  const getPerformanceHighlights = () => {
    if (!product.materials) return []
    
    const highlights = new Set<string>()
    product.materials.forEach(material => {
      const props = material.properties
      if (props?.waterproofRating && props.waterproofRating >= 4) highlights.add('Waterproof')
      if (props?.uvResistanceRating && props.uvResistanceRating >= 4) highlights.add('UV Resistant')
      if (props?.tearStrength && props.tearStrength >= 4) highlights.add('Heavy Duty')
      if (material.applications?.marineUse) highlights.add('Marine Grade')
    })
    
    return Array.from(highlights).slice(0, 2)
  }

  const materialCategories = getTopMaterialCategories()
  const sustainabilityBadges = getSustainabilityBadges()
  const performanceHighlights = getPerformanceHighlights()

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:scale-[1.02]">
        {/* Product Image */}
        <div className="relative h-64 bg-gray-100">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {/* Badges Overlay */}
          <div className="absolute top-3 left-3 space-y-2">
            {product.featured && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
            {sustainabilityBadges.map((badge, index) => (
              <span
                key={index}
                className="block bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Stock Status */}
          <div className="absolute top-3 right-3">
            {product.inStock ? (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                In Stock
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 space-y-4">
          {/* Product Name & Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(product.basePrice)}
              </span>
              <span className="text-sm text-gray-500 ml-1">per sq ft</span>
            </div>
            
            {product.rating && (
              <div className="flex items-center space-x-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                {product.reviewCount && (
                  <span className="text-sm text-gray-500">({product.reviewCount})</span>
                )}
              </div>
            )}
          </div>
          
          {/* Material Categories */}
          {materialCategories.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                Material Types
              </p>
              <div className="flex flex-wrap gap-2">
                {materialCategories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium capitalize"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Performance Highlights */}
          {performanceHighlights.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                Performance Features
              </p>
              <div className="flex flex-wrap gap-2">
                {performanceHighlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-lg font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Available Materials Count */}
          {product.materials && product.materials.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                Available Materials
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {product.materials.slice(0, 3).map((material, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg font-medium"
                    >
                      {material.title}
                    </span>
                  ))}
                </div>
                {product.materials.length > 3 && (
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">
                    +{product.materials.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Color Swatches or Clear Material Info */}
          {product.materials && product.materials.some(m => m.hasColors === false) ? (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                Material Type
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-lg font-medium">
                  Clear/Transparent Options Available
                </span>
              </div>
            </div>
          ) : product.colors && product.colors.length > 0 ? (
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
                Color Options
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {product.colors.slice(0, 6).map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                {product.colors.length > 6 && (
                  <span className="text-xs text-gray-500 font-medium">
                    +{product.colors.length - 6} more
                  </span>
                )}
              </div>
            </div>
          ) : null}

          {/* CTA Section */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {product.materials?.length || 0} materials • {(() => {
                  const hasColorlessMaterials = product.materials?.some(m => m.hasColors === false)
                  const totalColors = product.colors?.length || 0
                  if (hasColorlessMaterials && totalColors === 0) {
                    return 'clear options'
                  } else if (hasColorlessMaterials) {
                    return `${totalColors} colors + clear`
                  } else {
                    return `${totalColors} colors`
                  }
                })()}
              </span>
              <span className="text-blue-600 font-medium text-sm group-hover:text-blue-800">
                Configure →
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
} 