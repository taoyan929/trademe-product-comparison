/**
 * API Service
 *
 * Centralized API client for making requests to the backend.
 * All API calls should go through this service.
 */

const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Get all auctions with optional search and filters
 * @param {Object} params - Query parameters
 * @param {string} params.q - Search query
 * @param {string} params.category - Filter by category
 * @param {string} params.location - Filter by location
 * @param {string} params.colour - Filter by colour
 * @returns {Promise<Object>} Response with auctions array
 */
export async function getAuctions(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const endpoint = queryString ? `/auctions?${queryString}` : '/auctions';
  return fetchAPI(endpoint);
}

/**
 * Search auctions by keyword
 * @param {string} query - Search query
 * @returns {Promise<Object>} Response with matching auctions
 */
export async function searchAuctions(query) {
  return fetchAPI(`/auctions/search?q=${encodeURIComponent(query)}`);
}

/**
 * Get a single auction by ID
 * @param {string} id - Auction ID
 * @returns {Promise<Object>} Response with auction data
 */
export async function getAuctionById(id) {
  return fetchAPI(`/auctions/${id}`);
}

/**
 * Get list of categories (for navigation)
 * @returns {Promise<Object>} Response with categories array
 */
export async function getCategories() {
  return fetchAPI('/categories');
}

/**
 * Place a bid on an auction (Phase 2 functionality)
 * @param {string} id - Auction ID
 * @param {number} amount - Bid amount
 * @returns {Promise<Object>} Response with bid confirmation
 */
export async function placeBid(id, amount) {
  return fetchAPI(`/auctions/${id}/bid`, {
    method: 'POST',
    body: JSON.stringify({ amount }),
  });
}

export default {
  getAuctions,
  searchAuctions,
  getAuctionById,
  getCategories,
  placeBid,
};
