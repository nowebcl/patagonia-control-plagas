import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_CONFIG } from '../data/siteConfig';
import { initGA4 } from '../utils/analytics';

const CONFIG_STORAGE_KEY = 'patagonia_site_config_v2';
const QUOTES_STORAGE_KEY = 'patagonia_quote_requests_v1';

const SiteContentContext = createContext(null);

const mergeConfig = (stored) => {
  if (!stored || typeof stored !== 'object') return DEFAULT_SITE_CONFIG;
  return {
    ...DEFAULT_SITE_CONFIG,
    ...stored,
    company: { ...DEFAULT_SITE_CONFIG.company, ...(stored.company || {}) },
    seo: { ...DEFAULT_SITE_CONFIG.seo, ...(stored.seo || {}) },
    preDemolition: { ...DEFAULT_SITE_CONFIG.preDemolition, ...(stored.preDemolition || {}) },
    services: Array.isArray(stored.services) && stored.services.length > 0 ? stored.services : DEFAULT_SITE_CONFIG.services,
    gallery: Array.isArray(stored.gallery) && stored.gallery.length > 0 ? stored.gallery : DEFAULT_SITE_CONFIG.gallery,
    coverageAreas:
      Array.isArray(stored.coverageAreas) && stored.coverageAreas.length > 0
        ? stored.coverageAreas
        : DEFAULT_SITE_CONFIG.coverageAreas,
    documentsShowcase:
      Array.isArray(stored.documentsShowcase) && stored.documentsShowcase.length > 0
        ? stored.documentsShowcase
        : DEFAULT_SITE_CONFIG.documentsShowcase,
    reviews: Array.isArray(stored.reviews) && stored.reviews.length > 0 ? stored.reviews : DEFAULT_SITE_CONFIG.reviews
  };
};

export function SiteContentProvider({ children }) {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      return saved ? mergeConfig(JSON.parse(saved)) : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  const [quoteRequests, setQuoteRequests] = useState(() => {
    try {
      const saved = localStorage.getItem(QUOTES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [centralMipModalOpen, setCentralMipModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState('desinsectacion');

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    } catch {
      // Ignore storage limit errors
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quoteRequests));
    } catch {
      // Ignore storage limit errors
    }
  }, [quoteRequests]);

  useEffect(() => {
    if (config.company?.analyticsId) {
      initGA4(config.company.analyticsId);
    }
  }, [config.company?.analyticsId]);

  const updateCompany = (partial) => {
    setConfig((prev) => ({
      ...prev,
      company: { ...prev.company, ...partial }
    }));
  };

  const updateService = (serviceId, partial) => {
    setConfig((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === serviceId ? { ...s, ...partial } : s))
    }));
  };

  const addGalleryItem = (item) => {
    setConfig((prev) => ({
      ...prev,
      gallery: [{ ...item, id: `gal-${Date.now()}` }, ...prev.gallery]
    }));
  };

  const removeGalleryItem = (id) => {
    setConfig((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id)
    }));
  };

  const addReview = (review) => {
    setConfig((prev) => ({
      ...prev,
      reviews: [{ ...review, id: `rev-${Date.now()}`, verifiedPlaceholder: false }, ...prev.reviews]
    }));
  };

  const removeReview = (id) => {
    setConfig((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id)
    }));
  };

  const addCoverageArea = (area) => {
    setConfig((prev) => ({
      ...prev,
      coverageAreas: [...prev.coverageAreas, { ...area, id: `area-${Date.now()}` }]
    }));
  };

  const removeCoverageArea = (id) => {
    setConfig((prev) => ({
      ...prev,
      coverageAreas: prev.coverageAreas.filter((a) => a.id !== id)
    }));
  };

  const addDocumentItem = (doc) => {
    setConfig((prev) => ({
      ...prev,
      documentsShowcase: [...prev.documentsShowcase, { ...doc, id: `doc-${Date.now()}` }]
    }));
  };

  const updateDocumentItem = (docId, partial) => {
    setConfig((prev) => ({
      ...prev,
      documentsShowcase: prev.documentsShowcase.map((d) => (d.id === docId ? { ...d, ...partial } : d))
    }));
  };

  const removeDocumentItem = (docId) => {
    setConfig((prev) => ({
      ...prev,
      documentsShowcase: prev.documentsShowcase.filter((d) => d.id !== docId)
    }));
  };

  const addQuoteRequest = (payload) => {
    const record = {
      id: `COT-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString(),
      status: 'Enviada por WhatsApp',
      ...payload
    };
    setQuoteRequests((prev) => [record, ...prev]);
    return record;
  };

  const importConfigJson = (rawJson) => {
    const parsed = JSON.parse(rawJson);
    setConfig(mergeConfig(parsed));
  };

  const resetConfigToDefault = () => {
    localStorage.removeItem(CONFIG_STORAGE_KEY);
    setConfig(DEFAULT_SITE_CONFIG);
  };

  const buildWhatsAppUrl = (message) => {
    const phone = (config.company?.whatsappNumber || '56978666690').replace(/\D/g, '');
    const defaultMsg = `Hola ${config.company?.brandName || 'Control de Plagas Patagonia Chile'}, necesito solicitar información / cotización sobre sus servicios.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message || defaultMsg)}`;
  };

  return (
    <SiteContentContext.Provider
      value={{
        config,
        setConfig,
        updateCompany,
        updateService,
        addGalleryItem,
        removeGalleryItem,
        addReview,
        removeReview,
        addCoverageArea,
        removeCoverageArea,
        addDocumentItem,
        updateDocumentItem,
        removeDocumentItem,
        quoteRequests,
        addQuoteRequest,
        importConfigJson,
        resetConfigToDefault,
        buildWhatsAppUrl,
        centralMipModalOpen,
        setCentralMipModalOpen,
        preselectedServiceId,
        setPreselectedServiceId
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error('useSiteContent must be used inside SiteContentProvider');
  return ctx;
}
