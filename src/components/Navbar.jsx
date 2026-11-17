import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Lock, PhoneCall, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackClientPortalClick } from '../utils/analytics';

export default function Navbar() {
  const { config, setCentralMipModalOpen } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashNav = (hashId) => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: hashId } });
    } else {
      document.getElementById(hashId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClientPortal = () => {
    setMenuOpen(false);
    trackClientPortalClick('navbar');
    setCentralMipModalOpen(true);
  };

  return (
    <>
      <header className="bg-[#181818] text-white rounded-b-[20px] md:rounded-none sticky top-0 z-40 shadow-md border-b border-white/10">
        {/* Top micro utility bar (desktop) */}
        <div className="hidden lg:block bg-[#111111] border-b border-white/10 text-[11px] text-neutral-300">
          <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ff6b78]" />
                {config.company.rexSanitaria} · {config.company.rexModificacion}
              </span>
            </div>
            <div className="flex items-center gap-5">
              <button onClick={() => handleHashNav('respaldo-sanitario')} className="hover:text-white transition cursor-pointer">
                Certificados y Respaldo Sanitario
              </button>
              <button onClick={() => handleHashNav('trabajos')} className="hover:text-white transition cursor-pointer">
                Nuestros Trabajos
              </button>
              <button onClick={() => handleHashNav('zonas')} className="hover:text-white transition cursor-pointer">
                Cobertura
              </button>
              <button onClick={() => handleHashNav('faq')} className="hover:text-white transition cursor-pointer">
                Preguntas Frecuentes
              </button>
              <button onClick={() => handleHashNav('contacto')} className="hover:text-white transition cursor-pointer">
                Contacto
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 md:py-3.5 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2.5 focus:outline-none shrink-0">
            <img
              src="/logo-patagonia.png"
              alt={config.company.brandName}
              className="h-9 sm:h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] text-neutral-200 font-medium">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`hover:text-white transition whitespace-nowrap ${
                location.pathname === '/' ? 'text-white font-semibold' : ''
              }`}
            >
              Inicio
            </Link>

            {/* Dropdown Servicios */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen((p) => !p)}
                className="inline-flex items-center gap-1 hover:text-white transition cursor-pointer whitespace-nowrap py-1"
              >
                <span>Servicios</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-2 w-80 z-50">
                  <div className="bg-white text-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 p-2.5 space-y-0.5">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      Todos nuestros servicios
                    </div>
                    {config.services.map((srv) => (
                      <Link
                        key={srv.id}
                        to={srv.route}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs font-medium text-neutral-800 hover:text-[#C41625] transition"
                      >
                        <span className="truncate pr-2">{srv.title}</span>
                        <ArrowRight className="w-3 h-3 shrink-0 opacity-50" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/empresas"
              className={`hover:text-white transition whitespace-nowrap ${
                location.pathname === '/empresas' ? 'text-white font-semibold' : ''
              }`}
            >
              Soluciones para Empresas
            </Link>

            <Link
              to="/desratizacion-pre-demolicion-puerto-montt"
              className={`hover:text-white transition whitespace-nowrap ${
                location.pathname === '/desratizacion-pre-demolicion-puerto-montt'
                  ? 'text-[#ff6b78] font-semibold'
                  : 'text-neutral-200'
              }`}
            >
              Desratización Pre-Demolición
            </Link>

            <button
              onClick={() => handleHashNav('cotizador')}
              className="hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              Cotizador
            </button>

            <button
              onClick={handleClientPortal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition cursor-pointer whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 text-[#ff6b78]" />
              <span>Acceso Clientes</span>
            </button>

            <button
              onClick={() => handleHashNav('cotizador')}
              className="bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer shadow-sm whitespace-nowrap"
            >
              Cotizar ahora
            </button>
          </nav>

          {/* Tablet/Mobile Quick Actions + Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={handleClientPortal}
              className="inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#ff6b78]" />
              <span>Clientes</span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="flex flex-col items-end justify-center gap-[5px] p-2 -mr-1 rounded-xl hover:bg-white/10 active:scale-95 transition cursor-pointer"
            >
              <span className="block w-8 h-[2px] bg-white rounded-full" />
              <span className="block w-6 h-[2px] bg-white rounded-full" />
              <span className="block w-4 h-[2px] bg-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-up">
          <div className="w-full max-w-xs bg-[#181818] text-white h-full p-5 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <img src="/logo-patagonia.png" alt={config.company.brandName} className="h-9 w-auto" />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-1 text-sm">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition"
                >
                  Inicio
                </Link>

                {/* Mobile Services Accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen((p) => !p)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                  >
                    <span>Servicios (9)</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-3 pr-1 py-1 space-y-0.5 border-l border-white/15 ml-3">
                      {config.services.map((srv) => (
                        <Link
                          key={srv.id}
                          to={srv.route}
                          onClick={() => setMenuOpen(false)}
                          className="block px-3 py-1.5 rounded-lg text-xs text-neutral-300 hover:text-white hover:bg-white/10 transition"
                        >
                          {srv.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/empresas"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition"
                >
                  Soluciones para Empresas
                </Link>

                <Link
                  to="/desratizacion-pre-demolicion-puerto-montt"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl bg-[#C41625]/20 border border-[#C41625]/40 text-white font-semibold transition"
                >
                  Desratización Pre-Demolición
                </Link>

                <button
                  onClick={() => handleHashNav('trabajos')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Nuestros Trabajos
                </button>

                <button
                  onClick={() => handleHashNav('respaldo-sanitario')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Certificados y Respaldo Sanitario
                </button>

                <button
                  onClick={() => handleHashNav('zonas')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Cobertura Territorial
                </button>

                <button
                  onClick={() => handleHashNav('cotizador')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Cotizador en Línea
                </button>

                <button
                  onClick={() => handleHashNav('faq')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Preguntas Frecuentes
                </button>

                <button
                  onClick={() => handleHashNav('contacto')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Contacto
                </button>

                <div className="pt-3 space-y-2">
                  <button
                    onClick={handleClientPortal}
                    className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#141414] text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#C41625]" />
                    <span>Acceso Clientes (Central MIP)</span>
                  </button>

                  <a
                    href={`tel:+${config.company.whatsappNumber}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C41625] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Llamar: {config.company.whatsappDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-neutral-400 space-y-1">
              <p className="font-semibold text-neutral-200">{config.company.brandName}</p>
              <p>{config.company.rexSanitaria}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
