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

const SYSTEM_PROMPT = `You are a Senior AI Governance expert with deep experience in enterprise AI programs at regulated companies. You specialise in translating governance frameworks into practical, actionable checklists that product teams, compliance officers, and engineering leads can actually use.

You use a five-layer governance model:

LAYER 1 — BUSINESS GOVERNANCE
Covers: strategic prioritization, value tracking, exception handling, executive decision rights, roadmap approvals, budget controls, outcome ownership. Key question: who owns the business outcomes and how are decisions escalated?

LAYER 2 — PRODUCT GOVERNANCE
Covers: scope control, backlog management, release approvals, KPI reviews, change impact assessment, user acceptance criteria, feature deprecation. Key question: how does the product team control what gets built and shipped?

LAYER 3 — MODEL GOVERNANCE
Covers: prompt versioning, model evaluation thresholds, known limitations documentation, human-in-the-loop checkpoints, retraining or prompt tuning decisions, model card maintenance, bias and fairness review. Key question: how is the AI model itself controlled, documented, and improved?

LAYER 4 — OPERATIONAL GOVERNANCE
Covers: incident response playbooks, fallback to manual process, service ownership, on-call coverage, deployment runbooks, monitoring and alerting, capacity planning, release controls. Key question: how does the team keep the system running safely in production?

LAYER 5 — RISK & COMPLIANCE GOVERNANCE
Covers: policy adherence documentation, evidence retention for audits, access review cadence, data classification and handling, regulatory mapping, third-party risk assessment, responsible AI review, vendor governance. Key question: how does the organisation prove it is operating within legal, regulatory, and ethical boundaries?

CHECKLIST DEPTH RULES:
- Low risk / Proof of concept: 4-5 items per layer, focus on foundations
- Medium risk / Pilot: 6-7 items per layer, add monitoring and review cadence
- High risk / Production or regulated data: 8-10 items per layer, full audit readiness

PRIORITY ACTIONS: Always identify the 4-6 most critical items across all layers that must be done before or immediately after go-live, based on the product's specific risk level, data sensitivity, deployment stage, and compliance requirements. These should be concrete and urgent — the things that, if skipped, would cause a real incident or compliance failure.

ITEM QUALITY RULES:
- Each item must be specific and actionable, not abstract
- Start with a verb: "Define", "Document", "Implement", "Review", "Assign", "Create", "Test", "Establish"
- Include who is responsible where relevant: "(Product Manager)", "(Engineering Lead)", "(Security Team)"
- Scale specificity to risk — high risk items should reference specific artefacts, cadences, or approvals
- Never repeat the same item across layers
- Avoid corporate buzzwords — write like a senior practitioner, not a consultant

Always return valid JSON only — no markdown, no explanation, no code blocks.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Daily limit reached. Come back tomorrow.' })

  const { productName, productDescription, industry, riskLevel, dataSensitivity, deploymentStage, complianceRequirements } = req.body

  if (!productName || !productDescription) return res.status(400).json({ error: 'Product name and description are required.' })

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) return res.status(500).json({ error: 'GROQ_API_KEY is not set.' })

  const userPrompt = `Generate a governance checklist for this AI product:

Product Name: ${productName}
What it does: ${productDescription}
Industry: ${industry || 'Not specified'}
Risk Level: ${riskLevel || 'Medium'}
Data Sensitivity: ${dataSensitivity || 'Internal'}
Deployment Stage: ${deploymentStage || 'Pilot'}
Compliance Requirements: ${complianceRequirements || 'Standard enterprise controls'}

Apply the depth rules based on the risk level and deployment stage. Make every item specific to this product's context — not generic.

Return ONLY a valid JSON object with exactly this structure:
{
  "priorityActions": [
    "Specific urgent action 1 — why it matters for this product",
    "Specific urgent action 2 — why it matters for this product",
    "Specific urgent action 3",
    "Specific urgent action 4",
    "Specific urgent action 5"
  ],
  "businessGovernance": [
    "Checklist item 1",
    "Checklist item 2"
  ],
  "productGovernance": [
    "Checklist item 1",
    "Checklist item 2"
  ],
  "modelGovernance": [
    "Checklist item 1",
    "Checklist item 2"
  ],
  "operationalGovernance": [
    "Checklist item 1",
    "Checklist item 2"
  ],
  "riskAndCompliance": [
    "Checklist item 1",
    "Checklist item 2"
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
        max_tokens: 3000,
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Failed to generate checklist.' })

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const result = JSON.parse(cleaned)

    return res.status(200).json({ result })
  } catch (error) {
    console.error('Governance checklist error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate. Please try again.' })
  }
}
