import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsRepository } from './repository/posts.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule], // kullanıcı doğrulaması için
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
