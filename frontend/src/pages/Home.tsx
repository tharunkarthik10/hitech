import HeroSlider from '../components/HeroSlider'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutSection from '../components/AboutSection'
import Technologies from '../components/Technologies'
import FeaturedSolutions from '../components/FeaturedSolutions'
import Clients from '../components/Clients'
import IndustriesWeServe from '../components/IndustriesWeServe'
import FeaturedVideo from '../components/FeaturedVideo'
import CTA from '../components/CTA'

export default function Home() {
  return (
    <main className="elegant-grid overflow-x-clip">
      <HeroSlider />
      <Clients />
      <WhyChooseUs />
      <AboutSection />
      <FeaturedSolutions />
      <Technologies />
      <FeaturedVideo />
      <IndustriesWeServe />
      <CTA />
    </main>
  );
}
