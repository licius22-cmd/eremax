/* Barra fija de escritorio (producto + valoración) y enlace de contacto del menú superior. */
(function () {
  "use strict";
  var C = window.EREMAX_CONFIG, O = C.oferta, A = window.EREMAX_ASSETS;
  var $ = function (id) { return document.getElementById(id); };
  var img = $("spImg");
  if (img) {
    img.innerHTML = A.pouch(C.brand, 0);
    var im = new Image();
    im.onload = function () { img.innerHTML = ""; img.appendChild(im); };
    im.src = O.stickyImage || O.gallery[0];
  }
  if ($("spRating")) $("spRating").innerHTML = O.rating && O.rating.show ? '<span class="stars-o">★★★★★</span> Calificación <b>' + O.rating.score + "/5</b> por <b>" + C.customersCount + "+</b> clientes felices" : "";
  if ($("spName")) $("spName").textContent = O.stickyName || (C.productName + " Performance Gummies").toUpperCase();
  document.querySelectorAll(".nav-mail").forEach(function (a) { a.href = "mailto:" + O.company.email; });
})();

/* Flechas de los especialistas pegadas debajo de la foto en escritorio (aunque la cita sea larga). */
(function () {
  "use strict";
  var sec = document.getElementById("expertSection");
  if (!sec) return;
  var nav = sec.querySelector(".c-nav"), car = document.getElementById("exCarousel");
  function place() {
    if (!nav || !car) return;
    nav.style.marginTop = ""; nav.style.marginBottom = "";
    var photo = car.querySelector(".ex-photo");
    if (!photo || window.innerWidth < 990) return;
    var gap = photo.getBoundingClientRect().bottom - car.getBoundingClientRect().bottom + 20;
    nav.style.marginTop = Math.round(gap) + "px";
    var over = car.getBoundingClientRect().bottom - nav.getBoundingClientRect().bottom;
    if (over > 0) nav.style.marginBottom = Math.round(over) + "px";
  }
  window.addEventListener("resize", place);
  window.addEventListener("load", place);
  setTimeout(place, 300);
})();
