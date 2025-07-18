import mongoose, { Schema, Document } from 'mongoose';

// Material Schema
const MaterialPropertySchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
  icon: String
});

const MaterialSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priceMultiplier: { type: Number, required: true, default: 1 },
  image: String,
  properties: [MaterialPropertySchema]
});

// Color Schema
const ColorSchema = new Schema({
  name: { type: String, required: true },
  hexCode: { type: String, required: true },
  image: String,
  priceModifier: { type: Number, default: 0 }
});

// Add-on Schema
const AddOnSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  required: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ['hardware', 'service', 'customization'],
    required: true
  }
});

// Custom Field Schema
const ValidationRuleSchema = new Schema({
  type: {
    type: String,
    enum: ['min', 'max', 'pattern', 'custom'],
    required: true
  },
  value: Schema.Types.Mixed,
  message: { type: String, required: true }
});

const PriceCalculationSchema = new Schema({
  type: {
    type: String,
    enum: ['area', 'perimeter', 'fixed', 'custom'],
    required: true
  },
  formula: String,
  baseUnit: String
});

const CustomFieldSchema = new Schema({
  type: {
    type: String,
    enum: ['size', 'text', 'select', 'checkbox', 'number'],
    required: true
  },
  name: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  placeholder: String,
  options: [String],
  validation: [ValidationRuleSchema],
  priceCalculation: PriceCalculationSchema
});

// Product Image Schema
const ProductImageSchema = new Schema({
  url: { type: String, required: true },
  alt: { type: String, required: true },
  isPrimary: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
});

// SEO Schema
const ProductSEOSchema = new Schema({
  title: String,
  description: String,
  keywords: [String],
  ogImage: String
});

// Main Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: String,
  images: [ProductImageSchema],
  basePrice: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  inStock: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  materials: [MaterialSchema],
  colors: [ColorSchema],
  addOns: [AddOnSchema],
  customFields: [CustomFieldSchema],
  seo: ProductSEOSchema,
  views: { type: Number, default: 0 },
  sales: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Indexes for performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ inStock: 1 });
ProductSchema.index({ 'seo.keywords': 1 });

// Virtual for URL
ProductSchema.virtual('url').get(function() {
  return `/product/${this.slug}`;
});

// Method to update views
ProductSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to update sales
ProductSchema.methods.incrementSales = function(quantity = 1) {
  this.sales += quantity;
  return this.save();
};

// Static method to find featured products
ProductSchema.statics.findFeatured = function() {
  return this.find({ featured: true, inStock: true });
};

// Static method to find by category
ProductSchema.statics.findByCategory = function(category: string) {
  return this.find({ category, inStock: true });
};

// Pre-save middleware to ensure slug uniqueness
ProductSchema.pre('save', async function(next) {
  if (this.isModified('name') && !this.isModified('slug')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    // Ensure uniqueness
    let counter = 1;
    let originalSlug = this.slug;
    while (await mongoose.models.Product?.findOne({ slug: this.slug, _id: { $ne: this._id } })) {
      this.slug = `${originalSlug}-${counter}`;
      counter++;
    }
  }
  next();
});

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  subcategory?: string;
  images: Array<{
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
  }>;
  basePrice: number;
  currency: string;
  inStock: boolean;
  featured: boolean;
  materials: Array<any>;
  colors: Array<any>;
  addOns: Array<any>;
  customFields: Array<any>;
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  views: number;
  sales: number;
  url: string;
  incrementViews(): Promise<IProduct>;
  incrementSales(quantity?: number): Promise<IProduct>;
}

export interface IProductModel extends mongoose.Model<IProduct> {
  findFeatured(): Promise<IProduct[]>;
  findByCategory(category: string): Promise<IProduct[]>;
}

export default mongoose.models.Product as IProductModel || 
  mongoose.model<IProduct, IProductModel>('Product', ProductSchema); 