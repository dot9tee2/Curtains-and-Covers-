'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Shield, Truck, Users, CheckCircle, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { urlForImage } from '@/lib/sanity';
import { CategoriesResponse, ProductsResponse, BlogPostsResponse } from '@/types/sanity';

// Static features data (can be moved to Sanity later if needed)
const features = [
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Premium materials with lifetime craftsmanship warranty',
  },
  {
    icon: Truck,
    title: 'Free Consultation',
    description: 'Expert measurement and design consultation at your home',
  },
  {
    icon: Users,
    title: 'Custom Made',
    description: 'Every piece is tailored to your exact specifications',
  },
  {
    icon: CheckCircle,
    title: 'Perfect Fit',
    description: 'Precision cutting and professional installation',
  },
];

// Static testimonials (can be moved to Sanity later if needed)
const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Manhattan, NY',
    rating: 5,
    text: 'Absolutely stunning quality! The curtains fit perfectly and the fabric feels luxurious. The team was professional throughout.',
    image: '/images/testimonials/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    location: 'Brooklyn, NY',
    rating: 5,
    text: 'Best investment for our home. The custom covers protected our outdoor furniture perfectly through the winter.',
    image: '/images/testimonials/michael.jpg',
  },
  {
    name: 'Emily Rodriguez',
    location: 'Queens, NY',
    rating: 5,
    text: 'From consultation to installation, everything was seamless. The final result exceeded our expectations!',
    image: '/images/testimonials/emily.jpg',
  },
];

interface HomePageClientProps {
  featuredCategories: CategoriesResponse;
  featuredProducts: ProductsResponse;
  featuredBlogPosts: BlogPostsResponse;
}

