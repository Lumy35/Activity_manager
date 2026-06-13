import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { SprintsModule } from './modules/sprints/sprints.module';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [UsersModule, SprintsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
