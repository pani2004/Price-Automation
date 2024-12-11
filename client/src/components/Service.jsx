import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ServicePage() {
  const [serviceType, setServiceType] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceType) {
      alert('Please select a service type.');
      return;
    }
    try {
      const response = await axios.get(`/api/services/${serviceType}`);
      console.log('Fetched Data:', response.data);
      // Navigate to /serviceresult page with the data and serviceType
      navigate('/serviceresult', { state: { data: response.data, serviceType } });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ width: '1280px', height: '500px', margin: '0 auto' }}
    >
      <h1 className="font-sans font-bold text-white text-center text-5xl mb-10">
        Enter Service Details
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Service Type Dropdown */}
        <div className="flex flex-col w-[473px]">
          <p className="text-black font-medium mb-2">Service Type</p>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full h-[61px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px]"
          >
            <option value="" disabled>
              Select Service Type
            </option>
            <option value="security">Security</option>
            <option value="cleaning">Sanitation</option>
            <option value="cleaning">Cleaning</option>
            <option value="cloudservice">Cloud Services</option>
            <option value="consultingservices">Consulting Services</option>
          </select>
        </div>

        {/* Description Input */}
        <div className="flex flex-col w-[473px]">
          <p className="text-white font-medium mb-2 text-2xl">Description</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[74px] bg-[#FFAC1C] text-black px-4 rounded-[8.3px]"
            placeholder="Optional: Provide additional information"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#FFAC1C] text-black font-medium rounded-[8.3px] text-2xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServicePage;

