import React, { useState } from "react";
import { Search } from "lucide-react"; // icône loupe

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // transmet la valeur au parent
  };

  return (
    <div className="flex items-center w-full max-w-md p-2 bg-white border shadow-sm rounded-2xl">
      <Search className="mr-2 text-gray-500" size={20} />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Rechercher un produit..."
        className="flex-1 text-gray-700 outline-none"
      />
    </div>
  );
};

export default SearchBar;
