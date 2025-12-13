'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  CalendarDays, 
  FolderOpen, 
  Bell, 
  Users, 
  BarChart3, 
  UploadCloud, 
  ClipboardList, 
  Database, 
  ShieldCheck, 
  Activity,
  Network,
  KeyRound,
  DownloadCloud,
  Settings,
  Wrench,
  ChevronDown,
  Award,
  Calendar,
  FileCheck,
  AlertOctagon,
  Contact
} from 'lucide-react';

const NavItem = ({ link, theme, badge, currentPath }) => {
  const isActive = currentPath === link.path;
  
  return (
    <Link
      href={link.path}
      className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? `${theme.accent} text-white shadow-lg shadow-black/20 translate-x-1`
          : `text-gray-400 ${theme.hover} hover:text-white hover:translate-x-1`
      }`}
    >
      <div className="flex items-center">
        <span className={`mr-3 transition-transform group-hover:scale-110`}>{link.icon}</span>
        <span className="font-medium">{link.label}</span>
      </div>
      {badge > 0 && (
        <span className={`ml-auto ${theme.accent} text-white text-xs font-bold rounded-full min-w-[22px] h-5 flex items-center justify-center px-2 shadow-lg animate-pulse`}>
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
};

const ToolsDropdown = ({ theme, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toolsLinks = [
    { path: '/hr/hrresetpassword', label: 'Reset Passwords', icon: <KeyRound size={18} /> },
    { path: '/hr/hrexporttool', label: 'Export Tool', icon: <DownloadCloud size={18} /> },
    { path: '/hr/hrmanagestatus', label: 'Manage Statuses', icon: <Settings size={18} /> },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-gray-400 ${theme.hover} hover:text-white hover:translate-x-1`}
      >
        <div className="flex items-center">
          <span className={`mr-3 transition-transform group-hover:scale-110`}><Wrench size={20} /></span>
          <span className="font-medium">Tools</span>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-8 pr-2 py-2 space-y-1">
          {toolsLinks.map(link => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm ${
                  isActive
                    ? `text-white ${theme.accent}`
                    : `text-gray-400 ${theme.hover} hover:text-white`
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const MISCertsDropdown = ({ theme, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const certsLinks = [
    { path: '/mis/miscertifiicatelogs', label: 'View All Logs', icon: <ClipboardList size={18} /> },
    { path: '/mis/miscertificatedownload', label: 'Download Copies', icon: <DownloadCloud size={18} /> },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-gray-400 ${theme.hover} hover:text-white hover:translate-x-1`}
      >
        <div className="flex items-center">
          <span className={`mr-3 transition-transform group-hover:scale-110`}><FileText size={20} /></span>
          <span className="font-medium">Certificates</span>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-8 pr-2 py-2 space-y-1">
          {certsLinks.map(link => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm ${
                  isActive
                    ? `text-white ${theme.accent}`
                    : `text-gray-400 ${theme.hover} hover:text-white`
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const MISAccountsDropdown = ({ theme, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const accountsLinks = [
    { path: '/mis/misaccounts', label: 'Manage Accounts', icon: <Users size={18} /> },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-gray-400 ${theme.hover} hover:text-white hover:translate-x-1`}
      >
        <div className="flex items-center">
          <span className={`mr-3 transition-transform group-hover:scale-110`}><ShieldCheck size={20} /></span>
          <span className="font-medium">Accounts</span>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-8 pr-2 py-2 space-y-1">
          {accountsLinks.map(link => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm ${
                  isActive
                    ? `text-white ${theme.accent}`
                    : `text-gray-400 ${theme.hover} hover:text-white`
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

const HRReportsDropdown = ({ theme, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const reportsLinks = [
    { path: '/hr/reports/contractreports', label: 'Contract Reports', icon: <FileText size={18} /> },
    { path: '/hr/reports/disiplinaryreports', label: 'Disciplinary Reports', icon: <AlertOctagon size={18} /> },
    { path: '/hr/reports/documentreports', label: 'Document Reports', icon: <FileCheck size={18} /> },
    { path: '/hr/reports/employeelist', label: 'Employee List', icon: <Users size={18} /> },
    { path: '/hr/reports/iddirectory', label: 'ID Directory', icon: <Contact size={18} /> },
    { path: '/hr/reports/leavereports', label: 'Leave Reports', icon: <Calendar size={18} /> },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-gray-400 ${theme.hover} hover:text-white hover:translate-x-1`}
      >
        <div className="flex items-center">
          <span className={`mr-3 transition-transform group-hover:scale-110`}><BarChart3 size={20} /></span>
          <span className="font-medium">Reports</span>
        </div>
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pl-8 pr-2 py-2 space-y-1">
          {reportsLinks.map(link => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-all duration-200 group text-sm ${
                  isActive
                    ? `text-white ${theme.accent}`
                    : `text-gray-400 ${theme.hover} hover:text-white`
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({ role, unreadCount = 0 }) {
  const pathname = usePathname();

  const links = {
    employee: [
      { path: '/employee', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/employee/employeeprofile', label: 'My Profile', icon: <UserCircle size={20} /> },
      { path: '/employee/contracts', label: 'My Contract', icon: <FileText size={20} /> },
      { path: '/employee/employeeleaves', label: 'My Leaves', icon: <CalendarDays size={20} /> },
      { path: '/employee/employeedocuments', label: 'My Documents', icon: <FolderOpen size={20} /> },
      { path: '/employee/employeenotifications', label: 'Notifications', icon: <Bell size={20} />, showBadge: true },
      
    ],
    hr: [
      { path: '/hr', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/hr/hremployees', label: 'Employees', icon: <Users size={20} /> },
      { path: '/hr/hrcontracts', label: 'Contracts', icon: <FileText size={20} /> },
      { path: '/hr/hrcertificates', label: 'Certificates', icon: <Award size={20} /> },
      { path: '/hr/hrdocuments', label: 'Documents', icon: <FolderOpen size={20} /> },
      { path: '/hr/hrleave', label: 'Leave', icon: <CalendarDays size={20} /> },
      { path: '/hr/departmentdesignation', label: 'Departments', icon: <Network size={20} /> },
      { path: '/hr/hrbulkupload', label: 'Bulk Upload', icon: <UploadCloud size={20} /> },
    ],
    mis: [
      { path: '/mis', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
      { path: '/mis/miscontracts', label: 'Contracts', icon: <FileText size={20} /> },
      { path: '/mis/misdocuments', label: 'Documents', icon: <FolderOpen size={20} /> },
      { path: '/mis/misleavemanagement', label: 'Leave Management', icon: <CalendarDays size={20} /> },
      { path: '/mis/misnotification', label: 'Notifications', icon: <Bell size={20} />, showBadge: true },
      { path: '/mis/misauditlogs', label: 'Audit Logs', icon: <ClipboardList size={20} /> },
      { path: '/mis/misbackups', label: 'Backups', icon: <Database size={20} /> },
      { path: '/mis/missytemreports', label: 'System Reports', icon: <Activity size={20} /> },
    ],
  };

  const roleThemes = {
    employee: {
      bg: 'bg-gradient-to-b from-slate-900 to-slate-800',
      accent: 'bg-blue-600',
      hover: 'hover:bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500'
    },
    hr: {
      bg: 'bg-gradient-to-b from-slate-900 to-slate-800',
      accent: 'bg-purple-600',
      hover: 'hover:bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500'
    },
    mis: {
      bg: 'bg-gradient-to-b from-slate-900 to-slate-800',
      accent: 'bg-emerald-600',
      hover: 'hover:bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500'
    },
  };

  const theme = roleThemes[role] || roleThemes.employee;

  return (
    <aside className={`w-72 ${theme.bg} text-white h-screen flex flex-col shadow-2xl transition-all duration-300`}>
      {/* Logo Area */}
      <div className="p-6 border-b border-gray-700/50 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
          K
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide">KCP EmployeeSync</h1>
          <p className={`text-xs font-medium ${theme.text} uppercase tracking-wider`}>{role} Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {links[role]?.map((link) => (
          <NavItem 
            key={link.path} 
            link={link} 
            theme={theme} 
            badge={link.showBadge ? unreadCount : 0}
            currentPath={pathname}
          />
        ))}
        {role === 'hr' && <HRReportsDropdown theme={theme} currentPath={pathname} />}
        {role === 'hr' && <ToolsDropdown theme={theme} currentPath={pathname} />}
        {role === 'mis' && <MISCertsDropdown theme={theme} currentPath={pathname} />}
        {role === 'mis' && <MISAccountsDropdown theme={theme} currentPath={pathname} />}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-gray-700/50">
        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
          <p className="text-xs text-gray-500">© 2025 KCP EmployeeSync</p>
        </div>
      </div>
    </aside>
  );
}