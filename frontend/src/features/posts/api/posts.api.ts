import { api } from '../../../lib/axios';
import { Post, PostCreateInput, PostUpdateInput } from '../../users/types/post.schema'; 

export async function getPosts(userId?: number): Promise<Post[]> {
  const { data } = await api.get('/posts', { params: userId ? { userId } : undefined });
  return data;
}

export async function createPost(payload: PostCreateInput): Promise<Post> {
  const { data } = await api.post('/posts', payload);
  return data;
}

export async function updatePost(id: number, payload: PostUpdateInput): Promise<Post> {
  const { data } = await api.patch(`/posts/${id}`, payload);
  return data;
}

export async function deletePost(id: number): Promise<void> {
  await api.delete(`/posts/${id}`);
}

