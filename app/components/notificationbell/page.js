"use client"
import React, { useContext, useState, useRef, useEffect } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import { AuthContext } from '../../context/AuthContext';
import { Bell, X, Clock, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export default function NotificationBell() {
  const { notifications, markAsRead } = useContext(NotificationContext);
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Filter out archived notifications from the bell dropdown
  const activeNotifications = notifications.filter((n) => !n.archived);
  const unreadCount = activeNotifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const getNotificationIcon = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('error') || msg.includes('critical') || msg.includes('failed')) {
      return <AlertCircle size={18} className="text-red-500 shrink-0" />;
    }
    if (msg.includes('success') || msg.includes('approved') || msg.includes('completed')) {
      return <CheckCircle2 size={18} className="text-green-500 shrink-0" />;
    }
    return <Info size={18} className="text-blue-500 shrink-0" />;
  };

  const formatTime = (time) => {
    if (!time) return 'Just now';
    const date = new Date(time);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  // Get theme colors based on user role
  const getThemeColors = () => {
    switch (user?.role) {
      case 'mis':
        return {
          badge: 'from-emerald-500 to-emerald-600',
          header: 'from-emerald-600 to-emerald-700',
          headerText: 'text-emerald-100',
          highlight: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-500',
          dot: 'bg-emerald-500',
          button: 'text-emerald-600 hover:text-emerald-700'
        };
      case 'hr':
        return {
          badge: 'from-violet-500 to-violet-600',
          header: 'from-violet-600 to-violet-700',
          headerText: 'text-violet-100',
          highlight: 'bg-violet-50 hover:bg-violet-100 border-violet-500',
          dot: 'bg-violet-500',
          button: 'text-violet-600 hover:text-violet-700'
        };
      case 'employee':
      default:
        return {
          badge: 'from-blue-500 to-blue-600',
          header: 'from-blue-600 to-blue-700',
          headerText: 'text-blue-100',
          highlight: 'bg-blue-50 hover:bg-blue-100 border-blue-500',
          dot: 'bg-blue-500',
          button: 'text-blue-600 hover:text-blue-700'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button 
        onClick={() => setOpen(!open)} 
        className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
      >
        <Bell size={22} className="text-gray-600 group-hover:text-gray-800 transition-colors" />
        {unreadCount > 0 && (
          <span className={`absolute -top-1 -right-1 bg-linear-to-r ${colors.badge} text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 border-2 border-white shadow-lg animate-pulse`}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-2xl border border-gray-200 z-50 overflow-hidden
                        transition-all duration-200 ease-out animate-[slideDown_0.2s_ease-out]">
          {/* Header */}
          <div className={`bg-linear-to-r ${colors.header} px-5 py-4 flex items-center justify-between`}>
            <div>
              <h3 className="text-white font-semibold text-lg">Notifications</h3>
              <p className={`${colors.headerText} text-xs mt-0.5`}>
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-120 overflow-y-auto">
            {activeNotifications.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Bell size={28} className="text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No notifications yet</p>
                <p className="text-gray-400 text-sm mt-1">We'll notify you when something arrives</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activeNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-5 py-4 cursor-pointer transition-all duration-200 ${
                      !n.read 
                        ? `${colors.highlight} border-l-4` 
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                    onClick={() => {
                      markAsRead(n.id);
                    }}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {getNotificationIcon(n.message)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-relaxed ${
                          !n.read ? 'text-gray-900 font-medium' : 'text-gray-600'
                        }`}>
                          {n.message}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          {formatTime(n.time)}
                        </div>
                      </div>
                      {!n.read && (
                        <div className="shrink-0">
                          <span className={`inline-block w-2 h-2 ${colors.dot} rounded-full`}></span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {activeNotifications.length > 0 && (
            <div className="bg-gray-50 px-5 py-3 border-t border-gray-200">
              <button
                onClick={() => {
                  activeNotifications.forEach(n => markAsRead(n.id));
                }}
                className={`text-sm ${colors.button} font-medium w-full text-center`}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}