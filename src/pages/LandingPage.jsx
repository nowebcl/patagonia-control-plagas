import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  PhoneCall,
  CheckCircle2,
  Calendar,
  Home,
  X,
  ChevronDown,
  Calculator,
  MessageCircle,
  Clock,
  Sparkles,
  Building2,
  Award,
  BadgeCheck,
  HelpCircle
} from 'lucide-react';
import { CockroachIcon, SpiderIcon, RodentIcon, MosquitoIcon } from '../components/PestIcons';
import { useDemoData } from '../context/DemoDataContext';

const PEST_INFO = [
  {
    id: 'cucaracha',
    name: 'Cucarachas y Baratas',
    category: 'DESINSECTACIÓN',
    slideIndex: 1,
    icon: CockroachIcon,
    desc: 'Gel insecticida alemán de última generación y microencapsulado sin olor. Especial para cocinas y restaurantes.',
    precioDesde: '$45.000',
    garantia: '3 meses'
  },
  {
    id: 'arana',
    name: 'Araña de Rincón',
    category: 'DESINSECTACIÓN',
    slideIndex: 1,
    icon: SpiderIcon,
    desc: 'Barrera perimetral en entretechos, clósets y guardapolvos. Productos sin olor seguros para mascotas y niños.',
    precioDesde: '$50.000',
    garantia: '6 meses'
  },
  {
    id: 'roedor',
    name: 'Ratas y Guarenes (Roedores)',
    category: 'DESRATIZACIÓN',
    slideIndex: 0,
    icon: RodentIcon,
    desc: 'Estaciones cebaderas de alta seguridad con llave, sellado perimetral y Certificado Oficial SEREMI de Salud.',
    precioDesde: '$55.000',
    garantia: 'Cert. SEREMI'
  },
  {
    id: 'zancudo',
    name: 'Moscas, Zancudos y Avispas',
    category: 'SANITIZACIÓN',
    slideIndex: 2,
    icon: MosquitoIcon,
    desc: 'Termonebulización exterior y nebulización en frío ULV para erradicación y desinfección ambiental.',
    precioDesde: '$48.000',
    garantia: 'Garantizado'
  }
];

const IMMERSIVE_SLIDES = [
  {
    id: 'DESRATIZACIÓN',
    num: '01',
    badge: 'Resolución Sanitaria SEREMI Los Lagos',
    title: 'Desratización Perimetral e Industrial en Puerto Montt',
    subtitle: 'Control activo y preventivo de roedores para hogares, bodegas industriales, plantas salmoneras y gastronomía en Puerto Montt.',
    image: '/service-desratizacion.jpg',
    priceBase: '$55.000',
    features: [
      'Estaciones cebaderas ancladas resistentes a la lluvia sureña',
      'Certificado sanitario oficial válido para patentes municipales',
      'Bloqueo y sellado de puntos críticos de acceso'
    ]
  },
  {
    id: 'DESINSECTACIÓN',
    num: '02',
    badge: 'Productos Autorizados por el ISP',
    title: 'Desinsectación Profesional contra Araña de Rincón',
    subtitle: 'Tratamiento microencapsulado de alta residualidad sin olor. Seguro para tu familia y mascotas con reingreso en solo 2 horas.',
    image: '/service-desinsectacion.jpg',
    priceBase: '$45.000',
    features: [
      'Fórmulas alemanas sin olor ni manchas en paredes',
      'Efecto residual prolongado de hasta 6 meses en entretechos',
      'Erradicación total de baratas, pulgas, tijeretas y arañas'
    ]
  },
  {
    id: 'SANITIZACIÓN',
    num: '03',
    badge: 'Bioseguridad de Alto Espectro',
    title: 'Sanitización & Nebulización ULV Ambiental',
    subtitle: 'Eliminación del 99,9% de hongos de humedad, bacterias y virus en clínicas, oficinas, embarcaciones y residencias.',
    image: '/service-sanitizacion.jpg',
    priceBase: '$48.000',
    features: [
      'Amonio cuaternario de 5ta generación de grado hospitalario',
      'Combate esporas de moho producidas por el clima de Puerto Montt',
      'Entrega inmediata de informe técnico y certificado sanitario'
    ]
  }
];

const COBERTURA_SECTORES = [
  { nombre: 'Centro y Costanera', detalle: 'Comercio, locales y oficinas' },
  { nombre: 'Alerce Norte y Sur', detalle: 'Atención residencial en el día' },
  { nombre: 'Chinquihue y Panitao', detalle: 'Plantas acuícolas y astilleros' },
  { nombre: 'Pelluco y Chamiza', detalle: 'Viviendas y sector gastronómico' },
  { nombre: 'Cardonal y El Tepual', detalle: 'Bodegas y centros logísticos' },
  { nombre: 'Valle Volcanes y Mirador', detalle: 'Hogares y condominios' },
  { nombre: 'Jardín Austral y Pichi Pelluco', detalle: 'Inspección técnica express' },
  { nombre: 'Puerto Varas y Llanquihue', detalle: 'Cobertura cuenca del lago' }
];

const TRABAJOS_ROW_1 = [
  '/trabajos/trabajo-1.jpg',
  '/trabajos/trabajo-2.jpg',
  '/trabajos/trabajo-3.jpg',
  '/trabajos/trabajo-4.jpg',
  '/trabajos/trabajo-5.jpg',
  '/trabajos/trabajo-6.jpg',
  '/trabajos/trabajo-7.jpg'
];

const TRABAJOS_ROW_2 = [
  '/trabajos/trabajo-7.jpg',
  '/trabajos/trabajo-6.jpg',
  '/trabajos/trabajo-5.jpg',
  '/trabajos/trabajo-4.jpg',
  '/trabajos/trabajo-3.jpg',
  '/trabajos/trabajo-2.jpg',
  '/trabajos/trabajo-1.jpg'
];

const FAQS = [
  {
    q: '¿Los productos aplicados son seguros para niños y mascotas?',
    a: 'Totalmente. Empleamos piretroides microencapsulados y cebos de grado profesional autorizados por el Instituto de Salud Pública (ISP) de Chile. No dejan olores penetrantes y permiten reingresar al inmueble de forma 100% segura tras solo 2 horas de ventilación.'
  },
  {
    q: '¿Entregan certificado oficial para la SEREMI de Salud y patentes comerciales?',
    a: 'Sí. Emitimos el Certificado Oficial de Desratización, Desinsectación o Sanitización con número de resolución sanitaria SEREMI de la Región de Los Lagos, timbrado y con firma técnica, indispensable para patentes municipales de Puerto Montt y auditorías sanitarias.'
  },
  {
    q: '¿Cuánto tiempo dura la garantía del servicio?',
    a: 'Nuestros tratamientos residenciales cuentan con garantía escrita de hasta 6 meses contra araña de rincón y 90 días contra cucarachas. Si detectas presencia de la plaga durante el período garantizado, nuestro equipo realiza un refuerzo sin costo.'
  },
  {
    q: '¿Con qué rapidez atienden una urgencia en Puerto Montt?',
    a: 'Contamos con móviles equipados en terreno en Puerto Montt para acudir en el mismo día o en un plazo máximo de 2 a 4 horas ante emergencias en locales comerciales, restaurantes, plantas o viviendas.'
  },
  {
    q: '¿Cómo preparo mi casa antes de la fumigación?',
    a: 'Solo debes guardar alimentos destapados, despejar zócalos de las habitaciones y retirar a las mascotas durante la aplicación y las 2 horas posteriores. El técnico te guiará paso a paso antes de iniciar el procedimiento.'
  }
];

const formatCLP = (val) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val || 0);

export default function LandingPage() {
  const { addInspectionRequest } = useDemoData();

  const [selectedPest, setSelectedPest] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [activeBottomNav, setActiveBottomNav] = useState('inicio');
  const [openFaq, setOpenFaq] = useState(null);

  // Single-box minimal Quoter state
  const [quote, setQuote] = useState({
    servicio: 'Desinsectación',
    lugar: 'Hogar',
    tamano: 'Mediano',
    nombre: '',
    telefono: '+56 9 ',
    direccion: '',
    enviado: false,
    ordenCreada: null
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % IMMERSIVE_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const basePrice =
    quote.servicio === 'Desratización' ? 55000 : quote.servicio === 'Sanitización' ? 48000 : 45000;
  const sizeAdd = quote.tamano === 'Pequeño' ? 0 : quote.tamano === 'Mediano' ? 10000 : 25000;
  const placeAdd = quote.lugar === 'Empresa' ? 15000 : quote.lugar === 'Local' ? 5000 : 0;
  const estimatedTotal = basePrice + sizeAdd + placeAdd;

  const handleSendQuote = (e) => {
    e.preventDefault();
    const created = addInspectionRequest({
      nombre: quote.nombre,
      telefono: quote.telefono,
      tipo: quote.lugar === 'Hogar' ? 'Hogar' : 'Empresa',
      direccion: quote.direccion || 'Puerto Montt',
      servicio: quote.servicio,
      plaga: `${quote.servicio} (${quote.lugar} - ${quote.tamano})`,
      fecha: new Date().toISOString().slice(0, 10),
      hora: '10:30',
      notas: `Cotización web: ${quote.lugar} (${quote.tamano}) - Estimado: ${formatCLP(estimatedTotal)}`
    });
    setQuote((prev) => ({ ...prev, enviado: true, ordenCreada: created }));
  };

  // Modal inspection form state
  const [form, setForm] = useState({
    nombre: '',
    telefono: '+56 9 ',
    tipo: 'Hogar',
    direccion: '',
    servicio: 'Desinsectación',
    plaga: 'Inspección Técnica',
    fecha: new Date().toISOString().slice(0, 10),
    hora: '10:30'
  });

  const handleOpenBooking = (presetServicio, presetPlaga) => {
    if (presetServicio) {
      setForm((prev) => ({
        ...prev,
        servicio: presetServicio,
        plaga: presetPlaga || prev.plaga
      }));
    }
    setBookingSuccess(null);
    setBookingOpen(true);
  };

  const handleSubmitBooking = (e) => {
    e.preventDefault();
    const created = addInspectionRequest(form);
    setBookingSuccess(created);
  };

  const currentSlide = IMMERSIVE_SLIDES[activeSlide];

  const whatsappLink = (msg) =>
    `https://wa.me/56978666690?text=${encodeURIComponent(msg || 'Hola Patagonia Control de Plagas, necesito cotizar un servicio en Puerto Montt.')}`;

  return (
    <div className="min-h-screen w-full bg-[#FEFEFE] text-[#141414] pb-20 md:pb-0">
      {/* ================= HEADER ================= */}
      <header className="bg-[#181818] text-white rounded-b-[26px] md:rounded-none sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 md:py-5 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 focus:outline-none">
            <img
              src="/logo-patagonia.png"
              alt="Patagonia Control de Plagas Puerto Montt"
              className="h-11 sm:h-13 md:h-14 w-auto object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300 font-medium">
            <a href="#top" className="hover:text-white transition">Inicio</a>
            <a href="#servicios-slider" className="hover:text-white transition">Servicios</a>
            <a href="#trabajos" className="hover:text-white transition">Trabajos</a>
            <a href="#garantia" className="hover:text-white transition">Resolución SEREMI</a>
            <a href="#zonas" className="hover:text-white transition">Cobertura</a>
            <a href="#cotizador" className="hover:text-white transition">Cotizador</a>
            <a href="#faq" className="hover:text-white transition">Preguntas</a>

            <a
              href="tel:+56978666690"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#ff6b78]" />
              <span>+56 9 7866 6690</span>
            </a>

            <button
              onClick={() => handleOpenBooking('Desinsectación', 'Inspección General')}
              className="bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition cursor-pointer shadow-sm"
            >
              Solicitar inspección
            </button>
          </nav>

          {/* Staggered 3-Line Minimal Hamburger Icon (Mobile) */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="md:hidden flex flex-col items-end justify-center gap-[7px] p-2 -mr-1 rounded-xl hover:bg-white/10 active:scale-95 transition cursor-pointer"
          >
            <span className="block w-10 h-[2px] bg-white rounded-full" />
            <span className="block w-7 h-[2px] bg-white rounded-full" />
            <span className="block w-4 h-[2px] bg-white rounded-full" />
          </button>
        </div>
      </header>

      {/* ================= HERO SECTION (SEO TARGET: CONTROL DE PLAGAS PUERTO MONTT) ================= */}
      <main id="top">
        <section className="max-w-7xl mx-auto px-3.5 sm:px-10 pt-3 sm:pt-14 pb-5 sm:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 items-center">
            {/* Left Column: Local SEO Copywriting & Value Propositions */}
            <div className="lg:col-span-5 z-10">
              <div className="w-8 sm:w-16 h-[2px] sm:h-[2.5px] bg-[#C41625] mb-2 sm:mb-5 animate-line-grow" />

              {/* Verified Trust Badge */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-neutral-100 border border-neutral-200/90 text-[#181818] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold mb-2 sm:mb-4">
                <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C41625] shrink-0" />
                <span>Resolución Sanitaria SEREMI Los Lagos</span>
              </div>

              {/* Main H1 Title for Local SEO */}
              <h1 className="font-editorial text-[1.65rem] sm:text-[3.3rem] lg:text-[3.8rem] leading-[1.12] sm:leading-[1.08] tracking-[-0.02em] text-[#141414] font-bold animate-fade-up">
                Control de plagas
                <br />
                en <span className="italic text-[#B91C1C] font-bold">Puerto Montt</span>
              </h1>

              {/* Editorial Subtitle */}
              <p className="font-newsreader italic text-[#555555] text-[0.85rem] sm:text-[1.25rem] lg:text-[1.45rem] leading-snug sm:leading-[1.35] mt-1.5 sm:mt-4 mb-3 sm:mb-6 animate-fade-up-delay-1">
                Servicios profesionales de desratización, desinsectación y sanitización para hogares, empresas e industrias en la Región de Los Lagos.
              </p>

              {/* 3 Trust Checkmarks */}
              <div className="space-y-1 sm:space-y-2 mb-3.5 sm:mb-7 text-[11px] sm:text-sm text-neutral-700 font-medium">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C41625] shrink-0" />
                  <span>Certificado oficial timbrado para patentes y fiscalización SEREMI</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C41625] shrink-0" />
                  <span>Productos sin olor autorizados por el ISP (seguros para niños y mascotas)</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C41625] shrink-0" />
                  <span>Atención en el día en Puerto Montt, Alerce y Chinquihue</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 animate-fade-up-delay-2">
                <button
                  onClick={() => handleOpenBooking('Desinsectación', 'Inspección Técnica General')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-3 bg-[#C41625] hover:bg-[#a6121f] active:scale-[0.98] text-white text-xs sm:font-newsreader sm:text-[1.18rem] font-semibold px-3 sm:px-8 py-2.5 sm:py-3.5 rounded-full shadow-[0_6px_18px_rgba(196,22,37,0.22)] transition-all duration-300 cursor-pointer group"
                >
                  <span>Solicitar inspección</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
                </button>

                <a
                  href="#cotizador"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:text-[#C41625] px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full border border-neutral-300 hover:border-[#C41625] transition"
                >
                  <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Cotizar en 1 min</span>
                </a>
              </div>
            </div>

            {/* Right Column: Organic Curved Pest Control Video (Perfect canvas fit on mobile) */}
            <div className="lg:col-span-7 relative animate-fade-up-delay-2 mt-2 sm:mt-0 w-full">
              <div
                className="hidden sm:block absolute -bottom-2 -left-2 w-full h-full rounded-tl-[220px] rounded-bl-[130px] rounded-br-[160px] rounded-tr-[28px] border-2 border-[#C41625] pointer-events-none"
                style={{ transform: 'translate(-4px, 5px)' }}
              />

              <div className="relative overflow-hidden rounded-2xl sm:rounded-tl-[220px] sm:rounded-bl-[130px] sm:rounded-br-[160px] sm:rounded-tr-[28px] shadow-md sm:shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-[#181818] border border-neutral-200/60 sm:border-none aspect-[16/10] sm:aspect-[16/9] w-full">
                <video
                  key="gemini-hero-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/gemini_generated_video_c860e715.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* ================= 4 MINIMAL LINE-ART PEST ICONS + PILL BAR ================= */}
          <div className="mt-4 sm:mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-4 items-center py-1 sm:py-3">
              {PEST_INFO.map((pest, idx) => {
                const IconComponent = pest.icon;
                const isSelected = selectedPest?.id === pest.id;
                return (
                  <button
                    key={pest.id}
                    onClick={() => {
                      setSelectedPest(isSelected ? null : pest);
                      setActiveSlide(pest.slideIndex);
                    }}
                    className={`relative flex flex-col items-center justify-center py-1 sm:py-2 transition-all duration-200 cursor-pointer group ${
                      idx < 3 ? 'border-r border-neutral-300/90' : ''
                    }`}
                    title={pest.name}
                  >
                    <div
                      className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#C41625]/10 text-[#C41625] scale-105'
                          : 'text-[#181818] group-hover:text-[#C41625] group-hover:-translate-y-0.5'
                      }`}
                    >
                      <IconComponent className="w-8 h-8 sm:w-13 sm:h-13" />
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedPest && (
              <div className="my-2.5 sm:my-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-neutral-50 border border-neutral-200/80 animate-scale-in flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C41625]">
                      {selectedPest.category}
                    </span>
                    <span className="text-[10px] bg-neutral-200 px-2 py-0.5 rounded-full font-medium">
                      Garantía {selectedPest.garantia}
                    </span>
                  </div>
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-neutral-900 mt-0.5 sm:mt-1">
                    {selectedPest.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">{selectedPest.desc}</p>
                </div>
                <button
                  onClick={() => {
                    document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="shrink-0 text-xs font-semibold bg-[#181818] hover:bg-[#C41625] text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition cursor-pointer text-center"
                >
                  Cotizar desde {selectedPest.precioDesde} →
                </button>
              </div>
            )}

            <div className="bg-[#EFEFEF] rounded-xl sm:rounded-2xl py-1.5 sm:py-2 px-1.5 sm:px-6 mt-1.5 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs md:text-sm font-semibold tracking-normal sm:tracking-[0.05em] text-[#222222]">
              {IMMERSIVE_SLIDES.map((slide, index) => (
                <React.Fragment key={slide.id}>
                  <button
                    onClick={() => {
                      setActiveSlide(index);
                      document.getElementById('servicios-slider')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all cursor-pointer text-center whitespace-nowrap ${
                      activeSlide === index
                        ? 'text-[#C41625] font-bold bg-white shadow-xs'
                        : 'text-[#222222] hover:text-[#C41625]'
                    }`}
                  >
                    {slide.id}
                  </button>
                  {index < 2 && <span className="text-[#C41625]/40 font-bold select-none px-0.5 sm:px-1">|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICES SECTION ================= */}
        <section id="servicios-slider" className="max-w-7xl mx-auto px-1.5 sm:px-10 py-5 sm:py-16">
          <div className="text-center max-w-2xl mx-auto mb-3.5 sm:mb-8 px-2 sm:px-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#C41625]">
              Nuestras Especialidades
            </span>
            <h2 className="font-editorial text-xl sm:text-4xl font-bold text-neutral-900 mt-0.5 sm:mt-1">
              Servicios Sanitarios en Puerto Montt
            </h2>
            <p className="text-[11px] sm:text-sm text-neutral-600 mt-1 max-w-xl mx-auto">
              Tecnología adaptada a las condiciones de humedad y construcciones locales, con certificación SEREMI de Salud.
            </p>
          </div>

          {/* MOBILE VIEW: Full-canvas width, compact height, authentic & clean Chilean pest control look */}
          <div className="block md:hidden bg-white border border-neutral-200/90 rounded-2xl shadow-sm overflow-hidden">
            {/* 1. Full-width Segmented Tabs */}
            <div className="grid grid-cols-3 p-1 bg-neutral-100 border-b border-neutral-200/80 text-[11px] font-semibold gap-1">
              {IMMERSIVE_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`py-1.5 px-0.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                    activeSlide === idx
                      ? 'bg-[#C41625] text-white shadow-xs font-bold'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {s.id === 'DESRATIZACIÓN' ? 'Desratización' : s.id === 'DESINSECTACIÓN' ? 'Desinsectación' : 'Sanitización'}
                </button>
              ))}
            </div>

            {/* 2. Real Photo Banner with Official Badge */}
            <div className="relative h-32 w-full overflow-hidden bg-neutral-900">
              <img
                key={currentSlide.image}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute top-2 left-2">
                <span className="inline-flex items-center gap-1 text-[9.5px] font-bold bg-[#C41625] text-white px-2.5 py-0.5 rounded-full shadow-xs">
                  <ShieldCheck className="w-3 h-3 shrink-0" />
                  <span>{currentSlide.badge}</span>
                </span>
              </div>
              <div className="absolute bottom-2 left-3 right-3 text-white">
                <h3 className="font-editorial text-[1.05rem] font-bold leading-tight drop-shadow-xs">
                  {currentSlide.title}
                </h3>
              </div>
            </div>

            {/* 3. Authentic, Concise Deliverables */}
            <div className="p-3 bg-white">
              <p className="text-[11.5px] text-neutral-600 leading-snug">
                {currentSlide.subtitle}
              </p>

              {/* 3 Bullet Features */}
              <div className="mt-2.5 space-y-1 pt-2 border-t border-neutral-100">
                {currentSlide.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-neutral-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C41625] shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
              </div>

              {/* 4. Compact Price & Action Bar */}
              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Precio base</span>
                  <span className="text-sm font-bold text-neutral-900">Desde {currentSlide.priceBase}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      const srvName =
                        currentSlide.id === 'DESRATIZACIÓN'
                          ? 'Desratización'
                          : currentSlide.id === 'SANITIZACIÓN'
                          ? 'Sanitización'
                          : 'Desinsectación';
                      setQuote((prev) => ({ ...prev, servicio: srvName }));
                      document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-semibold px-3.5 py-2 rounded-full shadow-xs cursor-pointer transition active:scale-95"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + IMMERSIVE_SLIDES.length) % IMMERSIVE_SLIDES.length)
                    }
                    aria-label="Anterior"
                    className="w-7 h-7 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % IMMERSIVE_SLIDES.length)}
                    aria-label="Siguiente"
                    className="w-7 h-7 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 cursor-pointer"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW: Immersive Slider */}
          <div className="hidden md:flex relative rounded-[36px] overflow-hidden bg-[#111111] text-white min-h-[500px] flex-col justify-between shadow-xl">
            {/* Background Image */}
            <img
              key={currentSlide.image}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />

            {/* Subtle dark gradient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />

            {/* Top Bar */}
            <div className="relative z-10 px-10 pt-8 flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#C41625] text-white px-3.5 py-1.5 rounded-full shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                {currentSlide.badge}
              </span>

              <div className="flex items-center gap-5 text-[11px] tracking-[0.15em] uppercase">
                {IMMERSIVE_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`pb-1 transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'text-white font-semibold border-b-2 border-[#C41625]'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Content */}
            <div key={currentSlide.id} className="relative z-10 px-10 pb-10 animate-fade-up">
              <div className="max-w-2xl">
                <span className="text-xs font-mono uppercase tracking-widest text-[#ff6b78]">
                  Especialidad {currentSlide.num} / 03
                </span>
                <h3 className="font-editorial text-3xl font-bold tracking-tight text-white leading-tight mt-1">
                  {currentSlide.title}
                </h3>
                <p className="text-sm text-neutral-200 mt-2 leading-relaxed font-light">
                  {currentSlide.subtitle}
                </p>

                {/* Features Pill Strip */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {currentSlide.features.map((f, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-black/50 backdrop-blur-md border border-white/15 text-white/90 text-xs px-3.5 py-1.5 rounded-full"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ff6b78]" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 pt-5 border-t border-white/15">
                <button
                  onClick={() => {
                    const srvName =
                      currentSlide.id === 'DESRATIZACIÓN'
                        ? 'Desratización'
                        : currentSlide.id === 'SANITIZACIÓN'
                        ? 'Sanitización'
                        : 'Desinsectación';
                    setQuote((prev) => ({ ...prev, servicio: srvName }));
                    document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#141414] hover:bg-[#C41625] hover:text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer shadow-md"
                >
                  <span>Cotizar este servicio (Desde {currentSlide.priceBase})</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + IMMERSIVE_SLIDES.length) % IMMERSIVE_SLIDES.length)
                    }
                    aria-label="Anterior"
                    className="w-9 h-9 rounded-full border border-white/25 hover:border-white bg-black/40 flex items-center justify-center transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveSlide((prev) => (prev + 1) % IMMERSIVE_SLIDES.length)}
                    aria-label="Siguiente"
                    className="w-9 h-9 rounded-full border border-white/25 hover:border-white bg-black/40 flex items-center justify-center transition cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SECCIÓN DE TRABAJOS (2 LÍNEAS EN LOOP OPUESTO) ================= */}
        <section id="trabajos" className="py-6 sm:py-10 overflow-hidden bg-neutral-50/60">
          <div className="space-y-3 sm:space-y-4">
            {/* Línea 1: Desplazamiento continuo izquierda */}
            <div className="overflow-hidden relative flex">
              <div className="animate-marquee-left flex gap-3 sm:gap-4 shrink-0">
                {[...TRABAJOS_ROW_1, ...TRABAJOS_ROW_1].map((src, i) => (
                  <img
                    key={`row1-${i}`}
                    src={src}
                    alt="Trabajo de control de plagas en terreno en Puerto Montt"
                    loading="lazy"
                    className="w-64 sm:w-80 md:w-96 h-44 sm:h-56 md:h-60 object-cover rounded-2xl shadow-xs shrink-0 select-none pointer-events-none"
                  />
                ))}
              </div>
            </div>

            {/* Línea 2: Desplazamiento continuo derecha (dirección opuesta) */}
            <div className="overflow-hidden relative flex">
              <div className="animate-marquee-right flex gap-3 sm:gap-4 shrink-0">
                {[...TRABAJOS_ROW_2, ...TRABAJOS_ROW_2].map((src, i) => (
                  <img
                    key={`row2-${i}`}
                    src={src}
                    alt="Fumigación y desratización en Puerto Montt"
                    loading="lazy"
                    className="w-64 sm:w-80 md:w-96 h-44 sm:h-56 md:h-60 object-cover rounded-2xl shadow-xs shrink-0 select-none pointer-events-none"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================= POR QUÉ ELEGIRNOS / GARANTÍA SEREMI ================= */}
        <section id="garantia" className="max-w-7xl mx-auto px-6 sm:px-10 py-10 md:py-16">
          <div className="bg-[#181818] text-white rounded-[32px] p-8 sm:p-12 shadow-xl">
            <div className="max-w-3xl mb-10">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#ff6b78]">
                Confianza y Respaldo Legal
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold mt-1 text-white">
                ¿Por qué confiar en Patagonia Control de Plagas?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2">
                Cumplimos rigurosamente con los decretos y resoluciones sanitarias de la SEREMI de Salud de la Región de Los Lagos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <Award className="w-8 h-8 text-[#ff6b78]" />
                <h3 className="font-editorial text-lg font-bold">Certificado SEREMI</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Documento oficial timbrado exigido por inspectores municipales, SESMA y auditorías sanitarias en Puerto Montt.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <Sparkles className="w-8 h-8 text-[#ff6b78]" />
                <h3 className="font-editorial text-lg font-bold">Sin Olores Tóxicos</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Formulaciones microencapsuladas aprobadas por el ISP que no manchan y permiten volver a habitar en 2 horas.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <Clock className="w-8 h-8 text-[#ff6b78]" />
                <h3 className="font-editorial text-lg font-bold">Atención 24/7</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Respuesta inmediata ante emergencias en plantas procesadoras, restaurantes y hogares en la zona urbana y rural.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                <ShieldCheck className="w-8 h-8 text-[#ff6b78]" />
                <h3 className="font-editorial text-lg font-bold">Garantía Escrita</h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Hasta 6 meses de cobertura. Si la plaga reaparece en el período de garantía, realizamos refuerzo gratuito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COBERTURA PUERTO MONTT & ALREDEDORES ================= */}
        <section id="zonas" className="max-w-7xl mx-auto px-6 sm:px-10 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
                Cobertura Local Inmediata
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
                Zonas de Atención en Puerto Montt
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-md">
              Desplazamiento rápido con cuadrillas equipadas para toda la comuna y comunas aledañas de la provincia de Llanquihue.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {COBERTURA_SECTORES.map((sector, i) => (
              <div
                key={i}
                className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-4 hover:border-[#C41625] transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#C41625] shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-[#C41625] transition">
                    {sector.nombre}
                  </h3>
                </div>
                <p className="text-[11px] text-neutral-500 pl-6">{sector.detalle}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#C41625]/8 border border-[#C41625]/20 rounded-2xl p-4 text-center text-xs text-neutral-700">
            📍 ¿No ves tu sector o requieres servicio en sector rural? <strong>Contáctanos directamente:</strong> cubrimos parcelas en Los Muermos, Calbuco, Fresia y Frutillar.
          </div>
        </section>

        {/* ================= SINGLE-BOX EASY QUOTER (COTIZADOR EN UN SOLO CUADRO) ================= */}
        <section id="cotizador" className="max-w-3xl mx-auto px-4 sm:px-8 py-8 md:py-14">
          <div className="bg-white border border-neutral-200/90 rounded-[32px] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-neutral-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
                  Presupuesto en Línea
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 mt-0.5">
                  Cotizador Rápido de Plagas
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Calcula tu presupuesto estimado para Puerto Montt
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-neutral-400 block">Estimado</span>
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#C41625]">
                  {formatCLP(estimatedTotal)}
                </span>
              </div>
            </div>

            {quote.enviado ? (
              <div className="py-8 text-center space-y-4 animate-scale-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-2xl font-bold text-neutral-900">
                  ¡Cotización Recibida!
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                  Hemos registrado tu solicitud para <strong>{quote.nombre}</strong> ({quote.servicio} en {quote.lugar}) por un estimado de{' '}
                  <strong className="text-[#C41625]">{formatCLP(estimatedTotal)}</strong>. Un especialista técnico te contactará en menos de 15 minutos.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <a
                    href={whatsappLink(`Hola, recién solicité la cotización para ${quote.servicio} en ${quote.direccion || 'Puerto Montt'}. ¿Cuándo podrían visitarme?`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-6 py-3 rounded-full transition shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Hablar por WhatsApp Ahora</span>
                  </a>
                  <button
                    onClick={() => setQuote((prev) => ({ ...prev, enviado: false }))}
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold px-6 py-3 rounded-full transition cursor-pointer"
                  >
                    Cotizar otro servicio
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendQuote} className="mt-6 space-y-5">
                {/* 1. Servicio */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-600 mb-2">
                    1. ¿Qué servicio requieres?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {['Desratización', 'Desinsectación', 'Sanitización'].map((srv) => (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => setQuote({ ...quote, servicio: srv })}
                        className={`h-11 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center text-center transition cursor-pointer ${
                          quote.servicio === srv
                            ? 'bg-[#181818] text-white border-[#181818] shadow-sm'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 bg-neutral-50/50'
                        }`}
                      >
                        {srv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Lugar y Tamaño en una fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2">
                      2. Tipo de propiedad
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Hogar', 'Local', 'Empresa'].map((lug) => (
                        <button
                          type="button"
                          key={lug}
                          onClick={() => setQuote({ ...quote, lugar: lug })}
                          className={`h-10 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center text-center transition cursor-pointer ${
                            quote.lugar === lug
                              ? 'border-[#C41625] bg-[#C41625]/8 text-[#C41625]'
                              : 'border-neutral-200 text-neutral-600 bg-neutral-50/50'
                          }`}
                        >
                          {lug}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-600 mb-2">
                      3. Tamaño aproximado
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Pequeño', 'Mediano', 'Grande'].map((tam) => (
                        <button
                          type="button"
                          key={tam}
                          onClick={() => setQuote({ ...quote, tamano: tam })}
                          className={`h-10 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center text-center transition cursor-pointer ${
                            quote.tamano === tam
                              ? 'border-[#C41625] bg-[#C41625]/8 text-[#C41625]'
                              : 'border-neutral-200 text-neutral-600 bg-neutral-50/50'
                          }`}
                        >
                          {tam}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Datos de Contacto Rápidos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Nombre o Empresa *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez"
                      value={quote.nombre}
                      onChange={(e) => setQuote({ ...quote, nombre: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200 focus:border-[#C41625] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+56 9 8888 7777"
                      value={quote.telefono}
                      onChange={(e) => setQuote({ ...quote, telefono: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200 focus:border-[#C41625] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-500 mb-1">Sector en Puerto Montt *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Alerce / Pelluco"
                      value={quote.direccion}
                      onChange={(e) => setQuote({ ...quote, direccion: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-neutral-200 focus:border-[#C41625] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#C41625] hover:bg-[#a6121f] text-white text-sm font-semibold py-3.5 rounded-full transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Solicitar Cotización ({formatCLP(estimatedTotal)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ================= PREGUNTAS FRECUENTES (FAQ SEO ACCORDION) ================= */}
        <section id="faq" className="max-w-4xl mx-auto px-6 sm:px-10 py-10 md:py-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C41625]">
              Resolvemos tus Dudas
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-neutral-900 mt-1">
              Preguntas Frecuentes
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Todo lo que necesitas saber antes de contratar control de plagas en Puerto Montt
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-neutral-50 border border-neutral-200/90 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-neutral-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C41625] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-200/60 pt-3 animate-fade-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-20 md:bottom-6 right-5 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-[0_8px_25px_rgba(16,185,129,0.4)] flex items-center gap-2.5 transition-transform hover:scale-105 group"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline text-xs font-bold pr-1">WhatsApp 24/7</span>
      </a>

      {/* ================= MINIMALIST, HIGH-CONVERTING FOOTER ================= */}
      <footer className="bg-[#181818] text-white mt-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-3">
            <img src="/logo-patagonia.png" alt="Patagonia Control de Plagas" className="h-12 w-auto" />
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Empresa líder en saneamiento ambiental y control integral de plagas urbanas e industriales en Puerto Montt, Alerce y la Región de Los Lagos.
            </p>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-neutral-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff6b78]" />
              <span>Resolución Sanitaria SEREMI Los Lagos N° 8841</span>
            </div>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs text-neutral-300">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Contacto & Ubicación</p>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#ff6b78]" />
              Av. Diego Portales 1450, Puerto Montt, Chile
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-[#ff6b78]" />
              +56 9 7866 6690 / +56 65 225 8900
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#ff6b78]" />
              Atención continuada: Lunes a Domingo 24/7
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs text-neutral-400">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Servicios Rápidos</p>
            <div className="flex flex-col gap-1.5">
              <a href="#servicios-slider" className="hover:text-white transition">Desratización Certificada</a>
              <a href="#servicios-slider" className="hover:text-white transition">Desinsectación Araña de Rincón</a>
              <a href="#servicios-slider" className="hover:text-white transition">Sanitización ULV Clínicas</a>
              <a href="#cotizador" className="hover:text-white transition">Cotizador en Línea</a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 px-6 sm:px-10 text-center text-[11px] text-neutral-500">
          © {new Date().getFullYear()} Patagonia Control de Plagas SpA • Puerto Montt, Región de Los Lagos, Chile. Todos los derechos reservados.
        </div>
      </footer>

      {/* ================= NATIVE MOBILE APP BOTTOM NAVIGATION BAR (< md) ================= */}
      <nav
        aria-label="Navegación Móvil"
        className="fixed md:hidden bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200/80 px-4 py-2 flex items-center justify-around shadow-[0_-8px_25px_rgba(0,0,0,0.06)]"
      >
        <button
          onClick={() => {
            setActiveBottomNav('inicio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeBottomNav === 'inicio' ? 'text-[#C41625] font-semibold' : 'text-neutral-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Inicio</span>
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('servicios');
            document.getElementById('servicios-slider')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeBottomNav === 'servicios' ? 'text-[#C41625] font-semibold' : 'text-neutral-500'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px]">Servicios</span>
        </button>

        {/* Center Floating CTA Button */}
        <button
          onClick={() => handleOpenBooking('Desinsectación', 'Inspección General')}
          className="flex flex-col items-center justify-center -mt-6 bg-[#C41625] text-white w-13 h-13 rounded-full shadow-[0_6px_20px_rgba(196,22,37,0.4)] active:scale-95 transition cursor-pointer"
          title="Solicitar Inspección"
        >
          <Calendar className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            setActiveBottomNav('cotizar');
            document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer ${
            activeBottomNav === 'cotizar' ? 'text-[#C41625] font-semibold' : 'text-neutral-500'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px]">Cotizar</span>
        </button>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl text-emerald-600 transition"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>
      </nav>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fade-up">
          <div className="w-full max-w-xs bg-[#181818] text-white h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <img src="/logo-patagonia.png" alt="Patagonia" className="h-11 w-auto" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-2">
                <a
                  href="#top"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Inicio</span>
                </a>
                <a
                  href="#servicios-slider"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Servicios Sanitarios</span>
                </a>
                <a
                  href="#trabajos"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Trabajos en Terreno</span>
                </a>
                <a
                  href="#garantia"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Resolución SEREMI</span>
                </a>
                <a
                  href="#zonas"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Zonas de Cobertura</span>
                </a>
                <a
                  href="#cotizador"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Cotizador Rápido</span>
                </a>
                <a
                  href="#faq"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 text-sm font-medium transition"
                >
                  <span>Preguntas Frecuentes</span>
                </a>

                <a
                  href="tel:+56978666690"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-[#C41625] text-white text-xs font-semibold py-3 px-4 rounded-xl transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Llamar: +56 9 7866 6690</span>
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-neutral-400">
              Puerto Montt, Región de Los Lagos
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: SOLICITAR INSPECCIÓN ================= */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-3xl p-6 shadow-2xl animate-drawer-up">
            <div className="w-12 h-1.5 bg-neutral-200 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C41625]">
                  Atención en Puerto Montt
                </span>
                <h2 className="font-editorial text-2xl font-bold text-neutral-900">
                  Solicitar Inspección
                </h2>
              </div>
              <button
                onClick={() => setBookingOpen(false)}
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-6 text-center space-y-4 animate-scale-in">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-neutral-900">
                  ¡Inspección Agendada!
                </h3>
                <p className="text-xs text-neutral-600">
                  Orden registrada para {bookingSuccess.clienteNombre}. Nuestro técnico se coordinará contigo de inmediato.
                </p>
                <div className="flex gap-2 pt-2">
                  <a
                    href={whatsappLink(`Hola, acabo de solicitar una inspección técnica para ${bookingSuccess.clienteNombre}. Quisiera confirmar la hora.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 rounded-full text-center"
                  >
                    Confirmar por WhatsApp →
                  </a>
                  <button
                    onClick={() => setBookingOpen(false)}
                    className="flex-1 bg-neutral-100 text-neutral-800 text-xs font-semibold py-3 rounded-full cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="mt-4 space-y-3.5 text-xs sm:text-sm">
                <input
                  type="text"
                  required
                  placeholder="Nombre o Empresa *"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#C41625] focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Teléfono / WhatsApp *"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#C41625] focus:outline-none"
                />
                <input
                  type="text"
                  required
                  placeholder="Dirección o Sector en Puerto Montt *"
                  value={form.direccion}
                  onChange={(e) => setForm({ ...form, direccion: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:border-[#C41625] focus:outline-none"
                />
                <div className="grid grid-cols-3 gap-2">
                  {['Desratización', 'Desinsectación', 'Sanitización'].map((srv) => (
                    <button
                      type="button"
                      key={srv}
                      onClick={() => setForm({ ...form, servicio: srv })}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        form.servicio === srv
                          ? 'border-[#C41625] bg-[#C41625]/10 text-[#C41625]'
                          : 'border-neutral-200 text-neutral-600'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C41625] hover:bg-[#a6121f] text-white font-semibold py-3.5 rounded-full shadow-md transition cursor-pointer"
                >
                  Confirmar Solicitud de Inspección →
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
