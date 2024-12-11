import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

function ModelPage() {
  const [itemName, setItemName] = useState('');
  const [make, setMake] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    // Log the selected category to check if it's correct
    console.log('Selected Category:', category);

    try {
      const response = await axios.post('/api/search', {
        query: itemName,
        make,
        category,
        model,
      });
      setMessage('Product details submitted successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      setMessage('Error submitting product details.');
      console.error('Error:', error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen"
      style={{ width: '1280px', height: '500px', margin: '0 auto' }}
    >
      <h1 className="font-sans font-bold text-black text-center text-3xl mb-6 mt-10">
        Enter Product Details
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex space-x-6">
          <div className="flex flex-col w-[473px]">
            <p className="text-black font-medium mb-2">Item Name</p>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
            />
          </div>
          <div className="flex flex-col w-[473px]">
            <p className="text-black font-medium mb-2">Make</p>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
            />
          </div>
        </div>
        <div className="flex space-x-6">
          <div className="flex flex-col w-[473px]">
            <p className="text-black font-medium mb-2">Product Category</p>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="vehicle">Vehicle</option>
              <option value="it_hardware">It Hardware</option>
            </select>
          </div>
          <div className="flex flex-col w-[473px]">
            <p className="text-black font-medium mb-2">Model</p>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] mt-4 bg-[#FF8C00] opacity-[0.69] text-black font-extrabold rounded-[8.3px]"
          >
            Submit
          </button>
        </div>
        {message && (
          <p className="text-center text-black font-medium mt-4">{message}</p>
        )}
      </form>
      <Footer />
    </div>
  );
}

export default ModelPage;






