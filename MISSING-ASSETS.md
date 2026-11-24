# Still to confirm or send

Nothing below was invented. Where something is missing, the site hides it or shows a clearly
temporary label until the real item arrives. Each fix is a one-line change in `js/data.js`.

## Links and contact
| Item | Now | Needed |
|---|---|---|
| LinkedIn | **Hidden.** The PDF only had a LinkedIn *search* link, not a profile. | Dana's profile URL → `contact.linkedin` |
| Phone number | **Shown**: 0778 945 414 in Contact (with a Call me button) and in the menu. | Nothing (set `contact.showPhone: false` to hide it) |
| Behance | Shown as `behance.net/danasukhon` (from the PDF). | Confirm the handle is right |
| Email | `danamsukhon@gmail.com` (from the PDF). | Nothing |

## Titles that are still temporary (from the PDF)
| Item | Temporary name |
|---|---|
| Video 06 | Close-up Portrait |
| Video 07 | Cinematic Short |
| Video 08 | Untitled Video |
| Video 09 | In the Classroom |
| Song 09, 10, 11 | Song 9, Song 10, Song 11 (no language label until known) |

## Posters
- The numbers poster comes from `NUMBER 11 20.pdf` (sharp, 1500 px wide).
- The two alphabet posters are 1142 × 1600 px (as sent). Print-quality exports would look sharper full size.
- **Palestine collage:** only a phone screenshot was available (540 × 1170 px). I cropped off the black
  bars above and below to give a 540 × 760 poster. Please send the original file for a sharp version.

## Kufi prints
- **Please confirm the readings** used as titles: No. 01 «لك شيء في هذا العالم فقم», No. 02 «فلسطين».
  Edit `title` in the Kufi Print entry of `js/data.js` if a reading should be different.
- **Higher resolution:** both prints are 596 × 842 px (as sent on WhatsApp). The original
  export (PNG or PDF at 2000 px or more) would look much sharper in the full-size viewer and
  the magnifier. Replace `assets/images/kufi-print/kufi-01.jpg` / `kufi-02.jpg` and run
  `tools/prepare-images.ps1`.

## Media files
- **Songs and videos are now inside the website** (`assets/audio`, `assets/videos`) and play
  directly, with no Google Drive. They were downloaded from Dana's Drive folder. The 511 MB
  ذوي الهمم report was shrunk to a 720p MP4, and the two large WhatsApp videos were shrunk too.
  If an original export at higher quality exists, it can replace these files.
- **Higher-resolution artwork (optional):** the images are the portfolio originals, at most
  1100 px wide. Larger files would look sharper on big high-density screens; drop them in the
  same folders with the same names and run `tools/prepare-images.ps1`.

## Deliberate choices (not missing)
- **No book names anywhere**, as Dana asked: no covers, no book or series titles in the text
  or captions, and neutral file names (`book1…book5`, `post-01…13`).
  The books are labelled by type (Pupil's Book & Workbook, Reading Book, Grade 5 Workbook, Level 4 Speaking Book).
  The book trailer video was removed at Dana's request. Book names printed inside the artwork itself are part of the design.
- The client name "Redwan Publishing House" is still shown on the Social Media page, as in the PDF.
  Set `client: ""` in `js/data.js` to hide it.
- The **4 prompt examples** (one per style) appear in the AI Images "Prompt lab" with their
  prompts, and are not repeated in the collections. That is why the collections show
  14 + 10 + 5 + 11 images (44 in total with the prompt examples).

## Small flaws inside two AI images (from the originals)
- `ai-images/20-invitation.jpg`: the generated lettering reads "Invidatiome".
- `ai-images/38-mountain-valley.jpg`: a fake signature in the bottom-right corner.
Replace or retouch these files if wanted.
