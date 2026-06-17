"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <img src="/logo_svg.svg" alt="Next Journey Logo" className="h-[60px] w-auto object-contain" />
            </Link>
            
            <div className="hidden md:flex items-center gap-6 mt-1">
              <Link 
                href="/dashboard" 
                className={`text-sm font-semibold pb-5 pt-5 border-b-2 transition-colors ${pathname === '/dashboard' ? 'text-blue-600 border-blue-600' : 'text-gray-500 hover:text-gray-900 border-transparent'}`}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/my-trips" 
                className={`text-sm font-semibold pb-5 pt-5 border-b-2 transition-colors ${pathname === '/dashboard/my-trips' ? 'text-blue-600 border-blue-600' : 'text-gray-500 hover:text-gray-900 border-transparent'}`}
              >
                My Trips
              </Link>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard/new-trip" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-1">
              New Trip <span className="text-lg leading-none">+</span>
            </Link>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
