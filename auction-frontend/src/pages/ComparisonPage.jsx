import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import "./ComparisonPage.css";

import DesktopFilterPanel from "../components/comparison/DesktopFilterPanel.jsx";
import MobileFilterModal from "../components/comparison/MobileFilterModal.jsx";
import ComparisonItem from "../components/comparison/ComparisonItem.jsx";

import { getAuctions } from "../services/api.js";

export default function ComparisonPage() {
  /* -----------------------------
     DEVICE MODE
  ------------------------------*/
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  /* -----------------------------
     URL PARAMS (idsString → idsArray)
  ------------------------------*/
  const [searchParams] = useSearchParams();
  const idsString = searchParams.get("ids") || "";

  // Use memo to stabilize array
  const idsArray = useMemo(() => {
    return idsString ? idsString.split(",") : [];
  }, [idsString]);


  /* -----------------------------
     FILTER STATE
  ------------------------------*/
  const defaultFilters = {
    q: "",
    sort: "bestmatch",
    location: [],
    colour: [],
    minPrice: "",
    maxPrice: "",
  };

  const [filters, setFilters] = useState(defaultFilters);

    /* -----------------------------
     DESKTOP FILTER MODAL
  ------------------------------*/
  const [showDesktopFilter, setShowDesktopFilter] = useState(false);

  // Reset filters
  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setMobileApplied(false);
  };


  /* -----------------------------
     AUCTION DATA
  ------------------------------*/
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

/* -----------------------------
   DYNAMIC MAX PRICE LIMIT
------------------------------*/
const maxPriceInData = useMemo(() => {
  if (!items || items.length === 0) return 500; // default fallback

  return Math.max(
    ...items.map((item) => {
      
      return (
        Number(item.buy_now_price) ||
        Number(item.start_price) ||
        Number(item.reserve_price) ||
        0
      );
    })
  );
}, [items]);
  /* -----------------------------
     MOBILE FILTER MODAL
  ------------------------------*/
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [mobileApplied, setMobileApplied] = useState(false);


  /* -----------------------------
     FETCH DATA ON FILTER / IDS CHANGE
  ------------------------------*/
  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        let res;

        if (idsArray.length > 0) {
          res = await getAuctions({
            ids: idsArray.join(","),
            ...filters,
          });
        } else {
          res = await getAuctions({ ...filters });
        }

        setItems(res.data);
      } catch (error) {
        console.error("Comparison fetch error:", error);
      }

      setLoading(false);
    };

    load();
  }, [idsString, filters]); // "idsArray" NOT needed because it comes from idsString


  /* -----------------------------
     REMOVE ITEM FROM COMPARISON
  ------------------------------*/
  const navigate = useNavigate();

  const handleRemove = (removeId) => {
    const newIds = idsArray.filter((id) => id !== removeId);
    const newQuery = newIds.join(",");

    if (newIds.length === 0) {
      navigate("/comparison");
    } else {
      navigate(`/comparison?ids=${newQuery}`);
    }
  };


  /* -----------------------------
     RENDER
  ------------------------------*/
  return (
    <div className="comparison-container">
      <div className="comparison-page">

        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/my-trademe">My TradeMe</a>
          <span>/</span>
          <span className="current">Compare</span>
        </nav>

        {/* Title + Filter Button */}
        <div className="comparison-title-row">
          <h1 className="comparison-title">Comparison Tool</h1>

          <div className="filter-button-wrapper">
            <button
              className="filter-btn-desktop main-filter"
              onClick={() => {
                if (isMobile) {
                  setShowMobileFilter(true);
                } else {
                  setShowDesktopFilter(!showDesktopFilter);
                }
              }}
            >
              <img src="/Vector.png" alt="filter icon" className="filter-icon" />
              <span className="filter-text">Filters</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="cmp-search-wrapper">
          <div className="cmp-search-input">
            <img src="/searchicon.png" className="cmp-search-icon" alt="search" />

            <input
              type="text"
              placeholder="Search all of trade me"
              value={filters.q}
              onChange={(e) =>
                setFilters({ ...filters, q: e.target.value })
              }
            />

            {/* Chips */}
            <div className="cmp-chip-container">
              {filters.location.map((loc) => (
                <div key={loc} className="cmp-chip">
                  {loc}
                  <span
                    className="cmp-chip-remove"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        location: filters.location.filter((x) => x !== loc),
                      })
                    }
                  >
                    ✕
                  </span>
                </div>
              ))}

              {filters.colour.map((col) => (
                <div key={col} className="cmp-chip">
                  {col}
                  <span
                    className="cmp-chip-remove"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        colour: filters.colour.filter((x) => x !== col),
                      })
                    }
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>

            {/* Clear Filters or Search */}
            <button
              className="cmp-search-btn"
              onClick={
                filters.location.length || filters.colour.length
                  ? clearAllFilters
                  : () => {}
              }
            >
              {filters.location.length || filters.colour.length
                ? "Clear filters"
                : "Search"}
            </button>
          </div>
        </div>


        {/* Note */}
        <div className="comparison-note">
          <strong>NOTE:</strong> Search for the item you want to compare
          <br />
          Use Filters to find a product that fits your preference.
        </div>


        {/* Desktop Filter Panel */}
        {!isMobile && showDesktopFilter && (
          <div className="dfp-wrapper">
            <DesktopFilterPanel
              filters={filters}
              setFilters={setFilters}
              selectedProduct={items[0]}
              matchedProducts={items.slice(1)}
              clearFilters={clearAllFilters}
              maxPriceLimit={maxPriceInData}
            />
          </div>
        )}

        {/* Product List */}
        {(!showDesktopFilter || isMobile) && (
          <div className="comparison-list">
            {loading && <p>Loading...</p>}

            {!loading &&
              items.filter(Boolean).map((item, index) => (
                <React.Fragment key={item._id}>
                  <ComparisonItem
                    product={item}
                    onRemove={() => handleRemove(item._id)}
                  />

                  {/* Mobile alert after Apply */}
                  {isMobile && mobileApplied && index === 0 && items.length > 1 && (
                    <div className="dfp-alert" style={{ marginTop: "10px" }}>
                      These are other products we found that matched what you are looking for!
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        )}

        {/* Mobile Filter Modal */}
        {isMobile && showMobileFilter && (
          <MobileFilterModal
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearAllFilters}
            onClose={() => setShowMobileFilter(false)}
            maxPriceLimit={maxPriceInData}

            // ★ The key link: when mobile user clicks Apply Filters
            onApply={() => {
              setMobileApplied(true);
              setShowMobileFilter(false);
            }}
          />
        )}

      </div>
    </div>
  );
}