import React from "react";
import "../styles/Search.css";
import { IoSearch } from "react-icons/io5";

const Search = ({ search, setSearch }) => {
  return (
    <div className="searchBar">
      <form>
        <IoSearch className="searchIcon" />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Search;
