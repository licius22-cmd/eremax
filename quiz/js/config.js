/* ============================================================
   EREMAX — CONFIGURACIÓN DEL QUIZ
   Todo lo que normalmente cambias está en este archivo.
   Las imágenes del quiz están en /assets/images/quiz/ (rutas relativas a la carpeta /quiz/).
   ============================================================ */
window.EREMAX_CONFIG = {
  brand: "Eremax",
  productName: "Eremax",
  guaranteeDays: 60,

  // Número de prueba social (pasos 3 y 7). Usa solo un número comprobable.
  customersCount: "207,500",
  // Porcentaje del bloque "probabilidad de éxito" (quiz paso 14).
  successRate: "91%",

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
      age: ["../assets/images/quiz/step1-1.webp", "../assets/images/quiz/step1-2.webp", "../assets/images/quiz/step1-3.webp",
            "../assets/images/quiz/step1-4.webp", "../assets/images/quiz/step1-5.webp", "../assets/images/quiz/step1-6.webp"],
      // Paso 2 — íconos propios (vacío = se usan los íconos dibujados).
      // Para usar los tuyos: súbelos a assets/images/quiz/icons/ y pon aquí, por ejemplo,
      // "../assets/images/quiz/icons/step2-1.png", ... hasta step2-6.png
      icons: [],
      // Paso 7 — prueba social
      proof: ["../assets/images/quiz/step7-1.webp", "../assets/images/quiz/step7-2.webp", "../assets/images/quiz/step7-3.webp", "../assets/images/quiz/step7-4.png"],
      // Paso 11 — motivacional
      transformation: "../assets/images/quiz/step11-1.webp",
      // Paso 14 — resumen
      profile: "../assets/images/quiz/step14-1.webp"
    }
  }
};
