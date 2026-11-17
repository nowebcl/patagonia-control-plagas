export const DEFAULT_SITE_CONFIG = {
  company: {
    brandName: 'Control de Plagas Patagonia Chile',
    shortName: 'Patagonia Chile',
    legalName: 'Servicios Industriales Ronald Sandrino Almonacid Martínez E.I.R.L.',
    rexSanitaria: 'REX SEREMI Los Lagos N.º 6119/2021',
    rexModificacion: 'Modificación Dirección Técnica: REX N.º 5891/2022',
    technicalDirector: 'Ricardo Samuel Espinoza Núñez',
    technicalDirectorRole: 'Ingeniero Agrícola — Director Técnico',
    whatsappNumber: '56978666690',
    whatsappDisplay: '+56 9 7866 6690',
    email: '',
    cityRegion: 'Puerto Montt, Región de Los Lagos, Chile',
    address: '',
    schedule: 'Lunes a Sábado · Atención coordinada según evaluación y programación',
    centralMipUrl: '',
    googleProfileUrl: '',
    analyticsId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    domainUrl: 'https://patagonia-control-plagas.vercel.app',
    ivaLabel: '+ IVA',
    adminPasscode: 'patagonia2026'
  },
  seo: {
    homeTitle: 'Control de Plagas en Puerto Montt | Control de Plagas Patagonia Chile',
    homeDescription:
      'Control de plagas en Puerto Montt y Región de Los Lagos. Desratización, desinsectación, sanitización, desratización pre-demolición y programas MIP para empresas y hogares. REX SEREMI N.º 6119/2021.',
    homeKeywords:
      'control de plagas puerto montt, desratizacion puerto montt, fumigacion puerto montt, desinsectacion puerto montt, sanitizacion puerto montt, control de ratones puerto montt, control de plagas para empresas, desratizacion de condominios puerto montt, certificado de desratizacion pre-demolicion puerto montt, empresa de control de plagas region de los lagos'
  },
  services: [
    {
      id: 'desratizacion',
      slug: 'desratizacion',
      route: '/servicios/desratizacion',
      shortTitle: 'Desratización',
      title: 'Desratización y Control de Roedores',
      category: 'Control de Roedores',
      badge: 'REX SEREMI N.º 6119/2021',
      image: '/service-desratizacion.jpg',
      priceBase: 55000,
      isCustomQuote: false,
      summary:
        'Control preventivo y correctivo de roedores mediante diagnóstico de focos, instalación de estaciones de seguridad y seguimiento técnico en hogares, locales y empresas.',
      description:
        'Implementamos estrategias de control orientadas a identificar rutas de desplazamiento, puntos de ingreso, fuentes de alimento y zonas de anidación. Trabajamos con cebos rodenticidas autorizados por el Instituto de Salud Pública (ISP), dispuestos dentro de estaciones cebaderas cerradas, ancladas y señalizadas para resguardar a personas, mascotas y fauna no objetivo.',
      highlights: [
        'Inspección de perímetros, entretechos, bodegas y áreas críticas',
        'Estaciones cebaderas con llave, numeradas y rotuladas según normativa',
        'Recomendaciones de hermeticidad y exclusión estructural',
        'Emisión de certificado técnico de servicio y registro de monitoreo'
      ],
      reentryNote:
        'Los productos permanecen contenidos dentro de estaciones de seguridad cerradas. Las indicaciones específicas de resguardo y monitoreo se entregan en cada visita.',
      seoTitle: 'Desratización en Puerto Montt | Control de Roedores Certificado',
      seoDescription:
        'Servicio de desratización en Puerto Montt y Región de Los Lagos con autorización SEREMI REX N.º 6119/2021. Control de ratas y ratones en casas, condominios y empresas.'
    },
    {
      id: 'desinsectacion',
      slug: 'desinsectacion',
      route: '/servicios/desinsectacion',
      shortTitle: 'Desinsectación',
      title: 'Desinsectación y Control de Insectos',
      category: 'Control de Insectos',
      badge: 'Productos Autorizados ISP',
      image: '/service-desinsectacion.jpg',
      priceBase: 45000,
      isCustomQuote: false,
      summary:
        'Tratamientos dirigidos contra insectos rastreros y voladores como araña de rincón, cucarachas, hormigas, pulgas y moscas, ajustados a cada tipo de recinto.',
      description:
        'Aplicamos tratamientos químicos y físicos focalizados según la biología de la plaga presente y las características constructivas del inmueble (madera, albañilería, áreas de cocina o bodegas). Utilizamos formulaciones registradas ante el ISP siguiendo estrictamente su etiqueta técnica y Hoja de Datos de Seguridad (HDS).',
      highlights: [
        'Control dirigido de araña de rincón, cucarachas, hormigas, tijeretas y pulgas',
        'Aplicación por aspersión localizada, gel insecticida o nebulización según caso',
        'Entrega de instrucciones previas, plazo de ventilación y reingreso seguro',
        'Emisión de certificado e informe técnico del procedimiento realizado'
      ],
      reentryNote:
        'El tiempo de ventilación y reingreso varía según el principio activo y método aplicado (gel localizado vs. aspersión residual), informándose expresamente antes del servicio.',
      seoTitle: 'Desinsectación y Fumigación en Puerto Montt | Araña de Rincón y Cucarachas',
      seoDescription:
        'Desinsectación profesional en Puerto Montt. Control de araña de rincón, cucarachas, hormigas y pulgas con productos autorizados por el ISP y respaldo técnico.'
    },
    {
      id: 'sanitizacion',
      slug: 'sanitizacion',
      route: '/servicios/sanitizacion',
      shortTitle: 'Sanitización',
      title: 'Sanitización y Desinfección Ambiental',
      category: 'Desinfección',
      badge: 'Protocolo Técnico Sanitario',
      image: '/service-sanitizacion.jpg',
      priceBase: 48000,
      isCustomQuote: false,
      summary:
        'Desinfección de ambientes y superficies en oficinas, locales comerciales, clínicas, colegios, vehículos y viviendas mediante aplicación controlada.',
      description:
        'Servicio enfocado en disminuir la carga microbiológica ambiental y en superficies de alto contacto, empleando desinfectantes autorizados por el ISP en diluciones calibradas y equipos de aspersión o nebulización en frío ULV según el volumen y uso del recinto.',
      highlights: [
        'Cobertura uniforme en superficies de trabajo, baños, comedores y áreas comunes',
        'Uso de desinfectantes autorizados compatibles con recintos comerciales y de salud',
        'Protocolo adaptado para locales de alimentos, oficinas, jardines y viviendas',
        'Certificado técnico de sanitización con registro de producto aplicado'
      ],
      reentryNote:
        'Se informa el tiempo de contacto y secado/ventilación recomendado acorde a la ficha técnica del desinfectante utilizado en el recinto.',
      seoTitle: 'Sanitización y Desinfección en Puerto Montt | Empresas y Hogares',
      seoDescription:
        'Servicio de sanitización ambiental en Puerto Montt para oficinas, locales comerciales, restaurantes, colegios y viviendas con certificación técnica.'
    },
    {
      id: 'control-de-aves',
      slug: 'control-de-aves',
      route: '/servicios/control-de-aves',
      shortTitle: 'Control de Aves',
      title: 'Control de Aves y Exclusión Estructural',
      category: 'Exclusión Física',
      badge: 'Evaluación en Terreno',
      image: '/trabajos/trabajo-4.jpg',
      priceBase: 0,
      isCustomQuote: true,
      summary:
        'Instalación de sistemas de disuasión y barreras físicas para prevenir anidamiento y posamiento de aves en techumbres, cornisas, bodegas y plantas.',
      description:
        'Diseñamos soluciones no letales de control y exclusión física adaptadas a la arquitectura de galpones industriales, edificios, locales comerciales y plantas procesadoras. Prevenimos el deterioro estructural, acumulación de fecas y contaminación de zonas operativas.',
      highlights: [
        'Instalación de mallas de exclusión, pinchos disuasivos y sellado de vanos',
        'Evaluación previa en altura o áreas críticas industriales',
        'Retiro y sanitización complementaria de áreas afectadas por residuos aviares',
        'Informe técnico con detalle de puntos intervenidos'
      ],
      reentryNote:
        'Al emplear principalmente barreras físicas y sistemas mecánicos, se coordina según condiciones de seguridad del área de trabajo en altura.',
      seoTitle: 'Control de Aves en Puerto Montt y Los Lagos | Mallas y Barreras Físicas',
      seoDescription:
        'Control de aves para bodegas, edificios y plantas industriales en Puerto Montt. Exclusión con mallas, sistemas disuasivos y limpieza sanitaria.'
    },
    {
      id: 'control-de-malezas',
      slug: 'control-de-malezas',
      route: '/servicios/control-de-malezas',
      shortTitle: 'Control de Malezas',
      title: 'Control de Malezas y Aplicación de Herbicidas',
      category: 'Manejo Perimetral',
      badge: 'Supervisión Agrícola',
      image: '/trabajos/trabajo-2.jpg',
      priceBase: 0,
      isCustomQuote: true,
      summary:
        'Manejo de vegetación no deseada en perímetros industriales, patios de carga, cierres y sitios para reducir refugios de roedores e insectos.',
      description:
        'El crecimiento descontrolado de malezas alrededor de bodegas, plantas y construcciones genera refugio y acceso directo para plagas. Ejecutamos aplicaciones técnicas de herbicidas autorizados y manejo perimetral bajo supervisión agronómica, resguardando cultivos cercanos y cursos de agua.',
      highlights: [
        'Despeje químico controlado de cordones perimetrales y patios industriales',
        'Complemento clave para programas de desratización perimetral',
        'Calibración de equipos y resguardo de condiciones climáticas (viento y lluvia)',
        'Registro técnico de producto, dosis y sector intervenido'
      ],
      reentryNote:
        'El reingreso al área tratada se indica conforme a la etiqueta del producto aplicado y secado foliar correspondiente.',
      seoTitle: 'Control de Malezas y Herbicidas en Puerto Montt | Empresas e Industrias',
      seoDescription:
        'Aplicación controlada de herbicidas y manejo de malezas en perímetros industriales, bodegas y terrenos en Puerto Montt y Región de Los Lagos.'
    },
    {
      id: 'desratizacion-pre-demolicion',
      slug: 'desratizacion-pre-demolicion',
      route: '/desratizacion-pre-demolicion-puerto-montt',
      shortTitle: 'Pre-Demolición',
      title: 'Desratización Pre-Demolición y Certificado Sanitario',
      category: 'Trámite Normativo SEREMI',
      badge: 'Certificación Pre-Demolición',
      image: '/trabajos/trabajo-1.jpg',
      priceBase: 0,
      isCustomQuote: true,
      summary:
        'Tratamiento obligatorio previo a la demolición de viviendas, edificios y recintos comerciales o industriales, con certificado técnico y apoyo para visación ante SEREMI de Salud.',
      description:
        'Antes de ejecutar obras de demolición, la autoridad sanitaria y las direcciones de obras municipales exigen acreditar el control de roedores en la propiedad para evitar la dispersión hacia predios vecinos. Ejecutamos el diagnóstico, el tratamiento técnico, el monitoreo de actividad y la emisión de antecedentes requeridos para tramitación ante SEREMI.',
      highlights: [
        'Inspección técnica previa del inmueble y estructuras a demoler',
        'Evaluación de madrigueras, signos de actividad e instalación de cebos',
        'Monitoreo y reposición en días posteriores según nivel de actividad',
        'Emisión de certificado técnico y gestión/orientación para visación SEREMI'
      ],
      reentryNote:
        'Se coordinan ventanas de ejecución previas al ingreso de maquinaria de demolición para respetar los tiempos técnicos de control y tramitación sanitaria.',
      seoTitle: 'Desratización Pre-Demolición y Certificado Sanitario en Puerto Montt',
      seoDescription:
        'Certificado de desratización pre-demolición en Puerto Montt. Tratamiento técnico previo a demolición y gestión ante SEREMI de Salud Los Lagos.'
    },
    {
      id: 'manejo-integrado-de-plagas',
      slug: 'manejo-integrado-de-plagas',
      route: '/servicios/manejo-integrado-de-plagas',
      shortTitle: 'Programa MIP',
      title: 'Manejo Integrado de Plagas (MIP)',
      category: 'Soluciones Corporativas',
      badge: 'Gestión Documental Central MIP',
      image: '/trabajos/trabajo-5.jpg',
      priceBase: 0,
      isCustomQuote: true,
      summary:
        'Programas integrales de prevención, monitoreo, control y trazabilidad documental diseñados para empresas alimentarias, plantas procesadoras e instituciones.',
      description:
        'El Manejo Integrado de Plagas (MIP) combina inspección periódica, identificación de especies, corrección de condiciones ambientales/estructurales, uso racional de insumos y seguimiento continuo. Toda la trazabilidad —informes, certificados, planos y HDS— se gestiona de forma ordenada mediante Central MIP.',
      highlights: [
        'Levantamiento de línea base y mapa de riesgos del establecimiento',
        'Combinación de barreras físicas, trampas mecánicas, monitoreo y control químico',
        'Informes de hallazgos, desviaciones estructurales y acciones correctivas',
        'Respaldo continuo ante fiscalizaciones SEREMI y auditorías de calidad'
      ],
      reentryNote:
        'Los programas MIP priorizan dispositivos de monitoreo cerrados y medidas preventivas para no interrumpir la operación continua de la planta o local.',
      seoTitle: 'Manejo Integrado de Plagas (MIP) en Puerto Montt y Los Lagos',
      seoDescription:
        'Programas de Manejo Integrado de Plagas (MIP) para industrias, plantas alimentarias, hoteles, colegios y empresas en Puerto Montt y Región de Los Lagos.'
    },
    {
      id: 'estaciones-cebaderas',
      slug: 'estaciones-cebaderas',
      route: '/servicios/estaciones-cebaderas',
      shortTitle: 'Estaciones Cebaderas',
      title: 'Instalación y Monitoreo de Estaciones Cebaderas',
      category: 'Control Perimetral',
      badge: 'Planos y Trazabilidad',
      image: '/trabajos/trabajo-3.jpg',
      priceBase: 0,
      isCustomQuote: true,
      summary:
        'Implementación de cordones sanitarios con estaciones cebaderas de seguridad numeradas, ancladas, georreferenciadas en plano y con monitoreo periódico.',
      description:
        'Instalamos barreras perimetrales e interiores con estaciones portacebos y trampas de captura mecánica en los puntos estratégicos definidos durante la inspección técnica. Cada estación queda numerada, identificada en un plano esquemático y evaluada visita a visita para medir consumos o actividad.',
      highlights: [
        'Estaciones resistentes al clima húmedo y lluvioso del sur de Chile',
        'Anclaje seguro, cierre con llave y rotulación de advertencia reglamentaria',
        'Elaboración de plano de ubicación de dispositivos para auditorías',
        'Control de consumos, reposición y limpieza periódica de estaciones'
      ],
      reentryNote:
        'Operación continua segura en perímetros exteriores e interiores sin afectar la actividad cotidiana del establecimiento.',
      seoTitle: 'Instalación y Monitoreo de Estaciones Cebaderas | Puerto Montt',
      seoDescription:
        'Instalación profesional, plano de ubicación y monitoreo periódico de estaciones cebaderas para empresas, condominios y bodegas en Puerto Montt.'
    },
    {
      id: 'programas-preventivos',
      slug: 'programas-preventivos',
      route: '/servicios/programas-preventivos',
      shortTitle: 'Programas Preventivos',
      title: 'Programas Preventivos y Contratos Periódicos',
      category: 'Mantención Continua',
      badge: 'Planes Personalizados',
      image: '/trabajos/trabajo-6.jpg',
      priceBase: 0,
      isCustomQuote: true,
      summary:
        'Contratos de mantenimiento sanitario con visitas calendarizadas para condominios, restaurantes, establecimientos educacionales, clínicas y empresas.',
      description:
        'Más efectivo que actuar ante una infestación avanzada es mantener el inmueble protegido durante todo el año. Estructuramos contratos periódicos (mensuales, bimestrales o trimestrales) cuya frecuencia y alcance se ajustan a la actividad económica, superficie y exigencias sanitarias de cada cliente.',
      highlights: [
        'Calendario anual de visitas preventivas programadas y recordatorios',
        'Cobertura combinada de desratización, desinsectación y sanitización',
        'Actualización continua de certificados y carpeta sanitaria para fiscalizaciones',
        'Acceso permanente a historial de servicios a través de Central MIP'
      ],
      reentryNote:
        'Cada visita programada se coordina previamente en horarios adecuados para no interferir con clientes, residentes o procesos productivos.',
      seoTitle: 'Contratos de Control de Plagas y Programas Preventivos | Puerto Montt',
      seoDescription:
        'Programas preventivos y contratos periódicos de control de plagas para condominios, locales comerciales y empresas en Puerto Montt.'
    }
  ],
  industries: [
    {
      name: 'Industrias y plantas procesadoras',
      desc: 'Cordones perimetrales, trampas de monitoreo y auditoría documental continua.'
    },
    {
      name: 'Empresas alimentarias',
      desc: 'Protocolos compatibles con áreas de elaboración y exigencias sanitarias.'
    },
    {
      name: 'Restaurantes y supermercados',
      desc: 'Control focalizado en cocinas, bodegas de secos y zonas de carga.'
    },
    {
      name: 'Condominios y edificios',
      desc: 'Desratización y desinsectación periódica de espacios comunes, ductos y perímetros.'
    },
    {
      name: 'Hospitales y centros médicos',
      desc: 'Sanitización y manejo preventivo cuidadoso con personal y pacientes.'
    },
    {
      name: 'Colegios y jardines infantiles',
      desc: 'Programación fuera de horario escolar con resguardo de patios, comedores y salas.'
    },
    {
      name: 'Instituciones públicas',
      desc: 'Cumplimiento documental, facturación electrónica y certificados oficiales.'
    },
    {
      name: 'Bodegas y centros logísticos',
      desc: 'Estaciones cebaderas, manejo de malezas perimetrales y exclusión de aves.'
    },
    {
      name: 'Empresas acuícolas',
      desc: 'Servicios en plantas, centros de acopio, embarcaderos y dependencias administrativas.'
    },
    {
      name: 'Hoteles y turismo',
      desc: 'Intervenciones discretas y preventivas en habitaciones, cocinas y áreas exteriores.'
    }
  ],
  plans: [
    {
      id: 'residencial',
      name: 'Plan Residencial',
      target: 'Casas y departamentos particulares',
      desc: 'Protección puntual o preventiva para viviendas frente a roedores, arañas, insectos rastreros o necesidades de desinfección.',
      features: [
        'Diagnóstico en terreno del inmueble',
        'Aplicación con productos autorizados por el ISP',
        'Indicaciones claras de preparación y reingreso',
        'Certificado técnico de servicio realizado'
      ],
      ctaText: 'Cotizar Plan Residencial'
    },
    {
      id: 'comercial',
      name: 'Plan Comercial',
      target: 'Locales, oficinas, restaurantes y comercio',
      desc: 'Diseñado para dar continuidad operativa y mantener respaldo sanitario vigente ante fiscalizaciones municipales o SEREMI.',
      features: [
        'Evaluación de puntos críticos y bodegas',
        'Programación en horarios acordados',
        'Certificados válidos para patente comercial',
        'Frecuencia adaptada al rubro del establecimiento'
      ],
      ctaText: 'Cotizar Plan Comercial'
    },
    {
      id: 'condominios',
      name: 'Plan para Condominios',
      target: 'Edificios, comunidades y administraciones',
      desc: 'Cobertura integral de espacios comunes, salas de basura, estacionamientos, jardines y perímetros para tranquilidad de copropietarios.',
      features: [
        'Instalación y revisión de estaciones perimetrales',
        'Control preventivo de insectos en áreas comunes',
        'Informes de visita para comités de administración',
        'Respaldo documental en Central MIP'
      ],
      ctaText: 'Cotizar para Condominio'
    },
    {
      id: 'empresarial',
      name: 'Plan Empresarial',
      target: 'Pymes, bodegas, hotelería y servicios',
      desc: 'Programa periódico de Manejo Integrado de Plagas (MIP) con visitas programadas, informes técnicos y monitoreo de tendencias.',
      features: [
        'Plano esquemático de ubicación de estaciones',
        'Visitas preventivas según calendario definido',
        'Informes técnicos con observaciones estructurales',
        'Acceso a documentación mediante Central MIP'
      ],
      ctaText: 'Solicitar Propuesta Empresarial'
    },
    {
      id: 'industrial',
      name: 'Plan Industrial e Institucional',
      target: 'Plantas procesadoras, acuícolas, salud y sector público',
      desc: 'Cobertura técnica avanzada para operaciones complejas con altos estándares de auditoría, trazabilidad documental y supervisión profesional.',
      features: [
        'Supervisión y respaldo de Dirección Técnica',
        'Plan de monitoreo intensivo y control multiespecie',
        'Carpeta técnica completa (HDS, fichas, planos, certificados)',
        'Seguimiento continuo e indicadores de gestión MIP'
      ],
      ctaText: 'Cotizar Plan Industrial'
    }
  ],
  workflowSteps: [
    {
      num: '01',
      title: 'Solicitud del servicio',
      desc: 'Recibimos tus requerimientos por cotizador web o WhatsApp indicando tipo de plaga, recinto, superficie y comuna.'
    },
    {
      num: '02',
      title: 'Inspección y diagnóstico',
      desc: 'Evaluamos las condiciones del inmueble o instalación, focos activos, vías de acceso y factores de riesgo.'
    },
    {
      num: '03',
      title: 'Propuesta técnica',
      desc: 'Definimos el método adecuado, productos autorizados, frecuencia sugerida y presupuesto transparente.'
    },
    {
      num: '04',
      title: 'Ejecución por personal capacitado',
      desc: 'Aplicamos el tratamiento siguiendo protocolos de seguridad, normativa sanitaria vigente e instrucciones de resguardo.'
    },
    {
      num: '05',
      title: 'Entrega de documentación técnica',
      desc: 'Emitimos certificado, informe técnico, plano de estaciones (si aplica) y fichas técnicas / HDS correspondientes.'
    },
    {
      num: '06',
      title: 'Seguimiento y recomendaciones',
      desc: 'Indicamos medidas preventivas de exclusión e higiene y coordinamos monitoreos posteriores según el plan acordado.'
    }
  ],
  preDemolition: {
    heroTitle: 'Desratización Pre-Demolición y Certificado Sanitario en Puerto Montt',
    heroSubtitle:
      'Tratamiento técnico de desratización previo a la demolición de viviendas, edificios, locales comerciales e instalaciones industriales en Puerto Montt y la Región de Los Lagos.',
    steps: [
      {
        title: '1. Inspección técnica del inmueble',
        desc: 'Levantamiento en terreno de las construcciones a demoler, perímetros, entretechos, subterráneos y áreas colindantes.'
      },
      {
        title: '2. Evaluación de presencia de roedores',
        desc: 'Búsqueda de signos de actividad (fecas, madrigueras, roeduras y huellas) para dimensionar el nivel de infestación.'
      },
      {
        title: '3. Tratamiento de desratización',
        desc: 'Instalación de cebos autorizados por el ISP en puntos estratégicos y estaciones de seguridad antes del inicio de faenas.'
      },
      {
        title: '4. Seguimiento y monitoreo',
        desc: 'Visitas de control para verificar consumo, reponer insumos si es necesario y confirmar la reducción de actividad de roedores.'
      },
      {
        title: '5. Emisión del certificado técnico',
        desc: 'Entrega del certificado técnico de desratización respaldado por nuestra resolución sanitaria REX N.º 6119/2021 y Dirección Técnica.'
      },
      {
        title: '6. Gestión de visación ante SEREMI de Salud',
        desc: 'Preparación y orientación documental para la presentación y visación ante la SEREMI de Salud Los Lagos conforme a los requisitos aplicables.'
      }
    ],
    normativeNotes: [
      {
        title: '¿Cuándo es exigible este certificado?',
        text: 'Antes de solicitar permiso de demolición o iniciar faenas en viviendas, edificios, establecimientos comerciales o instalaciones industriales, con el fin de evitar que los roedores migren hacia inmuebles vecinos.'
      },
      {
        title: 'Requisitos documentales habituales',
        text: 'Antecedentes del propietario o representante legal, dirección exacta y rol de la propiedad, superficie aproximada a demoler, certificado técnico emitido por empresa autorizada con resolución sanitaria vigente y comprobante de trámite ante la autoridad sanitaria.'
      },
      {
        title: 'Plazos según normativa y ejecución',
        text: 'Es fundamental planificar el tratamiento con anticipación al ingreso de maquinaria, considerando los días necesarios para el monitoreo efectivo en terreno y los plazos propios de revisión de la SEREMI de Salud Los Lagos (sujetos a la autoridad sanitaria).'
      }
    ]
  },
  centralMipFeatures: [
    'Certificados MIP descargables por recinto',
    'Informes técnicos detallados de cada visita',
    'Registros históricos de servicios realizados',
    'Calendarios de visitas preventivas programadas',
    'Respaldo fotográfico de trabajos en terreno',
    'Planos esquemáticos de estaciones cebaderas',
    'Fichas técnicas y Hojas de Datos de Seguridad (HDS)',
    'Carpeta sanitaria actualizada de tus instalaciones'
  ],
  documentsShowcase: [
    {
      id: 'certificado-mip',
      title: 'Certificado Técnico / MIP',
      issuer: 'Emitido por Control de Plagas Patagonia Chile',
      category: 'Certificación',
      desc: 'Acredita la ejecución del servicio bajo REX SEREMI N.º 6119/2021, indicando fecha, áreas tratadas, productos ISP utilizados y Director Técnico responsable.',
      previewSummary:
        'Muestra ejemplo anonimizado: Razón social E.I.R.L., N.º de folio interno, recinto [DATO PROTEGIDO], método aplicado, principio activo y registro ISP, firma del aplicador y Director Técnico.'
    },
    {
      id: 'informe-tecnico',
      title: 'Informe Técnico de Inspección',
      issuer: 'Emitido por Control de Plagas Patagonia Chile',
      category: 'Diagnóstico',
      desc: 'Detalla los hallazgos encontrados durante la inspección, condiciones estructurales que favorecen plagas y recomendaciones preventivas.',
      previewSummary:
        'Muestra ejemplo anonimizado: Nivel de riesgo por sector, observaciones de hermeticidad (burletes, celosías, acopio), registro fotográfico de hallazgos y plan de acción recomendado.'
    },
    {
      id: 'plano-estaciones',
      title: 'Plano de Estaciones Cebaderas',
      issuer: 'Emitido por Control de Plagas Patagonia Chile',
      category: 'Trazabilidad',
      desc: 'Diagrama esquemático de la instalación con la numeración correlativa y ubicación de cada estación portacebo o trampa de captura.',
      previewSummary:
        'Muestra ejemplo anonimizado: Croquis de planta con simbología de estaciones exteriores (E-01 a E-12) y trampas interiores (T-01 a T-06), leyenda de revisión periódica.'
    },
    {
      id: 'monitoreo',
      title: 'Registro de Monitoreo Periódico',
      issuer: 'Emitido por Control de Plagas Patagonia Chile',
      category: 'Control Continuo',
      desc: 'Planilla de revisión estación por estación registrando estado del cebo, consumo, deterioro, reposición o captura detectada.',
      previewSummary:
        'Muestra ejemplo anonimizado: Tabla correlativa por código de dispositivo, estado (Sin consumo / Consumo parcial / Reposición / Dañada) y firma de conformidad.'
    },
    {
      id: 'fichas-hds',
      title: 'Fichas Técnicas y Hojas de Seguridad (HDS)',
      issuer: 'Fabricantes / Registro ISP Chile',
      category: 'Seguridad Química',
      desc: 'Documentación oficial de cada producto autorizado utilizado en el establecimiento, indispensable ante inspecciones de higiene y seguridad.',
      previewSummary:
        'Respaldo documental con número de registro ante el Instituto de Salud Pública (ISP), composición, primeros auxilios, EPP y plazos técnicos de reingreso.'
    },
    {
      id: 'visacion-seremi',
      title: 'Certificados y Visaciones ante SEREMI de Salud',
      issuer: 'Autoridad Sanitaria (SEREMI Los Lagos)',
      category: 'Tramitación Oficial',
      desc: 'En casos específicos como la Desratización Pre-Demolición, el certificado técnico emitido por nuestra empresa respalda la visación requerida ante la SEREMI de Salud.',
      previewSummary:
        'Distinción importante: El certificado técnico de servicio es emitido por nuestra empresa; la visación o resolución administrativa final corresponde exclusivamente a la SEREMI de Salud.'
    }
  ],
  coverageAreas: [
    {
      id: 'puerto-montt',
      name: 'Puerto Montt',
      province: 'Llanquihue',
      detail: 'Centro, Costanera, Pelluco, Cardonal, El Tepual, Chinquihue, Panitao y Valle Volcanes.',
      x: 49,
      y: 63,
      primary: true
    },
    {
      id: 'alerce',
      name: 'Alerce',
      province: 'Llanquihue',
      detail: 'Alerce Norte, Sur, sector industrial y conjuntos residenciales.',
      x: 54,
      y: 57,
      primary: true
    },
    {
      id: 'puerto-varas',
      name: 'Puerto Varas',
      province: 'Llanquihue',
      detail: 'Área urbana, hotelería, condominios y ruta hacia Ensenada.',
      x: 56,
      y: 51,
      primary: true
    },
    {
      id: 'llanquihue',
      name: 'Llanquihue',
      province: 'Llanquihue',
      detail: 'Plantas agroindustriales, comercio y zona residencial.',
      x: 52,
      y: 44,
      primary: false
    },
    {
      id: 'frutillar',
      name: 'Frutillar',
      province: 'Llanquihue',
      detail: 'Frutillar Alto y Bajo, comercio, condominios y sector rural.',
      x: 50,
      y: 37,
      primary: false
    },
    {
      id: 'calbuco',
      name: 'Calbuco',
      province: 'Llanquihue',
      detail: 'Plantas pesqueras/acuícolas, sector urbano y caminos rurales.',
      x: 42,
      y: 72,
      primary: false
    },
    {
      id: 'los-muermos',
      name: 'Los Muermos',
      province: 'Llanquihue',
      detail: 'Predios agrícolas, bodegas, locales comerciales y viviendas.',
      x: 34,
      y: 57,
      primary: false
    },
    {
      id: 'maullin',
      name: 'Maullín',
      province: 'Llanquihue',
      detail: 'Zona urbana, ribera y plantas procesadoras de productos del mar.',
      x: 27,
      y: 66,
      primary: false
    },
    {
      id: 'osorno',
      name: 'Osorno',
      province: 'Osorno',
      detail: 'Sector industrial, comercio, instituciones y condominios.',
      x: 53,
      y: 16,
      primary: true
    },
    {
      id: 'rio-negro',
      name: 'Río Negro',
      province: 'Osorno',
      detail: 'Sector urbano, agrícola y empresas de la provincia de Osorno.',
      x: 47,
      y: 25,
      primary: false
    },
    {
      id: 'ancud',
      name: 'Ancud',
      province: 'Chiloé',
      detail: 'Comercio, empresas acuícolas, hospedajes y viviendas en Chiloé norte.',
      x: 25,
      y: 79,
      primary: false
    },
    {
      id: 'castro',
      name: 'Castro',
      province: 'Chiloé',
      detail: 'Sector industrial, comercio, instituciones y hotelería en Chiloé centro.',
      x: 35,
      y: 90,
      primary: false
    }
  ],
  gallery: [
    {
      id: 'gal-1',
      title: 'Instalación y monitoreo de estaciones cebaderas',
      category: 'Estaciones Cebaderas',
      location: 'Sector Industrial, Puerto Montt',
      image: '/trabajos/trabajo-1.jpg',
      caption: 'Implementación de cordón perimetral con estaciones cebaderas ancladas y rotuladas.'
    },
    {
      id: 'gal-2',
      title: 'Desratización y control perimetral exterior',
      category: 'Desratización',
      location: 'Cardonal / Alerce, Puerto Montt',
      image: '/trabajos/trabajo-2.jpg',
      caption: 'Evaluación y tratamiento en área perimetral y bodegas de almacenamiento.'
    },
    {
      id: 'gal-3',
      title: 'Desinsectación preventiva en instalaciones',
      category: 'Desinsectación',
      location: 'Puerto Varas, Los Lagos',
      image: '/trabajos/trabajo-3.jpg',
      caption: 'Aplicación técnica localizada en zócalos, accesos y sectores críticos.'
    },
    {
      id: 'gal-4',
      title: 'Control preventivo en área comercial e industrial',
      category: 'Trabajos Industriales',
      location: 'Chinquihue, Puerto Montt',
      image: '/trabajos/trabajo-4.jpg',
      caption: 'Inspección y mantención periódica para recinto productivo bajo programa MIP.'
    },
    {
      id: 'gal-5',
      title: 'Sanitización ambiental en recinto cerrado',
      category: 'Sanitización',
      location: 'Puerto Montt, Región de Los Lagos',
      image: '/trabajos/trabajo-5.jpg',
      caption: 'Aplicación uniforme de desinfectante autorizado por ISP en áreas de trabajo.'
    },
    {
      id: 'gal-6',
      title: 'Seguimiento y registro en terreno',
      category: 'Estaciones Cebaderas',
      location: 'Llanquihue, Región de Los Lagos',
      image: '/trabajos/trabajo-6.jpg',
      caption: 'Revisión de dispositivos de monitoreo y actualización de bitácora técnica.'
    },
    {
      id: 'gal-7',
      title: 'Tratamiento técnico residencial y condominios',
      category: 'Desinsectación',
      location: 'Puerto Montt, Los Lagos',
      image: '/trabajos/trabajo-7.jpg',
      caption: 'Aplicación controlada en áreas comunes y perímetros de vivienda.'
    }
  ],
  reviews: [
    {
      id: 'rev-1',
      author: 'Espacio preparado para reseña verificada (Google)',
      sector: 'Cliente Residencial · Puerto Montt',
      rating: 5,
      text: 'Puedes cargar aquí reseñas reales copiadas desde tu Perfil de Empresa en Google o activar el enlace directo desde el panel administrativo.',
      verifiedPlaceholder: true
    },
    {
      id: 'rev-2',
      author: 'Espacio preparado para reseña verificada (Empresa / Condominio)',
      sector: 'Sector Comercial / Industrial · Región de Los Lagos',
      rating: 5,
      text: 'Testimonio editable fácilmente desde Administración para destacar puntualidad, respaldo técnico, informes MIP y atención en terreno.',
      verifiedPlaceholder: true
    }
  ],
  faqs: [
    {
      q: '¿Qué resoluciones sanitarias respaldan los servicios de Control de Plagas Patagonia Chile?',
      a: 'Operamos bajo la razón social Servicios Industriales Ronald Sandrino Almonacid Martínez E.I.R.L., con Resolución Exenta SEREMI de Salud Región de Los Lagos N.º 6119/2021 y Modificación de Dirección Técnica REX N.º 5891/2022, bajo la Dirección Técnica del Ingeniero Agrícola Ricardo Samuel Espinoza Núñez.'
    },
    {
      q: '¿Los productos utilizados son seguros y qué tiempo de reingreso requieren?',
      a: 'Utilizamos únicamente productos autorizados por el Instituto de Salud Pública (ISP) de Chile, aplicados conforme a su etiqueta y Hoja de Datos de Seguridad (HDS). El tiempo de ventilación y reingreso depende del producto y método empleado (por ejemplo, estaciones cerradas, gel localizado o aspersión), lo cual se informa siempre antes y después del servicio.'
    },
    {
      q: '¿Cómo funciona la Desratización Pre-Demolición y la visación en SEREMI?',
      a: 'Previo a demoler un inmueble, realizamos la inspección técnica, tratamiento de desratización y seguimiento de actividad para emitir el certificado técnico correspondiente y orientar/gestionar su visación ante la SEREMI de Salud según la normativa vigente.'
    },
    {
      q: '¿Entregan certificados válidos para patentes comerciales y fiscalizaciones?',
      a: 'Sí. Emitimos certificados técnicos e informes de servicio respaldados con nuestra resolución sanitaria vigente REX N.º 6119/2021. Para trámites que requieren intervención directa de la autoridad sanitaria (como pre-demoliciones), diferenciamos claramente el certificado técnico emitido por nuestra empresa de la visación ante SEREMI.'
    },
    {
      q: '¿Cómo consulto mis certificados, informes y planos si soy cliente empresa o condominio?',
      a: 'A través del botón "Acceso Clientes" puedes ingresar con tus credenciales al portal Central MIP, donde se centralizan certificados MIP, informes técnicos, registros de visitas, fotografías, planos de estaciones cebaderas y hojas de seguridad.'
    },
    {
      q: '¿En qué comunas atienden y cómo se determinan los valores y garantías?',
      a: 'Atendemos en Puerto Montt, Alerce, Puerto Varas, Llanquihue, Frutillar, Calbuco, Los Muermos, Maullín, Osorno, Río Negro, Ancud, Castro y otras zonas del sur de Chile previa coordinación. Los valores referenciales indicados pueden estar sujetos a evaluación en terreno e IVA; las condiciones de seguimiento y cobertura se establecen en la propuesta técnica o contrato de acuerdo al tipo de plaga e inmueble.'
    }
  ]
};
