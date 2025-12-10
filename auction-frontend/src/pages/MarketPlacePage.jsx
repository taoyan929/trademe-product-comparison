/**
 * MarketplacePage - Dev 1's Browse/Search Page
 *
 * WHAT THIS PAGE DOES:
 * This is the main browsing page where users can search and filter auctions.
 * It has a search bar, filter panel, and displays all matching products.
 * 
 * API INTEGRATION 
 * 1. Fetches ALL auctions from MongoDB when page loads
 * 2. Stores them in React state
 * 3. When user searches or filters, updates the display in real-time
 * 4. Demonstrates "API call updates frontend display" requirement
 * 
 * THE FLOW:
 * 1. Page loads → fetchAuctions() gets all auctions from backend
 * 2. User types in search/applies filters → applyFiltersAndSearch() runs
 * 3. Filtered results update → setFilteredAuctions() updates state
 * 4. React re-renders → ProductGrid shows updated results
 */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/shared/SearchBar';
import FilterPanel from '../components/shared/FilterPanel';
import ProductGrid from '../components/shared/ProductGrid';
import Button from '../components/shared/Button';
import './MarketplacePage.css';

export default function MarketplacePage() {
    // URL PARAMETERS - Read query strings from URL (e.g., ?q=iphone&category=Electronics)
  const [searchParams, setSearchParams] = useSearchParams();
    // STATE MANAGEMENT - Storing data and UI state
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  // FILTER STATE - All filter options
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: '',
    colour: '',
    minPrice: '',
    maxPrice: ''
  });

/**
   * useEffect #1 - Fetch auctions when page loads
   * 
   * RUNS ONCE when component mounts (empty dependency array [])
   * This makes the initial API call to get all auctions
   */
  useEffect(() => {
    fetchAuctions();
  }, []);

/**
   * useEffect #2 - Apply filters whenever data or filters change
   * 
   * RUNS WHENEVER: auctions, searchQuery, or filters change
   * This keeps the display updated based on user actions
   */
  useEffect(() => {
    applyFiltersAndSearch();
  }, [auctions, searchQuery, filters]);

  // main api function 
  // makes api call to backend
  // Backend queries MongoDB for auctions
  // Backend returns JSON with auction data
  // Frontend stores data in state
  // React re-renders with new data
  // API call updates the frontend display
const fetchAuctions = async () => {
  try {
    setLoading(true);
    setError(null);
    
    // Build query parameters
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    if (filters.colour) params.append('colour', filters.colour);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    params.append('limit', '50');
// the api call- Request auctions from backend
// asking for up to 50 auctions to work with
    const response = await fetch(`http://localhost:3000/api/auctions?${params}`);

    // check is successfull
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
// parse the json response from backend
    const data = await response.json();

    // UPDATE FRONTEND STATE with API data
    // This causes React to re-render the page with new auctions
    if (data.success) {
      setAuctions(data.data);// Store all auctions
      setFilteredAuctions(data.data); // Initially show all auctions
    } else {
      throw new Error(data.error || 'Failed to fetch auctions');
    }
    // error handlers
  } catch (err) {
    setError(err.message);
    console.error('Error fetching auctions:', err);
  } finally {
    // turn off loading state
    setLoading(false);
  }
};

// Call fetchAuctions whenever filters or search changes
useEffect(() => {
  fetchAuctions();
}, [searchQuery, filters]);

 
    const applyFiltersAndSearch = () => {
      // starts will all auctions
    let results = [...auctions];

    // SEARCH FILTER - Filter by keyword in title or description
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(auction =>
        auction.title.toLowerCase().includes(query) ||
        auction.description.toLowerCase().includes(query)
      );
    }

    // CATEGORY FILTER - Filter by category
    if (filters.category) {
      results = results.filter(auction =>
        auction.category === filters.category
      );
    }

    // LOCATION FILTER - Filter by location
    if (filters.location) {
      results = results.filter(auction =>
        auction.location === filters.location
      );
    }

    // COLOUR FILTER - Filter by colour
    if (filters.colour) {
      results = results.filter(auction =>
        auction.colour === filters.colour
      );
    }

    // PRICE RANGE FILTERS - Filter by min/max price
    if (filters.minPrice !== '') {
      results = results.filter(auction =>
        auction.start_price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice !== '') {
      results = results.filter(auction =>
        auction.start_price <= parseFloat(filters.maxPrice)
      );
    }
// update display 
// When we call setFilteredAuctions, React knows to re-render
    // ProductGrid component will receive these filtered results
    setFilteredAuctions(results);
  };

  /**
   * handleSearch - User search handler
   * WHEN USER TYPES AND CLICKS SEARCH:
   * 1. Updates searchQuery state
   * 2. Updates URL with query parameter
   * 3. useEffect detects change and runs applyFiltersAndSearch()
   * 4. Display updates with search results
   */
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams(query ? { q: query } : {});
  };

  /**
   * handleFilterChange - Filter panel handler
   * 
   * WHEN USER CHANGES A FILTER:
   * 1. Updates filters state
   * 2. useEffect detects change and runs applyFiltersAndSearch()
   * 3. Display updates with filtered results
   */
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
/**
   * handleRefresh - Refresh button handler
   * 
   * WHEN USER CLICKS REFRESH:
   * 1. Clears all filters and search
   * 2. Calls fetchAuctions() to get fresh data from backend
   * 3. Display resets to show all auctions
   */
  const handleRefresh = () => {
    setSearchQuery('');
    setFilters({
      category: '',
      location: '',
      colour: '',
      minPrice: '',
      maxPrice: ''
    });
    setSearchParams({});
    fetchAuctions();
  };

  return (
    // ui renders on screen
    <main className="marketplace-page">
      <div className="container">
        {/* Header */}
        <div className="marketplace-page__header">
          <h1 className="marketplace-page__title">Browse Marketplace</h1>
          <p className="marketplace-page__subtitle">
            Discover amazing deals on quality pre-loved items
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        <div className="marketplace-page__layout">
          {/* Sidebar - Filter Panel */}
          <aside className="marketplace-page__sidebar">
           <FilterPanel
  filters={filters}
  onFilterChange={handleFilterChange}
  auctions={auctions}
/>
          </aside>

          {/* Main Content - Product Grid */}
          <div className="marketplace-page__content">
            <ProductGrid
              products={filteredAuctions}
              loading={loading}
              error={error}
            />

            {/* Refresh Button */}
            {!loading && !error && filteredAuctions.length > 0 && (
              <div className="marketplace-page__actions">
                <Button
                  variant="secondary"
                  size="large"
                  onClick={handleRefresh}
                >
                  Refresh Results
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}