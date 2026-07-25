import HeroSlider from '../components/HeroSlider'

export default function Storage() {
  return (
    <main className="elegant-grid overflow-x-hidden">
      <HeroSlider 
        title="Advanced Storage Solutions"
        description="Our state-of-the-art storage facilities feature automated racking and real-time inventory management. We ensure your products are stored securely and distributed with maximum efficiency."
        videoSrc="/boomerang.mp4"
        buttonText="Explore Logistics"
      />
      {/* Additional storage-specific sections can go here in the future */}
    </main>
  );
}
