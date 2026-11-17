import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  CheckCircle2,
  Star,
  ExternalLink,
  ChevronDown,
  PhoneCall,
  MapPin
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

      {/* 1. HERO EDITORIAL — Light, airy and uncluttered */}
      <section className="pt-10 pb-14 sm:pt-16 sm:pb-20 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-[2px] bg-[#C41625]" />
              <p className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-[#C41625] shrink-0" />
                <span>{config.company.rexSanitaria} · SEREMI Los Lagos</span>
              </p>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[3.15rem] font-bold leading-[1.12] tracking-tight text-neutral-900">
              Control de Plagas en <span className="text-[#C41625]">Puerto Montt</span> y Región de Los Lagos
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
              Desratización, desinsectación, sanitización, certificado pre-demolición y programas de Manejo Integrado de Plagas (MIP) para hogares, condominios, empresas e industrias.
            </p>

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => jumpToQuoter(activePest.serviceId)}
                className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition cursor-pointer"
              >
                <span>Solicitar cotización</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  trackClientPortalClick('hero');
                  setCentralMipModalOpen(true);
                }}
                className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs sm:text-sm font-medium px-5 py-3 rounded-full transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#C41625]" />
                <span>Acceso Clientes</span>
              </button>

              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 px-2 py-2 transition"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{config.company.whatsappDisplay}</span>
              </a>
            </div>

            {/* Minimalist Pest Quick-Selector */}
            <div className="pt-4 border-t border-neutral-200/80">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 mb-3">
                ¿Qué necesitas controlar?
              </p>
              <div className="grid grid-cols-4 gap-2">
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
                      className={`pb-2.5 pt-2 px-1.5 border-b-2 text-center transition cursor-pointer flex flex-col items-center gap-1.5 ${
                        active
                          ? 'border-[#C41625] text-neutral-900'
                          : 'border-transparent text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-[11px] font-medium leading-tight truncate w-full">
                        {pest.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-neutral-600 mt-3 leading-relaxed">
                <strong className="text-neutral-900 font-semibold">{activePest.sub}:</strong> {activePest.note}
              </p>
            </div>
          </div>

          {/* Right Column: Clean Video Showcase */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-[16/10] sm:aspect-[4/3] shadow-sm">
              <video
                src="/gemini_generated_video_c860e715.mp4"
                autoPlay
                loop
                muted
                playsInline
                poster="/service-desratizacion.jpg"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between gap-4 text-xs text-neutral-500 px-1">
              <span>{config.company.brandName} · Dirección Técnica en Terreno</span>
              <Link
                to="/desratizacion-pre-demolicion-puerto-montt"
                className="font-semibold text-[#C41625] hover:underline shrink-0"
              >
                Certificado Pre-Demolición →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUTORIZACIÓN SANITARIA Y RESPALDO TÉCNICO — Clean Architectural Strip */}
      <section id="respaldo-sanitario" className="bg-[#F8F8F7] border-y border-neutral-200/80 py-10 sm:py-12 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-7">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
                Respaldo Legal y Técnico
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 mt-1">
                Autorización Sanitaria Vigente
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-md">
              Operación verificable ante la autoridad sanitaria regional, utilizando exclusivamente insumos registrados en el ISP Chile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200/80 border-t border-neutral-200/80 pt-6 gap-y-6">
            <div className="sm:pr-6">
              <p className="text-[11px] uppercase tracking-wider font-medium text-neutral-400">Razón Social</p>
              <p className="text-sm font-semibold text-neutral-900 mt-1.5">{config.company.brandName}</p>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{config.company.legalName}</p>
            </div>

            <div className="pt-5 sm:pt-0 sm:px-6">
              <p className="text-[11px] uppercase tracking-wider font-medium text-neutral-400">Autorización SEREMI</p>
              <p className="text-sm font-semibold text-[#C41625] mt-1.5">{config.company.rexSanitaria}</p>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{config.company.rexModificacion}</p>
            </div>

            <div className="pt-5 sm:pt-0 sm:px-6">
              <p className="text-[11px] uppercase tracking-wider font-medium text-neutral-400">Dirección Técnica</p>
              <p className="text-sm font-semibold text-neutral-900 mt-1.5">{config.company.technicalDirector}</p>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{config.company.technicalDirectorRole}</p>
            </div>

            <div className="pt-5 sm:pt-0 sm:pl-6">
              <p className="text-[11px] uppercase tracking-wider font-medium text-neutral-400">Estándar de Aplicación</p>
              <p className="text-sm font-semibold text-neutral-900 mt-1.5">Registro ISP y HDS</p>
              <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                Protocolos ajustados a etiqueta técnica y tiempos reales de reingreso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TODOS NUESTROS 9 SERVICIOS — Clean Minimal Cards */}
      <section id="servicios" className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
              Servicios Especializados
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
              Nuestros 9 Servicios
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-xl">
              Soluciones puntuales para viviendas y programas técnicos continuos para comercio, condominios e industrias.
            </p>
          </div>
          <Link
            to="/desratizacion-pre-demolicion-puerto-montt"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#C41625] transition shrink-0"
          >
            <span>Desratización Pre-Demolición SEREMI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Compact Tabs */}
        <div className="md:hidden space-y-4">
          <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar">
            {config.services.map((srv, idx) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setMobileServiceIdx(idx)}
                className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                  mobileServiceIdx === idx
                    ? 'bg-[#181818] text-white'
                    : 'bg-neutral-100 text-neutral-600'
                }`}
              >
                {srv.shortTitle}
              </button>
            ))}
          </div>

          {mobileActiveService && (
            <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden">
              <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                <img
                  src={mobileActiveService.image}
                  alt={mobileActiveService.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C41625]">
                  {mobileActiveService.category}
                </span>
                <h3 className="font-editorial text-xl font-bold text-neutral-900 leading-snug">
                  {mobileActiveService.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {mobileActiveService.summary}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Valorización</span>
                  <span className="font-semibold text-neutral-900">Evaluación vía WhatsApp</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => jumpToQuoter(mobileActiveService.id)}
                    className="bg-[#C41625] text-white text-xs font-semibold py-2.5 rounded-full cursor-pointer"
                  >
                    Cotizar
                  </button>
                  <Link
                    to={mobileActiveService.route}
                    className="border border-neutral-300 text-neutral-800 text-xs font-medium py-2.5 rounded-full text-center"
                  >
                    Ver ficha
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Minimal 3-Column Editorial Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-10">
          {config.services.map((srv) => (
            <article key={srv.id} className="group flex flex-col justify-between">
              <div>
                <Link
                  to={srv.route}
                  className="block aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 mb-4"
                >
                  <img
                    src={srv.image}
                    alt={`${srv.title} - ${config.company.brandName}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </Link>

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C41625]">
                  {srv.category}
                </span>

                <Link to={srv.route}>
                  <h3 className="font-editorial text-xl font-bold text-neutral-900 group-hover:text-[#C41625] transition leading-snug mt-1">
                    {srv.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed mt-2 line-clamp-3">
                  {srv.summary}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-neutral-200/80 flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-neutral-500">
                  Evaluación vía WhatsApp
                </span>

                <div className="flex items-center gap-3 shrink-0">
                  <Link
                    to={srv.route}
                    className="text-xs font-medium text-neutral-500 hover:text-neutral-900 transition"
                  >
                    Detalles
                  </Link>
                  <button
                    type="button"
                    onClick={() => jumpToQuoter(srv.id)}
                    className="text-xs font-semibold text-[#C41625] hover:underline cursor-pointer"
                  >
                    Cotizar →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. DESTACADO ESPECIAL: DESRATIZACIÓN PRE-DEMOLICIÓN — Clean Asymmetric Light Feature */}
      <section className="px-5 sm:px-8 max-w-7xl mx-auto pb-16 sm:pb-24">
        <div className="bg-[#F8F8F7] border-l-4 border-[#C41625] rounded-r-2xl p-7 sm:p-11 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
              Trámite Sanitario para Permisos de Demolición
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
              {config.preDemolition.heroTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
              Realizamos inspección técnica del inmueble, evaluación de roedores, tratamiento controlado, monitoreo, emisión del certificado técnico de desratización y orientación para la visación ante la SEREMI de Salud.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              type="button"
              onClick={() => jumpToQuoter('desratizacion-pre-demolicion')}
              className="w-full bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-full transition cursor-pointer"
            >
              Cotizar Pre-Demolición
            </button>
            <Link
              to="/desratizacion-pre-demolicion-puerto-montt"
              className="w-full border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs sm:text-sm font-medium py-3 px-5 rounded-full text-center transition"
            >
              Ver requisitos y plazos SEREMI →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. EMPRESAS, INDUSTRIAS E INSTITUCIONES + 5 PLANES + CENTRAL MIP */}
      <section id="empresas-planes" className="bg-[#F8F8F7] border-y border-neutral-200/80 py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
          {/* 10 Sectors — Typographic Hairline Grid */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
                  Particulares y Sector Productivo
                </span>
                <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
                  Soluciones para Empresas, Industrias e Instituciones
                </h2>
                <p className="text-sm text-neutral-600 mt-2 max-w-2xl">
                  Programas MIP continuos con inspecciones periódicas, informes técnicos, planos de estaciones y carpeta sanitaria digital en Central MIP.
                </p>
              </div>
              <Link
                to="/empresas"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-[#C41625] transition shrink-0"
              >
                <span>Explorar división empresarial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-7">
              {config.industries.map((ind, idx) => (
                <div key={idx} className="border-t border-neutral-300/80 pt-3.5">
                  <p className="font-semibold text-xs sm:text-sm text-neutral-900 leading-snug">{ind.name}</p>
                  <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 Differentiated Plans */}
          <div id="planes" className="space-y-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
                Planes de Control de Plagas
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 mt-1.5">
                Programas diferenciados según tu instalación
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1.5">
                Las frecuencias y condiciones de cada plan se definen según las características del recinto y evaluación técnica previa.
              </p>
            </div>

            {/* Mobile selector */}
            <div className="flex overflow-x-auto gap-2 pb-1 lg:hidden no-scrollbar">
              {config.plans.map((plan, idx) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedPlanIdx(idx)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-medium transition cursor-pointer ${
                    selectedPlanIdx === idx
                      ? 'bg-[#181818] text-white'
                      : 'bg-white text-neutral-600 border border-neutral-200'
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
                  <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-3.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C41625]">
                      {activePlan.target}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-neutral-900">{activePlan.name}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{activePlan.desc}</p>
                    <ul className="space-y-2 pt-1">
                      {activePlan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() =>
                        jumpToQuoter(activePlan.id === 'residencial' ? 'desinsectacion' : 'programas-preventivos')
                      }
                      className="w-full bg-[#181818] text-white text-xs font-semibold py-3 rounded-full cursor-pointer"
                    >
                      {activePlan.ctaText}
                    </button>
                  </div>
                );
              })()}
            </div>

            {/* Desktop 5-Column Clean Cards */}
            <div className="hidden lg:grid lg:grid-cols-5 gap-4">
              {config.plans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-neutral-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-400 transition"
                >
                  <div className="space-y-3">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#C41625]">
                      {plan.target}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-neutral-900 leading-snug">{plan.name}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{plan.desc}</p>
                    <ul className="space-y-2 pt-2 border-t border-neutral-100">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-1.5 text-[11.5px] text-neutral-700 leading-snug">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      jumpToQuoter(plan.id === 'residencial' ? 'desinsectacion' : 'programas-preventivos')
                    }
                    className="mt-6 w-full border border-neutral-300 hover:bg-[#181818] hover:text-white hover:border-[#181818] text-neutral-900 text-xs font-semibold py-2.5 rounded-full transition cursor-pointer"
                  >
                    {plan.ctaText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Central MIP Portal — Clean Horizontal Row */}
          <div className="pt-8 border-t border-neutral-200 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C41625]">
                <Lock className="w-3.5 h-3.5" /> Portal Central MIP
              </div>
              <h3 className="font-editorial text-2xl font-bold text-neutral-900">
                Acceso Clientes: certificados, planos e informes técnicos
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Ingresa con tus credenciales al portal seguro de Central MIP para revisar calendarios de visitas, fotografías en terreno, estaciones cebaderas y hojas de seguridad.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                trackClientPortalClick('home_banner');
                setCentralMipModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 bg-[#181818] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition cursor-pointer shrink-0 w-fit"
            >
              <Lock className="w-3.5 h-3.5 text-[#ff8690]" />
              <span>Abrir Acceso Clientes</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. PROCEDIMIENTO DE TRABAJO — Numbered Typographic Grid */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto">
        <div className="max-w-xl mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
            Metodología de Atención
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
            ¿Cómo trabajamos en cada servicio?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {config.workflowSteps.map((step) => (
            <div key={step.num} className="border-t border-neutral-200 pt-5 space-y-2">
              <span className="font-editorial text-2xl font-bold text-neutral-300 block">
                {step.num}
              </span>
              <h3 className="font-semibold text-sm sm:text-base text-neutral-900">{step.title}</h3>
              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GALERÍA DE TRABAJOS REALIZADOS — Clean Photo Grid */}
      <section id="trabajos" className="bg-[#F8F8F7] border-y border-neutral-200/80 py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
                Registro en Terreno
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
                Galería de Trabajos Realizados
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl">
                Registro progresivo de instalaciones de estaciones cebaderas, desratizaciones, desinsectaciones y sanitizaciones en la Región de Los Lagos, resguardando siempre los datos privados de cada cliente.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-[#181818] text-white'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredGallery.map((item) => (
              <div key={item.id} className="group space-y-3">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200">
                  <img
                    src={item.image}
                    alt={`${item.title} - ${item.location}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
                  />
                </div>
                <div className="space-y-1 px-0.5">
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="font-semibold uppercase tracking-wider text-[#C41625]">{item.category}</span>
                    <span className="inline-flex items-center gap-1 text-neutral-500">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-neutral-900">{item.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. DOCUMENTACIÓN TÉCNICA Y CERTIFICADOS */}
      <DocumentsSection />

      {/* 9. COBERTURA TERRITORIAL Y GOOGLE MAPS */}
      <section id="zonas" className="bg-[#F8F8F7] border-y border-neutral-200/80 py-16 sm:py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
              Región de Los Lagos y Sur de Chile
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
              Cobertura Territorial
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-2xl">
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

      {/* 10. OPINIONES Y RESEÑAS EN LOOP AUTOMÁTICO (Sin imágenes) */}
      <section id="resenas" className="py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
              Opiniones de Clientes
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          {config.company.googleProfileUrl && (
            <a
              href={config.company.googleProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs font-semibold px-5 py-2.5 rounded-full transition w-fit"
            >
              <span>Ver reseñas o evaluar en Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#FEFEFE] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#FEFEFE] to-transparent z-10" />

          <div className="animate-marquee-left gap-5 py-2">
            {[...config.reviews, ...config.reviews].map((rev, idx) => (
              <blockquote
                key={`${rev.id}-${idx}`}
                className="w-[300px] sm:w-[370px] shrink-0 bg-[#F8F8F7] border border-neutral-200/80 rounded-2xl p-6 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating || 5 }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed">“{rev.text}”</p>
                </div>

                <footer className="pt-3 border-t border-neutral-200/70">
                  <p className="text-xs font-semibold text-neutral-900">{rev.author}</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">{rev.sector}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 11. COTIZADOR EN LÍNEA COMPLETO */}
      <QuoterSection preselectedComuna={selectedComuna} preselectedComunaTick={comunaTick} />

      {/* 12. PREGUNTAS FRECUENTES — Clean Hairline Accordion */}
      <section id="faq" className="py-16 sm:py-20 px-5 sm:px-8 max-w-4xl mx-auto">
        <div className="mb-10">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
            Información Técnica Transparente
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1.5">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {config.faqs.map((item, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div key={idx}>
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left font-semibold text-sm sm:text-base text-neutral-900 hover:text-[#C41625] transition cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-neutral-400 transition-transform ${
                      isOpen ? 'rotate-180 text-[#C41625]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed pr-8">
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
