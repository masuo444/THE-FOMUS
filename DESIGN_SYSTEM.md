# THE FOMUS — Design System Specification
**Version 1.0 — April 2026**
For handoff to Frontend Engineer. All values are implementation-ready.

---

## 0. Guiding Principles

| Principle | Meaning in practice |
|-----------|---------------------|
| **Silence as luxury** | White space is not empty — it carries weight. Never fill it. |
| **Precision over decoration** | Every visual element must earn its presence. One gold line is more powerful than ten. |
| **Japanese restraint** | The Aesop / Comme des Garçons school: nothing added, nothing removed. |
| **Legibility is respect** | Line-height and letter-spacing are not typographic choices — they are hospitality. |
| **Motion should feel earned** | Animations reveal; they do not perform. No bounces, no spring physics, no overshoots. |

---

## 1. Color Palette

### 1.1 CSS Custom Properties (source of truth — already in `globals.css`)

```css
:root {
  /* Backgrounds */
  --color-white:       #FAFAF7;   /* Washi white — primary background */
  --color-off-white:   #F4F1EB;   /* Cream — alternating sections */

  /* Text */
  --color-ink:         #1A1814;   /* Near-black — primary text */
  --color-ink-light:   #4A4740;   /* Subtext, secondary labels */
  --color-ink-mute:    #6E6A62;   /* Tertiary / metadata */

  /* Accent */
  --color-gold:        #B8963E;   /* Brass gold — use sparingly */
  --color-gold-pale:   #D4B483;   /* Gold on hover states */
  --color-gold-deep:   #8F7230;   /* Gold on pressed/active states */

  /* Structural */
  --color-line:        #D9D4C8;   /* Dividers on light backgrounds */
  --color-line-dark:   #8C8880;   /* Dividers / text on dark backgrounds */
}
```

### 1.2 Tailwind Config Mapping

```js
// tailwind.config.js (or CSS @theme block for Tailwind v4)
colors: {
  fomus: {
    white:      '#FAFAF7',
    'off-white':'#F4F1EB',
    ink:        '#1A1814',
    'ink-light':'#4A4740',
    'ink-mute': '#6E6A62',
    gold:       '#B8963E',
    'gold-pale':'#D4B483',
    'gold-deep':'#8F7230',
    line:       '#D9D4C8',
    'line-dark':'#8C8880',
  }
}
```

### 1.3 Color Usage Rules

| Token | Where to use | Where NOT to use |
|-------|-------------|-----------------|
| `--color-white` `#FAFAF7` | Primary page background, header bg, footer bg | Text on dark backgrounds |
| `--color-off-white` `#F4F1EB` | Alternating sections (even-indexed), program grid bg | Body text color |
| `--color-ink` `#1A1814` | H1–H3, body text, logo | Backgrounds where text must be readable |
| `--color-ink-light` `#4A4740` | Subheadings, nav links, label text, descriptions | Never as a background |
| `--color-gold` `#B8963E` | One decorative accent per section maximum — hairlines, price labels, active CTA text, focus rings | Backgrounds, large fills, headings |
| `--color-line` `#D9D4C8` | Horizontal rules, card borders on light bg | Dark section dividers |
| `--color-line-dark` `#8C8880` | Footer text, label text on dark (ContactCTA) section | Light section text — too low contrast |

**Dark section** (`--color-ink` background): used exclusively in the ContactCTA block. Text shifts to `--color-white`; accent uses `--color-gold` and `--color-gold-pale`; labels use `--color-line-dark`.

---

## 2. Typography

### 2.1 Font Families

Three fonts — each with a distinct role. No substitutions.

```ts
// app/[locale]/layout.tsx — already implemented
import { Noto_Serif_JP, Cormorant_Garamond, Jost } from 'next/font/google';

// CSS variables exposed:
// --font-noto-serif-jp   → Japanese serif body + display
// --font-cormorant       → English italic display
// --font-jost            → English sans — labels, UI chrome, numbers
```

| Variable | Family | Role | Notes |
|----------|--------|------|-------|
| `--font-noto-serif-jp` | Noto Serif JP | Japanese body, philosophy quotes, main tagline | weight 300 only in most contexts |
| `--font-cormorant` | Cormorant Garamond | English display italic, program names, statistics | italic 300 is the signature style |
| `--font-jost` | Jost | Navigation, section labels, price labels, footer, UI text | All-caps with wide letter-spacing |

