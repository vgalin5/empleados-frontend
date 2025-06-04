import api from './api';

export const getAvailable = () => api.get('/devices/available');

export const assignComputer = (data: { user_id: number; device_id: number }) =>
  api.post('/devices/assign', data);

export const getUserComputerHistory = (userId: number) =>
  api.get(`/devices/history/${userId}`);
