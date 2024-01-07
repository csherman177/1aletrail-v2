// BreweryDBContainer.js
import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm";
import SearchList from "../SearchList";
import API from "../../utils/API";
import "../../styles/Card.css";

export default function BreweryDBContainer() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");

  // Default search
  const initialSearch = async () => {
    const breweries = await API.search("Colorado");
    setResult(breweries);
  };
  useEffect(() => {
    initialSearch();
  }, []);

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const breweries = await API.search(search);
    setResult(breweries);
  };

  return (
    <div>
      <h1>Breweries</h1>
      <div className="form-card">
        <SearchForm
          value={search}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
      <div>
        {result.length ? (
          result.map((brewery) => (
            <SearchList
              key={brewery.id}
              id={brewery.id}
              name={brewery.name}
              street={brewery.street}
              city={brewery.city}
              state={brewery.state}
              postal_code={brewery.postal_code}
              phone={brewery.phone}
              website_url={brewery.website_url}
            />
          ))
        ) : (
          <h3>No Results to display</h3>
        )}
      </div>
    </div>
  );
}
