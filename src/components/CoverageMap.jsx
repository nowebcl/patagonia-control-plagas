import React, { useState } from 'react';
import { MapPin, ArrowRight, CheckCircle2, Compass } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

export default function CoverageMap({ onSelectComuna }) {
  const { config } = useSiteContent();
  const [activeId, setActiveId] = useState(config.coverageAreas[0]?.id || 'puerto-montt');

  const activeArea =
    config.coverageAreas.find((a) => a.id === activeId) || config.coverageAreas[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Interactive Geographic Schematic Map of Región de Los Lagos */}
      <div className="lg:col-span-6 bg-[#181818] text-white rounded-3xl p-4 sm:p-6 relative overflow-hidden border border-neutral-800 shadow-lg flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
        <div className="flex items-center justify-between gap-2 z-10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff6b78]">
              Mapa Interactivo de Cobertura
            </span>
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-white">
              Región de Los Lagos y Sur de Chile
            </h3>
          </div>
          <Compass className="w-6 h-6 text-white/30 shrink-0" />
        </div>

        {/* Clean SVG Geographic Canvas */}
        <div className="relative w-full h-[270px] sm:h-[310px] my-2 select-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
            aria-label="Mapa de cobertura Región de Los Lagos"
          >
            {/* Subtle grid & Ocean backdrop */}
            <rect x="0" y="0" width="100" height="100" rx="12" fill="#121215" />

            {/* Stylized Región de Los Lagos Mainland Silhouette */}
            <path
              d="M 22 6 L 78 6 L 82 28 L 76 46 L 72 64 L 68 80 L 58 84 L 54 67 L 43 68 L 36 74 L 22 68 L 20 48 L 24 24 Z"
              fill="#23242A"
              stroke="#343640"
              strokeWidth="0.8"
            />
            {/* Lago Llanquihue stylized outline */}
            <path
              d="M 54 45 C 58 43, 66 44, 67 51 C 68 56, 61 58, 56 54 C 53 51, 53 47, 54 45 Z"
              fill="#192A3D"
              stroke="#2C4A6E"
              strokeWidth="0.5"
            />
            {/* Seno de Reloncaví / Chiloé North Coastline */}
            <path
              d="M 16 77 L 39 76 L 44 88 L 41 96 L 17 96 L 13 86 Z"
              fill="#23242A"
              stroke="#343640"
              strokeWidth="0.8"
            />

            {/* Connecting coverage lines from Puerto Montt hub */}
            {config.coverageAreas.map((area) => {
              const isSelected = area.id === activeArea?.id;
              return (
                <line
                  key={`line-${area.id}`}
                  x1="49"
                  y1="63"
                  x2={area.x}
                  y2={area.y}
                  stroke={isSelected ? '#C41625' : '#ffffff'}
                  strokeOpacity={isSelected ? 0.8 : 0.1}
                  strokeWidth={isSelected ? 0.7 : 0.35}
                  strokeDasharray={isSelected ? 'none' : '1.2 1.2'}
                />
              );
            })}

            {/* Interactive Comuna Pins */}
            {config.coverageAreas.map((area) => {
              const isSelected = area.id === activeArea?.id;
              return (
                <g
                  key={area.id}
                  onClick={() => setActiveId(area.id)}
                  className="cursor-pointer"
                >
                  {isSelected && (
                    <circle
                      cx={area.x}
                      cy={area.y}
                      r="5.2"
                      fill="#C41625"
                      fillOpacity="0.28"
                    />
                  )}
                  <circle
                    cx={area.x}
                    cy={area.y}
                    r={isSelected ? 2.6 : area.primary ? 2.0 : 1.5}
                    fill={isSelected ? '#ff4d5e' : area.primary ? '#ffffff' : '#9ca3af'}
                    stroke="#181818"
                    strokeWidth="0.6"
                  />
                  <text
                    x={area.x + (area.x > 52 ? 2.8 : -2.8)}
                    y={area.y + 0.9}
                    textAnchor={area.x > 52 ? 'start' : 'end'}
                    fontSize={isSelected ? '3.3' : '2.6'}
                    fontWeight={isSelected ? '700' : '500'}
                    fill={isSelected ? '#ffffff' : '#d1d5db'}
                  >
                    {area.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Comuna Info Footer inside Map Card */}
        {activeArea && (
          <div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-10">
            <div>
              <div className="flex items-center gap-1.5">
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
            const isSelected = area.id === activeArea?.id;
            return (
              <button
                key={area.id}
                onClick={() => setActiveId(area.id)}
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
