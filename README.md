# Dana Sukhon — Portfolio website

An editorial, interactive portfolio for **Dana Sukhon, Journalist & Graphic Designer**,
built from the 2026 portfolio PDF. Warm ivory, burgundy and dusty pink, Cormorant Garamond
headlines and Manrope text, and a different interface for each discipline.

- **No build step, no dependencies.** Plain HTML, CSS and JavaScript. Open `index.html` or put
  the folder on GitHub Pages; there is nothing to install or compile.
- **All content in one file:** `js/data.js` (text, links, every artwork, video and song).
- **157 pieces**, each shown once, in this order: 44 AI images, 12 characters, 8 character model sheets, 23 posts, 9 videos, 11 songs, 33 book pages, 4 posters, 2 Kufi prints, 8 newspaper pages, 3 published articles
  (the order of the categories in `js/data.js` is the order everywhere on the site)
  (4 collections + 4 prompt examples), 9 videos, 11 songs.

---

## 1. Look at it on your computer

**Easiest:** double-click `index.html`. It opens in your browser and everything works
(an internet connection is needed for the fonts, videos and songs).

**Or as a local website** (closest to GitHub Pages):

```powershell
powershell -ExecutionPolicy Bypass -File tools\serve.ps1
```

then open <http://localhost:8080/>. Press `Ctrl+C` in that window to stop it.

---

## 2. Publish on GitHub Pages

You only upload the files; GitHub serves them as they are.

1. Sign in at <https://github.com> and click **New repository**.
   Name it, for example, `portfolio` (or `<your-username>.github.io` to get the short address).
   Make it **Public** and click **Create repository**.
2. On the new repository page click **uploading an existing file**.
3. Open this `website` folder, select **everything inside it** (not the folder itself):
   `index.html`, `404.html`, `.nojekyll`, `assets`, `css`, `js`, `tools`, `README.md`.
   Drag them into the upload area and click **Commit changes**.
   *Tip: `.nojekyll` is a hidden file. In Windows Explorer turn on View → Show → Hidden items,
   or skip it; the site works without it.*
4. Go to **Settings → Pages**. Under **Build and deployment** choose
   **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
5. After a minute the address appears at the top of that page:
   `https://<your-username>.github.io/portfolio/`

