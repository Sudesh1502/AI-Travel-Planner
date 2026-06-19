export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo_svg.svg" alt="Next Journey Logo" className="h-[50px] w-auto object-contain mb-1" />
            <span className="text-xs text-gray-500">© 2026 Next Journey Travel Technologies. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Help Center</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
