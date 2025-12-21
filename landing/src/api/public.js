import axios from 'axios';

// Use the same base URL as the client app
const BASE_URL = "https://pet.gp24.ir/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPublicCampaigns = () => api.get('/crowdfunding/public/campaigns');
export const getPublicBatchSales = () => api.get('/batch-sales/public/batch-sales');
export const searchSitters = (params) => api.get('/search/sitters', { params });
