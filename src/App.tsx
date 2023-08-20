// App.tsx
import React from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChartsAndMaps from './components/ChartsAndMaps';
import ContactForm from './components/ContactFrom';
import Sidebar from './components/Sidebar';


const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ContactForm />} />
              <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>

  );
};

export default App;
