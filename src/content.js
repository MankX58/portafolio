// Todo el contenido del sitio. Los textos bilingües son { es, en }; usa t() de prefs.jsx para leerlos.

export const me = {
  name: "Manuel Gutiérrez Villegas",
  short: "Manuel Gutiérrez",
  email: "manuelguvi500@gmail.com",
  github: "https://github.com/MankX58",
  linkedin: "https://www.linkedin.com/in/manuel-gutierrez-villegas-80616a264",
  cv: { es: "/cv/CV-Manuel-Gutierrez-ES.pdf", en: "/cv/CV-Manuel-Gutierrez-EN.pdf" },
  role: { es: "Desarrollador Front-end", en: "Front-end Developer" },
  location: { es: "Medellín, Colombia · UTC−5", en: "Medellín, Colombia · UTC−5" },
  status: {
    es: "Disponible para práctica o rol junior · remoto o híbrido",
    en: "Open to internship or junior roles · remote or hybrid",
  },
  headline: {
    es: ["Construyo interfaces", "que la gente", "sí usa."],
    en: ["I build interfaces", "people actually", "use."],
  },
  intro: {
    es: "Desarrollador front-end con React, Next.js y TypeScript, y estudiante de Ingeniería de Sistemas. Hoy mantengo una tienda en producción con pagos reales para un negocio de Medellín, y enseño programación como monitor voluntario en la Universidad de Medellín y antes en Code in Place de Stanford.",
    en: "Front-end developer working with React, Next.js and TypeScript, and a Systems Engineering student. I currently maintain a production store with real payments for a business in Medellín, and I teach programming as a volunteer tutor at Universidad de Medellín, and before that in Stanford's Code in Place.",
  },
};

export const facts = [
  { value: 2021, kind: "year", label: { es: "programando por mi cuenta", en: "coding on my own since" } },
  { value: 7, label: { es: "apps desplegadas con URL pública", en: "apps deployed with a public URL" } },
  { value: 1, label: { es: "tienda en producción con pagos reales", en: "production store with real payments" } },
  { value: "B2", label: { es: "inglés · lectura técnica diaria", en: "English · daily technical reading" } },
];

