import api from './axios';

export const searchSitters = (params) => api.get('/search/sitters', { params });
export const applyToBecomeSitter = () => api.post('/sitter/apply');
export const getAvailability = () => api.get('/sitter/availability');
export const addAvailability = (availabilityData) => api.post('/sitter/availability', availabilityData);
export const getServices = () => api.get('/sitter/services');
export const addService = (serviceData) => api.post('/sitter/services', serviceData);
export const getSitterReviews = (sitterId) => api.get(`/sitters/${sitterId}/reviews`);
