import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search for crops"
    />
  );
};

export default SearchBar;