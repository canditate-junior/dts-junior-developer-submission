import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Uses the Docker Variable, or falls back to localhost for testing
      url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/taskdb',
      entities: [Task],
      synchronize: true,
    }),
    TasksModule,
  ],
})
export class AppModule {}
