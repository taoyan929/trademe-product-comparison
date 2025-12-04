/**
 * 
 * 
 * Responsive grid layout for displaying product cards
 */

import { useNavigate } from 'react-router-dom';
import ProductCard from '../shared/ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, loading, error }) {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div className="product-grid__loading">
        <div className="product-grid__spinner"></div>
        <p>Loading auctions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-grid__error">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="20" stroke="#E34647" strokeWidth="2"/>
          <path d="M24 14v12M24 30v2" stroke="#E34647" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h3>Error Loading Auctions</h3>
        <p>{error}</p>
        <p className="product-grid__error-hint">
          Make sure the backend server is running on http://localhost:3000
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid__empty">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="16" width="48" height="40" rx="4" stroke="#D9D9D9" strokeWidth="2"/>
          <path d="M20 28h24M20 36h16" stroke="#D9D9D9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <h3>No Auctions Found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      <div className="product-grid__header">
        <p className="product-grid__count">
          {products.length} {products.length === 1 ? 'item' : 'items'} found
        </p>
      </div>

      <div className="product-grid__container">
        {products.map(product => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product._id)}
            className="product-grid__item"
          >
            <ProductCard
              product={product}
              showBookmark={true}
              onBookmarkClick={(id) => {
                console.log('Bookmarked:', id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}