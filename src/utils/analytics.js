const METRICS_KEY = 'patagonia_site_metrics_v1';

const getInitialMetrics = () => ({
  pageViews: 0,
  whatsappClicks: 0,
  quoteSubmissions: 0,
  clientPortalClicks: 0,
  serviceViews: {},
  lastEvents: []
});

export const loadLocalMetrics = () => {
  try {
    const raw = localStorage.getItem(METRICS_KEY);
    return raw ? { ...getInitialMetrics(), ...JSON.parse(raw) } : getInitialMetrics();
  } catch {
    return getInitialMetrics();
  }
};

const saveLocalMetrics = (updater) => {
  try {
    const current = loadLocalMetrics();
    const updated = updater(current);
    localStorage.setItem(METRICS_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota or private mode issues
  }
};

let initializedId = null;

export const initGA4 = (measurementId) => {
  if (!measurementId || typeof window === 'undefined') return;
  const cleanId = measurementId.trim();
  if (!cleanId || initializedId === cleanId) return;
  initializedId = cleanId;

  if (!document.querySelector(`script[data-ga4="${cleanId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(cleanId)}`;
    script.setAttribute('data-ga4', cleanId);
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', cleanId, { send_page_view: false });
};

const emitGAEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function' && initializedId) {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (path, title) => {
  emitGAEvent('page_view', {
    page_path: path,
    page_title: title
  });

  saveLocalMetrics((prev) => ({
    ...prev,
    pageViews: prev.pageViews + 1,
    lastEvents: [
      { type: 'page_view', label: path, at: new Date().toISOString() },
      ...(prev.lastEvents || []).slice(0, 19)
    ]
  }));
};

export const trackServiceView = (serviceSlug, serviceName) => {
  emitGAEvent('view_item', {
    item_id: serviceSlug,
    item_name: serviceName,
    item_category: 'Servicio Control de Plagas'
  });

  saveLocalMetrics((prev) => ({
    ...prev,
    serviceViews: {
      ...(prev.serviceViews || {}),
      [serviceName]: ((prev.serviceViews || {})[serviceName] || 0) + 1
    }
  }));
};

export const trackWhatsAppClick = (source) => {
  emitGAEvent('whatsapp_click', {
    event_category: 'Engagement',
    event_label: source
  });

  saveLocalMetrics((prev) => ({
    ...prev,
    whatsappClicks: prev.whatsappClicks + 1,
    lastEvents: [
      { type: 'whatsapp_click', label: source, at: new Date().toISOString() },
      ...(prev.lastEvents || []).slice(0, 19)
    ]
  }));
};

export const trackQuoteSubmit = (serviceName, comuna, isCustomQuote) => {
  emitGAEvent('generate_lead', {
    currency: 'CLP',
    service_name: serviceName,
    comuna,
    custom_quote: isCustomQuote
  });

  saveLocalMetrics((prev) => ({
    ...prev,
    quoteSubmissions: prev.quoteSubmissions + 1,
    lastEvents: [
      { type: 'quote_submit', label: `${serviceName} (${comuna})`, at: new Date().toISOString() },
      ...(prev.lastEvents || []).slice(0, 19)
    ]
  }));
};

export const trackClientPortalClick = (source) => {
  emitGAEvent('client_portal_click', {
    event_category: 'Central MIP',
    event_label: source
  });

  saveLocalMetrics((prev) => ({
    ...prev,
    clientPortalClicks: prev.clientPortalClicks + 1,
    lastEvents: [
      { type: 'central_mip', label: source, at: new Date().toISOString() },
      ...(prev.lastEvents || []).slice(0, 19)
    ]
  }));
};
