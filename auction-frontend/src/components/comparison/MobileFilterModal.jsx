import "./MobileFilterModal.css";

export default function MobileFilterModal({
  filters,
  setFilters,
  onClose,
  clearFilters,
  maxPriceLimit,

  // ★ Added: callback fired when user clicks "Apply Filters"
  onApply,
}) {

  // Toggle Location (same logic as desktop)
  const toggleLocation = (loc) => {
    setFilters({
      ...filters,
      location: filters.location.includes(loc)
        ? filters.location.filter((x) => x !== loc)
        : [...filters.location, loc],
    });
  };

  // Toggle Colour (same logic as desktop)
  const toggleColour = (col) => {
    setFilters({
      ...filters,
      colour: filters.colour.includes(col)
        ? filters.colour.filter((x) => x !== col)
        : [...filters.colour, col],
    });
  };

  return (
    <div className="mfm-overlay">
      <div className="mfm-modal">

        {/* Header */}
        <div className="mfm-header">
          <h3>Filters</h3>
          <button className="mfm-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="mfm-content">

          {/* SORT BY */}
          <div className="mfm-section">
            <h4>Sort by</h4>

            <div className="mfm-sort-options">
              {["bestmatch", "trending", "latest", "priceAsc", "priceDesc"].map((s) => (
                <button
                  key={s}
                  className={`mfm-sort-btn ${filters.sort === s ? "active" : ""}`}
                  onClick={() => setFilters({ ...filters, sort: s })}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <hr />

          {/* LOCATION CHECKBOXES */}
          <div className="mfm-section">
            <h4>Location</h4>

            <div className="mfm-checkbox-grid">
              {["Auckland", "Wellington", "Hamilton", "Christchurch"].map((loc) => (
                <label key={loc} className="mfm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.location.includes(loc)}
                    onChange={() => toggleLocation(loc)}
                  />
                  {loc}
                </label>
              ))}
            </div>
          </div>

          <hr />

          {/* COLOUR CHECKBOXES */}
          <div className="mfm-section">
            <h4>Colour</h4>

            <div className="mfm-checkbox-grid">
              {["White", "Black", "Brown", "Grey", "Pink", "Blue"].map((col) => (
                <label key={col} className="mfm-checkbox-item">
                  <input
                    type="checkbox"
                    checked={filters.colour.includes(col)}
                    onChange={() => toggleColour(col)}
                  />
                  {col}
                </label>
              ))}
            </div>
          </div>

          <hr />

            {/* PRICE RANGE */}
            <h3 className="mfp-section-title">
              Price{" "}
              <span className="mfp-price-value">
                {filters.maxPrice
                  ? `Up to $${filters.maxPrice}`
                  : "Any price"}
              </span>
            </h3>

            <input
              type="range"
              min="0"
              max={maxPriceLimit}
              value={filters.maxPrice || maxPriceLimit}   
              className="mfp-price-slider"
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPrice: 0,                 
                  maxPrice: Number(e.target.value),
                })
              }
            />

          <hr />

          {/* CLEAR FILTERS */}
          <div className="mfm-clear-row">
            <button className="mfm-clear-btn" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        </div>

        {/* APPLY FILTERS BUTTON */}
        <div className="mfm-footer">

          {/*
            ★ IMPORTANT:
            This calls onApply() instead of onClose()
            So parent component knows filters were applied.
          */}

          <button className="mfm-apply-btn" onClick={onApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}