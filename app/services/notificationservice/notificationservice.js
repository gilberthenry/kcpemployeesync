import api from './api';

const notificationService = {
  getNotifications: async (userId, params = {}) => {
    const res = await api.get(`/notifications/${userId}`, { params });
    return res.data;
  },

  markAsRead: async (notificationId) => {
    const res = await api.put(`/notifications/${notificationId}/read`);
    return res.data;
  },

  markAllAsRead: async (userId) => {
    const res = await api.put(`/notifications/${userId}/read-all`);
    return res.data;
  },

  sendNotification: async (payload) => {
    const res = await api.post('/notifications', payload);
    return res.data;
  },
};

export default notificationService;
