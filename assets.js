/* ============================================================
   EREMAX — built-in illustrations & line icons (SVG).
   Used as fallbacks while your real images in /images are missing.
   ============================================================ */
(function () {
  var S = 'fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';

  var icons = {
    // Stopwatch with a lightning bolt inside
    stopwatch: '<svg viewBox="0 0 32 32" ' + S + '><circle cx="16" cy="18.5" r="10.5"/><circle cx="16" cy="18.5" r="8" stroke-width="1"/><path d="M13.5 4.5h5M16 4.5v3.5"/><path d="M24.5 9.5l2-2M7.5 9.5l-2-2"/><path d="M17 12.5l-4 7h3.5l-1.5 5.5 5-8h-3.6l1.6-4.5z" stroke-width="1.3"/></svg>',
    // Diagonal arrow pointing down-left, broken in the middle
    down: '<svg viewBox="0 0 32 32" ' + S + '><path d="M27 5l-6 6"/><path d="M21 11l2 3-5-1 2 3-11 10"/><path d="M6 19v7h7"/><path d="M25 3l4 4" stroke-width="1.2"/></svg>',
    // Arrow up on the left that drops into a wave and ends pointing right
    wave: '<svg viewBox="0 0 32 32" ' + S + '><path d="M3 13l4-4 4 4"/><path d="M7 9v6c0 3 2 5 5 3l3-2c3-2 5-1 7 1l4 3"/><path d="M23 22.5l3.5-1.5-.8 3.8"/></svg>',
    // Gauge (low) with a small flame underneath
    gauge: '<svg viewBox="0 0 32 32" ' + S + '><path d="M4.5 17a11.5 11.5 0 0 1 23 0"/><path d="M8 17h-1.5M25.5 17H24M9 10.5l1 1M23 10.5l-1 1M16 6.5V8"/><path d="M16 17l-6-3.5"/><circle cx="16" cy="17" r="1.5"/><path d="M16 21c-2 2-2.5 3.4-2.5 4.6a2.5 2.5 0 0 0 5 0c0-1.2-.6-2.6-2.5-4.6z"/><path d="M12.5 29.5h7"/></svg>',
    // Circle with four small boxes (mix of everything)
    grid: '<svg viewBox="0 0 32 32" ' + S + '><circle cx="16" cy="16" r="13"/><circle cx="16" cy="16" r="10" stroke-width="1"/><rect x="10" y="10" width="5" height="5" rx="1"/><rect x="17" y="10" width="5" height="5" rx="1"/><rect x="10" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/><path d="M11.5 12.5h2M19.5 11v3M11 19.5l3 0M18.5 19.5l2 0"/></svg>',
    // Mountain with an arrow rising from the summit
    peak: '<svg viewBox="0 0 32 32" ' + S + '><path d="M2.5 28l8.5-12 4 5 2-3 3 4 3-3 6 9"/><path d="M11 16l-2 4M17 18v-14"/><path d="M13.5 7.5L17 4l3.5 3.5"/></svg>',
    pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>',
    logo: '<svg class="logo-mark" viewBox="0 0 24 20"><path d="M1 19L9 5l4 6 3-4 7 12z" fill="#E7B04A"/><path d="M9 5l4 6-2 3-5-2z" fill="#F5D77A"/></svg>'
  };

  // Illustrated portrait — hair/beard colour and glasses change with age.
  function portrait(i) {
    var hair = ["#2b1b12", "#3a2516", "#4a3a30", "#8a8580", "#b8b4b0", "#dcdad6"][i] || "#3a2516";
    var beard = i >= 1;
    var glasses = i >= 3;
    var skin = "#e9c3a2", shade = "#d9a984", shirt = "#3b2a22";
    return '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M22 200c4-40 30-56 60-62h36c30 6 56 22 60 62z" fill="' + shirt + '"/>' +
      '<path d="M84 124h32v20c-6 8-26 8-32 0z" fill="' + shade + '"/>' +
      '<path d="M80 140c8 10 32 10 40 0" stroke="#2a1d17" stroke-width="3" fill="none"/>' +
      '<ellipse cx="100" cy="84" rx="34" ry="42" fill="' + skin + '"/>' +
      '<ellipse cx="66" cy="88" rx="6" ry="10" fill="' + shade + '"/><ellipse cx="134" cy="88" rx="6" ry="10" fill="' + shade + '"/>' +
      (i >= 4 ? '<path d="M66 70c0-30 18-40 34-40s34 10 34 40c-6-12-14-16-20-16H86c-6 0-14 4-20 16z" fill="' + hair + '"/>'
              : '<path d="M64 76c-4-34 16-50 38-50 24 0 38 18 34 50-4-14-12-22-22-24-10 4-30 4-42 0-4 6-6 14-8 24z" fill="' + hair + '"/>') +
      (beard ? '<path d="M68 92c2 30 16 38 32 38s30-8 32-38c-4 10-8 14-12 16-6-4-14-4-20-4s-14 0-20 4c-4-2-8-6-12-16z" fill="' + hair + '" opacity="' + (i === 1 ? .55 : .9) + '"/>' : '') +
      '<ellipse cx="86" cy="84" rx="3.2" ry="3.6" fill="#2a1d17"/><ellipse cx="114" cy="84" rx="3.2" ry="3.6" fill="#2a1d17"/>' +
      '<path d="M79 76c4-3 10-3 14-1M107 75c4-2 10-2 14 1" stroke="' + (i >= 3 ? "#777" : "#2a1d17") + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M100 88v12l-5 3" stroke="' + shade + '" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M89 112c7 5 15 5 22 0" stroke="#8a4b3a" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      (glasses ? '<g stroke="#333" stroke-width="2" fill="none"><rect x="74" y="76" width="22" height="16" rx="5"/><rect x="104" y="76" width="22" height="16" rx="5"/><path d="M96 83h8M74 82l-8-2M126 82l8-2"/></g>' : '') +
      '</svg>';
  }

  function placeholder(label, i) {
    var tones = ["#e9dccd", "#e4d2bf", "#efe3d6", "#e7d8c8"];
    return '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="300" height="300" fill="' + tones[(i || 0) % 4] + '"/>' +
      '<g transform="translate(150 132)" stroke="#a88a6a" stroke-width="5" fill="none" stroke-linejoin="round">' +
      '<rect x="-40" y="-28" width="80" height="58" rx="10"/><circle cx="0" cy="1" r="16"/><path d="M-16-28l6-10h20l6 10"/></g>' +
      '<text x="150" y="214" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="17" font-weight="700" fill="#8a6c4e">' + label + '</text></svg>';
  }

  function transformation() {
    function bars(x, vals, col) {
      return vals.map(function (v, k) { return '<rect x="' + (x + k * 34) + '" y="' + (250 - v) + '" width="24" height="' + v + '" rx="5" fill="' + col + '"/>'; }).join("");
    }
    return '<svg viewBox="0 0 340 300" xmlns="http://www.w3.org/2000/svg" font-family="Montserrat, sans-serif">' +
      '<rect width="340" height="300" rx="14" fill="#fff"/>' +
      '<text x="85" y="40" text-anchor="middle" font-size="16" font-weight="800" fill="#999">ANTES</text>' +
      '<text x="255" y="40" text-anchor="middle" font-size="16" font-weight="800" fill="#C98E4A">CON LA RUTINA</text>' +
      '<line x1="170" y1="56" x2="170" y2="262" stroke="#eee" stroke-width="2"/>' +
      bars(36, [40, 55, 35], "#d9d9d9") + bars(206, [110, 150, 180], "#C98E4A") +
      '<text x="85" y="280" text-anchor="middle" font-size="11" fill="#888">Energía · Deseo · Confianza</text>' +
      '<text x="255" y="280" text-anchor="middle" font-size="11" fill="#888">Energía · Deseo · Confianza</text></svg>';
  }

  window.EREMAX_ASSETS = { icons: icons, portrait: portrait, placeholder: placeholder, transformation: transformation };
})();
