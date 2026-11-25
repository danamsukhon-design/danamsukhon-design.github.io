/* =====================================================================
   SITE CONTENT  -  edit this file to change text, add work or fix links.
   ---------------------------------------------------------------------
   Images live in assets/images/<folder>/ (full size) and
   assets/images/<folder>/thumbs/ (grid size, made by tools/prepare-images.ps1).
   In this file an image is written as "folder/file.jpg".

   Adding a new image:
     1. put the JPG in the right assets/images/<folder>/
     2. run  tools/prepare-images.ps1  (makes the thumb + records its size)
     3. add a line for it below
   ===================================================================== */

window.SITE = {

  /* ---------- who ---------- */
  person: {
    name: "Dana Sukhon",
    title: "Journalist & Graphic Designer",
    statement: "Strong storytelling, combined with impactful visuals.",
    location: "Amman, Jordan",
    year: "2026",
    portrait: "portrait/dana-sukhon.jpg",
    intro: "I’m a journalist and graphic designer. I turn stories, lessons and ideas into visuals people want to look at: books, posts, characters, AI imagery, video and sound.",
  },

  /* ---------- contact ----------
     Leave a value empty ("") to hide that link.
     showPhone: true shows the phone number in Contact and in the menu.   */
  contact: {
    email: "danamsukhon@gmail.com",
    behance: "https://www.behance.net/danasukhon",
    linkedin: "https://www.linkedin.com/in/dana-sukhon-99a9282a2/",
    phone: "+962778945414",
    phoneLabel: "0778 945 414",
    showPhone: true,
  },

  /* ---------- about ---------- */
  about: {
    lead: "I combine strong storytelling with impactful visuals.",
    body: [
      "My background is journalism and digital media, so I start every piece with the story: who it is for, what it needs to say, and how it should feel. Graphic design is how I make that story land.",
      "Today that means laying out educational books, running social media for a publisher, building characters and AI scenes for children’s learning, editing video and recording voice-over.",
    ],
    looking: "I’m looking to join a creative team that values integrity and collaboration.",
    education: [
      { degree: "B.A. Journalism & Digital Media", school: "University of Petra" },
      { degree: "Diploma in Graphic Design", school: "University of Petra" },
    ],
  },

  /* ---------- skills ---------- */
  skills: {
    software: [
      { short: "Ai", name: "Adobe Illustrator", bg: "#330000", fg: "#FF9A00" },
      { short: "Ps", name: "Adobe Photoshop",   bg: "#001E36", fg: "#31A8FF" },
      { short: "Id", name: "Adobe InDesign",    bg: "#49021F", fg: "#FF3366" },
      { short: "Pr", name: "Adobe Premiere Pro",bg: "#00005B", fg: "#9999FF" },
      { short: "Xd", name: "Adobe XD",          bg: "#470137", fg: "#FF61F6" },
    ],
    ai: ["Grok", "ElevenLabs", "Magnific AI", "Claude"],
    services: [
      { icon: "wand",     name: "AI image & video creation" },
      { icon: "phone",    name: "Social media design" },
      { icon: "book",     name: "Book layout" },
      { icon: "scissors", name: "Video montage" },
      { icon: "mic",      name: "Voice-over" },
      { icon: "pen",      name: "Proofreading" },
    ],
    soft: [
      { icon: "users",   name: "Teamwork" },
      { icon: "message", name: "Communication" },
      { icon: "clock",   name: "Time management" },
      { icon: "zap",     name: "Fast learner" },
    ],
  },

  /* ---------- experience (in the order of the portfolio) ---------- */
  experience: [
    { org: "Elitech", role: "Graphic Designer & AI Content Creator", from: "Feb 2026", to: "Present",
      points: ["Book design and layout in InDesign.", "AI images, videos and visual content."] },
    { org: "Dar Al Radwan Publishing", role: "Social Media Manager", from: "Oct 2026", to: "Present",
      points: ["Planning, creating and publishing content.", "Managing all company platforms."] },
    { org: "JBCP", role: "Health Awareness Educator", from: "Aug 2024", to: "Present",
      points: ["Public health lectures.", "Community events."] },
    { org: "Al Qallah News", role: "Voice Over", from: "2021", to: "2023", points: [] },
    { org: "University of Petra Library", role: "Library Assistant", from: "2022", to: "2023", points: [] },
    { org: "Freelance", role: "Graphic Designer", from: "", to: "", points: [] },
  ],

  /* ---------- honors & events ---------- */
  honors: [
    { icon: "award",     title: "Young Storytellers Forum",     text: "Recognized by Philadelphia University for sharing her story." },
    { icon: "megaphone", title: "Media & Smoking Symposium",    text: "Co-organizer, under the patronage of HRH Princess Dina Mired." },
    { icon: "palette",   title: "Masar Art Exhibition",         text: "Co-organizer and exhibiting artist." },
    { icon: "heart",     title: "Breast Cancer Awareness Day",  text: "Organized with JBCP and KHCF at the University of Petra." },
  ],

  /* =====================================================================
     WORK  -  one entry per discipline. Each has its own page (#books, #social, #kufi ...).
     acc = the category's accent colour.  cover = image on the home page.
     ===================================================================== */
  work: [

    /* ---------------- 01 AI IMAGES ---------------- */
    {
      id: "ai", title: "AI Images", unit: "images", icon: "sparkles", acc: "#8A4A6E", dark: true,
      kicker: "Generated, refined, upscaled",
      short: "Scenes for stories and lessons, nature and celebrations, finance concepts and cinematic photo-real work.",
      lead: "Images that start from a story. Every scene is prompted, refined until the details are right, then upscaled for print and social media.",
      cover: "ai-images/41-throne-room.jpg",
      tools: "ChatGPT, Magnific AI",
      process: [
        { tool: "Brief",       title: "Start from the story", text: "Begin with the lesson or story: who is in the scene, what they are doing, the mood, and where the image will be used." },
        { tool: "ChatGPT",     title: "Write the prompt",     text: "Describe the subject, style, lighting, camera angle, colours and aspect ratio in one clear, detailed prompt." },
        { tool: "ChatGPT",     title: "Generate and refine",  text: "Generate the image and adjust the prompt until the characters, poses and details are correct and consistent across a series." },
        { tool: "Magnific AI", title: "Upscale and enhance",  text: "Use Magnific AI to upscale the final image and enhance details for printed books, posters and social media." },
      ],
      /* Prompt examples - the parts are coloured by role in the prompt lab:
         s = subject, st = style, l = light, c = camera / framing, co = colour, r = ratio  */
      prompts: [
        { src: "ai-images/05-library.jpg", style: "3D animation", from: "Scenes for stories & lessons", alt: "A girl choosing a book from a shelf",
          parts: [["st","3D animated-film style:"]," ",["s","a cheerful little girl with straight blonde hair, a red headband, a striped yellow T-shirt and denim overalls reaches for a dark blue book with gold stars on a library shelf."]," ",["l","Warm sunlight from a window, soft bokeh,"]," ",["c","framed by book spines,"]," ",["r","square."]] },
        { src: "ai-images/16-ember-leaf.jpg", style: "Anime illustration", from: "Nature & celebrations", alt: "Glowing embers falling on a dry leaf near a campfire",
          parts: [["st","Anime-style illustration"]," for a wildfire-safety lesson: ",["s","glowing embers fall from a campfire onto a dry green leaf lying on a log. Thin smoke, tiny sparks, the leaf starting to scorch."]," ",["c","Shallow depth of field, campfire blurred behind,"]," ",["l","warm orange light,"]," ",["r","square."]] },
        { src: "ai-images/30-glass-machine.jpg", style: "3D concept render", from: "Business & finance concepts", alt: "A glass machine sorting coins and notes towards a check mark",
          parts: [["st","3D concept render"]," for an article on automated payments: ",["s","a glass machine on a reflective floor"]," ",["l","at sunset,"]," ",["s","with four clear compartments linked by glowing teal circuit lines: gold coins, banknotes, a light node and a white check mark."]," ",["co","Teal-and-gold palette,"]," ",["r","square."]] },
        { src: "ai-images/36-rainy-street.jpg", style: "Photo-real", from: "Cinematic & photo-real", alt: "A rainy city street at dusk with glowing lamps",
          parts: [["st","Photo-real"]," ",["s","rainy city street at dusk: wet paving reflecting warm street lamps and neon signs, heavy rain, car headlights in the distance under an arched bridge, trees on both sides."]," ",["c","Symmetrical one-point perspective,"]," ",["co","cinematic colour grading,"]," ",["c","35mm lens,"]," ",["r","square."]] },
      ],
      sets: [
        { title: "Scenes for Stories & Lessons", layout: "rows",
          desc: "AI-generated illustrations for children’s stories and lessons: a robotics class, a cooking show, an earthquake story and everyday moments.",
          items: [
            { src: "ai-images/06-kitchen.jpg",           alt: "A mother and daughter putting the shopping away in the kitchen" },
            { src: "ai-images/02-robot-race.jpg",        alt: "Children racing a line-following robot" },
            { src: "ai-images/08-chef-yogurt.jpg",       alt: "A reporter interviews a chef pouring yoghurt" },
            { src: "ai-images/10-earthquake-street.jpg", alt: "A street after an earthquake" },
            { src: "ai-images/11-cautious-steps.jpg",    alt: "A worried boy walking through a damaged street" },
            { src: "ai-images/12-rebuilding.jpg",        alt: "Neighbours rebuilding a house together" },
            { src: "ai-images/13-five-scenes.jpg",       alt: "Five small scenes of kindness and courage" },
            { src: "ai-images/14-kitchen-talk.jpg",      alt: "Two children talking at a kitchen table" },
            { src: "ai-images/15-captain.jpg",           alt: "A smiling ship captain at the helm" },
            { src: "ai-images/01-robotics-class.jpg",    alt: "A robotics class with a teacher and students" },
            { src: "ai-images/03-robot-sketch.jpg",      alt: "A teacher helps a boy sketch a robot" },
            { src: "ai-images/04-shopping-list.jpg",     alt: "A girl and her mother with a picture shopping list" },
            { src: "ai-images/07-chef-flour.jpg",        alt: "A reporter interviews a chef pouring flour" },
            { src: "ai-images/09-chef-apples.jpg",       alt: "A chef adds apple pieces to the batter" },
          ] },
        { title: "Nature & Celebrations", layout: "squares",
          desc: "Square scenes for lessons: natural hazards such as wildfire, avalanche, big waves and drought, and moments from celebrations and daily life.",
          items: [
            { src: "ai-images/17-avalanche.jpg",        alt: "An avalanche of snow and rocks hitting a mountain village" },
            { src: "ai-images/18-wave.jpg",             alt: "A big wave rolling towards a seaside town" },
            { src: "ai-images/19-drought-grass.jpg",    alt: "Dry grass growing through cracked earth by a fence" },
            { src: "ai-images/20-invitation.jpg",       alt: "A hand holding a sealed invitation envelope" },
            { src: "ai-images/21-wedding-rings.jpg",    alt: "Wedding rings in a box beside a bouquet" },
            { src: "ai-images/22-gold-date.jpg",        alt: "Hands holding a gold plate engraved with a date" },
            { src: "ai-images/23-party-mask.jpg",       alt: "A hand holding a party mask at a birthday party" },
            { src: "ai-images/24-birthday-party.jpg",   alt: "Friends clapping around a birthday cake" },
            { src: "ai-images/25-birthday-cake.jpg",    alt: "Two friends eating birthday cake" },
            { src: "ai-images/26-packing-backpack.jpg", alt: "A boy packing a book into his backpack" },
          ] },
        { title: "Business & Finance Concepts", layout: "mosaic",
          desc: "Concept visuals for finance and data topics: glass devices, data streams and growth charts in a teal-and-gold palette.",
          items: [
            { src: "ai-images/27-data-box.jpg",      alt: "Glowing data streams flowing out of a clear box on a desk" },
            { src: "ai-images/28-growth-chart.jpg",  alt: "A glass bar chart with a rising arrow and light trails" },
            { src: "ai-images/29-data-pipeline.jpg", alt: "Three data streams merging into a glass chart, ending in a check mark" },
            { src: "ai-images/31-money-pipe.jpg",    alt: "A glowing pipe carrying data to a gold coin, with charts above" },
            { src: "ai-images/32-cash-box-desk.jpg", alt: "A glass cash box and a laptop dashboard at sunset" },
          ] },
        { title: "Cinematic & Photo-Real", layout: "wall",
          desc: "Photo-real and cinematic scenes: landscapes, historical portraits, royal halls, a courtroom and still life.",
          items: [
            { src: "ai-images/43-crown-ballroom.jpg", alt: "An old man holding a crown in a grand ballroom" },
            { src: "ai-images/33-lake-sunset.jpg",    alt: "A sunset over a calm lake between wooded hills" },
            { src: "ai-images/35-king-mirror.jpg",    alt: "A king in royal robes looking at himself in a gold mirror" },
            { src: "ai-images/40-pawn-mirror.jpg",    alt: "A chess pawn seeing itself crowned in a mirror" },
            { src: "ai-images/34-cinnamon.jpg",       alt: "Cinnamon sticks beside a pile of ground cinnamon" },
            { src: "ai-images/37-sepia-teacher.jpg",  alt: "A sepia portrait of a teacher and a girl in a library" },
            { src: "ai-images/42-courtroom.jpg",      alt: "A judge reading a verdict in a crowded courtroom" },
            { src: "ai-images/38-mountain-valley.jpg",alt: "A river winding through a flowering mountain valley" },
            { src: "ai-images/41-throne-room.jpg",    alt: "An empty marble throne in a sunlit hall" },
            { src: "ai-images/39-caregiver.jpg",      alt: "A young man sitting beside an elderly man asleep in a chair" },
            { src: "ai-images/44-quiet-sea.jpg",      alt: "A calm sea at dawn" },
          ] },
      ],
    },

    /* ---------------- 02 CHARACTER DESIGN ---------------- */
    {
      id: "characters", title: "Character Design", unit: "illustrations", icon: "smile", acc: "#C0714A",
      kicker: "Characters & props",
      short: "A cast of friendly 3D-style characters, animals and props for children’s learning materials.",
      lead: "A cast of friendly 3D-style characters, animals and props for children’s learning materials.",
      cover: "characters/03-curly-girl.jpg",
      sets: [
        { title: "The Cast", layout: "roster",
          desc: "Pick a character to bring it to the front. Tap the big one to see it full size.",
          items: [
            { src: "characters/03-curly-girl.jpg",     name: "Curly girl",     alt: "Portrait of a smiling girl with curly hair" },
            { src: "characters/04-snowflake-girl.jpg", name: "Snowflake girl", alt: "A girl in a purple jumper holding a big snowflake" },
            { src: "characters/05-boy-and-rabbit.jpg", name: "Boy & rabbit",   alt: "A boy feeding a carrot to a rabbit" },
            { src: "characters/01-jobs.jpg",           name: "Community jobs", alt: "Six characters at work: bus driver, teacher, technician, doctor, nurse and robotics engineer" },
            { src: "characters/02-kids-painting.jpg",  name: "Painting class", alt: "Two children painting flowers at a table" },
            { src: "characters/12-nervous-girl.jpg",   name: "On stage",       alt: "A nervous girl holding a microphone" },
            { src: "characters/06-cat.jpg",            name: "Cat",            alt: "A grey cat with a fish in its mouth" },
            { src: "characters/10-bird.jpg",           name: "Bluebird",       alt: "A blue bird singing on a branch" },
            { src: "characters/11-goldfish.jpg",       name: "Goldfish",       alt: "A goldfish jumping out of a pond" },
            { src: "characters/07-pies.jpg",           name: "Berry pies",     alt: "Two berry pies" },
            { src: "characters/08-oven.jpg",           name: "Toy oven",       alt: "A toy-like blue oven baking a cake" },
            { src: "characters/09-cake.jpg",           name: "Birthday cake",  alt: "A strawberry birthday cake with three candles" },
          ] },
      ],
    },

    /* ---------------- 03 CHARACTER STYLE ----------------
       Model sheets for animating characters in video.
       turn = where the 5 turnaround views sit on the sheet, in the sheet's own pixels:
         y = top and bottom of the figures, fw = width of one view,
         x = centre of each view (front, 3/4 front, side, 3/4 rear, back).
       The page uses it to let visitors turn each character around.
       front = a crop of the front view (character-style/fronts/), used on the home cover
       and in the character picker so the page does not load every full sheet.
       wide: true = a full-width cover on the home page. */
    {
      id: "charstyle", title: "Character Style", unit: "sheets", icon: "layers", acc: "#5A6796", wide: true,
      kicker: "Model sheets for animation",
      short: "Model sheets that keep each character consistent when it is animated in video.",
      lead: "Full model sheets that keep each character consistent from shot to shot when it is animated in video: turnaround, expressions, mouth shapes for lip-sync, hand poses, construction, costume and materials.",
      includes: ["Turnaround in 5 views", "Facial expressions", "Mouth shapes for lip-sync", "Hand poses", "Eye & head construction", "Hair breakdown", "Costume construction", "Materials & colours", "Close-up details"],
      sets: [
        { title: "The Sheets", layout: "turnaround",
          desc: "Pick a character, turn it around, then look closely at the full sheet.",
          items: [
            { src: "character-style/sheet-01.jpg", front: "character-style/fronts/sheet-01.jpg", name: "Girl in a yellow pinafore",
              turn: { y: [40, 575], fw: 172, x: [126, 321, 475, 640, 834] },
              alt: "Model sheet for a girl with black pigtails in a yellow pinafore: turnaround, expressions, mouth shapes, hand poses, construction and costume" },
            { src: "character-style/sheet-02.jpg", front: "character-style/fronts/sheet-02.jpg", name: "Girl in a flower T-shirt",
              turn: { y: [50, 555], fw: 175, x: [361, 545, 740, 916, 1124] },
              alt: "Model sheet for a girl with blonde pigtails in a yellow flower T-shirt and jeans" },
            { src: "character-style/sheet-03.jpg", front: "character-style/fronts/sheet-03.jpg", name: "Boy in a red sweater",
              turn: { y: [45, 615], fw: 200, x: [136, 343, 564, 792, 1005] },
              alt: "Model sheet for a boy with brown hair in a red sweater and jeans" },
            { src: "character-style/sheet-04.jpg", front: "character-style/fronts/sheet-04.jpg", name: "Girl in a blue cardigan",
              turn: { y: [45, 640], fw: 190, x: [348, 542, 770, 990, 1216] },
              alt: "Model sheet for a girl with a brown ponytail in a blue cardigan and patterned shirt" },
            { src: "character-style/sheet-05.jpg", front: "character-style/fronts/sheet-05.jpg", name: "Boy in a red hoodie",
              turn: { y: [40, 575], fw: 230, x: [131, 406, 693, 984, 1326] },
              alt: "Model sheet for a boy with curly hair in a red hoodie and jeans" },
            { src: "character-style/sheet-06.jpg", front: "character-style/fronts/sheet-06.jpg", name: "Woman in a pink blouse",
              turn: { y: [65, 525], fw: 220, x: [245, 488, 722, 987, 1262] },
              alt: "Model sheet for a woman with a brown bob in a pink and green blouse, jeans and a belt" },
            { src: "character-style/sheet-07.jpg", front: "character-style/fronts/sheet-07.jpg", name: "Girl with a backpack",
              turn: { y: [60, 665], fw: 190, x: [239, 433, 657, 854, 1077] },
              alt: "Model sheet for a girl with a brown ponytail in a pink T-shirt and jeans, with a backpack" },
            { src: "character-style/sheet-08.jpg", front: "character-style/fronts/sheet-08.jpg", name: "Boy in a star T-shirt",
              turn: { y: [60, 560], fw: 195, x: [199, 455, 659, 858, 1082] },
              alt: "Model sheet for a boy with brown hair in a blue star T-shirt and grey jeans" },
          ] },
      ],
    },

    /* ---------------- 04 SOCIAL MEDIA ---------------- */
    {
      id: "social", title: "Social Media", unit: "posts", icon: "phone", acc: "#B0606C",
      kicker: "Campaigns & feeds",
      short: "Posts for an educational publisher, and a teaser series for a burger brand.",
      lead: "Feeds built as a series: each post works on its own, and together they tell the brand’s story.",
      cover: "social-media/post-07.jpg",
      sets: [
        { title: "Educational Publishing", client: "Redwan Publishing House", year: "2026", layout: "phone",
          desc: "Posts for an educational publisher in Jordan, introducing its children’s book series.",
          /* No book or series names anywhere (Dana's request): captions describe the picture only. */
          items: [
            { src: "social-media/post-01.jpg", alt: "A boy holding a book" },
            { src: "social-media/post-02.jpg", alt: "A boy at a laptop with a workbook page" },
            { src: "social-media/post-03.jpg", alt: "A girl at a green door with an Arabic letter" },
            { src: "social-media/post-04.jpg", alt: "An About Us post for the publisher" },
            { src: "social-media/post-05.jpg", alt: "A boy reading behind a green door" },
            { src: "social-media/post-06.jpg", alt: "A school bag filled with books" },
            { src: "social-media/post-07.jpg", alt: "A boy carrying books in his backpack" },
            { src: "social-media/post-08.jpg", alt: "A cartoon character with a pencil case" },
            { src: "social-media/post-09.jpg", alt: "Three cartoon characters" },
            { src: "social-media/post-10.jpg", alt: "Friday greeting" },
            { src: "social-media/post-11.jpg", alt: "An astronaut boy through a green door" },
            { src: "social-media/post-12.jpg", alt: "A partnership announcement" },
            { src: "social-media/post-13.jpg", alt: "A Who We Are post" },
          ] },
        { title: "Burger Brand Teaser", layout: "teaser",
          desc: "A teaser series for a burger brand, building up to the big reveal, and posts for its menu.",
          items: [
            { src: "social-media/burger-01-flavor-worth-waiting.jpg", alt: "A flavor worth the wait: close-up of a burger" },
            { src: "social-media/burger-02-something-delicious.jpg",  alt: "Something delicious is cooking: a sesame bun" },
            { src: "social-media/burger-03-secret-in-details.jpg",    alt: "The secret is in the details: dripping sauce" },
            { src: "social-media/burger-04-more-than-a-burger.jpg",   alt: "More than just a burger: wrapped burger" },
            { src: "social-media/burger-05-reveal-soon.jpg",          alt: "Soon we will reveal the secret: fries" },
            { src: "social-media/burger-06-can-you-guess.jpg",        alt: "Can you guess what is coming? Burger icon with a question mark" },
            { src: "social-media/burger-07-ready.jpg",                alt: "Ready? Burger icon with a cursor" },
            { src: "social-media/burger-08-fresh-everyday.jpg",       alt: "Fresh everyday: sauce on a pickle and onions" },
            { src: "social-media/burger-09-whatever-you-order.jpg",   alt: "Whatever you order, you win: a hot dog, a chicken burger and a salad bowl on a tic-tac-toe grid" },
            { src: "social-media/burger-10-wrap.jpg",                 alt: "Fast wrap sandwich: a chicken wrap on red and white" },
          ] },
      ],
    },

    /* ---------------- 05 VIDEO ----------------
       file  = the video inside the website (assets/videos/, MP4). It plays right on the page.
       drive = the original on Google Drive; only used if file is left empty.
       thumb = a frame from the video; without it a designed cover is used.
       r = width / height.  Names marked "temporary" still need real titles. */
    {
      id: "video", title: "Video", unit: "videos", icon: "film", acc: "#702C3A", dark: true,
      kicker: "Animation & reports",
      short: "Animated English lessons, a report, and unedited animated scenes.",
      lead: "Animated English lessons and a report, edited and produced end to end, plus single animated scenes before editing.",
      cover: "video-thumbnails/scene-05.jpg",
      sets: [
        { title: "Animation & Reports", layout: "cinema",
          items: [
            { drive: "1NAqBkJtc5OnOXqcb3Q3_Z6B2Un1d4yVS", file: "assets/videos/its-an-elephant.mp4", title: "It’s an Elephant!", kind: "Animation",    thumb: "video-thumbnails/its-an-elephant.jpg",      r: 1.772 },
            { drive: "1cqkNnMOzs-g3PpMzDtnJNYU4Pbi4AzGr", file: "assets/videos/i-like-to-paint.mp4", title: "I Like to Paint",   kind: "Animation",    thumb: "video-thumbnails/i-like-to-paint.jpg",      r: 1.772 },
            { drive: "1NFhj3f0x6rDHLdM4cs8fTKMsUo7AO9G6", file: "assets/videos/report-thawi-al-himam.mp4", title: "ذوي الهمم",         kind: "Report",       thumb: "video-thumbnails/thawi-al-himam.jpg",       r: 1.777 },
            { drive: "1baFKtpYmSXoE0P-oxnGoZ3zHnNE0WM5Z", file: "assets/videos/reading-time.mp4", title: "Reading Time",      kind: "Animation",    thumb: "video-thumbnails/reading-time.jpg",         r: 1.772 },
            { drive: "109fENW1SiZt6h3pc-xWZzK7ZjM0_34BN", file: "assets/videos/close-up-portrait.mp4", title: "Close-up Portrait", kind: "Video",        thumb: "video-thumbnails/close-up-portrait.jpg",    r: 1.778, temp: true },
            { drive: "11q9VKx7a_4extvlSIJafhTWNmF_VXFOX", file: "assets/videos/cinematic-short.mp4", title: "Cinematic Short",   kind: "Video",        thumb: "video-thumbnails/cinematic-short.jpg",      r: 1.778, temp: true },
            { drive: "1HcuIpnaLDrwT0uoptRT4Zo2XroJxpLQg", file: "assets/videos/untitled-video.mp4", title: "Untitled Video",    kind: "Video",        thumb: "video-thumbnails/untitled-video.jpg",       r: 0.570, temp: true },
            { drive: "1w5uJnXMyH7MERNMOiqN3hxShBELqAjbn", file: "assets/videos/in-the-classroom.mp4", title: "In the Classroom",  kind: "Video",        thumb: "video-thumbnails/in-the-classroom.jpg",     r: 0.570, temp: true },
          ] },
        /* single scenes, kept as they came out (no editing); they play silently on hover and
           with sound on the big screen when clicked */
        { title: "Scenes, Unedited", layout: "scenes",
          desc: "Short animated scenes with the characters from Character Style, kept exactly as they came out, before any editing.",
          items: [
            { file: "assets/videos/scene-01.mp4", title: "Laptop Chat",        kind: "Scene", thumb: "video-thumbnails/scene-01.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-02.mp4", title: "School Corridor",    kind: "Scene", thumb: "video-thumbnails/scene-02.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-03.mp4", title: "At the Market",      kind: "Scene", thumb: "video-thumbnails/scene-03.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-04.mp4", title: "Dreaming of a House", kind: "Scene", thumb: "video-thumbnails/scene-04.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-05.mp4", title: "In the Park",        kind: "Scene", thumb: "video-thumbnails/scene-05.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-06.mp4", title: "School Hallway",     kind: "Scene", thumb: "video-thumbnails/scene-06.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-07.mp4", title: "Making a Sandwich",  kind: "Scene", thumb: "video-thumbnails/scene-07.jpg", r: 1.778, dur: 15 },
            { file: "assets/videos/scene-08.mp4", title: "On the Playground",  kind: "Scene", thumb: "video-thumbnails/scene-08.jpg", r: 1.778, dur: 8 },
          ] },
      ],
    },

    /* ---------------- 06 SONGS ----------------
       file  = the song inside the website (assets/audio/, MP3). It plays in the site's own player.
       drive = the original on Google Drive; only used if file is left empty.
       lang = "en" / "ar" when known.                                         */
    {
      id: "songs", title: "Songs", unit: "songs", icon: "music", acc: "#6E7550",
      kicker: "Children’s songs",
      short: "Children’s songs in English and Arabic for lessons.",
      lead: "Children’s songs in English and Arabic for lessons: telling the time, school, nature, healthy food, family and country.",
      sets: [
        { title: "Children’s Songs", layout: "tracks",
          items: [
            { drive: "1pCIUYHrghtsxyWFsxrReXm6Mb9LBy2QK", title: "What Time Is It?", lang: "en", file: "assets/audio/what-time-is-it.mp3" },
            { drive: "1NQJDoib_m8zGrIQSKTFx5TKNRo5W-0yp", title: "School Time Fun",  lang: "en", file: "assets/audio/school-time-fun.mp3" },
            { drive: "18tEPHtISbgzzRehFDgAM5bDztWDNpM3h", title: "Sweet Treats",     lang: "en", file: "assets/audio/sweet-treats.mp3" },
            { drive: "1MU_RiHWjC2t6-an4SyHssZ_tUMcozOyc", title: "Nature Around Us", lang: "en", file: "assets/audio/nature-around-us.mp3" },
            { drive: "1GBUJSGDGR4QoZDOFj7FflKyM4jeE0VBm", title: "Help Our Earth",   lang: "en", file: "assets/audio/help-our-earth.mp3" },
            { drive: "1C8TSiNSOmGFuSYP-ggjntYoW1BtB2YOS", title: "العائلة",           lang: "ar", file: "assets/audio/al-aaila.mp3" },
            { drive: "1SiuOfhHv6c7wKLUHhNSRjXN2Xmi-ZV9O", title: "أنا مجتهد",         lang: "ar", file: "assets/audio/ana-mujtahid.mp3" },
            { drive: "1GiuaYRtPzJEA2LxJMdqtRd2iGYCABHIO", title: "وطني يحلو",         lang: "ar", file: "assets/audio/watani-yahlu.mp3" },
            { drive: "1sTHaX4WHq1yAKUCPrd9oYG3ocWjvv2Tt", title: "Song 9",           lang: "",   file: "assets/audio/song-09.mp3", temp: true },
            { drive: "1VTeF7nxExBfp0sYYZG5gOzPkxA4z6If7", title: "Song 10",          lang: "",   file: "assets/audio/song-10.mp3", temp: true },
            { drive: "1fz90EKHuCFwa2U_BnVXvRJTD0_RyPO33", title: "Song 11",          lang: "",   file: "assets/audio/song-11.mp3", temp: true },
          ] },
      ],
    },

    /* ---------------- 07 BOOK DESIGN ---------------- */
    {
      id: "books", title: "Book Design", unit: "pages", icon: "book", acc: "#A8742A",
      kicker: "Educational publishing",
      short: "Layouts for four educational books: unit openers, stories, vocabulary, dialogues and exercises.",
      lead: "Educational books laid out page by page, from bright unit openers and comic dialogues to two-colour workbooks.",
      cover: ["books/book1-a-p020.jpg", "books/book1-a-p021.jpg"],
      /* 6 pages per book (user, 2026-11-23). Pages are in pairs: the viewer opens them as
         spreads 1-2, 3-4, 5-6, so facing pages that belong together sit next to each other. */
      sets: [
        { title: "Pupil’s Book & Workbook",
          desc: "Bright, illustrated pages for young learners: unit openers, vocabulary, songs and reading comics.",
          items: [
            { src: "books/book1-a-p020.jpg", alt: "Unit 2 opener: Our seasons!" },
            { src: "books/book1-a-p021.jpg", alt: "Vocabulary: seasons and weather" },
            { src: "books/book1-a-p070.jpg", alt: "Unit 7 opener: Our garden adventure!" },
            { src: "books/book1-a-p071.jpg", alt: "Vocabulary: the garden, with a song" },
            { src: "books/book1-a-p012.jpg", alt: "Reading: What my friends and I can do" },
            { src: "books/book1-b-p058.jpg", alt: "Workbook, Unit 6: Big, Small, Fast, Slow!" },
          ] },
        { title: "Reading Book",
          desc: "Unit stories with listening, speaking and writing tasks, laid out around full-page illustrations.",
          items: [
            { src: "books/book2-p004.jpg", alt: "Unit 5: The Wolf and the Shepherd" },
            { src: "books/book2-p007.jpg", alt: "Unit 7: Many Feelings Every Day!" },
            { src: "books/book2-p008.jpg", alt: "Listening and speaking" },
            { src: "books/book2-p009.jpg", alt: "Writing and handwriting" },
            { src: "books/book2-p012.jpg", alt: "Unit 9: The Hare and the Tortoise" },
            { src: "books/book2-p013.jpg", alt: "Unit 10: Taking Care of Our Planet" },
          ] },
        { title: "Grade 5 Workbook",
          desc: "A Grade 5 workbook in a two-colour pink and grey palette: unit openers, stories, listening and writing.",
          items: [
            { src: "books/book3-p009.jpg", alt: "Unit 2: A better neighbourhood" },
            { src: "books/book3-p011.jpg", alt: "Read the story: the swimming pool" },
            { src: "books/book3-p016.jpg", alt: "Listen and write the numbers: a town street" },
            { src: "books/book3-p021.jpg", alt: "Read the story: the train station" },
            { src: "books/book3-p041.jpg", alt: "Read and fill in the blanks: speech bubbles" },
            { src: "books/book3-p059.jpg", alt: "Unit 12: Trees" },
          ] },
        { title: "Level 4 Speaking Book",
          desc: "A speaking course for young learners: picture-vocabulary unit openers, comic dialogues, role-plays and review pages.",
          items: [
            { src: "books/book5-p004.jpg", alt: "Unit 1 opener: Who I Am Today, with picture vocabulary cards" },
            { src: "books/book5-p030.jpg", alt: "Key structure and comic dialogue: rules at the pool" },
            { src: "books/book5-p034.jpg", alt: "Review page: target vocabulary and key structures" },
            { src: "books/book5-p046.jpg", alt: "Key structure and comic dialogue: ordering food in a restaurant" },
            { src: "books/book5-p049.jpg", alt: "Act out with a partner: a restaurant role-play" },
            { src: "books/book5-p058.jpg", alt: "Key structure and comic dialogue: a trip to Petra" },
          ] },
      ],
    },

    /* ---------------- 08 COVERS ----------------
       Dana, 2026-11-25: "بس هاد وشيل الباقي" - only the three phonics covers she sent in one picture
       (dana/covers-original/phonics-series.jpg), then "خد صورة صورة ... اعمل ستايل انه تلات كتب":
       each cover cut out on its own and shown as three standing books (layout "trio").
       The six flash-card / phonics covers sent before (book names taken off) are kept aside in
       dana/covers-edited (tool: dana/tools/cover-edit).
       kind: "cards" = a flash-card box (landscape), "book" = a book cover, "set" = several covers in one picture.
       layout "shelf" = one cover in front + a shelf to pick from; "trio" = three books standing side by side
       (book 1 in the middle); "pair" = two covers standing side by side.
       Latest (Dana, 2026-11-25): "امسح الكفرات الي قبل و حط بدالهم خدول واحد بالطول وواحد بالعرض" -
       only a landscape flash-card cover (shown as a card box) and a portrait phonics book.
       Then "خلي تغليفته متل كتاب حقيقي و انها لما الفه يبين في صفحات بس ما تفتح": both are closed 3D objects you
       drag to turn all the way round (spine with the title, page block, back) - they never open.
       spine = the colour of the spine (taken from the cover). */
    {
      id: "covers", title: "Book Covers", unit: "covers", icon: "book", acc: "#6B4F8C",   // Dana: "book cover section not cover"
      kicker: "Flash cards & phonics books",
      short: "Covers for children’s flash cards and phonics books.",
      lead: "Covers made to stand out on a shelf and speak to children at a glance: bright characters, a bold title and a clear level on each one.",
      /* 2026-11-25, "add these": two more phonics covers, so the page is a row of four ("row" layout) */
      cover: ["covers/phonics-pets-1.jpg", "covers/flash-cards-level-1.jpg", "covers/phonics-book-1.jpg"],
      /* layout "vhs" (Dana sent a VHS-shelf reference, "like this"): the covers stand on a shelf spine out; the one in
         the middle is pulled out and turned to show its cover. Click it and a sheet of paper grows out of it into a
         detail page where the cover bleeds in like ink. Not endless: with four covers that would repeat them.
         desc = a longer description (kept, not shown now); level = the number in the spine's badge;
         spineTitle = the short text down the spine (the level is already in the badge; Dana: "عدل كتابتهم من هون"). */
      sets: [
        { title: "The Covers", layout: "vhs",
          desc: "A box of flash cards and three phonics books on one shelf. Pick one to bring it out, then click its cover to open it.",
          items: [
            { src: "covers/flash-cards-level-1.jpg", kind: "cards", title: "Flash Cards · Level 1", spineTitle: "Flash Cards", note: "Card box", spine: "#D12A2F", level: 1,
              desc: "A box of English flash cards for young learners. A boy waving from a yellow car sets the mood, with a bold title and a clear level badge that a child can find on the shelf.",
              alt: "Flash-card cover: a waving boy driving a yellow car" },
            { src: "covers/phonics-book-1.jpg", kind: "book", title: "Phonics 1 · Farm", spineTitle: "Phonics · Farm", note: "Book cover", spine: "#6A2CC4", level: 1,
              desc: "The first book of a phonics course. A cat in glasses leads a farm band past a red barn, and the first letters of the alphabet float in their music.",
              alt: "Phonics 1 cover: a waving cat in glasses leads a band of farm animals past a red barn, with the letters A, B and C" },
            { src: "covers/phonics-pets-1.jpg", kind: "book", title: "Phonics 1 · Pets", spineTitle: "Phonics · Pets", note: "Book cover", spine: "#2F6FE4", level: 1,
              desc: "A phonics book where reading feels like magic: the cat opens a glowing book while its friends gather round with magnifying glasses.",
              alt: "Phonics 1 cover: a cat in glasses reads a glowing purple book while farm friends look on with magnifying glasses" },
            { src: "covers/phonics-pets-2.jpg", kind: "book", title: "Phonics 2 · Pets", spineTitle: "Phonics · Pets", note: "Book cover", spine: "#8B3FD9", level: 2,
              desc: "Book two of the same series. The friends go hunting for sounds in the grass, magnifying glasses in hand.",
              alt: "Phonics 2 cover: farm animals search the grass with magnifying glasses" },
            /* 2026-11-25, "ضيفها" */
            { src: "covers/phonics-treehouse-1.jpg", kind: "book", title: "Phonics 1 · Tree House", spineTitle: "Phonics · Tree House", note: "Book cover", spine: "#B5662B", level: 1,
              desc: "A second cover idea for book one: the friends turn a tree house into a classroom, with numbers carved into the trunk and a lesson on the board.",
              alt: "Phonics 1 cover: farm friends learn and play in a tree house, with numbers carved into the trunk" },
          ] },
      ],
    },

    /* ---------------- 09 POSTERS ---------------- */
    {
      id: "posters", title: "Posters", unit: "posters", icon: "image", acc: "#3F7A8C",
      kicker: "Classroom & cultural posters",
      short: "Classroom posters for the English and Arabic alphabets and numbers, and a collage poster for Palestine.",
      lead: "Posters made to be read from across a classroom: the English and Arabic alphabets and the numbers 11 to 20, plus a collage poster for Palestine.",
      cover: ["posters/alphabet-english.jpg", "posters/alphabet-arabic.jpg", "posters/numbers-11-20.jpg"],
      sets: [
        { title: "The Posters", layout: "flow",
          desc: "Bright, clear layouts for young learners, and one poster built as a photo collage.",
          items: [
            { src: "posters/alphabet-english.jpg", title: "Alphabet", note: "English · A to Z",
              alt: "English alphabet poster: every letter from A to Z with a picture, from ant to zebra" },
            { src: "posters/alphabet-arabic.jpg", title: "الأحرف الأبجدية", note: "Arabic alphabet",
              alt: "Arabic alphabet poster: every letter with a picture, from lion to hand" },
            { src: "posters/numbers-11-20.jpg", title: "لنتعلّم الأرقام", note: "Numbers 11 to 20 with ten-frames",
              alt: "Numbers poster: 11 to 20, each shown with two ten-frames of coloured dots" },
            { src: "posters/palestine-collage.jpg", title: "فلسطين", note: "Photo collage",
              alt: "Collage poster: an old television showing landmarks of Jerusalem, framed tatreez and a watermelon on the wall, an oud, and the word فلسطين in calligraphy" },
          ] },
      ],
    },

    /* ---------------- 09 KUFI PRINT ---------------- */
    {
      id: "kufi", title: "Kufi Print", unit: "prints", icon: "grid", acc: "#2E6B4E",
      kicker: "Square Kufi & tatreez",
      short: "Arabic words in square Kufi, built square by square and framed by cross-stitch motifs.",
      lead: "Arabic words drawn square by square in Kufi script, paired with cross-stitch motifs from traditional tatreez embroidery.",
      cover: "kufi-print/kufi-02.jpg",
      sets: [
        { title: "Prints", layout: "prints",
          desc: "Each letter sits on the same square grid as the embroidery around it.",
          items: [
            { src: "kufi-print/kufi-01.jpg", title: "لك شيء في هذا العالم فقم", note: "Red, green and black",
              alt: "Square Kufi lettering between two borders of red, green and black cross-stitch stars" },
            { src: "kufi-print/kufi-02.jpg", title: "فلسطين", note: "Burgundy and pink",
              alt: "Square Kufi lettering above two cross-stitch stars in burgundy and pink" },
          ] },
      ],
    },

    /* ---------------- 10 NEWSPAPER ----------------
       No newspaper or book names in the text: captions name the stories only. */
    {
      id: "newspaper", title: "Newspaper", unit: "pages", icon: "news", acc: "#36465E",
      kicker: "Arabic technology newspaper",
      short: "A full eight-page Arabic newspaper on technology and AI, from the front page to the back.",
      lead: "A complete eight-page edition in Arabic on technology and artificial intelligence: news pages built on a column grid, with photos, briefs and ads.",
      cover: ["newspaper/page-02.jpg", "newspaper/page-01.jpg", "newspaper/page-08.jpg"],
      sets: [
        { title: "The Edition", layout: "newspaper",
          desc: "Read any page through the magnifier, or open it full size.",
          items: [
            { src: "newspaper/page-01.jpg", alt: "Front page: AI writing and brain activity, and a UN survey on trust in AI" },
            { src: "newspaper/page-02.jpg", alt: "Page 2: AI for cybersecurity in the UAE, ChatGPT news and a car advertisement" },
            { src: "newspaper/page-03.jpg", alt: "Page 3: Apple shareholders sue over its AI claims, and 16 billion leaked passwords" },
            { src: "newspaper/page-04.jpg", alt: "Page 4: what is new in Android 16, and Meta’s new smart glasses" },
            { src: "newspaper/page-05.jpg", alt: "Page 5: Google’s Gemini model for robots, a copyright ruling for AI, and AI in sports refereeing" },
            { src: "newspaper/page-06.jpg", alt: "Page 6: children’s interest in AI doubles, and a new AI voice app" },
            { src: "newspaper/page-07.jpg", alt: "Page 7: free Windows 10 security updates, and self-driving taxi trials in Dubai" },
            { src: "newspaper/page-08.jpg", alt: "Back page: the date for new foldable phones, and Apple weighing an AI acquisition" },
          ] },
      ],
    },

    /* ---------------- 11 WRITING & ARTICLES ----------------
       Each piece links to the site that published it (opens in a new tab).
       date = YYYY-MM-DD (newest is shown first). Leave title "" if it is not known yet. */
    {
      id: "writing", title: "Writing & Articles", unit: "articles", icon: "pen", acc: "#8A5A44",
      kicker: "Published journalism",
      short: "News reports, features and personal essays, published by news sites in Jordan.",
      lead: "Journalism in Arabic, from news reports and features to personal essays, published by a university newspaper and national news sites in Jordan.",
      sets: [
        { title: "Published Pieces", layout: "articles",
          desc: "Each piece opens on the site that published it.",
          items: [
            { title: "الأمير الحسين ولي العهد يرعى قمة الأردن الأولى للأمن السيبراني", outlet: "القلعة نيوز", date: "2023-09-25", kind: "News report",
              summary: "Coverage of Jordan’s first cybersecurity summit, held under the Crown Prince’s patronage: officials’ remarks and the summit’s sessions.",
              note: "Co-written with Ghadi Hammad", url: "https://alqalahnews.net/article/348281" },
            { title: "أحلام مبعثره", outlet: "منبر البترا", date: "2022-04-05", kind: "Personal essay",
              summary: "A lyrical, first-person piece about a dream that feels buried, told through the image of a missed train.",
              url: "https://menbar.uop.edu.jo/menbar-petra/?p=13174" },
            { title: "مشروع «انسان» يساند الأسر العفيفة بالعمل والانتاج", outlet: "منبر البترا", date: "2021-06-14", kind: "Feature",
              summary: "A feature on a charity project that helps families start small businesses, built on interviews with the people it supported.",
              url: "https://menbar.uop.edu.jo/menbar-petra/?p=12432" },
          ] },
      ],
    },
  ],
};
