import { 
  Zap, Layers, Maximize, Clock, Search, Package, ShieldCheck, 
  Cpu, Wrench, Settings, Factory, Boxes, CheckSquare, Truck
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Capability {
  id: string;
  title: string;
  desc: string;
  icon: LucideIcon;
  specs: string[];
  image: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  desc: string;
  detail: string;
  icon: LucideIcon;
}

export interface Machine {
  id: string;
  name: string;
  tag: string;
  desc: string;
  specs: { label: string; value: string }[];
  image: string;
}

export interface StatItem {
  number: string;
  label: string;
  desc: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface UnitData {
  id: 'laser-cutting' | 'manufacturing' | 'production';
  theme: {
    accentColor: 'red' | 'blue' | 'orange';
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    accentHex: string;
    gradientFromTo: string;
    buttonBg: string;
    buttonHover: string;
    ringColor: string;
    heroGlow: string;
  };
  breadcrumb: string;
  unitName: string;
  tagline: string;
  heroImage: string;
  heroBadge: string;
  
  overview: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    image: string;
    floatingBadge: {
      number: string;
      label: string;
    };
  };

  capabilities: Capability[];

  process: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
  };

  machinery: {
    title: string;
    subtitle: string;
    machines: Machine[];
  };

  whyChooseUs: {
    title: string;
    subtitle: string;
    stats: StatItem[];
  };

  gallery: {
    title: string;
    subtitle: string;
    items: GalleryItem[];
  };

  cta: {
    title: string;
    desc: string;
    buttonText: string;
  };
}

