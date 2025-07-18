import React from 'react';
import { getFeaturedCategories, getFeaturedProducts, getFeaturedBlogPosts } from '@/lib/sanity';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  // Fetch data from Sanity
  const [featuredCategories, featuredProducts, featuredBlogPosts] = await Promise.all([
    getFeaturedCategories(),
    getFeaturedProducts(),
    getFeaturedBlogPosts()
  ]);

  return (
    <HomePageClient 
      featuredCategories={featuredCategories}
      featuredProducts={featuredProducts}
      featuredBlogPosts={featuredBlogPosts}
    />
  );
} 