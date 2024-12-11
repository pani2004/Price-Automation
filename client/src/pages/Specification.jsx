import React from 'react';

function ResultPage({ results }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]">
      <h1 className="font-sans font-bold text-white text-center text-3xl sm:text-5xl mb-6 mt-10">
        Specification Results
      </h1>

      <div className="w-full max-w-[1280px] overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-[#FFAC1C]">
          <thead>
            <tr className="bg-[#FFAC1C] text-black">
              <th className="px-4 py-2 border border-[#FFAC1C]">#</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Title</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Category</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Price</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Link</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index} className="text-white text-center">
                <td className="px-4 py-2 border border-[#FFAC1C]">{index + 1}</td>
                <td className="px-4 py-2 border border-[#FFAC1C]">{item.title}</td>
                <td className="px-4 py-2 border border-[#FFAC1C]">{item.details}</td>
                <td className="px-4 py-2 border border-[#FFAC1C]">{item.price}</td>
                <td className="px-4 py-2 border border-[#FFAC1C]">
                  <a href={item.link} className="text-[#FFAC1C] underline" target="_blank" rel="noopener noreferrer">
                    View Item
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;

