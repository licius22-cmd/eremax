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
    // Título grande bajo la galería (titular, no solo el nombre del producto).
    productTitle: "LA MEJORA QUE TU VIDA ÍNTIMA ESTABA ESPERANDO",
    productSubtitle: "La fórmula natural más completa para un rendimiento más firme, un deseo que no se apaga y la resistencia para toda la noche.",

    // Valoración bajo el título. Pon show:false si aún no tienes reseñas reales.
    rating: { show: true, score: "[X.X]" },
    // Etiqueta redondeada bajo la valoración (null = no aparece). Usa solo afirmaciones comprobables.
    formulaBadge: { label: "NUEVA FÓRMULA:", text: "una gomita al día, todos los días" },

    // Imágenes de la galería (la primera es la principal).
    gallery: ["images/1..png", "images/2.jpg", "images/3..png", "images/4.png",
              "images/5.png", "images/6.png", "images/7.png", "images/9.png"],
    supplementFacts: "images/supplement-facts.png",

    // icon: flame | drop | heart | bolt | up | clock | crown
    benefits: [
      { icon: "drop", title: "Un rendimiento más firme que ella nota", text: "" },
      { icon: "flame", title: "Un deseo que no se apaga", text: "" },
      { icon: "heart", title: "Ella termina. Tú sigues.", text: "" },
      { icon: "bolt", title: "Absorción rápida", text: "Se disuelve en la boca y empieza a actuar en minutos, en lugar de quedarse horas en el estómago." }
    ],

    // Paquetes. El que tiene selected:true aparece marcado al entrar.
    // id = cantidad de potes. compareAt = precio tachado (déjalo en null para no mostrarlo).
    // gift = franja que aparece dentro del paquete seleccionado (null = sin franja).
    bundles: [
      { id: "1", title: "1 Pote", sub: "1 pote de Eremax", price: 39.90, compareAt: null, badge: "", selected: true,
        image: "images/eremax-1.png", checkoutUrl: "https://example.com/checkout?pkg=1", gift: null },
      { id: "2", title: "2 Potes", sub: "2 potes de Eremax", price: 69.90, compareAt: null, badge: "MÁS POPULAR",
        image: "images/eremax-2.png", checkoutUrl: "https://example.com/checkout?pkg=2", gift: null },
      { id: "3", title: "3 Potes", sub: "3 potes de Eremax + Envío gratis", price: 89.99, compareAt: null, badge: "MEJOR VALOR",
        image: "images/eremax-3.png", checkoutUrl: "https://example.com/checkout?pkg=3",
        gift: { title: "ENVÍO GRATIS", text: "" } }
    ],

    // Cuadro "REGALOS DESBLOQUEADOS". unlock = cantidad de potes que lo desbloquea.
    // Déjalo vacío ([]) si no ofreces regalos.
    giftsTitle: "REGALOS DESBLOQUEADOS",
    gifts: [],
    // Ventajas con check bajo el botón de compra ([] = no aparece).
    perks: ["Envío con seguimiento", "Garantía de 60 días"],
    currency: "$",
    decimalSep: ",",     // separador decimal de los precios: "," → $39,90 · "." → $39.90
    deliveryDays: 4,     // "Llega entre el ... y el ..." (días a partir de hoy)
    deliveryDaysMax: 9,

    // Solo si vendes por suscripción. Déjalo vacío ("") si es compra única.
    subscriptionNote: "",

    // Especialistas REALES que aprobaron tu producto (con autorización). El primero aparece también
    // en la pestaña "Aprobado por especialista". Vacío ([]) = la sección y la pestaña no aparecen.
    experts: [
      { name: "[Nombre del especialista], M.D.", title: "[Especialidad]", quote: "[Cita autorizada del especialista sobre tu producto]", photo: "images/expert-1.jpg" },
      { name: "[Nombre del especialista 2]", title: "[Especialidad]", quote: "[Cita autorizada del especialista sobre tu producto]", photo: "images/expert-2.jpg" },
      { name: "[Nombre del especialista 3]", title: "[Especialidad]", quote: "[Cita autorizada del especialista sobre tu producto]", photo: "images/expert-3.jpg" }
    ],

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
    // null = la sección no aparece.
    survey: {
      title: "LO QUE NOS DIJERON LOS HOMBRES EN NUESTRA ENCUESTA",
      sub: "Combinamos ingredientes tradicionales con investigación moderna para ayudarte a rendir mejor y sentirte imparable.",
      items: [
        { pct: "[XX]%", text: "[Resultado real de tu encuesta]" },
        { pct: "[XX]%", text: "[Resultado real de tu encuesta]" },
        { pct: "[XX]%", text: "[Resultado real de tu encuesta]" }
      ],
      note: "*Según respuestas de [X] clientes.",
      image: "images/survey-product.webp"
    },

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

    // Pop-up "Toca para soltar" (juego de premio). code = cupón que ya existe en tu checkout;
    // se añade a los links de compra como ?{couponParam}=CÓDIGO. enabled:false = desactivado.
    popup: {
      enabled: true,
      showAfterScroll: 700,     // píxeles de scroll antes de aparecer
      showAfterSeconds: 0,      // o segundos (0 = solo por scroll)
      kicker: "OFERTA BLACK FRIDAY",
      title: "TOCA PARA SOLTAR",
      button: "PRUEBA TU SUERTE",
      claim: "USAR MI PREMIO",
      couponParam: "discount",
      prizes: [
        { label: "Regalo gratis", code: "[CODIGO1]", weight: 1 },
        { label: "5% off", code: "[CODIGO2]", weight: 1 },
        { label: "Envío gratis", code: "[CODIGO3]", weight: 1 },
        { label: "$10 off", code: "[CODIGO4]", weight: 1 },
        { label: "10% off", code: "[CODIGO5]", weight: 1 }
      ]
    },

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
