import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET() {
  try {
    const query = `*[_type == "material"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      multiplier,
      image,
      properties,
      colors[] {
        name,
        hex,
        image,
        price,
        inStock
      },
      featured,
      active
    }`;
    
    const materials = await client.fetch(query);
    
    return NextResponse.json({
      success: true,
      count: materials.length,
      materials
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