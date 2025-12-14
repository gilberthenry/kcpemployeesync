'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Edit, CheckCircle, Save, X, Loader, Building2, IdCard } from 'lucide-react';
import { getDocument, updateDocument, addDocument, getAllDocuments } from '@/app/services/firestore/util';

export default function EmployeeProfile() {
  const [profile, setProfile] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const userId = localStorage.getItem('userId') || 'demo-user';
      const profileId = localStorage.getItem('profileId');
      
      let profileData;
      if (profileId) {
        // Fetch existing profile
        profileData = await getDocument('profiles', profileId);
      } else {
        // Create default profile if none exists
        const defaultProfile = {
          userId,
          fullName: 'Employee Name',
          email: 'employee@example.com',
          contactNumber: '123-456-7890',
          status: 'active',
          role: 'employee',
          employeeId: 'EMP-001',
          createdAt: new Date().toISOString(),
          department: 'IT Department',
          address: '123 Main St, City'
        };
        const newProfileId = await addDocument('profiles', defaultProfile);
        localStorage.setItem('profileId', newProfileId);
        profileData = { id: newProfileId, ...defaultProfile };
      }
      
      setProfile(profileData);
      setEditableProfile({
        fullName: profileData.fullName || '',
        email: profileData.email || '',
        contactNumber: profileData.contactNumber || '',
      });
      
      // Fetch contract data
      const allContracts = await getAllDocuments('contracts');
      const userContract = allContracts.find(c => c.userId === userId && c.status === 'active');
      setContract(userContract || null);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset on cancel
      setEditableProfile({
        fullName: profile.fullName || '',
        email: profile.email || '',
        contactNumber: profile.contactNumber || '',
      });
    }
    setIsEditing(!isEditing);
    setSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      const profileId = localStorage.getItem('profileId');
      if (!profileId) {
        throw new Error('Profile ID not found');
      }
      
      await updateDocument('profiles', profileId, editableProfile);
      alert('Profile updated successfully!');
      
      // Refresh profile data
      await fetchProfileData();
      setIsEditing(false);
      setSuccess(true);
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700 border-green-200',
      probationary: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'part-time': 'bg-blue-100 text-blue-700 border-blue-200',
      'job-order': 'bg-purple-100 text-purple-700 border-purple-200',
      contractual: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      resigned: 'bg-gray-100 text-gray-700 border-gray-200',
      terminated: 'bg-red-100 text-red-700 border-red-200',
      retired: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const ProfileField = ({ label, value, name, isEditing, icon, type = 'text' }) => (
    <div className="flex items-start text-gray-600 group hover:text-blue-600 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors flex-shrink-0 mt-1">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        {isEditing ? (
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full font-medium border-b-2 border-blue-200 focus:outline-none focus:border-blue-500 px-2 py-1 rounded"
          />
        ) : (
          <p className="font-medium break-words">{value || 'Not provided'}</p>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchProfileData} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Success Message */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Profile updated successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header Banner */}
          <div className="h-32 bg-linear-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-2xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <User size={64} className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{profile.fullName}</h1>
                <div className="flex items-center gap-3 mt-2">
                  {contract && (
                    <p className="text-gray-600 font-medium flex items-center">
                      <Briefcase size={16} className="mr-2" />
                      {contract.position}
                    </p>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(profile.status)}`}>
                    {profile.status.charAt(0).toUpperCase() + profile.status.slice(1)}
                  </span>
                </div>
              </div>
              {!isEditing ? (
                <button 
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <Edit size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button 
                    onClick={handleEditToggle}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Contact Information</h3>
                <div className="space-y-5">
                  <ProfileField 
                    label="Full Name" 
                    value={editableProfile.fullName} 
                    name="fullName" 
                    isEditing={isEditing} 
                    icon={<User size={20} />} 
                  />
                  <ProfileField 
                    label="Email Address" 
                    value={editableProfile.email} 
                    name="email" 
                    isEditing={isEditing} 
                    type="email"
                    icon={<Mail size={20} />} 
                  />
                  <ProfileField 
                    label="Contact Number" 
                    value={editableProfile.contactNumber} 
                    name="contactNumber" 
                    isEditing={isEditing} 
                    type="tel"
                    icon={<Phone size={20} />} 
                  />
                </div>
              </div>

              {/* Employment Details */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Employment Details</h3>
                <div className="space-y-5">
                  <ProfileField 
                    label="Employee ID" 
                    value={profile.employeeId} 
                    name="employeeId" 
                    isEditing={false} 
                    icon={<IdCard size={20} />} 
                  />
                  <ProfileField 
                    label="Role" 
                    value={profile.role ? profile.role.toUpperCase() : 'N/A'} 
                    name="role" 
                    isEditing={false} 
                    icon={<Shield size={20} />} 
                  />
                  <ProfileField 
                    label="Joined On" 
                    value={profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'} 
                    name="createdAt" 
                    isEditing={false} 
                    icon={<Calendar size={20} />} 
                  />
                </div>
              </div>
            </div>

            {/* Contract Information */}
            {contract && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Current Contract</h3>
                <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Contract Type</p>
                      <p className="font-semibold text-gray-800 capitalize">{contract.contractType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Position</p>
                      <p className="font-semibold text-gray-800">{contract.position}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Department</p>
                      <p className="font-semibold text-gray-800">{contract.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Contract Period</p>
                      <p className="font-semibold text-gray-800">
                        {new Date(contract.startDate).toLocaleDateString()} - {contract.endDate ? new Date(contract.endDate).toLocaleDateString() : 'Ongoing'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}