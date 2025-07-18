'use client'

import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function PrivacyPage() {
  return (
          <>
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-16 bg-navy-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Privacy Policy
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
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At Curtains and Covers, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    By using our website or services, you consent to the data practices described in this Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">2. Information We Collect</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">2.1 Personal Information</h3>
                      <p className="text-gray-700 leading-relaxed mb-2">
                        We may collect personal information that you voluntarily provide to us, including:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Name, email address, and phone number</li>
                        <li>Billing and shipping addresses</li>
                        <li>Payment information (processed securely by our payment providers)</li>
                        <li>Measurement and installation details</li>
                        <li>Design preferences and project specifications</li>
                        <li>Communication preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">2.2 Automatically Collected Information</h3>
                      <p className="text-gray-700 leading-relaxed mb-2">
                        When you visit our website, we may automatically collect:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>IP address and device information</li>
                        <li>Browser type and version</li>
                        <li>Pages visited and time spent on site</li>
                        <li>Referring website information</li>
                        <li>Cookie and tracking data</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">2.3 Cookies and Tracking Technologies</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We use the information we collect for the following purposes:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Processing and fulfilling your orders</li>
                    <li>Providing customer service and support</li>
                    <li>Scheduling consultations and installations</li>
                    <li>Communicating about your projects and orders</li>
                    <li>Improving our products and services</li>
                    <li>Personalizing your website experience</li>
                    <li>Sending marketing communications (with your consent)</li>
                    <li>Complying with legal obligations</li>
                    <li>Protecting against fraud and unauthorized activities</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">4. Information Sharing and Disclosure</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">4.1 Service Providers</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We may share your information with trusted third-party service providers who assist us in operating our business, including payment processors, shipping companies, installation contractors, and marketing service providers.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">4.2 Legal Requirements</h3>
                      <p className="text-gray-700 leading-relaxed">
                        We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">4.3 Business Transfers</h3>
                      <p className="text-gray-700 leading-relaxed">
                        In the event of a merger, acquisition, or sale of business assets, your information may be transferred as part of the transaction.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">5. Data Security</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>SSL encryption for data transmission</li>
                    <li>Secure payment processing through certified providers</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and employee training</li>
                    <li>Secure data storage and backup procedures</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">6. Data Retention</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order and project information may be retained for warranty and service purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">7. Your Rights and Choices</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">7.1 Access and Correction</h3>
                      <p className="text-gray-700 leading-relaxed">
                        You have the right to access, update, or correct your personal information. Contact us to request access to your data or to make corrections.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">7.2 Marketing Communications</h3>
                      <p className="text-gray-700 leading-relaxed">
                        You can opt out of marketing communications at any time by using the unsubscribe link in our emails or contacting us directly.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">7.3 Cookie Controls</h3>
                      <p className="text-gray-700 leading-relaxed">
                        You can control and delete cookies through your browser settings. Note that disabling cookies may affect website functionality.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">7.4 Data Deletion</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Subject to certain legal and business requirements, you may request deletion of your personal information.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">8. Third-Party Links</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">9. Children's Privacy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">10. California Privacy Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    California residents have additional rights under the California Consumer Privacy Act (CCPA), including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Right to know what personal information is collected</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of the sale of personal information</li>
                    <li>Right to non-discrimination for exercising privacy rights</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Note: We do not sell personal information to third parties.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">11. Changes to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on our website and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-navy-900 mb-4">12. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <p className="text-gray-700 mb-2"><strong>Privacy Officer</strong></p>
                    <p className="text-gray-700 mb-2">Curtains and Covers</p>
                    <p className="text-gray-700 mb-2">123 Design Street</p>
                    <p className="text-gray-700 mb-2">New York, NY 10001</p>
                    <p className="text-gray-700 mb-2">Phone: (555) 123-4567</p>
                    <p className="text-gray-700">Email: privacy@curtainsandcovers.com</p>
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