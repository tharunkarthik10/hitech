import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import SubNavbar from './components/SubNavbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Manufacturing from './pages/Manufacturing'
import LaserCutting from './pages/LaserCutting'
import Production from './pages/Production'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Services from './pages/Services'
import AboutUs from './pages/AboutUs'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const showSubNavbar = ['/', '/manufacturing', '/laser-cutting', '/production'].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="antialiased selection:bg-blue-900 selection:text-white">
      <Header />
      {showSubNavbar && <SubNavbar />}
      <div className={showSubNavbar ? "pt-12" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/production" element={<Production />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/laser-cutting" element={<LaserCutting />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
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
