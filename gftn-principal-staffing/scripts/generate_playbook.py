"""
GFTN Principal Staffing — HTML Playbook Generator
Produces a clean, standalone HTML pre-read using GFTN brand colours.
Usage: python generate_playbook.py --output GFTN_Principal_Staffing_Playbook.html
"""
import argparse

HTML = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GFTN Principal Staffing Playbook</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap');

  :root {
    --navy-dark:  #032C68;
    --navy-mid:   #0F4761;
    --navy-light: #D6E4F0;
    --body:       #1B232C;
    --grey-dark:  #595959;
    --grey-light: #F5F5F5;
    --border:     #CCCCCC;
    --accent:     #156082;
    --white:      #FFFFFF;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Open Sans', Arial, sans-serif;
    font-size: 14px;
    color: var(--body);
    background: #FAFAFA;
    line-height: 1.65;
  }

  .page-wrapper {
    max-width: 860px;
    margin: 0 auto;
    background: var(--white);
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  }

  /* ── Cover ── */
  .cover {
    background: var(--navy-dark);
    padding: 56px 60px 48px;
    color: var(--white);
  }
  .cover-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--navy-light);
    margin-bottom: 12px;
  }
  .cover h1 {
    font-size: 36px;
    font-weight: 300;
    line-height: 1.2;
    color: var(--white);
    margin-bottom: 8px;
  }
  .cover h1 strong { font-weight: 700; }
  .cover-sub {
    font-size: 14px;
    color: var(--navy-light);
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.2);
  }

  /* ── Nav ── */
  .toc {
    background: var(--grey-light);
    padding: 28px 60px;
    border-bottom: 3px solid var(--navy-light);
  }
  .toc-title {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--grey-dark);
    margin-bottom: 12px;
  }
  .toc ol { padding-left: 20px; }
  .toc li { margin-bottom: 6px; }
  .toc a {
    color: var(--navy-mid);
    text-decoration: none;
    font-weight: 600;
    font-size: 13px;
  }
  .toc a:hover { text-decoration: underline; }

  /* ── Content ── */
  .content { padding: 48px 60px; }

  .section {
    margin-bottom: 48px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--border);
  }
  .section:last-child { border-bottom: none; }

  h2.section-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--navy-dark);
    margin-bottom: 16px;
    padding-bottom: 10px;
    border-bottom: 3px solid var(--navy-dark);
  }

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: var(--navy-mid);
    margin: 24px 0 8px;
  }

  p { margin-bottom: 12px; }

  /* ── Info box ── */
  .info-box {
    background: var(--navy-light);
    border-left: 4px solid var(--navy-dark);
    padding: 14px 18px;
    margin: 16px 0;
    border-radius: 0 4px 4px 0;
    font-size: 13px;
    color: var(--navy-dark);
    font-style: italic;
  }

  /* ── Warning box ── */
  .warn-box {
    background: #FFF8E1;
    border-left: 4px solid #F9A825;
    padding: 14px 18px;
    margin: 16px 0;
    border-radius: 0 4px 4px 0;
    font-size: 13px;
    color: #5D4037;
  }

  /* ── Tables ── */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 13px;
  }
  th {
    background: var(--navy-mid);
    color: var(--white);
    font-weight: 600;
    text-align: left;
    padding: 10px 14px;
    font-size: 12px;
    letter-spacing: 0.3px;
  }
  td {
    padding: 9px 14px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  tr:nth-child(even) td { background: var(--grey-light); }
  td:first-child { font-weight: 600; color: var(--navy-mid); width: 28%; }

  /* ── Role cards ── */
  .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
  .role-card {
    border: 1px solid var(--border);
    border-top: 3px solid var(--navy-dark);
    padding: 20px;
    border-radius: 0 0 4px 4px;
  }
  .role-card h4 {
    font-size: 14px;
    font-weight: 700;
    color: var(--navy-dark);
    margin-bottom: 8px;
  }
  .role-card p { font-size: 13px; margin-bottom: 6px; }

  /* ── Brief type cards ── */
  .brief-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; margin: 20px 0; }
  .brief-card {
    background: var(--grey-light);
    border-top: 3px solid var(--navy-mid);
    padding: 16px;
    border-radius: 0 0 4px 4px;
  }
  .brief-card h4 { font-size: 13px; font-weight: 700; color: var(--navy-mid); margin-bottom: 6px; }
  .brief-card p { font-size: 12px; color: var(--grey-dark); }

  /* ── Checklist ── */
  .checklist-section { margin: 16px 0; }
  .checklist-header {
    background: var(--navy-mid);
    color: var(--white);
    font-weight: 700;
    font-size: 12px;
    letter-spacing: 0.5px;
    padding: 8px 14px;
    text-transform: uppercase;
  }
  .checklist-item {
    display: flex;
    align-items: flex-start;
    padding: 8px 14px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
    gap: 12px;
  }
  .checklist-item:nth-child(odd) { background: var(--white); }
  .checklist-item:nth-child(even) { background: var(--grey-light); }
  .checkbox {
    width: 16px;
    height: 16px;
    border: 2px solid var(--navy-mid);
    border-radius: 3px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  /* ── Footer ── */
  .footer {
    background: var(--navy-dark);
    color: var(--navy-light);
    text-align: center;
    font-size: 11px;
    padding: 20px;
  }

  @media print {
    body { background: white; }
    .page-wrapper { box-shadow: none; }
    .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .checklist-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    th { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>
<div class="page-wrapper">

  <!-- Cover -->
  <div class="cover">
    <div class="cover-label">Internal Use Only</div>
    <h1><strong>GFTN</strong><br>Principal Staffing Playbook</h1>
    <div class="cover-sub">
      For events involving International Advisory Board or GFTN Board members &nbsp;·&nbsp; Version 1.0 &nbsp;·&nbsp; March 2026
    </div>
  </div>

  <!-- TOC -->
  <div class="toc">
    <div class="toc-title">Contents</div>
    <ol>
      <li><a href="#s1">When to Use This Playbook</a></li>
      <li><a href="#s2">Key Roles</a></li>
      <li><a href="#s3">When to Start</a></li>
      <li><a href="#s4">What the POC Is Responsible For</a></li>
      <li><a href="#s5">On-the-Day Communications</a></li>
      <li><a href="#s6">Materials to Prepare</a></li>
      <li><a href="#s7">Quick-Reference Checklist</a></li>
    </ol>
  </div>

  <!-- Body -->
  <div class="content">

    <!-- S1 -->
    <div class="section" id="s1">
      <h2 class="section-title">1. When to Use This Playbook</h2>
      <p>Use this playbook whenever GFTN organises an event that involves members of the <strong>International Advisory Board (IAB)</strong> or <strong>GFTN Board</strong>. This includes, but is not limited to:</p>
      <ul style="padding-left:20px;margin:12px 0;">
        <li style="margin-bottom:6px;">GFTN Connections (e.g. Forums, Selects)</li>
        <li style="margin-bottom:6px;">International meetings</li>
        <li style="margin-bottom:6px;">Overseas trips</li>
      </ul>
      <p>Any time a board member or IAB member is <strong>invited by GFTN to participate in an engagement</strong>, this playbook applies. Throughout, board members and IAB members are referred to as <strong>principals</strong>.</p>
    </div>

    <!-- S2 -->
    <div class="section" id="s2">
      <h2 class="section-title">2. Key Roles</h2>
      <div class="role-grid">
        <div class="role-card">
          <h4>Point-of-Contact (POC)</h4>
          <p>Each principal has one dedicated POC who manages their schedule, logistics, and requests throughout the event.</p>
          <p>The POC holds <strong>full responsibility</strong> for ensuring the principal is supported at all times. If the POC cannot attend a specific session, they must ensure someone else is delegated to cover — they cannot simply step away.</p>
        </div>
        <div class="role-card">
          <h4>Main Coordinator</h4>
          <p>Appointed when <strong>two or more principals</strong> attend the same event.</p>
          <p>The Main Coordinator assigns POCs, maintains the master Schedule Tracker, serves as the escalation point, and sets up the event WhatsApp group.</p>
          <p>The coordinator may also double as a POC for one principal.</p>
        </div>
      </div>
    </div>

    <!-- S3 -->
    <div class="section" id="s3">
      <h2 class="section-title">3. When to Start</h2>
      <p>Kick off this process <strong>as soon as a principal's role at the event is confirmed</strong>. The earlier you start, the smoother everything runs.</p>
      <div class="info-box">Don't wait until the final weeks — early confirmation of travel, accommodation, and engagements gives the principal (and their office) time to plan.</div>
    </div>

    <!-- S4 -->
    <div class="section" id="s4">
      <h2 class="section-title">4. What the POC Is Responsible For</h2>

      <h3>4.1 Logistics Arrangements</h3>
      <p>Make sure all of the principal's arrangements are in place:</p>
      <table>
        <tr><th>Item</th><th>What to do</th></tr>
        <tr><td>Travel</td><td>Flights booked, e-tickets shared with the principal</td></tr>
        <tr><td>Accommodation</td><td>Hotel confirmed and details sent to the principal</td></tr>
        <tr><td>Ground transport</td><td>Airport transfers and in-event transport arranged</td></tr>
        <tr><td>Event role</td><td>Speaking slot, panel, meeting schedule — all confirmed and communicated</td></tr>
      </table>

      <h3>4.2 Maximising the Principal's Time</h3>
      <p>It is the POC's responsibility to help the principal make the most of their time at the GFTN function. Beyond confirmed obligations, proactively suggest activities in between scheduled commitments — for example:</p>
      <ul style="padding-left:20px;margin:12px 0;">
        <li style="margin-bottom:6px;">Watching relevant conference sessions or keynotes</li>
        <li style="margin-bottom:6px;">Informal introductions or catch-ups with key leaders attending or speaking at the event</li>
        <li style="margin-bottom:6px;">Any other networking or programme activities that would be of value to the principal</li>
      </ul>
      <div class="info-box">Think of this as helping the principal get full value from the event — not just shepherding them to their pre-scheduled slots.</div>

      <h3>4.3 Sidelined Meetings & Activities</h3>
      <p>If GFTN is arranging additional meetings on the sidelines of the event, the POC should coordinate scheduling, confirm attendance, share details with the principal, and update the itinerary accordingly.</p>

      <h3>4.4 Principal Communication</h3>
      <p>The POC is the <strong>main communication bridge</strong> between GFTN and the principal. Send the full schedule well in advance, flag any changes promptly, and be the first point of contact for questions or requests.</p>
    </div>

    <!-- S5 -->
    <div class="section" id="s5">
      <h2 class="section-title">5. On-the-Day Communications</h2>
      <h3>Setting Up the Event WhatsApp Group</h3>
      <p>Before the event, the Main Coordinator sets up a WhatsApp group with all POCs. This is the real-time coordination channel during the event.</p>
      <table>
        <tr><th>Who to Add</th><th>Why</th></tr>
        <tr><td>All POCs</td><td>One per principal — for real-time coordination and principal requests</td></tr>
        <tr><td>Main Coordinator</td><td>Cross-principal escalation and schedule updates</td></tr>
        <tr><td>Project Lead / Head of Operations</td><td>For event-level queries: room requests, meal changes, schedule questions</td></tr>
      </table>
      <div class="warn-box"><strong>Set up the group at least 1 week before the event.</strong> Use it for urgent issues, principal requests, and last-minute changes — keep messages clear and actionable.</div>
    </div>

    <!-- S6 -->
    <div class="section" id="s6">
      <h2 class="section-title">6. Materials to Prepare</h2>

      <h3>6.1 Schedule Tracker (Excel)</h3>
      <p>A shared <code>.xlsx</code> file managed by the Main Coordinator. Upload to SharePoint/OneDrive so all POCs can co-author in real time. Structure:</p>
      <table>
        <tr><th>Tab</th><th>Purpose</th><th>Managed by</th></tr>
        <tr><td>Master Overview</td><td>All principals' activities side-by-side, colour-coded</td><td>Main Coordinator</td></tr>
        <tr><td>[Principal Name] — Itinerary</td><td>Dedicated tab per principal</td><td>That principal's POC</td></tr>
        <tr><td>POC Checklist</td><td>Running checklist for all POCs and principals</td><td>All POCs</td></tr>
        <tr><td>WhatsApp Group Setup</td><td>Quick-reference for setting up the coordination group</td><td>Main Coordinator</td></tr>
      </table>

      <h3>6.2 Briefing Documents (Word)</h3>
      <p>Prepare one briefing doc per GFTN-arranged engagement. Choose the right type based on the format:</p>
      <div class="brief-grid">
        <div class="brief-card">
          <h4>Meeting Brief</h4>
          <p>For a 30–60 min meeting with a counterpart. Compact 1-page format: details table, talking points, background on counterpart.</p>
        </div>
        <div class="brief-card">
          <h4>Event Brief</h4>
          <p>For a longer session or multi-part engagement. Full format: overview, objective, audience, role, key messages, logistics.</p>
        </div>
        <div class="brief-card">
          <h4>Speaker's Brief</h4>
          <p>For a speaking slot or panel. Focused on delivery: talking points, narrative structure, Q&amp;A prep, stage &amp; AV notes.</p>
        </div>
      </div>
      <div class="info-box">Aim for 1–2 pages per brief. The principal should be able to read it in under 10 minutes.</div>
    </div>

    <!-- S7 -->
    <div class="section" id="s7">
      <h2 class="section-title">7. Quick-Reference Checklist</h2>
      <p>The checklist below covers the full lifecycle. In practice, your staffing skill will surface only the items relevant to your current stage.</p>

      <div class="checklist-section">
        <div class="checklist-header">Upon Assignment</div>
        <div class="checklist-item"><div class="checkbox"></div>Confirm principal's role and all commitments at the event</div>
        <div class="checklist-item"><div class="checkbox"></div>Introduce yourself to the principal (if not already known to them)</div>
        <div class="checklist-item"><div class="checkbox"></div>Set up the principal's itinerary tab in the Schedule Tracker</div>
        <div class="checklist-item"><div class="checkbox"></div>Confirm you are added to the event WhatsApp group</div>
      </div>

      <div class="checklist-section" style="margin-top:16px;">
        <div class="checklist-header">2–3 Weeks Before</div>
        <div class="checklist-item"><div class="checkbox"></div>Flights booked and confirmed</div>
        <div class="checklist-item"><div class="checkbox"></div>Accommodation booked and confirmed</div>
        <div class="checklist-item"><div class="checkbox"></div>Ground transport arranged</div>
        <div class="checklist-item"><div class="checkbox"></div>Sidelined meetings scheduled and confirmed</div>
        <div class="checklist-item"><div class="checkbox"></div>Additional sessions or introductions identified for principal's free time</div>
      </div>

      <div class="checklist-section" style="margin-top:16px;">
        <div class="checklist-header">1 Week Before</div>
        <div class="checklist-item"><div class="checkbox"></div>Full schedule sent to principal</div>
        <div class="checklist-item"><div class="checkbox"></div>Briefing documents prepared for all GFTN-arranged engagements</div>
        <div class="checklist-item"><div class="checkbox"></div>Briefing documents shared with principal</div>
        <div class="checklist-item"><div class="checkbox"></div>Schedule Tracker shared on SharePoint with all POCs</div>
        <div class="checklist-item"><div class="checkbox"></div>WhatsApp group set up (all POCs + Main Coordinator + project lead)</div>
      </div>

      <div class="checklist-section" style="margin-top:16px;">
        <div class="checklist-header">Day of / During Event</div>
        <div class="checklist-item"><div class="checkbox"></div>Check in with principal at the start of each day</div>
        <div class="checklist-item"><div class="checkbox"></div>Accompany or arrange coverage for all key sessions</div>
        <div class="checklist-item"><div class="checkbox"></div>Flag last-minute changes via the WhatsApp group</div>
        <div class="checklist-item"><div class="checkbox"></div>Suggest additional sessions or introductions during principal's free time</div>
        <div class="checklist-item"><div class="checkbox"></div>Update Schedule Tracker in real time if needed</div>
      </div>

      <div class="checklist-section" style="margin-top:16px;">
        <div class="checklist-header">Post-Event</div>
        <div class="checklist-item"><div class="checkbox"></div>Confirm principal's departure arrangements</div>
        <div class="checklist-item"><div class="checkbox"></div>Follow up on any outstanding requests</div>
        <div class="checklist-item"><div class="checkbox"></div>File all documents for reference</div>
      </div>
    </div>

  </div><!-- /content -->

  <div class="footer">
    GFTN Principal Staffing Playbook &nbsp;·&nbsp; Internal Use Only &nbsp;·&nbsp; Version 1.0, March 2026
  </div>

</div><!-- /page-wrapper -->
</body>
</html>"""

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="GFTN_Principal_Staffing_Playbook.html")
    args = parser.parse_args()
    with open(args.output, "w") as f:
        f.write(HTML)
    print(f"Playbook HTML saved: {args.output}")
