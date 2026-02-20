export default function Footer() {
    return (
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tighter text-white">
            CG <span className="text-cyan-500">Service</span> LLC
          </div>
          
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Chowdhury Global Service LLC. All Rights Reserved.
          </div>
          
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Vendor Portal</a>
          </div>
        </div>
      </footer>
    );
  }