

export default function AutomationSolutions() {
  const solutions = [
    {
      icon: 'conveyor_belt',
      title: 'Autonomous Mobile Robots (AMRs)',
      features: [
        'Dynamic route planning',
        'Obstacle detection & avoidance',
        'Intelligent navigation'
      ]
    },
    {
      icon: 'inventory_2',
      title: 'Factory Logistics Automation',
      features: [
        'Internal material movement',
        'Warehouse-to-line delivery',
        'Production flow optimization'
      ]
    },
    {
      icon: 'input',
      title: 'Production flow optimization',
      features: [
        'ERP & MES connectivity',
        'Real-time operational insights'
      ]
    }
  ];

  return (
    <section className="bg-stark-white pt-20 pb-10 border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {solutions.map((solution, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="mb-6">
                <span className="material-symbols-outlined text-[48px] text-[#1E3A8A]" style={{ fontVariationSettings: "'wght' 200" }}>
                  {solution.icon}
                </span>
              </div>
              <h3 className="font-headline-md text-[28px] md:text-[32px] font-medium text-on-surface leading-tight mb-8">
                {solution.title}
              </h3>
              <ul className="space-y-4">
                {solution.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <span 
                      className="inline-block mt-1.5 w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-on-surface border-b-[4px] border-b-transparent"
                    ></span>
                    <span className="font-body-md text-[16px] text-on-surface-variant">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
