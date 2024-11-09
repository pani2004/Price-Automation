import React, { useState } from 'react';
import axios from 'axios';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/search`, { params: { query } });
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>

      {/* Search Input */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="border rounded p-2 w-full"
          placeholder="Enter product query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        >
          Search
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Product Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow-md">
            <a href={product.link} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-700">
              {product.title}
            </a>
            <p className="text-gray-600">{product.price}</p>
            <p className="text-gray-500">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
