import { LayoutGrid, Wind, Zap, Cpu, ArrowDownToLine, Droplets, Factory, GraduationCap } from 'lucide-react';

export interface CatalogItem {
  id: string;
  name: string;
}

export interface CatalogSubGroup {
  name: string;
  items: CatalogItem[];
}

export interface CatalogCategory {
  name: string;
  icon: any;
  subGroups: CatalogSubGroup[];
}

export interface CatalogDepartment {
  name: string;
  icon: any;
  categories: CatalogCategory[];
}

export interface ProductDimensionRow {
  param: string;
  dimension: string;
  notes?: string;
}

export interface ProductDetailItem {
  id: string;
  title: string;
  category: string;
  subGroup?: string;
  department?: string;
  description: string;
  features: string[];
  imageUrl: string;
  images?: string[];
  dimensions?: ProductDimensionRow[];
}

export const CATALOG_DATA: CatalogDepartment[] = [
  {
    name: 'Factory Automation',
    icon: Factory,
    categories: [
      {
        name: 'Pneumatics',
        icon: Wind,
        subGroups: [
          {
            name: 'Cylinders',
            items: [
              { id: 'cyl-1', name: 'Tie Rod Cylinders' },
              { id: 'cyl-2', name: 'Square Profile Cylinders' },
              { id: 'cyl-3', name: 'Compact Cylinders' },
              { id: 'cyl-4', name: 'Miniature & Round Cylinders' },
              { id: 'cyl-5', name: 'Rodless Cylinders' },
              { id: 'cyl-6', name: 'Heavy Duty Cylinders' },
              { id: 'cyl-7', name: 'Rotary Cylinders' },
              { id: 'cyl-8', name: 'Grippers' },
              { id: 'cyl-9', name: 'Twin Piston Cylinders' },
              { id: 'cyl-10', name: 'Hydro Check Cylinders' },
              { id: 'cyl-11', name: 'Mountings & Accessories' },
            ]
          },
          {
            name: 'Air Preparation Unit',
            items: [
              { id: 'air-1', name: 'Filter' },
              { id: 'air-2', name: 'Mist Separator' },
              { id: 'air-3', name: 'Lubricator' },
              { id: 'air-4', name: 'Regulator' },
              { id: 'air-5', name: 'Precision Regulator' },
              { id: 'air-6', name: 'Proportional Pressure Regulator' },
              { id: 'air-7', name: 'FRC' },
              { id: 'air-8', name: 'FRLM' },
              { id: 'air-9', name: 'FRCLM' },
              { id: 'air-10', name: 'Shut Off Valve' },
              { id: 'air-11', name: 'Soft Start Valve' },
              { id: 'air-12', name: 'Distribution Block' },
              { id: 'air-13', name: 'Mountings & Accessories' },
            ]
          },
          {
            name: 'Directional Control Valve',
            items: [
              { id: 'val-1', name: 'Solenoid Valve - E Series' },
              { id: 'val-2', name: 'Solenoid Valve - EL & DP1 Series' },
              { id: 'val-3', name: 'Solenoid Valve - DMN & DMH Series' },
              { id: 'val-4', name: 'Solenoid Valve - EF Series' },
              { id: 'val-5', name: 'Compact Valves' },
              { id: 'val-6', name: 'ISO Sub Base Valve' },
              { id: 'val-7', name: 'Solenoid Connectors' },
              { id: 'val-8', name: 'Manual & Mechanical Valves' },
              { id: 'val-9', name: 'Rotary Slide Valve' },
              { id: 'val-10', name: 'Antenna Valve' },
              { id: 'val-11', name: 'Pulse Valve' },
              { id: 'val-12', name: 'Angle Seat Valve' },
              { id: 'val-13', name: 'Manifolds' },
              { id: 'val-14', name: 'Mountings & Accessories' },
            ]
          },
          {
            name: 'One Touch Fittings',
            items: [
              { id: 'fit-1', name: 'Union' },
              { id: 'fit-2', name: 'Straight Connector' },
              { id: 'fit-3', name: 'Elbow Connector' },
              { id: 'fit-4', name: 'Tee Connector' },
              { id: 'fit-5', name: 'Y-Shape Fittings' },
              { id: 'fit-6', name: 'Swivel Fittings' },
              { id: 'fit-7', name: 'Multi Distributor' },
              { id: 'fit-8', name: 'Self Sealing Fittings' },
              { id: 'fit-9', name: 'Plug' },
              { id: 'fit-10', name: 'Air Blow Gun' },
              { id: 'fit-11', name: 'Nipples' },
              { id: 'fit-12', name: 'Junction Box' },
              { id: 'fit-13', name: 'Quick Coupler' },
            ]
          }
        ]
      },
      { 
        name: 'Electric Actuators', 
        icon: Zap, 
        subGroups: [
          {
            name: 'Linear Actuators',
            items: [
              { id: 'act-1', name: 'Rod Type Electric Actuator' },
              { id: 'act-2', name: 'Slider Type Electric Actuator' },
              { id: 'act-3', name: 'High-Thrust Precision Cylinder' },
            ]
          }
        ] 
      },
      { 
        name: 'Robotics', 
        icon: Cpu, 
        subGroups: [
          {
            name: 'Robotic Automation',
            items: [
              { id: 'rob-1', name: 'Articulated Pick & Place Arm' },
              { id: 'rob-2', name: 'SCARA Fastening Cell' },
              { id: 'rob-3', name: 'Cobot Palletizer Module' },
            ]
          }
        ] 
      },
      { 
        name: 'Vacuum', 
        icon: ArrowDownToLine, 
        subGroups: [
          {
            name: 'Vacuum Generators & Cups',
            items: [
              { id: 'vac-1', name: 'Venturi Vacuum Ejectors' },
              { id: 'vac-2', name: 'Industrial Suction Cups' },
              { id: 'vac-3', name: 'Vacuum Pressure Switches' },
            ]
          }
        ] 
      },
      { 
        name: 'Hydraulics', 
        icon: Droplets, 
        subGroups: [
          {
            name: 'Hydraulic Power Units',
            items: [
              { id: 'hyd-1', name: 'Heavy Industrial Power Pack' },
              { id: 'hyd-2', name: 'High-Pressure Hydraulic Cylinders' },
              { id: 'hyd-3', name: 'Proportional Flow Valves' },
            ]
          }
        ] 
      },
      { 
        name: 'Electric', 
        icon: Zap, 
        subGroups: [
          {
            name: 'Control Components',
            items: [
              { id: 'elec-1', name: 'Industrial Solid State Relays' },
              { id: 'elec-2', name: 'Digital Sensor Gateways' },
            ]
          }
        ] 
      },
      { 
        name: 'Servo Systems & Gearbox', 
        icon: LayoutGrid, 
        subGroups: [
          {
            name: 'Motion Drive Modules',
            items: [
              { id: 'srv-1', name: 'Planetary Precision Gearboxes' },
              { id: 'srv-2', name: 'High-Torque Servo Motor Drives' },
            ]
          }
        ] 
      },
    ]
  },
  {
    name: 'Didactics (Skilling & Education)',
    icon: GraduationCap,
    categories: [
      {
        name: 'Training Benches',
        icon: GraduationCap,
        subGroups: [
          {
            name: 'Educational Test Rigs',
            items: [
              { id: 'edu-1', name: 'Electro-Pneumatic Training Bench' },
              { id: 'edu-2', name: 'Hydraulic Trainer Module' },
              { id: 'edu-3', name: 'PLC Industrial Automation Workstation' },
            ]
          }
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Pneumatics', icon: Wind },
  { name: 'Electric Actuators', icon: Zap },
  { name: 'Robotics', icon: Cpu },
  { name: 'Vacuum', icon: ArrowDownToLine },
  { name: 'Hydraulics', icon: Droplets }
];

const subGroupImages: Record<string, string> = {
  Cylinders: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop',
  'Air Preparation Unit': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
  'Directional Control Valve': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop',
  'One Touch Fittings': 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop',
  'Linear Actuators': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop',
  'Robotic Automation': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
  'Vacuum Generators & Cups': 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop',
  'Hydraulic Power Units': 'https://motiequipments.com/assets/images/shop/grid/palette-1.jpg',
  'Control Components': 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop',
  'Motion Drive Modules': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
  'Educational Test Rigs': 'https://images.unsplash.com/photo-158109226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
};

// Flatten all items across CATALOG_DATA to ensure every item has a full product record
export const PRODUCTS: ProductDetailItem[] = (() => {
  const list: ProductDetailItem[] = [
    { 
      id: 'cyl-1', 
      title: 'Tie Rod Cylinders', 
      category: 'Pneumatics', 
      subGroup: 'Cylinders',
      department: 'Factory Automation',
      description: 'Heavy-duty tie rod cylinders engineered to ISO 15552 standards with hardened chrome-plated piston rods, adjustable end-position cushioning, and polyurethane seals for high-cycle factory automation.', 
      features: ['ISO 15552 standard compliance', 'Adjustable pneumatic cushioning', 'Hard chrome-plated piston rod', 'Operating pressure: 1 to 10 bar'], 
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop' 
    },
    { 
      id: 'cyl-3', 
      title: 'Compact Cylinders', 
      category: 'Pneumatics', 
      subGroup: 'Cylinders',
      department: 'Factory Automation',
      description: 'Space-saving compact pneumatic cylinders with extruded aluminum alloy body, integrated magnetic sensor slots, and high force-to-dimension ratio for cramped machine envelopes.', 
      features: ['Compact axial footprint', 'Integrated magnet for proximity sensing', 'Direct surface mounting threads', 'Operating temperature: -10°C to +80°C'], 
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop' 
    },
    { 
      id: 'air-1', 
      title: 'Air Preparation Unit (FRL)', 
      category: 'Pneumatics', 
      subGroup: 'Air Preparation Unit',
      department: 'Factory Automation',
      description: 'Modular filter, regulator, and lubricator combination assembly ensuring clean, dry, pressure-stabilized, and lubricated compressed air for downstream pneumatic machinery.', 
      features: ['5-micron particulate filtration', 'Lockable precision pressure regulator', 'Proportional micro-fog oil mist lubricator', 'Automatic condensate drain option'], 
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' 
    },
  ];

  const existingIds = new Set(list.map(p => p.id));

  CATALOG_DATA.forEach(dept => {
    dept.categories.forEach(cat => {
      cat.subGroups.forEach(sg => {
        sg.items.forEach(item => {
          if (!existingIds.has(item.id)) {
            existingIds.add(item.id);
            list.push({
              id: item.id,
              title: item.name,
              category: cat.name,
              subGroup: sg.name,
              department: dept.name,
              description: `High-durability ${item.name} precision-manufactured for ${cat.name} systems. Engineered with stringent tolerances, certified materials, and verified for zero-defect OEM integration.`,
              features: [
                'Industrial grade fatigue life verification',
                'Precision machined mounting interfaces',
                '100% factory pressure & functional tested',
                'Comprehensive warranty and CAD catalog support'
              ],
              imageUrl: subGroupImages[sg.name] || 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop'
            });
          }
        });
      });
    });
  });

  return list;
})();
