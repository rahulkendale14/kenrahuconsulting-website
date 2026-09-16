# PRD Generator — Build Tracker

## Implementation Order

- [x] Create tasks/todo.md + tasks/lessons.md
- [x] Install dependencies (@anthropic-ai/sdk, jspdf, html2canvas)
- [x] Create api/generate-prd.js (Vercel serverless function)
- [x] Create src/pages/PRDGenerator.jsx (state machine)
- [x] Create src/components/prd/PRDStart.jsx
- [x] Create src/components/prd/PRDForm.jsx
- [x] Create src/components/prd/PRDLoading.jsx
- [x] Create src/components/prd/PRDPreview.jsx (email gate)
- [x] Create src/components/prd/PRDOutput.jsx (copy + PDF)
- [x] Modify src/App.jsx → add route
- [x] Modify src/components/Tools.jsx → update card to live link
- [x] Build passes — zero errors ✅
- [x] Add GROQ_API_KEY to Vercel env vars ✅
- [x] Deploy + verify live on kenrahu.com ✅
