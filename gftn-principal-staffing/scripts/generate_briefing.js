/**
 * GFTN Principal Staffing — Briefing Document Generator
 *
 * Three brief types:
 *   --brief-type meeting-brief   Short 1-page brief for a 30–60 min meeting
 *   --brief-type event-brief     Full brief for a longer session or event engagement
 *   --brief-type speakers-brief  Speaking slot brief with talking points and AV notes
 *
 * Usage:
 *   NODE_PATH=/usr/local/lib/node_modules_global/lib/node_modules \
 *     node generate_briefing.js \
 *     --event "Black Swan Summit" \
 *     --date "23 March 2026" \
 *     --time "09:00–12:00" \
 *     --engagement "GFTN Board Meeting" \
 *     --principal "Chairman" \
 *     --type "Meeting" \
 *     --brief-type "meeting-brief" \
 *     --poc "Sarah Chen" \
 *     --venue "TBC" \
 *     --output /path/to/output.docx
 */

const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, HeadingLevel, BorderStyle,
        WidthType, ShadingType, PageNumber, LevelFormat, VerticalAlign } = require('docx');
const fs = require('fs');

// ── Parse CLI args ────────────────────────────────────────────────────────────
const args = {};
process.argv.slice(2).forEach((val, i, arr) => {
  if (val.startsWith('--')) args[val.slice(2)] = arr[i + 1];
});

const {
  event        = '[Event Name]',
  date         = '[Date]',
  time         = '[Time]',
  engagement   = '[Engagement Name]',
  principal    = '[Principal Name]',
  type         = '[Type]',
  'brief-type': briefType = 'meeting-brief',
  poc          = '[POC Name]',
  venue        = 'TBC',
  duration     = '',
  output       = 'briefing.docx'
} = args;

// ── GFTN Brand Palette ────────────────────────────────────────────────────────
const NAVY_DARK   = "032C68";  // H1, title
const NAVY_MID    = "0F4761";  // H2, H3, table headers
const NAVY_LIGHT  = "D6E4F0";  // table header fill (light tint of navy)
const BODY        = "1B232C";  // body text
const GREY_DARK   = "595959";  // muted/subtitle
const GREY_LIGHT  = "F5F5F5";  // alternating row
const WHITE       = "FFFFFF";
const BORDER_COL  = "CCCCCC";
const ACCENT_BLUE = "156082";  // accent colour from theme

const CONTENT_W = 9026;  // A4 with 1" margins

const bdr = { style: BorderStyle.SINGLE, size: 1, color: BORDER_COL };
const hdrbdr = { style: BorderStyle.SINGLE, size: 1, color: NAVY_MID };
const borders = { top: bdr, bottom: bdr, left: bdr, right: bdr };
const hdrBorders = { top: hdrbdr, bottom: hdrbdr, left: hdrbdr, right: hdrbdr };
const noBdr = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBdr, bottom: noBdr, left: noBdr, right: noBdr };

// ── Helpers ───────────────────────────────────────────────────────────────────
function run(text, opts = {}) {
  return new TextRun({ text, font: "Open Sans", size: 22, color: BODY, ...opts });
}

function p(children, opts = {}) {
  const runs = typeof children === 'string'
    ? [run(children, opts.run || {})]
    : children;
  return new Paragraph({ spacing: { before: 80, after: 80 }, ...opts, children: runs });
}

function spacer(pts = 80) {
  return new Paragraph({ spacing: { before: pts, after: 0 }, children: [] });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY_DARK, space: 4 } },
    children: [new TextRun({ text, font: "Open Sans Light", size: 32, bold: true, color: NAVY_DARK })]
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text, font: "Open Sans", size: 24, bold: true, color: NAVY_MID })]
  });
}

function bullet(text, indent = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level: indent },
    spacing: { before: 60, after: 60 },
    children: [run(text)]
  });
}

function placeholder(text) {
  return new Paragraph({
    spacing: { before: 80, after: 80 },
    children: [new TextRun({ text, font: "Open Sans", size: 22, italics: true, color: GREY_DARK })]
  });
}

