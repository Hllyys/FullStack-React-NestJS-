import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [
    { id: 1, name: 'Ada Lovelace', email: 'ada@finbo.dev' },
    { id: 2, name: 'Alan Turing', email: 'alan@finbo.dev' },
  ];

  private nextId = 3;

  findAll(): User[] {
    return [...this.users];
  }

  findById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const created: User = { id: this.nextId++, ...user };
    this.users.push(created);
    return created;
  }

  update(id: number, partial: Partial<User>): User | undefined {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) return undefined;
    this.users[idx] = { ...this.users[idx], ...partial, id };
    return this.users[idx];
  }

  remove(id: number): boolean {
    const before = this.users.length;
    this.users = this.users.filter((u) => u.id !== id);
    return this.users.length < before;
  }
}
