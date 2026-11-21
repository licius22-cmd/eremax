(function () {
  "use strict";
  var C = window.EREMAX_CONFIG, Q = C.quiz, A = window.EREMAX_ASSETS, I = A.icons;
  var host = document.getElementById("stepHost");
  var fill = document.getElementById("progressFill");
  var backBtn = document.getElementById("backBtn");

  /* ---------- logo ---------- */
  document.getElementById("logo").innerHTML = Q.images.logo
    ? '<img src="' + Q.images.logo + '" alt="' + C.brand + '">'
    : I.logo + '<span class="logo-word">' + C.brand + "</span>";

  /* ---------- pasos ---------- */
  var icon = function (n, svg) { return smartImg((Q.images.icons || [])[n], svg, ""); };
  var steps = [
    { id: "edad", kind: "age", title: "¿Cuál es tu edad?",
      options: ["20 - 29 años", "30 - 39 años", "40 - 49 años", "50 - 59 años", "60 - 69 años", "70+ años"] },

    { id: "frustracion", kind: "single", title: "¿Cuál ha sido tu mayor frustración en la cama últimamente?",
      options: [
        { t: "Terminar demasiado rápido", i: icon(0, I.stopwatch) },
        { t: "Problemas para tener una erección", i: icon(1, I.down) },
        { t: "Problemas para mantener la erección", i: icon(2, I.wave) },
        { t: "Poco deseo / libido baja", i: icon(3, I.gauge) },
        { t: "Una mezcla de todo esto", i: icon(4, I.grid) },
        { t: "Nada aún, pero quiero mantenerme en mi mejor nivel", i: icon(5, I.peak) }] },

    { id: "no-estas-solo", kind: "text", title: "No estás solo en esto.",
      text: function () {
        return "Más de " + C.customersCount + " hombres reportaron las mismas frustraciones antes de empezar a tomar " + C.productName +
          ". Es una rutina diaria sencilla, fabricada en una instalación con certificación GMP y respaldada por una garantía de devolución de " +
          C.guaranteeDays + " días.";
      } },

    { id: "ansiedad", kind: "single", title: "¿Sientes ansiedad o piensas demasiado antes o durante el sexo?",
      options: [{ t: "Sí" }, { t: "No" }] },

    { id: "desde-cuando", kind: "single", title: "¿Cuándo empezaste a notar cambios en tu vida sexual?",
      options: [{ t: "Hace más de un año" }, { t: "En el último año" }, { t: "En los últimos meses" }, { t: "No estoy seguro" }] },

    { id: "resultados", kind: "multi", title: "¿Qué resultados esperas ver?", sub: "Elige todas las que quieras.",
      options: [
        { t: "Durar más en la cama", i: "⏱️" }, { t: "Erecciones más fuertes y firmes", i: "💪" }, { t: "Más deseo sexual", i: "🔥" },
        { t: "Más energía y resistencia", i: "⚡" }, { t: "Volver a sentirme seguro", i: "😎" }, { t: "Todo lo anterior", i: "🚀", all: true }] },

    { id: "prueba-social", kind: "proof",
      title: function () { return "Más de " + C.customersCount + " hombres están recuperando su confianza en la cama"; },
      sub: "Y la mayoría notó la diferencia en las primeras semanas." },

    { id: "relacion", kind: "single", title: "¿Cuál es tu situación sentimental?",
      options: [{ t: "Soltero o saliendo con alguien" }, { t: "En una relación" }, { t: "Casado" }] },

    { id: "vida-sexual", kind: "single", title: "¿Cómo describirías tu vida sexual ahora mismo?",
      options: [{ t: "Prácticamente se detuvo" }, { t: "Menos de lo que me gustaría" }, { t: "Está bien, pero no genial" }, { t: "Estoy satisfecho" }] },

    { id: "intentado", kind: "single", title: "¿Qué has intentado para solucionar este problema?",
      whyLabel: "Por qué la mayoría de las soluciones fallan",
      why: "La mayoría de las opciones fuerzan un resultado temporal que desaparece en horas, usan dosis débiles o solo atacan una parte del problema. Por eso tantos hombres siguen probando cosas distintas sin resolver nunca lo que realmente está pasando.",
      options: [{ t: "Pastillas con receta" }, { t: "Cambios en el estilo de vida" }, { t: "Dejar la pornografía o la masturbación" }, { t: "Nada todavía" }, { t: "Otro" }] },

    { id: "motivacional", kind: "motivational",
      title: "No tienes que aceptar erecciones débiles ni un deseo sexual que se apagó.",
      text: "Según tus respuestas, estamos armando un plan para apoyar tu flujo sanguíneo y ayudarte a rendir como antes. Un cambio sencillo, y ella será la primera en notarlo." },

    { id: "matutinas", kind: "single", title: "¿Has notado una disminución en tus erecciones matutinas?",
      why: "Las erecciones matutinas son una de las señales más claras de qué tan bien está funcionando tu circulación.",
      options: [{ t: "Sí" }, { t: "No" }, { t: "No estoy seguro" }] },

    { id: "estres", kind: "single", title: "¿Con qué frecuencia sueles sentir estrés?",
      why: "El estrés contrae los vasos sanguíneos y reduce el flujo de sangre, por eso es una parte importante de tu perfil.",
      options: [{ t: "A veces" }, { t: "Todo el tiempo" }, { t: "Rara vez" }, { t: "No estoy seguro" }] },

    { id: "resumen", kind: "summary" },
    { id: "plan", kind: "chart" },
    { id: "final", kind: "loading" }
  ];

  var answers = {}, history = [], idx = 0;

  /* ---------- helpers ---------- */
  function val(v) { return typeof v === "function" ? v() : v; }
  function track(name, data) {
    data = data || {};
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, data)); } catch (e) {}
    try { if (window.fbq) window.fbq("trackCustom", name, data); } catch (e) {}
  }
  function withParams(url) {
    if (!C.passQueryParams || !location.search) return url;
    try {
      var u = new URL(url, location.href);
      new URLSearchParams(location.search).forEach(function (v, k) { if (k !== "step" && !u.searchParams.has(k)) u.searchParams.set(k, v); });
      return u.toString();
    } catch (e) { return url; }
  }
  // Muestra la ilustración incluida y la reemplaza por tu imagen si el archivo existe.
  function smartImg(src, fallback, alt) {
    return '<span class="smart-img" data-src="' + (src || "") + '" data-alt="' + (alt || "") + '">' + fallback + "</span>";
  }
  function hydrateImages(root) {
    root.querySelectorAll(".smart-img[data-src]").forEach(function (box) {
      var src = box.getAttribute("data-src");
      if (!src) return;
      var img = new Image();
      img.onload = function () { box.innerHTML = ""; img.alt = box.getAttribute("data-alt"); box.appendChild(img); box.classList.add("is-photo"); };
      img.src = src;
    });
  }

  /* ---------- navegación ---------- */
  function go(n) { history.push(idx); idx = n; render(); }
  function next() {
    var cur = host.firstChild;
    if (cur && cur.dataset.leaving) return;
    if (cur) cur.dataset.leaving = "1";
    go(idx + 1);
  }
  backBtn.addEventListener("click", function () { if (history.length) { idx = history.pop(); render(); } });

  function render() {
    var st = steps[idx];
    fill.style.width = Math.max(6, Math.round(((idx + 1) / steps.length) * 100)) + "%";
    backBtn.classList.toggle("show", idx > 0 && st.kind !== "loading");
    var el = document.createElement("div");
    el.className = "step";
    host.innerHTML = "";
    host.appendChild(el);
    R[st.kind](st, el);
    hydrateImages(el);
    window.scrollTo(0, 0);
    try { var u = new URL(location.href); u.searchParams.set("step", idx + 1); window.history.replaceState(null, "", u); } catch (e) {}
    track("quiz_step_view", { quiz_step: idx + 1, quiz_step_id: st.id });
  }

  function heading(t, sub) {
    return '<h2 class="step-heading">' + val(t) + "</h2>" + (sub ? '<p class="step-subtext">' + sub + "</p>" : '<div class="spacer"></div>');
  }
  function whyBox(st) {
    return st.why ? '<div class="why-box"><div class="why-box-label">' + (st.whyLabel || "Por qué preguntamos") +
      '</div><div class="why-box-text">' + st.why + "</div></div>" : "";
  }
  function answer(st, i, label) {
    answers[st.id] = i;
    track("quiz_answer", { quiz_step_id: st.id, answer: label });
  }
  function continueBtn(extra) { return '<button class="continue-btn visible"' + (extra || "") + ">Continuar</button>"; }

  /* ---------- pantallas ---------- */
  var R = {
    age: function (st, el) {
      el.innerHTML = heading(st.title) + '<div class="age-grid">' + st.options.map(function (t, i) {
        return '<button class="age-card' + (answers[st.id] === i ? " selected" : "") + '" data-i="' + i + '"><span class="age-img">' +
          smartImg(Q.images.age[i], A.portrait(i), t) + '</span><div class="age-card-label">' + t + "</div></button>";
      }).join("") + "</div>";
      el.querySelectorAll(".age-card").forEach(function (b) {
        b.addEventListener("click", function () {
          if (el.dataset.locked) return; el.dataset.locked = "1";
          el.querySelectorAll(".age-card").forEach(function (x) { x.classList.remove("selected"); });
          b.classList.add("selected");
          answer(st, +b.dataset.i, st.options[b.dataset.i]);
          setTimeout(next, 350);
        });
      });
    },

    single: function (st, el) {
      el.innerHTML = heading(st.title) + '<div class="options-list">' + st.options.map(function (o, i) {
        return '<button class="option-item' + (answers[st.id] === i ? " selected" : "") + '" data-i="' + i + '">' +
          (o.i ? '<span class="ico">' + o.i + "</span>" : "") + "<span>" + o.t + "</span></button>";
      }).join("") + "</div>" + whyBox(st);
      el.querySelectorAll(".option-item").forEach(function (b) {
        b.addEventListener("click", function () {
          if (el.dataset.locked) return; el.dataset.locked = "1";
          el.querySelectorAll(".option-item").forEach(function (x) { x.classList.remove("selected"); });
          b.classList.add("selected");
          answer(st, +b.dataset.i, st.options[b.dataset.i].t);
          setTimeout(next, 350);
        });
      });
    },

    multi: function (st, el) {
      var sel = (answers[st.id] || []).slice();
      el.innerHTML = '<h2 class="step-heading">' + st.title + '</h2><p class="step-subtext">' + st.sub + "</p>" +
        '<div class="options-list">' + st.options.map(function (o, i) {
          return '<button class="option-item" data-i="' + i + '"><span class="ico">' + o.i + "</span><span>" + o.t + "</span></button>";
        }).join("") + '</div><button class="continue-btn">Continuar</button>';
      var items = el.querySelectorAll(".option-item"), btn = el.querySelector(".continue-btn");
      var allIdx = st.options.findIndex(function (o) { return o.all; });
      function paint() {
        items.forEach(function (b, i) { b.classList.toggle("selected", sel.indexOf(i) > -1); });
        btn.classList.toggle("visible", sel.length > 0);
      }
      items.forEach(function (b, i) {
        b.addEventListener("click", function () {
          if (i === allIdx) sel = sel.indexOf(i) > -1 ? [] : st.options.map(function (_, k) { return k; });
          else {
            var p = sel.indexOf(i); if (p > -1) sel.splice(p, 1); else sel.push(i);
            var full = st.options.every(function (o, k) { return k === allIdx || sel.indexOf(k) > -1; });
            var a = sel.indexOf(allIdx);
            if (full && a < 0) sel.push(allIdx); if (!full && a > -1) sel.splice(a, 1);
          }
          paint();
        });
      });
      btn.addEventListener("click", function () {
        answers[st.id] = sel;
        track("quiz_answer", { quiz_step_id: st.id, answer: sel.map(function (k) { return st.options[k].t; }).join("|") });
        next();
      });
      paint();
    },

    text: function (st, el) {
      el.innerHTML = '<h2 class="step-heading">' + st.title + '</h2><div class="options-list"><p class="step-subtext">' + val(st.text) +
        "</p></div>" + continueBtn();
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    proof: function (st, el) {
      el.innerHTML = '<div class="social-proof-section"><h2 class="social-proof-heading">' + val(st.title) + '</h2><p class="social-proof-sub">' + st.sub +
        '</p><div class="social-proof-wrapper">' + Q.images.proof.map(function (src, i) {
          return '<div class="social-proof-img">' + smartImg(src, A.placeholder(String(src || "").split("/").pop() || ("step7-" + (i + 1)), i), "Cliente") + "</div>";
        }).join("") + "</div></div>" + continueBtn();
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    motivational: function (st, el) {
      el.innerHTML = '<div class="motivational-section"><h2 class="motivational-heading">' + st.title + '</h2><p class="motivational-text">' + st.text +
        "</p>" + continueBtn() + '<div class="motivational-img">' +
        smartImg(Q.images.transformation, A.transformation(), "Transformación") + "</div></div>";
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    summary: function (st, el) {
      el.innerHTML = heading("Resumen de tu perfil de rendimiento sexual") +
        '<div class="summary-card"><div class="summary-card-header"><span class="summary-card-title">Nivel de salud sexual</span>' +
        '<span class="summary-badge">Bajo</span></div>' +
        '<div class="summary-person-img">' + smartImg(Q.images.profile, A.portrait(answers.edad != null ? answers.edad : 2), "Perfil") + "</div>" +
        '<div style="text-align:left"><span class="your-level-label">Tu nivel</span></div>' +
        '<div class="gradient-bar-container"><div class="gradient-bar"><div class="gradient-slider"></div></div>' +
        '<div class="gradient-labels"><span>Bajo</span><span>Normal</span><span>Medio</span><span>Alto</span></div></div></div>' +
        '<div class="summary-alert"><div class="summary-alert-icon">!</div><div>' +
        '<div class="summary-alert-title">Nivel bajo</div><div class="summary-alert-text">Tus respuestas indican que tu cuerpo no está rindiendo al nivel que debería. ' +
        "Esto es más común de lo que la mayoría de los hombres cree y, sin el apoyo adecuado, suele empeorar con el tiempo.</div></div></div>" +
        '<div class="summary-metrics">' +
        '<div class="metric-card">' + I.pulse.replace("<svg", '<svg class="metric-icon"') +
        '<div><div class="metric-label">Margen de mejora</div><div class="metric-value">Alto</div></div></div>' +
        '<div class="metric-card trigger">' + I.bolt.replace("<svg", '<svg class="metric-icon"') +
        '<div><div class="metric-label">' + C.successRate + ' de probabilidad de éxito</div><div class="metric-value">Los hombres con perfiles similares reportan mejoras reales y notables en las primeras 2-3 semanas.</div></div></div>' +
        '<div class="metric-card trigger"><div><div class="metric-label">Siguiente paso</div><div class="metric-value">Según tus respuestas, preparamos una recomendación personalizada. Haz clic abajo para ver lo que te sugerimos y obtener tu descuento exclusivo.</div></div></div>' +
        "</div>" + continueBtn(' style="margin-top:20px"');
      el.querySelector(".continue-btn").addEventListener("click", next);
      track("quiz_complete", {});
    },

    chart: function (st, el) {
      var labels = ["Semana 1-2", "Semana 3-4", "Semana 5-7", "Semana 8-9", "Semana 10-12"], h = [30, 45, 60, 78, 95];
      el.innerHTML = heading("El último plan que necesitarás para recuperar tu deseo y tu rendimiento.") +
        '<div class="chart-section"><div class="chart-container"><div class="chart-bars">' + labels.map(function (l, i) {
          return '<div class="chart-bar-wrapper"><div class="chart-bar b' + (i + 1) + '" data-h="' + h[i] + '">' +
            (i === 3 ? '<div class="goal-badge">Meta</div><div class="goal-check">✓</div>' : "") +
            '</div><div class="chart-bar-label">' + l + "</div></div>";
        }).join("") + '</div></div><p class="chart-result-text">Según tus respuestas, tu plan está diseñado para apoyar tu energía, tu deseo y tu rendimiento en la cama durante los próximos 63 días.</p></div>' +
        continueBtn(' style="margin-top:20px"');
      setTimeout(function () { el.querySelectorAll(".chart-bar").forEach(function (b) { b.style.height = b.dataset.h + "%"; }); }, 80);
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    loading: function (st, el) {
      var names = ["Objetivo", "Ajuste personalizado", "Esenciales seleccionados"];
      var questions = [
        "¿Estás listo para retomar el control de tu rendimiento?",
        "¿Sabías que la mala circulación sanguínea es la causa #1 del deterioro del rendimiento sexual en los hombres?",
        "¿Probarías una solución sencilla que toma menos de 30 segundos al día?"
      ];
      el.innerHTML = '<div class="loading-section"><h2 class="loading-heading">Creando tu plan personalizado…</h2><div class="loading-steps">' +
        names.map(function (n, i) {
          return '<div class="loading-step-item" id="ls' + i + '"><div class="loading-step-header"><span class="loading-step-name">' + n +
            '</span><span class="loading-step-status" id="lst' + i + '"></span></div><div class="loading-item-bar-container"><div class="loading-item-bar-fill" id="lb' + i + '"></div></div></div>';
        }).join("") + '</div><button class="continue-btn" id="submitBtn" style="margin-top:24px">Enviar</button></div>';

      var overlay = document.getElementById("modalOverlay"), mText = document.getElementById("modalText");
      var btns = overlay.querySelectorAll(".modal-btn");
      function phase(p) {
        if (p >= 3) { el.querySelector("#submitBtn").classList.add("visible"); return; }
        el.querySelector("#ls" + p).classList.add("visible");
        setTimeout(function () { el.querySelector("#lb" + p).style.width = "50%"; el.querySelector("#lst" + p).textContent = "50%"; }, 100);
        setTimeout(function () {
          mText.textContent = questions[p];
          overlay.classList.add("active");
          var answered = false;
          btns.forEach(function (b) {
            b.onclick = function () {
              if (answered) return; answered = true;
              overlay.classList.remove("active");
              track("quiz_answer", { quiz_step_id: "final-q" + (p + 1), answer: b.dataset.answer });
              setTimeout(function () { el.querySelector("#lb" + p).style.width = "100%"; el.querySelector("#lst" + p).textContent = "100%"; }, 100);
              setTimeout(function () {
                el.querySelector("#lst" + p).innerHTML = '<span class="loading-step-check">&#10003;</span>';
                setTimeout(function () { phase(p + 1); }, 400);
              }, 1400);
            };
          });
        }, 1500);
      }
      phase(0);
      el.querySelector("#submitBtn").addEventListener("click", function () {
        if (this.dataset.sent) return; this.dataset.sent = "1";
        track("quiz_submit", {});
        window.location.href = withParams(Q.redirectUrl);
      });
    }
  };

  /* ---------- cuenta regresiva (por visitante, 2h como el original) ---------- */
  (function () {
    var key = "eremax_cd_end", end;
    try { end = +localStorage.getItem(key); } catch (e) {}
    if (!end || end < Date.now()) { end = Date.now() + C.countdownSeconds * 1000; try { localStorage.setItem(key, end); } catch (e) {} }
    var h = document.getElementById("cd-h"), m = document.getElementById("cd-m"), s = document.getElementById("cd-s");
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var t = Math.max(0, Math.floor((end - Date.now()) / 1000));
      h.textContent = pad(Math.floor(t / 3600)); m.textContent = pad(Math.floor(t % 3600 / 60)); s.textContent = pad(t % 60);
    }
    tick(); setInterval(tick, 1000);
  })();

  /* ---------- precarga de imágenes ---------- */
  var preloaded = [];
  [].concat(Q.images.age || [], Q.images.icons || [], Q.images.proof || [], Q.images.transformation || [], Q.images.profile || [])
    .forEach(function (src) { if (src) { var im = new Image(); im.src = src; preloaded.push(im); } });

  render();
})();
