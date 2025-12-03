/**
 * HomePage - Landing Page
 *
 * Main landing page with category navigation cards and cool auctions
 */

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchBar from "../components/shared/SearchBar";
import ProductCard from "../components/shared/ProductCard";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [coolAuctions, setCoolAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      id: "marketplace",
      name: "Marketplace",
      icon: (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 4H12C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4H2C0.9 4 0 4.9 0 6V18C0 19.1 0.9 20 2 20H14C15.1 20 16 19.1 16 18V6C16 4.9 15.1 4 14 4ZM6 8C6 8.55 5.55 9 5 9C4.45 9 4 8.55 4 8V6H6V8ZM8 2C9.1 2 10 2.9 10 4H6C6 2.9 6.9 2 8 2ZM12 8C12 8.55 11.55 9 11 9C10.45 9 10 8.55 10 8V6H12V8Z"
            fill="#4854D3"
          />
        </svg>
      ),
      path: "/marketplace",
    },
    {
      id: "property",
      name: "Property",
      icon: (
        <svg
          width="24"
          height="22"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 10.9212C0 11.4234 0.390137 11.7269 0.873206 11.7269C1.17129 11.7269 1.40756 11.5805 1.61315 11.3711L11.6405 2.07105C11.7532 1.95589 11.8768 1.91394 12.0101 1.91394C12.1337 1.91394 12.2468 1.95589 12.3695 2.07105L22.3868 11.3711C22.6025 11.5805 22.8388 11.7269 23.1268 11.7269C23.6094 11.7269 24 11.4234 24 10.9212C24 10.6074 23.8869 10.4088 23.6918 10.2307L20.1368 6.93579V0.752988C20.1368 0.292804 19.8492 0 19.3973 0H18.0515C17.6096 0 17.3015 0.292804 17.3015 0.752988V4.30993L13.2327 0.522672C12.8732 0.177646 12.4313 0.0107124 12 0.0107124C11.5682 0.0107124 11.1369 0.178092 10.7669 0.523119L0.308164 10.2307C0.123178 10.4088 0 10.6074 0 10.9212ZM2.9383 19.6982C2.9383 21.1524 3.80142 22 5.24975 22H9.41107V14.5616C9.41107 14.0805 9.72932 13.7671 10.2019 13.7671H13.8288C14.3014 13.7671 14.6095 14.0805 14.6095 14.5616V22H18.7603C20.2087 22 21.0617 21.1524 21.0617 19.6982V12.0407L12.3388 4.03766C12.2258 3.93321 12.1026 3.88099 11.9794 3.88099C11.8663 3.88099 11.7532 3.93321 11.63 4.04837L2.9383 12.0929V19.6982Z"
            fill="#4854D3"
          />
        </svg>
      ),
      path: "/marketplace?category=Property",
    },
    {
      id: "motors",
      name: "Motors",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.5942 19.2579L10.5822 19.2599L10.5112 19.2949L10.4912 19.2989L10.4772 19.2949L10.4062 19.2589C10.3955 19.2563 10.3875 19.2583 10.3822 19.2649L10.3782 19.2749L10.3612 19.7029L10.3662 19.7229L10.3762 19.7359L10.4802 19.8099L10.4952 19.8139L10.5072 19.8099L10.6112 19.7359L10.6232 19.7199L10.6272 19.7029L10.6102 19.2759C10.6075 19.2653 10.6022 19.2593 10.5942 19.2579ZM10.8582 19.1449L10.8442 19.1469L10.6602 19.2399L10.6502 19.2499L10.6472 19.2609L10.6652 19.6909L10.6702 19.7029L10.6782 19.7109L10.8792 19.8029C10.8918 19.8063 10.9015 19.8036 10.9082 19.7949L10.9122 19.7809L10.8782 19.1669C10.8748 19.1543 10.8682 19.1469 10.8582 19.1449ZM10.1432 19.1469C10.1388 19.1443 10.1335 19.1434 10.1285 19.1445C10.1234 19.1456 10.119 19.1487 10.1162 19.1529L10.1102 19.1669L10.0762 19.7809C10.0768 19.7929 10.0825 19.8009 10.0932 19.8049L10.1082 19.8029L10.3092 19.7099L10.3192 19.7019L10.3222 19.6909L10.3402 19.2609L10.3372 19.2489L10.3272 19.2389L10.1432 19.1469Z"
            fill="#4854D3"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.764 0C14.3211 1.8928e-05 14.8671 0.155134 15.341 0.447969C15.8148 0.740804 16.1978 1.15979 16.447 1.658L17.833 4.429C18.077 4.329 18.317 4.221 18.553 4.105C18.7904 3.98645 19.0651 3.96705 19.3168 4.05106C19.5685 4.13508 19.7764 4.31563 19.895 4.553C20.0136 4.79037 20.033 5.06511 19.9489 5.31678C19.8649 5.56846 19.6844 5.77645 19.447 5.895C19.2066 6.00198 18.9649 6.10598 18.722 6.207L19.683 8.13C19.8916 8.54695 20.0001 9.00678 20 9.473V12C20 12.4221 19.9109 12.8394 19.7386 13.2247C19.5663 13.61 19.3146 13.9546 19 14.236V15.5C19 15.8978 18.842 16.2794 18.5607 16.5607C18.2794 16.842 17.8978 17 17.5 17C17.1022 17 16.7206 16.842 16.4393 16.5607C16.158 16.2794 16 15.8978 16 15.5V15H4V15.5C4 15.8978 3.84196 16.2794 3.56066 16.5607C3.27936 16.842 2.89782 17 2.5 17C2.10218 17 1.72064 16.842 1.43934 16.5607C1.15804 16.2794 1 15.8978 1 15.5V14.236C0.386 13.686 0 12.888 0 12V9.472C0.000186879 9.00646 0.108716 8.54735 0.317 8.131L1.27 6.223C1.02867 6.12167 0.790333 6.01267 0.555 5.896C0.318832 5.77591 0.13931 5.56782 0.0551326 5.3166C-0.0290444 5.06538 -0.011135 4.79114 0.105 4.553C0.163659 4.43543 0.244912 4.33057 0.344116 4.24442C0.443321 4.15826 0.558531 4.0925 0.683161 4.0509C0.807792 4.00929 0.939401 3.99266 1.07046 4.00194C1.20153 4.01122 1.32948 4.04624 1.447 4.105C1.68367 4.22167 1.92367 4.32967 2.167 4.429L3.553 1.659C3.80205 1.16061 4.18497 0.741412 4.65885 0.448394C5.13273 0.155376 5.67884 0.000111784 6.236 0H13.764ZM5.5 9C5.10218 9 4.72064 9.15804 4.43934 9.43934C4.15804 9.72064 4 10.1022 4 10.5C4 10.8978 4.15804 11.2794 4.43934 11.5607C4.72064 11.842 5.10218 12 5.5 12C5.89782 12 6.27936 11.842 6.56066 11.5607C6.84196 11.2794 7 10.8978 7 10.5C7 10.1022 6.84196 9.72064 6.56066 9.43934C6.27936 9.15804 5.89782 9 5.5 9ZM14.5 9C14.1022 9 13.7206 9.15804 13.4393 9.43934C13.158 9.72064 13 10.1022 13 10.5C13 10.8978 13.158 11.2794 13.4393 11.5607C13.7206 11.842 14.1022 12 14.5 12C14.8978 12 15.2794 11.842 15.5607 11.5607C15.842 11.2794 16 10.8978 16 10.5C16 10.1022 15.842 9.72064 15.5607 9.43934C15.2794 9.15804 14.8978 9 14.5 9ZM13.764 2H6.236C6.07141 1.99998 5.90935 2.04058 5.76422 2.11821C5.61908 2.19583 5.49535 2.30808 5.404 2.445L5.342 2.553L4.072 5.091C5.62 5.555 7.706 6 10 6C12.142 6 14.101 5.612 15.61 5.183L15.927 5.091L14.658 2.553C14.5844 2.40581 14.4756 2.27907 14.3413 2.184C14.207 2.08893 14.0513 2.02847 13.888 2.008L13.765 2H13.764Z"
            fill="#4854D3"
          />
        </svg>
      ),
      path: "/marketplace?category=Motors",
    },
    {
      id: "jobs",
      name: "Jobs",
      icon: (
        <svg
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M21.6 3.59998H2.4C1.76348 3.59998 1.15303 3.85283 0.702944 4.30292C0.252856 4.75301 0 5.36346 0 5.99998V9.59998C0 10.2365 0.252856 10.8469 0.702944 11.297C1.15303 11.7471 1.76348 12 2.4 12H7.2V10.8C7.2 10.4817 7.32643 10.1765 7.55147 9.95145C7.77652 9.7264 8.08174 9.59998 8.4 9.59998C8.71826 9.59998 9.02348 9.7264 9.24853 9.95145C9.47357 10.1765 9.6 10.4817 9.6 10.8V12H14.4V10.8C14.4 10.4817 14.5264 10.1765 14.7515 9.95145C14.9765 9.7264 15.2817 9.59998 15.6 9.59998C15.9183 9.59998 16.2235 9.7264 16.4485 9.95145C16.6736 10.1765 16.8 10.4817 16.8 10.8V12H21.6C22.2365 12 22.847 11.7471 23.2971 11.297C23.7471 10.8469 24 10.2365 24 9.59998V5.99998C24 5.36346 23.7471 4.75301 23.2971 4.30292C22.847 3.85283 22.2365 3.59998 21.6 3.59998Z"
            fill="#4854D3"
          />
          <path
            d="M21.6 10.8H16.8V12C16.8 12.3183 16.6736 12.6235 16.4485 12.8486C16.2235 13.0736 15.9183 13.2 15.6 13.2C15.2817 13.2 14.9765 13.0736 14.7515 12.8486C14.5264 12.6235 14.4 12.3183 14.4 12V10.8H9.6V12C9.6 12.3183 9.47357 12.6235 9.24853 12.8486C9.02348 13.0736 8.71826 13.2 8.4 13.2C8.08174 13.2 7.77652 13.0736 7.55147 12.8486C7.32643 12.6235 7.2 12.3183 7.2 12V10.8H2.4C1.76348 10.8 1.15303 10.5472 0.702944 10.0971C0.252856 9.64699 0 9.03654 0 8.40002V18C0 18.6365 0.252856 19.247 0.702944 19.6971C1.15303 20.1472 1.76348 20.4 2.4 20.4H21.6C22.2365 20.4 22.847 20.1472 23.2971 19.6971C23.7471 19.247 24 18.6365 24 18V8.40002C24 9.03654 23.7471 9.64699 23.2971 10.0971C22.847 10.5472 22.2365 10.8 21.6 10.8Z"
            fill="#4854D3"
          />
          <path
            opacity="0.25"
            d="M8.4002 14.4C8.08194 14.4 7.77671 14.2735 7.55167 14.0485C7.32662 13.8235 7.2002 13.5182 7.2002 13.2V10.8C7.2002 10.4817 7.32662 10.1765 7.55167 9.95145C7.77671 9.7264 8.08194 9.59998 8.4002 9.59998C8.71846 9.59998 9.02368 9.7264 9.24872 9.95145C9.47377 10.1765 9.6002 10.4817 9.6002 10.8V13.2C9.6002 13.5182 9.47377 13.8235 9.24872 14.0485C9.02368 14.2735 8.71846 14.4 8.4002 14.4ZM15.6002 14.4C15.2819 14.4 14.9767 14.2735 14.7517 14.0485C14.5266 13.8235 14.4002 13.5182 14.4002 13.2V10.8C14.4002 10.4817 14.5266 10.1765 14.7517 9.95145C14.9767 9.7264 15.2819 9.59998 15.6002 9.59998C15.9185 9.59998 16.2237 9.7264 16.4487 9.95145C16.6738 10.1765 16.8002 10.4817 16.8002 10.8V13.2C16.8002 13.5182 16.6738 13.8235 16.4487 14.0485C16.2237 14.2735 15.9185 14.4 15.6002 14.4Z"
            fill="#4854D3"
          />
          <path
            d="M9.6002 3.6V2.4H14.4002V3.6H16.8002V2.4C16.8002 1.76348 16.5473 1.15303 16.0973 0.702944C15.6472 0.252856 15.0367 0 14.4002 0H9.6002C8.96368 0 8.35323 0.252856 7.90314 0.702944C7.45305 1.15303 7.2002 1.76348 7.2002 2.4V3.6H9.6002Z"
            fill="#4854D3"
          />
        </svg>
      ),
      path: "/marketplace?category=Jobs",
    },
    {
      id: "services",
      name: "Services",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.75 5.6123C18.75 5.1823 18.694 4.7633 18.589 4.3663C18.497 4.0173 18.067 3.9343 17.813 4.1893L16.09 5.9123C15.9258 6.07645 15.731 6.20667 15.5165 6.2955C15.302 6.38434 15.0721 6.43007 14.84 6.43007C14.6079 6.43007 14.378 6.38434 14.1635 6.2955C13.949 6.20667 13.7542 6.07645 13.59 5.9123C13.4258 5.74815 13.2956 5.55327 13.2068 5.3388C13.118 5.12432 13.0722 4.89445 13.0722 4.6623C13.0722 4.43015 13.118 4.20028 13.2068 3.98581C13.2956 3.77133 13.4258 3.57645 13.59 3.4123L15.313 1.6903C15.568 1.4353 15.485 1.0053 15.136 0.913301C14.2804 0.685721 13.3789 0.696192 12.5288 0.943582C11.6787 1.19097 10.9123 1.66588 10.3124 2.31703C9.71251 2.96819 9.30189 3.77084 9.12488 4.63832C8.94787 5.50581 9.01118 6.40517 9.308 7.2393C9.379 7.4393 9.339 7.6633 9.19 7.8123L1.05 15.9523C0.65 16.3523 0.65 17.0013 1.05 17.4003L2.102 18.4523C2.502 18.8523 3.149 18.8523 3.549 18.4523L11.689 10.3123C11.839 10.1623 12.063 10.1223 12.262 10.1933C12.9954 10.454 13.7807 10.5348 14.5518 10.4288C15.323 10.3228 16.0573 10.0331 16.6932 9.58419C17.329 9.13524 17.8477 8.54012 18.2057 7.84893C18.5636 7.15773 18.7503 6.39068 18.75 5.6123Z"
            stroke="#4854D3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      path: "/marketplace?category=Services",
    },
    {
      id: "browse",
      name: "Browse all",
      icon: (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14.9287 16L9.57129 10.6428L14.9287 16Z" fill="black" />
          <path
            d="M14.9287 16L9.57129 10.6428"
            stroke="#2F2C28"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6.35737 11.7144C9.31617 11.7144 11.7147 9.31587 11.7147 6.35718C11.7147 3.39849 9.31617 1 6.35737 1C3.39858 1 1 3.39849 1 6.35718C1 9.31587 3.39858 11.7144 6.35737 11.7144Z"
            stroke="#2F2C28"
            strokeWidth="2"
          />
        </svg>
      ),
      path: "/marketplace",
    },
  ];

  // Fetch cool auctions on component mount
  useEffect(() => {
    fetchCoolAuctions();
  }, []);

  const fetchCoolAuctions = async () => {
    try {
      setLoading(true);
      console.log('Fetching cool auctions...');
      const response = await fetch('http://localhost:3000/api/auctions?limit=6');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Fetched result:', result);
      
      // Extract the data array from the API response
      const auctions = result.data || [];
      console.log('Number of auctions:', auctions.length);
      
      setCoolAuctions(auctions);
    } catch (error) {
      console.error('Error fetching cool auctions:', error);
      setCoolAuctions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    navigate(`/marketplace?q=${encodeURIComponent(query)}`);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  const handleBookmarkClick = (productId) => {
    // TODO: Implement watchlist functionality
    console.log('Add to watchlist:', productId);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <main className="home-landing">
      <div className="container">
        {/* Hero Section */}
        <div className="home-landing__hero">
          <h1 className="home-landing__title">Welcome to Trade Me</h1>
          <p className="home-landing__subtitle">
            Buy and sell with New Zealand's most popular marketplace
          </p>
        </div>

        {/* Search Bar */}
        <div className="home-landing__search">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search all of Trade Me"
          />
        </div>

        {/* Category Cards */}
        <div className="home-landing__categories">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-card ${
                category.id === "browse" ? "category-card--browse" : ""
              }`}
              onClick={() => handleCategoryClick(category.path)}
            >
              <span className="category-card__icon">{category.icon}</span>
              <span className="category-card__name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Cool Auctions Section */}
        <div className="home-landing__section">
          <div className="home-landing__section-header">
            <h2>Cool auctions</h2>
            <a href="/marketplace" className="home-landing__view-all">
              View all →
            </a>
          </div>
          <p className="home-landing__section-description">
            
          </p>

          {/* Product Cards Grid */}
          {loading ? (
            <div className="home-landing__loading">Loading cool auctions...</div>
          ) : coolAuctions.length > 0 ? (
            <div className="home-landing__products">
              {coolAuctions.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <ProductCard
                    product={product}
                    showBookmark={true}
                    onBookmarkClick={handleBookmarkClick}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="home-landing__empty">
              <p>No cool auctions available at the moment. Check back soon!</p>
              <p style={{ fontSize: '12px', marginTop: '8px', color: '#999' }}>
                Debug: Loaded {coolAuctions.length} auctions
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}