// featured: aparece grande en la portada. Todos tienen página propia en /proyectos/:slug.
export const projects = [
  {
    slug: "esman-parfum",
    featured: true,
    name: "Ésman Parfum",
    year: "2026",
    kind: { es: "E-commerce en producción · negocio real", en: "Production e-commerce · real business" },
    tagline: {
      es: "Tienda de perfumes con pagos en línea y un panel que reemplazó el Excel de contabilidad del dueño.",
      en: "Perfume store with online payments and an admin panel that replaced the owner's accounting spreadsheet.",
    },
    image: "/shots/esman.png",
    gallery: ["/shots/esman-catalogo.png"],
    live: "https://velare-red.vercel.app",
    repo: "https://github.com/MankX58/esmanparfum",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Neon Postgres", "Auth0", "Wompi", "Vercel"],
    metrics: [
      { value: "82", label: { es: "perfumes en catálogo", en: "perfumes in catalog" } },
      { value: "9", label: { es: "módulos de administración", en: "admin modules" } },
      { value: "4", label: { es: "medios de pago", en: "payment methods" } },
      { value: "59", label: { es: "commits", en: "commits" } },
    ],
    problem: {
      es: "Las ventas llegaban por WhatsApp e Instagram, casi siempre desde el celular, y toda la contabilidad (compras, ventas, gastos y clientes) vivía en un Excel que el dueño llenaba a mano. Muchos pedidos son bajo encargo: el cliente paga, el dueño compra al proveedor y envía.",
      en: "Sales came in through WhatsApp and Instagram, almost always from a phone, and all the bookkeeping (purchases, sales, expenses and customers) lived in a spreadsheet the owner filled in by hand. Many orders are made to order: the customer pays, the owner buys from the supplier and ships.",
    },
    built: {
      es: [
        "Catálogo con búsqueda y filtros por género, marca y tamaño, pensado primero para celular.",
        "Checkout con Wompi (tarjeta, PSE, Nequi, Bancolombia) que confirma el pedido solo, y pago por transferencia con QR que el administrador confirma a mano.",
        "Seguimiento de pedido con barra de progreso y fecha estimada de entrega calculada en hora de Colombia.",
        "Panel de administración: pedidos, ventas, compras, caja, clientes, códigos de descuento, precios, cotizaciones y productos.",
        "SEO técnico: sitemap, robots, datos estructurados JSON-LD, imágenes Open Graph y feed para Google Merchant Center.",
      ],
      en: [
        "Mobile-first catalog with search and filters by gender, brand and size.",
        "Checkout with Wompi (card, PSE, Nequi, Bancolombia) that confirms orders automatically, plus QR bank transfer the admin confirms manually.",
        "Order tracking with a progress bar and an estimated delivery window computed in Colombia's time zone.",
        "Admin panel: orders, sales, purchases, cash, customers, discount codes, pricing, quotes and products.",
        "Technical SEO: sitemap, robots, JSON-LD structured data, Open Graph images and a Google Merchant Center feed.",
      ],
    },
    decisions: {
      es: [
        ["Cada pedido guarda precio, costo y total del momento", "Si un precio cambia mañana, los reportes de ayer siguen cuadrando."],
        ["Un sistema de diseño escrito antes que el código", "DESIGN.md define los tokens; la paleta por defecto de Tailwind está desactivada y cada texto cumple contraste 4.5:1."],
        ["Bases de datos separadas para desarrollo y producción", "Uso ramas de Neon: nunca pruebo contra los datos reales del negocio."],
        ["Código legible para alguien de nivel intermedio", "El dueño debe poder pedir cambios a otra persona sin depender de mí."],
      ],
      en: [
        ["Every order stores price, cost and total at the moment of sale", "If a price changes tomorrow, yesterday's reports still add up."],
        ["A design system written before the code", "DESIGN.md defines the tokens; Tailwind's default palette is disabled and all text meets 4.5:1 contrast."],
        ["Separate databases for development and production", "I use Neon branches: I never test against the business's real data."],
        ["Code an intermediate developer can read", "The owner should be able to hand changes to someone else without depending on me."],
      ],
    },
  },
  {
    slug: "mi-semestre",
    featured: true,
    name: "Mi semestre",
    year: "2026",
    kind: { es: "Producto propio · lo uso a diario", en: "My own product · I use it daily" },
    tagline: {
      es: "Horario, notas, exámenes y faltas en un solo lugar. Te dice cuánto necesitas en el final y cuántas faltas te quedan antes de perder la materia.",
      en: "Schedule, grades, exams and absences in one place. It tells you what you need on the final and how many absences you have left before failing the course.",
    },
    image: "/shots/semestre-horario.jpg",
    gallery: ["/shots/semestre-notas.jpg", "/shots/semestre-faltas.jpg"],
    live: "https://gestion-universitaria-fikx.vercel.app",
    repo: "https://github.com/MankX58/student-planner-and-grades",
    stack: ["Next.js 16", "React 19", "TypeScript", "Server Actions", "Drizzle ORM", "PostgreSQL", "Better Auth", "Google OAuth", "Tailwind CSS 4"],
    metrics: [
      { value: "4", label: { es: "módulos: horario, notas, exámenes, faltas", en: "modules: schedule, grades, exams, absences" } },
      { value: "700 ms", label: { es: "autoguardado en la nube", en: "cloud autosave" } },
      { value: "2.150", label: { es: "líneas de TypeScript", en: "lines of TypeScript" } },
      { value: "38", label: { es: "commits", en: "commits" } },
    ],
    problem: {
      es: "En la Universidad de Medellín el final vale 25 % y una materia se cancela si superas el límite de faltas, que depende de las horas de trabajo directo de cada una. Yo llevaba todo eso en la cabeza o en notas sueltas, y a fin de semestre siempre llegaba la misma duda: ¿cuánto necesito sacar en el final? ¿Cuántas faltas me quedan?",
      en: "At Universidad de Medellín the final exam is worth 25%, and a course is cancelled if you exceed an absence limit that depends on each course's contact hours. I kept all of that in my head or in scattered notes, and the same question always came up at the end of the term: what do I need on the final? How many absences do I have left?",
    },
    built: {
      es: [
        "Horario semanal editable: materias de varios días, grupo y salón, con un color por materia.",
        "Notas por materia con su porcentaje: muestra el acumulado, cuánto falta por asignar y cuánto necesitas en el final para quedar en 3.0 (o te avisa que ya ganaste).",
        "Control de faltas: a partir de las horas de trabajo directo calcula el límite, te dice cuántas faltas seguras te quedan y te alerta cuando estás en riesgo.",
        "Fechas de exámenes en vista de lista o calendario, con modalidad, tipo y peso.",
        "Inicio de sesión con Google y sincronización entre celular y computador; puedes ocultar en cada vista las materias que no se califican (gimnasio, monitorías).",
      ],
      en: [
        "Editable weekly schedule: multi-day courses, group and room, with a color per course.",
        "Grades per course with their weight: shows the running total, what's left to assign and what you need on the final to reach 3.0 (or tells you you've already passed).",
        "Absence tracking: from each course's contact hours it computes the limit, shows how many safe absences you have left and warns you when you're at risk.",
        "Exam dates in list or calendar view, with format, type and weight.",
        "Google sign-in and sync between phone and laptop; you can hide ungraded courses (gym, tutoring) per view.",
      ],
    },
    decisions: {
      es: [
        ["Las reglas de la universidad viven en funciones puras", "neededOnFinal() y absenceLimit() (límite = ⌊horas × 0,20 / 2⌋) están en un solo archivo. Si la universidad cambia una regla, se cambia una línea."],
        ["Autoguardado con debounce de 700 ms", "Cada cambio se guarda solo, sin botón de guardar, pero sin una petición por cada tecla. El indicador «Sincronizado» siempre dice en qué estado está."],
        ["Nadie perdió sus datos al pasar a la nube", "La primera versión guardaba en localStorage. Al iniciar sesión por primera vez, la app migra esos datos a Postgres y marca la migración como hecha."],
        ["Un registro por usuario con columnas JSONB", "Horario, notas, exámenes y faltas se leen en una sola consulta. Para datos que siempre se cargan juntos, es más simple que seis tablas con joins."],
        ["La sesión se valida en el servidor", "Las Server Actions leen la sesión de Better Auth antes de tocar la base de datos: cada usuario solo puede leer y escribir lo suyo."],
        ["Arranqué rápido con IA y lo hice mío", "Generé el primer esqueleto de interfaz con v0 y después iteré a mano la lógica: faltas, notas, materias de varios días y la versión móvil."],
      ],
      en: [
        ["University rules live in pure functions", "neededOnFinal() and absenceLimit() (limit = ⌊hours × 0.20 / 2⌋) sit in a single file. If the university changes a rule, one line changes."],
        ["Autosave with a 700 ms debounce", "Every change saves itself, with no save button, but without one request per keystroke. The “Synced” indicator always shows the current state."],
        ["Nobody lost their data moving to the cloud", "The first version stored data in localStorage. On first sign-in, the app migrates that data to Postgres and marks the migration as done."],
        ["One row per user with JSONB columns", "Schedule, grades, exams and absences load in a single query. For data that's always loaded together, that's simpler than six joined tables."],
        ["The session is checked on the server", "Server Actions read the Better Auth session before touching the database: each user can only read and write their own data."],
        ["Started fast with AI, then made it mine", "I generated the first UI skeleton with v0 and then iterated the logic by hand: absences, grades, multi-day courses and the mobile version."],
      ],
    },
  },
  {
    slug: "udemaps",
    featured: true,
    name: "UdeMaps",
    year: "2026",
    kind: { es: "Algoritmos · proyecto final de ADA", en: "Algorithms · final project" },
    tagline: {
      es: "Rutas en Medellín que no solo buscan la más corta, sino la más segura. Dijkstra y A* escritos desde cero sobre 68.750 calles.",
      en: "Routes across Medellín that look for the safest path, not just the shortest. Dijkstra and A* written from scratch over 68,750 streets.",
    },
    image: null,
    live: "https://practica-ada-udem.streamlit.app",
    repo: "https://github.com/MankX58/PracticaADA",
    stack: ["Python", "Streamlit", "Folium", "Leaflet.js", "Open-Meteo API"],
    metrics: [
      { value: "68.750", label: { es: "aristas en el grafo", en: "graph edges" } },
      { value: "2", label: { es: "algoritmos propios", en: "hand-written algorithms" } },
      { value: "60fps", label: { es: "animación del recorrido", en: "search animation" } },
      { value: "51", label: { es: "commits", en: "commits" } },
    ],
    problem: {
      es: "Las apps de mapas optimizan distancia o tiempo. En Medellín, para mucha gente la pregunta real es otra: ¿por dónde camino sin exponerme a acoso o inseguridad?",
      en: "Map apps optimize for distance or time. In Medellín, for many people the real question is different: which way can I walk without being exposed to harassment or danger?",
    },
    built: {
      es: [
        "Dijkstra y A* implementados a mano con lista de adyacencia y cola de prioridad propia; A* usa la distancia de Haversine como heurística.",
        "Costo paramétrico: Costo = α·Distancia + β·Riesgo, ajustable desde la interfaz.",
        "Clima en vivo con Open-Meteo: si llueve en Medellín, β se duplica y las rutas cambian en tiempo real.",
        "Rutas con varias paradas encadenando tramos, sin disparar el uso de memoria.",
        "Mapa de calor del riesgo en toda la ciudad.",
      ],
      en: [
        "Dijkstra and A* implemented by hand with an adjacency list and my own priority queue; A* uses Haversine distance as its heuristic.",
        "Parametric cost: Cost = α·Distance + β·Risk, tunable from the UI.",
        "Live weather from Open-Meteo: if it rains in Medellín, β doubles and routes change in real time.",
        "Multi-stop routes by chaining segments, without blowing up memory usage.",
        "A city-wide risk heat map.",
      ],
    },
    decisions: {
      es: [
        ["La animación vive en un iframe con Leaflet", "Streamlit vuelve a renderizar todo en cada cambio; aislar la animación la llevó a 60fps."],
        ["Depurar el núcleo, no el síntoma", "Una variable 'actual' se sobrescribía dentro del bucle principal del grafo. El arreglo fue de una línea en grafo.py; encontrarlo exigió seguir el algoritmo paso a paso."],
        ["El código como paquete, no como script", "app/grafo.py, datos.py y animacion.py separan algoritmo, datos y presentación."],
      ],
      en: [
        ["The animation lives in an iframe with Leaflet", "Streamlit re-renders everything on each change; isolating the animation got it to 60fps."],
        ["Debug the core, not the symptom", "A 'current' variable was being overwritten inside the graph's main loop. The fix was one line in grafo.py; finding it meant tracing the algorithm step by step."],
        ["Code as a package, not a script", "app/grafo.py, datos.py and animacion.py keep algorithm, data and presentation apart."],
      ],
    },
  },
  {
    slug: "vitania",
    featured: true,
    name: "Vitania",
    year: "2026",
    kind: { es: "Full-stack · bienestar para adultos mayores", en: "Full-stack · wellbeing for older adults" },
    tagline: {
      es: "Clases, citas que no se olvidan y comida adaptada a cada condición médica. Con API propia y recordatorios push.",
      en: "Classes, appointments people don't forget and meals adapted to each medical condition. With its own API and push reminders.",
    },
    image: "/shots/vitania.png",
    live: "https://vitania-theta.vercel.app",
    repo: "https://github.com/MankX58/Vitania",
    stack: ["React 18", "Vite", "Express 5", "Neon Postgres", "Auth0 + jose (JWT)", "Web Push (VAPID)", "Framer Motion"],
    metrics: [
      { value: "7", label: { es: "pantallas", en: "screens" } },
      { value: "5 min", label: { es: "ciclo de recordatorios", en: "reminder cycle" } },
      { value: "1", label: { es: "API propia", en: "custom API" } },
    ],
    problem: {
      es: "Personas mayores o con condiciones como Parkinson, artritis o diabetes necesitan actividad física, comida adecuada y no olvidar sus citas, pero las apps comunes no están pensadas para ellas.",
      en: "Older adults, or people living with Parkinson's, arthritis or diabetes, need physical activity, suitable meals and to not miss appointments, but common apps aren't designed for them.",
    },
    built: {
      es: [
        "Perfil de salud en el registro que personaliza clases y comidas.",
        "Catálogo de clases (aeróbicos, cocina, manualidades) con asistencia compartida.",
        "Gestor de citas con avisos push en el teléfono.",
        "Módulo de alimentación que cruza las restricciones médicas del perfil con cada comida.",
      ],
      en: [
        "Health profile at sign-up that personalizes classes and meals.",
        "Class catalog (aerobics, cooking, crafts) with shared attendance.",
        "Appointment manager with push notifications on the phone.",
        "Meal module that cross-checks each dish against the profile's medical restrictions.",
      ],
    },
    decisions: {
      es: [
        ["Express valida el JWT de Auth0 en cada petición", "Con jose verifico firma, emisor y audiencia contra las llaves públicas (JWKS) de Auth0: el cliente nunca decide a qué datos médicos accede."],
        ["Recordatorios sin servidor permanente", "En Vercel no hay proceso vivo, así que un cron externo llama a /api/cron/tick cada 5 minutos con un secreto. En local el servidor revisa solo cada minuto."],
        ["Diseño para manos y ojos cansados", "Botones grandes, contraste alto y textos cortos."],
      ],
      en: [
        ["Express validates the Auth0 JWT on every request", "With jose I verify signature, issuer and audience against Auth0's public keys (JWKS): the client never decides which medical data it can access."],
        ["Reminders without a long-running server", "Vercel has no live process, so an external cron hits /api/cron/tick every 5 minutes with a secret. Locally the server checks every minute on its own."],
        ["Designed for tired hands and eyes", "Large buttons, high contrast and short copy."],
      ],
    },
  },
  {
    slug: "chatbot-ia",
    featured: true,
    name: "Chatbot IA",
    year: "2026",
    kind: { es: "IA · reto académico Universidad de Medellín", en: "AI · Universidad de Medellín challenge" },
    tagline: {
      es: "Soporte tecnológico para la universidad: responde con IA, mide qué tan seguro está y, si no lo está, escala a un agente humano con un ticket.",
      en: "IT support for the university: it answers with AI, measures how confident it is and, when it isn't, escalates to a human agent with a ticket.",
    },
    image: "/shots/chatbot.png",
    live: "https://chatbot-ia-blond.vercel.app",
    repo: "https://github.com/MankX58/Chatbot-IA",
    stack: ["React 19", "Vite", "Vercel Functions", "DeepSeek API", "PostgreSQL", "Auth0"],
    metrics: [
      { value: "3", label: { es: "roles: estudiante, agente, admin", en: "roles: student, agent, admin" } },
      { value: "60+", label: { es: "entradas en la base de conocimiento", en: "knowledge base entries" } },
      { value: "4", label: { es: "paneles: chat, tickets, agente, analítica", en: "panels: chat, tickets, agent, analytics" } },
      { value: "39", label: { es: "commits", en: "commits" } },
    ],
    problem: {
      es: "Las preguntas de soporte de la universidad (correo institucional, Canvas, WiFi, SIGAA, carné) se repiten todo el semestre y llegan por canales lentos. Un bot que responde cualquier cosa no sirve: inventa. Hacía falta uno que sepa cuándo no sabe.",
      en: "The university's support questions (institutional email, Canvas, WiFi, SIGAA, student ID) repeat all term long and arrive through slow channels. A bot that answers anything is useless: it makes things up. It needed one that knows when it doesn't know.",
    },
    built: {
      es: [
        "Chat con IA (DeepSeek) apoyado en una base de conocimiento de la UdeM: servicios, 27 pregrados con su código SNIES, posgrados y trámites, contrastada con fuentes oficiales.",
        "Puntaje de confianza: si la respuesta no se apoya en la base de conocimiento, el bot lo reconoce en vez de inventar.",
        "Escalamiento a soporte humano: crea un ticket con prioridad y el contexto de la conversación, y el estudiante puede seguir respondiendo ahí.",
        "Panel de agente para atender tickets y panel de analítica para administración.",
        "Aprendizaje continuo: las soluciones de tickets resueltos y los chats calificados con 4 o 5 estrellas vuelven a la base de conocimiento.",
      ],
      en: [
        "AI chat (DeepSeek) grounded in a UdeM knowledge base: services, 27 undergraduate programs with their SNIES code, graduate programs and procedures, checked against official sources.",
        "Confidence score: if an answer isn't backed by the knowledge base, the bot says so instead of making it up.",
        "Escalation to human support: it opens a ticket with priority and the conversation's context, and the student can keep replying there.",
        "Agent panel to handle tickets and an analytics panel for admins.",
        "Continuous learning: solutions from resolved tickets and chats rated 4 or 5 stars flow back into the knowledge base.",
      ],
    },
    decisions: {
      es: [
        ["La llave de la IA vive en una función serverless", "El navegador habla con /api/chat en Vercel; solo esa función conoce la llave de DeepSeek."],
        ["Confianza calculada, no supuesta", "Normalizo y tokenizo la pregunta, quito palabras vacías y la comparo con el problema, el tema y la solución de cada entrada (55 / 20 / 25 %)."],
        ["Roles desde Auth0", "Lo que ve cada usuario depende de un claim de roles de Auth0, con listas de correos por entorno como respaldo para pruebas."],
        ["Una bitácora de decisiones en el repo", "AI_LOG.md registra cada cambio importante, por qué se hizo y cómo se validó (build y lint)."],
      ],
      en: [
        ["The AI key lives in a serverless function", "The browser talks to /api/chat on Vercel; only that function knows the DeepSeek key."],
        ["Confidence computed, not assumed", "I normalize and tokenize the question, drop stopwords and compare it against each entry's problem, topic and solution (55 / 20 / 25%)."],
        ["Roles from Auth0", "What each user sees depends on an Auth0 roles claim, with per-environment email lists as a fallback for testing."],
        ["A decision log in the repo", "AI_LOG.md records each major change, why it was made and how it was validated (build and lint)."],
      ],
    },
  },
  {
    slug: "mercado-viva",
    name: "Mercado Viva",
    year: "2026",
    kind: { es: "Herramienta interna de retail", en: "Internal retail tool" },
    tagline: {
      es: "Devoluciones en tres pasos para el personal de tienda: buscar el pedido, validar si aplica y confirmar el reembolso, sin reembolsar dos veces.",
      en: "Three-step returns for store staff: find the order, check if it qualifies and confirm the refund, without refunding twice.",
    },
    image: "/shots/mercado.png",
    live: "https://mercado-viva-devoluciones-six.vercel.app",
    repo: "https://github.com/MankX58/mercado-viva-devoluciones",
    stack: ["React 19", "Vite", "Tailwind CSS 4", "shadcn/ui", "Drizzle ORM", "Neon Postgres"],
    metrics: [
      { value: "3", label: { es: "pasos por devolución", en: "steps per return" } },
      { value: "2", label: { es: "estados: completado o revertido", en: "states: completed or reverted" } },
    ],
    problem: {
      es: "Trabajé en caja en retail: una devolución con fila esperando es el peor momento para dudar. ¿El pedido está en plazo? ¿Ya se reembolsó? El personal necesita una herramienta que responda eso en segundos.",
      en: "I've worked a retail register: a return with a line waiting is the worst moment to hesitate. Is the order within the window? Was it already refunded? Staff need a tool that answers that in seconds.",
    },
    built: {
      es: [
        "Búsqueda del pedido por número o escaneando el código QR de la compra.",
        "Validación con el estado del pedido (apto, fuera de plazo, etc.) y las condiciones a revisar antes de devolver.",
        "Confirmación del reembolso con método de pago y motivo, guardada en Postgres.",
        "Aviso si el pedido ya fue reembolsado, y vista de administración para revisar o revertir reembolsos.",
      ],
      en: [
        "Order lookup by number or by scanning the purchase's QR code.",
        "Validation against the order's status (eligible, past the window, etc.) and the conditions to check before a return.",
        "Refund confirmation with payment method and reason, stored in Postgres.",
        "A warning when an order was already refunded, plus an admin view to review or revert refunds.",
      ],
    },
    decisions: {
      es: [
        ["Revertir, no borrar", "Un reembolso pasa a estado «revertido» con su fecha en vez de eliminarse: siempre queda el rastro de lo que pasó."],
        ["Diseñado para el mostrador", "Pasos numerados, un solo botón principal por pantalla y ayuda visible: nadie debería adivinar con una fila esperando."],
      ],
      en: [
        ["Revert, don't delete", "A refund moves to a “reverted” state with its date instead of being deleted: there's always a trail of what happened."],
        ["Designed for the counter", "Numbered steps, one primary button per screen and visible help: nobody should have to guess with a line waiting."],
      ],
    },
  },
  {
    slug: "mis-finanzas",
    name: "Mis Finanzas",
    year: "2026",
    kind: { es: "Finanzas personales", en: "Personal finance" },
    tagline: {
      es: "Ingresos, gastos, presupuestos y categorías, con gráficas animadas. Sin cuenta y sin servidor: tus datos no salen de tu navegador.",
      en: "Income, expenses, budgets and categories, with animated charts. No account and no server: your data never leaves your browser.",
    },
    image: "/shots/finanzas.png",
    live: "https://mis-finanzas-mankx.vercel.app",
    repo: "https://github.com/MankX58/mis-finanzas",
    stack: ["React 18", "Vite", "Chart.js 4", "localStorage"],
    metrics: [
      { value: "4", label: { es: "vistas: resumen, movimientos, presupuesto, categorías", en: "views: summary, transactions, budget, categories" } },
      { value: "0", label: { es: "datos enviados a un servidor", en: "data sent to a server" } },
    ],
    problem: {
      es: "Quería saber en qué se me iba la plata cada mes sin entregarle mis datos financieros a una app de terceros ni crear otra cuenta.",
      en: "I wanted to know where my money went each month without handing my financial data to a third-party app or creating yet another account.",
    },
    built: {
      es: [
        "Registro de ingresos y gastos con categoría y nota, editable.",
        "Balance del mes y gráfica de dona con la distribución de gastos.",
        "Presupuestos por categoría con una gráfica de «vasos» que se llenan a medida que gastas.",
        "Categorías personalizables con color e ícono.",
      ],
      en: [
        "Income and expense log with category and note, editable.",
        "Monthly balance and a doughnut chart with the spending breakdown.",
        "Per-category budgets with a “glass” chart that fills up as you spend.",
        "Custom categories with color and icon.",
      ],
    },
    decisions: {
      es: [
        ["localStorage a propósito", "Para datos financieros personales, no tener servidor es una ventaja: nada que filtrar ni que mantener, y funciona sin internet una vez cargada."],
        ["Animar con CSS, no con librerías", "Los vasos arrancan en 0 y suben con una transición de CSS; basta un setTimeout de 60 ms para que el navegador pinte primero el estado inicial."],
      ],
      en: [
        ["localStorage on purpose", "For personal financial data, having no server is a feature: nothing to leak or maintain, and it works offline once loaded."],
        ["Animate with CSS, not libraries", "The glasses start at 0 and rise with a CSS transition; a 60 ms setTimeout is enough for the browser to paint the initial state first."],
      ],
    },
  },
];

