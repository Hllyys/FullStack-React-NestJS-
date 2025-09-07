import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  body?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  userId?: number;
}
