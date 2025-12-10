const express = require('express');
const Bid = require('../models/Bid');
const Auction = require('../models/Auction');

const router = express.Router();

// Helper function for consistent error responses
const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: message
  });
};

// GET /api/bids/auction/:auctionId - Get all bids for an auction
router.get('/auction/:auctionId', async (req, res) => {
  try {
    const bids = await Bid.find({ auction_id: req.params.auctionId })
      .populate('bidder_id', 'username rating_positive_percentage')
      .sort({ bid_time: -1 });

    res.json({
      success: true,
      count: bids.length,
      data: bids
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// GET /api/bids/auction/:auctionId/highest - Get highest bid for an auction
router.get('/auction/:auctionId/highest', async (req, res) => {
  try {
    const highestBid = await Bid.getHighestBid(req.params.auctionId);

    if (!highestBid) {
      return res.json({
        success: true,
        data: null,
        message: 'No bids yet'
      });
    }

    res.json({
      success: true,
      data: highestBid
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// POST /api/bids - Place a new bid
router.post('/', async (req, res) => {
  try {
    const { auction_id, bidder_id, amount, is_auto_bid, max_auto_bid, selected_shipping_method } = req.body;

    // Validate required fields
    if (!auction_id || !bidder_id || !amount) {
      return sendError(res, 400, 'auction_id, bidder_id, and amount are required');
    }

    // Get the auction
    const auction = await Auction.findById(auction_id);
    if (!auction) {
      return sendError(res, 404, 'Auction not found');
    }

    // Check if auction is active
    if (auction.status !== 'active') {
      return sendError(res, 400, 'Auction is not active');
    }

    // Check if auction has ended
    if (new Date() > auction.end_date) {
      return sendError(res, 400, 'Auction has ended');
    }

    // Get current highest bid
    const currentHighestBid = await Bid.getHighestBid(auction_id);
    const minBidAmount = currentHighestBid ? currentHighestBid.amount : auction.start_price;

    // Validate bid amount
    if (amount <= minBidAmount) {
      return sendError(res, 400, `Bid must be higher than current bid of $${minBidAmount}`);
    }

    // Create the bid
    const bid = new Bid({
      auction_id,
      bidder_id,
      amount,
      is_auto_bid: is_auto_bid || false,
      max_auto_bid: max_auto_bid || null,
      selected_shipping_method: selected_shipping_method || null,
      status: 'winning'
    });

    await bid.save();

    // Update previous winning bid status to 'outbid'
    if (currentHighestBid) {
      await Bid.findByIdAndUpdate(currentHighestBid._id, { status: 'outbid' });
    }

    // Update auction cached stats
    const bidCount = await Bid.getBidCount(auction_id);
    const updateData = {
      current_bid: amount,
      bid_count: bidCount,
      reserve_met: amount >= auction.reserve_price
    };

    await Auction.findByIdAndUpdate(auction_id, updateData);

    // Populate bidder data before sending response
    await bid.populate('bidder_id', 'username rating_positive_percentage');

    res.status(201).json({
      success: true,
      data: bid
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// GET /api/bids/user/:userId - Get all bids by a user
router.get('/user/:userId', async (req, res) => {
  try {
    const bids = await Bid.find({ bidder_id: req.params.userId })
      .populate('auction_id', 'title images status end_date')
      .sort({ bid_time: -1 });

    res.json({
      success: true,
      count: bids.length,
      data: bids
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

// GET /api/bids/user/:userId/auction/:auctionId - Get user's latest bid for a specific auction
router.get('/user/:userId/auction/:auctionId', async (req, res) => {
  try {
    const bid = await Bid.findOne({
      bidder_id: req.params.userId,
      auction_id: req.params.auctionId
    }).sort({ bid_time: -1 });

    res.json({
      success: true,
      data: bid
    });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
});

module.exports = router;
