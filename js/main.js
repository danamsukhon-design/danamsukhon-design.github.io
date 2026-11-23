/* main.js - starts the site: header, full-screen menu, routing between
   the home page and the work pages, page transitions, preloader,
   scroll progress, back-to-top and scroll-spy.

   Routing uses the address hash, so every page has its own link and
   refreshing works on GitHub Pages without any server setup:
     #home #about #skills #experience #honors #work #contact  -> home page sections
     #books #social #characters #ai #video #songs              -> work pages          */
(function () {
  const { $, $$, esc, icon, pad } = DS;
  const SITE = window.SITE, root = document.documentElement;
  const CATS = SITE.work.map((w) => w.id);
  const SECTIONS = ["home", "work", "about", "skills", "experience", "honors", "contact"];
  const NAV = [["home", "Home"], ["work", "Work"], ["about", "About"], ["skills", "Skills"], ["experience", "Experience"], ["contact", "Contact"]];
  const SPY = { home: "home", about: "about", skills: "skills", experience: "experience", honors: "experience", work: "work", contact: "contact" };
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  /* ---------- header ---------- */
  const hdr = $("#hdr");
  hdr.innerHTML = `
    <div class="hdr-in">
      <a class="brand" href="#home" aria-label="${esc(SITE.person.name)}, home">
        <span class="brand-mark">DS</span>
        <span class="brand-name">Dana <em>Sukhon</em></span>
      </a>
      <nav class="hdr-nav" aria-label="Main">
        ${NAV.map(([id, label]) => id !== "work" ? `<a href="#${id}" data-nav="${id}">${label}</a>` : `
        <div class="nav-drop">
          <a href="#work" data-nav="work" aria-haspopup="true">${label}<svg class="ic chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></a>
          <div class="drop">
            <span class="label">Open a discipline</span>
            ${SITE.work.map((w, k) => `<a href="#${w.id}" style="--c:${w.acc}" data-cat="${w.id}"><span class="dr-no">${pad(k + 1)}</span><span class="dr-t">${esc(w.title)}</span><span class="dr-n">${DS.count(w)} ${esc(w.unit)}</span></a>`).join("")}
          </div>
        </div>`).join("")}
      </nav>
      <div class="hdr-tools">
        <span class="where" aria-hidden="true"><i class="dot"></i><span class="where-t"></span></span>
        <button class="hbtn sound-btn" type="button" aria-pressed="false" data-sfx="none">
          <span class="snd-ic">${icon("sound-off")}</span><span class="hbtn-t">Sound</span>
        </button>
        <button class="hbtn menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-sfx="none">
          <span class="hbtn-t">Menu</span><span class="burger" aria-hidden="true"><i></i><i></i></span>
        </button>
      </div>
    </div>
    <nav class="cat-switch" aria-label="All disciplines">
      <div class="cs-in">
        <a class="cs-all" href="#work">${icon("grid")}<span>All work</span></a>
        ${SITE.work.map((w, k) => `<a href="#${w.id}" data-cat="${w.id}" style="--c:${w.acc}"><span class="cs-no">${pad(k + 1)}</span>${esc(w.title)}<b>${DS.count(w)}</b></a>`).join("")}
      </div>
    </nav>`;

  /* sound toggle */
  const sndBtn = $(".sound-btn", hdr);
  const paintSound = () => {
    sndBtn.setAttribute("aria-pressed", DS.sound.on);
    sndBtn.setAttribute("aria-label", DS.sound.on ? "Sound effects on. Turn off" : "Sound effects off. Turn on");
    $(".snd-ic", sndBtn).innerHTML = icon(DS.sound.on ? "sound-on" : "sound-off");
    $(".hbtn-t", sndBtn).textContent = DS.sound.on ? "Sound on" : "Sound off";
    sndBtn.classList.toggle("on", DS.sound.on);
  };
  sndBtn.addEventListener("click", () => DS.sound.toggle());
  document.addEventListener("ds:sound", paintSound);
  paintSound();

  /* hide the header when scrolling down, bring it back when scrolling up */
  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    hdr.classList.toggle("solid", y > 24);
    /* on work pages the header (with the discipline bar) always stays visible */
    if (current !== "home") hdr.classList.remove("tuck");
    else if (!root.classList.contains("locked")) hdr.classList.toggle("tuck", y > 240 && y > lastY + 4 ? true : y < lastY - 4 ? false : hdr.classList.contains("tuck"));
    lastY = y;
  }, { passive: true });
  hdr.addEventListener("focusin", () => hdr.classList.remove("tuck"));

  /* ---------- full-screen menu ---------- */
  const menu = document.createElement("div");
  menu.className = "menu"; menu.id = "menu"; menu.hidden = true;
  menu.setAttribute("role", "dialog"); menu.setAttribute("aria-modal", "true"); menu.setAttribute("aria-label", "Menu");
  const C = SITE.contact;
  menu.innerHTML = `
    <div class="menu-panel is-dark">
      <div class="wrap menu-in">
        <div class="menu-top">
          <span class="label">Menu</span>
          <button class="hbtn menu-close" type="button" data-sfx="close"><span class="hbtn-t">Close</span>${icon("x")}</button>
        </div>
        <div class="menu-grid">
          <div class="menu-work">
            <span class="label">The work</span>
            <ul>${SITE.work.map((w, k) => `<li style="--i:${k}"><a href="#${w.id}" style="--c:${w.acc}" data-cat="${w.id}"><i class="dot"></i><span class="mw-t">${esc(w.title)}</span><span class="mw-n">${DS.count(w)} ${esc(w.unit)}</span></a></li>`).join("")}</ul>
          </div>
          <nav class="menu-main" aria-label="Sections">
            <span class="label">The portfolio</span>
            <ol>${NAV.map(([id, label], k) => `<li style="--i:${k + 6}"><a href="#${id}" data-nav="${id}"><span class="mm-no">${pad(k + 1)}</span><span class="mm-t">${label}</span></a></li>`).join("")}</ol>
          </nav>
        </div>
        <div class="menu-foot">
          <a href="mailto:${esc(C.email)}">${icon("mail")}${esc(C.email)}</a>
          ${C.showPhone && C.phone ? `<a href="tel:${esc(C.phone)}">${icon("phone-call")}<span dir="ltr">${esc(C.phoneLabel)}</span></a>` : ""}
          ${C.behance ? `<a href="${esc(C.behance)}" target="_blank" rel="noopener">Behance ${icon("arrow-up-right")}</a>` : ""}
          ${C.linkedin ? `<a href="${esc(C.linkedin)}" target="_blank" rel="noopener">LinkedIn ${icon("arrow-up-right")}</a>` : ""}
          <span>${esc(SITE.person.location)}</span>
        </div>
      </div>
    </div>`;
  document.body.appendChild(menu);
  const menuBtn = $(".menu-btn", hdr);
  let menuOpen = false;
  const openMenu = () => {
    menuOpen = true; menu.hidden = false; DS.lock(true); hdr.classList.remove("tuck");
    menuBtn.setAttribute("aria-expanded", "true"); DS.sound.play("page");
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add("on")));
    setTimeout(() => $(".menu-close", menu).focus({ preventScroll: true }), 60);
  };
  const closeMenu = (then) => {
    if (!menuOpen) { if (then) then(); return; }
    menuOpen = false; menu.classList.remove("on"); menuBtn.setAttribute("aria-expanded", "false");
    setTimeout(() => { menu.hidden = true; DS.lock(false); if (then) then(); else menuBtn.focus({ preventScroll: true }); }, DS.reduced.matches ? 0 : 520);
  };
  menuBtn.addEventListener("click", () => (menuOpen ? closeMenu() : openMenu()));
  $(".menu-close", menu).addEventListener("click", () => closeMenu());
  menu.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); else DS.trap(menu, e); });
  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']"); if (!a) return;
    e.preventDefault();
    const h = a.getAttribute("href");
    closeMenu(() => { if (location.hash === h) route(true, true); else location.hash = h; });
  });

  /* ---------- footer ---------- */
  const foot = $("#foot");
  foot.innerHTML = `
    <div class="wrap foot-in">
      <span>© ${esc(SITE.person.year)} ${esc(SITE.person.name)}</span>
      <nav class="foot-dots" aria-label="Work">${SITE.work.map((w) => `<a href="#${w.id}" style="--c:${w.acc}" aria-label="${esc(w.title)}" data-tip="${esc(w.title)}"></a>`).join("")}</nav>
      <span>${esc(SITE.person.title)} · ${esc(SITE.person.location.split(",")[0])}</span>
    </div>`;

  /* ---------- views ---------- */
  const homeEl = $("#view-home"), catEl = $("#view-cat");
  homeEl.innerHTML = DS.views.home();
  DS.player.init(SITE.work.find((w) => w.id === "songs").sets[0].items);
  DS.mini.init();
  DS.cursor.init();

  const parse = () => {
    const h = decodeURIComponent(location.hash.slice(1));
    if (CATS.includes(h)) return { view: h };
    return { view: "home", section: SECTIONS.includes(h) ? h : null };
  };
  let current = null;
  const where = (txt, color) => { $(".where-t", hdr).textContent = txt; $(".where .dot", hdr).style.background = color || "var(--burgundy)"; };
  const setNav = (id) => $$("[data-nav]").forEach((a) => (a.dataset.nav === id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));

  const swap = (r) => {
    const cat = r.view !== "home";
    if (cat) {
      const k = CATS.indexOf(r.view), w = SITE.work[k];
      catEl.innerHTML = DS.views.cat(w, k);
      if (DS.init[w.id]) DS.init[w.id](catEl);
      root.style.setProperty("--page-acc", w.acc);
      document.title = `${w.title} · ${SITE.person.name}`;
      where(`${pad(k + 1)} — ${w.title}`, w.acc); setNav("work");
      $$("[data-cat]").forEach((a) => (a.dataset.cat === w.id ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
      const on = $(`.cat-switch [data-cat="${w.id}"]`, hdr);
      if (on) { const bar = $(".cs-in", hdr); bar.scrollTo({ left: on.offsetLeft - bar.clientWidth / 2 + on.clientWidth / 2, behavior: "instant" }); }
    } else {
      catEl.innerHTML = ""; root.style.removeProperty("--page-acc");
      $$("[data-cat]").forEach((a) => a.removeAttribute("aria-current"));
      document.title = `${SITE.person.name} · ${SITE.person.title}`;
    }
    homeEl.hidden = cat; catEl.hidden = !cat;
    root.dataset.view = r.view;
    root.classList.toggle("dark-page", cat && !!SITE.work[CATS.indexOf(r.view)].dark);
    current = r.view;
    const target = !cat && r.section && r.section !== "home" ? document.getElementById(r.section) : null;
    if (target) { target.scrollIntoView({ behavior: "instant", block: "start" }); }
    else scrollTo({ top: 0, behavior: "instant" });
    /* a link with data-jump-after="id" lands on that part of the new page */
    if (jumpAfter) { const el = document.getElementById(jumpAfter); jumpAfter = null; if (el) el.scrollIntoView({ behavior: "instant", block: "start" }); }
    const box = cat ? catEl : homeEl;
    DS.reveal(box); DS.parallax(document); DS.magnetic(box);
    document.dispatchEvent(new CustomEvent("ds:view", { detail: r.view }));
    spy();
  };

  const curtain = (title, color, mid) => new Promise((res) => {
    const c = $(".curtain");
    $(".cu-title", c).innerHTML = title;
    c.style.setProperty("--c", color || "var(--burgundy)");
    c.classList.remove("out"); c.classList.add("in");
    DS.sound.play("page");
    setTimeout(() => {
      mid();
      requestAnimationFrame(() => c.classList.add("out"));
      setTimeout(() => { c.classList.remove("in", "out"); res(); }, 760);
    }, 620);
  });

  function route(first, force) {
    const r = parse();
    if (r.view === current && !force) {
      if (r.view === "home" && r.section) { const el = document.getElementById(r.section); if (el) el.scrollIntoView({ behavior: DS.reduced.matches ? "auto" : "smooth" }); }
      return;
    }
    if (first || DS.reduced.matches) { swap(r); return; }
    const w = SITE.work[CATS.indexOf(r.view)];
    const title = w ? DS.ital(w.title) : r.section && r.section !== "home" ? `<em>${esc(NAV.find((n) => n[0] === SPY[r.section])[1])}</em>` : `Dana <em>Sukhon</em>`;
    curtain(title, w ? w.acc : null, () => swap(r));
  }
  addEventListener("hashchange", () => route());

  let jumpAfter = null;
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-jump-after]"); if (a) jumpAfter = a.dataset.jumpAfter; });
  /* in-page jumps (the chips at the top of work pages) */
  document.addEventListener("click", (e) => {
    const j = e.target.closest("[data-jump]"); if (!j) return;
    e.preventDefault();
    const el = document.getElementById(j.dataset.jump);
    if (el) el.scrollIntoView({ behavior: DS.reduced.matches ? "auto" : "smooth", block: "start" });
  });
  /* copy buttons */
  document.addEventListener("click", (e) => { const c = e.target.closest("[data-copy]"); if (c) DS.copy(c.dataset.copy, "Email copied"); });

  /* ---------- scroll: progress bar, back-to-top, timeline, scroll-spy ---------- */
  const bar = $(".progress i"), top = $(".totop"), ring = $(".totop circle");
  const spySections = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
  function spy() {
    if (current !== "home") return;
    const mid = innerHeight * 0.42; let on = "home";
    spySections.forEach((s) => { const r = s.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) on = s.id; });
    const navId = SPY[on] || "home";
    setNav(navId);
    const label = on === "honors" ? "Honors & events" : NAV.find((n) => n[0] === navId)[1];
    where(on === "home" ? "Portfolio 2026" : `${pad(SECTIONS.indexOf(on) + 1)} — ${label}`, "var(--burgundy)");
  }
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? scrollY / max : 0;
    bar.style.transform = `scaleX(${p})`;
    top.classList.toggle("on", scrollY > innerHeight * 0.8);
    ring.style.strokeDashoffset = (1 - p) * 113;
    $$("[data-progress]").forEach((el) => {
      if (!el.offsetParent) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--p", Math.max(0, Math.min(1, (innerHeight * 0.62 - r.top) / r.height)).toFixed(3));
    });
    spy();
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  top.addEventListener("click", () => { scrollTo({ top: 0, behavior: DS.reduced.matches ? "auto" : "smooth" }); $(".brand", hdr).focus({ preventScroll: true }); });

  /* ---------- start ---------- */
  route(true);
  onScroll();

  /* preloader: once per visit, skipped for reduced motion */
  const pre = $(".preloader");
  let seen = false; try { seen = sessionStorage.getItem("ds-seen") === "1"; sessionStorage.setItem("ds-seen", "1"); } catch (e) {}
  const ready = () => root.classList.add("ready");
  if (!pre || seen || DS.reduced.matches) { if (pre) pre.remove(); ready(); }
  else {
    pre.classList.add("on");
    const cnt = $(".pl-count", pre), t0 = performance.now();
    let p = 0, done = false;
    const tickP = () => { if (done) return; p = Math.min(96, p + (100 - p) * 0.06); cnt.textContent = Math.round(p) + "%"; requestAnimationFrame(tickP); };
    tickP();
    const min = new Promise((r) => setTimeout(r, 1300));
    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([Promise.all([min, fonts]), new Promise((r) => setTimeout(r, 3200))]).then(() => {
      done = true; cnt.textContent = "100%";
      setTimeout(() => { pre.classList.add("done"); ready(); setTimeout(() => pre.remove(), 1000); }, 200);
    });
  }
})();
