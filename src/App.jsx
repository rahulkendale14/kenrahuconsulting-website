import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PRDGenerator from './pages/PRDGenerator'
import ExperienceCalculator from './pages/ExperienceCalculator'
import UseCasePrioritizer from './pages/UseCasePrioritizer'
import GovernanceChecklist from './pages/GovernanceChecklist'
import MetricsFramework from './pages/MetricsFramework'
import RACIBuilder from './pages/RACIBuilder'
import Portfolio from './pages/Portfolio'
import ProjectPage from './pages/ProjectPage'
import CVScreeningSetup from './pages/CVScreeningSetup'
import CVScreeningAssessment from './pages/CVScreeningAssessment'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/:slug" element={<ProjectPage />} />
        <Route path="/tools/cv-screening" element={<CVScreeningSetup />} />
        <Route path="/tools/cv-screening/:config" element={<CVScreeningAssessment />} />
        <Route path="/tools/prd-generator" element={<PRDGenerator />} />
        <Route path="/tools/experience-calculator" element={<ExperienceCalculator />} />
        <Route path="/tools/use-case-prioritizer" element={<UseCasePrioritizer />} />
        <Route path="/tools/governance-checklist" element={<GovernanceChecklist />} />
        <Route path="/tools/metrics-framework" element={<MetricsFramework />} />
        <Route path="/tools/raci-builder" element={<RACIBuilder />} />
      </Routes>
    </BrowserRouter>
  )
}
