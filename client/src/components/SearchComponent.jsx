import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { signoutUserStart,signoutUserFailure,signoutUserSuccess } from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
  const handleLogout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await axios.get("/api/signout");
      console.log(res);
      const data = res.data;
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess());
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Search</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 mb-4 rounded"
      >
        Logout
      </button>
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

      {error && <p className="text-red-500">{error}</p>}

      {loading && <p>Loading...</p>}

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
      {products.length === 0 && !loading && !error && query && <p>No products found.</p>}
    </div>
  );
};

export default SearchComponent;


