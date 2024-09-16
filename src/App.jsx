// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Component/Dashboard';
import AddRecord from './Component/AddRecord';
import RecordDetail from './Component/RecordDetail';
import { ThemeProvider } from './Component/Context/Theme'; // Import the ThemeProvider
import NavigationBar from './Component/NavigationBar';
import Footer from './Component/Footer';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <NavigationBar />

          {/* Main Content - flex-grow ensures this fills the remaining space */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddRecord />} />
              <Route path="/record/:id" element={<RecordDetail />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
