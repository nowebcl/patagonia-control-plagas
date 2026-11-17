import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import SeoHead from '../components/SeoHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  const { config } = useSiteContent();
  const { company } = config;

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#181818]">
      <SeoHead
        title={`Política de Privacidad | ${company.brandName}`}
        description={`Política de privacidad y resguardo de antecedentes de clientes de ${company.legalName} (${company.brandName}).`}
        path="/politica-de-privacidad"
      />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#C41625] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al inicio</span>
        </Link>

        <div className="bg-white rounded-[28px] border border-neutral-200 p-6 sm:p-10 space-y-6">
          <div className="space-y-2 border-b border-neutral-200 pb-5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              <ShieldCheck className="w-4 h-4" /> Resguardo de Datos e Información Técnica
            </span>
            <h1 className="font-editorial text-3xl font-bold text-neutral-900">
              Política de Privacidad y Confidencialidad
            </h1>
            <p className="text-xs text-neutral-500">
              {company.brandName} · {company.legalName}
            </p>
          </div>

          <section className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            <h2 className="font-bold text-neutral-900">1. Identificación del responsable</h2>
            <p>
              El presente sitio web es administrado por <strong>{company.legalName}</strong>, operando comercialmente como{' '}
              <strong>{company.brandName}</strong>, con autorización sanitaria <strong>{company.rexSanitaria}</strong> y{' '}
              <strong>{company.rexModificacion}</strong>, en {company.cityRegion}.
            </p>
          </section>

          <section className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            <h2 className="font-bold text-neutral-900">2. Finalidad de los datos recopilados</h2>
            <p>
              Conforme a lo establecido en la Ley N.º 19.628 sobre Protección de la Vida Privada en Chile, los datos ingresados voluntariamente en nuestro cotizador en línea (nombre o razón social, teléfono, correo electrónico, dirección, comuna y antecedentes del inmueble) se utilizan exclusivamente para elaborar cotizaciones técnicas, coordinar visitas de inspección y prestar los servicios solicitados.
            </p>
          </section>

          <section className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            <h2 className="font-bold text-neutral-900">3. Confidencialidad de clientes, fotografías y documentos</h2>
            <p>
              Toda fotografía o antecedente comercial adjuntado en terreno, así como certificados MIP, planos de estaciones cebaderas e informes técnicos, se mantiene bajo estricta confidencialidad. Las muestras documentales y fotografías de trabajos publicadas en el sitio web resguardan la identidad y ubicación específica de nuestros clientes.
            </p>
          </section>

          <section className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            <h2 className="font-bold text-neutral-900">4. Portal Central MIP y Analítica Web</h2>
            <p>
              El acceso de clientes a documentación histórica se realiza mediante el entorno externo de Central MIP utilizando las credenciales asignadas a cada empresa o cliente. Adicionalmente, el sitio puede emplear estadísticas agregadas de visitas (como Google Analytics) para medir el rendimiento de las secciones informativas sin comercializar datos personales con terceros.
            </p>
          </section>

          <section className="space-y-2 text-sm text-neutral-700 leading-relaxed">
            <h2 className="font-bold text-neutral-900">5. Consultas o actualización de antecedentes</h2>
            <p>
              Para solicitar la modificación o eliminación de antecedentes de contacto enviados por el formulario, puedes comunicarte directamente a través de nuestro WhatsApp oficial{' '}
              <strong>{company.whatsappDisplay}</strong>
              {company.email ? ` o al correo electrónico ${company.email}` : ''}.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
