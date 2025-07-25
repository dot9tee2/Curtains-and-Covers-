import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    const query = `*[_type == "material" && active == true] | order(displayOrder asc, title asc) {
      _id,
      title,
      slug,
      description,
      detailedDescription,
      multiplier,
      image,
      gallery,
      category,
      tags,
      technicalSpecs {
        composition,
        weight,
        thickness,
        width,
        finish,
        breathability
      },
      properties {
        weightCategory,
        waterproofRating,
        uvResistanceRating,
        tearStrength,
        abrasionResistance,
        temperatureResistance {
          minTemp,
          maxTemp
        },
        fireRetardant,
        antimicrobial,
        antiStatic,
        pvcCoated,
        wipeClean,
        warranty,
        certifications
      },
      careInstructions {
        cleaning,
        storage,
        washable,
        dryCleanOnly,
        bleachSafe
      },
      sustainability {
        recyclable,
        recycledContent,
        biodegradable,
        ecoFriendly,
        carbonFootprint,
        sustainabilityCertifications
      },
      applications {
        recommended,
        notRecommended,
        indoorUse,
        outdoorUse,
        commercialGrade,
        marineUse
      },
      supplier {
        supplierName,
        supplierCode,
        leadTime,
        minimumOrder,
        stockLevel
      },
      hasColors,
      colors[] {
        name,
        colorCode,
        hex,
        image,
        price,
        popularity,
        fastness,
        inStock,
        seasonal
      },
      seo {
        metaDescription,
        keywords,
        featured,
        newProduct,
        bestseller
      },
      active,
      displayOrder
    }`;
    
    const materials = await client.fetch(query);
    
    // Transform materials to include computed properties
    const enhancedMaterials = materials.map((material: any) => ({
      ...material,
      // Add computed performance score
      performanceScore: calculatePerformanceScore(material),
      // Add suitability tags
      suitabilityTags: generateSuitabilityTags(material),
      // Sort colors by popularity and availability
      colors: material.colors
        ?.sort((a: any, b: any) => (b.popularity || 3) - (a.popularity || 3))
        ?.sort((a: any, b: any) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0)) || []
    }));
    
    return NextResponse.json({
      success: true,
      count: enhancedMaterials.length,
      materials: enhancedMaterials,
      categories: getUniqueCategories(enhancedMaterials),
      tags: getUniqueTags(enhancedMaterials)
    });
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch materials',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to calculate overall performance score
function calculatePerformanceScore(material: any): number {
  const props = material.properties || {};
  let score = 0;
  let factors = 0;

  // Weight performance ratings (1-5 scale)
  if (props.waterproofRating) {
    score += props.waterproofRating;
    factors++;
  }
  if (props.uvResistanceRating) {
    score += props.uvResistanceRating;
    factors++;
  }
  if (props.tearStrength) {
    score += props.tearStrength;
    factors++;
  }
  if (props.abrasionResistance) {
    score += props.abrasionResistance;
    factors++;
  }

  // Bonus points for special features
  if (props.fireRetardant) score += 0.5;
  if (props.antimicrobial) score += 0.5;
  if (props.antiStatic) score += 0.3;

  return factors > 0 ? Math.min(5, score / factors) : 3;
}

// Helper function to generate suitability tags
function generateSuitabilityTags(material: any): string[] {
  const tags: string[] = [];
  const props = material.properties || {};
  const apps = material.applications || {};
  const sustainability = material.sustainability || {};

  // Performance-based tags
  if (props.waterproofRating >= 4) tags.push('Waterproof');
  if (props.uvResistanceRating >= 4) tags.push('UV Resistant');
  if (props.tearStrength >= 4) tags.push('Heavy Duty');
  if (props.abrasionResistance >= 4) tags.push('Long Lasting');

  // Application-based tags
  if (apps.outdoorUse) tags.push('Outdoor');
  if (apps.marineUse) tags.push('Marine Grade');
  if (apps.commercialGrade) tags.push('Commercial');

  // Special features
  if (props.fireRetardant) tags.push('Fire Retardant');
  if (props.antimicrobial) tags.push('Antimicrobial');
  if (props.wipeClean) tags.push('Easy Clean');

  // Sustainability tags
  if (sustainability.recyclable) tags.push('Recyclable');
  if (sustainability.ecoFriendly) tags.push('Eco-Friendly');
  if (sustainability.recycledContent && sustainability.recycledContent > 50) {
    tags.push('Recycled Content');
  }

  // SEO flags
  if (material.seo?.featured) tags.push('Featured');
  if (material.seo?.newProduct) tags.push('New');
  if (material.seo?.bestseller) tags.push('Bestseller');

  return tags;
}

// Helper function to get unique categories
function getUniqueCategories(materials: any[]): string[] {
  const categorySet = new Set(materials.map(m => m.category).filter(Boolean));
  return Array.from(categorySet);
}

// Helper function to get unique tags
function getUniqueTags(materials: any[]): string[] {
  const allTags = materials.flatMap(m => [
    ...(m.tags || []),
    ...(m.suitabilityTags || [])
  ]);
  const tagSet = new Set(allTags);
  return Array.from(tagSet);
} 