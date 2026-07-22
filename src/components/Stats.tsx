import { FaCubes, FaRobot, FaHandshake, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const stats = [
  {
    id: 1,
    icon: FaCubes,
    value: 4000,
    suffix: '+',
    label: 'Basic Models'
  },
  {
    id: 2,
    icon: FaRobot,
    value: 38500,
    suffix: '+',
    label: 'Variants'
  },
  {
    id: 3,
    icon: FaHandshake,
    value: 300,
    suffix: '+',
    label: 'Distribution Partners'
  },
  {
    id: 4,
    icon: FaUsers,
    value: 100000,
    suffix: '+',
    label: 'Customers'
  }
];

function SlotDigit({ digit, index }: { digit: string; index: number }) {
  if (!/^[0-9]$/.test(digit)) {
    return <span className="inline-block">{digit}</span>;
  }

  const targetNum = Number(digit);
  const numbers = [];

  // Add one full cycle to create a longer spin, then go to the target
  for (let j = 0; j < 10; j++) {
    numbers.push(j);
  }
  for (let j = 0; j <= targetNum; j++) {
    numbers.push(j);
  }

  const delay = index * 0.05; // Stagger effect from left to right

  return (
    <span className="inline-block overflow-hidden h-[1em] leading-[1em] align-top text-center">
      <motion.div
        initial={{ y: 0 }}
        whileInView={{ y: `-${numbers.length - 1}em` }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
        className="flex flex-col"
      >
        {numbers.map((n, i) => (
          <span key={i} className="h-[1em] leading-[1em] block">{n}</span>
        ))}
      </motion.div>
    </span>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const formattedValue = value.toLocaleString();
  const chars = formattedValue.split('');

  return (
    <span className="flex items-center justify-center">
      {chars.map((c, i) => (
        <SlotDigit key={i} digit={c} index={i} />
      ))}
      <span className="inline-block">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-[#3a3a3a] py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2a2a2a]/90 to-[#2a2a2a]/90 z-0" />

      <div className="relative z-10 w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-500/30">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex flex-col items-center justify-center py-8 px-4 text-center group">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-12 h-12 text-[#00A6FB]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[36px] md:text-[44px] font-bold text-white mb-2 leading-none tracking-tight">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </h3>
                <p className="text-[14px] text-gray-400 font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
