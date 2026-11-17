import React from 'react';
import { X, Lock, ExternalLink, CheckCircle2, MessageCircle, FileText } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackClientPortalClick, trackWhatsAppClick } from '../utils/analytics';

export default function CentralMipModal() {
  const { config, centralMipModalOpen, setCentralMipModalOpen, buildWhatsAppUrl } = useSiteContent();

  if (!centralMipModalOpen) return null;

  const portalUrl = (config.company.centralMipUrl || '').trim();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[28px] sm:rounded-3xl p-5 sm:p-7 shadow-2xl animate-drawer-up max-h-[90vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-3 sm:hidden" />

        <div className="flex items-start justify-between gap-4 border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#181818] text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-[#ff6b78]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C41625]">
                Plataforma Central MIP
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-neutral-900">
                Acceso Clientes
              </h2>
            </div>
          </div>

          <button
            onClick={() => setCentralMipModalOpen(false)}
            aria-label="Cerrar modal"
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            A través del portal seguro de <strong>Central MIP</strong>, nuestros clientes empresariales, condominios e instituciones pueden ingresar con sus credenciales asignadas para consultar en línea la documentación de sus instalaciones:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5">
            {config.centralMipFeatures.map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-[11.5px] text-neutral-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {portalUrl ? (
            <div className="space-y-2.5 pt-1">
              <a
                href={portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClientPortalClick('modal_direct_link')}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-semibold py-3.5 px-6 rounded-full shadow-md transition"
              >
                <span>Ingresar al Portal Central MIP</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-neutral-500">
                Se abrirá en una nueva pestaña el acceso seguro con usuario y contraseña de Central MIP.
              </p>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <FileText className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Portal de acceso en coordinación de credenciales</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-amber-800">
                Si ya eres cliente con contrato o plan MIP y necesitas tu enlace directo o credenciales de ingreso a Central MIP, solicítalo directamente por WhatsApp.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-neutral-100">
            <a
              href={buildWhatsAppUrl(
                'Hola, necesito solicitar o recuperar mis credenciales de Acceso Clientes en Central MIP.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('central_mip_modal')}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-full transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Solicitar / Recuperar Credenciales</span>
            </a>
            <button
              onClick={() => setCentralMipModalOpen(false)}
              className="sm:w-28 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold py-2.5 px-4 rounded-full transition cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
