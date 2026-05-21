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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown'
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'You have reached the daily limit of 3 PRDs. Please come back tomorrow.' })
  }

  const { productName, oneLiner, problem, targetUser, goals, features, timeline } = req.body

  if (!productName || !problem || !targetUser || !goals || !features) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const groqKey = process.env.GROQ_API_KEY
  if (!groqKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set in environment variables' })
  }

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
          {
            role: 'system',
            content: 'You are an expert Product Manager with 15+ years of experience writing PRDs for top tech companies. Always return valid JSON only — no markdown, no explanation, no code blocks.',
          },
          {
            role: 'user',
            content: `Generate a professional PRD based on these inputs:

Product Name: ${productName}
One-liner: ${oneLiner}
Problem: ${problem}
Target User: ${targetUser}
Goals & Success Metrics: ${goals}
Must-have Features: ${features}
Timeline: ${timeline}

Return ONLY a valid JSON object with exactly these 7 keys:
{
  "problemStatement": "3-4 sentences clearly articulating the problem, who faces it, and why it matters",
  "goalsAndMetrics": "Bullet list of 4-5 specific, measurable goals and success metrics",
  "targetUsers": "Description of primary and secondary user personas with their needs and pain points",
  "featuresAndRequirements": "Detailed list of must-have features with brief descriptions, prioritised as P0/P1/P2",
  "outOfScope": "Bullet list of 4-5 things explicitly NOT included in this version",
  "timeline": "Phase-by-phase breakdown of the ${timeline} timeline with milestones",
  "risksAndAssumptions": "Bullet list of 4-5 key risks and assumptions with mitigation notes"
}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
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
