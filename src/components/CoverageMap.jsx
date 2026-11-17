import React, { useState } from 'react';
import { MapPin, ArrowRight, Globe, ExternalLink } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function CoverageMap({ onSelectComuna }) {
  const { config } = useSiteContent();
  const [activeId, setActiveId] = useState(config.coverageAreas[0]?.id || 'puerto-montt');
  const [regionalView, setRegionalView] = useState(false);

  const activeArea =
    config.coverageAreas.find((a) => a.id === activeId) || config.coverageAreas[0];

  const mapQuery = regionalView
    ? 'Región de Los Lagos, Chile'
    : `${activeArea?.name || 'Puerto Montt'}${activeArea?.id === 'alerce' ? ', Puerto Montt' : ''}, Región de Los Lagos, Chile`;

  const mapZoom = regionalView ? 8 : activeArea?.id === 'puerto-montt' ? 11 : 12;

  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&hl=es&z=${mapZoom}&output=embed`;

  const externalMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;

  const handleSelectArea = (id) => {
    setActiveId(id);
    setRegionalView(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Light Clean Google Maps Card */}
      <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/80 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#C41625]">
              Google Maps
            </span>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-neutral-900">
              {regionalView ? 'Región de Los Lagos' : `${activeArea?.name}, Los Lagos`}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setRegionalView((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-full border transition cursor-pointer ${
                regionalView
                  ? 'bg-[#181818] border-[#181818] text-white'
                  : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{regionalView ? 'Ver comuna' : 'Vista regional'}</span>
            </button>

            <a
              href={externalMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir en Google Maps"
              className="p-2 rounded-full border border-neutral-200 hover:bg-neutral-100 text-neutral-600 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="relative w-full h-[260px] sm:h-[300px] rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-100">
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={`Mapa de cobertura en ${mapQuery}`}
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        {activeArea && (
          <div className="pt-2 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[#C41625] shrink-0" />
                <span className="text-xs font-semibold text-neutral-900">{activeArea.name}</span>
                <span className="text-[11px] text-neutral-400">· Provincia de {activeArea.province}</span>
              </div>
              <p className="text-xs text-neutral-600 mt-1 leading-snug">{activeArea.detail}</p>
            </div>
            {onSelectComuna && (
              <button
                type="button"
                onClick={() => onSelectComuna(activeArea.name)}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-semibold px-4 py-2 rounded-full transition cursor-pointer"
              >
                <span>Cotizar aquí</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Minimal Comunas Selector */}
      <div className="lg:col-span-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {config.coverageAreas.map((area) => {
            const isSelected = !regionalView && area.id === activeArea?.id;
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelectArea(area.id)}
                className={`text-left rounded-xl px-3.5 py-3 border transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] text-white border-[#181818]'
                    : 'bg-white border-neutral-200/80 hover:border-neutral-400 text-neutral-900'
                }`}
              >
                <span className="text-xs font-semibold block truncate">{area.name}</span>
                <span
                  className={`block text-[10px] mt-0.5 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-400'
                  }`}
                >
                  {area.province}
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-t border-neutral-200 pt-4 space-y-1.5">
          <p className="text-xs font-semibold text-neutral-900">
            Cobertura ampliada en la Región de Los Lagos y Sur de Chile
          </p>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Además de las comunas y localidades destacadas (<strong>Puerto Montt, Alerce, Puerto Varas, Llanquihue, Frutillar, Calbuco, Los Muermos, Maullín, Osorno, Río Negro, Ancud y Castro</strong>), atendemos otras zonas del sur de Chile previa coordinación técnica y comercial.
          </p>
        </div>
      </div>
    </div>
  );
}
