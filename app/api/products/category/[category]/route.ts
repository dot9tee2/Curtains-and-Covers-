import { NextRequest, NextResponse } from 'next/server';
import { getProductsByCategory } from '@/lib/sanity';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const categorySlug = params.category;
    const products = await getProductsByCategory(categorySlug);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 