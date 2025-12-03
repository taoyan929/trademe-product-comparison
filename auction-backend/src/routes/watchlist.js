const express = require('express');
const Watchlist = require('../models/Watchlist');
const Auction = require('../models/Auction');

const router = express.Router();

// GET /api/watchlist/user/:userId - Get user's watchlist
router.get('/user/:userId', async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user_id: req.params.userId })
      .populate('auction_id')
      .sort({ added_date: -1 });

    res.json({
      success: true,
      count: watchlist.length,
      data: watchlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/watchlist/auction/:auctionId/count - Get watcher count for an auction
router.get('/auction/:auctionId/count', async (req, res) => {
  try {
    const count = await Watchlist.getWatcherCount(req.params.auctionId);

    res.json({
      success: true,
      count: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/watchlist - Add auction to watchlist
router.post('/', async (req, res) => {
  try {
    const { user_id, auction_id } = req.body;

    if (!user_id || !auction_id) {
      return res.status(400).json({
        success: false,
        error: 'user_id and auction_id are required'
      });
    }

    // Check if auction exists
    const auction = await Auction.findById(auction_id);
    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    // Check if already watching
    const existing = await Watchlist.findOne({ user_id, auction_id });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Already watching this auction'
      });
    }

    // Create watchlist entry
    const watchlistItem = new Watchlist({
      user_id,
      auction_id
    });

    await watchlistItem.save();

    // Update auction watcher count
    const watcherCount = await Watchlist.getWatcherCount(auction_id);
    await Auction.findByIdAndUpdate(auction_id, { watchers_count: watcherCount });

    res.status(201).json({
      success: true,
      data: watchlistItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/watchlist - Remove auction from watchlist
router.delete('/', async (req, res) => {
  try {
    const { user_id, auction_id } = req.body;

    if (!user_id || !auction_id) {
      return res.status(400).json({
        success: false,
        error: 'user_id and auction_id are required'
      });
    }

    const result = await Watchlist.findOneAndDelete({ user_id, auction_id });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Watchlist item not found'
      });
    }

    // Update auction watcher count
    const watcherCount = await Watchlist.getWatcherCount(auction_id);
    await Auction.findByIdAndUpdate(auction_id, { watchers_count: watcherCount });

    res.json({
      success: true,
      message: 'Removed from watchlist'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/watchlist/check - Check if user is watching an auction
router.get('/check', async (req, res) => {
  try {
    const { user_id, auction_id } = req.query;

    if (!user_id || !auction_id) {
      return res.status(400).json({
        success: false,
        error: 'user_id and auction_id query parameters are required'
      });
    }

    const isWatching = await Watchlist.isWatching(user_id, auction_id);

    res.json({
      success: true,
      isWatching: isWatching
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