// Cada habilidad apunta a los proyectos donde se puede comprobar.
export const skills = [
  { group: { es: "Front-end", en: "Front-end" }, items: [
    ["React", ["esman-parfum", "mi-semestre", "vitania", "chatbot-ia", "mercado-viva", "mis-finanzas"]],
    ["Next.js (App Router, Server Actions)", ["esman-parfum", "mi-semestre"]],
    ["TypeScript", ["esman-parfum", "mi-semestre"]],
    ["Tailwind CSS", ["esman-parfum", "mi-semestre", "mercado-viva"]],
    ["Accesibilidad / a11y", ["esman-parfum", "vitania"]],
    ["SEO técnico", ["esman-parfum"]],
  ] },
  { group: { es: "Back-end y datos", en: "Back-end & data" }, items: [
    ["Node.js / Express", ["vitania", "chatbot-ia"]],
    ["PostgreSQL (Neon)", ["esman-parfum", "mi-semestre", "vitania", "chatbot-ia"]],
    ["Drizzle ORM / SQL", ["mi-semestre", "mercado-viva"]],
    ["Auth0 / Better Auth / OAuth", ["esman-parfum", "mi-semestre", "vitania", "chatbot-ia"]],
    ["Pagos (Wompi)", ["esman-parfum"]],
    ["APIs de IA (DeepSeek) y REST", ["chatbot-ia", "udemaps"]],
  ] },
  { group: { es: "Fundamentos", en: "Fundamentals" }, items: [
    ["Python", ["udemaps"]],
    ["Algoritmos y grafos", ["udemaps"]],
    ["Git y despliegue (Vercel)", ["esman-parfum", "udemaps", "vitania", "chatbot-ia"]],
  ] },
];

