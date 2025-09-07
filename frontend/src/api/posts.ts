import { api } from '../lib/axios';

export type Post = { id: number; title: string; body: string; userId: number };
export type CreatePost = { title: string; body: string; userId: number };
export type UpdatePost = Partial<CreatePost>;

export const postsApi = {
  list: () => api.get<Post[]>('/posts').then((r) => r.data),
  get: (id: number) => api.get<Post>(`/posts/${id}`).then((r) => r.data),
  create: (data: CreatePost) => api.post<Post>('/posts', data).then((r) => r.data),
  update: (id: number, data: UpdatePost) =>
    api.patch<Post>(`/posts/${id}`, data).then((r) => r.data),
  remove: (id: number) =>
    api.delete<{ success: true }>(`/posts/${id}`).then((r) => r.data),

  // ilişkili uçlar
  listByUser: (userId: number) =>
    api.get<Post[]>(`/users/${userId}/posts`).then((r) => r.data),
  createForUser: (userId: number, data: Omit<CreatePost, 'userId'>) =>
    api.post<Post>(`/users/${userId}/posts`, data).then((r) => r.data),
};
