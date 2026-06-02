import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import CropPrediction from './pages/CropPrediction';
import FertilizerPrediction from './pages/FertilizerPrediction';
import DiseaseDetection from './pages/DiseaseDetection';
import DataHub from './pages/DataHub';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/crop-prediction" element={<CropPrediction />} />
            <Route path="/fertilizer-prediction" element={<FertilizerPrediction />} />
            <Route path="/disease-detection" element={<DiseaseDetection />} />
            <Route path="/data-hub" element={<DataHub />} />
          </Routes>
        </main>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
