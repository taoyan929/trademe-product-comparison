const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  rating_positive_percentage: {
    type: Number,
    default: 100,
    min: 0,
    max: 100
  },
  total_ratings: {
    type: Number,
    default: 0,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  member_since: {
    type: Date,
    default: Date.now
  },
  avatar_url: {
    type: String,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  total_listings: {
    type: Number,
    default: 0,
    min: 0
  },
  total_purchases: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for performance and uniqueness
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
