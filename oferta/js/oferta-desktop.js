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
    im.src = O.gallery[0];
  }
  if ($("spRating")) $("spRating").innerHTML = O.rating && O.rating.show ? '<span class="stars-o">★★★★★</span> Calificación <b>' + O.rating.score + "/5</b> por <b>" + C.customersCount + "+</b> clientes felices" : "";
  if ($("spName")) $("spName").textContent = O.stickyName || (C.productName + " Performance Gummies").toUpperCase();
  document.querySelectorAll(".nav-mail").forEach(function (a) { a.href = "mailto:" + O.company.email; });
})();
