import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PRDGenerator from './pages/PRDGenerator'
import ExperienceCalculator from './pages/ExperienceCalculator'
import UseCasePrioritizer from './pages/UseCasePrioritizer'
import GovernanceChecklist from './pages/GovernanceChecklist'
import MetricsFramework from './pages/MetricsFramework'
import RACIBuilder from './pages/RACIBuilder'
import SalaryPlanner from './pages/SalaryPlanner'
import Portfolio from './pages/Portfolio'
import ProjectPage from './pages/ProjectPage'
import CVScreeningSetup from './pages/CVScreeningSetup'
import CVScreeningAssessment from './pages/CVScreeningAssessment'
import Quiz from './pages/Quiz'
import FakeResumeDetector from './pages/FakeResumeDetector'
import CandidateSubmissionWriter from './pages/CandidateSubmissionWriter'
import TalentPoolSearch from './pages/TalentPoolSearch'

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
        <Route path="/tools/salary-planner" element={<SalaryPlanner />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/tools/fake-resume-detector" element={<FakeResumeDetector />} />
        <Route path="/tools/candidate-submission-writer" element={<CandidateSubmissionWriter />} />
        <Route path="/tools/talent-pool-search" element={<TalentPoolSearch />} />
      </Routes>
    </BrowserRouter>
  )
}