export const timeline = [
  {
    when: "2026",
    title: { es: "Ésman Parfum en producción", en: "Ésman Parfum goes live" },
    org: { es: "Proyecto para un negocio real", en: "Project for a real business" },
    body: {
      es: "Diseño, desarrollo y mantenimiento de la tienda y el panel de administración.",
      en: "Design, development and maintenance of the store and its admin panel.",
    },
    link: "/proyectos/esman-parfum",
  },
  {
    when: "2026 —",
    title: { es: "Monitor de programación (voluntario)", en: "Programming tutor (volunteer)" },
    org: { es: "Universidad de Medellín · desde febrero de 2026", en: "Universidad de Medellín · since February 2026" },
    body: {
      es: "Acompaño grupos de 3 a 10 estudiantes que están aprendiendo a programar en Python. Aquí tengo libertad para diseñar: preparo algunos talleres yo mismo, como uno de condicionales y otro de programación orientada a objetos en notebooks, con una versión para el estudiante y otra con las soluciones.",
      en: "I support groups of 3 to 10 students learning to program in Python. Here I have room to design: I prepare some workshops myself, such as one on conditionals and one on object-oriented programming in notebooks, with a student version and a solutions version.",
    },
    highlight: true,
  },
  {
    when: "2025",
    title: { es: "Monitor de programación (voluntario)", en: "Programming section leader (volunteer)" },
    org: { es: "Code in Place · Stanford University × Universidad de los Andes · oct–nov 2025", en: "Code in Place · Stanford University × Universidad de los Andes · Oct–Nov 2025" },
    body: {
      es: "Guié a un grupo de estudiantes aprendiendo Python con el currículo de Stanford, en la edición que certifica la Universidad de los Andes: sesiones semanales sobre condicionales, ciclos, funciones y estructuras de datos, revisión de código y caza de errores de lógica, adaptando cada explicación al nivel de la persona.",
      en: "Led a group of students learning Python on Stanford's curriculum, in the edition certified by Universidad de los Andes: weekly sessions on conditionals, loops, functions and data structures, code review and logic-bug hunting, adapting each explanation to the person's level.",
    },
    highlight: true,
    link: "https://wallet.xertify.co/certificates/CB45FD38A004?v=183ac637-3856-4528-b8d1-204da9913d21",
  },
  {
    when: "2025",
    title: { es: "Asesor comercial / auxiliar operativo", en: "Sales associate / operations assistant" },
    org: { es: "Baby Fresh · Medellín", en: "Baby Fresh · Medellín" },
    body: {
      es: "Facturación y punto de venta en alta rotación. Me dejó algo que uso al programar: ver el software desde el lado de quien lo usa con prisa y con una fila esperando.",
      en: "Billing and point of sale in a high-traffic store. It taught me something I use when coding: seeing software from the side of someone using it in a hurry, with a line waiting.",
    },
  },
  {
    when: "2024 —",
    title: { es: "Ingeniería de Sistemas", en: "B.Sc. Systems Engineering" },
    org: { es: "Universidad de Medellín · en curso", en: "Universidad de Medellín · in progress" },
    body: {
      es: "Algoritmos, estructuras de datos, bases de datos y desarrollo de software.",
      en: "Algorithms, data structures, databases and software development.",
    },
  },
  {
    when: "2021",
    title: { es: "Primera línea de código", en: "First line of code" },
    org: { es: "Autodidacta", en: "Self-taught" },
    body: {
      es: "Empecé con HTML, CSS y JavaScript construyendo páginas para mí. No he parado.",
      en: "Started with HTML, CSS and JavaScript building pages for myself. Haven't stopped since.",
    },
  },
];

