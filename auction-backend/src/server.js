require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

// Import models to register them with Mongoose
require('./models/User');
require('./models/Auction');
require('./models/Bid');
require('./models/Watchlist');
require('./models/Question');

// Import routes
const auctionRoutes = require('./routes/auctions');
const bidRoutes = require('./routes/bids');
const watchlistRoutes = require('./routes/watchlist');
const questionRoutes = require('./routes/questions');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auctions', auctionRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/questions', questionRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint with API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Auction API',
    version: '2.0.0',
    endpoints: {
      auctions: {
        'GET /api/auctions': 'Get all auctions (query: minPrice, maxPrice, limit)',
        'GET /api/auctions/search': 'Search auctions (query: q, minPrice, maxPrice, limit)',
        'GET /api/auctions/:id': 'Get auction by ID (with populated seller data)',
        'GET /api/auctions/:id/similar': 'Get similar auctions (query: limit)'
      },
      bids: {
        'GET /api/bids/auction/:auctionId': 'Get all bids for an auction',
        'GET /api/bids/auction/:auctionId/highest': 'Get highest bid for an auction',
        'GET /api/bids/user/:userId': 'Get all bids by a user',
        'POST /api/bids': 'Place a new bid (body: auction_id, bidder_id, amount)'
      },
      watchlist: {
        'GET /api/watchlist/user/:userId': 'Get user watchlist',
        'GET /api/watchlist/auction/:auctionId/count': 'Get watcher count',
        'GET /api/watchlist/check': 'Check if watching (query: user_id, auction_id)',
        'POST /api/watchlist': 'Add to watchlist (body: user_id, auction_id)',
        'DELETE /api/watchlist': 'Remove from watchlist (body: user_id, auction_id)'
      },
      questions: {
        'GET /api/questions/auction/:auctionId': 'Get questions for auction (query: limit, offset)',
        'GET /api/questions/user/:userId': 'Get questions by user',
        'POST /api/questions': 'Ask question (body: auction_id, question_user_id, question_text)',
        'PUT /api/questions/:id/answer': 'Answer question (body: answer_text, answer_user_id)',
        'DELETE /api/questions/:id': 'Delete question'
      }
    }
  });
});


async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}


if (require.main === module) {
  start();
}


module.exports = { app, start };
