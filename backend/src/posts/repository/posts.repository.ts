import { Injectable } from '@nestjs/common';
import { Post } from '../entities/post.entity';

@Injectable()
export class PostsRepository {
  private posts: Post[] = [
    { id: 1, title: 'Merhaba Dünya', body: 'İlk gönderi', userId: 1 },
    { id: 2, title: 'Finbo Rocks', body: 'Canlı veri geliyor', userId: 2 },
  ];

  private nextId = 3;

  findAll(): Post[] {
    return [...this.posts];
  }

  findById(id: number): Post | undefined {
    return this.posts.find((p) => p.id === id);
  }

  findByUserId(userId: number): Post[] {
    return this.posts.filter((p) => p.userId === userId);
  }

  create(post: Omit<Post, 'id'>): Post {
    const created: Post = { id: this.nextId++, ...post };
    this.posts.push(created);
    return created;
  }

  update(id: number, partial: Partial<Post>): Post | undefined {
    const idx = this.posts.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    this.posts[idx] = { ...this.posts[idx], ...partial, id };
    return this.posts[idx];
  }

  remove(id: number): boolean {
    const before = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    return this.posts.length < before;
  }
}
