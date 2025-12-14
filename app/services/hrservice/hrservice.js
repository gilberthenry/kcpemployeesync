import api from './api';

const hrService = {
  getDashboardStats: async () => {
    const res = await api.get('/hr/dashboard/stats');
    return res.data;
  },

  // Employee management
  getEmployees: async (params) => {
    const res = await api.get('/hr/employees', { params });
    return res.data;
  },
  getEmployeeById: async (id) => {
    const res = await api.get(`/hr/employees/${id}`);
    return res.data;
  },
  bulkUpload: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post('/hr/employees/bulk-upload', formData);
    return res.data;
  },

  // Contract management
  getContracts: async (params) => {
    const res = await api.get('/hr/contracts', { params });
    return res.data;
  },
  createContract: async (contractData) => {
    const res = await api.post('/hr/contracts', contractData);
    return res.data;
  },
  updateContract: async (id, contractData) => {
    const res = await api.put(`/hr/contracts/${id}`, contractData);
    return res.data;
  },

  // Reports
  getContractReport: async () => {
    const res = await api.get('/hr/reports/contracts');
    return res.data;
  },
  getLeaveReport: async () => {
    const res = await api.get('/hr/reports/leaves');
    return res.data;
  },

  // Certificates
  getCertificateRequests: async () => {
    const res = await api.get('/hr/certificates/requests');
    return res.data;
  },
  approveCertificate: async (id) => {
    const res = await api.put(`/hr/certificates/${id}/approve`);
    return res.data;
  },

  // Documents
  getDocuments: async () => {
    const res = await api.get('/hr/documents');
    return res.data;
  },

  // Leaves
  getLeaves: async (params) => {
    const res = await api.get('/hr/leaves', { params });
    return res.data;
  },
  approveLeave: async (id) => {
    const res = await api.put(`/hr/leaves/${id}/approve`);
    return res.data;
  },

  // Departments & designations (delegated)
  getDepartments: async (status = null) => {
    const params = status ? { status } : {};
    const res = await api.get('/hr/departments', { params });
    return res.data;
  },
  getDesignations: async (status = null, departmentId = null) => {
    const params = {};
    if (status) params.status = status;
    if (departmentId) params.departmentId = departmentId;
    const res = await api.get('/hr/designations', { params });
    return res.data;
  },
};

export default hrService;
