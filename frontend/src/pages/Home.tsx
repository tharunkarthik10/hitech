import { motion } from 'framer-motion'
import HeroSlider from '../components/HeroSlider'
import WhyChooseUs from '../components/WhyChooseUs'
import AboutSection from '../components/AboutSection'
import Technologies from '../components/Technologies'
import FeaturedSolutions from '../components/FeaturedSolutions'
import Clients from '../components/Clients'
import FeaturedVideo from '../components/FeaturedVideo'
import CTA from '../components/CTA'

interface ScrollSectionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  delay?: number;
}

function ScrollSection({ children, direction = 'left', delay = 0 }: ScrollSectionProps) {
  const xOffset = direction === 'left' ? -90 : 90;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration: 1.4, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="w-full overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {/* Hero Section: Smooth initial entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <HeroSlider />
      </motion.div>

      {/* Clients Section - enters from Left */}
      <ScrollSection direction="left">
        <Clients />
      </ScrollSection>

      {/* Why Choose Us Section - enters from Right */}
      <ScrollSection direction="right">
        <WhyChooseUs />
      </ScrollSection>

      {/* About Us Section - enters from Left */}
      <ScrollSection direction="left">
        <AboutSection />
      </ScrollSection>

      {/* Featured Solutions / Specialized Industries - enters from Right */}
      <ScrollSection direction="right">
        <FeaturedSolutions />
      </ScrollSection>

      {/* Technologies Section - enters from Left */}
      <ScrollSection direction="left">
        <Technologies />
      </ScrollSection>

      {/* Featured Facility Video Section - enters from Right */}
      <ScrollSection direction="right">
        <FeaturedVideo />
      </ScrollSection>

      {/* CTA Section - enters from Left */}
      <ScrollSection direction="left">
        <CTA />
      </ScrollSection>
    </main>
  );
}
