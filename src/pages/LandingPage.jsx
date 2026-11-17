import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Calculator,
  Lock,
  Building2,
  CheckCircle2,
  Star,
  ExternalLink,
  ChevronDown,
  Camera,
  PhoneCall,
  MapPin,
  FileCheck2
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackClientPortalClick, trackWhatsAppClick } from '../utils/analytics';
import { CockroachIcon, SpiderIcon, RodentIcon, MosquitoIcon } from '../components/PestIcons';
import SeoHead from '../components/SeoHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import DocumentsSection from '../components/DocumentsSection';
import CoverageMap from '../components/CoverageMap';
import QuoterSection from '../components/QuoterSection';

const INTERACTIVE_PESTS = [
  {
    id: 'rat',
    label: 'Roedores',
    sub: 'Ratas y ratones',
    serviceId: 'desratizacion',
    icon: RodentIcon,
    note: 'Instalación de estaciones cebaderas ancladas con llave, rotuladas y con productos registrados ante el ISP.'
  },
  {
    id: 'spider',
    label: 'Araña de rincón',
    sub: 'Arácnidos y rastreros',
    serviceId: 'desinsectacion',
    icon: SpiderIcon,
    note: 'Tratamientos focalizados según características constructivas de la vivienda o local, con indicaciones claras de reingreso.'
  },
  {
    id: 'cockroach',
    label: 'Cucarachas',
    sub: 'Insectos en cocinas',
    serviceId: 'desinsectacion',
    icon: CockroachIcon,
    note: 'Aplicación de geles insecticidas específicos o aspersión controlada para áreas residenciales y gastronómicas.'
  },
  {
    id: 'mosquito',
    label: 'Voladores / Sanitización',
    sub: 'Moscas y desinfección',
    serviceId: 'sanitizacion',
    icon: MosquitoIcon,
    note: 'Control ambiental de insectos voladores y desinfección técnica con respaldo documental.'
  }
];

