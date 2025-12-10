
/**
 * WatchlistPage Component
 * 
 * WHAT THIS PAGE DOES:
 * Displays all items that the user has added to their watchlist.
 * Users can remove items from the watchlist.
 * 
 * API INTEGRATION:
 * - Fetches watchlist data from MongoDB via backend API
 * - Updates display when items are added/removed
 * - real-time state management
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/shared/ProductCard';
import Button from '../components/shared/Button';
import './WatchlistPage.css';

export default function WatchlistPage() {
  const navigate = useNavigate();
  
  // STATE MANAGEMENT
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // MOCK USER ID for now
  const userId = '692f8df9790ef72851af2312';

  /**
   * useEffect - Fetch watchlist when page loads
   * 
   * 1. Page loads → useEffect runs
   * 2. fetchWatchlist() calls backend API
   * 3. Backend queries MongoDB for this user's watchlist
   * 4. Backend returns watchlist items with full auction data
   * 5. Frontend updates state → React re-renders with items
   */
  useEffect(() => {
    fetchWatchlist();
  }, []);

  /**
   * fetchWatchlist - THE MAIN API FUNCTION
   * 
   *    * 1. Makes GET request to /api/watchlist/user/:userId
   * 2. Backend uses .populate() to include full auction details
   * 3. Receives array of watchlist items
   * 4. Each item has: { user_id, auction_id: {full auction data}, added_date }
   * 5. Updates React state → Display updates automatically
   */
  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      setError(null);

      // API CALL - Request user's watchlist from backend
      const response = await fetch(`http://localhost:3000/api/watchlist/user/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Watchlist response:', result);

      // UPDATE STATE - Store watchlist items
      if (result.success && result.data) {
        setWatchlistItems(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch watchlist');
      }
    } catch (err) {
      console.error('Error fetching watchlist:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleRemoveFromWatchlist - Remove item from watchlist
   * 
   * WHEN USER CLICKS REMOVE:
   * 1. Makes DELETE request to backend
   * 2. Backend removes item from MongoDB
   * 3. Refreshes the watchlist display
   * 4. User sees item disappear from page
   */
  const handleRemoveFromWatchlist = async (auctionId) => {
    try {
      // API CALL - Request to remove item
      const response = await fetch('http://localhost:3000/api/watchlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          auction_id: auctionId
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to remove from watchlist');
      }

      // SUCCESS - Refresh the watchlist to show updated list
      console.log('Removed from watchlist:', auctionId);
      fetchWatchlist();
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      alert('Failed to remove item from watchlist. Please try again.');
    }
  };

  /**
   * handleProductClick - Navigate to product detail page
   */
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  /**
   * handleClearAll - Remove all items from watchlist
   */
  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear your entire watchlist?')) {
      return;
    }

    try {
      // Remove each item one by one
      for (const item of watchlistItems) {
        await handleRemoveFromWatchlist(item.auction_id._id);
      }
    } catch (err) {
      console.error('Error clearing watchlist:', err);
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <main className="watchlist-page">
        <div className="container">
          <div className="watchlist-page__loading">
            <p>Loading your watchlist...</p>
          </div>
        </div>
      </main>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <main className="watchlist-page">
        <div className="container">
          <div className="watchlist-page__error">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="#E34647" strokeWidth="2"/>
              <path d="M24 14v12M24 30v2" stroke="#E34647" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>Error Loading Watchlist</h3>
            <p>{error}</p>
            <Button variant="primary" onClick={fetchWatchlist}>
              Try Again
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // EMPTY STATE
  if (watchlistItems.length === 0) {
    return (
      <main className="watchlist-page">
        <div className="container">
          <div className="watchlist-page__header">
            <h1 className="watchlist-page__title">My Watchlist</h1>
            <p className="watchlist-page__subtitle">
              Keep track of items you're interested in
            </p>
          </div>

          <div className="watchlist-page__empty">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm0 44c-11 0-20-9-20-20s9-20 20-20 20 9 20 20-9 20-20 20z" fill="#D9D9D9"/>
              <path d="M32 20v12l8 8" stroke="#D9D9D9" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            <h3>Your watchlist is empty</h3>
            <p>Start adding items to keep track of auctions you're interested in</p>
            <Button 
              variant="primary" 
              size="large"
              onClick={() => navigate('/marketplace')}
            >
              Browse Marketplace
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // WATCHLIST WITH ITEMS
  return (
    <main className="watchlist-page">
      <div className="container">
        {/* Header */}
        <div className="watchlist-page__header">
          <div>
            <h1 className="watchlist-page__title">My Watchlist</h1>
            <p className="watchlist-page__subtitle">
              {watchlistItems.length} {watchlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {watchlistItems.length > 0 && (
            <Button 
              variant="secondary" 
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Product Grid */}
        <div className="watchlist-page__grid">
          {watchlistItems.map((item) => {
            // item.auction_id contains the full auction object (.populate())
            const product = item.auction_id;
            
            return (
              <div
                key={item._id}
                className="watchlist-page__item"
              >
                <div onClick={() => handleProductClick(product._id)}>
                  <ProductCard
                    product={product}
                    showBookmark={true}
                    onBookmarkClick={() => handleRemoveFromWatchlist(product._id)}
                  />
                </div>
                
                {/* Additional watchlist info */}
                <div className="watchlist-item-info">
                  <p className="watchlist-added-date">
                    Added {new Date(item.added_date).toLocaleDateString('en-NZ', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                  <button
                    className="watchlist-remove-btn"
                    onClick={() => handleRemoveFromWatchlist(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}