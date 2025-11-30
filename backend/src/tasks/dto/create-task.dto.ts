import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Review Case Files', description: 'Title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: ['OPEN', 'DONE'], required: false })
  @IsOptional()
  @IsIn(['OPEN', 'DONE'])
  status?: string;
}