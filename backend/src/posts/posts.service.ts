import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsRepository } from './repository/posts.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersRepository } from '../users/repository/users.repository';

@Injectable()
export class PostsService {
  constructor(
    private readonly repo: PostsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    const post = this.repo.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  findByUser(userId: number) {
    // kullanıcı var mı kontrol
    const user = this.usersRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.findByUserId(userId);
  }

  create(dto: CreatePostDto) {
    const user = this.usersRepo.findById(dto.userId);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.create(dto);
  }

  createForUser(userId: number, dto: Omit<CreatePostDto, 'userId'>) {
    const user = this.usersRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return this.repo.create({ ...dto, userId });
  }

  update(id: number, dto: UpdatePostDto) {
    if (dto.userId) {
      const user = this.usersRepo.findById(dto.userId);
      if (!user) throw new NotFoundException('User not found');
    }
    const updated = this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('Post not found');
    return updated;
  }

  remove(id: number) {
    const ok = this.repo.remove(id);
    if (!ok) throw new NotFoundException('Post not found');
    return { success: true };
  }
}
