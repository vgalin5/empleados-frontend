import api from './api';

export interface User {
  id: number;
  name: string;
  email: string;
  area: string;
  role: string;
  status: string;
}

export const getAllUsers = () => api.get('/users');
export const createUser = (data: Omit<User, 'id' | 'status'>) =>
  api.post('/users', data);
export const approveUser = (id: number) => api.patch(`/users/${id}/approve`);
export const rejectUser = (id: number) => api.patch(`/users/${id}/reject`);
