import React, { createContext, useContext, useState, useEffect } from 'react';

const DemoDataContext = createContext(null);

const INITIAL_CLIENTS = [
  {
    id: 'CLI-101',
    nombre: 'Salmones Austral S.A.',
    contacto: 'Rodrigo Mansilla',
    rut: '76.482.910-K',
    tipo: 'Empresa',
    telefono: '+56 9 8421 3390',
    email: 'rmansilla@salmonesaustral.cl',
    direccion: 'Av. Diego Portales 1450, Puerto Montt',
    sector: 'Costanera / Industrial',
    plan: 'Plan Mensual SEREMI',
    estado: 'Activo',
    ultimaVisita: '2026-10-28',
  },
  {
    id: 'CLI-102',
    nombre: 'Hotel & Cabañas Bordemar',
    contacto: 'Carolina Ojeda',
    rut: '77.194.220-5',
    tipo: 'Empresa',
    telefono: '+56 9 7612 9044',
    email: 'administracion@bordemarpm.cl',
    direccion: 'Camino a Chinquihue Km 7, Puerto Montt',
    sector: 'Chinquihue',
    plan: 'Trimestral Integral',
    estado: 'Activo',
    ultimaVisita: '2026-11-01',
  },
  {
    id: 'CLI-103',
    nombre: 'Familia Schilling Vargas',
    contacto: 'Martín Schilling',
    rut: '15.832.419-2',
    tipo: 'Hogar',
    telefono: '+56 9 9104 5582',
    email: 'm.schilling@gmail.com',
    direccion: 'Los Arrayanes 342, Jardin Austral, Puerto Montt',
    sector: 'Jardín Austral',
    plan: 'Visita Única Garantizada',
    estado: 'Activo',
    ultimaVisita: '2026-11-03',
  },
  {
    id: 'CLI-104',
    nombre: 'Restaurante Fogón de Angelmó',
    contacto: 'Héctor Almonacid',
    rut: '76.901.114-8',
    tipo: 'Empresa',
    telefono: '+56 9 6339 1120',
    email: 'contacto@fogonangelmo.cl',
    direccion: 'Av. Angelmó 1824, Local 12, Puerto Montt',
    sector: 'Angelmó',
    plan: 'Plan Mensual SEREMI',
    estado: 'Pendiente Renovación',
    ultimaVisita: '2026-10-15',
  },
  {
    id: 'CLI-105',
    nombre: 'Clínica Veterinaria Los Volcanes',
    contacto: 'Dra. Camila Hein',
    rut: '78.012.450-1',
    tipo: 'Empresa',
    telefono: '+56 9 5510 8831',
    email: 'c.hein@vetvolcanes.cl',
    direccion: 'Av. Presidente Ibáñez 610, Puerto Montt',
    sector: 'Mirador / Centro Alto',
    plan: 'Sanitización Mensual',
    estado: 'Activo',
    ultimaVisita: '2026-11-04',
  }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'AG-2041',
    clienteId: 'CLI-101',
    clienteNombre: 'Salmones Austral S.A.',
    direccion: 'Av. Diego Portales 1450, Puerto Montt',
    telefono: '+56 9 8421 3390',
    servicio: 'Desratización',
    plagaObjetivo: 'Roedores / Control Perimetral',
    fecha: '2026-11-06',
    hora: '09:30',
    tecnico: 'Jorge Barrientos (Cert. SEREMI)',
    prioridad: 'Alta',
    estado: 'Confirmado',
    valor: 145000,
    notas: 'Revisión de 28 estaciones cebaderas en bodega frigorífica.'
  },
  {
    id: 'AG-2042',
    clienteId: 'CLI-103',
    clienteNombre: 'Familia Schilling Vargas',
    direccion: 'Los Arrayanes 342, Jardín Austral',
    telefono: '+56 9 9104 5582',
    servicio: 'Desinsectación',
    plagaObjetivo: 'Araña de Rincón / Entretecho',
    fecha: '2026-11-06',
    hora: '12:00',
    tecnico: 'Claudio Oyarzún',
    prioridad: 'Media',
    estado: 'En Ruta',
    valor: 55000,
    notas: 'Aplicación piretroide microencapsulado sin olor en 2 pisos.'
  },
  {
    id: 'AG-2043',
    clienteId: 'CLI-104',
    clienteNombre: 'Restaurante Fogón de Angelmó',
    direccion: 'Av. Angelmó 1824, Local 12',
    telefono: '+56 9 6339 1120',
    servicio: 'Sanitización',
    plagaObjetivo: 'Cucarachas & Sanitización Cocina',
    fecha: '2026-11-07',
    hora: '08:00',
    tecnico: 'Jorge Barrientos (Cert. SEREMI)',
    prioridad: 'Urgente',
    estado: 'Pendiente',
    valor: 95000,
    notas: 'Emitir Certificado SEREMI Salud Región de Los Lagos al finalizar.'
  },
  {
    id: 'AG-2044',
    clienteId: 'CLI-102',
    clienteNombre: 'Hotel & Cabañas Bordemar',
    direccion: 'Camino a Chinquihue Km 7',
    telefono: '+56 9 7612 9044',
    servicio: 'Desinsectación',
    plagaObjetivo: 'Zancudos y Moscas (Exterior)',
    fecha: '2026-11-08',
    hora: '15:30',
    tecnico: 'Claudio Oyarzún',
    prioridad: 'Media',
    estado: 'Confirmado',
    valor: 120000,
    notas: 'Termonebulización perimetral en áreas verdes y quincho.'
  },
  {
    id: 'AG-2040',
    clienteId: 'CLI-105',
    clienteNombre: 'Clínica Veterinaria Los Volcanes',
    direccion: 'Av. Presidente Ibáñez 610',
    telefono: '+56 9 5510 8831',
    servicio: 'Sanitización',
    plagaObjetivo: 'Sanitización Amonio Cuaternario 5ta Gen',
    fecha: '2026-11-04',
    hora: '18:30',
    tecnico: 'Jorge Barrientos (Cert. SEREMI)',
    prioridad: 'Media',
    estado: 'Completado',
    valor: 68000,
    notas: 'Certificado N° 8841 entregado.'
  }
];

