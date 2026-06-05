export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { jobConfig, candidate } = req.body
  if (!jobConfig || !candidate?.cv || !candidate?.name || !candidate?.email) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const groqKey = process.env.GROQ_API_KEY || process.env.GROK
  if (!groqKey) return res.status(500).json({ error: 'GROQ_API_KEY not set' })

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
            content: 'You are an expert recruiter. Analyze CVs against job requirements and return only valid JSON, no markdown, no explanation.',
          },
          {
            role: 'user',
            content: `Screen this candidate CV against the job requirements below.

Job Role: ${jobConfig.role}
Job Requirements: ${jobConfig.requirements}
Required Experience: ${jobConfig.minExp}–${jobConfig.maxExp} years
Required Location: ${jobConfig.requiredLocation}

Candidate CV:
${candidate.cv}

Return ONLY a valid JSON object with exactly this structure:
{
  "matchScore": 75,
  "matchedCriteria": ["item 1", "item 2"],
  "gaps": ["gap 1", "gap 2"],
  "experienceYears": 4,
  "location": "City, State extracted from CV",
  "experienceMatch": true,
  "locationMatch": true,
  "summary": "2-sentence honest assessment of this candidate for the role."
}

Rules:
- matchScore is 0–100, reflecting how well the CV meets the job requirements
- matchedCriteria: up to 6 specific skills/experiences from the CV that match the requirements
- gaps: up to 4 specific requirements missing from the CV
- experienceMatch: true if total experience is within ${jobConfig.minExp}–${jobConfig.maxExp} years
- locationMatch: true if candidate location matches or is near "${jobConfig.requiredLocation}"
- Be honest and specific — this is used by a real recruiter`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    })

    const data = await response.json()
    if (!response.ok) return res.status(500).json({ error: data.error?.message || 'Failed to screen CV' })

    const raw = data.choices[0].message.content.trim()
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```$/i, '').trim()
    const result = JSON.parse(cleaned)

    const matchThreshold = Number(jobConfig.matchThreshold)
    const verdict = result.matchScore >= matchThreshold && result.experienceMatch && result.locationMatch
      ? 'SELECTED'
      : 'NOT SELECTED'

    const failReasons = []
    if (result.matchScore < matchThreshold) failReasons.push(`CV match score ${result.matchScore}% is below the required ${matchThreshold}%`)
    if (!result.experienceMatch) failReasons.push(`Experience (${result.experienceYears} yrs) is outside the required ${jobConfig.minExp}–${jobConfig.maxExp} years`)
    if (!result.locationMatch) failReasons.push(`Location "${result.location}" does not match required "${jobConfig.requiredLocation}"`)

    const screening = { ...result, verdict, failReasons }

    // Send email to recruiter
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && jobConfig.recruiterEmail) {
      const verdictColor = verdict === 'SELECTED' ? '#22c55e' : '#ef4444'
      const matchedList = result.matchedCriteria.map(c => `<li style="margin:4px 0;color:#9ca3af;font-size:14px">✓ ${c}</li>`).join('')
      const gapsList = result.gaps.map(g => `<li style="margin:4px 0;color:#9ca3af;font-size:14px">✗ ${g}</li>`).join('')
      const failSection = failReasons.length > 0
        ? `<div style="background:#1f1f1f;border:1px solid #ef444440;border-radius:8px;padding:16px;margin-top:16px">
            <p style="font-weight:600;color:#ef4444;margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:1px">Failed Criteria</p>
            ${failReasons.map(r => `<p style="margin:6px 0;color:#9ca3af;font-size:14px">• ${r}</p>`).join('')}
          </div>`
        : ''

      const html = `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#0f0f0f;color:#fff;padding:40px;border-radius:12px">
          <h1 style="margin:0 0 4px;font-size:22px">CV Screening Result</h1>
          <p style="color:#9ca3af;margin:0 0 32px;font-size:14px">${jobConfig.role}</p>

          <div style="background:${verdictColor}15;border:1px solid ${verdictColor}60;border-radius:10px;padding:20px;text-align:center;margin-bottom:28px">
            <p style="font-size:28px;font-weight:700;color:${verdictColor};margin:0">${result.matchScore}% Match</p>
            <p style="font-size:16px;font-weight:600;color:${verdictColor};margin:8px 0 0;letter-spacing:1px">${verdict}</p>
          </div>

          <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
            <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 14px">Candidate</p>
            <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Name:</span> ${candidate.name}</p>
            <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Email:</span> ${candidate.email}</p>
            <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Experience:</span> ${result.experienceYears} years</p>
            <p style="margin:6px 0;font-size:14px"><span style="color:#9ca3af">Location:</span> ${result.location}</p>
          </div>

          <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
            <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 14px">AI Assessment</p>
            <p style="font-size:14px;color:#d1d5db;line-height:1.6;margin:0">${result.summary}</p>
          </div>

          <div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
            <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 14px">Matched Criteria</p>
            <ul style="margin:0;padding-left:0;list-style:none">${matchedList}</ul>
          </div>

          ${result.gaps.length > 0 ? `<div style="background:#1a1a1a;border-radius:10px;padding:20px;margin-bottom:16px">
            <p style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin:0 0 14px">Gaps</p>
            <ul style="margin:0;padding-left:0;list-style:none">${gapsList}</ul>
          </div>` : ''}

          ${failSection}

          <p style="color:#4b5563;font-size:12px;text-align:center;margin-top:28px">Sent by <a href="https://kenrahu.com" style="color:#6366f1;text-decoration:none">kenrahu.com</a> AI Screener</p>
        </div>
      `

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'AI Screener <screener@kenrahu.com>',
          to: [jobConfig.recruiterEmail],
          subject: `[${verdict}] ${candidate.name} — ${jobConfig.role} (${result.matchScore}% match)`,
          html,
        }),
      })
    }

    return res.status(200).json(screening)
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Failed to screen CV' })
  }
}
