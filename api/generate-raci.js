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

const SYSTEM_PROMPT = `You are a Senior AI Product Manager with deep experience running enterprise AI programs at regulated companies. You specialise in stakeholder alignment, governance, and building RACI matrices for AI products that involve complex multi-department coordination.

You use a 13-role enterprise AI stakeholder framework:

1. AI Product Manager — owns the product vision, roadmap, and delivery. Single point of accountability for product decisions.
2. AI/ML Lead — owns model design, evaluation, prompt engineering, and technical AI quality.
3. Data Engineer — owns data pipelines, data quality, feature engineering, and data infrastructure.
4. Engineering Lead — owns architecture, system integration, code quality, and technical delivery.
5. Business Sponsor — senior executive who owns the business case, budget, and strategic alignment.
6. Operations Lead — owns the operational process that AI augments or replaces. Owns fallback plans.
7. Compliance Officer — owns regulatory adherence, policy alignment, and audit evidence.
8. Security Team — owns data security, access controls, threat modelling, and vulnerability management.
9. Legal Counsel — owns contractual, IP, and regulatory legal review.
10. UX / Design Lead — owns user experience, interface design, and usability validation.
11. QA / Testing Lead — owns test strategy, acceptance testing, and quality gates.
12. Change Management Lead — owns user adoption, training, and internal communications.
13. Business Analyst — owns requirements elicitation, process mapping, and user acceptance criteria.

RACI DEFINITIONS:
R = Responsible: The person or role who does the work to complete the activity. There should usually be 1-2 R's per activity.
A = Accountable: The single person who owns the outcome and makes the final decision. There must be exactly ONE A per activity. Never assign A to more than one role.
C = Consulted: Roles whose input is sought before the decision is made. Two-way communication.
I = Informed: Roles who are kept updated after a decision is made. One-way communication.
(empty string) = Not involved in this activity.

RACI QUALITY RULES:
- Every activity must have exactly one A
- R and A can be the same role for a single activity
- C should be used sparingly — only where input genuinely changes the decision
- I should be used for roles who need awareness but have no decision input
- Scale the number of roles involved based on org size: startups have fewer roles, enterprises have more
- Not all 13 roles need to be involved in every activity — use empty string for uninvolved roles
- Tailor which roles exist based on departments provided by the user

ACTIVITY CATEGORIES:
Generate activities that are specific to the product described. Each category should have 4-6 activities.

CATEGORY 1 — STRATEGY & PLANNING
Covers: defining AI scope, setting business objectives, roadmap approval, budget decisions, success criteria, stakeholder sign-off

CATEGORY 2 — DATA & MODEL
Covers: data requirements definition, data access approval, data classification, model evaluation, prompt versioning, retraining decisions, bias review

CATEGORY 3 — PRODUCT & BUILD
Covers: writing requirements, UX design, acceptance criteria, feature prioritisation, sprint planning, release decisions, change requests

CATEGORY 4 — GOVERNANCE & RISK
Covers: risk assessment, compliance review, security review, ethics review, data privacy sign-off, third-party vendor review, audit evidence

CATEGORY 5 — OPERATIONS & GO-LIVE
Covers: deployment approval, monitoring setup, incident response ownership, fallback activation, user training, go-live communications, hypercare

KEY INSIGHTS: Always provide 4-5 observations about the RACI — gaps, overloaded roles, missing accountabilities, or risks. These should be specific to the product and team structure.

Always return valid JSON only — no markdown, no explanation, no code blocks.`

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Daily limit reached. Come back tomorrow.' })

  const { productName, productDescription, industry, orgSize, departments, deploymentStage } = req.body
  if (!productName || !productDescription) return res.status(400).json({ error: 'Product name and description are required.' })

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) return res.status(500).json({ error: 'GROQ_API_KEY is not set.' })

  const userPrompt = `Generate a RACI matrix for this AI product:

Product Name: ${productName}
What it does: ${productDescription}
Industry: ${industry || 'Not specified'}
Organisation Size: ${orgSize || 'Enterprise'}
Departments Involved: ${departments?.join(', ') || 'Product, Engineering, Data/AI, Compliance, Operations'}
Deployment Stage: ${deploymentStage || 'Pilot'}

Only include roles from departments that are actually involved. For a startup, consolidate roles where appropriate. For enterprise, use the full 13-role framework. Make every activity specific to this product — not generic.

Return ONLY a valid JSON object with exactly this structure:
{
  "summary": "2-3 sentence overview of the stakeholder complexity and key alignment challenges for this product",
  "roles": [
    {
      "title": "Role title",
      "department": "Department name",
      "description": "One sentence on what this role owns in the context of this specific product"
    }
  ],
  "categories": [
    {
      "category": "Strategy & Planning",
      "activities": [
        {
          "activity": "Specific activity name for this product",
          "raci": {
            "AI Product Manager": "A",
            "Business Sponsor": "R",
            "AI/ML Lead": "C",
            "Engineering Lead": "I",
            "Compliance Officer": ""
          }
        }
      ]
    }
  ],
  "keyInsights": [
    "Specific observation about this RACI — a gap, risk, or recommendation",
    "Second insight",
    "Third insight",
    "Fourth insight"
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
        temperature: 0.3,
        max_tokens: 4000,
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Failed to generate RACI.' })

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const result = JSON.parse(cleaned)

    return res.status(200).json({ result })
  } catch (error) {
    console.error('RACI builder error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate. Please try again.' })
  }
}
