import React, { useState } from 'react';
import axios from 'axios';
import ResultPage from '../pages/Specification';
import Navbar from '../components/Navbar'; // Import the Navbar component

function SpecificationPage() {
  const [specificationName, setSpecificationName] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analyticsData, setAnalyticsData] = useState(null);
  const [results, setResults] = useState(null); // Added this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First get the product data
      const productResponse = await axios.post('/api/specification', {
        query: specificationName,
        details,
      });

      // Then get the analytics data
      const analyticsResponse = await axios.post('/api/analyze', {
        product_name: specificationName,
        dataset_name: details
      });

      setAnalyticsData(analyticsResponse.data);
      
      // Set the product results
      setResults({
        products: productResponse.data.data.products,
        analytics: analyticsResponse.data
      });

    } catch (err) {
      console.error('Error:', err);
      setError('Failed to get data');
    } finally {
      setLoading(false);
    }
  };

  if (results) {
    return <ResultPage results={results} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
      <h1 className="font-sans font-bold text-white text-center text-3xl sm:text-5xl mb-6 mt-10">
        Enter Specification Details
      </h1>

      <form
        className="space-y-6 w-full max-w-[1280px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full sm:w-[473px] mt-6">
          <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Item Name</p>
          <input
            type="text"
            value={specificationName}
            onChange={(e) => setSpecificationName(e.target.value)}
            className="w-full h-[65px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px] opacity-80"
            placeholder="Enter item name"
          />
        </div>
        <div className="flex flex-col w-full sm:w-[473px]">
          <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Category</p>
          <select
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-[65px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px] opacity-80"
          >
            <option value="" disabled>Select a category</option>
            <option value="furniture">Furniture</option>
            <option value="network">Network Devices</option>
            <option value="stationary">Stationary</option>
            <option value="it_hardware">IT Hardware</option>
          </select>
        </div>
    <>
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
      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#DCDCDC]">
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
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}

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
    </>
  );
}

export default SpecificationPage;