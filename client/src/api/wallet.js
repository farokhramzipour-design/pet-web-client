import api from './axios';

export const getWallets = () => api.get('/wallets');
export const createWallet = (walletData) => api.post('/wallets', walletData);
export const getWalletTransactions = (id) => api.get(`/wallet/${id}/transactions`);
export const topUpWallet = (id, amountData) => api.post(`/wallet/${id}/top-up`, amountData);
