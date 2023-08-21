import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ChartsAndMaps from './components/ChartsAndMaps';
import ContactForm from './components/ContactFrom';
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';
import EditContact from './components/EditContact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        </div>
        <div className="flex-grow">
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ContactList contacts={[]}/>} />
              <Route path="/charts-and-maps" element={<ChartsAndMaps />} />
              <Route path="/create" element={<ContactForm />} />
              <Route
                path="/edit/:id"
                element={<EditContact />} // Pass id prop
              />
            </Routes>
          </div>
        </div>
      
    </Router>
  );
};

export default App;
