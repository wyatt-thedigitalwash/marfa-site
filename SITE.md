# Marfa -- Site Reference

## Project Overview
Marfa is a country-rock and Americana band on Big Machine Records (Borchetta Entertainment Group, LLC). This is a rebuild of their existing WordPress site into our Next.js stack. The site presents the band like a piece of film and a vintage record sleeve, not a tech product. The feeling is cinematic, analog, and editorial.

---

## Routes
- `/` -- Home
- `/music`
- `/video`
- `/tour`
- External merch store (link out only, do not build): https://www.shop.marfabandofficial.com/

---

## Home Page Section Order
1. **Hero stack** -- Three pinned full-screen panels that stack on scroll. Panel 1 is the MARFA wordmark over a background clip. Panel 2 is the current single "If It Ain't You" with a Listen action. Panel 3 is a band identity photo.
2. **Film reel** -- Six 1920x540 clips scrolling horizontally.
3. **About** -- Full copy below.
4. **Tour preview** -- Next 3 to 5 upcoming dates with a "See all dates" link to `/tour`.
5. **Signup** -- MailChimp form with fields Email, Zip Code, Country.
6. **Footer**

---

## Color Palette
Strict two-color system. No other colors anywhere on the site. Photography and video are the only source of color. No accent colors, no gradients, ever.

| Role       | Color   | Hex       |
|------------|---------|-----------|
| Background | Cream   | `#E8E3CF` |
| Text / UI  | Black   | `#211F21` |

Set as CSS variables:
```css
--color-cream: #E8E3CF;
--color-black: #211F21;
```

---

## Typography

### Display and Headings
**Boring Sans Bold** -- File at `public/fonts/BoringSansBold.ttf`. Load via `next/font/local`. Use all caps with wide letter-spacing for labels and large display text.

### Body and Running Text
**Newsreader** -- Load via `next/font/google`.

### Future Option
If a Boring Sans regular weight is later added to `public/fonts/`, body text can move to a single Boring Sans family. Not now.

---

## Tone of Voice
Literary and sensory. Road, place, and weather imagery. Confident, never corporate. Short declarative lines set against one long evocative one. No em dashes anywhere in site copy.

---

## Visual Reference Anchors
1. **Laurel Canyon and California-sound album photography, 1969 to 1974.** Warm, sun-faded, intimate.
2. **Vintage editorial film-still photography.** Moody neutrals with one saturated subject.
3. **Swiss editorial typography.** Wide-tracked all caps, high cream and black contrast, generous negative space.
4. **Cinematic anamorphic letterbox.** The 1920x540 clips treated as a filmstrip.

---

## Design Anti-Patterns (Do Not Do These)
- No streaming-button soup
- No platform brand colors (e.g. Spotify green)
- No pill or gradient buttons (buttons are flat or underlined editorial style)
- No centered hero with a feature grid below
- No card-grid layouts
- No carousel-template feel
- Restraint over decoration

---

## Real Content Inventory

### About Copy (Final, Use Verbatim)

Born and raised to a Texas country soundtrack, forged in Colorado from a shared love of rock icons past and present, and ignited by the spirit of California's Laurel Canyon sound, Marfa has arrived with an undeniably authentic sound as familiar as your favorite pair of Wranglers while as fresh as the morning Rocky Mountain air.

Their debut single "66", produced by Grammy Award winning producer Nick Waterhouse (Leon Bridges, Jon Batiste) and recorded at LA's EastWest Studios inside the same four walls that gave life to The Beach Boys' Pet Sounds and The Mamas and the Papas' California Dreamin', puts the pedal-to-the-metal straight out of the gate on this top down road trip through the highways, byways, and everywhere in between.

With the release of "Daisy", produced by Grammy Award nominated Josh Block (Caamp, Leon Bridges) and written in the storied Canyon itself, the band channels influences from CSNY to the Eagles, taking listeners on a harmony-driven acoustic journey to find a long lost friend.

Upcoming releases produced by 3-time Grammy Award nominated Jonathan Wilson (Dawes, Father John Misty, Billy Strings) coming soon.

### Streaming and Artist Profiles
- **Spotify:** https://open.spotify.com/artist/0qQCr8kpPnhZHnnHoVtErD
- **Apple Music:** https://music.apple.com/us/artist/marfa/1764209879
- **Amazon Music:** https://music.amazon.com/artists/B0FHBWNFGM/marfa

### Release Smart Links
- **If It Ain't You:** https://marfamusic.ffm.to/ifitaintyou
- **A Million Ways:** https://ffm.to/amillionways
- **American Blues:** https://ffm.to/americanblues -- **NEEDS VERIFICATION** (current link may be malformed)

### Social Links
- **Instagram:** https://www.instagram.com/marfabandofficial/
- **TikTok:** https://www.tiktok.com/@officialmarfaband
- **Facebook:** https://www.facebook.com/marfabandofficial
- **YouTube:** https://www.youtube.com/@officialmarfa

---

## Official Videos (/video Page)

| Title                                  | YouTube ID    |
|----------------------------------------|---------------|
| American Blues (Official Video)         | `4lXVYpu6AS4` |
| A Million Ways (Official Video)        | `61HJZ4YPEgI` |
| American Lonely                        | `ZM8fvt7Gjr4` |
| Daisy (Official Video)                 | `cu8QK8rT9-o` |
| Little Miss Two Time                   | `T7FR-oMtlFg` |
| "66" (Live) Sendero Sessions           | `oFAfRvIkpVs` |
| "Sugar" (Live) Sendero Sessions EP1    | `akIvNrrrzh8` |
| Daisy (Live Acoustic)                  | `AXrah1J2MPM` |
| Run For My Money (Acoustic)            | `x_oTdag7eLc` |

---

## Tour Data
- **Source:** Bandsintown API
- **Artist ID:** `15554971`
- **App ID:** `umg_bigmachinelabelgroup_marfa`
- Dates are dynamic and pulled from Bandsintown, not hardcoded.

---

## Footer

### Legal Line (Use Verbatim)
© Borchetta Entertainment Group, LLC d/b/a Big Machine Records.

### Footer Links
- Privacy -- `#` (URL pending)
- Terms & Conditions -- `#` (URL pending)
- Do Not Sell My Personal Information -- `#` (URL pending)

---

## Signup (MailChimp)
- **Fields:** Email, Zip Code, Country (full country dropdown)
- **Privacy disclaimer:** Emails are sent by or on behalf of Big Machine Records, linking to the Big Machine privacy policy (`#` placeholder until URL is supplied).
- **PENDING:** MailChimp embed code or audience ID will be supplied at wiring time.

---

## Pending Client Assets
These items must be supplied before the corresponding sections can be finalized:

- [ ] **Logo files** -- MARFA wordmark and "If It Ain't You" lockup (header, footer, heroes)
- [ ] **Six video clips, 1920x540** -- Home film reel
- [ ] **Band press photography** -- Hero stack, about section
- [ ] **"If It Ain't You" cover artwork** -- Listen moment (hero stack panel 2)
- [ ] **Footer legal link URLs** -- Privacy, Terms & Conditions, Do Not Sell
- [ ] **MailChimp embed code or audience ID**
- [ ] **American Blues smart link verification** -- Current link may be malformed

---

## Notes
- This is a WordPress-to-Next.js rebuild, not a net-new site.
- The merch store is external (Shopify). Link out only, do not build.
- No em dashes in any user-facing copy. Use commas, periods, or two hyphens (--) instead.
