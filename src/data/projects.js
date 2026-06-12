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
]
