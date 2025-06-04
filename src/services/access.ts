import api from './api';

export const getAllAccessRequestsByUser = (userId: number) =>
  api.get(`/access-requests/${userId}`);

export const createAccessRequest = (data: { user_id: number; access_type: string }) =>
  api.post('/access-requests', data);
