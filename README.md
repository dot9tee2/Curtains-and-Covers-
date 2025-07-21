# Curtains and Covers - Premium eCommerce Website

A modern, full-stack eCommerce website for custom curtains and covers built with Next.js, featuring dynamic product customization, real-time pricing, and premium design.

## 🌟 Features

### Core Functionality
- **Custom Product Configuration**: Dynamic size inputs, material selection, color swatches, and add-ons
- **Real-time Pricing**: Automatic price calculation based on customizations
- **SEO Optimized**: Complete meta tags, structured data, and OpenGraph support
- **Blog System**: MDX-powered blog with categories and tags
- **Shopping Cart**: Persistent cart with local storage
- **Multiple Order Methods**: WhatsApp ordering and contact forms
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features
- **Next.js 14**: App Router with TypeScript
- **Database**: Sanity CMS with real-time data
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React icon library
- **Forms**: React Hook Form with Zod validation
- **Payment**: WhatsApp ordering and contact forms
- **SEO**: Comprehensive metadata and structured data

## 🎨 Design System

### Brand Colors
- **Navy Blue**: `#1f2b4a` (Primary)
- **Golden Yellow**: `#f9a825` (Secondary)
- **Supporting Colors**: Various shades and gradients

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (content)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd curtains-and-covers
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file with the following variables:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Curtains and Covers"

# Database
# WhatsApp (Optional)
WHATSAPP_PHONE_NUMBER=1234567890

# WhatsApp
WHATSAPP_PHONE_NUMBER=1234567890
```

4. **Start the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
curtains-and-covers/
├── app/                          # Next.js App Router
│   ├── blog/                     # Blog pages
│   ├── cart/                     # Shopping cart
│   ├── product/[slug]/           # Dynamic product pages
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Logo.tsx
│   └── seo/                      # SEO components
│       ├── MetaTags.tsx
│       └── StructuredData.tsx
├── lib/                          # Utilities and data
│   ├── models/                   # Database models
│   │   ├── Product.ts
│   │   └── Order.ts
│   ├── blog.ts                   # Blog utilities
│   ├── cart.ts                   # Cart management
│   ├── db.ts                     # Database connection
│   └── products.ts               # Product utilities
├── types/                        # TypeScript definitions
│   └── product.ts
├── content/                      # Content files
│   └── blog/                     # Blog posts (MDX)
├── public/                       # Static assets
│   └── images/
├── tailwind.config.js            # Tailwind configuration
├── next.config.js                # Next.js configuration
└── package.json                  # Dependencies
```

## 🛍️ Product System

### Custom Fields
Products support various customization options:
- **Size Inputs**: Width and height with unit selection (cm/inch)
- **Materials**: Different fabric types with price multipliers
- **Colors**: Color swatches with price modifiers
- **Add-ons**: Additional services and hardware options

### Dynamic Pricing
The pricing system automatically calculates:
- Base price per area (width × height)
- Material price adjustments
- Color modifications
- Add-on costs
- Tax and shipping

### Example Product Configuration
```typescript
const product = {
  basePrice: 80,
  materials: [
    {
      id: 'cotton-canvas',
      name: 'Premium Cotton Canvas',
      priceMultiplier: 1.0
    },
    {
      id: 'outdoor-acrylic',
      name: 'Outdoor Acrylic Fabric',
      priceMultiplier: 1.3
    }
  ],
  colors: [
    {
      id: 'navy-blue',
      name: 'Navy Blue',
      hexCode: '#1f2b4a',
      priceModifier: 0
    }
  ]
}
```

## 📝 Content Management

### Blog System
- **MDX Support**: Rich content with React components
- **Categories**: Organized by fabric care, design inspiration, etc.
- **SEO Optimized**: Automatic meta tags and structured data
- **Featured Posts**: Highlight important content

### Sample Blog Post
```markdown
---
title: "Choosing the Right Fabric for Outdoor Curtains"
description: "Learn how to select weather-resistant materials"
category: "product-guides"
tags: ["outdoor", "fabric", "weather-resistant"]
featured: true
date: "2023-12-01"
author: "Sarah Mitchell"
---

Content goes here...
```

## 🛒 Cart & Checkout

### Cart Features
- **Persistent Storage**: Uses localStorage for cart persistence
- **Real-time Updates**: Automatic price recalculation
- **Validation**: Ensures all required customizations are complete
- **Multiple Order Options**: WhatsApp ordering and contact forms