// Two-column detail row (label | value)
function detailRow(label, value, shade = WHITE) {
  const col1 = 2600, col2 = CONTENT_W - col1;
  return new TableRow({
    children: [
      new TableCell({
        borders: hdrBorders,
        width: { size: col1, type: WidthType.DXA },
        shading: { fill: NAVY_LIGHT, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [p([new TextRun({ text: label, font: "Open Sans", size: 20, bold: true, color: NAVY_MID })])]
      }),
      new TableCell({
        borders,
        width: { size: col2, type: WidthType.DXA },
        shading: { fill: shade, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [typeof value === 'string'
          ? p([new TextRun({ text: value, font: "Open Sans", size: 20, color: BODY })])
          : value]
      }),
    ]
  });
}

function detailTable(rows) {
  const widths = [2600, CONTENT_W - 2600];
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: widths,
    rows
  });
}

function sectionRow(label, placeholder_text) {
  const col1 = 2600, col2 = CONTENT_W - col1;
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [col1, col2],
    rows: [new TableRow({
      children: [
        new TableCell({
          borders: hdrBorders,
          width: { size: col1, type: WidthType.DXA },
          shading: { fill: NAVY_LIGHT, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [p([new TextRun({ text: label, font: "Open Sans", size: 20, bold: true, color: NAVY_MID })])]
        }),
        new TableCell({
          borders,
          width: { size: col2, type: WidthType.DXA },
          shading: { fill: GREY_LIGHT, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [placeholder(placeholder_text)]
        }),
      ]
    })]
  });
}

// ── Header / Footer ───────────────────────────────────────────────────────────
const docHeader = new Header({
  children: [new Paragraph({
    spacing: { before: 0, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: NAVY_DARK, space: 4 } },
    children: [
      new TextRun({ text: `${event}`, font: "Open Sans", size: 20, bold: true, color: NAVY_DARK }),
      new TextRun({ text: `  |  ${engagement}  |  CONFIDENTIAL`, font: "Open Sans", size: 18, color: GREY_DARK }),
    ]
  })]
});

const docFooter = new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0 },
    border: { top: { style: BorderStyle.SINGLE, size: 2, color: BORDER_COL, space: 4 } },
    children: [
      new TextRun({ text: `${event}  ·  For: ${principal}  ·  Page `, font: "Open Sans", size: 18, color: GREY_DARK }),
      new TextRun({ children: [PageNumber.CURRENT], font: "Open Sans", size: 18, color: GREY_DARK }),
    ]
  })]
});