### 2.2 Type Scale

All sizes use `clamp()` for fluid scaling on display elements. Literal `rem` for UI chrome.

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | `0.625rem` / 10px | Scroll label, footer chrome |
| `sm` | `0.6875rem` / 11px | Section labels (`.label-text`), price labels, nav links, index numbers |
| `base` | `0.75rem` / 12px | Nav logo, CTA link text |
| `md` | `0.8125rem` / 13px | Footer tagline |
| `lg` | `0.875rem` / 14px | Footer brand name |
| `body` | `0.9375rem` / 15px | Program description body text |
| `body-lg` | `clamp(1.0625rem, 1.85vw, 1.1875rem)` | Founder section body text |
| `statement` | `clamp(1.0625rem, 1.85vw, 1.3125rem)` | Statement section lines |
| `quote` | `clamp(1.375rem, 2.6vw, 1.75rem)` | Philosophy blockquote |
| `contact-headline` | `clamp(1.375rem, 2.7vw, 1.875rem)` | ContactCTA main copy |
| `program-name` | `clamp(1.375rem, 2.2vw, 1.6875rem)` | ProgramRow name (Cormorant italic) |
| `stat-value` | `clamp(1.75rem, 3vw, 2.25rem)` | Founder statistics (Cormorant italic) |
| `tagline` | `clamp(2.125rem, 5.8vw, 4.25rem)` | Hero H1 (Noto Serif JP) |

### 2.3 Font Weights

Only two weights are loaded to minimize font payload.

| Weight | Name | Font | Usage |
|--------|------|------|-------|
| 300 | Light | All three fonts | Default for everything |
| 400 | Regular | Noto Serif JP, Cormorant | Emphasis only — used sparingly |

**Rule**: Never use 500+ weight. Never use bold. The typefaces carry authority through spacing and scale, not weight.

### 2.4 Line Heights

| Context | Value | Rationale |
|---------|-------|-----------|
| Display headings (H1–H3) | `1.2` | Tight — text fills its own weight |
| Hero tagline | `1.5` | Japanese multi-line needs air |
| Philosophy / Statement blocks | `1.95–2.25` | Meditative reading pace |
| Founder body text | `2.15` | Generous — longer paragraphs |
| Program descriptions | `2.0` | Breathing room in grid |
| UI chrome (labels, nav) | `1.0–1.2` | Single-line, no rhythm needed |
| Body default (`body` element) | `1.7` | Fallback |

### 2.5 Letter Spacing

Letter spacing is critical for Japanese aesthetics. These are non-negotiable values.

| Context | Value | Font | Effect |
|---------|-------|------|--------|
| Logo wordmark "THE FOMUS" | `0.28em` | Jost | Wide — sovereign, monumental |
| Section labels (`.label-text`) | `0.22em` | Jost | Airy — reads as a whisper |
| Nav links | `0.15em` | Jost | Spacious but functional |
| Price labels | `0.15em` | Jost | Pairs with nav rhythm |
| CTA links | `0.28em` | Jost | Wide — matches logo authority |
| Scroll indicator | `0.3em` | Jost | Maximum air, minimum size |
| Footer copyright | `0.05em` | Jost | Tight — subordinate role |
| Japanese body text | `0.075–0.10em` | Noto Serif JP | Proportional — do not over-space |
| Japanese display (hero, quotes) | `0.08–0.14em` | Noto Serif JP | Controlled — larger sizes need less tracking |
| Cormorant italic program names | `0.02em` | Cormorant | Near-zero — serifs carry spacing |
| Cormorant italic captions | `0.08–0.18em` | Cormorant | Context-dependent |

**Font feature settings for Japanese**: Always apply `font-feature-settings: "palt" 1, "pkna" 1` to the `body` element. This enables proportional metrics (プロポーショナルかな) which tightens glyph spacing to Western typographic standards.

### 2.6 Japanese Display Text Considerations

