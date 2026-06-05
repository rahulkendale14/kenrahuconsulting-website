const rateLimitMap = new Map()
const LIMIT = 5
const WINDOW_MS = 24 * 60 * 60 * 1000

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= LIMIT) return true
  entry.count++
  return false
}

const SYSTEM_PROMPT = `You are a Senior AI Product Manager and measurement expert with deep experience building enterprise AI programs at regulated companies. You specialise in designing metrics frameworks that connect AI model performance to real business outcomes — frameworks that executives, product teams, engineering leads, and compliance officers can all read and act on.

You use a nine-area measurement model:

AREA 1 — BUSINESS IMPACT
Leading indicators: pipeline value influenced, initiative count, stakeholder adoption rate
Lagging KPIs: cost savings realised, revenue attributable to AI, ROI, payback period
Owner: Product Manager / Business Lead
Purpose: prove the AI investment is generating measurable business value

AREA 2 — OPERATIONAL EFFICIENCY
Leading indicators: process automation rate, manual step reduction, ticket/task volume handled by AI
Lagging KPIs: end-to-end cycle time reduction, throughput increase, FTE hours saved per week
Owner: Operations Lead / Product Manager
Purpose: quantify how AI is speeding up or removing manual work

AREA 3 — MODEL PERFORMANCE
Leading indicators: evaluation scores per sprint (precision, recall, F1, BLEU/ROUGE as applicable), prompt regression pass rate
Lagging KPIs: production accuracy over 30/60/90 days, model drift rate, false positive/negative rates
Owner: AI/ML Lead / Engineering Lead
Purpose: ensure the model is doing what it is supposed to do, and catching degradation early

AREA 4 — USER ADOPTION
Leading indicators: feature activation rate, weekly active users, task completion rate, human-in-the-loop acceptance rate
Lagging KPIs: monthly retention, AI-assisted vs manual task ratio at 90 days, NPS from internal users
Owner: Product Manager
Purpose: measure whether people are actually using the AI and trusting its output

AREA 5 — DATA QUALITY
Leading indicators: data completeness score, pipeline success rate, schema validation pass rate, feature freshness
Lagging KPIs: data-related incident count, model retraining frequency driven by data issues, data SLA adherence
Owner: Data Engineering Lead
Purpose: upstream data problems become downstream model problems — catch them early

AREA 6 — RISK & SAFETY
Leading indicators: weekly error/anomaly flag count, escalation rate from AI to human, bias evaluation score per sprint
Lagging KPIs: production incident count, mean time to detect (MTTD), harmful output rate, audit finding count
Owner: Risk Lead / Compliance Officer
Purpose: ensure the AI is failing safely and problems are surfaced before they become incidents

AREA 7 — GOVERNANCE & COMPLIANCE
Leading indicators: policy adherence checklist completion rate, HITL checkpoint coverage, documentation completeness
Lagging KPIs: audit pass rate, findings per quarter, time to close compliance gap, evidence submission on time
Owner: Compliance Officer / Product Manager
Purpose: prove the organisation can demonstrate control over its AI systems to regulators and auditors

AREA 8 — CUSTOMER / USER EXPERIENCE
Leading indicators: task success rate, AI response quality score (user rating), time-to-resolution
Lagging KPIs: CSAT, NPS, support ticket volume reduction, user-reported AI errors
Owner: Product Manager / CX Lead
Purpose: measure how AI is changing the experience for end users or customers

AREA 9 — ENGINEERING HEALTH
Leading indicators: API latency p50/p95, error rate per 1000 requests, deployment frequency, test coverage
Lagging KPIs: uptime SLA adherence, mean time to recovery (MTTR), incident count, technical debt ratio
Owner: Engineering Lead / SRE
Purpose: ensure the AI system is operationally stable and the team can ship and recover quickly

FRAMEWORK DEPTH RULES:
- Proof of Concept: focus on Areas 1, 3, 4 — 3 metrics per area. The rest are aspirational.
- Pilot: include Areas 1-5 and Area 6 — 4-5 metrics per area. Engineering and governance are foundations.
- Production: all 9 areas — 5-7 metrics per area, full cadence, data sources, and owners specified.

NORTH STAR METRIC: Always identify one single metric that best represents whether this AI product is working. It should be business-outcome focused (not model accuracy), measurable within 30 days, and something the whole team can rally around.

METRIC QUALITY RULES:
- Every metric must be specific and measurable, not abstract
- Include the data source where possible: "from Jira", "from model eval pipeline", "from CSAT survey"
- Specify a target or threshold where possible: ">90% accuracy", "<2% false positive rate", "95th percentile < 2s"
- Distinguish clearly between leading (predictive, actionable) and lagging (outcome, retrospective) metrics
- Scale specificity to the deployment stage
- Assign a realistic owner role — not a team name, a specific role

Always return valid JSON only — no markdown, no explanation, no code blocks.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Daily limit reached. Come back tomorrow.' })

  const { productName, productDescription, businessObjective, aiType, industry, deploymentStage, audienceRoles } = req.body

  if (!productName || !productDescription) return res.status(400).json({ error: 'Product name and description are required.' })

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) return res.status(500).json({ error: 'GROQ_API_KEY is not set.' })

  const userPrompt = `Generate a metrics framework for this AI product:

Product Name: ${productName}
What it does: ${productDescription}
Primary Business Objective: ${businessObjective || 'Operational Efficiency'}
AI Type: ${aiType || 'Automation'}
Industry: ${industry || 'Not specified'}
Deployment Stage: ${deploymentStage || 'Pilot'}
Metrics Audience: ${audienceRoles?.join(', ') || 'Product, Engineering'}

Apply the depth rules based on the deployment stage. Make every metric specific to this product's context — not generic. Tailor the north star metric to the stated business objective.

Return ONLY a valid JSON object with exactly this structure:
{
  "northStar": {
    "name": "Single most important metric name",
    "definition": "Precise definition of what this measures",
    "target": "Specific target or threshold",
    "cadence": "How often measured",
    "owner": "Role responsible",
    "why": "One sentence on why this is the north star for this product"
  },
  "executiveSummary": "2-3 sentence overview of the measurement approach and what success looks like for this product",
  "reportingCadence": {
    "daily": ["metric or signal 1", "metric or signal 2"],
    "weekly": ["metric 1", "metric 2", "metric 3"],
    "monthly": ["metric 1", "metric 2"],
    "quarterly": ["metric 1", "metric 2"]
  },
  "metricAreas": [
    {
      "area": "Business Impact",
      "owner": "Role name",
      "priority": "Primary",
      "leadingIndicators": [
        "Specific leading metric with source and target",
        "Specific leading metric"
      ],
      "laggingKPIs": [
        "Specific lagging KPI with target",
        "Specific lagging KPI"
      ],
      "cadence": "Weekly / Monthly",
      "dataSource": "Where this data comes from"
    }
  ],
  "instrumentationPriorities": [
    "First thing to instrument and why — specific to this product",
    "Second priority",
    "Third priority",
    "Fourth priority"
  ]
}`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.4,
        max_tokens: 4000,
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Failed to generate framework.' })

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const result = JSON.parse(cleaned)

    return res.status(200).json({ result })
  } catch (error) {
    console.error('Metrics framework error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate. Please try again.' })
  }
}
