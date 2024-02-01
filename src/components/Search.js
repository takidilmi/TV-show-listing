import React from 'react';

function Search({ searchQuery, onSearchChange }) {
  return (
    <>
      <div>
        <input
          className="w-[50vw] p-2 border-2 border-black"
          type="text"
          placeholder="Search shows..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </>
  );
}

export default Search;
