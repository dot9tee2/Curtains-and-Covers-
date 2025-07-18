# Curtains and Covers CMS - Sanity Backend

This is the Sanity Studio backend for the Curtains and Covers eCommerce website.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Sanity account (sign up at [sanity.io](https://sanity.io))

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a Sanity project:**
   - Go to [Sanity Management Console](https://sanity.io/manage)
   - Create a new project
   - Copy your Project ID

3. **Configure environment variables:**
   - Update the `projectId` in `sanity.config.ts` with your actual project ID
   - Or create a `.env.local` file:
   ```env
   SANITY_STUDIO_PROJECT_ID=your-project-id-here
   SANITY_STUDIO_DATASET=production
   ```

4. **Deploy the schema:**
   ```bash
   npm run dev
   ```

5. **Access Sanity Studio:**
   - Open http://localhost:3333 in your browser
   - Log in with your Sanity account
   - Start adding content!

## 📊 Schemas

### Product Schema
- **Title**: Product name
- **Slug**: URL-friendly identifier
- **Description**: Product description
- **Base Price**: Starting price
- **Materials**: Array of available materials
- **Colors**: Array of available colors
- **Add-ons**: Array of available add-ons
- **Category**: Reference to category
- **Image**: Product image with hotspot
- **Featured**: Boolean for homepage display
- **In Stock**: Availability status

### Category Schema
- **Title**: Category name
- **Slug**: URL-friendly identifier
- **Description**: Category description
- **Image**: Category image with hotspot
- **Featured**: Boolean for homepage display

### Blog Post Schema
- **Title**: Post title
- **Slug**: URL-friendly identifier
- **Excerpt**: Short description
- **Content**: Rich text content with images
- **Featured Image**: Main post image
- **Author**: Author name
- **Published At**: Publication date
- **Featured**: Boolean for homepage display
- **Tags**: Array of tags
- **Meta Description**: SEO description

## 🔧 Configuration

### Environment Variables

Update `sanity.config.ts` with your project details:

```typescript
export default defineConfig({
  name: 'default',
  title: 'Curtains and Covers CMS',
  projectId: 'your-project-id', // Replace with your project ID
  dataset: 'production',
  // ... rest of config
})
```

### Deployment

To deploy your Sanity Studio:

```bash
npm run build
npm run deploy
```

## 🌐 Frontend Integration

The frontend Next.js app connects to this Sanity backend using:

1. **Sanity Client** (`@sanity/client`)
2. **Image URL Builder** (`@sanity/image-url`)
3. **Portable Text** (`@portabletext/react`)

### Required Frontend Environment Variables

Add these to your frontend `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

## 📝 Content Management

### Adding Products
1. Go to the Products section in Sanity Studio
2. Click "Create new Product"
3. Fill in all required fields
4. Upload a product image
5. Select a category
6. Mark as "Featured" to show on homepage

### Managing Categories
1. Create categories before adding products
2. Use descriptive titles and slugs
3. Add category images for better presentation
4. Mark popular categories as "Featured"

### Creating Blog Posts
1. Use the rich text editor for content
2. Add images directly in the content
3. Set publication dates
4. Use tags for better organization
5. Write SEO-friendly meta descriptions

## 🔍 GROQ Queries

The frontend uses these GROQ queries to fetch data:

- `allProducts`: Get all products with category references
- `featuredProducts`: Get featured products only
- `productBySlug`: Get single product by slug
- `allCategories`: Get all categories
- `productsByCategory`: Get products filtered by category
- `allBlogPosts`: Get all blog posts
- `blogPostBySlug`: Get single blog post by slug

## 🛠 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Sanity

### File Structure

```
sanity-backend/
├── schemas/
│   ├── index.ts          # Schema exports
│   ├── product.ts        # Product schema
│   ├── category.ts       # Category schema
│   └── blogPost.ts       # Blog post schema
├── sanity.config.ts      # Main configuration
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

## 📚 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Schema Types Reference](https://www.sanity.io/docs/schema-types)
- [Sanity Studio](https://www.sanity.io/docs/sanity-studio)

## 🆘 Support

If you encounter any issues:

1. Check the [Sanity Documentation](https://www.sanity.io/docs)
2. Verify your project ID and dataset name
3. Ensure all environment variables are set correctly
4. Check the browser console for any error messages

## 🔒 Security

- Never commit `.env.local` files
- Use environment variables for sensitive data
- Set up proper CORS origins in production
- Use read-only tokens for frontend queries 