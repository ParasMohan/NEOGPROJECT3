// Search.js
import React from "react";

export function Search({ searchKeyword, setSearchKeyword }) {
  const handleSearchInputChange = (event) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
  };

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearchInputChange}
        placeholder="Search products..."
      />
    </div>
  );
}
