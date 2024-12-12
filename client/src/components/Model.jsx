import React, { useState } from 'react';
import axios from 'axios';
import ModelResultPage from "../pages/ModelResultPage"; // Import the ResultPage component
import Navbar from '../components/Navbar'; // Import the Navbar component

function ModelPage() {
  const [itemName, setItemName] = useState('');
  const [make, setMake] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');
  const [message, setMessage] = useState('');
  const [results, setResults] = useState(null); // Store results to pass to the results page

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    console.log('Selected Category:', category); 

    const requestData = {
      query: itemName,
      make,
      category,
      model,
    };

    try {
      const response = await axios.post('/api/search', requestData);
      console.log(response);
      setResults(response.data.data.products); 
      setItemName('');
      setMake('');
      setCategory('');
      setModel('');
      setMessage('Product details submitted successfully!');
    } catch (error) {
      setMessage('Error submitting product details.');
      console.error('Error:', error);
    }
  };

  if (results) {
    return <ModelResultPage results={results} />; 
  }

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{
          width: '1600px',
          height: '156px',
          backgroundColor: '#004989',
        }}
      >
        <Navbar />
      </div>
      <div className="flex flex-col bg-[#DCDCDC] items-center justify-center min-h-screen">

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 w-[960px]">
            <div className="flex flex-col">
              <label className="text-black font-medium mb-2">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full h-[74px] bg-[#00498929] opacity-[0.8] text-black px-4 rounded-[8.3px]"
                placeholder="Enter Item Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-black font-medium mb-2">Make</label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full h-[74px] bg-[#00498929] opacity-[0.8] text-black px-4 rounded-[8.3px]"
                placeholder="Enter Make"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-black font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[74px] bg-[#00498929] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="it_hardware">It Hardware</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-black font-medium mb-2">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-[74px] bg-[#00498929] opacity-[0.8] text-black px-4 rounded-[8.3px]"
                placeholder="Enter Model"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-[199.64px] h-[55.75px] bg-[#004989B0] text-white font-medium rounded-[8.3px] text-2xl"
            >
              Submit
            </button>
          </div>

          {message && (
            <p className="text-center text-black font-medium mt-4">{message}</p>
          )}
        </form>

        {/* Footer component (if any) */}
      </div>
    </>
  );
}

export default ModelPage;