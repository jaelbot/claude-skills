---
name: sponsorship-deck
description: "Use this skill to create a GFTN event sponsorship or partnership deck as a .pptx file. Trigger whenever the user asks to create, build, draft, or update a sponsorship deck, partnership deck, or sponsor proposal for any GFTN event or forum (e.g. Global SME Finance Forum, Point Zero Forum, Insights Forum, Singapore FinTech Festival). Also trigger for phrases like 'make a deck for sponsors', 'build a partnership proposal', or 'create a sponsorship presentation' in a GFTN context."
---

# GFTN Sponsorship Deck Skill

Creates a professional GFTN partnership/sponsorship deck as a `.pptx` file, following the standard structure used across GFTN forums.

**This skill works alongside the `pptx` skill** — read [pptx/SKILL.md](../pptx/SKILL.md) for how to create and visually QA `.pptx` files.

---

## Step 1: Determine the Mode

**Before doing anything else**, ask:

> "Is this a **brand new forum** (first edition, no previous decks), or does this forum have **previous editions** I can reference?"

Then follow the corresponding path below.

---

## Mode A — Brand New Forum

Use this when the forum has no prior editions or reference decks.

### A1: Gather Inputs

Ask the user for the following. Mark required fields — do not proceed without them.

**Required**
| Field | Example |
|-------|---------|
| Event name | GFTN Climate Finance Summit |
| Year | 2026 |
| Location | Singapore |
| Venue | Marina Bay Sands |
| Hosted by | GFTN |
| Organised by | GFTN |
| Theme | [Ask user] |
| Event dates | [Ask user] |
| Contact name + email | [Ask user] |

**Ask for each of the following — include slides only if user can provide content**
| Field | Notes |
|-------|-------|
| Forum description | 2–3 sentence overview of what this forum is and why it exists |
| Location value proposition | Why does this city/venue matter? |
| Topic pillars | Ideally 3 pillars with a name + 3–5 sub-topics each |
| Sponsorship tiers & prices | Tier names (e.g. Gold/Silver/Bronze) + USD prices + benefit list |
| Activations | Which activations to offer — see standard list in Step 3 |
| Why sponsor | 3 reasons a sponsor should attend |
| Week/agenda overview | Day-by-day structure |
| Any network or co-host stats | If GFTN or a co-host has relevant reach/network data to include |

If the user says to use GFTN's standard network data, use:
- 300+ member organisations across the GFTN global network
- Presence across 50+ countries

### A2: Build the Deck

Use the slide structure in **Step 4** below, applying only slides for which content is available. Skip any slide where you don't have enough content — do not leave placeholder text.

---

## Mode B — Returning Forum (Previous Editions Exist)

Use this when the forum has run before and previous decks are available.

### B1: Request Previous Materials

Ask the user:

> "Please share the previous year's sponsorship/partnership deck (and any post-event data reports if available). I'll use these as the base and update for the new edition."

Wait for the user to provide files before proceeding. Accept:
- `.pptx` deck from the previous year
- Post-event data extracts (`.pptx` or `.pdf`)
- Any other reference files (teaser decks, KV proposals, pricing sheets)

For GSMEF specifically, pre-loaded references are available:
- [references/gsmef-2026-content.md](references/gsmef-2026-content.md) — 2026 content
- [references/gsmef-2025-content.md](references/gsmef-2025-content.md) — 2025 content

### B2: Extract from Previous Deck

Once files are received, extract the following from the previous deck:
- Slide structure and order
- Existing stats, speaker names, audience breakdowns, sponsor names
- Activations and their specs
- Design palette and branding (if carrying forward)

### B3: Gather Updates for This Edition

After reviewing the previous deck, prompt the user for **only what has changed**:

> "I've reviewed last year's deck. Here's what I need updated for [year]:"

Then ask for each of the following:

| What to update | Question to ask |
|---------------|-----------------|
| Event dates & location | "What are the dates and venue for [year]?" |
| Edition number | "What edition is this?" |
| Theme | "What is the [year] theme? Do you have the rationale paragraph?" |
| Topic pillars | "Are the topic pillars the same, or are there new ones for [year]?" |
| Audience stats | "Do you have updated audience stats from last year's event (attendee type % and geographic breakdown)?" |
| Speakers | "Who are the confirmed speakers for [year]? Or should I carry forward [previous year]'s speakers as placeholders?" |
| Sponsors | "Do you have an updated sponsor list to show?" |
| Sponsorship tiers & pricing | "Are the tier names and prices the same, or have they changed?" |
| Key visual / branding | "Is the [year] branding the same, or is there a new key visual / colour palette?" |
| New slides or sections | "Is there anything new this year that wasn't in last year's deck?" |
| Activations | "Are all the same activations being offered, or have any been added/removed?" |

Skip any question where the user has already provided the answer.

### B4: Build the Deck

Carry forward all unchanged content from the previous deck. Only rebuild slides where content has been updated. Use the slide structure in **Step 4** below.

---

## Step 2: Confirm Before Building

Before generating the `.pptx`, summarise what you have and what will be skipped:

> "Here's what I'll include: [list slides]. I'll skip [X] because [reason]. Shall I proceed?"

---

## Step 3: Standard Activations

Each activation slide uses a consistent layout: title, 1-line description, spec boxes (label in small caps + value below, thin accent line between).

