import api from './axios';

export const getBatchSales = () => api.get('/batch-sales/batch-sales');
export const createBatchSale = (saleData) => api.post('/batch-sales/batch-sales', saleData);
export const getBatchSale = (id) => api.get(`/batch-sales/batch-sales/${id}`);
export const updateBatchSale = (id, saleData) => api.put(`/batch-sales/batch-sales/${id}`, saleData);
export const deleteBatchSale = (id) => api.delete(`/batch-sales/batch-sales/${id}`);
export const reserveBatchSale = (id) => api.post(`/batch-sales/batch-sales/${id}/reserve`);
export const confirmBatchSaleDelivery = (id) => api.post(`/batch-sales/batch-sales/${id}/confirm-delivery`);
