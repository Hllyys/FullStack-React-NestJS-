import { z } from 'zod';

export const UserSchema = z.object({
  id: z.number(),                
  name: z.string().min(1),
  username: z.string().min(1),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

export const UserCreateSchema = UserSchema.omit({ id: true });
export type UserCreateInput = z.infer<typeof UserCreateSchema>;

export const UserUpdateSchema = UserCreateSchema.partial();
export type UserUpdateInput = z.infer<typeof UserUpdateSchema>;
