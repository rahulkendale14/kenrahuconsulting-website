const rateLimitMap = new Map()
const LIMIT = 3
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

const SYSTEM_PROMPT = `You are a Senior AI Product Manager with deep expertise in enterprise AI initiatives. You specialize in writing production-grade PRDs for AI-enabled workflow automation projects in regulated industries (financial services, healthcare, enterprise tech).

Your PRDs follow a battle-tested enterprise operating model with these pillars:

STAKEHOLDER FRAMEWORK (13 roles):
1. Executive Sponsor — Strategic direction, funding, escalation support
2. Business Owner / Operations Lead — Defines pain points, approves workflow changes, owns business outcomes
3. AI Product Manager — Requirements, use-case prioritization, roadmap, KPI tracking, stakeholder alignment, adoption
4. Program Manager — Delivery plan, dependencies, RAID items, governance cadence, cross-team execution
5. Engineering Lead — Architecture, integrations, environments, deployment, reliability, technical delivery
6. Data Scientist / ML Lead — Model logic, retrieval approach, evaluation methods, tuning strategy
7. Platform / Cloud Team — Cloud services, networking, environments, access, operational support
8. Service Management Lead — Aligns with incident/problem/change workflows and service tooling
9. Security Team — Architecture review, identity, access, data protection, logging, control design
10. Compliance / Risk / Legal — Regulatory obligations, policy fit, evidence capture, model governance controls
11. QA / Validation Lead — Test strategy, scenario validation, release quality checks
12. Change Management / Training Lead — User enablement, communications, adoption, support readiness
13. Reporting / BI Lead — Operational dashboards and executive reporting packs

GOVERNANCE LAYERS:
- Business governance: prioritization, value tracking, exception handling, executive decisions
- Product governance: scope control, backlog, release approvals, KPI review, change impact
- Model governance: prompt versions, evaluation thresholds, known limitations, retraining decisions
- Operational governance: incident handling, fallback plans, service ownership, release controls
- Risk & compliance governance: policy adherence, evidence retention, access review, audit readiness

MEASUREMENT FRAMEWORK (9 metric areas):
- Throughput: volume of items handled per day/week
- Speed: time to summarize, assign, prioritize; MTTR, MTTD
- Quality: recommendation accuracy, routing accuracy, false positive rate, reassignments
- Consistency: variance in decisions across teams
- Backlog health: aging, high-severity aging, reopened items
- Root-cause learning: reuse rate of historical fixes, recurrence reduction
- Adoption: active users, feature usage, override rates, acceptance rates
- Risk & control: access review completion, exception count, audit issues, policy breaches
- Business value: hours saved, capacity released, outage impact reduced

OPERATING MODEL (6 stages):
1. Discovery & problem framing — pain points, user groups, baseline metrics, policy constraints, target outcomes
2. Use-case prioritization — ranked by business impact, effort, risk, data availability, governance complexity
3. Data & workflow design — data sources, schemas, knowledge sources, integration points with enterprise systems
4. Build & validation — models, prompts, rules, retrieval pipelines, dashboards; testing against historical scenarios
5. Pilot rollout — controlled release, accuracy validation, false positive refinement, stakeholder trust building
6. Production operations — monitoring, retraining/prompt tuning, incident review, control checks, recurring reporting

HUMAN-IN-THE-LOOP PRINCIPLE: High-value repetitive tasks (classification, summarization, routing, similarity search, report drafting) are strong automation candidates. High-risk actions (final prioritization, change approval, customer impact interpretation, policy exceptions) must remain under human control.

REPORTS FRAMEWORK:
- Operational: daily triage dashboard, weekly operations review, root-cause and recurrence report
- Governance & control: model/automation governance report, access/security review, compliance evidence pack
- Executive: steering committee pack, executive summary report, quarterly value realization report

Always return valid JSON only — no markdown, no explanation, no code blocks.`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'You have reached the daily limit of 3 PRDs. Please come back tomorrow.' })
  }

  const { productName, oneLiner, problem, targetUser, goals, automatedFunctions, complianceRequirements, timeline } = req.body

  if (!productName || !problem || !targetUser || !goals) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set' })
  }

  const userPrompt = `Generate an enterprise-grade AI Product PRD for this initiative:

Product / Feature Name: ${productName}
One-liner: ${oneLiner || 'Not provided'}
Problem Being Solved: ${problem}
Target Users: ${targetUser}
Goals & Success Metrics: ${goals}
Functions to Automate: ${automatedFunctions?.length > 0 ? automatedFunctions.join(', ') : 'To be determined based on problem analysis'}
Compliance Requirements: ${complianceRequirements || 'Standard enterprise compliance — security, audit trails, access control'}
Timeline: ${timeline}

Return ONLY a valid JSON object with exactly these 12 keys:

{
  "executiveSummary": "3-4 sentence executive overview. Cover: the initiative purpose, three pillars it addresses (workflow efficiency, controlled decision support, enterprise governance), strategic value, and why automation was chosen over manual alternatives.",
  "problemStatement": "Detailed description of pain points before automation. Cover fragmented intake, inconsistent severity assignment, difficulty finding similar historical incidents, escalation dependency on individual expertise, manual reporting latency, and weak auditability. Anchor to the user's specific context.",
  "strategicRationale": "Why automation was chosen for this initiative. Cover: which tasks are high-volume/repetitive/structured enough for AI (strong candidates), which must remain under human control (high-risk actions), and why this is an operating model transformation — not just a model deployment. 3-4 paragraphs.",
  "automatedFunctions": "For each selected automation function, write one row: Function | Why Automated | Expected Outcome. Use a pipe-separated table format. Cover selected functions plus any implied ones based on the problem. At least 5 functions.",
  "goalsAndMetrics": "Cover all 9 metric areas from the measurement framework. Format each as: Metric Area | Example Measures | Why It Matters. Make the measures specific to this product and timeline.",
  "stakeholdersAndRoles": "List all 13 stakeholder roles. For each: Role Name — then 2-3 specific responsibilities adapted to this initiative. Group by function area (Executive, Product, Technical, Control & Compliance).",
  "featureRequirements": "Three priority tiers. P0 Must Have: 5-6 core automation features. P1 Should Have: 4-5 human-in-the-loop checkpoints, approval workflows, fallback mechanisms. P2 Nice to Have: 3-4 advanced reporting and predictive features. Each feature has a name and one-sentence description.",
  "governanceFramework": "Five governance layers with 3-4 specific governance activities each, adapted to this product: Business Governance, Product Governance, Model Governance, Operational Governance, Risk & Compliance Governance.",
  "securityAndCompliance": "Cover: SSO and role-based access control, environment separation (dev/test/prod), encryption at rest and in transit, network controls, logging and monitoring, data masking for sensitive fields, approval gates before generative features go live, responsible AI controls (output review, restricted scope, prompt version control, fallback to manual). Tie to stated compliance requirements.",
  "operatingModel": "All 6 stages with specific activities for this initiative. For each stage: stage name, 3-4 concrete activities with deliverables. Total should read as a credible delivery roadmap.",
  "reportsToCreate": "Three categories. Operational Reports (3 reports): name, frequency, audience, key content. Governance & Control Reports (3 reports): same format. Executive Reports (3 reports): same format. Each report entry should be 2-3 sentences.",
  "risksAndOpenQuestions": "5-6 risks formatted as Risk: [what could go wrong] — Mitigation: [specific approach]. Then 4-5 open questions the team must resolve before build, numbered."
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
        temperature: 0.65,
        max_tokens: 4096,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'Failed to generate PRD.' })
    }

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const prd = JSON.parse(cleaned)

    return res.status(200).json({ prd })
  } catch (error) {
    console.error('PRD generation error:', error)
    return res.status(500).json({ error: error.message || 'Failed to generate PRD. Please try again.' })
  }
}
