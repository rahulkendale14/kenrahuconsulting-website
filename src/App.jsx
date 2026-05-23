import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import PRDGenerator from './pages/PRDGenerator'
import ExperienceCalculator from './pages/ExperienceCalculator'
import CVScreeningSetup from './pages/CVScreeningSetup'
import CVScreeningAssessment from './pages/CVScreeningAssessment'
import FakeResumeDetector from './pages/FakeResumeDetector'
import CandidateSubmissionWriter from './pages/CandidateSubmissionWriter'
import UseCasePrioritizer from './pages/UseCasePrioritizer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/tools/prd-generator" element={<PRDGenerator />} />
        <Route path="/tools/experience-calculator" element={<ExperienceCalculator />} />
        <Route path="/tools/cv-screening" element={<CVScreeningSetup />} />
        <Route path="/tools/cv-screening/:config" element={<CVScreeningAssessment />} />
        <Route path="/tools/fake-resume-detector" element={<FakeResumeDetector />} />
        <Route path="/tools/candidate-submission-writer" element={<CandidateSubmissionWriter />} />
        <Route path="/tools/use-case-prioritizer" element={<UseCasePrioritizer />} />
      </Routes>
    </BrowserRouter>
  )
}
