import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class FeedPostDto {
  @IsNotEmpty({ message: 'Client ID must not be empty' })
  @IsNumber({}, { message: 'Client ID must be a number' })
  client_id: number;

  @IsNotEmpty({ message: 'Worker ID must not be empty' })
  @IsNumber({}, { message: 'Worker ID must be a number' })
  worker_id: number;

  @IsOptional()
  @IsString({ message: 'Title must be a string' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Worker type must be a string' })
  worker_type?: string;

  @IsOptional()
  @IsString({ message: 'Media URL must be a string' })
  media_url?: string;

  @IsOptional()
  @IsString({ message: 'Location must be a string' })
  location?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Created date must be a valid date string' })
  created_date?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string;
}