1. **Taglines**: Use `writing-mode: horizontal-tb` (default). Vertical text (`writing-mode: vertical-rl`) is reserved for future decorative elements only — not structural content.
2. **Line breaks**: Never rely on automatic breaks for Japanese display text. Insert explicit `<br>` at semantic phrase boundaries.
3. **Mixed JP/EN**: When Japanese and English appear in the same line (e.g., program nameJa under the Cormorant italic name), set Japanese at approximately 80% the English size and use `--color-ink-light` to create hierarchy.
4. **Paragraph spacing**: For multi-paragraph Japanese text split across `<p>` elements (Philosophy, Statement, Founder), margin between paragraphs is `0`. Rhythm is created by line-height alone.
5. **Orphans**: Keep `orphans: 3; widows: 3` on Japanese body blocks.

---

## 3. Spacing System

### 3.1 Base Unit and Scale

Base unit: **0.5rem (8px)**

```css
:root {
  --space-xs:  0.5rem;   /*  8px — tight element gaps */
  --space-sm:  1rem;     /* 16px — inline gaps, small margins */
  --space-md:  2rem;     /* 32px — component internal padding */
  --space-lg:  4rem;     /* 64px — section-internal spacing */
  --space-xl:  6.5rem;   /* 104px — section padding (mobile) */
  --space-2xl: 10rem;    /* 160px — section padding (desktop) */
}
```

### 3.2 Section Rhythm

```css
.section-gap {
  padding-top: 6.25rem;    /* 100px mobile */
  padding-bottom: 6.25rem;
}

@media (min-width: 1024px) {
  .section-gap {
    padding-top: 10rem;    /* 160px desktop */
    padding-bottom: 10rem;
  }
}
```

The dark ContactCTA section uses `clamp(7rem, 14vw, 10rem)` for slightly more dramatic vertical staging.

### 3.3 Component-level Spacing Patterns

| Pattern | Value | Where used |
|---------|-------|-----------|
| Section label → content gap | `3rem` | Philosophy, Founder, ContactCTA |
| Section label → content gap (programs) | `4rem` | ProgramsGrid header |
| Program row padding | `2.5rem 0` | ProgramRow vertical |
| Program row column gap | `2rem` | Index / content / price |
| Stat baseline gap | `2.5rem` | FounderStat horizontal |
| Stat internal gap | `0.3rem` | Value → label |
| Hero CTA hairline top margin | `3rem` | Post-tagline |
| Scroll indicator bottom | `2.5rem` | From viewport bottom |
| Footer internal padding | `3rem` top/bottom | |
| Mobile menu padding | `2rem 1.5rem` | |

---

## 4. Component Specifications

### 4.1 Navigation Header

```
Height:          60px (fixed)
Position:        fixed, top: 0, z-index: 50
Background:      var(--color-white) #FAFAF7
Border-bottom:   1px solid var(--color-line) #D9D4C8
```

**Logo (wordmark)**
```
Font:            Jost 300
Size:            0.75rem / 12px
Letter-spacing:  0.28em
Transform:       uppercase
Color:           var(--color-ink)
```

**Nav links (desktop)**
```
Font:            Jost 300
Size:            0.6875rem / 11px
Letter-spacing:  0.15em
Transform:       uppercase
Color (default): var(--color-ink-light)
Color (hover):   var(--color-ink)
Transition:      color 0.2s ease
```

**Hamburger (mobile, ≤768px)**
```
Lines:           3 × (width: 20px, height: 1px, bg: var(--color-ink))
Gap between:     5px
Open state:      line[0] rotate(45deg) translate(4px 4px),
                 line[1] opacity: 0,
                 line[2] rotate(-45deg) translate(4px -4px)
Transition:      transform 0.2s, opacity 0.2s
```

**Mobile menu drawer**
```
Background:      var(--color-white)
Border-top:      1px solid var(--color-line)
Padding:         2rem 1.5rem
Link gap:        1.5rem
```

**Breakpoint**: Desktop nav visible ≥769px. Hamburger visible ≤768px.

**Note**: No backdrop blur. No drop shadow. The border-bottom line is the only separation. Transparency effects are explicitly avoided — they read as trendy, not refined.

---

### 4.2 Hero Section

```
Height:          100dvh, min-height: 640px
Background:      var(--color-off-white) #F4F1EB
Overflow:        hidden
```

