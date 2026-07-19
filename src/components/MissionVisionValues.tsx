import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, Zap, Users, Leaf } from 'lucide-react';

export default function MissionVisionValues() {
  const values = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: 'Integrity', desc: 'Uncompromising standards in every product and relationship we build.' },
    { icon: <Zap className="w-5 h-5" />, title: 'Innovation', desc: 'Pioneering new technologies and solutions for modern engineering.' },
    { icon: <Users className="w-5 h-5" />, title: 'Collaboration', desc: 'Partnering closely with clients for sustained mutual success.' },
    { icon: <Leaf className="w-5 h-5" />, title: 'Sustainability', desc: 'Eco-conscious manufacturing methods for a better future.' },
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#051923] mb-4 tracking-tight"
          >
            Our Driving Force
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 text-lg"
          >
            Guided by a clear vision and anchored by strong core values.
          </motion.p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-slate-50 text-[#006494] rounded-2xl flex items-center justify-center border border-slate-100">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#051923] mb-3">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower industries globally with superior material handling equipment that enhances operational efficiency and safety through innovative design and uncompromising manufacturing excellence.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-slate-50 text-[#006494] rounded-2xl flex items-center justify-center border border-slate-100">
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#051923] mb-3">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the global leader in kinetic precision engineering, setting the absolute benchmark for quality, reliability, and sustainability in the material handling industry.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-bold text-center text-[#051923] mb-12">Core Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="text-center group cursor-default"
              >
                <div className="w-16 h-16 mx-auto bg-slate-50 rounded-full flex items-center justify-center text-[#006494] mb-5 border border-slate-100 group-hover:scale-110 group-hover:bg-[#006494] group-hover:text-white transition-all duration-300">
                  {val.icon}
                </div>
                <h4 className="text-lg font-bold text-[#051923] mb-2">{val.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed px-2">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
