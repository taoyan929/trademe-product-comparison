/**
 * ProductCard Component
 */

import { useState } from "react";
import "./ProductCard.css";

export default function ProductCard({
  product,
  showBookmark = false,
  onBookmarkClick,
  isWatchlisted = false, // Track if item is in watchlist
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(isWatchlisted);
  const [isUpdating, setIsUpdating] = useState(false);

  // MOCK USER ID for now
  const userId = "692f8df9790ef72851af2312";

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
  image,
  images,
} = product;

// === Unified image source ===
// Prefer images[0] if available, fallback to image
const imageUrl = images && images.length > 0 ? images[0] : image;

// Bookmark handler
const handleBookmarkClick = async (e) => {
  e.stopPropagation();
  if (isUpdating) return;
    setIsUpdating(true);

    try {
      if (isInWatchlist) {
        // REMOVE FROM WATCHLIST
        const response = await fetch("http://localhost:3000/api/watchlist", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            auction_id: _id,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to remove from watchlist");
        }

        // SUCCESS - Update UI
        setIsInWatchlist(false);
        console.log("Removed from watchlist:", _id);

        // Call parent callback if provided
        if (onBookmarkClick) {
          onBookmarkClick(_id);
        }
      } else {
        // ADD TO WATCHLIST
        const response = await fetch("http://localhost:3000/api/watchlist", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            auction_id: _id,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          // If already exists, just update UI state
          if (result.error?.includes("Already watching")) {
            setIsInWatchlist(true);
          } else {
            throw new Error(result.error || "Failed to add to watchlist");
          }
        } else {
          // SUCCESS - Update UI
          setIsInWatchlist(true);
          console.log("Added to watchlist:", _id);
        }
      }
    } catch (err) {
      console.error("Error updating watchlist:", err);
      // Show user-friendly error
      alert(
        `Failed to ${
          isInWatchlist ? "remove from" : "add to"
        } watchlist. Please try again.`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="product-card">
      {/* Bookmark button */}
      {showBookmark && (
        <button
          className="product-card__bookmark"
          onClick={handleBookmarkClick}
          disabled={isUpdating}
          aria-label={
            isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
          }
          style={{ opacity: isUpdating ? 0.6 : 1 }}
        >
          {/* Show different icon based on watchlist status */}
          {isInWatchlist ? (
            // WATCHLISTED - Filled bookmark
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M64 64L32 29.7143L5.59506e-06 0L56 4.89568e-06C60.4183 5.28193e-06 64 3.58173 64 8.00001L64 64Z" fill="#F9AF2C"/>
<path d="M49.9575 12.3265L41.3498 21.1173L38.0307 17.77C37.8066 17.5449 37.5035 17.4191 37.1878 17.4203C36.8722 17.4215 36.57 17.5495 36.3477 17.7763C36.1253 18.003 36.0011 18.3099 36.0023 18.6294C36.0034 18.949 36.13 19.2549 36.354 19.48L40.5178 23.664C40.7407 23.8867 41.0415 24.011 41.3546 24.0098C41.6678 24.0087 41.9677 23.8821 42.1889 23.6578L51.635 14.024C51.8573 13.7989 51.9822 13.4935 51.9821 13.1751C51.9821 12.8567 51.8571 12.5514 51.6346 12.3263C51.4122 12.1012 51.1105 11.9747 50.796 11.9748C50.4815 11.9748 50.1799 12.1013 49.9575 12.3265Z" fill="#943900"/>
</svg>

          ) : (
            // NOT WATCHLISTED - Outline bookmark
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M64 64L32 29.7143L5.59506e-06 0L56 4.89568e-06C60.4183 5.28193e-06 64 3.58173 64 8.00001L64 64Z" fill="#F9AF2C"/>
<g clip-path="url(#clip0_1119_775)">
<path d="M35.0879 10.0002L35.0879 13.5392C35.0875 14.6135 35.2604 15.6809 35.5999 16.7002L37.2259 21.5792C37.5567 22.5759 38.1932 23.443 39.0451 24.0571C39.8969 24.6713 40.9207 25.0013 41.9709 25.0002L44.9999 25.0002C45.2651 25.0002 45.5195 24.8948 45.707 24.7073C45.8945 24.5198 45.9999 24.2654 45.9999 24.0002C45.9999 23.735 45.8945 23.4806 45.707 23.2931C45.5195 23.1055 45.2651 23.0002 44.9999 23.0002L41.9709 23.0002C41.3412 23.0001 40.7274 22.8019 40.2166 22.4336C39.7058 22.0653 39.3239 21.5456 39.1249 20.9482L37.4999 16.0692C37.2839 15.3991 37.1578 14.7034 37.1249 14.0002L42.0879 14.0002L42.0879 16.0002C42.1019 17.0567 42.5278 18.066 43.2749 18.8132C44.0221 19.5603 45.0314 19.9862 46.0879 20.0002C47.1488 20.0002 48.1662 19.5788 48.9163 18.8286C49.6665 18.0785 50.0879 17.0611 50.0879 16.0002L50.0879 14.0002L55.0509 14.0002C55.0165 14.7161 54.8874 15.4242 54.6669 16.1062L54.4879 16.7202C54.4487 16.847 54.4351 16.9803 54.4479 17.1124C54.4607 17.2445 54.4997 17.3728 54.5626 17.4897C54.6255 17.6065 54.7111 17.7097 54.8143 17.7932C54.9175 17.8767 55.0362 17.9388 55.1637 17.9759C55.2911 18.013 55.4247 18.0243 55.5565 18.0093C55.6884 17.9943 55.816 17.9531 55.9318 17.8883C56.0476 17.8234 56.1493 17.7362 56.2311 17.6316C56.3128 17.527 56.3729 17.4072 56.4079 17.2792L56.5749 16.7022C56.9148 15.6823 57.088 14.6142 57.0879 13.5392L57.0879 10.0002C57.0879 9.46976 56.8772 8.96105 56.5021 8.58598C56.127 8.2109 55.6183 8.00019 55.0879 8.00019L50.0879 8.00019C49.5575 8.00019 49.0487 8.2109 48.6737 8.58598C48.2986 8.96105 48.0879 9.46976 48.0879 10.0002L48.0879 16.0002C48.0804 16.5283 47.8673 17.0327 47.4938 17.4061C47.1204 17.7796 46.616 17.9927 46.0879 18.0002C45.5638 17.9804 45.0665 17.7633 44.6956 17.3925C44.3248 17.0216 44.1077 16.5243 44.0879 16.0002L44.0879 10.0002C44.0879 9.46976 43.8772 8.96105 43.5021 8.58598C43.127 8.2109 42.6183 8.00019 42.0879 8.00019L37.0879 8.00019C36.5575 8.00019 36.0488 8.2109 35.6737 8.58598C35.2986 8.96105 35.0879 9.46976 35.0879 10.0002ZM55.0879 10.0002L55.0879 12.0002L50.0879 12.0002L50.0879 10.0002L55.0879 10.0002ZM42.0879 10.0002L42.0879 12.0002L37.0879 12.0002L37.0879 10.0002L42.0879 10.0002ZM45.0879 27.0002C45.0879 27.2654 44.9825 27.5198 44.795 27.7073C44.6075 27.8948 44.3531 28.0002 44.0879 28.0002L40.0879 28.0002C39.8227 28.0002 39.5683 27.8948 39.3808 27.7073C39.1932 27.5198 39.0879 27.2654 39.0879 27.0002C39.0879 26.735 39.1932 26.4806 39.3808 26.2931C39.5683 26.1055 39.8227 26.0002 40.0879 26.0002L44.0879 26.0002C44.3531 26.0002 44.6075 26.1055 44.795 26.2931C44.9825 26.4806 45.0879 26.735 45.0879 27.0002ZM56.9999 24.0442C57.2651 24.0442 57.5195 24.1495 57.707 24.3371C57.8945 24.5246 57.9999 24.779 57.9999 25.0442C57.9999 25.3094 57.8945 25.5638 57.707 25.7513C57.5195 25.9388 57.2651 26.0442 56.9999 26.0442L53.9559 26.0442L53.9559 29.0002C53.9559 29.2654 53.8505 29.5198 53.663 29.7073C53.4755 29.8948 53.2211 30.0002 52.9559 30.0002C52.6907 30.0002 52.4363 29.8948 52.2488 29.7073C52.0612 29.5198 51.9559 29.2654 51.9559 29.0002L51.9559 26.0442L48.9999 26.0442C48.7347 26.0442 48.4803 25.9388 48.2928 25.7513C48.1052 25.5638 47.9999 25.3094 47.9999 25.0442C47.9999 24.779 48.1052 24.5246 48.2928 24.3371C48.4803 24.1495 48.7347 24.0442 48.9999 24.0442L51.9559 24.0442L51.9559 21.0002C51.9559 20.735 52.0612 20.4806 52.2488 20.2931C52.4363 20.1055 52.6907 20.0002 52.9559 20.0002C53.2211 20.0002 53.4755 20.1055 53.663 20.2931C53.8505 20.4806 53.9559 20.735 53.9559 21.0002L53.9559 24.0442L56.9999 24.0442Z" fill="#943900"/>
</g>
<defs>
<clipPath id="clip0_1119_775">
<rect width="24" height="24" fill="white" transform="translate(34 6.00019)"/>
</clipPath>
</defs>
</svg>

          )}
        </button>
      )}

      {/* IMAGE SECTION FIXED */}
      <div className="product-card__image-wrapper">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="product-card__image"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        {/* Placeholder (always here for onError fallback) */}
        <div
          className="product-card__placeholder-text"
          style={{ display: imageUrl ? "none" : "flex" }}
        >
          No Image
        </div>
      </div>

      {/* CONTENT BELOW */}
      <div className="product-card__content">
        <div className="product-card__location">
          <svg width="12" height="12" fill="#65605d">
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