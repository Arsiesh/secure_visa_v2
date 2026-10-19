# Secure Visa redesign — design brief

Read this whole file before writing any code. The art director (Opus) reviews against it.

## The subject

Secure Visa Consulting, Inc. helps families, mostly from the Philippines, use a **student-visa pathway to permanent residency in New Zealand and Canada**. Founders Jan and Aina Sacdalan did it themselves (2015, after losing Php 500,000 to a bad adviser), founded the company in 2018, and now run offices in Makati and at Auckland Airport. The audience is a Filipino parent or young professional, often on a phone, nervous about scams and overwhelmed by information. The site's job: **earn trust fast, then get them to the free presentation or a free assessment.**

## The concept: "Arrivals"

The most characteristic moment in Secure Visa's world is real and photographed: a family in the Auckland arrivals hall holding a sign that says *"Welcome to New Zealand — from your Secure Visa family."* We have those photos (`testimonial-*-scaled.jpg`, `success-story-photo-*.jpg`).

So the site borrows the **language of the airport**: an arrivals board, gates, a boarding pass. It uses that language only where the content really is a journey (the 5-step process, the founders' timeline, the destination choice). Everything else stays quiet, plain and readable.

**Spend boldness in one place:** the home hero's split-flap **arrivals board**. It lists real client families who have landed, and each row pairs with their arrival photo. It is the hook, and nothing else on the site competes with it.

## Tokens (already in `src/index.css` — use them, never hard-code hex)

| Token | Hex | Use |
|---|---|---|
| `kauri` | #0f3a27 | Deep brand green. Hero, board, footer, the one dark CTA band. |
| `kauri-2` | #164a33 | Raised surfaces on kauri. |
| `fern` | #2b7a4b | Brand green. Primary buttons (white text), links and icons on light. |
| `kawakawa` | #86c84a | Lime from the brand blobs. Accents **on dark only** (fails contrast on white). |
| `signal` | #f6c445 | Airport wayfinding yellow. Board characters, gate tags, focus ring on dark. **On dark only.** |
| `mist` | #eef3ef | Alternate light section background. |
| `paper` | #ffffff | Default background. |
| `ink` / `ink-muted` | #0c2419 / #46594f | Text on light. |
| `line` / `line-dark` | — | Hairlines on light and on dark. |

Tailwind v4 exposes these as `bg-kauri`, `text-fern`, `border-line` and so on.

**Type:** one family, **Archivo Variable**, used through its width axis:
- `font-display`: expanded at 118%, weight 760, tight leading. Use for h1/h2 only. It echoes the wide logo. **Sentence case.**
- body: normal width, 17px base, line-height 1.6, max line length about 68ch (`max-w-[68ch]`).
- `font-board`: condensed at 72%, tabular numbers. **Only** for the arrivals board, boarding pass and gate tags. Those are the only places uppercase is allowed, because that is how real airport signage looks.

**Scale (rem):** 0.875 / 1.0625 (body) / 1.25 / 1.5625 / 2 / 2.75 / 3.75 / 5.25. Use `clamp()` for h1/h2, for example `text-[clamp(2.5rem,6vw,5.25rem)]`.

**Radii:** inputs `rounded-input` (8px), cards `rounded-card` (20px), photos `rounded-photo` (28px), buttons fully rounded. Use different radii for different things on purpose.

## Hard rules (these are review blockers)

1. **No generic AI chrome.** Do not use:
   - tracked-out ALL-CAPS eyebrow labels above headings
   - "A · B · C" meta strings
   - a "→" glyph appended to button text (a lucide icon inside a button is fine)
   - identical rounded-card grids with the same grey shadow
   - gradient washes as decoration
   - fade-and-slide-up on every section as it scrolls in
2. **One accent per headline.** Do not colour or italicise a single word inside a headline.
3. **Motion:** the only motion that runs on its own is the hero board's flip sequence. Everything else answers a user action (opening the menu, switching tabs or destinations, expanding an accordion, choosing a step). Respect `prefers-reduced-motion` in JS too (`useReducedMotion` from `motion/react`).
   - **The journey vocabulary** (approved on the Claude Design canvas "Journey animation studies"):
     - *Flight route:* choosing a destination draws a dashed flight path from MNL. A plane glides along it, the destination pops, and the status flips from "En route" to "Landed".
     - *Through the gates:* scrolling the process moves a plane along the gate rail, and passed gates light up.
     - Both are driven by the user (a choice, or scroll position). Never play them on load or on a timer.
   - **Motion library:** it is loaded through `LazyMotion strict`, so use `m.div`, never `motion.div`. Animate only `transform`, `opacity`, `offset-distance` and `stroke-dashoffset`.
4. **Copy fidelity.**
   - Use the client's real copy from `../content/pages/*.md` verbatim where it exists.
   - You may fix obvious typos ("Imigration", "Canda", "Percifrom"), convert ALL-CAPS CTAs to sentence case, and trim long walls of text by choosing the strongest sentences.
   - **Never invent** claims, numbers, eligibility rules, prices, names or quotes. **Never use** the "Lorem ipsum" testimonials or blog posts.
   - New interface microcopy (button labels, form labels, empty and error states) is fine. Keep it plain, active, sentence case, and in the brand's warm "we" voice.
5. **Accessibility floor:**
   - semantic landmarks, and one `<h1>` per page
   - a skip link
   - a visible focus ring on every interactive element
   - colour contrast of at least 4.5:1 for text
   - touch targets of at least 44px
   - meaningful `alt` text on photos (names on the arrival signs are good alt text), and `alt=""` for decorative images
   - every form input has a `<label>`, the correct `type` and `autocomplete`, and inline errors linked with `aria-describedby`
6. **Responsive.** Design at 390px first, then 768px and 1280px or wider. No horizontal page scroll at any width. Horizontal rails use scroll-snap and are reachable with the keyboard.
7. **Performance** (vercel-react-best-practices):
   - pages are lazy-loaded per route
   - every `<img>` has `width`/`height` (or an aspect-ratio box), `loading="lazy"` and `decoding="async"`, except the hero image, which gets `fetchPriority="high"`
   - images are WebP in `public/images/`
   - no barrel files
   - no components defined inside components
   - derive state during render instead of syncing it in effects
   - static data lives in module scope

## Information architecture

Keep the original URLs:
- `/`
- `/new-zealand-services/`
- `/canada-services/`
- `/process/`
- `/about/`
- `/meet-the-team/`
- `/success-stories/`
- `/podcast/`
- `/connect/`

Drop `/blog/` from the nav because its posts are all placeholder text.

The original site hides its nav behind a hamburger, even on desktop. **Fix that.**
- Desktop nav is always visible: Destinations (NZ, Canada), Process, About (About, Team), Stories, Podcast, and a primary button "Book a free assessment" that goes to `/connect/`.
- Mobile gets a full-height sheet menu.

External funnel CTAs stay as real links that open in the same tab:
- `https://study.securevisa.com/nz` ("Watch the free 40-min video")
- `https://study.securevisa.com/now/` ("Watch the free 60-min video")
- `https://study.securevisa.com/nz-webinar/` ("Register for the free NZ webinar")

## Home page wireframe (mobile stacks in this order)

```
┌ header: logo │ Destinations▾ Process About▾ Stories Podcast │ (Book a free assessment) ┐
├──────────────────────────── HERO  bg-kauri ──────────────────────────────────────┤
│ h1  Finally, a team committed       ┌──────── photo of the selected family ───────┐│
│     to your family's future.        │  (rounded-photo, arrival-hall shot)         ││
│ When you join our family, we work   └─────────────────────────────────────────────┘│
│ with yours until you're living      ┌ ARRIVALS  AUCKLAND ─────────────────────────┐│
│ your dream life in a brand new home.│ FROM  FAMILY            STATUS              ││
│ (Watch the free 40-min video)       │ MNL   RAZ FAMILY        LANDED   ◀ selected ││
│ (Find your route)  ghost            │ MNL   JULIE MERCADO     LANDED              ││
│                                     │ MNL   MIRANDA FAMILY    LANDED              ││
│                                     └─────────────────────────────────────────────┘│
│ trust row: ICEF badge + "ICEF accredited agency"  │ "1,000+ partner institutions"   │
├──────────── FIND YOUR ROUTE (interactive boarding pass)  bg-paper ───────────────┤
├──────────── "In 2015 we were exactly where you are now"  founders + Php 500,000 ─┤
├──────────── "Whatever your situation, we can help" (3 short Q→A lines)  bg-mist ─┤
├──────────── The proven process: 5 gates on a route line → /process/ ─────────────┤
├──────────── Arrivals wall: real photos + real review quotes (scroll-snap rail) ──┤
├──────────── Two destinations: boarding-pass links to NZ / Canada ────────────────┤
├──────────── Trust: ICEF text + badge, partner-school strip, Featured in logos ────┤
├──────────── Podcast: latest 3 episodes + platform links ─────────────────────────┤
├──────────── CTA band bg-kauri: "We can help you transform your dream life…" ─────┤
└ footer bg-kauri: offices (Makati, Auckland), email/phone, nav, socials, legal ───┘
```

### The arrivals board (hero) — the signature component
- Each row is a real arrival from the photos where the sign's name is readable: Raz Family, Julie Mercado, Miranda Family, Jessy & Allen, Kim Barnes, Jade Molina, Grace & John, Jhilyn de la Cruz. Origin is MNL, the destination is AKL, and the status is "LANDED".
- On load, the characters flip into place (split-flap) in one staggered sequence, once.
- After that, the selected row advances about every 6 seconds. The photo cross-fades and the selected row is highlighted in `signal`.
- Hovering, focusing or clicking a row selects it and pauses the auto-advance. Rows are buttons inside a list. Do not use an aria-live region.
- Reduced motion: no flips and no auto-advance. The photo changes only when the user picks a row.

### Find your route (interactive boarding pass)
- Three quick choices, as chips with radio semantics:
  1. Where to? New Zealand or Canada.
  2. Who's coming? Just me, Me and my partner, or My family.
  3. Shown only when New Zealand is chosen: "I'm a nurse and want to become a Registered Nurse in New Zealand" (yes/no). This matches the real inquiry option on the contact form.
- The boarding pass updates live:
  - route `MNL → AKL` or `MNL → YYZ`
  - passenger(s)
  - "Pathway: Study → work → residence"
  - the next gate: "Free Accelerator Assessment"
- Primary CTA: "Book my free assessment". It goes to `/connect/?destination=nz&party=family&nurse=1`, and the contact form pre-fills from those query params.
- Secondary CTA: "Read about studying in New Zealand/Canada", which goes to the destination page.
- **No invented eligibility logic.** This is routing, not advice.

## Interaction ideas for other pages (agents may refine)
- **Process:** a sticky route line with 5 numbered gates. Scrolling or clicking highlights the current gate. Pre / During / Post support is a 3-part segmented control.
- **About:** the origin story as a chaptered timeline (2015, the Php 500,000 mistake, studying in NZ, residency, founding Secure Visa in 2018, today).
- **Team:** founders featured large. Specialists in a grid, where clicking a person opens their bio in a dialog or expands it in place.
- **Success stories:** an arrival-photo masonry plus the review-graphic screenshots, opened in an accessible lightbox. Filter by NZ / Canada only where that is known; otherwise no filter.
- **Podcast:** an episode list with thumbnails and platform links.
- **Connect:** a form with Name, Email, Phone, Inquiry (the 4 real options) and Message, with validation and pre-fill from query params. There is no backend, so on a valid submit, open `mailto:info@securevisa.com` with the message pre-filled and show a confirmation panel that says so. Show both offices with addresses, email and phone, plus socials.

## Real facts you can use (verbatim sources are in `../content/`)

**Contact**
- info@securevisa.com
- +63 968 888 0805
- Main Office: 21st Floor, 8 Rockwell, Hidalgo Drive, Makati City, Metro Manila, Philippines 1210
- New Zealand Office: Level 1 Quad 7 Building, 6 Leonard Isitt Drive, Auckland Airport, New Zealand 2022

**Socials**
- facebook.com/svconsultancy
- youtube.com/securevisa
- linkedin.com/company/securevisa-consultancy
- tiktok.com/@securevisaph

**ICEF accreditation:** ICEF agency #6149, shown on `accreditation-icef-badge.png`.

**Partners:** "more than 1,000++ affiliated-partner institutions with renowned programs of over 25,000". Render this as "1,000+ partner institutions" and "25,000+ programs".

**Featured in:** use the logo images.
