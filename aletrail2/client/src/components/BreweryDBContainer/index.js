import React from "react";
import { useState, useEffect } from "react";
import SearchForm from "../SearchForm";
import SearchList from "../SearchList";
import API from "../../utils/API";
import "../../styles/Card.css";

export default function BreweryDBContainer() {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");

  // const searchBrewery = (query) =>
  //   API.search(query)
  //     .then((res) => res.json())
  //     .then((data) => setResult(data))
  //     .catch((err) => console.log(err));

  // Default search
  const initialSearch = async () => {
    const breweries = API.search("Colorado");
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
          result.map((brewery) => {
            return (
              <SearchList
                id={brewery.id}
                name={brewery.name}
                street={brewery.street}
                city={brewery.city}
                state={brewery.state}
                postal_code={brewery.postal_code}
                phone={brewery.phone}
                website_url={brewery.website_url}
              />
            );
          })
        ) : (
          <h3>No Results to display</h3>
        )}
      </div>
    </div>
  );
}