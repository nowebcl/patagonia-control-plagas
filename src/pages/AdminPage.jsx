import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  Building2,
  Camera,
  Download,
  ExternalLink,
  FileText,
  Lock,
  MapPin,
  MessageCircle,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Star,
  Trash2,
  Upload,
  Wrench
} from 'lucide-react';
import { DEFAULT_SITE_CONFIG } from '../data/siteConfig';
import { useSiteContent } from '../context/SiteContentContext';
import { loadLocalMetrics } from '../utils/analytics';
import SeoHead from '../components/SeoHead';

const TABS = [
  { id: 'empresa', label: 'Empresa y Enlaces', icon: Building2 },
  { id: 'servicios', label: 'Servicios y Precios', icon: Wrench },
  { id: 'galeria', label: 'Galería de Trabajos', icon: Camera },
  { id: 'documentos', label: 'Documentos', icon: FileText },
  { id: 'cobertura', label: 'Cobertura y Reseñas', icon: MapPin },
  { id: 'metricas', label: 'Cotizaciones y Estadísticas', icon: BarChart3 },
  { id: 'respaldo', label: 'Exportar / Importar JSON', icon: Settings }
];

const GALLERY_CATEGORIES = [
  'Estaciones Cebaderas',
  'Desratización',
  'Desinsectación',
  'Sanitización',
  'Control de Aves',
  'Control de Malezas',
  'Pre-Demolición',
  'Trabajos Industriales'
];

