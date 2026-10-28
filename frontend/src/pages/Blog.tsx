import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Clock, 
  X, 
  TrendingUp, 
  Check, 
  BookOpen,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Filter,
  Tag,
  Download,
  FileText,
  Phone,
  Mail,
  Headphones,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blogPosts';
import type { BlogPost } from '../data/blogPosts';

const TECHNICAL_RESOURCES = [
  { name: 'Pneumatics Catalog 2026', size: '1.8 MB', file: 'Hitech_Pneumatics_Catalog_2026.pdf' },
  { name: 'Machining Tolerances Chart', size: '920 KB', file: 'Manufacturing_Tolerances_Chart.pdf' },
  { name: 'ISO 9001:2015 Certificate', size: '1.2 MB', file: 'Hitech_ISO_9001_Certificate.pdf' },
  { name: 'Sheet Metal DFM Handbook', size: '2.5 MB', file: 'Sheet_Metal_DFM_Handbook.pdf' }
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);

  const handleDownload = (filename: string) => {
    setDownloadingFile(filename);
    setTimeout(() => {
      setDownloadingFile(null);
    }, 3000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setEmail(''), 3000);
    }
  };

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(post => post.isFeatured) || BLOG_POSTS[0];
  }, []);

  const popularPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => post.isPopular && post.id !== featuredPost.id).slice(0, 4);
  }, [featuredPost]);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      if (selectedCategory === 'All' && !searchQuery && post.id === featuredPost.id) {
        return false;
      }
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, featuredPost]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  return (
    <main className="bg-[#f8fafc] min-h-screen text-[#121212] pt-20 sm:pt-24 pb-24">
      
      {/* 1. HERO BANNER: EXACT SAME LENGTH & CURVATURE AS MANUFACTURING & CONTACT PAGES */}
      <section className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 mb-8 sm:mb-12">
        <div className="relative -mx-[0.5cm]" style={{ marginLeft: '-0.5cm', marginRight: '-0.5cm' }}>
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl sm:rounded-[22px] overflow-hidden relative shadow-xl min-h-[640px] sm:min-h-[720px] lg:min-h-[760px] flex flex-col justify-between p-6 sm:p-10 lg:p-12 text-white bg-black border border-gray-900"
          >
            {/* Background Looping High-Tech Media */}
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                poster="/hero_precision_bloom.jpg"
                className="w-full h-full object-cover opacity-75"
              >
                <source src="/boomerang_laser.mp4" type="video/mp4" />
                <source src="/boomerang_production.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/60 pointer-events-none" />
            </div>

            {/* Top Navigation Bar Inside Hero Card */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2 group">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    HITECH
                  </span>
                </Link>
                <span className="text-white/40 text-xs hidden sm:inline">|</span>
                <div className="hidden sm:flex items-center gap-2 text-xs text-white/70 font-normal">
                  <span className="text-white font-bold">EN</span>
                  <span>/</span>
                  <span className="hover:text-white cursor-pointer transition-colors">IN</span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-3">
                <Link 
                  to="/career"
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white hover:text-black backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-medium tracking-tight transition-all shadow-md flex items-center gap-2 group"
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#00A6FB] group-hover:text-black transition-colors" />
                  <span>Careers</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link 
                  to="/contact"
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-gray-100 text-black text-xs sm:text-sm font-medium tracking-tight transition-all shadow-md group"
                >
                  <span>Get in touch</span>
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Outlined Vertical / Giant Watermark Typography */}
            <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block z-10">
              <span 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-widest text-transparent uppercase opacity-20"
                style={{
                  writingMode: 'vertical-rl',
                  WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.75)'
                }}
              >
                INSIGHTS
              </span>
            </div>

            {/* Bottom Hero Content: Title, Subtitle, Search Bar + Breadcrumbs */}
            <div className="relative z-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-28 sm:pt-40">
              
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Sparkles className="w-5 h-5 text-[#00A6FB]" />
                  <span className="text-sm font-medium tracking-tight text-white/80">Insights &amp; Knowledge Base</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                  Engineering Insights <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00A6FB] via-[#4cc9f0] to-white">
                    &amp; Technical Knowledge
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-white/85 font-normal leading-relaxed max-w-lg">
                  In-depth analysis of precision machining, fiber laser cutting, DFM practices, metrology, and industrial automation.
                </p>

                {/* Integrated Search Bar */}
                <div className="pt-2 max-w-xl w-full">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setVisibleCount(6);
                      }}
                      placeholder="Search publications, processes, or keywords..."
                      className="w-full pl-12 pr-10 py-3.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white placeholder:text-gray-300 text-sm focus:outline-none focus:border-[#00A6FB] focus:ring-2 focus:ring-[#00A6FB]/20 transition-all shadow-xl"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Floating Breadcrumb Pill */}
              <div className="bg-white/95 backdrop-blur-md text-[#121212] px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-tight shadow-lg flex items-center gap-2 border border-white shrink-0 self-start lg:self-end">
                <Link to="/" className="text-[#64748b] hover:text-[#121212] transition-colors">Home</Link>
                <span className="text-[#94a3b8]">/</span>
                <span className="text-[#121212] font-semibold">Blog</span>
              </div>

            </div>

          </motion.div>
        </div>
      </section>

      {/* 2. MAIN CONTAINER */}
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-10 space-y-10">
        
        {/* CATEGORY TOOLBAR */}
        <div className="bg-white rounded-2xl p-3 border border-gray-200/90 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            {BLOG_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(6);
                }}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium tracking-tight transition-colors whitespace-nowrap z-10 ${
                  selectedCategory === category 
                    ? 'text-white' 
                    : 'text-gray-600 hover:text-[#121212] hover:bg-gray-100'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div 
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-[#121212] rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {category}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm font-medium tracking-tight text-[#64748b] px-4 border-l border-gray-200 flex-shrink-0">
            <Filter className="w-4 h-4 text-[#00A6FB]" />
            <span>{filteredPosts.length + (selectedCategory === 'All' && !searchQuery ? 1 : 0)} Articles</span>
          </div>
        </div>

        {/* FEATURED POST CARD */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setActivePost(featuredPost)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-200/90 hover:border-[#00A6FB]/50 shadow-sm hover:shadow-xl transition-all duration-300 grid lg:grid-cols-12 gap-0"
          >
            <div className="lg:col-span-7 h-72 lg:h-[420px] overflow-hidden relative">
              <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <span className="bg-[#121212] text-white text-xs font-medium tracking-tight px-3.5 py-1.5 rounded-lg shadow border border-white/10">
                  Featured Publication
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium tracking-tight text-[#64748b]">
                  <Tag className="w-3.5 h-3.5 text-[#00A6FB]" />
                  <span>{featuredPost.category}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-[#64748b] font-normal">{featuredPost.readingTime}</span>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#121212] group-hover:text-[#00A6FB] transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-[#475569] text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={featuredPost.author.avatarUrl} alt={featuredPost.author.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-[#121212]">{featuredPost.author.name}</p>
                    <p className="text-xs text-[#64748b]">{featuredPost.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#121212] text-white group-hover:bg-[#00A6FB] transition-colors shadow">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* MAIN ARTICLES GRID & STICKY SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ARTICLES GRID (8 COLS) */}
          <div className="lg:col-span-8 space-y-8">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200/90 p-8 space-y-3 shadow-sm">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <h4 className="text-base font-bold text-[#121212] tracking-tight">No articles matching query</h4>
                <p className="text-sm text-[#475569] max-w-sm mx-auto">We couldn't find any publications matching your selected filters.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="px-5 py-2.5 bg-[#121212] text-white rounded-full text-sm font-medium tracking-tight hover:bg-[#00A6FB] transition-colors mt-2"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                {visiblePosts.map((post, index) => {
                  // If odd count of posts and this is the last post, expand it to full 2-column width so zero empty gap exists!
                  const isOddLastItem = visiblePosts.length % 2 !== 0 && index === visiblePosts.length - 1;

                  if (isOddLastItem) {
                    return (
                      <motion.article 
                        key={post.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => setActivePost(post)}
                        className="group cursor-pointer bg-white rounded-2xl border border-gray-200/90 overflow-hidden hover:border-[#00A6FB]/50 hover:shadow-lg transition-all duration-300 sm:col-span-2 grid md:grid-cols-12 gap-0 items-center"
                      >
                        <div className="md:col-span-5 h-56 md:h-full overflow-hidden relative">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                          />
                          <span className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-md text-white text-xs font-medium tracking-tight px-3 py-1 rounded-md shadow-sm">
                            {post.category}
                          </span>
                        </div>
                        <div className="md:col-span-7 p-6 space-y-4 flex flex-col justify-between h-full">
                          <div className="space-y-2">
                            <span className="text-xs sm:text-sm font-medium tracking-tight text-[#64748b]">{post.category} • {post.readingTime}</span>
                            <h3 className="text-lg font-bold text-[#121212] group-hover:text-[#00A6FB] tracking-tight transition-colors leading-snug">
                              {post.title}
                            </h3>
                            <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-[#64748b] font-medium">
                            <div className="flex items-center gap-2">
                              <img src={post.author.avatarUrl} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                              <span className="text-sm font-medium text-[#121212]">{post.author.name}</span>
                            </div>
                            <span className="text-sm font-medium text-[#00A6FB] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                              Read Article <ArrowUpRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  }

                  return (
                    <motion.article 
                      key={post.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      onClick={() => setActivePost(post)}
                      className="group cursor-pointer bg-white rounded-2xl border border-gray-200/90 overflow-hidden hover:border-[#00A6FB]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full"
                    >
                      <div className="flex-1 flex flex-col justify-between">
                        {/* Thumbnail Image */}
                        <div className="h-48 flex-shrink-0 overflow-hidden relative">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                          />
                          <span className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-md text-white text-xs font-medium tracking-tight px-3 py-1 rounded-md shadow-sm">
                            {post.category}
                          </span>
                        </div>

                        {/* Content Container */}
                        <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                          <div className="space-y-2">
                            <h3 className="text-base sm:text-lg font-bold text-[#121212] group-hover:text-[#00A6FB] tracking-tight transition-colors line-clamp-2 leading-snug min-h-[2.75rem]">
                              {post.title}
                            </h3>
                            <p className="text-sm text-[#475569] line-clamp-2 leading-relaxed min-h-[2.25rem]">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer Metadata */}
                      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-[#64748b] font-medium bg-gray-50/50">
                        <div className="flex items-center gap-2">
                          <img src={post.author.avatarUrl} alt={post.author.name} className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-xs sm:text-sm font-medium text-[#121212] truncate max-w-[120px]">{post.author.name}</span>
                        </div>

                        <span className="flex items-center gap-1 text-xs text-[#64748b] font-normal">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime}
                        </span>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}

            {filteredPosts.length > visibleCount && (
              <div className="text-center pt-4">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-8 py-3 bg-white border border-gray-200/90 text-sm font-medium tracking-tight text-[#121212] rounded-full hover:bg-[#121212] hover:text-white transition-all shadow-sm"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>

          {/* STICKY FULL SIDEBAR (4 COLS) - Fills the entire right side height cleanly */}
          <aside className="lg:col-span-4 space-y-6 sticky top-28">
            
            {/* 1. TRENDING PUBLICATIONS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-bold tracking-tight text-[#121212] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#00A6FB]" /> Trending Articles
                </h3>
              </div>

              <div className="space-y-4">
                {popularPosts.map((post, idx) => (
                  <div 
                    key={post.id}
                    onClick={() => setActivePost(post)}
                    className="flex items-start gap-4 group cursor-pointer"
                  >
                    <span className="text-xl font-bold text-[#64748b] group-hover:text-[#00A6FB] transition-colors leading-none mt-0.5 w-6">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-medium tracking-tight text-[#64748b]">{post.category}</span>
                      <h4 className="text-sm font-semibold tracking-tight text-[#121212] group-hover:text-[#00A6FB] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs text-[#64748b]">{post.readingTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. NEWSLETTER WIDGET */}
            <div className="bg-[#051923] text-white rounded-2xl p-6 relative overflow-hidden shadow-lg space-y-4 border border-[#051923]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00A6FB]/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-1.5 relative z-10">
                <span className="text-xs font-medium tracking-tight text-[#00A6FB]">Engineering Digest</span>
                <h3 className="text-lg font-bold tracking-tight text-white">Stay Informed</h3>
                <p className="text-sm text-white/80 font-normal leading-relaxed">
                  Monthly technical papers, DFM guides, and manufacturing breakthroughs delivered to your inbox.
                </p>
              </div>

              {subscribed ? (
                <div className="bg-emerald-500/20 text-emerald-300 p-3 rounded-xl text-sm font-medium flex items-center gap-2 border border-emerald-500/30">
                  <Check className="w-4 h-4 text-emerald-400" /> Subscribed successfully!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5 relative z-10">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email" 
                    className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 text-sm focus:outline-none focus:border-[#00A6FB]"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-[#00A6FB] hover:bg-white hover:text-[#051923] text-white text-sm font-medium tracking-tight py-2.5 rounded-xl transition-all shadow"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>

            {/* 3. TECHNICAL RESOURCES & CATALOGS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                <FileText className="w-4 h-4 text-[#00A6FB]" />
                <h3 className="text-sm font-bold tracking-tight text-[#121212]">Technical Downloads</h3>
              </div>

              <div className="space-y-2.5">
                {TECHNICAL_RESOURCES.map((res) => (
                  <div 
                    key={res.file} 
                    onClick={() => handleDownload(res.name)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:border-[#00A6FB]/40 hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="p-2 bg-slate-100 text-slate-500 group-hover:bg-[#00A6FB]/10 group-hover:text-[#00A6FB] rounded-lg transition-colors flex-shrink-0">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[#121212] group-hover:text-[#00A6FB] transition-colors truncate">{res.name}</p>
                        <p className="text-xs text-[#64748b]">{res.size}</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400 group-hover:text-[#00A6FB] transition-colors flex-shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>

            {/* 4. TRENDING SEARCH TOPICS */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm space-y-3">
              <h4 className="text-xs font-semibold tracking-tight text-[#64748b]">Popular Topics</h4>
              <div className="flex flex-wrap gap-2">
                {['LaserCutting', 'CNCProcesses', 'MachiningTolerances', 'GearHobbing', 'MetalGrades', 'ISO9001Certified'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs font-medium text-[#475569] bg-gray-100 hover:bg-[#121212] hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. DIRECT ENGINEERING ADVICE */}
            <div className="bg-gradient-to-br from-[#0b2b3c] to-[#051923] text-white rounded-2xl p-6 space-y-4 shadow-md relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#00A6FB]">
                <Headphones className="w-4 h-4" />
                <span className="text-xs font-medium tracking-tight text-white/80">Engineering Helpline</span>
              </div>
              
              <div className="space-y-1">
                <h4 className="text-base font-bold tracking-tight text-white">Need Technical Support?</h4>
                <p className="text-xs sm:text-sm text-white/80 font-normal leading-relaxed">
                  Speak with our senior metrology and CAD engineers regarding tolerance specs or materials.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-2 text-sm font-medium text-white/90">
                <a href="tel:+914222648800" className="flex items-center gap-2 hover:text-[#00A6FB] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#00A6FB]" />
                  +91 (0422) 264-8800
                </a>
                <a href="mailto:services@hitechengineering.com" className="flex items-center gap-2 hover:text-[#00A6FB] transition-colors truncate">
                  <Mail className="w-3.5 h-3.5 text-[#00A6FB]" />
                  services@hitechengineering.com
                </a>
              </div>
            </div>

          </aside>

        </div>

      </div>

      {/* ARTICLE READER MODAL */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-md flex justify-center items-start md:items-center p-4 md:p-6">
            
            {/* Backdrop click */}
            <div className="fixed inset-0" onClick={() => setActivePost(null)} />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh] border border-gray-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-slate-900/80 hover:bg-slate-950 backdrop-blur-md text-white rounded-full transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1 scrollbar-thin">
                
                {/* Hero Banner Image */}
                <div className="h-64 md:h-96 relative w-full overflow-hidden">
                  <img 
                    src={activePost.imageUrl} 
                    alt={activePost.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 md:right-8 space-y-3 z-10 text-white">
                    <span className="bg-[#00A6FB] text-white text-xs font-medium tracking-tight px-3.5 py-1.5 rounded-md shadow-lg">
                      {activePost.category}
                    </span>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-white">
                      {activePost.title}
                    </h2>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 md:p-10 space-y-8">
                  
                  {/* Author & Date metadata bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={activePost.author.avatarUrl} alt={activePost.author.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                      <div>
                        <p className="text-sm font-bold text-[#121212] tracking-tight">{activePost.author.name}</p>
                        <p className="text-xs text-[#64748b]">{activePost.author.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-4 text-xs text-[#64748b] font-medium tracking-tight">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {activePost.publishedDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {activePost.readingTime}
                      </span>
                    </div>
                  </div>

                  {/* Body Paragraphs */}
                  <div className="text-[#475569] text-sm sm:text-base leading-relaxed space-y-6">
                    {activePost.content.map((paragraph, index) => (
                      <p key={index} className="font-normal">{paragraph}</p>
                    ))}

                    {/* Case Study Breakdown */}
                    {activePost.caseStudy && (
                      <div className="mt-8 space-y-6 pt-6 border-t border-gray-100">
                        <h3 className="text-lg md:text-xl font-bold text-[#121212] tracking-tight flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[#00A6FB]" />
                          Case Study Breakdown
                        </h3>
                        
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-red-50/60 border border-red-100 rounded-2xl p-5">
                            <h4 className="text-xs font-bold uppercase text-red-800 tracking-wider mb-2">Client Challenge</h4>
                            <p className="text-sm text-red-950 font-normal leading-relaxed">{activePost.caseStudy.challenge}</p>
                          </div>
                          
                          <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-5">
                            <h4 className="text-xs font-bold uppercase text-emerald-800 tracking-wider mb-2">Engineering Solution</h4>
                            <p className="text-sm text-emerald-950 font-normal leading-relaxed">{activePost.caseStudy.solution}</p>
                          </div>

                          <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-5">
                            <h4 className="text-xs font-bold uppercase text-blue-800 tracking-wider mb-2">Manufacturing Process</h4>
                            <p className="text-sm text-blue-950 font-normal leading-relaxed">{activePost.caseStudy.process}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5">
                              <h4 className="text-xs font-bold uppercase text-amber-800 tracking-wider mb-2">Measurable Results</h4>
                              <p className="text-sm text-amber-950 font-normal leading-relaxed">{activePost.caseStudy.results}</p>
                            </div>
                            <div className="bg-violet-50/60 border border-violet-100 rounded-2xl p-5">
                              <h4 className="text-xs font-bold uppercase text-violet-800 tracking-wider mb-2">Customer Outcome</h4>
                              <p className="text-sm text-violet-950 font-normal leading-relaxed">{activePost.caseStudy.outcome}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Close CTA */}
                  <div className="pt-8 border-t border-gray-100 flex justify-end">
                    <button 
                      onClick={() => setActivePost(null)}
                      className="bg-[#121212] hover:bg-[#00A6FB] text-white font-medium text-sm tracking-tight px-6 py-3 rounded-xl transition-colors"
                    >
                      Back to Publications
                    </button>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Download Toast Notification */}
      {downloadingFile && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#051923] text-white border border-white/20 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
          <div className="p-2 bg-[#00A6FB]/20 text-[#00A6FB] rounded-lg">
            <Download className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Downloading Catalog</p>
            <p className="text-sm font-bold">{downloadingFile}</p>
          </div>
        </div>
      )}

    </main>
  );
}
