import React from 'react';
import LineChart from '../components/LineChart';

const ChartPage: React.FC = () => {
  return (
    <div className="p-4 space-y-8 max-h-90 overflow-y-auto">
      <h2 className="text-2xl font-bold">Dashboard - Case Fluctuations</h2>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold">Case Fluctuations</h3>
        <LineChart />
      </div>
    </div>
  );
};

export default ChartPage;