**Radial gradient overlay** (washi texture illusion)
```
position: absolute, inset: 0
background: radial-gradient(
  ellipse at 50% 40%,
  rgba(255,255,255,0.6) 0%,
  rgba(244,241,235,0) 65%
)
```

**Masu silhouette SVG** (background watermark)
```
Opacity:         0.05
Size:            min(58vw, 500px) × min(58vw, 500px)
Color:           var(--color-ink)
Animation:       fadeIn 2.4s + slowZoom 24s infinite alternate
SVG structure:   outer rect (strokeWidth 1.2) + inner rect (strokeWidth 0.6) +
                 4 corner diagonal lines (strokeWidth 0.5)
```

**Sub-tagline (English italic)**
```
Font:            Cormorant Garamond italic 300
Size:            clamp(0.875rem, 1.2vw, 1rem)
Letter-spacing:  0.18em
Color:           var(--color-ink-light)
Opacity:         0.75
Margin-bottom:   2.75rem
Animation:       reveal-fade, delay 0.2s
```

**Main tagline (H1)**
```
Font:            Noto Serif JP 300
Size:            clamp(2.125rem, 5.8vw, 4.25rem)
Line-height:     1.5
Letter-spacing:  0.14em
Color:           var(--color-ink)
Animation:       reveal, delay 0.5s
```

**Gold hairline**
```
Width:           32px (default) / 24px (section labels)
Height:          1px
Color:           var(--color-gold)
Opacity:         0.7
Margin-top:      3rem (below hero tagline)
Animation:       reveal-line (expandLine), delay 1.1s
```

**Scroll indicator**
```
Position:        absolute, bottom 2.5rem, centered
"scroll" label:  Jost 300, 0.625rem, letter-spacing 0.3em, uppercase,
                 color: var(--color-ink-light), opacity 0.7
Vertical line:   width 1px, height 48px, bg var(--color-ink), opacity 0.35
Animation:       reveal-fade, delay 1.6s
```

---

### 4.3 Section Labels

The `.label-text` utility class. Applied consistently to introduce every named section.

```css
.label-text {
  font-family:     'Jost', sans-serif;
  font-weight:     300;
  letter-spacing:  0.22em;
  text-transform:  uppercase;
  font-size:       0.6875rem;   /* 11px */
  color:           var(--color-ink-light);
}
```

**Pattern — label with gold hairline** (Philosophy, Founder, ContactCTA)
```
Layout:         flexbox, align-items: center, gap: 1.25rem
Order:          [gold-hairline 24px] [label-text]
Margin-bottom:  3rem (to first content line)
```

**Pattern — label with right-aligned caption** (ProgramsGrid)
```
Layout:         flexbox, justify-content: space-between, align-items: baseline
Left:           label-text
Right:          Cormorant italic 300, clamp(0.875rem, 1.1vw, 1rem), opacity 0.75
Margin-bottom:  4rem
```

**Dark background variant** (ContactCTA section)
```
label-text color:   var(--color-line-dark)  — lightened for dark bg
hairline:           gold (unchanged)
```

---

### 4.4 Program Cards (Row Layout)

Programs use a list/row pattern, not a card grid. Each row is separated by hairline rules.

```
Container:       border-top: 1px solid var(--color-line)
Row:             border-bottom: 1px solid var(--color-line)
Row padding:     2.5rem 0
Grid:            3 columns — [2.5rem] [1fr] [auto]
Column gap:      2rem
```

**Column 1 — Index number**
```
Font:            Jost 300
Size:            0.6875rem
Letter-spacing:  0.15em
Color:           var(--color-line-dark)
Format:          zero-padded ("01", "02"…)
padding-top:     0.35rem (optical alignment to title baseline)
```

**Column 2 — Content**

Program name (English, Cormorant italic):
```
Font:            Cormorant Garamond italic 300
Size:            clamp(1.375rem, 2.2vw, 1.6875rem)
Letter-spacing:  0.02em
Line-height:     1.2
Color:           var(--color-ink)
Margin-bottom:   0.3rem
```

Program name (Japanese, beneath English name):
```
Font:            Noto Serif JP 300
Size:            0.75rem
Letter-spacing:  0.1em
Color:           var(--color-ink-light)
```

Description:
```
Font:            Noto Serif JP 300
Size:            0.9375rem
Line-height:     2.0
Letter-spacing:  0.05em
Color:           var(--color-ink-light)
Max-width:       60ch
Margin-top:      0.85rem (after name group)
```