const INITIAL_PAYMENTS = [
  {
    id: 'PAG-901',
    clienteNombre: 'Salmones Austral S.A.',
    rut: '76.482.910-K',
    concepto: 'Plan Mensual Desratización + Cert. SEREMI',
    monto: 172550,
    metodo: 'Transferencia Bancaria (Banco de Chile)',
    fecha: '2026-11-02',
    estado: 'Pagado',
    facturaRef: 'FAC-00418'
  },
  {
    id: 'PAG-902',
    clienteNombre: 'Clínica Veterinaria Los Volcanes',
    rut: '78.012.450-1',
    concepto: 'Sanitización Clínica Mensual',
    monto: 80920,
    metodo: 'Webpay Plus (Tarjeta Crédito)',
    fecha: '2026-11-04',
    estado: 'Pagado',
    facturaRef: 'FAC-00419'
  },
  {
    id: 'PAG-903',
    clienteNombre: 'Familia Schilling Vargas',
    rut: '15.832.419-2',
    concepto: 'Desinsectación Hogar (Araña de rincón)',
    monto: 55000,
    metodo: 'Transferencia / Efectivo',
    fecha: '2026-11-06',
    estado: 'Por Cobrar',
    facturaRef: 'BOL-01102'
  },
  {
    id: 'PAG-904',
    clienteNombre: 'Restaurante Fogón de Angelmó',
    rut: '76.901.114-8',
    concepto: 'Control Integral Cocina & Bodega',
    monto: 113050,
    metodo: 'Transferencia 30 días',
    fecha: '2026-10-20',
    estado: 'Vencido',
    facturaRef: 'FAC-00412'
  },
  {
    id: 'PAG-905',
    clienteNombre: 'Hotel & Cabañas Bordemar',
    rut: '77.194.220-5',
    concepto: 'Control Trimestral Cabañas (12 unidades)',
    monto: 142800,
    metodo: 'Transferencia Bancaria',
    fecha: '2026-11-01',
    estado: 'Pagado',
    facturaRef: 'FAC-00417'
  }
];

