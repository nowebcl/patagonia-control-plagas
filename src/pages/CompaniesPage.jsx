import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calculator,
  CheckCircle2,
  Lock,
  MessageCircle,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackClientPortalClick, trackWhatsAppClick } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { config, setPreselectedServiceId, setCentralMipModalOpen, buildWhatsAppUrl } = useSiteContent();

  const handleSelectPlanQuote = (serviceId = 'manejo-integrado-de-plagas') => {
    setPreselectedServiceId(serviceId);
    navigate('/', { state: { scrollTo: 'cotizador' } });
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818]">
      <SeoHead
        title="Control de Plagas para Empresas, Industrias e Instituciones | Patagonia Chile"
        description="Programas de Manejo Integrado de Plagas (MIP), contratos preventivos, estaciones cebaderas y acceso a Central MIP para empresas, industrias, alimentos y condominios en Puerto Montt y Los Lagos."
        keywords="control de plagas para empresas puerto montt, manejo integrado de plagas mip los lagos, desratizacion de condominios puerto montt, control de plagas plantas procesadoras"
        path="/empresas"
      />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#C41625] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625] bg-[#C41625]/10 px-3 py-1 rounded-full">
            División Empresarial e Institucional
          </span>
        </div>

        {/* Hero Section */}
        <section className="pt-4 pb-8 border-b border-neutral-200/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2.5">
              <div className="w-10 h-[2px] bg-[#C41625]" />
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
                <Building2 className="w-4 h-4 text-[#C41625]" /> Programas MIP y Continuidad Operacional
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.14] text-neutral-900">
              Soluciones de control de plagas para empresas, industrias e instituciones
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Además de atender hogares particulares, diseñamos y ejecutamos programas periódicos de Manejo Integrado de Plagas (MIP) con inspecciones técnicas, monitoreo de estaciones cebaderas, planos, certificados e informes trazables para fiscalizaciones sanitarias.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => handleSelectPlanQuote('programas-preventivos')}
                className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Solicitar propuesta empresarial</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  trackClientPortalClick('companies_hero');
                  setCentralMipModalOpen(true);
                }}
                className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#C41625]" />
                <span>Acceso Clientes (Central MIP)</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F8F8F7] border border-neutral-200/80 rounded-2xl p-6 space-y-2.5">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#C41625] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Respaldo Técnico Normativo
            </div>
            <p className="text-sm font-semibold text-neutral-900">{config.company.legalName}</p>
            <p className="text-xs text-neutral-600">{config.company.rexSanitaria}</p>
            <p className="text-xs text-neutral-600">{config.company.rexModificacion}</p>
            <p className="text-xs text-neutral-500 pt-1 border-t border-neutral-200">
              Director Técnico: <span className="text-neutral-900 font-medium">{config.company.technicalDirector}</span> ({config.company.technicalDirectorRole.replace(' — Director Técnico', '')})
            </p>
          </div>
        </section>

        {/* 10 Sectors Grid */}
        <section className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              Sectores que atendemos
            </span>
            <h2 className="font-editorial text-3xl font-bold text-neutral-900 mt-1">
              Experiencia multisectorial en la Región de Los Lagos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-7">
            {config.industries.map((ind, idx) => (
              <div
                key={idx}
                className="border-t border-neutral-200 pt-3.5 space-y-1.5"
              >
                <span className="text-[10px] font-semibold text-[#C41625]">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="font-semibold text-sm text-neutral-900">{ind.name}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5 Differentiated Plans */}
        <section className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              Planes de Control de Plagas
            </span>
            <h2 className="font-editorial text-3xl font-bold text-neutral-900 mt-1">
              Programas personalizados según cada tipo de instalación
            </h2>
            <p className="text-sm text-neutral-600 mt-1.5 max-w-3xl">
              Las frecuencias de visita y condiciones de cobertura se definen técnicamente conforme a las características constructivas, nivel de exposición y normativa aplicable a cada cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {config.plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white border border-neutral-200 rounded-[24px] p-6 flex flex-col justify-between hover:shadow-lg transition"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700">
                    {plan.target}
                  </span>
                  <h3 className="font-editorial text-xl font-bold text-neutral-900">{plan.name}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{plan.desc}</p>
                  <ul className="space-y-2 pt-2">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    handleSelectPlanQuote(
                      plan.id === 'residencial' ? 'desinsectacion' : 'programas-preventivos'
                    )
                  }
                  className="mt-6 w-full bg-[#181818] hover:bg-[#C41625] text-white text-xs font-bold py-3 rounded-full transition cursor-pointer"
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Central MIP Integration Callout */}
        <section className="bg-neutral-50 border border-neutral-200 rounded-[28px] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C41625]">
              <FileCheck2 className="w-4 h-4" /> Carpeta Sanitaria Digital en Central MIP
            </div>
            <h2 className="font-editorial text-2xl font-bold text-neutral-900">
              Toda la trazabilidad de tus instalaciones en un solo lugar
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Los clientes con contrato vigente acceden mediante sus credenciales a Central MIP para descargar certificados, informes técnicos, calendarios de visitas, planos de estaciones cebaderas, fotografías y hojas de seguridad (HDS).
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => {
                trackClientPortalClick('companies_bottom');
                setCentralMipModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-[#181818] hover:bg-neutral-800 text-white text-xs font-bold px-5 py-3 rounded-full transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#ff6b78]" />
              <span>Abrir Acceso Clientes</span>
            </button>
            <a
              href={buildWhatsAppUrl(
                `Hola ${config.company.brandName}, quisiera coordinar una evaluación para un Plan Empresarial / MIP.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('companies_bottom')}
              className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-bold px-5 py-3 rounded-full transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hablar con Ventas Empresas</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
