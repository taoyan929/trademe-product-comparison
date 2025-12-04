const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  // Basic fields
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  colour: {
    type: String,
    required: true,
    trim: true
  },
  start_price: {
    type: Number,
    required: true,
    min: 0
  },
  reserve_price: {
    type: Number,
    required: true,
    min: 0
  },

  // Image fields (support both formats)
  image: {
    type: String,
    required: false  // Not required to support legacy data
  },
  images: {
    type: [String],
    required: false,
    default: function() {
      return this.image ? [this.image] : [];
    }
  },

  // Timing fields (support both formats)
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    required: false
  },
  closing_time: {
    type: Date,
    required: false
  },

  // Condition field (merged enum)
  condition: {
    type: String,
    enum: ['New', 'Used', 'Like New', 'Refurbished', 'Unknown'],
    default: 'Unknown'
  },

  // Shipping (support both formats)
  shipping_price: {
    type: Number,
    default: 0
  },
  shipping_options: [{
    method: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],

  // Payment methods
  payment_methods: {
    type: [String],
    default: []
  },

  // Buy now price (from main)
  buy_now_price: {
    type: Number,
    default: 0,
    min: 0
  },

  // View count (from main)
  view_count: {
    type: Number,
    default: 0
  },

  // Seller reference
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  // Cached bidding statistics
  current_bid: {
    type: Number,
    default: 0,
    min: 0
  },
  bid_count: {
    type: Number,
    default: 0,
    min: 0
  },
  reserve_met: {
    type: Boolean,
    default: false
  },
  watchers_count: {
    type: Number,
    default: 0,
    min: 0
  },

  // Auction status
  status: {
    type: String,
    enum: ['draft', 'active', 'ended', 'sold', 'unsold'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for performance
auctionSchema.index({ seller_id: 1 });
auctionSchema.index({ end_date: 1 });
auctionSchema.index({ closing_time: 1 });
auctionSchema.index({ status: 1, end_date: 1 });

module.exports = mongoose.model('Auction', auctionSchema);
