import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SubNavbar from './components/SubNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Manufacturing from './pages/Manufacturing'
import Storage from './pages/Storage'

function App() {
  return (
    <Router>
      <div className="antialiased selection:bg-blue-900 selection:text-white">
        <Header />
        <SubNavbar />
        <div className="pt-12"> {/* Push content down by SubNavbar height */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/storage" element={<Storage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
