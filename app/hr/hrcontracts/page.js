'use client';

import React, { useState, useEffect } from 'react';
import { FileDown, CalendarClock, History, Plus, Filter, RefreshCw, AlertCircle, X, Edit, Trash2, Search } from 'lucide-react';

export default function HRContracts() {
  const [contracts, setContracts] = useState([]);
  const [expiringContracts, setExpiringContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ status: '', contractType: '', department: '', search: '' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  
  const positions = [
    'Professor', 'Associate Professor', 'Assistant Professor', 'Instructor',
    'Master Teacher', 'Senior Teacher', 'Teacher III', 'Teacher II', 'Teacher I',
    'Administrative Officer', 'Administrative Assistant', 'Administrative Aide', 'Records Officer',
    'General Services Officer', 'Utility Worker', 'Maintenance Staff',
    'Student Services Officer', 'Guidance Counselor', 'Student Affairs Staff',
    'School Physician', 'School Nurse', 'Dental Aide',
    'HR Manager', 'System Administrator', 'Staff'
  ];

  const [formData, setFormData] = useState({
    employeeId: '',
    contractType: 'permanent',
    type: '',
    startDate: '',
    endDate: '',
    position: [],
    department: [],
    workSchedule: '',
    projectDetails: ''
  });

  useEffect(() => {
    // TODO: Implement data fetching
    // fetchContracts();
    // fetchExpiringContracts();
    // fetchEmployees();
    // fetchDepartments();
  }, [filter]);

  const fetchDepartments = async () => {
    try {
      // TODO: Implement actual API call
      setDepartments([]);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      // TODO: Implement actual API call
      setEmployees([]);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const fetchContracts = async () => {
    try {
      setLoading(true);
      // TODO: Implement actual API call
      setContracts([]);
    } catch (error) {
      console.error('Failed to fetch contracts', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpiringContracts = async () => {
    try {
      // TODO: Implement actual API call
      setExpiringContracts([]);
    } catch (error) {
      console.error('Error fetching expiring contracts:', error);
    }
  };

  const handleCreateContract = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.position.length === 0) {
      alert('Please select at least one position');
      return;
    }
    if (formData.department.length === 0) {
      alert('Please select at least one department');
      return;
    }
    if (!formData.type || formData.type.trim() === '') {
      alert('Please enter a position title');
      return;
    }
    if (!formData.employeeId) {
      alert('Please select an employee');
      return;
    }
    if (!formData.startDate) {
      alert('Please select a start date');
      return;
    }
    
    try {
      // Convert arrays to comma-separated strings for backend
      const contractData = {
        ...formData,
        position: formData.position.join(', '),
        department: formData.department.join(', ')
      };
      
      console.log('Submitting contract data:', contractData);
      // TODO: Implement actual API call
      // await hrService.createContract(contractData);
      alert('Contract created successfully');
      setShowCreateModal(false);
      resetForm();
      fetchContracts();
      fetchExpiringContracts();
    } catch (error) {
      console.error('Contract creation error:', error);
      alert('Failed to create contract');
    }
  };

  const handleRenewContract = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement actual API call
      // await hrService.renewContract(selectedContract.id, {
      //   startDate: formData.startDate,
      //   endDate: formData.endDate,
      //   workSchedule: formData.workSchedule,
      //   projectDetails: formData.projectDetails
      // });
      alert('Contract renewed successfully');
      setShowRenewModal(false);
      resetForm();
      fetchContracts();
      fetchExpiringContracts();
    } catch (error) {
      alert('Failed to renew contract');
    }
  };

  const handleTerminateContract = async (contractId) => {
    const reason = prompt('Enter termination reason:');
    if (!reason) return;

    try {
      // TODO: Implement actual API call
      // await hrService.terminateContract(contractId, reason);
      alert('Contract terminated successfully');
      fetchContracts();
      fetchExpiringContracts();
    } catch (error) {
      alert('Failed to terminate contract');
    }
  };

  const openRenewModal = (contract) => {
    setSelectedContract(contract);
    setFormData({
      ...formData,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      workSchedule: contract.workSchedule || '',
      projectDetails: contract.projectDetails || ''
    });
    setShowRenewModal(true);
  };

  const resetForm = () => {
    setFormData({
      employeeId: '',
      contractType: 'permanent',
      type: '',
      startDate: '',
      endDate: '',
      position: [],
      department: [],
      workSchedule: '',
      projectDetails: ''
    });
    setSelectedContract(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-red-100 text-red-800';
      case 'Terminated':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getContractTypeBadgeColor = (type) => {
    switch (type) {
      case 'permanent':
        return 'bg-blue-100 text-blue-800';
      case 'contractual':
        return 'bg-purple-100 text-purple-800';
      case 'part-time':
        return 'bg-yellow-100 text-yellow-800';
      case 'job-order':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contracts Management</h1>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <Plus size={20} className="mr-2" />
            Create Contract
          </button>
          <button 
            onClick={fetchContracts}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <RefreshCw size={20} className="mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Expiring Contracts Alert */}
      {expiringContracts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-400 mr-3 flex-shrink-0" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                {expiringContracts.length} Contract(s) Expiring Soon
              </h3>
              <div className="space-y-2">
                {expiringContracts.slice(0, 3).map(contract => (
                  <div key={contract.id} className="text-sm text-yellow-700 bg-yellow-100 rounded p-2">
                    <div className="font-medium">{contract.Employee?.fullName || 'N/A'}</div>
                    <div className="flex flex-wrap gap-2 mt-1 text-xs">
                      <span className="font-medium">Position:</span> {contract.position || contract.type || 'N/A'}
                      {contract.department && (
                        <><span className="mx-1">|</span><span className="font-medium">Dept:</span> {contract.department}</>
                      )}
                      {contract.contractType && (
                        <><span className="mx-1">|</span><span className="font-medium">Type:</span> {contract.contractType.replace('-', ' ')}</>
                      )}
                      <span className="mx-1">|</span><span className="font-medium">Expires:</span> {formatDate(contract.endDate)}
                    </div>
                    {contract.projectDetails && (
                      <div className="text-xs mt-1 italic">{contract.projectDetails}</div>
                    )}
                  </div>
                ))}
                {expiringContracts.length > 3 && (
                  <p className="text-sm text-yellow-600 italic mt-2">
                    +{expiringContracts.length - 3} more contracts expiring soon
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Filter size={20} className="text-gray-500 mr-3" />
            <h2 className="text-xl font-semibold text-gray-700">Filters</h2>
          </div>
          {(filter.status || filter.contractType || filter.department || filter.search) && (
            <button
              onClick={() => setFilter({ status: '', contractType: '', department: '', search: '' })}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by Employee Name or ID..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Terminated">Terminated</option>
          </select>
          <select
            value={filter.contractType}
            onChange={(e) => setFilter({ ...filter, contractType: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Contract Types</option>
            <option value="permanent">Permanent</option>
            <option value="contractual">Contractual</option>
            <option value="part-time">Part-Time</option>
            <option value="job-order">Job Order</option>
          </select>
          <input
            type="text"
            placeholder="Filter by Department"
            value={filter.department}
            onChange={(e) => setFilter({ ...filter, department: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contract History List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <History size={20} className="text-gray-500 mr-3" />
          <h2 className="text-xl font-semibold text-gray-700">Contract History ({contracts.length})</h2>
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contracts...</p>
          </div>
        ) : contracts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No contracts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contract Type</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900">{contract.Employee?.fullName || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{contract.Employee?.employeeId || ''}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getContractTypeBadgeColor(contract.contractType)}`}>
                        {contract.contractType || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">{contract.position || 'N/A'}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{contract.department || 'N/A'}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{formatDate(contract.startDate)}</td>
                    <td className="py-4 px-6 whitespace-nowrap">{formatDate(contract.endDate)}</td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium space-x-2">
                      {contract.status === 'Active' && contract.contractType !== 'permanent' && (
                        <button
                          onClick={() => openRenewModal(contract)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Renew Contract"
                        >
                          <RefreshCw size={18} />
                        </button>
                      )}
                      {contract.status === 'Active' && (
                        <button
                          onClick={() => handleTerminateContract(contract.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Terminate Contract"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Contract Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Create New Contract</h2>
              <button onClick={() => { setShowCreateModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateContract} className="p-6 space-y-6">
              {/* Employee and Contract Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee *</label>
                  <select
                    required
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.employeeId} - {emp.fullName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type *</label>
                  <select
                    required
                    value={formData.contractType}
                    onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="permanent">Permanent</option>
                    <option value="contractual">Contractual</option>
                    <option value="part-time">Part-Time</option>
                    <option value="job-order">Job Order</option>
                  </select>
                </div>
              </div>

              {/* Position Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Senior Faculty Member, Department Head"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Position and Department Multi-Select */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position(s) * <span className="text-xs text-gray-500">(Select one or more)</span></label>
                  <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto bg-white">
                    {positions.map(pos => (
                      <label key={pos} className="flex items-center space-x-2 py-1.5 hover:bg-gray-50 cursor-pointer rounded px-2">
                        <input
                          type="checkbox"
                          checked={formData.position.includes(pos)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, position: [...formData.position, pos] });
                            } else {
                              setFormData({ ...formData, position: formData.position.filter(p => p !== pos) });
                            }
                          }}
                          className="rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="text-sm">{pos}</span>
                      </label>
                    ))}
                  </div>
                  {formData.position.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.position.map(pos => (
                        <span key={pos} className="inline-flex items-center px-2.5 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {pos}
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, position: formData.position.filter(p => p !== pos) })}
                            className="ml-1.5 text-blue-600 hover:text-blue-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department(s) * <span className="text-xs text-gray-500">(Select one or more)</span></label>
                  <div className="border border-gray-300 rounded-lg p-3 max-h-48 overflow-y-auto bg-white">
                    {departments.map(dept => (
                      <label key={dept.id} className="flex items-center space-x-2 py-1.5 hover:bg-gray-50 cursor-pointer rounded px-2">
                        <input
                          type="checkbox"
                          checked={formData.department.includes(dept.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ ...formData, department: [...formData.department, dept.name] });
                            } else {
                              setFormData({ ...formData, department: formData.department.filter(d => d !== dept.name) });
                            }
                          }}
                          className="rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-sm">{dept.name}</span>
                      </label>
                    ))}
                  </div>
                  {formData.department.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.department.map(dept => (
                        <span key={dept} className="inline-flex items-center px-2.5 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          {dept}
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, department: formData.department.filter(d => d !== dept) })}
                            className="ml-1.5 text-purple-600 hover:text-purple-800 font-bold"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date {formData.contractType !== 'permanent' && '*'}
                  </label>
                  <input
                    type="date"
                    required={formData.contractType !== 'permanent'}
                    disabled={formData.contractType === 'permanent'}
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  />
                </div>
              </div>
              
              {formData.contractType === 'part-time' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Schedule *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Monday-Friday, 9AM-5PM"
                    value={formData.workSchedule}
                    onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {formData.contractType === 'job-order' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Describe the project and deliverables"
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowCreateModal(false); resetForm(); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Renew Contract Modal */}
      {showRenewModal && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Renew Contract</h2>
              <button onClick={() => { setShowRenewModal(false); resetForm(); }} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleRenewContract} className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Renewing contract for:</p>
                <p className="font-semibold text-gray-800">{selectedContract.Employee?.fullName}</p>
                <p className="text-sm text-gray-600">{selectedContract.type} - {selectedContract.contractType}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Start Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New End Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              {selectedContract.contractType === 'part-time' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Schedule</label>
                  <input
                    type="text"
                    value={formData.workSchedule}
                    onChange={(e) => setFormData({ ...formData, workSchedule: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              {selectedContract.contractType === 'job-order' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Details</label>
                  <textarea
                    rows="3"
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowRenewModal(false); resetForm(); }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Renew Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}