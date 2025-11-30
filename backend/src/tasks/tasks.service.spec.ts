import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;

  // This sets up a "Mock" module before every test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          // Mocking the Database Repository so we don't need a real DB connection for testing
          provide: getRepositoryToken(Task),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  // The Test: Does the Service start up correctly?
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});