export const certs = [
  { name: "Code in Place · Enseñanza y Mentoría de Programación con Python (mentor, 24 h)", by: "Stanford × Universidad de los Andes", year: "2025", url: "https://wallet.xertify.co/certificates/CB45FD38A004?v=183ac637-3856-4528-b8d1-204da9913d21" },
  { name: "Programación con JavaScript", by: "Meta · Coursera", year: "2024", url: "https://coursera.org/verify/OJ0115L9DI50" },
  { name: "AWS Well-Architected Foundations", by: "AWS Training & Certification", year: "2026" },
  { name: "Introducción al desarrollo web: HTML y CSS (1 y 2)", by: "Google", year: "2024" },
  { name: "JavaScript, Programación Básica y Tailwind CSS", by: "Platzi" },
  { name: "Developing Interpersonal Skills", by: "IBM · Coursera", year: "2024", url: "https://coursera.org/verify/8T2B6MTJJMRP" },
  { name: "Gestión de datos en Excel con SQL básico (90 h)", by: "Cencala" },
  { name: "Habilidades blandas y comunicativas", by: "SENA" },
];

export const principles = [
  {
    title: { es: "Escribo antes de construir", en: "I write before I build" },
    body: {
      es: "Mis proyectos llevan PRODUCT.md y DESIGN.md: quién lo usa, qué problema resuelve y qué reglas visuales sigue. Así las decisiones no se toman dos veces.",
      en: "My projects ship with PRODUCT.md and DESIGN.md: who uses it, what problem it solves and which visual rules it follows. That way decisions don't get made twice.",
    },
  },
  {
    title: { es: "Despliego temprano", en: "I deploy early" },
    body: {
      es: "Todo lo que ves aquí tiene una URL pública. Un proyecto que solo corre en mi computador todavía no existe.",
      en: "Everything here has a public URL. A project that only runs on my laptop doesn't exist yet.",
    },
  },
  {
    title: { es: "Accesible por defecto", en: "Accessible by default" },
    body: {
      es: "Contraste 4.5:1, foco visible y navegación por teclado no son extras. Esta misma página respeta tu preferencia de movimiento reducido.",
      en: "4.5:1 contrast, visible focus and keyboard navigation aren't extras. This very page respects your reduced-motion preference.",
    },
  },
];
