/**
 * API Service
 *
 * Centralized API client for making requests to the backend.
 * All API calls should go through this service.
 */

// Detect API Base URL (Vite env OR fallback to localhost)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Debug log for development
console.log(">>> api.js LOADED, BASE URL =", API_BASE_URL);
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

/**
 * Get questions for an auction
 * @param {string} auctionId - Auction ID
 * @returns {Promise<Object>} Response with questions array
 */
export async function getQuestions(auctionId) {
  return fetchAPI(`/questions/auction/${auctionId}`);
}

/**
 * Submit a question for an auction (AI auto-answers if configured)
 * @param {string} auctionId - Auction ID
 * @param {string} questionText - The question to ask
 * @returns {Promise<Object>} Response with question and possibly AI answer
 */
export async function askQuestion(auctionId, questionText) {
  return fetchAPI('/questions', {
    method: 'POST',
    body: JSON.stringify({
      auction_id: auctionId,
      question_text: questionText,
    }),
  });
}

/**
 * Check AI auto-answer status
 * @returns {Promise<Object>} Response with AI configuration status
 */
export async function getAIStatus() {
  return fetchAPI('/questions/ai-status');
}

export default {
  getAuctions,
  searchAuctions,
  getAuctionById,
  getCategories,
  placeBid,
  getQuestions,
  askQuestion,
  getAIStatus,
};