**Column 3 — Price + Arrow**
```
Align:           flex-end, column direction, gap 0.9rem
Price:           Jost 300, 0.6875rem, letter-spacing 0.15em,
                 color var(--color-gold), white-space: nowrap
```

**Row hover state**
```
Background:      rgba(184, 150, 62, 0.035)  — barely perceptible gold wash
Padding-left:    0.75rem  — slight indent, communicates interactivity
Transition:      background-color 0.5s, padding-left 0.5s — both ease-out-expo
```

---

### 4.5 CTA Buttons

THE FOMUS uses **link-style CTAs only**. No filled buttons, no rounded pill buttons. The brand does not push; it invites.

**Primary CTA — Gold text link with underline** (ContactCTA section)
```
Font:            Jost 300
Size:            0.75rem
Letter-spacing:  0.28em
Transform:       uppercase
Color (default): var(--color-gold)
Color (hover):   var(--color-gold-pale)
Gap (default):   0.75rem  (label → arrow)
Gap (hover):     1.1rem   (expands on hover)
Arrow:           → unicode, inline-block
Underline:       absolute, bottom: 0, height: 1px, bg var(--color-gold), opacity 0.65
  Default width:  3rem (partial)
  Hover width:    100% (expands to full text width)
Transition:      color 0.4s, gap 0.4s, width 0.5s — all ease-out-expo
```

**Ghost CTA — Text link with arrow** (`.gold-link` — Philosophy, Founder "Read more")
```
Font:            Jost 300
Size:            0.75rem
Letter-spacing:  0.15em
Transform:       uppercase
Color (default): var(--color-ink-light)
Color (hover):   var(--color-gold)
Gap (default):   0.65em
Gap (hover):     0.95em
Arrow:           ::after pseudo-element → unicode
  Hover transform: translateX(3px)
Transition:      color 0.4s, gap 0.4s — ease-out-expo
```

**Rule**: CTAs appear once per section at most. They sit at the bottom of their section's content, preceded by 3–3.5rem margin.

---

### 4.6 Statement / Quote Blocks

Used in: Statement, PhilosophyFragment, FounderFragment.

**Gold hairline entrance** (Statement — no label, hairline only)
```
Width:           32px
Margin-bottom:   3.25rem
Animation:       reveal-line (expandLine from left)
```

**Body text lines (Philosophy / Statement / Founder)**

Each line is a separate `<p>` element with staggered `.reveal-delay-N` animation.

```
Philosophy quote:
  Font:            Noto Serif JP 300
  Size:            clamp(1.375rem, 2.6vw, 1.75rem)
  Line-height:     1.95
  Letter-spacing:  0.08em
  Color:           var(--color-ink)
  Paragraph gap:   0 (controlled entirely by line-height)

Statement lines:
  Font:            Noto Serif JP 300
  Size:            clamp(1.0625rem, 1.85vw, 1.3125rem)
  Line-height:     2.25
  Letter-spacing:  0.075em
  Color:           var(--color-ink)

Founder body text:
  Font:            Noto Serif JP 300
  Size:            clamp(1.0625rem, 1.85vw, 1.1875rem)
  Line-height:     2.15
  Letter-spacing:  0.075em
  Color:           var(--color-ink)
```

**Founder statistics (below body text)**
```
Container:       flex, align-items: baseline, gap 2.5rem, flex-wrap
Top:             border-top 1px solid var(--color-line), padding-top 2rem
Margin-bottom:   3rem

Value:           Cormorant Garamond italic 300
                 Size: clamp(1.75rem, 3vw, 2.25rem)
                 Color: var(--color-gold)
                 Letter-spacing: 0.02em
                 Line-height: 1.0

Label:           Jost 300, 0.6875rem, letter-spacing 0.2em, uppercase
                 Color: var(--color-ink-light)
```

---

### 4.7 Footer

```
Border-top:      1px solid var(--color-line)
Background:      var(--color-white)
Padding:         3rem top/bottom (inside container-content)
Layout:          flex column, gap 1.5rem
```

**Brand name**
```
Font:            Jost 300
Size:            0.875rem
Letter-spacing:  0.25em
Transform:       uppercase
Color:           var(--color-ink)
```

