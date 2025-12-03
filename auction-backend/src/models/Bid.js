const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  auction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  bidder_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  bid_time: {
    type: Date,
    default: Date.now
  },
  is_auto_bid: {
    type: Boolean,
    default: false
  },
  max_auto_bid: {
    type: Number,
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'outbid', 'winning'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Indexes for performance
bidSchema.index({ auction_id: 1, bid_time: -1 });
bidSchema.index({ bidder_id: 1 });
bidSchema.index({ auction_id: 1, amount: -1 });

// Static method to get highest bid for an auction
bidSchema.statics.getHighestBid = async function(auctionId) {
  return this.findOne({ auction_id: auctionId })
    .sort({ amount: -1 })
    .populate('bidder_id', 'username rating_positive_percentage');
};

// Static method to get bid count for an auction
bidSchema.statics.getBidCount = async function(auctionId) {
  return this.countDocuments({ auction_id: auctionId });
};

module.exports = mongoose.model('Bid', bidSchema);
