import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repo: UsersRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    const user = this.repo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(dto: CreateUserDto) {
    return this.repo.create(dto);
  }

  update(id: number, dto: UpdateUserDto) {
    const updated = this.repo.update(id, dto);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }

  remove(id: number) {
    const ok = this.repo.remove(id);
    if (!ok) throw new NotFoundException('User not found');
    return { success: true };
  }
}