const INITIAL_INVOICES = [
  {
    id: 'FAC-00419',
    folioSII: '419',
    tipoDoc: 'Factura Electrónica Afecta',
    clienteNombre: 'Clínica Veterinaria Los Volcanes',
    rut: '78.012.450-1',
    giro: 'Servicios Veterinarios y Clínica Menor',
    direccion: 'Av. Presidente Ibáñez 610, Puerto Montt',
    servicioDetalle: 'Sanitización clínica de alto espectro + Certificado SEREMI Salud',
    neto: 68000,
    iva: 12920,
    total: 80920,
    fechaEmision: '2026-11-04',
    fechaVencimiento: '2026-11-04',
    estadoSII: 'Aceptada SII',
    estadoPago: 'Pagada',
    certificadoSeremi: 'SEREMI-LL-2026-8841'
  },
  {
    id: 'FAC-00418',
    folioSII: '418',
    tipoDoc: 'Factura Electrónica Afecta',
    clienteNombre: 'Salmones Austral S.A.',
    rut: '76.482.910-K',
    giro: 'Cultivo y Procesamiento Hidrobiológico',
    direccion: 'Av. Diego Portales 1450, Puerto Montt',
    servicioDetalle: 'Desratización industrial perimetral (28 cebaderas) y control documental',
    neto: 145000,
    iva: 27550,
    total: 172550,
    fechaEmision: '2026-11-02',
    fechaVencimiento: '2026-11-15',
    estadoSII: 'Aceptada SII',
    estadoPago: 'Pagada',
    certificadoSeremi: 'SEREMI-LL-2026-8839'
  },
  {
    id: 'FAC-00417',
    folioSII: '417',
    tipoDoc: 'Factura Electrónica Afecta',
    clienteNombre: 'Hotel & Cabañas Bordemar',
    rut: '77.194.220-5',
    giro: 'Hotelería y Turismo',
    direccion: 'Camino a Chinquihue Km 7, Puerto Montt',
    servicioDetalle: 'Desinsectación y control sanitario en 12 cabañas y recepción',
    neto: 120000,
    iva: 22800,
    total: 142800,
    fechaEmision: '2026-11-01',
    fechaVencimiento: '2026-11-10',
    estadoSII: 'Aceptada SII',
    estadoPago: 'Pagada',
    certificadoSeremi: 'SEREMI-LL-2026-8832'
  },
  {
    id: 'BOL-01102',
    folioSII: '1102',
    tipoDoc: 'Boleta Electrónica',
    clienteNombre: 'Familia Schilling Vargas',
    rut: '15.832.419-2',
    giro: 'Particular / Residencial',
    direccion: 'Los Arrayanes 342, Jardín Austral, Puerto Montt',
    servicioDetalle: 'Desinsectación residencial interior/exterior (Araña de rincón)',
    neto: 46218,
    iva: 8782,
    total: 55000,
    fechaEmision: '2026-11-06',
    fechaVencimiento: '2026-11-06',
    estadoSII: 'Aceptada SII',
    estadoPago: 'Pendiente',
    certificadoSeremi: 'SEREMI-LL-2026-8845'
  },
  {
    id: 'FAC-00412',
    folioSII: '412',
    tipoDoc: 'Factura Electrónica Afecta',
    clienteNombre: 'Restaurante Fogón de Angelmó',
    rut: '76.901.114-8',
    giro: 'Restaurante y Gastronomía Típica',
    direccion: 'Av. Angelmó 1824, Local 12, Puerto Montt',
    servicioDetalle: 'Desinsectación gel cucarachicida + Sanitización cocina gastronómica',
    neto: 95000,
    iva: 18050,
    total: 113050,
    fechaEmision: '2026-10-15',
    fechaVencimiento: '2026-10-30',
    estadoSII: 'Aceptada SII',
    estadoPago: 'Vencida',
    certificadoSeremi: 'SEREMI-LL-2026-8790'
  }
];

