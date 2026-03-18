---
name: sponsorship-deck
description: "Use this skill to create a GFTN event sponsorship or partnership deck as a .pptx file. Trigger whenever the user asks to create, build, draft, or update a sponsorship deck, partnership deck, or sponsor proposal for any GFTN event or forum (e.g. Global SME Finance Forum, Point Zero Forum, Insights Forum, Singapore FinTech Festival). Also trigger for phrases like 'make a deck for sponsors', 'build a partnership proposal', or 'create a sponsorship presentation' in a GFTN context."
---

# GFTN Sponsorship Deck Skill

Creates a professional GFTN partnership/sponsorship deck as a `.pptx` file, following the standard structure used across GFTN forums.

**This skill works alongside the `pptx` skill** — read [pptx/SKILL.md](../pptx/SKILL.md) for how to create and visually QA `.pptx` files.

---

## Step 1: Gather Inputs

Collect the following before building. Ask the user for anything not provided. Skip slides where data is genuinely unavailable rather than leaving placeholders.

### Required
| Field | Example |
|-------|---------|
| Event name | Global SME Finance Forum 2026 |
| Year | 2026 |
| Location | Washington, D.C., USA |
| Hosted by | SME Finance Forum (managed by IFC) |
| Organised by | GFTN |
| Theme | Transforming Access into Impact |
| Event dates | 14–16 September 2026 |
| Edition number | 12th edition |

### Optional (include slides only if data is available)
| Field | Notes |
|-------|-------|
| Topic pillars + sub-topics | 3 pillars, 3–5 bullets each |
| Previous year audience stats | Geographic % + attendee type % breakdown |
| Previous year featured speakers | Name, title, org — 4–6 people |
| Previous year featured organisations | Grouped by category |
| Previous year sponsors | Logo/name list |
| Sponsorship tiers & prices | Tier names + USD amounts + benefit list |
| Activation options | Which activations to include and their specs |
| Week/agenda overview | Venue(s) and day-by-day structure |

If the user says "use last year's content" or "use 2025 data", pull defaults from [references/gsmef-2025-content.md](references/gsmef-2025-content.md).
For 2026 GSMEF content, use [references/gsmef-2026-content.md](references/gsmef-2026-content.md).

---

## Step 2: Build the Deck

Follow the standard slide structure below. **Skip any slide where you don't have enough content to fill it meaningfully.** Don't leave placeholder text — if a section is missing, omit it and adjust slide numbering.

### Standard Slide Structure

| # | Slide | Required? | Content |
|---|-------|-----------|---------|
| 1 | **Cover** | Always | Event name, theme, dates + location, Hosted By / Organised By logos, key visual if available |
| 2 | **Divider** | Optional | Subtle branded separator |
| 3 | **Forum Overview** | Always | Edition number, strategic anchors, 2–3 paragraph description |
| 4 | **D.C. / Location Value Prop** | If location is a key selling point | Highlight why this city/venue matters (e.g. World Bank HQ, development agenda) |
| 5 | **Network Stats** | If data available | Headline quote + 5 key stats (members, MSMEs, finance enabled, AUM, countries) |
| 6 | **Forum Activities** | If data available | Hub types, engagement categories (Learn / Link / Lead) |
| 7 | **Co-Host Network** | If co-host exists | World map of GFTN + partner's combined global presence |
| 8 | **Theme** | Always | Theme title + rationale paragraph |
| 9 | **Topics** | Always | 3 pillars, each with 1-line framing + 3–5 sub-topic bullets |
| 10 | **Who Attends** | If data available | Geographic breakdown + attendee-type breakdown from previous year |
| 11 | **Featured Speakers** | If data available | 4–6 speaker cards from previous year |
| 12 | **Week Overview** | If data available | Agenda/schedule and venue details |
| 13 | **Featured Organisations** | If data available | Logo grid by category |
| 14 | **Previous Sponsors** | If data available | Logo wall of past sponsors |
| 15 | **Partnership Options** | Always | Tier comparison table (names + USD prices + benefits) |
| 16 | **Why Sponsor** | Always | 3 numbered reasons |
| 17+ | **Activations** | Per confirmed options | One slide per activation |

### Standard Activations (Slides 17+)

Each activation slide: title, 1-line description, spec boxes (label in small caps, value below). Use a consistent layout across all activation slides.