export default function AdminPage() {
  const {
    config,
    updateCompany,
    updateService,
    addGalleryItem,
    removeGalleryItem,
    addReview,
    removeReview,
    addCoverageArea,
    removeCoverageArea,
    addDocumentItem,
    updateDocumentItem,
    removeDocumentItem,
    quoteRequests,
    importConfigJson,
    resetConfigToDefault
  } = useSiteContent();

  const [unlocked, setUnlocked] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [passError, setPassError] = useState('');
  const [activeTab, setActiveTab] = useState('empresa');
  const [saveToast, setSaveToast] = useState('');

  // Company form state
  const [companyForm, setCompanyForm] = useState(config.company);

  // Gallery new item form
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: GALLERY_CATEGORIES[0],
    location: 'Puerto Montt, Región de Los Lagos',
    image: '',
    caption: ''
  });

  // Coverage new item form
  const [newArea, setNewArea] = useState({
    name: '',
    province: 'Llanquihue',
    detail: '',
    x: 50,
    y: 55
  });

  // Review new item form
  const [newReview, setNewReview] = useState({
    author: '',
    sector: 'Cliente Residencial · Puerto Montt',
    rating: 5,
    text: ''
  });

  // Document new item form
  const [newDoc, setNewDoc] = useState({
    title: '',
    issuer: 'Emitido por Control de Plagas Patagonia Chile',
    category: 'Documentación',
    desc: '',
    previewSummary: ''
  });

  const [importText, setImportText] = useState('');
  const [metrics, setMetrics] = useState(() => loadLocalMetrics());

  const showToast = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (passInput.trim() === (config.company.adminPasscode || 'patagonia2026')) {
      setUnlocked(true);
      setPassError('');
      setCompanyForm(config.company);
    } else {
      setPassError('Clave incorrecta. Verifica tu contraseña de administración.');
    }
  };

  const handleSaveCompany = (e) => {
    e.preventDefault();
    updateCompany(companyForm);
    showToast('Datos de empresa y enlaces actualizados correctamente.');
  };

  const handleLocalImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxWidth = 900;
        const scale = Math.min(1, maxWidth / img.width);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setNewPhoto((prev) => ({ ...prev, image: compressedDataUrl }));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.title.trim() || !newPhoto.image.trim()) return;
    addGalleryItem(newPhoto);
    setNewPhoto({
      title: '',
      category: GALLERY_CATEGORIES[0],
      location: 'Puerto Montt, Región de Los Lagos',
      image: '',
      caption: ''
    });
    showToast('Fotografía agregada a la galería.');
  };

  const handleAddArea = (e) => {
    e.preventDefault();
    if (!newArea.name.trim()) return;
    addCoverageArea({
      ...newArea,
      x: Number(newArea.x) || 50,
      y: Number(newArea.y) || 50,
      primary: false
    });
    setNewArea({ name: '', province: 'Llanquihue', detail: '', x: 50, y: 55 });
    showToast('Comuna o localidad agregada al mapa de cobertura.');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.author.trim() || !newReview.text.trim()) return;
    addReview({ ...newReview, rating: Number(newReview.rating) || 5 });
    setNewReview({ author: '', sector: 'Cliente · Región de Los Lagos', rating: 5, text: '' });
    showToast('Reseña publicada en el sitio.');
  };

  const handleAddDoc = (e) => {
    e.preventDefault();
    if (!newDoc.title.trim() || !newDoc.desc.trim()) return;
    addDocumentItem(newDoc);
    setNewDoc({
      title: '',
      issuer: 'Emitido por Control de Plagas Patagonia Chile',
      category: 'Documentación',
      desc: '',
      previewSummary: ''
    });
    showToast('Documento técnico agregado.');
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patagonia-site-config-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    try {
      importConfigJson(importText);
      setImportText('');
      showToast('Configuración importada correctamente.');
    } catch {
      showToast('El texto JSON no tiene un formato válido.');
    }
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#181818] text-white flex items-center justify-center p-4">
        <SeoHead title={`Administración | ${config.company.brandName}`} path="/admin" noIndex />
        <div className="bg-white text-neutral-900 rounded-[28px] max-w-md w-full p-7 space-y-5 shadow-2xl">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C41625]">
              <Lock className="w-4 h-4" /> Panel de Administración
            </span>
            <Link to="/" className="text-xs font-semibold text-neutral-500 hover:text-neutral-900">
              Volver al sitio
            </Link>
          </div>
          <div>
            <h1 className="font-editorial text-2xl font-bold">{config.company.brandName}</h1>
            <p className="text-xs text-neutral-600 mt-1">
              Ingresa tu clave para editar tarifas referenciales, galería de trabajos, enlace a Central MIP, Perfil de Google, Google Analytics y reseñas.
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={passInput}
              onChange={(e) => setPassInput(e.target.value)}
              placeholder="Contraseña de administrador"
              className="w-full rounded-xl border border-neutral-300 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#C41625]"
              autoFocus
            />
            {passError && <p className="text-xs text-[#C41625] font-medium">{passError}</p>}
            <button
              type="submit"
              className="w-full bg-[#C41625] hover:bg-[#a6121f] text-white text-sm font-bold py-3 rounded-full transition cursor-pointer"
            >
              Ingresar al panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <SeoHead title={`Panel Admin | ${config.company.brandName}`} path="/admin" noIndex />

      {/* Header */}
      <header className="bg-[#181818] text-white px-4 sm:px-8 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-full"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Ver sitio web
            </Link>
            <div>
              <h1 className="font-bold text-sm sm:text-base">{config.company.brandName} — CMS</h1>
              <p className="text-[11px] text-neutral-400">Gestión autónoma de precios, galería y configuraciones</p>
            </div>
          </div>

          {saveToast && (
            <span className="bg-emerald-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
              {saveToast}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Tabs */}
        <div className="flex overflow-x-auto gap-2 pb-1">
          {TABS.map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#181818] text-white border-[#181818]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EMPRESA Y ENLACES */}
        {activeTab === 'empresa' && (
          <form onSubmit={handleSaveCompany} className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-5">
            <div>
              <h2 className="font-editorial text-2xl font-bold">Datos Comerciales, Central MIP & Google</h2>
              <p className="text-xs text-neutral-500 mt-1">
                Actualiza URLs externas (Central MIP, Google Perfil), Google Analytics GA4 y etiqueta de IVA para todo el sitio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Nombre comercial</label>
                <input
                  type="text"
                  value={companyForm.brandName}
                  onChange={(e) => setCompanyForm({ ...companyForm, brandName: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Razón social</label>
                <input
                  type="text"
                  value={companyForm.legalName}
                  onChange={(e) => setCompanyForm({ ...companyForm, legalName: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Resolución SEREMI principal</label>
                <input
                  type="text"
                  value={companyForm.rexSanitaria}
                  onChange={(e) => setCompanyForm({ ...companyForm, rexSanitaria: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Modificación Dirección Técnica</label>
                <input
                  type="text"
                  value={companyForm.rexModificacion}
                  onChange={(e) => setCompanyForm({ ...companyForm, rexModificacion: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Director Técnico</label>
                <input
                  type="text"
                  value={companyForm.technicalDirector}
                  onChange={(e) => setCompanyForm({ ...companyForm, technicalDirector: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">WhatsApp Empresarial (solo dígitos, ej: 56978666690)</label>
                <input
                  type="text"
                  value={companyForm.whatsappNumber}
                  onChange={(e) => setCompanyForm({ ...companyForm, whatsappNumber: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Teléfono / WhatsApp visible (ej: +56 9 7866 6690)</label>
                <input
                  type="text"
                  value={companyForm.whatsappDisplay}
                  onChange={(e) => setCompanyForm({ ...companyForm, whatsappDisplay: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Horario de atención visible</label>
                <input
                  type="text"
                  value={companyForm.schedule}
                  onChange={(e) => setCompanyForm({ ...companyForm, schedule: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Correo electrónico comercial (opcional)</label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  placeholder="contacto@tudominio.cl"
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Dirección física visible (opcional)</label>
                <input
                  type="text"
                  value={companyForm.address}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  placeholder="Ej: Puerto Montt, Región de Los Lagos"
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Etiqueta de IVA en precios referenciales</label>
                <select
                  value={companyForm.ivaLabel}
                  onChange={(e) => setCompanyForm({ ...companyForm, ivaLabel: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                >
                  <option value="+ IVA">+ IVA (Valores netos)</option>
                  <option value="IVA incluido">IVA incluido (Valores brutos)</option>
                </select>
              </div>
              <div>
                <label className="font-bold block mb-1">URL Portal Central MIP (Acceso Clientes)</label>
                <input
                  type="url"
                  value={companyForm.centralMipUrl}
                  onChange={(e) => setCompanyForm({ ...companyForm, centralMipUrl: e.target.value })}
                  placeholder="https://app.centralmip.cl/..."
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">URL Perfil de Empresa en Google (Reseñas)</label>
                <input
                  type="url"
                  value={companyForm.googleProfileUrl}
                  onChange={(e) => setCompanyForm({ ...companyForm, googleProfileUrl: e.target.value })}
                  placeholder="https://g.page/r/..."
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">ID de Google Analytics 4 (GA4)</label>
                <input
                  type="text"
                  value={companyForm.analyticsId}
                  onChange={(e) => setCompanyForm({ ...companyForm, analyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-bold px-6 py-3 rounded-full cursor-pointer"
            >
              <Save className="w-4 h-4" /> Guardar cambios de empresa
            </button>
          </form>
        )}

        {/* TAB 2: SERVICIOS Y PRECIOS */}
        {activeTab === 'servicios' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <h2 className="font-editorial text-2xl font-bold">Servicios, Precios Referenciales y Modalidad IVA</h2>
              <p className="text-xs text-neutral-600 mt-1">
                Activa “Cotización personalizada” para trabajos especiales, contratos periódicos o pre-demolición, o ajusta fácilmente el monto referencial ({config.company.ivaLabel}).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.services.map((srv) => (
                <div key={srv.id} className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-3 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#C41625]">{srv.category}</span>
                      <h3 className="font-bold text-sm text-neutral-900">{srv.title}</h3>
                    </div>
                    <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={srv.isCustomQuote}
                        onChange={(e) => {
                          updateService(srv.id, { isCustomQuote: e.target.checked });
                          showToast(`Actualizado: ${srv.shortTitle}`);
                        }}
                      />
                      <span>Cotización personalizada</span>
                    </label>
                  </div>

                  {!srv.isCustomQuote && (
                    <div>
                      <label className="font-semibold block mb-1">
                        Precio base referencial CLP ({config.company.ivaLabel})
                      </label>
                      <input
                        type="number"
                        value={srv.priceBase || 0}
                        onChange={(e) => updateService(srv.id, { priceBase: Number(e.target.value) || 0 })}
                        className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                      />
                    </div>
                  )}

                  <div>
                    <label className="font-semibold block mb-1">Título del servicio</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => updateService(srv.id, { title: e.target.value })}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Resumen comercial</label>
                    <textarea
                      rows={2}
                      value={srv.summary}
                      onChange={(e) => updateService(srv.id, { summary: e.target.value })}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1">Descripción técnica completa</label>
                    <textarea
                      rows={3}
                      value={srv.description}
                      onChange={(e) => updateService(srv.id, { description: e.target.value })}
                      className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALERÍA DE TRABAJOS */}
        {activeTab === 'galeria' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form onSubmit={handleAddPhoto} className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 text-xs h-fit">
              <h2 className="font-editorial text-xl font-bold">Agregar fotografía de trabajo en terreno</h2>

              <div>
                <label className="font-bold block mb-1">Título del trabajo *</label>
                <input
                  type="text"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  placeholder="Ej: Instalación de cordón cebadero"
                  required
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Categoría</label>
                  <select
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                  >
                    {GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Ubicación general (sin exponer cliente)</label>
                  <input
                    type="text"
                    value={newPhoto.location}
                    onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Subir foto desde dispositivo o pegar URL *</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalImageUpload}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-[#181818] file:text-white file:font-semibold"
                  />
                  <input
                    type="text"
                    value={newPhoto.image}
                    onChange={(e) => setNewPhoto({ ...newPhoto, image: e.target.value })}
                    placeholder="O pega ruta/URL (ej: /trabajos/trabajo-1.jpg)"
                    required
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Descripción técnica breve</label>
                <textarea
                  rows={2}
                  value={newPhoto.caption}
                  onChange={(e) => setNewPhoto({ ...newPhoto, caption: e.target.value })}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white font-bold py-3 rounded-full cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Publicar en Galería
              </button>
            </form>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {config.gallery.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-neutral-200 overflow-hidden flex flex-col justify-between">
                  <div>
                    <img src={item.image} alt={item.title} className="w-full h-40 object-cover bg-neutral-100" />
                    <div className="p-3.5 text-xs space-y-1">
                      <span className="text-[10px] font-bold text-[#C41625] uppercase">{item.category}</span>
                      <p className="font-bold text-neutral-900">{item.title}</p>
                      <p className="text-neutral-500">{item.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeGalleryItem(item.id);
                      showToast('Elemento eliminado de la galería.');
                    }}
                    className="mx-3.5 mb-3.5 inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 py-1.5 rounded-xl border border-red-200 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Quitar foto
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DOCUMENTOS TÉCNICOS */}
        {activeTab === 'documentos' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form onSubmit={handleAddDoc} className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 text-xs h-fit">
              <h2 className="font-editorial text-xl font-bold">Agregar documento o ficha de muestra</h2>

              <div>
                <label className="font-bold block mb-1">Título del documento *</label>
                <input
                  type="text"
                  value={newDoc.title}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  placeholder="Ej: Certificado Técnico de Desratización"
                  required
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Categoría</label>
                  <input
                    type="text"
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Emisor</label>
                  <input
                    type="text"
                    value={newDoc.issuer}
                    onChange={(e) => setNewDoc({ ...newDoc, issuer: e.target.value })}
                    className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Descripción *</label>
                <textarea
                  rows={2}
                  value={newDoc.desc}
                  onChange={(e) => setNewDoc({ ...newDoc, desc: e.target.value })}
                  required
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Detalle muestra anonimizada</label>
                <textarea
                  rows={2}
                  value={newDoc.previewSummary}
                  onChange={(e) => setNewDoc({ ...newDoc, previewSummary: e.target.value })}
                  placeholder="Resumen visible al abrir la muestra sin exponer datos de clientes..."
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#C41625] hover:bg-[#a6121f] text-white font-bold py-3 rounded-full cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Agregar Documento
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3 text-xs">
              {config.documentsShowcase.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl border border-neutral-200 p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={doc.title}
                        onChange={(e) => updateDocumentItem(doc.id, { title: e.target.value })}
                        className="font-bold text-neutral-900 rounded-lg border border-neutral-300 px-2.5 py-1.5"
                      />
                      <input
                        type="text"
                        value={doc.issuer}
                        onChange={(e) => updateDocumentItem(doc.id, { issuer: e.target.value })}
                        className="text-neutral-600 rounded-lg border border-neutral-300 px-2.5 py-1.5"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeDocumentItem(doc.id);
                        showToast('Documento eliminado.');
                      }}
                      className="text-red-600 p-1.5 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Eliminar documento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={doc.desc}
                    onChange={(e) => updateDocumentItem(doc.id, { desc: e.target.value })}
                    className="w-full rounded-lg border border-neutral-300 px-2.5 py-1.5 text-neutral-700"
                  />
                  <textarea
                    rows={2}
                    value={doc.previewSummary}
                    onChange={(e) => updateDocumentItem(doc.id, { previewSummary: e.target.value })}
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-neutral-600"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COBERTURA Y RESEÑAS */}
        {activeTab === 'cobertura' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cobertura */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 text-xs">
              <h2 className="font-editorial text-xl font-bold">Zonas de Cobertura Territorial</h2>
              <form onSubmit={handleAddArea} className="grid grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Nombre comuna / ciudad *"
                  value={newArea.name}
                  onChange={(e) => setNewArea({ ...newArea, name: e.target.value })}
                  required
                  className="rounded-xl border border-neutral-300 px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Provincia"
                  value={newArea.province}
                  onChange={(e) => setNewArea({ ...newArea, province: e.target.value })}
                  className="rounded-xl border border-neutral-300 px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Sectores / alcance"
                  value={newArea.detail}
                  onChange={(e) => setNewArea({ ...newArea, detail: e.target.value })}
                  className="col-span-2 rounded-xl border border-neutral-300 px-3 py-2"
                />
                <button type="submit" className="col-span-2 bg-[#181818] text-white font-bold py-2.5 rounded-full cursor-pointer">
                  + Agregar localidad
                </button>
              </form>

              <div className="max-h-72 overflow-y-auto space-y-2 pt-2">
                {config.coverageAreas.map((area) => (
                  <div key={area.id} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2">
                    <div>
                      <p className="font-bold">{area.name} <span className="font-normal text-neutral-500">({area.province})</span></p>
                      <p className="text-[11px] text-neutral-500">{area.detail}</p>
                    </div>
                    <button
                      onClick={() => removeCoverageArea(area.id)}
                      className="text-red-600 p-1.5 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Reseñas */}
            <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-4 text-xs">
              <h2 className="font-editorial text-xl font-bold">Reseñas y Testimonios de Clientes</h2>
              <form onSubmit={handleAddReview} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    placeholder="Nombre cliente o empresa *"
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    required
                    className="rounded-xl border border-neutral-300 px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Rubro / Comuna"
                    value={newReview.sector}
                    onChange={(e) => setNewReview({ ...newReview, sector: e.target.value })}
                    className="rounded-xl border border-neutral-300 px-3 py-2"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Texto de la reseña real (puedes copiarla desde Google) *"
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  required
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
                <button type="submit" className="w-full bg-[#C41625] text-white font-bold py-2.5 rounded-full cursor-pointer">
                  + Agregar reseña
                </button>
              </form>

              <div className="max-h-72 overflow-y-auto space-y-2 pt-2">
                {config.reviews.map((rev) => (
                  <div key={rev.id} className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 flex justify-between gap-3">
                    <div>
                      <p className="font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {rev.author}
                      </p>
                      <p className="text-[11px] text-neutral-500">{rev.sector}</p>
                      <p className="mt-1 text-neutral-700">{rev.text}</p>
                    </div>
                    <button
                      onClick={() => removeReview(rev.id)}
                      className="text-red-600 p-1.5 h-fit hover:bg-red-50 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: COTIZACIONES Y ESTADÍSTICAS */}
        {activeTab === 'metricas' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-neutral-600">
                Métricas locales del navegador + integración con Google Analytics 4 (GA4).
              </p>
              <button
                type="button"
                onClick={() => {
                  setMetrics(loadLocalMetrics());
                  showToast('Estadísticas actualizadas.');
                }}
                className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-xs font-semibold px-3.5 py-2 rounded-full cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Actualizar lectura
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: 'Visitas registradas (local)', value: metrics.pageViews || 0 },
                { label: 'Cotizaciones enviadas', value: metrics.quoteSubmissions || 0 },
                { label: 'Clics en WhatsApp', value: metrics.whatsappClicks || 0 },
                { label: 'Clics Acceso Clientes', value: metrics.clientPortalClicks || 0 },
                {
                  label: 'Google Analytics 4',
                  value: config.company.analyticsId ? config.company.analyticsId : 'Sin configurar'
                }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-4">
                  <p className="text-[11px] text-neutral-500 font-semibold">{stat.label}</p>
                  <p className="font-editorial text-xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl p-6 space-y-3">
              <h2 className="font-editorial text-xl font-bold">Servicios más consultados (local)</h2>
              {Object.keys(metrics.serviceViews || {}).length === 0 ? (
                <p className="text-xs text-neutral-500">
                  Aún no hay vistas registradas en fichas de servicio individuales desde este navegador.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                  {Object.entries(metrics.serviceViews)
                    .sort((a, b) => b[1] - a[1])
                    .map(([srvName, count]) => (
                      <div key={srvName} className="flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5">
                        <span className="font-semibold text-neutral-800 truncate pr-2">{srvName}</span>
                        <span className="font-bold text-[#C41625] shrink-0">{count}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="bg-white border border-neutral-200 rounded-3xl p-6 space-y-4">
              <h2 className="font-editorial text-xl font-bold">Historial local de cotizaciones generadas</h2>
              {quoteRequests.length === 0 ? (
                <p className="text-xs text-neutral-500">
                  Aún no se han generado cotizaciones desde este navegador. Las solicitudes reales también llegan directo al WhatsApp {config.company.whatsappDisplay}.
                </p>
              ) : (
                <div className="space-y-3">
                  {quoteRequests.map((q) => (
                    <div key={q.id} className="border border-neutral-200 rounded-2xl p-4 text-xs flex flex-wrap items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <p className="font-bold text-neutral-900">
                          {q.id} · {q.clientName} ({q.phone})
                        </p>
                        <p className="text-neutral-600">
                          {q.serviceTitle} · {q.comuna} {q.sector ? `(${q.sector})` : ''} · {q.sqm} m²
                        </p>
                        <p className="text-[#C41625] font-semibold">{q.priceReference}</p>
                      </div>
                      {q.whatsappUrl && (
                        <a
                          href={q.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] text-white font-bold px-4 py-2 rounded-full"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Reabrir WhatsApp <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: RESPALDO JSON */}
        {activeTab === 'respaldo' && (
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 space-y-5 text-xs">
            <div>
              <h2 className="font-editorial text-xl font-bold">Exportar, Importar o Restaurar Configuración</h2>
              <p className="text-neutral-600 mt-1">
                Los cambios hechos en este panel se guardan en este navegador. Exporta el archivo JSON si deseas respaldar o replicar los cambios en otro dispositivo o actualizar la configuración por defecto.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleDownloadJson}
                className="inline-flex items-center gap-2 bg-[#181818] text-white font-bold px-5 py-2.5 rounded-full cursor-pointer"
              >
                <Download className="w-4 h-4" /> Descargar respaldo JSON
              </button>
              <button
                onClick={() => {
                  resetConfigToDefault();
                  setCompanyForm(DEFAULT_SITE_CONFIG.company);
                  showToast('Configuración restaurada a valores originales.');
                }}
                className="inline-flex items-center gap-2 border border-red-300 text-red-700 font-bold px-5 py-2.5 rounded-full cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Restaurar valores por defecto
              </button>
            </div>

            <div className="space-y-2 pt-3 border-t border-neutral-200">
              <label className="font-bold block">Importar JSON de configuración</label>
              <textarea
                rows={4}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Pega aquí el contenido del archivo .json exportado previamente..."
                className="w-full rounded-xl border border-neutral-300 p-3 font-mono text-[11px]"
              />
              <button
                onClick={handleImportJson}
                className="inline-flex items-center gap-2 bg-[#C41625] text-white font-bold px-5 py-2.5 rounded-full cursor-pointer"
              >
                <Upload className="w-4 h-4" /> Importar JSON
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