export default function HomePageClient({
  featuredCategories,
  featuredProducts,
  featuredBlogPosts
}: HomePageClientProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Carousel state and functionality
  const [currentSlide, setCurrentSlide] = useState(0);
  const fabricImages = [
    { src: '/images/1.jpg', alt: 'Premium fabric material 1' },
    { src: '/images/2.jpg', alt: 'Premium fabric material 2' },
    { src: '/images/3.jpg', alt: 'Premium fabric material 3' },
    { src: '/images/4.jpg', alt: 'Premium fabric material 4' },
    { src: '/images/5.jpg', alt: 'Premium fabric material 5' },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % fabricImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [fabricImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % fabricImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + fabricImages.length) % fabricImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Image Carousel Component
  const ImageCarousel = () => (
    <div className="relative h-96 rounded-2xl overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {fabricImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {fabricImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
        {currentSlide + 1} / {fabricImages.length}
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-label="Homepage hero section">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-covers-background.webp"
            alt="Premium custom covers and tarps"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container-custom text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Shop Premium Custom
              <span className="block text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text">
                Covers & Tarps
              </span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-200">
              High-quality protection for furniture, equipment, vehicles & more – tailored to your specs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                href="/categories" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[160px]"
                aria-label="Shop premium covers and tarps now"
              >
                Shop Now
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-300 min-w-[160px]"
                aria-label="Request a custom quote for your needs"
              >
                Request a Quote
              </Link>
            </div>
            
            {/* Trust Line */}
            <div className="text-sm sm:text-base text-gray-300 font-medium">
              <span className="inline-block">Free shipping on orders over $99</span>
              <span className="mx-2 sm:mx-4">|</span>
              <span className="inline-block">1 M+ covers sold</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white" role="region" aria-label="Key features">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Feature 1: Custom Sizes */}
            <motion.div variants={fadeInUp} className="text-center group">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Sizes & Dimensions</h3>
              <p className="text-gray-600 text-sm">Perfect fit guaranteed with precise measurements tailored to your specific needs</p>
            </motion.div>

            {/* Feature 2: 24x7 Support */}
            <motion.div variants={fadeInUp} className="text-center group">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24×7 Expert Assistance</h3>
              <p className="text-gray-600 text-sm">Round-the-clock support from our knowledgeable team to help you find the right solution</p>
            </motion.div>

            {/* Feature 3: Market Leader */}
            <motion.div variants={fadeInUp} className="text-center group">
              <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Leader</h3>
              <p className="text-gray-600 text-sm">Trusted by millions with industry-leading quality and innovation since our founding</p>
            </motion.div>

            {/* Feature 4: Warranty & Shipping */}
            <motion.div variants={fadeInUp} className="text-center group">
              <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-100 transition-colors duration-300">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Warranty & Global Shipping</h3>
              <p className="text-gray-600 text-sm">Comprehensive warranty protection with fast, reliable shipping worldwide</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Custom Made Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              Custom Made for You
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every piece is crafted specifically for your space, style, and needs. 
              From initial consultation to final installation, we ensure perfection.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features && features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Categories - Now Dynamic */}
      {featuredCategories.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                Featured Categories
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most popular products, each designed to bring beauty and functionality to your space.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {featuredCategories.map((category: any) => (
                <motion.div
                  key={category._id}
                  variants={fadeInUp}
                  className="group"
                >
                  <Link href={`/categories/${category.slug.current}`} className="block">
                    <div className="card overflow-hidden hover-lift">
                      <div className="relative h-64 overflow-hidden">
                        {category.image ? (
                          <Image
                            src={urlForImage(category.image).width(400).height(300).url()}
                            alt={category.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Products - Enhanced Section */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="container-custom">
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-6">
                <Star className="text-white" size={24} />
              </motion.div>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-display font-bold text-primary mb-6">
                Featured Products
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Our most popular and highest-rated products, handpicked for their exceptional quality and customer satisfaction.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {featuredProducts.slice(0, 6).map((product: any, index: number) => (
                <motion.div
                  key={product._id}
                  variants={fadeInUp}
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-primary/20">
                    {/* Image Container with Overlay */}
                    <div className="relative h-72 overflow-hidden">
                      {product.image ? (
                        <Image
                          src={urlForImage(product.image).width(500).height(400).url()}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                      )}
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Stock Status Badge */}
                      <div className="absolute top-4 left-4">
                        {product.inStock ? (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            In Stock
                          </span>
                        ) : (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Featured Badge */}
                      {index < 3 && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-gradient-to-r from-secondary to-yellow-400 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg flex items-center gap-1">
                            <Star size={14} className="fill-current" />
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Quick Actions - Appear on Hover */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        <div className="flex gap-2">
                          <Link 
                            href={`/product/${product.slug.current}`}
                            className="bg-white/95 backdrop-blur-sm text-primary px-4 py-2 rounded-xl font-medium hover:bg-white transition-colors shadow-lg flex items-center gap-2"
                          >
                            <ArrowRight size={16} />
                            Quick View
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-6">
                      {/* Category Tag */}
                      <div className="mb-3">
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {product.category?.title || 'Product'}
                        </span>
                      </div>

                      {/* Title and Description */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-primary transition-colors">
                          {product.title}
                        </h3>
                        {product.description && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Price Section */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-primary">
                            ${product.basePrice}
                          </span>
                          <span className="text-gray-500 text-sm">per sq ft</span>
                        </div>
                        {product.originalPrice && product.originalPrice > product.basePrice && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-gray-400 line-through text-sm">
                              ${product.originalPrice}
                            </span>
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                              {Math.round(((product.originalPrice - product.basePrice) / product.originalPrice) * 100)}% OFF
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Features/Materials Preview */}
                      {product.materials && product.materials.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Materials Available</p>
                          <div className="flex flex-wrap gap-1">
                            {product.materials.slice(0, 3).map((material: any, idx: number) => (
                              <span
                                key={idx}
                                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg font-medium"
                              >
                                {material.name || material}
                              </span>
                            ))}
                            {product.materials.length > 3 && (
                              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-lg font-medium">
                                +{product.materials.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Rating Display */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">4.8</span>
                          <span className="text-sm text-gray-400">(127 reviews)</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={`/product/${product.slug.current}`}
                        className="block w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-center py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        Customize & Order
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Discover Our Complete Collection
                </h3>
                <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                  Explore hundreds of premium products across all categories, each customizable to your exact needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/categories" 
                    className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2 shadow-lg"
                  >
                    View All Products
                    <ArrowRight size={20} />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary transition-all inline-flex items-center justify-center gap-2"
                  >
                    Get Custom Quote
                    <Phone size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Fabric & Material Info */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Premium Materials & Fabrics
              </h2>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                We source only the finest materials from trusted suppliers worldwide. 
                Our fabrics are selected for durability, beauty, and performance.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span>UV-resistant and fade-proof materials</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span>Stain-resistant and easy-care fabrics</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span>Eco-friendly and sustainable options</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                  <span>Fire-retardant commercial-grade materials</span>
                </li>
              </ul>
              <Link href="/materials" className="btn-secondary">
                Explore Materials
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ImageCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Blog Posts - New Dynamic Section */}
      {featuredBlogPosts.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
                Latest from Our Blog
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay updated with the latest trends, tips, and insights in home decor and fabric care.
              </motion.p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredBlogPosts.slice(0, 3).map((post: any) => (
                <motion.div
                  key={post._id}
                  variants={fadeInUp}
                  className="group"
                >
                  <Link href={`/blog/${post.slug.current}`} className="block">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        {post.featuredImage ? (
                          <Image
                            src={urlForImage(post.featuredImage).width(400).height(300).url()}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-secondary transition-colors">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.slice(0, 2).map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link href="/blog" className="btn-primary text-lg px-8 py-4">
                View All Posts
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              What Our Customers Say
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their spaces with our custom solutions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials && testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="card p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-secondary fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Get started with a free consultation. Our experts will help you create the perfect solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="btn-secondary text-lg px-8 py-4">
                Book Free Consultation
              </Link>
              <a 
                href="tel:+1234567890" 
                className="btn-outline text-lg px-8 py-4 flex items-center"
              >
                <Phone className="mr-2" size={20} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 