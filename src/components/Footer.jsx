import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, PhoneCall, Clock, Mail, Lock, FileCheck2, Settings } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackClientPortalClick, trackWhatsAppClick } from '../utils/analytics';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { config, buildWhatsAppUrl, setCentralMipModalOpen } = useSiteContent();
  const { company } = config;

  return (
    <footer id="contacto" className="bg-[#181818] text-white mt-12 border-t border-neutral-800 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Column 1: Brand, Legal Entity & Sanitary Resolutions */}
        <div className="md:col-span-5 space-y-3">
          <Link to="/" className="inline-block">
            <img src="/logo-patagonia.png" alt={company.brandName} className="h-11 w-auto" />
          </Link>

          <div>
            <p className="text-sm font-bold text-white">{company.brandName}</p>
            <p className="text-xs text-neutral-400 mt-0.5">{company.legalName}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 space-y-1.5 text-[11px] text-neutral-200">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ff6b78] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">{company.rexSanitaria}</p>
                <p className="text-neutral-300">{company.rexModificacion}</p>
                <p className="text-neutral-400 mt-0.5">
                  Director Técnico: <span className="text-neutral-200">{company.technicalDirector}</span> ({company.technicalDirectorRole.replace(' — Director Técnico', '')})
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Contact & Coverage */}
        <div className="md:col-span-4 space-y-2.5 text-xs text-neutral-300">
          <p className="font-bold text-white uppercase tracking-wider text-[11px]">Contacto Directo & Atención</p>

          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#ff6b78] shrink-0 mt-0.5" />
            <span>{company.address ? `${company.address}, ${company.cityRegion}` : company.cityRegion}</span>
          </p>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('footer')}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <PhoneCall className="w-4 h-4 text-[#ff6b78] shrink-0" />
            <span>WhatsApp y Teléfono: {company.whatsappDisplay}</span>
          </a>

          {company.email && (
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white transition">
              <Mail className="w-4 h-4 text-[#ff6b78] shrink-0" />
              <span>{company.email}</span>
            </a>
          )}

          <p className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-[#ff6b78] shrink-0 mt-0.5" />
            <span>{company.schedule}</span>
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                trackClientPortalClick('footer');
                setCentralMipModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#ff6b78]" />
              <span>Acceso Clientes (Central MIP)</span>
            </button>
          </div>
        </div>

        {/* Column 3: SEO Routes & Legal */}
        <div className="md:col-span-3 space-y-2 text-xs text-neutral-400">
          <p className="font-bold text-white uppercase tracking-wider text-[11px]">Enlaces & Servicios</p>
          <div className="flex flex-col gap-1.5">
            <Link to="/desratizacion-pre-demolicion-puerto-montt" className="hover:text-white transition text-[#ff6b78] font-medium">
              Desratización Pre-Demolición SEREMI
            </Link>
            <Link to="/servicios/desratizacion" className="hover:text-white transition">
              Desratización y Control de Roedores
            </Link>
            <Link to="/servicios/desinsectacion" className="hover:text-white transition">
              Desinsectación y Control de Insectos
            </Link>
            <Link to="/servicios/sanitizacion" className="hover:text-white transition">
              Sanitización y Desinfección
            </Link>
            <Link to="/servicios/manejo-integrado-de-plagas" className="hover:text-white transition">
              Manejo Integrado de Plagas (MIP)
            </Link>
            <Link to="/empresas" className="hover:text-white transition">
              Soluciones Empresas e Industrias
            </Link>
            <Link to="/politica-de-privacidad" className="hover:text-white transition inline-flex items-center gap-1 pt-1">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Política de Privacidad</span>
            </Link>
            <Link to="/admin" className="hover:text-neutral-200 transition inline-flex items-center gap-1 text-neutral-500">
              <Settings className="w-3 h-3" />
              <span>Administración del Sitio</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-5 sm:px-10 text-center text-[11px] text-neutral-500">
        © {CURRENT_YEAR} {company.brandName} · {company.legalName} · Puerto Montt, Región de Los Lagos, Chile.
      </div>
    </footer>
  );
}
