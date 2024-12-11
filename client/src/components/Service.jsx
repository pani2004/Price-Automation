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
      navigate('/serviceresult', { state: { data: response.data } });
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
      <h1 className="font-sans font-bold text-black text-center text-3xl mb-6">
        Enter Service Details
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col w-[473px]">
          <p className="text-black font-medium mb-2">Service Type</p>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full h-[61px] bg-[#FF8C00] text-black px-4 rounded-[8.3px]"
          >
            <option value="" disabled>
              Select Service Type
            </option>
            <option value="security">Security</option>
            <option value="cleaning">Cleaning</option>
            <option value="cloudservice">Cloud Services</option>
            <option value="consultingservices">Consulting Services</option>
          </select>
        </div>
        <div className="flex flex-col w-[473px]">
          <p className="text-black font-medium mb-2">Description</p>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[74px] bg-[#FF8C00] text-black px-4 rounded-[8.3px]"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#FF8C00] text-black font-medium rounded-[8.3px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ServicePage;





