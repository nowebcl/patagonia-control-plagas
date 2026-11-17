import React, { useState } from 'react';
import { FileCheck2, ShieldAlert, Eye, X, Lock, Building2, FileText } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function DocumentsSection() {
  const { config, setCentralMipModalOpen } = useSiteContent();
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <section id="documentacion" className="py-12 md:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
            <FileCheck2 className="w-3.5 h-3.5" /> Respaldo & Trazabilidad
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-2">
            Certificados, informes y documentación técnica
          </h2>
          <p className="text-neutral-600 text-sm mt-2 max-w-2xl leading-relaxed">
            Entregamos documentación verificable conforme a normativa sanitaria, resguardando siempre la privacidad y los datos confidenciales de cada cliente.
          </p>
        </div>

        <button
          onClick={() => setCentralMipModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#181818] hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition cursor-pointer shrink-0 w-fit"
        >
          <Lock className="w-3.5 h-3.5 text-[#ff6b78]" />
          <span>Consultar en Central MIP</span>
        </button>
      </div>

      {/* Distinction Callout: Company Certificates vs SEREMI Authority */}
      <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 mb-7 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#181818] text-white flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-[#ff6b78]" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-900">
              Documentación emitida por Control de Plagas Patagonia Chile
            </p>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              Certificados técnicos de servicio, informes MIP, planos de estaciones cebaderas, registros de monitoreo y entrega de HDS bajo{' '}
              <strong>{config.company.rexSanitaria}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C41625]/10 text-[#C41625] flex items-center justify-center shrink-0 border border-[#C41625]/20">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-900">
              Trámites con intervención de Autoridad Sanitaria (SEREMI)
            </p>
            <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
              En procedimientos como la <strong>Desratización Pre-Demolición</strong>, nuestro certificado técnico respalda la gestión de visación que corresponde exclusivamente a la <strong>SEREMI de Salud</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Document Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {config.documentsShowcase.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between hover:border-[#C41625]/40 hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                  {doc.category}
                </span>
                <FileText className="w-4 h-4 text-[#C41625]" />
              </div>

              <h3 className="font-bold text-sm text-neutral-900">{doc.title}</h3>
              <p className="text-[11px] font-medium text-[#C41625] mt-0.5">{doc.issuer}</p>
              <p className="text-xs text-neutral-600 mt-2.5 leading-relaxed">{doc.desc}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDoc(doc)}
              className="mt-4 pt-3 border-t border-neutral-100 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#C41625] transition cursor-pointer w-fit"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver ficha de muestra anonimizada</span>
            </button>
          </div>
        ))}
      </div>

      {/* Anonymized Preview Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] max-w-lg w-full overflow-hidden shadow-2xl border border-neutral-200">
            <div className="bg-[#181818] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#ff6b78] font-bold">{selectedDoc.category}</p>
                <h4 className="font-editorial text-lg font-bold">{selectedDoc.title}</h4>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                aria-label="Cerrar muestra"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2.5 text-xs font-mono text-neutral-700">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <span className="font-bold text-neutral-900">{config.company.brandName}</span>
                  <span className="text-[10px] bg-neutral-200 px-2 py-0.5 rounded">FOLIO: [EJEMPLO]</span>
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
                  onClick={() => setSelectedDoc(null)}
                  className="bg-[#181818] hover:bg-neutral-800 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition cursor-pointer"
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
