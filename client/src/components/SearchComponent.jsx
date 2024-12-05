import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting after logout

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/search`, { params: { query } });
      console.log(response);
      setProducts(response.data.data);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
    }
    setLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.get('/api/signout'); // Call the signout API
      navigate('/signin'); // Redirect to the signin page after logout
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
      >
        Logout
      </button>

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

      {/* Product Results - Table format */}
      {products.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Product Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Website</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold">
                    {product.title}
                  </a>
                </td>
                <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    {product.site}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Message if no products are found after search */}
      {products.length === 0 && !loading && !error && query && <p>No products found.</p>}
    </div>
  );
};

export default SearchComponent;


