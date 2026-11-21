/* ============================================================
   EREMAX QUIZ — CONFIG (versión en español)
   Todo lo que normalmente cambias está aquí.
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",
  productName: "Eremax",

  // Número de prueba social usado en los textos (pasos 3 y 7).
  customersCount: "[XX,XXX]",

  // Porcentaje del bloque "probabilidad de éxito" en el resumen (paso 14).
  successRate: "[XX]%",

  // A dónde envía el botón "Enviar" del último paso.
  // Por defecto: la página de oferta incluida. Cámbialo por tu página de producto/checkout.
  redirectUrl: "offer.html",

  // Pasa los parámetros UTM / click-id de la URL del quiz al redirect y a los checkouts.
  passQueryParams: true,

  // Contador de la barra Black Friday, por visitante (segundos). El original usa 2h.
  countdownSeconds: 7200,

  // IMÁGENES — pon tus archivos en la carpeta /images con estos nombres.
  // Mientras un archivo no exista, se muestra una ilustración incluida en su lugar.
  images: {
    logo: "",   // ej. "images/logo.png" — vacío = logo de texto
    // Paso 1 — tarjetas de edad (20-29 → 70+). PNG/WebP con fondo transparente.
    age: ["images/age-1.webp", "images/age-2.webp", "images/age-3.webp",
          "images/age-4.webp", "images/age-5.webp", "images/age-6.webp"],
    // Paso 2 — íconos de las 6 opciones (PNG/SVG/WebP, fondo transparente).
    icons: ["images/icons/icon-1.png", "images/icons/icon-2.png", "images/icons/icon-3.png",
            "images/icons/icon-4.png", "images/icons/icon-5.png", "images/icons/icon-6.png"],
    // Paso 7 — prueba social (4 fotos cuadradas).
    proof: ["images/proof-1.jpg", "images/proof-2.jpg", "images/proof-3.jpg", "images/proof-4.jpg"],
    // Paso 11 — imagen debajo del botón Continuar.
    transformation: "images/transformation.png",
    // Paso 14 — imagen dentro de la tarjeta "Nivel de salud sexual".
    profile: "images/profile.png"
  },

  // Paquetes de la página de oferta (offer.html) — cambia precios y links de checkout.
  packages: [
    { id: "1", label: "1 Frasco", supply: "Suministro de 30 días", price: 69, oldPrice: 99, perUnit: "$69 / frasco",
      shipping: "+ Envío", badge: "", bonuses: false, checkoutUrl: "https://example.com/checkout?pkg=1" },
    { id: "6", label: "6 Frascos", supply: "Suministro de 180 días", price: 294, oldPrice: 594, perUnit: "$49 / frasco",
      shipping: "ENVÍO GRATIS", badge: "MEJOR VALOR", bonuses: true, highlight: true, checkoutUrl: "https://example.com/checkout?pkg=6" },
    { id: "3", label: "3 Frascos", supply: "Suministro de 90 días", price: 177, oldPrice: 297, perUnit: "$59 / frasco",
      shipping: "ENVÍO GRATIS", badge: "MÁS POPULAR", bonuses: true, checkoutUrl: "https://example.com/checkout?pkg=3" }
  ],

  guaranteeDays: 60
};
