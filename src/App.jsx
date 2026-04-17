import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FloatingDock from './components/FloatingDock'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050508]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <FloatingDock />
      </div>
    </BrowserRouter>
  )
}
