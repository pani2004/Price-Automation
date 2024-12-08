import React, { useState } from 'react';

function SpecificationPage() {
  const [specificationName, setSpecificationName] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({ specificationName, details });
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ width: '1280px', height: '500px', margin: '0 auto' }}
    >
      <h1 className="font-sans font-bold text-black text-center text-3xl mb-6">
        Enter Specification Details
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col w-[473px]">
          <p className="text-black font-medium mb-2">Item Name</p>
          <input
            type="text"
            value={specificationName}
            onChange={(e) => setSpecificationName(e.target.value)}
            className="w-full h-[74px] bg-[#FF8C00]  text-black px-4 rounded-[8.3px]"
          />
        </div>
        <div className="flex flex-col w-[473px]">
          <p className="text-black font-medium mb-2">Details</p>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full h-[74px] bg-[#FF8C00]  text-black px-4 rounded-[8.3px] resize-none"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[199.64px] h-[55.75px] bg-[#FF8C00] opacity-[0.69] text-black font-medium rounded-[8.3px]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpecificationPage;
