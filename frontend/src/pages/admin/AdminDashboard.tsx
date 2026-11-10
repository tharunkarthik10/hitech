import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  getStoredProducts, 
  saveStoredProduct, 
  deleteStoredProduct, 
  resetStoredProducts,
  getStoredJobs,
  saveStoredJob,
  deleteStoredJob,
  toggleStoredJobStatus,
  getStoredApplications,
  updateStoredApplicationStatus,
  deleteStoredApplication
} from '../../data/adminStore';
import type { ProductDetailItem, ProductDimensionRow } from '../../data/products';
import type { JobPosition, CandidateApplication } from '../../data/careers';
import { 
  Package, 
  Briefcase, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  LogOut, 
  ExternalLink, 
  CheckCircle, 
  Clock, 
  X, 
  Eye, 
  Phone, 
  Mail,
  UploadCloud,
  FileSpreadsheet,
  Download,
  Table,
  HelpCircle,
  Image as ImageIcon,
  Sparkles,
  Link2
} from 'lucide-react';

const SAMPLE_CSV_CONTENT = `Parameter,Available Dimensions / Values,Standard / Tolerance
Standard Bore Range,Ø 32 / 40 / 50 / 63 / 80 / 100 mm,ISO 15552 standard
Standard Stroke Range,25 mm – 1000 mm (Custom up to 2500 mm),±0.5 mm stroke tolerance
Piston Rod Diameter,Ø 12 mm – Ø 32 mm,Hard chrome plated (f7)
Operating Pressure,1.0 to 10.0 Bar (14.5 to 145 PSI),Proof test: 15.0 Bar
Port Thread Standards,G 1/8", G 1/4", G 3/8", G 1/2" BSPP,Optional NPT available
Operating Temperature,-20°C to +80°C (Standard NBR / PU),Viton option up to 150°C`;

const PRESET_DEPARTMENTS = [
  'Factory Automation',
  'Didactics (Skilling & Education)',
  'Heavy Engineering',
  'Custom Department...'
];

const PRESET_CATEGORIES_BY_DEPT: Record<string, string[]> = {
  'Factory Automation': [
    'Pneumatics',
    'Electric Actuators',
    'Robotics',
    'Vacuum',
    'Hydraulics',
    'Electric',
    'Servo Systems & Gearbox'
  ],
  'Didactics (Skilling & Education)': [
    'Educational Test Rigs',
    'Training Benches',
    'Cut-Section Working Models'
  ],
  'Heavy Engineering': [
    'Heavy Fabrication',
    '5-Axis Precision Machining',
    'Laser Cut Components'
  ]
};

const PRESET_SUBGROUPS_BY_CAT: Record<string, string[]> = {
  Pneumatics: [
    'Cylinders',
    'Air Preparation Unit',
    'Directional Control Valve',
    'One Touch Fittings',
    'Compact Valves',
    'Pneumatic Grippers',
    'Mountings & Accessories'
  ],
  Hydraulics: [
    'Hydraulic Power Units',
    'Control Components',
    'Hydraulic Cylinders',
    'Proportional Valves'
  ],
  'Electric Actuators': [
    'Linear Actuators',
    'Motion Drive Modules',
    'Rodless Cylinders',
    'Precision Slides'
  ],
  Robotics: [
    '6-Axis Robots',
    'SCARA Robots',
    'Delta Robots',
    'Robotic Grippers'
  ],
  Vacuum: [
    'Vacuum Generators & Cups',
    'Suction Pads',
    'Ejectors',
    'Vacuum Switches'
  ],
  Electric: [
    'AC Drives & Inverters',
    'Servo Motors',
    'Sensors & Transducers'
  ],
  'Servo Systems & Gearbox': [
    'Planetary Gearboxes',
    'Servo Drives',
    'Precision Reducers'
  ],
  'Educational Test Rigs': [
    'Pneumatics Trainers',
    'Hydraulics Cut-Section Rigs',
    'PLC Automation Panels'
  ]
};

const JOB_DEPARTMENTS = [
  'Manufacturing',
  'Fabrication',
  'R&D / Systems',
  'Quality Control',
  'Engineering',
  'Operations & Supply Chain',
  'Custom Department...'
];

const JOB_LOCATIONS = [
  'Coimbatore Facility (Unit 1)',
  'Coimbatore Facility (Unit 2 - Fast Loop)',
  'Coimbatore Facility (Unit 3 - Machine Shop)',
  'Coimbatore Tech Park (R&D Center)',
  'Custom Location...'
];

const JOB_EXPERIENCES = [
  'Fresher / Entry-Level',
  '1-2 Years',
  '2+ Years',
  '3+ Years',
  '4+ Years',
  '5+ Years',
  '8+ Years (Lead / Principal)',
  'Custom Experience...'
];

