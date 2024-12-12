import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function ServiceResult() {
  const location = useLocation();

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Data:', location.state?.data);
    console.log('Service Type:', location.state?.serviceType);
  }, [location]);

  const { data = {}, serviceType = 'default' } = location.state || {};
  const consultingData = Array.isArray(data.data) ? data.data : [];
  const cloudServiceData = serviceType === 'cloudservice' ? data.data : [];
  const securityServiceData = serviceType === 'security' ? data.data : [];

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width; // Get the page width for centering
  
    let yPosition = 20; // Start position for the title
  
    // Set title with centered alignment
    doc.setFontSize(18);
    const title = serviceType === 'security'
        ? 'Security Service Details'
        : serviceType === 'consultingservices'
        ? 'Consulting Service Details'
        : serviceType === 'cloudservice'
        ? 'Cloud Service Details'
        : 'Service Details';
  
    const titleWidth = doc.getTextWidth(title); // Get the width of the title
    const titleX = (pageWidth - titleWidth) / 2; // Calculate X position to center the title
    doc.text(title, titleX, yPosition); // Center the title
    yPosition += 15; // Add more space after the title
  
    // Set table columns
    const headers =
      serviceType === 'cloudservice'
        ? ['Region', 'Cloud Provider', 'Category', 'Service Name', 'Pricing']
        : ['Service Provider', 'Service Offered', 'Cost'];
  
    // Prepare the table data specifically for Cloud Services
    const tableData =
      serviceType === 'cloudservice'
        ? cloudServiceData.flatMap((cloud) =>
            cloud?.cloud_providers?.flatMap((provider) =>
              provider?.services?.map((service) => [
                cloud?.region || 'Not available',
                provider?.provider || 'Not available',
                service?.category || 'Not available',
                service?.service_name || 'Not available',
                service?.price
                  ? `$${service.price} ${service.pricing_unit || ''}`
                  : 'Not available',
              ])
            )
          )
        : serviceType === 'security'
        ? securityServiceData.map((service) => [
            service?.name || 'Not available',
            service?.service || 'Not available',
            service?.amount || 'Not available',
          ])
        : serviceType === 'consultingservices'
        ? consultingData.map((service) => [
            service?.ServiceProvider || 'Not available',
            service?.ServiceOffered || 'Not available',
            service?.EstimatedCost || 'Not available',
          ])
        : [];
  
    // Add table to PDF
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: yPosition, // Use updated yPosition after title
      theme: 'grid',
      headStyles: {
        fillColor: [255, 172, 28], // Header background color
        textColor: [0, 0, 0], // Header text color
        fontSize: 12,
        fontStyle: 'bold',
      },
      bodyStyles: {
        textColor: [0, 0, 0], // Body text color
        fontSize: 10,
      },
      margin: { top: 30, left: 10, right: 10 },
      tableWidth: 'auto',
      rowHeight: 10, // Adjusted row height to prevent overlap
      cellPadding: 2, // Increased cell padding to provide more space around the text
    });
  
    // Add the current date and time at the bottom
    const currentDateTime = new Date().toLocaleString();
    const dateTimeWidth = doc.getTextWidth(currentDateTime);
    const dateTimeX = (pageWidth - dateTimeWidth) / 2; // Center the time at the bottom
    doc.setFontSize(10);
    doc.text(
      `PDF generated on: ${currentDateTime}`,
      dateTimeX,
      doc.internal.pageSize.height - 10
    ); // Position near the bottom
  
    // Save the PDF
    doc.save('service-details.pdf');
  };
  

  const renderServiceDetails = () => {
    switch (serviceType) {
      case 'security':
  const getLowestPrice = () => {
    const prices = securityServiceData
      .map(service => {
        const amount = service.amount ? String(service.amount).replace(/[^0-9.]/g, '') : null;
        return parseFloat(amount);
      })
      .filter(price => !isNaN(price));
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  const lowestPrice = getLowestPrice();

  return (
    <div>
      <table className="min-w-full table-auto border-collapse bg-[#00498929] text-black rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left">Service Provider</th>
            <th className="px-6 py-4 text-left">Service Offered</th>
            <th className="px-6 py-4 text-left">Cost</th>
          </tr>
        </thead>
        <tbody>
          {securityServiceData.map((service, index) => {
            const amount = service.amount ? String(service.amount).replace(/[^0-9.]/g, '') : null;
            const price = parseFloat(amount);
            const isLowestPrice = price === lowestPrice;

            return (
              <tr key={index} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-6 py-4">
                  {service?.siteLink ? (
                    <a
                      href={service?.siteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-600"
                    >
                      {service?.name || 'Not available'}
                    </a>
                  ) : (
                    service?.name || 'Not available'
                  )}
                </td>
                <td className="px-6 py-4">{service?.service || 'Not available'}</td>
                <td className={`px-6 py-4 ${isLowestPrice ? 'bg-green-600' : ''}`}>
                  {service?.amount || 'Not available'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );


        return (
          <div>
            <table className="min-w-full table-auto border-collapse bg-[#00498929] text-black rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left">Service Provider</th>
                  <th className="px-6 py-4 text-left">Service Offered</th>
                  <th className="px-6 py-4 text-left">Cost</th>
                </tr>
              </thead>
              <tbody>
                {securityServiceData.map((service, index) => (
                  <tr key={index} className="border-t--------">
                    <td className="px-6 py-4">
                      {service?.siteLink ? (
                        <a
                          href={service?.siteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-600"
                        >
                          {service?.name || 'Not available'}
                        </a>
                      ) : (
                        service?.name || 'Not available'
                      )}
                    </td>
                    <td className="px-6 py-4">{service?.service || 'Not available'}</td>
                    <td className="px-6 py-4">{service?.amount || 'Not available'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'cloudservice':
          // Find the minimum price
      const allPrices = cloudServiceData.flatMap((cloud) =>
        cloud?.cloud_providers?.flatMap((provider) =>
          provider?.services?.map((service) => service?.price || Infinity)
        )
      );
      const minPrice = Math.min(...allPrices.filter((price) => typeof price === 'number'));

      return (
        <div>
          <h2 className="text-2xl text-white text-center font-semibold mb-4">Cloud Services</h2>
          {cloudServiceData.map((cloud, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl text-white text-center font-semibold mb-4">
                Region: {cloud?.region || 'Not available'}
              </h3>
              {cloud?.cloud_providers?.map((provider, providerIndex) => (
                <div key={providerIndex} className="mb-4">
                  <h4 className="font-medium text-lg">
                    {provider?.provider ? (
                      <a
                        href={provider?.link || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline hover:text-blue-600"
                      >
                        {provider?.provider}
                      </a>
                    ) : (
                      'Not available'
                    )}
                  </h4>
                  <table className="min-w-full table-auto border-collapse bg-[#00498929] text-black rounded-lg shadow-lg">
                    <thead>
                      <tr>
                        <th className="px-6 py-4 text-left">Category</th>
                        <th className="px-6 py-4 text-left">Service Name</th>
                        <th className="px-6 py-4 text-left">Pricing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provider?.services?.map((service, serviceIndex) => (
                        <tr key={serviceIndex} className="border-t border-gray-700 hover:bg-gray-700">
                          <td className="px-6 py-4">
                            {service?.category ? (
                              <a
                                href={service?.link || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline hover:text-blue-600"
                              >
                                {service?.category || 'Not available'}
                              </a>
                            ) : (
                              'Not available'
                            )}
                          </td>
                          <td className="px-6 py-4">{service?.service_name || 'Not available'}</td>
                          <td
                            className={`px-6 py-4 ${
                              service?.price === minPrice ? 'bg-green-500 text-black font-bold' : ''
                            }`}
                          >
                            {service?.price ? `$${service?.price} ${service?.pricing_unit}` : 'Not available'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
        return (
          <div>
            <h2 className="text-2xl text-white text-center font-semibold mb-4">Cloud Services</h2>
            {cloudServiceData.map((cloud, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl text-white text-center font-semibold mb-4">
                  Region: {cloud?.region || 'Not available'}
                </h3>
                {cloud?.cloud_providers?.map((provider, providerIndex) => (
                  <div key={providerIndex} className="mb-4">
                    <h4 className="font-medium text-lg">
                      {provider?.provider ? (
                        <a
                          href={provider?.link || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-600"
                        >
                          {provider?.provider}
                        </a>
                      ) : (
                        'Not available'
                      )}
                    </h4>
                    <table className="min-w-full table-auto border-collapse bg-[#00498929] text-black rounded-lg">
                      <thead>
                        <tr>
                          <th className="px-6 py-4 text-left">Category</th>
                          <th className="px-6 py-4 text-left">Service Name</th>
                          <th className="px-6 py-4 text-left">Pricing</th>
                        </tr>
                      </thead>
                      <tbody>
                        {provider?.services?.map((service, serviceIndex) => (
                          <tr key={serviceIndex} className="border-t border-gray-400 hover:bg-blue-200">
                            <td className="px-6 py-4">
                              {service?.category ? (
                                <a
                                  href={service?.link || '#'}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 underline hover:text-blue-600"
                                >
                                  {service?.category || 'Not available'}
                                </a>
                              ) : (
                                'Not available'
                              )}
                            </td>
                            <td className="px-6 py-4">{service?.service_name || 'Not available'}</td>
                            <td className="px-6 py-4">
                              {service?.price ? `$${service?.price} ${service?.pricing_unit}` : 'Not available'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'consultingservices':
  // Find the minimum cost from the consultingData, ensuring valid numeric values
  const minCost = Math.min(
    ...consultingData.map(service => parseFloat(service?.EstimatedCost) || Infinity)
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Consulting Services</h2>
      <table className="min-w-full table-auto border-collapse bg-[#00498929] text-black rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left">Service Provider</th>
            <th className="px-6 py-4 text-left">Service Offered</th>
            <th className="px-6 py-4 text-left">Cost</th>
          </tr>
        </thead>
        <tbody>
          {consultingData.map((service, index) => {
            const isLowestPrice = parseFloat(service?.EstimatedCost) === minCost;

            return (
              <tr key={index} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-6 py-4">
                  {service?.ServiceProvider ? (
                    <a
                      href={service?.Website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline hover:text-blue-600"
                    >
                      {service?.ServiceProvider}
                    </a>
                  ) : (
                    'Not available'
                  )}
                </td>
                <td className="px-6 py-4">{service?.ServiceOffered || 'Not available'}</td>
                <td
                  className={`px-6 py-4 ${isLowestPrice ? 'bg-green-500' : ''}`} // Highlight the lowest price
                >
                  {service?.EstimatedCost || 'Not available'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Consulting Services</h2>
            <table className="min-w-full table-auto border-collapse bg-[#00498929] text-black rounded-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left">Service Provider</th>
                  <th className="px-6 py-4 text-left">Service Offered</th>
                  <th className="px-6 py-4 text-left">Cost</th>
                  <th className="px-6 py-4 text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {consultingData.map((service, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-700">
                    <td className="px-6 py-4">{service?.ServiceProvider || 'Not available'}</td>
                    <td className="px-6 py-4">{service?.ServiceOffered || 'Not available'}</td>
                    <td className="px-6 py-4">{service?.EstimatedCost || 'Not available'}</td>
                    <td className="px-6 py-4">
                      {service?.Link ? (
                        <a
                          href={service?.Link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-600"
                        >
                          {service?.Link || 'Not available'}
                        </a>
                      ) : (
                        'Not available'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
      return <div>No data available for this service type.</div>;
    }
  };

  return (
    <div className="p-6">
  {renderServiceDetails()}
  <div className="flex justify-center mt-6"> {/* Added flex and justify-center for centering */}
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Generate PDF
    </button>
  </div>
</div>
  )
}

export default ServiceResult;




