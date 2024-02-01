import React from 'react';

function Search({ searchQuery, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search shows..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
}

export default Search;
