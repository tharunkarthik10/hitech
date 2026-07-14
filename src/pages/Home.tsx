import HeroSlider from '../components/HeroSlider'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutSection from '../components/AboutSection'
import Technologies from '../components/Technologies'
import FeaturedSolutions from '../components/FeaturedSolutions'
import QualityFeatures from '../components/QualityFeatures'
import Testimonials from '../components/Testimonials'
import Clients from '../components/Clients'

export default function Home() {
  return (
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
  );
}
