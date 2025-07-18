import { getCategoriesWithProductCount, urlForImage } from '@/lib/sanity'
import ClientCategoriesContent from './ClientCategoriesContent'
import { Category, TransformedCategory } from '@/types/category'

export default async function CategoriesPage() {
  // Fetch categories dynamically from Sanity
  const categories = await getCategoriesWithProductCount()

  // Transform categories data to include additional UI data
  const transformedCategories: TransformedCategory[] = categories.map((category: Category, index: number) => ({
    id: category.slug.current,
    name: category.title,
    description: category.description || 'Premium quality window treatments for your space.',
    image: category.image ? urlForImage(category.image).width(600).height(400).url() : `/images/categories/default-${index % 3 + 1}.jpg`,
    productCount: category.productCount || 0,
    featured: category.featured,
    // Add some default features based on category type
    features: getDefaultFeatures(category.title),
    // Add some color variations
    colors: getDefaultColors(index)
  }))

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Product Categories - Curtains and Covers",
    "description": "Browse our complete range of custom window treatments",
    "url": "https://curtainsandcovers.com/categories",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": transformedCategories.map((category: TransformedCategory, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "ProductGroup",
          "name": category.name,
          "description": category.description,
          "url": `https://curtainsandcovers.com/categories/${category.id}`
        }
      }))
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ClientCategoriesContent categories={transformedCategories} />
    </>
  )
}

// Helper function to get default features based on category name
function getDefaultFeatures(categoryName: string): string[] {
  const name = categoryName.toLowerCase()
  
  if (name.includes('curtain')) {
    return ['Custom sizing', 'Premium fabrics', 'Multiple styles', 'Professional installation']
  } else if (name.includes('blind') || name.includes('shade')) {
    return ['Light control', 'Privacy options', 'Easy operation', 'Durable materials']
  } else if (name.includes('outdoor') || name.includes('patio')) {
    return ['Weather resistant', 'UV protection', 'Custom fit', 'Easy maintenance']
  } else if (name.includes('commercial') || name.includes('office')) {
    return ['Bulk pricing', 'Fire retardant', 'Professional design', 'Quick turnaround']
  } else if (name.includes('hardware') || name.includes('accessor')) {
    return ['Quality hardware', 'Installation tools', 'Decorative options', 'All finishes']
  } else {
    return ['Custom solutions', 'Premium quality', 'Expert consultation', 'Professional service']
  }
}

// Helper function to get default colors for visual variety
function getDefaultColors(index: number): string[] {
  const colorSets = [
    ['bg-blue-500', 'bg-purple-500', 'bg-indigo-500'],
    ['bg-gray-500', 'bg-slate-500', 'bg-zinc-500'],
    ['bg-green-500', 'bg-emerald-500', 'bg-teal-500'],
    ['bg-amber-500', 'bg-orange-500', 'bg-yellow-500'],
    ['bg-pink-500', 'bg-rose-500', 'bg-red-500'],
    ['bg-cyan-500', 'bg-sky-500', 'bg-blue-400']
  ]
  return colorSets[index % colorSets.length]
} 