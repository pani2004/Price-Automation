import React, { useState } from 'react';
import Footer from './Footer';

function ModelPage() {
  const [itemName, setItemName] = useState('');
  const [make, setMake] = useState('');
  const [category, setCategory] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ itemName, make, category, model });
  };
  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full">
      <h1 className="font-sans font-bold text-white text-center text-3xl sm:text-5xl mt-20">
        Enter Product Details
      </h1>
      <div className="flex flex-col justify-center items-center w-full flex-grow">
        <form
          className="space-y-6 gap-5 w-full max-w-[1280px] px-4 sm:px-0 flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 justify-center">
            <div className="flex flex-col w-full sm:w-[473px]">
              <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Item Name</p>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full h-[65px] bg-[#FFAC1C] opacity-[0.8] text-white px-4 rounded-[8.3px]"
              />
            </div>
            <div className="flex flex-col w-full sm:w-[473px]">
              <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Make</p>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full h-[65px] bg-[#FFAC1C] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-6 sm:space-y-0 justify-center">
            <div className="flex flex-col w-full sm:w-[473px]">
              <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Product Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[65px] bg-[#FFAC1C] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              >
                <option value="" disabled selected>
                  Select Category
                </option>
                <option value="network_devices">Network Devices</option>
                <option value="stationary">Stationary</option>
                <option value="furniture">Furniture</option>
                <option value="vehicle">Vehicle</option>
              </select>
            </div>
            <div className="flex flex-col w-full sm:w-[473px]">
              <p className="text-white font-medium mb-2 text-xl sm:text-2xl">Model</p>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full h-[65px] bg-[#FFAC1C] opacity-[0.8] text-black px-4 rounded-[8.3px]"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[199.64px] h-[55.75px] mt-4 bg-[#FFAC1C] opacity-[0.69] text-black font-extrabold rounded-[8.3px] text-xl sm:text-2xl"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full mt-6">
        <Footer />
      </div>
    </div>
  );
}

export default ModelPage;