import React, { useState } from 'react';
import { ShieldAlert, Eye, X, Lock, Building2 } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function DocumentsSection() {
  const { config, setCentralMipModalOpen } = useSiteContent();
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <section id="documentacion" className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
            Respaldo y Trazabilidad
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
            Certificados, informes y documentación técnica
          </h2>
          <p className="text-neutral-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Entregamos documentación verificable conforme a normativa sanitaria, resguardando siempre la privacidad y los datos confidenciales de cada cliente.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCentralMipModalOpen(true)}
          className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-semibold px-5 py-2.5 rounded-full transition cursor-pointer shrink-0 w-fit"
        >
          <Lock className="w-3.5 h-3.5 text-[#C41625]" />
          <span>Consultar en Central MIP</span>
        </button>
      </div>

      {/* Clean Distinction Row: Company Certificates vs SEREMI Authority */}
      <div className="border-y border-neutral-200 py-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:divide-x md:divide-neutral-200">
        <div className="flex items-start gap-3.5 md:pr-6">
          <Building2 className="w-5 h-5 text-neutral-800 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-900">
              Documentación emitida por Control de Plagas Patagonia Chile
            </p>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Certificados técnicos de servicio, informes MIP, planos de estaciones cebaderas, registros de monitoreo y entrega de HDS bajo{' '}
              <strong>{config.company.rexSanitaria}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5 md:pl-6">
          <ShieldAlert className="w-5 h-5 text-[#C41625] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs sm:text-sm font-semibold text-neutral-900">
              Trámites con intervención de Autoridad Sanitaria (SEREMI)
            </p>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              En procedimientos como la <strong>Desratización Pre-Demolición</strong>, nuestro certificado técnico respalda la gestión de visación que corresponde exclusivamente a la <strong>SEREMI de Salud</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Minimalist Document List Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {config.documentsShowcase.map((doc) => (
          <div
            key={doc.id}
            className="border-t border-neutral-200 pt-5 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C41625]">
                {doc.category}
              </span>
              <h3 className="font-semibold text-sm sm:text-base text-neutral-900 mt-1">{doc.title}</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">{doc.issuer}</p>
              <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">{doc.desc}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDoc(doc)}
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#C41625] transition cursor-pointer w-fit"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver muestra anonimizada</span>
            </button>
          </div>
        ))}
      </div>

      {/* Anonymized Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
            <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#C41625] font-semibold">{selectedDoc.category}</p>
                <h4 className="font-editorial text-xl font-bold text-neutral-900">{selectedDoc.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDoc(null)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition cursor-pointer"
                aria-label="Cerrar muestra"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="bg-[#F8F8F7] border border-neutral-200 rounded-2xl p-4 space-y-2 text-xs font-mono text-neutral-700">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="font-bold text-neutral-900">{config.company.brandName}</span>
                  <span className="text-[10px] text-neutral-500">FOLIO: [EJEMPLO]</span>
                </div>
                <p>Razón Social: {config.company.legalName}</p>
                <p>Autorización: {config.company.rexSanitaria}</p>
                <p>Director Técnico: {config.company.technicalDirector}</p>
                <p>Cliente / Recinto: [DATO CONFIDENCIAL PROTEGIDO]</p>
                <div className="pt-2 border-t border-dashed border-neutral-300 font-sans text-neutral-800 leading-relaxed">
                  {selectedDoc.previewSummary}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDoc(null)}
                  className="bg-[#181818] hover:bg-neutral-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
