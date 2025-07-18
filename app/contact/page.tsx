'use client'

import { useState } from 'react'
// Metadata removed for client component
// SEO components removed for simplification
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

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

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  projectType: string
}

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Visit Our Showroom",
    details: ["123 Design Street", "New York, NY 10001"],
    action: "Get Directions"
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    details: ["(555) 123-4567", "Free consultation available"],
    action: "Call Now"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    details: ["hello@curtainsandcovers.com", "Response within 24 hours"],
    action: "Send Email"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Business Hours",
    details: ["Mon-Fri: 9AM - 6PM", "Sat-Sun: 10AM - 4PM"],
    action: "Schedule Visit"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Curtains and Covers",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Design Street",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001",
      "addressCountry": "US"
    },
    "telephone": "(555) 123-4567",
    "email": "hello@curtainsandcovers.com",
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa-Su 10:00-16:00"
    ],
    "url": "https://curtainsandcovers.com"
  }

  return (
          <>
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-navy-900 to-navy-700 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center"
              {...fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get In Touch
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Ready to transform your space? We're here to help bring your vision to life
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow border border-gray-100"
                  variants={fadeInUp}
                >
                  <div className="text-golden-500 mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <button className="text-golden-500 font-semibold text-sm hover:text-golden-600 transition-colors">
                    {info.action}
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Contact Form & Map */}
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div {...fadeInUp}>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24 hours. 
                  For urgent inquiries, please call us directly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-500 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-navy-900 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-500 focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-500 focus:border-transparent transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="projectType" className="block text-sm font-semibold text-navy-900 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select a project type</option>
                        <option value="curtains">Custom Curtains</option>
                        <option value="blinds">Blinds & Shades</option>
                        <option value="outdoor">Outdoor Covers</option>
                        <option value="commercial">Commercial Project</option>
                        <option value="consultation">Design Consultation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-navy-900 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-500 focus:border-transparent transition-colors"
                      placeholder="What can we help you with?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-navy-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us about your project, including room dimensions, style preferences, and any specific requirements..."
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-semibold">
                        Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-800 font-semibold">
                        Sorry, there was an error sending your message. Please try again or call us directly.
                      </p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-golden-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-golden-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div 
                className="space-y-8"
                {...fadeInUp}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div>
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">
                    Visit Our Showroom
                  </h3>
                  <p className="text-gray-600 mb-6">
                    See our extensive collection of fabrics, materials, and samples in person. 
                    Our design consultants are available for personalized assistance.
                  </p>
                  
                  {/* Map Placeholder */}
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center mb-6">
                    <div className="text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">123 Design Street, New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="bg-navy-50 rounded-lg p-6">
                    <h4 className="font-bold text-navy-900 mb-3">
                      Free Design Consultation
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Book a complimentary consultation with our design experts. 
                      We'll help you choose the perfect window treatments for your space, 
                      style, and budget.
                    </p>
                    <button className="mt-4 bg-golden-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-golden-600 transition-colors">
                      Schedule Consultation
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-12"
              {...fadeInUp}
            >
              <h2 className="text-3xl font-bold text-navy-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to common questions about our services
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={staggerChildren}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  question: "How long does it take to complete a custom order?",
                  answer: "Most custom orders are completed within 2-3 weeks. Complex projects may take longer, and we'll provide a detailed timeline during consultation."
                },
                {
                  question: "Do you offer installation services?",
                  answer: "Yes! We provide professional installation for all our products. Our experienced team ensures perfect fit and finish."
                },
                {
                  question: "Can I see samples before ordering?",
                  answer: "Absolutely! Visit our showroom or request sample swatches to be sent to your home. We want you to be completely satisfied with your choice."
                },
                {
                  question: "What areas do you serve?",
                  answer: "We serve the greater New York area and surrounding regions. Contact us to confirm service availability in your location."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-sm"
                  variants={fadeInUp}
                >
                  <h4 className="font-bold text-navy-900 mb-2">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 