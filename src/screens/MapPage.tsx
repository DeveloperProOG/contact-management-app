import React from 'react';
import MapComponent from '../components/MapComponent';

const MapPage: React.FC = () => {
  return (
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-bold">Dashboard - World Map</h2>
      <div className="bg-white p-4 rounded shadow-md">
        <h3 className="text-xl font-semibold">World Map</h3>
        <MapComponent />
      </div>
    </div>
  );
};

export default MapPage;
