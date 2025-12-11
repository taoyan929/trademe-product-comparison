# Trade Me Marketplace Redesign

A team-built auction marketplace implementing Trade Me's UX redesign, featuring real-time bidding, watchlists, AI-powered Q&A, and product comparison tools.

![Trade Me Marketplace](demo-screenshot.png)

## Features

- **Browse Marketplace** - Search, filter, and explore auction listings
- **Product Details** - Image gallery, seller info, shipping options, Q&A section
- **Bidding System** - Place bids, auto-bid, view bid history, reserve tracking
- **Watchlist** - Save and track items you're interested in
- **Comparison Tool** - Compare multiple products side-by-side
- **AI Q&A** - Automatic seller responses powered by Gemini/Ollama
- **Mobile Responsive** - Works on all device sizes

## Quick Start

**Prerequisites:** Node.js 18+, MongoDB running locally

```bash
# Clone and install
git clone https://github.com/Lona44/Mission-Ready-L5-Mission-5-Phase-2.git
cd Mission-Ready-L5-Mission-5-Phase-2

# Backend
cd auction-backend
npm install
cp .env.example .env    # Configure your environment
npm run seed            # Seed the database
npm run dev             # Starts on http://localhost:3000

# Frontend (new terminal)
cd auction-frontend
npm install
npm run dev             # Starts on http://localhost:5173
```

## Environment Setup

Copy `auction-backend/.env.example` to `.env` and configure:

```env
# Required
MONGODB_URI=mongodb://localhost:27017/trademe_auctions
PORT=3000

# Optional: AI Q&A (choose one)
GEMINI_API_KEY=your_key_here    # Get from Google AI Studio
# OR
USE_OLLAMA=true                  # For local AI (requires Ollama)
```

> **Note:** The Q&A feature works without AI configured - it will use fallback responses.

## Tech Stack

| Backend | Frontend |
|---------|----------|
| Node.js + Express | React 18 + Vite |
| MongoDB + Mongoose | CSS (Trade Me UI Kit) |
| Jest + Supertest | |

## API Endpoints

```
GET    /api/auctions              # List auctions (search, filter, paginate)
GET    /api/auctions/:id          # Single auction with seller info

POST   /api/bids                  # Place a bid
GET    /api/bids/auction/:id      # Bid history for auction

GET    /api/watchlist/user/:id    # User's watchlist
POST   /api/watchlist             # Add to watchlist
DELETE /api/watchlist             # Remove from watchlist

GET    /api/questions/auction/:id # Q&A for auction
POST   /api/questions             # Ask a question (AI auto-answers)
```

## Project Structure

```
├── auction-backend/
│   ├── src/
│   │   ├── models/        # Auction, User, Bid, Question, Watchlist
│   │   ├── routes/        # API endpoints
│   │   └── services/      # AI service for Q&A
│   └── data/              # Seed data (auctions.json, users.json)
│
├── auction-frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/    # Navbar, ProductCard, Icons, BidModal
│   │   │   └── comparison/ # Filter panels, comparison items
│   │   ├── pages/         # HomePage, ProductDetailPage, WatchlistPage, ComparisonPage
│   │   └── services/      # API client
│   └── public/            # Static assets, logos
```

## Team

| Role | Name | GitHub | Focus Area |
|------|------|--------|------------|
| Dev 1 | Sana | [@Lotfan](https://github.com/Lotfan) | Homepage, Marketplace, Navigation |
| Dev 2 | Ma'alona | [@Lona44](https://github.com/Lona44) | Product Detail, Bidding, Q&A |
| Dev 3 | Tao | [@taoyan929](https://github.com/taoyan929) | Comparison Tool, Filters |

## Phase 1 Foundation

This project builds on [Phase 1 individual work](https://github.com/Lona44/Mission-Ready-L5-Mission-5):
- MongoDB schema with auction data
- REST API with search (27 passing tests)
- CLI seeder tool (29 passing tests)
- TDD methodology

---

*Built as part of Mission Ready Level 5 Tech Career Accelerator*
