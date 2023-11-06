import React from "react";
import { Link } from "react-router-dom";

function SearchList({ id, city, name }) {
  return (
    <div>
      <div className="brew-card" key={name}>
        <h4 className="card-item">{name} ({city})</h4>
        <Link to={`/breweries/${id}`} className="text-info">See details</Link>
      </div>
    </div>
  );
}

export default SearchList;
