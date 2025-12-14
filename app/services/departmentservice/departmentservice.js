import api from './api';

const departmentService = {
  getDepartments: async (status = null) => {
    const params = status ? { status } : {};
    const response = await api.get('/hr/departments', { params });
    return response.data;
  },

  getDepartmentById: async (id) => {
    const response = await api.get(`/hr/departments/${id}`);
    return response.data;
  },

  createDepartment: async (data) => {
    const response = await api.post('/hr/departments', data);
    return response.data;
  },

  updateDepartment: async (id, data) => {
    const response = await api.put(`/hr/departments/${id}`, data);
    return response.data;
  },

  archiveDepartment: async (id) => {
    const response = await api.put(`/hr/departments/${id}/archive`);
    return response.data;
  },

  unarchiveDepartment: async (id) => {
    const response = await api.put(`/hr/departments/${id}/unarchive`);
    return response.data;
  },

  // Designations
  getDesignations: async (status = null, departmentId = null) => {
    const params = {};
    if (status) params.status = status;
    if (departmentId) params.departmentId = departmentId;
    const response = await api.get('/hr/designations', { params });
    return response.data;
  },

  createDesignation: async (data) => {
    const response = await api.post('/hr/designations', data);
    return response.data;
  },

  updateDesignation: async (id, data) => {
    const response = await api.put(`/hr/designations/${id}`, data);
    return response.data;
  },

  archiveDesignation: async (id) => {
    const response = await api.put(`/hr/designations/${id}/archive`);
    return response.data;
  },

  unarchiveDesignation: async (id) => {
    const response = await api.put(`/hr/designations/${id}/unarchive`);
    return response.data;
  },
};

export default departmentService;
