import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Info,
  MessageCircle,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackServiceView, trackWhatsAppClick, trackClientPortalClick } from '../utils/analytics';
import SeoHead from '../components/SeoHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { config, setPreselectedServiceId, buildWhatsAppUrl, setCentralMipModalOpen } = useSiteContent();

  const service = config.services.find((s) => s.slug === slug);

  useEffect(() => {
    if (service && slug !== 'desratizacion-pre-demolicion') {
      trackServiceView(service.slug, service.title);
    }
  }, [service, slug]);

  if (slug === 'desratizacion-pre-demolicion') {
    return <Navigate to="/desratizacion-pre-demolicion-puerto-montt" replace />;
  }

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const otherServices = config.services.filter((s) => s.id !== service.id);

  const handleQuoteService = () => {
    setPreselectedServiceId(service.id);
    navigate('/', { state: { scrollTo: 'cotizador' } });
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818]">
      <SeoHead
        title={service.seoTitle || `${service.title} | ${config.company.brandName}`}
        description={service.seoDescription || service.summary}
        path={service.route}
      />

      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#C41625] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al inicio</span>
          </Link>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625] bg-[#C41625]/10 px-3 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Service Hero Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[28px] border border-neutral-200 p-5 sm:p-8 shadow-sm">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-neutral-700 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C41625]" />
              {service.badge}
            </span>

            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 leading-tight">
              {service.title} en Puerto Montt y Región de Los Lagos
            </h1>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{service.summary}</p>

            {/* Referential Price vs Custom Quote */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
              <p className="text-[11px] uppercase tracking-wider font-bold text-neutral-500">Modalidad de tarifa</p>
              {service.isCustomQuote || !service.priceBase ? (
                <p className="font-editorial text-xl font-bold text-neutral-900 mt-1">
                  Cotización personalizada previa evaluación técnica
                </p>
              ) : (
                <p className="font-editorial text-xl font-bold text-neutral-900 mt-1">
                  Valor referencial desde ${Number(service.priceBase).toLocaleString('es-CL')} {config.company.ivaLabel}
                </p>
              )}
              <p className="text-[11px] text-neutral-500 mt-1">
                Sujeto a superficie en m², nivel de complejidad y ubicación en la Región de Los Lagos.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={handleQuoteService}
                className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full shadow-md transition cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>Cotizar este servicio</span>
              </button>

              <a
                href={buildWhatsAppUrl(
                  `Hola ${config.company.brandName}, solicito información sobre el servicio: ${service.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`service_${service.slug}`)}
                className="inline-flex items-center gap-2 bg-[#181818] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>Consultar por WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[24px] overflow-hidden border border-neutral-200 shadow-md aspect-[4/3]">
              <img
                src={service.image}
                alt={`${service.title} - ${config.company.brandName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Technical Scope & Highlights */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-[24px] border border-neutral-200 p-6 sm:p-8 space-y-5">
            <h2 className="font-editorial text-2xl font-bold text-neutral-900">
              Alcance técnico del procedimiento
            </h2>
            <p className="text-neutral-700 text-sm leading-relaxed">{service.description}</p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                ¿Qué incluye este servicio?
              </h3>
              <ul className="space-y-2.5">
                {service.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-neutral-800">
                    <CheckCircle2 className="w-4 h-4 text-[#C41625] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {service.reentryNote && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-950 leading-relaxed">
                  <p className="font-bold">Indicaciones de seguridad y reingreso:</p>
                  <p className="mt-1">{service.reentryNote}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sanitary Backing & Central MIP */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-[#F8F8F7] border border-neutral-200/80 rounded-2xl p-6 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
                <ShieldCheck className="w-4 h-4" /> Autorización Sanitaria Vigente
              </span>
              <h3 className="font-editorial text-xl font-bold text-neutral-900">{config.company.brandName}</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">{config.company.legalName}</p>
              <div className="border-t border-neutral-200 pt-3 text-xs space-y-1 text-neutral-600">
                <p className="font-semibold text-neutral-900">{config.company.rexSanitaria}</p>
                <p>{config.company.rexModificacion}</p>
                <p className="text-neutral-500">
                  Director Técnico: <strong className="text-neutral-900">{config.company.technicalDirector}</strong>
                </p>
              </div>
            </div>

            <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                Documentación Digital
              </p>
              <h3 className="font-editorial text-lg font-bold text-neutral-900">
                Acceso Clientes mediante Central MIP
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Los clientes con programas periódicos o servicios registrados pueden consultar sus certificados,
                informes técnicos y hojas de seguridad mediante el portal Central MIP.
              </p>
              <button
                onClick={() => {
                  trackClientPortalClick(`service_${service.slug}`);
                  setCentralMipModalOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[#181818] hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#ff6b78]" />
                <span>Acceso Clientes</span>
              </button>
            </div>
          </div>
        </section>

        {/* Other Services Navigation */}
        <section className="pt-4 border-t border-neutral-200">
          <h2 className="font-editorial text-2xl font-bold text-neutral-900 mb-5">
            Otros servicios disponibles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {otherServices.map((srv) => (
              <Link
                key={srv.id}
                to={srv.route}
                className="group bg-white border border-neutral-200 hover:border-[#C41625]/40 rounded-2xl p-4 flex flex-col justify-between transition hover:shadow-md"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C41625]">
                    {srv.category}
                  </span>
                  <h3 className="font-bold text-sm text-neutral-900 mt-1 group-hover:text-[#C41625] transition">
                    {srv.title}
                  </h3>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 group-hover:text-neutral-900">
                  Ver detalle <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
