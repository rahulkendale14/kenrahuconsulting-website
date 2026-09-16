# kenrahu.com — Project Memory

## Who is Rahul?
- **Name:** Rahul Kendale
- **Role:** AI Audit & Transformation Partner
- **Focus:** Helping small businesses adopt AI the right way — assess first, invest second
- **Email:** rahul@kenrahu.com
- **Domain:** kenrahu.com
- **LinkedIn:** https://www.linkedin.com/in/kendalerahul/
- **Calendly:** https://calendly.com/kendale-rahul/30min

---

## What is this project?
Personal brand website + client pipeline tool. Built from scratch to:
- Establish credibility in AI consulting
- Showcase AI tools (starting with AI Readiness Quiz)
- Generate inbound client inquiries via "Book a Discovery Call" CTA
- Home for future PM/AI tools built with Claude Code

---

## Tech Stack
| Layer | Choice |
|-------|--------|
| Framework | React + Vite |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| Hosting | Vercel |
| Repo | https://github.com/kenrahu/kenrahu-website |
| Domain | kenrahu.com (bought on GoDaddy, DNS pointed to Vercel) |

---

## Design System
| Token | Value | Tailwind Class |
|-------|-------|----------------|
| Background | `#0F0F0F` | `bg-bg` |
| Surface (cards) | `#1A1A1A` | `bg-surface` |
| Accent (indigo) | `#6366F1` | `bg-accent` / `text-accent` |
| Accent hover | `#4F46E5` | `bg-accent-dark` |
| Muted text | `#9CA3AF` | `text-muted` |
| Border | `#2A2A2A` | `border-[#2A2A2A]` |
| Alt section bg | `#111111` | `bg-[#111111]` |

Custom colors are defined in `src/index.css` under `@theme {}` (Tailwind v4 CSS-first config).

---

## File Structure
```
kenrahu-website/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx              ← React Router (/ and /quiz)
    ├── index.css            ← Tailwind v4 @theme config + base styles
    ├── pages/
    │   ├── Home.jsx         ← Landing page (all sections)
    │   └── Quiz.jsx         ← Full quiz page + state machine
    └── components/
        ├── Navbar.jsx       ← Sticky, blur on scroll, mobile hamburger
        ├── Hero.jsx         ← Headline, 2 CTAs, trust stats
        ├── About.jsx        ← Bio, RK avatar placeholder, 3 value bullets
        ├── Services.jsx     ← 3 service cards
        ├── Tools.jsx        ← Tool portfolio cards
        ├── Contact.jsx      ← CTA section
        ├── Footer.jsx       ← Copyright, LinkedIn, "Built with AI"
        └── quiz/
            ├── QuizStart.jsx
            ├── QuizQuestion.jsx
            ├── QuizEmail.jsx
            └── QuizResults.jsx
```

---

## URL Structure
| URL | What |
|-----|------|
| kenrahu.com | Landing page |
| kenrahu.com/quiz | AI Readiness Quiz |
| kenrahu.com/tools/roadmap-prioritizer | Future tool (not built yet) |

---

## Landing Page Sections (in order)
1. **Navbar** — no logo, nav links (About · Services · Tools · Contact), "Book a Call" → Calendly
2. **Hero** — headline, subheadline, Book a Discovery Call + Try Quiz CTAs, trust stats
3. **About** — bio paragraph, RK initials avatar (headshot placeholder), 3 bullets
4. **Services** — 3 cards: AI Readiness Audit · AI Transformation Strategy · AI Tool Building
5. **Tools** — AI Readiness Calculator (live) · ROI Calculator (coming soon) · Roadmap Prioritizer (coming soon)
6. **Contact** — CTA section with Calendly button + email
7. **Footer** — copyright, LinkedIn link, "Built with AI"

---

## AI Readiness Quiz (10 Questions)
- Categories: Strategy, Data Readiness, Team Capability, Tech Infrastructure, Leadership Buy-in, Process Maturity, Budget, Current AI Usage, Risk & Compliance, Measurement
- Scoring: Each answer is 0 / 25 / 75 / 100 — final score is average
- 4 levels: Beginner (0–24) · Developing (25–49) · Ready (50–74) · Advanced (75–100)
- Email capture gate before results screen
- Results show: score ring, level badge, "what this means", numbered action plan, Calendly CTA

