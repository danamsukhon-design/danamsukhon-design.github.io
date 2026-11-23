/* core.js - small helpers shared by every part of the site:
   DOM helpers, image markup, sound, custom cursor, scroll reveals,
   split headlines, parallax, magnetic buttons, counters and toasts. */
(function () {
  const DS = (window.DS = window.DS || {});

  /* ---------- DOM ---------- */
  DS.$ = (s, r = document) => r.querySelector(s);
  DS.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  DS.esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  DS.isAr = (s) => /[؀-ۿ]/.test(s || "");
  DS.pad = (n) => String(n).padStart(2, "0");
  DS.reduced = matchMedia("(prefers-reduced-motion: reduce)");
  DS.fine = matchMedia("(hover: hover) and (pointer: fine)");
  DS.mobile = matchMedia("(max-width: 760px)");
  DS.store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };
  /* text that may be Arabic gets lang + dir so it renders right-to-left */
  DS.t = (s) => (DS.isAr(s) ? `<span lang="ar" dir="rtl" class="ar">${DS.esc(s)}</span>` : DS.esc(s));

  /* ---------- images ---------- */
  const BASE = "assets/images/";
  DS.dims = (p) => (window.IMG_DIMS && window.IMG_DIMS[p]) || [1000, 1000];
  DS.ratio = (p) => { const d = DS.dims(p); return d[0] / d[1]; };
  DS.full = (p) => BASE + p;
  DS.thumb = (p) => { const i = p.lastIndexOf("/"); return BASE + p.slice(0, i) + "/thumbs/" + p.slice(i + 1).replace(/\.\w+$/, ".jpg"); };
  /* responsive <img>: the grid copy for small slots, the full file for big ones */
  DS.img = (p, o = {}) => {
    const [w, h] = DS.dims(p);
    const src = w > 600 ? `src="${DS.thumb(p)}" srcset="${DS.thumb(p)} 600w, ${DS.full(p)} ${w}w" sizes="${o.sizes || "(max-width: 760px) 90vw, 40vw"}"` : `src="${DS.full(p)}"`;
    return `<img ${src} width="${w}" height="${h}" alt="${DS.esc(o.alt || "")}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${o.cls ? ` class="${o.cls}"` : ""}${o.attrs ? " " + o.attrs : ""}>`;
  };

  /* ---------- sound: tiny synthesised effects, off by default ---------- */
  DS.sound = {
    on: DS.store.get("ds-sound") === "on",
    ctx: null,
    ensure() {
      if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null; this.ctx = new AC(); }
      if (this.ctx.state === "suspended") this.ctx.resume();
      return this.ctx;
    },
    blip(freq, to, dur, vol, type = "sine", delay = 0) {
      const c = this.ensure(); if (!c) return;
      const t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(to, t + dur * 0.8);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.006); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + 0.02);
    },
    play(kind) {
      if (!this.on) return;
      try {
        if (kind === "tick") this.blip(1400, 820, 0.07, 0.045);
        else if (kind === "soft") this.blip(2100, 1800, 0.04, 0.018);
        else if (kind === "open") { this.blip(660, 660, 0.18, 0.035); this.blip(990, 990, 0.24, 0.025, "sine", 0.06); }
        else if (kind === "close") this.blip(880, 520, 0.12, 0.03);
        else if (kind === "page") this.whoosh();
        else if (kind === "turn") this.whoosh(0.22, 900, 3200, 0.03);
      } catch (e) {}
    },
    whoosh(dur = 0.55, f0 = 300, f1 = 2400, vol = 0.045) {
      const c = this.ensure(); if (!c) return;
      const n = Math.floor(c.sampleRate * dur), buf = c.createBuffer(1, n, c.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), t = c.currentTime;
      src.buffer = buf; f.type = "bandpass"; f.Q.value = 1.2;
      f.frequency.setValueAtTime(f0, t); f.frequency.exponentialRampToValueAtTime(f1, t + dur * 0.7);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      src.connect(f).connect(g).connect(c.destination); src.start(t);
    },
    toggle() {
      this.on = !this.on; DS.store.set("ds-sound", this.on ? "on" : "off");
      if (this.on) { this.ensure(); this.play("open"); }
      document.dispatchEvent(new CustomEvent("ds:sound", { detail: this.on }));
    },
  };
  /* a soft tick on any element marked data-sfx, and on main buttons */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-sfx], .btn, .chip-btn, .tab");
    if (el) DS.sound.play(el.dataset.sfx || "tick");
  });

  /* ---------- custom cursor (desktop only) ---------- */
  DS.cursor = {
    init() {
      if (!DS.fine.matches) return;
      const el = document.createElement("div");
      el.className = "cursor"; el.setAttribute("aria-hidden", "true");
      el.innerHTML = '<span class="c-dot"></span><span class="c-ring"><span class="c-label"></span></span>';
      document.body.appendChild(el);
      document.documentElement.classList.add("has-cursor");
      const ring = el.querySelector(".c-ring"), dot = el.querySelector(".c-dot"), label = el.querySelector(".c-label");
      let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, shown = false;
      addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        x = e.clientX; y = e.clientY;
        if (!shown) { shown = true; rx = x; ry = y; el.classList.add("on"); }
        dot.style.transform = `translate(${x}px,${y}px)`;
      }, { passive: true });
      document.addEventListener("pointerleave", () => { shown = false; el.classList.remove("on"); });
      document.addEventListener("pointerdown", () => el.classList.add("down"));
      document.addEventListener("pointerup", () => el.classList.remove("down"));
      document.addEventListener("pointerover", (e) => {
        const t = e.target.closest("[data-cursor]");
        const hov = e.target.closest("a, button, [role=button], input, label, [tabindex='0']");
        if (t) { label.textContent = t.dataset.cursor; el.classList.add("label"); el.classList.toggle("dark", !!t.closest(".is-dark")); }
        else el.classList.remove("label");
        el.classList.toggle("hover", !!hov && !t);
        el.classList.toggle("hide", !!e.target.closest("iframe, [data-nocursor]"));
      });
      const loop = () => {
        const k = DS.reduced.matches ? 1 : 0.2;
        rx += (x - rx) * k; ry += (y - ry) * k;
        ring.style.transform = `translate(${rx}px,${ry}px)`;
        requestAnimationFrame(loop);
      };
      loop();
    },
  };

  /* ---------- split headline words for the rise-in animation ---------- */
  DS.split = (root) => {
    DS.$$("[data-split]", root).forEach((h) => {
      if (h.dataset.splitDone) return;
      h.dataset.splitDone = "1";
      let i = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
              const w = document.createElement("span"); w.className = "w";
              const inner = document.createElement("span"); inner.className = "wi"; inner.style.setProperty("--i", i++);
              inner.textContent = part; w.appendChild(inner); frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
        });
      };
      walk(h);
    });
  };

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      io.unobserve(en.target);
      if (en.target.hasAttribute("data-count")) DS.countUp(en.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }) : null;
  DS.reveal = (root = document) => {
    DS.split(root);
    DS.$$("[data-reveal], [data-split], [data-count], .reveal-img", root).forEach((el) => {
      if (el.classList.contains("in")) return;
      if (io && !DS.reduced.matches) io.observe(el); else { el.classList.add("in"); }
    });
  };

  /* ---------- counters ---------- */
  DS.countUp = (el) => {
    const end = parseInt(el.dataset.count, 10); if (isNaN(end)) return;
    if (DS.reduced.matches) { el.textContent = end; return; }
    const t0 = performance.now(), dur = 1100;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * e); if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- parallax (data-speed) ---------- */
  let px = [];
  DS.parallax = (root = document) => { px = DS.$$("[data-speed]", root); tick(); };
  let ticking = false;
  const tick = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (DS.reduced.matches || innerWidth < 760) { px.forEach((el) => (el.style.transform = "")); return; }
      const vh = innerHeight;
      px.forEach((el) => {
        if (!el.isConnected || !el.offsetParent) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const c = r.top + r.height / 2 - vh / 2;
        el.style.transform = `translate3d(0, ${(-c * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
      });
    });
  };
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);

  /* ---------- magnetic buttons ---------- */
  DS.magnetic = (root = document) => {
    if (!DS.fine.matches || DS.reduced.matches) return;
    DS.$$("[data-magnetic]", root).forEach((el) => {
      if (el.dataset.magDone) return; el.dataset.magDone = "1";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) * 0.22, dy = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  };

  /* ---------- toast ---------- */
  let toastTimer;
  DS.toast = (msg) => {
    let t = DS.$(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.innerHTML = DS.icon("check") + "<span>" + DS.esc(msg) + "</span>";
    t.classList.add("on"); clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("on"), 2400);
  };

  /* ---------- copy text ---------- */
  DS.copy = async (text, msg) => {
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e2) {} ta.remove();
    }
    DS.toast(msg || "Copied");
  };

  /* ---------- focus trap for dialogs ---------- */
  DS.trap = (box, e) => {
    if (e.key !== "Tab") return;
    const f = DS.$$('a[href], button:not([disabled]), input, iframe, [tabindex]:not([tabindex="-1"])', box).filter((x) => x.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  DS.lock = (on) => document.documentElement.classList.toggle("locked", on);
})();