export function DemoDataProvider({ children }) {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('patagonia_clients_v1');
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('patagonia_appointments_v1');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('patagonia_payments_v1');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('patagonia_invoices_v1');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  useEffect(() => {
    localStorage.setItem('patagonia_clients_v1', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('patagonia_appointments_v1', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('patagonia_payments_v1', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('patagonia_invoices_v1', JSON.stringify(invoices));
  }, [invoices]);

  // Add inspection request from Landing Page or Admin
  const addInspectionRequest = (payload) => {
    const newClientId = `CLI-${100 + clients.length + 1}`;
    const newClient = {
      id: newClientId,
      nombre: payload.nombre || 'Cliente Nuevo',
      contacto: payload.nombre || 'Contacto Directo',
      rut: payload.rut || '18.940.112-4',
      tipo: payload.tipo || 'Hogar',
      telefono: payload.telefono || '+56 9 8800 1122',
      email: payload.email || 'cliente@correo.cl',
      direccion: payload.direccion || 'Sector Pelluco, Puerto Montt',
      sector: payload.sector || 'Puerto Montt',
      plan: payload.servicio || 'Inspección Técnica',
      estado: 'Activo',
      ultimaVisita: payload.fecha || '2026-11-06',
    };

    const estimatedPrice =
      payload.servicio === 'Desratización' ? 65000 :
      payload.servicio === 'Sanitización' ? 60000 : 50000;

    const newAppointment = {
      id: `AG-${2041 + appointments.length}`,
      clienteId: newClientId,
      clienteNombre: newClient.nombre,
      direccion: newClient.direccion,
      telefono: newClient.telefono,
      servicio: payload.servicio || 'Desinsectación',
      plagaObjetivo: payload.plaga || 'Inspección General',
      fecha: payload.fecha || '2026-11-07',
      hora: payload.hora || '10:30',
      tecnico: 'Jorge Barrientos (Cert. SEREMI)',
      prioridad: payload.urgencia || 'Alta',
      estado: 'Pendiente',
      valor: estimatedPrice,
      notas: payload.notas || 'Solicitud ingresada desde Web / App Móvil.'
    };

    setClients((prev) => [newClient, ...prev]);
    setAppointments((prev) => [newAppointment, ...prev]);
    return newAppointment;
  };

  const addClient = (clientData) => {
    const newClient = {
      id: `CLI-${100 + clients.length + 1}`,
      estado: 'Activo',
      ultimaVisita: new Date().toISOString().slice(0, 10),
      ...clientData,
    };
    setClients((prev) => [newClient, ...prev]);
    return newClient;
  };

  const updateAppointmentStatus = (id, nuevoEstado) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, estado: nuevoEstado } : a))
    );
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const updatePaymentStatus = (id, nuevoEstado) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  const createInvoiceAndPayment = (invData) => {
    const neto = Number(invData.neto) || 75000;
    const iva = Math.round(neto * 0.19);
    const total = neto + iva;
    const nextFolio = 420 + invoices.length;
    const invoiceId = invData.tipoDoc?.includes('Boleta')
      ? `BOL-0${1100 + invoices.length}`
      : `FAC-00${nextFolio}`;

    const newInvoice = {
      id: invoiceId,
      folioSII: String(nextFolio),
      tipoDoc: invData.tipoDoc || 'Factura Electrónica Afecta',
      clienteNombre: invData.clienteNombre,
      rut: invData.rut || '76.543.210-K',
      giro: invData.giro || 'Comercial / Servicios',
      direccion: invData.direccion || 'Puerto Montt, Región de Los Lagos',
      servicioDetalle: invData.servicioDetalle || 'Servicio Control de Plagas + Certificado SEREMI',
      neto,
      iva,
      total,
      fechaEmision: new Date().toISOString().slice(0, 10),
      fechaVencimiento: invData.fechaVencimiento || new Date().toISOString().slice(0, 10),
      estadoSII: 'Aceptada SII',
      estadoPago: invData.estadoPago || 'Pagada',
      certificadoSeremi: `SEREMI-LL-2026-${8845 + invoices.length}`,
    };

    const newPayment = {
      id: `PAG-${901 + payments.length}`,
      clienteNombre: newInvoice.clienteNombre,
      rut: newInvoice.rut,
      concepto: newInvoice.servicioDetalle,
      monto: total,
      metodo: invData.metodo || 'Transferencia Bancaria',
      fecha: newInvoice.fechaEmision,
      estado: invData.estadoPago === 'Pagada' ? 'Pagado' : 'Por Cobrar',
      facturaRef: invoiceId,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setPayments((prev) => [newPayment, ...prev]);
    return newInvoice;
  };

  const resetDemoData = () => {
    setClients(INITIAL_CLIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setPayments(INITIAL_PAYMENTS);
    setInvoices(INITIAL_INVOICES);
  };

  return (
    <DemoDataContext.Provider
      value={{
        clients,
        appointments,
        payments,
        invoices,
        addInspectionRequest,
        addClient,
        updateAppointmentStatus,
        deleteAppointment,
        updatePaymentStatus,
        createInvoiceAndPayment,
        resetDemoData,
      }}
    >
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const ctx = useContext(DemoDataContext);
  if (!ctx) throw new Error('useDemoData must be used inside DemoDataProvider');
  return ctx;
}
