import React, { useState } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Globe, ExternalLink } from 'lucide-react';
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Real Interactive Google Maps Embed Card */}
      <div className="lg:col-span-6 bg-[#181818] text-white rounded-3xl p-4 sm:p-6 relative overflow-hidden border border-neutral-800 shadow-lg flex flex-col justify-between gap-3 min-h-[400px] sm:min-h-[450px]">
        <div className="flex flex-wrap items-center justify-between gap-2 z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b78]">
              Mapa de Cobertura en Google Maps
            </span>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
              {regionalView ? 'Región de Los Lagos' : `${activeArea?.name}, Los Lagos`}
            </h3>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setRegionalView((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-full border transition cursor-pointer ${
                regionalView
                  ? 'bg-[#C41625] border-[#C41625] text-white'
                  : 'bg-white/10 hover:bg-white/20 border-white/15 text-neutral-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{regionalView ? 'Ver comuna' : 'Ver región'}</span>
            </button>

            <a
              href={externalMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir en Google Maps"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-neutral-200 transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Google Maps Iframe */}
        <div className="relative w-full h-[250px] sm:h-[290px] rounded-2xl overflow-hidden border border-white/15 bg-neutral-900">
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

        {/* Selected Comuna Info Footer inside Map Card */}
        {activeArea && (
          <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-10">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-[#ff6b78] shrink-0" />
                <span className="text-xs font-bold text-white">{activeArea.name}</span>
                <span className="text-[10px] text-neutral-300 bg-white/10 px-2 py-0.5 rounded-full">
                  Provincia de {activeArea.province}
                </span>
              </div>
              <p className="text-[11px] text-neutral-300 mt-1 leading-snug">{activeArea.detail}</p>
            </div>
            {onSelectComuna && (
              <button
                type="button"
                onClick={() => onSelectComuna(activeArea.name)}
                className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-[#C41625] hover:bg-[#a6121f] text-white text-[11px] font-semibold px-3.5 py-2 rounded-full transition cursor-pointer"
              >
                <span>Cotizar aquí</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Comunas Grid Selector */}
      <div className="lg:col-span-6 flex flex-col justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {config.coverageAreas.map((area) => {
            const isSelected = !regionalView && area.id === activeArea?.id;
            return (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelectArea(area.id)}
                className={`text-left rounded-2xl p-3 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] text-white border-[#181818] shadow-md'
                    : 'bg-neutral-50 border-neutral-200/90 hover:border-[#C41625] text-neutral-900'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#ff6b78]' : 'text-[#C41625]'}`}
                  />
                  <span className="text-xs font-bold truncate">{area.name}</span>
                </div>
                <span
                  className={`block text-[10px] mt-1 pl-5 ${
                    isSelected ? 'text-neutral-300' : 'text-neutral-500'
                  }`}
                >
                  {area.province}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
            <CheckCircle2 className="w-4 h-4 text-[#C41625] shrink-0" />
            <span>Cobertura ampliada en la Región de Los Lagos y Sur de Chile</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Además de las 12 comunas y localidades destacadas (<strong>Puerto Montt, Alerce, Puerto Varas, Llanquihue, Frutillar, Calbuco, Los Muermos, Maullín, Osorno, Río Negro, Ancud y Castro</strong>), atendemos otras comunas de la Región de Los Lagos y zonas del sur de Chile previa coordinación técnica y comercial.
          </p>
        </div>
      </div>
    </div>
  );
}
