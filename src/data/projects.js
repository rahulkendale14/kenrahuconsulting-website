export const projects = [
  {
    slug: 'cv-screening-workflow',
    title: 'AI-Powered CV Screening Workflow',
    subtitle: 'Cutting recruiter review time by 70% for a 30-person staffing firm',
    tags: ['AI Audit', 'Workflow Design', 'Recruitment'],
    status: 'Live',
    duration: '3 weeks',
    impact: '70% faster screening',
    toolLink: '/tools/cv-screening',
    toolLabel: 'Try the AI Candidate Screener',

    hero: {
      client: 'Mid-size staffing firm (anonymised)',
      industry: 'Recruitment',
      teamSize: '8 recruiters',
      problem: 'Recruiters were spending 4–6 hours per role manually reading CVs before the first shortlist. With 15–20 open roles at any time, the volume was unsustainable.',
    },

    problem: {
      summary: 'Manual CV review created a bottleneck that slowed time-to-shortlist from 2 days to 5+ days, causing candidates to drop out and clients to complain.',
      quotes: [
        { text: 'We lose good candidates before we even call them — by then they\'ve accepted something else.', role: 'Senior Recruiter' },
        { text: 'I spend Sunday evenings reading CVs just to keep up with Monday\'s pipeline.', role: 'Team Lead' },
      ],
      rootCauses: [
        'No structured scoring rubric — each recruiter applied different criteria',
        'CVs arrived in email as PDFs with no central tracking',
        'No handoff protocol between sourcing and screening stages',
      ],
    },

    product: {
      summary: 'A Claude-powered screening workflow integrated with their existing ATS. Recruiters paste or upload a CV; the system scores it against a role-specific rubric and outputs a structured brief.',
      components: [
        { name: 'Role Template Builder', description: 'PM-designed rubric editor where recruiters define must-haves, nice-to-haves, and red flags per role' },
        { name: 'CV Scoring Engine', description: 'Claude prompt chain: extract → score against rubric → generate shortlist brief with confidence score' },
        { name: 'Batch Mode', description: 'Process up to 20 CVs in one go with ranked output sorted by match score' },
        { name: 'Audit Log', description: 'Every AI decision is logged with the input, rubric version, and output — so recruiters can spot drift' },
      ],
    },

    keyDecisions: [
      {
        decision: 'Score with explanation, not just a number',
        rationale: 'Early tests showed recruiters distrusted raw scores. Adding a 3-bullet "why this score" section increased adoption from 40% to 90% in week 2.',
        tradeoff: 'Longer output per CV — offset by batch mode processing multiple at once.',
      },
      {
        decision: 'Keep humans in the loop on every shortlist',
        rationale: 'AI ranks candidates; recruiter still approves before client sees anything. Non-negotiable given GDPR and client trust requirements.',
        tradeoff: 'Slightly slower than full automation, but dramatically reduces risk of a bad AI decision reaching a client.',
      },
      {
        decision: 'Rubric versioning from day one',
        rationale: 'Role requirements drift over time. Without versioning, you can\'t tell if a score drop is a candidate quality issue or a rubric change.',
        tradeoff: 'Added 2 days of build time — worth it.',
      },
    ],

    evalFramework: {
      summary: 'Three-stage eval before go-live: shadow mode, calibration, and live with override.',
      stages: [
        { name: 'Shadow Mode', description: 'AI scored the same CVs as recruiters for one week. We compared outputs without telling the AI affect decisions.' },
        { name: 'Calibration', description: 'Found 3 rubric gaps where AI over-weighted keywords vs. career trajectory. Fixed before live.' },
        { name: 'Live + Override', description: 'Recruiters could flag any AI score as wrong. 12 overrides in week 1 → 3 in week 4. Confirmation the model was learning the rubric.' },
      ],
    },

    failureModes: [
      { mode: 'CV formatting variance', impact: 'High', mitigation: 'Pre-processing step normalises PDF → text before scoring' },
      { mode: 'Rubric drift', impact: 'Medium', mitigation: 'Versioned rubrics + monthly calibration session built into process' },
      { mode: 'Recruiter over-reliance', impact: 'High', mitigation: 'Policy: AI score is a starting point, not a decision. Logged overrides to track usage patterns.' },
      { mode: 'Bias amplification', impact: 'High', mitigation: 'Rubric fields are skills/experience only — no name, photo, or address fields passed to AI' },
    ],

    guardrails: [
      { rule: 'Never output a shortlist decision — only a score with reasoning', reason: 'Final hiring decisions must remain with the recruiter, not the model' },
      { rule: 'No personal identifiers passed to the model', reason: 'Name, photo, age, and address fields stripped before scoring to prevent bias amplification' },
      { rule: 'Score must always include a "why" explanation', reason: 'A bare number with no reasoning cannot be audited or overridden meaningfully' },
      { rule: 'Rubric version logged with every output', reason: 'Without versioning, a score drop cannot be attributed to candidate quality vs rubric change' },
    ],

    hallucinationRisks: [
      { risk: 'Model invents qualifications not present in the CV', likelihood: 'Medium', mitigation: 'Prompt instructs model to quote directly from CV text; any score not grounded in a direct quote fails the eval' },
      { risk: 'Model infers industry experience from company name rather than stated role', likelihood: 'High', mitigation: 'Rubric fields require role-level evidence, not company-name recognition; pre-processing strips logos and branding' },
      { risk: 'Model over-scores CVs with confident language regardless of substance', likelihood: 'Medium', mitigation: 'Calibration stage compared AI scores vs recruiter scores for 50 CVs before go-live; systematic over-scoring was caught and corrected via prompt adjustment' },
    ],

    v2Changes: [
      'Integrate directly with their ATS API so CVs flow in automatically',
      'Add interview question generator based on CV gaps flagged in screening',
      'Build a dashboard showing screening velocity and score distribution per role',
    ],

    documents: [
      { label: 'Screening Rubric Template (PDF)', available: false },
      { label: 'Prompt Engineering Log', available: false },
      { label: 'Eval Results Summary', available: false },
    ],
  },
  {
    slug: 'salary-planner',
    title: 'Goal-Based Salary Planner',
    subtitle: 'A guided financial planning tool that helps salaried users convert their income, obligations, and savings goals into a realistic monthly plan.',
    tags: ['Product Management', 'Tool Design', 'Personal Finance'],
    status: 'Live',
    duration: '2 weeks',
    impact: 'End-to-end MVP',
    toolLink: '/tools/salary-planner',
    toolLabel: 'Try the Salary Planner',

    hero: {
      client: 'Personal project',
      industry: 'Personal Finance',
      teamSize: '1 (PM + Builder)',
      problem: 'Salaried users want to save consistently but struggle to turn monthly obligations and goals into a realistic plan without spreadsheets or complex finance apps.',
    },

    problem: {
      summary: 'Many people know they should save, but they do not know how much they can save safely after accounting for fixed obligations, household spending, irregular expenses, and financial goals. Existing approaches fall into two extremes: generic budgeting templates that do not adapt to real-life constraints, or complex finance tools that overwhelm users before they reach a decision. The core question I wanted to answer: how might we help a salaried user create a realistic monthly plan that balances essential spending with a meaningful annual savings target?',
      quotes: [
        { text: 'I know I should save more, but every time I try to plan it out I end up confused about how much I can actually put aside.', role: 'Target user archetype' },
        { text: 'I set a savings goal at the start of the year but by month three I have already broken it because the plan did not account for real life.', role: 'Target user archetype' },
      ],
      rootCauses: [
        'Users set savings goals without understanding whether they are achievable within current monthly cash flow',
        'Fixed commitments such as bills and EMIs reduce flexibility, but most budgeting tools do not surface this early enough in the flow',
        'Users want guidance first and customization later, rather than being asked to manually optimize every category from scratch',
      ],
    },

    product: {
      summary: 'A guided multi-step salary planning tool that accepts take-home salary, expenses, savings goals, and a savings preference, then generates a recommended monthly allocation, surfaces whether the annual goal is achievable, and lets users adjust the plan before finalizing it. Positioned as a decision-support tool, not a full finance stack.',
      components: [
        { name: 'Guided input flow', description: 'Three-step data capture: income and obligations, then savings goal and preference. Grouped logically to reduce cognitive load and prevent the screen from feeling like a tax form.' },
        { name: 'Recommendation engine', description: 'Priority waterfall algorithm that protects essential obligations first, then allocates savings and buffer according to the selected preference — conservative, balanced, or aggressive.' },
        { name: 'Goal feasibility check', description: 'Compares projected 12-month savings against the stated annual goal and surfaces a clear achievable or shortfall signal with the exact gap amount.' },
        { name: 'Alternate scenarios', description: 'When the goal is unrealistic, three paths are offered: boost income to hit the goal in 12 months, extend the timeline at current savings, or a hybrid of both.' },
        { name: 'Manual adjustment', description: 'Slider-based overrides for key categories with live recalculation so users can see the consequences of their changes in real time before committing.' },
        { name: 'Final summary', description: 'Side-by-side comparison of the recommended plan versus the adjusted plan, with a full 12-month projection and a print or save option.' },
      ],
    },

    keyDecisions: [
      {
        decision: 'Recommendation first, customization second',
        rationale: 'I considered letting users manually set every category from the start. I rejected this because it forces users to optimize before they understand the baseline. By showing a recommendation first, users can react to a concrete starting point rather than create a plan from scratch — significantly reducing cognitive load.',
        tradeoff: 'Some power users may want more control upfront. The manual adjustment screen addresses this after the recommendation is shown, preserving flexibility without front-loading complexity.',
      },
      {
        decision: 'Protect essential obligations before suggesting savings targets',
        rationale: 'The recommendation engine uses a strict priority waterfall: fixed obligations and household essentials are fully allocated before any savings rate is applied. This prevents the tool from ever suggesting an aggressive savings target that would leave a user short on rent or food.',
        tradeoff: 'For users with very high fixed obligations, the savings recommendation may be low or near zero. The tool surfaces an explicit stress flag in this case so users understand why, rather than hiding the constraint.',
      },
      {
        decision: 'Show alternate scenarios instead of a dead end when the goal is unreachable',
        rationale: 'A flow that ends with "your goal is not achievable" has high abandonment. By offering three concrete alternate paths — boost income, extend timeline, or hybrid — the product preserves forward motion and gives users something actionable regardless of their current financial situation.',
        tradeoff: 'Three scenarios adds output complexity. I kept each scenario card intentionally minimal: one headline number, one timeline, and the monthly savings required.',
      },
      {
        decision: 'Scope the MVP to decision support, not account aggregation',
        rationale: 'Bank integration and transaction syncing would have expanded scope without improving the core job in version one: help the user understand what a realistic plan looks like. Manual input keeps the tool fast and avoids the trust barrier that comes with connecting financial accounts.',
        tradeoff: 'Users must enter expenses manually each session. This adds friction but encourages active engagement with their actual numbers rather than passive reliance on automated data.',
      },
    ],

    evalFramework: {
      summary: 'Validation focused on whether users could complete the flow without confusion, understand the recommendation without extra explanation, and trust the output enough to act on it.',
      stages: [
        { name: 'Engine logic validation', description: 'Tested the recommendation engine against edge cases: very high fixed obligations, zero savings, and aggressive goals with insufficient income. Confirmed the stress flag and alternate plan logic triggered correctly in all scenarios.' },
        { name: 'Full flow walkthrough', description: 'Walked through all seven screens using representative user scenarios — low income with dependents, high earner with large EMIs, first-time saver — to verify screen order, decision points, and information density at each step.' },
        { name: 'Recommendation transparency check', description: 'Verified that every allocation category shows an explanatory note on the breakdown screen. A recommendation without explanation is a black box. Each line item needed a visible rationale to build user trust.' },
      ],
    },

    failureModes: [
      { mode: 'Unrealistic or zero inputs', impact: 'Medium', mitigation: 'Inline validation on all fields. Stress flag triggered when fixed obligations exceed 85% of income.' },
      { mode: 'User distrust of the recommendation', impact: 'High', mitigation: 'Breakdown screen explains each allocation with a short rationale note. Manual adjustment gives users full override capability.' },
      { mode: 'Goal-setting without follow-through', impact: 'Medium', mitigation: 'Final summary includes a print and save option. Recurring tracking and nudges are deferred to V2.' },
      { mode: 'Over-reliance without revisiting the plan', impact: 'Medium', mitigation: 'No persistent state in V1 by design — users re-enter data each session, which forces active re-engagement with their actual numbers over time.' },
    ],

    guardrails: [
      { rule: 'Tool must never provide investment or financial advice', reason: 'Not a regulated financial product — output is a planning framework, not a professional recommendation' },
      { rule: 'Savings target cannot exceed disposable income after obligations', reason: 'Prevents the engine from surfacing an impossible plan that erodes user trust immediately' },
      { rule: 'Alternate scenarios must always be presented when goal is unachievable', reason: 'A dead-end result ("you cannot hit your goal") with no forward path causes abandonment' },
    ],

    hallucinationRisks: [
      { risk: 'No LLM in this product — rule-based engine only', likelihood: 'N/A', mitigation: 'All calculations are deterministic. Hallucination risk does not apply. This is intentional: financial allocation decisions should not be LLM-driven in V1.' },
    ],

    v2Changes: [
      'Progress tracking across months — compare planned versus actual savings over time',
      'Saved user profiles so returning users do not need to re-enter data each session',
      'Smart nudges and monthly reminders to review and update the plan',
      'Deeper analytics: savings velocity, goal trajectory, and monthly variance',
      'Household mode for shared financial planning between partners or family members',
    ],

    documents: [
      { label: 'Wireframes — 7 screens', available: false },
      { label: 'PRD Summary', available: false },
      { label: 'Recommendation Engine Logic', available: false },
    ],
  },
  {
    slug: 'prd-generator',
    title: 'Enterprise AI PRD Generator',
    subtitle: 'A structured tool that converts a product brief into a 12-section enterprise-grade PRD in under 60 seconds — saving 2 hours per document.',
    tags: ['Product Management', 'Prompt Engineering', 'Tool Design'],
    status: 'Live',
    duration: '1 week',
    impact: '2 hrs saved per PRD',
    toolLink: '/tools/prd-generator',
    toolLabel: 'Try the PRD Generator',

    hero: {
      client: 'Personal project',
      industry: 'AI Product Management',
      teamSize: '1 (PM + Builder)',
      problem: 'Writing PRDs for enterprise AI initiatives required 2+ hours per document filling in sections — stakeholder mapping, governance controls, measurement framework — that should be standard but no tool encoded them correctly.',
    },

    problem: {
      summary: 'Writing a PRD for an AI initiative is not the same as writing a standard feature PRD. Enterprise AI projects require stakeholder RACI across 13 roles, governance layers for model decisions, a measurement framework across 9 metric areas, human-in-the-loop boundaries, and a compliance section that varies by regulated industry. Generic "generate a PRD" prompts produce shallow outputs that look complete on screen but fall apart in a real stakeholder review. The frustration was personal: I was writing PRDs for AI workflow automation projects and spending 2+ hours per document on sections that should be standard. The problem was not knowing what to write — it was that no tool encoded the right enterprise framework to write against.',
      quotes: [
        { text: 'I keep getting PRDs that cover features but skip governance and measurement entirely — no one approves those in a regulated environment.', role: 'AI PM archetype' },
        { text: 'Writing the stakeholder section from scratch every time is pure overhead. The roles do not change, only the responsibilities do.', role: 'Product Lead archetype' },
      ],
      rootCauses: [
        'Generic AI prompts treat a PRD as a feature spec, not an operating model document',
        'Most templates omit governance, measurement framework, and human-in-the-loop boundaries entirely',
        'Users without an enterprise PM background do not know which sections are missing until the document fails review',
      ],
    },

    product: {
      summary: 'A 5-stage guided tool that accepts structured inputs about an AI initiative, then generates a full 12-section enterprise PRD via a system prompt encoding a complete enterprise operating model. Designed for AI PMs, consultants, and product leads scoping AI workflow automation projects.',
      components: [
        { name: 'Structured input form', description: 'Captures product name, problem statement, target users, goals and metrics, functions to automate, compliance requirements, and timeline. Forces articulation of essentials before generation begins — vague inputs produce vague outputs.' },
        { name: 'Functions to automate selector', description: '8 pre-defined checkbox options covering the most common AI workflow functions: intake normalisation, summarisation, routing, root-cause hinting, and more. If none are selected, the system infers from the problem statement.' },
        { name: 'Enterprise system prompt', description: 'Encodes 13 stakeholder roles, 5 governance layers, 9 measurement metric areas, a 6-stage operating model, human-in-the-loop principles, and a reports framework. This is what separates the output from generic PRD generators.' },
        { name: 'Preview gate', description: 'Shows a teaser of the generated PRD before unlocking the full document — a natural checkpoint that lets users confirm the output is relevant before reading 12 sections.' },
        { name: '12-section structured output', description: 'Each section rendered individually from JSON: executive summary, problem statement, strategic rationale, automated functions, goals and metrics, stakeholders and roles, feature requirements, governance framework, security and compliance, operating model, reports to create, risks and open questions.' },
      ],
    },

    keyDecisions: [
      {
        decision: 'Structured form over a freeform prompt box',
        rationale: 'I considered a single text input where users paste their idea. I rejected it because vague inputs produce vague outputs. A structured form forces the user to articulate the problem, success metrics, and target users before generation. The quality difference in output is significant — the model has concrete anchors to work from rather than interpreting a half-formed idea.',
        tradeoff: 'More friction at entry. Offset by the fact that users who complete the form have already done the thinking, so the output reflects their actual initiative rather than a generic interpretation.',
      },
      {
        decision: 'System prompt as a complete enterprise operating model',
        rationale: 'The system prompt does not say "write a PRD." It encodes a full enterprise operating model: 13 stakeholder roles with specific responsibilities, 5 governance layers, 9 metric areas, a 6-stage operating model, and human-in-the-loop principles. Inspired by enterprise PM practice in regulated industries. This is what produces enterprise-grade output rather than a feature spec with headings.',
        tradeoff: 'The prompt is long and opinionated — it excels for AI workflow automation in regulated industries, not for a consumer app PRD. The tool is scoped accordingly.',
      },
      {
        decision: 'Pre-defined automation functions as checkboxes rather than freeform',
        rationale: 'Rather than asking users to describe what they want to automate in free text, I offered 8 options derived from the most common AI workflow automation patterns. This reduces cognitive load and ensures the generated PRD uses recognisable automation framing. Selecting nothing is a valid choice — the model infers from the problem statement.',
        tradeoff: 'Limits to 8 options. Edge cases outside these functions fall back to inference, which works well in practice given the tool\'s defined scope.',
      },
      {
        decision: 'Preview gate before full document unlock',
        rationale: 'The output flows into a preview screen showing partial content before the user sees all 12 sections. This creates a useful pause point — users confirm the generation is relevant to their initiative before investing time reading a detailed document.',
        tradeoff: 'One extra click for the user. Acceptable given it surfaces whether the generation is on-target before the user commits to reading the full output.',
      },
    ],

    evalFramework: {
      summary: 'Validation focused on whether the output would pass a real enterprise stakeholder review — not just whether it looked complete.',
      stages: [
        { name: 'Section completeness check', description: 'Verified all 12 sections generated with substantive content across 3 representative inputs: an incident triage tool, a document summarisation product, and a customer routing automation. No section should produce generic placeholder text.' },
        { name: 'Stakeholder and governance coverage', description: 'Checked that all 13 stakeholder roles appeared with responsibilities adapted to each specific initiative, and that all 5 governance layers contained concrete activities rather than generic statements.' },
        { name: 'Metric specificity check', description: 'Verified the goals and metrics section covered all 9 metric areas with measures specific to the stated initiative. A list of generic KPIs signals the model did not anchor to the user\'s context.' },
      ],
    },

    failureModes: [
      { mode: 'Vague inputs produce generic output', impact: 'High', mitigation: 'Required fields for problem, target users, and goals; placeholder text in each field guides the level of specificity needed' },
      { mode: 'Tool used outside its intended scope', impact: 'Medium', mitigation: 'Landing page and form framing explicitly scoped to AI workflow automation initiatives in enterprise or regulated environments' },
      { mode: 'User treats output as final without review', impact: 'High', mitigation: 'Strategic rationale section explicitly names which decisions must remain under human control; output is positioned as a structured starting point, not a finished document' },
      { mode: 'Rate limit frustration for power users', impact: 'Medium', mitigation: '3 PRDs per day per IP — covers legitimate daily use while preventing abuse of a free, inference-cost tool' },
    ],

    guardrails: [
      { rule: 'Output must be positioned as a starting point, not a final document', reason: 'PRDs require human judgment on strategy, priorities, and stakeholder context that cannot come from a form input' },
      { rule: 'Model must not invent stakeholder names, systems, or org structures', reason: 'Enterprise PRDs reference real teams and real tech — hallucinated specifics would make the document unusable and damage credibility' },
      { rule: 'Governance and compliance sections must surface decisions for human review, not make them', reason: 'Regulatory decisions in enterprise AI require legal and risk team sign-off — the model frames the questions, not the answers' },
    ],

    hallucinationRisks: [
      { risk: 'Model invents specific metrics or benchmarks not grounded in the input', likelihood: 'High', mitigation: 'Eval check: every metric in the output must reference the stated initiative type; generic benchmarks flagged as low-quality output' },
      { risk: 'Model generates plausible-sounding governance steps that do not apply to the user\'s industry', likelihood: 'Medium', mitigation: 'System prompt anchors governance to the stated deployment context (enterprise, regulated, or SME); out-of-scope clauses are filtered' },
      { risk: 'Model overstates confidence in cost or timeline estimates', likelihood: 'High', mitigation: 'All numeric estimates include an explicit "subject to scoping" disclaimer in the output template' },
    ],

    v2Changes: [
      'Export directly to Notion or Google Docs — copy-paste is the biggest friction point after generation',
      'Section-level regeneration — rerun a single section without regenerating the full PRD',
      'Saved PRD history so users can compare versions across iterations of the same initiative',
      'Input templates for common initiative types: triage automation, document processing, customer routing',
      'Team mode — share a draft PRD link for collaborative annotation before finalising',
    ],

    documents: [
      { label: 'System Prompt Design Doc', available: false },
      { label: 'Enterprise Operating Model Reference', available: false },
      { label: 'Eval Test Cases (3 initiatives)', available: false },
    ],
  },
  {
    slug: 'ai-email-assistant',
    title: 'AI Email Assistant',
    subtitle: 'Auto-drafting professional replies to incoming emails in under 3 seconds',
    tags: ['AI Automation', 'Make.com', 'Workflow Design'],
    status: 'Live',
    duration: '2 hours',
    impact: 'Draft in 3 seconds',

    hero: {
      client: 'Personal productivity tool (open for client customisation)',
      industry: 'Any email-heavy business',
      teamSize: '1 person',
      problem: 'Recruitment and client emails pile up fast. Writing professional replies to each one takes 5–10 minutes per email — time that adds up to hours every week.',
    },

    problem: {
      summary: 'Repetitive email replies drain time without adding value. The content is predictable, the tone is consistent, yet someone has to sit down and write each one.',
      quotes: [
        { text: 'I spend more time writing "thanks for reaching out" emails than actually doing work.', role: 'Freelancer' },
        { text: 'Every recruitment email gets the same response — I just want it to happen automatically.', role: 'Job Seeker' },
      ],
      rootCauses: [
        'No automation between email inbox and AI tools',
        'Replies require context from the incoming email — manual copy-paste every time',
        'No consistent tone or sign-off across replies',
      ],
    },

    product: {
      summary: 'A Make.com scenario that watches Gmail for new emails, sends the content to LLaMA 3.3 (via Groq API) for a professional reply, and saves the draft back to Gmail — all within 3 seconds.',
      components: [
        { name: 'Gmail Trigger', description: 'Watches inbox for new emails and fires the scenario automatically on arrival' },
        { name: 'Groq AI Module', description: 'Sends email snippet to LLaMA 3.3-70b with a system prompt defining tone, length, and sign-off' },
        { name: 'Draft Creator', description: 'Saves the AI-generated reply as a Gmail draft — pre-addressed to the sender with subject line set' },
      ],
    },

    keyDecisions: [
      {
        decision: 'Draft, not auto-send',
        rationale: 'AI generates the reply but the human reviews before sending. Keeps quality control without removing the time saving.',
        tradeoff: 'Slightly more steps than full automation — but eliminates the risk of a bad AI reply going out unreviewed.',
      },
      {
        decision: 'Groq over OpenAI',
        rationale: 'Groq runs LLaMA 3.3-70b with sub-second response times and a free API tier — ideal for a high-volume, low-latency use case like email.',
        tradeoff: 'Less brand recognition than OpenAI, but meaningfully faster and cheaper at scale.',
      },
      {
        decision: 'System prompt controls tone and length',
        rationale: 'A short, opinionated system prompt ("under 80 words, professional, sign off as The Talent Team") produces consistent output without fine-tuning.',
        tradeoff: 'Less flexible per-email customisation — acceptable for repetitive reply types.',
      },
    ],

    evalFramework: {
      summary: 'Tested with 5 real recruitment emails before going live. Checked tone consistency, reply length, and whether the AI addressed the email content correctly.',
      stages: [
        { name: 'Hardcoded test', description: 'Ran the HTTP module with a static prompt first to confirm Groq connection and response format before wiring in live email data.' },
        { name: 'Live email test', description: 'Sent 5 test emails with varying content — job offers, follow-ups, introductions. All 5 produced usable drafts with correct tone.' },
        { name: 'Draft review', description: 'Checked Gmail drafts for formatting, length, and sign-off. No hallucinations. No over-long replies.' },
      ],
    },

    failureModes: [
      { mode: 'Empty email snippet', impact: 'Medium', mitigation: 'Gmail snippet field always populates for real emails — edge case for unusual email clients' },
      { mode: 'Groq API downtime', impact: 'Low', mitigation: 'Free tier has 99%+ uptime; production version would add error handling route in Make' },
      { mode: 'Wrong tone for email type', impact: 'Medium', mitigation: 'System prompt tuned per use case — recruitment, client work, and support each get their own prompt variant' },
    ],

    guardrails: [
      { rule: 'Drafts only — model must never send an email automatically', reason: 'Human review before sending is non-negotiable; an AI-sent reply with wrong tone or content cannot be unsent' },
      { rule: 'Reply must address the content of the incoming email, not generic filler', reason: 'A template-style reply that ignores the email content defeats the purpose and damages professional relationships' },
      { rule: 'Reply length capped at 80 words via system prompt', reason: 'Overly long AI replies are a common tell; keeping replies concise maintains the impression of a human author' },
    ],

    hallucinationRisks: [
      { risk: 'Model invents details about the sender or their company not present in the email', likelihood: 'Medium', mitigation: 'System prompt restricts model to responding only to content explicitly in the email snippet; no web search or external context allowed' },
      { risk: 'Model agrees to commitments or meeting times on behalf of the user', likelihood: 'High', mitigation: 'System prompt explicitly prohibits confirming dates, prices, or agreements — draft is flagged for these cases' },
      { risk: 'Model generates a reply that sounds generic and AI-written', likelihood: 'Medium', mitigation: 'Tone instruction in system prompt anchors reply to first-person voice; tested against 5 real emails before go-live' },
    ],

    v2Changes: [
      'Add email type classifier — route different email types to different system prompts automatically',
      'Google Sheets log of all incoming emails and AI replies for audit trail',
      'Slack notification when a draft is created so nothing gets missed',
    ],

    documents: [
      { label: 'Make Scenario Export', available: false },
      { label: 'System Prompt Library', available: false },
    ],
  },
]
