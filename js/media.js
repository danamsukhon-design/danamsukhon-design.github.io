/* media.js - the image lightbox, the Google Drive viewer, and the song player. */
(function () {
  const { $, $$, esc, icon, pad } = DS;

  /* =====================================================================
     LIGHTBOX  -  DS.lightbox.open(items, index, originElement, {label})
     items: [{src: "folder/file.jpg", alt}]   src is a key of IMG_DIMS
     ===================================================================== */
  const LB = {
    el: null, items: [], i: 0, origin: null, label: "", busy: false, lastFocus: null,
    build() {
      const el = document.createElement("div");
      el.className = "lb is-dark"; el.hidden = true;
      el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true"); el.setAttribute("aria-label", "Image viewer");
      el.innerHTML = `
        <div class="lb-bg" data-close></div>
        <div class="lb-top">
          <span class="lb-count" aria-live="polite"></span>
          <span class="lb-set"></span>
          <button class="lb-btn lb-close" data-close aria-label="Close viewer (Esc)">${icon("x")}</button>
        </div>
        <img class="lb-img" alt="" draggable="false">
        <button class="lb-btn lb-prev" aria-label="Previous image">${icon("arrow-left")}</button>
        <button class="lb-btn lb-next" aria-label="Next image">${icon("arrow-right")}</button>
        <p class="lb-cap"></p>`;
      document.body.appendChild(el);
      this.el = el; this.img = $(".lb-img", el);
      el.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) this.close(); });
      $(".lb-prev", el).addEventListener("click", () => this.go(-1));
      $(".lb-next", el).addEventListener("click", () => this.go(1));
      el.addEventListener("keydown", (e) => {
        if (e.key === "Escape") this.close();
        else if (e.key === "ArrowRight") this.go(1);
        else if (e.key === "ArrowLeft") this.go(-1);
        else DS.trap(el, e);
      });
      let sx = null, sy = 0;
      el.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") { sx = e.clientX; sy = e.clientY; } });
      el.addEventListener("pointerup", (e) => {
        if (sx == null) return;
        const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) this.go(dx < 0 ? 1 : -1);
        else if (dy > 90) this.close();
      });
      addEventListener("resize", () => { if (!this.el.hidden) this.place(); });
    },
    /* the box the image should fill, keeping its shape */
    box(src) {
      const r = DS.ratio(src), vw = innerWidth, vh = innerHeight;
      const padX = vw < 760 ? 12 : 120, top = vw < 760 ? 64 : 76, bottom = vw < 760 ? 92 : 84;
      let w = Math.min(vw - padX * 2, (vh - top - bottom) * r), h = w / r;
      return { w, h, x: (vw - w) / 2, y: top + (vh - top - bottom - h) / 2 };
    },
    place() {
      const b = this.box(this.items[this.i].src);
      Object.assign(this.img.style, { width: b.w + "px", height: b.h + "px", left: b.x + "px", top: b.y + "px" });
      return b;
    },
    show() {
      const it = this.items[this.i];
      this.img.alt = it.alt || "";
      $(".lb-count", this.el).textContent = `${pad(this.i + 1)} / ${pad(this.items.length)}`;
      $(".lb-set", this.el).textContent = this.label || "";
      $(".lb-cap", this.el).innerHTML = DS.t(it.alt || "");
      const many = this.items.length > 1;
      $(".lb-prev", this.el).hidden = !many; $(".lb-next", this.el).hidden = !many;
      /* show the grid copy at once (already loaded), then swap in the full file */
      const full = DS.full(it.src);
      this.img.src = DS.dims(it.src)[0] > 600 ? DS.thumb(it.src) : full;
      const pre = new Image();
      pre.onload = () => { if (this.items[this.i] === it) this.img.src = full; };
      pre.src = full;
      [1, -1].forEach((d) => { const n = this.items[(this.i + d + this.items.length) % this.items.length]; if (n) new Image().src = DS.full(n.src); });
      this.place();
    },
    open(items, i = 0, origin = null, opts = {}) {
      if (!this.el) this.build();
      this.token = null;   /* cancels a close that is still animating */
      this.img.getAnimations().forEach((a) => a.cancel());
      this.items = items; this.i = i; this.origin = origin; this.label = opts.label || "";
      this.lastFocus = document.activeElement;
      this.el.hidden = false; DS.lock(true);
      this.show();
      DS.sound.play("open");
      const target = this.place();
      const o = this.originRect();
      if (o && !DS.reduced.matches) {
        const s = o.width / target.w;
        this.img.animate([
          { transform: `translate(${o.left - target.x}px, ${o.top - target.y}px) scale(${s})`, opacity: 0.85, borderRadius: "8px" },
          { transform: "none", opacity: 1, borderRadius: "2px" },
        ], { duration: 560, easing: "cubic-bezier(.2,.75,.2,1)" });
      }
      this.el.classList.remove("out"); requestAnimationFrame(() => this.el.classList.add("on"));
      setTimeout(() => $(".lb-close", this.el).focus({ preventScroll: true }), 30);
    },
    originRect() {
      const o = this.origin && (this.origin.querySelector ? this.origin.querySelector("img") || this.origin : this.origin);
      if (!o || !o.getBoundingClientRect) return null;
      const r = o.getBoundingClientRect();
      if (r.width < 4 || r.bottom < 0 || r.top > innerHeight) return null;
      return r;
    },
    go(d) {
      if (this.items.length < 2 || this.busy) return;
      this.busy = true; this.origin = null; DS.sound.play("soft");
      const out = DS.reduced.matches ? null : this.img.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translateX(${-d * 40}px)` }], { duration: 160, easing: "ease-in" });
      const next = () => {
        this.i = (this.i + d + this.items.length) % this.items.length;
        this.show();
        if (!DS.reduced.matches) this.img.animate([{ opacity: 0, transform: `translateX(${d * 40}px)` }, { opacity: 1, transform: "none" }], { duration: 260, easing: "cubic-bezier(.2,.7,.2,1)" });
        this.busy = false;
      };
      out ? (out.onfinish = next) : next();
    },
    close() {
      if (!this.el || this.el.hidden) return;
      DS.sound.play("close");
      const token = (this.token = {});
      const done = () => { if (this.token !== token) return; this.el.hidden = true; this.el.classList.remove("on", "out"); DS.lock(false); if (this.lastFocus) this.lastFocus.focus({ preventScroll: true }); };
      this.el.classList.add("out");
      const o = this.originRect();
      if (o && !DS.reduced.matches) {
        const b = this.box(this.items[this.i].src), s = o.width / b.w;
        const a = this.img.animate([{ transform: "none", opacity: 1 }, { transform: `translate(${o.left - b.x}px, ${o.top - b.y}px) scale(${s})`, opacity: 0.6 }], { duration: 420, easing: "cubic-bezier(.4,0,.2,1)" });
        a.onfinish = done;
      } else setTimeout(done, DS.reduced.matches ? 0 : 260);
    },
  };
  DS.lightbox = LB;

  /* any element with data-lb="groupId" and data-lb-i opens its group */
  DS.groups = {};
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-lb]");
    if (!b) return;
    e.preventDefault();
    const g = DS.groups[b.dataset.lb];
    if (g) LB.open(g.items, +b.dataset.lbI || 0, b, { label: g.label });
  });

  /* =====================================================================
     DRIVE VIEWER  -  Google Drive's own player in a dialog (videos, and songs
     when direct streaming is blocked). DS.drive.open({drive, title, kind, r})
     ===================================================================== */
  const DV = {
    el: null, lastFocus: null,
    build() {
      const el = document.createElement("div");
      el.className = "dv is-dark"; el.hidden = true;
      el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
      el.innerHTML = `
        <div class="dv-bg" data-close></div>
        <div class="dv-box">
          <div class="dv-head">
            <div><span class="dv-kind"></span><h3 class="dv-title"></h3></div>
            <div class="dv-actions">
              <a class="dv-open" target="_blank" rel="noopener">${icon("drive")}<span>Open on Google Drive</span></a>
              <button class="lb-btn dv-close" data-close aria-label="Close">${icon("x")}</button>
            </div>
          </div>
          <div class="dv-frame"></div>
          <p class="dv-note"></p>
        </div>`;
      document.body.appendChild(el);
      this.el = el;
      el.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) this.close(); });
      el.addEventListener("keydown", (e) => { if (e.key === "Escape") this.close(); else DS.trap(el, e); });
    },
    open(it, note = "") {
      if (!this.el) this.build();
      this.lastFocus = document.activeElement;
      const r = it.r || 16 / 9;
      $(".dv-kind", this.el).textContent = it.kind || "";
      $(".dv-title", this.el).innerHTML = DS.t(it.title || "");
      this.el.setAttribute("aria-label", it.title || "Player");
      $(".dv-open", this.el).href = `https://drive.google.com/file/d/${it.drive}/view`;
      $(".dv-note", this.el).textContent = note;
      const fr = $(".dv-frame", this.el);
      fr.style.setProperty("--r", r);
      fr.classList.toggle("audio", !!it.audio);
      fr.innerHTML = `<iframe src="https://drive.google.com/file/d/${encodeURIComponent(it.drive)}/preview" title="${esc(it.title || "Player")}" allow="autoplay; fullscreen" allowfullscreen loading="lazy"></iframe>`;
      this.el.hidden = false; DS.lock(true); DS.sound.play("open");
      requestAnimationFrame(() => this.el.classList.add("on"));
      setTimeout(() => $(".dv-close", this.el).focus({ preventScroll: true }), 30);
    },
    close() {
      if (!this.el || this.el.hidden) return;
      this.el.classList.remove("on"); DS.sound.play("close");
      setTimeout(() => { this.el.hidden = true; $(".dv-frame", this.el).innerHTML = ""; DS.lock(false); if (this.lastFocus) this.lastFocus.focus({ preventScroll: true }); }, DS.reduced.matches ? 0 : 250);
    },
  };
  DS.drive = DV;

  /* =====================================================================
     SONG PLAYER  -  one <audio> for the whole site, so a song keeps playing
     while visitors move between pages. Views subscribe to its state.
     ===================================================================== */
  const PL = {
    audio: new Audio(), list: [], i: -1, playing: false, subs: new Set(), durations: {},
    init(list) {
      this.list = list;
      const a = this.audio; a.preload = "none";
      a.addEventListener("timeupdate", () => this.emit());
      a.addEventListener("loadedmetadata", () => { const it = this.list[this.i]; if (it && isFinite(a.duration)) this.durations[it.drive] = a.duration; this.emit(); });
      a.addEventListener("play", () => { this.playing = true; this.emit(); });
      a.addEventListener("pause", () => { this.playing = false; this.emit(); });
      a.addEventListener("ended", () => { if (this.i < this.list.length - 1) this.play(this.i + 1); else { this.playing = false; this.emit(); } });
      a.addEventListener("error", () => this.fail());
    },
    src(it) { return it.file ? it.file : `https://drive.google.com/uc?export=download&id=${encodeURIComponent(it.drive)}`; },
    play(i) {
      if (i === this.i && this.audio.src) { this.toggle(); return; }
      const it = this.list[i]; if (!it) return;
      this.i = i;
      if (it.failed) { this.emit(); this.viaDrive(it); return; }
      this.audio.src = this.src(it);
      this.audio.play().catch((err) => { if (err && err.name !== "AbortError") this.fail(); });
      this.emit();
    },
    toggle() { if (this.i < 0) return this.play(0); this.audio.paused ? this.audio.play().catch(() => this.fail()) : this.audio.pause(); },
    step(d) { const n = this.i + d; if (n >= 0 && n < this.list.length) this.play(n); },
    seek(f) { const a = this.audio; if (isFinite(a.duration)) a.currentTime = f * a.duration; },
    stop() { this.audio.pause(); this.audio.removeAttribute("src"); this.audio.load(); this.i = -1; this.playing = false; this.emit(); },
    /* a song without its own file streams from Drive; if Drive refuses, open Drive's player */
    fail() {
      const it = this.list[this.i]; if (!it || it.failed) return;
      this.playing = false;
      if (it.file) { this.emit(); DS.toast("This song couldn’t play. Please try again."); return; }
      it.failed = true; this.emit();
      this.viaDrive(it);
    },
    viaDrive(it) { DS.drive.open({ drive: it.drive, title: it.title, kind: "Song", r: 16 / 5, audio: true }, "Playing through Google Drive’s own player."); },
    state() {
      const a = this.audio, it = this.list[this.i];
      return { i: this.i, item: it, playing: this.playing, t: a.currentTime || 0, d: (it && this.durations[it.drive]) || (isFinite(a.duration) ? a.duration : 0) };
    },
    on(fn) { this.subs.add(fn); fn(this.state()); return () => this.subs.delete(fn); },
    emit() { const s = this.state(); this.subs.forEach((fn) => fn(s)); },
    /* read each song's length in the background (quietly skipped if blocked) */
    probe(cb) {
      let k = 0;
      const next = () => {
        const it = this.list[k++]; if (!it) return;
        if (this.durations[it.drive] || it.failed) { cb(it); return next(); }
        const a = new Audio(); a.preload = "metadata";
        const done = () => { a.removeAttribute("src"); a.load(); next(); };
        a.addEventListener("loadedmetadata", () => { if (isFinite(a.duration)) this.durations[it.drive] = a.duration; cb(it); done(); }, { once: true });
        a.addEventListener("error", done, { once: true });
        setTimeout(() => { if (a.readyState < 1) done(); }, 8000);
        a.src = this.src(it);
      };
      next();
    },
  };
  DS.player = PL;
  DS.time = (s) => (!s || !isFinite(s) ? "–:––" : `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`);

  /* ---------- the floating mini player (shows on other pages while a song plays) ---------- */
  DS.mini = {
    init() {
      const el = document.createElement("div");
      el.className = "mini"; el.hidden = true; el.setAttribute("aria-label", "Now playing");
      el.innerHTML = `
        <a class="mini-cover" href="#songs" aria-label="Go to Songs"></a>
        <div class="mini-meta"><span class="mini-k">Now playing</span><b class="mini-t"></b></div>
        <button class="mini-btn mini-play" aria-label="Play">${icon("play")}</button>
        <button class="mini-btn mini-x" aria-label="Stop and close">${icon("x")}</button>
        <span class="mini-bar"><i></i></span>`;
      document.body.appendChild(el);
      $(".mini-play", el).addEventListener("click", () => PL.toggle());
      $(".mini-x", el).addEventListener("click", () => PL.stop());
      PL.on((s) => {
        const show = s.i >= 0 && document.documentElement.dataset.view !== "songs" && !(s.item && s.item.failed);
        el.hidden = !show; if (!s.item) return;
        $(".mini-t", el).innerHTML = DS.t(s.item.title);
        $(".mini-cover", el).style.cssText = DS.songVars(s.i);
        $(".mini-cover", el).innerHTML = `<span>${pad(s.i + 1)}</span>`;
        $(".mini-play", el).innerHTML = icon(s.playing ? "pause" : "play");
        $(".mini-play", el).setAttribute("aria-label", s.playing ? "Pause" : "Play");
        $(".mini-bar i", el).style.transform = `scaleX(${s.d ? s.t / s.d : 0})`;
        el.classList.toggle("playing", s.playing);
      });
      document.addEventListener("ds:view", () => PL.emit());
    },
  };

  /* colours of each song's designed cover (warm, from the site palette) */
  const SONG_COLORS = [
    ["#702C3A", "#E7C9C4"], ["#6E7550", "#EFE5DA"], ["#B0606C", "#FBEDE8"], ["#A8742A", "#F7EAD3"],
    ["#5A2F48", "#D9B9B5"], ["#B5603F", "#F6DDCF"], ["#421D29", "#CDBDAA"], ["#8C9474", "#F7F1E8"],
    ["#7E6B5C", "#F2E9DE"], ["#C48E88", "#421D29"], ["#4F5A3C", "#E9DFC9"],
  ];
  DS.songVars = (i) => { const c = SONG_COLORS[i % SONG_COLORS.length]; return `--s1:${c[0]};--s2:${c[1]}`; };
})();
