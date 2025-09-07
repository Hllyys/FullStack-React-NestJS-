import { z } from 'zod';

export const PostSchema = z.object({
  id: z.number(),             
  userId: z.number(),
  title: z.string().min(1),
  body: z.string().min(1),    
});

export type Post = z.infer<typeof PostSchema>;

export const PostCreateSchema = PostSchema.omit({ id: true }); 
export type PostCreateInput = z.infer<typeof PostCreateSchema>;

export const PostUpdateSchema = PostCreateSchema.partial();
export type PostUpdateInput = z.infer<typeof PostUpdateSchema>;
