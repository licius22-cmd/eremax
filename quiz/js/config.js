/* ============================================================
   EREMAX — CONFIGURACIÓN DEL QUIZ
   Todo lo que normalmente cambias está en este archivo.
   Las rutas de imágenes son relativas a la carpeta /quiz/.
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",
  productName: "Eremax",
  guaranteeDays: 60,

  // Número de prueba social (pasos 3 y 7). Usa solo un número comprobable.
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
      logo: "",  // ej. "images/logo.png"
      // Paso 1 — edad (20-29 → 70+)
      age: ["images/step1-1.webp", "images/step1-2.webp", "images/step1-3.webp",
            "images/step1-4.webp", "images/step1-5.webp", "images/step1-6.webp"],
      // Paso 2 — íconos (carpeta icons/)
      icons: ["images/icons/step2-1.png", "images/icons/step2-2.png", "images/icons/step2-3.png",
              "images/icons/step2-4.png", "images/icons/step2-5.png", "images/icons/step2-6.png"],
      // Paso 7 — prueba social
      proof: ["images/step7-1.webp", "images/step7-2.webp", "images/step7-3.webp", "images/step7-4.png"],
      // Paso 11 — motivacional
      transformation: "images/step11-1.webp",
      // Paso 14 — resumen
      profile: "images/step14-1.webp"
    }
  }
};
