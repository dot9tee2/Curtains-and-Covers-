'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { TransformedCategory } from '@/types/category'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface ClientCategoriesContentProps {
  categories: TransformedCategory[]
}

const benefits = [
  {
    icon: '📐',
    title: 'Custom Measurements',
    description: 'Perfect fit guaranteed with our professional measuring service'
  },
  {
    icon: '🎨',
    title: 'Design Consultation',
    description: 'Expert advice to help you choose the perfect style and materials'
  },
  {
    icon: '⚡',
    title: 'Quick Turnaround',
    description: 'Most orders completed within 2-3 weeks with rush options available'
  },
  {
    icon: '🔧',
    title: 'Professional Installation',
    description: 'Expert installation service ensures perfect results every time'
  }
]

export default function ClientCategoriesContent({ categories }: ClientCategoriesContentProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Collections
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Discover the perfect window treatment solution for every space and style
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No categories available at the moment.</p>
            </div>
          ) : (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {categories.map((category: TransformedCategory, index: number) => (
                <motion.div
                  key={category.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <Link href={`/categories/${category.id}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        
                        {/* Product Count Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-sm font-semibold text-navy-900">
                            {category.productCount}+ items
                          </span>
                        </div>

                        {/* Color Indicators */}
                        <div className="absolute bottom-4 left-4 flex space-x-2">
                          {category.colors.map((color: string, idx: number) => (
                            <div 
                              key={idx}
                              className={`w-4 h-4 rounded-full ${color} border-2 border-white shadow-sm`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-navy-900 mb-3 group-hover:text-golden-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {category.description}
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-2 mb-6">
                          {category.features.map((feature: string, idx: number) => (
                            <div key={idx} className="flex items-center text-sm text-gray-500">
                              <span className="w-1.5 h-1.5 bg-golden-500 rounded-full mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>

                        {/* CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-golden-600 font-semibold group-hover:text-golden-700 transition-colors">
                            Browse Collection →
                          </span>
                          <div className="w-8 h-8 bg-golden-100 rounded-full flex items-center justify-center group-hover:bg-golden-200 transition-colors">
                            <span className="text-golden-600 text-sm">→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-navy-900 mb-6">
              Why Choose Our Collections?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every product in our collections is designed with quality, functionality, and style in mind
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-navy-900 mb-6">
              Our Simple Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From consultation to installation, we make custom window treatments easy
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {[
              {
                step: "01",
                title: "Choose Category",
                description: "Browse our collections and select the type of window treatment you need"
              },
              {
                step: "02", 
                title: "Consultation",
                description: "Meet with our design experts to discuss options, materials, and measurements"
              },
              {
                step: "03",
                title: "Customization",
                description: "Select fabrics, colors, and features to create your perfect window treatment"
              },
              {
                step: "04",
                title: "Installation",
                description: "Our professional team installs your custom treatments with precision"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="text-center relative"
                variants={fadeInUp}
              >
                <div className="text-6xl font-bold text-golden-200 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-golden-300" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-golden-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Schedule a free consultation or visit our showroom to see our collections in person
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                className="bg-white text-golden-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.a>
              <motion.a
                href="/product"
                className="bg-navy-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-navy-800 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Customizing
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 