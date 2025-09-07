import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller()
export class PostsController {
  constructor(private readonly service: PostsService) {}

  // POSTS
  @Get('posts')
  findAll() {
    return this.service.findAll();
  }

  @Get('posts/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post('posts')
  create(@Body() dto: CreatePostDto) {
    return this.service.create(dto);
  }

  @Patch('posts/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.service.update(id, dto);
  }

  @Delete('posts/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  // USERS <-> POSTS ilişkili uçlar

  // Belirli kullanıcının gönderileri
  @Get('users/:userId/posts')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.service.findByUser(userId);
  }

  // Belirli kullanıcıya New post ekle
  @Post('users/:userId/posts')
  createForUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: Omit<CreatePostDto, 'userId'>,
  ) {
    return this.service.createForUser(userId, dto);
  }
}
