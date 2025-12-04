/**
 * ProductCard Component
 *
 * Reusable product card for displaying auction items.
 * Used across Home, Watchlist, and Comparison pages.
 *
 * DO NOT modify without discussing in Teams chat first.
 */

import "./ProductCard.css";

export default function ProductCard({
  product,
  showBookmark = false,
  onBookmarkClick,
}) {
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
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick && onBookmarkClick(_id);
          }}
          aria-label="Add to watchlist"
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="64" height="64" fill="#F6F5F4" />
            <path
              d="M0 0L32 34.2857L64 64H8C3.58172 64 0 60.4183 0 56V0Z"
              fill="#F9AF2C"
            />
            <path
              d="M7.08789 38V41.539C7.08748 42.6133 7.26037 43.6807 7.59989 44.7L9.22589 49.579C9.55667 50.5757 10.1932 51.4428 11.0451 52.0569C11.8969 52.6711 12.9207 53.0011 13.9709 53H16.9999C17.2651 53 17.5195 52.8946 17.707 52.7071C17.8945 52.5196 17.9999 52.2652 17.9999 52C17.9999 51.7348 17.8945 51.4804 17.707 51.2929C17.5195 51.1054 17.2651 51 16.9999 51H13.9709C13.3412 50.9999 12.7274 50.8017 12.2166 50.4334C11.7058 50.0651 11.3239 49.5455 11.1249 48.948L9.49989 44.069C9.28395 43.399 9.15785 42.7032 9.12489 42H14.0879V44C14.1019 45.0565 14.5278 46.0658 15.2749 46.813C16.0221 47.5601 17.0314 47.986 18.0879 48C19.1488 48 20.1662 47.5786 20.9163 46.8284C21.6665 46.0783 22.0879 45.0609 22.0879 44V42H27.0509C27.0165 42.7159 26.8874 43.4241 26.6669 44.106L26.4879 44.72C26.4487 44.8468 26.4351 44.9801 26.4479 45.1122C26.4607 45.2444 26.4997 45.3726 26.5626 45.4895C26.6255 45.6063 26.7111 45.7095 26.8143 45.793C26.9175 45.8765 27.0362 45.9386 27.1637 45.9757C27.2911 46.0128 27.4247 46.0242 27.5565 46.0091C27.6884 45.9941 27.816 45.9529 27.9318 45.8881C28.0476 45.8232 28.1493 45.736 28.2311 45.6314C28.3128 45.5268 28.3729 45.407 28.4079 45.279L28.5749 44.702C28.9148 43.6821 29.088 42.6141 29.0879 41.539V38C29.0879 37.4696 28.8772 36.9609 28.5021 36.5858C28.127 36.2107 27.6183 36 27.0879 36H22.0879C21.5575 36 21.0487 36.2107 20.6737 36.5858C20.2986 36.9609 20.0879 37.4696 20.0879 38V44C20.0804 44.5281 19.8673 45.0325 19.4938 45.4059C19.1204 45.7794 18.616 45.9925 18.0879 46C17.5638 45.9802 17.0665 45.7631 16.6956 45.3923C16.3248 45.0214 16.1077 44.5241 16.0879 44V38C16.0879 37.4696 15.8772 36.9609 15.5021 36.5858C15.127 36.2107 14.6183 36 14.0879 36H9.08789C8.55746 36 8.04875 36.2107 7.67368 36.5858C7.2986 36.9609 7.08789 37.4696 7.08789 38ZM27.0879 38V40H22.0879V38H27.0879ZM14.0879 38V40H9.08789V38H14.0879ZM17.0879 55C17.0879 55.2652 16.9825 55.5196 16.795 55.7071C16.6075 55.8946 16.3531 56 16.0879 56H12.0879C11.8227 56 11.5683 55.8946 11.3808 55.7071C11.1932 55.5196 11.0879 55.2652 11.0879 55C11.0879 54.7348 11.1932 54.4804 11.3808 54.2929C11.5683 54.1054 11.8227 54 12.0879 54H16.0879C16.3531 54 16.6075 54.1054 16.795 54.2929C16.9825 54.4804 17.0879 54.7348 17.0879 55ZM28.9999 52.044C29.2651 52.044 29.5195 52.1494 29.707 52.3369C29.8945 52.5244 29.9999 52.7788 29.9999 53.044C29.9999 53.3092 29.8945 53.5636 29.707 53.7511C29.5195 53.9386 29.2651 54.044 28.9999 54.044H25.9559V57C25.9559 57.2652 25.8505 57.5196 25.663 57.7071C25.4755 57.8946 25.2211 58 24.9559 58C24.6907 58 24.4363 57.8946 24.2488 57.7071C24.0612 57.5196 23.9559 57.2652 23.9559 57V54.044H20.9999C20.7347 54.044 20.4803 53.9386 20.2928 53.7511C20.1052 53.5636 19.9999 53.3092 19.9999 53.044C19.9999 52.7788 20.1052 52.5244 20.2928 52.3369C20.4803 52.1494 20.7347 52.044 20.9999 52.044H23.9559V49C23.9559 48.7348 24.0612 48.4804 24.2488 48.2929C24.4363 48.1054 24.6907 48 24.9559 48C25.2211 48 25.4755 48.1054 25.663 48.2929C25.8505 48.4804 25.9559 48.7348 25.9559 49V52.044H28.9999Z"
              fill="#943900"
            />
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
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>

        <div className="product-card__pricing">
          <div className="product-card__price">
            <span className="product-card__price-label">Starting price:</span>
            <span className="product-card__price-amount">
              ${start_price.toFixed(2)}
            </span>
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
