# API Documentation

Backend REST API for Trade Me Marketplace.

**Base URL:** `http://localhost:3000/api`

## Endpoints

### Get All Auctions

```
GET /auctions
```

Returns a list of all auction items with optional filtering.

**Query Parameters:**
- `q` (string, optional) - Search query (searches across title, description)
- `category` (string, optional) - Filter by category
- `location` (string, optional) - Filter by location
- `colour` (string, optional) - Filter by colour

**Example Request:**
```bash
curl http://localhost:3000/api/auctions?category=Electronics&location=Auckland
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "6745a1234567890abcdef",
      "title": "Sony PlayStation 5 Console",
      "description": "Brand new PS5 disc edition...",
      "category": "Electronics",
      "location": "Auckland CBD",
      "colour": "White",
      "start_price": 500,
      "reserve_price": 750,
      "createdAt": "2024-12-01T12:00:00.000Z",
      "updatedAt": "2024-12-01T12:00:00.000Z"
    }
  ]
}
```

### Search Auctions

```
GET /auctions/search
```

Search for auctions by keyword (searches title and description).

**Query Parameters:**
- `q` (string, required) - Search query

**Example Request:**
```bash
curl "http://localhost:3000/api/auctions/search?q=vintage"
```

**Example Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6745a1234567890abcdef",
      "title": "Vintage Wooden Desk",
      "description": "Beautiful solid oak desk from the 1960s...",
      "category": "Furniture",
      "location": "Ponsonby",
      "colour": "Brown",
      "start_price": 50,
      "reserve_price": 150
    }
  ]
}
```

### Get Single Auction

```
GET /auctions/:id
```

Get a single auction by its ID.

**URL Parameters:**
- `id` (string, required) - Auction ID

**Example Request:**
```bash
curl http://localhost:3000/api/auctions/6745a1234567890abcdef
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "_id": "6745a1234567890abcdef",
    "title": "Sony PlayStation 5 Console",
    "description": "Brand new PS5 disc edition...",
    "category": "Electronics",
    "location": "Auckland CBD",
    "colour": "White",
    "start_price": 500,
    "reserve_price": 750,
    "createdAt": "2024-12-01T12:00:00.000Z",
    "updatedAt": "2024-12-01T12:00:00.000Z"
  }
}
```

### Get Categories

```
GET /categories
```

Get list of all product categories for navigation.

**Example Request:**
```bash
curl http://localhost:3000/api/categories
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    "Electronics",
    "Furniture",
    "Sports & Outdoors",
    "Home & Garden"
  ]
}
```

### Place Bid (Phase 2)

```
POST /auctions/:id/bid
```

Place a bid on an auction item. *(To be implemented in Phase 2)*

**URL Parameters:**
- `id` (string, required) - Auction ID

**Request Body:**
```json
{
  "amount": 600
}
```

**Example Response:**
```json
{
  "success": true,
  "message": "Bid placed successfully",
  "data": {
    "auctionId": "6745a1234567890abcdef",
    "bidAmount": 600,
    "timestamp": "2024-12-01T14:30:00.000Z"
  }
}
```

## Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200 OK` - Successful request
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Using the API Client

The frontend includes an API service utility (`src/services/api.js`) with helper functions:

```javascript
import { getAuctions, searchAuctions, getAuctionById } from '../services/api';

// Get all auctions
const response = await getAuctions();

// Search auctions
const results = await searchAuctions('vintage');

// Get single auction
const auction = await getAuctionById('6745a1234567890abcdef');

// Get auctions with filters
const filtered = await getAuctions({
  category: 'Electronics',
  location: 'Auckland CBD'
});
```

## Testing the API

Install backend dependencies:
```bash
cd auction-backend
npm install
```

Seed the database:
```bash
npm run seed
```

Run the API server:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

The API will be available at `http://localhost:3000/api`
