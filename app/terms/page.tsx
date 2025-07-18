'use client'

import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function TermsPage() {
  return (
          <>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 bg-navy-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Terms & Conditions
              </h1>
              <p className="text-xl text-gray-300">
                Last updated: January 2024
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    By accessing and using the Curtains and Covers website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These terms and conditions may be updated from time to time without notice. Your continued use of the website after any changes indicates your acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Products and Services</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">2.1 Custom Products</h3>
                      <p className="text-gray-700 leading-relaxed">
                        All window treatments are custom-made to your specifications. Due to the custom nature of our products, all sales are final. We do not accept returns or exchanges unless there is a manufacturing defect.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">2.2 Measurements</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Accurate measurements are crucial for proper fit. We offer professional measuring services, or you may provide your own measurements. If you choose to provide your own measurements, you assume responsibility for accuracy.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">2.3 Design Consultation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Our design consultation services are provided to help you make informed decisions. Final design choices and color selections are your responsibility.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">3. Ordering and Payment</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">3.1 Order Process</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Orders are processed upon receipt of full payment or approved payment terms. A confirmation email will be sent within 24 hours of order placement.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">3.2 Payment Terms</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Full payment is required for orders under $1,000</li>
                        <li>50% deposit required for orders over $1,000, balance due before shipping</li>
                        <li>Commercial accounts may arrange NET 30 payment terms</li>
                        <li>We accept credit cards, bank transfers, and certified checks</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">3.3 Pricing</h3>
                      <p className="text-gray-700 leading-relaxed">
                        All prices are subject to change without notice. The price charged will be the price in effect at the time of order confirmation.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Manufacturing and Delivery</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">4.1 Production Timeline</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Standard production time is 2-3 weeks from order confirmation. Rush orders may be available for an additional fee. Delays may occur due to material availability or complex customizations.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">4.2 Delivery and Installation</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We offer delivery and professional installation services within our service area. Installation appointments are scheduled based on availability. Customer must be present during installation.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">4.3 Quality Control</h3>
                      <p className="text-gray-700 leading-relaxed">
                        All products undergo quality inspection before shipping. Any manufacturing defects will be repaired or replaced at no charge.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Warranty and Returns</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">5.1 Warranty Coverage</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We provide a 2-year warranty on craftsmanship and a 1-year warranty on hardware. Fabric warranties vary by manufacturer and are passed through to the customer.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">5.2 Return Policy</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Due to the custom nature of our products, returns are not accepted except in cases of manufacturing defects or errors in our fulfillment of your order specifications.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">5.3 Damage Claims</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Any damage claims must be reported within 48 hours of delivery. Photographic evidence may be required for processing claims.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Limitation of Liability</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    In no event shall Curtains and Covers be liable for any direct, indirect, punitive, incidental, special, consequential damages or any damages whatsoever including, without limitation, damages for loss of use, data, or profits, arising out of or in any way connected with the use or performance of our products or services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Our total liability for any claim arising out of or relating to these terms or our products shall not exceed the amount paid by you for the specific product or service giving rise to the claim.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Intellectual Property</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of Curtains and Covers and is protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    You may not reproduce, distribute, display, or create derivative works from any content on this website without our express written permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our website and services, to understand our practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Governing Law</h2>
                  <p className="text-gray-700 leading-relaxed">
                    These terms and conditions are governed by and construed in accordance with the laws of the State of New York, and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">10. Contact Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about these Terms and Conditions, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Curtains and Covers</strong></p>
                    <p className="text-gray-700 mb-2">123 Design Street</p>
                    <p className="text-gray-700 mb-2">New York, NY 10001</p>
                    <p className="text-gray-700 mb-2">Phone: (555) 123-4567</p>
                    <p className="text-gray-700">Email: legal@curtainsandcovers.com</p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
} 