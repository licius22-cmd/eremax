/* ============================================================
   EREMAX — CONFIGURACIÓN GENERAL (quiz + oferta)
   Todo lo que normalmente cambias está en este archivo.
   Las rutas de imágenes son relativas a /quiz/ y /oferta/.
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",
  productName: "Eremax",
  guaranteeDays: 60,

  // Número de prueba social (quiz pasos 3 y 7, valoración de la oferta). Usa solo un número comprobable.
  customersCount: "[XX,XXX]",
  // Porcentaje del bloque "probabilidad de éxito" (quiz paso 14).
  successRate: "[XX]%",

  // Pasa los parámetros UTM / click-id de la URL a la oferta y a los checkouts.
  passQueryParams: true,
  // Contador de la barra Black Friday, por visitante (segundos).
  countdownSeconds: 7200,

  /* ---------------- QUIZ ---------------- */
  quiz: {
    // A dónde envía el botón "Enviar" del último paso.
    redirectUrl: "../oferta/",
    images: {
      logo: "",  // ej. "../assets/images/logo.png"
      // Paso 1 — edad (20-29 → 70+)
      age: ["../assets/images/quiz/step1-1.webp", "../assets/images/quiz/step1-2.webp", "../assets/images/quiz/step1-3.webp",
            "../assets/images/quiz/step1-4.webp", "../assets/images/quiz/step1-5.webp", "../assets/images/quiz/step1-6.webp"],
      // Paso 2 — íconos (carpeta icons/)
      icons: ["../assets/images/quiz/icons/step2-1.png", "../assets/images/quiz/icons/step2-2.png", "../assets/images/quiz/icons/step2-3.png",
              "../assets/images/quiz/icons/step2-4.png", "../assets/images/quiz/icons/step2-5.png", "../assets/images/quiz/icons/step2-6.png"],
      // Paso 7 — prueba social
      proof: ["../assets/images/quiz/step7-1.webp", "../assets/images/quiz/step7-2.webp", "../assets/images/quiz/step7-3.webp", "../assets/images/quiz/step7-4.png"],
      // Paso 11 — motivacional
      transformation: "../assets/images/quiz/step11-1.webp",
      // Paso 14 — resumen
      profile: "../assets/images/quiz/step14-1.webp"
    }
  },

  /* ---------------- OFERTA (página de producto) ---------------- */
  oferta: {
    productTitle: "EREMAX PERFORMANCE GUMMIES",
    productSubtitle: "Una fórmula natural y diaria para apoyar tu rendimiento, tu deseo y tu resistencia.",

    // Valoración bajo el título. Pon show:false si aún no tienes reseñas reales.
    rating: { show: true, score: "[X.X]" },

    // Imágenes de la galería (la primera es la principal).
    gallery: ["../assets/images/oferta/product-1.webp", "../assets/images/oferta/product-2.webp",
              "../assets/images/oferta/product-3.webp", "../assets/images/oferta/product-4.webp"],
    supplementFacts: "../assets/images/oferta/supplement-facts.png",

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
        image: "../assets/images/oferta/bundle-1.webp", checkoutUrl: "https://example.com/checkout?pkg=1" },
      { id: "3", title: "Compra 2 y lleva 1 GRATIS", sub: "3 bolsas", price: 138, compareAt: 297, badge: "MÁS POPULAR", selected: true,
        image: "../assets/images/oferta/bundle-3.webp", checkoutUrl: "https://example.com/checkout?pkg=3" },
      { id: "5", title: "Compra 3 y lleva 2 GRATIS", sub: "5 bolsas", price: 207, compareAt: 495, badge: "MEJOR VALOR",
        image: "../assets/images/oferta/bundle-5.webp", checkoutUrl: "https://example.com/checkout?pkg=5" }
    ],
    currency: "$",
    deliveryDays: 4, // "Pide hoy y recíbelo el ..." (días a partir de hoy)

    // Solo si vendes por suscripción. Déjalo vacío ("") si es compra única.
    subscriptionNote: "",

    // Opinión de un experto REAL que aprobó tu producto (nombre, título y cita autorizada).
    // Déjalo en null y la pestaña/sección no aparece.
    expert: null, // { name: "Dr. ...", title: "...", quote: "...", photo: "../assets/images/oferta/expert.jpg" }

    // Insignias bajo el botón "Comprar ahora". Usa solo afirmaciones que puedas comprobar.
    badges: ["Ingredientes naturales", "Fabricado en instalación GMP", "Garantía de devolución"],

    // Reseñas REALES de clientes verificados. Mientras esté vacío, se muestran espacios para completar.
    reviews: [
      // { name: "Nombre A.", title: "Título de la reseña", text: "Texto de la reseña…", photo: "../assets/images/oferta/review-1.jpg" }
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
    rightForYouImage: "../assets/images/oferta/right-for-you.webp",

    // Ingredientes (ajústalos a tu fórmula real).
    ingredients: [
      { name: "L-Citrulina", text: "Un aminoácido que el cuerpo usa para producir óxido nítrico, clave para un flujo sanguíneo saludable." },
      { name: "Azafrán", text: "Un extracto tradicional usado para apoyar el estado de ánimo y el deseo." },
      { name: "Panax Ginseng", text: "Una raíz adaptógena usada tradicionalmente para apoyar la energía y la circulación." },
      { name: "Raíz de Maca", text: "Un superalimento andino asociado al apoyo de la libido y la vitalidad." },
      { name: "Ashwagandha", text: "Un adaptógeno que ayuda al cuerpo a manejar el estrés del día a día." },
      { name: "Shilajit", text: "Una resina mineral rica en ácido fúlvico y minerales traza." }
    ],

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
