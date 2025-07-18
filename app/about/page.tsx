'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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

const values = [
  {
    title: "Quality Craftsmanship",
    description: "Every piece is meticulously crafted using premium materials and time-tested techniques.",
    icon: "⚡"
  },
  {
    title: "Custom Solutions",
    description: "We believe every space is unique and deserves personalized window treatments.",
    icon: "🎨"
  },
  {
    title: "Customer First",
    description: "Your satisfaction is our priority. We're here to guide you every step of the way.",
    icon: "❤️"
  },
  {
    title: "Sustainable Practices",
    description: "We're committed to environmentally responsible sourcing and manufacturing.",
    icon: "🌱"
  }
]

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Creative Director",
    bio: "With over 15 years in interior design, Sarah founded Curtains and Covers to bring luxury window treatments to every home.",
    image: "/images/team/sarah.jpg"
  },
  {
    name: "Michael Chen",
    role: "Master Craftsman",
    bio: "Michael leads our production team with 20+ years of experience in textile manufacturing and custom fabrication.",
    image: "/images/team/michael.jpg"
  },
  {
    name: "Emma Rodriguez",
    role: "Design Consultant",
    bio: "Emma helps customers bring their vision to life with expert color matching and style recommendations.",
    image: "/images/team/emma.jpg"
  }
]

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Curtains and Covers",
    "description": "Premium custom curtains, blinds, and window treatments",
    "url": "https://curtainsandcovers.com",
    "logo": "https://curtainsandcovers.com/logo.png",
    "foundingDate": "2010",
    "founder": {
      "@type": "Person",
      "name": "Sarah Mitchell"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Design Street",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    }
  }

  return (
          <>
      
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
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Transforming spaces with premium custom window treatments since 2010
              </p>
            </motion.div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl font-bold text-navy-900 mb-6">
                  Founded on Quality & Passion
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Curtains and Covers began as a small family business with a simple mission: to bring 
                    luxury window treatments to every home. What started in a modest workshop has grown 
                    into a trusted name in custom curtains, blinds, and covers.
                  </p>
                  <p>
                    Over the years, we've learned that the perfect window treatment isn't just about 
                    function—it's about creating an atmosphere, enhancing your space, and reflecting 
                    your personal style. That's why we're dedicated to offering not just products, 
                    but complete solutions tailored to your unique needs.
                  </p>
                  <p>
                    Today, we continue to honor our founding principles: exceptional quality, 
                    personalized service, and attention to every detail that makes your space truly yours.
                  </p>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="/images/about/workshop.jpg"
                  alt="Curtains and Covers workshop"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-bold text-navy-900 mb-6">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These principles guide everything we do, from design to delivery
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
                  variants={fadeInUp}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-navy-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              {...fadeInUp}
            >
              <h2 className="text-4xl font-bold text-navy-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The passionate experts behind your perfect window treatments
              </p>
            </motion.div>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-12"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                >
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-golden-500 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quality Commitment */}
        <section className="py-20 bg-navy-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="relative h-96 rounded-lg overflow-hidden shadow-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Image
                  src="/images/about/quality.jpg"
                  alt="Quality craftsmanship"
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              <motion.div {...fadeInUp}>
                <h2 className="text-4xl font-bold mb-6">
                  Our Quality Promise
                </h2>
                <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
                  <p>
                    Every piece that leaves our workshop represents our unwavering commitment 
                    to excellence. We source only the finest materials and employ time-tested 
                    techniques alongside modern innovations.
                  </p>
                  <p>
                    Our quality control process ensures that each curtain, blind, or cover 
                    meets our exacting standards before it reaches your home. We stand behind 
                    our work with comprehensive warranties and ongoing support.
                  </p>
                  <div className="flex items-center space-x-4 pt-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-golden-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">✓</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">100% Satisfaction Guarantee</h4>
                      <p className="text-gray-300">Your happiness is our success</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-golden-500">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Let us help you create the perfect window treatments for your home or office
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="/contact"
                  className="bg-white text-golden-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
                <motion.a
                  href="/product"
                  className="bg-navy-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-navy-800 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Products
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 