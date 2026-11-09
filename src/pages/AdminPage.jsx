import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  CreditCard,
  Plus,
  CheckCircle2,
  ArrowLeft,
  Phone,
  MapPin,
  Printer,
  TrendingUp,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { useDemoData } from '../context/DemoDataContext';

const formatCLP = (val) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(val || 0);

export default function AdminPage() {
  const {
    clients,
    appointments,
    payments,
    invoices,
    addClient,
    addInspectionRequest,
    updateAppointmentStatus,
    updatePaymentStatus,
    createInvoiceAndPayment
  } = useDemoData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'agendar' | 'cliente' | 'factura'
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const [quickForm, setQuickForm] = useState({
    nombre: '',
    rut: '76.543.210-K',
    telefono: '+56 9 ',
    direccion: '',
    servicio: 'Desinsectación',
    fecha: '2026-11-07',
    hora: '10:30',
    monto: 55000
  });

  // Dashboard Metrics
  const totalPagado = payments
    .filter((p) => p.estado === 'Pagado')
    .reduce((acc, p) => acc + Number(p.monto), 0);

  const totalPorCobrar = payments
    .filter((p) => p.estado !== 'Pagado')
    .reduce((acc, p) => acc + Number(p.monto), 0);

  const pendientesCount = appointments.filter((a) => a.estado !== 'Completado').length;
  const completadosCount = appointments.filter((a) => a.estado === 'Completado').length;
  const totalApps = Math.max(1, appointments.length);

  // Service distribution
  const desratCount = appointments.filter((a) => a.servicio === 'Desratización').length;
  const desinsCount = appointments.filter((a) => a.servicio === 'Desinsectación').length;
  const sanitCount = appointments.filter((a) => a.servicio === 'Sanitización').length;

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'agendar') {
      addInspectionRequest(quickForm);
    } else if (modalType === 'cliente') {
      addClient({
        nombre: quickForm.nombre,
        contacto: quickForm.nombre,
        rut: quickForm.rut,
        tipo: 'Empresa',
        telefono: quickForm.telefono,
        direccion: quickForm.direccion,
        sector: 'Puerto Montt',
        plan: quickForm.servicio
      });
    } else if (modalType === 'factura') {
      const inv = createInvoiceAndPayment({
        tipoDoc: 'Factura Electrónica',
        clienteNombre: quickForm.nombre,
        rut: quickForm.rut,
        direccion: quickForm.direccion || 'Puerto Montt',
        servicioDetalle: `Servicio ${quickForm.servicio}`,
        neto: Number(quickForm.monto) || 55000,
        estadoPago: 'Pagada'
      });
      setPreviewInvoice(inv);
    }
    setModalType(null);
    setQuickForm({
      nombre: '',
      rut: '76.543.210-K',
      telefono: '+56 9 ',
      direccion: '',
      servicio: 'Desinsectación',
      fecha: '2026-11-07',
      hora: '10:30',
      monto: 55000
    });
  };

  const SIDEBAR_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'agendamientos', label: 'Agendamientos', icon: Calendar, badge: pendientesCount },
    { id: 'clientes', label: 'Clientes', icon: Users, badge: clients.length },
    { id: 'pagos', label: 'Pagos', icon: CreditCard },
    { id: 'facturas', label: 'Facturas SII', icon: FileText, badge: invoices.length }
  ];

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#141414] flex">
      {/* ================= LEFT SIDEBAR (Fixed on Desktop, Drawer + Rail on Mobile) ================= */}
      <aside className="hidden md:flex md:w-64 bg-[#181818] text-white flex-col justify-between p-5 shrink-0 sticky top-0 h-screen shadow-xl">
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <Link to="/">
              <img src="/logo-patagonia.png" alt="Patagonia" className="h-11 w-auto" />
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#C41625] text-white px-2.5 py-0.5 rounded-full">
              Admin
            </span>
          </div>

          {/* Side Menu Options */}
          <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mt-6 mb-2.5 px-3">
            Menú Principal
          </p>
          <nav className="space-y-1.5">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition cursor-pointer ${
                    active
                      ? 'bg-[#C41625] text-white shadow-md'
                      : 'text-neutral-400 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        active ? 'bg-white text-[#C41625]' : 'bg-white/10 text-neutral-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Actions */}
        <div className="pt-5 border-t border-white/10 space-y-2.5">
          <button
            onClick={() => setModalType('agendar')}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-[#C41625] text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Agendamiento</span>
          </button>

          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 bg-white text-[#181818] hover:bg-neutral-200 text-xs font-bold py-2.5 px-4 rounded-xl transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la Web</span>
          </Link>
        </div>
      </aside>

      {/* ================= MOBILE LEFT ICON RAIL (Clean Icon Dock on Mobile) ================= */}
      <aside className="flex md:hidden w-14 bg-[#181818] text-white flex-col items-center justify-between py-4 shrink-0 sticky top-0 h-screen z-30 border-r border-white/10">
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-xl bg-white/10 text-white hover:bg-[#C41625] flex items-center justify-center transition cursor-pointer"
            title="Expandir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          <nav className="flex flex-col items-center gap-2 mt-2">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition cursor-pointer ${
                    active ? 'bg-[#C41625] text-white shadow-md' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                  title={item.label}
                >
                  <Icon className="w-5 h-5" />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C41625] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-[#181818]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <Link
          to="/"
          className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
          title="Volver a la Web"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </aside>

      {/* ================= MOBILE EXPANDABLE SIDEBAR DRAWER ================= */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex md:hidden">
          <div className="w-64 bg-[#181818] text-white h-full p-5 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <img src="/logo-patagonia.png" alt="Patagonia" className="h-10 w-auto" />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-full bg-white/10 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="mt-5 space-y-1.5">
                {SIDEBAR_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition ${
                        active ? 'bg-[#C41625] text-white' : 'text-neutral-300 hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        {item.label}
                      </span>
                      {item.badge !== undefined && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/15">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 bg-white text-[#181818] text-xs font-bold py-3 rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a la Web</span>
            </Link>
          </div>
        </div>
      )}

      {/* ================= RIGHT DASHBOARD WORKSPACE ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar inside Dashboard */}
        <header className="bg-white border-b border-neutral-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C41625] block">
              Patagonia Control de Plagas
            </span>
            <h1 className="font-editorial text-xl sm:text-2xl font-bold text-neutral-900">
              {SIDEBAR_ITEMS.find((i) => i.id === activeTab)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setModalType(
                  activeTab === 'clientes'
                    ? 'cliente'
                    : activeTab === 'facturas' || activeTab === 'pagos'
                    ? 'factura'
                    : 'agendar'
                )
              }
              className="inline-flex items-center gap-1.5 bg-[#C41625] hover:bg-[#a6121f] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>
                {activeTab === 'clientes'
                  ? 'Nuevo Cliente'
                  : activeTab === 'facturas' || activeTab === 'pagos'
                  ? 'Nueva Factura'
                  : 'Agendar'}
              </span>
            </button>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="p-4 sm:p-8 max-w-5xl w-full space-y-6">
          {/* Top KPI Summary Cards (Always visible for instant Dashboard clarity) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#181818] text-white rounded-3xl p-4 sm:p-5 shadow-sm">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                Ingresos Mes
              </span>
              <strong className="font-editorial text-xl sm:text-2xl font-bold block mt-1">
                {formatCLP(totalPagado)}
              </strong>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C41625]" />
                Por Cobrar
              </span>
              <strong className="font-editorial text-xl sm:text-2xl font-bold text-[#C41625] block mt-1">
                {formatCLP(totalPorCobrar)}
              </strong>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] text-neutral-400">Visitas Pendientes</span>
              <strong className="font-editorial text-xl sm:text-2xl font-bold text-neutral-900 block mt-1">
                {pendientesCount}
              </strong>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs">
              <span className="text-[11px] text-neutral-400">Clientes Activos</span>
              <strong className="font-editorial text-xl sm:text-2xl font-bold text-neutral-900 block mt-1">
                {clients.length}
              </strong>
            </div>
          </div>

          {/* ================= TAB 1: DASHBOARD ================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fade-up">
              {/* Simple Service Distribution Bar */}
              <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-editorial text-base sm:text-lg font-bold text-neutral-900">
                    Servicios Activos en Puerto Montt
                  </h2>
                  <span className="text-xs text-neutral-400">
                    {completadosCount}/{appointments.length} completados
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Desratización</span>
                      <span className="text-[#C41625]">{desratCount}</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C41625] rounded-full"
                        style={{ width: `${(desratCount / totalApps) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Desinsectación</span>
                      <span>{desinsCount}</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#181818] rounded-full"
                        style={{ width: `${(desinsCount / totalApps) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>Sanitización</span>
                      <span className="text-emerald-700">{sanitCount}</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${(sanitCount / totalApps) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2-Column Overview: Agenda + Cobros */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-editorial text-lg font-bold">Próximas Visitas</h2>
                    <button
                      onClick={() => setActiveTab('agendamientos')}
                      className="text-xs font-semibold text-[#C41625] cursor-pointer"
                    >
                      Ver todas →
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {appointments.slice(0, 4).map((app) => {
                      const isDone = app.estado === 'Completado';
                      return (
                        <div
                          key={app.id}
                          className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase text-[#C41625]">
                              {app.servicio} • {app.hora}
                            </span>
                            <p className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                              {app.clienteNombre}
                            </p>
                            <p className="text-[11px] text-neutral-500 truncate">{app.direccion}</p>
                          </div>
                          <button
                            onClick={() =>
                              updateAppointmentStatus(app.id, isDone ? 'Pendiente' : 'Completado')
                            }
                            className={`shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-bold cursor-pointer ${
                              isDone
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#181818] text-white'
                            }`}
                          >
                            {isDone ? '✓ Listo' : 'Completar'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-editorial text-lg font-bold">Últimos Pagos</h2>
                    <button
                      onClick={() => setActiveTab('pagos')}
                      className="text-xs font-semibold text-[#C41625] cursor-pointer"
                    >
                      Ver todos →
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {payments.slice(0, 4).map((p) => {
                      const paid = p.estado === 'Pagado';
                      return (
                        <div
                          key={p.id}
                          className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200/60 flex items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                              {p.clienteNombre}
                            </p>
                            <p className="text-xs font-bold text-[#C41625]">{formatCLP(p.monto)}</p>
                          </div>
                          {paid ? (
                            <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                              Pagado
                            </span>
                          ) : (
                            <button
                              onClick={() => updatePaymentStatus(p.id, 'Pagado')}
                              className="bg-[#181818] text-white text-[11px] font-semibold px-3 py-1.5 rounded-xl cursor-pointer"
                            >
                              Cobrar
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: AGENDAMIENTOS ================= */}
          {activeTab === 'agendamientos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-fade-up">
              {appointments.map((app) => {
                const isDone = app.estado === 'Completado';
                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800">
                        {app.servicio} • {app.fecha} ({app.hora})
                      </span>
                      <h3 className="font-editorial text-lg font-bold text-neutral-900 truncate">
                        {app.clienteNombre}
                      </h3>
                      <p className="text-xs text-neutral-500 flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C41625] shrink-0" />
                        {app.direccion}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        updateAppointmentStatus(app.id, isDone ? 'Pendiente' : 'Completado')
                      }
                      className={`shrink-0 px-3.5 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
                        isDone
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-[#181818] text-white hover:bg-[#C41625]'
                      }`}
                    >
                      {isDone ? '✓ Listo' : 'Completar'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= TAB 3: CLIENTES ================= */}
          {activeTab === 'clientes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-fade-up">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C41625]">
                      {c.tipo} • RUT {c.rut}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-neutral-900 truncate">
                      {c.nombre}
                    </h3>
                    <p className="text-xs text-neutral-500 flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      {c.direccion}
                    </p>
                  </div>

                  <a
                    href={`tel:${c.telefono}`}
                    className="shrink-0 w-10 h-10 rounded-full bg-neutral-100 hover:bg-[#C41625] hover:text-white text-neutral-700 flex items-center justify-center transition"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* ================= TAB 4: PAGOS ================= */}
          {activeTab === 'pagos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-fade-up">
              {payments.map((p) => {
                const paid = p.estado === 'Pagado';
                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <span className="text-xs text-neutral-400">{p.fecha}</span>
                      <h3 className="font-editorial text-lg font-bold text-neutral-900 truncate">
                        {p.clienteNombre}
                      </h3>
                      <p className="text-sm font-extrabold text-[#C41625] mt-0.5">
                        {formatCLP(p.monto)}
                      </p>
                    </div>

                    {paid ? (
                      <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Pagado
                      </span>
                    ) : (
                      <button
                        onClick={() => updatePaymentStatus(p.id, 'Pagado')}
                        className="shrink-0 bg-[#181818] hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-2xl transition cursor-pointer"
                      >
                        Cobrar
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ================= TAB 5: FACTURAS SII ================= */}
          {activeTab === 'facturas' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 animate-fade-up">
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <span className="text-[11px] font-mono font-bold text-[#C41625]">
                      Folio SII #{inv.folioSII}
                    </span>
                    <h3 className="font-editorial text-lg font-bold text-neutral-900 truncate">
                      {inv.clienteNombre}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Total: <strong className="text-neutral-900">{formatCLP(inv.total)}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => setPreviewInvoice(inv)}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-[#181818] hover:text-white text-neutral-800 text-xs font-semibold px-3.5 py-2 rounded-2xl transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Ver</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ================= QUICK ACTION MODAL ================= */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-3xl p-6 shadow-2xl animate-drawer-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-editorial text-xl font-bold">
                {modalType === 'cliente'
                  ? 'Nuevo Cliente'
                  : modalType === 'factura'
                  ? 'Emitir Factura SII'
                  : 'Agendar Visita'}
              </h3>
              <button
                onClick={() => setModalType(null)}
                className="p-2 rounded-full bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-3 text-xs sm:text-sm">
              <input
                required
                placeholder="Nombre del Cliente o Empresa *"
                value={quickForm.nombre}
                onChange={(e) => setQuickForm({ ...quickForm, nombre: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
              />

              <input
                required
                placeholder="Dirección en Puerto Montt *"
                value={quickForm.direccion}
                onChange={(e) => setQuickForm({ ...quickForm, direccion: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
              />

              {modalType === 'factura' ? (
                <input
                  type="number"
                  required
                  placeholder="Monto Neto (CLP) *"
                  value={quickForm.monto}
                  onChange={(e) => setQuickForm({ ...quickForm, monto: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                />
              ) : (
                <input
                  required
                  placeholder="Teléfono *"
                  value={quickForm.telefono}
                  onChange={(e) => setQuickForm({ ...quickForm, telefono: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200"
                />
              )}

              <div className="grid grid-cols-3 gap-2">
                {['Desratización', 'Desinsectación', 'Sanitización'].map((srv) => (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => setQuickForm({ ...quickForm, servicio: srv })}
                    className={`py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                      quickForm.servicio === srv
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
                className="w-full bg-[#C41625] hover:bg-[#a6121f] text-white font-semibold py-3.5 rounded-full transition cursor-pointer mt-2"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= FACTURA PREVIEW MODAL ================= */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl animate-scale-in space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C41625]">
                  SII • Puerto Montt
                </span>
                <h4 className="font-editorial text-xl font-bold text-neutral-900">
                  Factura Folio #{previewInvoice.folioSII}
                </h4>
              </div>
              <button
                onClick={() => setPreviewInvoice(null)}
                className="p-2 rounded-full bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-2 bg-neutral-50 p-4 rounded-2xl">
              <div className="flex justify-between">
                <span className="text-neutral-400">Cliente:</span>
                <strong>{previewInvoice.clienteNombre}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">RUT:</span>
                <strong>{previewInvoice.rut}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Servicio:</span>
                <span className="text-right">{previewInvoice.servicioDetalle}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm text-[#C41625]">
                <span className="font-bold">Total (IVA Incl.):</span>
                <strong className="font-extrabold">{formatCLP(previewInvoice.total)}</strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-[#181818] text-white text-xs font-semibold py-3 rounded-full cursor-pointer"
              >
                Imprimir PDF
              </button>
              <button
                onClick={() => setPreviewInvoice(null)}
                className="flex-1 bg-neutral-100 text-neutral-700 text-xs font-semibold py-3 rounded-full cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
