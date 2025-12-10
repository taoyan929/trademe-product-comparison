import "./ComparisonItem.css";

export default function ComparisonItem({ product, onRemove }) {
  if (!product) return null;

  const {
    _id,
    title,
    location,
    closing_time,
    reserve_price,
    buy_now_price,
    image,
    images
  } = product;

  return (
    <div className="cmp-item">

      {/* --- Left side image --- */}
      <div className="cmp-image-box">
        <img
          src={image || images?.[0] || "/no-image.png"}
          alt={title}
          className="cmp-image"
        />
      </div>

      {/* --- Main content area --- */}
      <div className="cmp-content">

        {/* ---------------------------------- */}
        {/* 1️⃣ Top row: Location + Closing Time + Remove Button */}
        {/* ---------------------------------- */}
        <div className="cmp-header-row">
          <span className="cmp-location">{location}</span>

          <span className="cmp-dot"></span>

          <span className="cmp-closing">
            Closes: {closing_time || "N/A"}
          </span>

          {/* Remove item (X button) */}
          <button className="cmp-remove-btn" onClick={onRemove}>
            ✕
          </button>
        </div>

        {/* Divider */}
        <hr className="cmp-divider" />


        {/* ---------------------------------- */}
        {/* 2️⃣ Product title */}
        {/* ---------------------------------- */}
        <h3 className="cmp-title">{title}</h3>


        {/* ---------------------------------- */}
        {/* 3️⃣ Prices row: Reserve met (left) | Buy now (right) */}
        {/* ---------------------------------- */}
        <div className="cmp-price-row">

          {/* Reserve price block */}
          <div className="cmp-reserve-block">
            <span className="cmp-reserve-label">Reserve met</span>
            <span className="cmp-reserve-value">${reserve_price}</span>
          </div>

          {/* Buy now block */}
          <div className="cmp-buy-block">
            <span className="cmp-buy-label">Buy now</span>
            <span className="cmp-buy-value">${buy_now_price}</span>
          </div>

        </div>

        {/* Divider */}
        <hr className="cmp-divider" />


        {/* ---------------------------------- */}
        {/* 4️⃣ Add note link/button */}
        {/* ---------------------------------- */}
        <button className="cmp-add-note-btn">
          Add note
        </button>

      </div>

      {/* --- Yellow corner checkmark (top-right) --- */}
      <img
        src="/tick-corner.png"
        alt="selected"
        className="cmp-corner-check"
      />

    </div>
  );
}