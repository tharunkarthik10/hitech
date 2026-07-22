import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import SubNavbar from './components/SubNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Manufacturing from './pages/Manufacturing'
import Storage from './pages/Storage'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Services from './pages/Services'

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const showSubNavbar = ['/', '/manufacturing', '/storage'].includes(location.pathname);

  return (
    <div className="antialiased selection:bg-blue-900 selection:text-white">
      <Header />
      {showSubNavbar && <SubNavbar />}
      <div className={showSubNavbar ? "pt-12" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
