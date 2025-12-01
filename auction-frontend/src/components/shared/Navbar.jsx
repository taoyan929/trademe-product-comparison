/**
 * Navbar Component
 *
 * Main navigation header for the application.
 * DO NOT modify without discussing in Teams chat first.
 */

import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <a href="/">
            <span className="navbar__logo-text">trade</span>
            <span className="navbar__logo-me">me</span>
          </a>
        </div>

        <div className="navbar__links">
          <a href="/" className="navbar__link">Browse Marketplace</a>
          <a href="/stores" className="navbar__link">Stores</a>
          <a href="/deals" className="navbar__link">Deals</a>
        </div>

        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Categories">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect width="20" height="2" />
              <rect y="9" width="20" height="2" />
              <rect y="18" width="20" height="2" />
            </svg>
          </button>
          <button className="navbar__icon-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 016 6v5l2 2v1H2v-1l2-2V8a6 6 0 016-6zm0 16a2 2 0 01-2-2h4a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button className="navbar__icon-btn" aria-label="Watchlist">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.49 6.91l6.572-.955L10 0l2.938 5.955 6.572.955-4.755 4.635 1.123 6.545z" />
            </svg>
          </button>
          <button className="navbar__btn-primary">List an item</button>
        </div>
      </div>
    </nav>
  );
}
