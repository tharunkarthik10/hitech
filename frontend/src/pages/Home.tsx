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
  delay?: number;
}

function ScrollSection({ children, delay = 0 }: ScrollSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(3px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ 
        duration: 0.75, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="w-full"
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
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <HeroSlider />
      </motion.div>

      {/* Clients Section */}
      <ScrollSection>
        <Clients />
      </ScrollSection>

      {/* Why Choose Us Section */}
      <ScrollSection>
        <WhyChooseUs />
      </ScrollSection>

      {/* About Us Section */}
      <ScrollSection>
        <AboutSection />
      </ScrollSection>

      {/* Featured Solutions / Specialized Industries */}
      <ScrollSection>
        <FeaturedSolutions />
      </ScrollSection>

      {/* Technologies Section */}
      <ScrollSection>
        <Technologies />
      </ScrollSection>

      {/* Featured Facility Video Section */}
      <ScrollSection>
        <FeaturedVideo />
      </ScrollSection>

      {/* CTA Section */}
      <ScrollSection>
        <CTA />
      </ScrollSection>
    </main>
  );
}
