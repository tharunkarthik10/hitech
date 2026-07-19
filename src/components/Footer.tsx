export default function Footer() {
  return (
    <footer className="bg-[#051923] text-white pt-24 pb-8 border-t border-outline-variant">
      <div className="max-w-container-max mx-auto px-gutter flex flex-col items-center">
        
        {/* Top Hero Section */}
        <div className="text-center mb-28 w-full">
          <h2 className="font-headline-xl text-[40px] md:text-[64px] font-bold leading-tight mb-2 tracking-tight">
            Work <span className="text-[#0582CA]">Smart</span> <span className="text-white">|</span> Manufacture <span className="text-[#0582CA]">Heavy</span>
          </h2>
          <h2 className="font-headline-xl text-[40px] md:text-[64px] font-bold leading-tight mb-10 tracking-tight">
            Automate With <span className="text-[#0582CA]">HITECH</span>
          </h2>
          <button className="border border-white/30 rounded-full px-8 py-3.5 font-medium text-[15px] hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2">
            Get a Quote <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
          </button>
        </div>

        {/* Bottom Columns */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          {/* Logo & Socials (Col span 6) */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="/hitech_logo.png" 
                alt="Hitech" 
                className="h-[40px] md:h-[50px] w-auto max-w-none flex-shrink-0 object-contain" 
              />
            </div>
            
            <div className="flex gap-6">
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              {/* Twitter X */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* Youtube */}
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current -mt-0.5" viewBox="0 0 24 24">
                  <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4s-6.254,0-7.814,0.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C6.254,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links (Col span 3) */}
          <div className="md:col-span-3 lg:pl-12">
            <h4 className="font-bold text-[18px] text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Industries</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Products</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">About us</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Blogs</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Contact us</a></li>
            </ul>
          </div>

          {/* Industries (Col span 3) */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-[18px] text-white mb-6">Industries</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Automotive</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">FMCG</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Heavy Engineering</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Manufacturing</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Pharmaceutical</a></li>
              <li><a href="#" className="text-[14px] font-medium text-gray-400 hover:text-white transition-colors">Warehousing & Logistics</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[13px] text-gray-500 font-medium pb-4">
          <p>© <a href="#" className="underline hover:text-white">Hitech Engineering</a> 2026. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white underline decoration-gray-500 underline-offset-2">Terms of use</a>
            <a href="#" className="hover:text-white underline decoration-gray-500 underline-offset-2">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
