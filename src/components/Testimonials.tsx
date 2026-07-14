import Partners from './Partners';
import AutomationSolutions from './AutomationSolutions';

export default function Testimonials() {
  return (
    <>
      <AutomationSolutions />
      <Partners />

      {/* CTA Section */}
      <section className="bg-surface-bone py-24 border-t border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter text-center space-y-6">
          <h2 
            className="italic text-[20px] md:text-[28px] text-on-surface max-w-4xl mx-auto leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}
          >
            "A satisfied customer is the best business strategy of all."
          </h2>
          <p 
            className="font-label-caps text-[18px] md:text-[20px] text-on-surface tracking-widest uppercase mt-6 font-bold"
          >
            — Michael LeBoeuf
          </p>
        </div>
      </section>
    </>
  );
}
