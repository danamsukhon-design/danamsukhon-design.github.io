/* i18n.js - English / Arabic.
   English is the main language; ?lang=ar in the address shows the Arabic version.
   In Arabic the page turns right-to-left, the content in data.js is swapped for its translation
   (js/i18n-data.js, keyed by the exact English text), and interface words come from UI below.
   Anything without a translation simply stays in English.                                   */
(function () {
  const DS = (window.DS = window.DS || {});

  /* English is the main language: the plain address always opens in English, and only ?lang=ar opens Arabic
     (the language button adds it; moving between pages keeps it, since pages are #hash routes). */
  const q = new URLSearchParams(location.search).get("lang");
  try { localStorage.removeItem("ds-lang"); } catch (e) {}   /* forget the choice older versions remembered */
  DS.lang = q === "ar" ? "ar" : "en";
  const AR = DS.lang === "ar";

  /* ---------- interface words (English -> Arabic) ---------- */
  const UI = {
    /* home */
    "Introduction": "مقدمة", "Portfolio": "معرض الأعمال", "Journalism × Graphic Design": "الصحافة × التصميم الجرافيكي",
    "Journalist <em>&amp;</em> Graphic Designer": "صحفية <em>و</em>مصممة جرافيك",
    "Explore my work": "تصفّح أعمالي", "About me": "تعرّف إليّ", "Portrait of": "صورة",
    "Storyteller · Designer · Journalist · ": "راوية قصص · مصممة · صحفية · ",
    "The work: open a discipline": "الأعمال: اختر مجالًا", "The work": "الأعمال",
    "Journalism": "الصحافة", "Newspaper design": "تصميم الصحف", "Articles": "المقالات", "Editorial design": "التصميم التحريري",
    "Book layout": "تنسيق الكتب", "Social media": "التواصل الاجتماعي", "Kufi lettering": "الخط الكوفي",
    "Character design": "تصميم الشخصيات", "Character style": "أسلوب الشخصيات", "AI imagery": "صور بالذكاء الاصطناعي",
    /* about */
    "About": "نبذة عني", "A storyteller<br>who <em>designs.</em>": "أروي القصص<br><em>بالتصميم.</em>",
    "Who I am": "من أنا", "My philosophy": "فلسفتي", "Education": "التعليم", "Based in": "مقيمة في", "Looking for": "أتطلّع إلى",
    "Creativity": "الإبداع", "Integrity": "النزاهة", "Collaboration": "روح الفريق", "Meaningful communication": "تواصل له معنى",
    "Let’s talk": "لنتحدّث", "Skills and tools": "المهارات والأدوات", "Skills & tools": "المهارات والأدوات",
    "The <em>toolkit.</em>": "<em>أدواتي.</em>", "Software": "البرامج", "AI tools": "أدوات الذكاء الاصطناعي",
    "What I do": "ما أقدّمه", "Soft skills": "المهارات الشخصية",
    "Experience": "الخبرات", "Where I’ve <em>worked.</em>": "محطات <em>عملي.</em>", "Independent": "عمل حر", "Now": "حاليًا",
    "Honors and events": "التكريمات والفعاليات", "Honors & events": "التكريمات والفعاليات",
    "Recognition &amp; <em>community.</em>": "تكريم <em>وعطاء مجتمعي.</em>",
    "Selected work": "أعمال مختارة", "Let the work <em>speak.</em>": "لتتحدّث الأعمال <em>عن نفسها.</em>",
    "Pick one to open it.": "اختر مجالًا لتتصفّحه.", "across": "في",
    "Open": "افتح", "Contact": "تواصل معي", "Let’s create something <em>meaningful.</em>": "لنصنع معًا شيئًا <em>له معنى.</em>",
    "Write": "راسلني", "Call": "اتصل", "Email me": "راسلني", "Call me": "اتصل بي", "Copy email": "نسخ البريد الإلكتروني",
    "Let’s talk · Let’s talk · Let’s talk · ": "لنتحدّث · لنتحدّث · لنتحدّث · ", "Explore": "تصفّح",
    /* work pages */
    "Portfolio of": "معرض أعمال", "Arabic edition": "الطبعة العربية", "Front page to back page": "من الصفحة الأولى إلى الأخيرة",
    "How I make them": "كيف أصنعها", "Prompt lab": "مختبر البرومبت", "On this page": "في هذه الصفحة",
    "More work": "المزيد من الأعمال", "Next": "التالي",
    "Books": "الكتب", "Previous pages": "الصفحات السابقة", "Next pages": "الصفحات التالية",
    "View these pages full size": "اعرض هذه الصفحات بالحجم الكامل",
    "Book pages. Use the arrow keys to turn the page.": "صفحات الكتاب. استخدم مفاتيح الأسهم لتقليب الصفحات.",
    "View": "عرض", "All pages of this book": "جميع صفحات هذا الكتاب", "Book": "الكتاب", "of": "من",
    "End of book": "نهاية الكتاب", "Open page": "افتح الصفحة", "full size": "بالحجم الكامل",
    "Series": "السلسلة", "Client": "العميل", "Year": "السنة", "Posts": "المنشورات", "posts": "منشورات", "year": "السنة",
    "See the feed full size": "اعرض المنشورات بالحجم الكامل", "Educational publishing · Jordan": "نشر تعليمي · الأردن",
    "Scroll back": "رجوع", "Scroll forward": "تقدّم", "scroll sideways": "مرّر أفقيًا", "Open post": "افتح المنشور",
    "Full size": "الحجم الكامل",
    "Move over a page to read it through the magnifier. Click a page to open it full size.": "مرّر المؤشر فوق أي صفحة لتقرأها بالعدسة المكبّرة، واضغط عليها لفتحها بالحجم الكامل.",
    "Swipe to turn the page. Tap a page to open it full size, then zoom in.": "اسحب لتقليب الصفحات، واضغط على أي صفحة لفتحها بالحجم الكامل ثم كبّرها.",
    "In this edition": "في هذا العدد", "Front page": "الصفحة الأولى", "Back page": "الصفحة الأخيرة", "Page": "الصفحة", "Pages": "الصفحات",
    "open full size": "افتحها بالحجم الكامل",
    "Front": "أمامي", "¾ front": "¾ أمامي", "Side": "جانبي", "¾ back": "¾ خلفي", "Back": "خلفي",
    "Drag to turn": "اسحب لتدويرها", "Turn the character. Use the left and right arrow keys.": "أدِر الشخصية باستخدام السهمين الأيمن والأيسر.",
    "Drag": "اسحب", "Turnaround frames": "زوايا الدوران", "Model sheet for animation": "لوحة مرجعية للتحريك",
    "Spin": "تدوير", "Stop": "إيقاف", "Open full sheet": "افتح اللوحة كاملة", "See them animated": "شاهدها متحركة",
    "The cast": "الشخصيات", "Characters": "الشخصيات", "On every sheet": "تتضمن كل لوحة", "Open the full sheet": "افتح اللوحة كاملة",
    "The full sheet": "اللوحة كاملة",
    "Move over the sheet to look closely. Click to open it full size.": "مرّر المؤشر فوق اللوحة لتتأملها عن قرب، واضغط لفتحها بالحجم الكامل.",
    "Tap the sheet to open it full size, then zoom in.": "اضغط على اللوحة لفتحها بالحجم الكامل ثم كبّرها.",
    "(other side)": "(الجهة الأخرى)", "Frame": "زاوية", "degrees": "درجة", "No.": "رقم",
    "The sheets": "اللوحات", "The articles": "المقالات", "The posters": "الملصقات", "The prints": "اللوحات",
    "Read": "اقرأ", "Date to come": "سيُضاف التاريخ لاحقًا", "Read the article on": "اقرأ المقال على", "(opens in a new tab)": "(يُفتح في نافذة جديدة)",
    "Posters. Use the left and right arrow keys to browse.": "الملصقات. تصفّحها بالسهمين الأيمن والأيسر.",
    "Previous poster": "الملصق السابق", "Next poster": "الملصق التالي", "Show": "اعرض",
    "The covers": "الأغلفة", "Previous cover": "الغلاف السابق", "Next cover": "الغلاف التالي",
    "Flash cards": "بطاقات تعليمية", "Book cover": "غلاف كتاب", "Book covers": "أغلفة كتب", "The shelf": "الرف",
    "Click the picture to see it full size.": "اضغط على الصورة لتراها بالحجم الكامل.",
    "The series": "السلسلة", "Click a book to see its cover full size.": "اضغط على أي كتاب لترى غلافه بالحجم الكامل.",
    "Click a cover to see it full size.": "اضغط على أي غلاف لتراه بالحجم الكامل.",
    "All": "الكل", "Phonics books": "كتب صوتيات", "Kinds of cover": "أنواع الأغلفة", "Covers shelf": "رف الأغلفة",
    "Open cover": "افتح الغلاف", "Cover design": "تصميم غلاف", "For children": "للأطفال",
    "Designed by Dana Sukhon.": "من تصميم دانا السخن.", "See it full size": "شاهده بالحجم الكامل",
    "Drag the shelf, click a spine or use the arrows. Click the cover in front to see it full size.": "اسحب الرف أو اضغط على أي كعب أو استخدم الأسهم، واضغط على الغلاف في المقدمة لتراه بالحجم الكامل.",
    "Swipe the shelf or tap a spine. Tap the cover in front to see it full size.": "اسحب الرف بإصبعك أو اضغط على أي كعب، واضغط على الغلاف في المقدمة لتراه بالحجم الكامل.",
    "Drag to turn it around. Click to see the cover full size.": "اسحبه لتدويره، واضغط لرؤية الغلاف بالحجم الكامل.",
    "Drag a cover to turn it and see its spine and pages. Click it to see the cover full size.": "اسحب أي غلاف لتدويره وترى كعبه وصفحاته، واضغط عليه لترى الغلاف بالحجم الكامل.",
    "Swipe a cover to turn it. Tap it to see the cover full size.": "اسحب الغلاف بإصبعك لتدويره، واضغط عليه لتراه بالحجم الكامل.",
    "Covers. Use the left and right arrow keys to browse.": "الأغلفة. تصفّحها بالسهمين الأيمن والأيسر.",
    "Click the cover in front to see it full size. Pick another from the shelf, or use the arrows.": "اضغط على الغلاف في الواجهة لتراه بالحجم الكامل، واختر غلافًا آخر من الرف أو تنقّل بالأسهم.",
    "Click the poster in front to see it full size. Use the arrows, the arrow keys or a swipe to browse.": "اضغط على الملصق في المقدمة لتراه بالحجم الكامل، وتنقّل بين الملصقات بالأسهم أو بلوحة المفاتيح أو بالسحب.",
    "See print": "اعرض اللوحة",
    "Move over a print to look closely at the grid. Click to open it full size.": "مرّر المؤشر فوق اللوحة لتتأمل شبكتها عن قرب، واضغط لفتحها بالحجم الكامل.",
    "Tap a print to open it full size.": "اضغط على اللوحة لفتحها بالحجم الكامل.",
    "See this character full size": "اعرض الشخصية بالحجم الكامل", "Previous character": "الشخصية السابقة", "Next character": "الشخصية التالية",
    "Prompt examples": "أمثلة على البرومبت", "From story to <em>final image.</em>": "من القصة إلى <em>الصورة النهائية.</em>", "Tools": "الأدوات",
    "Prompt <em>examples.</em>": "أمثلة على <em>البرومبت.</em>",
    "One prompt for each style I work in. Every part of a prompt has a job: switch styles to see how each one is built.": "برومبت لكل أسلوب أعمل به، ولكل جزء منه وظيفة. بدّل بين الأساليب لترى كيف يُبنى كلٌّ منها.",
    "Prompt styles": "أساليب البرومبت", "Colour key": "مفتاح الألوان", "Copy prompt": "نسخ البرومبت",
    "See the result full size": "اعرض النتيجة بالحجم الكامل", "Result": "النتيجة",
    "Subject": "الموضوع", "Style": "الأسلوب", "Light": "الإضاءة", "Camera & framing": "الكاميرا والكادر", "Colour": "الألوان", "Ratio": "نسبة الأبعاد",
    "From": "من", "Collection": "المجموعة", "Open:": "افتح:", "No preview frame yet": "لا تتوفر صورة معاينة بعد",
    /* video and songs */
    "Raw scenes": "مشاهد قبل المونتاج", "Play": "تشغيل", "Pause": "إيقاف مؤقت", "Play scene": "شغّل المشهد", "on the big screen": "على الشاشة الكبيرة",
    "Open on Google Drive": "افتح على Google Drive", "Previous video": "الفيديو السابق", "Next video": "الفيديو التالي", "Videos": "الفيديوهات",
    "English": "الإنجليزية", "Arabic": "العربية", "Children’s song": "أغنية للأطفال", "Ready to play": "جاهزة للتشغيل",
    "Song position": "موضع التشغيل", "Previous song": "الأغنية السابقة", "Next song": "الأغنية التالية",
    "Playing on Google Drive": "تُشغَّل على Google Drive", "Now playing": "قيد التشغيل", "Paused": "متوقفة مؤقتًا",
    /* header, menu, viewer, messages */
    "Home": "الرئيسية", "Work": "الأعمال", "Skills": "المهارات", "Main": "القائمة الرئيسية", "Open a discipline": "اختر مجالًا",
    "Sound": "الصوت", "Sound on": "الصوت يعمل", "Sound off": "الصوت متوقف",
    "Sound effects on. Turn off": "المؤثرات الصوتية تعمل. اضغط لإيقافها", "Sound effects off. Turn on": "المؤثرات الصوتية متوقفة. اضغط لتشغيلها",
    "Menu": "القائمة", "Close": "إغلاق", "All disciplines": "جميع المجالات", "All work": "جميع الأعمال", "Sections": "الأقسام", "The portfolio": "معرض الأعمال",
    "Close viewer (Esc)": "إغلاق العارض (Esc)", "Previous image": "الصورة السابقة", "Next image": "الصورة التالية", "Image viewer": "عارض الصور",
    "Go to Songs": "انتقل إلى الأغاني", "Stop and close": "إيقاف وإغلاق",
    "Playing through Google Drive’s own player.": "يُشغَّل عبر مشغّل Google Drive.",
    "Email copied": "تم نسخ البريد الإلكتروني", "Prompt copied": "تم نسخ البرومبت", "Copied": "تم النسخ",
    "This song couldn’t play. Please try again.": "تعذّر تشغيل الأغنية، يُرجى المحاولة مرة أخرى.",
    "Skip to content": "تخطَّ إلى المحتوى", "Back to top": "العودة إلى الأعلى",
  };
  const DICT = Object.assign({}, window.I18N_DATA_AR || {}, UI);
  const REV = {}; Object.keys(DICT).forEach((k) => { REV[DICT[k]] = k; });

  /* T("English text") -> Arabic when the page is Arabic (else the text itself) */
  DS.T = (s) => (AR && s != null && DICT[s] !== undefined ? DICT[s] : s);
  /* the original English of a translated text (e.g. for a client's initials) */
  DS.en = (s) => (REV[s] !== undefined ? REV[s] : s);

  /* ---------- counts: "24 pages" / "24 صفحة" with Arabic number grammar ---------- */
  /* [one, 3-10 (plural), two (dual), 11+ (singular accusative)]; F = feminine nouns ("واحدة", not "واحد") */
  const UNITS = {
    pages: ["صفحة", "صفحات", "صفحتان", "صفحة"], posts: ["منشور", "منشورات", "منشوران", "منشورًا"],
    posters: ["ملصق", "ملصقات", "ملصقان", "ملصقًا"], prints: ["لوحة", "لوحات", "لوحتان", "لوحة"],
    covers: ["غلاف", "أغلفة", "غلافان", "غلافًا"],
    illustrations: ["رسمة", "رسوم", "رسمتان", "رسمة"], images: ["صورة", "صور", "صورتان", "صورة"],
    sheets: ["لوحة", "لوحات", "لوحتان", "لوحة"], videos: ["فيديو", "فيديوهات", "فيديوان", "فيديو"],
    songs: ["أغنية", "أغانٍ", "أغنيتان", "أغنية"], tracks: ["أغنية", "أغانٍ", "أغنيتان", "أغنية"],
    articles: ["مقال", "مقالات", "مقالان", "مقالًا"], books: ["كتاب", "كتب", "كتابان", "كتابًا"],
    series: ["سلسلة", "سلاسل", "سلسلتان", "سلسلة"], collections: ["مجموعة", "مجموعات", "مجموعتان", "مجموعة"],
    prompts: ["برومبت", "برومبتات", "برومبتان", "برومبتًا"], formats: ["نوع", "أنواع", "نوعان", "نوعًا"],
    languages: ["لغة", "لغات", "لغتان", "لغة"], "turnaround views": ["زاوية", "زوايا", "زاويتان", "زاوية"],
    "unedited scenes": ["مشهد قبل المونتاج", "مشاهد قبل المونتاج", "مشهدان قبل المونتاج", "مشهدًا قبل المونتاج"],
    scenes: ["مشهد", "مشاهد", "مشهدان", "مشهدًا"], pieces: ["عمل", "أعمال", "عملان", "عملًا"],
    disciplines: ["مجال", "مجالات", "مجالان", "مجالًا"],
  };
  const F = new Set(["pages", "prints", "illustrations", "images", "sheets", "songs", "tracks", "series", "collections", "languages", "turnaround views"]);
  const arForm = (n, u) => { const f = UNITS[u]; if (!f) return null; return n === 1 ? f[0] : n === 2 ? f[2] : n >= 3 && n <= 10 ? f[1] : f[3]; };
  /* "one" after the noun; a phrase like "مشهد قبل المونتاج" takes it after the first word */
  const one = (u) => { const f = UNITS[u][0], w = F.has(u) ? "واحدة" : "واحد", i = f.indexOf(" "); return i < 0 ? `${f} ${w}` : `${f.slice(0, i)} ${w}${f.slice(i)}`; };
  /* the word after a number shown separately (e.g. "24" big + "pages" small) */
  /* English singular for one item: "1 cover", not "1 covers" */
  const enForm = (n, u) => (n === 1 && /[^s]s$/.test(u) && u !== "series" ? u.slice(0, -1) : u);
  DS.unitLabel = (n, u) => (AR ? arForm(n, u) || u : enForm(n, u));
  /* "24 pages" */
  DS.units = (n, u) => { if (!AR) return `${n} ${enForm(n, u)}`; const f = arForm(n, u); if (!f) return `${n} ${u}`; return n === 2 ? f : n === 1 ? one(u) : `${n} ${f}`; };
  /* label above a number in the facts box ("PAGES 24") */
  DS.factLabel = (u) => (AR && UNITS[u] ? UNITS[u][1] : u);

  /* ---------- swap the content in data.js for its translation ---------- */
  const SKIP = new Set(["src", "file", "thumb", "front", "cover", "drive", "url", "acc", "icon", "id", "layout", "unit", "lang",
    "bg", "fg", "email", "behance", "linkedin", "phone", "phoneLabel", "portrait", "parts", "tools", "outlet", "date", "short_code"]);
  const walk = (o) => {
    if (Array.isArray(o)) { o.forEach((v, i) => { if (typeof v === "string") { if (DICT[v] !== undefined) o[i] = DICT[v]; } else if (v && typeof v === "object") walk(v); }); return; }
    Object.keys(o).forEach((k) => {
      const v = o[k];
      if (SKIP.has(k)) return;
      if (typeof v === "string") { if (DICT[v] !== undefined) o[k] = DICT[v]; }
      else if (v && typeof v === "object") walk(v);
    });
  };
  const site = window.SITE;
  if (site) {
    (site.experience || []).forEach((e) => { e.now = e.to === "Present"; });   /* keep the "current job" flag in both languages */
    if (AR) walk(site);
  }

  /* ---------- page direction, language and fonts ---------- */
  const html = document.documentElement;
  html.lang = AR ? "ar" : "en";
  html.dir = AR ? "rtl" : "ltr";
  if (AR) {
    const pn = document.querySelector(".pl-name"); if (pn) pn.innerHTML = "<span>دانا</span> <em>السخن</em>";
    const pm = document.querySelector(".pl-meta span"); if (pm) pm.textContent = "صحفية ومصممة جرافيك";
    const sk = document.querySelector(".skip"); if (sk) sk.textContent = DICT["Skip to content"];
  }

  /* switch language: reload on the same page, with ?lang=ar for Arabic and the plain address for English */
  DS.setLang = (l) => {
    const u = new URL(location.href);
    if (l === "ar") u.searchParams.set("lang", "ar"); else u.searchParams.delete("lang");
    location.replace(u.toString());
  };
})();