export const laserCuttingData: UnitData = {
  id: 'laser-cutting',
  theme: {
    accentColor: 'blue',
    badgeBg: 'bg-[#006494]/10',
    badgeText: 'text-[#006494]',
    badgeBorder: 'border-[#006494]/20',
    accentHex: '#00A6FB',
    gradientFromTo: 'from-[#006494] to-[#00A6FB]',
    buttonBg: 'bg-[#051923] hover:bg-[#006494] text-white',
    buttonHover: 'hover:shadow-[#00A6FB]/25',
    ringColor: 'ring-[#00A6FB]',
    heroGlow: 'from-[#006494]/20 via-[#00A6FB]/10 to-transparent'
  },
  breadcrumb: 'Home > Units > Laser Cutting',
  unitName: 'Laser Cutting Division',
  tagline: 'High-power CNC fiber laser cutting delivering micron-level accuracy, clean burr-free edges, and zero thermal distortion.',
  heroImage: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1920',
  heroBadge: 'Multi-kW CNC Fiber Lasers',

  overview: {
    title: 'Precision Metal Profile Cutting',
    subtitle: 'ENGINEERING EXCELLENCE IN SHEET METAL',
    paragraphs: [
      'The Laser Cutting Division at HiTech Engineering specializes in ultra-high precision fiber laser cutting for sheet metal and structural profiles. Operating multi-kilowatt CNC laser machinery equipped with automatic shuttle tables and CAD/CAM nesting software, we process mild steel, stainless steel, aluminum, brass, and copper with exceptional speed.',
      'Our state-of-the-art cutting systems eliminate secondary edge finishing, providing clean, burr-free profiles ready for immediate assembly, bending, or welding. Whether for intricate prototype cutouts or high-volume industrial batches, we deliver uncompromising quality and rapid turnaround times.'
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    floatingBadge: {
      number: '25mm',
      label: 'Max Cut Thickness'
    }
  },

  capabilities: [
    {
      id: 'cap-1',
      title: 'Precision Sheet Cutting',
      desc: 'High-speed nitrogen and oxygen assisted laser cutting up to 25mm mild steel and 20mm stainless steel with tight tolerances.',
      icon: Zap,
      specs: ['Up to 25mm Mild Steel', 'Up to 20mm Stainless', '±0.05mm Repeatability'],
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'cap-2',
      title: 'Intricate Nesting & Profiles',
      desc: 'Advanced CAD/CAM nesting algorithms to optimize sheet utilization, reducing material waste and lowering component cost.',
      icon: Layers,
      specs: ['Intricate Geometries', 'CAD/CAM Auto Nesting', 'Zero Tool Wear'],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'cap-3',
      title: '3D Tube & Pipe Cutting',
      desc: 'Specialized 3D fiber laser processing for round, square, and rectangular structural metal tubing with bevel coping.',
      icon: Maximize,
      specs: ['12m Tube Lengths', '220mm Pipe Diameter', 'Complex Bevel Angles'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'cap-4',
      title: 'Prototype & Batch Production',
      desc: 'Rapid setup turnarounds for single custom prototypes up to continuous automated high-volume production runs.',
      icon: Clock,
      specs: ['Fast Setup Times', 'Flexible Batch Runs', '24-Hour Dispatch Available'],
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
    }
  ],

  process: {
    title: 'Laser Cutting Process',
    subtitle: 'FROM CAD VECTOR TO PRECISION METAL COMPONENT',
    steps: [
      {
        number: '01',
        title: 'CAD Import & Nesting',
        desc: 'Customer DXF/STEP files are imported and optimized using automated nesting software.',
        detail: 'Calculates optimal material utilization and gas cutting toolpaths.',
        icon: Search
      },
      {
        number: '02',
        title: 'Material Setup',
        desc: 'Certified metal sheets are loaded onto dual shuttle beds with surface flatness verification.',
        detail: 'Automated sheet alignment and focus distance calibration.',
        icon: Layers
      },
      {
        number: '03',
        title: 'High-Speed Laser Cut',
        desc: 'Fiber laser cuts intricate profiles at speeds up to 40m/min with assisting gas streams.',
        detail: 'Dynamic power control prevents thermal distortion across fine details.',
        icon: Zap
      },
      {
        number: '04',
        title: 'Quality Inspection',
        desc: 'Components undergo edge quality check and CMM optical dimensional measurement.',
        detail: '100% burr inspection and batch tagging for full traceability.',
        icon: Package
      }
    ]
  },

  machinery: {
    title: 'Advanced Equipment Highlight',
    subtitle: 'STATE-OF-THE-ART CNC FIBER LASER TECHNOLOGY',
    machines: [
      {
        id: 'mach-1',
        name: '12kW CNC Fiber Laser Cutter',
        tag: 'Sheet Metal Workhorse',
        desc: 'Ultra-high power fiber laser system equipped with dynamic focus head and dual shuttle automation bed.',
        specs: [
          { label: 'Power', value: '12,000 Watts' },
          { label: 'Bed Size', value: '4000mm x 2000mm' },
          { label: 'Accuracy', value: '±0.03mm' },
          { label: 'Capacity', value: '25mm MS / 20mm SS' }
        ],
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mach-2',
        name: '3D Fiber Laser Tube Machine',
        tag: 'Structural Tubing Specialist',
        desc: 'Dedicated 3D laser system for cutting structural pipes, channels, and box tubing with automated bundle loading.',
        specs: [
          { label: 'Power', value: '6,000 Watts' },
          { label: 'Max Tube Length', value: '12 Meters' },
          { label: 'Diameter Range', value: '20mm - 220mm' },
          { label: 'Bevel Cutting', value: '±45 Degrees' }
        ],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mach-3',
        name: 'Automated Material Shuttle & Tower',
        tag: '24/7 Continuous Operation',
        desc: 'Automated raw material loading tower with vacuum suction pickers for non-stop lights-out manufacturing.',
        specs: [
          { label: 'Tower Stations', value: '10 Pallet Trays' },
          { label: 'Load Capacity', value: '3,000 kg per Tray' },
          { label: 'Cycle Time', value: '45 Seconds Swap' },
          { label: 'Operation', value: '24/7 Lights-Out' }
        ],
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },

  whyChooseUs: {
    title: 'Why Choose Laser Cutting',
    subtitle: 'PRECISION, SPEED AND UNMATCHED EDGE QUALITY',
    stats: [
      {
        number: '99.9%',
        label: 'Precision Accuracy',
        desc: 'Micron-level cut consistency maintained across production runs.'
      },
      {
        number: '25mm',
        label: 'Max Cut Capacity',
        desc: 'Clean cuts in heavy-gauge mild steel and stainless plates.'
      },
      {
        number: '500+',
        label: 'Completed Projects',
        desc: 'Delivered for automotive, energy, and enclosure manufacturers.'
      },
      {
        number: '24 Hours',
        label: 'Fast Quote Turnaround',
        desc: 'Rapid DFM feedback and competitive quote response.'
      }
    ]
  },

  gallery: {
    title: 'Work Snapshot & Gallery',
    subtitle: 'REAL LASER-CUT COMPONENTS AND SHEET METAL WORK',
    items: [
      {
        id: 'gal-1',
        title: 'Precision Stainless Steel Gear Cutout',
        category: 'Laser Profile',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gal-2',
        title: 'Perforated Aluminum Architectural Panel',
        category: 'Custom Nesting',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gal-3',
        title: 'Heavy Mild Steel Bracket Assembly',
        category: 'Structural Steel',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gal-4',
        title: 'Laser Cut Tube Frame Component',
        category: '3D Tube Laser',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gal-5',
        title: 'Copper Electrical Busbar Connector',
        category: 'Non-Ferrous Metals',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'gal-6',
        title: 'Intricate Sheet Metal Chassis Housing',
        category: 'Enclosure Part',
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },

  cta: {
    title: 'Ready for High-Precision Laser Cutting?',
    desc: 'Send us your DXF or STEP drawings today for an instant DFM review and competitive quotation.',
    buttonText: 'Get a Quote for Laser Cutting'
  }
};

export const manufacturingData: UnitData = {
  id: 'manufacturing',
  theme: {
    accentColor: 'blue',
    badgeBg: 'bg-[#006494]/10',
    badgeText: 'text-[#006494]',
    badgeBorder: 'border-[#006494]/20',
    accentHex: '#00A6FB',
    gradientFromTo: 'from-[#006494] to-[#00A6FB]',
    buttonBg: 'bg-[#051923] hover:bg-[#006494] text-white',
    buttonHover: 'hover:shadow-[#00A6FB]/25',
    ringColor: 'ring-[#00A6FB]',
    heroGlow: 'from-[#006494]/20 via-[#00A6FB]/10 to-transparent'
  },
  breadcrumb: 'Home > Units > Manufacturing',
  unitName: 'Manufacturing Division',
  tagline: 'Heavy-duty CNC machining, precision mechanical component fabrication, and custom engineering for demanding industries.',
  heroImage: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1920',
  heroBadge: '5-Axis CNC Precision Facility',

  overview: {
    title: 'Precision Machining & Metal Fabrication',
    subtitle: 'TAILORED ENGINEERING & HEAVY FABRICATION',
    paragraphs: [
      "HiTech's Manufacturing Division delivers comprehensive machining and metal fabrication services engineered for mission-critical reliability. Equipped with multi-axis CNC mills, lathes, and heavy hydraulic presses, we produce high-precision custom parts and structural sub-assemblies.",
      "From raw metal billet to finished coated assemblies, our manufacturing facility enforces strict ISO quality standards across every production run. Our experienced engineers partner with clients from initial prototyping through full serial component manufacturing."
    ],
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    floatingBadge: {
      number: '0.005mm',
      label: 'Machining Tolerance'
    }
  },

  capabilities: [
    {
      id: 'mcap-1',
      title: 'Multi-Axis CNC Machining',
      desc: 'High-precision 3-axis and 5-axis CNC milling and turning centers producing complex 3D metal components.',
      icon: Cpu,
      specs: ['5-Axis Machining', '±0.005mm Tolerance', 'Sub-Micron Surface Finish'],
      image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mcap-2',
      title: 'Heavy Sheet Metal Fabrication',
      desc: 'Precision hydraulic press brake bending, TIG/MIG welding, punching, and structural metal forming.',
      icon: Wrench,
      specs: ['320-Ton Press Bed', 'Robotic TIG/MIG Welding', 'Custom Enclosure Forming'],
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mcap-3',
      title: 'Tooling & Die Fabrication',
      desc: 'Custom manufacturing of precision jigs, fixtures, stamping dies, and industrial mold tooling.',
      icon: Settings,
      specs: ['Custom Fixture Design', 'Stamping Tooling', 'Hardened Alloy Steels'],
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mcap-4',
      title: 'Quality Inspection & Metrology',
      desc: 'Bridge CMM dimensional measuring, surface roughness testing, and non-destructive material analysis.',
      icon: ShieldCheck,
      specs: ['CMM Coordinate Measurement', 'Material Certification', '100% Quality Audits'],
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
    }
  ],

  process: {
    title: 'Manufacturing Process',
    subtitle: 'STRUCTURED PATH TO HIGH-PRECISION COMPONENTS',
    steps: [
      {
        number: '01',
        title: 'DFM & Tooling Audit',
        desc: 'Engineers review 3D CAD models to optimize toolpaths and machining efficiency.',
        detail: 'Simulates metal removal and tool clearances before machining.',
        icon: Search
      },
      {
        number: '02',
        title: 'Material Procurement',
        desc: 'Certified raw alloy billets and stock materials are prepped and fixture mounted.',
        detail: 'Includes chemical composition and mill test certificate verification.',
        icon: Cpu
      },
      {
        number: '03',
        title: 'CNC Machining Run',
        desc: 'High-speed multi-axis CNC machines cut, turn, and finish component features.',
        detail: 'In-process probe monitoring ensures continuous dimensional control.',
        icon: Settings
      },
      {
        number: '04',
        title: 'CMM Check & Surface Finish',
        desc: 'Components undergo 3D CMM inspection, anodizing, or powder coating.',
        detail: 'Final inspection certificates attached before secure packaging.',
        icon: ShieldCheck
      }
    ]
  },

  machinery: {
    title: 'Advanced Machinery Highlight',
    subtitle: 'STATE-OF-THE-ART INDUSTRIAL MANUFACTURING EQUIPMENT',
    machines: [
      {
        id: 'mmach-1',
        name: '5-Axis CNC Milling Center',
        tag: 'Complex Geometry Specialist',
        desc: 'Simultaneous 5-axis CNC machining center engineered for aerospace, automotive, and complex toolmaking.',
        specs: [
          { label: 'Spindle Speed', value: '20,000 RPM' },
          { label: 'Travel (X/Y/Z)', value: '1000 x 800 x 600 mm' },
          { label: 'Accuracy', value: '±0.005mm' },
          { label: 'Tool Changer', value: '60 Tool Capacity' }
        ],
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mmach-2',
        name: '320-Ton CNC Press Brake',
        tag: 'Heavy Bending Powerhouse',
        desc: 'Multi-axis CNC hydraulic bending brake with laser angle sensor and 4-meter bending bed.',
        specs: [
          { label: 'Bending Force', value: '320 Tons' },
          { label: 'Bed Length', value: '4000 mm' },
          { label: 'Backgauge', value: '6-Axis CNC' },
          { label: 'Angle Sensor', value: 'Laser Real-time' }
        ],
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mmach-3',
        name: 'High-Precision CNC Lathe Center',
        tag: 'Cylindrical Turning Master',
        desc: 'Heavy-duty CNC lathe with live tooling for integrated turning, cross-milling, and precision threading.',
        specs: [
          { label: 'Max Swing', value: '500 mm' },
          { label: 'Turning Length', value: '1500 mm' },
          { label: 'Live Tooling', value: '12 Station Turret' },
          { label: 'Bar Feeder', value: 'Automated 3m' }
        ],
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },

  whyChooseUs: {
    title: 'Why Choose Manufacturing',
    subtitle: 'UNWAVERING QUALITY, EXPERIENCE AND INDUSTRIAL CAPABILITY',
    stats: [
      {
        number: '15+ Years',
        label: 'Industry Experience',
        desc: 'Proven track record of manufacturing precision parts for global OEMs.'
      },
      {
        number: '1,200+',
        label: 'Projects Delivered',
        desc: 'High-complexity mechanical assemblies successfully produced.'
      },
      {
        number: '99.9%',
        label: 'On-Time Delivery',
        desc: 'Strict scheduling and supply chain control across all runs.'
      },
      {
        number: '0.005mm',
        label: 'Tight Tolerances',
        desc: 'Micron-level accuracy for critical engineering applications.'
      }
    ]
  },

  gallery: {
    title: 'Work Snapshot & Gallery',
    subtitle: 'PRECISION CNC MACHINED PARTS AND FABRICATED ASSEMBLIES',
    items: [
      {
        id: 'mgal-1',
        title: '5-Axis Milled Aluminum Aerospace Housing',
        category: 'CNC Milling',
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mgal-2',
        title: 'High-Tonnage Formed Steel Frame',
        category: 'Press Brake',
        image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mgal-3',
        title: 'Precision Turned Stainless Steel Shaft',
        category: 'CNC Lathe',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mgal-4',
        title: 'TIG Welded Industrial Pressure Vessel',
        category: 'Custom Welding',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mgal-5',
        title: 'Custom Metal Stamping Die Tooling',
        category: 'Tooling & Dies',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mgal-6',
        title: 'Anodized Electrical Enclosure Body',
        category: 'Finished Component',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },

  cta: {
    title: 'Ready to Start Your Manufacturing Project?',
    desc: 'Talk with our senior engineering team to discuss custom CNC machining, tooling, or heavy metal fabrication.',
    buttonText: 'Get a Quote for Manufacturing'
  }
};

export const productionData: UnitData = {
  id: 'production',
  theme: {
    accentColor: 'blue',
    badgeBg: 'bg-[#006494]/10',
    badgeText: 'text-[#006494]',
    badgeBorder: 'border-[#006494]/20',
    accentHex: '#00A6FB',
    gradientFromTo: 'from-[#006494] to-[#00A6FB]',
    buttonBg: 'bg-[#051923] hover:bg-[#006494] text-white',
    buttonHover: 'hover:shadow-[#00A6FB]/25',
    ringColor: 'ring-[#00A6FB]',
    heroGlow: 'from-[#006494]/20 via-[#00A6FB]/10 to-transparent'
  },
  breadcrumb: 'Home > Units > Production',
  unitName: 'Production Division',
  tagline: 'High-speed automated assembly lines, scalable contract manufacturing, and continuous multi-shift production runs.',
  heroImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920',
  heroBadge: 'High-Volume Assembly Lines',

  overview: {
    title: 'High-Volume Contract Production',
    subtitle: 'SCALABLE ASSEMBLY & CONTINUOUS MULTI-SHIFT OPERATIONS',
    paragraphs: [
      "HiTech's Production Division powers large-scale contract manufacturing and high-throughput mechanical assembly. Combining automated robotic workstations, lean Kanban inventory logistics, and continuous multi-shift operations, we scale your product from pilot runs to tens of thousands of units monthly.",
      "We manage full supply chain assembly, kitting, sub-assembly testing, and final drop-ship packaging with uncompromising efficiency. Every line is monitored by automated torque logging, vision check sensors, and rigorous quality gates."
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    floatingBadge: {
      number: '10,000+',
      label: 'Units / Month'
    }
  },

  capabilities: [
    {
      id: 'pcap-1',
      title: 'Automated Assembly Lines',
      desc: 'Flexible conveyor-driven assembly workstations equipped with pneumatic torque control and automated part feeders.',
      icon: Factory,
      specs: ['Conveyor-Assisted Lines', 'Pneumatic Fastening', 'Integrated Torque Verification'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pcap-2',
      title: 'Contract Manufacturing',
      desc: 'Scalable production capacity built for OEM component runs, complete sub-assemblies, and total product fulfillment.',
      icon: Boxes,
      specs: ['Scalable Volume', 'OEM Component Supply', 'Full Batch Traceability'],
      image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pcap-3',
      title: 'Sub-Assembly & Custom Kitting',
      desc: 'Hardware pre-assembly, custom component bundling, electrical harness staging, and automated barcoding.',
      icon: CheckSquare,
      specs: ['Custom Kit Bundling', 'Harness Assembly', 'Automated Barcode Labeling'],
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pcap-4',
      title: 'End-of-Line Testing & Logistics',
      desc: '100% functional load testing, electrical continuity checks, protective crating, and direct distribution dispatch.',
      icon: Truck,
      specs: ['100% Functional Test', 'Custom Protective Crating', 'Global Logistics Dispatch'],
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
    }
  ],

  process: {
    title: 'Production Workflow',
    subtitle: 'LEAN, CONTINUOUS AND RIGOROUSLY CONTROLLED',
    steps: [
      {
        number: '01',
        title: 'Line Ergonomics & Setup',
        desc: 'Workstations and automated robotic feeders are prepped and calibrated for specific part runs.',
        detail: 'Configures digital torque tools and Poka-Yoke error proofing.',
        icon: Factory
      },
      {
        number: '02',
        title: 'Kanban Material Staging',
        desc: 'Raw sub-components are staged continuously at assembly stations using lean Kanban logistics.',
        detail: 'Prevents line stoppage through real-time inventory monitoring.',
        icon: Boxes
      },
      {
        number: '03',
        title: 'Automated Assembly',
        desc: 'Robotic pick-and-place arms and skilled operators execute sequential assembly operations.',
        detail: 'Torque and alignment sensors log digital compliance for every unit.',
        icon: CheckSquare
      },
      {
        number: '04',
        title: 'Functional Test & Packaging',
        desc: 'Finished units undergo functional validation before automated shrink-wrapping and palletizing.',
        detail: 'Barcode tracking assigned for immediate warehousing or shipping.',
        icon: Truck
      }
    ]
  },

  machinery: {
    title: 'Production Machinery Highlight',
    subtitle: 'HIGH-THROUGHPUT AUTOMATION AND ASSEMBLY SYSTEMS',
    machines: [
      {
        id: 'pmach-1',
        name: '6-Axis Robotic Assembly Cell',
        tag: 'Robotic Automation Master',
        desc: 'Articulated robotic arm cell for high-speed pick-and-place, automated fastening, and precision adhesive dispensing.',
        specs: [
          { label: 'Payload', value: '20 kg' },
          { label: 'Reach', value: '1850 mm' },
          { label: 'Repeatability', value: '±0.02 mm' },
          { label: 'Cycle Speed', value: '1.2 Sec / Cycle' }
        ],
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pmach-2',
        name: 'Continuous Conveyor Assembly System',
        tag: 'Multi-Station Assembly Line',
        desc: 'Variable speed conveyor line with integrated digital torque stations, optical sensors, and ergonomic operator bays.',
        specs: [
          { label: 'Line Length', value: '35 Meters' },
          { label: 'Workstations', value: '16 Integrated Bays' },
          { label: 'Speed Range', value: '0.5 - 10 m/min' },
          { label: 'Sensor Gates', value: 'Vision Poka-Yoke' }
        ],
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pmach-3',
        name: 'Automated Packaging & Strapping Line',
        tag: 'End-of-Line Packaging',
        desc: 'High-throughput packaging line providing vacuum sealing, automatic box strapping, and pallet wrapping.',
        specs: [
          { label: 'Capacity', value: '500 Boxes / Hour' },
          { label: 'Strapping Force', value: 'Adjustable Tension' },
          { label: 'Pallet Wrap', value: 'Auto Turntable' },
          { label: 'Labeling', value: 'Automated Barcode Print' }
        ],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },

  whyChooseUs: {
    title: 'Why Choose Production',
    subtitle: 'SCALABLE CAPACITY, 24/7 OPERATIONS AND RELIABLE TURNAROUND',
    stats: [
      {
        number: '10,000+',
        label: 'Monthly Unit Capacity',
        desc: 'High-throughput production runs to meet massive market demand.'
      },
      {
        number: '24/7',
        label: 'Multi-Shift Operation',
        desc: 'Non-stop assembly ensuring zero delivery bottlenecking.'
      },
      {
        number: '99.95%',
        label: 'Functional Pass Rate',
        desc: 'Strict end-of-line testing preventing field failures.'
      },
      {
        number: '100%',
        label: 'Batch Traceability',
        desc: 'Full barcode tracking logged across all assembled components.'
      }
    ]
  },

  gallery: {
    title: 'Work Snapshot & Gallery',
    subtitle: 'ASSEMBLY LINES, CONTRACT PRODUCTS AND PRODUCTION RUNS',
    items: [
      {
        id: 'pgal-1',
        title: 'Robotic Pick & Place Assembly Station',
        category: 'Robotic Cell',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pgal-2',
        title: 'Conveyor-Driven Mechanical Product Line',
        category: 'Assembly Line',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pgal-3',
        title: 'Palletized Finished Cargo Ready for Dispatch',
        category: 'Packaging & Shipping',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pgal-4',
        title: 'Automated Sub-Assembly Hardware Kitting',
        category: 'Custom Kitting',
        image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pgal-5',
        title: 'Functional Load & Electrical Testing Bay',
        category: 'Quality Testing',
        image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pgal-6',
        title: 'Batch Manufactured Motor Housings',
        category: 'Serial Production',
        image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },

  cta: {
    title: 'Ready to Scale Your High-Volume Production?',
    desc: 'Connect with our production planning team to set up your contract assembly line and volume manufacturing run.',
    buttonText: 'Get a Quote for Production'
  }
};
