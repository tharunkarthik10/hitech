import { LayoutGrid, Wind, Zap, Cpu, ArrowDownToLine, Droplets } from 'lucide-react';

export const CATEGORIES = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Pneumatics', icon: Wind },
  { name: 'Electric Actuators', icon: Zap },
  { name: 'Robotics', icon: Cpu },
  { name: 'Vacuum', icon: ArrowDownToLine },
  { name: 'Hydraulics', icon: Droplets }
];

export const PRODUCTS = [
  // Pneumatics
  {
    id: '1',
    title: 'Tie Rod Cylinders',
    category: 'Pneumatics',
    description: 'Heavy-duty tie rod cylinders designed for high-performance industrial automation applications.',
    features: ['High durability', 'Standard ISO mounting', 'Adjustable cushioning', 'Long service life'],
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Compact Cylinders',
    category: 'Pneumatics',
    description: 'Space-saving compact cylinders ideal for tight installations without compromising force.',
    features: ['Ultra-compact design', 'High thrust force', 'Magnetic piston standard', 'Versatile mounting'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Air Preparation Unit (FRL)',
    category: 'Pneumatics',
    description: 'Filter, Regulator, and Lubricator combined units for optimal compressed air quality and tool protection.',
    features: ['Modular assembly', 'Precision pressure regulation', 'High-efficiency filtration', 'Auto-drain options'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Directional Control Valve',
    category: 'Pneumatics',
    description: 'High-flow solenoid directional control valves for precise fluid power direction.',
    features: ['Fast response time', 'Low power consumption', 'Manual override', 'Manifold mountable'],
    imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=800&auto=format&fit=crop',
  },

  // Electric Actuators
  {
    id: '5',
    title: 'Electric Cylinder',
    category: 'Electric Actuators',
    description: 'High-precision electric cylinders providing smooth and accurate linear motion.',
    features: ['Precision ball screw', 'High load capacity', 'Integrated encoder', 'Multiple motor options'],
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '6',
    title: 'Motorized Linear Actuator',
    category: 'Electric Actuators',
    description: 'Robust motorized linear actuators built for heavy lifting and positioning tasks.',
    features: ['High thrust capacity', 'IP65 protection', 'Self-locking design', 'Maintenance-free operation'],
    imageUrl: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '7',
    title: 'Rotary Actuator',
    category: 'Electric Actuators',
    description: 'Compact electric rotary actuators for high-torque rotational applications.',
    features: ['Adjustable rotation angle', 'Zero backlash', 'High torque output', 'Compact footprint'],
    imageUrl: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '8',
    title: 'Servo Motor',
    category: 'Electric Actuators',
    description: 'High-speed servo motors offering dynamic response and precise position control.',
    features: ['High resolution encoder', 'Low inertia', 'Compact size', 'Energy efficient'],
    imageUrl: 'https://images.unsplash.com/photo-1611342799915-5dd8e4983084?q=80&w=800&auto=format&fit=crop',
  },

  // Robotics
  {
    id: '9',
    title: 'Articulated Robot Arm',
    category: 'Robotics',
    description: '6-axis articulated robots offering maximum flexibility for complex assembly tasks.',
    features: ['6 degrees of freedom', 'High repeatability', 'Intuitive programming', 'Compact wrist design'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '10',
    title: 'SCARA Robot',
    category: 'Robotics',
    description: 'High-speed SCARA robots perfect for rapid pick-and-place and sorting operations.',
    features: ['Ultra-fast cycle times', 'High payload capacity', 'Space-saving design', 'Vision system integration'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '11',
    title: 'Cartesian Robot',
    category: 'Robotics',
    description: 'Linear coordinate robots designed for high accuracy and heavy payload handling.',
    features: ['Scalable work envelope', 'High rigidity', 'Simple control architecture', 'Heavy load capacity'],
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '12',
    title: 'Collaborative Robot (Cobot)',
    category: 'Robotics',
    description: 'Safe and intuitive cobots designed to work alongside human operators seamlessly.',
    features: ['Advanced safety sensors', 'Lead-through programming', 'Quick deployment', 'Lightweight design'],
    imageUrl: 'https://images.unsplash.com/photo-1620720455583-e18e6e5883ea?q=80&w=800&auto=format&fit=crop',
  },

  // Vacuum
  {
    id: '13',
    title: 'Vacuum Pad / Suction Cup',
    category: 'Vacuum',
    description: 'Durable vacuum pads available in various materials for handling diverse workpieces.',
    features: ['Multiple material options (Silicone, NBR)', 'Various shapes (Flat, Bellows)', 'High grip force', 'Easy replacement'],
    imageUrl: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '14',
    title: 'Vacuum Ejector',
    category: 'Vacuum',
    description: 'Compact and efficient vacuum ejectors utilizing compressed air to generate strong vacuum.',
    features: ['No moving parts', 'Instantaneous vacuum generation', 'Compact and lightweight', 'Integrated silencer'],
    imageUrl: 'https://images.unsplash.com/photo-1581093588497-2a4204d1f2b6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '15',
    title: 'Vacuum Pump',
    category: 'Vacuum',
    description: 'High-capacity vacuum pumps ensuring reliable and continuous vacuum generation.',
    features: ['High flow rate', 'Low noise operation', 'Oil-free options available', 'Durable construction'],
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '16',
    title: 'Vacuum Filter',
    category: 'Vacuum',
    description: 'Inline vacuum filters to protect ejectors and pumps from dust and debris.',
    features: ['High filtration efficiency', 'Easy maintenance', 'Clear bowl for inspection', 'Low pressure drop'],
    imageUrl: 'https://images.unsplash.com/photo-1581092926227-2c90b6a67a07?q=80&w=800&auto=format&fit=crop',
  },

  // Hydraulics
  {
    id: '17',
    title: 'Hydraulic Cylinder',
    category: 'Hydraulics',
    description: 'Heavy-duty hydraulic cylinders engineered for extreme force and demanding environments.',
    features: ['High pressure rating', 'Corrosion resistant rod', 'Custom stroke lengths', 'Robust seals'],
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '18',
    title: 'Hydraulic Pump',
    category: 'Hydraulics',
    description: 'High-pressure hydraulic pumps ensuring steady flow and reliable power delivery.',
    features: ['Variable displacement', 'High efficiency', 'Low noise', 'Long operational life'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '19',
    title: 'Hydraulic Control Valve',
    category: 'Hydraulics',
    description: 'Precision hydraulic directional control valves for robust fluid power management.',
    features: ['Precise metering', 'High flow capacity', 'Manual and electrical options', 'Compact monoblock design'],
    imageUrl: 'https://images.unsplash.com/photo-1581092163013-1b918db4314c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: '20',
    title: 'Hydraulic Power Pack',
    category: 'Hydraulics',
    description: 'Complete hydraulic power units integrating pump, motor, and reservoir in one compact package.',
    features: ['Plug-and-play setup', 'Integrated pressure relief', 'Customizable tank size', 'Energy efficient motor'],
    imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
  }
];
