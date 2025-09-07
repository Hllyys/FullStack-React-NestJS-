import { api } from '../../../lib/axios';
import { User, UserCreateInput, UserUpdateInput } from '../types/user.schema';


export async function getUsers(): Promise<User[]> {
const { data } = await api.get('/users');
return data;
}


export async function createUser(payload: UserCreateInput): Promise<User> {
const { data } = await api.post('/users', payload);
return data; 
}


export async function updateUser(id: number, payload: UserUpdateInput): Promise<User> {
const { data } = await api.patch(`/users/${id}`, payload);
return data;
}


export async function deleteUser(id: number): Promise<void> {
await api.delete(`/users/${id}`);
}

