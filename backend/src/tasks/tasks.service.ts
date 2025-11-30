import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // 1. Create Logic: Takes the DTO, creates a Task entity, saves to DB
  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  // 2. Read Logic: Finds all tasks, sorting new ones to the top
  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ order: { createdAt: 'DESC' } });
  }
}