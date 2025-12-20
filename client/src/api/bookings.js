import api from './axios';

export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const acceptBooking = (id) => api.put(`/bookings/${id}/accept`);
export const completeBooking = (id) => api.put(`/bookings/${id}/complete`);
export const payBooking = (id) => api.put(`/bookings/${id}/pay`);
export const getBookingMessages = (id) => api.get(`/bookings/${id}/messages`);
export const sendMessage = (id, messageData) => api.post(`/bookings/${id}/messages`, messageData);
export const submitReview = (id, reviewData) => api.post(`/bookings/${id}/reviews`, reviewData);
