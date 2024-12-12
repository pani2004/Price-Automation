import React from 'react';

const AnalyticsSection = ({ analytics }) => {
  if (!analytics) return null;

  return (
    <div className="mt-8 bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Price Analytics</h2>
      
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(analytics.stats).map(([key, value]) => (
          <div key={key} className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium">{key}</h3>
            <p className="text-lg">{value}</p>
          </div>
        ))}
      </div>

      {/* Price Trend Graph */}
      {analytics.trend_graph && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2">Price Trend</h3>
          <img 
            src={`data:image/png;base64,${analytics.trend_graph}`}
            alt="Price Trend"
            className="w-full"
          />
        </div>
      )}

      {/* Correlation Heatmap */}
      {analytics.correlation_heatmap && (
        <div>
          <h3 className="text-xl font-bold mb-2">Price Correlation Heatmap</h3>
          <img 
            src={`data:image/png;base64,${analytics.correlation_heatmap}`}
            alt="Correlation Heatmap"
            className="w-full"
          />
        </div>
      )}

      {/* Unusual Changes */}
      {analytics.unusual_changes?.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Unusual Price Changes</h3>
          <ul className="list-disc pl-5">
            {analytics.unusual_changes.map((change, index) => (
              <li key={index}>
                Month {change.Month}: {change['Price Change (%)'].toFixed(2)}% change
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalyticsSection;