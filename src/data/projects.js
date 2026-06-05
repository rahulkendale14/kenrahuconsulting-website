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
]
