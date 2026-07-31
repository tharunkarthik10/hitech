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
      { name: 'Electric Actuators', icon: Zap, subGroups: [] },
      { name: 'Robotics', icon: Cpu, subGroups: [] },
      { name: 'Vacuum', icon: ArrowDownToLine, subGroups: [] },
      { name: 'Hydraulics', icon: Droplets, subGroups: [] },
      { name: 'Electric', icon: Zap, subGroups: [] },
      { name: 'Servo Systems & Gearbox', icon: LayoutGrid, subGroups: [] },
    ]
  },
  {
    name: 'Didactics (Skilling & Education)',
    icon: GraduationCap,
    categories: []
  }
];

// Fallback for backwards compatibility with legacy product card grid if needed
export const CATEGORIES = [
  { name: 'All', icon: LayoutGrid },
  { name: 'Pneumatics', icon: Wind },
  { name: 'Electric Actuators', icon: Zap },
  { name: 'Robotics', icon: Cpu },
  { name: 'Vacuum', icon: ArrowDownToLine },
  { name: 'Hydraulics', icon: Droplets }
];

export const PRODUCTS = [
  { id: 'cyl-1', title: 'Tie Rod Cylinders', category: 'Pneumatics', description: 'Heavy-duty tie rod cylinders designed for high-performance industrial automation applications.', features: [], imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop' },
  { id: 'cyl-3', title: 'Compact Cylinders', category: 'Pneumatics', description: 'Space-saving compact cylinders ideal for tight installations without compromising force.', features: [], imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop' },
  { id: 'air-1', title: 'Air Preparation Unit (FRL)', category: 'Pneumatics', description: 'Filter, Regulator, and Lubricator combined units for optimal compressed air quality and tool protection.', features: [], imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop' },
];
