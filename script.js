(function () {
  "use strict";
  var C = window.EREMAX_CONFIG, A = window.EREMAX_ASSETS, I = A.icons;
  var host = document.getElementById("stepHost");
  var fill = document.getElementById("progressFill");
  var backBtn = document.getElementById("backBtn");
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- logo ---------- */
  document.getElementById("logo").innerHTML = C.images.logo
    ? '<img src="' + C.images.logo + '" alt="' + C.brand + '">'
    : I.logo + '<span class="logo-word">' + C.brand + "</span>";

  /* ---------- steps ---------- */
  var steps = [
    { id: "age", kind: "age", title: "What is your Age?",
      options: ["20 - 29 Years Old", "30 - 39 Years Old", "40 - 49 Years Old", "50 - 59 Years Old", "60 - 69 Years Old", "70+ Years Old"] },

    { id: "frustration", kind: "single", title: "What's been your biggest frustration in the bedroom lately?",
      options: [
        { t: "Finishing too fast", i: I.stopwatch, w: 2 }, { t: "Trouble getting hard", i: I.down, w: 3 },
        { t: "Trouble staying hard", i: I.wave, w: 3 }, { t: "Low drive/desire", i: I.gauge, w: 2 },
        { t: "A mix of all of these", i: I.grid, w: 4 }, { t: "Nothing yet, but I want to stay at my peak", i: I.peak, w: 0 }] },

    { id: "not-alone", kind: "text", title: "You're not alone in this.",
      text: function () {
        return "Over " + C.customersCount + " men reported the same frustrations before they started taking " + C.productName +
          ". It's a simple daily routine, made in a GMP-certified facility and backed by a " + C.guaranteeDays + "-day money-back guarantee.";
      } },

    { id: "anxiety", kind: "single", title: "Do you experience anxiety or overthinking before or during sex?",
      options: [{ t: "Yes", w: 2 }, { t: "No", w: 0 }] },

    { id: "since", kind: "single", title: "When did you first start noticing changes in your sexual life?",
      options: [{ t: "Over a year ago", w: 3 }, { t: "In the past year", w: 2 }, { t: "In the past few months", w: 1 }, { t: "Not sure", w: 1 }] },

    { id: "goals", kind: "multi", title: "What results are you hoping to see?", sub: "Choose as many as you'd like.",
      options: [
        { t: "Lasting longer in bed", i: "⏱️" }, { t: "Stronger, firmer erections", i: "💪" }, { t: "Higher sex drive", i: "🔥" },
        { t: "More stamina and endurance", i: "⚡" }, { t: "Feeling confident again", i: "😎" }, { t: "All of the above", i: "🚀", all: true }] },

    { id: "social-proof", kind: "proof",
      title: function () { return C.customersCount + "+ men are taking back their confidence in the bedroom"; },
      sub: "Here's what some of them are saying." },

    { id: "relationship", kind: "single", title: "What's your relationship status?",
      options: [{ t: "Single or dating" }, { t: "In a relationship" }, { t: "Married" }] },

    { id: "sex-life", kind: "single", title: "How would you describe your sex life right now?",
      options: [{ t: "It's basically stopped", w: 4 }, { t: "Less than I'd like", w: 3 }, { t: "It's okay, but not great", w: 2 }, { t: "I'm satisfied", w: 0 }] },

    { id: "tried", kind: "single", title: "What have you tried to fix this issue?",
      options: [{ t: "Prescription pills", w: 2 }, { t: "Lifestyle changes", w: 1 }, { t: "Quitting porn or masturbation", w: 1 }, { t: "Nothing yet", w: 1 }, { t: "Other", w: 1 }] },

    { id: "motivational", kind: "motivational",
      title: "You don't have to accept weak erections or a sex drive that's gone quiet.",
      text: "Most quick fixes wear off in hours, use small doses, or only target one part of the problem. Based on your answers, we're putting together a simple daily plan to support healthy blood flow, energy and drive." },

    { id: "morning", kind: "single", title: "Have you noticed a decline in morning erections?",
      why: "Morning erections are one of the clearest everyday signals of how well your circulation is working.",
      options: [{ t: "Yes", w: 3 }, { t: "No", w: 0 }, { t: "Not sure", w: 1 }] },

    { id: "stress", kind: "single", title: "How often do you tend to experience stress?",
      why: "Stress can tighten blood vessels and lower desire, so it's an important part of your profile.",
      options: [{ t: "Sometimes", w: 1 }, { t: "All the time", w: 3 }, { t: "Rarely", w: 0 }, { t: "Not sure", w: 1 }] },

    { id: "summary", kind: "summary" },
    { id: "plan", kind: "chart" },
    { id: "final-loading", kind: "loading" }
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
  // Shows the fallback SVG first, then swaps in the real image if the file exists.
  function smartImg(src, fallback, alt) {
    return '<span class="smart-img" data-src="' + (src || "") + '" data-alt="' + (alt || "") + '">' + fallback + "</span>";
  }
  function hydrateImages(root) {
    root.querySelectorAll(".smart-img[data-src]").forEach(function (box) {
      var src = box.getAttribute("data-src");
      if (!src) return;
      var img = new Image();
      img.onload = function () { box.innerHTML = ""; img.alt = box.getAttribute("data-alt"); box.appendChild(img); };
      img.src = src;
    });
  }

  function level() {
    var s = 0, max = 0;
    steps.forEach(function (st) {
      if (st.kind !== "single") return;
      var m = Math.max.apply(null, st.options.map(function (o) { return o.w || 0; }));
      if (!m) return;
      max += m;
      if (answers[st.id] != null) s += st.options[answers[st.id]].w || 0;
    });
    var r = max ? s / max : 0;
    if (r >= 0.55) return 0; if (r >= 0.35) return 1; if (r >= 0.15) return 2; return 3;
  }

  /* ---------- navigation ---------- */
  function go(n) { history.push(idx); idx = n; render(); }
  function next() { go(idx + 1); }
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
    return st.why ? '<div class="why-box"><div class="why-box-label">Why we ask</div><div class="why-box-text">' + st.why + "</div></div>" : "";
  }
  function answer(st, i, label) {
    answers[st.id] = i;
    track("quiz_answer", { quiz_step_id: st.id, answer: label });
  }

  /* ---------- renderers ---------- */
  var R = {
    age: function (st, el) {
      el.innerHTML = heading(st.title) + '<div class="age-grid">' + st.options.map(function (t, i) {
        return '<button class="age-card' + (answers[st.id] === i ? " selected" : "") + '" data-i="' + i + '"><span class="age-img">' +
          smartImg(C.images.age[i], A.portrait(i), t) + '</span><div class="age-card-label">' + t + "</div></button>";
      }).join("") + "</div>";
      el.querySelectorAll(".age-card").forEach(function (b) {
        b.addEventListener("click", function () {
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
        }).join("") + '</div><button class="continue-btn">Continue</button>';
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
        '</p></div><button class="continue-btn visible">Continue</button>';
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    proof: function (st, el) {
      el.innerHTML = '<div class="social-proof-section"><h2 class="social-proof-heading">' + val(st.title) + '</h2><p class="social-proof-sub">' + st.sub +
        '</p><div class="social-proof-wrapper">' + C.images.proof.map(function (src, i) {
          return '<div class="social-proof-img">' + smartImg(src, A.placeholder("Customer photo " + (i + 1), i), "Customer") + "</div>";
        }).join("") + '</div></div><button class="continue-btn visible">Continue</button>';
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    motivational: function (st, el) {
      el.innerHTML = '<div class="motivational-section"><h2 class="motivational-heading">' + st.title + '</h2><p class="motivational-text">' + st.text +
        '</p><button class="continue-btn visible">Continue</button><div class="motivational-img">' +
        smartImg(C.images.transformation, A.transformation(), "Transformation") + "</div></div>";
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    summary: function (st, el) {
      var lv = level();
      var names = ["Low", "Normal", "Medium", "High"];
      var pos = [12, 38, 62, 88][lv];
      var alerts = [
        ["Low level", "Your answers suggest your body isn't performing at the level it should be. This is more common than most men think, and it typically gets worse over time without the right support."],
        ["Normal level", "You're getting by, but your answers show clear room to feel more energized, confident and in control."],
        ["Medium level", "You have a good foundation. The right daily support can help you get closer to your peak."],
        ["High level", "You're in a great place. A consistent routine can help you stay at your peak as you get older."]
      ][lv];
      var room = ["High", "High", "Medium", "Moderate"][lv];
      el.innerHTML = heading("Summary of Your Sexual Performance Profile") +
        '<div class="summary-card"><div class="summary-card-header"><span class="summary-card-title">Level of sexual health</span>' +
        '<span class="summary-badge badge-' + lv + '">' + names[lv] + '</span></div>' +
        '<div class="summary-person-img">' + smartImg(C.images.profile, A.portrait(answers.age != null ? answers.age : 2), "Profile") + "</div>" +
        '<div style="text-align:left"><span class="your-level-label">Your level</span></div>' +
        '<div class="gradient-bar-container"><div class="gradient-bar"><div class="gradient-slider" id="slider"></div></div>' +
        '<div class="gradient-labels"><span>Low</span><span>Normal</span><span>Medium</span><span>High</span></div></div></div>' +
        '<div class="summary-alert alert-' + lv + '"><div class="summary-alert-icon">' + (lv < 2 ? "!" : "✓") + '</div><div>' +
        '<div class="summary-alert-title">' + alerts[0] + '</div><div class="summary-alert-text">' + alerts[1] + "</div></div></div>" +
        '<div class="summary-metrics">' +
        '<div class="metric-card">' + I.pulse.replace("<svg", '<svg class="metric-icon"') + '<div><div class="metric-label">Room For Improvement</div><div class="metric-value">' + room + "</div></div></div>" +
        '<div class="metric-card half">' + I.bolt.replace("<svg", '<svg class="metric-icon"') + '<div><div class="metric-label">Profile Match</div><div class="metric-value">Your answers match the men our daily routine was designed for.</div></div></div>' +
        '<div class="metric-card half">' + I.target.replace("<svg", '<svg class="metric-icon"') + '<div><div class="metric-label">Next Step</div><div class="metric-value">We\'ve put together a personalized recommendation. Click below to see it and claim your exclusive discount.</div></div></div>' +
        '</div><button class="continue-btn visible" style="margin-top:20px">Continue</button>';
      setTimeout(function () { var s = el.querySelector("#slider"); if (s) s.style.left = pos + "%"; }, 150);
      el.querySelector(".continue-btn").addEventListener("click", next);
      track("quiz_complete", { level: names[lv] });
    },

    chart: function (st, el) {
      var labels = ["Week 1-2", "Week 3-4", "Week 5-7", "Week 8-9", "Week 10-12"], h = [30, 45, 60, 78, 95];
      el.innerHTML = heading("The last plan you'll ever need to reclaim your drive and performance.") +
        '<div class="chart-section"><div class="chart-container"><div class="chart-bars">' + labels.map(function (l, i) {
          return '<div class="chart-bar-wrapper"><div class="chart-bar b' + (i + 1) + '" data-h="' + h[i] + '">' +
            (i === 3 ? '<div class="goal-badge">Goal</div><div class="goal-check">✓</div>' : "") +
            '</div><div class="chart-bar-label">' + l + "</div></div>";
        }).join("") + '</div></div><p class="chart-result-text">Based on your answers, your plan is built to support your energy, drive, and bedroom performance over the next 63 days.</p></div>' +
        '<button class="continue-btn visible" style="margin-top:20px">Continue</button>';
      setTimeout(function () { el.querySelectorAll(".chart-bar").forEach(function (b) { b.style.height = b.dataset.h + "%"; }); }, 80);
      el.querySelector(".continue-btn").addEventListener("click", next);
    },

    loading: function (st, el) {
      var names = ["Goal", "Custom Fit", "Selected Essentials"];
      var questions = [
        "Are you ready to take back control of your performance?",
        "Did you know healthy blood flow plays a key role in male sexual performance?",
        "Would you try a simple solution that takes under 30 seconds a day?"
      ];
      el.innerHTML = '<div class="loading-section"><h2 class="loading-heading">Creating your personalized plan…</h2><div class="loading-steps">' +
        names.map(function (n, i) {
          return '<div class="loading-step-item" id="ls' + i + '"><div class="loading-step-header"><span class="loading-step-name">' + n +
            '</span><span class="loading-step-status" id="lst' + i + '"></span></div><div class="loading-item-bar-container"><div class="loading-item-bar-fill" id="lb' + i + '"></div></div></div>';
        }).join("") + '</div><button class="continue-btn" id="submitBtn" style="margin-top:24px">Submit</button></div>';

      var overlay = document.getElementById("modalOverlay"), mText = document.getElementById("modalText");
      var btns = overlay.querySelectorAll(".modal-btn");
      function phase(p) {
        if (p >= 3) { el.querySelector("#submitBtn").classList.add("visible"); return; }
        el.querySelector("#ls" + p).classList.add("visible");
        setTimeout(function () { el.querySelector("#lb" + p).style.width = "50%"; el.querySelector("#lst" + p).textContent = "50%"; }, 100);
        setTimeout(function () {
          mText.textContent = questions[p];
          overlay.classList.add("active");
          btns.forEach(function (b) {
            b.onclick = function () {
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
        track("quiz_submit", {});
        window.location.href = withParams(C.redirectUrl);
      });
    }
  };

  /* ---------- countdown (per-visitor, like the original 2h timer) ---------- */
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

  render();
})();
