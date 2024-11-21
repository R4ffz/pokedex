import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      id="search-bar"
      type="text"
      placeholder="Procurar Pokémon..."
      onChange={handleInputChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
