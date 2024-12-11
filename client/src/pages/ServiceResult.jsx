import React from 'react';
import { useLocation } from 'react-router-dom';

function ServiceResult() {
  const location = useLocation();
  const serviceData = location.state?.data;

  if (!serviceData?.data?.length) {
    return <p className="text-center text-white">No data available.</p>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: '1280px',
        height: '832px',
        background: 'linear-gradient(104.67deg, #1E1E2F 15.15%, #121212 38.15%, #121212 68.52%, #2B2B4F 96.15%)',
        color: '#fff',
        padding: '20px',
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Results</h1>
      <table className="table-auto w-full border-collapse border border-gray-300 text-white">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-300 px-4 py-2">Provider</th>
            <th className="border border-gray-300 px-4 py-2">Service Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {serviceData.data[0]?.cloud_providers.map((provider, providerIndex) =>
            provider.services.map((service, serviceIndex) => (
              <tr key={`${providerIndex}-${serviceIndex}`}>
                <td className="border border-gray-300 px-4 py-2">
                  {serviceIndex === 0 ? provider.provider : ''}
                </td>
                <td className="border border-gray-300 px-4 py-2">{service.service_name}</td>
                <td className="border border-gray-300 px-4 py-2">{service.price}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Visit
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceResult;