**Tagline**
```
Font:            Noto Serif JP 300
Size:            0.8125rem
Letter-spacing:  0.05em
Color:           var(--color-line-dark)
Margin-top:      0.5rem (below brand name)
```

**Divider**: `<hr class="divider">` — 1px solid var(--color-line), no border on other sides.

**Copyright**
```
Font:            Jost 300
Size:            0.6875rem
Letter-spacing:  0.05em
Transform:       uppercase
Color:           var(--color-line-dark)
```

---

### 4.8 Dividers and Decorative Elements

**Standard divider** (`.divider`)
```css
border: none;
border-top: 1px solid var(--color-line);   /* #D9D4C8 */
```

**Gold hairline** (`.gold-hairline`)
```css
display: block;
width: 32px;          /* default; 24px in section label contexts */
height: 1px;
background-color: var(--color-gold);   /* #B8963E */
opacity: 0.7;
transform-origin: left center;         /* slides from left on reveal */
```

**Gold hairline centered** (`.gold-hairline--center`)
```css
margin-left: auto;
margin-right: auto;
transform-origin: center;
```

**Dark section gold glow** (ContactCTA bg effect)
```css
position: absolute;
top: -20%;
left: 50%;
transform: translateX(-50%);
width: 80%;
height: 140%;
background: radial-gradient(
  ellipse at top,
  rgba(184,150,62,0.10) 0%,
  rgba(184,150,62,0) 55%
);
pointer-events: none;
```

---

## 5. Motion and Animation Principles

### 5.1 Easing Functions

```css
:root {
  --ease-out-expo:  cubic-bezier(0.22, 1, 0.36, 1);    /* primary — fast start, long tail */
  --ease-out-quint: cubic-bezier(0.16, 1, 0.3, 1);     /* secondary — slightly gentler */
}
```

**Rule**: No `ease-in-out`. No spring physics. No bounce (`cubic-bezier` with values > 1). These curves are for content that emerges like ink spreading into paper.

### 5.2 Keyframes

```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes expandLine {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@keyframes slowZoom {
  from { transform: scale(1); }
  to   { transform: scale(1.035); }
}
```

**translateY distance**: 24px only. Never more. Large movements read as theatrical.

**slowZoom**: 24-second duration, infinite alternate. Used exclusively on the Hero masu silhouette. Creates the illusion of breath in an otherwise static image.

### 5.3 Reveal System

Elements start invisible (`opacity: 0`). The `.is-in-view` class is added by IntersectionObserver when the element enters the viewport.

```css
/* Base state — hidden until observed */
.reveal       { opacity: 0; }
.reveal-line  { transform: scaleX(0); }

/* Triggered by IntersectionObserver adding .is-in-view */
.reveal.is-in-view       { animation: fadeInUp  1.2s var(--ease-out-expo) forwards; }
.reveal-fade.is-in-view  { animation: fadeIn    1.4s var(--ease-out-expo) forwards; }
.reveal-line.is-in-view  { animation: expandLine 1.4s var(--ease-out-expo) forwards; }
```

### 5.4 Stagger Delays

```css
.reveal-delay-1.is-in-view { animation-delay: 0.12s; }
.reveal-delay-2.is-in-view { animation-delay: 0.24s; }
.reveal-delay-3.is-in-view { animation-delay: 0.38s; }
.reveal-delay-4.is-in-view { animation-delay: 0.52s; }
.reveal-delay-5.is-in-view { animation-delay: 0.66s; }
.reveal-delay-6.is-in-view { animation-delay: 0.80s; }
```

**Usage**: Stagger is applied per-section to items within the section's container. The section container's IntersectionObserver fires once when the container enters view, then all staggered children animate in sequence.

### 5.5 Hover Transitions

All interactive hover transitions use `var(--ease-out-expo)`.

| Element | Property | Duration | Notes |
|---------|----------|----------|-------|
| Nav link color | color | 0.2s | Faster — immediate feedback |
| `.gold-link` color + gap | color, gap | 0.4s | |
| `.gold-link` arrow | transform | 0.4s | +3px translateX |
| Contact CTA color + gap | color, gap | 0.4s | |
| Contact CTA underline | width | 0.5s | Slow expansion feels deliberate |
| Program row bg | background-color | 0.5s | Very subtle — barely visible |
| Program row indent | padding-left | 0.5s | Confirms hover, not distracting |

