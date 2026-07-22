import { ArrowRight, CheckCircle2, Factory, Settings, Users, LineChart, Shield, Wrench, Search, Zap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const whyUs = [
    { icon: Shield, title: "ISO Certified", desc: "Highest standards in manufacturing and quality control." },
    { icon: Users, title: "20+ Years Experience", desc: "Decades of industry expertise in industrial automation." },
    { icon: LineChart, title: "Data-Driven Approach", desc: "Proven methodologies that guarantee ROI." }
  ];

  const process = [
    { num: "01", title: "Discovery", desc: "Comprehensive audit of your existing manufacturing setup and challenges." },
    { num: "02", title: "Strategy", desc: "Custom-tailored blueprint designed to optimize your specific workflows." },
    { num: "03", title: "Execution", desc: "Seamless implementation with zero downtime for your critical operations." },
    { num: "04", title: "Results", desc: "Continuous monitoring and scaling to ensure sustainable growth." }
  ];

  const services = [
    {
      icon: Settings,
      title: "Process Optimization",
      desc: "Identify bottlenecks in your current assembly lines and implement lean manufacturing techniques to reduce waste by up to 30%.",
      includes: ["Workflow Analysis", "Lean Integration", "Capacity Planning"]
    },
    {
      icon: Factory,
      title: "Automation Consulting",
      desc: "End-to-end consulting for integrating robotics, PLCs, and smart conveyor systems into your existing infrastructure.",
      includes: ["Hardware Selection", "System Architecture", "ROI Projection"]
    },
    {
      icon: Wrench,
      title: "Preventative Maintenance",
      desc: "IoT-driven maintenance plans that predict equipment failures before they happen, ensuring 99.9% uptime.",
      includes: ["Sensor Installation", "24/7 Monitoring", "Emergency Support"]
    }
  ];

  const targetAudience = [
    { title: "Plant Managers", desc: "Looking to increase daily output without expanding the workforce." },
    { title: "Operations Directors", desc: "Tasked with reducing operational costs and improving safety standards." },
    { title: "Quality Controllers", desc: "Needing precision tools and standardized processes to eliminate defects." }
  ];

  const faqs = [
    { q: "How long does the initial discovery phase take?", a: "Typically, our discovery audits take between 3 to 5 days depending on the size of your facility." },
    { q: "Do you offer post-implementation support?", a: "Yes, all our service packages include 12 months of dedicated technical support and training." },
    { q: "How do you price your services?", a: "We offer fixed-bid pricing for clear scopes of work, and retainer models for ongoing preventative maintenance. Every project starts with a transparent quote." }
  ];

  return (
    <main className="pt-20 bg-gray-50 pb-20">
      
      {/* 1. Clear Value Proposition (Hero) */}
      <section className="bg-blue-900 text-white py-24 px-8 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            We Streamline Your Manufacturing Process to Cut Costs by 20%
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-10">
            End-to-end industrial automation and consulting services designed to scale your production and eliminate downtime.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-white text-blue-900 px-8 py-4 font-bold tracking-[0.1em] uppercase hover:bg-gray-100 transition-colors">
            Book a Free Audit <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* 2. The "Why Us" (Expertise & Trust) */}
      <section className="py-20 px-8 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-[0.1em] uppercase mb-4">Why Choose Us</h2>
            <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {whyUs.map((item, idx) => (
              <div key={idx} className="text-center p-8 bg-gray-50 border border-gray-100">
                <item.icon className="w-12 h-12 text-blue-900 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Process / How it Works */}
      <section className="py-20 px-8 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-[0.1em] uppercase mb-4">Our Process</h2>
            <p className="text-gray-600">A proven methodology for seamless integration.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-blue-100 mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{step.title}</h3>
                <p className="text-gray-600 relative z-10">{step.desc}</p>
                {idx !== process.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-[2px] bg-blue-100 -z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Service Breakdown / Scope of Work */}
      <section className="py-20 px-8 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-[0.1em] uppercase mb-4">What We Offer</h2>
            <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((svc, idx) => (
              <div key={idx} className="border border-gray-200 p-8 hover:border-blue-900 transition-colors bg-white group">
                <svc.icon className="w-10 h-10 text-blue-900 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{svc.title}</h3>
                <p className="text-gray-600 mb-6">{svc.desc}</p>
                <div className="space-y-2">
                  <span className="text-sm font-bold text-gray-900 uppercase tracking-wider block mb-3">Includes:</span>
                  {svc.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-900 flex-shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Target Audience */}
      <section className="py-20 px-8 md:px-12 bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-[0.1em] uppercase mb-4">Who We Serve</h2>
            <p className="text-blue-200">Our services are purpose-built for industrial leaders.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {targetAudience.map((audience, idx) => (
              <div key={idx} className="bg-blue-800 p-8 border border-blue-700">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                  <Target className="w-6 h-6 text-blue-300" />
                  {audience.title}
                </h3>
                <p className="text-blue-100">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Case Studies & Testimonials */}
      <section className="py-20 px-8 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-[0.1em] uppercase mb-4">Proven Results</h2>
            <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-10 border border-gray-100">
              <div className="flex gap-4 mb-6">
                <div className="bg-blue-100 text-blue-900 px-3 py-1 font-bold text-sm">Automotive</div>
                <div className="bg-green-100 text-green-900 px-3 py-1 font-bold text-sm">+45% Efficiency</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Auto Parts Manufacturer</h3>
              <p className="text-gray-600 mb-6 italic">"By implementing Hitech's automated conveyor analysis, we reduced our line bottlenecks entirely. The ROI was realized in just 4 months."</p>
              <div className="font-bold text-gray-900">- Sarah Jenkins, VP of Operations</div>
            </div>
            <div className="bg-gray-50 p-10 border border-gray-100">
              <div className="flex gap-4 mb-6">
                <div className="bg-blue-100 text-blue-900 px-3 py-1 font-bold text-sm">Electronics</div>
                <div className="bg-green-100 text-green-900 px-3 py-1 font-bold text-sm">Zero Defects</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Techtronics Inc.</h3>
              <p className="text-gray-600 mb-6 italic">"Their consulting process completely revamped our QA pipeline. We've gone from a 2% defect rate to near zero."</p>
              <div className="font-bold text-gray-900">- Michael Chen, Plant Manager</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="py-20 px-8 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-[0.1em] uppercase mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-blue-900 mx-auto"></div>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex gap-3">
                  <span className="text-blue-900">Q.</span> {faq.q}
                </h3>
                <p className="text-gray-600 pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Consultation / Lead-Gen CTA */}
      <section id="contact" className="py-24 px-8 md:px-12 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ready to Optimize Your Operations?</h2>
          <p className="text-gray-400 text-xl mb-10">
            Schedule a free 30-minute consultation with our engineering experts to discuss your specific challenges.
          </p>
          <button className="bg-blue-600 text-white px-10 py-4 font-bold tracking-[0.2em] uppercase hover:bg-blue-700 transition-colors">
            Schedule a Consultation
          </button>
        </div>
      </section>
      
    </main>
  );
}
