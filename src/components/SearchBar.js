import React, { useState } from "react";

const SearchMovie = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    search(e.target.value);
    setSearchValue(e.target.value);
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
  };

  return (
    <form className="search">
      <input
        value={searchValue}
        placeholder="Search"
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default SearchMovie;
