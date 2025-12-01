/**
 * ProductCard Component
 *
 * Reusable product card for displaying auction items.
 * Used across Home, Watchlist, and Comparison pages.
 *
 * DO NOT modify without discussing in Teams chat first.
 */

import './ProductCard.css';

export default function ProductCard({ product, showBookmark = false, onBookmarkClick }) {
  if (!product) return null;

  const {
    _id,
    title,
    description,
    category,
    location,
    colour,
    start_price,
    reserve_price,
  } = product;

  return (
    <div className="product-card">
      {showBookmark && (
        <button
          className="product-card__bookmark"
          onClick={() => onBookmarkClick && onBookmarkClick(_id)}
          aria-label="Add to watchlist"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#F9AF2C">
            <path d="M0 0l12 12 12-12z" />
          </svg>
        </button>
      )}

      <div className="product-card__image-placeholder">
        {/* Image gallery will be added in Phase 2 */}
        <div className="product-card__placeholder-text">No Image</div>
      </div>

      <div className="product-card__content">
        <div className="product-card__location">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="#65605d">
            <circle cx="6" cy="6" r="2" />
          </svg>
          {location}
        </div>

        <h3 className="product-card__title">{title}</h3>

        <div className="product-card__meta">
          <span className="product-card__category">{category}</span>
          {colour && <span className="product-card__colour">• {colour}</span>}
        </div>

        <p className="product-card__description">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>

        <div className="product-card__pricing">
          <div className="product-card__price">
            <span className="product-card__price-label">Starting price:</span>
            <span className="product-card__price-amount">${start_price.toFixed(2)}</span>
          </div>
          {reserve_price && (
            <div className="product-card__reserve">
              Reserve: ${reserve_price.toFixed(2)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
