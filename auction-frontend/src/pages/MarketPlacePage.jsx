/**
 * MarketplacePage - Browse/Search Page
 *
 * - Search functionality
 * - Filter panel (category, location, price range)
 * - Responsive product grid
 * - API integration
 */

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/shared/SearchBar';
import FilterPanel from '../components/shared/FilterPanel';
import ProductGrid from '../components/shared/ProductGrid';
import Button from '../components/shared/Button';
import './MarketplacePage.css';

export default function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    location: '',
    colour: '',
    minPrice: '',
    maxPrice: ''
  });

  // Fetch auctions from API
  useEffect(() => {
    fetchAuctions();
  }, []);

  // Apply filters and search whenever they change
  useEffect(() => {
    applyFiltersAndSearch();
  }, [auctions, searchQuery, filters]);

  const fetchAuctions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/api/auctions?limit=50');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setAuctions(data.data);
        setFilteredAuctions(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch auctions');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching auctions:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSearch = () => {
    let results = [...auctions];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(auction =>
        auction.title.toLowerCase().includes(query) ||
        auction.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category) {
      results = results.filter(auction =>
        auction.category === filters.category
      );
    }

    // Apply location filter
    if (filters.location) {
      results = results.filter(auction =>
        auction.location === filters.location
      );
    }

    // Apply colour filter
    if (filters.colour) {
      results = results.filter(auction =>
        auction.colour === filters.colour
      );
    }

    // Apply price filters
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

    setFilteredAuctions(results);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams(query ? { q: query } : {});
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

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