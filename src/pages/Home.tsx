import HeroSlider from '../components/HeroSlider'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutSection from '../components/AboutSection'
import Technologies from '../components/Technologies'
import FeaturedSolutions from '../components/FeaturedSolutions'
import Clients from '../components/Clients'
import WhyMoti from '../components/WhyMoti'
import OurPartners from '../components/OurPartners'
export default function Home() {
  return (
    <main className="elegant-grid overflow-x-clip">
      <HeroSlider />
      <Clients />
      <WhyChooseUs />
      <AboutSection />
      <FeaturedSolutions />
      <Technologies />
      <WhyMoti />
      <OurPartners />
    </main>
  );
}