// ══════════════════════════════════════════════════════════════════════════════
// BRIEF TYPE 1 — MEETING BRIEF (30–60 min)
// Compact 1-page format mirroring GFTN's standard brief structure
// ══════════════════════════════════════════════════════════════════════════════
function buildMeetingBrief() {
  const durationNote = duration ? `${duration}` : '30–60 mins';
  return [
    // Title
    new Paragraph({
      spacing: { before: 240, after: 60 },
      children: [new TextRun({ text: `Background Brief and Talking Points`, font: "Open Sans", size: 20, color: GREY_DARK })]
    }),
    new Paragraph({
      spacing: { before: 0, after: 120 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY_DARK, space: 8 } },
      children: [new TextRun({ text: `${principal}\u2019s Meeting with [Counterpart Name / Organisation]`, font: "Open Sans Light", size: 36, bold: true, color: NAVY_DARK })]
    }),
    spacer(120),

    // Details table
    detailTable([
      detailRow("Meeting Details", `${date}  ·  ${time}  ·  ${durationNote}\n${venue}`),
      detailRow("Participants",
        new Paragraph({ spacing: { before: 0, after: 0 }, children: [
          new TextRun({ text: "[Counterpart Organisation]\n", font: "Open Sans", size: 20, color: BODY }),
          new TextRun({ text: "[Counterpart Name, Title]\n\n", font: "Open Sans", size: 20, color: GREY_DARK }),
          new TextRun({ text: "GFTN\n", font: "Open Sans", size: 20, bold: true, color: BODY }),
          new TextRun({ text: `${principal}\n`, font: "Open Sans", size: 20, color: BODY }),
          new TextRun({ text: "[Others TBC]", font: "Open Sans", size: 20, color: GREY_DARK }),
        ]})
      ),
      detailRow("Brief Outline",
        new Paragraph({ spacing: { before: 0, after: 0 }, children: [
          new TextRun({ text: "1.  Proposed Talking Points\n2.  GFTN\u2019s Interests & Objectives\n3.  Background on the Engagement\n4.  Background on Counterpart", font: "Open Sans", size: 20, color: BODY })
        ]})
      ),
    ]),
    spacer(180),

    h1("1)  Proposed Talking Points for " + principal),
    placeholder("[List 3–5 bullet point talking points. Group by theme if helpful — e.g. GFTN's Work, Collaboration Opportunities, Ask/Next Steps.]"),
    spacer(60),
    bullet("[Key message 1]"),
    bullet("[Key message 2]"),
    bullet("[Key message 3]"),

    spacer(120),
    h1("2)  GFTN\u2019s Interests & Objectives"),
    placeholder("[What does GFTN hope to achieve from this meeting? What outcome or follow-up action are we seeking?]"),
    spacer(60),
    bullet("[Objective 1]"),
    bullet("[Objective 2]"),

    spacer(120),
    h1("3)  Background on the Engagement"),
    placeholder("[Context for why this meeting is happening. How did it come about? Any prior relationship or history between GFTN and the counterpart organisation?]"),

    spacer(120),
    h1("4)  Background on Counterpart"),
    placeholder("[Brief profile of the counterpart — who are they, what is their role and organisation, and why are they relevant to GFTN?]"),

    spacer(160),
    p([
      new TextRun({ text: "POC on the day:  ", font: "Open Sans", size: 20, bold: true, color: NAVY_MID }),
      new TextRun({ text: `${poc}  ·  [mobile number]`, font: "Open Sans", size: 20, italics: true, color: GREY_DARK }),
    ]),
    p([
      new TextRun({ text: "Prepared by:  ", font: "Open Sans", size: 20, bold: true, color: NAVY_MID }),
      new TextRun({ text: "[Name]  ·  [Date]  ·  Version: Draft", font: "Open Sans", size: 20, italics: true, color: GREY_DARK }),
    ]),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// BRIEF TYPE 2 — EVENT / SESSION BRIEF (longer engagement)
// ══════════════════════════════════════════════════════════════════════════════
function buildEventBrief() {
  return [
    new Paragraph({
      spacing: { before: 240, after: 60 },
      children: [new TextRun({ text: "BRIEFING DOCUMENT", font: "Open Sans", size: 20, color: GREY_DARK })]
    }),
    new Paragraph({
      spacing: { before: 0, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY_DARK, space: 8 } },
      children: [new TextRun({ text: engagement, font: "Open Sans Light", size: 40, bold: true, color: NAVY_DARK })]
    }),
    p([new TextRun({ text: `${event}  ·  ${date}  ·  For: ${principal}`, font: "Open Sans", size: 22, color: GREY_DARK, italics: true })]),
    spacer(120),

    // At a Glance box
    new Table({
      width: { size: CONTENT_W, type: WidthType.DXA },
      columnWidths: [CONTENT_W],
      rows: [new TableRow({ children: [new TableCell({
        borders: { top: { style: BorderStyle.SINGLE, size: 6, color: NAVY_DARK },
                   bottom: bdr, left: { style: BorderStyle.SINGLE, size: 12, color: NAVY_DARK }, right: bdr },
        shading: { fill: NAVY_LIGHT, type: ShadingType.CLEAR },
        width: { size: CONTENT_W, type: WidthType.DXA },
        margins: { top: 120, bottom: 120, left: 180, right: 120 },
        children: [
          p([new TextRun({ text: "At a Glance", font: "Open Sans", size: 20, bold: true, color: NAVY_DARK })]),
          p([new TextRun({ text: "Principal:  ", font: "Open Sans", size: 20, bold: true }), run(principal, { size: 20 })]),
          p([new TextRun({ text: "Session:  ", font: "Open Sans", size: 20, bold: true }), run(engagement, { size: 20 })]),
          p([new TextRun({ text: "Date & Time:  ", font: "Open Sans", size: 20, bold: true }), run(`${date}  ·  ${time}`, { size: 20 })]),
          p([new TextRun({ text: "Venue:  ", font: "Open Sans", size: 20, bold: true }), run(venue, { size: 20 })]),
          p([new TextRun({ text: "Type:  ", font: "Open Sans", size: 20, bold: true }), run(type, { size: 20 })]),
          p([new TextRun({ text: "POC:  ", font: "Open Sans", size: 20, bold: true }), new TextRun({ text: `${poc}  ·  [mobile]`, font: "Open Sans", size: 20, italics: true, color: GREY_DARK })]),
        ]
      })]})],
    }),
    spacer(160),

    h1("Briefing Details"),
    spacer(80),
    sectionRow("Session / Engagement Overview", "[Describe the session — what is it, who is running it, how does it fit in the broader event programme?]"),
    spacer(60),
    sectionRow("Objective", "[What is the purpose of this engagement? What does GFTN hope to achieve?]"),
    spacer(60),
    sectionRow("Audience / Attendees", "[Who will be in the room? List names, titles, and organisations where known.]"),
    spacer(60),
    sectionRow("Principal\u2019s Role", `[Is ${principal} speaking, moderating, attending as a guest, or chairing? What is expected of them?]`),
    spacer(60),
    sectionRow("Key Messages", "[3–5 talking points the principal should convey, if applicable.]"),
    spacer(60),
    sectionRow("Background & Context", "[Relevant background on the topic, attendees, or event context. Max 3–5 paragraphs.]"),
    spacer(60),
    sectionRow("Logistics", `[Room / hall location, start and end time, dress code if relevant, AV setup, any other practical details.]`),
    spacer(60),
    sectionRow("Contact on the Day", `${poc}  ·  [mobile number]`),

    spacer(120),
    p([new TextRun({ text: "Prepared by:  ", font: "Open Sans", size: 20, bold: true, color: NAVY_MID }),
       new TextRun({ text: "[Name]  ·  [Date]  ·  Version: Draft", font: "Open Sans", size: 20, italics: true, color: GREY_DARK })]),
  ];
}

