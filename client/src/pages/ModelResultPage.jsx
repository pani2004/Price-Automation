import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function ResultPage({ results }) {
  const generatePDF = () => {
    if (!results || results.length === 0) {
      alert("No data to generate PDF");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Specification Results", 105, 20, { align: "center" });

    const headers = ["#", "Title", "Price", "Site", "Timestamp"];
    const data = results.map((item, index) => [
      index + 1,
      item.title || 'N/A',
      item.price || 'N/A',
      item.site || 'N/A',
      item.timestamp || 'N/A'
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      theme: 'grid',
      headStyles: {
        fillColor: [255, 172, 28],
        textColor: [0, 0, 0],
        fontSize: 12,
        fontStyle: 'bold',
      },
      bodyStyles: {
        textColor: [0, 0, 0],
        fontSize: 10,
      },
      margin: { top: 30, left: 10, right: 10 },
      tableWidth: 'auto',
      didDrawCell: (data) => {
        if (data.column.index === 3) {
          const link = results[data.row.index].link; 
          if (link) {
            doc.link(data.cell.x, data.cell.y, data.cell.width, data.cell.height, { url: link });
          }
        }
      },
    });

    // Add PDF generation time at the bottom of the PDF
    const generationTime = new Date().toLocaleString(); // Get the current date and time
    doc.setFontSize(10);
    doc.text(`PDF Generated on: ${generationTime}`, 105, doc.internal.pageSize.height - 10, { align: "center" });

    // Save the PDF
    doc.save("specification_results.pdf");
  };

  // Function to extract numeric value from price string
  const extractPrice = (price) => {
    const match = price.match(/[\d,]+/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : Infinity;
  };

  // Find the minimum price
  const minPrice = Math.min(...results.map(item => extractPrice(item.price)));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]">
      <h1 className="font-sans font-bold text-white text-center text-3xl sm:text-5xl mb-6 mt-10">
        Specification Results
      </h1>

      <button
        onClick={generatePDF}
        className="bg-[#FFAC1C] text-black px-4 py-2 rounded mb-6"
      >
        Download PDF
      </button>

      <div className="w-full max-w-[1280px] overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-[#FFAC1C]">
          <thead>
            <tr className="bg-[#FFAC1C] text-black">
              <th className="px-4 py-2 border border-[#FFAC1C]">#</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Title</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Price</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Site</th>
              <th className="px-4 py-2 border border-[#FFAC1C]">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {results && results.length > 0 ? (
              results.map((item, index) => (
                <tr key={index} className="text-white text-center">
                  <td className="px-4 py-2 border border-[#FFAC1C]">{index + 1}</td>
                  <td className="px-4 py-2 border border-[#FFAC1C]">{item.title}</td>
                  <td className={`px-4 py-2 border border-[#FFAC1C] ${extractPrice(item.price) === minPrice ? 'bg-green-500' : ''}`}>
                    {item.price}
                  </td>
                  <td className="px-4 py-2 border border-[#FFAC1C]">
                    <a
                      href={item.link}
                      className="text-[#FFAC1C] underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.site || 'N/A'}
                    </a>
                  </td>
                  <td className="px-4 py-2 border border-[#FFAC1C]">{item.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-2 text-white">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResultPage;









