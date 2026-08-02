import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Mail, 
  TrendingUp, 
  User, 
  Check, 
  BookOpen,
  ChevronRight,
  Sparkles,
  Building,
  Download,
  FileText,
  Phone,
  Headphones
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
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
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

  // Years for filter
  const years = ['All', '2026'];

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  // Featured post (first featured post in data)
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find(post => post.isFeatured) || BLOG_POSTS[0];
  }, []);

  // Popular / Trending posts
  const popularPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => post.isPopular && post.id !== featuredPost.id).slice(0, 4);
  }, [featuredPost]);

  // Filtered posts (excluding the featured one to avoid duplicates in latest feed)
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      // Exclude featured post from the main grid list so it stays unique
      if (post.id === featuredPost.id) return false;

      // Category filter
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;

      // Year filter (from date string e.g., "August 1, 2026")
      const matchesYear = selectedYear === 'All' || post.publishedDate.includes(selectedYear);

      // Search query filter
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesYear && matchesSearch;
    });
  }, [selectedCategory, selectedYear, searchQuery, featuredPost]);

  // Paginated/Visible posts
  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  return (
    <div className="bg-[#f8fafc] min-h-screen text-[#003554] font-body-md selection:bg-blue-900 selection:text-white pb-8 pt-10">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#051923] via-[#0b2b3c] to-[#004e64] text-white py-12 px-8 md:px-12 flex flex-col items-center justify-center text-center">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-4xl z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 font-label-caps tracking-widest text-[11px] font-bold mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-headline-xl font-semibold tracking-tight leading-tight mb-6">
            Engineering Insights & <span className="text-[#0582CA]">Industry Knowledge</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 font-body-lg max-w-3xl mx-auto leading-relaxed">
            Explore expert articles on metal fabrication, manufacturing technologies, laser cutting, gear production, quality standards, and industrial innovations.
          </p>
        </div>
      </section>

      <div className="w-[calc(100%-2cm)] mx-[1cm] mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Main Blog Feed (col-span-8) */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* 2. FEATURED ARTICLE SECTION */}
          {featuredPost && (
            <section className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-100/50 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 group">
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-6 relative h-72 md:h-auto overflow-hidden">
                  <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:hidden"></div>
                  <span className="absolute top-6 left-6 bg-[#003554] text-white font-label-caps tracking-widest text-xs font-bold px-4 py-1.5 rounded-full z-10 shadow-lg shadow-[#003554]/30">
                    {featuredPost.category}
                  </span>
                </div>
                <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="hidden md:inline-block bg-blue-50 text-[#003554] font-label-caps tracking-widest text-[11px] font-bold px-3 py-1 rounded-md">
                      Featured Article
                    </span>
                    <h2 className="text-2xl md:text-3xl font-headline-lg font-bold text-[#003554] leading-tight group-hover:text-[#00A6FB] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-600 font-body-md line-clamp-4 leading-relaxed text-sm md:text-base">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={featuredPost.author.avatarUrl} alt={featuredPost.author.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <p className="text-sm font-bold text-[#003554]">{featuredPost.author.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{featuredPost.author.role}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActivePost(featuredPost)}
                      className="inline-flex items-center justify-center gap-2 bg-[#003554] hover:bg-[#00A6FB] text-white font-label-caps tracking-widest text-xs font-bold px-5 py-3 rounded-xl transition-all duration-300"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 3. BLOG CATEGORIES SELECTOR & 6. SEARCH & FILTERS */}
          <section className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-md shadow-slate-100/30 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(6); // Reset page count on filter change
                  }}
                  placeholder="Search articles, keywords, or topics..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[#003554] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#003554]/10 focus:border-[#003554] transition-all font-body-md text-sm"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-3">
                <span className="font-label-caps tracking-widest text-xs font-bold text-slate-400">Year:</span>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl h-11 items-center">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => {
                        setSelectedYear(year);
                        setVisibleCount(6);
                      }}
                      className={`px-3.5 py-1 rounded-lg font-label-caps tracking-widest text-xs font-bold transition-all h-9 flex items-center justify-center ${
                        selectedYear === year 
                          ? 'bg-white text-slate-900 shadow-sm shadow-slate-200' 
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Horizontal Categories Scroll */}
            <div className="border-t border-slate-100 pt-4">
              <span className="font-label-caps tracking-widest text-xs font-bold text-slate-400 block mb-3">Browse by category:</span>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-5 md:-mx-6 px-5 md:px-6">
                {BLOG_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setVisibleCount(6);
                    }}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-xl font-label-caps tracking-widest text-xs font-bold transition-all ${
                      selectedCategory === category 
                        ? 'bg-[#003554] text-white shadow-lg shadow-[#003554]/20' 
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#003554] border border-slate-200/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 4. LATEST ARTICLES GRID */}
          <section className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-xl md:text-2xl font-headline-lg font-bold text-[#003554]">
                {selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}
                {filteredPosts.length > 0 && <span className="ml-2.5 text-sm text-slate-400 font-normal">({filteredPosts.length})</span>}
              </h3>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center p-8">
                <Search className="w-12 h-12 text-slate-300 mb-4" />
                <h4 className="text-lg font-bold text-slate-800 mb-1">No articles found</h4>
                <p className="text-slate-500 text-sm max-w-sm">We couldn't find any articles matching your search criteria. Try modifying your filters or terms.</p>
                <button 
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setSelectedYear('All'); }}
                  className="mt-6 text-sm font-bold text-blue-900 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {visiblePosts.map(post => (
                    <article 
                      key={post.id} 
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg shadow-slate-100/50 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div>
                        {/* Cover Image & Category Tag */}
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm text-white font-label-caps tracking-widest text-xs font-bold px-3.5 py-1.5 rounded-md">
                            {post.category}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <div className="p-6 space-y-3">
                          <h4 className="text-lg font-bold font-headline-lg text-[#003554] leading-snug group-hover:text-[#00A6FB] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-slate-600 font-body-md text-sm line-clamp-2 leading-relaxed">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>

                      {/* Author, Date, Reading Time & Read More CTA */}
                      <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex flex-col justify-between gap-4">
                        <div className="flex items-center justify-between">
                          {/* Author Info */}
                          <div className="flex items-center gap-2">
                            <img src={post.author.avatarUrl} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                            <div>
                              <p className="text-xs font-bold text-[#003554]">{post.author.name}</p>
                              <p className="text-xs text-slate-500 font-medium">{post.author.role}</p>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {post.publishedDate.split(',')[0]}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime}
                            </span>
                          </div>
                        </div>

                        <button 
                          onClick={() => setActivePost(post)}
                          className="w-full inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-[#003554] hover:text-white border border-slate-200 text-[#003554] font-label-caps tracking-widest text-sm font-bold py-3 rounded-xl transition-all duration-300 mt-2"
                        >
                          Read More
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                {filteredPosts.length > visibleCount && (
                  <div className="text-center pt-4">
                    <button 
                      onClick={() => setVisibleCount(prev => prev + 6)}
                      className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-bold px-8 py-3.5 rounded-2xl transition-all shadow-sm hover:shadow"
                    >
                      Load More Articles
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* RIGHT COLUMN: Sidebar (col-span-4) */}
        <aside className="lg:col-span-4 space-y-5">
          
          {/* 5. POPULAR OR TRENDING POSTS */}
          <section className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-md shadow-slate-100/30">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-5">
              <div className="p-1.5 bg-amber-50 rounded-xl text-amber-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-headline-lg font-bold text-[#003554]">Popular Publications</h3>
            </div>
            
            <div className="space-y-6">
              {popularPosts.map((post, idx) => (
                <div 
                  key={post.id} 
                  className="flex items-start gap-4 group cursor-pointer"
                  onClick={() => setActivePost(post)}
                >
                  <span className="text-3xl font-black text-slate-200 group-hover:text-blue-900 transition-colors leading-none w-8 mt-1">
                    0{idx + 1}
                  </span>
                  <div className="space-y-1.5 flex-1">
                    <span className="font-label-caps tracking-widest text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                    <h4 className="text-sm font-bold font-body-md text-[#003554] leading-snug group-hover:text-[#00A6FB] transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">{post.readingTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. NEWSLETTER / SUBSCRIBE SECTION */}
          <section className="bg-gradient-to-br from-[#051923] to-[#0b2b3c] text-white rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-xl shadow-blue-900/10">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 space-y-6">
              <div className="p-3 bg-blue-500/10 border border-blue-400/20 rounded-2xl text-blue-300 w-fit">
                <Mail className="w-6 h-6" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg md:text-xl font-bold">Stay Updated with Manufacturing Insights</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                  Receive the latest articles, engineering tips, and industry trends directly in your inbox.
                </p>
              </div>

              {subscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl flex items-center gap-3 text-xs md:text-sm font-semibold">
                  <Check className="w-5 h-5 flex-shrink-0" />
                  Thanks for subscribing! Check your inbox soon.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs md:text-sm font-medium"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-[#0582CA] hover:bg-blue-600 text-white text-xs md:text-sm font-bold py-3 rounded-xl transition-all shadow-md shadow-blue-500/25"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* Sticky container for subsequent widgets to keep the sidebar populated on scroll */}
          <div className="sticky top-24 space-y-5">
            {/* NEW: TECHNICAL RESOURCES / DOWNLOAD CENTER */}
            <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md shadow-slate-100/30">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="p-1.5 bg-blue-50 rounded-xl text-blue-900">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Technical Resources</h3>
              </div>
              <div className="space-y-3">
                {TECHNICAL_RESOURCES.map((res) => (
                  <div 
                    key={res.file} 
                    onClick={() => handleDownload(res.name)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:border-blue-900/30 hover:bg-slate-50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-900 rounded-lg transition-colors">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors line-clamp-1">{res.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{res.size}</p>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-blue-900 transition-colors mr-1.5" />
                  </div>
                ))}
              </div>
            </section>

            {/* HELPFUL TOPICS SUMMARY (SEO Badges widget) */}
            <section className="bg-white rounded-3xl p-5 border border-slate-100 shadow-md shadow-slate-100/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Trending Search Topics</h4>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">#LaserCutting</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">#CNCProcesses</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">#MachiningTolerances</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">#GearHobbing</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">#MetalGrades</span>
                <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-lg">#ISO9001Certified</span>
              </div>
            </section>

            {/* NEW: NEED TECHNICAL HELP SECTION */}
            <section className="bg-gradient-to-br from-[#0b2b3c] to-[#051923] text-white rounded-3xl p-6 relative overflow-hidden shadow-xl shadow-slate-950/10">
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-full blur-xl"></div>
              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-blue-500/10 border border-blue-400/20 text-[#0582CA] rounded-xl">
                     <Headphones className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-label-caps tracking-widest text-blue-300 font-bold">Technical Support</h4>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-headline-lg font-bold text-white">Need Expert Advice?</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    Speak directly with our senior manufacturing engineers about tolerances, DFM feedback, or customized tooling materials.
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10 text-sm font-semibold text-slate-200">
                  <a href="tel:+18005550199" className="flex items-center gap-2.5 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-blue-400" />
                    +1 (800) 555-0199 (Sales)
                  </a>
                  <a href="mailto:engineering@hitech.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                    engineering@hitech.com
                  </a>
                </div>

                <a 
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-[#003554] font-label-caps tracking-widest text-sm font-bold py-3.5 rounded-xl transition-all shadow"
                >
                  Request Callback
                  <ArrowRight className="w-4 h-4 text-[#003554]" />
                </a>
              </div>
            </section>
          </div>

        </aside>
      </div>

      {/* 8. CALL TO ACTION SECTION */}
      <section className="w-[calc(100%-2cm)] mx-[1cm] mt-8">
        <div className="bg-gradient-to-r from-[#051923] to-[#004e64] text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-slate-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,#0582ca0f_0%,transparent_50%)]"></div>
          
          <div className="relative z-10 max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-3.5 py-1 text-[#0582CA] text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              Partnership Opportunities
            </div>
            <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Looking for a reliable manufacturing partner?
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Contact our engineering team today to review your designs, request custom quotes, or plan your next fabrication project.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2.5 bg-white hover:bg-blue-50 text-slate-900 text-sm md:text-base font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 text-blue-900" />
            </a>
          </div>
        </div>
      </section>

      {/* 9. DETAILED ARTICLE MODAL/DRAWER (Glassmorphism & animations) */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex justify-center items-start md:items-center p-4 md:p-6 transition-all duration-300">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh] border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header / Actions bar */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button 
                onClick={() => setActivePost(null)}
                className="p-2.5 bg-slate-900/80 hover:bg-slate-950 backdrop-blur-md text-white rounded-full transition-colors shadow-lg"
                title="Close Article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable container */}
            <div className="overflow-y-auto flex-1 scrollbar-thin">
              
              {/* Cover Image Banner */}
              <div className="h-64 md:h-96 relative w-full overflow-hidden">
                <img 
                  src={activePost.imageUrl} 
                  alt={activePost.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 right-6 md:right-8 space-y-3 z-10 text-white">
                  <span className="bg-[#0582CA] text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-lg shadow-lg">
                    {activePost.category}
                  </span>
                  <h2 className="text-xl md:text-4xl font-extrabold tracking-tight leading-tight">
                    {activePost.title}
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-10 space-y-8">
                
                {/* Author & Date metadata bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img src={activePost.author.avatarUrl} alt={activePost.author.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                    <div>
                      <p className="text-sm md:text-base font-bold text-slate-900">{activePost.author.name}</p>
                      <p className="text-xs text-slate-500 font-medium">{activePost.author.role}</p>
                    </div>
                  </div>

                  <div className="flex gap-4.5 text-xs text-slate-400 font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-300" />
                      {activePost.publishedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-300" />
                      {activePost.readingTime}
                    </span>
                  </div>
                </div>

                {/* Article content panels */}
                <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-6 max-w-none">
                  {/* Render standard paragraphs */}
                  {activePost.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}

                  {/* Render Case Study specific sections if they exist */}
                  {activePost.caseStudy && (
                    <div className="mt-8 space-y-6 pt-6 border-t border-slate-100">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-blue-900" />
                        Case Study Highlights
                      </h3>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-red-50/50 border border-red-100 rounded-xl p-4.5">
                          <h4 className="text-sm font-black uppercase text-red-800 tracking-wider mb-2">Client Challenge</h4>
                          <p className="text-sm text-red-950 font-medium leading-relaxed">{activePost.caseStudy.challenge}</p>
                        </div>
                        
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4.5">
                          <h4 className="text-sm font-black uppercase text-emerald-800 tracking-wider mb-2">Proposed Solution</h4>
                          <p className="text-sm text-emerald-950 font-medium leading-relaxed">{activePost.caseStudy.solution}</p>
                        </div>

                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4.5">
                          <h4 className="text-sm font-black uppercase text-blue-800 tracking-wider mb-2">Manufacturing Process</h4>
                          <p className="text-sm text-blue-950 font-medium leading-relaxed">{activePost.caseStudy.process}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4.5">
                            <h4 className="text-sm font-black uppercase text-amber-800 tracking-wider mb-2">Measurable Results</h4>
                            <p className="text-sm text-amber-950 font-medium leading-relaxed">{activePost.caseStudy.results}</p>
                          </div>
                          <div className="bg-violet-50/50 border border-violet-100 rounded-xl p-4.5">
                            <h4 className="text-sm font-black uppercase text-violet-800 tracking-wider mb-2">Customer Outcome</h4>
                            <p className="text-sm text-violet-950 font-medium leading-relaxed">{activePost.caseStudy.outcome}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer close button */}
                <div className="pt-8 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setActivePost(null)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
                  >
                    Back to Knowledge Hub
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Toast Notification */}
      {downloadingFile && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#051923] text-white border border-slate-700/50 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <div className="p-2 bg-blue-500/20 text-blue-300 rounded-lg">
            <Download className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Preparing Download</p>
            <p className="text-sm font-bold">{downloadingFile}</p>
          </div>
        </div>
      )}

    </div>
  );
}