---

## Deployment Validation Checklist
*(Run through this after every deploy or DNS change)*

### DNS / Domain
- [ ] kenrahu.com loads the Vercel site (NOT GoDaddy "Launching Soon")
- [ ] GoDaddy DNS: A record `@` → `76.76.21.21`
- [ ] GoDaddy DNS: CNAME `www` → `cname.vercel-dns.com`
- [ ] Vercel dashboard: both `kenrahu.com` and `www.kenrahu.com` added under Domains
- [ ] SSL certificate is active (padlock shows in browser)

### After Every Code Push
- [ ] Vercel auto-deploy triggered (check Vercel dashboard)
- [ ] Live site at kenrahu.com reflects changes
- [ ] Test on real iPhone — not just browser DevTools
- [ ] All CTA links work (Calendly, quiz, email)
- [ ] No content cut off on mobile

---

## Things Still To Do

### Website & Tools
- [x] Add headshot photo ✅
- [x] Add LinkedIn profile URL ✅
- [ ] Fix DNS — kenrahu.com showing GoDaddy "Launching Soon" page (not Vercel)
- [ ] Verify mobile layout on real iPhone after DNS fix
- [ ] Build ROI Calculator → kenrahu.com/tools/roi-calculator
- [ ] Build Roadmap Prioritizer → kenrahu.com/tools/roadmap-prioritizer
- [ ] Add blog / case studies section
- [ ] Set up rahul@kenrahu.com email inbox

### PM Tools to Build (priority order)
- [ ] PRD Generator → kenrahu.com/tools/prd-generator (HIGHEST PRIORITY)
- [ ] User Story Generator → kenrahu.com/tools/user-stories
- [ ] OKR Generator → kenrahu.com/tools/okr-generator
- [ ] Sprint Retrospective Analyzer
- [ ] Stakeholder Update Writer
- [ ] PM Interview Prep Tool (can monetize)

### n8n Automations to Build
- [ ] LinkedIn comment "GUIDE" → auto DM with PDF link
- [ ] LinkedIn post → auto post to X
- [ ] Quiz form results → Rahul's email notification
- [ ] New Calendly booking → WhatsApp notification to Rahul
- [ ] Morning email summary → WhatsApp
- [ ] Credit card due date reminder (read Gmail → WhatsApp alert)

### Learning & Strategy (Rahul's reminders)
- [ ] REMINDER: Study Chris Donnelly's LinkedIn strategy
- [ ] REMINDER: Plan AI Product Management skills roadmap
- [ ] Build content strategy (see section below)

---

## n8n Setup
- Running locally via: `n8n start` (v2.8.3)
- Accessible at: http://localhost:5678
- Note: Only runs when Mac is ON — move to Railway/Render for 24/7
- Docker compose file exists at: ~/n8n-docker/docker-compose.yml

---

## Content Strategy (4-Week LinkedIn Plan)

### Week 1 (LIVE ✅)
- Post: "Built my website in 2 days using AI" → Comment GUIDE
- X post: Same content, 280 char version

### Week 2
- Carousel: 8 slides — visual story of what was built, mistakes, result
- Canva dark theme matching kenrahu.com brand

### Week 3
- Giveaway post: "Comment GUIDE — I'll DM you the free PDF"
- n8n auto-DM should be live by this point

### Week 4
- PDF guide delivered via n8n automation
- Follow-up email sequence → discovery call

### Content Pillars (ongoing)
1. AI Tool builds — show what you're building
2. PM insights — 17 years of experience as content
3. Honest takes — mistakes, learnings (high engagement)
4. Client wins — anonymised case studies
5. Free value — tips, frameworks, tools

### Chris Donnelly Strategy (TO STUDY)
- [ ] Review Chris Donnelly's LinkedIn posting style
- [ ] Analyse his hook formats
- [ ] Apply to Rahul's content calendar

---

## How to Run Locally
```bash
cd kenrahu-website
npm run dev
# → http://localhost:5173
```

## How to Deploy
```bash
git add .
git commit -m "your message"
git push
# Vercel auto-deploys on every push to main
```
