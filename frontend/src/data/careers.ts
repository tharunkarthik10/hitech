export interface JobSpecification {
  label: string;
  value: string;
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  overview: string;
  highlights: string[];
  specifications: JobSpecification[];
  status?: 'active' | 'paused';
  createdAt?: string;
}

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  candidateName: string;
  email: string;
  phone: string;
  experience: string;
  resumeFileName?: string;
  coverLetter?: string;
  appliedAt: string;
  status: 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Rejected' | 'Hired';
}

export const INITIAL_JOB_POSITIONS: JobPosition[] = [
  {
    id: 'cnc-machinist',
    title: 'Senior 5-Axis CNC Machinist',
    department: 'Manufacturing',
    location: 'Coimbatore Facility',
    type: 'Full-Time',
    experience: '4+ Years',
    description: 'Lead precise set-up and multi-axis milling operations on high-grade industrial metals following strict engineering tolerances.',
    overview: 'We are seeking a highly skilled Senior 5-Axis CNC Machinist to operate high-end Mazak and DMG Mori 5-axis machining centers. You will be responsible for machining complex Aerospace, Automotive, and Heavy Machinery components with micron-level tolerances (±0.005mm).',
    highlights: [
      '5-Axis CNC Milling on Mazak & DMG Mori Centers',
      'Micron-level accuracy (±0.005mm) & 3D CMM verification',
      'Interpretation of complex 3D CAD models & technical drawings',
      'Workshop safety & ISO 9001 compliance standards'
    ],
    specifications: [
      { label: 'Machine Fleet', value: 'Mazak Variaxis / DMG Mori 5-Axis Milling Units' },
      { label: 'Precision Standard', value: 'Micron Accuracy (±0.005mm)' },
      { label: 'Materials Handled', value: 'Titanium Alloys, Stainless Steel 316, Aircraft Aluminum' },
      { label: 'Shift Schedule', value: 'Day Shift / 6-Day Rotation' },
      { label: 'Work Culture', value: 'Performance Bonus & Full Medical Coverage' }
    ],
    status: 'active',
    createdAt: '2026-01-15'
  },
  {
    id: 'laser-specialist',
    title: '12kW Fiber Laser Operator',
    department: 'Fabrication',
    location: 'Coimbatore Facility',
    type: 'Full-Time',
    experience: '2+ Years',
    description: 'Operate state-of-the-art 12kW fiber laser cutting stations for high-speed sheet metal profiling and nested production runs.',
    overview: 'Operate state-of-the-art 12kW high-power fiber laser profiling machinery. You will handle nesting software, assist sheet loading/unloading, and execute precision cuts across various metal sheet thicknesses with zero burr formation.',
    highlights: [
      '12kW High-power fiber laser cutting & Nesting software',
      'Sheet metal profiling up to 30mm Mild Steel & 25mm Stainless',
      'Lens maintenance & laser beam focal length alignment',
      'Material utilization optimization & edge quality checks'
    ],
    specifications: [
      { label: 'Machine Fleet', value: '12kW High-Speed Fiber Laser Cutting System' },
      { label: 'Sheet Capability', value: 'Up to 30mm Mild Steel, 25mm Stainless, 20mm Aluminum' },
      { label: 'Software Stack', value: 'CypCut / Lantek CAD-CAM Nesting' },
      { label: 'Environment', value: 'Climate-Controlled Clean Fabrication Bay' },
      { label: 'Work Culture', value: 'Safety Allowances & Full PPE Provided' }
    ],
    status: 'active',
    createdAt: '2026-02-01'
  },
  {
    id: 'automation-engineer',
    title: 'PLC & Robotics Automation Engineer',
    department: 'R&D / Systems',
    location: 'Coimbatore Tech Park',
    type: 'Full-Time',
    experience: '3+ Years',
    description: 'Design, program, and commission automated robotic welding cells and SPM line machinery for industrial client projects.',
    overview: 'Lead the design, logic programming, and commissioning of custom SPM machinery and robotic welding cells for high-volume automotive and industrial manufacturing lines.',
    highlights: [
      'Siemens S7-1500 & Allen-Bradley PLC logic programming',
      'FANUC & ABB 6-axis industrial robot programming',
      'HMI touch screen design (WinCC / FactoryTalk View)',
      'Factory Acceptance Testing (FAT) & site commissioning'
    ],
    specifications: [
      { label: 'Automation Fleet', value: 'Siemens S7-1500 PLC, Fanuc / ABB 6-Axis Robots' },
      { label: 'Software Stack', value: 'Siemens TIA Portal, FactoryTalk View, RoboGuide' },
      { label: 'Protocols', value: 'PROFINET, EtherNet/IP, Modbus TCP' },
      { label: 'Travel Scope', value: 'Occasional client site FAT commissioning (15-20%)' },
      { label: 'Work Culture', value: 'Travel Allowances & Certification Sponsorship' }
    ],
    status: 'active',
    createdAt: '2026-02-10'
  },
  {
    id: 'qc-inspector',
    title: 'Quality Assurance & CMM Metrologist',
    department: 'Quality Control',
    location: 'Coimbatore Facility',
    type: 'Full-Time',
    experience: '3+ Years',
    description: 'Execute 100% coordinate measuring machine (CMM) inspections and non-destructive testing (NDT) on finished components.',
    overview: 'Ensure 100% defect-free delivery by conducting 3D coordinate measuring machine (CMM) metrology and non-destructive testing (NDT) across all manufactured batches.',
    highlights: [
      '3D Zeiss CMM programming & PC-DMIS / Calypso software',
      'Dye penetrant & ultrasonic NDT weld inspections',
      'Mill Test Reports (MTR) & First Article Inspections (FAI)',
      'GD&T standards & ISO 9001:2015 quality compliance'
    ],
    specifications: [
      { label: 'Metrology Tools', value: '3D Zeiss CMM, Digital Optical Comparator, NDT Kits' },
      { label: 'Inspection Software', value: 'Zeiss Calypso / PC-DMIS' },
      { label: 'Quality Standards', value: 'GD&T (ASME Y14.5M), ISO 9001:2015' },
      { label: 'Facility', value: 'Temperature & Humidity Controlled Metrology Lab' },
      { label: 'Work Culture', value: 'QC Certification Sponsorship & Comprehensive Medical' }
    ],
    status: 'active',
    createdAt: '2026-02-18'
  },
  {
    id: 'mechanical-designer',
    title: 'Design for Manufacturability (DFM) Engineer',
    department: 'Engineering',
    location: 'Coimbatore Tech Park',
    type: 'Full-Time',
    experience: '2+ Years',
    description: 'Collaborate directly with OEMs to audit CAD drawings, conduct stress analysis, and optimize parts for cost-effective manufacturing.',
    overview: 'Work directly with client engineering teams to audit 3D CAD models for cost efficiency, stress performance under operating loads, and seamless 5-axis CNC machining.',
    highlights: [
      '3D CAD auditing in SolidWorks, Inventor & Creo',
      'Finite Element Analysis (FEA) stress load simulations',
      'Tool clearance & bend radius DFM optimization',
      'Technical cost estimating & engineering proposals'
    ],
    specifications: [
      { label: 'CAD Software', value: 'SolidWorks Professional, Autodesk Inventor, Creo' },
      { label: 'FEA Simulation', value: 'ANSYS / SolidWorks FEA Simulation' },
      { label: 'Key Specialty', value: 'Kinematic Reach Analysis & DFM Optimization' },
      { label: 'Location', value: 'Engineering R&D Center (Coimbatore Tech Park)' },
      { label: 'Work Culture', value: 'Software License Grants & Technical Training' }
    ],
    status: 'active',
    createdAt: '2026-02-25'
  }
];

export const INITIAL_APPLICATIONS: CandidateApplication[] = [
  {
    id: 'app-001',
    jobId: 'cnc-machinist',
    jobTitle: 'Senior 5-Axis CNC Machinist',
    candidateName: 'Ramesh Kumar',
    email: 'ramesh.k@example.com',
    phone: '+91 98421 55670',
    experience: '5 Years',
    resumeFileName: 'Ramesh_Kumar_Resume_CNC.pdf',
    coverLetter: 'Hands-on experience with Mazak 5-axis centers and Mastercam toolpaths.',
    appliedAt: '2026-03-01 10:30 AM',
    status: 'Under Review'
  },
  {
    id: 'app-002',
    jobId: 'laser-specialist',
    jobTitle: '12kW Fiber Laser Operator',
    candidateName: 'Sanjay Varma',
    email: 'sanjay.varma@example.com',
    phone: '+91 97890 12345',
    experience: '3.5 Years',
    resumeFileName: 'Sanjay_FiberLaser_CV.pdf',
    coverLetter: 'Specialist in CypCut nesting and 25mm SS cutting with minimal taper.',
    appliedAt: '2026-03-02 02:15 PM',
    status: 'Shortlisted'
  }
];
