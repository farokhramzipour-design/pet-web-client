import api from './axios';

export const getAllPets = () => api.get('/admin/pets');
export const getPetHealth = (id) => api.get(`/admin/pets/${id}/health`);
export const disablePet = (id) => api.put(`/admin/pets/${id}/disable`);
export const deletePet = (id) => api.delete(`/admin/pets/${id}`);
export const refundCampaign = (id) => api.post(`/crowdfunding/campaigns/${id}/refund-all`);
