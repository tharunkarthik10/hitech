import Header from './components/Header'
import HeroSlider from './components/HeroSlider'
import WhyChooseUs from './components/WhyChooseUs'
import AboutSection from './components/AboutSection'
import Technologies from './components/Technologies'
import FeaturedSolutions from './components/FeaturedSolutions'
import QualityFeatures from './components/QualityFeatures'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
import Clients from './components/Clients'

function App() {
  return (
    <div className="antialiased selection:bg-industrial-yellow selection:text-on-surface">
      <Header />
      <main className="elegant-grid overflow-x-hidden">
        <HeroSlider />
        <WhyChooseUs />
        <AboutSection />
        <Clients />
        <Technologies />
        <FeaturedSolutions />
        <QualityFeatures />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default App
