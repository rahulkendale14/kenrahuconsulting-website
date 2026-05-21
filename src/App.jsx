import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PRDGenerator from './pages/PRDGenerator'
import ExperienceCalculator from './pages/ExperienceCalculator'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools/prd-generator" element={<PRDGenerator />} />
        <Route path="/tools/experience-calculator" element={<ExperienceCalculator />} />
      </Routes>
    </BrowserRouter>
  )
}
