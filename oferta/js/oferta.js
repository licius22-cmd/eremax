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

  /* ---------- barra superior ---------- */
  if (O.showTimer === false) { var tm = document.querySelector(".sale-banner__timer"); if (tm) tm.remove(); }

  /* ---------- aviso de perfil (opcional) ---------- */
  if (O.profilePill) $("profileText").textContent = O.profilePill; else $("profilePill").remove();

  /* ---------- valoración + sello ---------- */
  if (O.rating && O.rating.show) {
    $("ratingLine").innerHTML = '<span class="stars-o">★★★★★</span> Calificación ' + O.rating.score + " • " + C.customersCount + "+ clientes";
  } else { $("ratingLine").remove(); }
  if (O.formulaBadge) {
    $("formulaPill").innerHTML = "<b>" + (O.formulaBadge.label || "") + "</b> " + GL.crown + " <span>" + O.formulaBadge.text + "</span>";
  } else { $("formulaPill").remove(); }

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
  var CHECK = '<i class="ck">✓</i>';
  function paintGifts() {
    var g = O.gifts || [];
    if (!g.length) return;
    var box = $("gifts"); box.hidden = false;
    var qty = parseInt(current.id, 10) || 1;
    box.innerHTML = '<legend>' + (O.giftsTitle || "REGALOS DESBLOQUEADOS") + "</legend><div class=\"g-row\">" +
      g.map(function (x, i) {
        var open = qty >= (parseInt(x.unlock, 10) || 1);
        return (i ? '<span class="g-plus">+</span>' : "") +
          '<div class="g-item' + (open ? "" : " locked") + '"><span class="g-img">' +
          smartImg(x.image || "", A.pouch(x.name, i + 1), x.name) +
          (open ? "" : '<span class="g-lock"><svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg></span>') +
          '</span><s>' + x.value + "</s>" +
          (open ? '<b class="g-free">GRATIS: ' + x.name + "</b>" : "<small>Se desbloquea con " + x.unlock + "</small>") + "</div>";
      }).join("") + "</div>";
    hydrate(box);
  }
  function paintBundles() {
    $("bundleList").innerHTML = O.bundles.map(function (b) {
      var on = b === current;
      return '<div class="b-wrap' + (b.badge ? " has-badge" : "") + '">' + (b.badge ? '<span class="b-badge">' + b.badge + "</span>" : "") +
        '<label class="bundle' + (on ? " on" : "") + '" data-id="' + b.id + '">' +
        '<span class="b-main"><span class="radio"></span>' +
        '<span class="b-img">' + smartImg(b.image, A.pouch(C.brand, 0), "") + "</span>" +
        '<span class="b-txt"><b>' + b.title + "</b><small>" + b.sub + "</small></span>" +
        '<span class="b-price"><b>' + money(b.price) + "</b><s>" + money(b.compareAt) + "</s></span></span>" +
        (on && b.gift ? '<span class="b-gift"><span class="b-gift-h">' + CHECK + b.gift.title + "</span>" + (b.gift.text ? "<small>" + b.gift.text + "</small>" : "") + "</span>" : "") +
        "</label></div>";
    }).join("");
    paintGifts();
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
    $("stickyPrice").textContent = money(current.price);

  }
  paintBundles();
  [$("atcBtn"), $("stickyBtn")].forEach(function (b) {
    b.addEventListener("click", function () {
      track("checkout_click", { pkg: current.id });
      try { if (window.fbq) window.fbq("track", "InitiateCheckout", { value: current.price, currency: "USD" }); } catch (e) {}
    });
  });

  function dt(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toLocaleDateString("es", { day: "numeric", month: "short" }).replace(".", ""); }
  var d1 = O.deliveryDays || 4, d2 = O.deliveryDaysMax || d1 + 5;
  $("deliveryDate").textContent = dt(d1) + " y el " + dt(d2);
  if (O.perks && O.perks.length) $("perks").innerHTML = O.perks.map(function (t) { return "<span>" + CHECK + t + "</span>"; }).join("");
  else $("perks").remove();
  if (O.subscriptionNote) $("subNote").textContent = O.subscriptionNote; else $("subNote").remove();

  /* ---------- pestañas ---------- */
  var tabs = [];
  if (O.expert) tabs.push(["Opinión<br>experta", '<blockquote>"' + O.expert.quote + '"</blockquote><div class="ex-sign">' +
    (O.expert.photo ? '<span class="ex-mini">' + smartImg(O.expert.photo, "", O.expert.name) + "</span>" : "") +
    "<p><b>" + O.expert.name + "</b><br>" + O.expert.title + "</p></div>"]);
  var det = O.details || [O.productSubtitle];
  tabs.push(["Detalles del<br>producto", det.map(function (t) { return "<p>" + t + "</p>"; }).join("")]);
  var cmpRows = O.comparison || ["Funciona todos los días", "Sin receta médica", "Buen sabor"];
  tabs.push(["Tabla<br>comparativa",
    '<div class="cmp2"><div class="cmp2-h"><span></span><span>Otros</span><span class="me">' + C.brand + "</span></div>" +
    cmpRows.map(function (r) { return '<div class="cmp2-r"><span>' + r + '</span><span class="n">✕</span><span class="me y">✓</span></div>'; }).join("") + "</div>"]);
  tabs.push(["Ingredientes", '<table class="ing-tbl"><tr><th>Ingrediente</th><th>Dosis</th><th>Beneficio</th></tr>' +
    O.ingredients.map(function (x) { return "<tr><td><b>" + x.name + "</b></td><td>" + (x.dose || "[mg]") + "</td><td>" + (x.short || x.text) + "</td></tr>"; }).join("") + "</table>"]);
  var faqSrc = document.querySelectorAll("#faq details");
  tabs.push(["Preguntas", '<div class="tab-faq">' + Array.prototype.slice.call(faqSrc, 0, 6).map(function (d) {
    return "<details><summary>" + d.querySelector("summary").textContent + "</summary><p>" + d.querySelector("p").textContent + "</p></details>"; }).join("") + "</div>"]);
  $("tabs").innerHTML = tabs.map(function (t, i) { return '<button class="tab' + (i ? "" : " on") + '" data-i="' + i + '">' + t[0] + "</button>"; }).join("");
  function showTab(i) {
    $("tabs").querySelectorAll(".tab").forEach(function (t, k) { t.classList.toggle("on", k === i); });
    $("tabPanel").innerHTML = tabs[i][1]; hydrate($("tabPanel"));
  }
  $("tabs").querySelectorAll(".tab").forEach(function (t) { t.onclick = function () { showTab(+t.dataset.i); }; });
  showTab(0);

  /* ---------- prensa (solo logos reales) ---------- */
  if (O.press && O.press.length) {
    $("pressSection").hidden = false;
    var logos = O.press.map(function (src) { return '<img src="' + src + '" alt="">'; }).join("");
    $("pressTrack").innerHTML = "<div>" + logos + logos + "</div>";
  }

  /* ---------- mejor juntos (opcional) ---------- */
  if (O.together) {
    var tg = $("togetherSection"); tg.hidden = false;
    tg.innerHTML = '<h2 class="sec-title light">' + O.together.title + "</h2>" +
      (O.together.paragraphs || []).map(function (t) { return "<p>" + t + "</p>"; }).join("") +
      '<div class="tg-img">' + smartImg(O.together.image || "", A.placeholder("oferta/images/together.webp", 2), "") + "</div>" +
      (O.together.closing ? "<p>" + O.together.closing + "</p>" : "");
  }

  /* ---------- intro de la línea de tiempo ---------- */
  if (O.timelineIntro && O.timelineIntro.length) $("tlIntro").innerHTML = O.timelineIntro.map(function (t) { return "<p>" + t + "</p>"; }).join("");
  else $("tlIntro").remove();

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
      '</div><p class="sv-note">' + (O.survey.note || "") + "</p>" +
      (O.survey.image !== null ? '<div class="sv-img">' + smartImg(O.survey.image || O.gallery[0], A.pouch(C.brand, 0), "") + "</div>" : "");
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
  if (O.ingredientsLabel !== undefined) { if (O.ingredientsLabel) $("ingLabel").textContent = O.ingredientsLabel; else $("ingLabel").remove(); }
  if (O.giftIngredients && O.giftIngredients.items && O.giftIngredients.items.length) {
    $("giftIngWrap").hidden = false; $("giftIngLabel").textContent = O.giftIngredients.label || "";
    $("giftIngGrid").innerHTML = O.giftIngredients.items.map(function (x, i) {
      return '<div class="ing slide"><span class="ing-img">' + smartImg(x.image || "", A.ingredient(x.name, i + 2), x.name) + "</span><h4>" + x.name + "</h4><p>" + x.text + "</p></div>";
    }).join("");
  }
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
  $("joinTitle").textContent = "ÚNETE A MÁS DE " + C.customersCount + " CLIENTES FELICES";
  $("joinText").textContent = "ÚNETE A MÁS DE " + C.customersCount + " CLIENTES FELICES";
  var sticky = $("stickyAtc");
  window.addEventListener("scroll", function () {
    var r = $("atcBtn").getBoundingClientRect();
    sticky.classList.toggle("show", r.bottom < 0);
  }, { passive: true });

  hydrate();

  /* ---------- cuenta regresiva ---------- */
  (function () {
    if (!$("cd-h")) return;
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
