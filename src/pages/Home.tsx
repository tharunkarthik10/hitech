import HeroSlider from '../components/HeroSlider'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutSection from '../components/AboutSection'
import Technologies from '../components/Technologies'
import FeaturedSolutions from '../components/FeaturedSolutions'
import Clients from '../components/Clients'
import OurPartners from '../components/OurPartners'
import IndustriesWeServe from '../components/IndustriesWeServe'
export default function Home() {
  return (
    <main className="elegant-grid overflow-x-clip">
      <HeroSlider />
      <Clients />
      <WhyChooseUs />
      <AboutSection />
      <FeaturedSolutions />
      <Technologies />
      <IndustriesWeServe />
      <OurPartners />
    </main>
  );
}
