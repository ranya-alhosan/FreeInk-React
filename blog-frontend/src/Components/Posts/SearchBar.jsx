import React from "react";

function SearchBar({ query, setQuery }) {
  return (
    <div className="input-group mb-4 shadow-sm rounded">
      <input
        type="text"
        className="form-control"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // عند تغيير الاستعلام
      />
      <div className="input-group-append">
        <button className="btn btn-outline-danger" onClick={() => setQuery("")}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
