import api from './api';

const misService = {
  getAuditLogs: async (params = {}) => {
    const res = await api.get('/mis/audit-logs', { params });
    return res.data;
  },

  getBackups: async () => {
    const res = await api.get('/mis/backups');
    return res.data;
  },

  createBackup: async () => {
    const res = await api.post('/mis/backups');
    return res.data;
  },

  getDocuments: async (params = {}) => {
    const res = await api.get('/mis/documents', { params });
    return res.data;
  },

  exportReport: async (reportType, params = {}) => {
    const res = await api.get(`/mis/reports/${reportType}`, { params, responseType: 'blob' });
    return res.data;
  },
};

export default misService;
