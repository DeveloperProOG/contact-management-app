import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactPage from './screens/ContactPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import 'leaflet/dist/leaflet.css';
import ChartPage from './screens/ChartPage';
import MapPage from './screens/MapPage';
const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<ContactPage />} />
              <Route path="/chart" element={<ChartPage />} />
            <Route path="/map" element={<MapPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
