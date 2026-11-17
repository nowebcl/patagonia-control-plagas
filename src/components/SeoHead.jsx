import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';
import { trackPageView } from '../utils/analytics';

export default function SeoHead({ title, description, keywords, path, noIndex = false }) {
  const { config } = useSiteContent();
  const location = useLocation();

  useEffect(() => {
    const finalTitle = title || config.seo.homeTitle;
    const finalDesc = description || config.seo.homeDescription;
    const finalKeywords = keywords || config.seo.homeKeywords;
    const baseUrl = (config.company.domainUrl || 'https://patagonia-control-plagas.vercel.app').replace(/\/$/, '');
    const currentPath = path || location.pathname;
    const canonicalUrl = `${baseUrl}${currentPath === '/' ? '/' : currentPath}`;

    document.title = finalTitle;

    const updateMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.includes('property=')) {
          const prop = selector.match(/property="([^"]+)"/)?.[1];
          if (prop) el.setAttribute('property', prop);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    updateMeta('meta[name="robots"]', 'content', noIndex ? 'noindex, nofollow' : 'index, follow');
    updateMeta('meta[name="description"]', 'content', finalDesc);
    updateMeta('meta[name="keywords"]', 'content', finalKeywords);
    updateMeta('meta[property="og:title"]', 'content', finalTitle);
    updateMeta('meta[property="og:description"]', 'content', finalDesc);
    updateMeta('meta[property="og:url"]', 'content', canonicalUrl);
    updateMeta('meta[property="twitter:title"]', 'content', finalTitle);
    updateMeta('meta[property="twitter:description"]', 'content', finalDesc);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }

    if (!noIndex) {
      trackPageView(currentPath, finalTitle);
    }
  }, [title, description, keywords, path, noIndex, location.pathname, config.seo, config.company.domainUrl]);

  return null;
}
