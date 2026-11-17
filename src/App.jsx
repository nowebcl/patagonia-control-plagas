import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SiteContentProvider } from './context/SiteContentContext';
import CentralMipModal from './components/CentralMipModal';
import LandingPage from './pages/LandingPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PreDemolitionPage from './pages/PreDemolitionPage';
import CompaniesPage from './pages/CompaniesPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AdminPage from './pages/AdminPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <SiteContentProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CentralMipModal />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/servicios/:slug" element={<ServiceDetailPage />} />
          <Route path="/desratizacion-pre-demolicion-puerto-montt" element={<PreDemolitionPage />} />
          <Route path="/empresas" element={<CompaniesPage />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SiteContentProvider>
  );
}
