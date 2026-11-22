(function () {
  "use strict";
  var C = window.EREMAX_CONFIG, O = C.oferta, A = window.EREMAX_ASSETS;
  var $ = function (id) { return document.getElementById(id); };
  var money = function (n) { return O.currency + Number(n).toFixed(2).replace(/\.00$/, ""); };

  function track(name, data) {
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, data || {})); } catch (e) {}
  }
  function withParams(url) {
    if (!C.passQueryParams || !location.search) return url;
    try {
      var u = new URL(url, location.href);
      new URLSearchParams(location.search).forEach(function (v, k) { if (k !== "step" && !u.searchParams.has(k)) u.searchParams.set(k, v); });
      return u.toString();
    } catch (e) { return url; }
  }
  // Muestra la ilustración y la reemplaza por tu imagen si el archivo existe.
  function smartImg(src, fallback, alt) {
    return '<span class="smart-img" data-src="' + (src || "") + '" data-alt="' + (alt || "") + '">' + fallback + "</span>";
  }
  function hydrate(root) {
    (root || document).querySelectorAll(".smart-img[data-src]").forEach(function (box) {
      var src = box.getAttribute("data-src");
      if (!src || box.dataset.done) return;
      box.dataset.done = 1;
      var img = new Image();
      img.onload = function () { box.innerHTML = ""; img.alt = box.getAttribute("data-alt"); box.appendChild(img); };
      img.src = src;
    });
  }

  /* ---------- marca ---------- */
  var logoHtml = A.icons.logo + '<span class="logo-word">' + C.brand + "</span>";
  $("logo").innerHTML = O.logo ? '<img src="' + O.logo + '" alt="' + C.brand + '">' : logoHtml;
  $("footLogo").innerHTML = logoHtml;
  document.querySelectorAll(".brand").forEach(function (e) { e.textContent = C.brand; });
  $("brandUpper").textContent = C.brand.toUpperCase();
  document.querySelectorAll(".brandUp").forEach(function (e) { e.textContent = C.brand.toUpperCase(); });
  var GL = A.glyphs;
  function gCircle(name, cls) { return '<span class="g-circle' + (cls ? " " + cls : "") + '">' + (GL[name] || GL.bolt) + "</span>"; }
  document.querySelectorAll("[data-glyph]").forEach(function (e) { e.innerHTML = GL[e.dataset.glyph] || ""; });
  document.querySelectorAll(".gdays").forEach(function (e) { e.textContent = C.guaranteeDays; });
  $("gDays").textContent = C.guaranteeDays;
  $("year").textContent = new Date().getFullYear();

  /* ---------- menú ---------- */
  $("menuBtn").onclick = function () { $("sideMenu").classList.add("open"); };
  $("menuClose").onclick = function () { $("sideMenu").classList.remove("open"); };
  $("sideMenu").querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { $("sideMenu").classList.remove("open"); }); });
  $("cartBtn").onclick = function () { $("bundles").scrollIntoView({ behavior: "smooth" }); };

  /* ---------- valoración ---------- */
  if (O.rating && O.rating.show) {
    $("ratingPill").innerHTML = '<span class="stars">★★★★★</span> Calificación ' + O.rating.score + "/5 por " + C.customersCount + "+";
  } else { $("ratingPill").remove(); }

  /* ---------- galería ---------- */
  var gi = 0;
  function showSlide(i) {
    gi = (i + O.gallery.length) % O.gallery.length;
    $("galleryMain").innerHTML = smartImg(O.gallery[gi], A.pouch(C.brand, gi), O.productTitle);
    hydrate($("galleryMain"));
    $("thumbs").querySelectorAll(".thumb").forEach(function (t, k) { t.classList.toggle("on", k === gi); });
  }
  $("thumbs").innerHTML = O.gallery.map(function (src, i) {
    return '<button class="thumb" data-i="' + i + '">' + smartImg(src, A.pouch(C.brand, i), "") + "</button>";
  }).join("");
  $("thumbs").querySelectorAll(".thumb").forEach(function (t) { t.onclick = function () { showSlide(+t.dataset.i); }; });
  $("gPrev").onclick = function () { showSlide(gi - 1); };
  $("gNext").onclick = function () { showSlide(gi + 1); };
  (function swipe() {
    var x0 = null, el = $("galleryMain");
    el.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    el.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) showSlide(gi + (dx < 0 ? 1 : -1)); x0 = null;
    });
  })();
  showSlide(0);

  /* ---------- info ---------- */
  $("pTitle").textContent = O.productTitle;
  $("pSub").textContent = O.productSubtitle;
  $("benefits").innerHTML = O.benefits.map(function (b) {
    return "<li>" + gCircle(b.icon) + "<div><b>" + b.title + "</b>" + (b.text ? "<p>" + b.text + "</p>" : "") + "</div></li>";
  }).join("");

  $("factsBtn").onclick = function () {
    $("factsImg").innerHTML = smartImg(O.supplementFacts, A.placeholder("oferta/supplement-facts.png", 0), "Información nutricional");
    hydrate($("factsImg"));
    $("factsModal").classList.add("open");
  };
  $("factsClose").onclick = function () { $("factsModal").classList.remove("open"); };
  $("factsModal").onclick = function (e) { if (e.target === this) this.classList.remove("open"); };

  /* ---------- paquetes ---------- */
  var current = O.bundles.find(function (b) { return b.selected; }) || O.bundles[0];
  function paintBundles() {
    $("bundleList").innerHTML = O.bundles.map(function (b) {
      var on = b === current;
      return '<label class="bundle' + (on ? " on" : "") + '" data-id="' + b.id + '">' +
        (b.badge ? '<span class="b-badge">' + b.badge + "</span>" : "") +
        '<span class="radio"></span>' +
        '<span class="b-img">' + smartImg(b.image, A.pouch(C.brand, 0), "") + "</span>" +
        '<span class="b-txt"><b>' + b.title + "</b><small>" + b.sub + "</small></span>" +
        '<span class="b-price"><b>' + money(b.price) + "</b><s>" + money(b.compareAt) + "</s></span></label>";
    }).join("");
    $("bundleList").querySelectorAll(".bundle").forEach(function (el) {
      el.onclick = function () {
        current = O.bundles.find(function (b) { return b.id === el.dataset.id; });
        paintBundles(); track("bundle_select", { pkg: current.id });
      };
    });
    hydrate($("bundleList"));
    var url = withParams(current.checkoutUrl);
    $("atcBtn").href = url; $("stickyBtn").href = url;
    $("atcPrice").textContent = money(current.price);
    $("atcCompare").textContent = money(current.compareAt);

  }
  paintBundles();
  [$("atcBtn"), $("stickyBtn")].forEach(function (b) {
    b.addEventListener("click", function () {
      track("checkout_click", { pkg: current.id });
      try { if (window.fbq) window.fbq("track", "InitiateCheckout", { value: current.price, currency: "USD" }); } catch (e) {}
    });
  });

  var d = new Date(); d.setDate(d.getDate() + (O.deliveryDays || 4));
  var dStr = d.toLocaleDateString("es", { day: "numeric", month: "long" });
  $("deliveryDate").textContent = dStr;
  if (O.subscriptionNote) $("subNote").textContent = O.subscriptionNote; else $("subNote").remove();

  /* ---------- pestañas ---------- */
  var tabs = [];
  if (O.expert) tabs.push(["Opinión experta", '<blockquote>"' + O.expert.quote + '"</blockquote><p class="ex-name"><b>' + O.expert.name + "</b><br>" + O.expert.title + "</p>"]);
  tabs.push(["Detalles del producto", "<p>" + O.productSubtitle + "</p><ul><li>Una gomita al día</li><li>" + C.guaranteeDays + " días de garantía de devolución</li><li>Sin receta médica</li></ul>"]);
  tabs.push(["Tabla comparativa",
    '<table class="cmp"><tr><th></th><th>' + C.brand + "</th><th>Pastillas con receta</th><th>Otros</th></tr>" +
    [["Ingredientes naturales", 1, 0, "?"], ["Sin receta médica", 1, 0, 1], ["Rutina diaria, sin calcular la hora", 1, 0, "?"],
     ["Varios ingredientes en una sola gomita", 1, 0, 0], ["Garantía de devolución de " + C.guaranteeDays + " días", 1, 0, 0]]
      .map(function (r) {
        var c = function (v) { return v === 1 ? '<td class="y">✓</td>' : v === 0 ? '<td class="n">✕</td>' : '<td class="m">–</td>'; };
        return "<tr><td>" + r[0] + "</td>" + c(r[1]) + c(r[2]) + c(r[3]) + "</tr>";
      }).join("") + "</table>"]);
  tabs.push(["Ingredientes", "<ul>" + O.ingredients.map(function (x) { return "<li><b>" + x.name + "</b></li>"; }).join("") + "</ul>"]);
  tabs.push(["Preguntas", '<p>Encuentra las respuestas más comunes en <a href="#faq">Preguntas frecuentes</a>.</p>']);
  $("tabs").innerHTML = tabs.map(function (t, i) { return '<button class="tab' + (i ? "" : " on") + '" data-i="' + i + '">' + t[0] + "</button>"; }).join("");
  function showTab(i) {
    $("tabs").querySelectorAll(".tab").forEach(function (t, k) { t.classList.toggle("on", k === i); });
    $("tabPanel").innerHTML = tabs[i][1];
  }
  $("tabs").querySelectorAll(".tab").forEach(function (t) { t.onclick = function () { showTab(+t.dataset.i); }; });
  showTab(0);

  /* ---------- experto ---------- */
  if (O.expert) {
    var es = $("expertSection"); es.hidden = false;
    es.innerHTML = '<h2 class="sec-title">RECOMENDADO POR ESPECIALISTAS</h2><div class="expert-card">' +
      (O.expert.photo ? '<span class="ex-photo">' + smartImg(O.expert.photo, "", O.expert.name) + "</span>" : "") +
      "<div><b>" + O.expert.name + "</b><small>" + O.expert.title + '</small><p>"' + O.expert.quote + '"</p></div></div>';
    hydrate(es);
  }

  /* ---------- por qué ---------- */
  $("whyList").innerHTML = (O.why || []).map(function (w) {
    return '<div class="why-card">' + gCircle(w.icon, "lg") + "<div><h4>" + w.title + "</h4><p>" + w.text + "</p></div></div>";
  }).join("");

  /* ---------- encuesta (opcional) ---------- */
  if (O.survey && O.survey.items && O.survey.items.length) {
    var sv = $("surveySection"); sv.hidden = false;
    sv.innerHTML = '<h2 class="sec-title light">LO QUE NOS DIJERON LOS HOMBRES EN NUESTRA ENCUESTA</h2><div class="sv-list">' +
      O.survey.items.map(function (x) { return '<div class="sv-item"><b>' + x.pct + "</b><span>" + x.text + "</span></div>"; }).join("") +
      '</div><p class="sv-note">' + (O.survey.note || "") + "</p>";
  }

  /* ---------- para ti si ---------- */
  $("forList").querySelectorAll("li").forEach(function (li) { li.insertAdjacentHTML("afterbegin", gCircle("check", "sm")); });
  if (O.rightForYouImage) {
    $("forImg").innerHTML = smartImg(O.rightForYouImage, A.placeholder("oferta/right-for-you.webp", 1), "");
  } else { $("forImg").remove(); }

  /* ---------- ingredientes ---------- */
  $("ingGrid").innerHTML = O.ingredients.map(function (x, i) {
    return '<div class="ing slide"><span class="ing-img">' + smartImg((x.image || "images/ingredient-" + (i + 1) + ".png"), A.ingredient(x.name, i), x.name) +
      "</span><h4>" + x.name + "</h4><p>" + x.text + "</p></div>";
  }).join("");
  $("trustBadges").innerHTML = O.badges.map(function (b) { return '<span class="tb"><i>✓</i> ' + b + "</span>"; }).join("");

  /* ---------- reseñas ---------- */
  $("reviewsTitle").textContent = "MIRA CÓMO MÁS DE " + C.customersCount + " HOMBRES RECUPERARON SU CONFIANZA";
  var reviews = O.reviews && O.reviews.length ? O.reviews : [1, 2, 3, 4].map(function (n) {
    return { name: "[Nombre del cliente]", title: "[Título de la reseña " + n + "]", text: "[Pega aquí una reseña real de un cliente verificado — config.js → oferta.reviews]", placeholder: true };
  });
  $("reviews").innerHTML = reviews.map(function (r, i) {
    return '<div class="review slide' + (r.placeholder ? " ph" : "") + '">' +
      '<span class="rv-photo">' + smartImg(r.photo || "", A.placeholder("oferta/review-" + (i + 1) + ".jpg", i), r.name) + "</span>" +
      '<div class="rv-body"><div class="rv-head"><b>' + r.name.toUpperCase() + '</b><span class="rv-verified"><i>✓</i> Cliente verificado</span></div>' +
      '<div class="rv-stars">★★★★★</div><span class="rv-tag">' + r.title + "</span><p>" + r.text + "</p></div></div>";
  }).join("");

  /* ---------- carruseles ---------- */
  document.querySelectorAll(".c-nav").forEach(function (nav) {
    var car = $(nav.dataset.for);
    function step(dir) { var sl = car.querySelector(".slide"); car.scrollBy({ left: dir * (sl ? sl.offsetWidth + 14 : 300), behavior: "smooth" }); }
    nav.querySelector(".prev").onclick = function () { step(-1); };
    nav.querySelector(".next").onclick = function () { step(1); };
  });

  /* ---------- pie ---------- */
  var co = O.company;
  $("companyBox").innerHTML = "<h5>Contacto</h5><p><small>Razón social</small>" + co.legalName + "</p><p><small>Número de empresa</small>" + co.number +
    "</p><p><small>Dirección</small>" + co.address + "</p><p><small>Teléfono</small>" + co.phone +
    '</p><p><small>E-mail</small><a href="mailto:' + co.email + '">' + co.email + "</a></p>";
  $("mailLink").href = "mailto:" + co.email;

  /* ---------- barra fija ---------- */
  var photos = (O.reviews || []).filter(function (r) { return r.photo; }).slice(0, 3);
  $("avatars").innerHTML = photos.map(function (r) { return '<img src="' + r.photo + '" alt="">'; }).join("");
  if (!photos.length) $("avatars").remove();
  $("joinText").textContent = "ÚNETE A MÁS DE " + C.customersCount + " CLIENTES FELICES";
  var sticky = $("stickyAtc");
  window.addEventListener("scroll", function () {
    var r = $("atcBtn").getBoundingClientRect();
    sticky.classList.toggle("show", r.bottom < 0);
  }, { passive: true });

  hydrate();

  /* ---------- cuenta regresiva ---------- */
  (function () {
    var key = "eremax_cd_end", end;
    try { end = +localStorage.getItem(key); } catch (e) {}
    if (!end || end < Date.now()) { end = Date.now() + C.countdownSeconds * 1000; try { localStorage.setItem(key, end); } catch (e) {} }
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var t = Math.max(0, Math.floor((end - Date.now()) / 1000));
      $("cd-h").textContent = pad(Math.floor(t / 3600)); $("cd-m").textContent = pad(Math.floor(t % 3600 / 60)); $("cd-s").textContent = pad(t % 60);
    }
    tick(); setInterval(tick, 1000);
  })();

  track("offer_view", {});
})();
