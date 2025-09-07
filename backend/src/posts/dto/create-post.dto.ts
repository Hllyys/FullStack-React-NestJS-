import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  body!: string;

  @IsInt()
  @Min(1)
  userId!: number;
}
