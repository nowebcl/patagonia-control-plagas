import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Lock, PhoneCall, X, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackClientPortalClick } from '../utils/analytics';

export default function Navbar() {
  const { config, setCentralMipModalOpen } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleHashNav = (hashId) => {
    setMenuOpen(false);
    setServicesDropdownOpen(false);
    setMoreDropdownOpen(false);
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
      <header className="bg-[#181818]/98 backdrop-blur-md text-white sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 focus:outline-none shrink-0">
            <img
              src="/logo-patagonia.png"
              alt={config.company.brandName}
              className="h-9 sm:h-10 md:h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop Single-Row Minimal Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-[13px] text-neutral-300 font-medium">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`hover:text-white transition whitespace-nowrap ${
                location.pathname === '/' ? 'text-white' : ''
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
                type="button"
                onClick={() => setServicesDropdownOpen((p) => !p)}
                className="inline-flex items-center gap-1 hover:text-white transition cursor-pointer whitespace-nowrap py-2"
              >
                <span>Servicios</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-80 z-50">
                  <div className="bg-white text-neutral-900 rounded-2xl shadow-xl border border-neutral-200/80 p-2 space-y-0.5">
                    {config.services.map((srv) => (
                      <Link
                        key={srv.id}
                        to={srv.route}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center justify-between px-3.5 py-2 rounded-xl hover:bg-neutral-50 text-xs font-medium text-neutral-700 hover:text-[#C41625] transition"
                      >
                        <span className="truncate pr-2">{srv.title}</span>
                        <ArrowRight className="w-3 h-3 shrink-0 opacity-40" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/empresas"
              className={`hover:text-white transition whitespace-nowrap ${
                location.pathname === '/empresas' ? 'text-white' : ''
              }`}
            >
              Empresas
            </Link>

            <Link
              to="/desratizacion-pre-demolicion-puerto-montt"
              className={`hover:text-white transition whitespace-nowrap ${
                location.pathname === '/desratizacion-pre-demolicion-puerto-montt'
                  ? 'text-[#ff8690]'
                  : ''
              }`}
            >
              Pre-Demolición
            </Link>

            <button
              type="button"
              onClick={() => handleHashNav('trabajos')}
              className="hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              Trabajos
            </button>

            <button
              type="button"
              onClick={() => handleHashNav('zonas')}
              className="hover:text-white transition cursor-pointer whitespace-nowrap"
            >
              Cobertura
            </button>

            {/* Dropdown Respaldo & Info */}
            <div
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreDropdownOpen((p) => !p)}
                className="inline-flex items-center gap-1 hover:text-white transition cursor-pointer whitespace-nowrap py-2"
              >
                <span>Respaldo</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 top-full pt-1.5 w-64 z-50">
                  <div className="bg-white text-neutral-900 rounded-2xl shadow-xl border border-neutral-200/80 p-2 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => handleHashNav('respaldo-sanitario')}
                      className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-neutral-50 text-xs font-medium text-neutral-700 hover:text-[#C41625] transition cursor-pointer"
                    >
                      Autorización Sanitaria SEREMI
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHashNav('documentacion')}
                      className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-neutral-50 text-xs font-medium text-neutral-700 hover:text-[#C41625] transition cursor-pointer"
                    >
                      Certificados y Documentación
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHashNav('faq')}
                      className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-neutral-50 text-xs font-medium text-neutral-700 hover:text-[#C41625] transition cursor-pointer"
                    >
                      Preguntas Frecuentes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHashNav('contacto')}
                      className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-neutral-50 text-xs font-medium text-neutral-700 hover:text-[#C41625] transition cursor-pointer"
                    >
                      Contacto Directo
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2.5 pl-2 border-l border-white/15">
              <button
                type="button"
                onClick={handleClientPortal}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full border border-white/20 hover:border-white/40 text-white transition cursor-pointer whitespace-nowrap"
              >
                <Lock className="w-3 h-3 text-[#ff8690]" />
                <span>Acceso Clientes</span>
              </button>

              <button
                type="button"
                onClick={() => handleHashNav('cotizador')}
                className="bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer whitespace-nowrap"
              >
                Cotizador
              </button>
            </div>
          </nav>

          {/* Mobile Quick Actions + Minimal Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={handleClientPortal}
              className="inline-flex items-center gap-1.5 border border-white/20 text-white text-[11px] font-medium px-3 py-1.5 rounded-full transition cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#ff8690]" />
              <span>Clientes</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="flex flex-col items-end justify-center gap-[5px] p-2 -mr-1 rounded-xl hover:bg-white/10 transition cursor-pointer"
            >
              <span className="block w-7 h-[1.5px] bg-white rounded-full" />
              <span className="block w-5 h-[1.5px] bg-white rounded-full" />
              <span className="block w-3.5 h-[1.5px] bg-white rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-[#181818] text-white h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <img src="/logo-patagonia.png" alt={config.company.brandName} className="h-9 w-auto" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 space-y-1 text-sm">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition"
                >
                  Inicio
                </Link>

                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((p) => !p)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                  >
                    <span>Servicios</span>
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
                  className="block px-3 py-2.5 rounded-xl text-[#ff8690] hover:bg-white/10 font-medium transition"
                >
                  Desratización Pre-Demolición
                </Link>

                <button
                  type="button"
                  onClick={() => handleHashNav('trabajos')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Nuestros Trabajos
                </button>

                <button
                  type="button"
                  onClick={() => handleHashNav('respaldo-sanitario')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Certificados y Respaldo Sanitario
                </button>

                <button
                  type="button"
                  onClick={() => handleHashNav('zonas')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Cobertura
                </button>

                <button
                  type="button"
                  onClick={() => handleHashNav('cotizador')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Cotizador
                </button>

                <button
                  type="button"
                  onClick={() => handleHashNav('faq')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Preguntas Frecuentes
                </button>

                <button
                  type="button"
                  onClick={() => handleHashNav('contacto')}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/10 font-medium transition cursor-pointer"
                >
                  Contacto
                </button>

                <div className="pt-4 space-y-2.5">
                  <button
                    type="button"
                    onClick={handleClientPortal}
                    className="w-full inline-flex items-center justify-center gap-2 bg-white text-[#141414] text-xs font-semibold py-2.5 px-4 rounded-full transition cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#C41625]" />
                    <span>Acceso Clientes (Central MIP)</span>
                  </button>

                  <a
                    href={`tel:+${config.company.whatsappNumber}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#C41625] text-white text-xs font-semibold py-2.5 px-4 rounded-full transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{config.company.whatsappDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-white/10 text-[11px] text-neutral-400 space-y-1">
              <p className="font-medium text-neutral-200">{config.company.brandName}</p>
              <p>{config.company.rexSanitaria}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
