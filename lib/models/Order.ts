import mongoose, { Schema, Document } from 'mongoose';

// Customer Information Schema
const CustomerInfoSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: String
});

// Address Schema
const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'US' }
});

// Order Item Schema
const OrderItemSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productSlug: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  customization: {
    material: {
      id: String,
      name: String,
      priceMultiplier: Number
    },
    color: {
      id: String,
      name: String,
      hexCode: String,
      priceModifier: Number
    },
    size: {
      width: Number,
      height: Number,
      unit: { type: String, enum: ['cm', 'inch'] }
    },
    addOns: [{
      id: String,
      name: String,
      price: Number,
      category: String
    }],
    customFields: { type: Map, of: String },
    notes: String
  }
});

// Payment Information Schema
const PaymentInfoSchema = new Schema({
  method: {
    type: String,
    enum: ['stripe', 'whatsapp', 'bank_transfer', 'cash'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: String,
  stripePaymentIntentId: String,
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  paidAt: Date
});

// Shipping Information Schema
const ShippingInfoSchema = new Schema({
  method: {
    type: String,
    enum: ['standard', 'express', 'pickup', 'installation'],
    default: 'standard'
  },
  cost: { type: Number, default: 0 },
  estimatedDelivery: Date,
  trackingNumber: String,
  carrier: String,
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'returned'],
    default: 'pending'
  },
  shippedAt: Date,
  deliveredAt: Date
});

// Main Order Schema
const OrderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: { type: CustomerInfoSchema, required: true },
  billingAddress: { type: AddressSchema, required: true },
  shippingAddress: { type: AddressSchema, required: true },
  items: [OrderItemSchema],
  
  // Pricing
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  shipping: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_production', 'ready', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  // Payment and Shipping
  payment: PaymentInfoSchema,
  shippingInfo: ShippingInfoSchema,
  
  // Additional Information
  notes: String,
  internalNotes: String,
  source: {
    type: String,
    enum: ['website', 'whatsapp', 'phone', 'email'],
    default: 'website'
  },
  
  // Important Dates
  confirmedAt: Date,
  productionStartedAt: Date,
  estimatedCompletion: Date,
  completedAt: Date,
  cancelledAt: Date,
  
  // Communication
  lastCustomerContact: Date,
  customerMessages: [{
    message: String,
    timestamp: { type: Date, default: Date.now },
    from: { type: String, enum: ['customer', 'admin'] },
    method: { type: String, enum: ['email', 'phone', 'whatsapp', 'internal'] }
  }]
}, {
  timestamps: true
});

// Indexes for performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ 'payment.status': 1 });
OrderSchema.index({ 'shipping.status': 1 });
OrderSchema.index({ createdAt: -1 });

// Pre-save middleware to generate order number
OrderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    
    // Find the last order number for this month
    const lastOrder = await mongoose.models.Order?.findOne(
      { orderNumber: new RegExp(`^CC${year}${month}`) },
      {},
      { sort: { orderNumber: -1 } }
    );
    
    let sequence = 1;
    if (lastOrder) {
      const lastSequence = parseInt(lastOrder.orderNumber.slice(-4));
      sequence = lastSequence + 1;
    }
    
    this.orderNumber = `CC${year}${month}${String(sequence).padStart(4, '0')}`;
  }
  next();
});

// Virtual for customer full name
OrderSchema.virtual('customerFullName').get(function() {
  return `${this.customer.firstName} ${this.customer.lastName}`;
});

// Virtual for order age in days
OrderSchema.virtual('ageInDays').get(function() {
  return Math.floor((new Date().getTime() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24));
});

// Method to add customer message
OrderSchema.methods.addCustomerMessage = function(message: string, from: string, method: string = 'internal') {
  this.customerMessages.push({
    message,
    from,
    method,
    timestamp: new Date()
  });
  this.lastCustomerContact = new Date();
  return this.save();
};

// Method to update status
OrderSchema.methods.updateStatus = function(newStatus: string, notes?: string) {
  const oldStatus = this.status;
  this.status = newStatus;
  
  // Set timestamp based on status
  switch (newStatus) {
    case 'confirmed':
      this.confirmedAt = new Date();
      break;
    case 'in_production':
      this.productionStartedAt = new Date();
      break;
    case 'delivered':
      this.completedAt = new Date();
      if (this.shipping) {
        this.shipping.status = 'delivered';
        this.shipping.deliveredAt = new Date();
      }
      break;
    case 'cancelled':
      this.cancelledAt = new Date();
      break;
  }
  
  // Add internal note about status change
  if (notes || oldStatus !== newStatus) {
    this.addCustomerMessage(
      notes || `Status changed from ${oldStatus} to ${newStatus}`,
      'admin',
      'internal'
    );
  }
  
  return this.save();
};

// Static method to find orders by customer email
OrderSchema.statics.findByCustomerEmail = function(email: string) {
  return this.find({ 'customer.email': email }).sort({ createdAt: -1 });
};

// Static method to find orders by status
OrderSchema.statics.findByStatus = function(status: string) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get orders needing attention (old pending orders)
OrderSchema.statics.findNeedingAttention = function(daysOld: number = 3) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  return this.find({
    status: { $in: ['pending', 'confirmed'] },
    createdAt: { $lt: cutoffDate }
  }).sort({ createdAt: 1 });
};

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  billingAddress: any;
  shippingAddress: any;
  items: any[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: string;
  payment: any;
  shippingMethod: any;
  notes?: string;
  internalNotes?: string;
  source: string;
  customerFullName: string;
  ageInDays: number;
  addCustomerMessage(message: string, from: string, method?: string): Promise<IOrder>;
  updateStatus(newStatus: string, notes?: string): Promise<IOrder>;
}

export interface IOrderModel extends mongoose.Model<IOrder> {
  findByCustomerEmail(email: string): Promise<IOrder[]>;
  findByStatus(status: string): Promise<IOrder[]>;
  findNeedingAttention(daysOld?: number): Promise<IOrder[]>;
}

export default mongoose.models.Order as IOrderModel || 
  mongoose.model<IOrder, IOrderModel>('Order', OrderSchema); 