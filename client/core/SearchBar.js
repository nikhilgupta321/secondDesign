import Card from "./Card";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setQuery(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const searchUrl = `/search?q=${query}`;
    setQuery("");
    navigate(searchUrl);
  }

  return (
    <Card cardTitle="SEARCH">
      <form onSubmit={handleSubmit} className="search">
        <input
          onChange={handleChange}
          placeholder="Search..."
          className="font-normal text-black searchInput"
          type="text"
          value={query}
        />
        <button className="searchButton" type="submit">
          <i className="fa fa-search searchIcon"></i>
        </button>
      </form>
    </Card>
  );
}

export default SearchBar;
