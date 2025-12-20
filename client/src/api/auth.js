import api from './axios';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const logout = () => api.delete('/auth/logout');
export const refreshToken = () => api.post('/auth/refresh');
export const googleLogin = () => api.get('/auth/login/google');
