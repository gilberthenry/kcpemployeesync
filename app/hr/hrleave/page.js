'use client';

import React, { useState } from 'react';
import LeaveCalendar from '../../components/leavecalendar/page';
import { RefreshCw, UserCheck, Calendar } from 'lucide-react';

export default function HRLeave() {
  const [schoolYear, setSchoolYear] = useState('');

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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Leave Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content: Calendar View */}
        <div className="lg:col-span-3">
          <LeaveCalendar />
        </div>

        {/* Side Content: Settings */}
        <div className="space-y-6">
          {/* School Year Display */}
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center mb-2">
              <Calendar size={20} className="mr-2" />
              <h3 className="text-lg font-semibold">Current School Year</h3>
            </div>
            <p className="text-3xl font-bold">{getCurrentSchoolYear()}</p>
            <p className="text-sm opacity-90 mt-2">Active Period</p>
          </div>

          {/* Reset Credits */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <RefreshCw size={20} className="text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-700">Reset Credits</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Reset all employee leave credits for the new school year. Unused credits will be carried over (max 5 days).
            </p>
            <button 
              onClick={handleResetCredits}
              className="w-full inline-flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
            >
              Reset Credits Now
            </button>
          </div>

          {/* Auto Credits by Employment Type */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <UserCheck size={20} className="text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-700">Automatic Credits</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Permanent</span>
                <span className="font-bold text-gray-800">15 days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Contractual</span>
                <span className="font-bold text-gray-800">10 days</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Job Order</span>
                <span className="font-bold text-gray-800">5 days</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Part-Time</span>
                <span className="font-bold text-gray-800">7 days</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 italic">
              Credits are automatically allocated based on employment type from contracts.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Leave Features</h3>
            <div className="space-y-3 text-sm">
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
    </div>
  );
}