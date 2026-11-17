import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ShieldCheck, Calculator, Lock, MessageCircle } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackWhatsAppClick, trackClientPortalClick } from '../utils/analytics';

export default function WhatsAppFloat() {
  const { buildWhatsAppUrl, setCentralMipModalOpen } = useSiteContent();
  const [activeBottomNav, setActiveBottomNav] = useState('inicio');
  const location = useLocation();
  const navigate = useNavigate();

  const goHash = (key, hashId) => {
    setActiveBottomNav(key);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hashId } });
    } else {
      document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating WhatsApp CTA (Desktop + Tablet) */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        aria-label="Contactar por WhatsApp"
        className="hidden md:flex fixed bottom-6 right-5 z-40 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-[0_8px_25px_rgba(16,185,129,0.35)] items-center gap-2 transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs font-bold">Cotizar por WhatsApp</span>
      </a>

      {/* Native Mobile Bottom Navigation Bar (< md) */}
      <nav
        aria-label="Navegación Móvil"
        className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-2 py-1.5 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.06)]"
      >
        <button
          onClick={() => {
            setActiveBottomNav('inicio');
            if (location.pathname !== '/') navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
            activeBottomNav === 'inicio' ? 'text-[#C41625] font-semibold' : 'text-neutral-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Inicio</span>
        </button>

        <button
          onClick={() => goHash('servicios', 'servicios')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
            activeBottomNav === 'servicios' ? 'text-[#C41625] font-semibold' : 'text-neutral-500'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">Servicios</span>
        </button>

        <button
          onClick={() => goHash('cotizar', 'cotizador')}
          className="flex flex-col items-center justify-center -mt-5 bg-[#C41625] text-white w-12 h-12 rounded-full shadow-[0_6px_18px_rgba(196,22,37,0.4)] active:scale-95 transition cursor-pointer"
          title="Cotizar en Línea"
        >
          <Calculator className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('clientes');
            trackClientPortalClick('mobile_bottom_bar');
            setCentralMipModalOpen(true);
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition cursor-pointer ${
            activeBottomNav === 'clientes' ? 'text-[#C41625] font-semibold' : 'text-neutral-500'
          }`}
        >
          <Lock className="w-5 h-5" />
          <span className="text-[10px]">Clientes</span>
        </button>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_bottom_bar')}
          className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-emerald-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
      </nav>
    </>
  );
}
