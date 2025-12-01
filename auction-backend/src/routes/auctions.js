const express = require('express');
const Auction = require('../models/Auction');

const router = express.Router();

// GET /api/auctions - Get all auctions with optional filters
router.get('/', async (req, res) => {
  try {
    const { minPrice, maxPrice, limit = 10 } = req.query; // Whoops magic numbers, need to fix

    let query = {};

    // Price filtering
    if (minPrice || maxPrice) {
      query.start_price = {};
      if (minPrice) query.start_price.$gte = Number(minPrice);
      if (maxPrice) query.start_price.$lte = Number(maxPrice);
    }

    const auctions = await Auction.find(query)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: auctions.length,
      data: auctions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/auctions/search - Search auctions by keyword
router.get('/search', async (req, res) => {
  try {
    const { q, minPrice, maxPrice, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query "q" is required'
      });
    }

    // Build the search query
    let searchQuery = {
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ]
    };

    // Add price filters if provided
    if (minPrice || maxPrice) {
      searchQuery.start_price = {};
      if (minPrice) searchQuery.start_price.$gte = Number(minPrice);
      if (maxPrice) searchQuery.start_price.$lte = Number(maxPrice);
    }

    const auctions = await Auction.find(searchQuery)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      query: q,
      count: auctions.length,
      data: auctions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/auctions/:id - Get single auction by ID
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    res.json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/auctions/:id/similar - Get similar auctions
router.get('/:id/similar', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const auction = await Auction.findById(req.params.id);

    if (!auction) {
      return res.status(404).json({
        success: false,
        error: 'Auction not found'
      });
    }

    // Extract keywords from title for similarity matching
    const keywords = auction.title.split(' ')
      .filter(word => word.length > 3)
      .slice(0, 3);

    // Find similar items based on title keywords (excluding current item)
    const similar = await Auction.find({
      _id: { $ne: auction._id },
      $or: keywords.map(keyword => ({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } }
        ]
      }))
    }).limit(Number(limit));

    res.json({
      success: true,
      originalItem: auction.title,
      count: similar.length,
      data: similar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
