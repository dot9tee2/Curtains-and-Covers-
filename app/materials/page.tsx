import { Metadata } from 'next'
import MaterialsPageContent from '@/components/MaterialsPageContent'
import { getMaterials } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Materials | Premium Fabrics for Custom Covers',
  description: 'Explore our extensive collection of high-quality materials including marine grade vinyl, canvas, polyester, and specialty fabrics. Each material is carefully selected for durability, weather resistance, and performance.',
  keywords: 'materials, fabrics, vinyl, canvas, polyester, marine grade, waterproof, UV resistant, custom covers',
}

export default async function MaterialsPage() {
  const materials = await getMaterials()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Premium Materials
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover our carefully curated collection of high-performance materials. 
              From marine-grade vinyl to heavy-duty canvas, each material is selected 
              for superior durability, weather resistance, and longevity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">{materials.length}+</div>
                <div className="text-blue-100">Premium Materials</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-blue-100">Weather Tested</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-2">5-10</div>
                <div className="text-blue-100">Year Warranties</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Materials Content */}
      <MaterialsPageContent materials={materials} />
    </div>
  )
} 