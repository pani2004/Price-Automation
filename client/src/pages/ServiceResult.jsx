import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

  console.log('Consulting Data:', consultingData);
  console.log('Cloud Service Data:', cloudServiceData);

  if (!data || !serviceType) {
    return <div>Error: Missing data or service type</div>;
  }

  const renderServiceDetails = () => {
    switch (serviceType) {
      case 'security':
        return (
          <div>
            <table className="min-w-full table-auto border-collapse bg-gray-800 text-white rounded-lg shadow-lg">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left">Service Provider</th>
                  <th className="px-6 py-4 text-left">Service Offered</th>
                  <th className="px-6 py-4 text-left">Cost</th>
                  <th className="px-6 py-4 text-left">Link</th>
                </tr>
              </thead>
              <tbody>
                {securityServiceData.map((service, index) => (
                  <tr key={index} className="border-t border-gray-700 hover:bg-gray-700">
                    <td className="px-6 py-4">{service?.name || 'Not available'}</td>
                    <td className="px-6 py-4">{service?.service || 'Not available'}</td>
                    <td className="px-6 py-4">{service?.amount || 'Not available'}</td>
                    <td className="px-6 py-4">
                      {service?.siteLink ? (
                        <a
                          href={service?.
                            siteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-600"
                        >
                          View Link
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

      case 'cloudservice':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Cloud Services</h2>
            {cloudServiceData.map((cloud, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Region: {cloud?.region || 'Not available'}</h3>
                {cloud?.cloud_providers?.map((provider, providerIndex) => (
                  <div key={providerIndex} className="mb-4">
                    <h4 className="font-medium text-lg">{provider?.provider || 'Not available'}</h4>
                    <table className="min-w-full table-auto border-collapse bg-gray-800 text-white rounded-lg shadow-lg">
                      <thead>
                        <tr>
                          <th className="px-6 py-4 text-left">Category</th>
                          <th className="px-6 py-4 text-left">Service Name</th>
                          <th className="px-6 py-4 text-left">Pricing</th>
                          <th className="px-6 py-4 text-left">Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {provider?.services?.map((service, serviceIndex) => (
                          <tr key={serviceIndex} className="border-t border-gray-700 hover:bg-gray-700">
                            <td className="px-6 py-4">{service?.category || 'Not available'}</td>
                            <td className="px-6 py-4">{service?.service_name || 'Not available'}</td>
                            <td className="px-6 py-4">
                              {service?.price ? `$${service?.price} ${service?.pricing_unit}` : 'Not available'}
                            </td>
                            <td className="px-6 py-4">
                              {service?.link ? (
                                <a
                                  href={service?.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 underline hover:text-blue-600"
                                >
                                  View Link
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
                ))}
              </div>
            ))}
          </div>
        );

      case 'consultingservices':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Consulting Services</h2>
            <table className="min-w-full table-auto border-collapse bg-gray-800 text-white rounded-lg shadow-lg">
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
                      {service?.Website ? (
                        <a
                          href={service?.Website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-600"
                        >
                          View Link
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
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Service Details</h2>
            <p><strong>Description:</strong> {data?.Description || 'Not available'}</p>
            <p><strong>Amount:</strong> ${data?.Amount || 'Not available'}</p>
          </div>
        );
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        width: '100%',
        height: '100vh',
        background:
          'linear-gradient(104.67deg, #1E1E2F 15.15%, #121212 38.15%, #121212 68.52%, #2B2B4F 96.15%)',
        color: '#fff',
        padding: '20px',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        {serviceType === 'security'
          ? 'Security Service Details'
          : serviceType === 'consultingservices'
          ? 'Consulting Service Details'
          : serviceType === 'cloudservice'
          ? 'Cloud Service Details'
          : 'Service Details'}
      </h1>
      <div className="space-y-6 w-full max-w-7xl">
        {/* Render the details dynamically based on serviceType */}
        {renderServiceDetails()}
      </div>
    </div>
  );
}

export default ServiceResult;

