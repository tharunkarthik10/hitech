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
  Table,
  Image as ImageIcon,
  Sparkles,
  Link2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { compressImage } from '../../utils/imageCompressor';

const PRESET_DEPARTMENTS = [
  'Pneumatics',
  'Electric Actuators',
  'Robotics',
  'Vacuum',
  'Hydraulics',
  'Electric',
  'Servo Systems & Gearbox',
  'Training Benches',
  'Custom Department...'
];

const PRESET_CATEGORIES_BY_DEPT: Record<string, string[]> = {
  'Pneumatics': [
    'Cylinders',
    'Air Preparation Unit',
    'Directional Control Valve',
    'One Touch Fittings',
    'Compact Valves',
    'Pneumatic Grippers',
    'Tubing & Connectors',
    'Mountings & Accessories'
  ],
  'Electric Actuators': [
    'Linear Actuators',
    'Motion Drive Modules',
    'Rodless Cylinders',
    'Precision Slides',
    'Electric Cylinders'
  ],
  'Robotics': [
    'Robotic Automation',
    '6-Axis Articulated Robots',
    'SCARA Robots',
    'Delta Robots',
    'Robotic Grippers',
    'Welding Automation Cells'
  ],
  'Vacuum': [
    'Vacuum Generators & Cups',
    'Suction Pads',
    'Vacuum Ejectors',
    'Vacuum Switches & Sensors'
  ],
  'Hydraulics': [
    'Hydraulic Power Units',
    'Control Components',
    'Hydraulic Cylinders',
    'Proportional Valves',
    'Pumps & Motors'
  ],
  'Electric': [
    'AC Drives & Inverters',
    'Servo Motors',
    'Sensors & Proximity Switches',
    'PLC & HMI Controllers',
    'Control Components'
  ],
  'Servo Systems & Gearbox': [
    'Planetary Gearboxes',
    'Servo Drives',
    'Precision Reducers',
    'Right Angle Gearboxes',
    'Motion Drive Modules'
  ],
  'Training Benches': [
    'Pneumatic Training Benches',
    'Hydraulic Training Benches',
    'PLC Automation Trainer Benches',
    'Educational Test Rigs',
    'Cut-Section Working Models',
    'Sensorics Training Modules'
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
  const [editingProduct, setEditingProduct] = useState<ProductDetailItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [isProcessingImages, setIsProcessingImages] = useState(false);
  const [cardActiveImage, setCardActiveImage] = useState<Record<string, number>>({});

  // Custom Dropdown Fallback States
  const [isCustomDept, setIsCustomDept] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const [isCustomJobDept, setIsCustomJobDept] = useState(false);
  const [isCustomJobLocation, setIsCustomJobLocation] = useState(false);
  const [isCustomJobExp, setIsCustomJobExp] = useState(false);

  // File Upload Refs
  const imageFileInputRef = useRef<HTMLInputElement | null>(null);

  // Careers State
  const [jobs, setJobs] = useState<JobPosition[]>([]);
  const [jobSearch, setJobSearch] = useState('');
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  // Applications State
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [applicationSearch, setApplicationSearch] = useState('');
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
    const dept = editingProduct?.department || 'Pneumatics';
    const presets = PRESET_CATEGORIES_BY_DEPT[dept] || PRESET_CATEGORIES_BY_DEPT['Pneumatics'] || [];
    const existing = products.filter(p => p.department === dept).map(p => p.category);
    return Array.from(new Set([...presets, ...existing]));
  }, [editingProduct?.department, products]);

  // --- PRODUCT MANAGEMENT ---
  const handleOpenNewProduct = () => {
    const defaultHeaders = ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];
    const defaultDims: ProductDimensionRow[] = [
      { param: 'Standard Bore Range', dimension: 'Ø 32, 40, 50, 63, 80 mm', notes: 'ISO 15552', values: ['Standard Bore Range', 'Ø 32, 40, 50, 63, 80 mm', 'ISO 15552'] },
      { param: 'Operating Pressure', dimension: '1.0 to 10.0 Bar', notes: 'Proof test: 15 Bar', values: ['Operating Pressure', '1.0 to 10.0 Bar', 'Proof test: 15 Bar'] },
      { param: 'Operating Temperature', dimension: '-20°C to +80°C', notes: 'PU / NBR Seals', values: ['Operating Temperature', '-20°C to +80°C', 'PU / NBR Seals'] }
    ];
    setEditingProduct({
      id: `prod-${Date.now()}`,
      title: '',
      department: 'Pneumatics',
      category: 'Cylinders',
      subGroup: 'Cylinders',
      description: '',
      features: ['High durability precision finish', 'ISO standard certified tolerances'],
      imageUrl: '',
      images: [],
      dimensionHeaders: defaultHeaders,
      dimensions: defaultDims
    });
    setIsCustomDept(false);
    setIsCustomCategory(false);
    setShowUrlFallback(false);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (prod: ProductDetailItem) => {
    const isCustomD = !PRESET_DEPARTMENTS.slice(0, 8).includes(prod.department || '');
    const isCustomC = !Object.values(PRESET_CATEGORIES_BY_DEPT).flat().includes(prod.category || '');
    const initialImages = prod.images && prod.images.length > 0 
      ? prod.images 
      : (prod.imageUrl ? [prod.imageUrl] : []);

    const headers = prod.dimensionHeaders && prod.dimensionHeaders.length > 0
      ? prod.dimensionHeaders
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];

    const rawDims = prod.dimensions && prod.dimensions.length > 0
      ? prod.dimensions
      : [
          { param: 'Standard Bore Range', dimension: 'Ø 32, 40, 50, 63, 80 mm', notes: 'ISO 15552' },
          { param: 'Operating Pressure', dimension: '1.0 to 10.0 Bar', notes: 'Proof test: 15 Bar' },
          { param: 'Operating Temperature', dimension: '-20°C to +80°C', notes: 'PU / NBR Seals' }
        ];

    const normalizedDims = rawDims.map(row => {
      const vals = row.values && row.values.length > 0
        ? [...row.values]
        : [row.param || '', row.dimension || '', row.notes || ''];
      while (vals.length < headers.length) vals.push('');
      return {
        ...row,
        param: vals[0] || '',
        dimension: vals[1] || '',
        notes: vals[2] || '',
        values: vals
      };
    });

    setEditingProduct({ 
      ...prod,
      department: prod.department || 'Pneumatics',
      imageUrl: prod.imageUrl || (initialImages[0] || ''),
      images: initialImages,
      dimensionHeaders: headers,
      dimensions: normalizedDims
    });
    setIsCustomDept(isCustomD);
    setIsCustomCategory(isCustomC);
    setShowUrlFallback(false);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title.trim()) return;

    const images = editingProduct.images && editingProduct.images.length > 0
      ? editingProduct.images
      : (editingProduct.imageUrl ? [editingProduct.imageUrl] : []);

    const headers = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
      ? editingProduct.dimensionHeaders
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];

    const cleanDims = (editingProduct.dimensions || []).map(row => {
      const vals = row.values && row.values.length > 0
        ? [...row.values]
        : [row.param || '', row.dimension || '', row.notes || ''];
      while (vals.length < headers.length) vals.push('');
      return {
        ...row,
        param: vals[0] || '',
        dimension: vals[1] || '',
        notes: vals[2] || '',
        values: vals
      };
    });

    const productToSave: ProductDetailItem = {
      ...editingProduct,
      imageUrl: images[0] || editingProduct.imageUrl || '',
      images: images,
      subGroup: editingProduct.category,
      dimensionHeaders: headers,
      dimensions: cleanDims
    };

    saveStoredProduct(productToSave);
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

  // --- MULTI-IMAGE FILE UPLOAD & MANAGEMENT (AUTO COMPRESSION) ---
  const processImageFiles = async (files: FileList | File[]) => {
    const fileList = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileList.length === 0) {
      alert('Please select valid image files (PNG, JPG, WEBP, or SVG).');
      return;
    }

    setIsProcessingImages(true);
    try {
      // Compress each image to HD ~70KB WebP/JPEG so multiple images never exceed storage limits
      const compressedUrls = await Promise.all(
        fileList.map(file => compressImage(file, 1280, 1280, 0.82))
      );

      const validUrls = compressedUrls.filter(Boolean);
      if (validUrls.length > 0) {
        setEditingProduct((prev) => {
          if (!prev) return null;
          const existingImages = prev.images && prev.images.length > 0 
            ? prev.images 
            : (prev.imageUrl ? [prev.imageUrl] : []);
          const combined = [...existingImages, ...validUrls];
          return {
            ...prev,
            imageUrl: combined[0] || '',
            images: combined
          };
        });
        showToast(`Uploaded & optimized ${validUrls.length} image(s).`);
      }
    } catch (err) {
      console.error('Error processing images:', err);
      alert('Failed to process image files.');
    } finally {
      setIsProcessingImages(false);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processImageFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingImage(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processImageFiles(e.dataTransfer.files);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setEditingProduct((prev) => {
      if (!prev) return null;
      const existing = prev.images && prev.images.length > 0
        ? [...prev.images]
        : (prev.imageUrl ? [prev.imageUrl] : []);

      existing.splice(indexToRemove, 1);
      const newPrimary = existing[0] || '';
      return {
        ...prev,
        imageUrl: newPrimary,
        images: existing
      };
    });
    showToast('Image removed.');
  };

  const handleSetPrimaryImage = (index: number) => {
    setEditingProduct((prev) => {
      if (!prev) return null;
      const existing = prev.images && prev.images.length > 0
        ? [...prev.images]
        : (prev.imageUrl ? [prev.imageUrl] : []);

      if (index >= 0 && index < existing.length) {
        const selected = existing.splice(index, 1)[0];
        const reordered = [selected, ...existing];
        return {
          ...prev,
          imageUrl: selected,
          images: reordered
        };
      }
      return prev;
    });
    showToast('Set as main product photo.');
  };

  const handleAddImageUrl = (urlToAdd: string) => {
    if (!urlToAdd.trim()) return;
    setEditingProduct((prev) => {
      if (!prev) return null;
      const existing = prev.images && prev.images.length > 0
        ? [...prev.images]
        : (prev.imageUrl ? [prev.imageUrl] : []);
      const updated = [...existing, urlToAdd.trim()];
      return {
        ...prev,
        imageUrl: updated[0] || '',
        images: updated
      };
    });
    showToast('Image link added.');
  };

  // --- TABULAR COLUMN (DIMENSIONS) HANDLING ---
  const handleAddColumn = () => {
    if (!editingProduct) return;
    const currentHeaders = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
      ? [...editingProduct.dimensionHeaders]
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];
    
    const newColName = `Column ${currentHeaders.length + 1}`;
    const nextHeaders = [...currentHeaders, newColName];

    const nextDims = (editingProduct.dimensions || []).map(row => {
      const vals = row.values && row.values.length > 0
        ? [...row.values]
        : [row.param || '', row.dimension || '', row.notes || ''];
      vals.push('');
      return {
        ...row,
        param: vals[0] || '',
        dimension: vals[1] || '',
        notes: vals[2] || '',
        values: vals
      };
    });

    setEditingProduct({
      ...editingProduct,
      dimensionHeaders: nextHeaders,
      dimensions: nextDims
    });
    showToast(`Added new column "${newColName}".`);
  };

  const handleRemoveColumn = (colIndex: number) => {
    if (!editingProduct) return;
    const currentHeaders = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
      ? [...editingProduct.dimensionHeaders]
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];
    
    if (currentHeaders.length <= 1) {
      alert('The table must have at least one column.');
      return;
    }

    const colName = currentHeaders[colIndex];
    const nextHeaders = currentHeaders.filter((_, i) => i !== colIndex);

    const nextDims = (editingProduct.dimensions || []).map(row => {
      const vals = row.values && row.values.length > 0
        ? [...row.values]
        : [row.param || '', row.dimension || '', row.notes || ''];
      const filteredVals = vals.filter((_, i) => i !== colIndex);
      return {
        ...row,
        param: filteredVals[0] || '',
        dimension: filteredVals[1] || '',
        notes: filteredVals[2] || '',
        values: filteredVals
      };
    });

    setEditingProduct({
      ...editingProduct,
      dimensionHeaders: nextHeaders,
      dimensions: nextDims
    });
    showToast(`Removed column "${colName}".`);
  };

  const handleUpdateColumnHeader = (colIndex: number, newTitle: string) => {
    if (!editingProduct) return;
    const currentHeaders = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
      ? [...editingProduct.dimensionHeaders]
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];
    
    currentHeaders[colIndex] = newTitle;
    setEditingProduct({
      ...editingProduct,
      dimensionHeaders: currentHeaders
    });
  };

  const handleUpdateCell = (rowIndex: number, colIndex: number, value: string) => {
    if (!editingProduct || !editingProduct.dimensions) return;
    const currentHeaders = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
      ? editingProduct.dimensionHeaders
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];

    const nextDims = [...editingProduct.dimensions];
    const row = nextDims[rowIndex];
    const vals = row.values && row.values.length > 0
      ? [...row.values]
      : [row.param || '', row.dimension || '', row.notes || ''];
    
    while (vals.length < currentHeaders.length) vals.push('');
    vals[colIndex] = value;

    nextDims[rowIndex] = {
      ...row,
      param: vals[0] || '',
      dimension: vals[1] || '',
      notes: vals[2] || '',
      values: vals
    };

    setEditingProduct({
      ...editingProduct,
      dimensions: nextDims
    });
  };

  const handleAddDimensionRow = () => {
    if (!editingProduct) return;
    const currentHeaders = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
      ? editingProduct.dimensionHeaders
      : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];

    const emptyVals = new Array(currentHeaders.length).fill('');
    const newRow: ProductDimensionRow = {
      param: '',
      dimension: '',
      notes: '',
      values: emptyVals
    };

    setEditingProduct({
      ...editingProduct,
      dimensions: [...(editingProduct.dimensions || []), newRow]
    });
  };

  const handleRemoveDimensionRow = (index: number) => {
    if (!editingProduct || !editingProduct.dimensions) return;
    setEditingProduct({
      ...editingProduct,
      dimensions: editingProduct.dimensions.filter((_, i) => i !== index)
    });
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
  const filteredProducts = products.filter(p => {
    const q = productSearch.toLowerCase().trim();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || 
           p.category.toLowerCase().includes(q) ||
           (p.department && p.department.toLowerCase().includes(q)) ||
           p.description.toLowerCase().includes(q);
  });

  // Filtered Jobs
  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.department.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Filtered Applications
  const filteredApps = applications.filter(a => {
    const q = applicationSearch.toLowerCase().trim();
    if (!q) return true;
    return a.candidateName.toLowerCase().includes(q) ||
           a.jobTitle.toLowerCase().includes(q) ||
           a.email.toLowerCase().includes(q) ||
           (a.phone && a.phone.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-[#00A6FB] text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-blue-400 animate-bounce max-w-[90vw]">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-8 py-3 sm:py-3.5 flex items-center justify-between shadow-sm w-full max-w-full">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="w-8 h-8 rounded-lg bg-[#00A6FB] text-white font-black flex items-center justify-center font-heading text-lg shadow-sm shrink-0">
              H
            </span>
            <div className="min-w-0">
              <span className="font-heading font-black tracking-wider text-xs sm:text-base text-slate-900 block truncate">
                HITECH ENGINEERING
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#0086c9] tracking-widest uppercase font-mono block font-bold truncate">
                Administrative Control Console
              </span>
            </div>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 font-mono text-[11px] font-medium">
              {currentUser?.email || 'contact@hitechengineering.works'}
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
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-semibold transition-colors shadow-sm cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 min-w-0">
        {/* Navigation Tabs & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8 border-b border-slate-200 pb-3 sm:pb-4">
          {/* Scrollable Tabs Bar on Mobile */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1.5 sm:pb-0 no-scrollbar flex items-center gap-1.5 sm:gap-2 -mx-1 px-1">
            <button
              onClick={() => setActiveTab('products')}
              className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Package className="w-4 h-4 shrink-0" />
              <span>Products Catalog</span>
              <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'products' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Job Openings</span>
              <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'careers' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {jobs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`shrink-0 flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Candidate Resumes</span>
              <span className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold ${
                activeTab === 'applications' ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {applications.length}
              </span>
            </button>
          </div>

          {/* Action Button depending on tab - Sized and aligned on mobile */}
          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            {activeTab === 'products' && (
              <button
                onClick={handleOpenNewProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-white font-bold text-xs shadow-md shadow-[#00A6FB]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 shrink-0" />
                <span>Add New Product</span>
              </button>
            )}
            {activeTab === 'careers' && (
              <button
                onClick={handleOpenNewJob}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-white font-bold text-xs shadow-md shadow-[#00A6FB]/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Opening</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= PRODUCTS TAB ================= */}
        {activeTab === 'products' && (
          <div className="space-y-5 sm:space-y-6">
            {/* Filter Bar */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title, category, department, or specs..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00A6FB] transition-colors"
                />
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-[#00A6FB] hover:shadow-lg hover:shadow-slate-200/50 transition-all shadow-sm"
                >
                  {(() => {
                    const allImages = prod.images && prod.images.length > 0 ? prod.images : (prod.imageUrl ? [prod.imageUrl] : []);
                    const activeIdx = (cardActiveImage[prod.id] || 0) % (allImages.length || 1);
                    const currentImg = allImages[activeIdx] || prod.imageUrl;

                    return (
                      <>
                        <div className="h-44 w-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                          {currentImg ? (
                            <img
                              src={currentImg}
                              alt={prod.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400">
                              <ImageIcon className="w-10 h-10 mb-1" />
                              <span className="text-xs">No image uploaded</span>
                            </div>
                          )}
                          <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md border border-slate-200/80 px-2 py-0.5 rounded-full text-[10px] font-mono text-[#0086c9] uppercase tracking-wider font-bold shadow-xs max-w-[55%] truncate">
                            {prod.category}
                          </span>
                          <span className="absolute top-2.5 right-2.5 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white max-w-[42%] truncate">
                            ID: {prod.id}
                          </span>

                          {/* Interactive arrows on the card to browse all images */}
                          {allImages.length > 1 && (
                            <>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setCardActiveImage(prev => ({
                                    ...prev,
                                    [prod.id]: (activeIdx - 1 + allImages.length) % allImages.length
                                  }));
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                                title="Previous photo"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setCardActiveImage(prev => ({
                                    ...prev,
                                    [prod.id]: (activeIdx + 1) % allImages.length
                                  }));
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                                title="Next photo"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                              <span className="absolute bottom-2.5 right-2.5 bg-slate-900/85 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white flex items-center gap-1 font-medium shadow">
                                <ImageIcon className="w-3 h-3 text-[#00A6FB]" />
                                {activeIdx + 1} / {allImages.length}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Mini thumbnail strip on posting side card */}
                        {allImages.length > 1 && (
                          <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
                            {allImages.map((img, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setCardActiveImage(prev => ({ ...prev, [prod.id]: i }));
                                }}
                                className={`w-7 h-7 rounded-md overflow-hidden shrink-0 border transition-all cursor-pointer ${
                                  activeIdx === i ? 'border-[#00A6FB] ring-2 ring-[#00A6FB]/40' : 'border-slate-200 opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                            <span className="text-[10px] font-mono text-slate-400 ml-auto shrink-0">
                              {allImages.length} photos
                            </span>
                          </div>
                        )}
                      </>
                    );
                  })()}

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                        {prod.department ? `${prod.department} • ${prod.category}` : prod.category}
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
                  onClick={() => setProductSearch('')}
                  className="mt-3 text-xs text-[#00A6FB] font-semibold hover:underline"
                >
                  Clear search
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
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={applicationSearch}
                  onChange={(e) => setApplicationSearch(e.target.value)}
                  placeholder="Search applicant name, email, role, or phone..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#00A6FB] transition-colors"
                />
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

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 shrink-0 w-full md:w-auto pt-2.5 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <button
                      onClick={() => setViewingApp(app)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
                      title="View Full Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-100 shadow-xs cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl relative my-auto sm:my-8 text-slate-800 max-h-[94vh] sm:max-h-[92vh] overflow-y-auto">
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
              {/* Product Title */}
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

              {/* Department & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      value={editingProduct.department || 'Pneumatics'}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'Custom Department...') {
                          setIsCustomDept(true);
                        } else {
                          const cats = PRESET_CATEGORIES_BY_DEPT[val] || [];
                          setEditingProduct({
                            ...editingProduct,
                            department: val,
                            category: cats[0] || editingProduct.category,
                            subGroup: cats[0] || editingProduct.category
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
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value, subGroup: e.target.value })}
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
                          setEditingProduct({
                            ...editingProduct,
                            category: val,
                            subGroup: val
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
              </div>

              {/* ----------------- MULTI-IMAGE UPLOAD SECTION ----------------- */}
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
                onDragLeave={() => setIsDraggingImage(false)}
                onDrop={handleImageDrop}
                className={`bg-slate-50 p-4 sm:p-5 rounded-2xl border transition-all ${
                  isDraggingImage ? 'border-[#00A6FB] bg-blue-50/60 ring-2 ring-[#00A6FB]/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[#00A6FB]" />
                      Product Photos (Upload Multiple Images)
                      {editingProduct.images && editingProduct.images.length > 0 && (
                        <span className="ml-1.5 px-2 py-0.5 rounded-full text-[11px] bg-blue-100 text-[#0086c9] font-bold">
                          {editingProduct.images.length} {editingProduct.images.length === 1 ? 'image' : 'images'}
                        </span>
                      )}
                    </label>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Select multiple images at once or drag them in. Click the red ✕ on any thumbnail to remove it.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowUrlFallback(!showUrlFallback)}
                    className="text-[11px] text-[#0086c9] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Link2 className="w-3 h-3" />
                    {showUrlFallback ? 'Hide URL paste' : 'Or paste image URL'}
                  </button>
                </div>

                {/* Processing State */}
                {isProcessingImages && (
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-[#0086c9] font-semibold animate-pulse">
                    <Sparkles className="w-4 h-4 animate-spin text-[#00A6FB]" />
                    Optimizing & uploading images for crisp display...
                  </div>
                )}

                {/* Hidden Multi-File Input */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={imageFileInputRef}
                  onChange={handleImageFileChange}
                  className="hidden"
                />

                {/* Thumbnails Gallery */}
                {((editingProduct.images && editingProduct.images.length > 0) || editingProduct.imageUrl) ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {(editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.imageUrl]).map((imgSrc, idx) => (
                        <div
                          key={idx}
                          className="relative group rounded-xl overflow-hidden border-2 border-slate-200 bg-white aspect-square shadow-2xs hover:border-[#00A6FB] transition-all"
                        >
                          <img
                            src={imgSrc}
                            alt={`Product photo ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />

                          {/* Primary Badge */}
                          {idx === 0 ? (
                            <span className="absolute bottom-1.5 left-1.5 bg-[#00A6FB] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                              Main Photo
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="absolute bottom-1.5 left-1.5 opacity-0 group-hover:opacity-100 bg-slate-900/85 hover:bg-[#00A6FB] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded transition-all shadow"
                              title="Set as main photo"
                            >
                              Make Main
                            </button>
                          )}

                          {/* Red '✕' Delete Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveImage(idx);
                            }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer"
                            title="Remove this image"
                          >
                            <X className="w-3.5 h-3.5 stroke-[2.5]" />
                          </button>
                        </div>
                      ))}

                      {/* Add More Photos Card in the Grid */}
                      <button
                        type="button"
                        onClick={() => imageFileInputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-slate-300 hover:border-[#00A6FB] bg-white hover:bg-blue-50/50 flex flex-col items-center justify-center text-slate-500 hover:text-[#00A6FB] transition-all group cursor-pointer"
                      >
                        <Plus className="w-6 h-6 mb-1 text-slate-400 group-hover:text-[#00A6FB] group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold">Add Photos</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Drag more images into this area or click "+ Add Photos"</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Remove all uploaded photos for this product?')) {
                            setEditingProduct({ ...editingProduct, imageUrl: '', images: [] });
                          }
                        }}
                        className="text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        Clear All Photos
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Empty state Drag & Drop Zone */
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
                    onDragLeave={() => setIsDraggingImage(false)}
                    onDrop={handleImageDrop}
                    onClick={() => imageFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      isDraggingImage
                        ? 'border-[#00A6FB] bg-blue-50/50'
                        : 'border-slate-300 hover:border-[#00A6FB] bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-[#00A6FB] flex items-center justify-center mx-auto">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        Click to select images or drag & drop files here
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Supports multiple PNG, JPG, WEBP, or SVG files at once
                      </p>
                    </div>
                  </div>
                )}

                {/* Optional Direct URL Paste */}
                {showUrlFallback && (
                  <div className="mt-3 pt-3 border-t border-slate-200">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Add Direct Image Web Link
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        id="direct-img-url-input"
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#00A6FB]"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            handleAddImageUrl(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('direct-img-url-input') as HTMLInputElement;
                          if (input && input.value) {
                            handleAddImageUrl(input.value);
                            input.value = '';
                          }
                        }}
                        className="px-4 py-2 bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                      >
                        Add URL
                      </button>
                    </div>
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

                  {/* Table Actions Toolbar: Add Column & Add Row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAddColumn}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs cursor-pointer"
                      title="Add a new column to the table"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Column
                    </button>

                    <button
                      type="button"
                      onClick={handleAddDimensionRow}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00A6FB] hover:bg-[#0095e0] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                      title="Add a new row to the table"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Row
                    </button>
                  </div>
                </div>

                {/* Interactive Dynamic Column & Row Table */}
                {(() => {
                  const headers = editingProduct.dimensionHeaders && editingProduct.dimensionHeaders.length > 0
                    ? editingProduct.dimensionHeaders
                    : ['Parameter', 'Available Dimensions / Values', 'Standard / Tolerance'];

                  return (
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                      <table className="w-full text-left text-xs border-collapse min-w-[560px]">
                        <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                          <tr>
                            {headers.map((h, colIdx) => (
                              <th key={colIdx} className="py-2.5 px-3 min-w-[170px]">
                                <div className="flex items-center gap-1.5 group">
                                  <input
                                    type="text"
                                    value={h}
                                    onChange={(e) => handleUpdateColumnHeader(colIdx, e.target.value)}
                                    placeholder={`Column ${colIdx + 1}`}
                                    className="w-full bg-transparent border-b border-transparent hover:border-slate-300 focus:border-[#00A6FB] px-1 py-0.5 font-bold uppercase text-[11px] text-slate-800 focus:outline-none transition-colors"
                                    title="Click to rename column header"
                                  />
                                  {headers.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveColumn(colIdx)}
                                      className="opacity-40 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-600 rounded transition-opacity cursor-pointer shrink-0"
                                      title="Delete this column"
                                    >
                                      <X className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </th>
                            ))}
                            <th className="py-2.5 px-2 text-center w-12 shrink-0">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {(editingProduct.dimensions && editingProduct.dimensions.length > 0) ? (
                            editingProduct.dimensions.map((row, rowIdx) => {
                              const cells = row.values && row.values.length > 0
                                ? row.values
                                : [row.param || '', row.dimension || '', row.notes || ''];

                              return (
                                <tr key={rowIdx} className="hover:bg-slate-50/70 transition-colors">
                                  {headers.map((_, colIdx) => (
                                    <td key={colIdx} className="p-2">
                                      <input
                                        type="text"
                                        value={cells[colIdx] || ''}
                                        onChange={(e) => handleUpdateCell(rowIdx, colIdx, e.target.value)}
                                        placeholder={`Enter ${headers[colIdx]}...`}
                                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:bg-white focus:border-[#00A6FB]"
                                      />
                                    </td>
                                  ))}
                                  <td className="p-2 text-center shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveDimensionRow(rowIdx)}
                                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                      title="Remove row"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={headers.length + 1} className="py-6 text-center text-slate-400 italic">
                                No specification rows added yet. Click "+ Add Row" or "+ Add Column" to build your table.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  );
                })()}
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative my-auto sm:my-8 text-slate-800">
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl relative my-auto text-slate-800">
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

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end">
                <button
                  onClick={() => setViewingApp(null)}
                  className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
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