### 5.6 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal, .reveal-fade, .reveal-line {
    opacity: 1;
    transform: none;
  }
}
```

All animation is non-essential. Content must be fully visible without motion.

---

## 6. Layout Grid

### 6.1 Containers

```css
.container-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;    /* 24px horizontal gutter */
}

.container-narrow {
  width: 100%;
  max-width: 760px;     /* overridden to 780px in some sections */
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

| Container | Max-width | Used in |
|-----------|-----------|---------|
| `container-content` | 1200px | Header, ProgramsGrid, Footer |
| `container-narrow` | 760–780px | Philosophy, Founder, ContactCTA, Statement |
| Hero (implicit) | 960px | `max-width: 960px` on tagline group |

### 6.2 Breakpoints

```
Mobile:   < 768px    (hamburger menu, single-column layouts)
Tablet:   768–1023px (intermediate — no special layout currently)
Desktop:  ≥ 1024px   (section-gap increases to 10rem, desktop nav visible)
```

**Tailwind config**
```js
screens: {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1536px',
}
```

### 6.3 Section Page Flow (top to bottom)

```
[Header — fixed 60px]
[Hero — 100dvh, bg: off-white]
[Statement — section-gap, bg: white]
[ProgramsGrid — section-gap, bg: off-white]
[PhilosophyFragment — section-gap, bg: white]
[FounderFragment — section-gap, bg: off-white]
[ContactCTA — clamp(7rem,14vw,10rem) padding, bg: ink #1A1814]
[Footer — 3rem padding, bg: white]
```

**Alternating white / off-white sections** create rhythm without adding decorative elements. The dark ContactCTA acts as a terminus — it signals closure.

### 6.4 ProgramsGrid Layout

```
Section container:  container-content (1200px)
Grid inside:        not CSS grid — flex list with border-top on container
Row grid:           grid-template-columns: 2.5rem 1fr auto
Row gap:            2rem
Row padding:        2.5rem 0
```

---

## 7. Imagery Direction

### 7.1 Photography Style

All photography should feel like it was taken in a controlled silence. Reference: Kengo Kuma's architectural photography, Haiku-aesthetics, Comme des Garçons lookbooks.

**Subject matter (in priority order)**
1. The masu itself — wood grain, corner joinery, interior shadow
2. Hands in ceremony — receiving, pouring, presenting (no faces required)
3. Spaces — ryokan engawa, hotel lobbies at dawn, embassy receiving rooms
4. Materials — unfinished cedar, paulownia, lacquer, washi

**Prohibited subjects**
- Group shots, team photos, stock-photo smiling
- Cluttered backgrounds, urban street photography
- Product flatlay on marble/concrete (too generic luxury)
- Any image where the masu is incidental rather than the subject

### 7.2 Color Treatment

```
Tone:          Cool-warm balance — never oversaturated
Whites:        #FAFAF7 equivalent — warm white, not bright white
Shadows:       Deep but not crushed — preserve wood texture in dark areas
Highlights:    Never blown out
Processing:    Slightly desaturated (−15 to −20 vibrance equivalent)
               Film grain: subtle, medium grain at 100% = 12–18%
```

**Overlays** — when text must appear over imagery:
```
Light overlay: rgba(250, 250, 247, 0.72)  — washi white at 72%
Dark overlay:  rgba(26, 24, 20, 0.55)     — ink at 55%
```
Prefer placing text in clear negative space rather than using overlays.

### 7.3 Aspect Ratios

| Use case | Ratio | Notes |
|----------|-------|-------|
| Hero full-bleed (future) | 16:9 or 3:1 cinematic | Anchored center |
| Program card image (future) | 4:3 | Portrait orientation preferred |
| Founder portrait | 3:4 | Head-and-shoulders, significant negative space above |
| Detail / craft close-up | 1:1 | Square — for grid use |
| Horizontal editorial | 16:7 | Cinematic — section dividers |

### 7.4 Current Placeholder Approach

Until real photography is supplied, the design uses:

1. **Background color blocks** — `var(--color-off-white)` with no placeholder imagery
2. **Masu SVG silhouette** — the existing geometric SVG in the Hero (opacity 0.05) functions as a compositional anchor
3. **Text-only sections** — all current sections are typographic; no image placeholders required

When adding image placeholders during development:
```
Background:     var(--color-off-white)
Border:         1px solid var(--color-line)
Aspect ratio:   as specified per section above
Content:        No placeholder text, icons, or "coming soon" labels
                A centered gold hairline (32px × 1px, var(--color-gold)) suffices
```

---

## 8. Accessibility

### 8.1 Focus Styles

```css
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
  border-radius: 2px;
}
```

### 8.2 Selection Color

```css
::selection {
  background: rgba(184, 150, 62, 0.22);
  color: var(--color-ink);
}
```

### 8.3 ARIA Patterns

- Hero `<section>` has `aria-label={tagline}`
- Decorative elements (SVG silhouette, hairlines, scroll indicator, glow overlays) carry `aria-hidden="true"`
- Hamburger button has `aria-label="メニュー"`
- `<blockquote>` wraps philosophy quote text (semantic)

### 8.4 Contrast Ratios (WCAG AA)

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| `#1A1814` ink | `#FAFAF7` white | ~19:1 | AAA |
| `#4A4740` ink-light | `#FAFAF7` white | ~9.5:1 | AAA |
| `#4A4740` ink-light | `#F4F1EB` off-white | ~8.8:1 | AAA |
| `#B8963E` gold | `#1A1814` ink | ~4.6:1 | AA |
| `#8C8880` line-dark | `#1A1814` ink | ~3.8:1 | AA large text only |
| `#FAFAF7` white | `#1A1814` ink | ~19:1 | AAA |

**Note**: `--color-line-dark` (#8C8880) on dark background (ContactCTA section) is used only for 11px uppercase label text. At this size (large text equivalent in WCAG terms given tracking) this passes AA. Do not use it for body text on dark backgrounds.

---

## 9. Tailwind v4 Configuration Reference

Tailwind v4 uses CSS `@theme` blocks instead of `tailwind.config.js`. Extend `globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-fomus-white:      #FAFAF7;
  --color-fomus-off-white:  #F4F1EB;
  --color-fomus-ink:        #1A1814;
  --color-fomus-ink-light:  #4A4740;
  --color-fomus-ink-mute:   #6E6A62;
  --color-fomus-gold:       #B8963E;
  --color-fomus-gold-pale:  #D4B483;
  --color-fomus-gold-deep:  #8F7230;
  --color-fomus-line:       #D9D4C8;
  --color-fomus-line-dark:  #8C8880;

  /* Fonts */
  --font-family-serif-jp:   var(--font-noto-serif-jp), "Noto Serif JP", serif;
  --font-family-display:    var(--font-cormorant), "Cormorant Garamond", serif;
  --font-family-sans:       var(--font-jost), Jost, sans-serif;

  /* Spacing (extends default scale) */
  --spacing-18:  4.5rem;
  --spacing-25:  6.25rem;
  --spacing-26:  6.5rem;
  --spacing-40:  10rem;

  /* Easing */
  --ease-out-expo:  cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-quint: cubic-bezier(0.16, 1, 0.3, 1);

  /* Breakpoints (same as Tailwind defaults — listed for clarity) */
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

---

## 10. Things That Are Never Done

A non-exhaustive list of patterns that violate the brand voice:

| Never | Because |
|-------|---------|
| Box shadows on cards or buttons | Shadows suggest elevation/depth — this brand is flat and grounded |
| Border-radius > 2px on structural elements | Rounded corners are casual; this brand is precise |
| Background blur (`backdrop-filter: blur`) | Reads as iOS / trendy, not timeless |
| Gradient buttons | No filled buttons at all; see Section 4.5 |
| Icon libraries (Heroicons, Lucide, etc.) | Arrow → is the only icon needed; it is typed literally |
| Color fills on hover that change background substantially | Program row uses rgba at 3.5% gold — never more |
| Animations that loop visibly (except Hero slowZoom) | Motion should complete and rest |
| Multiple font weights in one text block | One weight per semantic role |
| Justified text | Never. Ragged-right only for all Japanese and English body text |
| Underlines on links (except CTA underline element) | Use color shift + arrow instead |
