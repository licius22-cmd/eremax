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
  $("logo").innerHTML = C.quiz.images.logo ? '<img src="' + C.quiz.images.logo + '" alt="' + C.brand + '">' : logoHtml;
  $("footLogo").innerHTML = logoHtml;
  document.querySelectorAll(".brand").forEach(function (e) { e.textContent = C.brand; });
  $("brandUpper").textContent = C.brand.toUpperCase();
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
  var bIcons = ["🔥", "💧", "⚡", "⏱️"];
  $("benefits").innerHTML = O.benefits.map(function (b, i) {
    return '<li><span class="b-ico">' + bIcons[i % 4] + "</span><div><b>" + b.title + "</b>" + (b.text ? "<p>" + b.text + "</p>" : "") + "</div></li>";
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
    $("stickyTitle").textContent = current.title;
    $("stickyPrice").innerHTML = money(current.price) + " <s>" + money(current.compareAt) + "</s>";
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

  /* ---------- ingredientes ---------- */
  $("ingGrid").innerHTML = O.ingredients.map(function (x, i) {
    return '<div class="ing"><span class="ing-img">' + smartImg("../assets/images/oferta/ingredient-" + (i + 1) + ".png", A.ingredient(x.name, i), x.name) +
      "</span><h4>" + x.name + "</h4><p>" + x.text + "</p></div>";
  }).join("");
  $("trustBadges").innerHTML = O.badges.map(function (b) { return '<span class="tb">✓ ' + b + "</span>"; }).join("");

  /* ---------- reseñas ---------- */
  $("reviewsTitle").textContent = "MIRA CÓMO MÁS DE " + C.customersCount + " HOMBRES RECUPERARON SU CONFIANZA";
  var reviews = O.reviews && O.reviews.length ? O.reviews : [1, 2, 3, 4].map(function (n) {
    return { name: "[Nombre del cliente]", title: "[Título de la reseña " + n + "]", text: "[Pega aquí una reseña real de un cliente verificado — config.js → oferta.reviews]", placeholder: true };
  });
  $("reviews").innerHTML = reviews.map(function (r, i) {
    return '<div class="review' + (r.placeholder ? " ph" : "") + '">' +
      (r.photo ? '<span class="rv-photo">' + smartImg(r.photo, "", r.name) + "</span>" : "") +
      '<div class="rv-head"><b>' + r.name.toUpperCase() + '</b><span class="rv-verified">✓ Cliente verificado</span></div>' +
      '<div class="stars">★★★★★</div><h4>' + r.title + "</h4><p>" + r.text + "</p></div>";
  }).join("");

  /* ---------- pie ---------- */
  var co = O.company;
  $("companyBox").innerHTML = "<h5>Contacto</h5><p><small>Razón social</small>" + co.legalName + "</p><p><small>Número de empresa</small>" + co.number +
    "</p><p><small>Dirección</small>" + co.address + "</p><p><small>Teléfono</small>" + co.phone +
    '</p><p><small>E-mail</small><a href="mailto:' + co.email + '">' + co.email + "</a></p>";
  $("mailLink").href = "mailto:" + co.email;

  /* ---------- barra fija ---------- */
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
