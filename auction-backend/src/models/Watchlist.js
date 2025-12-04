const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  auction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  added_date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure unique user-auction pairs and improve query performance
watchlistSchema.index({ user_id: 1, auction_id: 1 }, { unique: true });
watchlistSchema.index({ auction_id: 1 });

// Static method to get watcher count for an auction
watchlistSchema.statics.getWatcherCount = async function(auctionId) {
  return this.countDocuments({ auction_id: auctionId });
};

// Static method to check if user is watching an auction
watchlistSchema.statics.isWatching = async function(userId, auctionId) {
  const result = await this.findOne({ user_id: userId, auction_id: auctionId });
  return !!result;
};

module.exports = mongoose.model('Watchlist', watchlistSchema);