### Order Flow
1. Product customization
2. Add to cart with validation
3. Cart review and updates
4. WhatsApp order or contact form submission
5. Order confirmation and tracking

## 🎯 SEO & Performance

### SEO Features
- **Dynamic Meta Tags**: Title, description, and keywords per page
- **Structured Data**: Product and article schemas
- **OpenGraph Tags**: Social media optimization
- **Sitemap Generation**: Automatic sitemap.xml
- **Image Optimization**: Next.js Image component

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: WebP and AVIF formats
- **Lazy Loading**: Components and images
- **Font Optimization**: Google Fonts with display swap

## 🗃️ Database Schema

### Product Model
```typescript
{
  name: string,
  slug: string,
  description: string,
  basePrice: number,
  materials: Material[],
  colors: Color[],
  addOns: AddOn[],
  customFields: CustomField[],
  seo: SEOData
}
```

### Order Model
```typescript
{
  orderNumber: string,
  customer: CustomerInfo,
  items: OrderItem[],
  pricing: PricingBreakdown,
  status: OrderStatus,
  payment: PaymentInfo,
  shipping: ShippingInfo
}
```

## 🎨 Styling

### TailwindCSS Configuration
Custom design system with:
- **Brand Colors**: Primary and secondary color palettes
- **Typography**: Custom font families and scales
- **Components**: Reusable button and form styles
- **Utilities**: Custom animations and effects

### Component Classes
```css
.btn-primary       /* Primary button style */
.btn-secondary     /* Secondary button style */
.card             /* Card component */
.container-custom /* Custom container width */
.section-padding  /* Consistent section spacing */
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 640px and below
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px and above

### Mobile-First Approach
All components are designed mobile-first with progressive enhancement for larger screens.

## 🔧 Configuration

### Environment Variables
See `.env.example` for all required environment variables.

### Key Configurations
- **Database**: MongoDB connection string
- **Communication**: WhatsApp phone number
- **WhatsApp**: Phone number for orders
- **Analytics**: Google Analytics ID

## 📈 Analytics & Tracking

### Included Tracking
- **Google Analytics**: Page views and conversions
- **Product Views**: Automatic view tracking
- **Cart Events**: Add to cart and checkout tracking
- **Order Completion**: Revenue tracking

## 🚀 Deployment to Vercel

### Prerequisites
- GitHub account with your repository
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)
- Sanity.io account (free tier available)

### Quick Deploy to Vercel

#### Method 1: Deploy with GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**
   In your Vercel project dashboard:
   - Go to Settings → Environment Variables
   - Add the following variables (see `env.example`):

   **Required Variables:**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=idc6hzzx
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app
   ```

   **Optional Variables:**
   ```
   WHATSAPP_PHONE_NUMBER=1234567890
   ```

#### Method 2: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel
   ```

### Sanity CMS Setup

1. **Access Sanity Studio**
   - Go to your deployed Sanity Studio
   - Login with your Sanity account
   - Start adding products and content

2. **Configure Content**
   - Add products with materials and variations
   - Set up categories and blog posts
   - Configure pricing and measurements

### Sanity CMS Deployment

1. **Deploy Sanity Studio**
   ```bash
   cd sanity-backend
   npm run build
   npm run deploy
   ```

2. **Your Sanity Studio will be available at:**
   `https://your-project-id.sanity.studio/`

### Custom Domain (Optional)

1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Configure DNS records as instructed by Vercel

### Production Checklist
- [ ] ✅ Environment variables configured in Vercel
- [ ] ✅ Sanity Studio deployed and accessible
- [ ] 🔄 SSL certificate auto-configured by Vercel
- [ ] 🔄 Test all functionality on live site
- [ ] 🔄 Configure custom domain (if needed)
- [ ] 🔄 Set up analytics and monitoring

### Deployment Commands Summary

```bash
# Deploy Sanity CMS
cd sanity-backend && npm run deploy

# Deploy to Vercel (if using CLI)
vercel --prod

# Check deployment status
vercel ls
```

## 🤝 Contributing

### Development Workflow
1. Create feature branch
2. Implement changes with tests
3. Update documentation
4. Submit pull request
5. Code review and merge

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Git Hooks**: Pre-commit validation

## 📄 License

This project is proprietary software for Curtains and Covers.

## 📞 Support

For technical support or questions:
- **Email**: tech@curtainsandcovers.com
- **Documentation**: See inline code comments
- **Issues**: Use GitHub issues for bug reports

---

Built with ❤️ using Next.js, TailwindCSS, and MongoDB 