import api from './axios';

// Changed addPet to handle FormData
export const addPet = (formData) => api.post('/pets', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const getPets = () => api.get('/pets');
export const getPet = (id) => api.get(`/pets/${id}`);
export const updatePet = (id, petData) => api.put(`/pets/${id}`, petData);
export const deletePet = (id) => api.delete(`/pets/${id}`);

// Images
export const uploadPetImage = (id, formData) => api.post(`/pets/${id}/images`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deletePetImage = (petId, imageId) => api.delete(`/pets/${petId}/images/${imageId}`);

// Health Records & Checks (Nested under pets)
export const getHealthRecords = (petId, params) => api.get(`/pets/${petId}/health-records`, { params });
export const addHealthRecord = (petId, recordData) => api.post(`/pets/${petId}/health-records`, recordData);
export const scheduleHealthCheck = (petId, checkData) => api.post(`/pets/${petId}/health-checks`, checkData);
