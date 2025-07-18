import { Metadata } from 'next';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'article' | 'product';
  canonical?: string;
  noindex?: boolean;
}

export const generateMetadata = ({
  title = 'Curtains and Covers - Premium Custom Made Curtains & Covers',
  description = 'Custom made curtains, covers, and fabric solutions. Premium quality materials, perfect fit guaranteed. Order online or via WhatsApp.',
  keywords = 'curtains, covers, custom made, fabric, premium quality, home decor, window treatments',
  ogImage = '/images/og-default.jpg',
  ogImageAlt = 'Curtains and Covers - Premium Custom Solutions',
  canonical,
  noindex = false,
}: MetaTagsProps = {}): Metadata => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://curtainsandcovers.com';
  const fullTitle = title.includes('Curtains and Covers') ? title : `${title} | Curtains and Covers`;
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.split(', '),
    authors: [{ name: 'Curtains and Covers' }],
    creator: 'Curtains and Covers',
    publisher: 'Curtains and Covers',
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonical || siteUrl,
      siteName: 'Curtains and Covers',
      images: [
        {
          url: `${siteUrl}${ogImage}`,
          alt: ogImageAlt,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${siteUrl}${ogImage}`],
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
    },
    themeColor: '#1f2b4a',
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
  };
};

// For structured data generation
export const generateStructuredData = {
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Curtains and Covers',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://curtainsandcovers.com',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://curtainsandcovers.com'}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-xxx-xxx-xxxx',
      contactType: 'customer service',
    },
    sameAs: [
      'https://facebook.com/curtainsandcovers',
      'https://instagram.com/curtainsandcovers',
    ],
  }),

  product: (product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency: string;
    availability: string;
    brand: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
    },
  }),

  article: (article: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Curtains and Covers',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://curtainsandcovers.com'}/images/logo.png`,
      },
    },
  }),
}; 