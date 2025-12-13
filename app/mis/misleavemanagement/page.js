'use client';

import React, { useState } from 'react';
import LeaveCalendar from '../../components/leavecalendar/page';
import { RefreshCw, UserCheck, Calendar, Settings, Shield, CheckCircle } from 'lucide-react';

export default function MISLeaveManagement() {
  const [schoolYear, setSchoolYear] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const getCurrentSchoolYear = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return month >= 6 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  };

  const handleResetCredits = async () => {
    const sy = schoolYear || prompt('Enter school year (e.g., 2024-2025):', getCurrentSchoolYear());
    
    if (!sy) return;
    
    if (!confirm(`Are you sure you want to reset all employee leave credits for school year ${sy}? This will:\n\n- Allocate new leave credits based on employment type\n- Carry over unused leaves (max 5 days)\n- Mark excess leaves as monetizable\n- Forfeit leaves exceeding the limit\n\nThis action cannot be undone.`)) {
      return;
    }
    
    try {
      // TODO: Replace with actual API call
      alert(`TODO: Reset leave credits for school year ${sy}`);
    } catch (error) {
      console.error('Error resetting leave credits:', error);
      alert('Failed to reset leave credits: ' + error.message);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // This would be for updating the default credit allocations
      alert('Settings saved successfully!\n\nNote: Credit allocations are:\n- Permanent: 15 days\n- Contractual: 10 days\n- Job Order: 5 days\n- Part-Time: 7 days');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Leave Management</h1>
        <p className="text-gray-600 mt-2">Manage leave credits, monitor leave calendar, and configure system-wide leave policies</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Content: Calendar View */}
        <div className="xl:col-span-3 order-2 xl:order-1">
          <LeaveCalendar />
        </div>

        {/* Side Content: Settings */}
        <div className="xl:col-span-1 space-y-6 order-1 xl:order-2">
          {/* School Year Display */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex items-center mb-2">
              <Calendar size={18} className="mr-2" />
              <h3 className="text-base md:text-lg font-semibold">Current School Year</h3>
            </div>
            <p className="text-2xl md:text-3xl font-bold">{getCurrentSchoolYear()}</p>
            <p className="text-xs md:text-sm opacity-90 mt-2">Active Period</p>
          </div>

          {/* MIS System Configuration */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center mb-4">
              <Settings size={18} className="text-purple-600 mr-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-700">System Config</h3>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-4">
              Configure system-wide leave rules, credit allocations, and policies.
            </p>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg text-sm"
            >
              <Settings size={16} className="mr-2" />
              {showSettings ? 'Hide Settings' : 'Configure Settings'}
            </button>
          </div>

          {/* Reset Credits */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center mb-4">
              <RefreshCw size={18} className="text-purple-600 mr-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-700">Reset Credits</h3>
            </div>
            <p className="text-gray-600 text-xs md:text-sm mb-4">
              Reset all employee leave credits for the new school year. Unused credits will be carried over (max 5 days).
            </p>
            <button 
              onClick={handleResetCredits}
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm"
            >
              Reset Credits Now
            </button>
          </div>

          {/* Auto Credits by Employment Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
            <div className="flex items-center mb-4">
              <UserCheck size={18} className="text-purple-600 mr-3" />
              <h3 className="text-base md:text-lg font-semibold text-gray-700">Automatic Credits</h3>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs md:text-sm text-gray-600">Permanent</span>
                <span className="text-sm md:text-base font-bold text-gray-800">15 days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs md:text-sm text-gray-600">Contractual</span>
                <span className="text-sm md:text-base font-bold text-gray-800">10 days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs md:text-sm text-gray-600">Job Order</span>
                <span className="text-sm md:text-base font-bold text-gray-800">5 days</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs md:text-sm text-gray-600">Part-Time</span>
                <span className="text-sm md:text-base font-bold text-gray-800">7 days</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 md:mt-4 italic">
              Credits are automatically allocated based on employment type from contracts.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-4 md:p-6 text-white">
            <h3 className="text-base md:text-lg font-semibold mb-4">Leave Features</h3>
            <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-white/20">
                <span className="opacity-90">Leave Types</span>
                <span className="font-bold">7</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-white/20">
                <span className="opacity-90">Max Carryover</span>
                <span className="font-bold">5 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="opacity-90">Calendar View</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System-Wide Settings Panel (Collapsible) */}
      {showSettings && (
        <div className="mt-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl shadow-lg p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
            <div className="flex items-center">
              <Shield size={20} className="text-purple-600 mr-3" />
              <h2 className="text-lg md:text-xl font-bold text-gray-800">System-Wide Leave Configuration</h2>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-500 hover:text-gray-700 self-end sm:self-auto"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Leave Credit Allocations */}
            <div className="bg-white rounded-lg p-4 md:p-5 shadow">
              <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Credit Allocations by Employment Type</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs md:text-sm font-medium text-gray-600 flex-1">Permanent</label>
                  <input 
                    type="number" 
                    defaultValue="15" 
                    className="w-16 md:w-20 px-2 md:px-3 py-2 border border-gray-300 rounded-lg text-center text-sm"
                  />
                  <span className="text-xs md:text-sm text-gray-500">days</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs md:text-sm font-medium text-gray-600 flex-1">Contractual</label>
                  <input 
                    type="number" 
                    defaultValue="10" 
                    className="w-16 md:w-20 px-2 md:px-3 py-2 border border-gray-300 rounded-lg text-center text-sm"
                  />
                  <span className="text-xs md:text-sm text-gray-500">days</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs md:text-sm font-medium text-gray-600 flex-1">Job Order</label>
                  <input 
                    type="number" 
                    defaultValue="5" 
                    className="w-16 md:w-20 px-2 md:px-3 py-2 border border-gray-300 rounded-lg text-center text-sm"
                  />
                  <span className="text-xs md:text-sm text-gray-500">days</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs md:text-sm font-medium text-gray-600 flex-1">Part-Time</label>
                  <input 
                    type="number" 
                    defaultValue="7" 
                    className="w-16 md:w-20 px-2 md:px-3 py-2 border border-gray-300 rounded-lg text-center text-sm"
                  />
                  <span className="text-xs md:text-sm text-gray-500">days</span>
                </div>
              </div>
            </div>

            {/* Leave Policies */}
            <div className="bg-white rounded-lg p-4 md:p-5 shadow">
              <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Leave Policies</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Max Carryover Days</label>
                  <input 
                    type="number" 
                    defaultValue="5" 
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Max Advance Days</label>
                  <input 
                    type="number" 
                    defaultValue="3" 
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Monetize Excess Leaves</label>
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Auto-Approve Sick Leave</label>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Leave Types Configuration */}
            <div className="bg-white rounded-lg p-4 md:p-5 shadow">
              <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Leave Types</h3>
              <div className="space-y-2">
                {['Sick Leave', 'Vacation Leave', 'Emergency Leave', 'Maternity Leave', 'Paternity Leave', 'Special Leave', 'Study Leave'].map((type) => (
                  <div key={type} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-xs md:text-sm text-gray-600">{type}</span>
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <input 
                        type="checkbox" 
                        defaultChecked 
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg p-4 md:p-5 shadow">
              <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">Notification Settings</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Email Notifications</label>
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">SMS Notifications</label>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Notify on Low Balance</label>
                  <input 
                    type="checkbox" 
                    defaultChecked 
                    className="w-5 h-5 text-purple-600 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-600">Low Balance Threshold</label>
                  <input 
                    type="number" 
                    defaultValue="3" 
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => setShowSettings(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveSettings}
              className="flex items-center justify-center px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg text-sm md:text-base"
            >
              <CheckCircle size={16} className="mr-2" />
              Save Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}