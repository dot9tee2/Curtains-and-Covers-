import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { name: 'Custom Curtains', href: '/categories/curtains' },
      { name: 'Blinds & Shades', href: '/categories/blinds' },
      { name: 'Outdoor Covers', href: '/categories/outdoor' },
      { name: 'Commercial Solutions', href: '/categories/commercial' },
      { name: 'View All Categories', href: '/categories' },
    ],
    services: [
      { name: 'Free Consultation', href: '/consultation' },
      { name: 'Custom Measurement', href: '/measurement' },
      { name: 'Installation Service', href: '/installation' },
      { name: 'Repair & Alterations', href: '/repair' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Story', href: '/story' },
      { name: 'Quality Promise', href: '/quality' },
      { name: 'Careers', href: '/careers' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Care Instructions', href: '/care' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Returns', href: '/returns' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo showText={true} className="mb-6" />
            <p className="text-gray-300 mb-6 leading-relaxed">
              Premium custom curtains and covers made to perfection. 
              We combine quality craftsmanship with modern design to 
              transform your space.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-secondary" />
                <span className="text-gray-300">+1 (234) 567-890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-secondary" />
                <span className="text-gray-300">info@curtainsandcovers.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-secondary" />
                <span className="text-gray-300">123 Design Street, City, State 12345</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get design tips, special offers, and new product announcements.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary text-white placeholder-gray-400"
              />
              <button className="btn-secondary px-6 py-3 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Curtains and Covers. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com/curtainsandcovers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/curtainsandcovers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/curtainscovers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-secondary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 