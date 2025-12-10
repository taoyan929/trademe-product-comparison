/**
 * WatchlistPage - Trade Me Design
 
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WatchlistPage.css';

export default function WatchlistPage() {
  const navigate = useNavigate();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = '692f8df9790ef72851af2312';

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://localhost:3000/api/watchlist/user/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch watchlist');
      }

      const data = await response.json();
      
      if (data.success) {
        const items = data.data.map(item => item.auction_id);
        setWatchlistItems(items);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWatchlist = async (auctionId) => {
    try {
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

      if (!response.ok) {
        throw new Error('Failed to remove from watchlist');
      }

      setWatchlistItems(prev => prev.filter(item => item._id !== auctionId));
      
      console.log('Removed from watchlist:', auctionId);
    } catch (err) {
      console.error('Error removing from watchlist:', err);
      alert('Failed to remove item from watchlist');
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  //  function to calculate time remaining
  const getTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) return 'Closed';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      const time = new Date(end);
      const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
      const hour = time.getHours() % 12 || 12;
      const min = time.getMinutes().toString().padStart(2, '0');
      const dayName = time.toLocaleDateString('en-US', { weekday: 'short' });
      const day = time.getDate();
      const month = time.toLocaleDateString('en-US', { month: 'short' });
      
      return `${hour}:${min}${ampm}, ${dayName}, ${day}, ${month}`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

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

  if (error) {
    return (
      <main className="watchlist-page">
        <div className="container">
          <div className="watchlist-page__error">
            <h2>Error Loading Watchlist</h2>
            <p>{error}</p>
            <button onClick={fetchWatchlist}>Try Again</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="watchlist-page">
      <div className="container">
        {/* Breadcrumbs  */}
        <nav className="watchlist-breadcrumbs">
          <a href="/">Home</a>
          <span> / </span>
          <a href="/my-trade-me">My TradeMe</a>
          <span> / </span>
          <span>Watchlist</span>
        </nav>

        {/* Header with Title and Edit Button */}
        <div className="watchlist-page__header">
          <h1 className="watchlist-page__title">
            Watched Auctions ({watchlistItems.length})
          </h1>
          <button className="watchlist-page__edit-btn">Edit</button>
        </div>

        {/* Empty State */}
        {watchlistItems.length === 0 ? (
          <div className="watchlist-page__empty">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="30" stroke="#D9D9D9" strokeWidth="2"/>
              <path d="M32 20v24M20 32h24" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h2>Your watchlist is empty</h2>
            <p>Start adding items you're interested in!</p>
            <button 
              className="btn-primary"
              onClick={() => navigate('/marketplace')}
            >
              Browse Marketplace
            </button>
          </div>
        ) : (
          // Watchlist Items List
          <div className="watchlist-page__list">
            {watchlistItems.map((product) => {
              const imageUrl = product.images && product.images.length > 0 
                ? product.images[0] 
                : product.image;

              return (
                <div
                  key={product._id}
                  className="watchlist-item"
                >
                  {/* Yellow  Bookmark */}
                  <button
                    className="watchlist-item__bookmark"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromWatchlist(product._id);
                    }}
                    aria-label="Remove from watchlist"
                  >
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="64" height="64" fill="#F6F5F4"/>
                      <path d="M0 0L32 34.2857L64 64H8C3.58172 64 0 60.4183 0 56V0Z" fill="#F9AF2C"/>
                      <path d="M25.9785 40.3486L17.3383 49.1074L14.0316 45.7479C13.8084 45.522 13.5057 45.395 13.1901 45.395C12.8744 45.395 12.5717 45.522 12.3486 45.7479C12.1254 45.9738 12 46.2803 12 46.5998C12 46.9193 12.1254 47.2257 12.3486 47.4517L16.4968 51.6511C16.7189 51.8746 17.0193 52 17.3324 52C17.6455 52 17.9459 51.8746 18.168 51.6511L27.6497 42.0524C27.8729 41.8281 27.9989 41.5231 28 41.2048C28.0011 40.8864 27.8772 40.5806 27.6556 40.3546C27.434 40.1287 27.1328 40.0011 26.8183 40C26.5038 39.9989 26.2017 40.1243 25.9785 40.3486Z" fill="#943900"/>
                    </svg>
                  </button>

                  {/* Image */}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="watchlist-item__image"
                      onClick={() => handleProductClick(product._id)}
                    />
                  ) : (
                    <div className="watchlist-item__image-placeholder">
                      No Image
                    </div>
                  )}

                  {/* Content */}
                  <div 
                    className="watchlist-item__content"
                    onClick={() => handleProductClick(product._id)}
                  >
                    {/* Location and Closing Time */}
                    <div className="watchlist-item__location-time">
                      <div className="watchlist-item__location">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="#65605d">
                          <circle cx="6" cy="6" r="2" />
                        </svg>
                        {product.location}
                      </div>
                      <div className="watchlist-item__closes">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="#65605d">
                          <circle cx="6" cy="6" r="5" stroke="#65605d" strokeWidth="1" fill="none"/>
                          <path d="M6 3v3l2 2" stroke="#65605d" strokeWidth="1" fill="none"/>
                        </svg>
                        Closes: {getTimeRemaining(product.end_date || product.closing_time)}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="watchlist-item__title">
                      {product.title}
                    </h3>

                    {/* Pricing */}
                    <div className="watchlist-item__pricing">
                      <div className="watchlist-item__price-group">
                        <div className="watchlist-item__price-label">
                          {product.reserve_met ? 'Reserve met' : 'Reserve not met'}
                        </div>
                        <div className="watchlist-item__price-amount">
                          ${product.reserve_price ? product.reserve_price.toFixed(2) : product.start_price.toFixed(2)}
                        </div>
                      </div>

                      {product.buy_now_price > 0 && (
                        <div className="watchlist-item__price-group">
                          <div className="watchlist-item__price-label">Buy now</div>
                          <div className="watchlist-item__price-amount">
                            ${product.buy_now_price.toFixed(2)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="watchlist-item__actions">
                    <button 
                      className="watchlist-item__action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product._id);
                      }}
                    >
                      Place bid
                    </button>
                    <button className="watchlist-item__action-btn">
                      Add note
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}