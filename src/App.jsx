import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoDataProvider } from './context/DemoDataContext';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <DemoDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoDataProvider>
  );
}