// ══════════════════════════════════════════════════════════════════════════════
// BRIEF TYPE 3 — SPEAKER'S BRIEF
// ══════════════════════════════════════════════════════════════════════════════
function buildSpeakersBrief() {
  const speakDuration = duration || '[X] minutes';
  return [
    new Paragraph({
      spacing: { before: 240, after: 60 },
      children: [new TextRun({ text: "SPEAKER\u2019S BRIEF", font: "Open Sans", size: 20, color: GREY_DARK })]
    }),
    new Paragraph({
      spacing: { before: 0, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY_DARK, space: 8 } },
      children: [new TextRun({ text: engagement, font: "Open Sans Light", size: 40, bold: true, color: NAVY_DARK })]
    }),
    p([new TextRun({ text: `${event}  ·  ${date}  ·  Speaker: ${principal}`, font: "Open Sans", size: 22, color: GREY_DARK, italics: true })]),
    spacer(120),

    // Speaking slot summary table
    detailTable([
      detailRow("Event", `${event}  ·  ${date}`),
      detailRow("Session / Topic", "[Session title and topic description]"),
      detailRow("Speaking Slot", `${time}  ·  Duration: ${speakDuration}`),
      detailRow("Format", "[Keynote / Panel / Fireside / Moderated Q&A / Other]"),
      detailRow("Venue / Stage", venue),
      detailRow("Estimated Audience", "[Audience size and profile]"),
      detailRow("POC on the day", `${poc}  ·  [mobile number]`),
    ]),
    spacer(180),

    h1("1)  Key Messages & Talking Points"),
    placeholder("[3–5 key messages for the speaking slot. These should be the takeaways the audience leaves with.]"),
    spacer(60),
    bullet("[Key message 1]"),
    bullet("[Key message 2]"),
    bullet("[Key message 3]"),
    bullet("[Key message 4 — optional]"),

    spacer(120),
    h1("2)  Suggested Narrative Structure"),
    p([new TextRun({ text: "Opening  ", font: "Open Sans", size: 22, bold: true, color: NAVY_MID }),
       run(`(~${Math.round(parseInt(speakDuration)||10 * 0.15)} mins)`, { color: GREY_DARK })]),
    placeholder("[How should the speaker open? Context-setting, a hook, or a framing statement?]"),
    spacer(60),
    p([new TextRun({ text: "Body  ", font: "Open Sans", size: 22, bold: true, color: NAVY_MID }),
       run(`(~${Math.round(parseInt(speakDuration)||10 * 0.70)} mins)`, { color: GREY_DARK })]),
    placeholder("[Main substance — what should the speaker cover and in what order?]"),
    spacer(60),
    p([new TextRun({ text: "Close & Call to Action  ", font: "Open Sans", size: 22, bold: true, color: NAVY_MID }),
       run(`(~${Math.round(parseInt(speakDuration)||10 * 0.15)} mins)`, { color: GREY_DARK })]),
    placeholder("[What should the audience walk away thinking or doing?]"),

    spacer(120),
    h1("3)  Audience & Context"),
    sectionRow("Audience Profile", "[Who will be in the room? Seniority, industry, nationality, expected level of familiarity with the topic.]"),
    spacer(60),
    sectionRow("Event Context", "[How does this session fit in the broader event programme? What has come before or after?]"),
    spacer(60),
    sectionRow("Sensitivities / Watch Points", "[Anything the speaker should avoid or handle with care — political sensitivities, ongoing negotiations, media presence, etc.]"),

    spacer(120),
    h1("4)  Suggested Q&A Responses"),
    placeholder("[Anticipate 3–4 likely questions and provide suggested responses or framing.]"),
    spacer(60),
    p([new TextRun({ text: "Q:  ", font: "Open Sans", size: 22, bold: true, color: NAVY_MID }), placeholder("[Likely question]").children[0]]),
    placeholder("[Suggested response]"),
    spacer(40),
    p([new TextRun({ text: "Q:  ", font: "Open Sans", size: 22, bold: true, color: NAVY_MID }), placeholder("[Likely question]").children[0]]),
    placeholder("[Suggested response]"),

    spacer(120),
    h1("5)  Stage & AV Setup"),
    sectionRow("Stage Format", "[Podium / panel table / seated interview / standing]"),
    spacer(60),
    sectionRow("AV / Slides", "[Is the speaker presenting slides? Format required: 16:9 PPT. Submission deadline: [date]]"),
    spacer(60),
    sectionRow("Run of Show", "[Where does this slot appear in the session order? Who introduces the speaker?]"),
    spacer(60),
    sectionRow("Arrival & Sound Check", "[When should the speaker arrive backstage? Is there a sound check or walk-through?]"),

    spacer(160),
    p([new TextRun({ text: "Prepared by:  ", font: "Open Sans", size: 20, bold: true, color: NAVY_MID }),
       new TextRun({ text: "[Name]  ·  [Date]  ·  Version: Draft", font: "Open Sans", size: 20, italics: true, color: GREY_DARK })]),
  ];
}

// ── Assemble Document ─────────────────────────────────────────────────────────
let bodyChildren;
if      (briefType === 'speakers-brief') bodyChildren = buildSpeakersBrief();
else if (briefType === 'event-brief')    bodyChildren = buildEventBrief();
else                                     bodyChildren = buildMeetingBrief();  // default

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
      ]
    }]
  },
  styles: {
    default: { document: { run: { font: "Open Sans", size: 22, color: BODY } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Open Sans", color: NAVY_DARK },
        paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Open Sans", color: NAVY_MID },
        paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: { default: docHeader },
    footers: { default: docFooter },
    children: bodyChildren
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(output, buf);
  console.log(`[${briefType}] Briefing doc saved: ${output}`);
});
