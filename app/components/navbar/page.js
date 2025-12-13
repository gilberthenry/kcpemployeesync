'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function Navbar({ user, onLogout }) {
  const pathname = usePathname();

  const dashboardRoutes = [
    '/employee',
    '/hr',
    '/mis',
  ];
  const isDashboardPage = dashboardRoutes.includes(pathname);

  // Helper to get page title from path
  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return 'Home';
    if (segments.length === 1) {
      return `${segments[0].toUpperCase()} Dashboard`;
    }
    const pageName = segments[segments.length - 1];
    return pageName
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Page Title / Breadcrumb */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h2>
          {isDashboardPage && user && (
            <p className="text-sm text-gray-500">
              Welcome back, {user?.fullName?.split(' ')[0] || 'User'}
            </p>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-6">
          <div className="h-8 w-px bg-gray-200"></div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-gray-700">
                  {user.fullName || 'User'}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {user.role || 'Employee'}
                </p>
              </div>

              <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-bold flex items-center justify-center shadow-md ring-2 ring-white">
                  {user.fullName?.charAt(0) || 'U'}
                </button>
                
                {/* Dropdown (Simple hover for now) */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}