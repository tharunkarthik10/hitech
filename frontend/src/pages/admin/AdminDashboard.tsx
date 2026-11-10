import React, { useState, useEffect } from 'react';
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
import type { ProductDetailItem } from '../../data/products';
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
  AlertTriangle,
  X,
  Eye,
  Layers,
  Sparkles,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

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
    setTimeout(() => setToastMessage(null), 3000);
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

  // Product Actions
  const handleOpenNewProduct = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      title: '',
      category: 'Pneumatics',
      subGroup: 'General Components',
      department: 'Factory Automation',
      description: '',
      features: ['High durability precision finish', 'ISO standard certified tolerances'],
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=800&auto=format&fit=crop'
    });
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (prod: ProductDetailItem) => {
    setEditingProduct({ ...prod });
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

  // Job Actions
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

  // Application Actions
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
    <div className="min-h-screen bg-[#030d14] text-white flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#00A6FB] text-[#051923] font-semibold text-sm px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-white/20 animate-bounce">
          <CheckCircle className="w-4 h-4" />
          {toastMessage}
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#051923]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#00A6FB] text-[#051923] font-black flex items-center justify-center font-heading text-lg shadow-md">
              H
            </span>
            <div>
              <span className="font-heading font-black tracking-wider text-sm sm:text-base text-white block">
                HITECH ENGINEERING
              </span>
              <span className="text-[10px] text-[#00A6FB] tracking-widest uppercase font-mono block">
                Administrative Control Console
              </span>
            </div>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-300 font-mono text-[11px]">
              {currentUser?.email || 'admin@hitechengineering.com'}
            </span>
            {currentUser?.isLocalFallback && (
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-[#00A6FB] font-semibold">
                Admin
              </span>
            )}
          </div>

          <Link
            to="/"
            target="_blank"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs border border-white/10 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'products'
                  ? 'bg-[#00A6FB] text-[#051923] shadow-lg shadow-[#00A6FB]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalog</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === 'products' ? 'bg-[#051923]/30 text-[#051923]' : 'bg-white/10 text-gray-300'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('careers')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'careers'
                  ? 'bg-[#00A6FB] text-[#051923] shadow-lg shadow-[#00A6FB]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Job Openings</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === 'careers' ? 'bg-[#051923]/30 text-[#051923]' : 'bg-white/10 text-gray-300'
              }`}>
                {jobs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'applications'
                  ? 'bg-[#00A6FB] text-[#051923] shadow-lg shadow-[#00A6FB]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Candidate Resumes</span>
              <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                activeTab === 'applications' ? 'bg-[#051923]/30 text-[#051923]' : 'bg-white/10 text-gray-300'
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
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-gray-200 border border-white/10 transition-colors"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={handleOpenNewProduct}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-[#051923] font-bold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add New Product
                </button>
              </div>
            )}
            {activeTab === 'careers' && (
              <button
                onClick={handleOpenNewJob}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-[#051923] font-bold text-xs shadow-md transition-all"
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
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#051923]/60 p-4 rounded-2xl border border-white/5">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by title, category, spec..."
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00A6FB]"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      productCategoryFilter === cat
                        ? 'bg-[#00A6FB] text-[#051923] font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
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
                  className="bg-[#051923] border border-white/10 rounded-2xl overflow-hidden flex flex-col group hover:border-[#00A6FB]/40 transition-all shadow-lg"
                >
                  <div className="h-44 w-full relative overflow-hidden bg-black/50">
                    <img
                      src={prod.imageUrl}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#051923]/80 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#00A6FB] uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-gray-400">
                      ID: {prod.id}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">
                        {prod.subGroup || prod.department || 'Industrial Automation'}
                      </div>
                      <h3 className="font-heading font-bold text-base text-white group-hover:text-[#00A6FB] transition-colors line-clamp-1">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                        {prod.description}
                      </p>

                      {/* Feature tags */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {prod.features.slice(0, 2).map((feat, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded border border-white/5 line-clamp-1"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                      <Link
                        to={`/products/${prod.id}`}
                        target="_blank"
                        className="text-[11px] text-[#00A6FB] hover:underline flex items-center gap-1 font-semibold"
                      >
                        Preview <ExternalLink className="w-3 h-3" />
                      </Link>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(prod)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          title="Edit Product"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(prod.id, prod.title)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
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
              <div className="text-center py-16 bg-[#051923]/40 rounded-2xl border border-white/5">
                <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-semibold">No products found matching your filter.</p>
                <button
                  onClick={() => { setProductSearch(''); setProductCategoryFilter('All'); }}
                  className="mt-3 text-xs text-[#00A6FB] hover:underline"
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
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#051923]/60 p-4 rounded-2xl border border-white/5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search openings by role, department, location..."
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00A6FB]"
                />
              </div>

              <div className="text-xs text-gray-400">
                Displaying <strong className="text-white">{filteredJobs.length}</strong> active openings
              </div>
            </div>

            {/* Job Listings List */}
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-[#051923] border rounded-2xl p-6 transition-all ${
                    job.status === 'paused'
                      ? 'border-yellow-500/20 opacity-70'
                      : 'border-white/10 hover:border-[#00A6FB]/40'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00A6FB]/10 text-[#00A6FB] border border-[#00A6FB]/20">
                          {job.department}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {job.location}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {job.type} • {job.experience}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          job.status === 'paused'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {job.status === 'paused' ? 'Paused' : 'Active'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-white">
                        {job.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 max-w-3xl leading-relaxed">
                        {job.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <button
                        onClick={() => handleToggleJobStatus(job.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          job.status === 'paused'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                            : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20'
                        }`}
                      >
                        {job.status === 'paused' ? 'Activate' : 'Pause'}
                      </button>

                      <button
                        onClick={() => handleEditJob(job)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="Edit Job"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteJob(job.id, job.title)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
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
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#051923]/60 p-4 rounded-2xl border border-white/5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={applicationSearch}
                  onChange={(e) => setApplicationSearch(e.target.value)}
                  placeholder="Search applicant name, email, role..."
                  className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00A6FB]"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Hired', 'Rejected'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === st
                        ? 'bg-[#00A6FB] text-[#051923] font-bold'
                        : 'bg-white/5 text-gray-400 hover:text-white'
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
                  className="bg-[#051923] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-white text-base">
                        {app.candidateName}
                      </span>
                      <span className="text-xs text-[#00A6FB] font-semibold bg-[#00A6FB]/10 px-2.5 py-0.5 rounded-full border border-[#00A6FB]/20">
                        {app.jobTitle}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        app.status === 'Shortlisted' ? 'bg-emerald-500/20 text-emerald-400' :
                        app.status === 'Interview Scheduled' ? 'bg-purple-500/20 text-purple-300' :
                        app.status === 'Hired' ? 'bg-green-500/20 text-green-300' :
                        app.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400 flex-wrap">
                      <span className="inline-flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5 text-gray-500" />
                        {app.email}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-500" />
                        {app.phone}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-500" />
                        Submitted: {app.appliedAt}
                      </span>
                    </div>

                    {app.coverLetter && (
                      <p className="text-xs text-gray-300 bg-black/30 p-2.5 rounded-lg border border-white/5 line-clamp-2 max-w-3xl">
                        "{app.coverLetter}"
                      </p>
                    )}
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                      className="bg-black/40 border border-white/10 rounded-lg text-xs text-gray-200 px-2.5 py-1.5 focus:outline-none focus:border-[#00A6FB]"
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </select>

                    <button
                      onClick={() => setViewingApp(app)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                      title="View Full Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteApp(app.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {filteredApps.length === 0 && (
                <div className="text-center py-16 bg-[#051923]/40 rounded-2xl border border-white/5">
                  <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 text-sm font-semibold">No candidate resumes found in this view.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ================= EDIT / ADD PRODUCT MODAL ================= */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#051923] border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-[#00A6FB]" />
                {products.some(p => p.id === editingProduct.id) ? 'Edit Product Details' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Product Title</label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="e.g. 5-Port Solenoid Valve"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="e.g. Pneumatics, Hydraulics"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Sub-Group / Series</label>
                  <input
                    type="text"
                    value={editingProduct.subGroup || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subGroup: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="e.g. Cylinders, Directional Valves"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingProduct.department || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, department: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="e.g. Factory Automation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Image URL</label>
                <input
                  type="url"
                  value={editingProduct.imageUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Engineering Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  placeholder="Detailed technical description and operating characteristics..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Key Features (One per line)</label>
                <textarea
                  rows={3}
                  value={editingProduct.features.join('\n')}
                  onChange={(e) => setEditingProduct({ 
                    ...editingProduct, 
                    features: e.target.value.split('\n').filter(f => f.trim().length > 0) 
                  })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  placeholder="ISO 15552 standard compliance&#10;Hard chrome-plated rod&#10;Factory tested to 10 bar"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-[#051923] text-xs font-bold shadow-lg shadow-[#00A6FB]/20"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= EDIT / ADD JOB OPENING MODAL ================= */}
      {isJobModalOpen && editingJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#051923] border border-white/10 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00A6FB]" />
                {jobs.some(j => j.id === editingJob.id) ? 'Edit Career Opening' : 'Post New Career Opening'}
              </h2>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    value={editingJob.title}
                    onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="e.g. Senior CNC Milling Specialist"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="Manufacturing / Fabrication / R&D"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="Coimbatore Facility"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Employment Type</label>
                  <select
                    value={editingJob.type}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Experience</label>
                  <input
                    type="text"
                    value={editingJob.experience}
                    onChange={(e) => setEditingJob({ ...editingJob, experience: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                    placeholder="3+ Years"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Short Summary Description</label>
                <textarea
                  rows={2}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  placeholder="Lead precision set-up and multi-axis milling operations..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Detailed Role Overview</label>
                <textarea
                  rows={3}
                  value={editingJob.overview}
                  onChange={(e) => setEditingJob({ ...editingJob, overview: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  placeholder="In-depth explanation of role responsibilities and equipment handled..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Key Highlights / Qualifications (One per line)</label>
                <textarea
                  rows={3}
                  value={editingJob.highlights.join('\n')}
                  onChange={(e) => setEditingJob({
                    ...editingJob,
                    highlights: e.target.value.split('\n').filter(h => h.trim().length > 0)
                  })}
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#00A6FB]"
                  placeholder="5-Axis CNC Milling on Mazak Centers&#10;Micron-level accuracy (±0.005mm)&#10;ISO 9001 compliance standards"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00A6FB] hover:bg-[#0095e0] text-[#051923] text-xs font-bold shadow-lg shadow-[#00A6FB]/20"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#051923] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#00A6FB]">Candidate Profile</span>
                <h2 className="text-xl font-bold font-heading text-white">{viewingApp.candidateName}</h2>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-black/30 p-3 rounded-xl border border-white/5">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Applied For</span>
                  <span className="font-semibold text-white">{viewingApp.jobTitle}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Experience</span>
                  <span className="font-semibold text-white">{viewingApp.experience || 'Not specified'}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Email</span>
                  <span className="font-semibold text-white">{viewingApp.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono">Phone</span>
                  <span className="font-semibold text-white">{viewingApp.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-mono mb-1">Attached Resume / Document</span>
                <div className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/10 rounded-xl">
                  <FileText className="w-4 h-4 text-[#00A6FB]" />
                  <span className="font-mono text-white text-xs">{viewingApp.resumeFileName || 'Resume_Document.pdf'}</span>
                </div>
              </div>

              {viewingApp.coverLetter && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-mono mb-1">Cover Note & Qualifications</span>
                  <div className="p-3 bg-black/30 border border-white/5 rounded-xl text-gray-200 leading-relaxed max-h-40 overflow-y-auto">
                    {viewingApp.coverLetter}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Status:</span>
                  <select
                    value={viewingApp.status}
                    onChange={(e) => {
                      const next = e.target.value as any;
                      handleStatusChange(viewingApp.id, next);
                      setViewingApp({ ...viewingApp, status: next });
                    }}
                    className="bg-black/50 border border-white/10 rounded-lg text-xs text-white px-2 py-1"
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
                  className="px-4 py-1.5 rounded-lg bg-white/10 text-white font-semibold text-xs"
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
