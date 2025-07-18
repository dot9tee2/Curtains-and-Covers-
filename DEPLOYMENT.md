# 🚀 Deployment Guide - Curtains and Covers

This guide will walk you through deploying your Curtains and Covers eCommerce application to Vercel.

## 📋 Pre-Deployment Checklist

### ✅ Required Accounts
- [ ] [GitHub](https://github.com) account with your repository
- [ ] [Vercel](https://vercel.com) account (free tier available)
- [ ] [MongoDB Atlas](https://cloud.mongodb.com) account (free tier available)
- [ ] [Sanity.io](https://sanity.io) account (already configured)

### ✅ Required Environment Variables
Copy from `env.example` and configure:

**Critical Variables (Required):**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=idc6hzzx
NEXT_PUBLIC_SANITY_DATASET=production
MONGODB_URI=mongodb+srv://...
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Optional Variables:**
```bash
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
WHATSAPP_PHONE_NUMBER=1234567890
```

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Cluster
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new project: `curtains-and-covers`
3. Build a database cluster (free M0 tier)
4. Choose provider: AWS, region: us-east-1
5. Cluster name: `curtains-covers-prod`

### Step 2: Database Security
1. **Database Access**: Create database user
   - Username: `curtains-app`
   - Password: Generate secure password
   - Role: `Atlas admin` or `Read and write to any database`

2. **Network Access**: Whitelist IP addresses
   - Add IP: `0.0.0.0/0` (Allow access from anywhere)
   - Or add Vercel's IP ranges for security

### Step 3: Get Connection String
1. Click "Connect" → "Connect your application"
2. Driver: Node.js, Version: 4.1 or later
3. Copy connection string:
   ```
   mongodb+srv://curtains-app:<password>@curtains-covers-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your database user password
5. Add database name: `curtains-and-covers`

## 🎨 Sanity CMS Deployment

### Step 1: Deploy Sanity Studio
```bash
cd sanity-backend
npm install
npm run build
npm run deploy
```

### Step 2: Access Your CMS
- Studio URL: `https://curtains-and-covers-cms.sanity.studio/`
- Login with your Sanity account
- Start adding products and content

## 🌐 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings

#### Step 3: Configure Build Settings
**Framework Preset:** Next.js  
**Build Command:** `npm run build`  
**Output Directory:** `.next`  
**Install Command:** `npm install`  

#### Step 4: Environment Variables
In Vercel dashboard → Settings → Environment Variables:

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=idc6hzzx
NEXT_PUBLIC_SANITY_DATASET=production
MONGODB_URI=mongodb+srv://curtains-app:password@curtains-covers-prod.xxxxx.mongodb.net/curtains-and-covers?retryWrites=true&w=majority
NEXT_PUBLIC_SITE_URL=https://your-project.vercel.app

# Optional
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
WHATSAPP_PHONE_NUMBER=1234567890
NEXT_PUBLIC_SITE_NAME=Curtains and Covers
```

#### Step 5: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 🔗 Custom Domain Setup

### Step 1: Add Domain to Vercel
1. Vercel Dashboard → Settings → Domains
2. Add your domain: `curtainsandcovers.com`

### Step 2: Configure DNS
**For Domain Registrar:**
- Type: `CNAME`
- Name: `@` (or `www`)
- Value: `cname.vercel-dns.com`

**Alternative (A Records):**
- Type: `A`
- Name: `@`
- Value: `76.76.19.61`

### Step 3: SSL Certificate
- Automatically handled by Vercel
- Usually active within 10 minutes

## 🧪 Testing Your Deployment

### Post-Deployment Tests
1. **Homepage Loading**: Check homepage loads correctly
2. **Product Pages**: Navigate to product pages
3. **Cart Functionality**: Add items to cart
4. **Form Submissions**: Test contact forms
5. **Blog Posts**: Verify blog content loads
6. **Images**: Confirm Sanity images display
7. **Mobile Responsiveness**: Test on mobile devices

### Common Issues & Solutions

**Build Failures:**
- Check environment variables are set
- Verify MongoDB connection string
- Ensure all dependencies are in package.json

**Images Not Loading:**
- Confirm `cdn.sanity.io` in Next.js image domains
- Check Sanity images are published

**Data Not Loading:**
- Verify Sanity project ID and dataset
- Check API routes are working
- Confirm Sanity client configuration

## 📊 Performance Optimization

### Vercel Analytics
1. Enable in Vercel dashboard
2. Monitor Core Web Vitals
3. Track page performance

### Image Optimization
- Already configured with Next.js Image component
- WebP/AVIF formats enabled
- Sanity CDN integration working

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env.local` to version control
- Use Vercel's environment variable interface
- Separate development and production keys

### Database Security
- Restrict MongoDB network access
- Use strong database passwords
- Regular backup strategy

### Content Security
- Sanity Studio access control
- Regular content backups
- API key management

## 📈 Monitoring & Analytics

### Set Up Monitoring
1. **Vercel Analytics**: Built-in performance monitoring
2. **Error Tracking**: Consider Sentry integration
3. **Uptime Monitoring**: Use services like UptimeRobot

### Business Analytics
1. **Google Analytics**: Add GA4 tracking
2. **Conversion Tracking**: Monitor cart and checkout events
3. **SEO Monitoring**: Track search performance

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to `main` branch triggers deployment
- Preview deployments for pull requests
- Rollback capabilities in Vercel dashboard

### Branch Strategy
```
main (production)     → Deploys to live site
staging (preview)     → Preview deployments
feature/* (preview)   → Feature preview deployments
```

## 📞 Support & Troubleshooting

### Deployment Issues
1. Check Vercel build logs
2. Verify environment variables
3. Test build locally: `npm run build`

### Production Issues
1. Check Vercel function logs
2. Monitor error rates in dashboard
3. Verify database connectivity

### Getting Help
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)

---

## 🎉 Deployment Complete!

Your Curtains and Covers application is now live! 

**Next Steps:**
1. Test all functionality thoroughly
2. Set up monitoring and analytics
3. Configure domain and SSL
4. Add content through Sanity Studio
5. Monitor performance and user feedback

**Your Live URLs:**
- **Website**: `https://your-project.vercel.app`
- **Sanity Studio**: `https://curtains-and-covers-cms.sanity.studio/`
- **Vercel Dashboard**: Monitor deployments and performance 