**Updating later:** upload the changed files again (same names), and they replace the old ones.
GitHub Desktop (<https://desktop.github.com>) makes this a one-click "Push" if you prefer.

### Why it works on GitHub Pages without setup
- Every path is relative (`assets/…`, `css/…`), so it works in a sub-folder like `/portfolio/`.
- Pages use the address hash (`#books`, `#about` …). Refreshing or sharing a link always
  works, because GitHub only ever serves `index.html`.
- `404.html` sends mistyped addresses back to the portfolio.

---

## 3. Change the content

Everything lives in **`js/data.js`**. Open it in any text editor (Notepad works; VS Code is nicer).

| To change… | Edit in `data.js` |
|---|---|
| Name, title, statement, intro | `person` |
| Email, Behance, LinkedIn, phone | `contact` (leave a value `""` to hide it; the phone shows while `showPhone: true`) |
| About text, education | `about` |
| Skills and tools | `skills` |
| Jobs | `experience` |
| Honors and events | `honors` |
| Projects | `work` → the category → `sets` → `items` |
| A full-width home cover | add `wide: true` to a category (Character Style uses it). Covers pair up automatically; one left without a partner also goes full width |
| A new character sheet | add the JPG to `character-style/`, then in `data.js` give it `turn` (where its 5 turnaround views sit, in pixels) and a `front` crop of the front view in `character-style/fronts/` |
| Articles | `work` → Writing & Articles → `items`: `title`, `outlet`, `date` (YYYY-MM-DD), `kind`, `summary`, `url` |

### Add a new image
1. Put the JPG in the right folder: `assets/images/newspaper/`, `books/`, `social-media/`, `posters/`, `kufi-print/`,
   `characters/`, `ai-images/` or `video-thumbnails/`.
2. Run `powershell -ExecutionPolicy Bypass -File tools\prepare-images.ps1`.
   It makes the smaller grid copy in `thumbs/` and records the image size in
   `assets/images/manifest.js`, so the page never jumps while loading.
3. Add one line for it in `data.js`, e.g.
   `{ src: "books/new-page.jpg", alt: "Unit 3 opener: At the zoo" },`

### Videos and songs
The songs and videos live **inside the website** and play directly on the page, with no Google Drive:

- songs: `assets/audio/*.mp3`, played by the site's own player (play/pause, progress, length)
- videos: `assets/videos/*.mp4`, played on the cinema screen of the Video page

To add one, put the file in that folder and add a line in `data.js` with `file: "assets/audio/name.mp3"`
(or `assets/videos/name.mp4`). Keep each file **under 100 MB** (GitHub's limit); large videos can be
shrunk with FFmpeg, e.g.
`ffmpeg -i big.mov -vf scale=-2:720 -c:v libx264 -crf 25 -c:a aac -b:a 128k -movflags +faststart small.mp4`.
The `drive:` ids are kept only as a reference to the originals; they are used only if `file` is empty.

---

## 4. What is in the site

**Home**: oversized editorial name, arched portrait, and a numbered index of the eleven
disciplines on the first screen. Then the work (eleven art-directed covers, with the
Character Style cast lineup across the full width), About (bento
cards), Skills & tools, an animated Experience timeline, Honors & events, and Contact.

**One page per discipline**, each with its own interface:

| Page | Interface |
|---|---|
| Newspaper | Styled like a paper: blackletter masthead, double rules and newsprint. The edition opens as right-to-left spreads with a centre fold, has a reading magnifier at full resolution, and an "In this edition" index in ruled columns |
| Writing & Articles | A bilingual list of published pieces (date, type, outlet, English summary, Arabic headline). Each links to the article on its own site |
| Book Design | An open book: tabs for the 4 books, a 3D page turn, a page strip, full-size viewer |
| Social Media | A phone with the real feed, and a rail for the burger teaser and menu posts |
| Posters | A 3D carousel of the posters; the one in front opens full size |
| Kufi Print | Framed prints on a cross-stitch wall, with a magnifier to look closely at the grid |
| Character Style | A turntable: each character stands on a rotating platform and can be dragged, spun or stepped through an 8-frame animation timeline (views cut from the sheet itself). Then a cast lineup to switch character, and the full model sheet with a magnifier |
| Character Design | A character "roster": pick one to bring it to the stage |
| AI Images | The 4-step process, a prompt lab that types out each prompt with its parts colour-coded (copy button), and 4 collections laid out as an exhibition |
| Video | A cinema screen that plays the Drive video in place, with a film-reel selector |
| Songs | A record sleeve and vinyl that spins while playing, tracklist with progress and durations |

**Navigation**: a header with a Work dropdown, a full-screen menu (work first), a
discipline bar that stays at the top of every work page, "Next" links between disciplines,
a scroll progress line and a back-to-top button.

**Motion and feel**: preloader (once per visit), page curtain transitions, word-by-word
headline reveals, scroll reveals, gentle parallax, magnetic buttons, a custom cursor on
desktop ("View", "Play", "Explore"…), a marquee band, and image expansion into the viewer.

**Sound**: soft, synthesised clicks and transitions. **Off by default**, never automatic,
switched on with the *Sound* button (the choice is remembered).

**Accessibility**: keyboard navigation everywhere (arrow keys in viewers, Esc to close),
visible focus rings, dialogs that keep focus inside, alt text on every image, Arabic titles
marked right-to-left, and reduced-motion support (animations switch off when the visitor's
system asks for less motion).

**Performance**: images load lazily from 600-px grid copies and switch to the full file only
when shown large; every image has its size reserved; no frameworks or libraries.

---

## 5. Files

```
website/
├── index.html              the page shell
├── 404.html                sends unknown addresses home
├── .nojekyll               tells GitHub Pages to serve files as they are
├── css/styles.css          the whole visual system (colours, type, layouts, motion)
├── js/
│   ├── data.js             ← ALL CONTENT: edit this one
│   ├── icons.js            line icons
│   ├── core.js             helpers, sound, cursor, scroll reveals
│   ├── media.js            image viewer, Drive player, song player
│   ├── views.js            builds the home page and the work pages
│   └── main.js             header, menu, page changes, start-up
├── assets/
│   ├── favicon.svg
│   └── images/
│       ├── manifest.js     image sizes (made by prepare-images.ps1)
│       ├── ai-images/  social-media/  books/  video-thumbnails/  posters/  kufi-print/  characters/
│       ├── character-style/ (+ fronts/)  newspaper/  portrait/
│       └── …/thumbs/       grid-size copies
└── tools/
    ├── prepare-images.ps1  make thumbs + manifest after adding images
    └── serve.ps1           preview locally at http://localhost:8080
```

See **MISSING-ASSETS.md** for the links and files still to confirm.

### A note on the technology
The brief suggested React + Vite. Node.js is not installed on this computer, and a build
step would mean installing tools every time a picture is added. This version gives the same
result (components driven by data, page routing, animation) with zero dependencies, so it
can be edited in Notepad and published by uploading files. It can be moved to React + Vite
later without changing `data.js`.
