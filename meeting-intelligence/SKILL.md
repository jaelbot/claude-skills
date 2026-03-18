---
name: meeting-intelligence
description: |
  Strategic meeting preparation, post-meeting intelligence capture, and follow-up communications.

  TRIGGERS: Use when the user mentions "meeting intelligence", "meeting prep", "meeting brief", "pre-meeting", "post-meeting", "meeting notes", "meeting follow-up", or needs help preparing for, documenting, or following up on stakeholder meetings.

  Outputs:
  - Pre-meeting: Word document briefing with objectives, positioning, suggested flow
  - Post-meeting: Word document intelligence brief with insights, opportunities, next steps
  - Follow-up: Email draft text ready to copy/paste
---

# Meeting Intelligence

Create strategic meeting briefs, capture post-meeting intelligence, and draft follow-up communications for stakeholder meetings.

## Workflow

### Step 1: Identify Meeting Stage

Use AskUserQuestion to determine:

```
Question: "What stage of the meeting process are you at?"
Options:
- Pre-meeting (prepare briefing for upcoming meeting)
- Post-meeting (capture notes and synthesize intelligence)
- Follow-up (draft communication after meeting)
```

### Step 2: Gather Information by Stage

#### Pre-Meeting Stage

Use AskUserQuestion to gather:

1. **Meeting basics**
   - Who are you meeting? (name, title, organization)
   - How long is the meeting?
   - How were you connected to this person?

2. **Strategic positioning**
   ```
   Question: "How do you want to position yourself/your organization?"
   Options:
   - Strategic Partner (collaboration, shared mission)
   - Peer Organization (equals working toward common goals)
   - Service Provider (what you can offer them)
   ```

3. **Primary objective**
   ```
   Question: "What's the most important outcome from this meeting?"
   Options:
   - Build personal rapport (relationship-building for future)
   - Secure specific commitment (next meeting, partnership, etc.)
   - Information gathering (learn about their priorities)
   - Present opportunity (pitch or proposal)
   ```

4. **Key topics to cover** - Ask as free text: "What topics or opportunities do you want to mention during this meeting?"

5. **Any background context** - Ask as free text: "Any other context I should know? (their organization, recent news, your history with them)"

#### Post-Meeting Stage

Use AskUserQuestion to gather:

1. **Pre-meeting brief** - "Do you have a pre-meeting brief I should reference? (paste or describe)"

2. **Meeting notes** - "Please share your meeting notes - raw bullet points are fine, I'll structure them."

3. **Key follow-ups** - "What follow-up actions or next steps were discussed?"

#### Follow-Up Stage

Use AskUserQuestion to gather:

1. **Meeting context** - "Do you have a post-meeting brief or notes I should reference?"

2. **Tone preference**
   ```
   Question: "What tone should the follow-up have?"
   Options:
   - Warm and relationship-focused
   - Professional and action-oriented
   - Brief and to the point
   ```

3. **Key points to include** - "What specific points or next steps should I mention in the follow-up?"

### Step 3: Generate Output

#### Pre-Meeting Brief (Word Document)

Create a professional one-page Word document including:

- Header with "MEETING BRIEFING" title
- Meeting details table (Guest, Duration, Objective)
- Strategic focus section
- Suggested time flow (broken into segments)
- Key topics to seed (presented as opportunities, not asks)
- Conversation openers (2-3 suggested questions)
- Reminder box with meeting philosophy

**Design notes:**
- Use clean, professional styling with blue accent colors (#1B4F72, #2E86AB)
- Tables with light shading for visual organization
- Keep to one page - this is a quick reference, not a report

#### Post-Meeting Brief (Word Document)

Create a comprehensive Word document including:

- Header with "MEETING INTELLIGENCE BRIEF" title
- Contact details table (Name, Title, Organization, Team size, Connected by, Key leadership)
- Key insight callout box (the most important takeaway)
- Strategic context section (their transformation, priorities, focus areas)
- Collaboration opportunities table (Timing | Opportunity | Details | Action)
- Immediate next steps (numbered list)
- Partnership framework (if relevant - simple vs. in-depth options)
- Relationship context reminder

**Design notes:**
- Can extend to 2 pages if meeting was substantive
- Use color-coded boxes for different opportunity types
- Include specific dates and deadlines where known

#### Follow-Up Email (Markdown Text)

Generate email text that can be copied directly, including:

- Subject line suggestion
- Warm opening referencing the meeting
- Key threads to continue (drawn from meeting notes)
- Clear but soft next step (e.g., April follow-up)
- Personal touch (reference to connector, shared interest)
- Optional P.S. for softer asks

**Design notes:**
- Keep conversational, not corporate
- Match the tone preference specified
- No Word document needed - output as markdown for easy copy/paste

## Output Locations

- Word documents: Save to user's workspace folder with descriptive filename
- Email drafts: Output as markdown text in the conversation

## Quality Checklist

Before delivering any output, verify:

- [ ] All user-provided context is incorporated
- [ ] Names and titles are spelled correctly
- [ ] Dates and timings are accurate
- [ ] Tone matches the relationship stage (don't over-pitch early relationships)
- [ ] Action items are specific and achievable
- [ ] Document is visually clean and scannable
