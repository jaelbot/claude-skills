---
name: gftn-principal-staffing
description: >
  Use this skill whenever GFTN needs to manage the staffing and logistics of board members or
  International Advisory Board (IAB) members (called "principals") for any GFTN-organised event.
  Trigger this skill any time someone mentions: setting up a staffing tracker for a forum, summit,
  roadshow, or GFTN Select; creating briefing documents for principal engagements; assigning POCs
  to principals; updating a principal's itinerary; preparing materials for a board member or IAB
  member attending an event; or coordinating logistics (travel, accommodation, speaking slots,
  bilateral meetings) for principals. Use it even for casual phrasings like "I need to prep for
  the [event] with our board members", "can you set up the tracker for [principal]?", "help me
  get ready to staff the summit", or "create a briefing for [meeting name]". If the user is
  doing anything related to supporting a GFTN principal at an event — trigger this skill.
---

# GFTN Principal Staffing Skill

This skill helps GFTN staffers manage everything needed when board members or IAB members
(referred to throughout as **principals**) participate in GFTN-organised events.

---

## Step 0 — Ask Two Quick Questions First

Before generating anything, always ask the user:

**1. What stage are you at?**
This determines which part of the checklist to surface — don't generate the full checklist every time.

| Stage | When |
|---|---|
| **Just confirmed** | Principal's role just locked in; early logistics not yet started |
| **Preparing** | 2–3 weeks out; logistics underway, briefings in progress |
| **Final week** | 7 days or fewer to go |
| **Day of event** | Live, on-the-day coordination |
| **Post-event** | Event has concluded |

**2. What do you need?** (if not obvious from context)
- Full setup (tracker + briefing docs)
- Just the tracker
- Just a briefing doc
- Update an existing tracker
- Playbook pre-read (HTML)

---

## What This Skill Produces

1. **Schedule Tracker** (`.xlsx`) — collaborative file for SharePoint/OneDrive, aligned to the
   `Principal_Schedule Tracker.xlsx` template. Contains:
   - `Master Overview` — colour-coded bird's-eye view (one column per principal, colour matches
     their itinerary tab); principal columns colour-coded: green/blue/yellow/pink cycling per POC
   - One tab per principal — 9-column itinerary (Date, Time Start/End, Activity, Type,
     Venue, **Arranged by GFTN?** Yes/No/N/A dropdown, **Briefing Prepared?** Yes/No/N/A dropdown,
     Notes); Yellow rows = Suggested activities; Orange = Transfer/Meal
   - `POC Checklist` — 44 tasks across 5 phases (Upon Assignment / 2–3 Weeks Before /
     1 Week Before / Day of Event / Post-Event), each replicated per principal with
     checkbox + Status dropdown (To Do / In Progress / Done / N/A)
   - `WhatsApp Group Setup` — 7-row config including group name, creator, POC member list,
     ops members, purpose, **admin setting** (restrict pre-event messaging), and escalation note

2. **Briefing Documents** (`.docx`) — three types, chosen based on the engagement:

   | Type | Flag | Use when |
   |---|---|---|
   | **Meeting Brief** | `--brief-type meeting-brief` | 30–60 min meeting with a counterpart |
   | **Event Brief** | `--brief-type event-brief` | Longer session, panel, or multi-part engagement |
   | **Speaker's Brief** | `--brief-type speakers-brief` | Speaking slot, keynote, or moderated panel |

   Always ask which type if the engagement type is ambiguous.

3. **Playbook HTML** — a standalone pre-read of the full GFTN Principal Staffing Playbook,
   generated from `scripts/generate_playbook.py`

---

## Modes

### Mode 1 — Setup: New Event

Use when someone needs to generate all staffing materials for a new event from scratch.

**Inputs to collect** (ask if not already in conversation):

| Field | Notes |
|---|---|
| Event name | e.g. "Black Swan Summit" |
| Dates | e.g. "23–25 March 2026" |
| Location | e.g. "Perth, Australia" |
| Principals | Name and title for each |
| Known engagements | Per principal: date, time, activity, type, venue (use "TBC" if unknown) |
| POC assignments | Who covers which principal; flag if coordinator doubles as POC |
| Number of POCs | Total headcount |

**Step 1 — Build the event JSON:**

```json
{
  "event_name": "Black Swan Summit",
  "dates": "23–25 March 2026",
  "location": "Perth, Australia",
  "coordinator": "Coordinator Name",
  "pocs": ["Coordinator Name", "POC 2 Name", "POC 3 Name"],
  "principals": [
    {
      "name": "Chairman",
      "title": "Chairman, GFTN",
      "poc": "Coordinator Name",
      "engagements": [
        {
          "date": "23 March",
          "time_start": "09:00",
          "time_end": "12:00",
          "activity": "GFTN Board Meeting",
          "type": "Meeting",
          "venue": "TBC",
          "gftn_arranged": true,
          "briefing_needed": true,
          "brief_type": "meeting-brief",
          "notes": ""
        }
      ]
    }
  ]
}
```

