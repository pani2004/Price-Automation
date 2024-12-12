import React, { useState } from 'react';
import axios from 'axios';
import ResultPage from '../pages/Specification';
import Navbar from '../components/Navbar';

function SpecificationPage() {
  const [specificationName, setSpecificationName] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Fetch product data
      const productResponse = await axios.post('/api/specification', {
        query: specificationName,
        details,
      });

      // Fetch analytics data
      const analyticsResponse = await axios.post('/api/analyze', {
        product_name: specificationName,
        dataset_name: details,
      });

      // Set results
      setResults({
        products: productResponse.data.data.products,
        analytics: analyticsResponse.data,
      });
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (results) {
    return <ResultPage results={results} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div className="w-full bg-[#004989]">
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#DCDCDC]">
      <div
        className="w-full flex justify-center items-center"
        style={{
          width: '1600px',
          height: '156px',
          backgroundColor: '#004989',
        }}
      >
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow px-4 sm:px-6 lg:px-8 bg-[#DCDCDC]">
        <h1 className="font-sans font-bold text-black text-center text-3xl sm:text-5xl mb-6 mt-10">
          Enter Specification Details
        </h1>

        <form
          className="space-y-6 w-full max-w-[1280px] flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {/* Item Name Input */}
          <div className="flex flex-col w-full sm:w-[473px] mt-6">
            <label className="text-black font-medium mb-2 text-xl sm:text-2xl">
              Item Name
            </label>
            <input
              type="text"
              value={specificationName}
              onChange={(e) => setSpecificationName(e.target.value)}
              className="w-full h-[65px] bg-[#00498929] text-black px-4 rounded-[8.3px] opacity-80"
              placeholder="Enter item name"
            />
          </div>

          {/* Category Select */}
          <div className="flex flex-col w-full sm:w-[473px]">
            <label className="text-black font-medium mb-2 text-xl sm:text-2xl">
              Category
            </label>
            <select
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full h-[65px] bg-[#00498929] text-black px-4 rounded-[8.3px] opacity-80"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="furniture">Furniture</option>
              <option value="network">Network Devices</option>
              <option value="stationary">Stationary</option>
            </select>
          </div>
      
      <form
        className="space-y-6 w-full max-w-[1280px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full sm:w-[473px] mt-6">
          <p className="text-black font-medium mb-2 text-xl sm:text-2xl">Item Name</p>
          <input
            type="text"
            value={specificationName}
            onChange={(e) => setSpecificationName(e.target.value)}
            className="w-full h-[65px] bg-[#00498929] text-black px-4 rounded-[8.3px] opacity-80"
            placeholder="Enter item name"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[473px]">
          <p className="text-black font-medium mb-2 text-xl sm:text-2xl">Category</p>
          <select
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-[65px] bg-[#00498929] text-black px-4 rounded-[8.3px] opacity-80"
          >
            <option value="" disabled>Select a category</option>
            <option value="furniture">Furniture</option>
            <option value="network">Network Devices</option>
            <option value="stationary">Stationary</option>
            <option value="it_hardware">IT Hardware</option>
          </select>
        </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}
        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[199.64px] h-[55.75px] bg-[#004989B0] opacity-[0.69] text-white font-medium rounded-[8.3px] text-xl sm:text-2xl"
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#004989e0] opacity-[0.69] text-white font-medium rounded-[8.3px] text-xl sm:text-2xl"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpecificationPage;