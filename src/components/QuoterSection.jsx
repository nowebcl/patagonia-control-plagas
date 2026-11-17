import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  Camera,
  CheckCircle2,
  ExternalLink,
  Info,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Trash2,
  Building2,
  User
} from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';
import { trackQuoteSubmit, trackWhatsAppClick } from '../utils/analytics';

const PEST_OPTIONS = [
  'Roedores (ratas / ratones)',
  'Araña de rincón / Arácnidos',
  'Cucarachas / Chinitas',
  'Hormigas / Tijeretas / Rastreros',
  'Pulgas / Garrapatas / Ácaros',
  'Moscas / Mosquitos / Avispas',
  'Aves (palomas / gaviotas / estorninos)',
  'Malezas / Control vegetal',
  'Desinfección preventiva ambiental',
  'Programa integral MIP (varias plagas)',
  'Otra / Necesito diagnóstico en terreno'
];

const PROPERTY_TYPES = [
  { value: 'vivienda', label: 'Vivienda particular (Casa / Depto)', commercial: false },
  { value: 'local', label: 'Local comercial / Restaurante', commercial: true },
  { value: 'condominio', label: 'Condominio / Edificio', commercial: true },
  { value: 'bodega', label: 'Bodega / Centro logístico', commercial: true },
  { value: 'industria', label: 'Industria / Planta procesadora', commercial: true },
  { value: 'acuicola', label: 'Empresa acuícola / Pesquera', commercial: true },
  { value: 'educacion-salud', label: 'Colegio / Jardín / Centro médico', commercial: true },
  { value: 'hoteleria', label: 'Hotel / Cabaña / Turismo', commercial: true },
  { value: 'pre-demolicion', label: 'Inmueble o sitio para demolición', commercial: true },
  { value: 'institucion', label: 'Institución pública / Oficina', commercial: true }
];

const DEFAULT_PEST_BY_SERVICE = {
  desratizacion: 'Roedores (ratas / ratones)',
  desinsectacion: 'Araña de rincón / Arácnidos',
  sanitizacion: 'Desinfección preventiva ambiental',
  'control-de-aves': 'Aves (palomas / gaviotas / estorninos)',
  'control-de-malezas': 'Malezas / Control vegetal',
  'desratizacion-pre-demolicion': 'Roedores (ratas / ratones)',
  'manejo-integrado-de-plagas': 'Programa integral MIP (varias plagas)',
  'estaciones-cebaderas': 'Roedores (ratas / ratones)',
  'programas-preventivos': 'Programa integral MIP (varias plagas)'
};

export default function QuoterSection({ preselectedComuna = '', preselectedComunaTick = 0 }) {
  const { config, preselectedServiceId, setPreselectedServiceId, addQuoteRequest, buildWhatsAppUrl } =
    useSiteContent();

  const mountedAtRef = useRef(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    mountedAtRef.current = Date.now();
  }, []);

  const serviceId = preselectedServiceId || config.services[0]?.id || 'desratizacion';
  const [trackedServiceId, setTrackedServiceId] = useState(serviceId);
  const [trackedComunaTick, setTrackedComunaTick] = useState(preselectedComunaTick);

  const [pestType, setPestType] = useState(DEFAULT_PEST_BY_SERVICE[serviceId] || PEST_OPTIONS[0]);
  const [propertyType, setPropertyType] = useState('vivienda');
  const [contractMode, setContractMode] = useState('puntual');
  const [sqm, setSqm] = useState('90');
  const [scope, setScope] = useState('Ambos (Interior y Exterior)');
  const [comuna, setComuna] = useState(preselectedComuna || config.coverageAreas[0]?.name || 'Puerto Montt');
  const [sector, setSector] = useState('');
  const [address, setAddress] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [photos, setPhotos] = useState([]);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(true);
  const [honeypot, setHoneypot] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState(null);

  if (serviceId !== trackedServiceId) {
    setTrackedServiceId(serviceId);
    if (DEFAULT_PEST_BY_SERVICE[serviceId]) {
      setPestType(DEFAULT_PEST_BY_SERVICE[serviceId]);
    }
    if (serviceId === 'desratizacion-pre-demolicion') {
      setPropertyType('pre-demolicion');
      setContractMode('puntual');
    } else {
      if (propertyType === 'pre-demolicion') {
        setPropertyType('vivienda');
      }
      if (
        serviceId === 'manejo-integrado-de-plagas' ||
        serviceId === 'programas-preventivos' ||
        serviceId === 'estaciones-cebaderas'
      ) {
        setContractMode('contrato');
      }
    }
  }

  if (preselectedComuna && preselectedComunaTick !== trackedComunaTick) {
    setTrackedComunaTick(preselectedComunaTick);
    setComuna(preselectedComuna);
  }

  useEffect(() => {
    return () => {
      photos.forEach((p) => {
        if (p.previewUrl) URL.revokeObjectURL(p.previewUrl);
      });
    };
  }, [photos]);

  const selectedService = useMemo(
    () => config.services.find((s) => s.id === serviceId) || config.services[0],
    [config.services, serviceId]
  );

  const selectedPropMeta = useMemo(
    () => PROPERTY_TYPES.find((p) => p.value === propertyType) || PROPERTY_TYPES[0],
    [propertyType]
  );

  const numericSqm = Math.max(0, Number(sqm) || 0);

  const pricingEvaluation = useMemo(() => {
    const forceCustom =
      !selectedService ||
      selectedService.isCustomQuote ||
      !selectedService.priceBase ||
      contractMode === 'contrato' ||
      selectedPropMeta.commercial ||
      numericSqm > 280;

    if (forceCustom) {
      return {
        isCustom: true,
        label: 'Cotización personalizada',
        sublabel: 'Se evalúa según superficie, rubro, frecuencia y requerimientos sanitarios.',
        estimatedValue: null
      };
    }

    const base = Number(selectedService.priceBase);
    const extraSqm = Math.max(0, numericSqm - 120);
    const extraFactor = Math.ceil(extraSqm / 50) * 8000;
    const scopeExtra = scope === 'Ambos (Interior y Exterior)' ? 5000 : 0;
    const total = base + extraFactor + scopeExtra;

    return {
      isCustom: false,
      label: `Desde $${total.toLocaleString('es-CL')} ${config.company.ivaLabel}`,
      sublabel: 'Valor referencial sujeto a confirmación técnica en terreno y características del inmueble.',
      estimatedValue: total
    };
  }, [selectedService, contractMode, selectedPropMeta, numericSqm, scope, config.company.ivaLabel]);

  const handleServiceChange = (newId) => {
    setPreselectedServiceId(newId);
    setSubmittedRecord(null);
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const remainingSlots = Math.max(0, 4 - photos.length);
    const picked = files.slice(0, remainingSlots).map((file) => ({
      name: file.name,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      previewUrl: URL.createObjectURL(file)
    }));

    setPhotos((prev) => [...prev, ...picked]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((_, idx) => idx !== index);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Anti-spam verification
    if (honeypot.trim() !== '') {
      return;
    }
    if (Date.now() - mountedAtRef.current < 1200) {
      setErrorMsg('Por favor revisa los datos antes de enviar.');
      return;
    }

    if (!clientName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg('Completa tu nombre o razón social, teléfono y dirección para generar la solicitud.');
      return;
    }
    if (!acceptedPrivacy) {
      setErrorMsg('Debes aceptar la política de privacidad para enviar tu solicitud.');
      return;
    }

    const photoListText =
      photos.length > 0
        ? `${photos.length} imagen(es) adjuntada(s) (${photos.map((p) => p.name).join(', ')}) — Las enviaré en este chat.`
        : 'Sin fotografías adjuntas.';

    const messageLines = [
      `*SOLICITUD DE COTIZACIÓN — ${config.company.brandName.toUpperCase()}*`,
      `----------------------------------------`,
      `• *Servicio:* ${selectedService?.title || serviceId}`,
      `• *Tipo de plaga:* ${pestType}`,
      `• *Tipo de propiedad:* ${selectedPropMeta.label}`,
      `• *Modalidad:* ${contractMode === 'contrato' ? 'Contrato periódico / Programa MIP' : 'Servicio puntual'}`,
      `• *Superficie aproximada:* ${numericSqm || 'Por confirmar'} m²`,
      `• *Área a tratar:* ${scope}`,
      `• *Comuna:* ${comuna}`,
      `• *Sector:* ${sector.trim() || 'No especificado'}`,
      `• *Dirección:* ${address.trim()}`,
      `----------------------------------------`,
      `• *Cliente / Razón Social:* ${clientName.trim()}`,
      `• *Teléfono:* ${phone.trim()}`,
      `• *Email:* ${email.trim() || 'No informado'}`,
      `• *Referencia:* ${pricingEvaluation.label}`,
      `• *Fotografías:* ${photoListText}`,
      details.trim() ? `• *Observaciones:* ${details.trim()}` : null
    ].filter(Boolean);

    const fullMessage = messageLines.join('\n');
    const waUrl = buildWhatsAppUrl(fullMessage);

    const record = addQuoteRequest({
      serviceId,
      serviceTitle: selectedService?.title || serviceId,
      pestType,
      propertyType: selectedPropMeta.label,
      contractMode,
      sqm: numericSqm,
      scope,
      comuna,
      sector: sector.trim(),
      address: address.trim(),
      clientName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      photoCount: photos.length,
      priceReference: pricingEvaluation.label,
      isCustomQuote: pricingEvaluation.isCustom,
      whatsappUrl: waUrl
    });

    trackQuoteSubmit(selectedService?.title || serviceId, comuna, pricingEvaluation.isCustom);
    trackWhatsAppClick('quoter_submit');

    setSubmittedRecord({ ...record, whatsappUrl: waUrl, hasPhotos: photos.length > 0 });
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cotizador" className="py-16 sm:py-24 px-5 sm:px-8 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-neutral-200/90 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Side: Minimal Warm-Stone Technical Summary */}
          <div className="lg:col-span-5 bg-[#F8F8F7] text-neutral-900 p-7 sm:p-10 border-b lg:border-b-0 lg:border-r border-neutral-200/80 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-[#C41625]">
                  <Calculator className="w-3.5 h-3.5" /> Cotizador en Línea
                </span>
                <h2 className="font-editorial text-3xl font-bold mt-2 leading-tight text-neutral-900">
                  Solicita tu cotización técnica
                </h2>
                <p className="text-neutral-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  Envía los antecedentes de tu inmueble o empresa y recibe la evaluación directamente en nuestro WhatsApp{' '}
                  <strong className="text-neutral-900">{config.company.whatsappDisplay}</strong>.
                </p>
              </div>

              {/* Dynamic Reference Price Block */}
              <div className="border-y border-neutral-200 py-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Servicio seleccionado</span>
                  <span className="text-[#C41625] font-semibold">
                    {contractMode === 'contrato' ? 'Programa Periódico' : 'Servicio Puntual'}
                  </span>
                </div>
                <p className="font-semibold text-base text-neutral-900">{selectedService?.title}</p>

                <div className="pt-2">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-wider">Estimación de valor</p>
                  <p className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-900 mt-0.5">
                    {pricingEvaluation.label}
                  </p>
                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed">{pricingEvaluation.sublabel}</p>
                </div>

                <div className="pt-2 flex items-start gap-2 text-[11px] text-neutral-500 leading-relaxed">
                  <Info className="w-3.5 h-3.5 text-[#C41625] shrink-0 mt-0.5" />
                  <span>
                    Trabajos especiales, contratos empresariales y pre-demolición requieren cotización personalizada.
                    Los valores con monto indican claramente <strong>{config.company.ivaLabel}</strong>.
                  </span>
                </div>
              </div>

              {/* Sanitary Backing Reminder */}
              <div className="space-y-2.5 text-xs text-neutral-600">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#C41625] shrink-0 mt-0.5" />
                  <p>
                    Respaldo sanitario: <strong className="text-neutral-900">{config.company.rexSanitaria}</strong> ·{' '}
                    {config.company.rexModificacion}.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C41625] shrink-0 mt-0.5" />
                  <p>Cobertura en Puerto Montt, Puerto Varas, Osorno, Chiloé y Región de Los Lagos.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-neutral-200 text-[11px] text-neutral-500">
              {config.company.legalName} · Director Técnico: {config.company.technicalDirector}
            </div>
          </div>

          {/* Right Side: Full Form */}
          <div className="lg:col-span-7 p-7 sm:p-10 bg-white">
            {submittedRecord ? (
              <div className="h-full flex flex-col justify-center space-y-5 py-4">
                <div className="inline-flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full w-fit text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Solicitud preparada ({submittedRecord.id})
                </div>

                <div>
                  <h3 className="font-editorial text-2xl font-bold text-neutral-900">
                    Tu solicitud está lista para enviar por WhatsApp
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1.5 leading-relaxed">
                    Si no se abrió automáticamente la ventana de WhatsApp hacia{' '}
                    <strong>{config.company.whatsappDisplay}</strong>, haz clic en el botón verde de abajo.
                  </p>
                </div>

                {submittedRecord.hasPhotos && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                    <p className="font-bold">Recordatorio sobre tus fotografías:</p>
                    <p>
                      Por limitaciones técnicas de WhatsApp Web/App, las imágenes seleccionadas no se transfieren
                      automáticamente en el enlace. Adjúntalas directamente dentro del chat que se abrirá con nosotros.
                    </p>
                  </div>
                )}

                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 text-xs text-neutral-700 space-y-1.5">
                  <p>
                    <strong>Servicio:</strong> {submittedRecord.serviceTitle}
                  </p>
                  <p>
                    <strong>Plaga / Propiedad:</strong> {submittedRecord.pestType} · {submittedRecord.propertyType}
                  </p>
                  <p>
                    <strong>Ubicación:</strong> {submittedRecord.address}, {submittedRecord.sector ? `${submittedRecord.sector}, ` : ''}
                    {submittedRecord.comuna}
                  </p>
                  <p>
                    <strong>Referencia:</strong> {submittedRecord.priceReference}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={submittedRecord.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5b] text-white text-sm font-bold px-6 py-3 rounded-full shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir WhatsApp {config.company.whatsappDisplay}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedRecord(null)}
                    className="px-5 py-3 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
                  >
                    Nueva cotización
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot anti-spam hidden field */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Modalidad: Puntual vs Contrato */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                    Frecuencia / Modalidad requerida
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setContractMode('puntual')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        contractMode === 'puntual'
                          ? 'bg-[#181818] text-white border-[#181818]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Servicio puntual</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setContractMode('contrato')}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                        contractMode === 'contrato'
                          ? 'bg-[#181818] text-white border-[#181818]'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span>Contrato periódico / MIP</span>
                    </button>
                  </div>
                </div>

                {/* Servicio solicitado + Tipo de Plaga */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Servicio solicitado *
                    </label>
                    <select
                      value={serviceId}
                      onChange={(e) => handleServiceChange(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    >
                      {config.services.map((srv) => (
                        <option key={srv.id} value={srv.id}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Tipo de plaga o necesidad *
                    </label>
                    <select
                      value={pestType}
                      onChange={(e) => setPestType(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    >
                      {PEST_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Tipo de propiedad + Superficie + Ámbito */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Tipo de propiedad *
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    >
                      {PROPERTY_TYPES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Superficie aprox. (m²)
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="50000"
                      value={sqm}
                      onChange={(e) => setSqm(e.target.value)}
                      placeholder="Ej: 120"
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Tratamiento requerido
                    </label>
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    >
                      <option value="Interior">Solo Interior</option>
                      <option value="Exterior">Solo Exterior / Perímetro</option>
                      <option value="Ambos (Interior y Exterior)">Ambos (Interior y Exterior)</option>
                    </select>
                  </div>
                </div>

                {/* Comuna + Sector + Dirección */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Comuna *
                    </label>
                    <select
                      value={comuna}
                      onChange={(e) => setComuna(e.target.value)}
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    >
                      {config.coverageAreas.map((area) => (
                        <option key={area.id} value={area.name}>
                          {area.name}
                        </option>
                      ))}
                      <option value="Otra zona del Sur de Chile (previa coordinación)">
                        Otra zona Sur de Chile (coordinar)
                      </option>
                    </select>
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Sector
                    </label>
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      placeholder="Ej: Valle Volcanes, Pelluco..."
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle y numeración"
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>
                </div>

                {/* Cliente / Razón Social + Teléfono + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Nombre o Razón Social *
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Nombre o empresa"
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+56 9 1234 5678"
                      required
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="correo@ejemplo.cl"
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>
                </div>

                {/* Adjuntar fotografías + Comentarios */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-start">
                  <div className="sm:col-span-5">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Adjuntar fotografías (opcional, máx. 4)
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="quoter-photos"
                    />
                    <label
                      htmlFor="quoter-photos"
                      className="flex items-center justify-center gap-2 w-full rounded-xl border border-dashed border-neutral-300 bg-neutral-50 hover:bg-neutral-100 px-3 py-2.5 text-xs font-medium text-neutral-700 cursor-pointer transition"
                    >
                      <Camera className="w-4 h-4 text-[#C41625]" />
                      <span>Seleccionar fotos ({photos.length}/4)</span>
                    </label>
                    {photos.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {photos.map((p, idx) => (
                          <div key={idx} className="relative w-12 h-12 rounded-lg overflow-hidden border border-neutral-200 group">
                            <img src={p.previewUrl} alt={p.name} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              title="Quitar imagen"
                              className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-7">
                    <label className="block text-xs font-semibold text-neutral-800 mb-1">
                      Detalles adicionales (horarios, accesos, urgencia)
                    </label>
                    <textarea
                      rows={2}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Indícanos detalles útiles para preparar tu evaluación técnica..."
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#C41625]"
                    />
                  </div>
                </div>

                {/* Privacy Checkbox */}
                <label className="flex items-start gap-2.5 text-xs text-neutral-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-300 text-[#C41625] focus:ring-[#C41625]"
                  />
                  <span>
                    Acepto que mis datos de contacto y ubicación se utilicen exclusivamente para preparar esta cotización
                    técnica según la{' '}
                    <Link to="/politica-de-privacidad" className="underline text-[#C41625] hover:text-[#a6121f]">
                      Política de Privacidad
                    </Link>
                    .
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-xs font-medium text-[#C41625] bg-red-50 border border-red-200 px-3.5 py-2 rounded-xl">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 bg-[#C41625] hover:bg-[#a6121f] text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-lg transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar cotización a WhatsApp</span>
                  </button>
                  <span className="text-[11px] text-neutral-500">
                    Envío directo a <strong>{config.company.whatsappDisplay}</strong>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
