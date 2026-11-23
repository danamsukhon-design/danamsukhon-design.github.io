/* views.js - builds every page from window.SITE (data.js).
   DS.views.home()      the home page (hero, about, skills, experience, honors, work, contact)
   DS.views.cat(w, i)   one work category page; each category has its own interface
   DS.init.<id>(root)   wires up that interface after it is on the page            */
(function () {
  const { $, $$, esc, icon, pad, t } = DS;
  const S = () => window.SITE;
  const count = (w) => w.sets.reduce((a, s) => a + s.items.length, 0) + (w.prompts ? w.prompts.length : 0);
  DS.count = count;
  /* last word in italics: "Book <em>Design</em>" */
  const ital = (s) => { const p = esc(s).split(" "); return p.length > 1 ? p.slice(0, -1).join(" ") + " <em>" + p[p.length - 1] + "</em>" : "<em>" + p[0] + "</em>"; };
  DS.ital = ital;
  const letters = (s, k0 = 0) => s.split("").map((c, k) => `<span class="lt" style="--k:${k + k0}">${esc(c)}</span>`).join("");
  const head = (no, label, title, sub) => `
    <header class="sec-head">
      <span class="sec-no" data-reveal><span>${no}</span>${esc(label)}</span>
      <h2 class="sec-title" data-split>${title}</h2>
      ${sub ? `<p class="sec-sub" data-reveal>${sub}</p>` : ""}
    </header>`;
  const sparkle = '<svg class="spk" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.6 5.6 4.9 9.9 10.5 10.5-5.6.6-9.9 4.9-10.5 10.5C11.4 16.9 7.1 12.6 1.5 12 7.1 11.4 11.4 7.1 12 1.5z"/></svg>';

  const NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

  DS.views = {};
  DS.init = {};

  /* =====================================================================
     HOME
     ===================================================================== */
  DS.views.home = () => {
    const s = S(), P = s.person, A = s.about, K = s.skills, C = s.contact;
    const total = s.work.reduce((a, w) => a + count(w), 0);

    const hero = `
    <section class="hero" id="home" aria-label="Introduction">
      <div class="wrap">
        <div class="hero-top">
          <span class="label">Portfolio · ${esc(P.year)}</span>
          <span class="label hide-sm">Journalism × Graphic Design</span>
          <span class="label">${esc(P.location)}</span>
        </div>
        <h1 class="giant" aria-label="${esc(P.name)}">
          <span class="g-line g1" aria-hidden="true">${letters("Dana")}</span>
          <span class="g-line g2" aria-hidden="true"><em>${letters("Sukhon", 4)}</em><span class="g-dot lt" style="--k:10">.</span></span>
        </h1>
        <div class="hero-stage">
          <div class="who">
            <p class="role">Journalist <em>&amp;</em> Graphic Designer</p>
            <p class="statement">“${esc(P.statement)}”</p>
            <p class="intro">${esc(P.intro)}</p>
            <div class="ctas">
              <a class="btn btn-primary" href="#work" data-magnetic><span>Explore my work</span>${icon("arrow-right")}</a>
              <a class="link-u" href="#about">About me</a>
            </div>
          </div>
          <figure class="portrait">
            <div class="arch" data-speed="0.05">${DS.img(P.portrait, { alt: "Portrait of " + P.name, eager: true, sizes: "(max-width: 760px) 70vw, 26vw" })}</div>
            <div class="rot-badge" aria-hidden="true">
              <svg viewBox="0 0 120 120"><defs><path id="badge-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs>
                <text><textPath href="#badge-circle">Storyteller · Designer · Journalist · </textPath></text></svg>
              <span class="rb-core">${sparkle}</span>
            </div>
          </figure>
          <nav class="hero-index" aria-label="The work: open a discipline">
            <div class="hi-head"><span class="label">The work</span><span class="label">${total} pieces</span></div>
            ${s.work.map((w, k) => `<a href="#${w.id}" style="--c:${w.acc}"><span class="hi-no">${pad(k + 1)}</span><span class="hi-t">${esc(w.title)}</span><span class="hi-n">${count(w)} ${esc(w.unit)}</span>${icon("arrow-right", "hi-go")}</a>`).join("")}
          </nav>
        </div>
      </div>
    </section>`;

    const words = ["Journalism", "Newspaper design", "Articles", "Editorial design", "Book layout", "Social media", "Posters", "Kufi lettering", "Character design", "Character style", "AI imagery", "Video", "Voice-over", "Proofreading"];
    const mq = words.map((w, k) => `<span class="${k % 2 ? "it" : ""}">${w}</span>${sparkle}`).join("");
    const marquee = `<div class="marquee" aria-hidden="true"><div class="mq-track">${mq}${mq}</div></div>`;

    const about = `
    <section class="sec about" id="about" aria-label="About">
      <div class="wrap">
        ${head("03", "About", "A storyteller<br>who <em>designs.</em>")}
        <div class="bento">
          <article class="tile t-story" data-reveal>
            <span class="label">${icon("news")} Who I am</span>
            <p class="t-lead">${esc(A.lead)}</p>
            ${A.body.map((p) => `<p>${esc(p)}</p>`).join("")}
            <p class="sign">${esc(P.name)}</p>
          </article>
          <article class="tile t-quote" data-reveal style="--d:1">
            ${icon("quote", "q-ic")}
            <blockquote>${esc(P.statement)}</blockquote>
            <span class="label">My philosophy</span>
          </article>
          <article class="tile t-edu" data-reveal style="--d:2">
            <span class="label">${icon("cap")} Education</span>
            <ul>${A.education.map((e) => `<li><b>${esc(e.degree)}</b><span>${esc(e.school)}</span></li>`).join("")}</ul>
          </article>
          <article class="tile t-loc" data-reveal>
            <span class="label">${icon("pin")} Based in</span>
            <p class="big">${esc(P.location.split(",")[0])},<br><em>${esc((P.location.split(",")[1] || "").trim())}</em></p>
          </article>
          <article class="tile t-look" data-reveal style="--d:1">
            <span class="label">${icon("users")} Looking for</span>
            <p class="t-lead">${esc(A.looking)}</p>
            <div class="values">${["Creativity", "Integrity", "Collaboration", "Meaningful communication"].map((v) => `<span>${v}</span>`).join("")}</div>
            <a class="link-u" href="#contact">Let’s talk ${icon("arrow-right")}</a>
          </article>
        </div>
      </div>
    </section>`;

    const skills = `
    <section class="sec skills" id="skills" aria-label="Skills and tools">
      <div class="wrap">
        ${head("04", "Skills & tools", "The <em>toolkit.</em>")}
        <div class="skills-grid">
          <article class="card k-sw" data-reveal>
            <header><span class="k-no">01</span><h3>Software</h3></header>
            <ul class="apps">${K.software.map((a, k) => `<li class="app" style="--bg:${a.bg};--fg:${a.fg};--i:${k}"><span class="app-ic">${a.short}</span><span class="app-nm">${esc(a.name.replace("Adobe ", ""))}</span></li>`).join("")}</ul>
          </article>
          <article class="card k-ai" data-reveal style="--d:1">
            <header><span class="k-no">02</span><h3>AI tools</h3></header>
            <ul class="ai-chips">${K.ai.map((a) => `<li><span class="mono-ic">${esc(a[0])}</span>${esc(a)}</li>`).join("")}</ul>
          </article>
          <article class="card k-do" data-reveal>
            <header><span class="k-no">03</span><h3>What I do</h3></header>
            <ul class="do-list">${K.services.map((x) => `<li>${icon(x.icon, "draw")}<span>${esc(x.name)}</span></li>`).join("")}</ul>
          </article>
          <article class="card k-ss" data-reveal style="--d:1">
            <header><span class="k-no">04</span><h3>Soft skills</h3></header>
            <ul class="soft-list">${K.soft.map((x) => `<li>${icon(x.icon, "draw")}<span>${esc(x.name)}</span></li>`).join("")}</ul>
          </article>
        </div>
      </div>
    </section>`;

    const exp = `
    <section class="sec exp" id="experience" aria-label="Experience">
      <div class="wrap">
        ${head("05", "Experience", "Where I’ve <em>worked.</em>")}
        <ol class="timeline" data-progress>
          <span class="tl-line" aria-hidden="true"><i></i></span>
          ${s.experience.map((e, k) => `
          <li class="tl-item${e.to === "Present" ? " now" : ""}" data-reveal>
            <div class="tl-date">${e.from ? `<span>${esc(e.from)}</span><span class="to">— ${esc(e.to)}</span>` : `<span class="to">Independent</span>`}</div>
            <span class="tl-dot" aria-hidden="true"></span>
            <div class="tl-body">
              <h3>${esc(e.org)}</h3>
              <p class="tl-role">${esc(e.role)}</p>
              ${e.points.length ? `<ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
              ${e.to === "Present" ? `<span class="now-tag"><i></i>Now</span>` : ""}
            </div>
          </li>`).join("")}
        </ol>
      </div>
    </section>`;

    const honors = `
    <section class="sec honors" id="honors" aria-label="Honors and events">
      <div class="wrap">
        ${head("06", "Honors & events", "Recognition &amp; <em>community.</em>")}
        <div class="honor-grid">
          ${s.honors.map((h, k) => `
          <article class="honor" data-reveal style="--d:${k % 2}">
            <span class="h-no">${pad(k + 1)}</span>
            <span class="h-ic">${icon(h.icon, "draw")}</span>
            <h3>${esc(h.title)}</h3>
            <p>${esc(h.text)}</p>
          </article>`).join("")}
        </div>
      </div>
    </section>`;

    const work = `
    <section class="sec work" id="work" aria-label="Selected work">
      <div class="wrap">
        ${head("02", "Selected work", "Let the work <em>speak.</em>", `${total} pieces across ${NUM[s.work.length] || s.work.length} disciplines. Pick one to open it.`)}
        <div class="doors">${(() => { const lay = doorLayouts(s.work); return s.work.map((w, k) => door(w, k, lay[k])).join(""); })()}</div>
      </div>
    </section>`;

    const links = [];
    links.push(`<li><a href="${esc(C.behance)}" target="_blank" rel="noopener" data-cursor="Open"><span class="cl-k">Behance</span><span class="cl-v">${esc(C.behance.replace(/^https?:\/\/(www\.)?/, ""))}</span>${icon("arrow-up-right")}</a></li>`);
    if (C.linkedin) links.push(`<li><a href="${esc(C.linkedin)}" target="_blank" rel="noopener" data-cursor="Open"><span class="cl-k">LinkedIn</span><span class="cl-v">Dana Sukhon</span>${icon("arrow-up-right")}</a></li>`);
    const phoneOn = C.showPhone && C.phone;
    const contact = `
    <section class="sec contact" id="contact" aria-label="Contact">
      <div class="wrap">
        <span class="sec-no" data-reveal><span>07</span>Contact</span>
        <h2 class="say" data-split>Let’s create something <em>meaningful.</em></h2>
        <div class="contact-grid">
          <div class="c-main" data-reveal>
            <a class="c-email" href="mailto:${esc(C.email)}" data-cursor="Write">${esc(C.email)}</a>
            ${phoneOn ? `<a class="c-phone" href="tel:${esc(C.phone)}" data-cursor="Call">${icon("phone-call")}<span dir="ltr">${esc(C.phoneLabel)}</span></a>` : ""}
            <div class="c-actions">
              <a class="btn btn-primary" href="mailto:${esc(C.email)}" data-magnetic><span>Email me</span>${icon("arrow-up-right")}</a>
              ${phoneOn ? `<a class="btn btn-ghost" href="tel:${esc(C.phone)}">${icon("phone-call")}<span>Call me</span></a>` : ""}
              <button class="btn btn-ghost" type="button" data-copy="${esc(C.email)}">${icon("copy")}<span>Copy email</span></button>
            </div>
          </div>
          <ul class="c-links" data-reveal style="--d:1">
            ${links.join("")}
            <li class="c-loc">${icon("pin")}<span>Based in ${esc(P.location)}</span></li>
          </ul>
        </div>
        <div class="c-badge" aria-hidden="true">
          <svg viewBox="0 0 120 120"><defs><path id="talk-circle" d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"/></defs>
          <text><textPath href="#talk-circle">Let’s talk · Let’s talk · Let’s talk · </textPath></text></svg>
          <span>${icon("mail")}</span>
        </div>
      </div>
    </section>`;

    /* the work comes first: it is what most visitors came for */
    return hero + marquee + work + about + skills + exp + honors + contact;
  };

  /* ---------- one door per discipline on the home page ---------- */
  /* Home grid layout: covers pair up as wide|narrow, then narrow|wide (slots s0..s3).
     A category with wide: true takes a full row. The pairing restarts after a full row,
     and a cover left without a partner also takes a full row, so the grid never has gaps. */
  function doorLayouts(work) {
    const lay = []; let run = [];
    const flush = () => {
      run.forEach((k, j) => (lay[k] = "s" + (j % 4)));
      if (run.length % 2) lay[run[run.length - 1]] = "wide";
      run = [];
    };
    work.forEach((w, k) => { if (w.wide) { flush(); lay[k] = "wide"; } else run.push(k); });
    flush();
    return lay;
  }
  function door(w, k, lay) {
    const n = count(w);
    return `
    <a class="door door-${w.id} lay-${lay}" href="#${w.id}" style="--acc:${w.acc}" data-cursor="Explore" data-reveal>
      <div class="door-media">${cover(w)}</div>
      <div class="door-info">
        <span class="door-no">${pad(k + 1)}</span>
        <div class="door-txt"><h3>${ital(w.title)}</h3><p>${esc(w.short)}</p></div>
        <span class="door-count"><b>${n}</b>${esc(w.unit)}</span>
        <span class="door-go" aria-hidden="true"><span>Open</span>${icon("arrow-up-right")}</span>
      </div>
    </a>`;
  }
  function cover(w) {
    const find = (src) => { for (const s of w.sets) for (const it of s.items) if (it.src === src) return it; return { alt: "" }; };
    const im = (src, sizes) => DS.img(src, { alt: find(src).alt, sizes: sizes || "(max-width: 760px) 90vw, 45vw" });
    switch (w.id) {
      case "books": return `<div class="cv cv-book"><div class="cv-spread"><span class="cv-pg l">${im(w.cover[0], "(max-width:760px) 45vw, 25vw")}</span><span class="cv-pg r">${im(w.cover[1], "(max-width:760px) 45vw, 25vw")}</span></div></div>`;
      case "social": return `<div class="cv cv-social"><div class="cv-phone"><span class="cv-notch"></span>${im(w.cover, "(max-width:760px) 60vw, 20vw")}</div><span class="cv-like">${icon("heart")}</span></div>`;
      case "charstyle": return `<div class="cv cv-cast">${w.sets[0].items.map((it, j) => `<span class="cv-fig f${j}" style="--fa:${(it.turn.fw / (it.turn.y[1] - it.turn.y[0])).toFixed(4)}"><img src="${DS.full(it.front)}" alt="" loading="lazy" decoding="async"></span>`).join("")}<span class="cv-floor"></span></div>`;
      case "writing": {
        const its = w.sets[0].items.filter((x) => x.title).slice(0, 3);
        return `<div class="cv cv-writing">${its.map((it, j) => `<span class="cv-clip cw${j}"><small lang="ar" dir="rtl">${esc(it.outlet)}</small><b lang="ar" dir="rtl">${esc(it.title)}</b><i></i><i></i><i></i><i></i></span>`).join("")}<span class="cv-pen">${icon("pen")}</span></div>`;
      }
      case "newspaper": return `<div class="cv cv-news">${w.cover.map((src, j) => `<span class="cv-np np${j}">${im(src, "(max-width:760px) 45vw, 22vw")}</span>`).join("")}</div>`;
      case "posters": return `<div class="cv cv-posters">${w.cover.map((src, j) => `<span class="cv-pst pf${j}">${im(src, "(max-width:760px) 40vw, 14vw")}</span>`).join("")}</div>`;
      case "kufi": {
        const items = w.sets[0].items;
        return `<div class="cv cv-kufi">${items.slice(0, 2).map((it, j) => `<span class="cv-poster k${j}">${DS.img(it.src, { alt: it.alt, sizes: "(max-width:760px) 40vw, 18vw" })}</span>`).join("")}</div>`;
      }
      case "characters": return `<div class="cv cv-char"><span class="cv-arch"></span>${im(w.cover, "(max-width:760px) 70vw, 28vw")}</div>`;
      case "ai": return `<div class="cv cv-ai">${im(w.cover, "(max-width:760px) 90vw, 60vw")}<span class="cv-grain"></span></div>`;
      case "video": return `<div class="cv cv-video">${im(w.cover, "(max-width:760px) 90vw, 50vw")}<span class="cv-play">${icon("play")}</span><span class="cv-sprockets"></span></div>`;
      case "songs": {
        const s = w.sets[0];
        return `<div class="cv cv-songs"><div class="cv-sleeve"><span class="cv-sl-k">${s.items.length} tracks</span><b>Songs</b><span class="cv-sl-l">English · العربية</span></div><div class="cv-vinyl"><span></span></div><div class="cv-eq"><i></i><i></i><i></i><i></i><i></i></div></div>`;
      }
    }
    return "";
  }

  /* =====================================================================
     CATEGORY PAGE
     ===================================================================== */
  DS.views.cat = (w, k) => {
    const all = S().work, n = count(w);
    const next = all[(k + 1) % all.length], prev = all[(k - 1 + all.length) % all.length];
    const facts = [[n, w.unit]];
    if (w.id === "books") facts.push([w.sets.length, "books"]);
    if (w.id === "social") facts.push([w.sets.length, "series"]);
    if (w.id === "ai") facts.push([w.sets.length, "collections"], [w.prompts.length, "prompts"]);
    if (w.id === "video") { const kinds = new Set(w.sets[0].items.map((x) => x.kind)); facts.push([kinds.size, "formats"]); }
    if (w.id === "songs") facts.push([2, "languages"]);
    if (w.id === "charstyle") facts.push([5, "turnaround views"]);
    const jumps = [];
    if (w.process) jumps.push(["process", "How I make them"], ["prompts", "Prompt lab", w.prompts.length]);
    if (w.sets.length > 1 && w.id !== "books") w.sets.forEach((s, j) => jumps.push([String(j), s.title, s.items.length]));
    const body = (BODY[w.id] || (() => ""))(w);
    /* the newspaper page opens with a masthead, like the front of a paper */
    const mast = w.id === "newspaper" ? `
      <header class="cat-hero np-mast">
        <div class="wrap">
          <div class="mast-top"><span>${esc(w.kicker)}</span><span class="crumb-no">${pad(k + 1)} / ${pad(all.length)}</span><span>${n} ${esc(w.unit)}</span></div>
          <h1 class="mast-title">${esc(w.title)}</h1>
          <div class="mast-bar"><span>Portfolio of ${esc(S().person.name)}</span><span>Arabic edition</span><span>Front page to back page</span></div>
          <p class="mast-deck" data-reveal>${esc(w.lead)}</p>
        </div>
      </header>` : "";
    return `
    <div class="cat cat-${w.id}${w.dark ? " is-dark" : ""}" style="--acc:${w.acc}">
      ${mast}
      <header class="cat-hero"${mast ? " hidden" : ""}>
        <div class="wrap">
          <div class="cat-hero-grid">
            <div class="ch-t">
              <span class="chip">${icon(w.icon)}${esc(w.kicker)}</span><span class="crumb-no">${pad(k + 1)} / ${pad(all.length)}</span>
              <h1 class="cat-title" data-split>${ital(w.title)}</h1>
              <p class="lead" data-reveal>${esc(w.lead)}</p>
            </div>
            <dl class="facts" data-reveal>
              ${facts.map((f) => `<div><dt>${esc(f[1])}</dt><dd data-count="${f[0]}">${f[0]}</dd></div>`).join("")}
            </dl>
          </div>
          ${jumps.length ? `<nav class="jumps" aria-label="On this page">${jumps.map((j) => `<a class="chip-btn" href="#${w.id}" data-jump="set-${w.id}-${j[0]}">${esc(j[1])}${j[2] ? `<span>${j[2]}</span>` : ""}</a>`).join("")}</nav>` : ""}
        </div>
      </header>
      <div class="cat-body">${body}</div>
      <nav class="next-cat" aria-label="More work">
        <div class="wrap nc-in">
          <a class="nc-prev" href="#${prev.id}">${icon("arrow-left")}<span>${esc(prev.title)}</span></a>
          <a class="nc-next" href="#${next.id}" style="--c:${next.acc}" data-cursor="Next">
            <span class="label">Next</span>
            <span class="nc-title"><i class="dot"></i>${ital(next.title)}</span>
            <span class="nc-arrow">${icon("arrow-right")}</span>
          </a>
        </div>
      </nav>
    </div>`;
  };

  const setHead = (label, s, unit, extra = "") => `
    <div class="set-head" data-reveal>
      <span class="label">${label}</span>
      <h2 class="set-title">${ital(s.title)}</h2>
      <span class="set-count">${s.items.length} ${unit}</span>
      ${s.desc ? `<p class="set-desc">${esc(s.desc)}</p>` : ""}
      ${extra}
    </div>`;
  /* register a lightbox group and return its id */
  const group = (id, items, label) => { DS.groups[id] = { items: items.map((x) => ({ src: x.src, alt: x.alt })), label }; return id; };

  const BODY = {};

  /* ---------------- BOOKS: an open book you can page through ---------------- */
  BODY.books = (w) => {
    w.sets.forEach((s, j) => group(`books-${j}`, s.items, s.title));
    return `
    <section class="block wrap" id="set-books-0">
      <div class="bv" data-bv>
        <div class="bv-tabs" role="tablist" aria-label="Books">
          ${w.sets.map((s, j) => `<button class="tab" role="tab" aria-selected="${j === 0}" data-book="${j}"><span class="tab-no">${pad(j + 1)}</span><span class="tab-t">${esc(s.title)}</span><span class="tab-n">${s.items.length} pages</span></button>`).join("")}
        </div>
        <div class="bv-main">
          <div class="bv-info">
            <span class="label bv-kicker"></span>
            <h2 class="bv-title"></h2>
            <p class="bv-desc"></p>
            <div class="bv-ctrl">
              <button class="round" data-bv-prev aria-label="Previous pages">${icon("arrow-left")}</button>
              <span class="bv-count" aria-live="polite"></span>
              <button class="round" data-bv-next aria-label="Next pages">${icon("arrow-right")}</button>
            </div>
            <button class="link-u bv-zoom" type="button">${icon("zoom")}<span>View these pages full size</span></button>
          </div>
          <div class="bv-stage" tabindex="0" aria-label="Book pages. Use the arrow keys to turn the page.">
            <div class="bv-book">
              <button class="bv-page l" data-cursor="View"></button>
              <button class="bv-page r" data-cursor="View"></button>
            </div>
          </div>
        </div>
        <div class="bv-strip" aria-label="All pages of this book"></div>
      </div>
    </section>`;
  };
  DS.init.books = (root) => {
    const w = S().work.find((x) => x.id === "books");
    const bv = $("[data-bv]", root); if (!bv) return;
    const L = $(".bv-page.l", bv), R = $(".bv-page.r", bv), book = $(".bv-book", bv);
    let b = 0, s = 0, busy = false;
    const single = () => DS.mobile.matches;
    const items = () => w.sets[b].items;
    const spreads = () => {
      const out = [], it = items();
      if (single()) it.forEach((_, k) => out.push([k]));
      else for (let k = 0; k < it.length; k += 2) out.push(it[k + 1] ? [k, k + 1] : [k]);
      return out;
    };
    const page = (k) => k == null || k === undefined
      ? `<span class="bv-blank"><em>${esc(w.sets[b].title)}</em><small>${items().length} pages</small></span>`
      : DS.img(items()[k].src, { alt: items()[k].alt, sizes: "(max-width: 760px) 88vw, 30vw" });
    const strip = () => {
      $(".bv-strip", bv).innerHTML = items().map((it, k) => `<button class="bv-th" data-k="${k}" aria-label="Page ${k + 1}: ${esc(it.alt)}"><img src="${DS.thumb(it.src)}" alt="" loading="lazy" width="60" height="80"><span>${k + 1}</span></button>`).join("");
    };
    const render = () => {
      const sp = spreads()[s], set = w.sets[b];
      bv.classList.toggle("single", single());
      if (single()) { L.hidden = true; R.innerHTML = page(sp[0]); R.dataset.k = sp[0]; R.setAttribute("aria-label", `Open page ${sp[0] + 1} full size`); }
      else {
        L.hidden = false; L.innerHTML = page(sp[0]); L.dataset.k = sp[0]; L.setAttribute("aria-label", `Open page ${sp[0] + 1} full size`);
        R.innerHTML = page(sp[1]); R.dataset.k = sp[1] == null ? "" : sp[1]; R.disabled = sp[1] == null;
        R.setAttribute("aria-label", sp[1] == null ? "End of book" : `Open page ${sp[1] + 1} full size`);
      }
      $(".bv-kicker", bv).textContent = `Book ${pad(b + 1)} of ${pad(w.sets.length)}`;
      $(".bv-title", bv).innerHTML = ital(set.title);
      $(".bv-desc", bv).textContent = set.desc;
      const first = sp[0] + 1, last = sp[sp.length - 1] + 1;
      $(".bv-count", bv).textContent = `${first === last ? "Page " + first : "Pages " + first + "–" + last} of ${items().length}`;
      $("[data-bv-prev]", bv).disabled = s === 0;
      $("[data-bv-next]", bv).disabled = s === spreads().length - 1;
      $$(".bv-th", bv).forEach((th) => th.classList.toggle("on", sp.includes(+th.dataset.k)));
      const on = $(".bv-th.on", bv);
      if (on) { const st = $(".bv-strip", bv); st.scrollTo({ left: on.offsetLeft - st.clientWidth / 2 + on.clientWidth, behavior: DS.reduced.matches ? "auto" : "smooth" }); }
    };
    const fade = () => { if (!DS.reduced.matches) book.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" }); };
    const turn = (d) => {
      const all = spreads(), ns = s + d;
      if (ns < 0 || ns >= all.length || busy) return;
      if (DS.reduced.matches || single()) { s = ns; render(); fade(); DS.sound.play("turn"); return; }
      busy = true; DS.sound.play("turn");
      const cur = all[s], nxt = all[ns];
      const leaf = document.createElement("div");
      leaf.className = "bv-leaf " + (d > 0 ? "fwd" : "back");
      leaf.innerHTML = `<div class="lf front">${d > 0 ? page(cur[1]) : page(cur[0])}</div><div class="lf back">${d > 0 ? page(nxt[0]) : page(nxt[1])}</div>`;
      book.appendChild(leaf);
      if (d > 0) R.innerHTML = page(nxt[1]); else L.innerHTML = page(nxt[0]);
      leaf.getBoundingClientRect();
      leaf.classList.add("go");
      setTimeout(() => { s = ns; render(); leaf.remove(); busy = false; }, 880);
    };
    const goTo = (k) => { const ns = spreads().findIndex((sp) => sp.includes(k)); if (ns === s) return; if (Math.abs(ns - s) === 1) turn(ns - s); else { s = ns; render(); fade(); } };
    $$(".tab", bv).forEach((tb) => tb.addEventListener("click", () => {
      if (+tb.dataset.book === b) return;
      b = +tb.dataset.book; s = 0;
      $$(".tab", bv).forEach((x) => x.setAttribute("aria-selected", x === tb));
      strip(); render(); fade();
    }));
    $("[data-bv-prev]", bv).addEventListener("click", () => turn(-1));
    $("[data-bv-next]", bv).addEventListener("click", () => turn(1));
    $(".bv-stage", bv).addEventListener("keydown", (e) => { if (e.key === "ArrowRight") { e.preventDefault(); turn(1); } if (e.key === "ArrowLeft") { e.preventDefault(); turn(-1); } });
    [L, R].forEach((p) => p.addEventListener("click", () => { if (p.dataset.k !== "") DS.lightbox.open(DS.groups[`books-${b}`].items, +p.dataset.k, p, { label: w.sets[b].title }); }));
    $(".bv-zoom", bv).addEventListener("click", (e) => DS.lightbox.open(DS.groups[`books-${b}`].items, spreads()[s][0], L.hidden ? R : L, { label: w.sets[b].title }));
    $(".bv-strip", bv).addEventListener("click", (e) => { const th = e.target.closest(".bv-th"); if (th) goTo(+th.dataset.k); });
    let sx = null;
    $(".bv-stage", bv).addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") sx = e.clientX; });
    $(".bv-stage", bv).addEventListener("pointerup", (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) turn(dx < 0 ? 1 : -1); });
    DS.mobile.addEventListener("change", () => { const k = spreads()[s] ? spreads()[s][0] : 0; s = Math.max(0, spreads().findIndex((sp) => sp.includes(k))); render(); });
    strip(); render();
  };

  /* ---------------- SOCIAL: a phone feed + a teaser rail ---------------- */
  BODY.social = (w) => {
    const [a, b] = w.sets;
    group("social-0", a.items, a.title); group("social-1", b.items, b.title);
    const initials = (a.client || a.title).split(" ").filter((x) => /^[A-Z]/.test(x)).slice(0, 2).map((x) => x[0]).join("");
    return `
    <section class="block wrap ss" id="set-social-0">
      <div class="ss-grid">
        <div class="ss-info" data-reveal>
          <span class="label">Series 01</span>
          <h2 class="set-title">${ital(a.title)}</h2>
          <dl class="meta">
            ${a.client ? `<div><dt>Client</dt><dd>${esc(a.client)}</dd></div>` : ""}
            <div><dt>Year</dt><dd>${esc(a.year)}</dd></div>
            <div><dt>Posts</dt><dd>${a.items.length}</dd></div>
          </dl>
          <p class="set-desc">${esc(a.desc)}</p>
          <button class="btn btn-ghost" data-lb="social-0" data-lb-i="0">${icon("expand")}<span>See the feed full size</span></button>
        </div>
        <div class="phone-wrap" data-reveal style="--d:1">
          <span class="phone-shape" aria-hidden="true" data-speed="0.04"></span>
          <div class="phone">
            <span class="ph-notch" aria-hidden="true"></span>
            <div class="ph-screen" tabindex="-1">
              <div class="ph-status" aria-hidden="true"><span>9:41</span><span class="ph-sig"><i></i><i></i><i></i></span></div>
              <div class="ph-profile">
                <span class="ph-avatar"><span>${esc(initials)}</span></span>
                <div class="ph-stats"><div><b>${a.items.length}</b><span>posts</span></div><div><b>${esc(a.year)}</b><span>year</span></div></div>
              </div>
              <div class="ph-bio"><b>${esc(a.client || a.title)}</b><span>Educational publishing · Jordan</span></div>
              <div class="ph-tabbar" aria-hidden="true">${icon("grid")}</div>
              <div class="ph-feed">
                ${a.items.map((it, k) => `<button class="ph-post" data-lb="social-0" data-lb-i="${k}" data-cursor="View" aria-label="Open post ${k + 1}: ${esc(it.alt)}">${DS.img(it.src, { alt: it.alt, sizes: "(max-width: 760px) 33vw, 140px" })}</button>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="block teaser is-dark" id="set-social-1">
      <div class="wrap">
        <div class="teaser-head">
          ${setHead("Series 02", b, "posts")}
          <div class="rail-ctrl">
            <button class="round" data-rail="-1" aria-label="Scroll back">${icon("arrow-left")}</button>
            <button class="round" data-rail="1" aria-label="Scroll forward">${icon("arrow-right")}</button>
          </div>
        </div>
      </div>
      <div class="rail" tabindex="0" aria-label="${esc(b.title)}: scroll sideways">
        ${b.items.map((it, k) => `<button class="rail-item" style="--r:${DS.ratio(it.src).toFixed(3)}" data-lb="social-1" data-lb-i="${k}" data-cursor="View" aria-label="Open post ${k + 1}: ${esc(it.alt)}"><span class="ri-no">${pad(k + 1)}</span>${DS.img(it.src, { alt: it.alt, sizes: "(max-width: 760px) 78vw, 30vw" })}</button>`).join("")}
      </div>
      <div class="wrap"><div class="rail-progress" aria-hidden="true"><i></i></div></div>
    </section>`;
  };
  DS.init.social = (root) => {
    /* the phone feed drifts slowly until someone touches it */
    const scr = $(".ph-screen", root);
    if (scr && !DS.reduced.matches) {
      let dir = 1, stop = false, hover = false, pos = 0;
      const halt = () => (stop = true);
      ["wheel", "touchstart", "pointerdown", "keydown"].forEach((ev) => scr.addEventListener(ev, halt, { passive: true }));
      scr.addEventListener("pointerenter", () => (hover = true));
      scr.addEventListener("pointerleave", () => (hover = false));
      const loop = () => {
        if (!scr.isConnected || stop) return;
        if (!hover && scr.offsetParent && !DS.mobile.matches) {
          const max = scr.scrollHeight - scr.clientHeight;
          pos += 0.35 * dir;
          if (pos >= max) { pos = max; dir = -1; } if (pos <= 0) { pos = 0; dir = 1; }
          scr.scrollTop = pos;
        }
        requestAnimationFrame(loop);
      };
      setTimeout(loop, 1600);
    }
    /* teaser rail */
    const rail = $(".rail", root), bar = $(".rail-progress i", root);
    if (rail) {
      const upd = () => { const m = rail.scrollWidth - rail.clientWidth; bar.style.transform = `scaleX(${m > 0 ? Math.max(0.06, rail.scrollLeft / m) : 1})`; };
      rail.addEventListener("scroll", upd, { passive: true }); upd();
      $$("[data-rail]", root).forEach((b) => b.addEventListener("click", () => rail.scrollBy({ left: +b.dataset.rail * rail.clientWidth * 0.7, behavior: "smooth" })));
      /* drag to scroll with a mouse */
      let down = false, x0 = 0, l0 = 0, moved = false;
      rail.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; moved = false; x0 = e.clientX; l0 = rail.scrollLeft; });
      addEventListener("pointermove", (e) => { if (!down) return; const dx = e.clientX - x0; if (Math.abs(dx) > 5) { moved = true; rail.classList.add("dragging"); } rail.scrollLeft = l0 - dx; });
      addEventListener("pointerup", () => { if (!down) return; down = false; setTimeout(() => rail.classList.remove("dragging"), 0); });
      rail.addEventListener("click", (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
    }
  };

  /* ---------------- NEWSPAPER: laid out like a real paper, opened as spreads ----------------
     Arabic papers read right to left, so in a spread the lower page sits on the right. */
  const pageLabel = (k, n) => (k === 0 ? "Front page" : k === n - 1 ? "Back page" : `Page ${k + 1}`);
  BODY.newspaper = (w) => {
    const s = w.sets[0], n = s.items.length;
    group("news-0", s.items, w.title);
    return `
    <section class="block news-desk" id="set-newspaper-0">
      <div class="wrap">
        <div class="nd-bar">
          <span class="nd-now" aria-live="polite"></span>
          <div class="nd-ctrl">
            <button class="round" data-nd-go="-1" aria-label="Previous pages">${icon("arrow-left")}</button>
            <button class="round" data-nd-go="1" aria-label="Next pages">${icon("arrow-right")}</button>
            <button class="link-u nd-open" type="button">${icon("expand")}<span>Full size</span></button>
          </div>
        </div>
        <div class="nd-spread" data-nd>
          <div class="nd-sheet" dir="rtl"></div>
          <span class="lens lens-read" aria-hidden="true"></span>
        </div>
        <p class="prints-hint np-hint">${icon("zoom")}<span class="hint-fine">Move over a page to read it through the magnifier. Click a page to open it full size.</span><span class="hint-touch">Swipe to turn the page. Tap a page to open it full size, then zoom in.</span></p>
        <section class="nd-index" aria-label="In this edition">
          <h2 class="nd-index-title"><span>In this edition</span></h2>
          <ol class="nd-list">
            ${s.items.map((it, k) => `<li><button class="nd-entry" data-k="${k}"><span class="nd-pg">${esc(pageLabel(k, n))}</span><span class="nd-sum">${esc(it.alt.replace(/^[^:]+:\s*/, ""))}</span></button></li>`).join("")}
          </ol>
        </section>
      </div>
    </section>`;
  };
  DS.init.newspaper = (root) => {
    const w = S().work.find((x) => x.id === "newspaper"), items = w.sets[0].items, n = items.length;
    const nd = $("[data-nd]", root); if (!nd) return;
    const sheet = $(".nd-sheet", nd), lens = $(".lens", nd), box = root;
    let s = 0, swiped = false, first = 0;
    const spreads = () => {
      if (DS.mobile.matches) return items.map((_, k) => [k]);
      const out = [[0]];
      for (let k = 1; k < n - 1; k += 2) out.push(k + 1 < n - 1 ? [k, k + 1] : [k]);
      if (n > 1) out.push([n - 1]);
      return out;
    };
    const page = (k) => {
      const it = items[k], [iw, ih] = DS.dims(it.src);
      return `<button class="nd-page" data-k="${k}" data-nocursor aria-label="${esc(pageLabel(k, n))}: open full size"><img src="${DS.thumb(it.src)}" srcset="${DS.thumb(it.src)} 600w, ${DS.full(it.src)} ${iw}w" sizes="(max-width: 760px) 92vw, 34vw" width="${iw}" height="${ih}" alt="${esc(it.alt)}" decoding="async"></button>`;
    };
    const show = (ns, dir = 0) => {
      const all = spreads(); s = Math.max(0, Math.min(all.length - 1, ns));
      const sp = all[s];
      first = sp[0];
      sheet.innerHTML = sp.map(page).join("");
      nd.classList.toggle("pair", sp.length === 2);
      if (dir && !DS.reduced.matches) sheet.animate([{ opacity: 0, transform: `translateX(${dir > 0 ? -28 : 28}px)` }, { opacity: 1, transform: "none" }], { duration: 480, easing: "cubic-bezier(.2,.7,.2,1)" });
      const a = sp[0] + 1, b = sp[sp.length - 1] + 1;
      $(".nd-now", box).innerHTML = `<b>${sp.length === 2 ? `Pages ${a}–${b}` : esc(pageLabel(sp[0], n))}</b><span>${pad(b)} / ${pad(n)}</span>`;
      $$(".nd-entry", box).forEach((e) => e.setAttribute("aria-current", sp.includes(+e.dataset.k) ? "true" : "false"));
      $$("[data-nd-go]", box)[0].disabled = s === 0;
      $$("[data-nd-go]", box)[1].disabled = s === all.length - 1;
    };
    const go = (d) => { const all = spreads(); if (s + d >= 0 && s + d < all.length) { DS.sound.play("turn"); show(s + d, d); } };
    const open = (k) => DS.lightbox.open(DS.groups["news-0"].items, k, $(`.nd-page[data-k="${k}"]`, sheet), { label: w.title });
    $$("[data-nd-go]", box).forEach((b) => b.addEventListener("click", () => go(+b.dataset.ndGo)));
    $(".nd-open", box).addEventListener("click", () => open(spreads()[s][0]));
    sheet.addEventListener("click", (e) => { const p = e.target.closest(".nd-page"); if (!p) return; if (swiped) { swiped = false; return; } open(+p.dataset.k); });
    $$(".nd-entry", box).forEach((e) => e.addEventListener("click", () => {
      const k = +e.dataset.k, ns = spreads().findIndex((sp) => sp.includes(k));
      if (ns !== s) { DS.sound.play("soft"); show(ns, ns > s ? 1 : -1); }
      nd.scrollIntoView({ behavior: DS.reduced.matches ? "auto" : "smooth", block: "center" });
    }));
    nd.closest(".news-desk").addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea")) return;
      if (e.key === "ArrowLeft") go(1);   /* right-to-left paper: the next page is to the left */
      if (e.key === "ArrowRight") go(-1);
    });
    /* reading magnifier: the hovered page at full resolution */
    if (DS.fine.matches) {
      const R = 120;
      nd.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const p = e.target.closest(".nd-page"), img = p && $("img", p);
        if (!img) { lens.classList.remove("on"); return; }
        const r = img.getBoundingClientRect(), f = nd.getBoundingClientRect(), k = +p.dataset.k;
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const Z = Math.max(2, DS.dims(items[k].src)[0] / r.width);
        lens.style.backgroundImage = `url('${DS.full(items[k].src)}')`;
        lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
        lens.style.backgroundPosition = `${R - x * Z}px ${R - y * Z}px`;
        lens.style.transform = `translate(${e.clientX - f.left - R}px, ${e.clientY - f.top - R}px)`;
        lens.classList.add("on");
      });
      nd.addEventListener("pointerleave", () => lens.classList.remove("on"));
    }
    let sx = null;
    nd.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") sx = e.clientX; });
    nd.addEventListener("pointerup", (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) { swiped = true; go(dx > 0 ? 1 : -1); } });
    DS.mobile.addEventListener("change", () => { if (nd.isConnected) show(spreads().findIndex((sp) => sp.includes(first))); });
    show(0);
  };

  /* ---------------- CHARACTER STYLE: turn each character around, then read its sheet ----------------
     The 5 turnaround views are cut from the sheet itself (see `turn` in data.js).
     A full spin plays the views 0-4 and then 3-1 mirrored, the way animators complete a turnaround. */
  const SPIN = [[0, 0, "Front"], [1, 0, "¾ front"], [2, 0, "Side"], [3, 0, "¾ back"], [4, 0, "Back"], [3, 1, "¾ back"], [2, 1, "Side"], [1, 1, "¾ front"]];
  const cropStyle = (it, k) => {
    const t = it.turn, W = DS.dims(it.src)[0], fh = t.y[1] - t.y[0];
    return `width:${((W / t.fw) * 100).toFixed(3)}%;left:${((-(t.x[k] - t.fw / 2) / t.fw) * 100).toFixed(3)}%;top:${((-t.y[0] / fh) * 100).toFixed(3)}%`;
  };
  const figRatio = (it) => (it.turn.fw / (it.turn.y[1] - it.turn.y[0])).toFixed(4);
  BODY.charstyle = (w) => {
    const s = w.sets[0];
    group("cs-0", s.items, w.title);
    return `
    <section class="block wrap ts-wrap" id="set-charstyle-0">
      ${setHead("The sheets", s, "sheets")}
      <div class="ts" data-ts>
        <div class="ts-stage">
          <div class="ts-read" aria-hidden="true"><b class="ts-deg">0°</b><span class="ts-view">Front</span></div>
          <span class="ts-hint" aria-hidden="true">${icon("arrow-left")}<span>Drag to turn</span>${icon("arrow-right")}</span>
          <div class="ts-turn-wrap">
            <span class="ts-disc" aria-hidden="true"></span>
            <div class="ts-turn" tabindex="0" role="slider" aria-label="Turn the character. Use the left and right arrow keys." aria-valuemin="0" aria-valuemax="315" aria-valuenow="0" aria-valuetext="Front" data-cursor="Drag">
              <div class="ts-frames"></div>
            </div>
          </div>
          <div class="ts-timeline" role="group" aria-label="Turnaround frames"></div>
        </div>
        <div class="ts-side">
          <div class="ts-now" aria-live="polite"><span class="ts-no"></span><h3 class="ts-name"></h3><p class="ts-sub">Model sheet for animation</p></div>
          <div class="ts-actions">
            <button class="btn btn-primary ts-spin" type="button" aria-pressed="false">${icon("play")}<span>Spin</span></button>
            <button class="btn btn-ghost ts-open" type="button">${icon("expand")}<span>Open full sheet</span></button>
          </div>
          <div class="ts-cast-box">
            <span class="label">The cast</span>
            <div class="ts-cast" role="listbox" aria-label="Characters">
              ${s.items.map((it, i) => `<button class="ts-pick" role="option" aria-selected="${i === 0}" data-i="${i}" aria-label="${esc(it.name)}" data-tip="${esc(it.name)}"><span class="ts-pick-fig" style="--fa:${figRatio(it)}"><img src="${DS.full(it.front)}" alt="" loading="lazy" decoding="async"></span><span class="ts-pick-no">${pad(i + 1)}</span></button>`).join("")}
            </div>
          </div>
          <div class="ts-incl">
            <span class="label">On every sheet</span>
            <ul>${(w.includes || []).map((x) => `<li>${icon("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
          </div>
        </div>
      </div>
      <figure class="ts-sheet">
        <button class="ts-sheet-btn" type="button" data-nocursor aria-label="Open the full sheet"><span class="ts-sheet-img"></span><span class="lens lens-read" aria-hidden="true"></span></button>
        <figcaption><span class="label">The full sheet</span><span class="ts-sheet-name"></span><span class="hint-fine">Move over the sheet to look closely. Click to open it full size.</span><span class="hint-touch">Tap the sheet to open it full size, then zoom in.</span></figcaption>
      </figure>
    </section>`;
  };
  DS.init.charstyle = (root) => {
    const w = S().work.find((x) => x.id === "charstyle"), items = w.sets[0].items;
    const ts = $("[data-ts]", root); if (!ts) return;
    const turn = $(".ts-turn", ts), frames = $(".ts-frames", ts), sheetBtn = $(".ts-sheet-btn", root), lens = $(".lens", sheetBtn);
    let i = 0, p = 0, timer = null, autoDone = false, turns = 0;
    const N = SPIN.length;
    const setP = (np) => {
      const prev = p;
      p = ((np % N) + N) % N;
      const [k, flip, label] = SPIN[p];
      $$("img", frames).forEach((im) => im.classList.toggle("on", +im.dataset.k === k));
      frames.classList.toggle("flip", !!flip);
      $(".ts-deg", ts).textContent = `${p * 45}°`;
      $(".ts-view", ts).textContent = label;
      /* the platform turns with the character (it keeps counting past 360° so it never spins back) */
      turns += ((((p - prev) % N) + N + N / 2) % N) - N / 2;   /* shortest way round */
      $(".ts-stage", ts).style.setProperty("--a", `${-turns * 45}deg`);
      turn.setAttribute("aria-valuenow", p * 45); turn.setAttribute("aria-valuetext", label + (flip ? " (other side)" : ""));
      $$(".tl-cell", ts).forEach((b) => b.setAttribute("aria-pressed", +b.dataset.p === p ? "true" : "false"));
    };
    const timeline = (it) => SPIN.map(([k, flip, label], q) => `
      <button class="tl-cell" type="button" data-p="${q}" aria-pressed="${q === p}" aria-label="Frame ${q + 1}: ${label}${flip ? " (other side)" : ""}, ${q * 45} degrees">
        <span class="tl-frame${flip ? " flip" : ""}" style="--fa:${figRatio(it)}"><img src="${DS.full(it.src)}" alt="" style="${cropStyle(it, k)}" decoding="async" draggable="false"></span>
        <span class="tl-no">${pad(q + 1)}</span><span class="tl-deg">${q * 45}°</span>
      </button>`).join("");
    const select = (ni) => {
      i = (ni + items.length) % items.length;
      const it = items[i];
      turn.style.setProperty("--fa", figRatio(it));
      frames.innerHTML = [0, 1, 2, 3, 4].map((k) => `<img src="${DS.full(it.src)}" alt="" data-k="${k}" style="${cropStyle(it, k)}" decoding="async" draggable="false">`).join("");
      $(".ts-timeline", ts).innerHTML = timeline(it);
      $(".ts-no", ts).textContent = `No. ${pad(i + 1)} / ${pad(items.length)}`;
      $(".ts-name", ts).innerHTML = ital(it.name);
      $$(".ts-pick", ts).forEach((b) => b.setAttribute("aria-selected", +b.dataset.i === i ? "true" : "false"));
      const [iw, ih] = DS.dims(it.src);
      $(".ts-sheet-img", sheetBtn).innerHTML = `<img src="${DS.thumb(it.src)}" srcset="${DS.thumb(it.src)} 600w, ${DS.full(it.src)} ${iw}w" sizes="(max-width: 760px) 92vw, 1320px" width="${iw}" height="${ih}" alt="${esc(it.alt)}" decoding="async">`;
      lens.style.backgroundImage = `url('${DS.full(it.src)}')`;
      $(".ts-sheet-name", root).textContent = it.name;
      turn.setAttribute("aria-label", `Turn the ${it.name.toLowerCase()} around. Use the left and right arrow keys.`);
      setP(p);
    };
    const stop = () => { clearInterval(timer); timer = null; const b = $(".ts-spin", ts); b.setAttribute("aria-pressed", "false"); b.innerHTML = `${icon("play")}<span>Spin</span>`; };
    const spin = (once = false) => {
      if (timer) { stop(); return; }
      let steps = 0;
      const b = $(".ts-spin", ts); b.setAttribute("aria-pressed", "true"); b.innerHTML = `${icon("pause")}<span>Stop</span>`;
      timer = setInterval(() => {
        if (!turn.isConnected) { clearInterval(timer); timer = null; return; }   /* the visitor left the page */
        setP(p + 1); steps++; if (once && steps >= SPIN.length) stop();
      }, 300);
    };
    $(".ts-spin", ts).addEventListener("click", () => spin());
    $(".ts-timeline", ts).addEventListener("click", (e) => { const c = e.target.closest(".tl-cell"); if (c) { stop(); setP(+c.dataset.p); } });
    $$(".ts-pick", ts).forEach((b) => b.addEventListener("click", () => { if (+b.dataset.i !== i) { DS.sound.play("soft"); select(+b.dataset.i); } }));
    turn.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); stop(); setP(p + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stop(); setP(p - 1); }
    });
    /* drag to turn: every 34 px of movement is one view */
    let dx0 = null, acc = 0;
    turn.addEventListener("pointerdown", (e) => { dx0 = e.clientX; acc = 0; stop(); turn.setPointerCapture(e.pointerId); turn.classList.add("grab"); });
    turn.addEventListener("pointermove", (e) => {
      if (dx0 == null) return;
      acc += e.clientX - dx0; dx0 = e.clientX;
      while (Math.abs(acc) >= 34) { setP(p + (acc < 0 ? 1 : -1)); acc += acc < 0 ? 34 : -34; }
    });
    const up = () => { dx0 = null; turn.classList.remove("grab"); };
    turn.addEventListener("pointerup", up); turn.addEventListener("pointercancel", up);
    const open = () => DS.lightbox.open(DS.groups["cs-0"].items, i, sheetBtn, { label: w.title });
    $(".ts-open", ts).addEventListener("click", open);
    sheetBtn.addEventListener("click", open);
    /* magnifier over the full sheet */
    if (DS.fine.matches) {
      const R = 120;
      sheetBtn.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const img = $(".ts-sheet-img img", sheetBtn); if (!img) return;
        const r = img.getBoundingClientRect(), f = sheetBtn.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        if (x < 0 || y < 0 || x > r.width || y > r.height) { lens.classList.remove("on"); return; }
        const Z = Math.max(1.6, DS.dims(items[i].src)[0] / r.width);
        lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
        lens.style.backgroundPosition = `${R - x * Z}px ${R - y * Z}px`;
        lens.style.transform = `translate(${e.clientX - f.left - R}px, ${e.clientY - f.top - R}px)`;
        lens.classList.add("on");
      });
      sheetBtn.addEventListener("pointerleave", () => lens.classList.remove("on"));
    }
    /* the first time the turntable comes into view, it turns once by itself */
    if (!DS.reduced.matches && "IntersectionObserver" in window) {
      const o = new IntersectionObserver((en) => { if (en[0].isIntersecting && !autoDone) { autoDone = true; o.disconnect(); setTimeout(() => { if (!timer && turn.isConnected) spin(true); }, 500); } }, { threshold: 0.5 });
      o.observe(turn);
    }
    select(0);
  };

  /* ---------------- WRITING: published articles, each opens on its own site ---------------- */
  BODY.writing = (w) => {
    const s = w.sets[0];
    const items = [...s.items].sort((a, b) => (b.date || "0").localeCompare(a.date || "0"));
    const day = (d) => new Date(d + "T12:00:00");
    return `
    <section class="block wrap writing" id="set-writing-0">
      ${setHead("The articles", s, "articles")}
      <ol class="articles">
        ${items.map((it, k) => `
        <li class="art" data-reveal style="--d:${k % 3}">
          <a class="art-link" href="${esc(it.url)}" target="_blank" rel="noopener" data-cursor="Read">
            <span class="art-date">${it.date ? `<b>${day(it.date).getDate()}</b><span>${day(it.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>` : `<span>Date to come</span>`}</span>
            <span class="art-info">
              <span class="art-meta"><span class="art-kind">${esc(it.kind)}</span><span class="art-outlet">${t(it.outlet)}</span></span>
              ${it.summary ? `<span class="art-sum">${esc(it.summary)}</span>` : ""}
              ${it.note ? `<span class="art-note">${esc(it.note)}</span>` : ""}
            </span>
            ${it.title ? `<b class="art-title" lang="ar" dir="rtl">${esc(it.title)}</b>` : `<b class="art-title art-en">Read the article on ${esc(it.outlet)}</b>`}
            <span class="art-go" aria-hidden="true">${icon("arrow-up-right")}</span>
            <span class="sr-only">(opens in a new tab)</span>
          </a>
        </li>`).join("")}
      </ol>
    </section>`;
  };

  /* ---------------- POSTERS: a 3D carousel, the front poster opens full size ---------------- */
  BODY.posters = (w) => {
    const s = w.sets[0];
    group("posters-0", s.items, w.title);
    return `
    <section class="block poster-room" id="set-posters-0">
      <div class="wrap">${setHead("The posters", s, "posters")}</div>
      <div class="cflow" data-cflow tabindex="0" aria-roledescription="carousel" aria-label="Posters. Use the left and right arrow keys to browse.">
        <div class="cf-stage">
          ${s.items.map((it, k) => `<button class="cf-item" data-k="${k}" style="--r:${DS.ratio(it.src).toFixed(3)}" aria-label="${esc(it.alt)}">${DS.img(it.src, { alt: "", sizes: "(max-width: 760px) 70vw, 32vw" })}</button>`).join("")}
        </div>
        <div class="wrap cf-bar">
          <div class="cf-cap" aria-live="polite"><span class="cf-no"></span><b class="cf-title"></b><span class="cf-note"></span></div>
          <div class="cf-ctrl">
            <button class="round" data-cf="-1" aria-label="Previous poster">${icon("arrow-left")}</button>
            <button class="round" data-cf="1" aria-label="Next poster">${icon("arrow-right")}</button>
          </div>
        </div>
        <p class="prints-hint">${icon("expand")}<span>Click the poster in front to see it full size. Use the arrows, the arrow keys or a swipe to browse.</span></p>
      </div>
    </section>`;
  };
  DS.init.posters = (root) => {
    const w = S().work.find((x) => x.id === "posters"), items = w.sets[0].items;
    const cf = $("[data-cflow]", root); if (!cf) return;
    const els = $$(".cf-item", cf), btns = $$("[data-cf]", cf);
    let i = 0;
    const lay = () => {
      const m = DS.mobile.matches;
      els.forEach((el, k) => {
        const d = k - i, a = Math.abs(d);
        const x = d * (m ? 62 : 52), z = -a * (m ? 140 : 200), ry = d === 0 ? 0 : d < 0 ? 36 : -36;
        el.style.transform = `translate(-50%, -50%) translateX(${x}%) translateZ(${z}px) rotateY(${ry}deg)`;
        el.style.zIndex = 10 - a;
        el.style.opacity = a > 2 ? 0 : a === 2 ? 0.45 : 1;
        el.style.filter = d ? `brightness(${a === 1 ? 0.84 : 0.7})` : "none";
        el.style.pointerEvents = a > 2 ? "none" : "";
        el.classList.toggle("on", d === 0);
        el.dataset.cursor = d === 0 ? "View" : "Show";
        el.tabIndex = d === 0 ? 0 : -1;
      });
      const it = items[i];
      $(".cf-no", cf).textContent = `No. ${pad(i + 1)} / ${pad(items.length)}`;
      $(".cf-title", cf).innerHTML = t(it.title);
      $(".cf-note", cf).textContent = it.note || "";
      btns[0].disabled = i === 0; btns[1].disabled = i === items.length - 1;
    };
    const go = (k) => { const n = Math.max(0, Math.min(items.length - 1, k)); if (n !== i) { i = n; DS.sound.play("soft"); lay(); } };
    els.forEach((el) => el.addEventListener("click", () => {
      const k = +el.dataset.k;
      if (k === i) DS.lightbox.open(DS.groups["posters-0"].items, i, el, { label: w.title }); else go(k);
    }));
    btns.forEach((b) => b.addEventListener("click", () => go(i + +b.dataset.cf)));
    cf.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(i + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(i - 1); }
    });
    let sx = null;
    const stage = $(".cf-stage", cf);
    stage.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") sx = e.clientX; });
    stage.addEventListener("pointerup", (e) => { if (sx == null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1)); });
    DS.mobile.addEventListener("change", lay);
    lay();
  };

  /* ---------------- KUFI PRINT: framed prints on a wall, with a magnifier ---------------- */
  BODY.kufi = (w) => {
    const s = w.sets[0];
    group("kufi-0", s.items, w.title);
    return `
    <section class="block kufi-wall" id="set-kufi-0">
      <div class="wrap">
        ${setHead("The prints", s, "prints")}
        <div class="prints">
          ${s.items.map((it, k) => `
          <figure class="print" data-reveal style="--d:${k}">
            <button class="print-frame" data-lb="kufi-0" data-lb-i="${k}" data-nocursor aria-label="See print ${k + 1} full size">
              <span class="print-mat">${DS.img(it.src, { alt: it.alt, sizes: "(max-width: 760px) 86vw, 34vw", attrs: `data-full="${DS.full(it.src)}"` })}</span>
              <span class="lens" aria-hidden="true"></span>
            </button>
            <figcaption>
              <span class="pr-no">No. ${pad(k + 1)}</span>
              <b class="pr-t">${t(it.title)}</b>
              <span class="pr-note">${esc(it.note || "")}</span>
            </figcaption>
          </figure>`).join("")}
        </div>
        <p class="prints-hint">${icon("zoom")}<span class="hint-fine">Move over a print to look closely at the grid. Click to open it full size.</span><span class="hint-touch">Tap a print to open it full size.</span></p>
      </div>
    </section>`;
  };
  DS.init.kufi = (root) => {
    if (!DS.fine.matches) return;
    const R = 85, Z = 2.6;
    $$(".print-frame", root).forEach((fr) => {
      const img = $("img", fr), lens = $(".lens", fr);
      lens.style.backgroundImage = `url('${img.dataset.full}')`;
      fr.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse") return;
        const r = img.getBoundingClientRect(), f = fr.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        if (x < 0 || y < 0 || x > r.width || y > r.height) { lens.classList.remove("on"); return; }
        lens.classList.add("on");
        lens.style.backgroundSize = `${r.width * Z}px ${r.height * Z}px`;
        lens.style.backgroundPosition = `${R - x * Z}px ${R - y * Z}px`;
        lens.style.transform = `translate(${e.clientX - f.left - R}px, ${e.clientY - f.top - R}px)`;
      });
      fr.addEventListener("pointerleave", () => lens.classList.remove("on"));
    });
  };

  /* ---------------- CHARACTERS: pick a character to bring it forward ---------------- */
  BODY.characters = (w) => {
    const s = w.sets[0];
    group("characters-0", s.items, s.title);
    return `
    <section class="block wrap" id="set-characters-0">
      <div class="roster" data-roster>
        <div class="rs-stage" data-reveal>
          <span class="rs-arch" aria-hidden="true"></span>
          <span class="rs-spark" aria-hidden="true">${sparkle}</span>
          <button class="rs-hero" data-cursor="View" aria-label="See this character full size"></button>
          <div class="rs-ctrl">
            <button class="round" data-rs="-1" aria-label="Previous character">${icon("arrow-left")}</button>
            <span class="rs-no" aria-live="polite"></span>
            <button class="round" data-rs="1" aria-label="Next character">${icon("arrow-right")}</button>
          </div>
        </div>
        <div class="rs-side">
          <div class="rs-caption" data-reveal>
            <span class="label">${esc(s.title)}</span>
            <h2 class="rs-name"></h2>
            <p class="rs-alt"></p>
          </div>
          <div class="rs-list" role="listbox" aria-label="Characters">
            ${s.items.map((it, k) => `<button class="rs-card" role="option" aria-selected="${k === 0}" data-k="${k}" style="--i:${k}"><span class="rs-thumb"><img src="${DS.thumb(it.src)}" alt="" loading="lazy"></span><span class="rs-cn">${esc(it.name)}</span></button>`).join("")}
          </div>
          <p class="rs-hint">${esc(s.desc)}</p>
        </div>
      </div>
    </section>`;
  };
  DS.init.characters = (root) => {
    const w = S().work.find((x) => x.id === "characters"), items = w.sets[0].items;
    const rs = $("[data-roster]", root); if (!rs) return;
    const hero = $(".rs-hero", rs); let i = 0;
    const show = (k, anim = true) => {
      i = (k + items.length) % items.length;
      const it = items[i], [iw, ih] = DS.dims(it.src);
      const img = `<img src="${DS.full(it.src)}" alt="${esc(it.alt)}" width="${iw}" height="${ih}" decoding="async">`;
      if (anim && !DS.reduced.matches) {
        const old = $("img", hero);
        const put = () => { hero.innerHTML = img; $("img", hero).animate([{ opacity: 0, transform: "translateY(24px) scale(.94)" }, { opacity: 1, transform: "translateY(-4px) scale(1.01)", offset: 0.7 }, { opacity: 1, transform: "none" }], { duration: 620, easing: "cubic-bezier(.2,.7,.2,1)" }); };
        if (old) old.animate([{ opacity: 1 }, { opacity: 0, transform: "scale(.96)" }], { duration: 160, easing: "ease-in" }).onfinish = put; else put();
      } else hero.innerHTML = img;
      $(".rs-no", rs).textContent = `${pad(i + 1)} / ${pad(items.length)}`;
      $(".rs-arch", rs).textContent = pad(i + 1);
      $(".rs-name", rs).innerHTML = ital(it.name);
      $(".rs-alt", rs).textContent = it.alt;
      $$(".rs-card", rs).forEach((c) => c.setAttribute("aria-selected", +c.dataset.k === i));
    };
    $$(".rs-card", rs).forEach((c) => c.addEventListener("click", () => { DS.sound.play("soft"); show(+c.dataset.k); }));
    $$("[data-rs]", rs).forEach((b) => b.addEventListener("click", () => show(i + +b.dataset.rs)));
    hero.addEventListener("click", () => DS.lightbox.open(DS.groups["characters-0"].items, i, hero, { label: w.sets[0].title }));
    rs.addEventListener("keydown", (e) => {
      if (!e.target.closest(".rs-list, .rs-stage")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); show(i + 1); $(`.rs-card[data-k="${i}"]`, rs).focus(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); show(i - 1); $(`.rs-card[data-k="${i}"]`, rs).focus(); }
    });
    show(0, false);
  };

  /* ---------------- AI IMAGES: process, prompt lab, four collections ---------------- */
  const PART_NAMES = { s: "Subject", st: "Style", l: "Light", c: "Camera & framing", co: "Colour", r: "Ratio" };
  BODY.ai = (w) => {
    group("ai-prompts", w.prompts, "Prompt examples");
    const sets = w.sets.map((s, j) => { group(`ai-${j}`, s.items, s.title); return aiSet(s, j); }).join("");
    return `
    <section class="block wrap" id="set-ai-process">
      <div class="block-head" data-reveal>
        <span class="label">How I make them</span>
        <h2 class="bh-title">From story to <em>final image.</em></h2>
        <p class="bh-sub">Tools: ${esc(w.tools)}</p>
      </div>
      <ol class="flow">
        ${w.process.map((p, k) => `<li data-reveal style="--d:${k}"><span class="fl-no">${pad(k + 1)}</span><span class="fl-tool${p.tool === "Magnific AI" ? " gold" : ""}">${esc(p.tool)}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join("")}
      </ol>
    </section>
    <section class="block wrap" id="set-ai-prompts">
      <div class="block-head" data-reveal>
        <span class="label">Prompt lab</span>
        <h2 class="bh-title">Prompt <em>examples.</em></h2>
        <p class="bh-sub">One prompt for each style I work in. Every part of a prompt has a job: switch styles to see how each one is built.</p>
      </div>
      <div class="lab" data-lab data-reveal>
        <div class="editor">
          <div class="ed-top">
            <span class="ed-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <div class="ed-tabs" role="tablist" aria-label="Prompt styles">
              ${w.prompts.map((p, k) => `<button class="tab" role="tab" aria-selected="${k === 0}" data-p="${k}">${esc(p.style)}</button>`).join("")}
            </div>
          </div>
          <div class="code" aria-live="polite"></div>
          <div class="legend" aria-label="Colour key">${Object.entries(PART_NAMES).map(([k, v]) => `<span class="tk-${k}"><i></i>${v}</span>`).join("")}</div>
          <div class="ed-foot"><span class="ed-from"></span><button class="btn btn-ghost btn-sm" type="button" data-copy-prompt>${icon("copy")}<span>Copy prompt</span></button></div>
        </div>
        <figure class="output">
          <button class="out-img" data-cursor="View" aria-label="See the result full size"></button>
          <figcaption><span class="label">Result</span><b class="out-style"></b></figcaption>
        </figure>
      </div>
    </section>
    ${sets}`;
  };
  function aiSet(s, j) {
    const cell = (it, k, cls = "", sizes) => `<button class="gi ${cls}" data-lb="ai-${j}" data-lb-i="${k}" data-cursor="View" style="--r:${DS.ratio(it.src).toFixed(3)}" aria-label="Open: ${esc(it.alt)}">${DS.img(it.src, { alt: it.alt, sizes })}<span class="gi-cap">${esc(it.alt)}</span></button>`;
    let inner = "";
    if (s.layout === "rows") inner = `<div class="jrows">${s.items.map((it, k) => cell(it, k, "jr", "(max-width: 760px) 90vw, 33vw")).join("")}</div>`;
    else if (s.layout === "squares") inner = `<div class="squares">${s.items.map((it, k) => cell(it, k, "sq", "(max-width: 760px) 45vw, 20vw")).join("")}</div>`;
    else if (s.layout === "mosaic") inner = `<div class="mosaic">${s.items.map((it, k) => cell(it, k, "m" + k, "(max-width: 760px) 90vw, 45vw")).join("")}</div>`;
    else inner = `<div class="wall">${s.items.map((it, k) => `<figure class="wl" data-reveal>${cell(it, k, "", "(max-width: 760px) 90vw, 30vw")}<figcaption><span>No. ${pad(k + 1)}</span>${esc(it.alt)}</figcaption></figure>`).join("")}</div>`;
    return `<section class="block wrap ai-set ai-${s.layout}" id="set-ai-${j}">${setHead("Collection " + pad(j + 1), s, "images")}${inner}</section>`;
  }
  DS.init.ai = (root) => {
    const w = S().work.find((x) => x.id === "ai");
    const lab = $("[data-lab]", root); if (!lab) return;
    const code = $(".code", lab); let cur = 0, typer = null;
    const render = (k) => {
      cur = k; const p = w.prompts[k];
      $$(".ed-tabs .tab", lab).forEach((tb) => tb.setAttribute("aria-selected", +tb.dataset.p === k));
      $(".ed-from", lab).textContent = "From: " + p.from;
      $(".out-style", lab).textContent = p.style;
      const [iw, ih] = DS.dims(p.src);
      const out = $(".out-img", lab);
      out.innerHTML = `<img src="${DS.full(p.src)}" alt="${esc(p.alt)}" width="${iw}" height="${ih}" decoding="async">`;
      if (!DS.reduced.matches) $("img", out).animate([{ opacity: 0, filter: "blur(12px)", transform: "scale(1.04)" }, { opacity: 1, filter: "blur(0)", transform: "none" }], { duration: 900, easing: "cubic-bezier(.2,.7,.2,1)" });
      /* type the prompt out, part by part */
      clearInterval(typer);
      const html = p.parts.map((x) => (typeof x === "string" ? esc(x) : `<span class="tk tk-${x[0]}" title="${PART_NAMES[x[0]]}">${esc(x[1])}</span>`)).join("");
      if (DS.reduced.matches) { code.innerHTML = `<span class="pfx">&gt; </span>${html}`; return; }
      const tmp = document.createElement("div"); tmp.innerHTML = html;
      const total = tmp.textContent.length; let n = 0;
      const step = Math.max(2, Math.ceil(total / 70));
      typer = setInterval(() => {
        n = Math.min(total, n + step);
        code.innerHTML = `<span class="pfx">&gt; </span>${cut(tmp, n)}<span class="cur"></span>`;
        if (n >= total) { clearInterval(typer); code.innerHTML = `<span class="pfx">&gt; </span>${html}<span class="cur"></span>`; }
      }, 16);
    };
    /* the first n characters of an element's HTML, keeping the spans */
    const cut = (el, n) => {
      let left = n, out = "";
      el.childNodes.forEach((node) => {
        if (left <= 0) return;
        const txt = node.textContent, part = txt.slice(0, left); left -= part.length;
        out += node.nodeType === 3 ? esc(part) : `<span class="${node.className}">${esc(part)}</span>`;
      });
      return out;
    };
    $$(".ed-tabs .tab", lab).forEach((tb) => tb.addEventListener("click", () => render(+tb.dataset.p)));
    $(".out-img", lab).addEventListener("click", (e) => DS.lightbox.open(DS.groups["ai-prompts"].items, cur, e.currentTarget, { label: "Prompt examples" }));
    $("[data-copy-prompt]", lab).addEventListener("click", () => {
      const p = w.prompts[cur];
      DS.copy(p.parts.map((x) => (typeof x === "string" ? x : x[1])).join(""), "Prompt copied");
    });
    /* start typing when the lab scrolls into view */
    let started = false;
    const go = () => { if (!started) { started = true; render(0); } };
    if ("IntersectionObserver" in window) { const o = new IntersectionObserver((en) => { if (en[0].isIntersecting) { go(); o.disconnect(); } }, { threshold: 0.3 }); o.observe(lab); } else go();
    /* before it starts, show the first prompt in full (no empty box) */
    const p0 = w.prompts[0];
    code.innerHTML = `<span class="pfx">&gt; </span>` + p0.parts.map((x) => (typeof x === "string" ? esc(x) : `<span class="tk tk-${x[0]}">${esc(x[1])}</span>`)).join("");
    $(".out-style", lab).textContent = p0.style; $(".ed-from", lab).textContent = "From: " + p0.from;
    const [iw, ih] = DS.dims(p0.src);
    $(".out-img", lab).innerHTML = `<img src="${DS.full(p0.src)}" alt="${esc(p0.alt)}" width="${iw}" height="${ih}" loading="lazy">`;
  };

  /* ---------------- VIDEO: a cinema screen and a film reel ---------------- */
  const poster = (it, big) => it.thumb
    ? (big ? `<span class="scr-blur" style="background-image:url('${DS.full(it.thumb)}')"></span><img class="scr-img" src="${DS.full(it.thumb)}" alt="" width="${DS.dims(it.thumb)[0]}" height="${DS.dims(it.thumb)[1]}">`
           : `<img src="${DS.dims(it.thumb)[0] > 600 ? DS.thumb(it.thumb) : DS.full(it.thumb)}" alt="" loading="lazy">`)
    : `<span class="vcover"><span class="vc-ic">${icon("film")}</span><b>${t(it.title)}</b><small>No preview frame yet</small></span>`;
  BODY.video = (w) => {
    const s = w.sets[0];
    return `
    <section class="block wrap" id="set-video-0">
      <div class="cinema" data-cinema>
        <div class="screen-wrap" data-reveal>
          <div class="screen"></div>
          <div class="screen-bar">
            <div class="sb-meta"><span class="sb-no"></span><span class="sb-kind"></span><h2 class="sb-title"></h2></div>
            <div class="sb-ctrl">
              <a class="link-u sb-drive" target="_blank" rel="noopener">${icon("drive")}<span>Open on Google Drive</span></a>
              <button class="round" data-cv="-1" aria-label="Previous video">${icon("arrow-left")}</button>
              <button class="round" data-cv="1" aria-label="Next video">${icon("arrow-right")}</button>
            </div>
          </div>
        </div>
        <div class="reel" role="listbox" aria-label="Videos">
          ${s.items.map((it, k) => `<button class="reel-item${it.r < 1 ? " tall" : ""}" role="option" aria-selected="${k === 0}" data-k="${k}" data-cursor="Play" style="--i:${k}">
            <span class="ri-frame">${poster(it)}<span class="ri-play">${icon("play")}</span></span>
            <span class="ri-meta"><span class="ri-kind">${pad(k + 1)} · ${esc(it.kind)}</span><b>${t(it.title)}</b></span>
          </button>`).join("")}
        </div>
      </div>
    </section>`;
  };
  DS.init.video = (root) => {
    const w = S().work.find((x) => x.id === "video"), items = w.sets[0].items;
    const cv = $("[data-cinema]", root); if (!cv) return;
    const scr = $(".screen", cv); let i = 0;
    const show = (k, play = false) => {
      i = (k + items.length) % items.length; const it = items[i];
      scr.classList.toggle("tall", it.r < 1);
      if (play) {
        /* the video file lives in the website (assets/videos); Drive is only a fallback for items without one */
        scr.innerHTML = it.file
          ? `<video src="${esc(it.file)}"${it.thumb ? ` poster="${DS.full(it.thumb)}"` : ""} controls autoplay playsinline preload="metadata" title="${esc(it.title)}"></video>`
          : `<iframe src="https://drive.google.com/file/d/${encodeURIComponent(it.drive)}/preview" title="${esc(it.title)}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        const v = $("video", scr);
        if (v) { v.play().catch(() => {}); v.addEventListener("play", () => DS.player.audio.pause()); }
        DS.player.audio.pause();
      } else {
        scr.innerHTML = `<div class="scr-poster">${poster(it, true)}<button class="scr-play" data-cursor="Play" aria-label="Play ${esc(it.title)}">${icon("play")}<span>Play</span></button></div>`;
        $(".scr-play", scr).addEventListener("click", () => show(i, true));
        if (!DS.reduced.matches) $(".scr-poster", scr).animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420 });
      }
      $(".sb-no", cv).textContent = `${pad(i + 1)} / ${pad(items.length)}`;
      $(".sb-kind", cv).textContent = it.kind;
      $(".sb-title", cv).innerHTML = t(it.title);
      const sbd = $(".sb-drive", cv);
      sbd.hidden = !!it.file;
      if (!it.file) sbd.href = `https://drive.google.com/file/d/${it.drive}/view`;
      $$(".reel-item", cv).forEach((r) => r.setAttribute("aria-selected", +r.dataset.k === i));
    };
    $$(".reel-item", cv).forEach((r) => r.addEventListener("click", () => {
      show(+r.dataset.k, true);
      if (DS.mobile.matches) scr.scrollIntoView({ behavior: DS.reduced.matches ? "auto" : "smooth", block: "center" });
    }));
    $$("[data-cv]", cv).forEach((b) => b.addEventListener("click", () => show(i + +b.dataset.cv)));
    show(0);
  };

  /* ---------------- SONGS: a record sleeve and a tracklist ---------------- */
  const langLabel = (it) => (it.lang === "en" ? "English" : it.lang === "ar" ? "Arabic" : "Children’s song");
  BODY.songs = (w) => {
    const s = w.sets[0];
    return `
    <section class="block wrap" id="set-songs-0">
      <div class="music" data-music>
        <div class="deck" data-reveal>
          <div class="record">
            <div class="sleeve"><span class="sl-pat" aria-hidden="true"></span><span class="sl-no"></span><b class="sl-title"></b><span class="sl-lang"></span></div>
            <div class="vinyl" aria-hidden="true"><span class="v-label"></span></div>
          </div>
          <div class="deck-info">
            <span class="label deck-state">Ready to play</span>
            <div class="seekbox">
              <input class="seek" type="range" min="0" max="1000" value="0" step="1" aria-label="Song position">
              <div class="times"><span class="t-cur">0:00</span><span class="t-dur">–:––</span></div>
            </div>
            <div class="deck-ctrl">
              <button class="round" data-pl-step="-1" aria-label="Previous song">${icon("prev")}</button>
              <button class="play-big" data-pl-toggle aria-label="Play">${icon("play")}</button>
              <button class="round" data-pl-step="1" aria-label="Next song">${icon("next")}</button>
            </div>
            <a class="link-u deck-drive" target="_blank" rel="noopener">${icon("drive")}<span>Open on Google Drive</span></a>
          </div>
        </div>
        <ol class="tracks" aria-label="Songs">
          ${s.items.map((it, k) => `
          <li class="track" data-k="${k}" style="--i:${k}">
            <button class="tr-btn" data-pl="${k}" aria-label="Play ${esc(it.title)}">
              <span class="tr-cover" style="${DS.songVars(k)}"><span class="tc-pat p${k % 5}"></span><span class="tc-no">${pad(k + 1)}</span><span class="tr-ic">${icon("play")}</span></span>
              <span class="tr-meta"><b class="tr-title">${t(it.title)}</b><span class="tr-lang">${langLabel(it)}</span></span>
              <span class="tr-eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
              <span class="tr-dur">–:––</span>
            </button>
            <span class="tr-bar" aria-hidden="true"><i></i></span>
          </li>`).join("")}
        </ol>
      </div>
    </section>`;
  };
  DS.init.songs = (root) => {
    const w = S().work.find((x) => x.id === "songs"), items = w.sets[0].items;
    const m = $("[data-music]", root); if (!m) return;
    const PL = DS.player;
    let view = 0, seeking = false;
    const setDeck = (k) => {
      const it = items[k];
      const rec = $(".record", m); rec.style.cssText = DS.songVars(k);
      $(".sl-no", m).textContent = pad(k + 1);
      $(".sl-title", m).innerHTML = t(it.title);
      $(".sl-lang", m).textContent = langLabel(it);
      $(".sl-pat", m).className = "sl-pat p" + (k % 5);
      const dd = $(".deck-drive", m);
      dd.hidden = !!it.file;
      if (!it.file) dd.href = `https://drive.google.com/file/d/${it.drive}/view`;
    };
    $$("[data-pl]", m).forEach((b) => b.addEventListener("click", () => { PL.play(+b.dataset.pl); }));
    $("[data-pl-toggle]", m).addEventListener("click", () => (PL.i < 0 ? PL.play(view) : PL.toggle()));
    $$("[data-pl-step]", m).forEach((b) => b.addEventListener("click", () => { const base = PL.i < 0 ? view : PL.i; const n = base + +b.dataset.plStep; if (n < 0 || n >= items.length) return; if (PL.i < 0) { view = n; setDeck(n); } else PL.play(n); }));
    const seek = $(".seek", m);
    seek.addEventListener("input", () => { seeking = true; });
    seek.addEventListener("change", () => { PL.seek(seek.value / 1000); seeking = false; });
    const off = PL.on((st) => {
      if (!m.isConnected) { off(); return; }
      const k = st.i >= 0 ? st.i : view; if (k !== view || st.i >= 0) { view = k; setDeck(k); }
      m.classList.toggle("playing", st.playing);
      $(".deck-state", m).textContent = st.i < 0 ? "Ready to play" : st.item && st.item.failed ? "Playing on Google Drive" : st.playing ? "Now playing" : "Paused";
      $("[data-pl-toggle]", m).innerHTML = icon(st.playing ? "pause" : "play");
      $("[data-pl-toggle]", m).setAttribute("aria-label", st.playing ? "Pause" : "Play");
      $(".t-cur", m).textContent = DS.time(st.t) === "–:––" ? "0:00" : DS.time(st.t);
      $(".t-dur", m).textContent = DS.time(st.d);
      if (!seeking) seek.value = st.d ? Math.round((st.t / st.d) * 1000) : 0;
      seek.style.setProperty("--p", (st.d ? st.t / st.d : 0) * 100 + "%");
      $$(".track", m).forEach((tr) => {
        const on = +tr.dataset.k === st.i;
        tr.classList.toggle("on", on); tr.classList.toggle("playing", on && st.playing);
        $(".tr-ic", tr).innerHTML = icon(on && st.playing ? "pause" : "play");
        $(".tr-btn", tr).setAttribute("aria-label", (on && st.playing ? "Pause " : "Play ") + items[+tr.dataset.k].title);
        $(".tr-bar i", tr).style.transform = `scaleX(${on && st.d ? st.t / st.d : 0})`;
      });
    });
    setDeck(0);
    /* fill in durations as they become known */
    PL.probe((it) => { const k = items.indexOf(it); const d = PL.durations[it.drive]; if (k >= 0 && d) $(`.track[data-k="${k}"] .tr-dur`, m).textContent = DS.time(d); });
  };
})();