Valid `type` values: `Speaking Slot`, `Panel`, `Meeting`, `Session`, `Transfer`, `Meal`, `Suggested`, `Other`

Valid `brief_type` values: `meeting-brief`, `event-brief`, `speakers-brief`

Mark `"type": "Suggested"` for activities the POC is recommending to maximise the principal's free time (highlighted yellow in the tracker).

**Step 2 — Generate the tracker:**

```bash
python scripts/generate_tracker.py \
  --config /path/to/event_config.json \
  --output /path/to/[EventName]_Principal_Tracker.xlsx
```

**Step 3 — Generate briefing docs** (one per engagement where `briefing_needed` is true):

```bash
NODE_PATH=/usr/local/lib/node_modules_global/lib/node_modules \
  node scripts/generate_briefing.js \
  --event "Black Swan Summit" \
  --date "23 March 2026" \
  --time "09:00–12:00" \
  --engagement "GFTN Board Meeting" \
  --principal "Chairman" \
  --type "Meeting" \
  --brief-type "meeting-brief" \
  --poc "Coordinator Name" \
  --venue "TBC" \
  --output /path/to/output.docx
```

**Step 4 — Stage-filtered checklist:**

Only surface the checklist items relevant to the user's current stage (see Step 0).
Don't dump the full list — it's more useful trimmed to what matters right now.

| Stage | Checklist items to show |
|---|---|
| Just confirmed | Confirm role, introduce to principal, set up tab in tracker, join WhatsApp group |
| Preparing | Book flights, accommodation, transport; schedule sidelined meetings; identify suggested activities |
| Final week | Send full schedule to principal; finalise and share briefing docs; set up WhatsApp group; update tracker |
| Day of event | Morning check-in; session coverage; flag changes via WhatsApp; suggest activities in free time; live tracker updates |
| Post-event | Confirm departure; follow up on requests; file documents |

**Step 5 — SharePoint guidance:**

Remind the user to:
- Upload the `.xlsx` tracker to the event's SharePoint/OneDrive folder
- Share with all POCs with **Edit** access (supports live co-authoring)
- Each POC works in their principal's tab; Main Coordinator manages Master Overview
- Suggest setting up the WhatsApp group at least 1 week before the event

---

### Mode 2 — Update: Add or Edit Engagements

Use when a POC wants to add new engagements or update an existing principal's itinerary.

1. If the user provides the existing `.xlsx`, load and update the relevant tab
2. If no file is provided, clearly list the additions so the POC can enter them into the shared SharePoint file
3. If a briefing doc is needed, generate one using the appropriate brief type

---

### Mode 3 — Briefing Doc Only

When someone just needs a briefing doc for a specific engagement:

1. Ask which brief type if not clear: meeting brief, event brief, or speaker's brief?
2. Collect: event, date, time, engagement name, principal, type, poc, venue, duration (for speakers)
3. Run `generate_briefing.js` with the correct `--brief-type` flag
4. Remind the user to fill in the grey placeholder sections

---

### Mode 4 — Playbook Pre-Read (HTML)

Generate a clean HTML version of the full GFTN Principal Staffing Playbook to share with the team before an event.

```bash
python scripts/generate_playbook.py \
  --output /path/to/GFTN_Staffing_Playbook.html
```

This produces a standalone, self-contained HTML file — no external dependencies. Share the link or attach to an email as a pre-read.

---

## File Naming Conventions

| File | Format |
|---|---|
| Schedule Tracker | `[EventName]_Principal_Tracker_[YYYY-MM-DD].xlsx` |
| Meeting Brief | `[EventName]_MeetingBrief_[Principal]_[CounterpartOrTopic].docx` |
| Event Brief | `[EventName]_EventBrief_[Principal]_[SessionName].docx` |
| Speaker's Brief | `[EventName]_SpeakersBrief_[Principal]_[SessionName].docx` |
| Playbook HTML | `GFTN_Principal_Staffing_Playbook.html` |

---

## Key Principles to Reflect in All Outputs

- Each principal has **one dedicated POC** who owns their logistics end-to-end
- The POC must ensure coverage at all times — if they can't attend a session, they delegate
- **"Suggested" activities** are the POC's proactive recommendations to maximise the principal's time — always prompt the POC to think about this
- The **Main Coordinator** is the single escalation point and manages the Master Overview
- The **WhatsApp group** (all POCs + Main Coordinator + project lead/head of operations) is the real-time channel on the day

---

## Scripts Reference

| Script | Purpose |
|---|---|
| `scripts/generate_tracker.py` | Generates the full `.xlsx` Schedule Tracker from JSON config |
| `scripts/generate_briefing.js` | Generates a `.docx` briefing doc (3 types via `--brief-type`) |
| `scripts/generate_playbook.py` | Generates a standalone `.html` playbook pre-read |
