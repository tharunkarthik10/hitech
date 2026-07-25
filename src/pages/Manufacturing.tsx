import HeroSlider from '../components/HeroSlider'

export default function Manufacturing() {
  return (
    <main className="elegant-grid overflow-x-hidden">
      <HeroSlider 
        title="Precision Manufacturing Capabilities"
        description="Our manufacturing division brings together cutting-edge technology and decades of expertise. From CNC machining to heavy fabrication, we deliver ISO-certified components with unmatched precision."
        videoSrc="/boomerang_production.mp4"
        buttonText="View Capabilities"
      />
      {/* Additional manufacturing-specific sections can go here in the future */}
    </main>
  );
}
