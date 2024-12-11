import React, { useState } from 'react';
import axios from 'axios';
import ResultPage from '../pages/Specification';

function SpecificationPage() {
  const [specificationName, setSpecificationName] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState(null); // Store results to pass to the results page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const requestData = {
      query: specificationName,
      details,
    };

    try {
      const response = await axios.post('/api/specification', requestData);
      setResults(response.data.data); // Save the results
      setSpecificationName('');
      setDetails('');
    } catch (err) {
      console.error('Error sending request:', err);
      setError('Failed to submit specification details');
    } finally {
      setLoading(false);
    }
  };
  if (results) {
    return <ResultPage results={results} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]">
      <h1 className="font-sans font-bold text-white text-center text-3xl sm:text-5xl mb-6 mt-10">
        Enter Specification Details
      </h1>

      <form
        className="space-y-6 w-full max-w-[1280px] flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        {/* Specification Name Input */}
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

        {/* Details Dropdown */}
        <div className="flex flex-col w-full sm:w-[473px]">
          <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Category</p>
          <select
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-[65px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px] opacity-80"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="furniture">Furniture</option>
            <option value="networkdevices">Network Devices</option>
            <option value="stationary">Stationary</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#FFAC1C] opacity-[0.69] text-black font-medium rounded-[8.3px] text-xl sm:text-2xl"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpecificationPage;
