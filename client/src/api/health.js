import api from './axios';

// Direct operations on health records/checks by their ID
export const updateHealthRecord = (id, recordData) => api.put(`/health-records/${id}`, recordData);
export const deleteHealthRecord = (id) => api.delete(`/health-records/${id}`);

export const updateHealthCheck = (id, checkData) => api.put(`/health-checks/${id}`, checkData);
export const cancelHealthCheck = (id) => api.delete(`/health-checks/${id}`);
