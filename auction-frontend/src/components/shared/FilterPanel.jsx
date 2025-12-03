/**
 * 
 * 
 * Filter panel for marketplace with category, location, color, and price filters
 */

import { useState, useEffect } from 'react';
import './FilterPanel.css';

export default function FilterPanel({ onFilterChange, auctions = [] }) {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    colour: '',
    minPrice: '',
    maxPrice: ''
  });

  // Extract unique values from auctions for filter options
  const categories = [...new Set(auctions.map(a => a.category))].sort();
  const locations = [...new Set(auctions.map(a => a.location))].sort();
  const colours = [...new Set(auctions.map(a => a.colour).filter(Boolean))].sort();

  const handleFilterChange = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      location: '',
      colour: '',
      minPrice: '',
      maxPrice: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <h2 className="filter-panel__title">Filters</h2>
        {hasActiveFilters && (
          <button 
            className="filter-panel__clear"
            onClick={handleClearFilters}
          >
            Clear all
          </button>
        )}
      </div>

      <div className="filter-panel__section">
        <label className="filter-panel__label">Category</label>
        <select
          className="filter-panel__select"
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="filter-panel__section">
        <label className="filter-panel__label">Location</label>
        <select
          className="filter-panel__select"
          value={filters.location}
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>

      <div className="filter-panel__section">
        <label className="filter-panel__label">Colour</label>
        <select
          className="filter-panel__select"
          value={filters.colour}
          onChange={(e) => handleFilterChange('colour', e.target.value)}
        >
          <option value="">All Colours</option>
          {colours.map(colour => (
            <option key={colour} value={colour}>{colour}</option>
          ))}
        </select>
      </div>

      <div className="filter-panel__section">
        <label className="filter-panel__label">Price Range</label>
        <div className="filter-panel__price-inputs">
          <input
            type="number"
            className="filter-panel__input"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            min="0"
          />
          <span className="filter-panel__price-separator">to</span>
          <input
            type="number"
            className="filter-panel__input"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            min="0"
          />
        </div>
      </div>
    </aside>
  );
}