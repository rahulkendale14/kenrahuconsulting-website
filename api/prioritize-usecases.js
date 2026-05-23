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

const SYSTEM_PROMPT = `You are a Senior AI Product Manager and strategist who has led AI adoption programs at enterprise companies including financial services and regulated industries.

You evaluate AI use cases using a five-dimension prioritization framework derived from real enterprise AI programs:

SCORING DIMENSIONS (each scored 1–10):
1. Business Impact (10 = transformative, 1 = negligible) — revenue impact, cost reduction, risk reduction, customer experience, operational efficiency
2. Implementation Effort (10 = very hard, 1 = trivial) — engineering complexity, data requirements, integration points, team size needed
3. Risk Level (10 = very risky, 1 = very safe) — model accuracy risk, compliance exposure, customer harm potential, reversibility if it fails
4. Data Availability (10 = rich data exists, 1 = data is missing or messy) — quality, volume, accessibility, labelling requirements
5. Governance Complexity (10 = very complex, 1 = simple) — regulatory exposure, audit requirements, change management, stakeholder approvals

PRIORITY SCORE FORMULA (higher = higher priority):
Priority Score = (BusinessImpact × 0.35) + ((10 - ImplementationEffort) × 0.25) + ((10 - Risk) × 0.20) + (DataAvailability × 0.10) + ((10 - GovernanceComplexity) × 0.10)

CATEGORISATION RULES:
- Quick Win: Priority Score ≥ 7.0 AND ImplementationEffort ≤ 5 — high value, low effort, build first
- Strategic Bet: Priority Score ≥ 6.0 AND ImplementationEffort > 5 — high value, harder to build, plan carefully
- Pilot Later: Priority Score between 4.5 and 6.0 — moderate value, validate assumptions first
- Deprioritise: Priority Score < 4.5 OR Risk > 8 — not worth the investment now

KEY INSIGHT FROM ENTERPRISE AI PROGRAMS: The best early candidates are high-volume repetitive tasks (classification, summarisation, routing, search, report drafting) that improve throughput without removing human accountability. Avoid automating high-risk decisions (final approvals, customer-facing exceptions, policy changes) until trust is established.

Always return valid JSON only — no markdown, no explanation, no code blocks.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Daily limit reached. Come back tomorrow.' })
  }

  const { context, industry, maturity, useCases, constraints } = req.body

  if (!useCases || useCases.trim().length === 0) {
    return res.status(400).json({ error: 'Please provide at least one use case.' })
  }

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set.' })
  }

  const userPrompt = `Evaluate and prioritise these AI use cases for this organisation:

Context: ${context || 'Not specified'}
Industry: ${industry || 'Not specified'}
AI Maturity Level: ${maturity || 'Early-stage'}
Constraints: ${constraints || 'None specified'}

Use Cases to Evaluate:
${useCases}

Score each use case on the five dimensions, calculate the priority score using the formula, categorise it, and rank them highest to lowest priority score.

Return ONLY a valid JSON object with exactly this structure:
{
  "summary": "2-3 sentence strategic recommendation — which 1-2 use cases to start with and why, based on the organisation's maturity and context",
  "quickWins": ["name of use case", "..."],
  "strategicBets": ["name of use case", "..."],
  "pilotLater": ["name of use case", "..."],
  "deprioritise": ["name of use case", "..."],
  "rankedUseCases": [
    {
      "name": "exact use case name from input",
      "rank": 1,
      "businessImpact": 8,
      "implementationEffort": 3,
      "risk": 2,
      "dataAvailability": 7,
      "governanceComplexity": 3,
      "priorityScore": 7.9,
      "category": "Quick Win",
      "rationale": "2 sentences explaining this score and what makes it a strong or weak candidate given the organisation's context and maturity."
    }
  ]
}`

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 3000,
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Failed to prioritise use cases.' })
    }

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const result = JSON.parse(cleaned)

    return res.status(200).json({ result })
  } catch (error) {
    console.error('Prioritizer error:', error)
    return res.status(500).json({ error: error.message || 'Failed to prioritise. Please try again.' })
  }
}
