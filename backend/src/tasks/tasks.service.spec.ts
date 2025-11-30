import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';

describe('TasksService', () => {
  let service: TasksService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a task', async () => {
      const dto = { title: 'Test Task' };
      const task = { id: '1', title: 'Test Task', status: 'OPEN' };

      mockRepository.create.mockReturnValue(task);
      mockRepository.save.mockResolvedValue(task);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(task);
      expect(result).toEqual(task);
    });
  });

  describe('findAll', () => {
    it('should return all tasks sorted by createdAt DESC', async () => {
      const tasks = [
        { id: '1', title: 'Task 1', status: 'OPEN' },
        { id: '2', title: 'Task 2', status: 'DONE' },
      ];

      mockRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({ order: { createdAt: 'DESC' } });
      expect(result).toEqual(tasks);
    });
  });
});