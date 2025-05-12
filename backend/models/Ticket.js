const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  purchaseDate: {
    type: Date,
    default: Date.now
  }
});

const ticketSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative']
  },
  sold: {
    type: Number,
    default: 0,
    min: [0, 'Sold tickets cannot be negative']
  },
  status: {
    type: String,
    enum: ['available', 'sold_out', 'cancelled'],
    default: 'available'
  },
  saleStartDate: {
    type: Date,
    required: true
  },
  saleEndDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  purchases: [purchaseSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
ticketSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to check if ticket is available
ticketSchema.methods.isAvailable = function() {
  const now = new Date();
  return (
    this.status === 'available' &&
    this.quantity > this.sold &&
    now >= this.saleStartDate &&
    now <= this.saleEndDate
  );
};

// Method to get remaining quantity
ticketSchema.methods.getRemainingQuantity = function() {
  return this.quantity - this.sold;
};

// Method to check if user has already purchased this ticket
ticketSchema.methods.hasUserPurchased = function(userId) {
  return this.purchases.some(purchase => purchase.user.toString() === userId.toString());
};

module.exports = mongoose.model('Ticket', ticketSchema); 