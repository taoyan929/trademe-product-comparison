const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  closing_time: {
    type: Date,
    required: true
  },
  buy_now_price: {
    type: Number,
    required: true,
    min: 0
  },
  condition: {
    type: String,
    enum: ["New", "Used", "Like New", "Refurbished", "Unknown"],
    default: "Unknown"
  },
  shipping_price: {
    type: Number,
    default: 0
  },
  view_count: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Auction', auctionSchema);
