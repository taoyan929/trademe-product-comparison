import "./DesktopFilterPanel.css";
import ComparisonItem from "./ComparisonItem";

export default function DesktopFilterPanel({
  filters,
  setFilters,
  selectedProduct,
  matchedProducts,
  clearFilters,
  isMobile = false,
  closeModal,
  maxPriceLimit,

}) {
  // ---- Toggle Location ----
  const toggleLocation = (loc) => {
    setFilters({
      ...filters,
      location: filters.location.includes(loc)
        ? filters.location.filter((x) => x !== loc)
        : [...filters.location, loc],
    });
  };

  // ---- Toggle Colour ----
  const toggleColour = (col) => {
    setFilters({
      ...filters,
      colour: filters.colour.includes(col)
        ? filters.colour.filter((x) => x !== col)
        : [...filters.colour, col],
    });
  };

  return (
    <div className={`dfp-container ${isMobile ? "dfp-mobile" : ""}`}>
      {/* Mobile modal close button */}
      {isMobile && (
        <button className="dfp-close-btn" onClick={closeModal}>
          ×
        </button>
      )}
      {/* LEFT SIDE – FILTERS */}
      <div>
        <h3 className="dfp-title">Comparison Filters</h3>
       <div className="dfp-left">
        {/* SORT BY */}
        <div className="dfp-section">
          <h4>Sort by</h4>

          <div className="dfp-sort-buttons">
            <button
              className={`dfp-sort-btn ${
                filters.sort === "bestmatch" ? "active" : ""
              }`}
              onClick={() => setFilters({ ...filters, sort: "bestmatch" })}
            >
              Best Match
            </button>

            <button
              className={`dfp-sort-btn ${
                filters.sort === "trending" ? "active" : ""
              }`}
              onClick={() => setFilters({ ...filters, sort: "trending" })}
            >
              Trending
            </button>

            <button
              className={`dfp-sort-btn ${
                filters.sort === "latest" ? "active" : ""
              }`}
              onClick={() => setFilters({ ...filters, sort: "latest" })}
            >
              Latest
            </button>

            <button
              className={`dfp-sort-btn ${
                filters.sort === "oldest" ? "active" : ""
              }`}
              onClick={() => setFilters({ ...filters, sort: "oldest" })}
            >
              Oldest
            </button>

            <button
              className={`dfp-sort-btn ${
                filters.sort === "priceAsc" ? "active" : ""
              }`}
              onClick={() => setFilters({ ...filters, sort: "priceAsc" })}
            >
              Price (Low - High)
            </button>

            <button
              className={`dfp-sort-btn ${
                filters.sort === "priceDesc" ? "active" : ""
              }`}
              onClick={() => setFilters({ ...filters, sort: "priceDesc" })}
            >
              Price (High - Low)
            </button>
          </div>
        </div>

        <div className="dfp-divider"></div>

        {/* LOCATION */}
        <div className="dfp-section">
          <h4>Location</h4>
          <div className="dfp-group">
            {["Auckland", "Wellington", "Hamilton", "Christchurch"].map(
              (loc) => (
                <label key={loc} className="dfp-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.location?.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                  />
                  {loc}
                </label>
              )
            )}
          </div>
        </div>

        <div className="dfp-divider"></div>

        {/* COLOUR */}
        <div className="dfp-section">
          <h4>Colour</h4>
          <div className="dfp-group">
            {["White", "Black", "Brown", "Grey", "Pink", "Blue"].map((col) => (
              <label key={col} className="dfp-checkbox">
                <input
                  type="checkbox"
                  checked={filters.colour?.includes(col)}
                  onChange={() => toggleColour(col)}
                />
                {col}
              </label>
            ))}
          </div>
        </div>

        <div className="dfp-divider"></div>

        {/* PRICE RANGE */}
        <div className="dfp-section">
        <h4>
          Price{" "}
          <span className="dfp-price-value">
            {filters.maxPrice
              ? `Up to $${filters.maxPrice}`
              : "Any price"}
          </span>
        </h4>

        <input
          type="range"
          min="0"
          max={maxPriceLimit}
          value={filters.maxPrice || maxPriceLimit}   
          onChange={(e) =>
            setFilters({
              ...filters,
              minPrice: 0,                  
              maxPrice: Number(e.target.value),
            })
          }
        />
      </div>

        <div className="dfp-divider"></div>

        <button className="dfp-clear-btn" onClick={clearFilters}>
          Clear filters
        </button>
        </div>
      </div>

      {/* RIGHT SIDE – SELECTED PRODUCT */}
      <div className="dfp-right">
        <h3 className="dfp-title">Selected Product</h3>

        {/* Selected item */}
        {selectedProduct && (
          <ComparisonItem product={selectedProduct} onRemove={() => {}} />
        )}

        {/* Message */}
        <div className="dfp-alert">
          These are other products we found that matched what you are looking
          for!
        </div>

        {/* Matched list */}
        {matchedProducts.map((item) => (
          <ComparisonItem key={item._id} product={item} onRemove={() => {}} />
        ))}
      </div>
    </div>
  );
}
