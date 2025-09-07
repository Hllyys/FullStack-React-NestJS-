import { api } from '../lib/axios';

export type User = {
  id: number;
  name: string;
  email: string;
  username?: string; 
};

export type CreateUser = {
  name: string;
  email: string;
  username?: string; 
};

export type UpdateUser = Partial<CreateUser>;

export const usersApi = {
  list: () => api.get<User[]>('/users').then(r => r.data),
  get: (id: number) => api.get<User>(`/users/${id}`).then(r => r.data),
  create: (data: CreateUser) =>
    api.post<User>('/users', data).then(r => r.data),
  update: (id: number, data: UpdateUser) =>
    api.patch<User>(`/users/${id}`, data).then(r => r.data),
  remove: (id: number) =>
    api.delete<{ success: true }>(`/users/${id}`).then(r => r.data),
};
