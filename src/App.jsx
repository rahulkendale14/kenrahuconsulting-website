import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PRDGenerator from './pages/PRDGenerator'
import ExperienceCalculator from './pages/ExperienceCalculator'
import UseCasePrioritizer from './pages/UseCasePrioritizer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/prd-generator" element={<PRDGenerator />} />
        <Route path="/tools/experience-calculator" element={<ExperienceCalculator />} />
        <Route path="/tools/use-case-prioritizer" element={<UseCasePrioritizer />} />
      </Routes>
    </BrowserRouter>
  )
}
