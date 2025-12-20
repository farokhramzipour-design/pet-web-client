import api from './axios';

export const getCampaigns = () => api.get('/crowdfunding/campaigns');
export const createCampaign = (campaignData) => api.post('/crowdfunding/campaigns', campaignData);
export const getCampaign = (id) => api.get(`/crowdfunding/campaigns/${id}`);
export const updateCampaign = (id, campaignData) => api.put(`/crowdfunding/campaigns/${id}`, campaignData);
export const deleteCampaign = (id) => api.delete(`/crowdfunding/campaigns/${id}`);
export const contributeToCampaign = (id, contributionData) => api.post(`/crowdfunding/campaigns/${id}/contribute`, contributionData);
export const getCampaignContributions = (id) => api.get(`/crowdfunding/campaigns/${id}/contributions`);
export const withdrawCampaignFunds = (id) => api.post(`/crowdfunding/campaigns/${id}/withdraw`);
export const getMyContributions = () => api.get('/crowdfunding/users/me/contributions');
