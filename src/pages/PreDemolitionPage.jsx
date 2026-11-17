import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Clock,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackServiceView, trackWhatsAppClick } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function PreDemolitionPage() {
  const navigate = useNavigate();
  const { config, setPreselectedServiceId, buildWhatsAppUrl } = useSiteContent();
  const preDemoService = config.services.find((s) => s.id === 'desratizacion-pre-demolicion');
  const { preDemolition, company } = config;

  useEffect(() => {
    trackServiceView('desratizacion-pre-demolicion-puerto-montt', preDemolition.heroTitle);
  }, [preDemolition.heroTitle]);

  const handleQuotePreDemo = () => {
    setPreselectedServiceId('desratizacion-pre-demolicion');
    navigate('/', { state: { scrollTo: 'cotizador' } });
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818]">
      <SeoHead
        title={
          preDemoService?.seoTitle ||
          'Desratización Pre-Demolición y Certificado Sanitario en Puerto Montt | Patagonia Chile'
        }
        description={
          preDemoService?.seoDescription ||
          'Tratamiento técnico de desratización previo a demolición en Puerto Montt y Los Lagos. Inspección, certificado técnico y gestión de visación ante SEREMI de Salud.'
        }
        keywords="certificado de desratizacion pre-demolicion puerto montt, desratizacion demolicion seremi puerto montt, certificado desratizacion demolicion los lagos"
        path="/desratizacion-pre-demolicion-puerto-montt"
      />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#C41625] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-widest text-white bg-[#C41625] px-3 py-1 rounded-full">
            Servicio Especializado · Permiso de Demolición
          </span>
        </div>

        {/* Hero */}
        <section className="pt-4 pb-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-neutral-200/80">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2.5">
              <div className="w-10 h-[2px] bg-[#C41625]" />
              <div className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500">
                <ShieldCheck className="w-4 h-4 text-[#C41625]" />
                <span>{company.rexSanitaria} · {company.rexModificacion}</span>
              </div>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.14] text-neutral-900">
              {preDemolition.heroTitle}
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              {preDemolition.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={handleQuotePreDemo}
                className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Solicitar cotización Pre-Demolición</span>
              </button>

              <a
                href={buildWhatsAppUrl(
                  `Hola ${company.brandName}, necesito cotizar una Desratización Pre-Demolición y Certificado Sanitario.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('predemolition_hero')}
                className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-neutral-200/80 aspect-[4/3]">
              <img
                src="/service-desratizacion.jpg"
                alt="Desratización Pre-Demolición y Certificado Sanitario en Puerto Montt"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Types of properties covered */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: 'Viviendas y Sitios Urbanos',
              desc: 'Casas habitación, construcciones de madera y predios previos a proyectos habitacionales.'
            },
            {
              title: 'Edificios y Locales Comerciales',
              desc: 'Construcciones en altura, oficinas, bodegas urbanas y recintos en remodelación integral.'
            },
            {
              title: 'Instalaciones Industriales',
              desc: 'Galpones, plantas productivas, estructuras pesqueras/acuícolas y faenas de desarme.'
            }
          ].map((item, idx) => (
            <div key={idx} className="border-t border-neutral-200 pt-4 space-y-1.5">
              <Building2 className="w-4 h-4 text-[#C41625]" />
              <h2 className="font-semibold text-sm text-neutral-900">{item.title}</h2>
              <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* 6-Stage Procedure */}
        <section className="space-y-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              Etapas del Servicio
            </span>
            <h2 className="font-editorial text-3xl font-bold text-neutral-900 mt-1">
              ¿Cómo ejecutamos la desratización previa a demoler?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {preDemolition.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200 p-5 flex flex-col justify-between hover:border-[#C41625]/40 transition"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#C41625]/10 text-[#C41625] font-bold text-xs flex items-center justify-center">
                    0{idx + 1}
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900">{step.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements & Regulatory Deadlines */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 bg-neutral-50 border border-neutral-200 rounded-[24px] p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-[#C41625]">
              <ClipboardList className="w-5 h-5" />
              <h2 className="font-editorial text-2xl font-bold text-neutral-900">
                Requisitos, documentación y plazos normativos
              </h2>
            </div>

            <div className="space-y-4">
              {preDemolition.normativeNotes.map((note, idx) => (
                <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-1.5">
                  <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C41625]" />
                    <span>{note.title}</span>
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clarity Box: Empresa vs SEREMI */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-neutral-200 rounded-[24px] p-6 space-y-3">
              <div className="flex items-center gap-2 text-neutral-900">
                <FileCheck2 className="w-5 h-5 text-[#C41625]" />
                <h3 className="font-bold text-sm">Certificado Técnico vs Visación SEREMI</h3>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <strong>Control de Plagas Patagonia Chile</strong> ({company.legalName}) ejecuta el tratamiento y emite el{' '}
                <strong>Certificado Técnico de Desratización</strong> bajo {company.rexSanitaria} y la supervisión del Director Técnico{' '}
                {company.technicalDirector}.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2 text-[11px] text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  La visación administrativa o aprobación final del certificado corresponde exclusivamente a la{' '}
                  <strong>SEREMI de Salud de la Región de Los Lagos</strong> según la normativa vigente.
                </span>
              </div>
              <button
                onClick={handleQuotePreDemo}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-bold px-5 py-3 rounded-full transition cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Cotizar Desratización Pre-Demolición</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