| Activation | Key Specs |
|-----------|-----------|
| Boardroom Discussion | 90 min, 10 pax, closed-door, by invitation, 8 slots |
| Workshops | 30 min, 100 pax, open to all attendees, 16 slots |
| Breakfast / Lunch Briefing | 60 min, 10 pax, private, 1 slot per location per day |
| Breakfast Reception | CEO welcome remarks, screen branding, 2 slots (1 per day) |
| Lunch Reception | CEO welcome remarks, screen branding, 2 slots (1 per day) |
| Tea Break | Screen branding, tent cards, 2 slots (1 per day) |
| Registration Branding | Online registration page + onsite desk branding |
| Lanyards Branding | Ticket confirmation + lanyards worn by all attendees |
| Event App & Meetings Area | Logo in app + early attendee list access |
| Executive Lounge | VIP speaker space — registration desk + lounge branding |
| Forum Stage | Branded video ad (30s) + logo placement, 1 day |
| Knowledge Reports | Thought leadership logo, USD 15,000, 3 spots × 3 reports |
| AI Insights Engine | Gen AI engine distilling forum insights |
| Knowledge Reports – Key Topics | Topic breakdown across the 3 reports |
| FutureMatters Stage | Co-curated thought leadership session, listed on agenda |
| GSMEFF Dinner | Pre-event VIP dinner, CEO welcome, 2 slots |

Only include activations confirmed for this event.

---

## Step 3: Design

The 2026 GSMEF brand is a dark, premium palette — a significant departure from previous years. Apply it consistently.

### Colours
| Use | Value |
|-----|-------|
| Background (dark) | Near-black `#0A0A0A` or dark teal gradient |
| Primary accent | Lime green `#7DC242` |
| Secondary accent | Cyan / teal `#00B4D8` |
| Text on dark | White `#FFFFFF` |
| Location badge | Outlined pill, lime/teal text |

- **Cover and section dividers**: dark background with the Möbius ring key visual
- **Content slides**: dark background preferred for consistency; use a very dark teal `#0D2B2B` or near-black if full dark feels too heavy for body slides
- Lime green for headings and key callouts; cyan for dates, stats labels, and secondary text
- The three Möbius rings represent the 3 topic layers (Market / Capital / Technology) — reference this symbolism when relevant

### Key Visual
- The 2026 KV is three interconnected Möbius rings in transparent glass on a dark background, expanding into circular ripples
- Use it prominently on the cover slide (bottom half or full bleed)
- Can be used as a subtle background element or accent on section dividers
- Source file: `gsmeff kv_logo proposal2.pdf` in the GSMEF folder

### Logo Versions (use as appropriate)
1. **Horizontal dark**: "14-16 SEPT 2026 | GLOBAL SME FINANCE FORUM" — GLOBAL in lime green, rest white, dark background — for cover and dark slides
2. **Horizontal light**: Same layout on white background — for light slides if used
3. **Stacked dark**: "GLOBAL / SME FINANCE / FORUM | 14-16 / SEP / 2026" with lime green bar under "WASHINGTON, DC, USA" — for compact placements

### Typography
| Element | Style |
|---------|-------|
| Cover headline (theme) | Bold, 48–60pt, white |
| Slide title | Bold, 28–32pt, white or lime green |
| Section header | Bold, 20–24pt |
| Body | Regular, 14–16pt, white or light grey |
| Stat callout | Bold, 48–60pt, lime green or cyan |
| Spec box label | 10–11pt, all caps, muted grey |

Font: Use a clean geometric sans-serif (Calibri, Arial, or similar available system font). The brand uses **Museo Slab** (headings) and **Museo Sans Rounded** (body) — use these if available, otherwise Calibri Bold / Calibri.

### Layout Principles
- Stats: large number callout + small label below, arranged in a row
- Speaker cards: 4–6 up grid, photo + name + title + org
- Activation slides: identical spec-box structure on every slide
- Every slide needs a visual element — never text-only
- The KV ripple/ring motif can be echoed in decorative circular shapes on content slides

### Avoid
- Light backgrounds (unless specifically needed for a logo/sponsor page)
- Leftover placeholder text in final output
- Inconsistent activation slide layouts
- Cramped logo grids — give logos generous white (or dark) space

---

## Step 4: QA

Follow the full QA process from [pptx/SKILL.md](../pptx/SKILL.md):

1. Extract text — check for missing content and leftover placeholders
2. Convert to images and visually inspect every slide
3. Fix issues, re-verify, repeat until a full pass finds nothing new

---

## Adapting for Other GFTN Events

This skill is built around GSMEF 2026 but designed to transfer. When creating a deck for another forum:

- **Slide structure and activations** are largely consistent — update content, not structure
- **Cover**: update event name, location, Hosted By / Organised By, key visual
- **Location value prop slide**: tailor to the specific city/venue's significance
- **Co-host network**: update based on who is co-hosting
- **Network stats**: replace with relevant forum network's data
- **Theme, topics, speakers**: always event-specific — always ask the user
- **Branding**: check if the event has its own KV/colour palette (like GSMEF 2026 does) or whether to fall back to GFTN's standard navy/gold
- Confirm the activation list before including all of them
