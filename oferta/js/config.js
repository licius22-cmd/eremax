/* ============================================================
   EREMAX — CONFIGURACIÓN DE LA OFERTA
   Todo lo que normalmente cambias está en este archivo.
   Las rutas de imágenes son relativas a la carpeta /oferta/.
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",
  productName: "Eremax",
  guaranteeDays: 60,

  // Número de prueba social (valoración, reseñas y barra fija). Usa solo un número comprobable.
  customersCount: "[XX,XXX]",

  // Pasa los parámetros UTM / click-id de la URL a la oferta y a los checkouts.
  passQueryParams: true,
  // Contador de la barra Black Friday, por visitante (segundos).
  countdownSeconds: 7200,

  /* ---------------- OFERTA (página de producto) ---------------- */
  oferta: {
    logo: "",  // ej. "images/logo.png" — vacío = logo de texto
    showTimer: false, // true = muestra el contador en la barra negra superior
    profilePill: "",  // ej. "Perfil compatible: aquí está tu plan" (vacío = no aparece)
    productTitle: "EREMAX PERFORMANCE GUMMIES",
    productSubtitle: "Una fórmula natural y diaria para apoyar tu rendimiento, tu deseo y tu resistencia.",

    // Valoración bajo el título. Pon show:false si aún no tienes reseñas reales.
    rating: { show: true, score: "[X.X]" },
    // Etiqueta redondeada bajo la valoración (null = no aparece). Usa solo afirmaciones comprobables.
    formulaBadge: { label: "NUEVA FÓRMULA:", text: "una gomita al día, todos los días" },

    // Imágenes de la galería (la primera es la principal).
    gallery: ["images/product-1.webp", "images/product-2.webp",
              "images/product-3.webp", "images/product-4.webp"],
    supplementFacts: "images/supplement-facts.png",

    // icon: flame | drop | heart | bolt | up | clock | crown
    benefits: [
      { icon: "drop", title: "Rendimiento más firme y pleno", text: "" },
      { icon: "flame", title: "Un deseo que no se apaga", text: "" },
      { icon: "heart", title: "Más energía y resistencia", text: "" },
      { icon: "bolt", title: "Fácil de tomar", text: "Una gomita al día, sin agua y sin complicaciones." }
    ],

    // Paquetes. El que tiene selected:true aparece marcado al entrar.
    bundles: [
      { id: "1", title: "Compra 1", sub: "1 bolsa", price: 69, compareAt: 99, badge: "",
        image: "images/bundle-1.webp", checkoutUrl: "https://example.com/checkout?pkg=1" },
      { id: "3", title: "Compra 2 y lleva 1 GRATIS", sub: "3 bolsas", price: 138, compareAt: 297, badge: "MÁS POPULAR", selected: true,
        image: "images/bundle-3.webp", checkoutUrl: "https://example.com/checkout?pkg=3",
        // Franja que aparece dentro del paquete seleccionado (null = sin franja)
        gift: { title: "GRATIS: [nombre del regalo] ([valor])", text: "[Explica en una frase qué aporta el regalo junto con las gomitas]" } },
      { id: "5", title: "Compra 3 y lleva 2 GRATIS", sub: "5 bolsas", price: 207, compareAt: 495, badge: "MEJOR VALOR",
        image: "images/bundle-5.webp", checkoutUrl: "https://example.com/checkout?pkg=5",
        gift: { title: "GRATIS: 2 regalos ([valor])", text: "[Explica en una frase qué incluye este paquete]" } }
    ],

    // Cuadro "REGALOS DESBLOQUEADOS". unlock = cantidad de bolsas que lo desbloquea.
    // Déjalo vacío ([]) si no ofreces regalos.
    giftsTitle: "REGALOS DESBLOQUEADOS",
    gifts: [
      { name: "[Regalo 1]", value: "$[XX]", unlock: "3", image: "images/gift-1.webp" },
      { name: "[Regalo 2]", value: "$[XX]", unlock: "5", image: "images/gift-2.webp" }
    ],
    // Ventajas con check bajo el botón de compra ([] = no aparece).
    perks: ["Envío con seguimiento", "Garantía de 60 días"],
    currency: "$",
    deliveryDays: 4,     // "Llega entre el ... y el ..." (días a partir de hoy)
    deliveryDaysMax: 9,

    // Solo si vendes por suscripción. Déjalo vacío ("") si es compra única.
    subscriptionNote: "",

    // Opinión de un experto REAL que aprobó tu producto (nombre, título y cita autorizada).
    // Déjalo en null y la pestaña/sección no aparece.
    expert: null, // { name: "Dr. ...", title: "...", quote: "...", photo: "images/expert.jpg" }

    // Pestaña "Detalles del producto" (un párrafo por elemento).
    details: [
      "Eremax combina ingredientes naturales en una sola gomita diaria pensada para apoyar el flujo sanguíneo, el deseo y la energía.",
      "Toma una gomita al día, a la hora que te resulte más fácil de recordar. La constancia es lo que marca la diferencia.",
      "Una rutina diaria, sin receta y sin calcular la hora de una pastilla."
    ],
    // Filas de la pestaña "Tabla comparativa" (Otros ✕ / tu marca ✓).
    comparison: ["Funciona todos los días", "Sin receta médica", "Buen sabor"],

    // Logos de prensa REALES (imágenes en images/press-*.png). Vacío = la franja "Visto en" no aparece.
    press: [],

    // Sección negra "Por qué funcionan mejor juntos" (solo si vendes un regalo/combo). null = no aparece.
    together: null, // { title: "POR QUÉ FUNCIONAN MEJOR JUNTOS", paragraphs: ["...", "..."], image: "images/together.webp", closing: "..." }

    // Párrafos antes de la línea de tiempo ([] = no aparece).
    timelineIntro: [
      "Estas gomitas van a la raíz de la falta de energía y de confianza, en lugar de ocultarla por unas horas. Cada ingrediente fue elegido para apoyar el deseo, el manejo del estrés y la circulación, todos los días.",
      "La clave es la constancia: una gomita al día para que tu cuerpo esté listo cuando ella lo esté, sin depender de calcular la hora."
    ],

    // Insignias bajo el botón "Comprar ahora". Usa solo afirmaciones que puedas comprobar.
    badges: ["Ingredientes naturales", "Fabricado en instalación GMP", "Garantía de devolución"],

    // Reseñas REALES de clientes verificados. Mientras esté vacío, se muestran espacios para completar.
    reviews: [
      // { name: "Nombre A.", title: "Título de la reseña", text: "Texto de la reseña…", photo: "images/review-1.jpg" }
    ],

    // Sección negra "Por qué los hombres eligen…" (4 tarjetas con borde dorado).
    why: [
      { icon: "up", title: "FLUJO SANGUÍNEO DONDE MÁS IMPORTA", text: "Ingredientes elegidos para apoyar una circulación saludable, para que tu cuerpo responda cuando lo necesitas." },
      { icon: "flame", title: "UN DESEO QUE SE SIENTE", text: "Apoyo diario para tu deseo y tu energía, para que vuelvas a tener ganas de buscarla." },
      { icon: "drop", title: "CONFIANZA DE PRINCIPIO A FIN", text: "Una rutina constante para sentirte seguro en la cama, sin pensar en si vas a rendir." },
      { icon: "clock", title: "LISTO CUANDO ELLA LO ESTÉ", text: "Una gomita al día. Sin calcular la hora de una pastilla: tu rutina trabaja todos los días." }
    ],

    // Sección "Lo que nos dijeron en nuestra encuesta". Solo con datos REALES de tu propia encuesta.
    // Déjalo en null y la sección no aparece.
    survey: null, // { note: "*Según respuestas de X clientes.", items: [{ pct: "XX%", text: "..." }, ...] }

    // Imagen debajo de "Es para ti si…" (antes/después, ancho completo).
    rightForYouImage: "images/right-for-you.webp",

    // Ingredientes (ajústalos a tu fórmula real).
    // dose = dosis por porción (pestaña Ingredientes); short = beneficio corto para la tabla.
    ingredientsLabel: "EN TUS GOMITAS",
    ingredients: [
      { name: "L-Citrulina", dose: "[mg]", text: "Un aminoácido que el cuerpo usa para producir óxido nítrico, clave para un flujo sanguíneo saludable." },
      { name: "Azafrán", dose: "[mg]", text: "Un extracto tradicional usado para apoyar el estado de ánimo y el deseo." },
      { name: "Panax Ginseng", dose: "[mg]", text: "Una raíz adaptógena usada tradicionalmente para apoyar la energía y la circulación." },
      { name: "Raíz de Maca", dose: "[mg]", text: "Un superalimento andino asociado al apoyo de la libido y la vitalidad." },
      { name: "Ashwagandha", dose: "[mg]", text: "Un adaptógeno que ayuda al cuerpo a manejar el estrés del día a día." },
      { name: "Shilajit", dose: "[mg]", text: "Una resina mineral rica en ácido fúlvico y minerales traza." }
    ],

    // Segundo carrusel de ingredientes (ej. del regalo). null = no aparece.
    giftIngredients: null, // { label: "EN TU REGALO", items: [{ name: "...", text: "...", image: "images/gift-ing-1.png" }] }

    // Datos de la empresa para el pie de página.
    company: {
      legalName: "[Nombre legal de la empresa]",
      number: "[Número de registro]",
      address: "[Dirección comercial]",
      phone: "[Teléfono]",
      email: "support@eremax.com"
    }
  }
};
