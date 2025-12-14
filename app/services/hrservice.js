import api from './apiClient';

const hrService = {
  getDashboardStats: async () => {
    const res = await api.get('/hr/dashboard/stats');
    return res.data;
  },

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
  renewContract: async (id, renewalData) => {
    const res = await api.post(`/hr/contracts/${id}/renew`, renewalData);
    return res.data;
  },
  terminateContract: async (id, reason) => {
    const res = await api.post(`/hr/contracts/${id}/terminate`, { terminationReason: reason });
    return res.data;
  },
  getExpiringContracts: async (days = 30) => {
    const res = await api.get('/hr/contracts/expiring', { params: { days } });
    return res.data;
  },
  getContractReport: async () => {
    const res = await api.get('/hr/reports/contracts');
    return res.data;
  },

  getDepartments: async (status = null) => {
    const params = status ? { status } : {};
    const res = await api.get('/hr/departments', { params });
    return res.data;
  },

  // ...other methods can be added here as needed
};

export default hrService;
