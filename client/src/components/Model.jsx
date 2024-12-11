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
    console.log('Selected Category:', category); // Log the selected category
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-sans font-bold text-white text-center text-5xl mb-10">
        Enter Product Details
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 w-[960px]">
          <div className="flex flex-col">
            <label className="text-white font-medium mb-2">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              placeholder="Enter Item Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white font-medium mb-2">Make</label>
            <input
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              placeholder="Enter Make"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white font-medium mb-2">Category</label>
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

          <div className="flex flex-col">
            <label className="text-white font-medium mb-2">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full h-[74px] bg-[#FF8C00] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              placeholder="Enter Model"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#FF8C00] text-black font-medium rounded-[8.3px] text-2xl"
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
