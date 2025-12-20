import api from './axios';

export const getProfile = () => api.get('/profile');
export const updateProfile = (profileData) => api.put('/profile', profileData);
