const express = require('express');
const Auction = require('../models/Auction');

const router = express.Router();


// Helper function to escape regex special characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// GET /api/auctions - Get all auctions with optional filters
router.get('/', async (req, res) => {
  try {
    let escapedQ; 
    // Extract all supported query parameters for filtering & sorting
    const {
      q,                //Keyword search
      category,          
      location,
      colour,
      minPrice,
      maxPrice,
      sort = "latest",   //Sorting mode (latest, priceAsc, priceDesc, bestmatch)
      ids,               //Comma-separated auction IDs (comparison tool)
      limit = 20         //Max number of results to return (default: 20)
    } = req.query;

    let query = {};

    // Keyword search ( used for best match too)
    if (q) {
      escapedQ = escapeRegex(q);

      query.$or = [
        { title: { $regex: escapedQ, $options: 'i' } },
        { description: { $regex: escapedQ, $options: 'i' } }
      ];
    }

    if (category) query.category = category;
    if (location) query.location = location;
    if (colour) query.colour = colour;

    // Price filtering
    if (minPrice || maxPrice) {
      query.start_price = {};
      if (minPrice) query.start_price.$gte = Number(minPrice);
      if (maxPrice) query.start_price.$lte = Number(maxPrice);
    }

    // For comparison tool Ids
    if (ids) {
      query._id = { $in: ids.split(',') };
    }

    // Best match sorting ( use aggregation pipeline)
    if (sort === "bestmatch") {

      //If no keyword, fallback to latest
      if(!q) {
        const auctions = await Auction.find(query)
          .sort({ createdAt: -1 })
          .limit(Number(limit));

        return res.json({
          success: true,
          count: auctions.length,
          data: auctions
        });
      }

      //When q exists -> compute relevance score
      const auctions = await Auction.aggregate([
        { $match: query },
        {
          $addFields: {
            score: {
              $cond: [
                { $regexMatch: { input: "$title", regex: escapedQ, options: "i" }},
                2,
                {
                  $cond: [
                    { $regexMatch: { input: "$description", regex: escapedQ, options: "i"} },
                    1,
                    0
                  ]
                }
              ]
            }
          }
        },
        { $sort: { score: -1, createdAt: -1 }},
        { $limit: Number(limit) }
      ]);

      return res.json({
        success: true,
        sortMode: "bestmatch",
        count: auctions.length,
        data: auctions
      });
    }

    //Normal Sorting
    const sortOptions = {
      latest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      priceAsc: { start_price: 1 },
      priceDesc: { start_price: -1 },
      trending: { view_count: -1 }
    };

    const auctions = await Auction.find(query)
      .limit(Number(limit))
      .sort(sortOptions[sort] || sortOptions.latest)

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
    const escapedQ = escapeRegex(q);

    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query "q" is required'
      });
    }

    // Build the search query
    let searchQuery = {
      $or: [
        { title: { $regex: escapedQ, $options: 'i' } },
        { description: { $regex: escapedQ, $options: 'i' } }
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
    const auction = await Auction.findByIdAndUpdate(
      req.params.id,
      { $inc: { view_count: 1 } },
      { new: true }
    );

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
      $or: keywords.map((word) => {
        const escaped = escapeRegex(word);
        return {
          $or: [
            { title: { $regex: escaped, $options: 'i' } },
            { description: { $regex: escaped, $options: 'i' } }
          ]
        };
      })
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
