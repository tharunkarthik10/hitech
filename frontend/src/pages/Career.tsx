import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  X, 
  Zap, 
  ShieldCheck, 
  GraduationCap, 
  HeartPulse, 
  Sparkles,
  Search,
  ChevronRight,
  Send,
  FileText,
  Sliders
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobSpecification {
  label: string;
  value: string;
}

interface JobPosition {
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
}

const JOB_POSITIONS: JobPosition[] = [
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Cutting-Edge Fleet',
    desc: 'Work with top-tier 5-axis CNCs, 12kW lasers, and robotic cells.'
  },
  {
    icon: HeartPulse,
    title: 'Health & Wellness',
    desc: 'Comprehensive medical insurance, regular check-ups, and safety gear.'
  },
  {
    icon: GraduationCap,
    title: 'Continuous Skill Growth',
    desc: 'Sponsored certifications, technical workshops, and mentorship.'
  },
  {
    icon: ShieldCheck,
    title: 'Job Security & Culture',
    desc: 'Stable 49+ year legacy, supportive team, and merit-based growth.'
  }
];

export default function Career() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Active Modals state
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'details' | 'apply'>('details');

  // Application Form State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantCover, setApplicantCover] = useState('');
  const [resumeName, setResumeName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const departments = ['All', 'Manufacturing', 'Fabrication', 'R&D / Systems', 'Quality Control', 'Engineering'];

  const filteredJobs = JOB_POSITIONS.filter(job => {
    const matchesDept = selectedDept === 'All' || job.department === selectedDept;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleOpenDetails = (job: JobPosition) => {
    setSelectedJob(job);
    setActiveModalTab('details');
  };

  const handleOpenApply = (job: JobPosition, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedJob(job);
    setActiveModalTab('apply');
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantPhone('');
    setApplicantCover('');
    setResumeName('');
  };

  return (
    <main className="w-full bg-[#f4f7f9] text-[#051923] font-body min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] min-h-[640px] w-full flex items-center justify-center overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop" 
            alt="Hitech Careers Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-4xl mx-auto w-full mt-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-heading tracking-tight"
          >
            Careers <span className="text-[#00A6FB]">at Hitech</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light"
          >
            Build the future of industrial automation across 5-axis machining, fiber lasers, and robotics.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 uppercase tracking-widest"
          >
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A6FB] mx-2"></span>
            <span className="text-white">Careers</span>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY HITECH / BENEFITS */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[#00A6FB] font-bold text-xs md:text-sm uppercase tracking-widest">Why Join Hitech</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#051923] font-heading">
              A Workplace Built for Excellence
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              We empower our engineers, operators, and designers with modern tools, safety-first workshops, and clear growth paths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100 hover:border-[#00A6FB]/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#00A6FB]/10 text-[#00A6FB] flex items-center justify-center mb-6 group-hover:bg-[#00A6FB] group-hover:text-white transition-colors duration-300">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#051923] mb-2 font-heading">{benefit.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS / JOB OFFERS SECTION */}
      <section className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#00A6FB] font-bold text-xs md:text-sm uppercase tracking-widest">Job Offers &amp; Roles</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#051923] font-heading mt-2">
              Available Positions ({filteredJobs.length})
            </h2>
            <p className="text-sm md:text-base text-gray-500 mt-1">Click on any offer card to view complete role specifications and requirements.</p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00A6FB] shadow-sm"
            />
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-6 py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider transition-all ${
                selectedDept === dept
                  ? 'bg-[#00A6FB] text-white shadow-md shadow-[#00A6FB]/20'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-500 border border-gray-200">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-xl font-bold text-gray-800">No matching positions found</p>
            <p className="text-base mt-1">Try selecting a different department or adjusting your search term.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                onClick={() => handleOpenDetails(job)}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 hover:border-[#00A6FB] hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#00A6FB] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-4 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1.5 bg-blue-50 text-[#00A6FB] rounded-md text-xs md:text-sm font-bold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {job.type} ({job.experience})
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#051923] font-heading group-hover:text-[#00A6FB] transition-colors flex items-center gap-3">
                    {job.title}
                    <span className="text-xs md:text-sm font-normal text-gray-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      (Click to view specifications)
                      <ArrowRight className="w-4 h-4 text-[#00A6FB]" />
                    </span>
                  </h3>

                  <p className="text-base md:text-lg text-gray-600 leading-relaxed font-normal">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {job.highlights.slice(0, 2).map((item, i) => (
                      <span key={i} className="text-xs md:text-sm bg-gray-50 text-gray-700 px-3.5 py-1.5 rounded-md border border-gray-100 flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#00A6FB]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 pt-4 lg:pt-0 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetails(job);
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#00A6FB]" />
                    Role Specs
                  </button>
                  <button
                    onClick={(e) => handleOpenApply(job, e)}
                    className="px-7 py-3.5 rounded-xl bg-[#051923] text-white hover:bg-[#00A6FB] text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md group-hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 4. GENERAL APPLICATION CTA */}
      <section className="pb-24 px-6 lg:px-12 max-w-[1400px] mx-auto">
        <div className="bg-gradient-to-r from-[#051923] to-[#0b2b3c] rounded-3xl p-8 md:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A6FB]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-4 max-w-2xl relative z-10">
            <span className="text-[#00A6FB] font-bold text-xs md:text-sm uppercase tracking-widest">Don't see your specific role?</span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading">Send Us Your Resume</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              We are constantly seeking talented machinists, automation specialists, and mechanical design talent. Drop us your resume and our HR desk will reach out when a slot opens.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#00A6FB] text-white hover:bg-white hover:text-[#051923] text-xs md:text-sm font-bold uppercase tracking-widest transition-all shadow-xl"
            >
              Contact HR Desk
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ROLE SPECIFICATION & APPLICATION MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-10 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-5 border-b border-gray-100 shrink-0">
                <div className="space-y-2 pr-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 bg-blue-50 text-[#00A6FB] rounded-md text-xs md:text-sm font-bold uppercase tracking-wider">
                      {selectedJob.department}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500 font-medium">
                      {selectedJob.location} • {selectedJob.type}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#051923] font-heading">{selectedJob.title}</h3>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Tabs Header */}
              <div className="flex border-b border-gray-200 mt-4 shrink-0">
                <button
                  onClick={() => setActiveModalTab('details')}
                  className={`py-3.5 px-6 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                    activeModalTab === 'details'
                      ? 'border-[#00A6FB] text-[#00A6FB]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <FileText className="w-4.5 h-4.5" />
                  Role Overview &amp; Specifications
                </button>
                <button
                  onClick={() => setActiveModalTab('apply')}
                  className={`py-3.5 px-6 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
                    activeModalTab === 'apply'
                      ? 'border-[#00A6FB] text-[#00A6FB]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Send className="w-4.5 h-4.5" />
                  Apply Now
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="overflow-y-auto py-6 space-y-6 flex-1 pr-2">
                {activeModalTab === 'details' ? (
                  <div className="space-y-6">
                    
                    {/* Role Overview */}
                    <div className="space-y-2">
                      <h4 className="text-xs md:text-sm font-bold uppercase text-[#00A6FB] tracking-widest">Role Overview</h4>
                      <p className="text-base md:text-lg text-gray-800 leading-relaxed bg-[#f8fafc] p-5 rounded-2xl border border-gray-100 font-normal">
                        {selectedJob.overview}
                      </p>
                    </div>

                    {/* Role Specifications Grid */}
                    <div className="space-y-3">
                      <h4 className="text-xs md:text-sm font-bold uppercase text-[#00A6FB] tracking-widest flex items-center gap-2">
                        <Sliders className="w-4.5 h-4.5" />
                        Role Specifications &amp; Parameters
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {selectedJob.specifications.map((spec, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-1">
                            <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider">{spec.label}</span>
                            <span className="block text-sm md:text-base font-bold text-[#051923]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Requirements & Capabilities */}
                    <div className="space-y-3">
                      <h4 className="text-xs md:text-sm font-bold uppercase text-[#00A6FB] tracking-widest">Key Requirements &amp; Capabilities</h4>
                      <div className="grid grid-cols-1 gap-2.5">
                        {selectedJob.highlights.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-sm md:text-base font-medium text-gray-800">
                            <CheckCircle2 className="w-5 h-5 text-[#00A6FB] shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div>
                    {submitted ? (
                      <div className="py-12 text-center space-y-6">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#051923] font-heading">Application Submitted!</h3>
                        <p className="text-gray-600 text-base max-w-md mx-auto">
                          Thank you for applying for the <span className="font-bold text-[#051923]">{selectedJob.title}</span> role. Our hiring team will review your credentials and contact you shortly.
                        </p>
                        <button
                          onClick={closeModal}
                          className="px-8 py-3.5 bg-[#051923] text-white rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-[#00A6FB] transition-colors"
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplySubmit} className="space-y-5">
                        <div className="bg-blue-50 p-4 rounded-xl text-sm md:text-base text-[#00A6FB] font-semibold flex items-center justify-between">
                          <span>Submitting profile for: <strong>{selectedJob.title}</strong></span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-800">Full Name *</label>
                            <input
                              type="text"
                              required
                              value={applicantName}
                              onChange={(e) => setApplicantName(e.target.value)}
                              placeholder="John Doe"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00A6FB]"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-sm font-bold text-gray-800">Email Address *</label>
                            <input
                              type="email"
                              required
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00A6FB]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-800">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00A6FB]"
                          />
                        </div>

                        {/* Resume Upload Simulation */}
                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-800">Upload Resume / CV (PDF or DOCX) *</label>
                          <div className="relative border-2 border-dashed border-gray-200 hover:border-[#00A6FB] rounded-xl p-5 text-center cursor-pointer transition-colors bg-gray-50">
                            <input
                              type="file"
                              required
                              accept=".pdf,.doc,.docx"
                              onChange={handleResumeChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center space-y-1.5 text-gray-500">
                              <Upload className="w-7 h-7 text-[#00A6FB]" />
                              <span className="text-sm font-semibold text-gray-800">
                                {resumeName ? resumeName : 'Click to select or drag & drop resume file'}
                              </span>
                              <span className="text-xs text-gray-400">PDF, DOCX up to 10MB</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-800">Cover Note / Brief Intro</label>
                          <textarea
                            rows={3}
                            value={applicantCover}
                            onChange={(e) => setApplicantCover(e.target.value)}
                            placeholder="Briefly describe your machining / automation experience..."
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:border-[#00A6FB]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full py-4 bg-[#00A6FB] text-white font-bold text-xs md:text-sm uppercase tracking-widest rounded-xl hover:bg-[#051923] transition-colors flex items-center justify-center gap-2 shadow-lg"
                        >
                          {submitting ? (
                            <span>Submitting Application...</span>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Submit Application
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer Bar */}
              {activeModalTab === 'details' && (
                <div className="pt-4 border-t border-gray-100 flex items-center justify-end shrink-0">
                  <button
                    onClick={() => setActiveModalTab('apply')}
                    className="px-8 py-3 rounded-xl bg-[#00A6FB] text-white hover:bg-[#051923] text-xs md:text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-md"
                  >
                    Proceed to Apply
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