| Activation | Key Specs |
|-----------|-----------|
| Boardroom Discussion | 90 min, 10 pax, closed-door, by invitation, dedicated findings report — 8 slots |
| Workshops | 30 min, 100 pax, open to all, attendee list provided — 16 slots |
| Breakfast / Lunch Briefing | 60 min, 10 pax, private, dedicated findings report — 1 slot per location per day |
| Breakfast Reception | CEO welcome remarks, screen branding (highest traffic), app + agenda logo, branded tent cards — 2 slots (1 per day) |
| Lunch Reception | CEO welcome remarks, screen branding, app + agenda logo, 1 branded tent card — 2 slots (1 per day) |
| Tea Break | Screen branding, app + agenda logo, 1 branded tent card — 2 slots (1 per day) |
| Registration Branding | Online registration page + onsite registration desk branding |
| Lanyards Branding | Ticket confirmation + lanyards worn by all attendees |
| Event App & Meetings Area | Logo in app, pre-event marketing campaigns, early attendee list access |
| Executive Lounge | Registration desk branding + VIP lounge branding (collaterals, tables, coffee area) |
| Forum Stage | Branded video ad (30s) + logo placement for 1 day |
| Knowledge Reports | Thought leadership logo, USD 15,000, 3 spots × 3 reports |
| AI Insights Engine | Gen AI engine distilling forum insights — brand association with outputs |
| FutureMatters Stage | Co-curated thought leadership session listed on agenda |
| GSMEFF Dinner | Pre-event VIP dinner, CEO welcome, logo on invitation — 2 slots |

Only include activations confirmed for this event.

---

## Step 4: Standard Slide Structure

Skip any slide where you don't have enough content. Don't leave placeholder text — omit the slide instead.

| # | Slide | Required? | Content |
|---|-------|-----------|---------|
| 1 | **Cover** | Always | Event name, theme, dates + location, Hosted By / Organised By, key visual if available |
| 2 | **Forum Overview / The Opportunity** | Always | Edition number, gap/opportunity framing, headline stats (attendees, C-suite %, countries) |
| 3 | **Network Stats** | If data available | Headline quote + 5 key stats (members, MSMEs, finance enabled, AUM, countries) |
| 4 | **GFTN / Co-Host Network** | If co-host exists | Description of GFTN's role + co-host's global presence |
| 5 | **Theme + Topics** | Always | Theme title + rationale + 3-pillar topic breakdown |
| 6 | **Week Overview** | If data available | Venue + day-by-day agenda structure |
| 7 | **Who Attends** | If data available | Geographic % + attendee-type % from previous year, with year noted |
| 8 | **Featured Speakers** | If data available | Speaker cards (current or previous year) — note year clearly |
| 9 | **Past Sponsors** | If data available | Logo wall grouped by tier, year noted |
| 10 | **Why Sponsor** | Always | 3 numbered reasons |
| 11 | **Closing / Contact** | Always | CTA + contact name and email |
| 12 | **Partnership Options** | Always | Tier comparison table (names + prices + benefits) |
| 13+ | **Activations** | Per confirmed options | One slide per activation — consistent spec-box layout |

---

## Step 5: Design

### Default GFTN Palette (use when event has no own branding)
| Use | Value |
|-----|-------|
| Background | Navy `#0D1B2A` |
| Primary accent | Gold `#C9A84C` |
| Secondary | White `#FFFFFF` |
| Body text | Light grey `#E0E0E0` |

### GSMEF 2026 Palette (dark, premium)
| Use | Value |
|-----|-------|
| Background (cover/dividers) | Near-black `#0A0A0A` |
| Background (content slides) | Dark teal `#0D2B2B` |
| Primary accent | Lime green `#7DC242` |
| Secondary accent | Cyan `#00B4D8` |
| Text | White `#FFFFFF` |
| Muted text | Light grey `#AAAAAA` |

When the event has its own KV/colour palette, always use it. Otherwise fall back to the default GFTN palette.

### Typography
| Element | Style |
|---------|-------|
| Cover headline | Bold, 48–60pt, white |
| Slide title | Bold, 28–32pt, white or primary accent |
| Body | Regular, 14–16pt, white or light grey |
| Stat callout | Bold, 48–60pt, primary accent |
| Spec box label | 10–11pt, all caps, muted |

Font: Museo Slab 700 / Museo Sans Rounded 500 — use Calibri Bold / Calibri as fallback.

### Layout Principles
- Stats: large number + small label below, in a row
- Speaker cards: grid layout, name + title + org (+ photo placeholder if no photo)
- Activation slides: identical spec-box structure throughout
- Every slide needs a visual element — never text-only
- Generous whitespace — never cramped

### Avoid
- Light backgrounds unless specifically needed
- Leftover placeholder text in final output
- Inconsistent activation slide layouts

---

## Step 6: QA

Follow the full QA process from [pptx/SKILL.md](../pptx/SKILL.md):

1. Extract text — check for missing content and leftover placeholders
2. Convert to images and visually inspect every slide
3. Fix issues, re-verify, repeat until a full pass finds nothing new

---

## Adapting for Other GFTN Events

- **Slide structure and activations** are largely consistent — update content, not structure
- **Cover**: update event name, location, Hosted By / Organised By, key visual
- **Location value prop slide**: tailor to the specific city/venue's significance
- **Network stats**: replace with the relevant forum network's data
- **Theme, topics, speakers**: always event-specific — always ask the user
- **Branding**: check if the event has its own KV/colour palette or fall back to GFTN navy/gold
- Confirm the activation list before including all of them