export const AdminDashboard: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<'products' | 'careers' | 'applications'>('products');

  // Products State
  const [products, setProducts] = useState<ProductDetailItem[]>([]);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState<ProductDetailItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);

  // Custom Dropdown Fallback States
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [isCustomSubGroup, setIsCustomSubGroup] = useState(false);

  const [isCustomJobDept, setIsCustomJobDept] = useState(false);
  const [isCustomJobLocation, setIsCustomJobLocation] = useState(false);
  const [isCustomJobExp, setIsCustomJobExp] = useState(false);

  // File Upload Refs
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);
  const csvFileInputRef = useRef<HTMLInputElement | null>(null);

  // Careers State
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [jobSearch, setJobSearch] = useState('');
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Applications State
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [applicationSearch, setApplicationSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [viewingApp, setViewingApp] = useState<CandidateApplication | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync initial data and listen for storage updates
  useEffect(() => {
    setProducts(getStoredProducts());
    setJobs(getStoredJobs());
    setApplications(getStoredApplications());

    const refreshProducts = () => setProducts(getStoredProducts());
    const refreshJobs = () => setJobs(getStoredJobs());
    const refreshApps = () => setApplications(getStoredApplications());

    window.addEventListener('hitech-products-updated', refreshProducts);
    window.addEventListener('hitech-jobs-updated', refreshJobs);
    window.addEventListener('hitech-applications-updated', refreshApps);

    return () => {
      window.removeEventListener('hitech-products-updated', refreshProducts);
      window.removeEventListener('hitech-jobs-updated', refreshJobs);
      window.removeEventListener('hitech-applications-updated', refreshApps);
    };
  }, []);

  const handleSignOut = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Dynamic categories based on selected department
  const currentDeptCategories = React.useMemo(() => {
    const dept = editingProduct?.department || 'Factory Automation';
    const presets = PRESET_CATEGORIES_BY_DEPT[dept] || PRESET_CATEGORIES_BY_DEPT['Factory Automation'];
    const existing = products.filter(p => p.department === dept).map(p => p.category);
    return Array.from(new Set([...presets, ...existing]));
  }, [editingProduct?.department, products]);

  // Dynamic subgroups based on selected category
  const currentCategorySubgroups = React.useMemo(() => {
    const cat = editingProduct?.category || 'Pneumatics';
    const presets = PRESET_SUBGROUPS_BY_CAT[cat] || [];
    const existing = products.filter(p => p.category === cat && p.subGroup).map(p => p.subGroup as string);
    return Array.from(new Set([...presets, ...existing]));
  }, [editingProduct?.category, products]);

  // --- PRODUCT MANAGEMENT ---
  const handleOpenNewProduct = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      title: '',
      category: 'Pneumatics',
      subGroup: 'Cylinders',
      department: 'Factory Automation',
      description: '',
      features: ['High durability precision finish', 'ISO standard certified tolerances'],
      imageUrl: '',
      dimensions: [
        { param: 'Standard Bore Range', dimension: 'Ø 32, 40, 50, 63, 80 mm', notes: 'ISO 15552' },
        { param: 'Operating Pressure', dimension: '1.0 to 10.0 Bar', notes: 'Proof test: 15 Bar' },
        { param: 'Operating Temperature', dimension: '-20°C to +80°C', notes: 'PU / NBR Seals' }
      ]
    });
    setIsCustomDept(false);
    setIsCustomCategory(false);
    setIsCustomSubGroup(false);
    setShowUrlFallback(false);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (prod: ProductDetailItem) => {
    const isCustomD = !PRESET_DEPARTMENTS.slice(0, 3).includes(prod.department || '');
    const isCustomC = !Object.values(PRESET_CATEGORIES_BY_DEPT).flat().includes(prod.category || '');
    const isCustomS = prod.subGroup ? !Object.values(PRESET_SUBGROUPS_BY_CAT).flat().includes(prod.subGroup) : false;

    setEditingProduct({ 
      ...prod,
      dimensions: prod.dimensions && prod.dimensions.length > 0 
        ? prod.dimensions 
        : [
            { param: 'Standard Bore Range', dimension: 'Ø 32, 40, 50, 63, 80 mm', notes: 'ISO 15552' },
            { param: 'Operating Pressure', dimension: '1.0 to 10.0 Bar', notes: 'Proof test: 15 Bar' },
            { param: 'Operating Temperature', dimension: '-20°C to +80°C', notes: 'PU / NBR Seals' }
          ]
    });
    setIsCustomDept(isCustomD);
    setIsCustomCategory(isCustomC);
    setIsCustomSubGroup(isCustomS);
    setShowUrlFallback(false);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title.trim()) return;

    saveStoredProduct(editingProduct);
    setIsProductModalOpen(false);
    setEditingProduct(null);
    showToast('Product successfully saved to catalog.');
  };

  const handleDeleteProduct = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      deleteStoredProduct(id);
      showToast('Product removed.');
    }
  };

  const handleResetProducts = () => {
    if (window.confirm('Reset catalog products back to original factory defaults?')) {
      resetStoredProducts();
      showToast('Catalog reset to initial defaults.');
    }
  };

  // --- IMAGE FILE UPLOAD HANDLING ---
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP, or SVG).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl && editingProduct) {
        setEditingProduct({
          ...editingProduct,
          imageUrl: dataUrl
        });
        showToast('Image uploaded and preview updated.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  // --- TABULAR COLUMN (DIMENSIONS) HANDLING ---
  const handleAddDimensionRow = () => {
    if (!editingProduct) return;
    const currentDims = editingProduct.dimensions || [];
    setEditingProduct({
      ...editingProduct,
      dimensions: [...currentDims, { param: '', dimension: '', notes: '' }]
    });
  };

  const handleUpdateDimensionRow = (index: number, field: keyof ProductDimensionRow, value: string) => {
    if (!editingProduct) return;
    const currentDims = [...(editingProduct.dimensions || [])];
    currentDims[index] = {
      ...currentDims[index],
      [field]: value
    };
    setEditingProduct({
      ...editingProduct,
      dimensions: currentDims
    });
  };

  const handleRemoveDimensionRow = (index: number) => {
    if (!editingProduct) return;
    const currentDims = [...(editingProduct.dimensions || [])];
    currentDims.splice(index, 1);
    setEditingProduct({
      ...editingProduct,
      dimensions: currentDims
    });
  };

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r\n|\n/).filter(line => line.trim().length > 0);
      const parsedRows: ProductDimensionRow[] = [];

      // Check if header row exists
      const hasHeader = lines[0].toLowerCase().includes('param') || lines[0].toLowerCase().includes('dimension');
      const startIdx = hasHeader ? 1 : 0;

      for (let i = startIdx; i < lines.length; i++) {
        const separator = lines[i].includes('\t') ? '\t' : (lines[i].includes(';') ? ';' : ',');
        const parts = lines[i].split(separator).map(s => s.trim().replace(/^["']|["']$/g, ''));
        if (parts.length >= 2) {
          parsedRows.push({
            param: parts[0] || '',
            dimension: parts[1] || '',
            notes: parts[2] || ''
          });
        }
      }

      if (parsedRows.length > 0 && editingProduct) {
        setEditingProduct({
          ...editingProduct,
          dimensions: parsedRows
        });
        showToast(`Imported ${parsedRows.length} tabular specification rows from CSV.`);
      } else {
        alert('Could not parse rows from CSV. Please ensure the format is: Parameter, Dimension, Notes');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleDownloadSampleCsv = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'hitech_product_specifications_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded sample specifications CSV template.');
  };

  const handleLoadPresetTemplate = (templateName: 'pneumatics' | 'hydraulics' | 'actuator') => {
    if (!editingProduct) return;
    let templateRows: ProductDimensionRow[] = [];

    if (templateName === 'pneumatics') {
      templateRows = [
        { param: 'Standard Bore Diameters', dimension: 'Ø 32, 40, 50, 63, 80, 100, 125 mm', notes: 'ISO 15552 standard' },
        { param: 'Standard Stroke Range', dimension: '25 mm – 1000 mm (Custom up to 2500 mm)', notes: '±0.5 mm stroke tolerance' },
        { param: 'Piston Rod Diameter', dimension: 'Ø 12 mm – Ø 32 mm', notes: 'Hard chrome plated (f7)' },
        { param: 'Operating Pressure', dimension: '1.0 to 10.0 Bar (14.5 to 145 PSI)', notes: 'Proof test: 15.0 Bar' },
        { param: 'Port Thread Standards', dimension: 'G 1/8", G 1/4", G 3/8", G 1/2" BSPP', notes: 'Optional NPT available' },
        { param: 'Operating Temperature', dimension: '-20°C to +80°C (Standard NBR / PU)', notes: 'Viton option up to 150°C' }
      ];
    } else if (templateName === 'hydraulics') {
      templateRows = [
        { param: 'Cylinder Bore Range', dimension: 'Ø 40 mm to Ø 350 mm', notes: 'Honed seamless tubes (H8)' },
        { param: 'Piston Rod Diameter', dimension: 'Ø 22 mm to Ø 180 mm', notes: 'Induction hardened chrome' },
        { param: 'Stroke Capacity', dimension: 'Up to 3000 mm', notes: 'Cushioned end-caps' },
        { param: 'Working Pressure Rating', dimension: 'Up to 350 Bar (5,000 PSI)', notes: 'Hydrostatic test 500 Bar' },
        { param: 'Mounting Styles', dimension: 'Flange, Clevis, Trunnion, Foot, Lug', notes: 'ISO 6020-2 / DIN 24554' },
        { param: 'Fluid Compatibility', dimension: 'Mineral oils (HL, HLP), Glycols', notes: 'FKM / Polyurethane seals' }
      ];
    } else {
      templateRows = [
        { param: 'Effective Stroke Length', dimension: '50 mm – 1500 mm', notes: 'Configurable in 5mm steps' },
        { param: 'Max Thrust / Payload', dimension: '500 N to 15,000 N', notes: 'Dynamic load verified' },
        { param: 'Positional Repeatability', dimension: '±0.02 mm (Ballscrew) / ±0.05 mm (Belt)', notes: 'Ground precision grade' },
        { param: 'Max Linear Velocity', dimension: 'Up to 1.2 m/s', notes: 'Application dependent' },
        { param: 'Duty Cycle', dimension: '100% Continuous Industrial Duty', notes: 'IP65 enclosed casing' }
      ];
    }

    setEditingProduct({
      ...editingProduct,
      dimensions: templateRows
    });
    showToast(`Loaded ${templateName.toUpperCase()} technical specifications.`);
  };

  // --- JOB ACTIONS ---
  const handleOpenNewJob = () => {
    setEditingJob({
      id: `job-${Date.now()}`,
      title: '',
      department: 'Manufacturing',
      location: 'Coimbatore Facility',
      type: 'Full-Time',
      experience: '2+ Years',
      description: '',
      overview: '',
      highlights: ['Precision machining and safety compliance', 'Interpretation of technical engineering drawings'],
      specifications: [
        { label: 'Machine Fleet', value: 'High-Precision CNC / Laser Machining Center' },
        { label: 'Work Culture', value: 'Health Coverage & Performance Incentives' }
      ],
      status: 'active'
    });
    setIsJobModalOpen(true);
  };

  const handleEditJob = (job: JobPosition) => {
    setEditingJob({ ...job });
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob || !editingJob.title.trim()) return;

    saveStoredJob(editingJob);
    setIsJobModalOpen(false);
    setEditingJob(null);
    showToast('Job opening saved successfully.');
  };

  const handleDeleteJob = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the job opening for "${title}"?`)) {
      deleteStoredJob(id);
      showToast('Job position deleted.');
    }
  };

  const handleToggleJobStatus = (id: string) => {
    toggleStoredJobStatus(id);
    showToast('Job status updated.');
  };

  // --- APPLICATION ACTIONS ---
  const handleStatusChange = (id: string, status: CandidateApplication['status']) => {
    updateStoredApplicationStatus(id, status);
    showToast(`Candidate status set to ${status}.`);
  };

  const handleDeleteApp = (id: string) => {
    if (window.confirm('Remove this applicant entry?')) {
      deleteStoredApplication(id);
      if (viewingApp?.id === id) setViewingApp(null);
      showToast('Applicant removed.');
    }
  };

  // Filtered Products
  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) || 
                          p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.description.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filtered Jobs
  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Filtered Applications
  const filteredApps = applications.filter(a => {
    const matchesSearch = a.candidateName.toLowerCase().includes(applicationSearch.toLowerCase()) ||
                          a.jobTitle.toLowerCase().includes(applicationSearch.toLowerCase()) ||
                          a.email.toLowerCase().includes(applicationSearch.toLowerCase());
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00A6FB] text-white font-semibold text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-blue-400 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#00A6FB] text-white font-black flex items-center justify-center font-heading text-lg shadow-sm">
              H
            </span>
            <div>
              <span className="font-heading font-black tracking-wider text-sm sm:text-base text-slate-900 block">
                HITECH ENGINEERING
              </span>
              <span className="text-[10px] text-[#0086c9] tracking-widest uppercase font-mono block font-bold">
                Administrative Control Console
              </span>
            </div>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 font-mono text-[11px] font-medium">
              {currentUser?.email || 'admin@hitechengineering.com'}
            </span>
            {currentUser?.isLocalFallback && (
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-100 text-[#0086c9] font-bold">
                Admin
              </span>
            )}
          </div>

          <Link
            to="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 text-xs border border-slate-200 transition-colors font-medium"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold transition-colors shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'products'
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalog</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'products' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'careers'
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Openings</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'careers' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {jobs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'applications'
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Candidate Resumes</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'applications' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {applications.length}
              </span>
            </button>
          </div>

          {/* Action Button depending on tab */}
          <div>
            {activeTab === 'products' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetProducts}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-sm font-medium"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={handleOpenNewProduct}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-white font-bold text-xs shadow-md shadow-[#00A6FB]/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product
                </button>
              </div>
            )}
            {activeTab === 'careers' && (
              <button
                onClick={handleOpenNewJob}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-white font-bold text-xs shadow-md shadow-[#00A6FB]/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                Post New Opening
              </button>
            )}
          </div>
        </div>

        {/* ================= PRODUCTS TAB ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title, category, spec..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      productCategoryFilter === cat
                        ? 'bg-[#00A6FB] text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-medium'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-[#00A6FB] hover:shadow-lg hover:shadow-slate-200/50 transition-all shadow-sm"
                >
                  <div className="h-44 w-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                    {prod.imageUrl ? (
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400">
                        <ImageIcon className="w-10 h-10 mb-1" />
                        <span className="text-xs">No image uploaded</span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md border border-slate-200/80 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#0086c9] uppercase tracking-wider font-bold shadow-sm">
                      {prod.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                      ID: {prod.id}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                        {prod.subGroup || prod.department || 'Industrial Automation'}
                      </div>
                      <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#00A6FB] transition-colors line-clamp-1 break-words [overflow-wrap:anywhere]">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed break-words [overflow-wrap:anywhere] whitespace-pre-line">
                        {prod.description}
                      </p>

                      {/* Specs Badge */}
                      <div className="mt-3 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-blue-50 text-[#0086c9] px-2 py-0.5 rounded border border-blue-200">
                          <Table className="w-3 h-3" />
                          {prod.dimensions?.length || 6} Tabular Specs
                        </span>
                      </div>

                      {/* Feature tags */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {prod.features.slice(0, 2).map((feat, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200 line-clamp-1"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <Link
                        to={`/products/${prod.id}`}
                        target="_blank"
                        className="text-[11px] text-[#0086c9] hover:underline flex items-center gap-1 font-semibold"
                      >
                        Preview <ExternalLink className="w-3 h-3" />
                      </Link>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(prod)}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-sm"
                          title="Edit Product & Specs"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.title)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-100 shadow-sm"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-600 text-sm font-semibold">No products found matching your filter.</p>
                <button
                  onClick={() => { setProductSearch(''); setProductCategoryFilter('All'); }}
                  className="mt-3 text-xs text-[#00A6FB] font-semibold hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= CAREERS TAB ================= */}
        {activeTab === 'careers' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search openings by role, department, location..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                />
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Displaying <strong className="text-slate-800">{filteredJobs.length}</strong> active openings
              </div>
            </div>

            {/* Job Listings List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white border rounded-2xl p-6 transition-all shadow-sm ${
                    job.status === 'paused'
                      ? 'border-amber-300 bg-amber-50/20 opacity-80'
                      : 'border-slate-200 hover:border-[#00A6FB] hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#0086c9] border border-blue-200">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {job.location}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {job.type} • {job.experience}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          job.status === 'paused'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {job.status === 'paused' ? 'Paused' : 'Active'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-slate-900">
                        {job.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                        {job.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <button
                        onClick={() => handleToggleJobStatus(job.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors shadow-sm ${
                          job.status === 'paused'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        {job.status === 'paused' ? 'Activate' : 'Pause'}
                      </button>

                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-sm"
                        title="Edit Job"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-100 shadow-sm"
                        title="Delete Job"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= RESUMES & APPLICATIONS TAB ================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={applicationSearch}
                  onChange={(e) => setApplicationSearch(e.target.value)}
                  placeholder="Search applicant name, email, role..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Hired', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      statusFilter === st
                        ? 'bg-[#00A6FB] text-white font-bold shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 font-medium'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Applications Table / Cards */}
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-slate-900 text-base">
                        {app.candidateName}
                      </span>
                      <span className="text-xs text-[#0086c9] font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {app.jobTitle}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        app.status === 'Shortlisted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        app.status === 'Interview Scheduled' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                        app.status === 'Hired' ? 'bg-green-50 text-green-700 border border-green-200' :
                        app.status === 'Rejected' ? 'bg-red-50 text-red-600 border border-red-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {app.email}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {app.phone}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        Submitted: {app.appliedAt}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 line-clamp-2 max-w-3xl">
                        "{app.coverLetter}"
                      </p>
                    )}
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                      className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 px-2.5 py-1.5 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => setViewingApp(app)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-sm"
                      title="View Full Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-100 shadow-sm"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredApps.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 text-sm font-semibold">No candidate resumes found in this view.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= EDIT / ADD PRODUCT MODAL ================= */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8 text-slate-800 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
                  <Package className="w-6 h-6 text-[#00A6FB]" />
                  {products.some(p => p.id === editingProduct.id) ? 'Edit Product & Technical Specifications' : 'Add New Industrial Product'}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Manage product specifications, photo upload, and engineering tabular columns.
                </p>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    placeholder="e.g. Tie Rod Pneumatic Cylinder (ISO 15552)"
                  />
                </div>

                {/* Department Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Department *</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomDept(!isCustomDept)}
                      className="text-[11px] text-[#0086c9] hover:underline"
                    >
                      {isCustomDept ? 'Choose from list' : '+ Custom Department'}
                    </button>
                  </div>
                  {isCustomDept ? (
                    <input
                      type="text"
                      value={editingProduct.department || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, department: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="Type custom department name..."
                    />
                  ) : (
                    <select
                      value={editingProduct.department || 'Factory Automation'}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Custom Department...') {
                          setIsCustomDept(true);
                        } else {
                          const cats = PRESET_CATEGORIES_BY_DEPT[val] || [];
                          setEditingProduct({
                            ...editingProduct,
                            department: val,
                            category: cats[0] || editingProduct.category
                          });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      {PRESET_DEPARTMENTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Category *</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomCategory(!isCustomCategory)}
                      className="text-[11px] text-[#0086c9] hover:underline"
                    >
                      {isCustomCategory ? 'Choose from list' : '+ Custom Category'}
                    </button>
                  </div>
                  {isCustomCategory ? (
                    <input
                      type="text"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="Type custom category name..."
                    />
                  ) : (
                    <select
                      value={editingProduct.category}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__custom__') {
                          setIsCustomCategory(true);
                        } else {
                          const sgs = PRESET_SUBGROUPS_BY_CAT[val] || [];
                          setEditingProduct({
                            ...editingProduct,
                            category: val,
                            subGroup: sgs[0] || editingProduct.subGroup
                          });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      {currentDeptCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="__custom__">+ Custom Category...</option>
                    </select>
                  )}
                </div>

                {/* SubGroup Dropdown */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Sub-Group / Series</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomSubGroup(!isCustomSubGroup)}
                      className="text-[11px] text-[#0086c9] hover:underline"
                    >
                      {isCustomSubGroup ? 'Choose from list' : '+ Custom Sub-Group'}
                    </button>
                  </div>
                  {isCustomSubGroup ? (
                    <input
                      type="text"
                      value={editingProduct.subGroup || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subGroup: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="Type custom subgroup / series..."
                    />
                  ) : (
                    <select
                      value={editingProduct.subGroup || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '__custom__') {
                          setIsCustomSubGroup(true);
                        } else {
                          setEditingProduct({ ...editingProduct, subGroup: val });
                        }
                      }}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      <option value="">-- Select Sub-Group --</option>
                      {currentCategorySubgroups.map(sg => (
                        <option key={sg} value={sg}>{sg}</option>
                      ))}
                      <option value="__custom__">+ Custom Sub-Group...</option>
                    </select>
                  )}
                </div>
              </div>

              {/* ----------------- IMAGE UPLOAD SECTION ----------------- */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#00A6FB]" />
                    Product Photo (Upload File)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUrlFallback(!showUrlFallback)}
                    className="text-[11px] text-[#0086c9] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Link2 className="w-3 h-3" />
                    {showUrlFallback ? 'Hide URL paste' : 'Or paste image URL instead'}
                  </button>
                </div>

                {/* Hidden File Input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={imageFileInputRef}
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                {/* Drag & Drop Upload Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
                  onDragLeave={() => setIsDraggingImage(false)}
                  onDrop={handleImageDrop}
                  onClick={() => imageFileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                    isDraggingImage 
                      ? 'border-[#00A6FB] bg-blue-50/50' 
                      : 'border-slate-300 hover:border-[#00A6FB] bg-white hover:bg-slate-50'
                  }`}
                >
                  {editingProduct.imageUrl ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 shrink-0">
                        <img
                          src={editingProduct.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left space-y-1">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Photo Ready
                        </span>
                        <p className="text-xs text-slate-700 font-medium">Click or drag a new image here to replace this photo.</p>
                        <p className="text-[11px] text-slate-400">Supports PNG, JPG, WEBP, SVG</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-[#00A6FB] flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        Click to upload product image or drag & drop file here
                      </p>
                      <p className="text-[11px] text-slate-500">
                        High-resolution PNG, JPG, WEBP or SVG
                      </p>
                    </div>
                  )}
                </div>

                {/* Optional URL Paste input */}
                {showUrlFallback && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Direct Image Web Link
                    </label>
                    <input
                      type="url"
                      value={editingProduct.imageUrl}
                      onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>
                )}
              </div>

              {/* ----------------- TABULAR COLUMN SPECIFICATIONS SECTION ----------------- */}
              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Table className="w-4 h-4 text-[#00A6FB]" />
                      Available Dimensions & Technical Specifications (Tabular Column)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      This table is rendered directly on the public product page for clients and engineers.
                    </p>
                  </div>

                  {/* Hidden CSV Input */}
                  <input
                    type="file"
                    accept=".csv,.txt"
                    ref={csvFileInputRef}
                    onChange={handleCsvUpload}
                    className="hidden"
                  />

                  {/* Table Actions Toolbar */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => csvFileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
                      title="Upload CSV exported from Excel or Google Sheets"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      Import CSV
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadSampleCsv}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200 transition-colors shadow-2xs"
                      title="Download a template CSV to fill in Excel"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Sample CSV
                    </button>

                    <button
                      type="button"
                      onClick={handleAddDimensionRow}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs font-bold shadow-2xs transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Row
                    </button>
                  </div>
                </div>

                {/* Quick Presets Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600 border-t border-slate-200/60">
                  <span className="font-semibold text-slate-500">Quick Templates:</span>
                  <button
                    type="button"
                    onClick={() => handleLoadPresetTemplate('pneumatics')}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 text-[#0086c9] border border-slate-200 font-medium text-[11px] transition-colors"
                  >
                    Pneumatics Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadPresetTemplate('hydraulics')}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 text-[#0086c9] border border-slate-200 font-medium text-[11px] transition-colors"
                  >
                    Hydraulics Preset
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLoadPresetTemplate('actuator')}
                    className="px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 text-[#0086c9] border border-slate-200 font-medium text-[11px] transition-colors"
                  >
                    Linear Actuators Preset
                  </button>
                </div>

                {/* Interactive Table */}
                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-2.5 px-3 w-1/3">Parameter</th>
                        <th className="py-2.5 px-3 w-1/3">Available Dimensions / Values</th>
                        <th className="py-2.5 px-3">Standard / Tolerance</th>
                        <th className="py-2.5 px-2 text-center w-12">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(editingProduct.dimensions && editingProduct.dimensions.length > 0) ? (
                        editingProduct.dimensions.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.param}
                                onChange={(e) => handleUpdateDimensionRow(idx, 'param', e.target.value)}
                                placeholder="e.g. Standard Bore Range"
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.dimension}
                                onChange={(e) => handleUpdateDimensionRow(idx, 'dimension', e.target.value)}
                                placeholder="e.g. Ø 32, 40, 50, 63, 80 mm"
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                              />
                            </td>
                            <td className="p-2">
                              <input
                                type="text"
                                value={row.notes || ''}
                                onChange={(e) => handleUpdateDimensionRow(idx, 'notes', e.target.value)}
                                placeholder="e.g. ISO 15552 / ±0.5 mm"
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                              />
                            </td>
                            <td className="p-2 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveDimensionRow(idx)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove row"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-slate-400 italic">
                            No specification rows added yet. Click "+ Add Row", "Import CSV", or select a Quick Template above.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Helpful Guide Note */}
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-blue-900">
                  <HelpCircle className="w-4 h-4 text-[#00A6FB] shrink-0 mt-0.5" />
                  <div>
                    <strong>How to manage tabular columns:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-blue-800 text-[11px]">
                      <li><strong>Inline editing:</strong> Simply type into the cells above and click <em>"+ Add Row"</em> to add new specs.</li>
                      <li><strong>CSV Upload:</strong> Click <em>"Import CSV"</em> to upload an Excel file exported as <code>.csv</code> (Columns: Parameter, Dimensions, Notes).</li>
                      <li><strong>Download template:</strong> Use <em>"Sample CSV"</em> to get a pre-formatted file ready for spreadsheet tools.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Description & Features */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Engineering Description *</label>
                <textarea
                  rows={4}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB] leading-relaxed resize-y break-words [overflow-wrap:anywhere]"
                  placeholder="Detailed technical description and operating characteristics..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Key Features (One bullet per line)</label>
                <textarea
                  rows={3}
                  value={editingProduct.features.join('\n')}
                  onChange={(e) => setEditingProduct({ 
                    ...editingProduct, 
                    features: e.target.value.split('\n').filter(f => f.trim().length > 0) 
                  })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                  placeholder="ISO 15552 standard compliance&#10;Hard chrome-plated rod&#10;Factory tested to 10 bar"
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 sticky bottom-0 bg-white py-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs font-bold shadow-md shadow-[#00A6FB]/20 transition-all flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Save Product & Specifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT / ADD JOB OPENING MODAL ================= */}
      {isJobModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <h2 className="text-lg font-bold font-heading text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00A6FB]" />
                {jobs.some(j => j.id === editingJob.id) ? 'Edit Career Opening' : 'Post New Career Opening'}
              </h2>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    placeholder="e.g. Senior CNC Milling Specialist"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Department *</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomJobDept(!isCustomJobDept)}
                      className="text-[11px] text-[#0086c9] hover:underline"
                    >
                      {isCustomJobDept ? 'Choose from list' : '+ Custom Department'}
                    </button>
                  </div>
                  {isCustomJobDept ? (
                    <input
                      type="text"
                      value={editingJob.department}
                      onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="Type custom department..."
                    />
                  ) : (
                    <select
                      value={editingJob.department}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Custom Department...') {
                          setIsCustomJobDept(true);
                        } else {
                          setEditingJob({ ...editingJob, department: val });
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      {JOB_DEPARTMENTS.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Location *</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomJobLocation(!isCustomJobLocation)}
                      className="text-[11px] text-[#0086c9] hover:underline"
                    >
                      {isCustomJobLocation ? 'Choose from list' : '+ Custom Location'}
                    </button>
                  </div>
                  {isCustomJobLocation ? (
                    <input
                      type="text"
                      value={editingJob.location}
                      onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="Type custom location..."
                    />
                  ) : (
                    <select
                      value={editingJob.location}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Custom Location...') {
                          setIsCustomJobLocation(true);
                        } else {
                          setEditingJob({ ...editingJob, location: val });
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      {JOB_LOCATIONS.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                  <select
                    value={editingJob.type}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700">Experience *</label>
                    <button
                      type="button"
                      onClick={() => setIsCustomJobExp(!isCustomJobExp)}
                      className="text-[11px] text-[#0086c9] hover:underline"
                    >
                      {isCustomJobExp ? 'Choose from list' : '+ Custom'}
                    </button>
                  </div>
                  {isCustomJobExp ? (
                    <input
                      type="text"
                      value={editingJob.experience}
                      onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                      required
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                      placeholder="Type custom experience..."
                    />
                  ) : (
                    <select
                      value={editingJob.experience}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Custom Experience...') {
                          setIsCustomJobExp(true);
                        } else {
                          setEditingJob({ ...editingJob, experience: val });
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                    >
                      {JOB_EXPERIENCES.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Summary Description</label>
                <textarea
                  rows={2}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                  placeholder="Lead precision set-up and multi-axis milling operations..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Detailed Role Overview</label>
                <textarea
                  rows={3}
                  value={editingJob.overview}
                  onChange={(e) => setEditingJob({ ...editingJob, overview: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                  placeholder="In-depth explanation of role responsibilities and equipment handled..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Key Highlights / Qualifications (One per line)</label>
                <textarea
                  rows={3}
                  value={editingJob.highlights.join('\n')}
                  onChange={(e) => setEditingJob({
                    ...editingJob,
                    highlights: e.target.value.split('\n').filter(h => h.trim().length > 0)
                  })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                  placeholder="5-Axis CNC Milling on Mazak Centers&#10;Micron-level accuracy (±0.005mm)&#10;ISO 9001 compliance standards"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs font-bold shadow-md shadow-[#00A6FB]/20 transition-all"
                >
                  Save Career Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= VIEW CANDIDATE APPLICATION MODAL ================= */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#0086c9] font-bold">Candidate Profile</span>
                <h2 className="text-xl font-bold font-heading text-slate-900">{viewingApp.candidateName}</h2>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-semibold">Applied For</span>
                  <span className="font-semibold text-slate-900">{viewingApp.jobTitle}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-semibold">Experience</span>
                  <span className="font-semibold text-slate-900">{viewingApp.experience || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-semibold">Email</span>
                  <span className="font-semibold text-slate-900">{viewingApp.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono font-semibold">Phone</span>
                  <span className="font-semibold text-slate-900">{viewingApp.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono font-semibold mb-1">Attached Resume / Document</span>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <FileText className="w-4 h-4 text-[#00A6FB]" />
                  <span className="font-mono text-slate-800 text-xs font-medium">{viewingApp.resumeFileName || 'Resume_Document.pdf'}</span>
                </div>
              </div>

              {viewingApp.coverLetter && (
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono font-semibold mb-1">Cover Note & Qualifications</span>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 leading-relaxed max-h-40 overflow-y-auto">
                    {viewingApp.coverLetter}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <select
                    value={viewingApp.status}
                    onChange={(e) => {
                      const next = e.target.value as any;
                      handleStatusChange(viewingApp.id, next);
                      setViewingApp({ ...viewingApp, status: next });
                    }}
                    className="bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 px-2 py-1 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                  >
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <button
                  onClick={() => setViewingApp(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
