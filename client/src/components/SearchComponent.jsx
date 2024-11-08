import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search`, { params: { query } });
      console.log('Search results:', response);
      setResults(response.data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <input
        type="text"
        className="border rounded p-2 w-full mb-4"
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6"
      >
        Search
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((data) => (
          <div
            key={data.cacheId}
            className="border rounded-lg shadow-lg p-6 bg-white hover:bg-gray-100 transition duration-200 ease-in-out"
          >
            <a
              href={data.link}
              className="text-blue-800 font-bold text-lg hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
            <p className="text-gray-700 mt-2">{data.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
