import api from '../apiClient';

const getCurrentContract = () => api.get('/employee/contracts/current');
const getPastContracts = () => api.get('/employee/contracts/past');
const getAllContracts = () => api.get('/employee/contracts');
const downloadContract = (contractId) => api.get(`/employee/contracts/${contractId}/download`, { responseType: 'blob' });
const requestCertificates = (certificates) => api.post('/employee/certificates/request', { certificates });
const getCertificateRequests = () => api.get('/employee/certificates/requests');
const downloadCertificate = (certificateId) => api.get(`/employee/certificates/${certificateId}/download`, { responseType: 'blob' });

const contractService = {
  getCurrentContract,
  getPastContracts,
  getAllContracts,
  downloadContract,
  requestCertificates,
  getCertificateRequests,
  downloadCertificate,
};

export default contractService;