export default function LandingPage() {
  const { config, setPreselectedServiceId, setCentralMipModalOpen, buildWhatsAppUrl } = useSiteContent();
  const location = useLocation();
  const [activePestId, setActivePestId] = useState('rat');
  const [mobileServiceIdx, setMobileServiceIdx] = useState(0);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('Todos');
  const [openFaqIdx, setOpenFaqIdx] = useState(0);
  const [selectedComuna, setSelectedComuna] = useState('');
  const [comunaTick, setComunaTick] = useState(0);

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      const timer = setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const activePest = INTERACTIVE_PESTS.find((p) => p.id === activePestId) || INTERACTIVE_PESTS[0];
  const mobileActiveService = config.services[mobileServiceIdx] || config.services[0];

  const galleryCategories = ['Todos', ...Array.from(new Set(config.gallery.map((g) => g.category)))];
  const filteredGallery =
    galleryFilter === 'Todos'
      ? config.gallery
      : config.gallery.filter((item) => item.category === galleryFilter);

  const jumpToQuoter = (serviceId, comunaOverride = '') => {
    if (serviceId) setPreselectedServiceId(serviceId);
    if (comunaOverride) {
      setSelectedComuna(comunaOverride);
      setComunaTick((t) => t + 1);
    }
    document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818] overflow-x-hidden">
      <SeoHead
        title={config.seo.homeTitle}
        description={config.seo.homeDescription}
        keywords={config.seo.homeKeywords}
        path="/"
      />

      <Navbar />

      {/* 1. HERO EDITORIAL — Compact Mobile Fit & Desktop Composition */}
      <section className="relative bg-[#181818] text-white pt-5 pb-8 sm:pt-10 sm:pb-14 md:pt-12 md:pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left Column: Title, Sanitary Badge & Actions */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-5 z-10">
            <div className="inline-flex items-center gap-1.5 bg-[#C41625]/20 border border-[#C41625]/40 text-[#ff8690] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff6b78] shrink-0" />
              <span>{config.company.rexSanitaria} · SEREMI Los Lagos</span>
            </div>

            <h1 className="font-editorial text-[1.65rem] sm:text-4xl lg:text-[2.85rem] font-bold leading-[1.15] tracking-tight text-white">
              Control de Plagas Profesional en{' '}
              <span className="text-[#ff6b78]">Puerto Montt</span> y la Región de Los Lagos
            </h1>

            <p className="text-neutral-300 text-xs sm:text-base leading-relaxed max-w-xl">
              Desratización, desinsectación, sanitización, certificado pre-demolición y programas de Manejo Integrado de Plagas (MIP) para hogares, condominios, empresas e industrias.
            </p>

            {/* Primary CTA Buttons (compact on mobile) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => jumpToQuoter(activePest.serviceId)}
                className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-bold px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full shadow-lg transition cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Solicitar cotización</span>
              </button>

              <button
                onClick={() => {
                  trackClientPortalClick('hero');
                  setCentralMipModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-full transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#ff6b78]" />
                <span>Acceso Clientes</span>
              </button>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white px-3 py-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{config.company.whatsappDisplay}</span>
              </a>
            </div>

            {/* Compact Interactive 4-Pest Selector */}
            <div className="pt-2">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-neutral-400 mb-2">
                ¿Qué problema deseas controlar hoy?
              </p>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
                {INTERACTIVE_PESTS.map((pest) => {
                  const IconComp = pest.icon;
                  const active = activePestId === pest.id;
                  return (
                    <button
                      key={pest.id}
                      type="button"
                      onClick={() => {
                        setActivePestId(pest.id);
                        setPreselectedServiceId(pest.serviceId);
                      }}
                      className={`p-2 sm:p-3 rounded-xl border text-center transition cursor-pointer flex flex-col items-center gap-1 ${
                        active
                          ? 'bg-[#C41625] border-[#ff6b78]/40 text-white shadow-md'
                          : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <IconComp className="w-5 h-5 sm:w-7 sm:h-7" />
                      <span className="text-[10px] sm:text-xs font-semibold leading-tight truncate w-full">
                        {pest.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 mt-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <strong className="text-white">{activePest.sub}:</strong> {activePest.note}
              </p>
            </div>
          </div>

          {/* Right Column: Hero Video Canvas (Fits symmetrically inside mobile canvas) */}
          <div className="lg:col-span-6 relative">
            {/* Desktop offset border — hidden on mobile so video never overflows canvas */}
            <div className="hidden sm:block absolute -inset-3 rounded-[32px] border-2 border-[#C41625]/45 translate-x-2 translate-y-2 pointer-events-none" />
            <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden bg-black border border-white/15 shadow-2xl aspect-[16/10] sm:aspect-[4/3]">
              <video
                src="/gemini_generated_video_c860e715.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/service-desratizacion.jpg"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 flex items-end justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff8690]">
                    {config.company.brandName}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-snug">
                    Respaldo Técnico y Dirección Profesional en Terreno
                  </p>
                </div>
                <Link
                  to="/desratizacion-pre-demolicion-puerto-montt"
                  className="shrink-0 bg-white/95 hover:bg-white text-[#181818] text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full transition"
                >
                  Pre-Demolición SEREMI →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTORIZACIÓN SANITARIA Y RESPALDO TÉCNICO */}
      <section id="respaldo-sanitario" className="bg-neutral-50 border-b border-neutral-200 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[24px] border border-neutral-200 p-5 sm:p-7 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
                <ShieldCheck className="w-4 h-4" /> Empresa Autorizada SEREMI de Salud
              </span>
              <h2 className="font-editorial text-2xl sm:text-[1.75rem] font-bold text-neutral-900 leading-tight">
                Autorización Sanitaria y Respaldo Técnico
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Cada tratamiento y documento técnico emitido cuenta con respaldo legal y dirección profesional verificable ante la autoridad sanitaria regional.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Razón Social & Marca</p>
                <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-1">{config.company.brandName}</p>
                <p className="text-xs text-neutral-600 mt-0.5">{config.company.legalName}</p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Resoluciones Sanitarias</p>
                <p className="text-xs sm:text-sm font-bold text-[#C41625] mt-1">{config.company.rexSanitaria}</p>
                <p className="text-xs text-neutral-700 mt-0.5">{config.company.rexModificacion}</p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Dirección Técnica</p>
                <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-1">{config.company.technicalDirector}</p>
                <p className="text-xs text-neutral-600 mt-0.5">{config.company.technicalDirectorRole}</p>
              </div>

              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-neutral-500">Productos & Estándar</p>
                  <p className="text-xs font-bold text-neutral-900 mt-1">Insumos registrados ante el ISP Chile</p>
                </div>
                <p className="text-[11px] text-neutral-600 mt-1">
                  Protocolos ajustados a etiqueta y HDS sin promesas irreales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TODOS NUESTROS 9 SERVICIOS — Compact Full-Canvas Mobile + Editorial Desktop */}
      <section id="servicios" className="py-10 sm:py-16 px-2 sm:px-6 max-w-7xl mx-auto">
        <div className="px-2 sm:px-0 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              Servicios Especializados
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
              Nuestros 9 Servicios de Control de Plagas
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-2xl">
              Tratamientos puntuales para viviendas y programas técnicos periódicos para comercio, condominios e industrias.
            </p>
          </div>
          <Link
            to="/desratizacion-pre-demolicion-puerto-montt"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C41625] hover:underline shrink-0"
          >
            <span>Ver Certificado Pre-Demolición SEREMI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* MOBILE VIEW (< md): Full-canvas width selector + crisp single detail panel (compact, non-repetitive) */}
        <div className="md:hidden space-y-3">
          <div className="flex overflow-x-auto gap-1.5 pb-1 px-1 no-scrollbar">
            {config.services.map((srv, idx) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setMobileServiceIdx(idx)}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                  mobileServiceIdx === idx
                    ? 'bg-[#181818] text-white border-[#181818]'
                    : 'bg-white text-neutral-700 border-neutral-200'
                }`}
              >
                {srv.shortTitle}
              </button>
            ))}
          </div>

          {mobileActiveService && (
            <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="aspect-[16/9] w-full overflow-hidden bg-neutral-100 relative">
                <img
                  src={mobileActiveService.image}
                  alt={mobileActiveService.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2.5 left-2.5 bg-[#181818]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {mobileActiveService.category}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-editorial text-xl font-bold text-neutral-900 leading-snug">
                    {mobileActiveService.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">
                    {mobileActiveService.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">
                  <span className="text-neutral-500">Modalidad:</span>
                  <span className="font-bold text-neutral-900">
                    {mobileActiveService.isCustomQuote || !mobileActiveService.priceBase
                      ? 'Cotización personalizada'
                      : `Desde $${Number(mobileActiveService.priceBase).toLocaleString('es-CL')} ${config.company.ivaLabel}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => jumpToQuoter(mobileActiveService.id)}
                    className="bg-[#C41625] text-white text-xs font-bold py-2.5 rounded-full text-center cursor-pointer"
                  >
                    Cotizar servicio
                  </button>
                  <Link
                    to={mobileActiveService.route}
                    className="bg-neutral-100 text-neutral-900 text-xs font-semibold py-2.5 rounded-full text-center border border-neutral-200"
                  >
                    Ver ficha técnica
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP VIEW (>= md): Clean 3-column editorial grid showing all 9 services */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.services.map((srv) => (
            <article
              key={srv.id}
              className="group bg-white rounded-[24px] border border-neutral-200 overflow-hidden flex flex-col justify-between hover:border-[#C41625]/40 hover:shadow-lg transition"
            >
              <div>
                <Link to={srv.route} className="block aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={srv.image}
                    alt={`${srv.title} - ${config.company.brandName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#181818]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {srv.category}
                  </span>
                </Link>

                <div className="p-5 space-y-2.5">
                  <Link to={srv.route}>
                    <h3 className="font-editorial text-xl font-bold text-neutral-900 group-hover:text-[#C41625] transition leading-snug">
                      {srv.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">{srv.summary}</p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 space-y-3">
                <div className="flex items-center justify-between text-xs bg-neutral-50 rounded-xl px-3 py-2 border border-neutral-100">
                  <span className="text-neutral-500">Referencia:</span>
                  <span className="font-bold text-neutral-900">
                    {srv.isCustomQuote || !srv.priceBase
                      ? 'Cotización personalizada'
                      : `Desde $${Number(srv.priceBase).toLocaleString('es-CL')} ${config.company.ivaLabel}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => jumpToQuoter(srv.id)}
                    className="flex-1 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-bold py-2.5 rounded-full transition cursor-pointer"
                  >
                    Solicitar cotización
                  </button>
                  <Link
                    to={srv.route}
                    className="px-4 py-2.5 rounded-full border border-neutral-200 hover:bg-neutral-100 text-xs font-semibold text-neutral-800 transition"
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. DESTACADO ESPECIAL: DESRATIZACIÓN PRE-DEMOLICIÓN */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto pb-8">
        <div className="bg-[#181818] text-white rounded-[28px] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#ff6b78] bg-[#C41625]/20 border border-[#C41625]/35 px-3 py-1 rounded-full">
              Trámite Sanitario para Permisos de Demolición
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold leading-tight">
              {config.preDemolition.heroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              Realizamos inspección técnica del inmueble, evaluación de roedores, tratamiento controlado, monitoreo, emisión del certificado técnico de desratización y orientación para la visación ante la SEREMI de Salud.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              onClick={() => jumpToQuoter('desratizacion-pre-demolicion')}
              className="w-full bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-full transition cursor-pointer"
            >
              Cotizar Pre-Demolición
            </button>
            <Link
              to="/desratizacion-pre-demolicion-puerto-montt"
              className="w-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-full text-center transition"
            >
              Ver requisitos y plazos SEREMI →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EMPRESAS, INDUSTRIAS E INSTITUCIONES + 5 PLANES DIFERENCIADOS */}
      <section id="empresas-planes" className="bg-neutral-50 border-y border-neutral-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Sectors Block */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
                  <Building2 className="w-4 h-4" /> Particulares y Sector Productivo
                </span>
                <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
                  Soluciones para Empresas, Industrias e Instituciones
                </h2>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-2xl">
                  Desarrollamos programas MIP continuos con inspecciones periódicas, informes técnicos, planos de estaciones y carpeta sanitaria digital en Central MIP.
                </p>
              </div>
              <Link
                to="/empresas"
                className="inline-flex items-center gap-1.5 bg-[#181818] hover:bg-neutral-800 text-white text-xs font-bold px-5 py-2.5 rounded-full transition w-fit shrink-0"
              >
                <span>Ver división empresarial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
              {config.industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-neutral-200 rounded-2xl p-3.5 sm:p-4 hover:border-[#C41625]/40 transition"
                >
                  <p className="font-bold text-xs sm:text-sm text-neutral-900 leading-snug">{ind.name}</p>
                  <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Plans Block */}
          <div id="planes" className="space-y-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
                Planes de Control de Plagas
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                Programas diferenciados según tu necesidad
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                Las frecuencias y condiciones de cada plan se definen según las características de las instalaciones y evaluación técnica previa.
              </p>
            </div>

            {/* Mobile compact selector + Desktop 5-card layout */}
            <div className="flex overflow-x-auto gap-2 pb-1 lg:hidden">
              {config.plans.map((plan, idx) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanIdx(idx)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-bold border transition cursor-pointer ${
                    selectedPlanIdx === idx
                      ? 'bg-[#C41625] text-white border-[#C41625]'
                      : 'bg-white text-neutral-700 border-neutral-200'
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            <div className="lg:hidden">
              {(() => {
                const activePlan = config.plans[selectedPlanIdx] || config.plans[0];
                return (
                  <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C41625]">
                      {activePlan.target}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-neutral-900">{activePlan.name}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{activePlan.desc}</p>
                    <ul className="space-y-1.5 pt-1">
                      {activePlan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() =>
                        jumpToQuoter(activePlan.id === 'residencial' ? 'desinsectacion' : 'programas-preventivos')
                      }
                      className="w-full bg-[#181818] text-white text-xs font-bold py-2.5 rounded-full cursor-pointer"
                    >
                      {activePlan.ctaText}
                    </button>
                  </div>
                );
              })()}
            </div>

            <div className="hidden lg:grid lg:grid-cols-5 gap-3.5">
              {config.plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between hover:border-[#C41625]/40 hover:shadow-md transition"
                >
                  <div className="space-y-2.5">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#C41625] bg-[#C41625]/10 px-2.5 py-0.5 rounded-full">
                      {plan.target}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-neutral-900 leading-snug">{plan.name}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{plan.desc}</p>
                    <ul className="space-y-1.5 pt-1">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5 text-[11px] text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() =>
                      jumpToQuoter(plan.id === 'residencial' ? 'desinsectacion' : 'programas-preventivos')
                    }
                    className="mt-5 w-full bg-[#181818] hover:bg-[#C41625] text-white text-xs font-bold py-2.5 rounded-full transition cursor-pointer"
                  >
                    {plan.ctaText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Central MIP Client Portal Spotlight */}
          <div className="bg-[#181818] text-white rounded-[24px] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff6b78]">
                <Lock className="w-4 h-4" /> Portal Exclusivo Central MIP
              </div>
              <h3 className="font-editorial text-2xl font-bold">
                Acceso Clientes: certificados, planos e informes técnicos en línea
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Sin plataformas paralelas ni registros duplicados: ingresa con tus credenciales a Central MIP para consultar calendarios de visitas, fotografías en terreno, estaciones cebaderas y hojas de seguridad.
              </p>
            </div>
            <button
              onClick={() => {
                trackClientPortalClick('home_banner');
                setCentralMipModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-full transition cursor-pointer shrink-0"
            >
              <Lock className="w-4 h-4" />
              <span>Abrir Acceso Clientes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. NUESTRO PROCEDIMIENTO DE TRABAJO (6 PASOS) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
            Metodología Clara y Trazable
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
            ¿Cómo trabajamos en cada servicio?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {config.workflowSteps.map((step) => (
            <div key={step.num} className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#181818] text-white text-xs font-bold">
                {step.num}
              </span>
              <h3 className="font-bold text-sm text-neutral-900">{step.title}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GALERÍA DE TRABAJOS REALIZADOS (Escalable desde Admin) */}
      <section id="trabajos" className="bg-neutral-50 border-y border-neutral-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
                <Camera className="w-4 h-4" /> Registro en Terreno
              </span>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
                Galería de Trabajos Realizados
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-2xl">
                Registro progresivo de instalaciones de estaciones cebaderas, desratizaciones, desinsectaciones y sanitizaciones en la Región de Los Lagos, resguardando siempre los datos privados de cada cliente.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-[#181818] text-white border-[#181818]'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-neutral-200 rounded-2xl overflow-hidden hover:shadow-md transition"
              >
                <div className="aspect-[16/10] overflow-hidden bg-neutral-100 relative">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.location}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-black/75 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-bold text-sm text-neutral-900">{item.title}</h3>
                  <p className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C41625]">
                    <MapPin className="w-3 h-3" /> {item.location}
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-1">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DOCUMENTACIÓN TÉCNICA Y CERTIFICADOS */}
      <DocumentsSection />

      {/* 9. COBERTURA TERRITORIAL Y MAPA INTERACTIVO */}
      <section id="zonas" className="bg-neutral-50 border-y border-neutral-200 py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              <MapPin className="w-4 h-4" /> Región de Los Lagos y Sur de Chile
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
              Cobertura Territorial en la Región de Los Lagos
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-2xl">
              Atendemos en Puerto Montt, Alerce, Puerto Varas, Llanquihue, Frutillar, Calbuco, Los Muermos, Maullín, Osorno, Río Negro, Ancud, Castro y otras zonas del sur de Chile previa coordinación.
            </p>
          </div>

          <CoverageMap
            onSelectComuna={(comunaName) => {
              jumpToQuoter(undefined, comunaName);
            }}
          />
        </div>
      </section>

      {/* 10. OPINIONES, RESEÑAS Y PERFIL DE EMPRESA EN GOOGLE */}
      <section id="resenas" className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              <Star className="w-4 h-4 fill-[#C41625]" /> Opiniones de Clientes
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
              Reseñas y Perfil de Empresa en Google
            </h2>
          </div>

          {config.company.googleProfileUrl ? (
            <a
              href={config.company.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#181818] hover:bg-neutral-800 text-white text-xs font-bold px-5 py-2.5 rounded-full transition w-fit"
            >
              <span>Ver reseñas o evaluar en Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-100 border border-neutral-200 px-3.5 py-2 rounded-full">
              <FileCheck2 className="w-3.5 h-3.5 text-[#C41625]" />
              Enlace a Google Perfil configurable desde Admin
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.reviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-2.5">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                  <Star key={sIdx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">“{rev.text}”</p>
              <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-neutral-900">{rev.author}</p>
                  <p className="text-[11px] text-neutral-500">{rev.sector}</p>
                </div>
                {rev.verifiedPlaceholder && (
                  <span className="text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                    Espacio administrable
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. COTIZADOR EN LÍNEA COMPLETO */}
      <QuoterSection preselectedComuna={selectedComuna} preselectedComunaTick={comunaTick} />

      {/* 12. PREGUNTAS FRECUENTES (Técnicamente Verificadas) */}
      <section id="faq" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
            Información Técnica Transparente
          </span>
          <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-neutral-900 mt-1">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {config.faqs.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left font-bold text-xs sm:text-sm text-neutral-900 hover:bg-neutral-50 transition cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition ${isOpen ? 'rotate-180 text-[#C41625]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
