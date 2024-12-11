import React, { useState } from 'react';
import axios from 'axios';

function SpecificationPage() {
  const [specificationName, setSpecificationName] = useState('');
  const [details, setDetails] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 

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
      console.log('Response:', response.data);
      setSpecificationName('');
      setDetails('');
    } catch (err) {
      console.error('Error sending request:', err);
      setError('Failed to submit specification details');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="font-sans font-bold text-black text-center text-3xl sm:text-5xl mb-6 mt-10">
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
            className="w-full h-[74px] bg-[#FF8C00] text-black px-4 rounded-[8.3px]"
            placeholder=""
            className="w-full h-[65px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px] opacity-80"
          />
        </div>
        <div className="flex flex-col w-[473px]">
          <p className="text-black font-medium mb-2">Details</p>
          <select
        <div className="flex flex-col w-full sm:w-[473px]">
          <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Details</p>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-[74px] bg-[#FF8C00] text-black px-4 rounded-[8.3px]"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="furniture">Furniture</option>
            <option value="networkdevices">Network Device</option>
            <option value="stationary">Stationary</option>
          </select>
            className="w-full h-[100px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px] resize-none opacity-80"
          />
        </div>
        {error && (
          <div className="text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#FF8C00] opacity-[0.69] text-black font-medium rounded-[8.3px]"
            disabled={loading} // Disable button during loading
            className="w-[199.64px] h-[55.75px] bg-[#FFAC1C] opacity-[0.69] text-black font-medium rounded-[8.3px] text-xl sm:text-2xl"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpecificationPage;


