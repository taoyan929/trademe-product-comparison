/*
 * Search bar for homepage
 */

import { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, placeholder = "Search for items..." }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__container">
        <svg 
          className="search-bar__icon" 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
        </svg>
        
        <input
          type="text"
          className="search-bar__input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search marketplace"
        />
        
        {searchQuery && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/>
            </svg>
          </button>
        )}
        
        <button 
          type="submit" 
          className="search-bar__button"
          disabled={!searchQuery.trim()}
        >
          Search
        </button>
      </div>
    </form>
  );
}