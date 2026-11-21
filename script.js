(function () {
  "use strict";
  var C = window.EREMAX_CONFIG;
  var app = document.getElementById("app");
  var progressFill = document.getElementById("progressFill");
  var stepCount = document.getElementById("stepCount");
  var backBtn = document.getElementById("backBtn");
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- SCREENS ---------------- */
  var screens = [
    { type: "single", id: "age", title: "What is your age?",
      sub: "We'll tailor your plan to your age group.",
      options: [
        { icon: "🧑", label: "20 – 29 years old" }, { icon: "👨", label: "30 – 39 years old" },
        { icon: "🧔", label: "40 – 49 years old" }, { icon: "👨‍🦳", label: "50 – 59 years old" },
        { icon: "👴", label: "60 – 69 years old" }, { icon: "🎖️", label: "70+ years old" }
      ], grid: true },

    { type: "single", id: "frustration", title: "What's been your biggest frustration in the bedroom lately?",
      options: [
        { icon: "⏱️", label: "Finishing too fast", w: 2 },
        { icon: "📉", label: "Trouble getting hard", w: 3 },
        { icon: "⚠️", label: "Trouble staying hard", w: 3 },
        { icon: "🪫", label: "Low drive / desire", w: 2 },
        { icon: "🌀", label: "A mix of all of these", w: 4 },
        { icon: "🏆", label: "Nothing yet — I want to stay at my peak", w: 0 }
      ] },

    { type: "info", id: "notAlone", eyebrow: "GOOD NEWS",
      title: "You're not alone in this.",
      body: function () {
        return "<p>" + C.customersCount + " men told us they felt exactly the same way before starting " + C.brand + ".</p>" +
          "<ul class='checks'><li>Natural, research-informed ingredients</li><li>Manufactured in a GMP-certified facility</li>" +
          "<li>Backed by a " + C.guaranteeDays + "-day money-back guarantee</li></ul>";
      }, art: "🤝" },

    { type: "single", id: "anxiety", title: "Do you experience anxiety or overthinking before or during sex?",
      options: [{ icon: "😟", label: "Yes", w: 2 }, { icon: "😌", label: "No", w: 0 }], grid: true },

    { type: "single", id: "since", title: "When did you first start noticing changes in your sexual life?",
      options: [
        { icon: "📅", label: "Over a year ago", w: 3 }, { icon: "🗓️", label: "In the past year", w: 2 },
        { icon: "🕒", label: "In the past few months", w: 1 }, { icon: "🤷", label: "Not sure", w: 1 }
      ] },

    { type: "multi", id: "goals", title: "What results are you hoping to see?",
      sub: "Choose as many as you'd like.",
      options: [
        { icon: "⏱️", label: "Lasting longer in bed" }, { icon: "💪", label: "Stronger, firmer erections" },
        { icon: "🔥", label: "Higher sex drive" }, { icon: "⚡", label: "More energy and stamina" },
        { icon: "😎", label: "Feeling confident again" }, { icon: "🚀", label: "All of the above", all: true }
      ] },

    { type: "info", id: "proof", eyebrow: "REAL MEN, REAL ROUTINES",
      title: function () { return C.customersCount + " men have made " + C.brand + " part of their daily routine."; },
      body: function () {
        return "<p>Consistency is what matters most — most men take it daily for at least 8–12 weeks.</p>" +
          "<div class='proof-grid'>" +
          "<div class='proof-card'><div class='stars'>★★★★★</div><p>“[Paste a real, verified customer review here]”</p><span>— Verified buyer</span></div>" +
          "<div class='proof-card'><div class='stars'>★★★★★</div><p>“[Paste a real, verified customer review here]”</p><span>— Verified buyer</span></div>" +
          "</div>";
      } },

    { type: "single", id: "relationship", title: "What's your relationship status?",
      options: [{ icon: "💬", label: "Single or dating" }, { icon: "❤️", label: "In a relationship" }, { icon: "💍", label: "Married" }] },

    { type: "single", id: "sexlife", title: "How would you describe your sex life right now?",
      options: [
        { icon: "🧊", label: "It's basically stopped", w: 4 }, { icon: "📉", label: "Less than I'd like", w: 3 },
        { icon: "😐", label: "It's okay, but not great", w: 2 }, { icon: "😀", label: "I'm satisfied", w: 0 }
      ] },

    { type: "multi", id: "tried", title: "What have you tried to fix this issue?",
      sub: "Select all that apply.",
      options: [
        { icon: "💊", label: "Prescription pills" }, { icon: "🥗", label: "Lifestyle changes" },
        { icon: "🚫", label: "Quitting porn or masturbation" }, { icon: "🆕", label: "Nothing yet" }, { icon: "➕", label: "Other" }
      ] },

    { type: "info", id: "whyFail", eyebrow: "WHY MOST SOLUTIONS FALL SHORT",
      title: "You don't have to settle for a drive that's gone quiet.",
      body: function () {
        return "<p>Many options only offer a short-lived effect, use small doses, or focus on just one piece of the puzzle.</p>" +
          "<div class='compare'><div class='col bad'><h4>Typical approach</h4><ul><li>Wears off in hours</li><li>Under-dosed</li><li>Targets one thing</li></ul></div>" +
          "<div class='col good'><h4>" + C.brand + " routine</h4><ul><li>Daily, consistent support</li><li>Full-strength formula</li><li>Energy, drive &amp; circulation</li></ul></div></div>";
      } },

    { type: "single", id: "morning", title: "Have you noticed a decline in morning erections?",
      why: "Morning erections are often linked to healthy circulation and hormone levels.",
      options: [{ icon: "👍", label: "Yes", w: 3 }, { icon: "👎", label: "No", w: 0 }, { icon: "🤷", label: "Not sure", w: 1 }], grid: true },

    { type: "single", id: "stress", title: "How often do you experience stress?",
      why: "Chronic stress can affect blood flow, energy and desire.",
      options: [
        { icon: "🙂", label: "Sometimes", w: 1 }, { icon: "😫", label: "All the time", w: 3 },
        { icon: "😎", label: "Rarely", w: 0 }, { icon: "🤷", label: "Not sure", w: 1 }
      ] },

    { type: "loading", id: "loading" },
    { type: "result", id: "result" },
    { type: "plan", id: "plan" },
    { type: "offer", id: "offer" }
  ];

  var answers = {};
  var history = [];
  var idx = 0;
  var totalSteps = screens.filter(function (s) { return s.type !== "offer"; }).length;

  /* ---------------- HELPERS ---------------- */
  function val(v) { return typeof v === "function" ? v() : v; }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function track(name, data) {
    try { if (window.fbq) fbq("trackCustom", name, data || {}); } catch (e) {}
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, data || {})); } catch (e) {}
  }

  function score() {
    var s = 0, max = 0;
    screens.forEach(function (sc) {
      if (sc.type !== "single") return;
      var weights = sc.options.map(function (o) { return o.w || 0; });
      var m = Math.max.apply(null, weights);
      if (!m) return;
      max += m;
      var a = answers[sc.id];
      if (a != null) s += sc.options[a].w || 0;
    });
    return max ? s / max : 0; // 0 = no issues, 1 = many
  }

  function level() {
    var r = score();
    if (r >= 0.6) return { key: 0, name: "Low" };
    if (r >= 0.35) return { key: 1, name: "Normal" };
    if (r >= 0.15) return { key: 2, name: "Medium" };
    return { key: 3, name: "High" };
  }

  function updateChrome() {
    var s = screens[idx];
    var pct = Math.min(100, Math.round((idx / (totalSteps - 1)) * 100));
    progressFill.style.width = (s.type === "offer" ? 100 : pct) + "%";
    stepCount.textContent = s.type === "offer" ? "" : (idx + 1) + " / " + totalSteps;
    backBtn.hidden = history.length === 0 || s.type === "loading";
  }

  function go(next) {
    history.push(idx);
    idx = next;
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function nextScreen() { go(idx + 1); }
  backBtn.addEventListener("click", function () {
    if (!history.length) return;
    idx = history.pop();
    if (screens[idx].type === "loading") idx = history.pop();
    render();
  });

  /* ---------------- RENDERERS ---------------- */
  function render() {
    var s = screens[idx];
    app.innerHTML = "";
    var card = el("<section class='card fade-in'></section>");
    app.appendChild(card);
    ({ single: renderSingle, multi: renderMulti, info: renderInfo, loading: renderLoading,
       result: renderResult, plan: renderPlan, offer: renderOffer })[s.type](s, card);
    updateChrome();
    track("QuizStep", { step: idx + 1, id: s.id });
  }

  function header(s) {
    return "<h1 class='q-title'>" + val(s.title) + "</h1>" + (s.sub ? "<p class='q-sub'>" + s.sub + "</p>" : "");
  }
  function whyBox(s) {
    return s.why ? "<details class='why'><summary>Why we ask</summary><p>" + s.why + "</p></details>" : "";
  }

  function renderSingle(s, card) {
    card.innerHTML = header(s) + "<div class='options " + (s.grid ? "grid" : "") + "'></div>" + whyBox(s);
    var wrap = card.querySelector(".options");
    s.options.forEach(function (o, i) {
      var b = el("<button class='opt" + (answers[s.id] === i ? " selected" : "") + "'><span class='opt-icon'>" + o.icon +
        "</span><span class='opt-label'>" + o.label + "</span><span class='opt-arrow'>›</span></button>");
      b.addEventListener("click", function () {
        answers[s.id] = i;
        wrap.querySelectorAll(".opt").forEach(function (x) { x.classList.remove("selected"); });
        b.classList.add("selected");
        setTimeout(nextScreen, 260);
      });
      wrap.appendChild(b);
    });
  }

  function renderMulti(s, card) {
    var sel = answers[s.id] ? answers[s.id].slice() : [];
    card.innerHTML = header(s) + "<div class='options'></div><button class='cta' disabled>Continue</button>";
    var wrap = card.querySelector(".options"), cta = card.querySelector(".cta");
    function refresh() {
      wrap.querySelectorAll(".opt").forEach(function (b, i) { b.classList.toggle("selected", sel.indexOf(i) > -1); });
      cta.disabled = sel.length === 0;
    }
    s.options.forEach(function (o, i) {
      var b = el("<button class='opt check'><span class='opt-icon'>" + o.icon + "</span><span class='opt-label'>" + o.label +
        "</span><span class='box'></span></button>");
      b.addEventListener("click", function () {
        if (o.all) { sel = sel.indexOf(i) > -1 ? [] : s.options.map(function (_, k) { return k; }); }
        else {
          var p = sel.indexOf(i);
          if (p > -1) sel.splice(p, 1); else sel.push(i);
          var allIdx = s.options.findIndex(function (x) { return x.all; });
          if (allIdx > -1) {
            var allOthers = s.options.every(function (x, k) { return x.all || sel.indexOf(k) > -1; });
            var ai = sel.indexOf(allIdx);
            if (allOthers && ai === -1) sel.push(allIdx);
            if (!allOthers && ai > -1) sel.splice(ai, 1);
          }
        }
        refresh();
      });
      wrap.appendChild(b);
    });
    cta.addEventListener("click", function () { answers[s.id] = sel; nextScreen(); });
    refresh();
  }

  function renderInfo(s, card) {
    card.classList.add("info");
    card.innerHTML = (s.art ? "<div class='info-art'>" + s.art + "</div>" : "") +
      "<span class='eyebrow'>" + s.eyebrow + "</span><h1 class='q-title'>" + val(s.title) + "</h1>" +
      "<div class='info-body'>" + val(s.body) + "</div><button class='cta'>Continue</button>";
    card.querySelector(".cta").addEventListener("click", nextScreen);
  }

  function renderLoading(s, card) {
    var steps = ["Analyzing your answers", "Comparing with similar profiles", "Building your personalized plan"];
    card.innerHTML = "<h1 class='q-title'>Creating your performance profile…</h1>" +
      "<div class='ring'><svg viewBox='0 0 120 120'><circle cx='60' cy='60' r='52' class='ring-bg'/>" +
      "<circle cx='60' cy='60' r='52' class='ring-fg' id='ringFg'/></svg><span id='ringPct'>0%</span></div>" +
      "<ul class='load-steps'>" + steps.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>";
    var fg = card.querySelector("#ringFg"), pctEl = card.querySelector("#ringPct"), lis = card.querySelectorAll(".load-steps li");
    var C2 = 2 * Math.PI * 52, p = 0;
    fg.style.strokeDasharray = C2;
    var t = setInterval(function () {
      p += 2;
      fg.style.strokeDashoffset = C2 * (1 - p / 100);
      pctEl.textContent = p + "%";
      lis.forEach(function (li, i) { if (p > (i + 1) * 30) li.classList.add("done"); });
      if (p >= 100) { clearInterval(t); setTimeout(function () { idx++; render(); }, 400); } // loading screen is skipped by Back
    }, 55);
  }

  function renderResult(s, card) {
    var lv = level();
    var goals = (answers.goals || []).map(function (i) { return screens[5].options[i].label; }).filter(function (l) { return l !== "All of the above"; });
    var age = answers.age != null ? screens[0].options[answers.age].label : "";
    var texts = [
      "Based on your answers, your body may not be performing at the level it could. Without changes, these issues often don't improve on their own.",
      "You're doing okay, but there's clear room to feel more energized, confident and in control.",
      "You have a solid foundation — the right daily support can help you get closer to your peak.",
      "You're in a great place. A consistent routine can help you stay there as you age."
    ];
    card.innerHTML =
      "<span class='eyebrow'>YOUR RESULTS</span><h1 class='q-title'>Summary of your performance profile</h1>" +
      "<div class='level-box'><div class='level-head'><span>Your current level</span><b class='lvl lvl-" + lv.key + "'>" + lv.name + "</b></div>" +
      "<div class='meter'>" + ["Low", "Normal", "Medium", "High"].map(function (n, i) {
        return "<div class='seg" + (i === lv.key ? " on" : "") + "'><span>" + n + "</span></div>"; }).join("") +
      "<div class='pin' style='left:" + (lv.key * 25 + 12.5) + "%'>▼ You</div></div>" +
      "<p>" + texts[lv.key] + "</p></div>" +
      "<div class='facts'>" +
        (age ? "<div><small>Age group</small><b>" + age + "</b></div>" : "") +
        "<div><small>Main goal</small><b>" + (goals[0] || "Peak performance") + "</b></div>" +
        "<div><small>Recommended routine</small><b>12 weeks</b></div>" +
      "</div>" +
      "<div class='next'><b>Next step:</b> see your personalized plan and unlock your exclusive Black Friday discount.</div>" +
      "<button class='cta'>See My Plan</button>";
    card.querySelector(".cta").addEventListener("click", nextScreen);
    track("QuizComplete", { level: lv.name });
  }

  function renderPlan(s, card) {
    var d = new Date(); d.setDate(d.getDate() + 84);
    var goalDate = d.toLocaleDateString("en-US", { month: "long", day: "numeric" });
    var weeks = [
      ["Week 1–2", "Build the daily habit. Many men report feeling more energy first."],
      ["Week 3–4", "Your routine settles in. Pay attention to drive and mood."],
      ["Week 5–7", "Keep going — consistency is what drives results."],
      ["Week 8–9", "Notice how you feel compared to day one."],
      ["Week 10–12", "Lock in your new routine for the long run."]
    ];
    card.innerHTML =
      "<span class='eyebrow'>YOUR 12-WEEK PLAN</span><h1 class='q-title'>The plan built to help you reclaim your drive and performance</h1>" +
      "<p class='q-sub'>Follow it consistently and check in with yourself by <b>" + goalDate + "</b>.</p>" +
      "<ol class='timeline'>" + weeks.map(function (w) { return "<li><b>" + w[0] + "</b><span>" + w[1] + "</span></li>"; }).join("") +
      "<li class='goal'><b>🎯 Goal — " + goalDate + "</b><span>Feel more confident, energized and in control.</span></li></ol>" +
      "<button class='cta pulse'>Claim My Discount</button>";
    card.querySelector(".cta").addEventListener("click", function () { track("ViewOffer"); nextScreen(); });
  }

  function checkoutUrl(base) {
    if (!C.passQueryParamsToCheckout || !location.search) return base;
    try {
      var u = new URL(base), q = new URLSearchParams(location.search);
      q.forEach(function (v, k) { if (!u.searchParams.has(k)) u.searchParams.set(k, v); });
      return u.toString();
    } catch (e) { return base; }
  }

  function renderOffer(s, card) {
    card.classList.add("offer");
    var lv = level();
    card.innerHTML =
      "<div class='offer-banner'>🔥 BLACK FRIDAY — your discount is reserved for a limited time</div>" +
      "<h1 class='q-title'>Your personalized " + C.brand + " plan is ready</h1>" +
      "<p class='q-sub'>Profile level: <b>" + lv.name + "</b> · Recommended: <b>90–180 day supply</b> for best consistency.</p>" +
      "<div class='packages'>" + C.packages.map(function (p) {
        return "<div class='pkg" + (p.highlight ? " hl" : "") + "'>" +
          (p.badge ? "<span class='pkg-badge'>" + p.badge + "</span>" : "") +
          "<h3>" + p.label + "</h3><p class='supply'>" + p.supply + "</p>" +
          "<div class='bottles'>" + "🧴".repeat(Math.min(+p.id, 6)) + "</div>" +
          "<div class='price'><s>$" + p.oldPrice + "</s> <b>$" + p.price + "</b></div>" +
          "<p class='per'>" + p.perUnit + "</p>" +
          "<ul class='pkg-list'><li>" + p.shipping + "</li><li>" + C.guaranteeDays + "-day money-back guarantee</li>" +
          (p.bonuses ? "<li>+ Free bonus gifts</li>" : "") + "</ul>" +
          "<a class='cta buy' data-pkg='" + p.id + "' href='" + checkoutUrl(p.checkoutUrl) + "'>Buy Now</a>" +
          "<p class='secure'>🔒 Secure checkout</p></div>";
      }).join("") + "</div>" +
      "<div class='guarantee'><div class='seal'>" + C.guaranteeDays + "<small>DAY</small></div><div><h4>" + C.guaranteeDays +
      "-Day Money-Back Guarantee</h4><p>Try " + C.brand + " risk-free. If you're not satisfied, contact us within " + C.guaranteeDays +
      " days for a full refund — no questions asked.</p></div></div>" +
      "<div class='faq'><h3>Frequently asked questions</h3>" +
      faq("How do I take " + C.brand + "?", "Follow the directions on the label daily. Consistency matters more than timing.") +
      faq("When will I notice a difference?", "Everyone is different. Most men are advised to follow the routine for at least 8–12 weeks.") +
      faq("Is it safe?", "Talk to your doctor before using any supplement, especially if you take medication or have a medical condition.") +
      faq("Is this a subscription?", "No. Every package is a one-time purchase.") +
      "</div>";
    card.querySelectorAll(".buy").forEach(function (a) {
      a.addEventListener("click", function () { track("InitiateCheckoutClick", { pkg: a.dataset.pkg }); });
    });
  }
  function faq(q, a) { return "<details><summary>" + q + "</summary><p>" + a + "</p></details>"; }

  /* ---------------- COUNTDOWN ---------------- */
  (function () {
    var key = "eremax_deadline", end;
    try { end = +sessionStorage.getItem(key); } catch (e) {}
    if (!end || end < Date.now()) {
      end = Date.now() + C.countdownMinutes * 60000;
      try { sessionStorage.setItem(key, end); } catch (e) {}
    }
    var h = document.getElementById("cd-h"), m = document.getElementById("cd-m"), sEl = document.getElementById("cd-s");
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var left = Math.max(0, end - Date.now()), t = Math.floor(left / 1000);
      h.textContent = pad(Math.floor(t / 3600)); m.textContent = pad(Math.floor((t % 3600) / 60)); sEl.textContent = pad(t % 60);
    }
    tick(); setInterval(tick, 1000);
  })();

  render();
})();
